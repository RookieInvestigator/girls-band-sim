
export enum Role {
  Vocal = '主唱',
  Guitar = '吉他',
  Bass = '贝斯',
  Drums = '鼓手',
  Keyboard = '键盘',
  Producer = '制作人',
  DJ = 'DJ',
  Violin = '小提琴',
  Saxophone = '萨克斯',
  Staff = '临时经纪人',
  Accordion = '手风琴',
  Harp = '竖琴',
  Shamisen = '电三味线',
  Rapper = 'MC/Rapper'
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
  Solo = '基础训练', 
  Band = '合奏排练',
  Creation = '创作录音',
  Promotion = '宣传活动',
  Leisure = '休闲整顿',
  Study = '进阶研习',
  Special = '特别企划'
}

export enum ScheduleAction {
  // Basic Stats (Solo)
  InstrumentPractice = '特训：演奏技巧',
  VocalPractice = '特训：乐感视唱',
  SoloExpression = '特训：舞台表现',
  PhysicalTraining = '特训：体能强化', // NEW
  ImageTraining = '特训：意象模拟', // NEW
  SelfRecording = '特训：自录复盘',

  // Advanced Stats (Study)
  MusicTheory = '研习：作曲理论', 
  LyricsWorkshop = '研习：作词采风', 
  ObservationNote = '研习：观察笔记', // Renamed & Moved from HumanObservation
  ListenAnalysis = '研习：编曲分析', 
  DesignWork = '研习：视觉设计', 
  LiveHouseStudy = '研习：Live观摩', 
  VocalLesson = '专业声乐私教', 
  InstrumentLesson = '专业乐器私教', 

  // Band & Project
  BandEnsemble = '乐队合奏排练',
  BandRehearsal = '全员登台彩排',
  MeetingReview = '乐队反省会', // NEW
  AcousticSession = '不插电排练', // NEW
  RentStudio = '租用录音棚练习',
  TrainingCamp = '夏季合宿特训',

  // Creation (Expanded to 6)
  Songwriting = '新曲创作研讨', // 构思
  DemoProduction = 'Demo编曲制作', // 编曲
  LyricsPolishing = '歌词深度打磨', // 作词
  ComposeJam = '即兴作曲Jam', // 灵感
  Recording = '录音棚录制', // 录音
  Mastering = '母带后期处理', // 后期

  // Promotion
  StreetLive = '街头突袭路演',
  FlyerDistribution = '街区海报张贴',
  SocialMediaLive = '深夜直播互动',
  RadioInterview = '电台访谈录制',
  MusicVideoShoot = '首支MV拍摄',
  CharityLive = '社区公益演出',
  LiveStream = '网络不插电直播',
  PhotoSession = '宣发写真拍摄',

  // Leisure
  SugarIntake = '放松：糖分摄入', // Renamed & Moved from TechoTime
  TeaTime = '练习室茶话会',
  GameCenter = '街机厅团建',
  GroupTrip = '海边采风旅行',
  EquipmentCare = '乐器深度保养',
  PartTimeJob = '兼职打工补贴',
  StyleMakeover = '造型风格改造',
  
  // Special Actions
  SchoolFestival = '文化祭压轴演出',
  FireworksDate = '夏日花火大会',
  ThemePark = '游乐园团建',
  ChristmasParty = '圣诞特别派对',
  GraduationTrip = '毕业纪念旅行'
}

export enum InteractionType {
  IntensivePractice = '强制加练',
  CafeDate = '甜点时光',
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
  addRole?: Role; // NEW: Add a role without replacing existing ones
  songProgress?: number;
  quality?: number;
  rivalFans?: number;
  rivalRelation?: number;
  unlockRival?: boolean;
  skillPoints?: number; 
  // Global Effects
  allMemberStress?: number;
  allMemberMental?: number;
  chemistry?: number;
  // Future Events
  scheduleEventId?: string;
  scheduleEventDelay?: number;
  restoreOriginalRole?: boolean;
  // Tag Manipulation
  addTags?: string[];
  removeTags?: string[];
  // Description / Personality Change
  newDescription?: string;
  newName?: string; // For Neta/Transformation
  newNetaName?: string;
}

export interface Member {
  id: string;
  name: string;
  netaName?: string; // Original inspiration name
  roles: Role[];
  originalRoles?: Role[]; 
  musicality: number;    
  technique: number;     
  stagePresence: number; 
  creativity: number;    
  mental: number;        
  fatigue: number;
  stress: number;
  affection: number;     
  personality: string;
  netaDesc?: string; // Original inspiration description
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

export interface BandStats {
  // 1. Performance (演奏)
  performance: number; // AGGREGATE
  precision: number; // 精准
  tone: number;      // 音色
  rhythm: number;    // 律动
  dynamics: number;  // 动态

  // 2. Stage (现场)
  stage: number;     // AGGREGATE
  aura: number;      // 气场
  interaction: number; // 互动
  visual: number;    // 视觉
  adaptation: number; // 改编

  // 3. Bond (羁绊)
  bond: number;      // AGGREGATE
  synergy: number;   // 默契 (Calculated from rawChemistry)
  connection: number; // 联结 (Avg Affection)
  topic: number;     // 话题 (Fans + Design)

  // 4. Work (作品)
  work: number;      // AGGREGATE
  narrative: number; // 叙事
  melody: number;    // 旋律
  detail: number;    // 细节

  // Composite Rating
  totalRating: string; // S, A, B, C, D...

  // LEGACY MAPPING (For compatibility)
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

export interface FutureEvent {
  triggerWeek: number;
  eventId: string;
  memberId: string;
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
  scalingStat?: keyof BandStats | keyof Member; 
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
  teamStats: BandStats;
  members: Member[];
  history: string[];
  weeklySchedule: (ScheduleAction | null)[];
  scoutPool: Member[];   
  refreshCountThisWeek: number;
  snsPosts: SNSPost[];
  songs: Song[];
  currentProject: Song | null;
  eventQueue: QueuedEvent[];
  futureEvents: FutureEvent[]; 
  activeGig: ActiveGigState | null;
  rival: RivalState;
  completedGigs: string[];
  skillPoints: number;
  unlockedSkills: string[];
  bandState: BandState;
  actionCounts: Record<string, number>;
  currentNews: string[];
  rawChemistry: number; 
  completedEvents: string[]; // NEW: Track unique events
}

export interface EventOption {
  label: string;
  effectDescription: string;
  // NEW FIELDS for Neta Mode
  netaLabel?: string; 
  netaEffectDescription?: string;
  
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
  netaTitle?: string; // NEW
  netaDescription?: string; // NEW
  options: EventOption[];
  isNamingEvent?: boolean;
  requiredRole?: Role; 
  requiredTag?: string; 
  condition?: (state: GameState) => boolean;
}
