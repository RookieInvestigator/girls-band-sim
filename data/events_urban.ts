
import { GameEvent } from '../types';

export const URBAN_EVENTS: GameEvent[] = [
  {
    id: 'urb_gear_hunt',
    title: '御茶之水寻宝',
    description: '来到了乐器店云集的御茶之水。在一家不起眼的二手店角落里，发现了一块落满灰尘的效果器，看起来像是停产的经典款。',
    condition: (state) => state.money >= 2000,
    options: [
      { label: '赌一把买下它 (¥2000)', effectDescription: '擦干净后发现真的是神级装备！', successChance: 0.7, impact: { money: -2000, technique: 20, quality: 10 }, failDescription: '是坏的，修不好了。', failImpact: { money: -2000, stressChange: 20 } },
      { label: '跟店长聊聊音乐', effectDescription: '店长开心了，送了你一套琴弦。', successChance: 1.0, impact: { mental: 10, money: 500 } }, // Equivalent to saving money
      { label: '忍痛离开', effectDescription: '回去后一直念念不忘。', successChance: 1.0, impact: { stressChange: 10 } }
    ]
  },
  {
    id: 'urb_ramen_king',
    title: '拉面大王挑战',
    description: '常去的拉面店推出了“地狱激辛拉面”，30分钟内吃完免单，还能把名字贴在墙上！[NAME] 看起来跃跃欲试。',
    condition: (state) => state.money >= 800,
    options: [
      { label: '为了荣誉，挑战！', effectDescription: '嘴唇肿了，但名字留下了！', successChance: 0.5, impact: { mental: 20, fans: 50, stressChange: -20 }, failDescription: '第二天全员肚子痛，缺席训练。', failImpact: { fatigue: 40, stressChange: 20 } },
      { label: '普通地吃豚骨拉面 (¥800)', effectDescription: '美味就是正义。', successChance: 1.0, impact: { money: -800, fatigue: -10, stressChange: -10 } },
      { label: '点一份大份替玉（加面）', effectDescription: '碳水化合物大满足。', successChance: 1.0, impact: { fatigue: -20 } }
    ]
  },
  {
    id: 'urb_mystery_cd',
    title: '神秘的Demo',
    description: 'LiveHouse 的休息室桌子上遗落着一张没有标签的CD。出于好奇，你们把它放进了播放器……传出的是极其前卫的噪音音乐。',
    condition: (state) => Math.random() < 0.2,
    options: [
      { label: '这是艺术！深受启发！', effectDescription: '这种奇怪的音色可以用在新歌里。', successChance: 0.6, impact: { creativity: 30, arrangement: 20 }, failImpact: { stressChange: 15 } },
      { label: '听得san值狂掉', effectDescription: '赶紧关掉！', successChance: 1.0, impact: { stressChange: 10, mental: -5 } },
      { label: '试图寻找失主', effectDescription: '原来是隔壁乐队忘拿的采样盘。', successChance: 1.0, impact: { rivalRelation: 10, mental: 5 } }
    ]
  },
  {
    id: 'urb_fan_gift',
    title: '粉丝的手作礼物',
    description: '收到了一大箱快递，打开一看，全是粉丝亲手折的千纸鹤，还有一本贴满你们演出照片的剪贴簿。',
    condition: (state) => state.fans > 500,
    options: [
      { label: '拍视频认证感谢', effectDescription: '“我们会好好珍惜的！”', successChance: 1.0, impact: { fans: 200, affectionChange: 10, mental: 10 } },
      { label: '感动得痛哭流涕', effectDescription: '原来我们的音乐真的传达到了。', successChance: 1.0, impact: { stability: 20, mental: 20, stressChange: -30 } },
      { label: '把千纸鹤挂在练习室', effectDescription: '看着它们就充满了力量。', successChance: 1.0, impact: { technique: 5, fatigue: -10 } }
    ]
  },
  {
    id: 'urb_mv_comment',
    title: 'MV评论区的战争',
    description: '新MV的评论区吵翻天了。一派认为“风格变了，失去了初心”，另一派认为“这是必要的进化”。[NAME] 拿着手机的手在发抖。',
    condition: (state) => state.songs.length > 0 && state.fans > 1000,
    options: [
      { label: '发布长文解释创作理念', effectDescription: '真诚的态度打动了理智粉。', successChance: 0.8, impact: { fans: 300, stability: 10 }, failImpact: { stressChange: 20 } },
      { label: '用下一首作品说话', effectDescription: '“闭嘴，听歌。”', successChance: 1.0, impact: { technique: 10, composing: 10, mental: 10 } },
      { label: '禁止成员看评论', effectDescription: '物理屏蔽负能量。', successChance: 1.0, impact: { stressChange: -10, mental: 5 } }
    ]
  },
  {
    id: 'urb_street_cat_2',
    title: '捡到了小猫',
    description: '在一个雨夜的纸箱里，发现了一只瑟瑟发抖的小奶猫。虽然练习室禁止养宠物，但……',
    options: [
      { label: '偷偷养在吉他盒里', effectDescription: '成为了乐队的吉祥物。', successChance: 0.8, impact: { mental: 20, stressChange: -30, affectionChange: 20 }, failDescription: '被管理员发现了，罚款。', failImpact: { money: -2000, stressChange: 20 } },
      { label: '帮它找领养人', effectDescription: '虽然不舍，但这是负责任的做法。', successChance: 1.0, impact: { mental: 10, stability: 10 } },
      { label: '带回家自己养', effectDescription: '从此变成了猫奴。', successChance: 1.0, impact: { fatigue: 10, stressChange: -20 } }
    ]
  },
  {
    id: 'urb_instrument_store',
    title: '一日店长',
    description: '熟识的乐器店老板闪了腰，拜托你们帮忙看一天店。“卖出去的东西提成归你们！”',
    condition: (state) => state.fans > 1000,
    options: [
      { label: '疯狂推销高端琴', effectDescription: '凭借口才忽悠（划掉）说服了顾客。', successChance: 0.6, impact: { money: 3000, mental: 10 }, failImpact: { fatigue: 20 } },
      { label: '在店里开小型Live', effectDescription: '吸引了很多人，虽然没卖多少东西。', successChance: 1.0, impact: { fans: 400, stagePresence: 10 } },
      { label: '趁机保养自己的乐器', effectDescription: '公费保养，赚了。', successChance: 1.0, impact: { technique: 5, money: 500 } }
    ]
  },
  {
    id: 'urb_karaoke_battle',
    title: '隔壁的歌声',
    description: '在KTV团建时，隔壁包厢传来了超强的歌声，竟然在唱你们的歌！而且唱得比原唱还好听？！',
    condition: (state) => state.songs.length > 0 && Math.random() < 0.2,
    options: [
      { label: '冲过去合唱！', effectDescription: '原来是隐藏的大神粉丝！', successChance: 0.9, impact: { fans: 100, mental: 20, affectionChange: 10 }, failImpact: { stressChange: 10 } },
      { label: '不服输，唱得更大声', effectDescription: '变成了隔墙对飙高音。', successChance: 1.0, impact: { musicality: 10, fatigue: 20, stressChange: -20 } },
      { label: '默默听完，鼓掌', effectDescription: '心情很复杂。', successChance: 1.0, impact: { mental: 5, stability: 5 } }
    ]
  },
  {
    id: 'urb_freestyle_rap',
    title: '突然的Rap对决',
    description: '在公园练习时，一群玩说唱的年轻人走了过来。“嘿，拿吉他的小妞，要不要来一段Beat？”',
    options: [
      { label: '接受挑战！Rock vs Rap！', effectDescription: '跨界碰撞火花四溅！', successChance: 0.7, impact: { technique: 20, fans: 300, creativity: 15 }, failImpact: { stressChange: 20 } },
      { label: '给他们伴奏', effectDescription: '音乐是无国界的。', successChance: 1.0, impact: { arrangement: 20, musicality: 10 } },
      { label: '收拾东西快跑', effectDescription: '气场太强了惹不起。', successChance: 1.0, impact: { stressChange: 5 } }
    ]
  },
  {
    id: 'urb_lost_child',
    title: '迷路的小孩',
    description: '去LiveHouse的路上，一个小女孩哭着拉住了 [NAME] 的衣角。演出马上就要开始了，怎么办？',
    condition: (state) => Math.random() < 0.1,
    options: [
      { label: '送去警察局（可能会迟到）', effectDescription: '虽然迟到了，但内心是温暖的。', successChance: 1.0, impact: { mental: 30, fans: 100 }, failImpact: { fans: -50 } }, // Good deed bonus
      { label: '带她一起去LiveHouse', effectDescription: '让她在后台看着，成为了特邀小观众。', successChance: 0.8, impact: { affectionChange: 20, stability: 10 }, failImpact: { stressChange: 20 } },
      { label: '用歌声哄她开心', effectDescription: '小孩停止了哭泣，露出了笑容。', successChance: 1.0, impact: { musicality: 10, stressChange: -10 } }
    ]
  }
];
