
import { GameEvent } from '../types';
import { CRITICAL_EVENTS } from './events_critical';
import { TAG_EVENTS } from './events_tag';
import { STORY_EVENTS } from './events_story';
import { DAILY_EVENTS } from './events_daily';
import { PRACTICE_EVENTS } from './events_practice';
import { RELATIONSHIP_EVENTS } from './events_relation';
import { CAREER_EVENTS } from './events_career';
import { RIVAL_EVENTS } from './events_rival';

export const EVENT_LIBRARY: GameEvent[] = [
  ...CRITICAL_EVENTS,
  ...TAG_EVENTS,
  ...STORY_EVENTS,
  ...DAILY_EVENTS,
  ...PRACTICE_EVENTS,
  ...RELATIONSHIP_EVENTS,
  ...CAREER_EVENTS,
  ...RIVAL_EVENTS
];
