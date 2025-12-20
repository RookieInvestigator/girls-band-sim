
export enum Role {
  Vocal = '主唱',
  Guitar = '吉他',
  Bass = '贝斯',
  Drums = '鼓手',
  Keyboard = '键盘',
  Producer = '制作人',
  DJ = 'DJ',
  Violin = '小提琴',
  Saxophone = '萨克斯'
}

export enum MusicGenre {
  JPop = 'J-Pop',
  JRock = 'J-Rock',
  Punk = 'Punk',
  PopPunk = 'Pop Punk',
  Metal = 'Metal',
  Electronic = 'Electronic',
  Jazz = 'Jazz',
  Ballad = 'Ballad',
  Idol = 'Idol',
  MathRock = 'Math Rock',
  Shoegaze = 'Shoegaze',
  Funk = 'Funk',
  Folk = 'Folk',
  Emo = 'Emo',
  VisualKei = 'Visual Kei',
  SymphonicMetal = 'Symphonic Metal',
  Classic = 'Classic',
  IndieRock = 'Indie Rock',
  Rock = 'Rock',
  Hardcore = 'Hardcore',
  Gothic = 'Gothic',
  Techno = 'Techno',
  Blues = 'Blues',
  Industrial = 'Industrial',
  Musical = 'Musical',
  Pop = 'Pop',
  Dance = 'Dance',
  PostRock = 'Post Rock',
  PopRock = 'Pop Rock',
  Denpa = 'Denpa',
  Traditional = 'Traditional',
  Psychedelic = 'Psychedelic',
  Noise = 'Noise'
}

export enum LyricTheme {
  Poetic = '诗化',
  Absurdist = '荒诞',
  Youth = '青春',
  Satire = '讽刺',
  Classic = '古风',
  Dark = '暗黑',
  Philosophy = '哲理',
  Rebellion = '叛逆',
  Fantasy = '幻想',
  SciFi = '科幻',
  Party = '派对',
  Love = '恋爱',
  Gothic = '哥特',
  Sea = '海洋',
  Cute = '可爱',
  Food = '美食'
}

export interface Song {
  id: string;
  title: string;
  genre: MusicGenre;
  lyricTheme: LyricTheme; 
  quality: number;
  completeness: number;
  popularity: number;
  releaseWeek?: number;
  description?: string;
  credits: {
      composer: string;
      lyricist: string;
  };
  isViral?: boolean; 
}

export enum ScheduleCategory {
  Solo = '个人练习',
  Band = '合奏排练',
  Creation = '创作录音',
  Promotion = '宣传活动',
  Leisure = '休闲整顿',
  Study = '理论学习',
  Special = '特别企划'
}

export enum ScheduleAction {
  InstrumentPractice = '个人乐器练习',
  VocalPractice = '声乐基础训练',
  SoloExpression = '台风动作修饰',
  BandEnsemble = '乐队合奏排练',
  BandRehearsal = '全员登台彩排',
  Songwriting = '新曲创作研讨',
  Recording = '录音棚录制',
  DesignWork = '周边与海报设计',
  StreetLive = '街头突袭路演',
  FlyerDistribution = '街区海报张贴',
  SocialMediaLive = '深夜直播互动',
  RadioInterview = '电台访谈录制',
  MusicVideoShoot = '首支MV拍摄',
  CharityLive = '社区公益演出',
  TeaTime = '练习室茶话会',
  GameCenter = '街机厅团建',
  GroupTrip = '海边采风旅行',
  EquipmentCare = '乐器深度保养',
  MusicTheory = '乐理知识讲座',
  PartTimeJob = '兼职打工补贴',
  RentStudio = '租用录音棚练习',
  VocalLesson = '专业声乐私教',
  InstrumentLesson = '专业乐器私教', 
  LiveStream = '网络不插电直播',
  PhotoSession = '宣发写真拍摄',
  LyricsWorkshop = '歌词读书会',
  ComposeJam = '即兴作曲Jam',
  ListenAnalysis = '竞品音乐分析',
  StyleMakeover = '造型风格改造',
  TrainingCamp = '夏季合宿特训',
  // Special Actions
  SchoolFestival = '文化祭压轴演出',
  FireworksDate = '夏日花火大会',
  ThemePark = '游乐园团建',
  ChristmasParty = '圣诞特别派对',
  GraduationTrip = '毕业纪念旅行' // Added
}

export enum InteractionType {
  IntensivePractice = '强制加练',
  CafeDate = '甜点约会',
  DeepTalk = '深夜长谈',
  Gift = '赠送小礼物',
  Reprimand = '队长训诫'
}

export enum SelfActionType {
  SoloPractice = '个人练习',
  Meditation = '冥想反思',
  Songwriting = '灵感记录',
  AdminWork = '乐队事务',
  QuickNap = '小憩片刻'
}

export enum ActionResult {
  Failure = '失败',
  Success = '成功',
  GreatSuccess = '大成功'
}

export interface InteractionOutcome {
  result: ActionResult;
  log: string;
  impact: Impact;
}

export interface Impact {
  money?: number;
  fans?: number;
  stressChange?: number;
  affectionChange?: number;
  fatigue?: number;
  musicality?: number;
  technique?: number;
  stagePresence?: number;
  creativity?: number;
  stability?: number;
  mental?: number;
  composing?: number;
  lyrics?: number;
  arrangement?: number;
  design?: number;
  newRole?: Role; 
  songProgress?: number;
  quality?: number;
  rivalFans?: number;
  rivalRelation?: number;
  unlockRival?: boolean;
  skillPoints?: number; 
}

export interface Member {
  id: string;
  name: string;
  roles: Role[];
  musicality: number;    
  technique: number;     
  stagePresence: number; 
  creativity: number;    
  mental: number;        
  fatigue: number;
  stress: number;
  affection: number;     
  personality: string;
  tags: string[];        
  isLeader?: boolean;
  interactionsLeft: number;
  composing: number;
  lyrics: number;
  arrangement: number;
  design: number;
  favoriteGenres?: MusicGenre[]; 
  favoriteLyricThemes?: LyricTheme[];
  screenName?: string; 
  snsStyle?: string;   
}

export interface TeamStats {
  technique: number;
  appeal: number;
  stability: number;
  chemistry: number;
}

export interface SNSPost {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  likes: number;
  timestamp: string;
  type: 'member' | 'fan' | 'system' | 'rival';
}

export interface QueuedEvent {
  event: GameEvent;
  member: Member | null;
}

export enum CardType {
  Melody = 'Melody', 
  Rhythm = 'Rhythm', 
  Technique = 'Technique',
  Spirit = 'Spirit',
  Special = 'Special'
}

export interface GigCard {
  id: string;
  instanceId?: string; 
  title: string;
  description: string;
  type: CardType;
  baseVoltage: number; 
  difficulty: number; 
  critBonus?: number; 
  memberId?: string; 
  scalingStat?: keyof Member | 'chemistry' | 'stability' | 'appeal'; 
  hypeGain?: number;
  color?: string; 
  isSongCard?: boolean; 
  cost?: number;
  energyGain?: number;
  drawCount?: number;
}

export type PlayOutcome = 'Miss' | 'Hit' | 'Critical';

export interface CardResult {
    outcome: PlayOutcome;
    voltage: number;
    hypeDelta: number;
    logText: string;
    bonuses?: string[]; 
}

export interface GigDefinition {
  id: string;
  title: string;
  description: string;
  venue: string;
  capacity: number;
  requiredFans: number;
  unlockWeek?: number;
  endWeek?: number; 
  rounds: number; 
  targetVoltage: number; 
  rewards: {
    money: number;
    fans: number;
    fame: number;
  };
}

export interface ActiveGigState {
  definition: GigDefinition;
  currentRound: number;
  maxRounds: number;
  
  currentVoltage: number;
  targetVoltage: number;
  currentHype: number; 

  currentOptions: GigCard[]; 
  phaseName: string; 

  logs: { text: string, type: 'play' | 'effect' | 'turn' | 'miss' | 'crit' }[];
  isFinished: boolean;
  lastResult?: CardResult;

  energy?: number;
  maxEnergy?: number;
  hand?: GigCard[];
  drawPile?: GigCard[];
  discardPile?: GigCard[];
  lastPlayedCard?: GigCard;
}

export interface GigResultData {
    gigTitle: string;
    venue: string;
    finalHype: number; 
    scoreRank: 'S' | 'A' | 'B' | 'C' | 'F';
    moneyEarned: number;
    fansEarned: number;
    rewards: { money: number; fans: number; fame: number };
}

export interface RivalState {
  name: string;
  description: string;
  fans: number;
  relation: number; 
  isUnlocked: boolean;
  style: string;
}

export enum BandState {
    Normal = 'Normal',
    Serious = 'Serious',
    Relaxed = 'Relaxed'
}

export interface SkillNode {
    id: string;
    name: string;
    description: string;
    cost: number;
    x: number;
    y: number;
    parents: string[];
    category: 'friendship' | 'passion' | 'technique' | 'commercial';
    effect?: {
        statMult?: Partial<Record<string, number>>;
        unlockAction?: ScheduleAction[];
        unlockInteraction?: InteractionType[];
        unlockState?: BandState;
        passive?: string;
    };
}

export interface GameState {
  currentWeek: number;
  money: number;
  fans: number;
  bandName: string;
  teamStats: TeamStats;
  members: Member[];
  history: string[];
  weeklySchedule: (ScheduleAction | null)[];
  scoutPool: Member[];   
  refreshCountThisWeek: number;
  snsPosts: SNSPost[];
  songs: Song[];
  currentProject: Song | null;
  eventQueue: QueuedEvent[];
  activeGig: ActiveGigState | null;
  rival: RivalState;
  completedGigs: string[];
  
  skillPoints: number;
  unlockedSkills: string[];
  bandState: BandState;
  
  actionCounts: Record<string, number>;
  currentNews: string[];
}

export interface EventOption {
  label: string;
  effectDescription: string;
  failDescription?: string;
  requiredTag?: string; 
  successChance?: number; 
  isQuitConfirmed?: boolean;
  impact: Impact;
  failImpact?: Impact;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  options: EventOption[];
  isNamingEvent?: boolean;
  requiredRole?: Role; 
  requiredTag?: string; 
  condition?: (state: GameState) => boolean;
}
