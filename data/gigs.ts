
import { GigDefinition } from '../types';

export const GIG_DEFINITIONS: Record<string, GigDefinition> = {
  'street_live_debut': {
    id: 'street_live_debut',
    title: '街头首演',
    description: '无需门槛，只要有勇气就能站上的舞台。虽然观众只是路人，但这是梦想的第一步！',
    venue: '车站前广场',
    capacity: 50,
    requiredFans: 0,
    unlockWeek: 1, // Available immediately
    rounds: 5, 
    targetVoltage: 500, 
    rewards: { money: 1000, fans: 300, fame: 5 }
  },
  'school_festival': {
    id: 'school_festival',
    title: '私立樱丘高中·文化祭',
    description: '一年一度的校园狂欢。这是制霸校园的绝佳机会！',
    venue: '学校大礼堂',
    capacity: 500,
    requiredFans: 0,
    unlockWeek: 4,
    endWeek: 8, // Time Limited
    rounds: 8, // Short event
    targetVoltage: 1500, 
    rewards: { money: 2000, fans: 5000, fame: 10 }
  },
  'livehouse_gig': {
    id: 'livehouse_gig',
    title: 'STARRY 周末公演',
    description: '著名的LiveHouse，台下站着的都是挑剔的独立音乐爱好者。证明你们实力的时候到了。',
    venue: 'LiveHouse STARRY',
    capacity: 200,
    requiredFans: 1000,
    unlockWeek: 10,
    rounds: 10,
    targetVoltage: 4000,
    rewards: { money: 15000, fans: 3000, fame: 20 }
  },
  'summer_sonic': {
    id: 'summer_sonic',
    title: 'SUMMER SONIC · 海风舞台',
    description: '夏日最大的音乐节！巨大的户外舞台，数万名观众。只有被选中的乐队才能站在这里。',
    venue: '幕张海滨公园',
    capacity: 30000,
    requiredFans: 20000,
    unlockWeek: 24,
    endWeek: 30, // Summer only
    rounds: 15, // Long endurance battle
    targetVoltage: 10000,
    rewards: { money: 100000, fans: 50000, fame: 100 }
  },
  'budokan_final': {
    id: 'budokan_final',
    title: '日本武道馆·最终公演',
    description: '梦想的终点，亦是新的起点。在那金色的洋葱头下，让世界听到你们的声音。',
    venue: '日本武道馆',
    capacity: 14000,
    requiredFans: 50000,
    unlockWeek: 40,
    rounds: 15,
    targetVoltage: 30000,
    rewards: { money: 0, fans: 100000, fame: 500 }
  }
};
