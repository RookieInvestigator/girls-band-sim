
import { ScheduleAction, ScheduleCategory } from './types';

export const MAX_MEMBERS = 5;
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

export const ACTION_TO_CATEGORY: Record<ScheduleAction, ScheduleCategory> = {
  [ScheduleAction.InstrumentPractice]: ScheduleCategory.Solo,
  [ScheduleAction.VocalPractice]: ScheduleCategory.Solo,
  [ScheduleAction.SoloExpression]: ScheduleCategory.Solo,
  [ScheduleAction.VocalLesson]: ScheduleCategory.Solo,
  [ScheduleAction.InstrumentLesson]: ScheduleCategory.Solo, 
  
  [ScheduleAction.BandEnsemble]: ScheduleCategory.Band,
  [ScheduleAction.BandRehearsal]: ScheduleCategory.Band,
  [ScheduleAction.RentStudio]: ScheduleCategory.Band,
  [ScheduleAction.TrainingCamp]: ScheduleCategory.Band, 
  
  [ScheduleAction.Songwriting]: ScheduleCategory.Creation,
  [ScheduleAction.Recording]: ScheduleCategory.Creation,
  [ScheduleAction.DesignWork]: ScheduleCategory.Creation,
  [ScheduleAction.LyricsWorkshop]: ScheduleCategory.Creation,
  [ScheduleAction.ComposeJam]: ScheduleCategory.Creation,
  
  [ScheduleAction.StreetLive]: ScheduleCategory.Promotion,
  [ScheduleAction.FlyerDistribution]: ScheduleCategory.Promotion,
  [ScheduleAction.SocialMediaLive]: ScheduleCategory.Promotion,
  [ScheduleAction.RadioInterview]: ScheduleCategory.Promotion,
  [ScheduleAction.LiveStream]: ScheduleCategory.Promotion,
  [ScheduleAction.PhotoSession]: ScheduleCategory.Promotion,
  [ScheduleAction.MusicVideoShoot]: ScheduleCategory.Promotion,
  [ScheduleAction.CharityLive]: ScheduleCategory.Promotion,
  
  [ScheduleAction.TeaTime]: ScheduleCategory.Leisure,
  [ScheduleAction.GameCenter]: ScheduleCategory.Leisure,
  [ScheduleAction.GroupTrip]: ScheduleCategory.Leisure,
  [ScheduleAction.EquipmentCare]: ScheduleCategory.Leisure,
  [ScheduleAction.StyleMakeover]: ScheduleCategory.Leisure,
  
  [ScheduleAction.MusicTheory]: ScheduleCategory.Study,
  [ScheduleAction.PartTimeJob]: ScheduleCategory.Study,
  [ScheduleAction.ListenAnalysis]: ScheduleCategory.Study,

  // Special (Limited)
  [ScheduleAction.SchoolFestival]: ScheduleCategory.Special,
  [ScheduleAction.FireworksDate]: ScheduleCategory.Special,
  [ScheduleAction.ThemePark]: ScheduleCategory.Special,
  [ScheduleAction.ChristmasParty]: ScheduleCategory.Special,
  [ScheduleAction.GraduationTrip]: ScheduleCategory.Special,
};

export const SCHEDULE_COSTS: Partial<Record<ScheduleAction, number>> = {
  [ScheduleAction.BandRehearsal]: 500,
  [ScheduleAction.RentStudio]: 1500,
  [ScheduleAction.TeaTime]: 200,
  [ScheduleAction.GameCenter]: 300,
  [ScheduleAction.Recording]: 800,
  [ScheduleAction.MusicVideoShoot]: 3000,
  [ScheduleAction.EquipmentCare]: 300,
  [ScheduleAction.DesignWork]: 100,
  [ScheduleAction.GroupTrip]: 2000,
  [ScheduleAction.VocalLesson]: 800,
  [ScheduleAction.InstrumentLesson]: 800, 
  [ScheduleAction.TrainingCamp]: 5000,
  [ScheduleAction.PhotoSession]: 1200,
  [ScheduleAction.StyleMakeover]: 2000,
  
  // Special
  [ScheduleAction.SchoolFestival]: 1000, // Costumes/Decor
  [ScheduleAction.FireworksDate]: 500, // Food
  [ScheduleAction.ThemePark]: 3000, // Tickets
  [ScheduleAction.ChristmasParty]: 2000, // Food/Gifts
  [ScheduleAction.GraduationTrip]: 8000, // Trip cost
};

// Start Week 1 (April 1st)
// Seasons:
// Spring: 1-13 (April - June)
// Summer: 14-26 (July - September)
// Autumn: 27-39 (October - December)
// Winter: 40-52 (January - March)

export const ACTION_UNLOCKS: Partial<Record<ScheduleAction, { week?: number, endWeek?: number, fans?: number, members?: number, money?: number }>> = {
  [ScheduleAction.InstrumentPractice]: { week: 1 },
  [ScheduleAction.VocalPractice]: { week: 1 },
  [ScheduleAction.SoloExpression]: { week: 1 },
  [ScheduleAction.PartTimeJob]: { week: 1 },
  [ScheduleAction.MusicTheory]: { week: 2 },
  [ScheduleAction.FlyerDistribution]: { week: 1 },
  [ScheduleAction.TeaTime]: { members: 2 },
  [ScheduleAction.GameCenter]: { members: 2, week: 3 },
  
  [ScheduleAction.Songwriting]: { week: 2, members: 2 },
  [ScheduleAction.DesignWork]: { week: 2, members: 2 },
  [ScheduleAction.LyricsWorkshop]: { week: 4, members: 2 },
  [ScheduleAction.ComposeJam]: { week: 4, members: 3 },
  
  [ScheduleAction.BandEnsemble]: { members: 2 },
  [ScheduleAction.BandRehearsal]: { week: 3, members: 3 },
  
  [ScheduleAction.EquipmentCare]: { week: 4 },
  [ScheduleAction.VocalLesson]: { week: 3 },
  [ScheduleAction.InstrumentLesson]: { week: 3 }, 
  [ScheduleAction.ListenAnalysis]: { week: 3 },
  
  [ScheduleAction.LiveStream]: { fans: 2000, members: 3 },
  [ScheduleAction.PhotoSession]: { fans: 5000, members: 3 },
  [ScheduleAction.CharityLive]: { week: 6, members: 3 },
  
  [ScheduleAction.Recording]: { week: 5, members: 3 },
  [ScheduleAction.RadioInterview]: { fans: 3000, members: 3 },
  [ScheduleAction.GroupTrip]: { week: 10, members: 3 },
  [ScheduleAction.StyleMakeover]: { week: 8, money: 5000 },
  
  [ScheduleAction.MusicVideoShoot]: { week: 15, fans: 10000, members: 4 },

  // Special Unlocks - Seasonal
  [ScheduleAction.FireworksDate]: { week: 16, endWeek: 24, members: 3 }, // Summer (July/Aug)
  [ScheduleAction.SchoolFestival]: { week: 28, endWeek: 32, members: 4, fans: 1000 }, // Autumn (Oct/Nov)
  [ScheduleAction.ThemePark]: { week: 10, members: 4, money: 5000 }, // Available most times after week 10
  [ScheduleAction.ChristmasParty]: { week: 36, endWeek: 40, members: 3 }, // Winter (December)
  [ScheduleAction.GraduationTrip]: { week: 48, endWeek: 52, members: 3 }, // End (March)
};
