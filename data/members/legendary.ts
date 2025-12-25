
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

// --- LEGENDARY / UR (原创传说级JK) ---
// 唯一角色设定：每个角色有一个专属Tag（Unique Tag），其余为通用Tag
export const LEGENDARY_MEMBERS: Member[] = [
  { 
    id: 'ur_shizuku', name: '立野 怜', roles: [Role.Vocal], 
    musicality: 90, technique: 40, stagePresence: 85, creativity: 95, mental: 20, 
    fatigue: 0, stress: 30, affection: 10, personality: '总是站在天台上淋雨的怪人，歌声却有着洗涤灵魂的力量。', 
    tags: ['作词天才', '重力', '电波'], // Unique: 作词天才
    interactionsLeft: 2, 
    composing: 40, lyrics: 100, arrangement: 20, design: 50,
    favoriteGenres: [MusicGenre.Emo, MusicGenre.Shoegaze, MusicGenre.Ballad],
    favoriteLyricThemes: [LyricTheme.Poetic, LyricTheme.Philosophy, LyricTheme.Dark],
    screenName: '雨食者 @rain_eater',
    snsStyle: '只在雨天发推，内容通常是模糊的风景照配上省略号。'
  },
  { 
    id: 'ur_karen', name: '鲸 溶子', roles: [Role.Keyboard, Role.Producer], 
    musicality: 85, technique: 90, stagePresence: 70, creativity: 80, mental: 80, 
    fatigue: 0, stress: 50, affection: 5, personality: '不仅是学生会长，还是全能的音乐制作人，对完美有着病态的执着。', 
    tags: ['绝对王者', '完美主义', '大小姐'], // Unique: 绝对王者
    interactionsLeft: 2, 
    composing: 90, lyrics: 60, arrangement: 95, design: 70,
    favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Classic, MusicGenre.Electronic],
    favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Philosophy],
    screenName: '鲸·Official @karen_official',
    snsStyle: '语气非常官方和礼貌，像在发新闻通稿，偶尔会暴露出对平民食物的好奇。'
  },
  { 
    id: 'ur_chihiro', name: '时 彩枝', roles: [Role.Guitar], 
    musicality: 80, technique: 98, stagePresence: 10, creativity: 60, mental: 5, 
    fatigue: 0, stress: 60, affection: 15, personality: '平时是毫无存在感的透明人，背上吉他后会变成另一个人格。', 
    tags: ['双重人格', '社恐', '技术流'], // Unique: 双重人格
    interactionsLeft: 2, 
    composing: 50, lyrics: 30, arrangement: 70, design: 10,
    favoriteGenres: [MusicGenre.MathRock, MusicGenre.Metal, MusicGenre.JRock],
    favoriteLyricThemes: [LyricTheme.Absurdist, LyricTheme.Dark],
    screenName: '吉他幽灵 @guitar_phantom',
    snsStyle: '从不露脸，只发手部或吉他的特写。深夜会发一些硬核的设备参数讨论。'
  },
  { 
    id: 'ur_akane', name: '小筱 幸音', roles: [Role.Drums, Role.Vocal], 
    musicality: 70, technique: 75, stagePresence: 90, creativity: 50, mental: 90, 
    fatigue: 0, stress: 0, affection: 80, personality: '拥有像太阳一样引力的天生队长，边打鼓边唱歌是她的绝技。', 
    tags: ['领袖气质', '元气', '铁人'], // Unique: 领袖气质
    interactionsLeft: 2, 
    composing: 40, lyrics: 50, arrangement: 40, design: 60,
    favoriteGenres: [MusicGenre.PopPunk, MusicGenre.JPop, MusicGenre.Rock],
    favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Rebellion],
    screenName: 'SUNSHINE @sunshine_akane',
    snsStyle: '大量使用感叹号和太阳表情！！！每一条都充满了正能量。'
  },
  { 
    id: 'ur_mai', name: '海道 舞', roles: [Role.Guitar, Role.Vocal], 
    musicality: 95, technique: 50, stagePresence: 95, creativity: 70, mental: 60, 
    fatigue: 0, stress: 0, affection: 60, personality: '完全不懂乐理却能写出神曲的天才少女，靠直觉活着的生物。', 
    tags: ['自由人', '天才', '天然呆'], // Unique: 自由人
    interactionsLeft: 2, 
    composing: 80, lyrics: 40, arrangement: 10, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Fantasy],
    screenName: '舞的世界 @mai_world',
    snsStyle: '经常打错字，或者发出意义不明的拟声词（如“咚咔咔！”）。'
  }
];
