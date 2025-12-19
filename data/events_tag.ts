
import { GameEvent } from '../types';

export const TAG_EVENTS: GameEvent[] = [
  {
    id: 'tag_social_anxiety_hide',
    title: '社恐的极限',
    description: '今天的 LiveHouse 人太多了，[NAME] 躲在洗手间里不敢出来，手里紧紧攥着吉他拨片，呼吸急促。',
    requiredTag: '社恐',
    options: [
      { label: '隔着门陪她聊天', effectDescription: '“我在外面守着，别怕。”', successChance: 1.0, impact: { affectionChange: 20, mental: 5 } },
      { label: '强行拖去后台候场', effectDescription: '虽然残酷，但这就是现场。', successChance: 1.0, impact: { stressChange: 40, fatigue: 10, technique: 5 } },
      { label: '今天就算了吧', effectDescription: '逃避虽然可耻但有用。', successChance: 1.0, impact: { stressChange: -15, technique: -10 } }
    ]
  },
  {
    id: 'tag_chunibyo_seal',
    title: '漆黑的波动',
    description: '[NAME] 突然停止了演奏，捂着左手上的绷带跪倒在地：“糟糕……LiveHouse 的结界压制不住我体内的魔龙了……”',
    requiredTag: '中二病',
    options: [
      { label: '即兴配合：“用你的音符封印它！”', effectDescription: '简直是神来之笔的MC！', successChance: 0.8, impact: { creativity: 25, affectionChange: 20 }, failImpact: { stressChange: 15 } },
      { label: '递过去一瓶常温水', effectDescription: '“喝点圣水冷静一下。”', successChance: 1.0, impact: { mental: 10, stressChange: -5 } },
      { label: '无视她，继续调音', effectDescription: '空气突然安静。', successChance: 1.0, impact: { stressChange: 10 } }
    ]
  },
  {
    id: 'tag_glutton_snack',
    title: '深夜的便利店',
    description: '排练结束已经很晚了，[NAME] 盯着便利店的炸鸡柜台，眼睛里失去了高光。“那个……如果是限定口味的话，卡路里是可以忽略不计的对吧？”',
    requiredTag: '吃货',
    options: [
      { label: '买！都买！(¥800)', effectDescription: '这时候就别管体重了！', successChance: 1.0, impact: { money: -800, stressChange: -30, fatigue: -10 } },
      { label: '严厉禁止：为了武道馆！', effectDescription: '她露出了被抛弃的小狗般的眼神。', successChance: 1.0, impact: { stressChange: 20, affectionChange: -10 } },
      { label: '只准吃魔芋丝', effectDescription: '健康的妥协。', successChance: 1.0, impact: { mental: 5, fatigue: 10 } }
    ]
  },
  {
    id: 'tag_glass_heart_cry',
    title: '网暴危机',
    description: '“居然说我的发型很土……” [NAME] 看着手机屏幕，眼泪吧嗒吧嗒地掉在琴弦上。',
    requiredTag: '玻璃心',
    options: [
      { label: '通宵陪聊做心理按摩', effectDescription: '消耗了你大量的精力。', successChance: 1.0, impact: { fatigue: 30, stressChange: -40, affectionChange: 25 } },
      { label: '物理断网保平安', effectDescription: '眼不见心不烦。', successChance: 1.0, impact: { mental: 15, stressChange: -10 } },
      { label: '开小号帮她怼回去', effectDescription: '展现了惊人的键盘战斗力。', successChance: 0.5, impact: { mental: 30, fans: 50 }, failDescription: '被扒出来是小号，炎上了。', failImpact: { fans: -200, stressChange: 30 } }
    ]
  },
  {
    id: 'tag_rich_treat',
    title: '大小姐的钞能力',
    description: '“练习室的空调声音太吵了。” [NAME] 打了个响指，十分钟后，一辆卡车运来了顶级的录音棚设备。',
    requiredTag: '大小姐',
    options: [
      { label: '含泪收下', effectDescription: '富婆饿饿饭饭。', successChance: 1.0, impact: { stressChange: -30, technique: 10 } },
      { label: '坚持付租金 (¥5000)', effectDescription: '维护了作为队长的最后尊严。', successChance: 1.0, impact: { money: -5000, mental: 20, stability: 10 } },
      { label: '让她把设备退回去', effectDescription: '“我们要靠自己的力量！”', successChance: 0.1, impact: { mental: 50 }, failImpact: { affectionChange: -20 } }
    ]
  },
  {
    id: 'tag_genius_bored',
    title: '天才的瓶颈',
    description: '[NAME] 躺在地板上玩手机，刚才那首超难的曲子她只练了一遍就完美了。“好无聊啊，就没有更有挑战性的东西吗？”',
    requiredTag: '天才',
    options: [
      { label: '把谱子倒过来练', effectDescription: '她竟然真的做到了……', successChance: 0.9, impact: { technique: 30, fatigue: 20 }, failImpact: { stressChange: 20 } },
      { label: '那就去写歌！', effectDescription: '压榨她的剩余价值。', successChance: 0.8, impact: { composing: 20 }, failImpact: { stressChange: 15 } },
      { label: '带她去打街机', effectDescription: '在音游上彻底击败她！', successChance: 0.4, impact: { mental: 20, affectionChange: 20 }, failImpact: { stressChange: 10 } }
    ]
  },
  {
    id: 'tag_heavy_love',
    title: '沉重的视线',
    description: '最近你的包里总是莫名其妙出现你最爱喝的饮料，而且总觉得排练时 [NAME] 盯着你看的时间比看谱子还长。',
    requiredTag: '重女',
    options: [
      { label: '假装没发现', effectDescription: '只要不戳破，就是安全的……吧？', successChance: 1.0, impact: { stressChange: 15, mental: 5 } },
      { label: '温柔地感谢她', effectDescription: '她脸红到了耳根，练习效率翻倍。', successChance: 1.0, impact: { affectionChange: 60, stressChange: -20, technique: 5 } },
      { label: '严肃地谈谈', effectDescription: '“我只是想照顾队长……”', successChance: 0.2, impact: { stability: 20 }, failImpact: { stability: -40, affectionChange: -10 } }
    ]
  },
  // --- NEW EVENTS ---
  {
    id: 'tag_gamer_allnighter',
    title: '网游废人的黑眼圈',
    description: '[NAME] 戴着巨大的黑眼圈出现在练习室，手里还拿着功能饮料。“昨天公会战打到了早上五点……但我没事……Zzz……”',
    requiredTag: '网游废人',
    options: [
      { label: '没收设备，强制补觉', effectDescription: '“我的每日签到——！”', successChance: 1.0, impact: { fatigue: -40, stressChange: 10 } },
      { label: '聊聊昨晚的战况', effectDescription: '她瞬间精神了。', successChance: 1.0, impact: { affectionChange: 15, fatigue: 10 } },
      { label: '把游戏BGM改编成摇滚', effectDescription: '奇怪的灵感增加了。', successChance: 0.8, impact: { creativity: 20, arrangement: 15 }, failImpact: { fatigue: 20 } }
    ]
  },
  {
    id: 'tag_muscle_training',
    title: '肌肉即正义',
    description: '“大家的体能太差了！” [NAME] 拿出了一套魔鬼训练计划，包括500个深蹲和10公里跑。',
    requiredTag: '体力怪物',
    options: [
      { label: '全员跟随特训！', effectDescription: '第二天全员肌肉酸痛，但体力上限增加了。', successChance: 0.9, impact: { fatigue: 50, stagePresence: 20 }, failImpact: { fatigue: 80 } },
      { label: '婉言拒绝', effectDescription: '“切，没劲。”', successChance: 1.0, impact: { affectionChange: -5 } },
      { label: '只让她一个人练', effectDescription: '她一个人跑得很开心。', successChance: 1.0, impact: { fatigue: 20, stressChange: -10 } }
    ]
  },
  {
    id: 'tag_money_solution',
    title: '没钱解决不了的',
    description: '“LiveHouse的门票卖不出去？” [NAME] 拿出了黑卡，“那我把票全买下来送给路人不就好了？”',
    requiredTag: '钞能力',
    options: [
      { label: '坚决制止！这是作弊！', effectDescription: '“什么嘛，人家只是想帮忙。”', successChance: 1.0, impact: { mental: 20, affectionChange: -10 } },
      { label: '只买一半', effectDescription: '肮脏的妥协。', successChance: 1.0, impact: { fans: 50, money: 0 } }, // No money logic change but flavor
      { label: '把钱用来做广告宣传', effectDescription: '这才是正确的用法！', successChance: 1.0, impact: { fans: 1000, design: 10 } }
    ]
  },
  {
    id: 'tag_perfectionist_redo',
    title: '再录一遍',
    description: '录音已经进行了十个小时，大家都精疲力尽了，但 [NAME] 还是不满意。“第108小节的呼吸声大了0.5分贝，重来。”',
    requiredTag: '完美主义',
    options: [
      { label: '陪她录到满意为止', effectDescription: '诞生了完美的作品，但大家差点猝死。', successChance: 1.0, impact: { quality: 20, technique: 20, fatigue: 60 } }, // quality not direct impact but handled via logic usually
      { label: '强行终止录音', effectDescription: '“啧，残次品。”', successChance: 1.0, impact: { stressChange: 20, affectionChange: -20, fatigue: 0 } },
      { label: '骗她说已经很完美了', effectDescription: '善意的谎言。', successChance: 0.5, impact: { stressChange: -10 }, failDescription: '被识破了。', failImpact: { affectionChange: -30 } }
    ]
  },
  {
    id: 'tag_my_pace_late',
    title: '随性而至',
    description: '排练开始半小时了，[NAME] 才慢悠悠地推门进来，手里还拿着一只刚抓到的独角仙。“看！很帅吧？”',
    requiredTag: '随性',
    options: [
      { label: '大发雷霆', effectDescription: '虽然她道歉了，但下次还敢。', successChance: 1.0, impact: { stressChange: 20, affectionChange: -10 } },
      { label: '和独角仙一起玩', effectDescription: '排练？什么排练？', successChance: 1.0, impact: { stressChange: -30, fatigue: -10, technique: -10 } },
      { label: '以此为灵感即兴演奏', effectDescription: '《独角仙之舞》。', successChance: 0.8, impact: { creativity: 20 } }
    ]
  },
  {
    id: 'tag_visual_makeup',
    title: '视觉系的坚持',
    description: '[NAME] 提着一大箱化妆品来了。“既然要上台，大家的妆容必须由我来把关！队长的眉毛太淡了！”',
    requiredTag: '视觉系',
    options: [
      { label: '任由她摆布', effectDescription: '大家变成了奇怪的哥特风，但气场很强。', successChance: 1.0, impact: { stagePresence: 25, design: 10 } },
      { label: '誓死抵抗', effectDescription: '保住了素颜。', successChance: 1.0, impact: { affectionChange: -5 } },
      { label: '只画眼线', effectDescription: '意外地很适合你。', successChance: 1.0, impact: { stagePresence: 10, affectionChange: 10 } }
    ]
  }
];
