
import { Role, Member, MusicGenre, LyricTheme } from '../../types';

// --- LEGENDARY / UR (原创传说级JK) ---
// 唯一角色设定：每个角色有一个专属Tag（Unique Tag），其余为通用Tag
export const LEGENDARY_MEMBERS: Member[] = [
  { 
    id: 'ur_shizuku', name: '立野 怜', netaName: '高松 灯', roles: [Role.Vocal], 
    musicality: 85, technique: 40, stagePresence: 60, creativity: 100, mental: 10, 
    fatigue: 0, stress: 40, affection: 20, 
    personality: '总是低着头走路，喜欢在路边收集石头和创可贴的奇怪女孩。似乎很难与人对视。',
    netaDesc: '“迷子”乐队的主唱。想要成为人类，拼命地用歌词呐喊着内心的声音。',
    tags: ['作词天才', '社恐', '重力'], // Unique: 重力 (Replaced Maigo)
    interactionsLeft: 2, 
    composing: 40, lyrics: 100, arrangement: 20, design: 30,
    favoriteGenres: [MusicGenre.Emo, MusicGenre.Punk, MusicGenre.MathRock],
    favoriteLyricThemes: [LyricTheme.Poetic, LyricTheme.Philosophy, LyricTheme.Dark],
    screenName: 'Tomori @penguin_bandaid',
    snsStyle: '只发一些路边的野花、石头或者奇怪的角落，配文是像诗一样的短句。'
  },
  { 
    id: 'ur_karen', name: '鲸 溶子', netaName: '丰川 祥子', roles: [Role.Keyboard, Role.Producer], 
    musicality: 90, technique: 90, stagePresence: 80, creativity: 85, mental: 60, 
    fatigue: 0, stress: 20, affection: 60, 
    personality: '举止优雅的大小姐，性格温柔包容，梦想是组建一支能给世界带来希望的乐队。', 
    netaDesc: '曾经组建过传奇乐队 "CRYCHIC" 的作曲家。背负着沉重的宿命，在“白月光”的外表下隐藏着破碎的灵魂。',
    tags: ['白月光', '完美主义', '大小姐'], // Unique: 白月光 (Changes to 复仇者 later)
    interactionsLeft: 2, 
    composing: 95, lyrics: 70, arrangement: 90, design: 80,
    favoriteGenres: [MusicGenre.SymphonicMetal, MusicGenre.Classic, MusicGenre.Electronic],
    favoriteLyricThemes: [LyricTheme.Classic, LyricTheme.Philosophy],
    screenName: 'Saki @crychic_memories',
    snsStyle: '发推频率不高，但每一条都很温暖，会认真回复粉丝的留言。'
  },
  { 
    id: 'ur_chihiro', name: '时 彩枝', netaName: '后藤 独', roles: [Role.Guitar], 
    musicality: 80, technique: 98, stagePresence: 10, creativity: 60, mental: 5, 
    fatigue: 0, stress: 60, affection: 15, 
    personality: '平时是毫无存在感的透明人，甚至会因为被搭话而惊恐发作。背上吉他后似乎会变一个人？', 
    netaDesc: '有着严重社交恐惧症的吉他英雄 "GuitarHero"。只有在纸箱里（或网络上）才能发挥全力的真正的摇滚怪物。',
    tags: ['双重人格', '社恐', '技术流'], // Unique: 双重人格
    interactionsLeft: 2, 
    composing: 50, lyrics: 30, arrangement: 70, design: 10,
    favoriteGenres: [MusicGenre.MathRock, MusicGenre.Metal, MusicGenre.JRock],
    favoriteLyricThemes: [LyricTheme.Absurdist, LyricTheme.Dark],
    screenName: '吉他幽灵 @guitar_phantom',
    snsStyle: '从不露脸，只发手部或吉他的特写。深夜会发一些硬核的设备参数讨论。'
  },
  { 
    id: 'ur_nijika', name: '夏原 虹', netaName: '伊地知 虹夏', roles: [Role.Drums], 
    musicality: 75, technique: 70, stagePresence: 85, creativity: 60, mental: 95, 
    fatigue: 0, stress: 0, affection: 80, 
    personality: '在LiveHouse打工的元气少女，总是带着明朗的笑容照顾大家，是乐队的气氛制造者。', 
    netaDesc: '下北泽的天使。为了实现姐姐的梦想而组建乐队，是用温柔包容一切的真正队长。',
    tags: ['领袖气质', '天使', '吐槽役'], // Unique: 天使
    interactionsLeft: 2, 
    composing: 30, lyrics: 40, arrangement: 50, design: 70,
    favoriteGenres: [MusicGenre.JRock, MusicGenre.PopPunk],
    favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Rebellion],
    screenName: 'Angel @starry_drum',
    snsStyle: '全是乐队成员的合照和LiveHouse的宣传，充满了爱。'
  },
  { 
    id: 'ur_mia', name: '米拉·安德森', netaName: '米娅·泰勒', roles: [Role.Guitar, Role.Producer], // No Vocal Initially
    musicality: 95, technique: 85, stagePresence: 90, creativity: 90, mental: 40, 
    fatigue: 0, stress: 30, affection: 30, 
    personality: '态度有些傲慢的归国子女，嘴上说着“我不感兴趣”，却总是能哼出复杂的旋律。', 
    netaDesc: '来自纽约的作曲天才，生于音乐名门 Taylor 家族。用强硬的态度掩饰内心的孤独，渴望被当作普通女孩对待。',
    tags: ['天才', '归国子女', '傲娇'], // Unique: 归国子女
    interactionsLeft: 2, 
    composing: 95, lyrics: 80, arrangement: 90, design: 60,
    favoriteGenres: [MusicGenre.Pop, MusicGenre.Electronic, MusicGenre.Rock],
    favoriteLyricThemes: [LyricTheme.Rebellion, LyricTheme.Youth],
    screenName: 'MIA @burger_queen',
    snsStyle: '全英文推文，或者是对于汉堡口味的测评。'
  },
  { 
    id: 'ur_riina', name: '前田 罗娜', netaName: '多田 李衣菜', roles: [Role.Guitar, Role.Vocal], 
    musicality: 60, technique: 45, stagePresence: 90, creativity: 50, mental: 80, 
    fatigue: 0, stress: 0, affection: 60, 
    personality: '戴着耳机、满口“Rock”的少女。虽然装备很专业，但似乎没怎么见她插电弹过？', 
    netaDesc: '憧憬着摇滚的偶像。虽然经常被吐槽是“形似（伪）摇滚”，但那份率直的热情和想要变帅的心情是货真价实的。',
    tags: ['摇滚魂', '元气', '冒失'], // Unique: 摇滚魂
    interactionsLeft: 2, 
    composing: 30, lyrics: 40, arrangement: 20, design: 70,
    favoriteGenres: [MusicGenre.Rock, MusicGenre.PopPunk, MusicGenre.JRock],
    favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Rebellion],
    screenName: 'RockingGirl @riina_rock',
    snsStyle: '经常发“今天的我也是Rock全开！”，配图是拿着吉他耍帅（但没插线）。'
  },
  { 
    id: 'ur_shiho', name: '野崎 志帆', netaName: '日野森 志步', roles: [Role.Bass], 
    musicality: 85, technique: 95, stagePresence: 60, creativity: 60, mental: 70, 
    fatigue: 0, stress: 30, affection: 10, 
    personality: '独来独往的贝斯手，对技术要求极其严格。总是拒绝参加聚会，一个人默默练习。', 
    netaDesc: 'Leo/need 的贝斯手。因为不想连累朋友而选择孤立自己，其实内心非常重视伙伴，比任何人都温柔。',
    tags: ['孤狼', '技术流', '反差萌'], // Unique: 孤狼
    interactionsLeft: 2, 
    composing: 60, lyrics: 30, arrangement: 70, design: 40,
    favoriteGenres: [MusicGenre.PopRock, MusicGenre.JPop],
    favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Cute],
    screenName: 'Shiho @bass_practice',
    snsStyle: '几乎不发推。偶尔点赞可爱的吉祥物（比如Phenny）。'
  },
  { 
    id: 'ur_mai', name: '海道 舞', netaName: '平泽 唯', roles: [Role.Guitar, Role.Vocal], 
    musicality: 95, technique: 50, stagePresence: 95, creativity: 70, mental: 60, 
    fatigue: 0, stress: 0, affection: 60, 
    personality: '完全不懂乐理却能写出神曲的天才少女，靠直觉活着的生物。', 
    netaDesc: '拥有绝对音感的天然呆，认为吉他只要有爱就能弹好。放学后Tea Time的主音吉他手。',
    tags: ['自由人', '天才', '天然呆'], // Unique: 自由人
    interactionsLeft: 2, 
    composing: 80, lyrics: 40, arrangement: 10, design: 40, 
    favoriteGenres: [MusicGenre.JPop, MusicGenre.Pop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Fantasy],
    screenName: '舞的世界 @mai_world',
    snsStyle: '经常打错字，或者发出意义不明的拟声词（如“咚咔咔！”）。'
  },
  { 
    id: 'ur_nano', name: '七濑 奈乃', netaName: '广町 七深', roles: [Role.Bass], 
    musicality: 90, technique: 90, stagePresence: 50, creativity: 85, mental: 50, 
    fatigue: 0, stress: 20, affection: 40, 
    personality: '为了融入集体而拼命隐藏实力的天才，总是担心自己“不普通”。', 
    netaDesc: '真正的天才，却渴望着平凡的日常。总是苦恼于如何让自己看起来像个普通人。Morfonica 的贝斯手。',
    tags: ['凡人拟态', '天才', '怪人'], // Unique: 凡人拟态
    interactionsLeft: 2, 
    composing: 70, lyrics: 50, arrangement: 90, design: 60, 
    favoriteGenres: [MusicGenre.Pop, MusicGenre.JPop], favoriteLyricThemes: [LyricTheme.Youth, LyricTheme.Cute],
    screenName: 'Nano @normal_girl',
    snsStyle: '经常发布“今天的普通午餐”、“普通JK的日常”等内容，但照片背景里经常出现昂贵的乐器或奖状。'
  },
  { 
    id: 'ur_toka', name: '葛城 桃华', netaName: '河原木 桃香', roles: [Role.Guitar], 
    musicality: 85, technique: 95, stagePresence: 90, creativity: 80, mental: 70, 
    fatigue: 0, stress: 10, affection: 20, 
    personality: '曾经是主流出道的职业乐手，因为讨厌“商业垃圾”而退团。平时是个喜欢喝酒的废柴大姐姐。', 
    netaDesc: '厌倦了虚伪商业音乐的前职业吉他手，竖起中指对抗世界的叛逆者。Girls Band Cry 的吉他手。',
    tags: ['叛逆者', '前职业', '大姐姐'], // Unique: 叛逆者
    interactionsLeft: 2, 
    composing: 75, lyrics: 60, arrangement: 85, design: 60, 
    favoriteGenres: [MusicGenre.Rock, MusicGenre.Punk, MusicGenre.Emo], favoriteLyricThemes: [LyricTheme.Rebellion, LyricTheme.Philosophy],
    screenName: 'Toka @real_rock',
    snsStyle: '经常发一些居酒屋的食物照片，或者对当今乐坛的辛辣点评。'
  }
];
