
import { GameEvent } from '../types';

export const STORY_EVENTS: GameEvent[] = [
  {
    id: 'naming_event',
    title: '乐队之名',
    description: '放学后的天台，夕阳把云层染成了茜色。大家围坐在一起，眼中闪烁着光芒。队长，是时候决定那个将响彻武道馆的名字了！',
    isNamingEvent: true,
    options: [
      { label: '确认这个名字', effectDescription: '传说，从此刻开始。', impact: { stability: 20, affectionChange: 20, mental: 10 } }
    ]
  }
];
