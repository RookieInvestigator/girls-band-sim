
import { GameEvent } from '../types';

export const CRITICAL_EVENTS: GameEvent[] = [
  {
    id: 'stress_breakdown',
    title: 'EMO时刻',
    description: '[NAME] 缩在练习室的墙角，戴着耳机一言不发。手机屏幕亮着，SNS上的恶评和学业的压力像潮水一样将她淹没。“呐，我们这样坚持下去，真的有意义吗？”',
    options: [
      { 
        label: '强制断网休假', 
        effectDescription: '没收手机，去海边大喊！', 
        successChance: 1.0, 
        impact: { stressChange: -50, fatigue: -30, mental: -20, fans: -200, affectionChange: -5 } 
      }
    ]
  },
  {
    id: 'fatigue_collapse',
    title: '过载关机',
    description: '连轴转的打工、复习和排练终于压垮了身体。在去赶末班电车的站台上，[NAME] 摇晃了一下，倒在了队友怀里。',
    options: [
      { 
        label: '紧急送医', 
        effectDescription: '身体是革命的本钱！', 
        successChance: 1.0, 
        impact: { money: -3000, fatigue: -80, stressChange: 20, technique: -5 } 
      }
    ]
  }
];
