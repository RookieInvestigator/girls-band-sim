
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const DRUMMERS: Member[] = [
  // --- New Recruits (Assigned to Drums) ---
  {
      id: 'n_04', name: '小林 茜', roles: [Role.Drums],
      musicality: 40, technique: 55, stagePresence: 60, creativity: 30, mental: 60,
      fatigue: 0, stress: 0, affection: 60, personality: '短跑社的主将，体力无限，打鼓像是在拆迁。',
      tags: ['体力怪物', '元气'], interactionsLeft: 2, composing: 15, lyrics: 15, arrangement: 20, design: 15,
      favoriteGenres: [MusicGenre.Punk, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Rebellion],
      screenName: 'Akane @drum_power',
      snsStyle: '全是运动打卡和健身房自拍，充满正能量的感叹号。'
  },
  {
      id: 'n_09', name: '绵拔 芙话', roles: [Role.Drums],
      musicality: 35, technique: 35, stagePresence: 70, creativity: 45, mental: 40,
      fatigue: 0, stress: 0, affection: 60, personality: '总是穿着羊绵绵睡衣的贪睡少女，吉祥物般的存在。',
      tags: ['乐天派', '吉祥物'], interactionsLeft: 2, composing: 15, lyrics: 30, arrangement: 15, design: 60,
      favoriteGenres: [MusicGenre.Pop, MusicGenre.Denpa], favoriteLyricThemes: [LyricTheme.Fantasy, LyricTheme.Cute],
      screenName: 'Fuwa @cloud_sleep',
      snsStyle: '经常发“早安”然后下午才醒，喜欢用软绵绵的颜文字 (´• ω •`)。'
  },
  {
      id: 'n_16', name: '熊猫庞庞', roles: [Role.Drums],
      musicality: 45, technique: 50, stagePresence: 65, creativity: 55, mental: 50,
      fatigue: 0, stress: 0, affection: 50, personality: '永远戴着熊猫头套的神秘鼓手，没人见过她的真面目。',
      tags: ['怪人', '搞笑艺人'], interactionsLeft: 2, composing: 20, lyrics: 15, arrangement: 30, design: 45,
      favoriteGenres: [MusicGenre.Pop, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Absurdist, LyricTheme.Food],
      screenName: 'PanPan @bamboo_eat',
      snsStyle: '全是熊猫头套的搞怪自拍，或者讲冷笑话。'
  },
  {
      id: 'n_27', name: '铁 轮', roles: [Role.Drums],
      musicality: 35, technique: 60, stagePresence: 45, creativity: 30, mental: 70,
      fatigue: 0, stress: 0, affection: 40, personality: '铁匠铺的女儿，手臂肌肉发达，能连续敲击双踩两小时不累。',
      tags: ['体力怪物', '技术流'], interactionsLeft: 2, composing: 15, lyrics: 10, arrangement: 30, design: 15,
      favoriteGenres: [MusicGenre.Metal, MusicGenre.Industrial], favoriteLyricThemes: [LyricTheme.Rebellion],
      screenName: 'Rin @iron_works',
      snsStyle: '分享自己打磨鼓棒和镲片的视频，非常有工匠精神。'
  },
  {
      id: 'n_28', name: '泡沫 梦', roles: [Role.Drums],
      musicality: 60, technique: 45, stagePresence: 20, creativity: 55, mental: 30,
      fatigue: 0, stress: 10, affection: 50, personality: '永远一副睡眼惺忪的样子，但拿起鼓棒就能敲出复杂的爵士变奏。',
      tags: ['随性', '天才'], interactionsLeft: 2, composing: 40, lyrics: 20, arrangement: 45, design: 20,
      favoriteGenres: [MusicGenre.Jazz, MusicGenre.Shoegaze], favoriteLyricThemes: [LyricTheme.Absurdist, LyricTheme.Sea],
      screenName: 'Yume @bubble_pop',
      snsStyle: '发一些意识流的短句，或者深夜的街道照片。'
  },

  // --- Standard Drummers ---
  { 
    id: 'd_01', name: '岩端 步', roles: [Role.Drums], 
    musicality: 35, technique: 45, stagePresence: 50, creativity: 20, mental: 60, 
    fatigue: 0, stress: 0, affection: 40, personality: '柔道部主将，把敲鼓当做一种格斗，鼓皮经常被打穿。', 
    tags: ['体育系', '破坏神'], interactionsLeft: 2, 
    composing: 10, lyrics: 10, arrangement: 15, design: 10, 
    favoriteGenres: [MusicGenre.Metal, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: 'Ayumu @judo_drum', snsStyle: '全是健身和肌肉的照片。'
  },
  { 
    id: 'd_02', name: '一之濑 琴美', roles: [Role.Drums], 
    musicality: 50, technique: 55, stagePresence: 20, creativity: 35, mental: 45, 
    fatigue: 0, stress: 20, affection: 30, personality: '全年级第一的学霸，像解数学题一样精确地计算节奏。', 
    tags: ['学霸', '理智'], interactionsLeft: 2, 
    composing: 30, lyrics: 15, arrangement: 50, design: 15, 
    favoriteGenres: [MusicGenre.MathRock, MusicGenre.Jazz], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Kotomi @logic_k', snsStyle: '逻辑严密，连发SNS都要分点陈述。'
  },
  { 
    id: 'd_03', name: '弘永 沙耶伽', roles: [Role.Drums, Role.Vocal], 
    musicality: 40, technique: 35, stagePresence: 60, creativity: 30, mental: 50, 
    fatigue: 0, stress: 0, affection: 60, personality: '前啦啦队队长，打鼓时笑容满面，也是队内的气氛制造者。', 
    tags: ['元气', '偶像'], interactionsLeft: 2, 
    composing: 15, lyrics: 20, arrangement: 20, design: 30, 
    favoriteGenres: [MusicGenre.PopPunk, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Sayaka @cheer_up', snsStyle: '总是充满活力，喜欢发合照。'
  },
  { 
    id: 'd_04', name: '木挽 亚美', roles: [Role.Drums], 
    musicality: 45, technique: 40, stagePresence: 35, creativity: 45, mental: 30, 
    fatigue: 0, stress: 10, affection: 30, personality: '超自然研究社社员，声称复杂的鼓点可以召唤旧日支配者。', 
    tags: ['电波', '中二病'], interactionsLeft: 2, 
    composing: 30, lyrics: 40, arrangement: 30, design: 40, 
    favoriteGenres: [MusicGenre.Gothic, MusicGenre.VisualKei], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Fantasy],
    screenName: 'Cthulhu @occult_drum', snsStyle: '发一些奇怪的符号和关于外星人的文章。'
  },
  { 
    id: 'd_05', name: '田井 大弥', roles: [Role.Drums], 
    musicality: 40, technique: 35, stagePresence: 50, creativity: 35, mental: 60, 
    fatigue: 0, stress: 0, affection: 70, personality: '大大咧咧的吐槽役，经常忘记带鼓棒，但关键时刻很可靠。', 
    tags: ['搞笑艺人', '可靠'], interactionsLeft: 2, 
    composing: 15, lyrics: 15, arrangement: 20, design: 10, 
    favoriteGenres: [MusicGenre.Rock, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Daiya @daiya_haha', snsStyle: '经常自嘲或者发一些搞笑段子。'
  },
  { 
    id: 'd_06', name: '佐藤 禅', roles: [Role.Drums], 
    musicality: 50, technique: 50, stagePresence: 30, creativity: 20, mental: 70, 
    fatigue: 0, stress: 0, affection: 20, personality: '家里是开寺庙的，把敲木鱼的节奏感运用到了极致。', 
    tags: ['佛系', '冷静'], interactionsLeft: 2, 
    composing: 15, lyrics: 30, arrangement: 20, design: 10, 
    favoriteGenres: [MusicGenre.Folk, MusicGenre.IndieRock], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Zen @zen_drum', snsStyle: '发一些寺庙的风景和富含哲理的话。'
  },
  { 
    id: 'd_07', name: '梶泽 园望', roles: [Role.Drums], 
    musicality: 35, technique: 30, stagePresence: 20, creativity: 25, mental: 15, 
    fatigue: 0, stress: 40, affection: 60, personality: '经常在Live时把鼓棒甩飞，但大家都会笑着原谅她。', 
    tags: ['弱气', '冒失'], interactionsLeft: 2, 
    composing: 10, lyrics: 15, arrangement: 10, design: 20, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Idol], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Sono @sorry_again', snsStyle: '经常在SNS上道歉或者发哭脸表情。'
  },
  { 
    id: 'd_08', name: '秋山 凛', roles: [Role.Drums], 
    musicality: 55, technique: 55, stagePresence: 45, creativity: 35, mental: 40, 
    fatigue: 0, stress: 20, affection: 40, personality: '吹奏部打击乐组出身，有着扎实的基础，对音色的颗粒感很挑剔。', 
    tags: ['认真', '技术流'], interactionsLeft: 2, 
    composing: 20, lyrics: 10, arrangement: 35, design: 15, 
    favoriteGenres: [MusicGenre.Classic, MusicGenre.Jazz], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Rin @rin_perc', snsStyle: '非常严肃，只讨论技术问题。'
  }
];
