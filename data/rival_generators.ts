
import { RivalState } from '../types';

const PREFIXES = [
  '苍穹', '绝对', '深渊', '极夜', '绯红', '虚空', '终焉', '纯白', 
  '零度', '幻想', '暴走', '星屑', '无限', '逆光', '失坠',
  '紫罗兰', '蔷薇', '迷途', '只有', '不存在的'
];

const SUFFIXES = [
  '战线', '少女', '法则', '革命', '默示录', '结界', '协奏曲', '方程式', 
  '庭园', '迷宫', '综合症', '回廊', '计划', '定理', '断章',
  '通信', '帝国', '马戏团', '神话', '葬列'
];

const STYLES = [
  'Symphonic Metal', 'Math Rock', 'Gothic Lolita', 'Cyberpunk', 'Jazz Fusion', 
  'Emo Punk', 'Visual Kei', 'Techno Pop', 'Hardcore', 'Shoegaze'
];

const DESCRIPTIONS = [
  '一支风格成熟、技术完美的学院派乐队。似乎和你们有着某种渊源。',
  '最近在地下乐坛异军突起的黑马，以极具攻击性的台风著称。',
  '由名门高校原本的精英乐手组成，视音乐为必须精确计算的数学公式。',
  '充满谜团的蒙面乐队，没有人知道她们的真实身份，但演奏实力深不可测。',
  '以华丽的视觉效果和宏大的世界观吸引了大量狂热信徒的教主级乐队。'
];

export const generateRivalBand = (): RivalState => {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  const name = `${prefix}${suffix}`; // No space for Sino-Japanese style names
  
  const style = STYLES[Math.floor(Math.random() * STYLES.length)];
  const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];

  // Randomize starting relation slightly (30-50)
  const startRelation = 30 + Math.floor(Math.random() * 20);
  
  // Randomize starting fans (4000-6000)
  const startFans = 4000 + Math.floor(Math.random() * 2000);

  return {
    name,
    description,
    fans: startFans,
    relation: startRelation,
    isUnlocked: false,
    style
  };
};
