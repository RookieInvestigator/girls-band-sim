
import { Member, BandStats } from '../types';

// --- EXPANDED TAG MODIFIERS (Individual Effects) ---
// Defines how tags affect the MEMBER'S personal growth during schedule actions.
export const TAG_MODIFIERS: Record<string, { 
    growthMult?: number;      // Stat growth multiplier
    stressMult?: number;      // Stress accumulation multiplier
    fatigueMult?: number;     // Fatigue accumulation multiplier
    successRate?: number;     // Success rate bonus (flat %)
    statsBonus?: Partial<Record<keyof Member, number>>; // Extra specific stat growth
    money?: number;           // Money gain/loss per action
    fans?: number;            // Fan gain per action (New!)
}> = {
    // === LEGENDARY / UR TAGS ===
    '作词天才': { growthMult: 1.2, statsBonus: { lyrics: 2.0, mental: -0.2 }, stressMult: 1.2 }, // High risk high return
    '绝对王者': { growthMult: 1.4, money: -200, stressMult: 1.6, successRate: 10 }, // Rich & talented but stressful
    '双重人格': { growthMult: 1.1, statsBonus: { stagePresence: 1.5, technique: 1.0, mental: -0.5 } }, // Unstable but explosive
    '领袖气质': { growthMult: 1.2, statsBonus: { affection: 1.0 }, stressMult: 0.8 }, // Buffs team bond
    '铁人': { fatigueMult: 0.4, growthMult: 1.1 }, // Barely gets tired
    '天然呆': { successRate: -10, growthMult: 1.5, stressMult: 0.5 }, // Prone to fail but learns fast
    '自由人': { growthMult: 1.4, statsBonus: { creativity: 2.0 }, successRate: -5, stressMult: 0.8 }, // Creative genius
    '凡人拟态': { growthMult: 1.3, successRate: 15, statsBonus: { technique: 0.5, arrangement: 0.5 } }, // High success (can do anything) but mimics others
    '叛逆者': { statsBonus: { technique: 0.5, stagePresence: 0.3 }, stressMult: 0.8, money: -100 }, // Skilled, chill, but spends money (drinks)

    // === NEW SPECIAL TAGS ===
    '和风': { statsBonus: { technique: 0.4, design: 0.4 }, fans: 15 },
    '吟游诗人': { fatigueMult: 0.7, statsBonus: { mental: 0.3 }, fans: 10 },
    '贵族': { money: 1000, stressMult: 1.8, statsBonus: { design: 0.5 } }, // High income but high stress
    '街头': { fans: 40, statsBonus: { stagePresence: 0.4 }, money: -50 }, // Good for hype, bad for money

    // === PERSONALITY / TRAIT TAGS ===
    '天才': { growthMult: 1.4, stressMult: 1.1, fatigueMult: 0.9 },
    '练习狂': { growthMult: 1.1, fatigueMult: 1.5, statsBonus: { technique: 0.3 } },
    '玻璃心': { stressMult: 1.8, growthMult: 0.8, statsBonus: { lyrics: 0.5 } }, // Good for emo lyrics
    '乐天派': { stressMult: 0.6, statsBonus: { mental: 0.3 } }, 
    '重力': { stressMult: 1.3, fatigueMult: 1.2, statsBonus: { affection: 0.5 } }, // Heavy love
    '社恐': { stressMult: 1.5, growthMult: 1.2, fans: -5 }, // Hard to gain public appeal
    '完美主义': { growthMult: 1.1, stressMult: 1.6, successRate: 5 },
    '体力怪物': { fatigueMult: 0.5, statsBonus: { stagePresence: 0.2 } },
    '大小姐': { money: -200, statsBonus: { design: 0.5 } }, // High maintenance
    '三无': { stressMult: 0.4, statsBonus: { mental: 0.5 }, fans: 5 }, // Cool factor
    '中二病': { growthMult: 1.1, statsBonus: { creativity: 0.5 }, stressMult: 0.9 },
    '吃货': { stressMult: 0.7, money: -100, fatigueMult: 0.9 }, 
    '网游废人': { fatigueMult: 1.3, statsBonus: { technique: 0.4, design: 0.2 } },
    '随性': { growthMult: 1.2, stressMult: 0.7, successRate: -10 },
    '视觉系': { statsBonus: { stagePresence: 0.4, design: 0.4 }, money: -50 },
    '辣妹': { stressMult: 0.8, statsBonus: { affection: 0.2, stagePresence: 0.2 } },
    '忠犬': { stressMult: 0.9, statsBonus: { affection: 0.5 } },
    '机器人': { stressMult: 0.1, growthMult: 1.1, statsBonus: { creativity: -0.5 } },
    '特摄厨': { statsBonus: { stagePresence: 0.3 }, fatigueMult: 0.9 },
    '佛系': { stressMult: 0.4, growthMult: 0.9, fatigueMult: 0.8 },
    '极道': { statsBonus: { stagePresence: 0.5 }, stressMult: 0.8 },
    '未来人': { statsBonus: { creativity: 0.5, arrangement: 0.3 }, fatigueMult: 0.9 },
    
    // === ROLE / BACKGROUND TAGS ===
    '前偶像': { statsBonus: { stagePresence: 0.5, affection: 0.2 }, fans: 30 },
    '网络歌手': { statsBonus: { technique: 0.3 }, fans: 50, stressMult: 1.1 },
    '文学少女': { statsBonus: { lyrics: 0.8, mental: 0.2 }, fatigueMult: 1.1 },
    '不良': { statsBonus: { stagePresence: 0.4, technique: 0.2 }, stressMult: 0.9 },
    '学霸': { growthMult: 1.3, statsBonus: { arrangement: 0.4 }, stressMult: 1.2 },
    '大姐姐': { statsBonus: { affection: 0.3, mental: 0.3 }, stressMult: 0.8 },
    '技术宅': { statsBonus: { arrangement: 0.6, technique: 0.3 }, fans: -10 },
    '电波': { statsBonus: { creativity: 0.7, lyrics: 0.4, mental: -0.1 } },
    '古典': { statsBonus: { technique: 0.5, musicality: 0.4, creativity: -0.2 } },
    '爵士': { statsBonus: { musicality: 0.6, creativity: 0.5 } },
    '模特': { statsBonus: { design: 0.6, stagePresence: 0.3 }, fans: 20 },
    '努力家': { growthMult: 1.2, fatigueMult: 1.2 },
    '凡人': { growthMult: 1.0, stressMult: 0.9 }, // Baseline stability
    '吉祥物': { statsBonus: { affection: 0.4 }, fans: 10 },
    '宅女': { fatigueMult: 1.2, statsBonus: { arrangement: 0.3 } },
    '破坏神': { statsBonus: { stagePresence: 0.5 }, money: -100 }, // Breaks things
    '器材党': { money: -300, statsBonus: { technique: 0.5 } },
    '反差萌': { fans: 15, statsBonus: { stagePresence: 0.2 } },
    '家里蹲': { stressMult: 1.5, growthMult: 1.1 }, // Stressful to go out
    '吐槽役': { statsBonus: { mental: 0.3 } },
    '冒失': { successRate: -15, growthMult: 1.2 }, // Learns from mistakes
    '神秘': { fans: 10, statsBonus: { creativity: 0.3 } },
    '傲娇': { statsBonus: { technique: 0.2, affection: -0.1 } },
    '毒舌': { statsBonus: { lyrics: 0.5, affection: -0.2 } },
    '前职业': { statsBonus: { technique: 0.4, stagePresence: 0.4 }, fans: 50 },
};

// --- EXPANDED TAG BAND MODIFIERS (Global Effects) ---
// Defines how tags affect the BAND'S overall stats (Performance, Stage, Bond, Work).
export const TAG_BAND_MODIFIERS: Record<string, Partial<BandStats>> = {
    // === LEGENDARY / UR TAGS ===
    '作词天才': { narrative: 1.5, melody: 1.1 },
    '绝对王者': { aura: 1.4, precision: 1.2, tone: 1.2 },
    '双重人格': { dynamics: 1.4, adaptation: 1.3, stability: 0.7 },
    '领袖气质': { synergy: 1.3, connection: 1.3 },
    '铁人': { rhythm: 1.2, stability: 1.2 },
    '天然呆': { adaptation: 0.8, interaction: 1.3 }, // Unpredictable but cute
    '自由人': { adaptation: 1.5, precision: 0.8 }, // Improvisation god
    '凡人拟态': { synergy: 1.4, precision: 1.3, tone: 1.1 }, // Perfectly blends in (High Synergy) and executes perfectly (High Precision)
    '叛逆者': { dynamics: 1.4, tone: 1.2, synergy: 0.9 }, // Explosive sound but hard to control

    // === NEW SPECIAL TAGS ===
    '和风': { visual: 1.25, tone: 1.2, technique: 1.1 },
    '吟游诗人': { narrative: 1.3, connection: 1.1 },
    '贵族': { visual: 1.3, aura: 1.3, connection: 0.8 },
    '街头': { interaction: 1.4, dynamics: 1.2, precision: 0.9 },

    // === PERSONALITY / TRAIT TAGS ===
    '天才': { melody: 1.2, narrative: 1.1, adaptation: 1.2 },
    '完美主义': { precision: 1.25, detail: 1.2, dynamics: 0.9, synergy: 0.9 },
    '社恐': { interaction: 0.7, detail: 1.15, precision: 1.15 },
    '元气': { interaction: 1.25, aura: 1.1, precision: 0.95 },
    '视觉系': { visual: 1.3, aura: 1.2 },
    '中二病': { narrative: 1.25, aura: 1.1, precision: 0.9 },
    '大小姐': { visual: 1.2, tone: 1.2, aura: 1.15 },
    '不良': { dynamics: 1.2, aura: 1.1, precision: 0.9 },
    '治愈': { connection: 1.2, synergy: 1.1 },
    '电波': { adaptation: 1.2, narrative: 1.2, interaction: 0.8 },
    '学霸': { precision: 1.2, detail: 1.2, rhythm: 1.1 },
    '体育系': { dynamics: 1.2, rhythm: 1.15 },
    '路人': { aura: 0.8, synergy: 1.2 }, // Good support
    '爵士': { adaptation: 1.2, rhythm: 1.1, tone: 1.1 },
    '前偶像': { interaction: 1.3, aura: 1.2, visual: 1.2 },
    '网络歌手': { topic: 1.3, melody: 1.1 },
    '古典': { technique: 1.2, tone: 1.2, adaptation: 0.8 },
    '文学少女': { narrative: 1.3 },
    '技术宅': { detail: 1.3 },
    '幕后': { detail: 1.2, aura: 0.8 },
    '怪人': { adaptation: 1.3, stability: 0.8 },
    '大姐头': { synergy: 1.1, dynamics: 1.1 },
    '重力': { narrative: 1.2, connection: 1.2 },
    '破坏神': { dynamics: 1.3, precision: 0.7, tone: 0.9 },
    '模特': { visual: 1.3, aura: 1.1 },
    '机器人': { precision: 1.3, rhythm: 1.3, interaction: 0.6 },
    '辣妹': { visual: 1.1, interaction: 1.2, topic: 1.1 },
    '特摄厨': { aura: 1.1, dynamics: 1.1 },
    '热血': { dynamics: 1.2 },
    '神秘': { topic: 1.2, aura: 1.1 },
    '傲娇': { interaction: 0.9, connection: 0.9, narrative: 1.1 },
    '复仇': { dynamics: 1.2, precision: 1.1, stability: 0.9 },
    '鞋式摇滚': { tone: 1.3, interaction: 0.6 },
    '多才多艺': { adaptation: 1.2, technique: 1.1 },
    '未来人': { adaptation: 1.3, detail: 1.2 },
    '器材党': { tone: 1.25 },
    '家里蹲': { connection: 0.9, detail: 1.1 },
    '冒失': { precision: 0.8, interaction: 1.1 },
    '混血': { visual: 1.1, aura: 1.1 },
    '毒舌': { narrative: 1.2, synergy: 0.8 },
    '前职业': { precision: 1.3, aura: 1.2 }
};
