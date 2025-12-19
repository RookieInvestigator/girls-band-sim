
import { Role, Member, MusicGenre, LyricTheme } from '../types';

// --- 1. LEGENDARY / UR (原创传说级JK) ---
const LEGENDARY_MEMBERS: Member[] = [
  { 
    id: 'ur_shizuku', name: '立野 怜', roles: [Role.Vocal], 
    musicality: 90, technique: 40, stagePresence: 85, creativity: 95, mental: 20, 
    fatigue: 0, stress: 30, affection: 10, personality: '总是站在天台上淋雨的怪人，歌声却有着洗涤灵魂的力量。', 
    tags: ['作词天才', '重力', '电波'], interactionsLeft: 2, 
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
    tags: ['绝对王者', '完美主义', '大小姐'], interactionsLeft: 2, 
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
    tags: ['社恐', '双重人格'], interactionsLeft: 2, 
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
    tags: ['领袖气质', '元气', '铁人'], interactionsLeft: 2, 
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
    tags: ['天才', '天然呆', '自由人'], interactionsLeft: 2, 
    composing: 80, lyrics: 40, arrangement: 10, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Fantasy],
    screenName: '舞的世界 @mai_world',
    snsStyle: '经常打错字，或者发出意义不明的拟声词（如“咚咔咔！”）。'
  }
];

// --- 2. VOCALISTS ---
const VOCALS: Member[] = [
  { 
    id: 'v_01', name: '朝比奈 空', roles: [Role.Vocal, Role.Guitar], 
    musicality: 60, technique: 45, stagePresence: 80, creativity: 40, mental: 70, 
    fatigue: 0, stress: 10, affection: 50, personality: '正统派的主人公性格，为了帅气地弹唱而正在苦练吉他。', 
    tags: ['努力家', '青春'], interactionsLeft: 2, 
    composing: 30, lyrics: 50, arrangement: 10, design: 30, 
    favoriteGenres: [MusicGenre.JRock, MusicGenre.PopPunk], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Sora @sora_music',
    snsStyle: '像日记一样记录每天的练习进度，非常真诚。'
  },
  { 
    id: 'v_02', name: '山我 柚实', roles: [Role.Vocal], 
    musicality: 70, technique: 60, stagePresence: 90, creativity: 30, mental: 40, 
    fatigue: 0, stress: 20, affection: 30, personality: '前地下偶像Center，因为想做“真正的音乐”而退团，自尊心很高。', 
    tags: ['前偶像', '傲娇'], interactionsLeft: 2, 
    composing: 20, lyrics: 40, arrangement: 10, design: 80, 
    favoriteGenres: [MusicGenre.Idol, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Party],
    screenName: 'YUMI @yumi_real',
    snsStyle: '即使退团了还是保留着偶像的营业语气，但偶尔会忍不住吐槽。'
  },
  { 
    id: 'v_03', name: '平势 三千', roles: [Role.Vocal], 
    musicality: 45, technique: 30, stagePresence: 95, creativity: 50, mental: 90, 
    fatigue: 0, stress: 0, affection: 60, personality: '每天都要喝珍珠奶茶的辣妹，虽然音准一般但现场煽动力满分。', 
    tags: ['辣妹', '现充'], interactionsLeft: 2, 
    composing: 10, lyrics: 30, arrangement: 5, design: 90, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Dance], favoriteLyricThemes: [LyricTheme.Party],
    screenName: 'Michi☆Gal @michiii_gal',
    snsStyle: 'Emoji浓度极高✨💅🧋，喜欢发自拍和美食。'
  },
  { 
    id: 'v_04', name: '具未 记', roles: [Role.Vocal], 
    musicality: 65, technique: 55, stagePresence: 40, creativity: 85, mental: 20, 
    fatigue: 0, stress: 40, affection: 40, personality: '总是躲在图书馆的文学少女，写出的歌词充满了毁灭的美感。', 
    tags: ['文学少女', '内向'], interactionsLeft: 2, 
    composing: 40, lyrics: 95, arrangement: 20, design: 30, 
    favoriteGenres: [MusicGenre.Shoegaze, MusicGenre.Emo], favoriteLyricThemes: [LyricTheme.Poetic, LyricTheme.Philosophy],
    screenName: '墨渍 @ink_stain',
    snsStyle: '引用晦涩的诗句或者小说片段，基本不发原创内容。'
  },
  { 
    id: 'v_05', name: '国部 三智', roles: [Role.Vocal], 
    musicality: 55, technique: 50, stagePresence: 85, creativity: 40, mental: 80, 
    fatigue: 0, stress: 10, affection: 30, personality: '不良少女的领袖，嗓音沙哑有爆发力，意外地很讲义气。', 
    tags: ['不良', '大姐头'], interactionsLeft: 2, 
    composing: 20, lyrics: 60, arrangement: 10, design: 10, 
    favoriteGenres: [MusicGenre.Punk, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: 'Boss @boss_michi',
    snsStyle: '字数很少，语气很冲，喜欢用“💢”表情。'
  },
  { 
    id: 'v_06', name: '天宫 梦', roles: [Role.Vocal], 
    musicality: 80, technique: 70, stagePresence: 50, creativity: 60, mental: 30, 
    fatigue: 0, stress: 20, affection: 40, personality: '在网络上拥有一百万粉丝的神秘翻唱歌手，现实中却极度怕生。', 
    tags: ['社恐', '网络歌手'], interactionsLeft: 2, 
    composing: 50, lyrics: 40, arrangement: 50, design: 60, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Fantasy],
    screenName: 'Yume @yume_sing',
    snsStyle: '在网上非常活泼话痨（键盘侠模式），现实中几乎不更新动态。'
  },
  { 
    id: 'v_07', name: '小鸟游 翼', roles: [Role.Vocal], 
    musicality: 60, technique: 50, stagePresence: 70, creativity: 45, mental: 60, 
    fatigue: 0, stress: 10, affection: 60, personality: '为了在文化祭上向喜欢的前辈告白而组建乐队的恋爱脑少女。', 
    tags: ['恋爱脑', '普通人'], interactionsLeft: 2, 
    composing: 30, lyrics: 80, arrangement: 20, design: 30, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Poetic],
    screenName: 'Tsubasa @wing_love',
    snsStyle: '充满了少女心的粉色滤镜，喜欢转发恋爱占卜。'
  },
  { 
    id: 'v_08', name: '黑木 蕾', roles: [Role.Vocal, Role.Bass], 
    musicality: 70, technique: 65, stagePresence: 60, creativity: 50, mental: 40, 
    fatigue: 0, stress: 30, affection: 50, personality: '贝斯手出身的主唱，喜欢低沉的旋律，性格有些阴郁。', 
    tags: ['消极', '稳重'], interactionsLeft: 2, 
    composing: 40, lyrics: 70, arrangement: 30, design: 20, 
    favoriteGenres: [MusicGenre.IndieRock, MusicGenre.Shoegaze], favoriteLyricThemes: [LyricTheme.Dark],
    screenName: 'LowFreq @low_freq',
    snsStyle: '经常在深夜三点发一些黑白的风景照。'
  },
  { 
    id: 'v_09', name: '凤 瑛里', roles: [Role.Vocal, Role.Violin], 
    musicality: 85, technique: 80, stagePresence: 75, creativity: 60, mental: 50, 
    fatigue: 0, stress: 20, affection: 20, personality: '出生于音乐世家的小提琴首席，为了反抗家族而开始唱摇滚。', 
    tags: ['古典', '叛逆'], interactionsLeft: 2, 
    composing: 60, lyrics: 30, arrangement: 70, design: 40, 
    favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Classic], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Rebellion],
    screenName: 'Eri @eri_rebel',
    snsStyle: '用词典雅但内容叛逆，反差感很强。'
  },
  { 
    id: 'v_10', name: '赤城 杏子', roles: [Role.Vocal], 
    musicality: 50, technique: 45, stagePresence: 90, creativity: 30, mental: 80, 
    fatigue: 0, stress: 0, affection: 40, personality: '关西来的转学生，比起唱歌更喜欢在MC环节讲相声。', 
    tags: ['搞笑艺人', '乐天派'], interactionsLeft: 2, 
    composing: 10, lyrics: 30, arrangement: 10, design: 20, 
    favoriteGenres: [MusicGenre.PopPunk, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Satire],
    screenName: 'Kyoko @kyoko_lol',
    snsStyle: '用关西腔发推，全是笑话和段子。'
  }
];

// --- 3. GUITARISTS ---
const GUITARS: Member[] = [
  { 
    id: 'g_01', name: '相内 真夕子', roles: [Role.Guitar, Role.Vocal], 
    musicality: 55, technique: 55, stagePresence: 50, creativity: 40, mental: 60, 
    fatigue: 0, stress: 10, affection: 70, personality: '想要成为唱作人的普通少女，正在努力学习边弹边唱。', 
    tags: ['凡人', '努力家'], interactionsLeft: 2, 
    composing: 40, lyrics: 40, arrangement: 30, design: 20, 
    favoriteGenres: [MusicGenre.Folk, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Mayuko @mayuko_diary', snsStyle: '平平淡淡的记录生活。'
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
    id: 'g_03', name: '雾岛 莲', roles: [Role.Guitar], 
    musicality: 55, technique: 70, stagePresence: 60, creativity: 50, mental: 30, 
    fatigue: 0, stress: 20, affection: 40, personality: '平时是乖乖女，一上台就会画上烟熏妆释放压力的视觉系信徒。', 
    tags: ['视觉系', '反差萌'], interactionsLeft: 2, 
    composing: 40, lyrics: 40, arrangement: 50, design: 70, 
    favoriteGenres: [MusicGenre.VisualKei, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Rebellion],
    screenName: 'BloodyLotus @bloody_lotus', snsStyle: '充斥着十字架和骷髅符号，中二气息浓厚。'
  },
  { 
    id: 'g_04', name: '佐佐木 诚', roles: [Role.Guitar], 
    musicality: 45, technique: 40, stagePresence: 80, creativity: 20, mental: 90, 
    fatigue: 0, stress: 0, affection: 50, personality: '棒球部的替补队员，把挥棒的力度用在了扫弦上，经常断弦。', 
    tags: ['体育系', '破坏神'], interactionsLeft: 2, 
    composing: 10, lyrics: 10, arrangement: 10, design: 10, 
    favoriteGenres: [MusicGenre.Punk, MusicGenre.PopPunk], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: '诚_Homerun @makoto_homerun', snsStyle: '全是关于棒球和吉他维修的内容，直男语气。'
  },
  { 
    id: 'g_05', name: '小川 唯', roles: [Role.Guitar], 
    musicality: 60, technique: 50, stagePresence: 30, creativity: 40, mental: 40, 
    fatigue: 0, stress: 10, affection: 70, personality: '性格温吞的天然呆，给自己的每一把吉他都取了名字。', 
    tags: ['天然', '治愈'], interactionsLeft: 2, 
    composing: 30, lyrics: 20, arrangement: 20, design: 40, 
    favoriteGenres: [MusicGenre.Folk, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Yui @yui_fluffy', snsStyle: '发很多小动物的照片，说话软绵绵的。'
  },
  { 
    id: 'g_06', name: '风间 苍', roles: [Role.Guitar], 
    musicality: 70, technique: 75, stagePresence: 50, creativity: 60, mental: 60, 
    fatigue: 0, stress: 20, affection: 20, personality: '总是戴着耳机独来独往的酷女孩，深受父亲收藏的老摇滚唱片影响。', 
    tags: ['酷', '早熟'], interactionsLeft: 2, 
    composing: 50, lyrics: 30, arrangement: 60, design: 30, 
    favoriteGenres: [MusicGenre.Rock, MusicGenre.Blues], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: 'Blue @blue_wind', snsStyle: '只分享老摇滚的专辑封面，不怎么说话。'
  },
  { 
    id: 'g_07', name: '七海 露西亚', roles: [Role.Guitar], 
    musicality: 50, technique: 60, stagePresence: 75, creativity: 40, mental: 30, 
    fatigue: 0, stress: 30, affection: 40, personality: '为了向前女友复仇而开始玩乐队，结果意外地觉醒了才能。', 
    tags: ['傲娇', '复仇'], interactionsLeft: 2, 
    composing: 30, lyrics: 60, arrangement: 20, design: 50, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Satire],
    screenName: 'Lucia @lucia_revenge', snsStyle: '经常发一些意味深长的情感语录。'
  },
  { 
    id: 'g_08', name: '音无 由可里', roles: [Role.Guitar], 
    musicality: 65, technique: 65, stagePresence: 20, creativity: 70, mental: 40, 
    fatigue: 0, stress: 10, affection: 30, personality: '全程盯着脚下效果器的鞋式摇滚乐手，用噪音构筑音墙。', 
    tags: ['鞋式摇滚', '社恐'], interactionsLeft: 2, 
    composing: 60, lyrics: 20, arrangement: 70, design: 10, 
    favoriteGenres: [MusicGenre.Shoegaze, MusicGenre.MathRock], favoriteLyricThemes: [LyricTheme.Absurdist],
    screenName: 'Shoegazer_Y @shoegazer_y', snsStyle: '只发地板和鞋子的照片。'
  },
  { 
    id: 'g_09', name: '花园 绮罗', roles: [Role.Guitar], 
    musicality: 55, technique: 50, stagePresence: 90, creativity: 30, mental: 60, 
    fatigue: 0, stress: 20, affection: 40, personality: '兼职读者模特，把舞台当成T台，非常在意打光角度。', 
    tags: ['模特', '现充'], interactionsLeft: 2, 
    composing: 20, lyrics: 30, arrangement: 10, design: 80, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Idol], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'KIRA✨ @kira_kira_model', snsStyle: '专业的网红风格，每张照片都精修过。'
  },
  { 
    id: 'g_10', name: '橘 奏', roles: [Role.Guitar], 
    musicality: 75, technique: 80, stagePresence: 40, creativity: 50, mental: 70, 
    fatigue: 0, stress: 30, affection: 20, personality: '理科班的学霸，被称为“人体节拍器”，容不得半点抢拍或拖拍。', 
    tags: ['完美主义', '学霸'], interactionsLeft: 2, 
    composing: 40, lyrics: 10, arrangement: 60, design: 10, 
    favoriteGenres: [MusicGenre.MathRock, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Metronome @metronome_k', snsStyle: '纠正别人的错别字，发一些复杂的乐理分析。'
  },
  { 
    id: 'g_11', name: '黑木 零', roles: [Role.Guitar, Role.Producer], 
    musicality: 70, technique: 65, stagePresence: 30, creativity: 80, mental: 50, 
    fatigue: 0, stress: 10, affection: 30, personality: '擅长DTM（桌面音乐制作）的宅女，比起现场演奏更喜欢在电脑前编曲。', 
    tags: ['技术宅', '幕后'], interactionsLeft: 2, 
    composing: 80, lyrics: 40, arrangement: 85, design: 40, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.SciFi],
    screenName: 'Zero @zero_dtm', snsStyle: '全是关于合成器插件和DAW软件的截图。'
  }
];

// --- 4. BASSISTS ---
const BASSISTS: Member[] = [
  { 
    id: 'b_01', name: '铃木 真子', roles: [Role.Bass], 
    musicality: 55, technique: 50, stagePresence: 40, creativity: 30, mental: 80, 
    fatigue: 0, stress: 10, affection: 70, personality: '总是带着急救包和零食，乐队里的老妈子担当，负责调解吵架。', 
    tags: ['妈妈', '可靠'], interactionsLeft: 2, 
    composing: 20, lyrics: 20, arrangement: 40, design: 30, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Folk], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'MakoMama @mako_mama', snsStyle: '经常发“大家今天要记得带伞哦”之类的提醒。'
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
    screenName: 'HinaBass @hina_bass', snsStyle: '发很多可爱的甜点照片。'
  },
  { 
    id: 'b_04', name: '如月 恋', roles: [Role.Bass, Role.Saxophone], 
    musicality: 70, technique: 65, stagePresence: 80, creativity: 50, mental: 50, 
    fatigue: 0, stress: 20, affection: 40, personality: '吹奏部出身，偶尔会在歌曲间隙放下贝斯吹一段萨克斯独奏。', 
    tags: ['爵士', '多才多艺'], interactionsLeft: 2, 
    composing: 40, lyrics: 30, arrangement: 60, design: 30, 
    favoriteGenres: [MusicGenre.Jazz, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'RenSax @ren_sax_bass', snsStyle: '比较成熟稳重，喜欢分享爵士乐现场。'
  },
  { 
    id: 'b_05', name: '神崎 暗', roles: [Role.Bass], 
    musicality: 70, technique: 65, stagePresence: 80, creativity: 60, mental: 50, 
    fatigue: 0, stress: 10, affection: 30, personality: '“吾之低音乃深渊的咆哮...” 沉迷哥特萝莉装扮的中二少女。', 
    tags: ['中二病', '视觉系'], interactionsLeft: 2, 
    composing: 50, lyrics: 70, arrangement: 40, design: 70, 
    favoriteGenres: [MusicGenre.Gothic, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Fantasy],
    screenName: 'Abyss @abyss_darkness', snsStyle: '全是中二病的咒语，很难看懂。'
  },
  { 
    id: 'b_06', name: '松本 友里', roles: [Role.Bass], 
    musicality: 60, technique: 70, stagePresence: 50, creativity: 50, mental: 60, 
    fatigue: 0, stress: 20, affection: 40, personality: '原本想弹吉他但是猜拳输了，结果意外觉醒了Slap天赋。', 
    tags: ['天才', '随性'], interactionsLeft: 2, 
    composing: 30, lyrics: 20, arrangement: 60, design: 20, 
    favoriteGenres: [MusicGenre.Funk, MusicGenre.Jazz], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'YuriSlap @slap_yuri', snsStyle: '经常发一些随手拍的搞笑视频。'
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
    screenName: 'NanaNail @nana_nail', snsStyle: '展示美甲和穿搭。'
  }
];

// --- 5. DRUMMERS ---
const DRUMMERS: Member[] = [
  { 
    id: 'd_01', name: '岩端 步', roles: [Role.Drums], 
    musicality: 50, technique: 60, stagePresence: 70, creativity: 30, mental: 80, 
    fatigue: 0, stress: 0, affection: 40, personality: '柔道部主将，把敲鼓当做一种格斗，鼓皮经常被打穿。', 
    tags: ['体育系', '破坏神'], interactionsLeft: 2, 
    composing: 10, lyrics: 10, arrangement: 20, design: 10, 
    favoriteGenres: [MusicGenre.Metal, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Rebellion],
    screenName: 'Ayumu @ayumu_judo', snsStyle: '全是健身和肌肉的照片。'
  },
  { 
    id: 'd_02', name: '一之濑 琴美', roles: [Role.Drums], 
    musicality: 70, technique: 75, stagePresence: 30, creativity: 50, mental: 60, 
    fatigue: 0, stress: 20, affection: 30, personality: '全年级第一的学霸，像解数学题一样精确地计算节奏。', 
    tags: ['学霸', '理智'], interactionsLeft: 2, 
    composing: 40, lyrics: 20, arrangement: 70, design: 20, 
    favoriteGenres: [MusicGenre.MathRock, MusicGenre.Jazz], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Kotomi @kotomi_math', snsStyle: '逻辑严密，连发SNS都要分点陈述。'
  },
  { 
    id: 'd_03', name: '弘永 沙耶伽', roles: [Role.Drums, Role.Vocal], 
    musicality: 55, technique: 50, stagePresence: 80, creativity: 40, mental: 70, 
    fatigue: 0, stress: 0, affection: 60, personality: '前啦啦队队长，打鼓时笑容满面，也是队内的气氛制造者。', 
    tags: ['元气', '偶像'], interactionsLeft: 2, 
    composing: 20, lyrics: 30, arrangement: 30, design: 40, 
    favoriteGenres: [MusicGenre.PopPunk, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Sayaka @sayaka_cheer', snsStyle: '总是充满活力，喜欢发合照。'
  },
  { 
    id: 'd_04', name: '木挽 暗', roles: [Role.Drums], 
    musicality: 60, technique: 55, stagePresence: 50, creativity: 60, mental: 40, 
    fatigue: 0, stress: 10, affection: 30, personality: '超自然研究社社员，声称复杂的鼓点可以召唤旧日支配者。', 
    tags: ['电波', '中二病'], interactionsLeft: 2, 
    composing: 40, lyrics: 50, arrangement: 40, design: 50, 
    favoriteGenres: [MusicGenre.Gothic, MusicGenre.VisualKei], favoriteLyricThemes: [LyricTheme.Dark, LyricTheme.Fantasy],
    screenName: 'Cthulhu @cthulhu_drum', snsStyle: '发一些奇怪的符号和关于外星人的文章。'
  },
  { 
    id: 'd_05', name: '田井 大弥', roles: [Role.Drums], 
    musicality: 55, technique: 50, stagePresence: 65, creativity: 45, mental: 80, 
    fatigue: 0, stress: 0, affection: 70, personality: '大大咧咧的吐槽役，经常忘记带鼓棒，但关键时刻很可靠。', 
    tags: ['搞笑艺人', '可靠'], interactionsLeft: 2, 
    composing: 20, lyrics: 20, arrangement: 30, design: 10, 
    favoriteGenres: [MusicGenre.Rock, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Daiya @daiya_haha', snsStyle: '经常自嘲或者发一些搞笑段子。'
  },
  { 
    id: 'd_06', name: '佐藤 真子', roles: [Role.Drums], 
    musicality: 65, technique: 65, stagePresence: 40, creativity: 30, mental: 90, 
    fatigue: 0, stress: 0, affection: 20, personality: '家里是开寺庙的，把敲木鱼的节奏感运用到了极致。', 
    tags: ['佛系', '冷静'], interactionsLeft: 2, 
    composing: 20, lyrics: 40, arrangement: 30, design: 10, 
    favoriteGenres: [MusicGenre.Folk, MusicGenre.IndieRock], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Zen @zen_drum', snsStyle: '发一些寺庙的风景和富含哲理的话。'
  },
  { 
    id: 'd_07', name: '梶泽 园望', roles: [Role.Drums], 
    musicality: 50, technique: 45, stagePresence: 30, creativity: 35, mental: 20, 
    fatigue: 0, stress: 40, affection: 60, personality: '经常在Live时把鼓棒甩飞。', 
    tags: ['弱气', '冒失'], interactionsLeft: 2, 
    composing: 10, lyrics: 20, arrangement: 10, design: 30, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Idol], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Sorry @sorry_again', snsStyle: '经常在SNS上道歉或者发哭脸表情。'
  },
  { 
    id: 'd_08', name: '秋山 凛', roles: [Role.Drums], 
    musicality: 70, technique: 70, stagePresence: 60, creativity: 50, mental: 50, 
    fatigue: 0, stress: 20, affection: 40, personality: '吹奏部打击乐组出身，有着扎实的基础，对音色的颗粒感很挑剔。', 
    tags: ['认真', '技术流'], interactionsLeft: 2, 
    composing: 30, lyrics: 10, arrangement: 50, design: 20, 
    favoriteGenres: [MusicGenre.Classic, MusicGenre.Jazz], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'RinPerc @rin_perc', snsStyle: '非常严肃，只讨论技术问题。'
  }
];

// --- 6. KEYBOARDS ---
const KEYBOARDS: Member[] = [
  { 
    id: 'k_01', name: '白鸟 丽子', roles: [Role.Keyboard], 
    musicality: 80, technique: 80, stagePresence: 60, creativity: 60, mental: 60, 
    fatigue: 0, stress: 30, affection: 20, personality: '学生会长，全能完美超人，但在庶民生活方面缺乏常识。', 
    tags: ['完美主义', '大小姐'], interactionsLeft: 2, 
    composing: 60, lyrics: 40, arrangement: 70, design: 40, 
    favoriteGenres: [MusicGenre.Classic, MusicGenre.SymphonicMetal], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Reiko @reiko_shiratori', snsStyle: '优雅但有些脱离现实，经常用敬语。'
  },
  { 
    id: 'k_02', name: '猫又 绫伽', roles: [Role.Keyboard, Role.DJ], 
    musicality: 65, technique: 60, stagePresence: 50, creativity: 80, mental: 40, 
    fatigue: 0, stress: 10, affection: 30, personality: '重度网游废人，擅长用合成器制作8-bit音效，经常熬夜打本。', 
    tags: ['网游废人', '宅女'], interactionsLeft: 2, 
    composing: 70, lyrics: 30, arrangement: 60, design: 50, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Techno], favoriteLyricThemes: [LyricTheme.SciFi],
    screenName: 'NekoGamer @neko_gamer_xx', snsStyle: '全是游戏黑话和“草（日语笑）”。'
  },
  { 
    id: 'k_03', name: '秋月 律', roles: [Role.Keyboard], 
    musicality: 75, technique: 70, stagePresence: 40, creativity: 60, mental: 50, 
    fatigue: 0, stress: 20, affection: 40, personality: '爵士钢琴教室长大的孩子，喜欢在流行曲子里加奇怪的减九和弦。', 
    tags: ['爵士', '随性'], interactionsLeft: 2, 
    composing: 50, lyrics: 20, arrangement: 70, design: 30, 
    favoriteGenres: [MusicGenre.Jazz, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Ritsu @ritsu_jazz', snsStyle: '深夜分享爵士名盘。'
  },
  { 
    id: 'k_04', name: '宿屋 咲', roles: [Role.Keyboard], 
    musicality: 55, technique: 50, stagePresence: 30, creativity: 40, mental: 20, 
    fatigue: 0, stress: 40, affection: 60, personality: '在家里蹲了很久。', 
    tags: ['社恐', '家里蹲'], interactionsLeft: 2, 
    composing: 30, lyrics: 30, arrangement: 20, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Saki @saki_room', snsStyle: '几乎不发推，偶尔点赞。'
  },
  { 
    id: 'k_05', name: '山谷 小夏', roles: [Role.Keyboard], 
    musicality: 50, technique: 50, stagePresence: 40, creativity: 40, mental: 80, 
    fatigue: 0, stress: 10, affection: 70, personality: '常识人。', 
    tags: ['凡人'], interactionsLeft: 2, 
    composing: 30, lyrics: 40, arrangement: 30, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Konatsu @konatsu_day', snsStyle: '普普通通的日常生活记录。'
  },
  { 
    id: 'k_06', name: '二宫 四季', roles: [Role.Keyboard, Role.Producer], 
    musicality: 70, technique: 65, stagePresence: 70, creativity: 80, mental: 60, 
    fatigue: 0, stress: 20, affection: 30, personality: '说话晦涩难懂的深度中二病，自称是被神选中的观测者。', 
    tags: ['中二病', '哲学'], interactionsLeft: 2, 
    composing: 60, lyrics: 80, arrangement: 50, design: 60, 
    favoriteGenres: [MusicGenre.VisualKei, MusicGenre.Gothic], favoriteLyricThemes: [LyricTheme.Philosophy, LyricTheme.Dark],
    screenName: 'Observer @observer_4', snsStyle: '每条推文都像是预言书的一页。'
  },
  { 
    id: 'k_07', name: '萩谷 雪奈', roles: [Role.Keyboard], 
    musicality: 55, technique: 55, stagePresence: 60, creativity: 40, mental: 70, 
    fatigue: 0, stress: 0, affection: 50, personality: '混血留学生，对“日本文化”有着强烈的好奇心与奇怪的误解。', 
    tags: ['混血', '天然'], interactionsLeft: 2, 
    composing: 20, lyrics: 30, arrangement: 30, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Folk], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Yukina @yukina_jp', snsStyle: '用奇怪的日语语法发推，但很热情。'
  },
  { 
    id: 'k_08', name: '繁村 阳菜', roles: [Role.Keyboard, Role.Vocal], 
    musicality: 50, technique: 45, stagePresence: 80, creativity: 40, mental: 30, 
    fatigue: 0, stress: 40, affection: 60, personality: '虽然总是把事情搞砸，但依然梦想成为闪闪发光的偶像。', 
    tags: ['冒失', '偶像'], interactionsLeft: 2, 
    composing: 20, lyrics: 40, arrangement: 10, design: 50, 
    favoriteGenres: [MusicGenre.Idol, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'HinaStar @hina_star', snsStyle: '虽然经常搞砸，但总是积极向上。'
  },
  { 
    id: 'k_09', name: '云居 艾露', roles: [Role.Keyboard], 
    musicality: 65, technique: 60, stagePresence: 50, creativity: 70, mental: 50, 
    fatigue: 0, stress: 10, affection: 30, personality: '总是戴着兜帽的神秘少女，声称自己是从2077年穿越回来的。', 
    tags: ['电波', '未来人'], interactionsLeft: 2, 
    composing: 60, lyrics: 30, arrangement: 70, design: 60, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Techno], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Absurdist],
    screenName: 'Elle2077 @elle_2077', snsStyle: '全是乱码或者二进制代码。'
  }
];

// --- 7. SPECIALISTS ---
const SPECIALISTS: Member[] = [
  { 
    id: 'x_01', name: '结城 雅', roles: [Role.Violin, Role.Vocal], 
    musicality: 75, technique: 75, stagePresence: 60, creativity: 55, mental: 30, 
    fatigue: 0, stress: 15, affection: 30, personality: '试图将古典融入摇滚的大小姐，拉小提琴时表情会变得很狰狞。', 
    tags: ['古典', '跨界'], interactionsLeft: 2, 
    composing: 50, lyrics: 20, arrangement: 65, design: 40, 
    favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Poetic],
    screenName: 'Miyabi @miyabi_v', snsStyle: '平时很高雅，但在谈论摇滚时会突然变得狂热。'
  },
  { 
    id: 'x_02', name: 'DJ K-KO', roles: [Role.DJ], 
    musicality: 60, technique: 50, stagePresence: 90, creativity: 70, mental: 80, 
    fatigue: 0, stress: 0, affection: 50, personality: '白天是普通的优等生，晚上是涉谷夜店的神秘DJ。', 
    tags: ['DJ', '双重身份'], interactionsLeft: 2, 
    composing: 60, lyrics: 30, arrangement: 80, design: 60, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Party],
    screenName: 'K-KO @k_ko_official', snsStyle: '非常酷，只在深夜发演出预告。'
  },
  { 
    id: 'x_03', name: '青井 萨克斯', roles: [Role.Saxophone], 
    musicality: 70, technique: 65, stagePresence: 70, creativity: 50, mental: 60, 
    fatigue: 0, stress: 10, affection: 40, personality: '充满成熟魅力的吹奏部前辈，喜欢在独奏时闭眼陶醉。', 
    tags: ['大姐姐', '爵士'], interactionsLeft: 2, 
    composing: 40, lyrics: 30, arrangement: 60, design: 30, 
    favoriteGenres: [MusicGenre.Jazz, MusicGenre.Blues], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'AoiSax @aoi_sax', snsStyle: '成熟稳重，喜欢发红酒和爵士乐的照片。'
  },
  { 
    id: 'x_04', name: '响 优奈', roles: [Role.Producer, Role.Guitar], 
    musicality: 60, technique: 50, stagePresence: 40, creativity: 80, mental: 60, 
    fatigue: 0, stress: 10, affection: 50, personality: '特摄宅女，总是想把变身音效加进歌曲里。', 
    tags: ['特摄厨', '热血'], interactionsLeft: 2, 
    composing: 70, lyrics: 50, arrangement: 70, design: 30, 
    favoriteGenres: [MusicGenre.JRock, MusicGenre.Metal], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Rebellion],
    screenName: 'Henshin @henshin_yuna', snsStyle: '热血沸腾，每条推文都像是在变身。'
  },
  { 
    id: 'x_05', name: '出云 墨', roles: [Role.DJ, Role.Keyboard], 
    musicality: 65, technique: 60, stagePresence: 50, creativity: 80, mental: 40, 
    fatigue: 0, stress: 20, affection: 40, personality: '总是带着录音笔收集各种声音（包括尖叫声）的怪人。', 
    tags: ['电波', '技术流'], interactionsLeft: 2, 
    composing: 70, lyrics: 20, arrangement: 80, design: 60, 
    favoriteGenres: [MusicGenre.Industrial, MusicGenre.Electronic], favoriteLyricThemes: [LyricTheme.Absurdist],
    screenName: 'Noise @noise_collector', snsStyle: '发一些奇怪的声音采样波形图。'
  }
];

export const MEMBER_POOL: Member[] = [
    ...LEGENDARY_MEMBERS,
    ...VOCALS,
    ...GUITARS,
    ...BASSISTS,
    ...DRUMMERS,
    ...KEYBOARDS,
    ...SPECIALISTS
];
