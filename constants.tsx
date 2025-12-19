import { ScheduleAction, ScheduleCategory } from './types';

export const MAX_MEMBERS = 5;
export const FINAL_GOAL_WEEKS = 52;
export const BUDOKAN_FANS_REQUIRED = 100000;
export const INITIAL_MONEY = 8000;
export const SLOTS_PER_WEEK = 3;
export const REFRESH_COST_BASE = 200;

export const ACTION_TO_CATEGORY: Record<ScheduleAction, ScheduleCategory> = {
  [ScheduleAction.SoloTechnical]: ScheduleCategory.Solo,
  [ScheduleAction.SoloVocal]: ScheduleCategory.Solo,
  [ScheduleAction.SoloExpression]: ScheduleCategory.Solo,
  [ScheduleAction.VocalLesson]: ScheduleCategory.Solo,
  
  [ScheduleAction.BandEnsemble]: ScheduleCategory.Band,
  [ScheduleAction.BandRehearsal]: ScheduleCategory.Band,
  [ScheduleAction.RentStudio]: ScheduleCategory.Band,
  [ScheduleAction.TrainingCamp]: ScheduleCategory.Band, // New: Band Category
  
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
  
  [ScheduleAction.MusicVideoShoot]: ScheduleCategory.Performance,
  
  [ScheduleAction.TeaTime]: ScheduleCategory.Leisure,
  [ScheduleAction.GroupTrip]: ScheduleCategory.Leisure,
  [ScheduleAction.EquipmentCare]: ScheduleCategory.Leisure,
  [ScheduleAction.StyleMakeover]: ScheduleCategory.Leisure,
  
  [ScheduleAction.MusicTheory]: ScheduleCategory.Study,
  [ScheduleAction.PartTimeJob]: ScheduleCategory.Study,
  [ScheduleAction.ListenAnalysis]: ScheduleCategory.Study,
};

export const SCHEDULE_COSTS: Partial<Record<ScheduleAction, number>> = {
  [ScheduleAction.BandRehearsal]: 500,
  [ScheduleAction.RentStudio]: 1500,
  [ScheduleAction.TeaTime]: 200,
  [ScheduleAction.Recording]: 800,
  [ScheduleAction.MusicVideoShoot]: 3000,
  [ScheduleAction.EquipmentCare]: 300,
  [ScheduleAction.DesignWork]: 100,
  [ScheduleAction.GroupTrip]: 2000,
  [ScheduleAction.VocalLesson]: 800,
  [ScheduleAction.TrainingCamp]: 5000, // High Cost
  [ScheduleAction.PhotoSession]: 1200,
  [ScheduleAction.StyleMakeover]: 2000,
};

export const ACTION_UNLOCKS: Record<ScheduleAction, { week?: number, fans?: number, members?: number, money?: number }> = {
  [ScheduleAction.SoloTechnical]: { week: 1 },
  [ScheduleAction.SoloVocal]: { week: 1 },
  [ScheduleAction.SoloExpression]: { week: 1 },
  [ScheduleAction.PartTimeJob]: { week: 1 },
  [ScheduleAction.MusicTheory]: { week: 2 },
  [ScheduleAction.FlyerDistribution]: { week: 1 },
  [ScheduleAction.TeaTime]: { members: 2 },
  
  [ScheduleAction.Songwriting]: { week: 2, members: 2 },
  [ScheduleAction.DesignWork]: { week: 2, members: 2 },
  [ScheduleAction.LyricsWorkshop]: { week: 4, members: 2 },
  [ScheduleAction.ComposeJam]: { week: 4, members: 3 },
  
  [ScheduleAction.BandEnsemble]: { members: 2 },
  [ScheduleAction.BandRehearsal]: { week: 3, members: 3 },
  [ScheduleAction.RentStudio]: { week: 6, members: 3, fans: 500 },
  [ScheduleAction.TrainingCamp]: { week: 8, members: 3, money: 5000 },
  
  [ScheduleAction.EquipmentCare]: { week: 4 },
  [ScheduleAction.VocalLesson]: { week: 3 },
  [ScheduleAction.ListenAnalysis]: { week: 3 },
  
  [ScheduleAction.StreetLive]: { week: 3, members: 2 },
  [ScheduleAction.SocialMediaLive]: { fans: 500, members: 2 },
  [ScheduleAction.LiveStream]: { fans: 2000, members: 3 },
  [ScheduleAction.PhotoSession]: { fans: 5000, members: 3 },
  
  [ScheduleAction.Recording]: { week: 5, members: 3 },
  [ScheduleAction.RadioInterview]: { fans: 3000, members: 3 },
  [ScheduleAction.GroupTrip]: { week: 10, members: 3 },
  [ScheduleAction.StyleMakeover]: { week: 8, money: 5000 },
  
  [ScheduleAction.MusicVideoShoot]: { week: 15, fans: 30000, members: 4 },
};