
import { GameEvent, Role } from '../types';

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
  },
  {
    id: 'critical_dismissal',
    title: '残酷的告别',
    description: '当你提出让她退出乐队时，[NAME] 愣住了。手中的乐器滑落，发出了刺耳的声响。“...你是认真的吗？这就是我们约定的终点吗？”',
    options: [
      {
        label: '心意已决',
        effectDescription: '长痛不如短痛。',
        isQuitConfirmed: true,
        successChance: 1.0,
        impact: { 
            stability: -40, 
            chemistry: -50,
            allMemberStress: 20, 
            allMemberMental: -20, 
            fans: -500 
        }
      },
      {
        label: '以经纪人的身份',
        effectDescription: '按照你自己的意愿去做……给我一个不会后悔的答案。',
        successChance: 1.0, 
        impact: { 
            newRole: Role.Staff,
            scheduleEventId: 'staff_return_decision',
            scheduleEventDelay: 3,
            mental: 10, 
            allMemberStress: 5,
            affectionChange: 10 
        }
      },
      {
        label: '我开玩笑的……再试一次',
        effectDescription: '虽然留下了，但裂痕已经产生，信任需要时间修复。',
        successChance: 1.0,
        impact: { 
            affectionChange: -40, 
            stressChange: 30, 
            stability: -10 
        }
      }
    ]
  },
  {
    id: 'staff_return_decision',
    title: '临时经纪人的去留',
    description: '三个星期过去了，[NAME] 作为制作人展现了不同的一面，默默地支持着乐队。今天，她拿着整理好的乐谱找到了你。“队长，关于我的未来……”',
    options: [
      {
        label: '“回来吧，舞台需要你。”',
        effectDescription: '她眼中重新燃起了光芒，拿起了久违的乐器。',
        successChance: 1.0,
        impact: {
            restoreOriginalRole: true,
            stability: 15,
            affectionChange: 20,
            mental: 20
        }
      },
      {
        label: '“如果你一直这样下去的话……我希望你能退出。”',
        effectDescription: '缘分已尽。她留下了最后的祝福，转身离开了。',
        isQuitConfirmed: true,
        successChance: 1.0,
        impact: {
            mental: -10,
            stability: -5
        }
      }
    ]
  }
];
