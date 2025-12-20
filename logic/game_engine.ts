
import { useState } from 'react';
import { GameState, Member, Role, ScheduleAction, InteractionType, SelfActionType, ActionResult, GameEvent, EventOption, Impact, InteractionOutcome, SNSPost, Song, MusicGenre, QueuedEvent, ActiveGigState, GigCard, GigResultData, LyricTheme, BandState } from '../types';
import { MEMBER_POOL } from '../data/members';
import { EVENT_LIBRARY } from '../data/events';
import { calculateInteractionOutcome } from './interaction_system';
import { processTurn, ActionLog } from './schedule_system';
import { INITIAL_MONEY, SLOTS_PER_WEEK, MAX_MEMBERS, ACTION_UNLOCKS, REFRESH_COST_BASE } from '../constants';
import { SELF_ACTION_TEMPLATES } from '../data/interactions';
import { 
    MEMBER_POST_TEMPLATES, 
    FAN_COMMENT_TEMPLATES, 
    RIVAL_POST_TEMPLATES, 
    RIVAL_PROMO_TEMPLATES, 
    FAN_WAR_TEMPLATES,
    SHORT_POST_TEMPLATES,
    LONG_POST_TEMPLATES,
    POETIC_POST_TEMPLATES
} from '../data/sns_templates';
import { generateAiSnsPosts, generateSongIdea, generateAiRivalBand } from '../geminiService';
import { GIG_DEFINITIONS } from '../data/gigs';
import { generateRivalBand } from '../data/rival_generators';
import { initializeGigState, generateRoundOptions, resolveOption } from './card_system';
import { SKILL_TREE } from '../data/skills';
import { NEWS_LIBRARY } from '../data/news_content';

export const useGameEngine = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRefreshingScout, setIsRefreshingScout] = useState(false);
  const [isGeneratingSong, setIsGeneratingSong] = useState(false);
  
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
    currentWeek: 1, // Start at Week 1 (April 1st)
    money: INITIAL_MONEY, fans: 0, bandName: '未命名乐队',
    teamStats: { technique: 15, appeal: 15, stability: 15, chemistry: 0 },
    members: [], history: [], weeklySchedule: Array(SLOTS_PER_WEEK).fill(null),
    scoutPool: [], refreshCountThisWeek: 0, snsPosts: [],
    songs: [], currentProject: null,
    eventQueue: [],
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
    // Skill System Init
    skillPoints: 5,
    unlockedSkills: ['friend_1'], // Updated to match new Friend track
    bandState: BandState.Normal,
    currentNews: [],
    actionCounts: {}
  });

  const [isEventOpen, setIsEventOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [eventMember, setEventMember] = useState<Member | null>(null);
  const [eventResult, setEventResult] = useState<InteractionOutcome | null>(null);

  const refreshCost = gameState.refreshCountThisWeek === 0 ? 0 : REFRESH_COST_BASE * gameState.refreshCountThisWeek;

  const formatText = (text: string, memberName?: string): string => {
      let res = text;
      if (memberName) res = res.replace(/\[NAME\]/g, memberName);
      if (gameState.rival) res = res.replace(/\[RIVAL_NAME\]/g, gameState.rival.name);
      return res;
  };

  const generateWeeklyNews = (rival: any, week: number) => {
      const items = [];
      if (rival && rival.isUnlocked) {
          if (Math.random() < 0.3) items.push(NEWS_LIBRARY.rival[Math.floor(Math.random() * NEWS_LIBRARY.rival.length)].replace('[RIVAL_NAME]', rival.name));
      }
      
      // Determine Season (Week 1 = April 1st)
      // Spring: 1-13 (Apr, May, Jun)
      // Summer: 14-26 (Jul, Aug, Sep)
      // Autumn: 27-39 (Oct, Nov, Dec)
      // Winter: 40-52 (Jan, Feb, Mar)
      const normalizedWeek = ((week - 1) % 52) + 1;
      
      let seasonNews = [];
      if (normalizedWeek >= 1 && normalizedWeek <= 13) seasonNews = NEWS_LIBRARY.spring;
      else if (normalizedWeek >= 14 && normalizedWeek <= 26) seasonNews = NEWS_LIBRARY.summer;
      else if (normalizedWeek >= 27 && normalizedWeek <= 39) seasonNews = NEWS_LIBRARY.autumn;
      else seasonNews = NEWS_LIBRARY.winter;

      // Pick seasonal news
      items.push(seasonNews[Math.floor(Math.random() * seasonNews.length)]);
      
      // Pick general news
      if (Math.random() < 0.5) items.push(NEWS_LIBRARY.industry[Math.floor(Math.random() * NEWS_LIBRARY.industry.length)]);
      else items.push(NEWS_LIBRARY.trend[Math.floor(Math.random() * NEWS_LIBRARY.trend.length)]);
      
      items.push(NEWS_LIBRARY.gossip[Math.floor(Math.random() * NEWS_LIBRARY.gossip.length)]);
      
      return items;
  };

  const generateFallbackSNS = (state: GameState): SNSPost[] => {
     // ... (Existing implementation preserved) ...
     const newPosts: SNSPost[] = [];
     const weekStr = `Week ${state.currentWeek}`;
     
     state.members.forEach(m => {
       if (Math.random() < 0.35) {
         let contentPool = MEMBER_POST_TEMPLATES['default'];
         if (m.tags.some(t => ['三无', '酷', '社恐'].includes(t))) {
             contentPool = SHORT_POST_TEMPLATES;
         } else if (m.tags.some(t => ['辣妹', '元气', '偶像', '现充'].includes(t))) {
             contentPool = LONG_POST_TEMPLATES;
         } else if (m.tags.some(t => ['中二病', '电波', '文学少女'].includes(t))) {
             contentPool = POETIC_POST_TEMPLATES;
         } else {
             for (const t of m.tags) {
                 if (MEMBER_POST_TEMPLATES[t]) {
                     contentPool = MEMBER_POST_TEMPLATES[t];
                     break;
                 }
             }
         }
         const content = contentPool[Math.floor(Math.random() * contentPool.length)];
         newPosts.push({
           id: Math.random().toString(36), authorId: m.id, authorName: m.name,
           content: content, likes: 10 + Math.floor(Math.random()*50),
           timestamp: weekStr, type: 'member'
         });
       }
     });

     const fanPostCount = 1 + Math.floor(Math.random() * 2);
     for(let i=0; i<fanPostCount; i++) {
        const content = FAN_COMMENT_TEMPLATES[Math.floor(Math.random() * FAN_COMMENT_TEMPLATES.length)];
        newPosts.push({
           id: Math.random().toString(36), authorId: 'fan', authorName: '路人粉丝',
           content: content, likes: Math.floor(Math.random()*20),
           timestamp: weekStr, type: 'fan'
        });
     }
     
     if (state.rival.isUnlocked) {
         const roll = Math.random();
         if (roll < 0.4) {
             const content = RIVAL_PROMO_TEMPLATES[Math.floor(Math.random() * RIVAL_PROMO_TEMPLATES.length)];
             newPosts.push({
                 id: Math.random().toString(36), authorId: 'rival', authorName: state.rival.name + '_OFFICIAL',
                 content: content, 
                 likes: state.rival.fans / 5 + Math.floor(Math.random()*200),
                 timestamp: weekStr, 
                 type: 'rival'
             });
         }
         else if (roll < 0.7) {
             let templateList = RIVAL_POST_TEMPLATES.neutral;
             if (state.rival.relation >= 60) templateList = RIVAL_POST_TEMPLATES.friendly;
             else if (state.rival.relation <= 40) templateList = RIVAL_POST_TEMPLATES.hostile;
             const content = templateList[Math.floor(Math.random() * templateList.length)];
             newPosts.push({
                 id: Math.random().toString(36), authorId: 'rival', authorName: state.rival.name + '_MEMBER',
                 content: formatText(content), 
                 likes: state.rival.fans / 10 + Math.floor(Math.random()*100),
                 timestamp: weekStr, 
                 type: 'rival'
             });
         }
         else {
             const content = FAN_WAR_TEMPLATES[Math.floor(Math.random() * FAN_WAR_TEMPLATES.length)];
             newPosts.push({
                 id: Math.random().toString(36), authorId: 'gossip_fan', authorName: '吃瓜群众',
                 content: formatText(content), 
                 likes: Math.floor(Math.random()*50),
                 timestamp: weekStr, 
                 type: 'fan'
             });
         }
     }
     return newPosts;
  };

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
    // 1. Check Skill Tree locks
    const skillLock = SKILL_TREE.find(node => node.effect?.unlockAction?.includes(action));
    if (skillLock) {
        return gameState.unlockedSkills.includes(skillLock.id);
    }

    // 2. Fallback to basic requirements
    const condition = ACTION_UNLOCKS[action];
    if (!condition) return true;
    
    // Time Check (Start Week)
    if (condition.week && gameState.currentWeek < condition.week) return false;
    // Time Check (End Week / Seasonal)
    if (condition.endWeek && gameState.currentWeek > condition.endWeek) return false;

    if (condition.fans && gameState.fans < condition.fans) return false;
    if (condition.members && gameState.members.length < condition.members) return false;
    if (condition.money && gameState.money < condition.money) return false;
    return true;
  };

  const isInteractionUnlocked = (type: InteractionType) => {
      const skillLock = SKILL_TREE.find(node => node.effect?.unlockInteraction?.includes(type));
      if (skillLock) {
          return gameState.unlockedSkills.includes(skillLock.id);
      }
      // Reprimand and IntensivePractice are unlocked by default if not in tree
      return true;
  };

  const initGame = (role: Role, playerName: string) => {
    const leader: Member = {
      id: 'leader', name: playerName || '你', roles: [role],
      musicality: 60, technique: 50, stagePresence: 50, creativity: 50, mental: 80, 
      fatigue: 0, stress: 0, affection: 100,
      personality: '乐队队长。', tags: ['队长', '可靠'], isLeader: true,
      interactionsLeft: 2,
      composing: 60, lyrics: 60, arrangement: 50, design: 50
    };
    
    const randomRival = generateRivalBand();
    const initialNews = generateWeeklyNews(randomRival, 1);

    setGameState(prev => ({
      ...prev,
      currentWeek: 1, // Start at Week 1 (April)
      members: [leader],
      scoutPool: [...MEMBER_POOL].sort(() => 0.5 - Math.random()).slice(0, 3),
      rival: randomRival,
      currentNews: initialNews
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
  
  const nextRound = () => {
      // Simplified system advances round automatically in selectGigOption
  };

  const executeTurn = async () => {
    setIsProcessing(true);

    setTimeout(async () => {
        const { newState: tempState, actionLogs } = processTurn(gameState);
        let finalState = { ...tempState };
        let newSongCreated: Song | undefined = undefined;
        let earnedPP = 0;

        // PP Gain Logic: +1 for each Great Success
        actionLogs.forEach(log => {
            if (log.result === ActionResult.GreatSuccess) earnedPP += 1;
        });
        
        // Passive PP gain from high fans (Weekly)
        if (finalState.fans > 5000) earnedPP += 1;
        if (finalState.fans > 50000) earnedPP += 2;

        finalState.skillPoints += earnedPP;

        if (finalState.rival.isUnlocked) {
            const growthBase = 400 + (finalState.currentWeek * 100);
            const growthCompounding = finalState.rival.fans * 0.05;
            const rivalGrowth = Math.floor((growthBase + growthCompounding) * (0.9 + Math.random() * 0.3));
            finalState.rival = { ...finalState.rival, fans: finalState.rival.fans + rivalGrowth };
        }
        
        if (finalState.currentWeek === 2) {
            generateAiRivalBand(finalState).then(aiRival => {
                if (aiRival) {
                    setGameState(prev => ({ ...prev, rival: { ...prev.rival, ...aiRival } }));
                }
            });
        }

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
            setIsGeneratingSong(true);
            const idea = await generateSongIdea(finalState, composer, lyricist);
            setIsGeneratingSong(false); 
            
            // --- UPDATED QUALITY LOGIC ---
            // Base quality uses Composer's Composing AND Arrangement stats directly.
            // Formula: 10 (base) + Composing*0.3 + Arrangement*0.2 + Random(10)
            // e.g., 80 Composing, 80 Arrangement => 10 + 24 + 16 + rand = ~50-60 base quality.
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

        generateAiSnsPosts(finalState, actionLogs).then(newAiPosts => {
            if (newAiPosts.length === 0) newAiPosts = generateFallbackSNS(finalState); 
            setGameState(current => ({ ...current, snsPosts: [...newAiPosts, ...current.snsPosts].slice(0, 30) }));
        });
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
     
     // PP Rewards for Gigs
     let ppReward = 1;
     if (rank === 'S') ppReward = 5;
     else if (rank === 'A') ppReward = 3;
     else if (rank === 'B') ppReward = 2;

     const resultData: GigResultData = {
         gigTitle: gig.definition.title,
         venue: gig.definition.venue,
         finalHype: gig.currentVoltage, 
         scoreRank: rank,
         moneyEarned,
         fansEarned,
         rewards: gig.definition.rewards
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
        const newPosts: SNSPost[] = [{
             id: Math.random().toString(), authorId: 'system', authorName: 'SYSTEM',
             content: `演出结束！评级: ${rank} (Score: ${gig.currentVoltage})`, likes: 999,
             timestamp: weekStr, type: 'system'
        }];
        const nextNews = generateWeeklyNews(prev.rival, prev.currentWeek + 1);
        return {
          ...prev,
          activeGig: null, 
          currentWeek: prev.currentWeek + 1,
          money: prev.money + moneyEarned,
          fans: prev.fans + fansEarned,
          members: members,
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
      if (gameState.money < cost) return null;
      if (member.interactionsLeft <= 0) { alert("这名成员本周的精力已耗尽，请下周再找她。"); return null; }
      const outcome = calculateInteractionOutcome(member, type);
      setLastInteraction(outcome);
      setGameState(prev => ({
          ...prev,
          money: prev.money - cost,
          members: prev.members.map(m => m.id === member.id ? {
              ...m,
              stress: Math.max(0, Math.min(100, m.stress + (outcome.impact.stressChange || 0))),
              fatigue: Math.max(0, Math.min(100, m.fatigue + (outcome.impact.fatigue || 0))),
              affection: Math.max(0, Math.min(100, m.affection + (outcome.impact.affectionChange || 0))),
              interactionsLeft: m.interactionsLeft - 1
          } : m)
      }));
      return outcome;
  };

  const performSelfAction = (type: SelfActionType) => {
      const leaderIndex = gameState.members.findIndex(m => m.isLeader);
      if (leaderIndex === -1) return { log: "队长不存在", result: ActionResult.Failure };
      const leader = gameState.members[leaderIndex];
      if (leader.interactionsLeft <= 0) { alert("本周精力已耗尽。"); return { log: "精力耗尽", result: ActionResult.Failure }; }
      const data = SELF_ACTION_TEMPLATES[type];
      let impact: Impact = {};
      switch(type) {
          case SelfActionType.SoloPractice: impact = { technique: 2, fatigue: 10 }; break;
          case SelfActionType.Meditation: impact = { stressChange: -30, mental: 2 }; break;
          case SelfActionType.Songwriting: impact = { creativity: 2, composing: 1, fatigue: 10 }; break;
          case SelfActionType.AdminWork: impact = { stressChange: 5, money: 200 }; break;
          case SelfActionType.QuickNap: impact = { fatigue: -30, stressChange: -10 }; break;
      }
      const result = ActionResult.Success;
      setGameState(prev => {
          const newMembers = [...prev.members];
          const m = newMembers[leaderIndex];
          newMembers[leaderIndex] = {
              ...m,
              interactionsLeft: m.interactionsLeft - 1,
              technique: Math.min(100, m.technique + (impact.technique || 0)),
              stress: Math.max(0, Math.min(100, m.stress + (impact.stressChange || 0))),
              fatigue: Math.max(0, Math.min(100, m.fatigue + (impact.fatigue || 0))),
              mental: Math.min(100, m.mental + (impact.mental || 0)),
              creativity: Math.min(100, m.creativity + (impact.creativity || 0)),
              composing: Math.min(100, m.composing + (impact.composing || 0)),
          };
          return { ...prev, members: newMembers, money: prev.money + (impact.money || 0) };
      });
      setLastInteraction({ result, log: data.templates[result][0], impact });
      return { log: data.templates[result][0], result };
  };

  const recruitMember = (m: Member) => {
    if (gameState.members.length >= MAX_MEMBERS) return;
    setGameState(prev => ({ ...prev, members: [...prev.members, { ...m, interactionsLeft: 2 }], scoutPool: prev.scoutPool.filter(sc => sc.id !== m.id) }));
  };

  const refreshScout = () => {
    if (gameState.money < refreshCost) return;
    setIsRefreshingScout(true);
    setTimeout(() => {
        setGameState(prev => ({ ...prev, money: prev.money - refreshCost, refreshCountThisWeek: prev.refreshCountThisWeek + 1, scoutPool: [...MEMBER_POOL].filter(m => !prev.members.some(ex => ex.id === m.id)).sort(() => 0.5 - Math.random()).slice(0, 3) }));
        setIsRefreshingScout(false);
    }, 800);
  };

  const setScheduleSlot = (index: number, action: ScheduleAction | null) => {
    const ns = [...gameState.weeklySchedule];
    ns[index] = action;
    setGameState({...gameState, weeklySchedule: ns});
  };

  const handleEventChoice = (option: EventOption, customData?: string) => {
        const successChance = option.successChance ?? 1;
        const isSuccess = Math.random() < successChance;
        const impact = isSuccess ? option.impact : (option.failImpact || {});
        
        const effectDesc = formatText(option.effectDescription);
        const failDesc = option.failDescription ? formatText(option.failDescription) : undefined;

        const resultOutcome = {
            result: isSuccess ? ActionResult.Success : ActionResult.Failure,
            log: isSuccess ? effectDesc : (failDesc || "遗憾的是，并没有达到预期的效果。"),
            impact
        };

        setEventResult(resultOutcome);

        const memberId = eventMember?.id;
        setGameState(prev => {
            let updatedMembers = prev.members.map(m => {
                if (m.id === memberId) {
                   return {
                       ...m,
                       stress: Math.max(0, Math.min(100, m.stress + (impact.stressChange || 0))),
                       fatigue: Math.max(0, Math.min(100, m.fatigue + (impact.fatigue || 0))),
                       affection: Math.max(0, Math.min(100, m.affection + (impact.affectionChange || 0))),
                       musicality: Math.min(100, m.musicality + (impact.musicality || 0)),
                       technique: Math.min(100, m.technique + (impact.technique || 0)),
                       stagePresence: Math.min(100, m.stagePresence + (impact.stagePresence || 0)),
                       creativity: Math.min(100, m.creativity + (impact.creativity || 0)),
                       mental: Math.min(100, m.mental + (impact.mental || 0)),
                       composing: Math.min(100, m.composing + (impact.composing || 0)),
                       lyrics: Math.min(100, m.lyrics + (impact.lyrics || 0)),
                       arrangement: Math.min(100, m.arrangement + (impact.arrangement || 0)),
                       design: Math.min(100, m.design + (impact.design || 0)),
                   };
                }
                return m;
            });

            if (option.isQuitConfirmed && memberId !== 'leader') {
                updatedMembers = updatedMembers.filter(m => m.id !== memberId);
            }

            let currentProject = prev.currentProject;
            if (currentProject) {
                if (impact.quality) {
                    currentProject = { ...currentProject, quality: Math.min(100, currentProject.quality + impact.quality) };
                }
                if (impact.songProgress) {
                    currentProject = { ...currentProject, completeness: Math.min(100, currentProject.completeness + impact.songProgress) };
                }
            }

            let newTeamStats = { ...prev.teamStats };
            if (impact.stability) {
                newTeamStats.stability = Math.max(0, Math.min(100, newTeamStats.stability + impact.stability));
            }

            let newRival = { ...prev.rival };
            if (impact.unlockRival) newRival.isUnlocked = true;
            if (impact.rivalFans) newRival.fans = Math.max(0, newRival.fans + impact.rivalFans);
            if (impact.rivalRelation) newRival.relation = Math.max(0, Math.min(100, newRival.relation + impact.rivalRelation));

            return {
                ...prev,
                bandName: (activeEvent?.isNamingEvent && customData) ? customData : prev.bandName,
                money: Math.max(0, prev.money + (impact.money || 0)),
                fans: Math.max(0, prev.fans + (impact.fans || 0)),
                members: updatedMembers,
                currentProject,
                teamStats: newTeamStats,
                rival: newRival,
                completedGigs: prev.completedGigs,
                skillPoints: prev.skillPoints + (impact.skillPoints || 0)
            };
        });
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
    
    // ... (rest of logic unchanged)
    const criticalMember = gameState.members.find(m => m.stress >= 100 || m.fatigue >= 100);
    if (criticalMember) {
        const isStress = criticalMember.stress >= 100;
        const eventId = isStress ? 'stress_breakdown' : 'fatigue_collapse';
        const ev = EVENT_LIBRARY.find(e => e.id === eventId);
        if (ev) {
            setGameState(prev => ({ ...prev, eventQueue: [] })); 
            setActiveEvent(ev);
            setEventMember(criticalMember);
            setIsEventOpen(true);
            return;
        }
    }

    if (gameState.currentWeek >= 11 && gameState.bandName === '未命名乐队') { // Adjusted for later start
      const ev = EVENT_LIBRARY.find(e => e.id === 'naming_event');
      if (ev) { 
          setGameState(prev => ({ ...prev, eventQueue: [] }));
          setActiveEvent(ev); 
          setEventMember(gameState.members[0]); 
          setIsEventOpen(true); 
          return; 
      }
    } 

    if (gameState.currentWeek >= 12 && !gameState.rival.isUnlocked) { // Adjusted for later start
        const ev = EVENT_LIBRARY.find(e => e.id === 'rival_encounter_ex_member');
        if (ev && gameState.eventQueue.length === 0) {
             setGameState(prev => ({ ...prev, eventQueue: [] }));
             setActiveEvent(ev);
             setEventMember(gameState.members[0]);
             setIsEventOpen(true);
             return;
        }
    }

    const newEvents: QueuedEvent[] = [];
    const eventCount = 1 + (Math.random() > 0.6 ? 1 : 0);

    for (let i = 0; i < eventCount; i++) {
        const eligible = EVENT_LIBRARY.filter(e => {
            if (e.isNamingEvent) return false;
            if (['stress_breakdown', 'fatigue_collapse'].includes(e.id)) return false; 
            if (e.id === 'rival_encounter_ex_member') return false; 
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
            if (targetCandidate) {
                newEvents.push({ event: ev, member: targetCandidate });
            }
        }
    }

    if (newEvents.length > 0) {
        const first = newEvents[0];
        const remaining = newEvents.slice(1);
        setGameState(prev => ({ ...prev, eventQueue: remaining }));
        setActiveEvent(first.event);
        setEventMember(first.member);
        setIsEventOpen(true);
    }
  };

  const setBandState = (newState: BandState) => {
      setGameState(prev => ({ ...prev, bandState: newState }));
  };

  return { 
    gameState, setGameState, isStarted, initGame, isProcessing, isRefreshingScout,
    executeTurn, showTurnResult, turnResultData, finishTurnResult, 
    performInteraction, performSelfAction, recruitMember, refreshScout, 
    refreshCost, isEventOpen, setIsEventOpen, activeEvent, eventMember, 
    isActionUnlocked, isInteractionUnlocked, setScheduleSlot, handleEventChoice, showScoutModal, 
    setShowScoutModal, lastInteraction, setLastInteraction,
    eventResult, closeEvent,
    playCard: selectGigOption,
    finishGigAndContinueTurn, formatText, startGig,
    showGigResult, gigResultData, closeGigResult,
    isGeneratingSong,
    nextRound,
    unlockSkill, showSkillTree, setShowSkillTree,
    setBandState
  };
};
