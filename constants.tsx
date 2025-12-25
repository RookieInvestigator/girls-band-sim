
import { ScheduleAction, ScheduleCategory } from './types';

export const MAX_MEMBERS = 7;
export const FINAL_GOAL_WEEKS = 52;
export const BUDOKAN_FANS_REQUIRED = 100000;
export const INITIAL_MONEY = 8000;
export const SLOTS_PER_WEEK = 3;
export const REFRESH_COST_BASE = 200;
export const MAX_SPECIAL_EXECUTIONS = 99; // Fallback, individual limits are in SPECIAL_ACTION_LIMITS

// Specific limits for special actions
export const SPECIAL_ACTION_LIMITS: Partial<Record<ScheduleAction, number>> = {
    [ScheduleAction.FireworksDate]: 2,
    [ScheduleAction.SchoolFestival]: 3,
    [ScheduleAction.ThemePark]: 3,
    [ScheduleAction.ChristmasParty]: 1,
    [ScheduleAction.GraduationTrip]: 1,
};

// Maps actions to their categories
export const ACTION_TO_CATEGORY: Record<ScheduleAction, ScheduleCategory> = {
  // Basic Stats (Solo)
  [ScheduleAction.InstrumentPractice]: ScheduleCategory.Solo,
  [ScheduleAction.VocalPractice]: ScheduleCategory.Solo,
  [ScheduleAction.SoloExpression]: ScheduleCategory.Solo,
  [ScheduleAction.PhysicalTraining]: ScheduleCategory.Solo, // NEW
  [ScheduleAction.ImageTraining]: ScheduleCategory.Solo, // NEW
  [ScheduleAction.SelfRecording]: ScheduleCategory.Solo,
  
  // Advanced Stats (Study)
  [ScheduleAction.MusicTheory]: ScheduleCategory.Study,
  [ScheduleAction.LyricsWorkshop]: ScheduleCategory.Study,
  [ScheduleAction.ObservationNote]: ScheduleCategory.Study, // Moved from Solo
  [ScheduleAction.ListenAnalysis]: ScheduleCategory.Study,
  [ScheduleAction.DesignWork]: ScheduleCategory.Study, 
  [ScheduleAction.VocalLesson]: ScheduleCategory.Study,
  [ScheduleAction.InstrumentLesson]: ScheduleCategory.Study,
  [ScheduleAction.LiveHouseStudy]: ScheduleCategory.Study,

  // Band
  [ScheduleAction.BandEnsemble]: ScheduleCategory.Band,
  [ScheduleAction.BandRehearsal]: ScheduleCategory.Band,
  [ScheduleAction.MeetingReview]: ScheduleCategory.Band, // NEW
  [ScheduleAction.AcousticSession]: ScheduleCategory.Band, // NEW
  [ScheduleAction.RentStudio]: ScheduleCategory.Band,
  [ScheduleAction.TrainingCamp]: ScheduleCategory.Band, 
  
  // Creation (Project)
  [ScheduleAction.Songwriting]: ScheduleCategory.Creation,
  [ScheduleAction.DemoProduction]: ScheduleCategory.Creation,
  [ScheduleAction.LyricsPolishing]: ScheduleCategory.Creation,
  [ScheduleAction.ComposeJam]: ScheduleCategory.Creation,
  [ScheduleAction.Recording]: ScheduleCategory.Creation,
  [ScheduleAction.Mastering]: ScheduleCategory.Creation,
  
  // Promotion
  [ScheduleAction.StreetLive]: ScheduleCategory.Promotion,
  [ScheduleAction.FlyerDistribution]: ScheduleCategory.Promotion,
  [ScheduleAction.SocialMediaLive]: ScheduleCategory.Promotion,
  [ScheduleAction.RadioInterview]: ScheduleCategory.Promotion,
  [ScheduleAction.LiveStream]: ScheduleCategory.Promotion,
  [ScheduleAction.PhotoSession]: ScheduleCategory.Promotion,
  [ScheduleAction.MusicVideoShoot]: ScheduleCategory.Promotion,
  [ScheduleAction.CharityLive]: ScheduleCategory.Promotion,
  
  // Leisure
  [ScheduleAction.SugarIntake]: ScheduleCategory.Leisure, // Renamed & Moved from Solo
  [ScheduleAction.TeaTime]: ScheduleCategory.Leisure,
  [ScheduleAction.GameCenter]: ScheduleCategory.Leisure,
  [ScheduleAction.GroupTrip]: ScheduleCategory.Leisure,
  [ScheduleAction.EquipmentCare]: ScheduleCategory.Leisure,
  [ScheduleAction.StyleMakeover]: ScheduleCategory.Leisure,
  [ScheduleAction.PartTimeJob]: ScheduleCategory.Leisure, 

  // Special (Limited)
  [ScheduleAction.SchoolFestival]: ScheduleCategory.Special,
  [ScheduleAction.FireworksDate]: ScheduleCategory.Special,
  [ScheduleAction.ThemePark]: ScheduleCategory.Special,
  [ScheduleAction.ChristmasParty]: ScheduleCategory.Special,
  [ScheduleAction.GraduationTrip]: ScheduleCategory.Special,
};

// Maps actions to the PRIMARY stat they increase (for UI)
export const ACTION_PRIMARY_STAT: Partial<Record<ScheduleAction, string>> = {
    [ScheduleAction.InstrumentPractice]: '技巧',
    [ScheduleAction.VocalPractice]: '乐感',
    [ScheduleAction.SoloExpression]: '表现',
    [ScheduleAction.PhysicalTraining]: '体能 & 表现',
    [ScheduleAction.ImageTraining]: '技巧 & 心态',
    [ScheduleAction.SelfRecording]: '技巧 & 编曲',
    
    [ScheduleAction.SugarIntake]: '压力恢复',
    [ScheduleAction.ObservationNote]: '想象 & 作词',
    
    [ScheduleAction.MusicTheory]: '作曲',
    [ScheduleAction.LyricsWorkshop]: '作词',
    [ScheduleAction.ListenAnalysis]: '编曲',
    [ScheduleAction.DesignWork]: '视觉',
    [ScheduleAction.LiveHouseStudy]: '乐感 & 魅力',
    
    [ScheduleAction.InstrumentLesson]: '技巧++',
    [ScheduleAction.VocalLesson]: '乐感++',
    
    [ScheduleAction.BandEnsemble]: '默契',
    [ScheduleAction.BandRehearsal]: '综合能力',
    [ScheduleAction.MeetingReview]: '精准 & 默契',
    [ScheduleAction.AcousticSession]: '编曲 & 乐感',
    [ScheduleAction.RentStudio]: '新曲品质',
    
    [ScheduleAction.Songwriting]: '新曲进度',
    [ScheduleAction.DemoProduction]: '编曲 & 进度',
    [ScheduleAction.LyricsPolishing]: '作词 & 品质',
    [ScheduleAction.ComposeJam]: '进度+默契',
    [ScheduleAction.Recording]: '进度+技巧',
    [ScheduleAction.Mastering]: '品质+++',
};

export const SCHEDULE_COSTS: Partial<Record<ScheduleAction, number>> = {
  [ScheduleAction.BandRehearsal]: 500,
  [ScheduleAction.RentStudio]: 1500,
  [ScheduleAction.SugarIntake]: 300,
  [ScheduleAction.TeaTime]: 200,
  [ScheduleAction.GameCenter]: 300,
  [ScheduleAction.Recording]: 800,
  [ScheduleAction.Mastering]: 2000, 
  [ScheduleAction.MusicVideoShoot]: 3000,
  [ScheduleAction.EquipmentCare]: 300,
  [ScheduleAction.DesignWork]: 100, 
  [ScheduleAction.GroupTrip]: 2000,
  [ScheduleAction.VocalLesson]: 800,
  [ScheduleAction.InstrumentLesson]: 800, 
  [ScheduleAction.TrainingCamp]: 5000,
  [ScheduleAction.PhotoSession]: 1200,
  [ScheduleAction.StyleMakeover]: 2000,
  [ScheduleAction.LiveHouseStudy]: 1000, 
  
  // Special
  [ScheduleAction.SchoolFestival]: 1000, 
  [ScheduleAction.FireworksDate]: 500, 
  [ScheduleAction.ThemePark]: 3000, 
  [ScheduleAction.ChristmasParty]: 2000, 
  [ScheduleAction.GraduationTrip]: 8000, 
};

// Start Week 1 (April 1st)
export const ACTION_UNLOCKS: Partial<Record<ScheduleAction, { week?: number, endWeek?: number, fans?: number, members?: number, money?: number }>> = {
  // Basics available immediately
  [ScheduleAction.InstrumentPractice]: { week: 1 },
  [ScheduleAction.VocalPractice]: { week: 1 },
  [ScheduleAction.SoloExpression]: { week: 1 },
  [ScheduleAction.PhysicalTraining]: { week: 1 },
  [ScheduleAction.PartTimeJob]: { week: 1 },
  [ScheduleAction.FlyerDistribution]: { week: 1 },
  
  // Basic Unlock
  [ScheduleAction.ImageTraining]: { week: 2 },
  [ScheduleAction.SugarIntake]: { week: 1 },
  [ScheduleAction.ObservationNote]: { week: 2 },

  // Study
  [ScheduleAction.MusicTheory]: { week: 2 },
  [ScheduleAction.DesignWork]: { week: 2 },
  [ScheduleAction.LyricsWorkshop]: { week: 3 },
  [ScheduleAction.ListenAnalysis]: { week: 3 },
  [ScheduleAction.LiveHouseStudy]: { week: 4, money: 1000 },
  [ScheduleAction.SelfRecording]: { week: 5 },

  // Leisure & Band
  [ScheduleAction.TeaTime]: { members: 2 },
  [ScheduleAction.GameCenter]: { members: 2, week: 3 },
  [ScheduleAction.BandEnsemble]: { members: 2 },
  [ScheduleAction.AcousticSession]: { members: 2, week: 2 },
  [ScheduleAction.BandRehearsal]: { week: 3, members: 3 },
  [ScheduleAction.MeetingReview]: { week: 4, members: 3 },
  [ScheduleAction.EquipmentCare]: { week: 4 },
  
  // Creation
  [ScheduleAction.Songwriting]: { week: 2, members: 2 },
  [ScheduleAction.DemoProduction]: { week: 3, members: 2 },
  [ScheduleAction.ComposeJam]: { week: 4, members: 3 },
  [ScheduleAction.LyricsPolishing]: { week: 4, members: 2 },
  [ScheduleAction.Recording]: { week: 5, members: 3 },
  [ScheduleAction.Mastering]: { week: 8, money: 2000 },
  
  // Advanced Training
  [ScheduleAction.VocalLesson]: { week: 6 },
  [ScheduleAction.InstrumentLesson]: { week: 6 }, 
  
  // Promotion
  [ScheduleAction.LiveStream]: { fans: 2000, members: 3 },
  [ScheduleAction.PhotoSession]: { fans: 5000, members: 3 },
  [ScheduleAction.CharityLive]: { week: 6, members: 3 },
  [ScheduleAction.RadioInterview]: { fans: 3000, members: 3 },
  [ScheduleAction.GroupTrip]: { week: 10, members: 3 },
  [ScheduleAction.StyleMakeover]: { week: 8, money: 5000 },
  [ScheduleAction.MusicVideoShoot]: { week: 15, fans: 10000, members: 4 },

  // Special Unlocks - Seasonal
  [ScheduleAction.FireworksDate]: { week: 16, endWeek: 24, members: 3 }, // Summer (July/Aug)
  [ScheduleAction.SchoolFestival]: { week: 28, endWeek: 32, members: 4, fans: 1000 }, // Autumn (Oct/Nov)
  [ScheduleAction.ThemePark]: { week: 10, members: 4, money: 5000 }, 
  [ScheduleAction.ChristmasParty]: { week: 36, endWeek: 40, members: 3 }, // Winter (December)
  [ScheduleAction.GraduationTrip]: { week: 48, endWeek: 52, members: 3 }, // End (March)
};
