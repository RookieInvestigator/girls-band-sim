
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const VOCALS: Member[] = [
  // --- New Recruits (Assigned to Vocal) ---
  {
      id: 'n_01', name: '佐野 诗织', roles: [Role.Vocal],
      musicality: 80, technique: 60, stagePresence: 95, creativity: 70, mental: 85,
      fatigue: 0, stress: 20, affection: 30, personality: '自尊心极高的大小姐，认为自己生来就是为了站在聚光灯下。',
      tags: ['完美主义', '大小姐'], interactionsLeft: 2, composing: 50, lyrics: 70, arrangement: 40, design: 80,
      favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Rebellion],
      screenName: 'Shiori @queen_shiori',
      snsStyle: '每张照片都经过精修，配文简短优雅，喜欢发下午茶和名牌包。'
  },
  {
      id: 'n_06', name: '鹿野 奏', roles: [Role.Vocal, Role.Guitar],
      musicality: 65, technique: 55, stagePresence: 70, creativity: 50, mental: 65,
      fatigue: 0, stress: 10, affection: 70, personality: '虽然没有突出的才能，但比任何人都努力的普通女高中生。',
      tags: ['练习狂', '凡人'], interactionsLeft: 2, composing: 40, lyrics: 50, arrangement: 30, design: 40,
      favoriteGenres: [MusicGenre.JPop, MusicGenre.PopRock], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Love],
      screenName: 'Kanade @music_diary',
      snsStyle: '像日记一样记录每天的练习进度，非常真诚。'
  },
  {
      id: 'n_14', name: '梦见月 诗织', roles: [Role.Vocal],
      musicality: 75, technique: 50, stagePresence: 60, creativity: 80, mental: 20,
      fatigue: 0, stress: 50, affection: 40, personality: '仿佛随时会消失的透明感少女，写出的歌词充满了悲伤。',
      tags: ['玻璃心', '文学少女'], interactionsLeft: 2, composing: 40, lyrics: 95, arrangement: 20, design: 30,
      favoriteGenres: [MusicGenre.Ballad, MusicGenre.PostRock], favoriteLyricThemes: [LyricTheme.Poetic, LyricTheme.Sea],
      screenName: 'Yume @bubble_dream',
      snsStyle: '深夜发布一些忧郁的诗句，配上模糊的雨景图。'
  },
  {
      id: 'n_20', name: '石川 瑠璃', roles: [Role.Vocal],
      musicality: 90, technique: 60, stagePresence: 90, creativity: 50, mental: 60,
      fatigue: 0, stress: 20, affection: 70, personality: '拥有宝石般眼眸的混血儿，拥有天使般的歌喉和纯真无邪的性格。',
      tags: ['天然', '偶像'], interactionsLeft: 2, composing: 30, lyrics: 30, arrangement: 20, design: 60,
      favoriteGenres: [MusicGenre.Pop, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Fantasy, LyricTheme.Love],
      screenName: 'Ruri @lapis_gem',
      snsStyle: '喜欢发亮晶晶的东西，比如首饰、星空，配文充满童心。'
  },
  {
      id: 'n_21', name: '镜见 琉璃', roles: [Role.Vocal],
      musicality: 95, technique: 85, stagePresence: 60, creativity: 40, mental: 50,
      fatigue: 0, stress: 40, affection: 10, personality: '声乐科第一名，认为摇滚是“粗俗的噪音”但为了反抗父母而加入。',
      tags: ['古典', '傲娇', '大小姐'], interactionsLeft: 2, composing: 60, lyrics: 20, arrangement: 80, design: 50,
      favoriteGenres: [MusicGenre.Classic, MusicGenre.SymphonicMetal], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Satire],
      screenName: 'Ruri @opera_diva',
      snsStyle: '经常转发歌剧演出的信息，偶尔会发“哼，勉强承认你们的实力”这种傲娇言论。'
  },
  {
      id: 'n_22', name: '戌亥 篝', roles: [Role.Vocal, Role.Guitar],
      musicality: 70, technique: 60, stagePresence: 50, creativity: 75, mental: 80,
      fatigue: 0, stress: 0, affection: 90, personality: '喜欢在河边弹唱民谣的森系女孩，声音有种让时间静止的治愈感。',
      tags: ['治愈', '吟游诗人'], interactionsLeft: 2, composing: 70, lyrics: 70, arrangement: 30, design: 40,
      favoriteGenres: [MusicGenre.Folk, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Poetic, LyricTheme.Youth],
      screenName: 'Bonfire @camp_songs',
      snsStyle: '野营、篝火和木吉他的照片，给人一种暖洋洋的感觉。'
  },

  // --- Standard Vocals ---
  { 
    id: 'v_01', name: '朝比奈 空', roles: [Role.Vocal, Role.Guitar], 
    musicality: 60, technique: 45, stagePresence: 80, creativity: 40, mental: 70, 
    fatigue: 0, stress: 10, affection: 50, personality: '正统派的主人公性格，为了帅气地弹唱而正在苦练吉他。', 
    tags: ['努力家', '青春'], interactionsLeft: 2, 
    composing: 30, lyrics: 50, arrangement: 10, design: 30, 
    favoriteGenres: [MusicGenre.JRock, MusicGenre.PopPunk], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Sora @sora_music', snsStyle: '像日记一样记录每天的练习进度，非常真诚。'
  },
  { 
    id: 'v_02', name: '山我 柚实', roles: [Role.Vocal], 
    musicality: 70, technique: 60, stagePresence: 90, creativity: 30, mental: 40, 
    fatigue: 0, stress: 20, affection: 30, personality: '前地下偶像Center，因为想做“真正的音乐”而退团，自尊心很高。', 
    tags: ['前偶像', '傲娇'], interactionsLeft: 2, 
    composing: 20, lyrics: 40, arrangement: 10, design: 80, 
    favoriteGenres: [MusicGenre.Idol, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Party],
    screenName: 'YUMI @yumi_real', snsStyle: '即使退团了还是保留着偶像的营业语气，但偶尔会忍不住吐槽。'
  },
  { 
    id: 'v_03', name: '平势 三千', roles: [Role.Vocal], 
    musicality: 45, technique: 30, stagePresence: 95, creativity: 50, mental: 90, 
    fatigue: 0, stress: 0, affection: 60, personality: '每天都要喝珍珠奶茶的辣妹，虽然音准一般但现场煽动力满分。', 
    tags: ['辣妹', '现充'], interactionsLeft: 2, 
    composing: 10, lyrics: 30, arrangement: 5, design: 90, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Dance], favoriteLyricThemes: [LyricTheme.Party],
    screenName: 'Michi☆Gal @michiii_gal', snsStyle: 'Emoji浓度极高✨💅🧋，喜欢发自拍和美食。'
  },
  { 
    id: 'v_04', name: '久美 纪', roles: [Role.Vocal], 
    musicality: 65, technique: 55, stagePresence: 40, creativity: 85, mental: 20, 
    fatigue: 0, stress: 40, affection: 40, personality: '总是躲在图书馆的文学少女，写出的歌词充满了毁灭的美感。', 
    tags: ['文学少女', '内向'], interactionsLeft: 2, 
    composing: 40, lyrics: 95, arrangement: 20, design: 30, 
    favoriteGenres: [MusicGenre.Shoegaze, MusicGenre.Emo], favoriteLyricThemes: [LyricTheme.Poetic, LyricTheme.Philosophy],
    screenName: 'Ink @ink_stain', snsStyle: '引用晦涩的诗句或者小说片段，基本不发原创内容。'
  },
  { 
    id: 'v_05', name: '国部 幸', roles: [Role.Vocal], 
    musicality: 55, technique: 50, stagePresence: 85, creativity: 40, mental: 80, 
    fatigue: 0, stress: 10, affection: 30, personality: '不良少女的领袖，嗓音沙哑有爆发力，意外地很讲义气。', 
    tags: ['不良', '大姐头'], interactionsLeft: 2, 
    composing: 20, lyrics: 60, arrangement: 10, design: 10, 
    favoriteGenres: [MusicGenre.Punk, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: 'Boss @boss_michi', snsStyle: '字数很少，语气很冲，喜欢用“💢”表情。'
  },
  { 
    id: 'v_06', name: '天宫 梦', roles: [Role.Vocal], 
    musicality: 80, technique: 70, stagePresence: 50, creativity: 60, mental: 30, 
    fatigue: 0, stress: 20, affection: 40, personality: '在网络上拥有一百万粉丝的神秘翻唱歌手，现实中却极度怕生。', 
    tags: ['社恐', '网络歌手'], interactionsLeft: 2, 
    composing: 50, lyrics: 40, arrangement: 50, design: 60, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Fantasy],
    screenName: 'Yume @yumi_sing', snsStyle: '在网上非常活泼话痨（键盘侠模式），现实中几乎不更新动态。'
  },
  { 
    id: 'v_07', name: '小鸟游 翼', roles: [Role.Vocal], 
    musicality: 60, technique: 50, stagePresence: 70, creativity: 45, mental: 60, 
    fatigue: 0, stress: 10, affection: 60, personality: '为了在文化祭上追随憧憬的前辈而组建乐队的追梦少女。', 
    tags: ['憧憬', '普通人'], interactionsLeft: 2, 
    composing: 30, lyrics: 80, arrangement: 20, design: 30, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Poetic],
    screenName: 'Tsubasa @wing_love', snsStyle: '充满了少女心的粉色滤镜，喜欢转发星座占卜。'
  },
  { 
    id: 'v_08', name: '黑木 蕾', roles: [Role.Vocal, Role.Bass], 
    musicality: 70, technique: 65, stagePresence: 60, creativity: 50, mental: 40, 
    fatigue: 0, stress: 30, affection: 50, personality: '贝斯手出身的主唱，喜欢低沉的旋律，性格有些阴郁。', 
    tags: ['消极', '稳重'], interactionsLeft: 2, 
    composing: 40, lyrics: 70, arrangement: 30, design: 20, 
    favoriteGenres: [MusicGenre.IndieRock, MusicGenre.Shoegaze], favoriteLyricThemes: [LyricTheme.Dark],
    screenName: 'LowFreq @low_freq', snsStyle: '经常在深夜三点发一些黑白的风景照。'
  },
  { 
    id: 'v_09', name: '凤 瑛里', roles: [Role.Vocal, Role.Violin], 
    musicality: 85, technique: 80, stagePresence: 75, creativity: 60, mental: 50, 
    fatigue: 0, stress: 20, affection: 20, personality: '出生于音乐世家的小提琴首席，为了反抗家族而开始唱摇滚。', 
    tags: ['古典', '叛逆'], interactionsLeft: 2, 
    composing: 60, lyrics: 30, arrangement: 70, design: 40, 
    favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Classic], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Rebellion],
    screenName: 'Eri @eri_rebel', snsStyle: '用词典雅但内容叛逆，反差感很强。'
  },
  { 
    id: 'v_10', name: '赤城 杏子', roles: [Role.Vocal], 
    musicality: 50, technique: 45, stagePresence: 90, creativity: 30, mental: 80, 
    fatigue: 0, stress: 0, affection: 40, personality: '关西来的转学生，比起唱歌更喜欢在MC环节讲相声。', 
    tags: ['搞笑艺人', '乐天派'], interactionsLeft: 2, 
    composing: 10, lyrics: 30, arrangement: 10, design: 20, 
    favoriteGenres: [MusicGenre.PopPunk, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Satire],
    screenName: 'Kyoko @kyoko_lol', snsStyle: '用关西腔发推，全是笑话和段子。'
  }
];
