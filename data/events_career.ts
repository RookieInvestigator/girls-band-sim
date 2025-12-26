
import { GameEvent, ScheduleAction } from '../types';

export const CAREER_EVENTS: GameEvent[] = [
  {
    id: 'car_scout_shibuya',
    title: '涉谷的星探',
    description: '在涉谷路口街拍时，有个戴墨镜的大叔递来了名片。“虽然还很稚嫩，但你们身上有‘那个’东西。”',
    condition: (state) => state.fans > 5000,
    options: [
      { label: '保持警惕，查查底细', effectDescription: '好像是个皮包公司。', successChance: 1.0, impact: { mental: 10, stability: 5 } },
      { label: '为了出道拼了！(¥10000)', effectDescription: '被骗了报名费……', successChance: 0.0, impact: {}, failImpact: { money: -10000, stressChange: 50, mental: -20 } },
      { label: '我们不需要大人指手画脚', effectDescription: '独立乐队的骨气！', successChance: 1.0, impact: { fans: 500, stability: 10 } }
    ]
  },
  {
    id: 'car_viral_video',
    title: '短视频爆红',
    description: '昨天随手发的一段排练视频，不知为何被算法选中了！点赞数正在疯狂上涨！',
    condition: (state) => state.fans > 1000,
    options: [
      { label: '趁热打铁开直播', effectDescription: '虽然很紧张，但吸粉无数。', successChance: 0.8, impact: { fans: 3000, stagePresence: 10 }, failImpact: { fans: 500, stressChange: 10 } },
      { label: '回复每一条评论', effectDescription: '虽然很累，但固粉效果很好。', successChance: 1.0, impact: { fans: 1500, fatigue: 20, affectionChange: 5 } },
      { label: '保持神秘，不予置评', effectDescription: '被评价为“高冷实力派”。', successChance: 0.6, impact: { fans: 1000, mental: 10 }, failImpact: { fans: -200 } }
    ]
  },
  {
    id: 'car_school_fes',
    title: '文化祭压轴',
    description: '学生会发来邀请，希望你们能在文化祭的后夜祭上作为压轴乐队登场！全校同学都会看着你们！',
    condition: (state) => state.currentWeek >= 28 && state.currentWeek <= 30 && state.fans > 500,
    options: [
      { label: '必须拿下！特训开始！', effectDescription: '这是制霸校园的第一步！', successChance: 0.8, impact: { fans: 6000, stagePresence: 25 }, failDescription: '太紧张了，甚至有人破音。', failImpact: { fans: 500, stressChange: 20 } },
      { label: '穿特制制服上台', requiredTag: '设计', effectDescription: '视觉效果满分！', successChance: 1.0, impact: { fans: 8000, design: 15 } },
      { label: '用原创曲决胜负', effectDescription: '虽然冒险，但这就是摇滚。', successChance: 0.5, impact: { fans: 10000, creativity: 30 }, failImpact: { fans: -1000, mental: -10 } }
    ]
  },
  // --- NEW EVENTS ---
  {
    id: 'car_radio_chance',
    title: '深夜电台的邀请',
    description: '一家地方电台的深夜节目发来邮件，邀请乐队去做一期嘉宾。虽然听众不多，但这可是正经的媒体曝光！',
    condition: (state) => state.fans > 3000,
    options: [
      { label: '精心准备谈话内容', effectDescription: '虽然有点僵硬，但诚意传达到了。', successChance: 0.9, impact: { fans: 1000, mental: 10 }, failImpact: { stressChange: 15 } },
      { label: '现场即兴演奏', effectDescription: '主持人被震惊了，播放量大增！', successChance: 0.7, impact: { fans: 2500, stagePresence: 20 }, failDescription: '设备故障，变成了放送事故。', failImpact: { fans: -100, stressChange: 30 } },
      { label: '推掉，专心练琴', effectDescription: '错过了机会，但保持了神秘感。', successChance: 1.0, impact: { technique: 5 } }
    ]
  },
  {
    id: 'car_busking_police',
    title: '街头演出的意外',
    description: '在车站广场演出正High的时候，远处走来了两个穿制服的警察叔叔。“这里禁止大声喧哗，有没有许可证？”',
    condition: (state) => state.actionCounts['StreetLive'] > 5,
    options: [
      { label: '鞠躬道歉，光速撤离', effectDescription: '虽然狼狈，但保住了乐器。', successChance: 1.0, impact: { stressChange: 20, mental: -5 } },
      { label: '用最后一首歌结束！', effectDescription: '观众帮忙求情，演完了全场。', successChance: 0.4, impact: { fans: 800, mental: 20 }, failDescription: '被批评教育了一顿。', failImpact: { stressChange: 40, mental: -10 } },
      { label: '卖萌装傻', effectDescription: '“诶？我们以为这里可以……”', successChance: 0.5, impact: { mental: 5 }, failImpact: { stressChange: 10 } }
    ]
  },
  {
    id: 'car_merch_fail',
    title: '周边印错了！',
    description: '新定做的100件T恤到了，但是……乐队名字母印错了一个！ BAND 变成了 BAMD。',
    condition: (state) => state.money > 5000 && state.actionCounts['DesignWork'] > 3,
    options: [
      { label: '作为“错版限定”出售', effectDescription: '居然意外地很受欢迎？', successChance: 0.6, impact: { money: 5000, fans: 200 }, failDescription: '被粉丝嘲笑了。', failImpact: { money: -2000, fans: -100 } },
      { label: '全部销毁重做 (¥3000)', effectDescription: '追求完美是要付出代价的。', successChance: 1.0, impact: { money: -3000, design: 10, stability: 10 } },
      { label: '自己留着当睡衣', effectDescription: '每人分了20件……', successChance: 1.0, impact: { money: -2000, affectionChange: 10 } }
    ]
  },
  {
    id: 'car_blog_review',
    title: '毒舌乐评人',
    description: '某个以毒舌著称的音乐博主竟然转发了你们的视频，配文是：“也就是及格线水平，毫无新意。”',
    condition: (state) => state.fans > 8000,
    options: [
      { label: '虚心接受批评', effectDescription: '“谢谢指教，我们会努力的！”', successChance: 1.0, impact: { mental: 15, stability: 10 } },
      { label: '写歌Diss回去', effectDescription: '充满了攻击性的新歌爆火。', successChance: 0.5, impact: { fans: 2000, creativity: 20 }, failImpact: { fans: -500, stressChange: 30 } },
      { label: '全员取关拉黑', effectDescription: '眼不见心不烦。', successChance: 1.0, impact: { stressChange: -10 } }
    ]
  },
  {
    id: 'car_idol_collab',
    title: '地下偶像的邀约',
    description: '一个不知名的地下偶像团体邀请你们去做伴奏乐队。报酬不错，但这符合我们的摇滚精神吗？',
    condition: (state) => state.fans > 500 && state.money < 5000,
    options: [
      { label: '接受邀约，赚钱要紧 (¥8000)', effectDescription: '虽然有点羞耻，但钱是香的。', successChance: 1.0, impact: { money: 8000, stressChange: 20 } },
      { label: '断然拒绝', effectDescription: '我们可是要上武道馆的！', successChance: 1.0, impact: { mental: 10, stability: 5 } },
      { label: '尝试改编她们的歌', effectDescription: '把偶像曲改成了硬核金属。', successChance: 0.7, impact: { fans: 1000, arrangement: 20 }, failImpact: { fans: -200 } }
    ]
  },
  {
    id: 'car_mv_location',
    title: 'MV取景地之争',
    description: '终于要开始筹备MV拍摄了！但是对于取景地，大家产生了分歧。废弃工厂还是阳光海滩？',
    condition: (state) => state.money >= 5000 && state.fans >= 3000, // Trigger based on potential, not action history
    options: [
      { label: '废弃工厂 (¥1000)', effectDescription: '酷炫、颓废、摇滚！', successChance: 1.0, impact: { money: -1000, stagePresence: 20, fans: 500 } },
      { label: '阳光海滩 (¥5000)', effectDescription: '像是青春偶像剧一样。', successChance: 1.0, impact: { money: -5000, fans: 2000, affectionChange: 20 } },
      { label: '就在学校天台 (¥0)', effectDescription: '回归原点，也是一种情怀。', successChance: 1.0, impact: { fans: 800, stability: 15 } }
    ]
  }
];
