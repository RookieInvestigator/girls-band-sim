
import { GameEvent, Role } from '../types';

export const PRACTICE_EVENTS: GameEvent[] = [
  {
    id: 'prac_ac_broken',
    title: '桑拿房地狱',
    description: '练习室的空调坏了，夏日的闷热让这里变成了蒸笼。大家的衣服都湿透了，刘海也粘在额头上。',
    condition: (state) => state.currentWeek >= 14 && state.currentWeek <= 26, // Summer only
    options: [
      { label: '脱掉外套继续练！', effectDescription: '汗水是努力的勋章！', successChance: 1.0, impact: { fatigue: 30, mental: 20, technique: 10 } },
      { label: '全员去吃刨冰 (¥1500)', effectDescription: '透心凉，心飞扬。', successChance: 1.0, impact: { money: -1500, stressChange: -30, fatigue: -10 } },
      { label: '练习慢节奏的抒情歌', effectDescription: '心静自然凉……大概吧。', successChance: 0.5, impact: { musicality: 15 }, failImpact: { stressChange: 20 } }
    ]
  },
  {
    id: 'prac_mirror_selfie',
    title: '镜面对拍',
    description: '排练间隙，大家对着落地镜开始摆Pose。“这张光线超好！发到SNS上绝对会火！”',
    condition: (state) => state.members.length >= 3,
    options: [
      { label: '认真经营SNS', effectDescription: '挑选滤镜花了半小时。', successChance: 0.9, impact: { fans: 1000, design: 10 }, failImpact: { fans: 100 } },
      { label: '抓拍大家的崩坏表情', effectDescription: '被追着打了十分钟。', successChance: 1.0, impact: { affectionChange: 15, stressChange: -15 } },
      { label: '没收手机，专心排练', effectDescription: '你是魔鬼吗？', successChance: 1.0, impact: { technique: 15, stressChange: 10 } }
    ]
  },
  {
    id: 'prac_string_snap',
    title: '崩断的弦',
    description: '“崩！”的一声巨响，吉他手的一弦断了，还在脸颊上划了一道红印。',
    requiredRole: Role.Guitar,
    options: [
      { label: '立刻检查伤势', effectDescription: '还好只是皮外伤。', successChance: 1.0, impact: { affectionChange: 25, stressChange: -5 } },
      { label: '趁机练习快速换弦', effectDescription: 'Live事故处理能力提升。', successChance: 0.8, impact: { technique: 10, mental: 5 }, failImpact: { stressChange: 10 } },
      { label: '这是摇滚的勋章！', effectDescription: '有点疼但是很帅。', successChance: 0.5, impact: { stagePresence: 15 }, failImpact: { fatigue: 10 } }
    ]
  },
  {
    id: 'prac_lyric_block',
    title: '作词瓶颈',
    description: '作词担当咬着笔杆，面前的纸上全是涂鸦。“不行……写出来的词太矫情了，像初中生的QQ空间。”',
    condition: (state) => state.currentWeek > 3,
    options: [
      { label: '去深夜的公园散步', effectDescription: '冷风吹来了灵感。', successChance: 0.8, impact: { lyrics: 30, stressChange: -10 }, failImpact: { fatigue: 20 } },
      { label: '参考喜欢的漫画台词', effectDescription: '变得中二起来了。', successChance: 0.7, impact: { lyrics: 15, creativity: 10 }, failImpact: { lyrics: -5 } },
      { label: '大家一起玩文字接龙', effectDescription: '写出了一首怪诞的歌。', successChance: 0.6, impact: { creativity: 25, affectionChange: 15 } }
    ]
  },
  // --- NEW EVENTS ---
  {
    id: 'prac_genre_swap',
    title: '风格大挑战',
    description: '一直练流行摇滚有点腻了。今天大家提议尝试一下完全不同的风格！',
    condition: (state) => state.members.length >= 4 && state.teamStats.precision > 20, // UPDATED: technique -> precision
    options: [
      { label: '尝试即兴爵士 (Jazz)', effectDescription: '虽然乱七八糟，但乐感提升了。', successChance: 0.6, impact: { musicality: 25, technique: 10 }, failImpact: { stressChange: 15, technique: 5 } },
      { label: '尝试死亡金属 (Metal)', effectDescription: '嗓子喊哑了，但压力释放了！', successChance: 0.8, impact: { stressChange: -40, stagePresence: 15 }, failImpact: { fatigue: 20 } },
      { label: '还是练基本功吧', effectDescription: '枯燥但有效。', successChance: 1.0, impact: { technique: 10, stability: 10 } }
    ]
  },
  {
    id: 'prac_rival_meet',
    title: '偶遇劲敌',
    description: '在Studio的大厅里，遇到了那个最近很火的“星屑”乐队。她们的设备看起来比我们高级多了。',
    condition: (state) => state.fans > 1000 && Math.random() < 0.2,
    options: [
      { label: '主动去打招呼', effectDescription: '不仅交换了联系方式，还约了拼盘Live。', successChance: 0.7, impact: { fans: 500, mental: 10 }, failDescription: '被无视了……', failImpact: { mental: -20, stressChange: 20 } },
      { label: '偷偷观察她们排练', effectDescription: '学到了一些编曲技巧。', successChance: 0.9, impact: { arrangement: 15, technique: 5 }, failImpact: { stressChange: 10 } },
      { label: '假装没看见，我们也很强', effectDescription: '这种自信是必要的。', successChance: 1.0, impact: { mental: 15, stability: 5 } }
    ]
  },
  {
    id: 'prac_ear_protection',
    title: '听力保护战',
    description: '长时间的排练让大家的耳朵都嗡嗡作响。鼓手建议大家戴上专业耳塞，但吉他手觉得那样“听不到灵魂”。',
    options: [
      { label: '强制全员佩戴耳塞', effectDescription: '虽然不习惯，但为了长远考虑。', successChance: 1.0, impact: { mental: 10, stability: 15, technique: -5 } },
      { label: '调低整体音量', effectDescription: '不够爽，但也能练。', successChance: 1.0, impact: { technique: 5, stressChange: 5 } },
      { label: '就是要燥！最大音量！', effectDescription: '今晚大家都失眠了。', successChance: 1.0, impact: { stagePresence: 20, fatigue: 25, stressChange: -10 } }
    ]
  },
  {
    id: 'prac_instrument_swap',
    title: '乐器大洗牌',
    description: '为了增进对彼此声部的理解，队长提议大家交换乐器玩十分钟。',
    condition: (state) => state.members.length >= 3,
    options: [
      { label: '这简直是灾难现场', effectDescription: '全是噪音，但笑得很开心。', successChance: 1.0, impact: { stressChange: -20, affectionChange: 20 } },
      { label: '意外地发现了副乐器天赋？', effectDescription: '贝斯手打鼓居然很有节奏感。', successChance: 0.3, impact: { creativity: 30, musicality: 15 }, failImpact: { creativity: 10 } },
      { label: '认真研究队友的谱子', effectDescription: '原来这一段她这么难弹啊。', successChance: 1.0, impact: { arrangement: 20, affectionChange: 10 } }
    ]
  },
  {
    id: 'prac_power_outage',
    title: '黑暗中的回响',
    description: '排练到一半，大楼突然停电了！四周一片漆黑，只有窗外的月光透进来。',
    condition: (state) => Math.random() < 0.1,
    options: [
      { label: '只用木吉他和清唱', effectDescription: '最原始的音乐，最纯粹的感动。', successChance: 1.0, impact: { musicality: 30, affectionChange: 15 } },
      { label: '用手机闪光灯开Party', effectDescription: '在黑暗中跳舞！', successChance: 1.0, impact: { stressChange: -30, fatigue: 10 } },
      { label: '躺在地板上聊天', effectDescription: '聊了聊关于解散的恐惧。', successChance: 1.0, impact: { affectionChange: 25, mental: 10 } }
    ]
  },
  {
    id: 'prac_recording_bug',
    title: '消失的音轨',
    description: '“等等……刚才录的那段完美的Solo去哪了？” 电脑屏幕上弹出了“文件损坏”的提示框。',
    condition: (state) => state.actionCounts['Recording'] >= 1,
    options: [
      { label: '崩溃大哭', effectDescription: '大家一起哭了一会儿。', successChance: 1.0, impact: { stressChange: 30, mental: -10 } },
      { label: '凭记忆重录，甚至更好！', effectDescription: '这就是所谓的“绝境爆种”。', successChance: 0.4, impact: { technique: 30, mental: 20 }, failDescription: '怎么也找不回刚才的感觉了。', failImpact: { technique: 5, stressChange: 40 } },
      { label: '联系技术人员修复 (¥2000)', effectDescription: '花钱买平安。', successChance: 0.9, impact: { money: -2000, stability: 10 }, failImpact: { money: -2000, stressChange: 20 } }
    ]
  }
];
