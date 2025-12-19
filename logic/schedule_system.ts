
import { GameState, Member, ScheduleAction, ActionResult, TeamStats, ScheduleCategory } from '../types';
import { ACTION_TO_CATEGORY, SCHEDULE_COSTS } from '../constants';

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

// Randomized Flavor Text Database
const FLAVOR_DB: Record<string, { success: string[], great: string[], fail: string[] }> = {
    [ScheduleAction.SoloTechnical]: {
        success: ["[NAME] 对着节拍器反复练习基本功。", "[NAME] 尝试了新的指法，感觉还不错。", "[NAME] 专注地打磨着每一个音符的颗粒感。"],
        great: ["[NAME] 突破了速度瓶颈，手指快得出现了残影！", "[NAME] 感觉乐器变成了身体的一部分，随心所欲！", "[NAME] 状态神勇，连续弹奏了一小时没有失误。"],
        fail: ["[NAME] 手指打结了，怎么练都不顺手。", "[NAME] 练着练着开始发呆，效率不高。", "[NAME] 琴弦突然断了，吓了一跳，中断了练习。"]
    },
    [ScheduleAction.SoloVocal]: {
        success: ["[NAME] 在练习气息控制。", "[NAME] 尝试拓宽音域，发声很稳。", "[NAME] 对着镜子练习演唱时的表情管理。"],
        great: ["[NAME] 唱出了令人起鸡皮疙瘩的高音！", "[NAME] 找到了共鸣的感觉，声音穿透力极强。", "隔壁的邻居都忍不住为 [NAME] 的歌声鼓掌。"],
        fail: ["[NAME] 嗓子有点哑，完全唱不上去。", "[NAME] 总是跑调，越练越烦躁。", "[NAME] 喝水呛到了，咳了半天。"]
    },
    [ScheduleAction.SoloExpression]: {
        success: ["[NAME] 对着镜子练习帅气的甩头动作。", "[NAME] 研究了摇滚明星的经典站姿。", "[NAME] 尝试在演奏时保持眼神交流。"],
        great: ["[NAME] 的台风简直像换了一个人，气场全开！", "镜子里的 [NAME] 散发着巨星般的光芒。", "找到了最适合自己的招牌动作！"],
        fail: ["[NAME] 练习甩头时扭到了脖子，好疼。", "[NAME] 对着镜子做表情，自己先笑场了。", "动作太僵硬，看起来像个机器人。"]
    },
    [ScheduleAction.VocalLesson]: {
        success: ["[NAME] 认真听取了老师关于发声位置的建议。", "[NAME] 反复练习枯燥的音阶，基础更扎实了。", "老师纠正了 [NAME] 的坏习惯。"],
        great: ["[NAME] 顿悟了！高音变得轻松自如。", "老师惊讶于 [NAME] 的进步速度，甚至想收徒。", "仿佛打通了任督二脉，声音质感大幅提升。"],
        fail: ["[NAME] 被老师严厉批评了，心情低落。", "这节课完全找不到状态，钱白花了。", "[NAME] 练得太猛，嗓子有点充血。"]
    },
    [ScheduleAction.BandEnsemble]: {
        success: ["[NAME] 仔细聆听着其他声部的旋律。", "虽然有小瑕疵，但大家都在努力配合。", "[NAME] 找到了切入的最佳时机。"],
        great: ["今天的合奏如同呼吸一般自然！", "[NAME] 即使不看谱子也能完美跟上大家的即兴发挥。", "演奏结束时，空气中弥漫着满足感。"],
        fail: ["[NAME] 总是抢拍，打乱了大家的节奏。", "大家各弹各的，像是在三个不同的房间里。", "因为音量太大听不清队友的声音，配合一团糟。"]
    },
    [ScheduleAction.BandRehearsal]: {
        success: ["[NAME] 和大家确认了进歌的信号。", "虽然有小失误，但整体配合还算流畅。", "[NAME] 努力跟上大家的节奏，享受着合奏。"],
        great: ["全员同步率400%！这就是灵魂共鸣！", "[NAME] 和队友的一个眼神交换就完成了完美的转调。", "演奏结束的瞬间，大家都露出了自信的笑容。"],
        fail: ["节奏乱成一团，[NAME] 找不到拍子了。", "大家各弹各的，完全没有默契。", "气氛沉闷，排练草草结束了。"]
    },
    [ScheduleAction.RentStudio]: {
        success: ["[NAME] 在专业的录音棚里感受到了巨大的声压。", "顶级设备的音质太棒了，[NAME] 沉浸其中。", "录音师夸奖了 [NAME] 的音色。"],
        great: ["录音棚的声场激发了 [NAME] 的潜能！", "[NAME] 在专业环境下发挥超常，如同开挂。", "这一刻，[NAME] 觉得自己像个巨星。"],
        fail: ["虽然设备很贵，但 [NAME] 还没学会怎么用。", "[NAME] 在昂贵的录音棚里紧张得手抖。", "因为调试设备浪费了太多时间。"]
    },
    [ScheduleAction.TrainingCamp]: {
        success: ["[NAME] 在晚上的枕头大战中获得了胜利。", "白天的特训很累，但晚上的烧烤很好吃。", "[NAME] 和大家一起看了星星，聊了梦想。"],
        great: ["这是一次传说级的合宿！大家的羁绊达到了顶峰！", "[NAME] 在合宿中顿悟了音乐的真谛。", "通宵谈心后，[NAME] 感觉和大家心意相通了。"],
        fail: ["蚊子太多了，[NAME] 一晚上没睡好。", "[NAME] 因为抢被子和队友吵了一架。", "特训强度太大，[NAME] 累得想回家。"]
    },
    [ScheduleAction.Songwriting]: {
        success: ["[NAME] 哼着小曲，记录下了一些零碎的灵感。", "[NAME] 试着写了几句歌词，感觉还行。", "[NAME] 在键盘上摸索着新的和弦进行。"],
        great: ["灵感如泉涌！[NAME] 笔走龙蛇，仿佛被缪斯附体！", "一首神曲的雏形在 [NAME] 脑海中诞生了。", "[NAME] 写出了直击灵魂的旋律，自己都感动了。"],
        fail: ["[NAME] 咬破了笔杆也想不出一个好词。", "写出来的东西全是垃圾，[NAME] 烦躁地撕掉了。", "[NAME] 盯着空白的谱纸发呆了一下午。"]
    },
    [ScheduleAction.Recording]: {
        success: ["[NAME] 戴着监听耳机，专注地录制了自己的部分。", "录音师说这条可以保留。", "[NAME] 尝试了两种不同的唱法。"],
        great: ["One Take！[NAME] 一遍过，简直是录音室的神！", "录下的声音充满质感，连混音师都赞不绝口。", "这段Solo简直是专辑级别的水准。"],
        fail: ["红灯一亮 [NAME] 就紧张，怎么也录不好。", "总是会有杂音，不得不重录了二十遍。", "[NAME] 对自己的表现极度不满意，陷入了自我怀疑。"]
    },
    [ScheduleAction.DesignWork]: {
        success: ["[NAME] 对着色板挑选了应援色。", "[NAME] 画了一些周边T恤的草图。", "正在排版新的宣传单。"],
        great: ["[NAME] 设计出了令人眼前一亮的Logo！", "这幅海报简直是艺术品，必须要裱起来！", "[NAME] 的审美太超前了，这绝对会引领潮流。"],
        fail: ["配色像番茄炒蛋，[NAME] 绝望地捂住了脸。", "软件崩溃了，没保存，[NAME] 想要砸电脑。", "画出来的东西和想象中完全不一样。"]
    },
    [ScheduleAction.LyricsWorkshop]: {
        success: ["[NAME] 阅读了诗集，摘抄了喜欢的句子。", "[NAME] 尝试用隐喻来表达情感。", "大家一起讨论了这个词的韵脚。"],
        great: ["[NAME] 找到了那个最完美的词汇，整首歌的意境升华了！", "字里行间充满了文学性，[NAME] 真是个诗人。", "这歌词写得太扎心了，看哭了好几个人。"],
        fail: ["书太深奥了，[NAME] 看着看着睡着了。", "怎么写都像是在记流水账。", "大家对歌词的理解产生了分歧，不欢而散。"]
    },
    [ScheduleAction.ComposeJam]: {
        success: ["[NAME] 随意弹了一个Riff，大家试着跟上。", "尝试了把两种不同的风格融合在一起。", "[NAME] 用合成器做出了有趣的音色。"],
        great: ["化学反应发生了！一段神级旋律在碰撞中诞生！", "大家即兴演奏了半小时完全没停，太爽了！", "[NAME] 的一个意外失误竟然造就了绝妙的乐句。"],
        fail: ["完全聊不到一块去，最后变成了噪音制造。", "[NAME] 坚持自己的想法，不想配合别人。", "Jam出来的东西乱七八糟，没法听。"]
    },
    [ScheduleAction.StreetLive]: {
        success: ["[NAME] 即使路人不多，也认真地唱完了全场。", "有几个停下脚步的人鼓了掌。", "[NAME] 把名片发给了感兴趣的观众。"],
        great: ["[NAME] 的歌声让匆忙的行人都驻足聆听，围了一圈人！", "现场气氛热烈，甚至有人喊安可！", "一位外国游客把演出的视频发到了网上。"],
        fail: ["被保安赶走了，只能灰溜溜地换地方。", "风太大，把谱架吹倒了，[NAME] 手忙脚乱。", "几乎没人停下来，[NAME] 感到了一阵孤独。"]
    },
    [ScheduleAction.FlyerDistribution]: {
        success: ["[NAME] 带着笑容把传单递给路人。", "虽然大部分人拒绝了，但还是发出去了一些。", "[NAME] 在便利店门口贴了海报。"],
        great: ["[NAME] 亲和力爆表，手里的传单一会儿就发光了！", "遇到了热心的店长，允许我们在店里循环播放歌曲。", "有一群学生承诺一定会来看演出。"],
        fail: ["传单被当面扔进了垃圾桶，[NAME] 很受伤。", "下雨了，传单都湿透了，没法发。", "站了一小时只发出去三张。"]
    },
    [ScheduleAction.SocialMediaLive]: {
        success: ["[NAME] 读了粉丝的评论，聊了聊最近的排练。", "虽然观众不多，但互动很温馨。", "[NAME] 清唱了一小段新歌。"],
        great: ["[NAME] 的直播上了首页推荐，观看人数飙升！", "由于太可爱了，收到了好多礼物。", "一段即兴整活被截成了表情包疯传。"],
        fail: ["忘了开麦克风，演了半小时默剧。", "信号不好卡成了PPT，观众都跑了。", "[NAME] 不小心说了尴尬的话，直播间冷场了。"]
    },
    [ScheduleAction.RadioInterview]: {
        success: ["[NAME] 回答了主持人的提问，虽然有点紧张。", "介绍了乐队的成立经过。", "播放了乐队的Demo。"],
        great: ["[NAME] 的谈吐幽默风趣，主持人被逗得哈哈大笑！", "这期节目收听率很高，很多人去搜了乐队名字。", "[NAME] 展现了极高的人格魅力，圈粉无数。"],
        fail: ["[NAME] 紧张得结巴了，完全不知道自己在说什么。", "被问到了刁钻的问题，场面一度十分尴尬。", "名字被主持人念错了，还没敢纠正。"]
    },
    [ScheduleAction.LiveStream]: {
        success: ["[NAME] 看着弹幕上的“666”露出了羞涩的笑容。", "[NAME] 读了粉丝的来信，气氛很温馨。", "直播间的人气稳步上升。"],
        great: ["[NAME] 的一段即兴Solo引爆了直播间，礼物刷屏！", "登上了直播平台的热门推荐，吸粉无数！", "[NAME] 展现了惊人的综艺感，观众笑得肚子疼。"],
        fail: ["网络卡顿，直播变成了PPT。", "[NAME] 不小心说了冷场的话，弹幕一片尴尬。", "遭遇了黑粉攻击，[NAME] 心态有点崩。"]
    },
    [ScheduleAction.PhotoSession]: {
        success: ["[NAME] 按照摄影师的要求摆出了Pose。", "在公园的草坪上拍了一组清新的照片。", "[NAME] 整理了一下刘海。"],
        great: ["[NAME] 的这张抓拍简直是神图！可以直接做封面！", "镜头感太好了，每一张片子都充满了故事感。", "摄影师拍嗨了，根本停不下来。"],
        fail: ["[NAME] 表情僵硬，像是在拍证件照。", "闭眼狂魔，十张照片有九张是闭眼的。", "风把头发吹得像鸡窝一样。"]
    },
    [ScheduleAction.MusicVideoShoot]: {
        success: ["[NAME] 对着镜头对口型，努力表现出感情。", "在寒风中穿着单薄的衣服坚持拍摄。", "[NAME] 检查了监视器里的回放。"],
        great: ["[NAME] 的演技爆发！眼神戏简直绝了！", "虽然是低成本，但拍出了电影的质感。", "这个镜头绝对会成为名场面！"],
        fail: ["动作太夸张了，看起来有点滑稽。", "由于频繁笑场，导演的脸都黑了。", "关键道具坏了，不得不临时修改剧本。"]
    },
    [ScheduleAction.TeaTime]: {
        success: ["[NAME] 带来了自己烤的饼干。", "大家聊了聊最近看的电视剧。", "气氛轻松，[NAME] 感觉治愈了。"],
        great: ["茶话会变成了真心话大会，大家哭着抱在一起。", "[NAME] 的笑话把大家逗得在地上打滚。", "度过了一段无可替代的温馨时光。"],
        fail: ["聊到了关于未来的沉重话题，气氛凝固了。", "茶打翻了，弄脏了地毯。", "[NAME] 一个人在一边玩手机，没融入进去。"]
    },
    [ScheduleAction.GroupTrip]: {
        success: ["[NAME] 在海边捡到了漂亮的贝壳。", "大家一起拍了纪念合影。", "虽然迷路了，但也算是一种冒险。"],
        great: ["这是一次完美的旅行！所有的烦恼都抛在脑后！", "[NAME] 在旅途中写出了一段绝美的旋律。", "看着夕阳，大家许下了要永远在一起的誓言。"],
        fail: ["下了一整天的雨，只能待在旅馆里。", "[NAME] 晕车了，吐得很惨。", "因为行程安排吵了一架。"]
    },
    [ScheduleAction.EquipmentCare]: {
        success: ["[NAME] 认真地擦拭着琴身。", "给吉他换了一套新弦。", "[NAME] 清理了效果器上的灰尘。"],
        great: ["[NAME] 把乐器保养得像新的一样闪闪发光！", "修好了一个接触不良的老毛病，声音变好了。", "对待乐器就像对待恋人一样温柔。"],
        fail: ["换弦的时候不小心被崩到了手。", "拆开之后装不回去了，[NAME] 满头大汗。", "发现琴颈弯了，心情沉重。"]
    },
    [ScheduleAction.StyleMakeover]: {
        success: ["[NAME] 换了新发型，感觉清爽多了。", "[NAME] 尝试了新的穿搭风格，队友纷纷点赞。", "[NAME] 修剪了刘海，视界变得清晰了。"],
        great: ["[NAME] 的新造型惊艳全场，简直是颜值巅峰！", "仿佛换了一个人，[NAME] 散发着明星气场。", "这次改造太成功了，回头率200%。"],
        fail: ["Tony老师理解错了 [NAME] 的意思……", "[NAME] 对着镜子里的新发型欲哭无泪。", "染发剂过敏了，头皮发痒。"]
    },
    [ScheduleAction.MusicTheory]: {
        success: ["[NAME] 搞懂了五度圈的原理。", "分析了经典曲目的和声走向。", "[NAME] 认真做了笔记。"],
        great: ["[NAME] 像是打开了新世界的大门！", "复杂的乐理知识突然变得清晰易懂。", "学会了高级的和弦代换技巧。"],
        fail: ["看到五线谱就犯困，[NAME] 睡着了。", "讲得太深奥了，完全听不懂。", "脑子变成了浆糊。"]
    },
    [ScheduleAction.PartTimeJob]: {
        success: ["[NAME] 熟练地完成了收银工作。", "虽然很累，但拿到了工资。", "遇到了认出自己的客人。"],
        great: ["[NAME] 被店长评为优秀员工，发了奖金！", "打工时哼歌被客人夸奖了。", "赚到了买新效果器的钱，超开心！"],
        fail: ["[NAME] 打碎了盘子，被扣了工资。", "遇到了蛮不讲理的客人，受了一肚子气。", "太累了，站着都能睡着。"]
    },
    [ScheduleAction.ListenAnalysis]: {
        success: ["[NAME] 戴着耳机认真听了推荐的专辑。", "分析了这首歌的配器层次。", "[NAME] 发现了一些有趣的细节。"],
        great: ["[NAME] 从这首歌里获得了巨大的灵感！", "听到了以前从未注意到的精妙处理。", "审美水平提升了一个档次。"],
        fail: ["听着听着就走神了。", "这首歌太难听了，[NAME] 摘下了耳机。", "只顾着抖腿，完全没思考。"]
    }
};

// Tag Modifiers Configuration
const TAG_MODIFIERS: Record<string, { 
    growthMult?: number; 
    stressMult?: number; 
    fatigueMult?: number; 
    successRate?: number; 
    statsBonus?: Partial<Record<keyof Member, number>>;
    money?: number;
}> = {
    '天才': { growthMult: 1.3, stressMult: 1.2, fatigueMult: 0.8 },
    '练习狂': { growthMult: 1.1, fatigueMult: 1.4, statsBonus: { technique: 0.2 } },
    '玻璃心': { stressMult: 1.5, growthMult: 0.9 },
    '乐天派': { stressMult: 0.7, statsBonus: { mental: 0.2 } }, 
    '重力': { stressMult: 1.2, fatigueMult: 1.1, growthMult: 1.1 },
    '社恐': { stressMult: 1.3, growthMult: 1.2 }, 
    '完美主义': { growthMult: 1.1, stressMult: 1.4 },
    '体力怪物': { fatigueMult: 0.6 },
    '大小姐': { money: -100 }, 
    '三无': { stressMult: 0.5 },
    '中二病': { growthMult: 1.05, stressMult: 0.9 },
    
    // NEW TAGS SUPPORT
    '吃货': { stressMult: 0.8, money: -50 }, // Eats budget, reduces stress
    '网游废人': { fatigueMult: 1.2, statsBonus: { technique: 0.1 } }, // High technique (fingers), low stamina
    '随性': { growthMult: 1.2, stressMult: 0.8 }, // Good growth/stress, unpredictable
    '视觉系': { statsBonus: { stagePresence: 0.2, design: 0.1 } },
    '辣妹': { stressMult: 0.9, statsBonus: { affection: 0.1 } },
    '忠犬': { stressMult: 0.9, statsBonus: { affection: 0.2 } },
    '机器人': { stressMult: 0.1, growthMult: 1.1, statsBonus: { creativity: -0.2 } }, // No stress, low creativity
    '特摄厨': { statsBonus: { stagePresence: 0.1 } },
    '佛系': { stressMult: 0.5, growthMult: 0.9 },
    '极道': { statsBonus: { stagePresence: 0.3 }, stressMult: 0.8 },
    '未来人': { statsBonus: { creativity: 0.3 }, fatigueMult: 0.9 }
};

const calculateGrowth = (current: number, increment: number, multiplier: number): number => {
  if (increment <= 0) return increment;
  const resistance = Math.max(1, current / 120); 
  const val = (increment * multiplier) / Math.pow(resistance, 0.8);
  return Number(val.toFixed(1));
};

const getFlavorText = (action: ScheduleAction, member: Member, result: ActionResult): string => {
    // Try to get from DB first
    const entry = FLAVOR_DB[action as string] || FLAVOR_DB[Object.keys(FLAVOR_DB).find(k => action.includes(k) || k.includes(action)) || ''];
    
    if (entry) {
        let templates: string[] = [];
        if (result === ActionResult.GreatSuccess) templates = entry.great;
        else if (result === ActionResult.Failure) templates = entry.fail;
        else templates = entry.success;
        
        if (templates.length > 0) {
            return templates[Math.floor(Math.random() * templates.length)].replace(/\[NAME\]/g, member.name);
        }
    }

    // Fallback Logic
    const isGood = result !== ActionResult.Failure;
    if (!isGood) return `${member.name} 似乎不在状态，在这个项目中遇到了困难。`;
    
    const category = ACTION_TO_CATEGORY[action];
    if (category === ScheduleCategory.Solo) return `${member.name} 独自一人在角落里反复打磨着细节。`;
    if (category === ScheduleCategory.Band) return `${member.name} 努力跟上大家的节奏，享受着合奏的快乐。`;
    if (category === ScheduleCategory.Creation) return `${member.name} 似乎抓住了某种灵感。`;
    
    return `${member.name} 全力以赴地完成了任务！`;
};

export const processTurn = (state: GameState): { newState: GameState; actionLogs: ActionLog[] } => {
  let moneyDelta = 0;
  let fansDelta = 0;
  let currentMembers = [...state.members];
  const actionLogs: ActionLog[] = [];
  
  let chemistryDelta = 0;
  
  // --- NEW: Passive Fan Growth Calculation ---
  const appealFactor = (state.teamStats.appeal || 0) * 3;
  const popularityFactor = state.fans * 0.015;
  const passiveFans = Math.floor((appealFactor + popularityFactor) * (0.8 + Math.random() * 0.4)); 
  
  if (passiveFans > 0) {
      fansDelta += passiveFans;
      actionLogs.push({
          action: '口碑传播' as any,
          result: ActionResult.Success,
          details: [`因乐队魅力，本周自然吸粉 +${passiveFans}`],
          flavorText: "关于乐队的讨论度在悄悄上升。",
          date: "Weekly Bonus"
      });
  }
  // -------------------------------------------

  let currentProject = state.currentProject ? { ...state.currentProject } : null;
  let songs = [...state.songs];

  for (let i = 0; i < state.weeklySchedule.length; i++) {
    const action = state.weeklySchedule[i];

    if (!action) {
        currentMembers = currentMembers.map(m => ({
            ...m,
            fatigue: Math.max(0, m.fatigue - 45), 
            stress: Math.max(0, m.stress - 30)
        }));
        actionLogs.push({ action: '休息' as any, result: ActionResult.Success, details: ['全员休息，大幅恢复了状态。'], flavorText: '大家度过了无所事事的一天。' });
        continue;
    }

    const roll = Math.random();
    const res = roll > 0.9 ? ActionResult.GreatSuccess : (roll < 0.2 ? ActionResult.Failure : ActionResult.Success); 
    const actionMultiplier = res === ActionResult.GreatSuccess ? 1.5 : (res === ActionResult.Failure ? 0.3 : 1.0); 

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

    // Fix: Explicitly type as any to avoid TS closure analysis 'never' issue
    let activeMemberForFlavor: any = null; 
    let highestRelevantStat = -1;
    
    // Track stats for reporting
    const statSum: Record<string, number> = {};

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
              if (mod.money) actionMoney += mod.money; // Apply money modifiers (e.g., glutton eats budget)
          }
      });

      if (m.tags.includes('社恐') && [ScheduleCategory.Performance, ScheduleCategory.Promotion].includes(ACTION_TO_CATEGORY[action])) {
          tagStressMult *= 1.5;
          tagGrowthMult *= 0.5; 
      } else if (m.tags.includes('社恐') && ACTION_TO_CATEGORY[action] === ScheduleCategory.Solo) {
          tagGrowthMult *= 1.3; 
      }

      switch(action) {
        case ScheduleAction.SoloTechnical: 
          stats.tec += 1.2; stats.fat += 5; stats.str += 3; break; 
        case ScheduleAction.SoloVocal: 
          stats.mus += 1.0; stats.sta += 0.5; stats.fat += 8; stats.str += 4; break; 
        case ScheduleAction.SoloExpression:
            stats.sta += 1.0; stats.dsg += 0.5; stats.fat += 5; stats.str += 2; break; 
        case ScheduleAction.VocalLesson:
            stats.mus += 2.0; stats.tec += 1.0; stats.fat += 10; stats.str += 5; break;

        case ScheduleAction.BandEnsemble: 
          stats.mus += 0.5; stats.tec += 0.5; stats.arr += 0.8; stats.fat += 10; stats.str += 6; 
          chemistryDelta += 0.5 * actionMultiplier; 
          break;
        case ScheduleAction.BandRehearsal: 
          stats.tec += 0.8; stats.sta += 0.8; stats.fat += 12; stats.str += 10; 
          chemistryDelta += 1.0 * actionMultiplier; 
          break;
        case ScheduleAction.RentStudio:
            stats.tec += 1.2; stats.mus += 1.2; stats.arr += 1.0; stats.fat += 20; stats.str += 10;
            chemistryDelta += 2.5 * actionMultiplier;
            if (currentProject) songQualityBoost += 5 * actionMultiplier;
            break;
        case ScheduleAction.TrainingCamp:
            stats.tec += 1.5; stats.mus += 1.5; stats.sta += 1.5; stats.fat += 30; stats.str -= 10;
            m.affection = Math.min(100, m.affection + 5);
            chemistryDelta += 3.0 * actionMultiplier;
            break;

        case ScheduleAction.Songwriting:
          stats.cre += 1.5; stats.cmp += 0.8; stats.lyr += 0.8; stats.men -= 1; stats.fat += 8; stats.str += 8; 
          songProgress += (m.creativity * 0.12 + m.composing * 0.08 + m.lyrics * 0.08) * actionMultiplier;
          break;
        case ScheduleAction.LyricsWorkshop:
            stats.lyr += 2.0; stats.cre += 0.5; stats.men += 0.5; stats.fat += 5; break;
        case ScheduleAction.ComposeJam:
            stats.cmp += 1.5; stats.arr += 1.5; stats.cre += 1.0; stats.fat += 15; stats.str += 5;
            chemistryDelta += 1.2 * actionMultiplier;
            break;
        case ScheduleAction.DesignWork:
            stats.dsg += 1.5; stats.cre += 0.5; stats.fat += 8; stats.str += 3; 
            if (currentProject) songQualityBoost += m.design * 0.04 * actionMultiplier;
            break;

        case ScheduleAction.Recording:
          stats.tec += 0.5; stats.mus += 0.5; stats.fat += 15; stats.str += 15; 
          if (currentProject) {
              songQualityBoost += (m.technique * 0.08 + m.arrangement * 0.1) * actionMultiplier;
              songProgress += 10 * actionMultiplier; 
          }
          break;

        // --- NERFED FAN GAINS ---
        case ScheduleAction.StreetLive: 
          actionFans += 200 * actionMultiplier; 
          actionMoney += 500; stats.sta += 1.0; stats.fat += 15; stats.str += 10; 
          chemistryDelta += 0.5 * actionMultiplier;
          break;
        case ScheduleAction.FlyerDistribution:
            actionFans += 60 * actionMultiplier;
            actionMoney += 200; stats.men += 0.5; stats.fat += 10; stats.str += 5; break; 
        case ScheduleAction.SocialMediaLive:
            actionFans += 120 * actionMultiplier;
            stats.sta += 0.5; stats.fat += 5; stats.str += 5; break;
        case ScheduleAction.LiveStream:
            actionFans += 600 * actionMultiplier;
            stats.sta += 1.2; stats.fat += 15; stats.str += 20; break;
        case ScheduleAction.PhotoSession:
            actionFans += 800 * actionMultiplier;
            stats.sta += 1.5; stats.dsg += 1.0; stats.fat += 25; stats.str += 15; break;

        case ScheduleAction.MusicVideoShoot:
          actionFans += 3500 * actionMultiplier;
          stats.sta += 0.8; stats.dsg += 0.8; stats.fat += 30; stats.str += 20; break; 
        // ------------------------
        
        case ScheduleAction.TeaTime: 
          stats.fat -= 50; stats.str -= 60; m.affection = Math.min(100, m.affection + 4); 
          chemistryDelta += 0.8 * actionMultiplier; 
          break;
        case ScheduleAction.GroupTrip:
            stats.fat -= 80; stats.str -= 80; m.affection = Math.min(100, m.affection + 10);
            chemistryDelta += 3.0 * actionMultiplier; break;
        case ScheduleAction.StyleMakeover:
            stats.sta += 3.0; stats.men += 1.0; stats.str -= 10; break;

        case ScheduleAction.MusicTheory:
            stats.mus += 1.5; stats.arr += 0.8; stats.fat += 5; stats.men += 0.5; stats.str += 2; break; 
        case ScheduleAction.ListenAnalysis:
            stats.arr += 1.5; stats.mus += 1.0; stats.men += 0.5; stats.fat += 5; break;

        case ScheduleAction.PartTimeJob:
            actionMoney += 1500; stats.fat += 10; stats.str += 8; break; 
        case ScheduleAction.EquipmentCare:
             stats.tec += 0.5; stats.fat += 5; break;
        default:
          stats.mus += 0.3; stats.tec += 0.3; stats.fat += 5; break;
      }

      // Pick flavor member
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

      const musG = calculateGrowth(m.musicality, stats.mus, actionMultiplier * tagGrowthMult);
      const tecG = calculateGrowth(m.technique, stats.tec, actionMultiplier * tagGrowthMult);
      const staG = calculateGrowth(m.stagePresence, stats.sta, actionMultiplier * tagGrowthMult);
      const creG = calculateGrowth(m.creativity, stats.cre, actionMultiplier * tagGrowthMult);
      const menG = calculateGrowth(m.mental, stats.men, actionMultiplier * tagGrowthMult);
      const cmpG = calculateGrowth(m.composing, stats.cmp, actionMultiplier * tagGrowthMult);
      const lyrG = calculateGrowth(m.lyrics, stats.lyr, actionMultiplier * tagGrowthMult);
      const arrG = calculateGrowth(m.arrangement, stats.arr, actionMultiplier * tagGrowthMult);
      const dsgG = calculateGrowth(m.design, stats.dsg, actionMultiplier * tagGrowthMult);

      const fA = Math.floor(stats.fat * tagFatigueMult);
      const sA = Math.floor(stats.str * tagStressMult);

      // Accumulate Stats
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
        interactionsLeft: 2 
      };
    });

    if (activeMemberForFlavor) {
        currentLog.flavorText = getFlavorText(action, activeMemberForFlavor, res);
        currentLog.memberId = (activeMemberForFlavor as Member).id;
    }

    // Format Stat Log
    const statDetails: string[] = [];
    Object.entries(statSum).forEach(([key, val]) => {
        if (Math.abs(val) >= 0.1 && key !== 'fatigue' && key !== 'stress') { // Prioritize main stats
            const label = STAT_LABELS[key] || key;
            statDetails.push(`${label}+${val.toFixed(1)}`);
        }
    });
    
    // Add Fatigue/Stress separately or if impactful
    if ((statSum['fatigue'] || 0) !== 0) statDetails.push(`${STAT_LABELS['fatigue']}${statSum['fatigue'] > 0 ? '+' : ''}${Math.floor(statSum['fatigue'])}`);
    if ((statSum['stress'] || 0) !== 0) statDetails.push(`${STAT_LABELS['stress']}${statSum['stress'] > 0 ? '+' : ''}${Math.floor(statSum['stress'])}`);

    if (statDetails.length > 0) {
        // Group into chunks of 3 for display
        for (let j = 0; j < statDetails.length; j += 3) {
            currentLog.details.push(statDetails.slice(j, j + 3).join('  '));
        }
    }

    if (songProgress > 0) {
        if (!currentProject) {
             currentLog.details.push("开启了新曲创作！");
        } else {
            currentProject.completeness = Math.min(100, currentProject.completeness + songProgress);
            currentProject.quality = currentProject.quality + songQualityBoost / 4; 
            currentLog.details.push(`新曲完成度 +${Math.floor(songProgress)}%`);
        }
    }
    
    if (actionMoney !== 0) currentLog.details.push(`资金 ${actionMoney > 0 ? '+' : ''}${actionMoney}`);
    if (actionFans !== 0) currentLog.details.push(`粉丝 ${actionFans > 0 ? '+' : ''}${actionFans}`);
    if (chemistryDelta > 0) currentLog.details.push(`默契度 +${chemistryDelta.toFixed(1)}`);

    moneyDelta += actionMoney;
    fansDelta += actionFans;
    actionLogs.push(currentLog);
  }

  const currentChemistry = state.teamStats.chemistry || 0;
  const newChemistry = currentChemistry + chemistryDelta;

  const newState = {
    ...state,
    currentWeek: state.currentWeek + 1,
    money: state.money + moneyDelta,
    fans: Math.max(0, state.fans + fansDelta),
    members: currentMembers,
    currentProject: currentProject,
    songs: songs,
    teamStats: {
      technique: Math.floor(currentMembers.reduce((a, b) => a + b.technique, 0) / currentMembers.length) || 0,
      appeal: Math.floor(currentMembers.reduce((a, b) => a + b.stagePresence, 0) / currentMembers.length) || 0,
      stability: Math.floor(currentMembers.reduce((a, b) => a + b.mental, 0) / currentMembers.length) || 0,
      chemistry: Number(newChemistry.toFixed(1))
    }
  };

  return { newState, actionLogs };
};
