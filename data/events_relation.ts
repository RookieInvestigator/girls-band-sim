
import { GameEvent } from '../types';

export const RELATIONSHIP_EVENTS: GameEvent[] = [
  {
    id: 'rel_secret_account',
    title: '秘密小号',
    description: '你在推特上偶然发现了一个小号，里面全是 [NAME] 的碎碎念，甚至还有一些关于乐队的真心话。',
    options: [
      { label: '装作不知道', effectDescription: '守护她的秘密花园。', successChance: 1.0, impact: { mental: 5, affectionChange: 5 } },
      { label: '匿名点赞鼓励她', effectDescription: '“虽然不知道你是谁，谢谢。”', successChance: 0.8, impact: { stressChange: -10, stability: 10 }, failDescription: '手滑点了个踩。', failImpact: { stressChange: 20, affectionChange: -5 } },
      { label: '直接去问她', effectDescription: '由于过度羞耻，她当场宕机。', successChance: 0.2, impact: { affectionChange: 20 }, failImpact: { stability: -20, stressChange: 30 } }
    ]
  },
  {
    id: 'rel_makeup_fight',
    title: '方向性不合？',
    description: '“所以说，这里应该用减九和弦啊！” “哈？那样一点都不朋克好吗！” 练习室里爆发了激烈的争吵。',
    options: [
      { label: '用音乐决胜负', effectDescription: 'Jam Session 解决一切！', successChance: 0.7, impact: { technique: 20, creativity: 20 }, failImpact: { stability: -20 } },
      { label: '带她们去吃烤肉 (¥5000)', effectDescription: '没有什么是一顿牛舌解决不了的。', successChance: 1.0, impact: { money: -5000, affectionChange: 30, stressChange: -40 } },
      { label: '各退一步，融合风格', effectDescription: '诞生了奇怪但好听的段落。', successChance: 0.5, impact: { arrangement: 30, stability: 10 }, failImpact: { stability: -10 } }
    ]
  },
  {
    id: 'rel_birthday',
    title: '惊喜生日',
    description: '今天是 [NAME] 的生日。为了瞒着她准备蛋糕，大家还假装忘记了这回事，结果把她弄哭了。',
    options: [
      { label: '拿出藏好的蛋糕和礼物', effectDescription: '哭得更厉害了，不过是感动的泪水。', successChance: 1.0, impact: { affectionChange: 50, stability: 20 } },
      { label: '为她演奏专属的生日歌', effectDescription: '这首歌将成为经典。', successChance: 0.8, impact: { creativity: 25, musicality: 10 }, failImpact: { affectionChange: 20 } },
      { label: '去KTV通宵狂欢 (¥3000)', effectDescription: '嗓子哑了，心近了。', successChance: 1.0, impact: { money: -3000, stressChange: -50, fatigue: 30 } }
    ]
  },
  // --- NEW EVENTS ---
  {
    id: 'rel_creative_diff',
    title: 'Pop还是Rock？',
    description: '新歌的编曲陷入僵局。吉他手想加更重的失真，键盘手却觉得轻快一点更吸粉。',
    options: [
      { label: '听队长的：走Rock路线', effectDescription: '变得更帅气了，但键盘手有点不开心。', successChance: 1.0, impact: { stagePresence: 10, affectionChange: -5 } },
      { label: '听队长的：走Pop路线', effectDescription: '变得更流行了，吉他手觉得不够劲。', successChance: 1.0, impact: { fans: 200, affectionChange: -5 } },
      { label: '写两首歌！', effectDescription: '工作量翻倍，但大家都满意。', successChance: 0.6, impact: { creativity: 40, fatigue: 30 }, failImpact: { fatigue: 40, stressChange: 20 } }
    ]
  },
  {
    id: 'rel_family_call',
    title: '来自老家的电话',
    description: '排练间隙，[NAME] 接了一个电话，表情变得很凝重。“妈妈问我什么时候放弃玩乐队回老家考公务员……”',
    options: [
      { label: '抢过电话大声承诺', effectDescription: '“阿姨放心！我们会成为世界第一的乐队！”', successChance: 0.5, impact: { mental: 20, affectionChange: 20 }, failDescription: '被对方挂断了电话。', failImpact: { stressChange: 20 } },
      { label: '默默拍拍她的背', effectDescription: '无言的支持。', successChance: 1.0, impact: { affectionChange: 10, stability: 5 } },
      { label: '用下一场演出来证明', effectDescription: '眼神变得坚定了。', successChance: 1.0, impact: { technique: 5, mental: 10 } }
    ]
  },
  {
    id: 'rel_gossip',
    title: '奇怪的传闻',
    description: '学校论坛里有人发帖说 [NAME] 其实是某财团的私生女/前不良少女/外星人……谣言越传越离谱。',
    options: [
      { label: '在SNS上幽默回应', effectDescription: '“如果是外星人的话，请给我飞船。”', successChance: 0.8, impact: { fans: 500, mental: 10 }, failImpact: { fans: -100, stressChange: 15 } },
      { label: '严肃辟谣', effectDescription: '虽然正经，但有点无趣。', successChance: 1.0, impact: { stability: 10 } },
      { label: '不予理会', effectDescription: '流言止于智者。', successChance: 1.0, impact: { stressChange: 10 } }
    ]
  },
  {
    id: 'rel_rainy_umbrella',
    title: '只有一把伞',
    description: '离开LiveHouse时下起了大雨，而你和 [NAME] 加起来只有一把透明雨伞。',
    options: [
      { label: '两人共撑一把伞', effectDescription: '肩膀碰在一起，心跳声被雨声掩盖。', successChance: 1.0, impact: { affectionChange: 30, stressChange: -10 } },
      { label: '把伞给她，自己淋雨', effectDescription: '帅气是帅气，但是感冒了。', successChance: 1.0, impact: { affectionChange: 40, fatigue: 20, mental: 5 } },
      { label: '等雨停再走', effectDescription: '聊了很多平时不会聊的话题。', successChance: 1.0, impact: { affectionChange: 15, stability: 10 } }
    ]
  },
  {
    id: 'rel_midnight_convenience',
    title: '便利店的微光',
    description: '凌晨两点，你在便利店偶遇了同样睡不着的 [NAME]。两人坐在门口的长椅上，手里捧着热咖啡。',
    options: [
      { label: '聊聊对未来的迷茫', effectDescription: '原来大家都在不安啊。', successChance: 1.0, impact: { mental: 10, stability: 15 } },
      { label: '什么都不说，静静坐着', effectDescription: '这种沉默并不尴尬。', successChance: 1.0, impact: { stressChange: -20, affectionChange: 10 } },
      { label: '请她吃肉包 (¥300)', effectDescription: '暖呼呼的。', successChance: 1.0, impact: { money: -300, fatigue: -5, affectionChange: 15 } }
    ]
  },
  {
    id: 'rel_band_anniversary',
    title: '结成纪念日',
    description: '不知不觉，乐队已经成立一段时间了。虽然离武道馆还很远，但值得庆祝一下！',
    options: [
      { label: '去高级餐厅聚餐 (¥10000)', effectDescription: '钱包大出血，但大家开心就好！', successChance: 1.0, impact: { money: -10000, affectionChange: 50, stressChange: -50 } },
      { label: '在练习室开披萨派对 (¥2000)', effectDescription: '还是这里最自在。', successChance: 1.0, impact: { money: -2000, affectionChange: 20, stability: 20 } },
      { label: '写一首纪念曲', effectDescription: '初心不改。', successChance: 1.0, impact: { composing: 30, lyrics: 30, mental: 20 } }
    ]
  }
];
