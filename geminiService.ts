
import { GoogleGenAI, Type } from "@google/genai";
import { GameState, Role, Song, MusicGenre, LyricTheme, RivalState, Member } from "./types";
import { ActionLog } from "./logic/schedule_system";

declare var process: { env: { API_KEY: string } };

// Initialize lazily to prevent app crash on load if key is missing/invalid
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  // If key is missing, this might still throw later, but allows app to render first
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

// Priority list of models to try. 
const MODELS_TO_TRY = [
  "gemini-2.5-flash",
  "gemini-3-flash-preview",
  "gemini-flash-latest"
];

/**
 * Robust generation function that tries multiple models and retries on failure.
 */
async function generateWithFallback(
  prompt: string, 
  responseSchema: any
): Promise<any> {
  const ai = getAiClient();
  let lastError: any;

  for (const model of MODELS_TO_TRY) {
    // Try each model up to 2 times
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
          }
        });
        
        const text = response.text;
        if (!text) throw new Error("Empty response text from AI");
        return JSON.parse(text);

      } catch (error: any) {
        lastError = error;
        
        // Check for Rate Limit (429) or Service Unavailable (503)
        const status = error.status || error.code || error.response?.status;
        const msg = error.message || JSON.stringify(error);
        const isQuotaIssue = status === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED');
        const isServerIssue = status === 503 || status === 500;

        if (isQuotaIssue || isServerIssue) {
           const delay = attempt * 1500; // Backoff
           console.warn(`[Gemini] Model ${model} failed (Attempt ${attempt}): ${msg}. Retrying in ${delay}ms...`);
           await new Promise(r => setTimeout(r, delay));
        } else {
           // For 400s or parse errors, break inner loop to try next model immediately
           console.warn(`[Gemini] Model ${model} failed with non-retriable error: ${msg}. Switching model...`);
           break; 
        }
      }
    }
  }
  
  console.error("All AI models and retries exhausted.");
  throw lastError;
}

// Helper to determine probable genre based on stats/roles
const determineGenre = (state: GameState): string => {
  const tags = state.members.flatMap(m => m.tags);
  if (tags.includes('重金属') || tags.includes('哥特')) return 'Metal/Gothic Rock';
  if (tags.includes('ACG') || tags.includes('萝莉音')) return 'Anime Pop/Denpa';
  if (tags.includes('爵士') || tags.includes('萨克斯')) return 'Jazz Fusion';
  if (tags.includes('前卫') || tags.includes('DJ')) return 'Electronic/Synthwave';
  if (tags.includes('元气') || tags.includes('运动型')) return 'Pop Punk/J-Rock';
  if (tags.includes('民谣') || tags.includes('治愈')) return 'Folk/Ballad';
  return 'J-Rock/Pop';
};

export const generateSongIdea = async (state: GameState, composer: Member, lyricist: Member): Promise<Partial<Song>> => {
  const genreContext = determineGenre(state);
  
  const prompt = `
    为一支名为 "${state.bandName}" 的少女乐队构思一首新歌。
    
    【乐队档案】
    流派倾向: ${genreContext}
    当前粉丝数: ${state.fans}
    成员构成: ${state.members.map(m => `${m.name}(${m.roles.join('/')}) [偏好:${m.favoriteGenres?.join(',')}]`).join('\n')}
    
    【创作核心】
    本次负责作曲: ${composer.name} (作曲能力: ${composer.composing}) - 个性标签: ${composer.tags.join(',')} - 请务必根据她的性格和能力构思曲风。
    本次负责作词: ${lyricist.name} (作词能力: ${lyricist.lyrics}) - 个性标签: ${lyricist.tags.join(',')} - 偏好主题: ${lyricist.favoriteLyricThemes?.join(',') || '未知'}。

    请生成 JSON 格式：
    1. 歌曲标题 (title): 必须符合二次元少女乐队风格（如《残響散歌》《Don't say "lazy"》这种感觉）。
    2. 歌曲描述 (description): 30字以内，描述歌曲的听感、主题以及是谁主导了创作。
    3. 流派 (genre): 从以下选择: J-Pop, J-Rock, Punk, Pop Punk, Metal, Electronic, Jazz, Ballad, Idol, Math Rock, Shoegaze, Funk, Folk, Emo, Visual Kei, Symphonic Metal.
    4. 歌词主题 (lyricTheme): 从以下选择: 诗化, 荒诞, 青春, 讽刺, 古风, 暗黑, 哲理, 叛逆, 幻想.
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      genre: { type: Type.STRING, enum: Object.values(MusicGenre) },
      lyricTheme: { type: Type.STRING, enum: Object.values(LyricTheme) }
    },
    required: ["title", "description", "genre", "lyricTheme"]
  };

  try {
    return await generateWithFallback(prompt, schema);
  } catch (error) {
    console.error("Song generation failed after all retries:", error);
    return {
        title: "无名的练习曲",
        description: "一首尚未完成的草稿。",
        genre: MusicGenre.JPop,
        lyricTheme: LyricTheme.Youth
    };
  }
};

export const generateAiSnsPosts = async (state: GameState, weeklyLogs: ActionLog[]) => {
  const viralHit = weeklyLogs.find(l => l.date === 'VIRAL HIT');
  
  const rivalContext = state.rival.isUnlocked ? {
      name: state.rival.name,
      relation: state.rival.relation,
      relationDesc: state.rival.relation > 60 ? "亲密的朋友/良性竞争对手" : (state.rival.relation < 40 ? "高傲的强者，无视主角" : "亦敌亦友")
  } : null;

  const detailedSchedule = weeklyLogs
      .filter(l => l.date !== 'VIRAL HIT' && l.date !== 'Weekly Bonus' && l.date !== 'Special')
      .map(l => {
          return `${l.date}: ${l.action} (${l.result}) - ${l.details.join(', ')} ${l.flavorText ? `"${l.flavorText}"` : ''}`;
      });

  const bandContext = {
    bandName: state.bandName,
    week: state.currentWeek,
    fans: state.fans,
    detailedSchedule: detailedSchedule,
    isViral: !!viralHit,
    viralEvent: viralHit ? viralHit.details[0] : null,
    rival: rivalContext,
    latestSong: state.songs.length > 0 ? state.songs[state.songs.length - 1] : null,
    members: state.members.map(m => ({
      name: m.name,
      screenName: m.screenName || m.name,
      snsStyle: m.snsStyle || "普通",
      personality: m.personality,
      tags: m.tags,
      status: `压力:${m.stress}`
    }))
  };

  const prompt = `
    你是一个少女乐队模拟器的后台内容生成器（SNS推特/Ins风格）。请根据本周发生的具体事件生成内容。
    
    【乐队本周档案】
    ${JSON.stringify(bandContext, null, 2)}

    【生成核心要求】
    1. **生成数量**：请生成 **8-12 条** 帖子。
    2. **内容严格配比**：
       - **50% 乐队内容**：包含排练时的声音细节、创作时的乐理讨论、Live时的舞台灯光感受等等具体内容。**不要只说“排练很累”，要说“指尖磨出了茧”或“BPM 180的节奏跟不上了”。**
       - **30% 日常**：便利店的限定饮料、路边的猫、突然下的大雨、坏掉的耳机。
       - **20% 成员互动/互损**：偷拍队友睡颜、吐槽队友的穿搭、深夜的泡面。
    3. **特殊事件优先**：如果 'isViral' 为 true，全员都要处于兴奋/震惊状态！
    4. **随机性与反差萌 (Gap Moe)** - **非常重要**：
       - **禁止绝对的刻板印象**。人是立体的。
       - **强制插入 20% 的 OOC (Out of Character) 时刻**：
         - 高冷/三无的角色偶尔会发可爱的颜文字，或者因为吃到好吃的布丁而激动。
         - 完美主义者偶尔会发推抱怨“不想动了”、“好想变成水母”。
         - 元气角色偶尔会在深夜发一条没有配图的“...”。
    5. **文风模拟真实感**：
       - 有些人全是小写字母。
       - 有些人只发Emoji。
       - 有些人会打错字然后重发。
       - 不要全是完美的书面语，多用口语、网络流行语。
    6. **粉丝与外界**：
       - 包含 2-3 条粉丝评论（不仅是夸奖，也可以是“贝斯手今天是不是走神了？”这种真实的反馈或者是负面反馈）。
       - 包含 1 条劲敌乐队的动态（如果有）。

    请返回 JSON 格式，posts 数组包含 authorName, content, type (member/fan/rival), likes。
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      posts: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            authorName: { type: Type.STRING },
            content: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['member', 'fan', 'rival'] },
            likes: { type: Type.NUMBER }
          },
          required: ["authorName", "content", "type", "likes"]
        }
      }
    },
    required: ["posts"]
  };

  try {
    const result = await generateWithFallback(prompt, schema);
    return result.posts.map((p: any) => ({
      ...p,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: `Week ${state.currentWeek}`
    }));
  } catch (error) {
    console.error("AI SNS Generation failed after all retries:", error);
    return []; 
  }
};

export const generateAiRivalBand = async (playerBandState: GameState): Promise<Partial<RivalState> | null> => {
  const playerStyle = determineGenre(playerBandState);
  const playerMembers = playerBandState.members.map(m => `${m.name}(${m.roles.join('/')}-${m.personality})`).join(', ');

  const prompt = `
    你是一个少女乐队动漫的编剧。请根据主角乐队的配置，设计一个**劲敌乐队 (Rival Band)**。
    
    【主角乐队档案】
    乐队名: ${playerBandState.bandName}
    当前风格: ${playerStyle}
    成员构成: ${playerMembers}

    【设计要求】
    1. **乐队名**：必须是**原创的日系乐队名**，名字要听起来很酷、有压迫感，禁止用括号来注释或者标注英文。
    2. **风格 (style)**：从以下选择: Pop Punk, Math Rock, Shoegaze, Metal, Jazz, Idol, Visual Kei, Emo, Symphonic Metal.
    3. **描述 (description)**：25-40字，简述这支乐队的特色、在业界的地位。
    4. **初始粉丝数 (fans)**：4000 - 10000。
    5. **初始关系 (relation)**：10-30。

    请返回 JSON 格式。
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      style: { type: Type.STRING },
      description: { type: Type.STRING },
      fans: { type: Type.INTEGER },
      relation: { type: Type.INTEGER }
    },
    required: ["name", "style", "description", "fans", "relation"]
  };

  try {
    return await generateWithFallback(prompt, schema);
  } catch (error) {
    console.error("Rival generation failed after all retries:", error);
    return null;
  }
};
