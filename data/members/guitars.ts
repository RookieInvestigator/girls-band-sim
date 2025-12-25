
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const GUITARS: Member[] = [
  // --- New Recruits (Assigned to Guitar) ---
  {
      id: 'n_02', name: '游马 碧', roles: [Role.Guitar],
      musicality: 65, technique: 85, stagePresence: 40, creativity: 75, mental: 60,
      fatigue: 0, stress: 10, affection: 40, personality: '把吉他当成手柄操作的游戏宅，追求AP（All Perfect）的演奏。',
      tags: ['网游废人', '技术流'], interactionsLeft: 2, composing: 80, lyrics: 30, arrangement: 60, design: 20,
      favoriteGenres: [MusicGenre.Electronic, MusicGenre.MathRock], favoriteLyricThemes: [LyricTheme.SciFi],
      screenName: 'AOI @player_one',
      snsStyle: '充斥着游戏术语和高分截图，偶尔发一张吉他指板的照片。'
  },
  {
      id: 'n_07', name: '桐生 刹那', roles: [Role.Guitar],
      musicality: 70, technique: 90, stagePresence: 75, creativity: 60, mental: 70,
      fatigue: 0, stress: 40, affection: 20, personality: '总是独来独往的冷酷吉他手，追求极致的速度。',
      tags: ['酷', '技术流'], interactionsLeft: 2, composing: 60, lyrics: 20, arrangement: 50, design: 30,
      favoriteGenres: [MusicGenre.Metal, MusicGenre.Hardcore], favoriteLyricThemes: [LyricTheme.Dark],
      screenName: 'Setsuna @flash_cut',
      snsStyle: '极少更新，偶尔发一张黑白的吉他特写，不带文字。'
  },
  {
      id: 'n_13', name: '木村 千寻', roles: [Role.Guitar, Role.Producer],
      musicality: 70, technique: 70, stagePresence: 50, creativity: 90, mental: 60,
      fatigue: 0, stress: 20, affection: 30, personality: '喜欢蒸汽朋克风格的发明家，吉他上装满了奇怪的齿轮和仪表。',
      tags: ['怪人', '技术宅'], interactionsLeft: 2, composing: 80, lyrics: 30, arrangement: 85, design: 70,
      favoriteGenres: [MusicGenre.Industrial, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Fantasy],
      screenName: 'Chihiro @gear_maker',
      snsStyle: '展示自己改造乐器的过程，满桌子的零件和工具。'
  },

  // --- Standard Guitars ---
  { 
    id: 'g_01', name: '田中 美咲', roles: [Role.Guitar], 
    musicality: 55, technique: 55, stagePresence: 50, creativity: 40, mental: 60, 
    fatigue: 0, stress: 10, affection: 70, personality: '想要成为唱作人的普通少女，正在努力学习边弹边唱。', 
    tags: ['凡人', '努力家'], interactionsLeft: 2, 
    composing: 40, lyrics: 40, arrangement: 30, design: 20, 
    favoriteGenres: [MusicGenre.Folk, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Misaki @misa_g', snsStyle: '平平淡淡的记录生活。'
  },
  { 
    id: 'g_02', name: '西园寺 丽华', roles: [Role.Guitar], 
    musicality: 60, technique: 55, stagePresence: 70, creativity: 40, mental: 50, 
    fatigue: 0, stress: 20, affection: 30, personality: '用零花钱买了一整墙昂贵吉他的大小姐，认为音色也是实力的一部分。', 
    tags: ['大小姐', '器材党'], interactionsLeft: 2, 
    composing: 30, lyrics: 20, arrangement: 20, design: 60, 
    favoriteGenres: [MusicGenre.Classic, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Reika @reika_collection', snsStyle: '像时尚博主一样展示自己的昂贵乐器。'
  },
  { 
    id: 'g_03', name: '佐藤 健太', roles: [Role.Guitar], 
    musicality: 45, technique: 40, stagePresence: 80, creativity: 20, mental: 90, 
    fatigue: 0, stress: 0, affection: 50, personality: '棒球部的替补队员，把挥棒的力度用在了扫弦上，经常断弦。', 
    tags: ['体育系', '破坏神'], interactionsLeft: 2, 
    composing: 10, lyrics: 10, arrangement: 10, design: 10, 
    favoriteGenres: [MusicGenre.Punk, MusicGenre.PopPunk], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: 'Kenta @homerun_k', snsStyle: '全是关于棒球和吉他维修的内容，直男语气。'
  },
  { 
    id: 'g_04', name: '小川 唯', roles: [Role.Guitar], 
    musicality: 60, technique: 50, stagePresence: 30, creativity: 40, mental: 40, 
    fatigue: 0, stress: 10, affection: 70, personality: '性格温吞的天然呆，给自己的每一把吉他都取了名字。', 
    tags: ['天然', '治愈'], interactionsLeft: 2, 
    composing: 30, lyrics: 20, arrangement: 20, design: 40, 
    favoriteGenres: [MusicGenre.Folk, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Yui @fluffy_yui', snsStyle: '发很多小动物的照片，说话软绵绵的。'
  },
  { 
    id: 'g_05', name: '风间 苍', roles: [Role.Guitar], 
    musicality: 70, technique: 75, stagePresence: 50, creativity: 60, mental: 60, 
    fatigue: 0, stress: 20, affection: 20, personality: '总是戴着耳机独来独往的酷女孩，深受父亲收藏的老摇滚唱片影响。', 
    tags: ['酷', '早熟'], interactionsLeft: 2, 
    composing: 50, lyrics: 30, arrangement: 60, design: 30, 
    favoriteGenres: [MusicGenre.Rock, MusicGenre.Blues], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: 'Blue @blue_wind', snsStyle: '只分享老摇滚的专辑封面，不怎么说话。'
  },
  { 
    id: 'g_06', name: '七海 露西亚', roles: [Role.Guitar], 
    musicality: 50, technique: 60, stagePresence: 75, creativity: 40, mental: 30, 
    fatigue: 0, stress: 30, affection: 40, personality: '为了向前乐队的同伴复仇而开始玩乐器，结果意外地觉醒了才能。', 
    tags: ['傲娇', '复仇'], interactionsLeft: 2, 
    composing: 30, lyrics: 60, arrangement: 20, design: 50, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Satire],
    screenName: 'Lucia @lucia_revenge', snsStyle: '经常发一些意味深长的情感语录。'
  },
  { 
    id: 'g_07', name: '音无 由可里', roles: [Role.Guitar], 
    musicality: 65, technique: 65, stagePresence: 20, creativity: 70, mental: 40, 
    fatigue: 0, stress: 10, affection: 30, personality: '全程盯着脚下效果器的鞋式摇滚乐手，用噪音构筑音墙。', 
    tags: ['鞋式摇滚', '社恐'], interactionsLeft: 2, 
    composing: 60, lyrics: 20, arrangement: 70, design: 10, 
    favoriteGenres: [MusicGenre.Shoegaze, MusicGenre.MathRock], favoriteLyricThemes: [LyricTheme.Absurdist],
    screenName: 'Yukari @shoegazer_y', snsStyle: '只发地板和鞋子的照片。'
  },
  { 
    id: 'g_08', name: '花园 绮罗', roles: [Role.Guitar], 
    musicality: 55, technique: 50, stagePresence: 90, creativity: 30, mental: 60, 
    fatigue: 0, stress: 20, affection: 40, personality: '兼职读者模特，把舞台当成T台，非常在意打光角度。', 
    tags: ['模特', '现充'], interactionsLeft: 2, 
    composing: 20, lyrics: 30, arrangement: 10, design: 80, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Idol], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'KIRA✨ @kira_model', snsStyle: '专业的网红风格，每张照片都精修过。'
  },
  { 
    id: 'g_09', name: '橘 奏', roles: [Role.Guitar], 
    musicality: 75, technique: 80, stagePresence: 40, creativity: 50, mental: 70, 
    fatigue: 0, stress: 30, affection: 20, personality: '理科班的学霸，被称为“人体节拍器”，容不得半点抢拍或拖拍。', 
    tags: ['完美主义', '学霸'], interactionsLeft: 2, 
    composing: 40, lyrics: 10, arrangement: 60, design: 10, 
    favoriteGenres: [MusicGenre.MathRock, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Kanade @metronome_k', snsStyle: '纠正别人的错别字，发一些复杂的乐理分析。'
  },
  { 
    id: 'g_10', name: '黑木 零', roles: [Role.Guitar, Role.Producer], 
    musicality: 70, technique: 65, stagePresence: 30, creativity: 80, mental: 50, 
    fatigue: 0, stress: 10, affection: 30, personality: '擅长DTM（桌面音乐制作）的宅女，比起现场演奏更喜欢在电脑前编曲。', 
    tags: ['技术宅', '幕后'], interactionsLeft: 2, 
    composing: 80, lyrics: 40, arrangement: 85, design: 40, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.SciFi],
    screenName: 'Zero @zero_dtm', snsStyle: '全是关于合成器插件和DAW软件的截图。'
  },
  { 
    id: 'g_11', name: '雾岛 莲', roles: [Role.Guitar], 
    musicality: 55, technique: 70, stagePresence: 60, creativity: 50, mental: 30, 
    fatigue: 0, stress: 20, affection: 40, personality: '平时是乖乖女，一上台就会画上烟熏妆释放压力的视觉系信徒。', 
    tags: ['视觉系', '反差萌'], interactionsLeft: 2, 
    composing: 40, lyrics: 40, arrangement: 50, design: 70, 
    favoriteGenres: [MusicGenre.VisualKei, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Rebellion],
    screenName: 'Lotus @bloody_lotus', snsStyle: '充斥着十字架和骷髅符号，中二气息浓厚。'
  }
];
