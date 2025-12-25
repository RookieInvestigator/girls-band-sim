
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const BASSISTS: Member[] = [
  // --- New Recruits (Assigned to Bass) ---
  {
      id: 'n_03', name: '楠木 铃', roles: [Role.Bass],
      musicality: 60, technique: 60, stagePresence: 50, creativity: 40, mental: 90,
      fatigue: 0, stress: 0, affection: 80, personality: '性格温和的治愈系，总是带着自制的便当，是乐队的稳定剂。',
      tags: ['可靠', '治愈'], interactionsLeft: 2, composing: 30, lyrics: 40, arrangement: 50, design: 30,
      favoriteGenres: [MusicGenre.Pop, MusicGenre.Folk], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Food],
      screenName: 'RinRin @bell_tree',
      snsStyle: '每天都会发自制的便当照片，配上温暖的表情包。'
  },
  {
      id: 'n_08', name: '鬼瓦 玛丽', roles: [Role.Bass],
      musicality: 60, technique: 65, stagePresence: 85, creativity: 50, mental: 80,
      fatigue: 0, stress: 10, affection: 50, personality: '看起来是不良少女，其实很喜欢可爱的小动物和玩偶。',
      tags: ['反差萌', '不良'], interactionsLeft: 2, composing: 30, lyrics: 30, arrangement: 40, design: 70,
      favoriteGenres: [MusicGenre.Punk, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Rebellion, LyricTheme.Cute],
      screenName: 'Mary @bloody_cute',
      snsStyle: '虽然头像是骷髅，但内容全是猫咪咖啡馆的探店视频。'
  },
  {
      id: 'n_15', name: '曄道 樱', roles: [Role.Bass],
      musicality: 65, technique: 75, stagePresence: 40, creativity: 30, mental: 90,
      fatigue: 0, stress: 10, affection: 50, personality: '剑道部主将，性格古板认真，把贝斯当成盾牌来守护乐队。',
      tags: ['认真', '古板'], interactionsLeft: 2, composing: 20, lyrics: 30, arrangement: 40, design: 20,
      favoriteGenres: [MusicGenre.Traditional, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Rebellion],
      screenName: 'Sakura @iron_wall',
      snsStyle: '非常简短和严肃，主要是关于训练和比赛的记录。'
  },
  {
      id: 'n_25', name: '轰 雷华', roles: [Role.Bass],
      musicality: 60, technique: 85, stagePresence: 90, creativity: 40, mental: 85,
      fatigue: 0, stress: 20, affection: 40, personality: '使用六弦贝斯的重金属狂热者，喜欢甩头和踩监听音箱。',
      tags: ['大姐头', '体力怪物'], interactionsLeft: 2, composing: 40, lyrics: 30, arrangement: 60, design: 50,
      favoriteGenres: [MusicGenre.Metal, MusicGenre.Hardcore], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Rebellion],
      screenName: 'Thunder @heavy_bass',
      snsStyle: '全是关于低频轰炸和现场Pogo的狂热发言。'
  },
  {
      id: 'n_26', name: '影山 薄荷', roles: [Role.Bass],
      musicality: 70, technique: 70, stagePresence: 30, creativity: 50, mental: 70,
      fatigue: 0, stress: 10, affection: 30, personality: '总是含着薄荷糖的无口少女，演奏出的贝斯线像冰一样冷静。',
      tags: ['三无', '学霸'], interactionsLeft: 2, composing: 50, lyrics: 20, arrangement: 60, design: 30,
      favoriteGenres: [MusicGenre.MathRock, MusicGenre.Electronic], favoriteLyricThemes: [LyricTheme.Philosophy, LyricTheme.SciFi],
      screenName: 'Mint @cool_line',
      snsStyle: '只在有新歌发布时转发，平时没有任何动静。'
  },

  // --- Standard Bassists ---
  { 
    id: 'b_01', name: '铃木 真子', roles: [Role.Bass], 
    musicality: 55, technique: 50, stagePresence: 40, creativity: 30, mental: 80, 
    fatigue: 0, stress: 10, affection: 70, personality: '总是带着急救包和零食，乐队里的老妈子担当，负责调解吵架。', 
    tags: ['妈妈', '可靠'], interactionsLeft: 2, 
    composing: 20, lyrics: 20, arrangement: 40, design: 30, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Folk], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Mako @mako_mama', snsStyle: '经常发“大家今天要记得带伞哦”之类的提醒。'
  },
  { 
    id: 'b_02', name: '藤堂 诗音', roles: [Role.Bass, Role.Vocal], 
    musicality: 65, technique: 60, stagePresence: 70, creativity: 40, mental: 60, 
    fatigue: 0, stress: 20, affection: 30, personality: '身高175cm的冰山美人，虽然不爱说话但和声非常完美。', 
    tags: ['高冷', '三无'], interactionsLeft: 2, 
    composing: 30, lyrics: 30, arrangement: 50, design: 40, 
    favoriteGenres: [MusicGenre.Rock, MusicGenre.IndieRock], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Shion @shion_t', snsStyle: '一个月只发一条，惜字如金。'
  },
  { 
    id: 'b_03', name: '中村 雏', roles: [Role.Bass], 
    musicality: 50, technique: 45, stagePresence: 60, creativity: 30, mental: 40, 
    fatigue: 0, stress: 10, affection: 60, personality: '个子很小却背着巨大的贝斯，经常被误认为是初中生。', 
    tags: ['萝莉', '吉祥物'], interactionsLeft: 2, 
    composing: 10, lyrics: 20, arrangement: 10, design: 50, 
    favoriteGenres: [MusicGenre.Pop, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Fantasy],
    screenName: 'Hina @hina_bass', snsStyle: '发很多可爱的甜点照片。'
  },
  { 
    id: 'b_04', name: '如月 恋', roles: [Role.Bass, Role.Saxophone], 
    musicality: 70, technique: 65, stagePresence: 80, creativity: 50, mental: 50, 
    fatigue: 0, stress: 20, affection: 40, personality: '吹奏部出身，偶尔会在歌曲间隙放下贝斯吹一段萨克斯独奏。', 
    tags: ['爵士', '多才多艺'], interactionsLeft: 2, 
    composing: 40, lyrics: 30, arrangement: 60, design: 30, 
    favoriteGenres: [MusicGenre.Jazz, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Ren @ren_sax_bass', snsStyle: '比较成熟稳重，喜欢分享爵士乐现场。'
  },
  { 
    id: 'b_05', name: '神崎 暗', roles: [Role.Bass], 
    musicality: 70, technique: 65, stagePresence: 80, creativity: 60, mental: 50, 
    fatigue: 0, stress: 10, affection: 30, personality: '“吾之低音乃深渊的咆哮...” 沉迷哥特萝莉装扮的中二少女。', 
    tags: ['中二病', '视觉系'], interactionsLeft: 2, 
    composing: 50, lyrics: 70, arrangement: 40, design: 70, 
    favoriteGenres: [MusicGenre.Gothic, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Fantasy],
    screenName: 'Abyss @darkness_bass', snsStyle: '全是中二病的咒语，很难看懂。'
  },
  { 
    id: 'b_06', name: '松本 友里', roles: [Role.Bass], 
    musicality: 60, technique: 70, stagePresence: 50, creativity: 50, mental: 60, 
    fatigue: 0, stress: 20, affection: 40, personality: '原本想弹吉他但是猜拳输了，结果意外觉醒了Slap天赋。', 
    tags: ['天才', '随性'], interactionsLeft: 2, 
    composing: 30, lyrics: 20, arrangement: 60, design: 20, 
    favoriteGenres: [MusicGenre.Funk, MusicGenre.Jazz], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Yuri @slap_yuri', snsStyle: '经常发一些随手拍的搞笑视频。'
  },
  { 
    id: 'b_07', name: '山田 太郎子', roles: [Role.Bass], 
    musicality: 50, technique: 50, stagePresence: 10, creativity: 20, mental: 90, 
    fatigue: 0, stress: 0, affection: 50, personality: '存在感极低，经常被自动门忽视，但节奏稳如泰山。', 
    tags: ['路人', '稳重'], interactionsLeft: 2, 
    composing: 10, lyrics: 10, arrangement: 40, design: 10, 
    favoriteGenres: [MusicGenre.Pop, MusicGenre.Folk], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Taro @taro_bass', snsStyle: '几乎没人互动的账号。'
  },
  { 
    id: 'b_08', name: '伊织 娜娜', roles: [Role.Bass], 
    musicality: 45, technique: 45, stagePresence: 75, creativity: 30, mental: 50, 
    fatigue: 0, stress: 10, affection: 40, personality: '把贝斯当做时尚单品的辣妹，指甲做得很长所以只能用拨片。', 
    tags: ['辣妹', '时尚'], interactionsLeft: 2, 
    composing: 10, lyrics: 30, arrangement: 10, design: 70, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Dance], favoriteLyricThemes: [LyricTheme.Party],
    screenName: 'Nana @nana_nail', snsStyle: '展示美甲和穿搭。'
  }
];
