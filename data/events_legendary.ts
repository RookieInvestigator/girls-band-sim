
import { GameEvent, Role } from '../types';

export const LEGENDARY_EVENTS: GameEvent[] = [
  // --- UR_KAREN (Togawa Sakiko) ---
  {
    id: 'ur_karen_fall',
    title: '雨中的宣告',
    description: '[NAME] 迟到了很久。当她终于推开练习室的门时，外面正下着倾盆大雨，她浑身湿透，连伞都没有撑。\n\n面对队友们关切的眼神，她没有理会，只是径直走到中间，用毫无起伏的冰冷声音说道：\n\n“我，要退出这个乐队。”\n“这种过家家（朋友游戏），我已经玩腻了。”',
    netaTitle: '旧梦的崩坏',
    netaDescription: '丰川祥子站在雨中，刘海贴在额头上，眼神空洞得可怕。那是旧日梦魇重演的一天。\n\n“我要退出。”\n\n她无视了大家的挽留，冷淡地抛下了那句话。\n“你们觉得这很有趣吗？这种只有表面关系的‘朋友游戏’……我受够了。”',
    condition: (state) => {
        const karen = state.members.find(m => m.id === 'ur_karen');
        return !!karen && !karen.tags.includes('复仇者') && state.currentWeek >= 8 && !state.completedEvents.includes('ur_karen_fall');
    },
    options: [
      { 
        label: '“那就不做朋友，做‘共犯’吧。”', 
        effectDescription: '既然你厌倦了温情脉脉的游戏，那就让我们开始为了生存的厮杀。', 
        netaLabel: '“那就让我看看你的‘觉悟’。”',
        netaEffectDescription: '她停下了脚步，回头看了你一眼。那眼神中不再有迷茫，只有对力量的渴望。',
        successChance: 1.0, 
        impact: { 
            affectionChange: -100, // Bond broken
            stressChange: -50, 
            technique: 20,
            stagePresence: 30,
            mental: 30,
            addTags: ['复仇者', '假面', '无情'],
            removeTags: ['白月光', '完美主义', '大小姐'],
            newDescription: '“只要能站在顶端，我愿意出卖灵魂。” 舍弃了过去的软弱，成为了支配舞台的魔王。',
            newNetaName: 'Oblivionis', 
            newName: '鲸·Oblivionis'
        } 
      },
      { 
        label: '“为什么？大家明明那么开心……”', 
        effectDescription: '试图唤起过去美好的回忆，但她只是冷笑了一声。', 
        netaLabel: '“为什么要退团？祥子酱！”',
        netaEffectDescription: '“开心？那只是你的一厢情愿罢了。” 她头也不回地离开了。',
        successChance: 1.0, 
        impact: { 
            affectionChange: -50,
            mental: 10,
            stability: -30
        } 
      }
    ]
  },

  // --- UR_SHIZUKU (Takamatsu Tomori) ---
  {
    id: 'ur_shizuku_planetarium',
    title: '天文馆的微光',
    description: '[NAME] 独自坐在天文馆的角落，仰望着头顶人造的银河。四周很安静，只有解说员温柔的声音。\n\n“只要在这里……就不会迷路了。因为星星的位置，是绝对不会变的。”她抱着膝盖，仿佛在寻找属于自己的坐标。',
    netaTitle: '也就是……一辈子',
    netaDescription: '高松灯凝视着星空，仿佛在寻找那个能容纳她的宇宙。\n\n“我……想要和大家一起看星星。既然组了乐队，那就……一直、一直在一起。如果是这样的话，就算是迷路也没关系。”',
    condition: (state) => state.members.some(m => m.id === 'ur_shizuku') && state.songs.length >= 1 && !state.completedEvents.includes('ur_shizuku_planetarium'),
    options: [
      { 
        label: '“那就约定好了，一直在一起。”', 
        effectDescription: '许下了沉重的誓言。她抬起头，眼睛里映着星光。', 
        netaLabel: '“也就是……一辈子？”',
        netaEffectDescription: '她紧紧握住了你的手。“嗯……一辈子。”',
        successChance: 1.0, 
        impact: { 
            affectionChange: 100, // Heavy Love
            mental: 20,
            stability: 30
        } 
      },
      { 
        label: '“把这片星空写成歌吧。”', 
        effectDescription: '将这份感动转化为永恒的旋律。', 
        netaLabel: '“这就是我们的‘诗’。”',
        netaEffectDescription: '“呐喊吧……哪怕声音枯竭。”',
        successChance: 1.0, 
        impact: { 
            stressChange: -30,
            lyrics: 40,
            creativity: 20
        } 
      }
    ]
  },

  // --- UR_CHIHIRO (Goto Hitori) ---
  {
    id: 'ur_chihiro_box',
    title: '纸箱里的独奏',
    description: 'Live开始前五分钟，[NAME] 因为过度紧张引发了并发症，钻进了一个写着“完熟芒果”的纸箱里死活不肯出来。\n\n“我……我就在箱子里弹！这里是绝对领域！”',
    netaTitle: '吉他英雄降临',
    netaDescription: '后藤独 (Bocchi) 再次发动了“完熟芒果”形态。\n\n“只要在箱子里……我就能变成网络上那个无敌的‘英雄’！哪怕是阴暗的我也想闪耀啊！”',
    condition: (state) => state.members.some(m => m.id === 'ur_chihiro') && state.activeGig !== null && !state.completedEvents.includes('ur_chihiro_box'),
    options: [
      { 
        label: '把麦克风塞进箱子里', 
        effectDescription: '成为了传说中的“箱中吉他手”！观众以为是行为艺术，反响热烈。', 
        netaLabel: '“那就作为‘英雄’去战斗吧！”',
        netaEffectDescription: '即使是在箱子里，那也是属于你的摇滚！',
        successChance: 1.0, 
        impact: { 
            fans: 1000,
            stagePresence: 30, 
            stressChange: -20
        } 
      },
      { 
        label: '强行撕开纸箱', 
        effectDescription: '她在台上像融化的史莱姆一样抽搐，虽然演奏没问题，但吓坏了小朋友。', 
        netaLabel: '“给我出来！这是Live！”',
        netaEffectDescription: '“咿呀呀呀！社会性死亡了！我要化成灰了！”',
        successChance: 1.0, 
        impact: { 
            technique: 10,
            mental: -20,
            stressChange: 40
        } 
      }
    ]
  },

  // --- UR_MAI (Hirasawa Yui) ---
  {
    id: 'ur_mai_geeta',
    title: '吉他并不是道具',
    description: '[NAME] 给自己的吉他穿上了衣服，还抱着它睡觉。“吉太说它冷了！如果不给它保暖的话，它会感冒然后音准变差的！”',
    netaTitle: '吉太与唯',
    netaDescription: '平泽唯正抱着她的 Gibson Les Paul (吉太)。\n\n“虽然我不懂乐理，但我知道吉太的心情哦！对吧，忧……啊不对，队长！我也能用响板演奏出很好的节奏哦！”',
    condition: (state) => state.members.some(m => m.id === 'ur_mai') && !state.completedEvents.includes('ur_mai_geeta'),
    options: [
      { 
        label: '配合她：“那给它围上围巾吧。”', 
        effectDescription: '吉他的音色真的变暖了？！这不科学！', 
        netaLabel: '“那我们也来喝茶吃点心吧！”',
        netaEffectDescription: '放学后的茶会开始了！虽然没有练习，但重要的东西增加了。',
        successChance: 0.9, 
        impact: { 
            musicality: 20,
            affectionChange: 20,
            mental: 10
        } 
      },
      { 
        label: '教她正确的保养知识', 
        effectDescription: '她听睡着了。', 
        netaLabel: '“好好练习啊！”',
        netaEffectDescription: '“诶——可是我想吃蛋糕嘛~”',
        successChance: 1.0, 
        impact: { 
            technique: 5,
            fatigue: -10
        } 
      }
    ]
  },

  // --- UR_NANO (Hiromachi Nanami) ---
  {
    id: 'ur_nano_art',
    title: '异常的平均值',
    description: '[NAME] 看着成绩单，抱头蹲防中。\n\n“国语58分，数学58分，英语58分……全科目都精确地控制在了年级平均分上！\n\n糟了，这种‘完全一致的平均’从概率学上来说简直是奇迹吧？！这下反而比考满分更显眼了！我明明只是想做一个普通的JK啊！”',
    netaTitle: '普通的定义',
    netaDescription: '广町七深正在为自己过于精准的控分能力感到苦恼。\n\n“想要变得普通真的好难啊……普通的JK这时候应该考多少分？带有随机误差的平均分吗？呜呜呜……我又搞砸了。”',
    condition: (state) => state.members.some(m => m.id === 'ur_nano') && !state.completedEvents.includes('ur_nano_art'),
    options: [
      { 
        label: '“在这个乐队里，你不需要伪装。”', 
        effectDescription: '告诉她，这里的每个人都是特别的。不需要刻意变得平庸。', 
        netaLabel: '“无论你是天才还是普通人，都是我们的Bass手。”',
        netaEffectDescription: '“诶？真的吗？我也能……做我自己吗？”她似乎找到了真正的栖身之所。',
        successChance: 1.0, 
        impact: { 
            design: 30,
            creativity: 20,
            mental: 10,
            affectionChange: 20,
            newDescription: '不再刻意隐藏才能的天才，开始尝试在“普通”和“特别”之间寻找平衡。',
            addTags: ['觉醒']
        } 
      },
      { 
        label: '“能精准控分说明你全都会，来教大家学习吧！”', 
        effectDescription: '“诶？真的吗？像普通的优等生那样和朋友开学习会？好、好憧憬！”她眼睛发亮，虽然出发点有点怪，但她享受到了渴望的“普通日常”。', 
        netaLabel: '“这种控制力简直是神技！广町老师！”',
        netaEffectDescription: '“包在我身上！我会制定最完美的‘普通’教学计划！”',
        successChance: 1.0, 
        impact: { 
            stressChange: -20,
            arrangement: 15,
            affectionChange: 15,
            mental: 5
        } 
      }
    ]
  },

  // --- UR_RIINA (Tada Riina) ---
  {
    id: 'ur_riina_rock',
    title: '空气吉他穿帮',
    description: '[NAME] 正在给粉丝展示她的“超绝技巧”，结果太激动把耳机线甩掉了，大家发现她根本没插线，耳机里放的是偶像歌曲。\n\n“这……这也是Rock的一种表现形式！是心中的声音！”',
    netaTitle: '这就是我的Rock道',
    netaDescription: '多田李衣菜的“伪摇”身份被揭穿了。\n\n“哪怕是形似也没关系！哪怕还没学会那个很难的和弦……但我想要变酷的心情是真的Rock！这就足够了吧！”',
    condition: (state) => state.members.some(m => m.id === 'ur_riina') && !state.completedEvents.includes('ur_riina_rock'),
    options: [
      { 
        label: '把真吉他塞给她：“那就现在弹。”', 
        effectDescription: '被逼到了绝境，她满脸通红地弹了一段C大调音阶。虽然笨拙，但眼神很认真。', 
        netaLabel: '“那就用你的灵魂去弹奏吧！”',
        netaEffectDescription: '虽然技术还很稚嫩，但那份热情传达到了。',
        successChance: 1.0, 
        impact: { 
            technique: 20,
            mental: 10,
            affectionChange: 15,
            fans: 200 
        } 
      },
      { 
        label: '帮她圆场：“这是在此刻的静默中感受宇宙！”', 
        effectDescription: '虽然很扯，但粉丝们居然信了。', 
        netaLabel: '“这也是一种风格嘛。”',
        netaEffectDescription: '虽然混过去了，但她看起来有点不甘心。',
        successChance: 0.8, 
        impact: { 
            fans: 500,
            stagePresence: 20,
            affectionChange: 20
        },
        failImpact: {
            fans: -100,
            stressChange: 20
        }
      }
    ]
  },

  // --- UR_SHIHO (Hinomori Shiho) ---
  {
    id: 'ur_shiho_cute',
    title: '独狼的秘密',
    description: '你在休息室的沙发缝隙里发现了一个粉红色的、毛茸茸的吉祥物挂件。正准备拿起来问是谁的，[NAME] 突然冲过来一把抢走，满脸通红。\n\n“看……看什么看！贝斯手喜欢可爱的东西犯法吗？！”',
    netaTitle: 'Phenny 的守护者',
    netaDescription: '日野森志步拼命藏起手中的 "Phenny" 玩偶。\n\n“我才不喜欢这种软绵绵的东西……只是……这是姐姐送的……不对！反正你什么都没看见！快忘掉！”',
    condition: (state) => state.members.some(m => m.id === 'ur_shiho') && !state.completedEvents.includes('ur_shiho_cute'),
    options: [
      { 
        label: '“非常适合你。”', 
        effectDescription: '她愣住了，别过脸去。“哼……算你有眼光。”', 
        netaLabel: '“我也喜欢 Phenny！”',
        netaEffectDescription: '找到了同好！她眼睛发亮，开始滔滔不绝地安利起周边的可爱之处。',
        successChance: 1.0, 
        impact: { 
            affectionChange: 40,
            stressChange: -30,
            stability: 10
        } 
      },
      { 
        label: '“我会保密的。”', 
        effectDescription: '她松了一口气，看起来稍微放松了一些。', 
        netaLabel: '“送你一个同款吧。”',
        netaEffectDescription: '她有些害羞地接受了。“下次……再一起去买吧。”',
        successChance: 1.0, 
        impact: { 
            affectionChange: 50,
            chemistry: 20,
            mental: 10
        } 
      }
    ]
  },

  // --- UR_TOKA (Kawaragi Momoka) ---
  {
    id: 'ur_toka_middlefinger',
    title: '拒绝商业化',
    description: '前事务所的经纪人找上门来，提出只要 [NAME] 愿意回去，就可以提供顶级的资源，前提是必须按照公司的要求包装。\n\n[NAME] 喝了一口便宜的罐装啤酒，笑了笑。',
    netaTitle: '对这个世界竖起中指',
    netaDescription: '河原木桃香看着“那个偶像乐队”的前队友们发来的邀请函。\n\n“我已经不想再唱那些虚伪的歌了。哪怕在路边吃土，我也要唱出属于我们自己的声音。”',
    condition: (state) => state.members.some(m => m.id === 'ur_toka') && !state.completedEvents.includes('ur_toka_middlefinger'),
    options: [
      { 
        label: '看她怎么做', 
        effectDescription: '她把合同撕了。“滚吧，我现在过得很开心。”', 
        netaLabel: '竖起中指',
        netaEffectDescription: '“这就是我的回答。”',
        successChance: 1.0, 
        impact: { 
            mental: 30,
            fans: 1000, 
            affectionChange: 30,
            addTags: ['叛逆者']
        } 
      },
      { 
        label: '稍微有点心动（资金方面）', 
        effectDescription: '被她狠狠瞪了一眼。“要是你敢答应，我就退队。”', 
        netaLabel: '劝她考虑一下前途',
        netaEffectDescription: '“哈？你也是那种无聊的大人吗？”',
        successChance: 1.0, 
        impact: { 
            affectionChange: -50,
            stressChange: 20
        } 
      }
    ]
  },

  // --- UR_MIA (Mia Taylor) ---
  {
    id: 'ur_mia_microphone',
    title: '生锈的麦克风',
    description: '深夜的录音棚里传出了歌声。不是平时那种为了试音而随意哼唱的调子，而是充满了爆发力与渴望的真正演唱。\n\n推开门，[NAME]正握着麦克风，满脸泪水。看到你进来，她慌乱地擦干眼泪，恢复了往日的傲慢神态。\n\n“只是...随便唱唱而已。我可是作曲家，唱歌这种事...不需要我来做。”',
    netaTitle: 'I\'m Still...',
    netaDescription: '米娅·泰勒站在麦克风前，那是她一直渴望却又害怕触碰的领域。\n\n“一直以来，我都只是作为‘Taylor家的人’活着...写出完美的曲子是理所当然的。但是...我也想唱歌啊！我也想让大家听听‘米娅’的声音啊！”',
    condition: (state) => state.members.some(m => m.id === 'ur_mia') && state.songs.length >= 1 && !state.completedEvents.includes('ur_mia_microphone'),
    options: [
      { 
        label: '“这首歌，必须由你来唱。”', 
        effectDescription: '把麦克风重新塞回她手里。打破她的心防。', 
        netaLabel: '“Sing! Mia!”',
        netaEffectDescription: '“Baby? No, I am... a VOCALIST!” 她终于迈出了那一步。',
        successChance: 1.0, 
        impact: { 
            addRole: Role.Vocal, // ADDED VOCAL ROLE
            musicality: 30,
            stagePresence: 20,
            affectionChange: 40,
            mental: 20,
            newDescription: '挣脱了“作曲机器”的枷锁，用自己的歌声征服舞台的真正歌姬。',
            addTags: ['主唱觉醒']
        } 
      },
      { 
        label: '“很棒的Demo，我会找个合适的主唱。”', 
        effectDescription: '她眼里的光黯淡了下去。“...也是呢。Whatever。”', 
        netaLabel: '无视她的渴望',
        netaEffectDescription: '她默默地关掉了麦克风，变回了那个冷漠的天才作曲家。',
        successChance: 1.0, 
        impact: { 
            composing: 30,
            affectionChange: -20,
            stressChange: 20,
            mental: -10
        } 
      }
    ]
  },

  // --- UR_NIJIKA (Ijichi Nijika) ---
  {
    id: 'ur_nijika_angel',
    title: '最坚强的后盾',
    description: '连续的演出让你这个队长精疲力尽，瘫倒在练习室的长椅上。这时，一罐冰镇果汁贴在了你的脸上。\n\n[NAME] 笑着坐在你旁边。“辛苦啦，队长！虽然聚光灯照在前面，但我会在后面一直看着大家的。只要有鼓声在，大家就不会乱，对吧？”',
    netaTitle: '真正的天使',
    netaDescription: '伊地知虹夏看着疲惫的你，温柔地递过饮料。\n\n“我们的队长真是拼命呢。不过，偶尔也依赖一下我吧？虽然你是带领大家前进的人，但我会成为支撑你的底座。毕竟……是要去武道馆的嘛！”',
    condition: (state) => state.members.some(m => m.id === 'ur_nijika') && !state.completedEvents.includes('ur_nijika_angel'),
    options: [
      { 
        label: '“谢谢你，一直支持着我。”', 
        effectDescription: '“诶嘿嘿……被感谢了稍微有点不好意思呢。”她有些害羞地挠了挠头。', 
        netaLabel: '“果然，虹夏是我的天使啊。”',
        netaEffectDescription: '“别、别叫那个名字啦！笨蛋！”虽然脸红了，但看起来很开心。',
        successChance: 1.0, 
        impact: { 
            chemistry: 40,
            affectionChange: 30,
            mental: 20,
            allMemberStress: -30 // Healing aura from support
        } 
      },
      { 
        label: '试图拔掉呆毛', 
        effectDescription: '“呀！会死的！本体会被拔掉的！”', 
        netaLabel: '拿出一包 Doritos',
        netaEffectDescription: '“等等！那是我的同类？！不要吃它啊！”',
        successChance: 1.0, 
        impact: { 
            stressChange: 10,
            affectionChange: 10, // Playful
            mental: 10
        } 
      }
    ]
  }
];
