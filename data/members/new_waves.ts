
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

export const NEW_WAVES: Member[] = [
  // --- New Roles: Unique Positioning ---
  
  {
      id: 'nw_01', name: '狐冢 红叶', roles: [Role.Shamisen],
      musicality: 85, technique: 90, stagePresence: 70, creativity: 65, mental: 50,
      fatigue: 0, stress: 30, affection: 20, personality: '总是戴着狐狸面具的三味线乐手，试图将传统乐器融入重金属。',
      tags: ['和风', '神秘', '前卫'], interactionsLeft: 2, composing: 60, lyrics: 30, arrangement: 80, design: 90,
      favoriteGenres: [MusicGenre.Metal, MusicGenre.Traditional], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Dark],
      screenName: 'FoxFire @inari_metal',
      snsStyle: '古风的措辞配上重金属的配图，非常有反差感。'
  },
  {
      id: 'nw_02', name: '塞莱斯蒂亚·白银', roles: [Role.Harp],
      musicality: 90, technique: 85, stagePresence: 80, creativity: 50, mental: 40,
      fatigue: 0, stress: 10, affection: 10, personality: '把昂贵的竖琴搬进LiveHouse的真正贵族，对平民生活一无所知。',
      tags: ['贵族', '天然', '治愈'], interactionsLeft: 2, composing: 70, lyrics: 20, arrangement: 60, design: 95,
      favoriteGenres: [MusicGenre.Classic, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Fantasy, LyricTheme.Poetic],
      screenName: 'Celestia @harp_angel',
      snsStyle: '充满了不懂世事的发言，比如“为什么便利店不卖鱼子酱？”'
  },
  {
      id: 'nw_03', name: '旅泽 风花', roles: [Role.Accordion],
      musicality: 80, technique: 75, stagePresence: 90, creativity: 85, mental: 95,
      fatigue: 0, stress: 0, affection: 60, personality: '背着手风琴环游世界的流浪艺人，只要有风的地方就是舞台。',
      tags: ['吟游诗人', '随性', '体力怪物'], interactionsLeft: 2, composing: 80, lyrics: 80, arrangement: 50, design: 40,
      favoriteGenres: [MusicGenre.Folk, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Philosophy, LyricTheme.Sea],
      screenName: 'WindWalker @tabi_fuka',
      snsStyle: '发布世界各地的风景照和即兴演奏的短视频。'
  },
  {
      id: 'nw_04', name: '涩谷 茨', roles: [Role.Rapper],
      musicality: 60, technique: 70, stagePresence: 95, creativity: 80, mental: 85,
      fatigue: 0, stress: 20, affection: 30, personality: '眼神凶恶的地下MC，歌词像机关枪一样辛辣，讨厌虚伪的大人。',
      tags: ['街头', '毒舌', '真实'], interactionsLeft: 2, composing: 50, lyrics: 100, arrangement: 40, design: 70,
      favoriteGenres: [MusicGenre.Hardcore, MusicGenre.Punk], favoriteLyricThemes: [LyricTheme.Satire, LyricTheme.Rebellion],
      screenName: 'Thorn @ibara_rap',
      snsStyle: '不怎么说话。'
  },
  {
      id: 'nw_05', name: '虚空 艾莉', roles: [Role.Producer, Role.Keyboard], // Using standard roles but flavored as Theremin user via text
      musicality: 70, technique: 60, stagePresence: 50, creativity: 100, mental: 30,
      fatigue: 0, stress: 40, affection: 20, personality: '自称能接收宇宙信号的特雷门琴演奏者，总是对着空气挥手。',
      tags: ['电波', '未来人', '技术宅'], interactionsLeft: 2, composing: 95, lyrics: 10, arrangement: 90, design: 50,
      favoriteGenres: [MusicGenre.Psychedelic, MusicGenre.Noise], favoriteLyricThemes: [LyricTheme.SciFi, LyricTheme.Absurdist],
      screenName: 'Void @signal_lost',
      snsStyle: '发布一些听不懂的杂音采样和奇怪的波形图。'
  },
  {
      id: 'nw_06', name: '拨 弦音', roles: [Role.Shamisen],
      musicality: 80, technique: 95, stagePresence: 60, creativity: 50, mental: 80,
      fatigue: 0, stress: 10, affection: 30, personality: '传统艺能世家的继承人，性格古板严厉，认为练习必须一丝不苟。',
      tags: ['和风', '完美主义'], interactionsLeft: 2, composing: 40, lyrics: 40, arrangement: 70, design: 60,
      favoriteGenres: [MusicGenre.Traditional, MusicGenre.Rock], favoriteLyricThemes: [LyricTheme.Classic],
      screenName: 'Itone @shamisen_do',
      snsStyle: '每天早上五点准时发“晨练开始”，非常有规律。'
  },
  {
      id: 'nw_07', name: '韵 踏子', roles: [Role.Rapper],
      musicality: 70, technique: 65, stagePresence: 85, creativity: 90, mental: 60,
      fatigue: 0, stress: 20, affection: 50, personality: '戴着眼镜的文学社社长，一旦拿起麦克风就会变成饶舌机关枪。',
      tags: ['文学少女', '街头'], interactionsLeft: 2, composing: 60, lyrics: 100, arrangement: 30, design: 40,
      favoriteGenres: [MusicGenre.Pop, MusicGenre.Funk], favoriteLyricThemes: [LyricTheme.Poetic, LyricTheme.Satire],
      screenName: 'Rhyme @book_rap',
      snsStyle: '把读后感写成押韵的歌词片段。'
  },
  {
      id: 'nw_08', name: '风间 铃兰', roles: [Role.Accordion],
      musicality: 75, technique: 70, stagePresence: 90, creativity: 60, mental: 85,
      fatigue: 0, stress: 0, affection: 70, personality: '总是在公园长椅上演奏手风琴的元气少女，吸引了很多小孩子。',
      tags: ['街头', '元气'], interactionsLeft: 2, composing: 50, lyrics: 40, arrangement: 60, design: 50,
      favoriteGenres: [MusicGenre.Folk, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Fantasy],
      screenName: 'Suzuran @polka_dance',
      snsStyle: '分享和路人互动的快乐视频。'
  },
  {
      id: 'nw_09', name: '琴吹 圣', roles: [Role.Harp],
      musicality: 85, technique: 80, stagePresence: 50, creativity: 60, mental: 90,
      fatigue: 0, stress: 0, affection: 40, personality: '神社的巫女，声称竖琴的音色可以净化邪念。',
      tags: ['治愈', '神圣'], interactionsLeft: 2, composing: 60, lyrics: 30, arrangement: 50, design: 70,
      favoriteGenres: [MusicGenre.Classic, MusicGenre.Ballad], favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Philosophy],
      screenName: 'Hijiri @shrine_harp',
      snsStyle: '发布神社的清扫日常和竖琴演奏，非常佛系。'
  }
];
