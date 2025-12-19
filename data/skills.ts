
import { SkillNode, InteractionType, ScheduleAction, BandState } from '../types';

export const SKILL_TREE: SkillNode[] = [
    // ==========================================================================================
    // 1. KIZUNA (Friendship - Rose)
    // Theme: Bond, Mental Health, Recovery
    // ==========================================================================================
    {
        id: 'friend_1', name: '可靠的前辈', description: '作为队长的自觉。全员基础压力增加速度减少 10%。',
        cost: 0, x: 0, y: 0, parents: [], category: 'friendship',
        effect: { statMult: { stress: 0.9 }, passive: 'stress_down_1' }
    },
    {
        id: 'friend_2', name: '交换日记', description: '虽然有点老土，但能有效提升好感度。全员羁绊获取 +10%。',
        cost: 5, x: 0, y: 1, parents: ['friend_1'], category: 'friendship',
        effect: { statMult: { affection: 1.1 } }
    },
    {
        id: 'friend_3', name: '深夜谈心券', description: '解锁互动：【深夜长谈】。深入了解彼此的内心，大幅缓解压力。',
        cost: 10, x: 0, y: 2, parents: ['friend_2'], category: 'friendship',
        effect: { unlockInteraction: [InteractionType.DeepTalk] }
    },
    {
        id: 'friend_4', name: '轻飘飘时间', description: '解锁状态：【轻松模式】。偶尔偷个懒，压力大幅降低，羁绊提升。',
        cost: 15, x: 0, y: 3, parents: ['friend_3'], category: 'friendship',
        effect: { unlockState: BandState.Relaxed }
    },
    {
        id: 'friend_5', name: '茶话会', description: '茶话会、聚餐等休闲活动的效果提升 20%。',
        cost: 20, x: 0, y: 4, parents: ['friend_4'], category: 'friendship',
        effect: { passive: 'recovery_boost' }
    },
    {
        id: 'friend_6', name: '秘密暗号', description: '只有队员能懂的梗。乐队【默契度】自然增长速度大幅提升 (+20%)。',
        cost: 25, x: 0, y: 5, parents: ['friend_5'], category: 'friendship',
        effect: { passive: 'chemistry_boost' }
    },
    {
        id: 'friend_7', name: '羁绊之盾', description: '全员心态成长速度 +20%，更不容易崩溃。',
        cost: 35, x: 0, y: 6, parents: ['friend_6'], category: 'friendship',
        effect: { statMult: { mental: 1.2 } }
    },
    {
        id: 'friend_8', name: '星星的鼓动', description: '只要在一起就是无敌的。全员【稳定度】上限大幅提升。',
        cost: 50, x: 0, y: 7, parents: ['friend_7'], category: 'friendship',
        effect: { passive: 'stability_max' }
    },

    // ==========================================================================================
    // 2. KIRAMEKI (Passion - Amber)
    // Theme: Appeal, Visuals, Fans
    // ==========================================================================================
    {
        id: 'pass_1', name: '镜前特训', description: '表情管理也是演出的一部分。全员【表现力】成长速度 +10%。',
        cost: 5, x: 0, y: 0, parents: [], category: 'passion',
        effect: { statMult: { stagePresence: 1.1 } }
    },
    {
        id: 'pass_2', name: '街头许可', description: '解锁日程：【街头路演】。克服羞耻心，站在街头积累粉丝吧！',
        cost: 10, x: 0, y: 1, parents: ['pass_1'], category: 'passion',
        effect: { unlockAction: [ScheduleAction.StreetLive] }
    },
    {
        id: 'pass_3', name: '魅力全开', description: '演出的魅力值 (Appeal) 基础加成 +10%。',
        cost: 15, x: 0, y: 2, parents: ['pass_2'], category: 'passion',
        effect: { passive: 'appeal_up' }
    },
    {
        id: 'pass_4', name: '20年代的新潮流', description: '解锁日程：【直播互动】。',
        cost: 20, x: 0, y: 3, parents: ['pass_3'], category: 'passion',
        effect: { unlockAction: [ScheduleAction.SocialMediaLive, ScheduleAction.LiveStream] }
    },
    {
        id: 'pass_5', name: '绝对C位', description: '演出时获得的热度 (Hype/Voltage) 提升。',
        cost: 25, x: 0, y: 4, parents: ['pass_4'], category: 'passion',
        effect: { passive: 'hype_boost' }
    },
    {
        id: 'pass_6', name: '所有出镜的机会', description: '解锁日程：【写真拍摄】。用视觉冲击征服观众！',
        cost: 30, x: 0, y: 5, parents: ['pass_5'], category: 'passion',
        effect: { unlockAction: [ScheduleAction.PhotoSession] }
    },
    {
        id: 'pass_7', name: '炎上对策', description: '公关能力提升。SNS 负面事件的影响减半。',
        cost: 40, x: 0, y: 6, parents: ['pass_6'], category: 'passion',
        effect: { passive: 'scandal_resist' }
    },
    {
        id: 'pass_8', name: '一番星', description: '无论在哪里都是焦点。所有途径获得的粉丝数 +20%。',
        cost: 60, x: 0, y: 7, parents: ['pass_7'], category: 'passion',
        effect: { passive: 'fan_gain_max' }
    },

    // ==========================================================================================
    // 3. OTO (Technique - Sky)
    // Theme: Skill, Song Quality, Serious
    // ==========================================================================================
    {
        id: 'tech_1', name: '基础练习', description: '枯燥但必要。全员【技巧】成长速度 +10%。',
        cost: 5, x: 0, y: 0, parents: [], category: 'technique',
        effect: { statMult: { technique: 1.1 } }
    },
    {
        id: 'tech_2', name: '这可不是过家家！', description: '解锁状态：【严肃模式】。效率至上！练习收益提升，但压力增加。',
        cost: 10, x: 0, y: 1, parents: ['tech_1'], category: 'technique',
        effect: { unlockState: BandState.Serious }
    },
    {
        id: 'tech_3', name: 'Studio会员', description: '解锁日程：【租用录音棚】。在专业环境下练习，效率倍增。',
        cost: 15, x: 0, y: 2, parents: ['tech_2'], category: 'technique',
        effect: { unlockAction: [ScheduleAction.RentStudio] }
    },
    {
        id: 'tech_4', name: '无时无刻的训练', description: '全员【乐感】成长速度 +20%。',
        cost: 20, x: 0, y: 3, parents: ['tech_3'], category: 'technique',
        effect: { statMult: { musicality: 1.2 } }
    },
    {
        id: 'tech_5', name: '合宿企划', description: '解锁日程：【夏季合宿】。海边！烟花！全属性大幅提升的大事件。',
        cost: 30, x: 0, y: 4, parents: ['tech_4'], category: 'technique',
        effect: { unlockAction: [ScheduleAction.TrainingCamp] }
    },
    {
        id: 'tech_6', name: '我不需要“不纯粹”', description: '创作的歌曲【品质】基础值提升。',
        cost: 35, x: 0, y: 5, parents: ['tech_5'], category: 'technique',
        effect: { passive: 'quality_up' }
    },
    {
        id: 'tech_7', name: '超绝技巧', description: '演出中出现【Critical】（暴击）的概率大幅提升。',
        cost: 45, x: 0, y: 6, parents: ['tech_6'], category: 'technique',
        effect: { passive: 'crit_rate_up' }
    },
    {
        id: 'tech_8', name: '缪斯附体', description: '创作新歌时，更容易获得高完成度和高评价。',
        cost: 60, x: 0, y: 7, parents: ['tech_7'], category: 'technique',
        effect: { passive: 'songwriting_max' }
    },

    // ==========================================================================================
    // 4. PRODUCE (Commercial - Slate)
    // Theme: Money, Strategy, Media
    // ==========================================================================================
    {
        id: 'comm_1', name: '打工战士', description: '传授摸鱼技巧。兼职打工收益 +20%。',
        cost: 5, x: 0, y: 0, parents: [], category: 'commercial',
        effect: { passive: 'money_up' }
    },
    {
        id: 'comm_2', name: '精打细算', description: '所有日程的资金消耗减少 10%。',
        cost: 10, x: 0, y: 1, parents: ['comm_1'], category: 'commercial',
        effect: { passive: 'cost_down' }
    },
    {
        id: 'comm_3', name: '周边设计', description: '解锁日程：【周边设计】。把粉丝的热爱转化为活动资金。',
        cost: 15, x: 0, y: 2, parents: ['comm_2'], category: 'commercial',
        effect: { unlockAction: [ScheduleAction.DesignWork] }
    },
    {
        id: 'comm_4', name: '业界人脉', description: '解锁日程：【电台访谈】。接触主流媒体，提升知名度。',
        cost: 20, x: 0, y: 3, parents: ['comm_3'], category: 'commercial',
        effect: { unlockAction: [ScheduleAction.RadioInterview] }
    },
    {
        id: 'comm_5', name: '传单作战', description: '街头派发传单的效果倍增，更容易吸引路人。',
        cost: 25, x: 0, y: 4, parents: ['comm_4'], category: 'commercial',
        effect: { passive: 'promo_boost' }
    },
    {
        id: 'comm_6', name: '诸市巡礼', description: '演出获得的【资金】收益 +20%。',
        cost: 35, x: 0, y: 5, parents: ['comm_5'], category: 'commercial',
        effect: { passive: 'gig_money_up' }
    },
    {
        id: 'comm_7', name: '商业推手', description: '新歌发布时产生【Viral】的概率提升。',
        cost: 45, x: 0, y: 6, parents: ['comm_6'], category: 'commercial',
        effect: { passive: 'viral_chance_up' }
    },
    {
        id: 'comm_8', name: '事务所', description: '有了专业的经纪团队。每周自动获得少量资金赞助。',
        cost: 60, x: 0, y: 7, parents: ['comm_7'], category: 'commercial',
        effect: { passive: 'passive_income' }
    }
];
