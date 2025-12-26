
import { GameState, Member, ScheduleAction, ActionResult, ScheduleCategory, BandState, Role, BandStats, Song } from '../types';
import { ACTION_TO_CATEGORY, SCHEDULE_COSTS } from '../constants';
import { TAG_MODIFIERS } from './tags_system';
import { calculateBandStats } from './stats_system';

export interface ActionLog {
  action: ScheduleAction;
  result: ActionResult;
  details: string[];
  flavorText?: string;
  memberId?: string;
  date?: string;
}

const STAT_LABELS: Record<string, string> = {
  musicality: '乐感',
  technique: '技巧',
  stagePresence: '表现',
  creativity: '想象',
  mental: '心态',
  composing: '作曲',
  lyrics: '作词',
  arrangement: '编曲',
  design: '设计',
  fatigue: '疲劳',
  stress: '压力',
  affection: '羁绊'
};

const FLAVOR_DB: Record<string, { success: string[], great: string[], fail: string[] }> = {
    [ScheduleAction.InstrumentPractice]: {
        success: ["[NAME] 对着节拍器反复练习基本功。", "[NAME] 尝试了新的指法，感觉还不错。", "[NAME] 专注地打磨着每一个音符的颗粒感。"],
        great: ["[NAME] 突破了速度瓶颈，手指快得出现了残影！", "[NAME] 感觉乐器变成了身体的一部分，随心所欲！", "[NAME] 状态神勇，连续弹奏了一小时没有失误。"],
        fail: ["[NAME] 手指打结了，怎么练都不顺手。", "[NAME] 练着练着开始发呆，效率不高。", "[NAME] 琴弦突然断了，吓了一跳，中断了练习。"]
    },
    [ScheduleAction.VocalPractice]: {
        success: ["[NAME] 在练习气息控制。", "[NAME] 尝试拓宽音域，发声很稳。", "[NAME] 对着镜子练习演唱时的表情管理。"],
        great: ["[NAME] 唱出了令人起鸡皮疙瘩的高音！", "[NAME] 找到了共鸣的感觉，声音穿透力极强。", "隔壁的邻居都忍不住为 [NAME] 的歌声鼓掌。"],
        fail: ["[NAME] 嗓子有点哑，完全唱不上去。", "[NAME] 总是跑调，越练越烦躁。", "[NAME] 喝水呛到了，咳了半天。"]
    },
    [ScheduleAction.PhysicalTraining]: {
        success: ["[NAME] 完成了5公里跑，气喘吁吁。", "[NAME] 正在做核心力量训练，表情痛苦但坚持着。", "[NAME] 感觉体力有所增强，Live能撑更久了。"],
        great: ["[NAME] 状态神勇，跑完步还能做50个俯卧撑！", "[NAME] 感觉身体轻盈，今天的状态绝佳。", "肌肉在燃烧！[NAME] 享受着挥洒汗水的快感。"],
        fail: ["[NAME] 跑了两步就岔气了。", "[NAME] 偷懒躲在公园长椅上玩手机。", "[NAME] 差点在跑步机上摔倒。"]
    },
    [ScheduleAction.ImageTraining]: {
        success: ["[NAME] 闭上眼睛，在脑海中模拟完美的演出。", "[NAME] 对着空气练习指法，意念合一。", "[NAME] 听着原曲，仔细拆解每一个细节。"],
        great: ["[NAME] 仿佛进入了‘心流’状态，虽然没动手但收获巨大。", "[NAME] 在脑海中构筑了完美的舞台，每一个音符都清晰可见。", "灵光一闪！解开了困扰已久的技术难题。"],
        fail: ["[NAME] 想着想着就睡着了...", "[NAME] 脑子里全是午饭吃什么，完全无法集中。", "[NAME] 越想越乱，反而变得焦虑了。"]
    }
};

const calculateGrowth = (current: number, increment: number, multiplier: number, softCap: number = 100): number => {
  if (increment <= 0) return increment;
  const resistance = Math.max(1, current / softCap); 
  const val = (increment * multiplier) / Math.pow(resistance, 0.8);
  return Number(val.toFixed(1));
};

const getFlavorText = (action: ScheduleAction, member: Member, result: ActionResult): string => {
    const entry = FLAVOR_DB[action as string];
    if (entry) {
        let list = entry.success;
        if (result === ActionResult.GreatSuccess) list = entry.great;
        if (result === ActionResult.Failure) list = entry.fail;
        if (list.length > 0) return list[Math.floor(Math.random() * list.length)].replace(/\[NAME\]/g, member.name);
    }
    if (result !== ActionResult.Failure) return `${member.name} 全力以赴地完成了任务！`;
    return `${member.name} 似乎不在状态。`;
};

export const processTurn = (state: GameState): { newState: GameState; actionLogs: ActionLog[] } => {
  let moneyDelta = 0;
  let fansDelta = 0;
  let currentMembers = [...state.members];
  const actionLogs: ActionLog[] = [];
  
  let chemistryDelta = 0;
  let actionCounts = { ...state.actionCounts };
  
  // Passive Fan Growth based on Topic & Aura
  const appealFactor = (state.teamStats.aura || 0) + (state.teamStats.topic || 0); 
  const popularityFactor = state.fans * 0.015;
  const passiveFans = Math.floor((appealFactor + popularityFactor) * (0.5 + Math.random() * 0.5)); 
  
  if (passiveFans > 0 && state.fans > 100) { 
      fansDelta += passiveFans;
      actionLogs.push({
          action: '口碑传播' as any,
          result: ActionResult.Success,
          details: [`自然吸粉 +${passiveFans}`],
          flavorText: "关于乐队的讨论度在悄悄上升。",
          date: "Weekly Bonus"
      });
  }

  // --- SKILL CHECKS ---
  const hasPass2 = state.unlockedSkills.includes('pass_2'); // "Street Performance Boost"
  const hasTech8 = state.unlockedSkills.includes('tech_8'); // "Muse": Creation boost
  const hasTech9 = state.unlockedSkills.includes('tech_9'); // "Rhythm in Blood": Practice cost down
  const hasTech10 = state.unlockedSkills.includes('tech_10'); // "Surpassing Legends": Stat cap break
  
  const statSoftCap = hasTech10 ? 120 : 100;

  // --- CAPTAIN COMMAND EFFECT ---
  let globalGrowthMult = 1.0;
  let globalStressMult = 1.0;
  let globalFatigueMult = 1.0;
  let globalAffectionBonus = 0;

  if (state.bandState === BandState.Serious) {
      globalGrowthMult = 1.25;
      globalStressMult = 1.6;
      globalFatigueMult = 1.6;
  } else if (state.bandState === BandState.Relaxed) {
      globalGrowthMult = 0.7;
      globalStressMult = 0.4;
      globalFatigueMult = 0.4;
      globalAffectionBonus = 3;
      chemistryDelta += 1.5;
  }

  let currentProject = state.currentProject ? { ...state.currentProject } : null;
  let songs = [...state.songs];

  for (let i = 0; i < state.weeklySchedule.length; i++) {
    const action = state.weeklySchedule[i];

    if (!action) {
        const restBonus = state.bandState === BandState.Relaxed ? 1.5 : 1.0;
        currentMembers = currentMembers.map(m => ({
            ...m,
            fatigue: Math.max(0, m.fatigue - 45 * restBonus), 
            stress: Math.max(0, m.stress - 30 * restBonus)
        }));
        actionLogs.push({ action: '休息' as any, result: ActionResult.Success, details: ['全员休息，大幅恢复了状态。'], flavorText: '大家度过了无所事事的一天。' });
        continue;
    }

    actionCounts[action] = (actionCounts[action] || 0) + 1;

    let successThreshold = 0.2; // Base fail rate
    
    // Calculate global mods from tags for success rate
    currentMembers.forEach(m => {
       m.tags.forEach(t => {
           if (TAG_MODIFIERS[t]?.successRate) {
               successThreshold += (TAG_MODIFIERS[t]!.successRate! / 100);
           }
       });
    });
    successThreshold = Math.max(0.05, Math.min(0.5, successThreshold));

    const roll = Math.random();
    const res = roll > 0.9 ? ActionResult.GreatSuccess : (roll < successThreshold ? ActionResult.Failure : ActionResult.Success); 
    const actionMultiplier = (res === ActionResult.GreatSuccess ? 1.5 : (res === ActionResult.Failure ? 0.3 : 1.0)) * globalGrowthMult; 

    const currentLog: ActionLog = { 
        action, 
        result: res, 
        details: [],
        date: `Day ${i + 1}`
    };
    
    let actionMoney = 0;
    let actionFans = 0;
    let songProgress = 0;
    let songQualityBoost = 0;

    const cost = SCHEDULE_COSTS[action] || 0;
    if (cost > 0) {
        actionMoney -= cost;
    }

    let activeMemberForFlavor: any = null; 
    let highestRelevantStat = -1;
    
    const statSum: Record<string, number> = {};

    // --- Apply Skill Effects on Action Type ---
    
    // Tech 8: Songwriting Boost
    let creationBonus = 1.0;
    if (hasTech8 && [ScheduleAction.Songwriting, ScheduleAction.DemoProduction, ScheduleAction.LyricsPolishing, ScheduleAction.ComposeJam].includes(action)) {
        creationBonus = 1.2;
    }

    // Tech 9: Practice Fatigue Reduction
    const techActions = [
        ScheduleAction.InstrumentPractice, ScheduleAction.VocalPractice, ScheduleAction.InstrumentLesson, 
        ScheduleAction.BandEnsemble, ScheduleAction.BandRehearsal, ScheduleAction.SelfRecording, 
        ScheduleAction.ImageTraining, ScheduleAction.RentStudio
    ];
    let practiceFatigueMult = 1.0;
    if (hasTech9 && techActions.includes(action)) {
        practiceFatigueMult = 0.8;
    }

    currentMembers = currentMembers.map(m => {
      let stats = { mus: 0, tec: 0, sta: 0, cre: 0, men: 0, fat: 0, str: 0, cmp: 0, lyr: 0, arr: 0, dsg: 0 };
      
      let tagGrowthMult = 1.0;
      let tagStressMult = 1.0;
      let tagFatigueMult = 1.0;

      m.tags.forEach(tag => {
          const mod = TAG_MODIFIERS[tag];
          if (mod) {
              if (mod.growthMult) tagGrowthMult *= mod.growthMult;
              if (mod.stressMult) tagStressMult *= mod.stressMult;
              if (mod.fatigueMult) tagFatigueMult *= mod.fatigueMult;
              if (mod.money) actionMoney += mod.money; 
              if (mod.fans) actionFans += mod.fans; 
              
              if (mod.statsBonus) {
                  if (mod.statsBonus.musicality) stats.mus += mod.statsBonus.musicality * 0.5; // Nerfed tag bonus slightly
                  if (mod.statsBonus.technique) stats.tec += mod.statsBonus.technique * 0.5;
                  if (mod.statsBonus.stagePresence) stats.sta += mod.statsBonus.stagePresence * 0.5;
                  if (mod.statsBonus.creativity) stats.cre += mod.statsBonus.creativity * 0.5;
                  if (mod.statsBonus.mental) stats.men += mod.statsBonus.mental * 0.5;
                  if (mod.statsBonus.composing) stats.cmp += mod.statsBonus.composing * 0.5;
                  if (mod.statsBonus.lyrics) stats.lyr += mod.statsBonus.lyrics * 0.5;
                  if (mod.statsBonus.arrangement) stats.arr += mod.statsBonus.arrangement * 0.5;
                  if (mod.statsBonus.design) stats.dsg += mod.statsBonus.design * 0.5;
                  if (mod.statsBonus.affection) m.affection = Math.min(100, m.affection + mod.statsBonus.affection);
              }
          }
      });

      if (m.tags.includes('社恐') && [ScheduleCategory.Promotion].includes(ACTION_TO_CATEGORY[action])) {
          tagStressMult *= 1.5;
          tagGrowthMult *= 0.5; 
      }

      // --- STAT LOGIC (REBALANCED FOR 52 WEEKS) ---
      // General nerf: Most growth values reduced by ~50-60%
      switch(action) {
        // --- SOLO / BASIC ---
        case ScheduleAction.InstrumentPractice: 
          stats.tec += 0.6; stats.fat += 5; stats.str += 3; break; 
        case ScheduleAction.VocalPractice:
          stats.mus += 0.6; stats.fat += 5; stats.str += 3; break; 
        case ScheduleAction.SoloExpression:
            stats.sta += 0.6; stats.fat += 5; stats.str += 3; break; 
        case ScheduleAction.SelfRecording:
            stats.tec += 0.4; stats.arr += 0.4; stats.str += 5; stats.fat += 5; break; 
        case ScheduleAction.PhysicalTraining: 
            stats.sta += 0.5; stats.men += 0.4; stats.fat += 15; stats.str -= 5; break;
        case ScheduleAction.ImageTraining: 
            stats.tec += 0.3; stats.mus += 0.2; stats.men += 0.2; stats.fat += 2; break;

        // --- STUDY ---
        case ScheduleAction.ObservationNote: 
            stats.cre += 0.8; stats.lyr += 0.2; stats.fat += 5; break; 
        case ScheduleAction.MusicTheory:
            stats.cmp += 0.6; stats.mus += 0.2; stats.fat += 5; stats.str += 2; break; 
        case ScheduleAction.LyricsWorkshop:
            stats.lyr += 0.6; stats.cre += 0.2; stats.fat += 5; break;
        case ScheduleAction.ListenAnalysis:
            stats.arr += 0.6; stats.mus += 0.2; stats.fat += 5; break;
        case ScheduleAction.DesignWork:
            stats.dsg += 0.6; stats.cre += 0.2; stats.fat += 5; 
            if (currentProject) songQualityBoost += m.design * 0.02 * actionMultiplier * creationBonus; 
            break;
        case ScheduleAction.LiveHouseStudy:
            stats.mus += 0.5; stats.sta += 0.5; stats.fat += 5; break; 
        case ScheduleAction.VocalLesson:
            stats.mus += 1.2; stats.tec += 0.5; stats.fat += 10; stats.str += 5; break;
        case ScheduleAction.InstrumentLesson:
            stats.tec += 1.2; stats.mus += 0.5; stats.fat += 10; stats.str += 5; break;

        // --- BAND ---
        case ScheduleAction.BandEnsemble: 
          stats.arr += 0.2; stats.tec += 0.1; stats.mus += 0.1; stats.fat += 8; stats.str += 5; 
          chemistryDelta += 0.4 * actionMultiplier; 
          break;
        case ScheduleAction.BandRehearsal: 
          stats.tec += 0.2; stats.sta += 0.2; stats.fat += 10; stats.str += 8; 
          chemistryDelta += 0.6 * actionMultiplier; 
          break;
        case ScheduleAction.MeetingReview: 
            stats.tec += 0.2; stats.str += 10; stats.fat += 5;
            chemistryDelta += 1.0 * actionMultiplier; 
            break;
        case ScheduleAction.AcousticSession: 
            stats.mus += 0.4; stats.arr += 0.3; stats.fat += 5; stats.str -= 5;
            chemistryDelta += 0.5 * actionMultiplier;
            break;
        case ScheduleAction.RentStudio:
            stats.tec += 0.4; stats.mus += 0.4; stats.arr += 0.2; stats.fat += 15; stats.str += 10;
            chemistryDelta += 1.2 * actionMultiplier;
            if (currentProject) songQualityBoost += 3 * actionMultiplier * creationBonus;
            break;
        case ScheduleAction.TrainingCamp:
            stats.tec += 0.7; stats.mus += 0.7; stats.sta += 0.7; stats.fat += 25; stats.str -= 10;
            m.affection = Math.min(100, m.affection + 5);
            chemistryDelta += 1.5 * actionMultiplier;
            break;

        // --- CREATION ACTIONS ---
        case ScheduleAction.Songwriting:
          stats.cre += 0.3; stats.cmp += 0.2; stats.lyr += 0.2; stats.fat += 8; stats.str += 8; 
          songProgress += (m.creativity * 0.1 + m.composing * 0.06 + m.lyrics * 0.06 + m.arrangement * 0.04) * actionMultiplier * creationBonus;
          break;
        case ScheduleAction.DemoProduction:
            stats.arr += 0.6; stats.cmp += 0.2; stats.fat += 10; stats.str += 5;
            if (currentProject) songProgress += (m.arrangement * 0.12 + m.composing * 0.04) * actionMultiplier * creationBonus;
            break;
        case ScheduleAction.LyricsPolishing:
            stats.lyr += 0.6; stats.men += 0.2; stats.fat += 5; stats.str += 5;
            if (currentProject) {
                songProgress += m.lyrics * 0.06 * actionMultiplier * creationBonus;
                songQualityBoost += m.lyrics * 0.04 * actionMultiplier * creationBonus;
            }
            break;
        case ScheduleAction.ComposeJam:
            stats.cmp += 0.3; stats.arr += 0.3; 
            stats.cre += 0.6; 
            stats.fat += 12; stats.str += 5;
            chemistryDelta += 0.6 * actionMultiplier;
            if (currentProject) {
                songQualityBoost += (m.composing * 0.04 + m.arrangement * 0.04) * actionMultiplier * creationBonus;
            }
            break;
        case ScheduleAction.Recording:
          stats.tec += 0.2; stats.fat += 15; stats.str += 15; 
          if (currentProject) {
              songQualityBoost += (m.technique * 0.06 + m.arrangement * 0.1) * actionMultiplier * creationBonus;
              songProgress += 8 * actionMultiplier * creationBonus; 
          }
          break;
        case ScheduleAction.Mastering:
            stats.tec += 0.2; stats.fat += 10;
            if (currentProject) {
                songQualityBoost += 5 * actionMultiplier * creationBonus; 
            }
            break;

        // --- PROMOTION ---
        case ScheduleAction.StreetLive: 
          let streetFans = 120 * actionMultiplier;
          let streetMoney = 500;
          if (hasPass2) {
              streetFans *= 1.3;
              streetMoney += 200;
          }
          actionFans += streetFans; 
          actionMoney += streetMoney; 
          stats.sta += 0.6; 
          stats.fat += 15; stats.str += 10; 
          chemistryDelta += 0.3 * actionMultiplier;
          break;
        case ScheduleAction.FlyerDistribution:
            actionFans += 40 * actionMultiplier;
            actionMoney += 200; stats.men += 0.1; stats.fat += 10; stats.str += 5; break; 
        case ScheduleAction.SocialMediaLive:
            actionFans += 80 * actionMultiplier;
            stats.sta += 0.1; stats.fat += 5; stats.str += 5; break;
        case ScheduleAction.LiveStream:
            actionFans += 400 * actionMultiplier;
            stats.sta += 0.2; stats.fat += 15; stats.str += 20; break;
        case ScheduleAction.PhotoSession:
            actionFans += 500 * actionMultiplier;
            stats.sta += 0.4; stats.fat += 20; stats.str += 15; break;
        case ScheduleAction.MusicVideoShoot:
          actionFans += 2500 * actionMultiplier;
          stats.sta += 0.2; stats.fat += 25; stats.str += 20; break; 
        case ScheduleAction.CharityLive:
            actionFans += 200 * actionMultiplier;
            stats.men += 0.2; stats.fat += 15; stats.str -= 5;
            chemistryDelta += 0.3 * actionMultiplier;
            break;
        case ScheduleAction.RadioInterview:
            actionFans += 250 * actionMultiplier;
            stats.men += 0.1; stats.fat += 5; break;

        // --- LEISURE ---
        case ScheduleAction.SugarIntake:
            stats.men += 0.5; stats.str -= 20; stats.fat -= 10; break; 
        case ScheduleAction.TeaTime: 
          stats.fat -= 50; stats.str -= 60; m.affection = Math.min(100, m.affection + 4); 
          chemistryDelta += 0.4 * actionMultiplier; 
          break;
        case ScheduleAction.GameCenter:
            stats.fat -= 30; stats.str -= 50; m.affection = Math.min(100, m.affection + 3);
            chemistryDelta += 0.5 * actionMultiplier;
            break;
        case ScheduleAction.GroupTrip:
            stats.fat -= 80; stats.str -= 80; m.affection = Math.min(100, m.affection + 10);
            chemistryDelta += 1.5 * actionMultiplier; break;
        case ScheduleAction.StyleMakeover:
            stats.dsg += 1.0; stats.sta += 0.5; stats.str -= 10; break; 
        case ScheduleAction.EquipmentCare:
             stats.tec += 0.1; stats.fat += 5; break;
        case ScheduleAction.PartTimeJob:
            actionMoney += 1500; stats.fat += 10; stats.str += 8; break; 

        // --- SPECIAL ---
        case ScheduleAction.SchoolFestival:
            actionFans += 3000 * actionMultiplier;
            stats.sta += 1.0; stats.fat += 30; m.affection = Math.min(100, m.affection + 8);
            chemistryDelta += 1.0 * actionMultiplier;
            break;
        case ScheduleAction.FireworksDate:
            stats.fat -= 40; stats.str -= 60; m.affection = Math.min(100, m.affection + 20);
            chemistryDelta += 0.8 * actionMultiplier;
            break;
        case ScheduleAction.ThemePark:
            stats.fat -= 20; stats.str -= 80; stats.cre += 0.5; m.affection = Math.min(100, m.affection + 15);
            chemistryDelta += 1.0 * actionMultiplier;
            break;
        case ScheduleAction.ChristmasParty:
            stats.fat -= 50; stats.str -= 50; m.affection = Math.min(100, m.affection + 10);
            stats.men += 1.0;
            break;
        case ScheduleAction.GraduationTrip:
            stats.fat -= 90; stats.str -= 90; m.affection = Math.min(100, m.affection + 30);
            stats.men += 2.0; stats.cre += 1.0;
            chemistryDelta += 2.0 * actionMultiplier;
            break;

        default:
          stats.mus += 0.1; break;
      }

      let relevantStatVal = 0;
      if (action === ScheduleAction.Songwriting) relevantStatVal = m.composing;
      else if (action === ScheduleAction.DesignWork) relevantStatVal = m.design;
      else if (action === ScheduleAction.StreetLive) relevantStatVal = m.stagePresence;
      else relevantStatVal = m.technique;
      relevantStatVal += Math.random() * 20;
      if (relevantStatVal > highestRelevantStat) {
          highestRelevantStat = relevantStatVal;
          activeMemberForFlavor = m;
      }

      const musG = calculateGrowth(m.musicality, stats.mus, actionMultiplier * tagGrowthMult, statSoftCap);
      const tecG = calculateGrowth(m.technique, stats.tec, actionMultiplier * tagGrowthMult, statSoftCap);
      const staG = calculateGrowth(m.stagePresence, stats.sta, actionMultiplier * tagGrowthMult, statSoftCap);
      const creG = calculateGrowth(m.creativity, stats.cre, actionMultiplier * tagGrowthMult, statSoftCap);
      const menG = calculateGrowth(m.mental, stats.men, actionMultiplier * tagGrowthMult, statSoftCap);
      const cmpG = calculateGrowth(m.composing, stats.cmp, actionMultiplier * tagGrowthMult, statSoftCap);
      const lyrG = calculateGrowth(m.lyrics, stats.lyr, actionMultiplier * tagGrowthMult, statSoftCap);
      const arrG = calculateGrowth(m.arrangement, stats.arr, actionMultiplier * tagGrowthMult, statSoftCap);
      const dsgG = calculateGrowth(m.design, stats.dsg, actionMultiplier * tagGrowthMult, statSoftCap);

      const fA = Math.floor(stats.fat * tagFatigueMult * globalFatigueMult * practiceFatigueMult);
      const sA = Math.floor(stats.str * tagStressMult * globalStressMult);

      if (musG > 0) statSum['musicality'] = (statSum['musicality'] || 0) + musG;
      if (tecG > 0) statSum['technique'] = (statSum['technique'] || 0) + tecG;
      if (staG > 0) statSum['stagePresence'] = (statSum['stagePresence'] || 0) + staG;
      if (creG > 0) statSum['creativity'] = (statSum['creativity'] || 0) + creG;
      if (menG > 0) statSum['mental'] = (statSum['mental'] || 0) + menG;
      if (cmpG > 0) statSum['composing'] = (statSum['composing'] || 0) + cmpG;
      if (lyrG > 0) statSum['lyrics'] = (statSum['lyrics'] || 0) + lyrG;
      if (arrG > 0) statSum['arrangement'] = (statSum['arrangement'] || 0) + arrG;
      if (dsgG > 0) statSum['design'] = (statSum['design'] || 0) + dsgG;
      if (fA !== 0) statSum['fatigue'] = (statSum['fatigue'] || 0) + fA;
      if (sA !== 0) statSum['stress'] = (statSum['stress'] || 0) + sA;

      return {
        ...m,
        musicality: m.musicality + musG,
        technique: m.technique + tecG,
        stagePresence: m.stagePresence + staG,
        creativity: m.creativity + creG,
        mental: m.mental + menG,
        composing: m.composing + cmpG,
        lyrics: m.lyrics + lyrG,
        arrangement: m.arrangement + arrG,
        design: m.design + dsgG,
        fatigue: Math.max(0, Math.min(100, m.fatigue + fA)), 
        stress: Math.max(0, Math.min(100, m.stress + sA)),
        affection: Math.min(100, m.affection + globalAffectionBonus),
        interactionsLeft: 2 
      };
    });

    if (activeMemberForFlavor) {
        currentLog.flavorText = getFlavorText(action, activeMemberForFlavor, res);
        currentLog.memberId = (activeMemberForFlavor as Member).id;
    }

    const statDetails: string[] = [];
    Object.entries(statSum).forEach(([key, val]) => {
        if (Math.abs(val) >= 0.1 && key !== 'fatigue' && key !== 'stress') { 
            const label = STAT_LABELS[key] || key;
            statDetails.push(`${label}+${val.toFixed(1)}`);
        }
    });
    
    if ((statSum['fatigue'] || 0) !== 0) statDetails.push(`${STAT_LABELS['fatigue']}${statSum['fatigue'] > 0 ? '+' : ''}${Math.floor(statSum['fatigue'])}`);
    if ((statSum['stress'] || 0) !== 0) statDetails.push(`${STAT_LABELS['stress']}${statSum['stress'] > 0 ? '+' : ''}${Math.floor(statSum['stress'])}`);

    if (statDetails.length > 0) {
        for (let j = 0; j < statDetails.length; j += 3) {
            currentLog.details.push(statDetails.slice(j, j + 3).join('  '));
        }
    }

    if (songProgress > 0 || songQualityBoost > 0) {
        if (!currentProject) {
             currentLog.details.push("开启了新曲创作！");
        } else {
            if (songProgress > 0) {
                currentProject.completeness = Math.min(100, currentProject.completeness + songProgress);
                currentLog.details.push(`新曲完成度 +${Math.floor(songProgress)}%`);
            }
            if (songQualityBoost > 0) {
                currentProject.quality = currentProject.quality + songQualityBoost / 4; 
                currentLog.details.push(`新曲品质 +${songQualityBoost.toFixed(1)}`);
            }
        }
    }
    
    if (actionMoney !== 0) currentLog.details.push(`资金 ${actionMoney > 0 ? '+' : ''}${actionMoney}`);
    if (actionFans !== 0) currentLog.details.push(`粉丝 ${actionFans > 0 ? '+' : ''}${actionFans}`);
    if (chemistryDelta > 0) currentLog.details.push(`默契 +${chemistryDelta.toFixed(1)}`);

    if (res === ActionResult.GreatSuccess) {
        currentLog.details.push("✨ PP +1");
    }

    moneyDelta += actionMoney;
    fansDelta += actionFans;
    actionLogs.push(currentLog);
  }

  // UPDATE STATE WITH NEW STATS AND CHEMISTRY
  const currentChemistry = state.rawChemistry || 0;
  const newChemistry = currentChemistry + chemistryDelta;

  const newState = {
    ...state,
    currentWeek: state.currentWeek + 1,
    money: state.money + moneyDelta,
    fans: Math.max(0, state.fans + fansDelta),
    members: currentMembers,
    currentProject: currentProject,
    songs: songs,
    actionCounts: actionCounts,
    rawChemistry: Number(newChemistry.toFixed(1)),
    teamStats: calculateBandStats(currentMembers, songs, newChemistry, Math.max(0, state.fans + fansDelta), state.unlockedSkills)
  };

  return { newState, actionLogs };
};
