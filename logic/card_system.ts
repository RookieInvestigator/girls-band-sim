
import { Member, GigCard, CardType, Role, ActiveGigState, GigDefinition, Song, TeamStats, CardResult, PlayOutcome } from '../types';

// --- 1. EXPANDED ACTION POOLS ---

const SAFE_ACTIONS: GigCard[] = [
    { id: 'act_safe_harmony', title: '稳健合奏', description: '依靠默契，优先保证不失误。', type: CardType.Melody, baseVoltage: 15, difficulty: 5, hypeGain: 5, scalingStat: 'chemistry', color: 'bg-slate-600' },
    { id: 'act_safe_rhythm', title: '维持节奏', description: '平稳的鼓点，让观众安心。', type: CardType.Rhythm, baseVoltage: 10, difficulty: 0, hypeGain: 5, scalingStat: 'stability', color: 'bg-blue-600' },
    { id: 'act_safe_smile', title: '营业微笑', description: '向台下挥手，维持基本热度。', type: CardType.Spirit, baseVoltage: 10, difficulty: 10, hypeGain: 10, scalingStat: 'appeal', color: 'bg-pink-500' },
    { id: 'act_safe_tuning', title: '快速调音', description: '利用间隙调整状态。', type: CardType.Technique, baseVoltage: 5, difficulty: 0, hypeGain: 2, scalingStat: 'technique', color: 'bg-gray-600' }
];

const CHEMISTRY_ACTIONS: GigCard[] = [
    { id: 'act_chem_eye_contact', title: '眼神交流', description: '确认彼此的呼吸，同步率上升。', type: CardType.Spirit, baseVoltage: 25, difficulty: 15, hypeGain: 15, scalingStat: 'chemistry', color: 'bg-indigo-500' },
    { id: 'act_chem_back_to_back', title: '背靠背演奏', description: '经典的摇滚姿势！信任你的队友。', type: CardType.Spirit, baseVoltage: 40, difficulty: 25, hypeGain: 30, scalingStat: 'chemistry', color: 'bg-violet-600' },
    { id: 'act_chem_unison', title: 'Unison', description: '全员演奏同一旋律，音压震撼全场。', type: CardType.Melody, baseVoltage: 50, difficulty: 40, hypeGain: 20, scalingStat: 'chemistry', color: 'bg-fuchsia-600' }
];

const SHOWMANSHIP_ACTIONS: GigCard[] = [
    { id: 'act_show_points', title: '指人 (Point)', description: '“I see you!” 指向台下的观众。', type: CardType.Spirit, baseVoltage: 20, difficulty: 10, hypeGain: 25, scalingStat: 'appeal', color: 'bg-rose-400' },
    { id: 'act_show_jump', title: '同步跳跃', description: '在副歌高潮时全员起跳！', type: CardType.Spirit, baseVoltage: 35, difficulty: 35, hypeGain: 40, scalingStat: 'appeal', color: 'bg-orange-500' },
    { id: 'act_show_spin', title: '琴身旋转', description: '帅气地将吉他甩到身后转一圈。', type: CardType.Technique, baseVoltage: 25, difficulty: 65, hypeGain: 50, scalingStat: 'technique', color: 'bg-red-600' }
];

const RISKY_ACTIONS: GigCard[] = [
    { id: 'act_risk_improv', title: '疯狂即兴', description: '脱离谱子的狂野演奏！高风险高回报。', type: CardType.Technique, baseVoltage: 70, difficulty: 60, critBonus: 2.5, hypeGain: 30, scalingStat: 'creativity', color: 'bg-purple-700' },
    { id: 'act_risk_dive', title: '舞台跳水', description: '跳进观众席！如果不被接住就完了。', type: CardType.Spirit, baseVoltage: 30, difficulty: 75, hypeGain: 80, scalingStat: 'stagePresence', color: 'bg-red-700' },
    { id: 'act_risk_shout', title: '嘶吼咆哮', description: '撕裂声带的演出，孤注一掷。', type: CardType.Melody, baseVoltage: 80, difficulty: 55, hypeGain: 35, scalingStat: 'technique', color: 'bg-rose-800' },
    { id: 'act_risk_fast', title: 'BPM 200+', description: '全员加速！挑战极限速度！', type: CardType.Rhythm, baseVoltage: 60, difficulty: 50, hypeGain: 40, scalingStat: 'technique', color: 'bg-amber-600' }
];

const MC_ACTIONS: GigCard[] = [
    { id: 'act_mc_thanks', title: '感谢致辞', description: '真诚地感谢到场的粉丝。', type: CardType.Spirit, baseVoltage: 10, difficulty: 5, hypeGain: 15, scalingStat: 'appeal', color: 'bg-teal-500' },
    { id: 'act_mc_call', title: 'Call & Response', description: '“大家开心吗——！？”', type: CardType.Spirit, baseVoltage: 15, difficulty: 25, hypeGain: 45, scalingStat: 'stagePresence', color: 'bg-orange-500' },
    { id: 'act_mc_member', title: '成员介绍', description: '介绍身边的伙伴，展现团魂。', type: CardType.Spirit, baseVoltage: 20, difficulty: 15, hypeGain: 20, scalingStat: 'chemistry', color: 'bg-indigo-500' },
    { id: 'act_mc_story', title: '讲述往事', description: '分享写这首歌时的心路历程。', type: CardType.Spirit, baseVoltage: 25, difficulty: 20, hypeGain: 10, scalingStat: 'mental', color: 'bg-cyan-600' }
];

const TROUBLE_ACTIONS: GigCard[] = [
    { id: 'act_fix_string', title: '紧急换弦', description: '糟糕，弦断了！必须马上处理！', type: CardType.Technique, baseVoltage: 5, difficulty: 40, hypeGain: 5, scalingStat: 'technique', color: 'bg-gray-700' },
    { id: 'act_cover_mistake', title: '即兴救场', description: '用Solo掩盖队友的失误。', type: CardType.Technique, baseVoltage: 30, difficulty: 50, hypeGain: 15, scalingStat: 'musicality', color: 'bg-yellow-600' },
    { id: 'act_joke', title: '讲冷笑话', description: '音响坏了，只能尬聊拖时间。', type: CardType.Spirit, baseVoltage: 0, difficulty: 30, hypeGain: 10, scalingStat: 'mental', color: 'bg-sky-600' }
];

// --- 2. TAG MODIFIERS ---
const TAG_ACTIONS: Record<string, Partial<GigCard>> = {
    '天才': { title: '神来之笔', description: '无法复制的即兴演奏，如同神明附体。', difficulty: 15, critBonus: 2.5, baseVoltage: 60, hypeGain: 20, color: 'bg-violet-500' },
    '社恐': { title: '闭眼独奏', description: '只要看不见观众，就是无敌的。', difficulty: 45, baseVoltage: 85, critBonus: 2.5, hypeGain: 10, color: 'bg-slate-700' },
    '元气': { title: '元气呐喊', description: '用笑容感染全场！让大家跳起来！', hypeGain: 50, baseVoltage: 25, difficulty: 20, color: 'bg-orange-400' },
    '中二病': { title: '深渊解放', description: '解开右手的封印！释放混沌之力！', baseVoltage: 95, difficulty: 65, hypeGain: 25, color: 'bg-purple-900' },
    '完美主义': { title: '精密机械', description: '绝对精准的零失误演奏，令人叹为观止。', difficulty: 35, critBonus: 1.3, baseVoltage: 70, hypeGain: 15, color: 'bg-indigo-700' },
    '大小姐': { title: '优雅谢幕', description: '即使流汗也要保持华丽的舞台身姿。', baseVoltage: 40, hypeGain: 30, color: 'bg-rose-300' },
    '网游废人': { title: 'AP连击', description: '把指板当成键盘，像打音游一样精准。', difficulty: 25, baseVoltage: 45, hypeGain: 15, color: 'bg-cyan-500' },
    '辣妹': { title: 'Wink攻击', description: '对镜头放电，收割少男少女的心。', hypeGain: 60, baseVoltage: 20, color: 'bg-pink-500' },
    '吃货': { title: '能量补给', description: '偷偷吃了一口藏好的糖，恢复状态。', baseVoltage: 30, difficulty: 0, hypeGain: 5, color: 'bg-yellow-400' },
    '玻璃心': { title: '战战兢兢', description: '虽然害怕，但还是坚持站在聚光灯下。', difficulty: 45, baseVoltage: 55, hypeGain: 35, color: 'bg-blue-300' },
    '三无': { title: '绝对零度', description: '毫无表情的高难度演奏，酷到没朋友。', difficulty: 35, baseVoltage: 65, hypeGain: 10, color: 'bg-gray-600' },
    '特摄厨': { title: '骑士变身', description: '摆出了帅气的变身Pose！', hypeGain: 40, baseVoltage: 50, color: 'bg-red-600' },
    '视觉系': { title: '死亡凝视', description: '用极其夸张的妆容和眼神震慑全场。', hypeGain: 30, baseVoltage: 40, color: 'bg-zinc-800' },
    '爵士': { title: '摇摆律动', description: '加入了复杂的切分音，格调瞬间提升。', baseVoltage: 50, difficulty: 30, hypeGain: 10, color: 'bg-emerald-600' }
};

const getRoleAction = (role: Role, member: Member): GigCard => {
    // Helper to construct cards consistently
    const mk = (
        suffix: string, 
        titleSuffix: string, 
        desc: string, 
        type: CardType, 
        baseV: number, 
        diff: number, 
        hype: number, 
        stat: string, 
        color: string
    ): GigCard => ({
        id: `act_${role}_${suffix}_${member.id}`,
        title: `${member.name}: ${titleSuffix}`,
        description: desc,
        type,
        baseVoltage: baseV,
        difficulty: diff,
        hypeGain: hype,
        scalingStat: stat as any,
        memberId: member.id,
        color
    });

    const pool: GigCard[] = [];

    switch (role) {
        case Role.Vocal:
            pool.push(mk('belt', '高音爆发', '主唱的决胜时刻！穿透天花板的声音！', CardType.Melody, 60, 50, 25, 'stagePresence', 'bg-rose-500'));
            pool.push(mk('emotional', '深情演绎', '注入全部情感的演唱，让观众落泪。', CardType.Spirit, 40, 25, 30, 'musicality', 'bg-pink-500'));
            pool.push(mk('mc', '煽动观众', '“把手举起来！” 掌控全场节奏。', CardType.Spirit, 25, 20, 50, 'stagePresence', 'bg-orange-500'));
            pool.push(mk('stable', '稳健演唱', '如同CD音质般的稳定发挥。', CardType.Melody, 30, 10, 15, 'technique', 'bg-rose-400'));
            break;
        
        case Role.Guitar:
            pool.push(mk('solo', '速弹Solo', '吉他手的炫技时间，手指快成残影。', CardType.Technique, 55, 55, 20, 'technique', 'bg-red-500'));
            pool.push(mk('riff', '重型Riff', '极具攻击性的失真音色，轰炸全场。', CardType.Rhythm, 45, 30, 25, 'technique', 'bg-red-600'));
            pool.push(mk('delay', '空间音效', '使用延迟效果器制造迷幻氛围。', CardType.Melody, 35, 25, 30, 'creativity', 'bg-sky-500'));
            pool.push(mk('backing', '强力和弦', '扎实的伴奏，支撑着整首歌的厚度。', CardType.Rhythm, 30, 15, 10, 'stability', 'bg-amber-600'));
            break;

        case Role.Bass:
            pool.push(mk('groove', '稳健律动', '贝斯稳住全场节奏，低音直击心脏。', CardType.Rhythm, 35, 20, 15, 'technique', 'bg-indigo-500'));
            pool.push(mk('slap', 'Slap Solo', '华丽的击勾弦技巧，谁说贝斯听不见！', CardType.Technique, 50, 50, 30, 'technique', 'bg-violet-600'));
            pool.push(mk('root', '坚实根音', '默默支撑着乐队的底座，不可或缺的存在。', CardType.Rhythm, 30, 10, 10, 'stability', 'bg-blue-600'));
            pool.push(mk('drive', '失真贝斯', '如同推土机般的轰鸣声。', CardType.Rhythm, 45, 40, 20, 'stagePresence', 'bg-indigo-700'));
            break;

        case Role.Drums:
            pool.push(mk('beat', '激昂鼓点', '鼓手带动全场气氛，心脏随着底鼓跳动。', CardType.Rhythm, 40, 35, 20, 'mental', 'bg-amber-600'));
            pool.push(mk('fill', '乱舞过门', '令人眼花缭乱的加花，展示技术。', CardType.Technique, 50, 45, 25, 'technique', 'bg-orange-600'));
            pool.push(mk('cymbal', '镲片碎音', '极具爆发力的重音，强调段落感。', CardType.Rhythm, 45, 40, 30, 'stagePresence', 'bg-yellow-500'));
            pool.push(mk('steady', '人体节拍器', '绝对精准的节奏，让队友感到安心。', CardType.Rhythm, 30, 15, 10, 'stability', 'bg-yellow-600'));
            break;

        case Role.Keyboard:
            pool.push(mk('fill', '华丽填充', '键盘手的润色，如星光般点缀旋律。', CardType.Melody, 40, 30, 15, 'musicality', 'bg-purple-500'));
            pool.push(mk('lead', '合成器Lead', '极具穿透力的电子音色，主导旋律。', CardType.Technique, 50, 45, 25, 'technique', 'bg-fuchsia-500'));
            pool.push(mk('pad', '唯美铺底', '用和弦包裹住整个乐队的声音。', CardType.Spirit, 35, 20, 25, 'creativity', 'bg-violet-400'));
            pool.push(mk('piano', '古典钢琴', '优雅的钢琴独奏段落。', CardType.Melody, 45, 35, 20, 'technique', 'bg-purple-600'));
            break;
            
        case Role.Violin:
             pool.push(mk('solo', '悲怆独奏', '凄美的小提琴音色，拉高乐曲格调。', CardType.Melody, 55, 50, 30, 'technique', 'bg-emerald-600'));
             break;
        case Role.Saxophone:
             pool.push(mk('jazz', '爵士Solo', '慵懒而性感的萨克斯独奏。', CardType.Melody, 50, 40, 35, 'musicality', 'bg-yellow-500'));
             break;
        case Role.DJ:
             pool.push(mk('scratch', '搓碟', '让现场燥起来！', CardType.Rhythm, 45, 40, 40, 'technique', 'bg-zinc-600'));
             break;
    }

    if (pool.length > 0) {
        return pool[Math.floor(Math.random() * pool.length)];
    }

    return mk('sub', '特殊表现', '展现意外的才能。', CardType.Special, 30, 20, 15, 'creativity', 'bg-teal-500');
};

const getSongAction = (song: Song): GigCard => {
    const voltage = 45 + (song.quality * 0.9);
    return {
        id: `song_${song.id}`,
        title: `演奏: ${song.title}`,
        description: song.description || '乐队的代表作，倾注了所有人的心血。',
        type: CardType.Special,
        baseVoltage: Math.floor(voltage),
        difficulty: 35,
        hypeGain: 35,
        scalingStat: 'chemistry',
        color: song.isViral ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-slate-800',
        isSongCard: true
    };
};

// --- PHASE LOGIC ---
const PHASES = [
    { name: 'Opening Act', label: 'Opening Act', desc: '灯光亮起，第一印象决定成败！迅速点燃气氛！' },
    { name: 'Groove', label: 'In The Groove', desc: '观众开始摇摆。保持节奏，稳步积累热度。' },
    { name: 'MC', label: 'MC Break', desc: '暂时的喘息。用语言连接观众，展现乐队的个性。' },
    { name: 'Solos', label: 'Solo Section', desc: '聚光灯聚焦！展现个人技术的最佳时刻。' },
    { name: 'Trouble', label: 'Technical Issues', desc: '突发状况！音箱啸叫、琴弦断裂... 考验应变能力！' },
    { name: 'Climax', label: 'Climax', desc: '全场沸腾！最高潮的时刻，毫无保留地释放一切！' },
    { name: 'Finale', label: 'Grand Finale', desc: '最后的燃烧。用最强的音符为演出画上句号！' }
];

const determinePhase = (currentRound: number, maxRounds: number): typeof PHASES[0] => {
    if (currentRound === 1) return PHASES[0]; // Opening
    if (currentRound === maxRounds) return PHASES[6]; // Finale
    if (currentRound === maxRounds - 1) return PHASES[5]; // Climax

    // Random phases for middle rounds
    const rand = Math.random();
    if (rand < 0.15) return PHASES[4]; // Trouble (15%)
    if (rand < 0.35) return PHASES[2]; // MC (20%)
    if (rand < 0.60) return PHASES[3]; // Solos (25%)
    return PHASES[1]; // Groove (40%)
};

export const generateRoundOptions = (members: Member[], songs: Song[], currentRound: number, maxRounds: number): { options: GigCard[], phaseName: string } => {
    const phase = determinePhase(currentRound, maxRounds);
    const options: GigCard[] = [];

    const addSafe = () => options.push({ ...SAFE_ACTIONS[Math.floor(Math.random() * SAFE_ACTIONS.length)], instanceId: Math.random().toString(36) });
    const addRole = () => {
        if (members.length > 0) {
            const m = members[Math.floor(Math.random() * members.length)];
            options.push({ ...getRoleAction(m.roles[0], m), instanceId: Math.random().toString(36) });
        } else {
            addSafe();
        }
    };
    const addTag = () => {
        if (members.length > 0) {
            const m = members[Math.floor(Math.random() * members.length)];
            const validTags = m.tags.filter(t => TAG_ACTIONS[t]);
            if (validTags.length > 0) {
                const tag = validTags[Math.floor(Math.random() * validTags.length)];
                const template = TAG_ACTIONS[tag];
                options.push({
                    ...template,
                    id: `tag_${m.id}_${tag}`,
                    memberId: m.id,
                    scalingStat: 'mental',
                    baseVoltage: template.baseVoltage || 20,
                    difficulty: template.difficulty || 20,
                    title: `${m.name}: ${template.title}`,
                    type: CardType.Special,
                    description: template.description || '',
                    color: template.color || 'bg-slate-500',
                    instanceId: Math.random().toString(36)
                } as GigCard);
                return;
            }
        }
        addRole();
    };
    const addSong = () => {
        if (songs.length > 0) {
            const song = songs[Math.floor(Math.random() * songs.length)];
            options.push({ ...getSongAction(song), instanceId: Math.random().toString(36) });
        } else {
            addRole();
        }
    };
    const addRisky = () => options.push({ ...RISKY_ACTIONS[Math.floor(Math.random() * RISKY_ACTIONS.length)], instanceId: Math.random().toString(36) });
    const addMC = () => options.push({ ...MC_ACTIONS[Math.floor(Math.random() * MC_ACTIONS.length)], instanceId: Math.random().toString(36) });
    const addTrouble = () => options.push({ ...TROUBLE_ACTIONS[Math.floor(Math.random() * TROUBLE_ACTIONS.length)], instanceId: Math.random().toString(36) });
    const addChemistry = () => options.push({ ...CHEMISTRY_ACTIONS[Math.floor(Math.random() * CHEMISTRY_ACTIONS.length)], instanceId: Math.random().toString(36) });
    const addShowmanship = () => options.push({ ...SHOWMANSHIP_ACTIONS[Math.floor(Math.random() * SHOWMANSHIP_ACTIONS.length)], instanceId: Math.random().toString(36) });

    // --- PHASE GENERATION LOGIC (5 SLOTS) ---
    // Slot 1: Always a Safe Option (Anchor)
    addSafe();

    switch (phase.name) {
        case 'Opening Act':
            addShowmanship();
            addRole();
            options.push({ ...MC_ACTIONS[1], instanceId: Math.random().toString(36) }); // Call & Response
            addRisky(); // Start with a bang
            break;
        case 'Groove':
            addChemistry();
            addRole();
            addTag();
            addSong();
            break;
        case 'MC':
            addMC();
            addMC();
            addTag(); // Personality shines in MC
            addShowmanship(); 
            break;
        case 'Solos':
            addRole();
            addRole();
            addRole();
            addRisky();
            break;
        case 'Trouble':
            addTrouble();
            addTrouble();
            addSafe(); // Play it safe
            addRisky(); // Gamble to fix it
            break;
        case 'Climax':
            addSong();
            addSong();
            addShowmanship();
            addRisky();
            break;
        case 'Finale':
            addSong(); // Best song
            addChemistry();
            addTag();
            addRisky();
            break;
        default:
            addRole(); addRole(); addTag(); addSong();
    }

    // Ensure we fill up to 5 if logic missed (fallback)
    while (options.length < 5) {
        addSafe();
    }
    
    // Trim to 5 just in case
    const finalOptions = options.slice(0, 5);

    // Format Phase Name for UI (Title | Desc)
    const displayPhase = `${phase.label}|${phase.desc}`;

    return { options: finalOptions, phaseName: displayPhase };
};

export const resolveOption = (
    option: GigCard, 
    members: Member[], 
    teamStats: TeamStats,
    currentHype: number
): CardResult => {
    
    let performerStatValue = 0;
    let performerMental = 50;
    let performerPresence = 50; 
    let member: Member | undefined = undefined;

    if (option.memberId) {
        member = members.find(mem => mem.id === option.memberId);
        if (member) {
            performerStatValue = option.scalingStat && option.scalingStat !== 'chemistry' ? (member[option.scalingStat as keyof Member] as number) : 50;
            performerMental = member.mental;
            performerPresence = member.stagePresence;
        }
    } else {
        if (option.scalingStat === 'chemistry') performerStatValue = (teamStats.chemistry || 0); 
        else if (option.scalingStat === 'stability') performerStatValue = teamStats.stability;
        else if (option.scalingStat === 'appeal') performerStatValue = teamStats.appeal;
        else performerStatValue = 50;
        
        performerMental = teamStats.stability;
        performerPresence = teamStats.appeal;
    }

    // --- HIT & CRIT ROLL ---
    // Hit Chance: Base 95 - Difficulty + Stat Bonus
    let hitChance = 95 - (option.difficulty || 0);
    hitChance += (performerStatValue * 0.4); 
    hitChance = Math.min(100, Math.max(10, hitChance));

    // Crit Chance
    let critChance = 5 + (performerPresence * 0.2);

    const roll = Math.random() * 100;
    let outcome: PlayOutcome = 'Hit';
    
    if (roll > hitChance) {
        outcome = 'Miss';
    } else if (roll <= critChance) {
        outcome = 'Critical';
    }

    // --- SCORE CALCULATION START ---
    let finalVoltage = option.baseVoltage;
    let hypeDelta = option.hypeGain || 0; 
    let logText = '';
    const activeBonuses: string[] = [];

    if (outcome !== 'Miss') {
        // 1. DIRECT STAT ADDITION (The change requested)
        // Add 50% of the stat value directly to voltage. 
        // e.g. 100 Technique => +50 Voltage. 50 Technique => +25 Voltage.
        const statAdditive = Math.floor(performerStatValue * 0.5);
        if (statAdditive > 0) {
            finalVoltage += statAdditive;
            const statName = option.scalingStat === 'chemistry' ? '默契' : (option.scalingStat as string).substring(0,3).toUpperCase();
            activeBonuses.push(`+${statAdditive} (${statName})`);
        }

        // 2. ROLE MATCH BONUS
        // If a drummer plays a rhythm card, or vocal plays melody/spirit, etc.
        let isRoleMatch = false;
        if (member) {
            const role = member.roles[0];
            if (role === Role.Drums && option.type === CardType.Rhythm) isRoleMatch = true;
            if (role === Role.Bass && option.type === CardType.Rhythm) isRoleMatch = true;
            if (role === Role.Guitar && option.type === CardType.Technique) isRoleMatch = true;
            if (role === Role.Vocal && (option.type === CardType.Melody || option.type === CardType.Spirit)) isRoleMatch = true;
            if (role === Role.Keyboard && (option.type === CardType.Melody || option.type === CardType.Technique)) isRoleMatch = true;
        }
        
        if (isRoleMatch) {
            const roleBonus = 15;
            finalVoltage += roleBonus;
            activeBonuses.push(`ROLE MATCH`);
        }

        // 3. TAG SYNERGIES
        if (member) {
            if (member.tags.includes('天才') && outcome === 'Critical') {
                finalVoltage = Math.floor(finalVoltage * 1.5);
                activeBonuses.push('GENIUS CRIT');
            }
            if (member.tags.includes('元气')) {
                hypeDelta += 8;
                activeBonuses.push('ENERGY BOOST');
            }
            if (member.tags.includes('社恐') && option.type === CardType.Technique) {
                finalVoltage += 25; // Flat bonus for focus
                activeBonuses.push('FOCUS ZONE');
            }
            if ((member.tags.includes('视觉系') || member.tags.includes('偶像')) && option.type === CardType.Spirit) {
                finalVoltage = Math.floor(finalVoltage * 1.2);
                activeBonuses.push('VISUAL SHOCK');
            }
            if (member.tags.includes('完美主义')) {
                finalVoltage = Math.floor(finalVoltage * 1.15);
                activeBonuses.push('PERFECT PITCH');
            }
        }

        // 4. TEAM SYNERGY
        if (option.scalingStat === 'chemistry' && teamStats.chemistry >= 60) {
            hypeDelta += 5;
            finalVoltage = Math.floor(finalVoltage * 1.1);
            activeBonuses.push('TEAM SYNC');
        }
    } else {
        // Miss Logic
        if (member && member.tags.includes('完美主义')) {
            hypeDelta -= 15; // Extra penalty
            logText += " (完美主义者感到受挫)";
        }
    }

    // --- FINALIZE OUTCOME ---
    if (outcome === 'Miss') {
        finalVoltage = Math.floor(finalVoltage * 0.3);
        hypeDelta = -15; // Penalty
        logText = `失误！稍微有些走神... (Chance: ${Math.floor(hitChance)}%)`;
    } else if (outcome === 'Critical') {
        const multiplier = option.critBonus || 1.5;
        finalVoltage = Math.floor(finalVoltage * multiplier);
        hypeDelta = Math.floor(hypeDelta * 1.5) + 20; // Critical Hype Boost
        logText = `完美发挥！引爆全场！ (Crit: ${Math.floor(critChance)}%)`;
    } else {
        hypeDelta += 5; // Base hit bonus
        logText = `演出顺利。`;
    }

    // Apply Hype Multiplier to Voltage
    finalVoltage = Math.floor(finalVoltage * (currentHype / 100));

    return {
        outcome,
        voltage: finalVoltage,
        hypeDelta,
        logText,
        bonuses: activeBonuses
    };
};

export const initializeGigState = (def: GigDefinition, members: Member[], songs: Song[]): ActiveGigState => {
    const { options, phaseName } = generateRoundOptions(members, songs, 1, def.rounds);

    return {
        definition: def,
        currentRound: 1,
        maxRounds: def.rounds,
        currentVoltage: 0,
        targetVoltage: def.targetVoltage,
        currentHype: 100, 
        currentOptions: options,
        phaseName: phaseName,
        logs: [{ text: "演出开始！", type: 'turn' }],
        isFinished: false
    };
};
