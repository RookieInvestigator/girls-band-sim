
import { GameState, SNSPost } from '../types';
import { NEWS_LIBRARY } from '../data/news_content';
import { 
    MEMBER_POST_TEMPLATES, 
    FAN_COMMENT_TEMPLATES, 
    RIVAL_PROMO_TEMPLATES, 
    RIVAL_POST_TEMPLATES, 
    FAN_WAR_TEMPLATES,
    SHORT_POST_TEMPLATES,
    LONG_POST_TEMPLATES,
    POETIC_POST_TEMPLATES
} from '../data/sns_templates';
import { formatText } from './utils';

export const generateWeeklyNews = (rival: any, week: number) => {
    const items = [];
    if (rival && rival.isUnlocked) {
        if (Math.random() < 0.3) items.push(NEWS_LIBRARY.rival[Math.floor(Math.random() * NEWS_LIBRARY.rival.length)].replace('[RIVAL_NAME]', rival.name));
    }
    
    const normalizedWeek = ((week - 1) % 52) + 1;
    
    let seasonNews = [];
    if (normalizedWeek >= 1 && normalizedWeek <= 13) seasonNews = NEWS_LIBRARY.spring;
    else if (normalizedWeek >= 14 && normalizedWeek <= 26) seasonNews = NEWS_LIBRARY.summer;
    else if (normalizedWeek >= 27 && normalizedWeek <= 39) seasonNews = NEWS_LIBRARY.autumn;
    else seasonNews = NEWS_LIBRARY.winter;

    items.push(seasonNews[Math.floor(Math.random() * seasonNews.length)]);
    
    if (Math.random() < 0.5) items.push(NEWS_LIBRARY.industry[Math.floor(Math.random() * NEWS_LIBRARY.industry.length)]);
    else items.push(NEWS_LIBRARY.trend[Math.floor(Math.random() * NEWS_LIBRARY.trend.length)]);
    
    items.push(NEWS_LIBRARY.gossip[Math.floor(Math.random() * NEWS_LIBRARY.gossip.length)]);
    
    return items;
};

export const generateFallbackSNS = (state: GameState): SNSPost[] => {
    const newPosts: SNSPost[] = [];
    const weekStr = `Week ${state.currentWeek}`;
    
    state.members.forEach(m => {
      if (Math.random() < 0.35) {
        let contentPool = MEMBER_POST_TEMPLATES['default'];
        if (m.tags.some(t => ['三无', '酷', '社恐'].includes(t))) {
            contentPool = SHORT_POST_TEMPLATES;
        } else if (m.tags.some(t => ['辣妹', '元气', '偶像', '现充'].includes(t))) {
            contentPool = LONG_POST_TEMPLATES;
        } else if (m.tags.some(t => ['中二病', '电波', '文学少女'].includes(t))) {
            contentPool = POETIC_POST_TEMPLATES;
        } else {
            for (const t of m.tags) {
                if (MEMBER_POST_TEMPLATES[t]) {
                    contentPool = MEMBER_POST_TEMPLATES[t];
                    break;
                }
            }
        }
        const content = contentPool[Math.floor(Math.random() * contentPool.length)];
        newPosts.push({
          id: Math.random().toString(36), authorId: m.id, authorName: m.name,
          content: content, likes: 10 + Math.floor(Math.random()*50),
          timestamp: weekStr, type: 'member'
        });
      }
    });

    const fanPostCount = 1 + Math.floor(Math.random() * 2);
    for(let i=0; i<fanPostCount; i++) {
       const content = FAN_COMMENT_TEMPLATES[Math.floor(Math.random() * FAN_COMMENT_TEMPLATES.length)];
       newPosts.push({
          id: Math.random().toString(36), authorId: 'fan', authorName: '路人粉丝',
          content: content, likes: Math.floor(Math.random()*20),
          timestamp: weekStr, type: 'fan'
       });
    }
    
    if (state.rival.isUnlocked) {
        const roll = Math.random();
        if (roll < 0.4) {
            const content = RIVAL_PROMO_TEMPLATES[Math.floor(Math.random() * RIVAL_PROMO_TEMPLATES.length)];
            newPosts.push({
                id: Math.random().toString(36), authorId: 'rival', authorName: state.rival.name + '_OFFICIAL',
                content: content, 
                likes: state.rival.fans / 5 + Math.floor(Math.random()*200),
                timestamp: weekStr, 
                type: 'rival'
            });
        }
        else if (roll < 0.7) {
            let templateList = RIVAL_POST_TEMPLATES.neutral;
            if (state.rival.relation >= 60) templateList = RIVAL_POST_TEMPLATES.friendly;
            else if (state.rival.relation <= 40) templateList = RIVAL_POST_TEMPLATES.hostile;
            const content = templateList[Math.floor(Math.random() * templateList.length)];
            newPosts.push({
                id: Math.random().toString(36), authorId: 'rival', authorName: state.rival.name + '_MEMBER',
                content: formatText(content, state), 
                likes: state.rival.fans / 10 + Math.floor(Math.random()*100),
                timestamp: weekStr, 
                type: 'rival'
            });
        }
        else {
            const content = FAN_WAR_TEMPLATES[Math.floor(Math.random() * FAN_WAR_TEMPLATES.length)];
            newPosts.push({
                id: Math.random().toString(36), authorId: 'gossip_fan', authorName: '吃瓜群众',
                content: formatText(content, state), 
                likes: Math.floor(Math.random()*50),
                timestamp: weekStr, 
                type: 'fan'
            });
        }
    }
    return newPosts;
 };
