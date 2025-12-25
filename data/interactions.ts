
import { InteractionType, SelfActionType, ActionResult } from '../types';

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
    label: '甜点时光',
    stressChange: -30,
    fatigueChange: -20,
    affectionChange: 15,
    techniqueChange: 0,
    cost: 600, 
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
    cost: 1000,
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

export const INTERACTION_TEMPLATES: Record<InteractionType, { templates: Record<ActionResult, string[]> }> = {
  [InteractionType.IntensivePractice]: {
    templates: {
      [ActionResult.Success]: ["[NAME] 咬牙坚持了下来，虽然很累，但眼神变得更犀利了。", "[NAME] 完成了魔鬼训练，整个人都虚脱了。"],
      [ActionResult.GreatSuccess]: ["[NAME] 似乎突破了瓶颈，即便汗流浃背也露出了笑容！", "训练效果拔群！[NAME] 感觉自己变强了。"],
      [ActionResult.Failure]: ["[NAME] 体力不支倒在了地板上，看来是太勉强了。", "因为太累，[NAME] 甚至在练习中途睡着了。"]
    }
  },
  [InteractionType.CafeDate]: {
    templates: {
      [ActionResult.Success]: ["你们聊了很多无关紧要的话题，[NAME] 看起来很放松。", "店里的氛围不错，[NAME] 的心情变好了。"],
      [ActionResult.GreatSuccess]: ["甜点非常美味！[NAME] 露出了久违的灿烂笑容，你们的关系更近了一步。", "[NAME] 很喜欢这里的限定芭菲，还拍了照。"],
      [ActionResult.Failure]: ["店里人太多了，吵闹的环境让 [NAME] 有点不自在。", "点的蛋糕卖完了，[NAME] 显得很失落。"]
    }
  },
  [InteractionType.DeepTalk]: {
    templates: {
      [ActionResult.Success]: ["你们一直聊到了深夜，虽然有些困，但心里的距离拉近了。", "聊了聊关于未来的打算，[NAME] 似乎更有干劲了。"],
      [ActionResult.GreatSuccess]: ["不知不觉天亮了，[NAME] 似乎把积压在心底的话都说了出来。", "这是一次触及灵魂的对话，你们更加信任彼此了。"],
      [ActionResult.Failure]: ["聊着聊着陷入了沉默，气氛有些尴尬。", "似乎触碰到了 [NAME] 不想提的话题，谈话草草结束了。"]
    }
  },
  [InteractionType.Gift]: {
    templates: {
      [ActionResult.Success]: ["[NAME] 收下了礼物，脸颊微红地说了声谢谢。", "虽然不是很贵重，但 [NAME] 看起来挺开心的。"],
      [ActionResult.GreatSuccess]: ["“这是我一直想要的！” [NAME] 激动地抱紧了礼物。", "[NAME] 惊喜得说不出话来，一直盯着礼物看。"],
      [ActionResult.Failure]: ["[NAME] 似乎对这个礼物不太感兴趣，只是礼貌性地收下了。", "[NAME] 困惑地看着礼物，好像不知道该怎么用。"]
    }
  },
  [InteractionType.Reprimand]: {
    templates: {
      [ActionResult.Success]: ["[NAME] 低下头反省了自己的问题，承诺下次会注意。", "虽然有些不甘心，但 [NAME] 还是接受了批评。"],
      [ActionResult.GreatSuccess]: ["[NAME] 被你的气势震慑住了，练习时的态度发生了翻天覆地的变化。", "意识到自己的错误后，[NAME] 变得格外认真。"],
      [ActionResult.Failure]: ["[NAME] 不服气地顶了几句嘴，摔门而去。", "[NAME] 觉得你太严厉了，委屈地哭了出来。"]
    }
  }
};

export const SELF_ACTION_TEMPLATES: Record<SelfActionType, { templates: Record<ActionResult, string[]> }> = {
  [SelfActionType.SoloPractice]: {
    templates: {
      [ActionResult.Success]: ["独自一人在空荡荡的练习室里挥洒汗水。", "感觉技术又精进了一些。"],
      [ActionResult.GreatSuccess]: ["状态绝佳！仿佛能听见乐器在歌唱。", "突破了之前的技术难关！"],
      [ActionResult.Failure]: ["总是静不下心来，练习效率不高。", "手指不听使唤，今天状态不行。"]
    }
  },
  [SelfActionType.Meditation]: {
    templates: {
      [ActionResult.Success]: ["闭上眼睛放空大脑，杂念慢慢消失了。", "深呼吸，感受内心的平静。"],
      [ActionResult.GreatSuccess]: ["进入了心流状态，压力一扫而空！", "仿佛看到了宇宙的真理（？）。"],
      [ActionResult.Failure]: ["脑子里全是还没写完的谱子，根本静不下来。", "坐了一会儿反而腰酸背痛。"]
    }
  },
  [SelfActionType.Songwriting]: {
    templates: {
      [ActionResult.Success]: ["记录下了一些零碎的旋律片段。", "写了几句还不错的歌词。"],
      [ActionResult.GreatSuccess]: ["灵感如泉涌！一首新歌的雏形诞生了。", "笔尖仿佛有了生命，停不下来！"],
      [ActionResult.Failure]: ["盯着白纸发呆了一个小时。", "写出来的东西全是垃圾，烦躁地撕掉了。"]
    }
  },
  [SelfActionType.AdminWork]: {
    templates: {
      [ActionResult.Success]: ["处理了积压的邮件和账单。", "整理了接下来的日程安排。"],
      [ActionResult.GreatSuccess]: ["意外地发现了一笔漏算的收入！", "高效率地完成了所有琐事，神清气爽。"],
      [ActionResult.Failure]: ["看着复杂的报表头都大了。", "不小心把咖啡洒在了文件上..."]
    }
  },
  [SelfActionType.QuickNap]: {
    templates: {
      [ActionResult.Success]: ["在沙发上眯了一会儿，精神恢复了不少。", "短暂的休息是为了走更远的路。"],
      [ActionResult.GreatSuccess]: ["这一觉睡得太香了，醒来感觉重生了一样！", "做了一个站在武道馆舞台上的美梦。"],
      [ActionResult.Failure]: ["被噩梦惊醒，反而更累了。", "刚睡着就被电话吵醒了。"]
    }
  }
};
