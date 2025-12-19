
import { GameEvent } from '../types';

export const RIVAL_EVENTS: GameEvent[] = [
  {
    id: 'rival_encounter_ex_member',
    title: '宿命的重逢',
    description: '在LiveHouse的后台走廊，你遇到了正在备场的超人气新人乐队【[RIVAL_NAME]】。站在中间的主唱摘下墨镜，竟然是你曾经在轻音部的搭档！“哎呀，这不是那个发誓要超越我的前队长吗？”',
    condition: (state) => state.currentWeek >= 4 && !state.rival.isUnlocked,
    options: [
      { 
        label: '笑着打招呼：“好久不见。”', 
        effectDescription: '展现了强者的从容。对方愣了一下，露出了复杂的表情。', 
        successChance: 1.0, 
        impact: { unlockRival: true, mental: 10, rivalRelation: 10 } 
      },
      { 
        label: '冷冷地无视走过', 
        effectDescription: '擦肩而过的一瞬间，火药味弥漫。', 
        successChance: 1.0, 
        impact: { unlockRival: true, stressChange: 10, rivalRelation: -20, stagePresence: 5 } 
      },
      { 
        label: '向现任队友介绍：“这是最强的对手。”', 
        effectDescription: '队友们感受到了你的斗志，士气大振！', 
        successChance: 1.0, 
        impact: { unlockRival: true, affectionChange: 15, stability: 10, rivalRelation: 0 } 
      }
    ]
  },
  {
    id: 'rival_producer_news',
    title: '金牌制作人的青睐',
    description: '重磅新闻！传奇制作人“M先生”宣布将担任【[RIVAL_NAME]】的特别顾问。她们的新单曲预告片仅仅放出10秒，点击量就已经超过了你们所有视频的总和。',
    condition: (state) => state.rival.isUnlocked && state.fans > 3000 && state.currentWeek > 8,
    options: [
      { 
        label: '不甘心，通宵分析她们的编曲', 
        effectDescription: '知己知彼。虽然技术上还有差距，但找到了努力方向。', 
        successChance: 0.8, 
        impact: { arrangement: 20, technique: 10, fatigue: 30 },
        failImpact: { stressChange: 30, mental: -10 }
      },
      { 
        label: '坚信我们自己的风格', 
        effectDescription: '“无论包装多么华丽，只有灵魂是无法伪造的。”', 
        successChance: 1.0, 
        impact: { stability: 20, mental: 15, fans: 500 } 
      },
      { 
        label: '在SNS上公开祝贺（蹭热度）', 
        effectDescription: '虽然被骂“蹭狗”，但确实涨粉了。', 
        successChance: 0.6, 
        impact: { fans: 2000, money: 1000, stressChange: 20 },
        failImpact: { fans: -500, stressChange: 40 } 
      }
    ]
  },
  {
    id: 'rival_gig_clash',
    title: '演出撞车大危机',
    description: '糟糕！你们预定的周末Live，【[RIVAL_NAME]】竟然在隔壁的场馆同时也举办演出！观众势必会被分流，这是一场人气的正面对决。',
    condition: (state) => state.rival.isUnlocked && state.fans > 10000 && Math.random() < 0.1,
    options: [
      { 
        label: '背水一战！修改歌单！', 
        effectDescription: '拿出所有压箱底的快歌，用气势压倒对面！', 
        successChance: 0.7, 
        impact: { fans: 5000, stagePresence: 30, rivalFans: -1000, rivalRelation: -10 }, 
        failDescription: '演出太急躁了，节奏乱成一团，观众都跑去隔壁了。',
        failImpact: { fans: -2000, stability: -20, mental: -20 }
      },
      { 
        label: '去隔壁提议：“不如最后合演一曲？”', 
        effectDescription: '传说中的梦幻共演！当晚的话题霸榜了。', 
        successChance: 0.4, 
        impact: { fans: 8000, rivalRelation: 50, money: 5000, affectionChange: 20 }, 
        failDescription: '被对方经纪人赶了出来……太丢人了。',
        failImpact: { stressChange: 30, fans: -500, rivalRelation: -20 }
      },
      { 
        label: '专注于服务到场的死忠粉', 
        effectDescription: '虽然人数不多，但创造了最温馨的现场回忆。', 
        successChance: 1.0, 
        impact: { stability: 30, affectionChange: 15, mental: 10 } 
      }
    ]
  },
  // --- FRIENDLY RIVALRY EVENTS ---
  {
    id: 'rival_borrow_amp',
    title: '借来的音箱',
    description: '音乐节后台，你们的主音箱突然坏了。正当焦头烂额时，[RIVAL_NAME] 的贝斯手走了过来，指了指她们备用的昂贵设备。“用那个吧，我们不想赢得不光彩。”',
    condition: (state) => state.rival.isUnlocked && state.rival.relation >= 20,
    options: [
      { 
        label: '感激地接受', 
        effectDescription: '“谢了！欠你们一个人情！”', 
        successChance: 1.0, 
        impact: { rivalRelation: 20, technique: 5, mental: 10 } 
      },
      { 
        label: '坚持用备用小音箱', 
        effectDescription: '奇怪的自尊心发作了。', 
        successChance: 1.0, 
        impact: { rivalRelation: -5, stagePresence: -5, stability: 10 } 
      },
      { 
        label: '不仅借音箱，还借调音师', 
        effectDescription: '既然要欠人情，就欠个大的！', 
        successChance: 0.5, 
        impact: { rivalRelation: 10, quality: 10 }, 
        failDescription: '被对方嫌弃太厚脸皮了。',
        failImpact: { rivalRelation: -10, stressChange: 10 }
      }
    ]
  },
  {
    id: 'rival_midnight_conbini',
    title: '便利店的偶遇',
    description: '深夜排练结束后，你在便利店遇到了同样来买关东煮的 [RIVAL_NAME] 队长。两人手里拿着同款的能量饮料，气氛微妙。',
    condition: (state) => state.rival.isUnlocked,
    options: [
      { 
        label: '坐在路边聊聊最近的压力', 
        effectDescription: '原来光鲜亮丽的她们也有烦恼。', 
        successChance: 1.0, 
        impact: { stressChange: -30, rivalRelation: 15, mental: 10 } 
      },
      { 
        label: '为了最后一串萝卜争抢起来', 
        effectDescription: '像小孩子一样吵架。', 
        successChance: 0.5, 
        impact: { rivalRelation: 10, fatigue: -5 },
        failImpact: { rivalRelation: -10, stressChange: 10 }
      },
      { 
        label: '比谁喝饮料喝得快', 
        effectDescription: '莫名其妙的胜负欲。', 
        successChance: 1.0, 
        impact: { fatigue: 10, rivalRelation: 5 } 
      }
    ]
  },
  {
    id: 'rival_joint_practice',
    title: '来自强者的邀请',
    description: '为了备战即将到来的大型选拔赛，[RIVAL_NAME] 竟然主动发来了合宿邀请！“别误会，我们只是想找个陪练，顺便看看你们有没有长进。”',
    condition: (state) => state.rival.isUnlocked && state.rival.relation >= 50 && state.money > 2000,
    options: [
      { 
        label: '欣然前往！(¥2000)', 
        effectDescription: '白天切磋技术，晚上枕头大战。', 
        successChance: 1.0, 
        impact: { money: -2000, technique: 30, rivalRelation: 30, affectionChange: 20, fatigue: 40 } 
      },
      { 
        label: '只参加白天的训练', 
        effectDescription: '保持距离感，只吸收技术。', 
        successChance: 1.0, 
        impact: { technique: 15, rivalRelation: 10, fatigue: 20 } 
      },
      { 
        label: '拒绝，我们有自己的节奏', 
        effectDescription: '“下次见面就是敌人。”', 
        successChance: 1.0, 
        impact: { stability: 15, rivalRelation: -10 } 
      }
    ]
  }
];
