
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const SPECIALISTS: Member[] = [
  // --- New Recruits (Assigned to Specialists) ---
  {
      id: 'n_11', name: '近田 霓虹', roles: [Role.DJ],
      musicality: 45, technique: 35, stagePresence: 70, creativity: 50, mental: 55,
      fatigue: 0, stress: 10, affection: 60, personality: '活跃在涩谷街头的时尚辣妹，也是人气超高的美妆博主。',
      tags: ['辣妹', '现充'], interactionsLeft: 2, composing: 35, lyrics: 30, arrangement: 55, design: 75,
      favoriteGenres: [MusicGenre.Dance, MusicGenre.Electronic], favoriteLyricThemes: [LyricTheme.Party, LyricTheme.Love],
      screenName: 'Neon @party_night',
      snsStyle: '各种Party和聚会的合照，滤镜很潮，Emoji浓度极高。'
  },
  {
      id: 'n_12', name: '月下 千春', roles: [Role.Violin],
      musicality: 65, technique: 60, stagePresence: 55, creativity: 45, mental: 30,
      fatigue: 0, stress: 30, affection: 20, personality: '总是穿着哥特洛丽塔洋装，认为自己是吸血鬼的后裔。',
      tags: ['视觉系', '中二病'], interactionsLeft: 2, composing: 45, lyrics: 50, arrangement: 45, design: 60,
      favoriteGenres: [MusicGenre.Gothic, MusicGenre.Classic], favoriteLyricThemes: [LyricTheme.Gothic, LyricTheme.Dark],
      screenName: 'Sonata @moonlight_v',
      snsStyle: '文字晦涩难懂，喜欢用古语，照片总是暗黑风格。'
  },
  {
      id: 'n_18', name: '村上 响', roles: [Role.Producer, Role.DJ],
      musicality: 45, technique: 35, stagePresence: 45, creativity: 70, mental: 30,
      fatigue: 0, stress: 40, affection: 30, personality: '认为噪音才是最美的音乐，喜欢收集街道的声音进行采样。',
      tags: ['前卫', '电波'], interactionsLeft: 2, composing: 70, lyrics: 15, arrangement: 70, design: 50,
      favoriteGenres: [MusicGenre.Noise, MusicGenre.Industrial], favoriteLyricThemes: [LyricTheme.Absurdist, LyricTheme.Dark],
      screenName: 'Hibiki @noise_art',
      snsStyle: '发布录音笔记录下的环境音，或者奇怪的波形图。'
  },
  {
      id: 'n_19', name: '近藤 雅', roles: [Role.Saxophone],
      musicality: 65, technique: 60, stagePresence: 50, creativity: 45, mental: 60,
      fatigue: 0, stress: 10, affection: 40, personality: '言行举止充满成熟韵味的大姐姐，喜欢在深夜的酒吧吹奏。',
      tags: ['大姐姐', '爵士'], interactionsLeft: 2, composing: 35, lyrics: 30, arrangement: 45, design: 40,
      favoriteGenres: [MusicGenre.Jazz, MusicGenre.Blues], favoriteLyricThemes: [LyricTheme.Love, LyricTheme.Classic],
      screenName: 'Miyabi @blue_jazz',
      snsStyle: '分享红酒、黑胶唱片和深夜的城市夜景，非常有格调。'
  },
  {
      id: 'n_31', name: '弓削 绯色', roles: [Role.Violin],
      musicality: 60, technique: 70, stagePresence: 55, creativity: 35, mental: 20,
      fatigue: 0, stress: 50, affection: 95, personality: '对声音有着病态的执着，如果不让她拉琴就会黑化。',
      tags: ['重力', '古典'], interactionsLeft: 2, composing: 30, lyrics: 15, arrangement: 45, design: 20,
      favoriteGenres: [MusicGenre.Classic, MusicGenre.Gothic], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Love],
      screenName: 'Hiiro @red_string',
      snsStyle: '每天发几十条关于练习的内容，偶尔夹杂着一些“想要独占”的危险发言。'
  },
  {
      id: 'n_36', name: '风雅 千鸟', roles: [Role.Saxophone],
      musicality: 65, technique: 65, stagePresence: 40, creativity: 70, mental: 35,
      fatigue: 0, stress: 20, affection: 30, personality: '总是使用最新型的电子管乐器 (EWI)，看起来像个科幻电影里的未来人。气息控制力惊人。',
      tags: ['未来人', '电波', '器材党'], interactionsLeft: 2, composing: 50, lyrics: 20, arrangement: 70, design: 60,
      favoriteGenres: [MusicGenre.Electronic, MusicGenre.Jazz], favoriteLyricThemes: [LyricTheme.SciFi],
      screenName: 'Wind_Digital @ewi_future',
      snsStyle: '发布充满赛博朋克感的霓虹灯照片和电子合成音色试听。'
  },
  {
      id: 'n_39', name: '眠井 寐', roles: [Role.DJ],
      musicality: 60, technique: 40, stagePresence: 20, creativity: 60, mental: 70,
      fatigue: 0, stress: 0, affection: 40, personality: '总是抱着抱枕的Lo-Fi女孩，能在站着的时候睡着，但混音时绝不出错。',
      tags: ['随性', '治愈', '家里蹲'], interactionsLeft: 2, composing: 50, lyrics: 10, arrangement: 60, design: 30,
      favoriteGenres: [MusicGenre.IndieRock, MusicGenre.Electronic], favoriteLyricThemes: [LyricTheme.Youth],
      screenName: 'Sleepy @lofi_study',
      snsStyle: '没有任何文字，只有Lo-Fi HipHop直播间的截图。'
  },

  // --- Standard Specialists ---
  { 
    id: 'x_01', name: 'DJ K-KO', roles: [Role.DJ], 
    musicality: 45, technique: 35, stagePresence: 70, creativity: 55, mental: 60, 
    fatigue: 0, stress: 0, affection: 50, personality: '白天是普通的优等生，晚上是涉谷夜店的神秘DJ。', 
    tags: ['DJ', '双重身份'], interactionsLeft: 2, 
    composing: 45, lyrics: 20, arrangement: 60, design: 45, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Party],
    screenName: 'K-KO @kko_official', snsStyle: '非常酷，只在深夜发演出预告。'
  },
  { 
    id: 'x_02', name: '青井 萨克斯', roles: [Role.Saxophone], 
    musicality: 55, technique: 50, stagePresence: 55, creativity: 35, mental: 45, 
    fatigue: 0, stress: 10, affection: 40, personality: '充满成熟魅力的吹奏部前辈，喜欢在独奏时闭眼陶醉。', 
    tags: ['大姐姐', '爵士'], interactionsLeft: 2, 
    composing: 30, lyrics: 20, arrangement: 45, design: 20, 
    favoriteGenres: [MusicGenre.Jazz, MusicGenre.Blues], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Aoi @sax_blue', snsStyle: '成熟稳重，喜欢发红酒和爵士乐的照片。'
  },
  { 
    id: 'x_03', name: '结城 雅', roles: [Role.Violin, Role.Vocal], 
    musicality: 60, technique: 60, stagePresence: 45, creativity: 40, mental: 25, 
    fatigue: 0, stress: 15, affection: 30, personality: '试图将古典融入摇滚的大小姐，拉小提琴时表情会变得很狰狞。', 
    tags: ['古典', '跨界'], interactionsLeft: 2, 
    composing: 35, lyrics: 15, arrangement: 50, design: 30, 
    favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Poetic],
    screenName: 'Miyabi @miyabi_v', snsStyle: '平时很高雅，但在谈论摇滚时会突然变得狂热。'
  },
  { 
    id: 'x_04', name: '响 优奈', roles: [Role.Producer, Role.Guitar], 
    musicality: 45, technique: 35, stagePresence: 30, creativity: 60, mental: 45, 
    fatigue: 0, stress: 10, affection: 50, personality: '特摄宅女，总是想把变身音效加进歌曲里。', 
    tags: ['特摄厨', '热血'], interactionsLeft: 2, 
    composing: 55, lyrics: 40, arrangement: 55, design: 20, 
    favoriteGenres: [MusicGenre.JRock, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Rebellion],
    screenName: 'Yuna @henshin_yuna', snsStyle: '热血沸腾，每条推文都像是在变身。'
  },
  { 
    id: 'x_05', name: '出云 墨', roles: [Role.DJ, Role.Keyboard], 
    musicality: 50, technique: 45, stagePresence: 35, creativity: 60, mental: 30, 
    fatigue: 0, stress: 20, affection: 40, personality: '总是带着录音笔收集各种声音（包括尖叫声）的怪人。', 
    tags: ['电波', '技术流'], interactionsLeft: 2, 
    composing: 55, lyrics: 15, arrangement: 60, design: 45, 
    favoriteGenres: [MusicGenre.Industrial, MusicGenre.Electronic], favoriteLyricThemes: [LyricTheme.Absurdist],
    screenName: 'Sumi @noise_collect', snsStyle: '发一些奇怪的声音采样波形图。'
  }
];
