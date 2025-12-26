
import { GameEvent } from '../types';

export const RIVAL_EVENTS: GameEvent[] = [
  // --- UNLOCK EVENT (WEEK 4 FORCE) ---
  {
    id: 'rival_encounter_ex_member',
    title: '宿命的重逢',
    description: '在LiveHouse的后台走廊，你遇到了正在备场的超人气新人乐队【[RIVAL_NAME]】。站在中间的主唱摘下墨镜，那双眼睛死死地盯着你。\n\n“终于见到你了……我一直在等这一天。别误会，我不是来叙旧的。我是来亲手埋葬过去的。”',
    condition: (state) => state.currentWeek >= 4 && !state.rival.isUnlocked,
    options: [
      { 
        label: '正面回击：“我也正有此意。”', 
        effectDescription: '火花四溅！两人之间的空气仿佛凝固了。', 
        successChance: 1.0, 
        impact: { unlockRival: true, mental: 10, rivalRelation: 10, stability: 10 } 
      },
      { 
        label: '冷笑：“你现在的水平还不够格。”', 
        effectDescription: '被你的傲慢激怒，她露出了扭曲的笑容。“很好，保持这股劲头，别让我失望。”', 
        successChance: 1.0, 
        impact: { unlockRival: true, stressChange: 10, rivalRelation: -10, stagePresence: 10 } 
      },
      { 
        label: '沉默地递给她一瓶水', 
        effectDescription: '“……啧。” 她拍开了你的手，但耳根似乎有点红。“不需要你的施舍。”', 
        successChance: 1.0, 
        impact: { unlockRival: true, affectionChange: 5, rivalRelation: 20 } 
      }
    ]
  },

  // --- NEW FRENEMY EVENTS (Love/Hate) ---
  {
    id: 'rival_rainy_station',
    title: '只有一把伞',
    description: '突降暴雨，你被困在车站。这时，一把黑伞撑在了你头顶。转头一看，是【[RIVAL_NAME]】的吉他手，一脸不耐烦。\n\n“别误会，我只是不想看到对手淋成落汤鸡的样子，太丢人了。”',
    condition: (state) => state.rival.isUnlocked && Math.random() < 0.15,
    options: [
      { 
        label: '“那就恭敬不如从命了。”', 
        effectDescription: '两人并肩走在雨中，肩膀偶尔碰到一起，气氛微妙地安静。', 
        successChance: 1.0, 
        impact: { rivalRelation: 10, stressChange: -10, mental: 10 } 
      },
      { 
        label: '“我宁愿淋雨！”', 
        effectDescription: '你冲进雨幕。身后传来一声叹息：“笨蛋……”', 
        successChance: 1.0, 
        impact: { rivalRelation: 5, fatigue: 10, mental: 20 } 
      },
      { 
        label: '“作为交换，请你喝热饮。”', 
        effectDescription: '“……我要热可可。加两份糖。”', 
        successChance: 1.0, 
        impact: { money: -500, rivalRelation: 15, affectionChange: 5 } 
      }
    ]
  },
  {
    id: 'rival_secret_fan',
    title: '隐藏的粉丝？',
    description: '你在SNS上发现了一个经常点赞你们动态的小号，ID是“讨厌青椒”。虽然没有头像，但发布的照片里偶尔会露出熟悉的指甲油颜色——那是【[RIVAL_NAME]】贝斯手的标志性配色。',
    condition: (state) => state.rival.isUnlocked && state.fans > 1000,
    options: [
      { 
        label: '看破不说破，默默回关', 
        effectDescription: '对方立刻吓得三天没发动态。', 
        successChance: 1.0, 
        impact: { rivalRelation: 10, mental: 5 } 
      },
      { 
        label: '私信：“下次Live要给你留票吗？”', 
        effectDescription: '秒回：“谁稀罕啊！只是手滑点赞而已！”', 
        successChance: 1.0, 
        impact: { rivalRelation: 10, stressChange: -20 } 
      },
      { 
        label: '在MC环节公开感谢“讨厌青椒”桑', 
        effectDescription: '听说那天【[RIVAL_NAME]】的贝斯手在后台脸红得像番茄。', 
        successChance: 0.5, 
        impact: { fans: 200, rivalRelation: 10 },
        failDescription: '被当成是在阴阳怪气了。',
        failImpact: { rivalRelation: -20 }
      }
    ]
  },
  {
    id: 'rival_sick_visit',
    title: '劲敌的探病',
    description: '你在Live结束后因为过劳晕倒了。醒来时发现自己在休息室，桌上放着一袋高级营养品和一张字条：\n“在打败你之前，不准死。——笨蛋”',
    condition: (state) => state.rival.isUnlocked && state.members.some(m => m.fatigue > 80),
    options: [
      { 
        label: '发SNS感谢：“收到了傲娇的礼物。”', 
        effectDescription: '引发了两家粉丝的疯狂嗑CP（划掉）热议。', 
        successChance: 0.8, 
        impact: { fans: 500, rivalRelation: 15, stressChange: -20 },
        failImpact: { rivalRelation: -30 }
      },
      { 
        label: '把空袋子留着做纪念', 
        effectDescription: '喝完感觉充满了力量！', 
        successChance: 1.0, 
        impact: { fatigue: -50, mental: 30 } 
      },
      { 
        label: '下次送回去双倍的回礼', 
        effectDescription: '这种奇怪的胜负欲也是羁绊的一种。', 
        successChance: 1.0, 
        impact: { money: -2000, rivalRelation: 20, stability: 10 } 
      }
    ]
  },
  {
    id: 'rival_cover_song',
    title: '挑衅般的翻唱',
    description: '【[RIVAL_NAME]】在视频网站上传了翻唱你们成名曲的视频。编曲极其华丽，技巧炫目，视频结尾主唱对着镜头做了一个抹脖子的动作，眼神却充满了笑意。',
    condition: (state) => state.rival.isUnlocked && state.songs.length >= 2,
    options: [
      { 
        label: '翻唱回去！', 
        effectDescription: '把她们的歌改成我们的风格！互蹭热度！', 
        successChance: 0.9, 
        impact: { fans: 2000, technique: 20, rivalRelation: 10 },
        failImpact: { fans: 200, stressChange: 20 }
      },
      { 
        label: '点赞并转发：“唱得不错，下次教你。”', 
        effectDescription: '充满余裕的前辈风范（虽然其实很慌）。', 
        successChance: 1.0, 
        impact: { rivalRelation: -10, stagePresence: 15, mental: 10 } 
      },
      { 
        label: '反复观看视频分析差距', 
        effectDescription: '虽然很不甘心，但她们确实很强。', 
        successChance: 1.0, 
        impact: { technique: 10, arrangement: 15, stressChange: 10 } 
      }
    ]
  },
  {
    id: 'rival_studio_clash',
    title: '录音棚争夺战',
    description: '预定的录音棚搞错了排期，你们和【[RIVAL_NAME]】同时到达了门口。双方互不相让，空气中弥漫着火药味。',
    condition: (state) => state.rival.isUnlocked && state.actionCounts['RentStudio'] > 0,
    options: [
      { 
        label: '提议：“那就Battle吧！赢的人用！”', 
        effectDescription: '即兴Jam对决！最后演变成了互相配合的快乐时光。', 
        successChance: 0.7, 
        impact: { chemistry: 50, rivalRelation: 10, technique: 10 }, 
        failDescription: '技术被碾压了，灰溜溜地让出了录音棚。',
        failImpact: { mental: -30, stressChange: 30 }
      },
      { 
        label: '“挤一挤？或者我们先去吃饭？”', 
        effectDescription: '对方队长脸红了：“谁、谁要和你们挤啊！我们去隔壁小房间！”', 
        successChance: 1.0, 
        impact: { rivalRelation: 20, money: 0 } 
      },
      { 
        label: '展示预定短信，据理力争', 
        effectDescription: '虽然赢了道理，但对方临走时的眼神很可怕。', 
        successChance: 1.0, 
        impact: { rivalRelation: -20, mental: 10 } 
      }
    ]
  },

  // --- EXISTING EVENTS ---
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
  }
];
