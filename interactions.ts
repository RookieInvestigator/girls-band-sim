
import { InteractionType, Member } from './types';

export interface InteractionEffect {
  label: string;
  stressChange: number;
  fatigueChange: number;
  affectionChange: number;
  techniqueChange: number;
  cost: number;
  description: (name: string) => string;
}

export const INTERACTION_DATA: Record<InteractionType, InteractionEffect> = {
  [InteractionType.IntensivePractice]: {
    label: '强制加练',
    stressChange: 15,
    fatigueChange: 25,
    affectionChange: -5,
    techniqueChange: 12,
    cost: 0,
    description: (name) => `你强制要求 ${name} 进行闭关练习。她虽然疲惫，但技艺确实精进了不少。`
  },
  [InteractionType.CafeDate]: {
    label: '甜点约会',
    stressChange: -30,
    fatigueChange: -10,
    affectionChange: 15,
    techniqueChange: 0,
    cost: 800,
    description: (name) => `你带 ${name} 去了那家很有名的甜点店。看到她满足的样子，你觉得钱花得很值。`
  },
  [InteractionType.DeepTalk]: {
    label: '深夜长谈',
    stressChange: -15,
    fatigueChange: 10,
    affectionChange: 10,
    techniqueChange: 2,
    cost: 0,
    description: (name) => `你们聊到了深夜，关于音乐，关于梦想。你们的默契度似乎提高了。`
  },
  [InteractionType.Gift]: {
    label: '赠送小礼物',
    stressChange: -10,
    fatigueChange: 0,
    affectionChange: 20,
    techniqueChange: 0,
    cost: 1500,
    description: (name) => `你送了一套定制的拨片给 ${name}。她显得非常惊喜。`
  },
  [InteractionType.Reprimand]: {
    label: '队长训诫',
    stressChange: 20,
    fatigueChange: 0,
    affectionChange: -10,
    techniqueChange: 5,
    cost: 0,
    description: (name) => `你严厉地批评了 ${name} 最近的散漫。她虽然不服气，但练习变得专注了。`
  }
};
