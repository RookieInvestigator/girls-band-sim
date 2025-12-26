
import { useState } from 'react';
import { GameState, Member, Role, ScheduleAction, InteractionType, SelfActionType, ActionResult, GameEvent, EventOption, InteractionOutcome, Song, MusicGenre, QueuedEvent, GigCard, GigResultData, LyricTheme, BandState, FutureEvent } from '../types';
import { MEMBER_POOL } from '../data/members';
import { EVENT_LIBRARY } from '../data/events';
import { processTurn, ActionLog } from './schedule_system';
import { calculateBandStats } from './stats_system';
import { INITIAL_MONEY, SLOTS_PER_WEEK, MAX_MEMBERS, ACTION_UNLOCKS, REFRESH_COST_BASE } from '../constants';
import { generateAiSnsPosts, generateSongIdea, generateAiRivalBand } from '../geminiService';
import { GIG_DEFINITIONS } from '../data/gigs';
import { generateRivalBand } from '../data/rival_generators';
import { initializeGigState, generateRoundOptions, resolveOption } from './card_system';
import { SKILL_TREE } from '../data/skills';
import { formatText } from './utils';
import { generateWeeklyNews, generateFallbackSNS } from './news_generator';
import { processEventChoice } from './event_logic';
import { processInteraction, processSelfAction, processDismissal } from './action_logic';

// --- SCOUT LOGIC ---
const generateScoutPool = (currentMembers: Member[]): Member[] => {
    const available = MEMBER_POOL.filter(m => !currentMembers.some(cm => cm.id === m.id));
    const urCandidates = available.filter(m => m.id.startsWith('ur_'));
    const normalCandidates = available.filter(m => !m.id.startsWith('ur_'));
    
    const pool: Member[] = [];
    const PICK_COUNT = 3;
    const UR_RATE = 0.05; // 5% chance per slot to spawn a UR

    for (let i = 0; i < PICK_COUNT; i++) {
        const roll = Math.random();
        
        // Try to pick UR
        if (roll < UR_RATE && urCandidates.length > 0) {
            const pickIndex = Math.floor(Math.random() * urCandidates.length);
            pool.push(urCandidates[pickIndex]);
            urCandidates.splice(pickIndex, 1); // Remove from temp pool to avoid dupes in same batch
        } 
        // Fallback to Normal
        else if (normalCandidates.length > 0) {
            const pickIndex = Math.floor(Math.random() * normalCandidates.length);
            pool.push(normalCandidates[pickIndex]);
            normalCandidates.splice(pickIndex, 1);
        } 
        // If no normals left (unlikely), try UR again
        else if (urCandidates.length > 0) {
            const pickIndex = Math.floor(Math.random() * urCandidates.length);
            pool.push(urCandidates[pickIndex]);
            urCandidates.splice(pickIndex, 1);
        }
    }
    
    return pool.sort(() => 0.5 - Math.random()); // Shuffle the final 3 result
};

export const useGameEngine = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRefreshingScout, setIsRefreshingScout] = useState(false);
  const [isGeneratingSong, setIsGeneratingSong] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false); 
  
  const [showTurnResult, setShowTurnResult] = useState(false);
  const [turnResultData, setTurnResultData] = useState<{
    moneyDelta: number;
    fansDelta: number;
    actionLogs: ActionLog[];
    week: number;
    newSong?: Song;
    ppEarned: number;
  } | null>(null);

  const [showScoutModal, setShowScoutModal] = useState(false);
  const [showSkillTree, setShowSkillTree] = useState(false);
  
  const [showGigResult, setShowGigResult] = useState(false);
  const [gigResultData, setGigResultData] = useState<GigResultData | null>(null);

  const [lastInteraction, setLastInteraction] = useState<InteractionOutcome | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    currentWeek: 1, 
    money: INITIAL_MONEY, fans: 0, bandName: '未命名乐队',
    teamStats: { 
        performance: 0, precision: 50, tone: 50, rhythm: 50, dynamics: 50,
        stage: 0, aura: 50, interaction: 50, visual: 50, adaptation: 50,
        bond: 0, synergy: 0, connection: 50, topic: 0,
        work: 0, narrative: 50, melody: 50, detail: 50,
        totalRating: 'D',
        technique: 50, appeal: 50, stability: 50, chemistry: 0 // Legacy
    },
    rawChemistry: 0, // Init
    members: [], history: [], weeklySchedule: Array(SLOTS_PER_WEEK).fill(null),
    scoutPool: [], refreshCountThisWeek: 0, snsPosts: [],
    songs: [], currentProject: null,
    eventQueue: [],
    futureEvents: [],
    activeGig: null,
    completedGigs: [], 
    rival: {
      name: '???',
      description: '???',
      fans: 0,
      relation: 50,
      isUnlocked: false,
      style: '???'
    },
    skillPoints: 5,
    unlockedSkills: ['friend_1'], 
    bandState: BandState.Normal,
    currentNews: [],
    actionCounts: {},
    completedEvents: [] // NEW
  });

  const [isEventOpen, setIsEventOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [eventMember, setEventMember] = useState<Member | null>(null);
  const [eventResult, setEventResult] = useState<InteractionOutcome | null>(null);

  const refreshCost = gameState.refreshCountThisWeek === 0 ? 0 : REFRESH_COST_BASE * gameState.refreshCountThisWeek;

  // --- ACTIONS ---

  const unlockSkill = (skillId: string) => {
      const skill = SKILL_TREE.find(s => s.id === skillId);
      if (!skill) return;
      if (gameState.skillPoints < skill.cost) return;
      if (gameState.unlockedSkills.includes(skillId)) return;

      setGameState(prev => ({
          ...prev,
          skillPoints: prev.skillPoints - skill.cost,
          unlockedSkills: [...prev.unlockedSkills, skillId]
      }));
  };

  const isActionUnlocked = (action: ScheduleAction) => {
    const skillLock = SKILL_TREE.find(node => node.effect?.unlockAction?.includes(action));
    if (skillLock) return gameState.unlockedSkills.includes(skillLock.id);

    const condition = ACTION_UNLOCKS[action];
    if (!condition) return true;
    
    if (condition.week && gameState.currentWeek < condition.week) return false;
    if (condition.endWeek && gameState.currentWeek > condition.endWeek) return false;
    if (condition.fans && gameState.fans < condition.fans) return false;
    if (condition.members && gameState.members.length < condition.members) return false;
    if (condition.money && gameState.money < condition.money) return false;
    return true;
  };

  const isInteractionUnlocked = (type: InteractionType) => {
      const skillLock = SKILL_TREE.find(node => node.effect?.unlockInteraction?.includes(type));
      if (skillLock) return gameState.unlockedSkills.includes(skillLock.id);
      return true;
  };

  const initGame = (role: Role, playerName: string) => {
    const leader: Member = {
      id: 'leader', name: playerName || '你', roles: [role],
      // Nerfed Leader Stats significantly to allow growth
      musicality: 40, technique: 35, stagePresence: 35, creativity: 30, mental: 60, 
      fatigue: 0, stress: 0, affection: 100,
      personality: '乐队队长。', tags: ['队长', '可靠'], isLeader: true,
      interactionsLeft: 2,
      composing: 40, lyrics: 40, arrangement: 30, design: 30
    };
    
    const randomRival = generateRivalBand();
    const initialNews = generateWeeklyNews(randomRival, 1);
    const initialMembers = [leader];
    const initialStats = calculateBandStats(initialMembers, [], 0, 0, ['friend_1']);
    
    // Initial scout generation with weighted logic
    const initialScoutPool = generateScoutPool(initialMembers);

    setGameState(prev => ({
      ...prev,
      currentWeek: 1, 
      members: initialMembers,
      teamStats: initialStats,
      rawChemistry: 0,
      scoutPool: initialScoutPool,
      rival: randomRival,
      currentNews: initialNews,
      completedEvents: []
    }));
    setIsStarted(true);
  };

  const startGig = (gigId: string) => {
    const def = GIG_DEFINITIONS[gigId];
    if (!def) return;
    const gigState = initializeGigState(def, gameState.members, gameState.songs);
    setGameState(prev => ({ ...prev, activeGig: gigState }));
  };

  const selectGigOption = (option: GigCard) => {
      setGameState(prev => {
          if (!prev.activeGig) return prev;
          const gig = prev.activeGig;
          const result = resolveOption(option, prev.members, prev.teamStats, gig.currentHype);
          
          let newHype = gig.currentHype + result.hypeDelta;
          let newVoltage = gig.currentVoltage + result.voltage;

          const logTypeMap: Record<string, any> = { 'Miss': 'miss', 'Hit': 'play', 'Critical': 'crit' };
          const newLogs = [...gig.logs, {
              text: `${option.title}: ${result.logText} (+${result.voltage} V)`,
              type: logTypeMap[result.outcome] as any
          }];

          const isFinished = gig.currentRound >= gig.maxRounds;
          const nextRoundNum = gig.currentRound + 1;
          const nextState = isFinished 
            ? { options: [], phaseName: 'Finished' } 
            : generateRoundOptions(prev.members, prev.songs, nextRoundNum, gig.maxRounds);

          return {
              ...prev,
              activeGig: {
                  ...gig,
                  currentVoltage: newVoltage,
                  currentHype: newHype,
                  currentRound: isFinished ? gig.currentRound : nextRoundNum,
                  currentOptions: nextState.options,
                  phaseName: nextState.phaseName,
                  logs: newLogs,
                  isFinished: isFinished,
                  lastResult: result
              }
          };
      });
  };
  
  const nextRound = () => {};

  const executeTurn = async () => {
    setIsProcessing(true);

    setTimeout(async () => {
        const { newState: tempState, actionLogs } = processTurn(gameState);
        let finalState = { ...tempState };
        let newSongCreated: Song | undefined = undefined;
        let earnedPP = 0;

        actionLogs.forEach(log => {
            if (log.result === ActionResult.GreatSuccess) earnedPP += 1;
        });
        
        if (finalState.fans > 5000) earnedPP += 1;
        if (finalState.fans > 50000) earnedPP += 2;

        finalState.skillPoints += earnedPP;

        // Future Events Check
        const triggeredEvents = finalState.futureEvents.filter(fe => fe.triggerWeek === finalState.currentWeek);
        const remainingFuture = finalState.futureEvents.filter(fe => fe.triggerWeek !== finalState.currentWeek);
        finalState.futureEvents = remainingFuture;

        triggeredEvents.forEach(fe => {
            const ev = EVENT_LIBRARY.find(e => e.id === fe.eventId);
            const mem = finalState.members.find(m => m.id === fe.memberId);
            if (ev && mem) {
                finalState.eventQueue.unshift({ event: ev, member: mem });
            }
        });

        // Rival Growth
        if (finalState.rival.isUnlocked) {
            const growthBase = 400 + (finalState.currentWeek * 100);
            const growthCompounding = finalState.rival.fans * 0.05;
            const rivalGrowth = Math.floor((growthBase + growthCompounding) * (0.9 + Math.random() * 0.3));
            finalState.rival = { ...finalState.rival, fans: finalState.rival.fans + rivalGrowth };
        }
        
        // AI Rival Init - WEEK 4 TRIGGER
        // If we have an API key, we try to generate a flavored rival.
        // We do this BEFORE the event logic below so the event uses the new data.
        if (finalState.currentWeek === 4 && hasApiKey) {
            try {
                const aiRival = await generateAiRivalBand(finalState);
                if (aiRival) {
                    finalState.rival = { ...finalState.rival, ...aiRival };
                }
            } catch (e) {
                console.error("AI Rival Gen Failed, using default", e);
            }
        }

        // Songwriting Logic
        const hasSongwriting = gameState.weeklySchedule.includes(ScheduleAction.Songwriting);
        if (hasSongwriting && !finalState.currentProject) {
            const selectCreative = (type: 'composing' | 'lyrics') => {
                const sorted = [...finalState.members].sort((a,b) => (b[type] || 0) - (a[type] || 0));
                if (sorted.length <= 1) return sorted[0];
                const roll = Math.random();
                if (roll < 0.8) return sorted[0];
                else {
                    const pool = sorted.slice(1);
                    return pool[Math.floor(Math.random() * pool.length)];
                }
            };
            const composer = selectCreative('composing');
            const lyricist = selectCreative('lyrics');
            
            let idea: Partial<Song> = {
                title: "未命名的旋律", description: "一首尚未完成的草稿。",
                genre: MusicGenre.JPop, lyricTheme: LyricTheme.Youth
            };

            if (hasApiKey) {
                setIsGeneratingSong(true);
                try {
                    idea = await generateSongIdea(finalState, composer, lyricist);
                } catch(e) {
                    console.error("AI Song Gen Failed", e);
                }
                setIsGeneratingSong(false); 
            }
            
            const baseQuality = 10 + (composer.composing * 0.3) + (composer.arrangement * 0.2) + Math.floor(Math.random() * 10);

            finalState.currentProject = {
                id: Math.random().toString(36).substr(2, 9),
                title: idea.title || "Untitled",
                description: idea.description || "",
                genre: idea.genre || MusicGenre.JPop,
                lyricTheme: idea.lyricTheme || LyricTheme.Youth,
                quality: baseQuality, 
                completeness: 20, 
                popularity: 0,
                credits: { composer: composer.name, lyricist: lyricist.name }
            };
            actionLogs.push({
                action: ScheduleAction.Songwriting,
                result: ActionResult.Success,
                details: [`灵感迸发！${composer.name}开始作曲，${lyricist.name}构思了【${finalState.currentProject.lyricTheme}】风格的歌词。`, `初始品质: ${Math.floor(baseQuality)} (基于${composer.name}的能力)`],
                date: "Special",
                flavorText: "新的传说开始了。"
            });
        }

        // Project Completion Logic
        if (finalState.currentProject && finalState.currentProject.completeness >= 100) {
            finalState.currentProject.releaseWeek = finalState.currentWeek;
            const isViral = Math.random() < 0.03;
            let popularityBase = Math.floor(finalState.fans * 0.15) + Math.floor(Math.random() * 500);
            if (isViral) {
                popularityBase = Math.floor(popularityBase * (5 + Math.random() * 5)) + 5000;
                finalState.currentProject.isViral = true;
                const viralFans = 2000 + Math.floor(Math.random() * 3000);
                finalState.fans += viralFans;
                actionLogs.push({
                    action: ScheduleAction.SocialMediaLive, 
                    result: ActionResult.GreatSuccess,
                    details: [`奇迹发生了！新歌《${finalState.currentProject.title}》在网络上爆火！`, `粉丝激增 +${viralFans}`],
                    date: "VIRAL HIT",
                    flavorText: "一夜之间，播放量突破了天际！所有人都在讨论这首歌！"
                });
            } else {
                actionLogs.push({
                    action: ScheduleAction.Recording,
                    result: ActionResult.GreatSuccess,
                    details: [`新单曲《${finalState.currentProject.title}》制作完成！`],
                    date: "Release",
                    flavorText: "我们做到了！"
                });
            }
            finalState.currentProject.popularity = popularityBase;
            finalState.songs = [...finalState.songs, finalState.currentProject];
            newSongCreated = finalState.currentProject;
            finalState.currentProject = null; 
        }

        finalState.weeklySchedule = Array(SLOTS_PER_WEEK).fill(null);
        finalState.refreshCountThisWeek = 0;
        finalState.currentNews = generateWeeklyNews(finalState.rival, finalState.currentWeek);

        setGameState(finalState);
        setTurnResultData({ 
            moneyDelta: finalState.money - gameState.money, 
            fansDelta: finalState.fans - gameState.fans, 
            actionLogs, 
            week: gameState.currentWeek, 
            newSong: newSongCreated,
            ppEarned: earnedPP
        });
        setShowTurnResult(true);
        setIsProcessing(false);

        // SNS GENERATION
        if (hasApiKey) {
            generateAiSnsPosts(finalState, actionLogs).then(newAiPosts => {
                if (newAiPosts.length === 0) newAiPosts = generateFallbackSNS(finalState); 
                setGameState(current => ({ ...current, snsPosts: [...newAiPosts, ...current.snsPosts].slice(0, 30) }));
            });
        } else {
            const fallbackPosts = generateFallbackSNS(finalState);
            setGameState(current => ({ ...current, snsPosts: [...fallbackPosts, ...current.snsPosts].slice(0, 30) }));
        }

    }, 1200); 
  };

  const finishGigAndContinueTurn = () => {
     if (!gameState.activeGig) return;
     const gig = gameState.activeGig;
     const completionRate = gig.currentVoltage / gig.targetVoltage;
     
     let rank: 'S'|'A'|'B'|'C'|'F' = 'F';
     if (completionRate >= 1.0) rank = 'S';
     else if (completionRate >= 0.8) rank = 'A';
     else if (completionRate >= 0.6) rank = 'B';
     else if (completionRate >= 0.4) rank = 'C';

     const scale = Math.min(1.5, completionRate);
     const moneyEarned = Math.floor(gig.definition.rewards.money * scale);
     const fansEarned = Math.floor(gig.definition.rewards.fans * scale);
     
     let ppReward = 1;
     if (rank === 'S') ppReward = 5;
     else if (rank === 'A') ppReward = 3;
     else if (rank === 'B') ppReward = 2;

     const resultData: GigResultData = {
         gigTitle: gig.definition.title, venue: gig.definition.venue,
         finalHype: gig.currentVoltage, scoreRank: rank,
         moneyEarned, fansEarned, rewards: gig.definition.rewards
     };

     setIsProcessing(true);
     setGameState(prev => {
        if (!prev.activeGig) return prev;
        const members = prev.members.map(m => ({
            ...m,
            fatigue: Math.min(100, m.fatigue + 30),
            interactionsLeft: 2
        }));
        const weekStr = `Week ${prev.currentWeek}`;
        const newPosts = [{
             id: Math.random().toString(), authorId: 'system', authorName: 'SYSTEM',
             content: `演出结束！评级: ${rank} (Score: ${gig.currentVoltage})`, likes: 999,
             timestamp: weekStr, type: 'system' as const
        }];
        const nextNews = generateWeeklyNews(prev.rival, prev.currentWeek + 1);
        const gigChemistryBonus = rank === 'S' || rank === 'A' ? 3 : 1;
        const newRawChemistry = prev.rawChemistry + gigChemistryBonus;
        const newTeamStats = calculateBandStats(members, prev.songs, newRawChemistry, prev.fans + fansEarned, prev.unlockedSkills);

        return {
          ...prev,
          activeGig: null, 
          currentWeek: prev.currentWeek + 1,
          money: prev.money + moneyEarned,
          fans: prev.fans + fansEarned,
          members: members,
          rawChemistry: newRawChemistry,
          teamStats: newTeamStats,
          weeklySchedule: Array(SLOTS_PER_WEEK).fill(null),
          snsPosts: [...newPosts, ...prev.snsPosts].slice(0, 30),
          completedGigs: rank === 'S' || rank === 'A' ? [...prev.completedGigs, prev.activeGig.definition.id] : prev.completedGigs,
          skillPoints: prev.skillPoints + ppReward,
          currentNews: nextNews
        };
     });
     
     setGigResultData(resultData);
     setShowGigResult(true);
     setIsProcessing(false);
  };

  const closeGigResult = () => {
      setShowGigResult(false);
      setGigResultData(null);
  };

  const performInteraction = (member: Member, type: InteractionType, cost: number) => {
      if (member.interactionsLeft <= 0) { alert("这名成员本周的精力已耗尽，请下周再找她。"); return null; }
      
      const result = processInteraction(gameState, member, type, cost);
      if (result) {
          setLastInteraction(result.outcome);
          setGameState(result.newState);
          return result.outcome;
      }
      return null;
  };

  const performSelfAction = (type: SelfActionType) => {
      const result = processSelfAction(gameState, type);
      if ('error' in result) {
          if (result.error === "精力耗尽") alert("本周精力已耗尽。");
          return { log: result.error, result: ActionResult.Failure };
      }
      setLastInteraction(result.outcome);
      setGameState(result.newState);
      return { log: result.outcome.log, result: result.outcome.result };
  };

  const recruitMember = (m: Member) => {
    if (gameState.members.length >= MAX_MEMBERS) return;
    const newMembers = [...gameState.members, { ...m, interactionsLeft: 2 }];
    const newTeamStats = calculateBandStats(newMembers, gameState.songs, gameState.rawChemistry, gameState.fans, gameState.unlockedSkills);
    // Modified: DO NOT filter scoutPool. Keep the member in the pool so the card stays in the UI.
    setGameState(prev => ({ 
        ...prev, 
        members: newMembers, 
        teamStats: newTeamStats 
        // scoutPool: prev.scoutPool.filter(sc => sc.id !== m.id)  <-- REMOVED
    }));
  };

  const refreshScout = () => {
    if (gameState.money < refreshCost) return;
    setIsRefreshingScout(true);
    setTimeout(() => {
        setGameState(prev => ({ 
            ...prev, 
            money: prev.money - refreshCost, 
            refreshCountThisWeek: prev.refreshCountThisWeek + 1, 
            scoutPool: generateScoutPool(prev.members) // Use weighted generator
        }));
        setIsRefreshingScout(false);
    }, 800);
  };

  const setScheduleSlot = (index: number, action: ScheduleAction | null) => {
    const ns = [...gameState.weeklySchedule];
    ns[index] = action;
    setGameState({...gameState, weeklySchedule: ns});
  };

  const handleEventChoice = (option: EventOption, customData?: string) => {
      const { newState, outcome } = processEventChoice(gameState, activeEvent, option, eventMember, customData);
      setEventResult(outcome);
      setGameState(newState);
  };

  const closeEvent = () => {
      setEventResult(null);
      if (gameState.eventQueue.length > 0) {
          const nextEvent = gameState.eventQueue[0];
          const newQueue = gameState.eventQueue.slice(1);
          setGameState(prev => ({ ...prev, eventQueue: newQueue }));
          setActiveEvent(nextEvent.event);
          setEventMember(nextEvent.member);
      } else {
          setIsEventOpen(false);
          setActiveEvent(null);
          setEventMember(null);
      }
  };

  const finishTurnResult = () => {
    setShowTurnResult(false);
    // Naming Event Force
    if (gameState.bandName === '未命名乐队') { 
      const ev = EVENT_LIBRARY.find(e => e.id === 'naming_event');
      if (ev) { 
          setGameState(prev => ({ ...prev, eventQueue: [] }));
          setActiveEvent(ev); setEventMember(gameState.members[0]); setIsEventOpen(true); 
          return; 
      }
    } 
    // Critical Events
    const criticalMember = gameState.members.find(m => m.stress >= 100 || m.fatigue >= 100);
    if (criticalMember) {
        const isStress = criticalMember.stress >= 100;
        const eventId = isStress ? 'stress_breakdown' : 'fatigue_collapse';
        const ev = EVENT_LIBRARY.find(e => e.id === eventId);
        if (ev) {
            setGameState(prev => ({ ...prev, eventQueue: [] })); 
            setActiveEvent(ev); setEventMember(criticalMember); setIsEventOpen(true);
            return;
        }
    }
    
    // Rival Encounter Force - TRIGGER AT WEEK 4
    if (gameState.currentWeek === 4 && !gameState.rival.isUnlocked) { 
        const ev = EVENT_LIBRARY.find(e => e.id === 'rival_encounter_ex_member');
        if (ev) {
             // Prioritize this story event
             setGameState(prev => ({ ...prev, eventQueue: [] }));
             setActiveEvent(ev); setEventMember(gameState.members[0]); setIsEventOpen(true);
             return;
        }
    }

    // Random Event Generation
    const newEvents: QueuedEvent[] = [];
    const eventCount = 1 + (Math.random() > 0.6 ? 1 : 0);
    for (let i = 0; i < eventCount; i++) {
        const eligible = EVENT_LIBRARY.filter(e => {
            if (e.isNamingEvent) return false;
            if (['stress_breakdown', 'fatigue_collapse', 'critical_dismissal', 'staff_return_decision'].includes(e.id)) return false; 
            if (e.id === 'rival_encounter_ex_member') return false; 
            
            // ONE TIME EVENT CHECK
            if (gameState.completedEvents.includes(e.id)) return false;

            if (newEvents.some(ne => ne.event.id === e.id)) return false;
            if (e.requiredRole && !gameState.members.some(m => m.roles.includes(e.requiredRole!) && !m.isLeader)) return false;
            if (e.requiredTag && !gameState.members.some(m => m.tags.includes(e.requiredTag!))) return false;
            if (e.condition && !e.condition(gameState)) return false;
            return true;
        });
        if (eligible.length > 0) {
            const ev = eligible[Math.floor(Math.random() * eligible.length)];
            let validMembers = gameState.members;
            if (ev.requiredRole) validMembers = validMembers.filter(m => m.roles.includes(ev.requiredRole!));
            if (ev.requiredTag) validMembers = validMembers.filter(m => m.tags.includes(ev.requiredTag!));
            const targetCandidate = validMembers[Math.floor(Math.random() * validMembers.length)];
            if (targetCandidate) newEvents.push({ event: ev, member: targetCandidate });
        }
    }

    if (newEvents.length > 0) {
        const first = newEvents[0];
        const remaining = newEvents.slice(1);
        setGameState(prev => ({ ...prev, eventQueue: [...prev.eventQueue, ...remaining] })); 
        if (gameState.eventQueue.length === 0) { 
            setActiveEvent(first.event); setEventMember(first.member); setIsEventOpen(true);
        } else {
            setGameState(prev => ({ ...prev, eventQueue: [...prev.eventQueue, first] }));
        }
    } else if (gameState.eventQueue.length > 0) {
        const next = gameState.eventQueue[0];
        setActiveEvent(next.event); setEventMember(next.member);
        setGameState(prev => ({ ...prev, eventQueue: prev.eventQueue.slice(1) }));
        setIsEventOpen(true);
    }
  };

  const setBandState = (newState: BandState) => {
      setGameState(prev => ({ ...prev, bandState: newState }));
  };

  const fireMember = (member: Member) => {
      if (member.isLeader) return;
      if (member.affection >= 60) {
          const ev = EVENT_LIBRARY.find(e => e.id === 'critical_dismissal');
          if (ev) {
              setGameState(prev => ({ ...prev, eventQueue: [] }));
              setActiveEvent(ev); setEventMember(member); setIsEventOpen(true);
              return;
          }
      }
      const { newState, outcome } = processDismissal(gameState, member);
      setGameState(newState);
      setLastInteraction(outcome);
  };

  const textFormatter = (t: string, mName?: string) => formatText(t, gameState, mName);

  return { 
    gameState, setGameState, isStarted, initGame, isProcessing, isRefreshingScout,
    executeTurn, showTurnResult, turnResultData, finishTurnResult, 
    performInteraction, performSelfAction, recruitMember, refreshScout, 
    refreshCost, isEventOpen, setIsEventOpen, activeEvent, eventMember, 
    isActionUnlocked, isInteractionUnlocked, setScheduleSlot, handleEventChoice, showScoutModal, 
    setShowScoutModal, lastInteraction, setLastInteraction,
    eventResult, closeEvent,
    playCard: selectGigOption,
    finishGigAndContinueTurn, formatText: textFormatter, startGig,
    showGigResult, gigResultData, closeGigResult,
    isGeneratingSong,
    nextRound,
    unlockSkill, showSkillTree, setShowSkillTree,
    setBandState,
    fireMember,
    hasApiKey, setHasApiKey 
  };
};
