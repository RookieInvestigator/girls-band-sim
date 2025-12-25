
import { GameEvent } from '../types';

export const SCHOOL_EVENTS: GameEvent[] = [
  {
    id: 'sch_ban_threat',
    title: '理事长的禁令',
    description: '“轻音部的噪音已经严重影响了升学班的同学！”被称为“魔鬼”的教导主任站在练习室门口，手里拿着废部通知书，“除非你们能在下次全校集会上证明音乐的价值。”',
    condition: (state) => state.currentWeek > 4 && state.fans < 1000,
    options: [
      { label: '在集会上进行震撼演出', effectDescription: '用实力让大人闭嘴！', successChance: 0.7, impact: { fans: 500, mental: 20, stagePresence: 20 }, failDescription: '设备故障，变成了笑话。', failImpact: { stressChange: 40, mental: -20, fans: -100 } },
      { label: '全员土下座道歉', effectDescription: '只要能保住社团，尊严算什么！', successChance: 1.0, impact: { stressChange: 30, mental: -10, stability: 10 } },
      { label: '承诺全员考进年级前50', effectDescription: '地狱般的学习生活开始了。', successChance: 0.6, impact: { mental: 30, fatigue: 40 }, failImpact: { stressChange: 50 } }
    ]
  },
  {
    id: 'sch_exam_hell',
    title: '期末修罗场',
    description: '期末考试临近，如果不合格就要补考，补考时间正好和Live撞车！练习室里弥漫着绝望的气息，大家手里拿的不是乐器而是单词本。',
    condition: (state) => [12, 24, 36, 48].includes(state.currentWeek),
    options: [
      { label: '暂停排练，通宵复习', effectDescription: '由于睡眠不足，黑眼圈很重。', successChance: 1.0, impact: { fatigue: 30, technique: -5, mental: 10 } },
      { label: '把知识点编成歌', effectDescription: '“氢氦锂铍硼~♪”', successChance: 0.8, impact: { creativity: 20, mental: 10 }, failImpact: { stressChange: 20 } },
      { label: '靠直觉蒙混过关', effectDescription: '把命运交给骰子。', successChance: 0.3, impact: { stressChange: -20 }, failDescription: '全员挂科，含泪补考。', failImpact: { mental: -30, fatigue: 20, stressChange: 30 } }
    ]
  },
  {
    id: 'sch_rooftop_lock',
    title: '天台的钥匙',
    description: '那是传说中的“摇滚圣地”——学校天台。但是通往天台的门被锁住了，据说只有清洁工阿姨手里有一把备用钥匙。',
    condition: (state) => state.currentWeek > 2,
    options: [
      { label: '去讨好清洁工阿姨', effectDescription: '帮忙倒了一周垃圾。', successChance: 1.0, impact: { mental: 10, fatigue: 15, stability: 5 } },
      { label: '练习开锁技能', effectDescription: '这是犯罪吧？！', successChance: 0.1, impact: { creativity: 50 }, failDescription: '被老师发现了，写了检讨。', failImpact: { stressChange: 30, mental: -10 } },
      { label: '就在楼梯间练习', effectDescription: '天然混响，意外地不错。', successChance: 1.0, impact: { musicality: 10, stressChange: -5 } }
    ]
  },
  {
    id: 'sch_budget_war',
    title: '社团经费争夺战',
    description: '学生会正在分配下学期的社团经费。吹奏部想要新乐器，篮球部想要新队服，而轻音部申请的是……一大堆零食和新音箱？',
    condition: (state) => state.currentWeek % 12 === 1 && state.currentWeek > 1,
    options: [
      { label: '据理力争：音箱是刚需！', effectDescription: '舌战群儒。', successChance: 0.6, impact: { money: 3000, mental: 10 }, failImpact: { stressChange: 15 } },
      { label: '表演卖惨', effectDescription: '“我们的吉他弦都生锈了……”', successChance: 0.8, impact: { money: 1000 }, failImpact: { fans: -50 } },
      { label: '放弃经费，去打工吧', effectDescription: '只要自由，不要施舍。', successChance: 1.0, impact: { mental: 20, stability: 10 } }
    ]
  },
  {
    id: 'sch_broadcast',
    title: '午休广播劫持',
    description: '广播站的成员生病了，[NAME] 临时顶班。看着面前的话筒，她产生了一个大胆的想法：播放我们乐队的Demo！',
    condition: (state) => state.songs.length > 0 && Math.random() < 0.3,
    options: [
      { label: '播放最燃的那首摇滚！', effectDescription: '全校沸腾！老师冲进来了！', successChance: 0.7, impact: { fans: 300, stagePresence: 15 }, failImpact: { stressChange: 20, mental: -10 } },
      { label: '播放抒情曲', effectDescription: '不少同学听哭了。', successChance: 0.9, impact: { fans: 150, affectionChange: 10 } },
      { label: '正常念新闻稿', effectDescription: '无事发生。', successChance: 1.0, impact: { money: 500 } } // Part-time fee
    ]
  },
  {
    id: 'sch_uniform_check',
    title: '突击服装检查',
    description: '教导主任站在校门口：“裙子太短！耳钉摘下来！头发染回去！”乐队成员们正面临着最大的危机——她们的视觉系造型严重违规。',
    condition: (state) => Math.random() < 0.2,
    options: [
      { label: '乖乖整改', effectDescription: '变成了普通的土气高中生。', successChance: 1.0, impact: { stressChange: 20, design: -10 } },
      { label: '翻墙进校', effectDescription: '身手矫健！', successChance: 0.5, impact: { mental: 20, fatigue: 10 }, failDescription: '挂在了墙上。', failImpact: { stressChange: 40, fatigue: 20 } },
      { label: '声称这是“艺术表达”', effectDescription: '跟主任辩论了半小时。', successChance: 0.3, impact: { mental: 30, design: 20 }, failImpact: { stressChange: 30 } }
    ]
  },
  {
    id: 'sch_sports_relay',
    title: '体育祭接力',
    description: '班长哭着求助：“接力赛缺一个人，拜托了！” 乐队成员互相对视，谁是那个体力最好的？',
    condition: (state) => state.currentWeek >= 20 && state.currentWeek <= 24,
    options: [
      { label: '派鼓手去（体力担当）', effectDescription: '一骑绝尘，帅翻全场！', successChance: 0.9, impact: { fans: 200, fatigue: 30 }, failImpact: { fatigue: 40, stressChange: 10 } },
      { label: '全员一起陪跑', effectDescription: '虽然最后一名，但那是青春啊。', successChance: 1.0, impact: { affectionChange: 30, fatigue: 20 } },
      { label: '在终点演奏应援曲', effectDescription: '比跑步更累，但气氛炒热了。', successChance: 1.0, impact: { stagePresence: 15, fatigue: 10 } }
    ]
  },
  {
    id: 'sch_love_letter',
    title: '鞋柜里的信',
    description: '[NAME] 在鞋柜里发现了一封装饰精美的信。队友们立刻围了上来起哄。',
    condition: (state) => state.fans > 1000 && Math.random() < 0.3,
    options: [
      { label: '打开看，其实是挑战书', effectDescription: '“放学后别走，我的乐队要和你们Battle！”', successChance: 1.0, impact: { mental: 10, rivalRelation: -10 } },
      { label: '是热情的粉丝信！', effectDescription: '“请一定要加油！”', successChance: 1.0, impact: { mental: 20, stressChange: -10 } },
      { label: '是补考通知书', effectDescription: '心情跌落谷底。', successChance: 1.0, impact: { mental: -20, stressChange: 20 } }
    ]
  },
  {
    id: 'sch_career_survey',
    title: '进路调查表',
    description: '班会课上发下了进路调查表。第一志愿填什么？大学？专门学校？还是……“职业乐队”？笔尖在纸上悬停了许久。',
    condition: (state) => state.currentWeek === 40,
    options: [
      { label: '坚定地写下“音乐人”', effectDescription: '被老师叫去谈话了，但眼神没有动摇。', successChance: 1.0, impact: { mental: 30, stability: 10 } },
      { label: '先填个大学糊弄一下', effectDescription: '留条后路也是大人的智慧。', successChance: 1.0, impact: { stressChange: -10 } },
      { label: '写“维护世界和平”', effectDescription: '被罚站了。', successChance: 1.0, impact: { creativity: 10, stressChange: 10 } }
    ]
  },
  {
    id: 'sch_rainy_corridor',
    title: '放学后的走廊',
    description: '外面下着暴雨，社团活动结束后的走廊空无一人。[NAME] 看着窗外的雨幕，突然哼起了一段从未听过的旋律。',
    condition: (state) => [14, 15, 16, 17, 18].includes(state.currentWeek), // Rainy season
    options: [
      { label: '立刻拿出手机录音', effectDescription: '抓住了转瞬即逝的灵感。', successChance: 1.0, impact: { composing: 25, quality: 5 } },
      { label: '静静地听她哼完', effectDescription: '这一刻的氛围美得像画。', successChance: 1.0, impact: { affectionChange: 20, mental: 10 } },
      { label: '加入和声', effectDescription: '两人的声音在空旷的走廊里回荡。', successChance: 0.8, impact: { musicality: 15, affectionChange: 15 }, failImpact: { stressChange: 5 } }
    ]
  }
];
