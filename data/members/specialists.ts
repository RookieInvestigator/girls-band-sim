
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const SPECIALISTS: Member[] = [
  // --- New Recruits (Assigned to Specialists) ---
  {
      id: 'n_11', name: '近田 霓虹', roles: [Role.DJ],
      musicality: 60, technique: 50, stagePresence: 90, creativity: 70, mental: 70,
      fatigue: 0, stress: 10, affection: 60, personality: '活跃在涩谷街头的时尚辣妹，也是人气超高的美妆博主。',
      tags: ['辣妹', '现充'], interactionsLeft: 2, composing: 50, lyrics: 40, arrangement: 70, design: 90,
      favoriteGenres: [MusicGenre.Dance, MusicGenre.Electronic], favoriteLyricThemes: [LyricTheme.Party, LyricTheme.Love],
      screenName: 'Neon @party_night',
      snsStyle: '各种Party和聚会的合照，滤镜很潮，Emoji浓度极高。'
  },
  {
      id: 'n_12', name: '月下 千春', roles: [Role.Violin],
      musicality: 85, technique: 80, stagePresence: 75, creativity: 60, mental: 40,
      fatigue: 0, stress: 30, affection: 20, personality: '总是穿着哥特洛丽塔洋装，认为自己是吸血鬼的后裔。',
      tags: ['视觉系', '中二病'], interactionsLeft: 2, composing: 60, lyrics: 70, arrangement: 60, design: 80,
      favoriteGenres: [MusicGenre.Gothic, MusicGenre.Classic], favoriteLyricThemes: [LyricTheme.Gothic, LyricTheme.Dark],
      screenName: 'Sonata @moonlight_v',
      snsStyle: '文字晦涩难懂，喜欢用古语，照片总是暗黑风格。'
  },
  {
      id: 'n_18', name: '村上 响', roles: [Role.Producer, Role.DJ],
      musicality: 60, technique: 50, stagePresence: 60, creativity: 95, mental: 40,
      fatigue: 0, stress: 40, affection: 30, personality: '认为噪音才是最美的音乐，喜欢收集街道的声音进行采样。',
      tags: ['前卫', '电波'], interactionsLeft: 2, composing: 90, lyrics: 20, arrangement: 90, design: 70,
      favoriteGenres: [MusicGenre.Noise, MusicGenre.Industrial], favoriteLyricThemes: [LyricTheme.Absurdist, LyricTheme.Dark],
      screenName: 'Hibiki @noise_art',
      snsStyle: '发布录音笔记录下的环境音，或者奇怪的波形图。'
  },
  {
      id: 'n_19', name: '近藤 雅', roles: [Role.Saxophone],
      musicality: 85, technique: 80, stagePresence: 70, creativity: 60, mental: 80,
      fatigue: 0, stress: 10, affection: 40, personality: '言行举止充满成熟韵味的大姐姐，喜欢在深夜的酒吧吹奏。',
      tags: ['大姐姐', '爵士'], interactionsLeft: 2, composing: 50, lyrics: 40, arrangement: 60, design: 50,
      favoriteGenres: [MusicGenre.Jazz, MusicGenre.Blues], favoriteLyricThemes: [LyricTheme.Love, LyricTheme.Classic],
      screenName: 'Miyabi @blue_jazz',
      snsStyle: '分享红酒、黑胶唱片和深夜的城市夜景，非常有格调。'
  },

  // --- Standard Specialists ---
  { 
    id: 'x_01', name: 'DJ K-KO', roles: [Role.DJ], 
    musicality: 60, technique: 50, stagePresence: 90, creativity: 70, mental: 80, 
    fatigue: 0, stress: 0, affection: 50, personality: '白天是普通的优等生，晚上是涉谷夜店的神秘DJ。', 
    tags: ['DJ', '双重身份'], interactionsLeft: 2, 
    composing: 60, lyrics: 30, arrangement: 80, design: 60, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Party],
    screenName: 'K-KO @kko_official', snsStyle: '非常酷，只在深夜发演出预告。'
  },
  { 
    id: 'x_02', name: '青井 萨克斯', roles: [Role.Saxophone], 
    musicality: 70, technique: 65, stagePresence: 70, creativity: 50, mental: 60, 
    fatigue: 0, stress: 10, affection: 40, personality: '充满成熟魅力的吹奏部前辈，喜欢在独奏时闭眼陶醉。', 
    tags: ['大姐姐', '爵士'], interactionsLeft: 2, 
    composing: 40, lyrics: 30, arrangement: 60, design: 30, 
    favoriteGenres: [MusicGenre.Jazz, MusicGenre.Blues], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Aoi @sax_blue', snsStyle: '成熟稳重，喜欢发红酒和爵士乐的照片。'
  },
  { 
    id: 'x_03', name: '结城 雅', roles: [Role.Violin, Role.Vocal], 
    musicality: 75, technique: 75, stagePresence: 60, creativity: 55, mental: 30, 
    fatigue: 0, stress: 15, affection: 30, personality: '试图将古典融入摇滚的大小姐，拉小提琴时表情会变得很狰狞。', 
    tags: ['古典', '跨界'], interactionsLeft: 2, 
    composing: 50, lyrics: 20, arrangement: 65, design: 40, 
    favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Poetic],
    screenName: 'Miyabi @miyabi_v', snsStyle: '平时很高雅，但在谈论摇滚时会突然变得狂热。'
  },
  { 
    id: 'x_04', name: '响 优奈', roles: [Role.Producer, Role.Guitar], 
    musicality: 60, technique: 50, stagePresence: 40, creativity: 80, mental: 60, 
    fatigue: 0, stress: 10, affection: 50, personality: '特摄宅女，总是想把变身音效加进歌曲里。', 
    tags: ['特摄厨', '热血'], interactionsLeft: 2, 
    composing: 70, lyrics: 50, arrangement: 70, design: 30, 
    favoriteGenres: [MusicGenre.JRock, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Rebellion],
    screenName: 'Yuna @henshin_yuna', snsStyle: '热血沸腾，每条推文都像是在变身。'
  },
  { 
    id: 'x_05', name: '出云 墨', roles: [Role.DJ, Role.Keyboard], 
    musicality: 65, technique: 60, stagePresence: 50, creativity: 80, mental: 40, 
    fatigue: 0, stress: 20, affection: 40, personality: '总是带着录音笔收集各种声音（包括尖叫声）的怪人。', 
    tags: ['电波', '技术流'], interactionsLeft: 2, 
    composing: 70, lyrics: 20, arrangement: 80, design: 60, 
    favoriteGenres: [MusicGenre.Industrial, MusicGenre.Electronic], favoriteLyricThemes: [LyricTheme.Absurdist],
    screenName: 'Sumi @noise_collect', snsStyle: '发一些奇怪的声音采样波形图。'
  }
];
