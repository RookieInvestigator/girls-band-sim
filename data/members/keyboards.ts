
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const KEYBOARDS: Member[] = [
  // --- New Recruits (Assigned to Keyboard) ---
  {
      id: 'n_05', name: '星野 露娜', roles: [Role.Keyboard],
      musicality: 75, technique: 65, stagePresence: 60, creativity: 90, mental: 40,
      fatigue: 0, stress: 30, affection: 20, personality: '自称来自仙女座的电波系少女，随身携带星图。',
      tags: ['电波', '中二病'], interactionsLeft: 2, composing: 85, lyrics: 80, arrangement: 70, design: 60,
      favoriteGenres: [MusicGenre.Electronic, MusicGenre.Shoegaze], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Fantasy],
      screenName: 'Luna @galaxy_obs',
      snsStyle: '发布难以理解的诗句和星空照片，经常提到“电波”和“信号”。'
  },
  {
      id: 'n_10', name: '相原 爱丽丝', roles: [Role.Keyboard, Role.DJ],
      musicality: 80, technique: 75, stagePresence: 40, creativity: 85, mental: 90,
      fatigue: 0, stress: 0, affection: 10, personality: '说话像AI一样没有抑扬顿挫的理科天才，喜欢观察人类。',
      tags: ['机器人', '天才'], interactionsLeft: 2, composing: 90, lyrics: 10, arrangement: 90, design: 50,
      favoriteGenres: [MusicGenre.Techno, MusicGenre.Industrial], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Philosophy],
      screenName: 'Alice @system_root',
      snsStyle: '发布复杂的代码截图或者合成器参数，像个技术博客。'
  },
  {
      id: 'n_17', name: '镜 美津枝', roles: [Role.Keyboard],
      musicality: 70, technique: 70, stagePresence: 50, creativity: 80, mental: 50,
      fatigue: 0, stress: 30, affection: 20, personality: '喜欢心理学和神秘学的短发少女，总是用塔罗牌决定当天的音色。',
      tags: ['神秘', '随性'], interactionsLeft: 2, composing: 60, lyrics: 60, arrangement: 70, design: 40,
      favoriteGenres: [MusicGenre.Psychedelic, MusicGenre.IndieRock], favoriteLyricThemes: [LyricTheme.Philosophy, LyricTheme.Fantasy],
      screenName: 'Mirror @tarot_key',
      snsStyle: '每日运势分享，以及一些神秘的符号图片。'
  },
  {
      id: 'n_29', name: '七草 纳兹娜', roles: [Role.Keyboard],
      musicality: 70, technique: 60, stagePresence: 40, creativity: 85, mental: 50,
      fatigue: 0, stress: 20, affection: 30, personality: '典型的夜猫子，喜欢在凌晨两点写Synthwave，白天总是没精神。',
      tags: ['网游废人', '宅女'], interactionsLeft: 2, composing: 80, lyrics: 30, arrangement: 70, design: 60,
      favoriteGenres: [MusicGenre.Electronic, MusicGenre.Techno], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Sea],
      screenName: 'Nazuna @night_walker',
      snsStyle: '深夜活跃，分享复古的霓虹灯图片和蒸汽波音乐。'
  },
  {
      id: 'n_30', name: '音乃木 诗', roles: [Role.Keyboard],
      musicality: 95, technique: 90, stagePresence: 30, creativity: 80, mental: 40,
      fatigue: 0, stress: 30, affection: 20, personality: '钢琴神童，因为讨厌看乐谱和练习枯燥的古典曲目而逃出来玩乐队。',
      tags: ['天才', '自由人'], interactionsLeft: 2, composing: 90, lyrics: 20, arrangement: 60, design: 20,
      favoriteGenres: [MusicGenre.Jazz, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Absurdist],
      screenName: 'Uta @free_piano',
      snsStyle: '发一些即兴演奏的片段，配文通常是“不想练琴”。'
  },

  // --- Standard Keyboards ---
  { 
    id: 'k_01', name: '白鸟 丽子', roles: [Role.Keyboard], 
    musicality: 80, technique: 80, stagePresence: 60, creativity: 60, mental: 60, 
    fatigue: 0, stress: 30, affection: 20, personality: '学生会长，全能完美超人，但在庶民生活方面缺乏常识。', 
    tags: ['完美主义', '大小姐'], interactionsLeft: 2, 
    composing: 60, lyrics: 40, arrangement: 70, design: 40, 
    favoriteGenres: [MusicGenre.Classic, MusicGenre.SymphonicMetal], favoriteLyricThemes: [LyricTheme.Classic],
    screenName: 'Reiko @shiratori_r', snsStyle: '优雅但有些脱离现实，经常用敬语。'
  },
  { 
    id: 'k_02', name: '秋月 律', roles: [Role.Keyboard], 
    musicality: 75, technique: 70, stagePresence: 40, creativity: 60, mental: 50, 
    fatigue: 0, stress: 20, affection: 40, personality: '爵士钢琴教室长大的孩子，喜欢在流行曲子里加奇怪的减九和弦。', 
    tags: ['爵士', '随性'], interactionsLeft: 2, 
    composing: 50, lyrics: 20, arrangement: 70, design: 30, 
    favoriteGenres: [MusicGenre.Jazz, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Philosophy],
    screenName: 'Ritsu @jazz_moon', snsStyle: '深夜分享爵士名盘。'
  },
  { 
    id: 'k_03', name: '宿屋 咲', roles: [Role.Keyboard], 
    musicality: 55, technique: 50, stagePresence: 30, creativity: 40, mental: 20, 
    fatigue: 0, stress: 40, affection: 60, personality: '在家里蹲了很久，通过网络直播接触到了外面的世界。', 
    tags: ['社恐', '家里蹲'], interactionsLeft: 2, 
    composing: 30, lyrics: 30, arrangement: 20, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Saki @room_saki', snsStyle: '几乎不发推，偶尔点赞。'
  },
  { 
    id: 'k_04', name: '猫又 绫伽', roles: [Role.Keyboard, Role.DJ], 
    musicality: 65, technique: 60, stagePresence: 50, creativity: 80, mental: 40, 
    fatigue: 0, stress: 10, affection: 30, personality: '重度网游废人，擅长用合成器制作8-bit音效，经常熬夜打本。', 
    tags: ['网游废人', '宅女'], interactionsLeft: 2, 
    composing: 70, lyrics: 30, arrangement: 60, design: 50, 
    favoriteGenres: [MusicGenre.Electronic, MusicGenre.Techno], favoriteLyricThemes: [LyricTheme.SciFi],
    screenName: 'Neko @neko_gamer', snsStyle: '全是游戏黑话和“草（日语笑）”。'
  },
  { 
    id: 'k_05', name: '山谷 小夏', roles: [Role.Keyboard], 
    musicality: 50, technique: 50, stagePresence: 40, creativity: 40, mental: 80, 
    fatigue: 0, stress: 10, affection: 70, personality: '在个性的乐队里唯一的常识人，负责把大家拉回现实。', 
    tags: ['凡人', '吐槽役'], interactionsLeft: 2, 
    composing: 30, lyrics: 40, arrangement: 30, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth],
    screenName: 'Konatsu @natsu_day', snsStyle: '普普通通的日常生活记录。'
  },
  { 
    id: 'k_06', name: '二宫 四季', roles: [Role.Keyboard, Role.Producer], 
    musicality: 70, technique: 65, stagePresence: 70, creativity: 80, mental: 60, 
    fatigue: 0, stress: 20, affection: 30, personality: '说话晦涩难懂的深度中二病，自称是被神选中的观测者。', 
    tags: ['中二病', '哲学'], interactionsLeft: 2, 
    composing: 60, lyrics: 80, arrangement: 50, design: 60, 
    favoriteGenres: [MusicGenre.VisualKei, MusicGenre.Gothic], favoriteLyricThemes: [LyricTheme.Philosophy, LyricTheme.Dark],
    screenName: 'Four @observer_4', snsStyle: '每条推文都像是预言书的一页。'
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
    screenName: 'Elle @elle_2077', snsStyle: '全是乱码或者二进制代码。'
  }
];
