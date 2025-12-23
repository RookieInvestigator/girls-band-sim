
import { SkillNode, InteractionType, ScheduleAction, BandState } from '../types';

export const SKILL_TREE: SkillNode[] = [
    // ==========================================================================================
    // 1. KIZUNA (Friendship - Rose)
    // Theme: Bond, Mental Health, Recovery
    // ==========================================================================================
    {
        id: 'friend_1', name: '别想一个人扛', description: '作为队长的自觉。全员基础压力增加速度减少 10%。',
        cost: 0, x: 0, y: 0, parents: [], category: 'friendship',
        effect: { statMult: { stress: 0.9 }, passive: 'stress_down_1' }
    },
    {
        id: 'friend_2', name: '把真心话交出来', description: '不仅是交换日记，更是交换灵魂。全员羁绊获取 +10%。',
        cost: 5, x: 0, y: 1, parents: ['friend_1'], category: 'friendship',
        effect: { statMult: { affection: 1.1 } }
    },
    {
        id: 'friend_3', name: '今晚不准睡', description: '解锁互动：【深夜长谈】。深入挖掘彼此的内心，大幅缓解压力。',
        cost: 10, x: 0, y: 2, parents: ['friend_2'], category: 'friendship',
        effect: { unlockInteraction: [InteractionType.DeepTalk] }
    },
    {
        id: 'friend_4', name: '偶尔的逃跑是被允许的', description: '解锁状态：【轻松模式】。暂停脚步是为了走得更远，压力大幅降低。',
        cost: 15, x: 0, y: 3, parents: ['friend_3'], category: 'friendship',
        effect: { unlockState: BandState.Relaxed }
    },
    {
        id: 'friend_5', name: '甜点即正义', description: '茶话会、聚餐等休闲活动的效果提升 20%。',
        cost: 20, x: 0, y: 4, parents: ['friend_4'], category: 'friendship',
        effect: { passive: 'recovery_boost' }
    },
    {
        id: 'friend_6', name: '不需要语言', description: '一个眼神就足够了。乐队【默契度】自然增长速度大幅提升 (+20%)。',
        cost: 25, x: 0, y: 5, parents: ['friend_5'], category: 'friendship',
        effect: { passive: 'chemistry_boost' }
    },
    {
        id: 'friend_7', name: '没人会被抛下', description: '只要我在，队伍就不会散。全员心态成长速度 +20%。',
        cost: 35, x: 0, y: 6, parents: ['friend_6'], category: 'friendship',
        effect: { statMult: { mental: 1.2 } }
    },
    {
        id: 'friend_8', name: '我们要永远在一起', description: '这是约定，也是诅咒。全员【稳定度】上限大幅提升。',
        cost: 50, x: 0, y: 7, parents: ['friend_7'], category: 'friendship',
        effect: { passive: 'stability_max' }
    },

    // ==========================================================================================
    // 2. KIRAMEKI (Passion - Amber)
    // Theme: Appeal, Visuals, Fans
    // ==========================================================================================
    {
        id: 'pass_1', name: '看着我的眼睛', description: '表情管理也是战斗。全员【表现力】成长速度 +10%。',
        cost: 5, x: 0, y: 0, parents: [], category: 'passion',
        effect: { statMult: { stagePresence: 1.1 } }
    },
    {
        id: 'pass_2', name: '让路人停下脚步', description: '解锁日程：【街头路演】。克服羞耻心，用声音征服街道！',
        cost: 10, x: 0, y: 1, parents: ['pass_1'], category: 'passion',
        effect: { unlockAction: [ScheduleAction.StreetLive] }
    },
    {
        id: 'pass_3', name: '视线，统统给我', description: '演出的魅力值 (Appeal) 基础加成 +10%。',
        cost: 15, x: 0, y: 2, parents: ['pass_2'], category: 'passion',
        effect: { passive: 'appeal_up' }
    },
    {
        id: 'pass_4', name: '顺应时代，然后超越', description: '解锁日程：【直播互动】。利用网络的力量引发奇迹。',
        cost: 20, x: 0, y: 3, parents: ['pass_3'], category: 'passion',
        effect: { unlockAction: [ScheduleAction.SocialMediaLive, ScheduleAction.LiveStream] }
    },
    {
        id: 'pass_5', name: '绝对C位的觉悟', description: '站在中间的人必须承受最多。演出时获得的热度 (Hype) 提升。',
        cost: 25, x: 0, y: 4, parents: ['pass_4'], category: 'passion',
        effect: { passive: 'hype_boost' }
    },
    {
        id: 'pass_6', name: '不管是哪里，都是舞台', description: '解锁日程：【写真拍摄】。用视觉冲击洗脑观众！',
        cost: 30, x: 0, y: 5, parents: ['pass_5'], category: 'passion',
        effect: { unlockAction: [ScheduleAction.PhotoSession] }
    },
    {
        id: 'pass_7', name: '流言蜚语伤不到我', description: '拥有强韧的心脏。SNS 负面事件的影响减半。',
        cost: 40, x: 0, y: 6, parents: ['pass_6'], category: 'passion',
        effect: { passive: 'scandal_resist' }
    },
    {
        id: 'pass_8', name: '我们会成为传说', description: '目标是星辰大海。所有途径获得的粉丝数 +20%。',
        cost: 60, x: 0, y: 7, parents: ['pass_7'], category: 'passion',
        effect: { passive: 'fan_gain_max' }
    },

    // ==========================================================================================
    // 3. OTO (Technique - Sky)
    // Theme: Skill, Song Quality, Serious
    // ==========================================================================================
    {
        id: 'tech_1', name: '基本功不会背叛你', description: '枯燥但必要。全员【技巧】成长速度 +10%。',
        cost: 5, x: 0, y: 0, parents: [], category: 'technique',
        effect: { statMult: { technique: 1.1 } }
    },
    {
        id: 'tech_2', name: '这可不是过家家！', description: '解锁状态：【严肃模式】。效率至上！练习收益提升，但压力增加。',
        cost: 10, x: 0, y: 1, parents: ['tech_1'], category: 'technique',
        effect: { unlockState: BandState.Serious }
    },
    {
        id: 'tech_3', name: '这里是战场', description: '解锁日程：【租用录音棚】。在专业环境下练习，效率倍增。',
        cost: 15, x: 0, y: 2, parents: ['tech_2'], category: 'technique',
        effect: { unlockAction: [ScheduleAction.RentStudio] }
    },
    {
        id: 'tech_4', name: '连呼吸都在练习', description: '全员【乐感】成长速度 +20%。',
        cost: 20, x: 0, y: 3, parents: ['tech_3'], category: 'technique',
        effect: { statMult: { musicality: 1.2 } }
    },
    {
        id: 'tech_5', name: '这个夏天献给音乐', description: '解锁日程：【夏季合宿】。全属性大幅提升的大事件。',
        cost: 30, x: 0, y: 4, parents: ['tech_4'], category: 'technique',
        effect: { unlockAction: [ScheduleAction.TrainingCamp] }
    },
    {
        id: 'tech_6', name: '我不需要“不纯粹”', description: '拒绝妥协。创作的歌曲【品质】基础值提升。',
        cost: 35, x: 0, y: 5, parents: ['tech_5'], category: 'technique',
        effect: { passive: 'quality_up' }
    },
    {
        id: 'tech_7', name: '突破人类的极限', description: '超越乐谱的束缚。演出中出现【Critical】（暴击）的概率大幅提升。',
        cost: 45, x: 0, y: 6, parents: ['tech_6'], category: 'technique',
        effect: { passive: 'crit_rate_up' }
    },
    {
        id: 'tech_8', name: '听到了吗？神的低语', description: '那是名为灵感的声音。创作新歌时，更容易获得高完成度和高评价。',
        cost: 60, x: 0, y: 7, parents: ['tech_7'], category: 'technique',
        effect: { passive: 'songwriting_max' }
    },

    // ==========================================================================================
    // 4. PRODUCE (Commercial - Slate)
    // Theme: Money, Strategy, Media
    // ==========================================================================================
    {
        id: 'comm_1', name: '没什么不好意思的', description: '为了梦想打工不丢人。兼职打工收益 +20%。',
        cost: 5, x: 0, y: 0, parents: [], category: 'commercial',
        effect: { passive: 'money_up' }
    },
    {
        id: 'comm_2', name: '这不是吝啬，是战略', description: '把钱花在刀刃上。所有日程的资金消耗减少 10%。',
        cost: 10, x: 0, y: 1, parents: ['comm_1'], category: 'commercial',
        effect: { passive: 'cost_down' }
    },
    {
        id: 'comm_3', name: '粉丝想要什么我都知道', description: '解锁日程：【周边设计】。把热爱转化为活动资金。',
        cost: 15, x: 0, y: 2, parents: ['comm_2'], category: 'commercial',
        effect: { unlockAction: [ScheduleAction.DesignWork] }
    },
    {
        id: 'comm_4', name: '把名片递给所有人', description: '解锁日程：【电台访谈】。接触主流媒体，不要放过任何机会。',
        cost: 20, x: 0, y: 3, parents: ['comm_3'], category: 'commercial',
        effect: { unlockAction: [ScheduleAction.RadioInterview] }
    },
    {
        id: 'comm_5', name: '直到发完为止', description: '街头派发传单的效果倍增，让整条街都知道我们的名字。',
        cost: 25, x: 0, y: 4, parents: ['comm_4'], category: 'commercial',
        effect: { passive: 'promo_boost' }
    },
    {
        id: 'comm_6', name: '我们要征服每一座城市', description: '不仅是这里，要去更远的地方。演出【资金】收益 +20%。',
        cost: 35, x: 0, y: 5, parents: ['comm_5'], category: 'commercial',
        effect: { passive: 'gig_money_up' }
    },
    {
        id: 'comm_7', name: '制造流行的人是我们', description: '掌握流量的密码。新歌发布时产生【Viral】的概率提升。',
        cost: 45, x: 0, y: 6, parents: ['comm_6'], category: 'commercial',
        effect: { passive: 'viral_chance_up' }
    },
    {
        id: 'comm_8', name: '这不仅仅是游戏', description: '建立专业的事务所运作体系。每周自动获得少量资金赞助。',
        cost: 60, x: 0, y: 7, parents: ['comm_7'], category: 'commercial',
        effect: { passive: 'passive_income' }
    }
];
