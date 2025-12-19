
import { GameEvent } from '../types';

export const DAILY_EVENTS: GameEvent[] = [
  { 
    id: 'daily_purikura', 
    title: '下北泽的拍贴机', 
    description: '排练结束后，路过一家复古游戏厅。大家兴致勃勃地挤进了那台贴满贴纸的拍贴机。“队长！快点摆个Pose！”', 
    options: [
      { label: '摆出帅气的乐队姿势', effectDescription: '虽然有点中二，但很酷。', successChance: 1.0, impact: { affectionChange: 20, stability: 15 } }, 
      { label: '全员搞怪鬼脸', effectDescription: '这张照片成了黑历史（笑）。', successChance: 1.0, impact: { stressChange: -35, mental: 10 } }, 
      { label: '贴在吉他箱上', effectDescription: '这是我们的护身符。', successChance: 1.0, impact: { affectionChange: 15, stability: 10 } }
    ] 
  },
  { 
    id: 'daily_famiresu', 
    title: '深夜家庭餐厅', 
    description: '虽然已经很晚了，但大家还不想回家。在萨莉亚点了无限畅饮，关于未来的武道馆计划讨论得热火朝天。', 
    options: [
      { label: '畅谈梦想直到天亮', effectDescription: '虽然困，但心是热的。', successChance: 1.0, impact: { affectionChange: 30, fatigue: 20, stability: 20 } }, 
      { label: '其实是在赶暑假作业', effectDescription: '现实总是残酷的。', successChance: 1.0, impact: { mental: 15, fatigue: 15 } }, 
      { label: 'AA制买单 (¥800)', effectDescription: '吃了太多佛卡夏。', successChance: 1.0, impact: { money: -800, stressChange: -20 } }
    ] 
  },
  { 
    id: 'daily_rain_shelter', 
    title: '突如其来的暴雨', 
    description: '由于没有带伞，大家被困在了车站的屋檐下。雨声淅沥，远处的霓虹灯在水雾中晕开。', 
    options: [
      { label: '即兴哼唱一段旋律', effectDescription: '雨声成了最好的伴奏。', successChance: 0.8, impact: { composing: 25, creativity: 15 }, failImpact: { fatigue: 10 } }, 
      { label: '全员打车回家 (¥4000)', effectDescription: '钱包在哭泣，但乐器不能湿。', successChance: 1.0, impact: { money: -4000, fatigue: -10 } }, 
      { label: '在雨中奔跑！', effectDescription: '这就是青春啊！', successChance: 0.5, impact: { mental: 25, stressChange: -20 }, failDescription: '全员重感冒。', failImpact: { fatigue: 40, stressChange: 10 } }
    ] 
  },
  { 
    id: 'daily_vintage_shop', 
    title: '古着店大发现', 
    description: '在某条小巷的古着店里，发现了一件超级适合上台演出的复古夹克！', 
    options: [
      { label: '买下来做队服 (¥3000)', effectDescription: '视觉效果拉满！', successChance: 1.0, impact: { money: -3000, design: 20, stagePresence: 15 } }, 
      { label: '试穿拍照发Ins', effectDescription: '虽然没买，但涨粉了。', successChance: 0.8, impact: { fans: 500, stressChange: -10 }, failImpact: { fans: 50 } }, 
      { label: '跟老板砍价', effectDescription: '虽然失败了，但老板送了徽章。', successChance: 0.3, impact: { money: -1500, design: 15 }, failImpact: { design: 5 } }
    ] 
  },
  { 
    id: 'daily_tapioca', 
    title: '限定奶茶排队', 
    description: '听说那家网红奶茶店出了季节限定的“极光葡萄啵啵”。虽然前面排了长队……', 
    options: [
      { label: '排！必须排！', effectDescription: '排队时也是聊天的好机会。', successChance: 1.0, impact: { affectionChange: 15, fatigue: 10, stressChange: -15 } }, 
      { label: '去隔壁便利店买罐装咖啡', effectDescription: '这就是成年人的从容。', successChance: 1.0, impact: { money: -200, stressChange: 5 } }, 
      { label: '在队伍旁边发传单', effectDescription: '利用排队的人流宣传！', successChance: 0.7, impact: { fans: 300, mental: 10 }, failImpact: { fatigue: 15 } }
    ] 
  },
  { 
    id: 'daily_cat_encounter', 
    title: '公园的野良猫', 
    description: '常去的公园长椅上，出现了一只眼神凶恶但粘人的黑猫。', 
    options: [
      { label: '给它起名叫“吉他英雄”', effectDescription: '它似乎听懂了。', successChance: 1.0, impact: { mental: 10, stressChange: -20 } }, 
      { label: '试图捕捉它', effectDescription: '被抓伤了。', successChance: 0.2, impact: { affectionChange: 10 }, failImpact: { fatigue: 10, stressChange: 10 } }, 
      { label: '用它当模特画封面', effectDescription: '非常有感觉的构图。', successChance: 0.9, impact: { design: 25, creativity: 10 }, failImpact: { design: 5 } }
    ] 
  },
  // --- NEW EVENTS ---
  {
    id: 'daily_vending_machine',
    title: '自动贩卖机的赌局',
    description: '练习室门口的自动贩卖机出了个“？？”的神秘按钮。据说能按出隐藏饮料，也可能直接吞币。',
    options: [
      { label: '相信运气，按！(¥150)', effectDescription: '掉出来一瓶金色限定能量水！', successChance: 0.3, impact: { money: -150, fatigue: -30, mental: 10 }, failDescription: '什么都没出来，硬币也被吞了。', failImpact: { money: -150, stressChange: 10 } },
      { label: '买普通的矿泉水 (¥100)', effectDescription: '平平淡淡才是真。', successChance: 1.0, impact: { money: -100, fatigue: -5 } },
      { label: '踹它一脚', effectDescription: '警报响了，快跑！', successChance: 0.1, impact: { money: 500 }, failImpact: { stressChange: 20, fans: -50 } }
    ]
  },
  {
    id: 'daily_karaoke',
    title: '卡拉OK大赛',
    description: '虽然是乐队，但偶尔也想去KTV吼两嗓子！今天是“不管技巧只管情绪”的狂欢夜。',
    options: [
      { label: '挑战超高音ACG神曲', effectDescription: '喉咙哑了，但灵魂升华了。', successChance: 0.7, impact: { stressChange: -40, fatigue: 15 }, failImpact: { fatigue: 30, stressChange: -10 } },
      { label: '唱自己的原创歌', effectDescription: '在KTV里开试听会？', successChance: 1.0, impact: { composing: 10, arrangement: 10, stressChange: -20 } },
      { label: '只是在吃薯条', effectDescription: 'KTV的薯条最好吃了。', successChance: 1.0, impact: { fatigue: -10 } }
    ]
  },
  {
    id: 'daily_typhoon',
    title: '台风过境',
    description: '窗外狂风大作，电车停运了。大家被困在了队长的家里，听着风声呼啸。',
    options: [
      { label: '围在一起讲鬼故事', effectDescription: '胆小的成员吓得瑟瑟发抖。', successChance: 1.0, impact: { affectionChange: 20, mental: -10, stability: 10 } },
      { label: '不插电烛光排练', effectDescription: '氛围感绝了。', successChance: 0.8, impact: { creativity: 30, technique: 5 }, failImpact: { stressChange: 10 } },
      { label: '全员睡大觉', effectDescription: '难得的休息日。', successChance: 1.0, impact: { fatigue: -50, stressChange: -30 } }
    ]
  },
  {
    id: 'daily_lost_wallet',
    title: '不知名的钱包',
    description: '在去Studio的路上捡到了一个钱包，里面有几张大额钞票，但没有证件。',
    options: [
      { label: '交给附近的派出所', effectDescription: '做了好事，心情舒畅。', successChance: 1.0, impact: { mental: 20, stability: 10 } },
      { label: '作为乐队活动资金 (+¥5000)', effectDescription: '良心有点痛，但设备更重要。', successChance: 1.0, impact: { money: 5000, mental: -30, stability: -10 } },
      { label: '站在原地等失主', effectDescription: '等了一小时，练习迟到了。', successChance: 1.0, impact: { technique: -5, fatigue: 10, mental: 10 } }
    ]
  },
  {
    id: 'daily_game_night',
    title: '马里奥赛车之夜',
    description: '“最后一圈决胜负！谁输了谁明天请客！” 手柄按键的声音此起彼伏。',
    options: [
      { label: '绝不放水，全力争胜', effectDescription: '赢了比赛，输了友情（并没有）。', successChance: 0.6, impact: { mental: 15, stressChange: -20 }, failImpact: { stressChange: 10 } },
      { label: '故意输给那个家伙', effectDescription: '她笑得像个孩子一样。', successChance: 1.0, impact: { affectionChange: 25, stability: 10 } },
      { label: '只在旁边吃瓜', effectDescription: '看她们吵架也挺有趣的。', successChance: 1.0, impact: { stressChange: -10 } }
    ]
  },
  {
    id: 'daily_horoscope',
    title: '晨间占卜',
    description: '电视上的占卜师说：“今天某位乐手的幸运物是‘粉红色的吉他拨片’，否则会发生倒霉的事哦。”',
    options: [
      { label: '翻箱倒柜找粉色拨片', effectDescription: '心里踏实了。', successChance: 1.0, impact: { mental: 10, stability: 5 } },
      { label: '迷信不可取！', effectDescription: '结果出门就踩了水坑。', successChance: 0.5, impact: { mental: 5 }, failImpact: { stressChange: 15, mental: -5 } },
      { label: '把所有拨片都涂成粉色', effectDescription: '有些极端，但很有效。', successChance: 1.0, impact: { design: 10, stressChange: -5 } }
    ]
  }
];
