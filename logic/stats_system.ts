
import { Member, BandStats, Song, Role } from '../types';
import { TAG_BAND_MODIFIERS } from './tags_system';

// --- MATH HELPERS FOR COMPLEX CALCS ---

// Harmonic Mean: Good for "Weakest Link" stats (e.g. Precision). One bad value drags it down hard.
const getHarmonicMean = (values: number[]) => {
    if (values.length === 0) return 0;
    const validValues = values.map(v => Math.max(1, v)); // Avoid division by zero
    const reciprocalSum = validValues.reduce((acc, v) => acc + (1 / v), 0);
    return values.length / reciprocalSum;
};

// SoftMax-ish: Good for "Star Power" (e.g. Aura). The best member defines the ceiling, others contribute marginally.
const getSoftMaxBase = (values: number[]) => {
    if (values.length === 0) return 0;
    const maxVal = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    // Formula: Max + (Average of the rest) * 0.3
    if (values.length === 1) return maxVal;
    const avgOthers = (sum - maxVal) / (values.length - 1);
    return maxVal + (avgOthers * 0.35);
};

// Helper to identify Special Roles (Non-standard rock instruments)
const SPECIAL_ROLES = [
    Role.Violin, Role.Saxophone, Role.DJ, Role.Accordion, 
    Role.Harp, Role.Shamisen, Role.Rapper
];

const INSTRUMENT_ROLES = [
    Role.Guitar, Role.Bass, Role.Drums, Role.Keyboard, 
    ...SPECIAL_ROLES
];

// --- EXPORTED CALCULATION FUNCTION ---
export const calculateBandStats = (members: Member[], songs: Song[], rawChemistry: number, fans: number, unlockedSkills: string[] = []): BandStats => {
      if (members.length === 0) {
          return {
              performance: 0, precision: 0, tone: 0, rhythm: 0, dynamics: 0,
              stage: 0, aura: 0, interaction: 0, visual: 0, adaptation: 0,
              bond: 0, synergy: 0, connection: 0, topic: 0,
              work: 0, narrative: 0, melody: 0, detail: 0,
              totalRating: 'F',
              technique: 0, appeal: 0, stability: 0, chemistry: 0
          };
      }

      // --- HELPERS ---
      const getStats = (prop: keyof Member) => members.map(m => m[prop] as number);
      const getAvg = (prop: keyof Member) => members.reduce((sum, m) => sum + (m[prop] as number), 0) / members.length;
      const getMax = (prop: keyof Member) => Math.max(...members.map(m => m[prop] as number));
      const hasRole = (r: Role) => members.some(m => m.roles.includes(r));
      const getMembersByRole = (r: Role) => members.filter(m => m.roles.includes(r));

      // Groupings
      const guitars = getMembersByRole(Role.Guitar);
      const drums = getMembersByRole(Role.Drums);
      const basses = getMembersByRole(Role.Bass);
      const keyboards = getMembersByRole(Role.Keyboard);
      const djs = getMembersByRole(Role.DJ);
      const producers = getMembersByRole(Role.Producer);
      const vocal = members.find(m => m.roles.includes(Role.Vocal));
      
      const specialMembers = members.filter(m => m.roles.some(r => SPECIAL_ROLES.includes(r)));
      const instrumentalists = members.filter(m => m.roles.some(r => INSTRUMENT_ROLES.includes(r)));

      // --- 1. REALIZATION RATE (磨合度系数) ---
      const cappedChemistry = Math.min(100, rawChemistry);
      // REBALANCED: Slower start, higher dependency on Chemistry and Songs
      let realizationRate = 0.2 + (cappedChemistry / 120) * 0.6; 
      
      // Experience Bonus (Song Count)
      const expBonus = Math.min(0.2, songs.length * 0.02); 
      realizationRate += expBonus;
      realizationRate = Math.min(1.0, realizationRate); 

      // --- 2. STAT CALCULATION WITH COMPLEX FORMULAS ---

      // === Performance (演奏) ===
      
      // Precision: 
      // Old: Harmonic Mean(40%) + Guitar(30%) + Mental(30%)
      // New: Harmonic Mean(30%) + Guitar(40%) + Instrument Mental(30%)
      // Rationale: Guitar technique is crucial for tightness. Mental of instrumentalists matters most for precision.
      const techHarmonic = getHarmonicMean(getStats('technique'));
      const avgGuitarTech = guitars.length > 0 ? guitars.reduce((s, m) => s + m.technique, 0) / guitars.length : getAvg('technique') * 0.8;
      const avgInstMental = instrumentalists.length > 0 ? instrumentalists.reduce((s, m) => s + m.mental, 0) / instrumentalists.length : getAvg('mental');
      
      let precisionBase = (techHarmonic * 0.3) + (avgGuitarTech * 0.4) + (avgInstMental * 0.3);
      let precision = precisionBase * realizationRate;

      // Tone: 
      // Logic: Vocal(40%) + Avg(20%) + Special Roles(40%).
      // Special Role: Weighted by Musicality (60%) and Creativity (40%) -> Imagination affects Tone!
      let toneBase = 0;
      let weightUsed = 0;

      if (vocal) { toneBase += vocal.musicality * 0.4; weightUsed += 0.4; }
      else { toneBase += getAvg('musicality') * 0.4; weightUsed += 0.4; }

      toneBase += getAvg('musicality') * 0.2; weightUsed += 0.2;

      if (specialMembers.length > 0) {
          const specMus = specialMembers.reduce((s, m) => s + m.musicality, 0) / specialMembers.length;
          const specCre = specialMembers.reduce((s, m) => s + m.creativity, 0) / specialMembers.length;
          // Creativity affects Tone for special instruments (Expression/Style)
          const specScore = (specMus * 0.6) + (specCre * 0.4); 
          toneBase += specScore * 0.4;
          weightUsed += 0.4;
      } else {
          // Redistribute remaining weight if no special roles
          const remaining = 1.0 - weightUsed;
          toneBase += getAvg('musicality') * remaining;
      }
      let tone = toneBase * realizationRate;

      // Rhythm: 
      // Geometric Mean of Drum & Bass.
      // Weighted: Tech(60%) + Musicality(40%). Groove comes from sense.
      let drumScore = drums.length > 0 ? (drums[0].technique * 0.6 + drums[0].musicality * 0.4) : getAvg('technique') * 0.5;
      let bassScore = basses.length > 0 ? (basses[0].technique * 0.6 + basses[0].musicality * 0.4) : getAvg('technique') * 0.5;
      
      let rhythmBase = Math.sqrt(drumScore * bassScore);
      let rhythm = rhythmBase * realizationRate;

      // Dynamics: 
      // Geometric Mean of Avg Tech and Avg Presence.
      // Need technique to control volume, presence to sell the impact.
      let dynamicsBase = Math.sqrt(getAvg('technique') * getAvg('stagePresence'));
      if (members.length < 3) dynamicsBase *= 0.8; 
      let dynamics = dynamicsBase * realizationRate;

      // === Stage (现场) ===
      
      // Aura: SoftMax of Presence. Center/Vocal defines ceiling.
      let auraBase = getSoftMaxBase(getStats('stagePresence'));
      if (!hasRole(Role.Vocal)) auraBase *= 0.7; 
      let aura = auraBase * realizationRate;
      
      // Interaction: 
      // Avg Mental (50%) + Avg Presence (50%).
      const avgStress = getAvg('stress');
      let interactionBase = (getAvg('mental') * 0.5) + (getAvg('stagePresence') * 0.5);
      if (avgStress > 50) interactionBase *= (1 - (avgStress - 50)/150); // Stress penalty
      let interaction = interactionBase * realizationRate;
      
      // Visual: 
      // Max Design(50%) + Avg Design(30%) + Avg Creativity(20%).
      // Imagination helps visualize the concept.
      let visualBase = (getMax('design') * 0.5) + (getAvg('design') * 0.3) + (getAvg('creativity') * 0.2);
      let visual = visualBase * (0.6 + realizationRate * 0.4); 
      
      // Adaptation: 
      // Avg Cre(30%) + Avg Tech(20%) + Guitar Mus(25%) + DJ Bonus(25%).
      // DJ contributes significantly to live remixing/adaptation.
      let avgGuitarMus = guitars.length > 0 ? guitars.reduce((s, m) => s + m.musicality, 0) / guitars.length : getAvg('musicality');
      
      let adaptationScore = (getAvg('creativity') * 0.3) + (getAvg('technique') * 0.2) + (avgGuitarMus * 0.25);
      
      if (djs.length > 0) {
          const djScore = djs.reduce((s, m) => s + (m.creativity + m.technique)/2, 0) / djs.length;
          adaptationScore += djScore * 0.25;
      } else {
          // Redistribute if no DJ
          adaptationScore += avgGuitarMus * 0.1; // Guitar takes more load
          adaptationScore += getAvg('creativity') * 0.15;
      }
      let adaptation = adaptationScore * realizationRate;

      // === Bond (羁绊) ===
      let synergy = cappedChemistry; 
      
      const avgAffection = getAvg('affection');
      const connectionMental = getAvg('mental');
      
      let connectionBase = (avgAffection * 0.7) + (connectionMental * 0.3);
      let stressPenalty = Math.max(0.4, 1.0 - (avgStress / 200));
      
      const viralCount = songs.filter(s => s.isViral).length;
      const fanScore = Math.max(0, Math.log10(Math.max(10, fans)) - 1) * 15; 
      let topic = (fanScore * 0.6) + (getAvg('design') * 0.2) + (viralCount * 10);

      // === Work (作品) ===
      const hasSongs = songs.length > 0;
      const maxSongQuality = hasSongs ? Math.max(...songs.map(s => s.quality)) : 0;
      const avgSongQuality = hasSongs ? songs.reduce((a, b) => a + b.quality, 0) / songs.length : 0;
      
      const potentialWeight = hasSongs ? 0.3 : 0.2;
      const achievementWeight = hasSongs ? 0.7 : 0.0;

      // PRODUCER BONUS
      // If a Producer exists, they boost potential directly.
      const prodMaxComposing = producers.length > 0 ? Math.max(...producers.map(p => p.composing)) : 0;
      const prodMaxArrangement = producers.length > 0 ? Math.max(...producers.map(p => p.arrangement)) : 0;
      const prodMaxLyrics = producers.length > 0 ? Math.max(...producers.map(p => p.lyrics)) : 0;

      // 1. Narrative: Lyrics * Creativity
      let lyricPower = Math.sqrt(getMax('lyrics') * getAvg('creativity'));
      if (producers.length > 0) lyricPower += prodMaxLyrics * 0.15; // Producer helps refine lyrics
      let narrative = (lyricPower * potentialWeight) + (avgSongQuality * achievementWeight);
      
      // 2. Melody: Composing * Musicality + Key/DJ Bonus
      let melodyBase = getMax('composing');
      let melodyMus = getAvg('musicality');
      
      // Keyboard/DJ Bonus for Melody
      const keysAndDJs = [...keyboards, ...djs];
      if (keysAndDJs.length > 0) {
          const keyDJMus = Math.max(...keysAndDJs.map(m => m.musicality));
          melodyMus = (melodyMus * 0.7) + (keyDJMus * 0.3); // They influence the melodic sense
      }
      
      let compPower = Math.sqrt(melodyBase * melodyMus);
      if (producers.length > 0) compPower += prodMaxComposing * 0.15; // Producer helps composition
      
      let melody = (compPower * potentialWeight) + (maxSongQuality * achievementWeight);
      
      // 3. Detail: Arrangement * Tech
      let arrangePower = Math.sqrt(getMax('arrangement') * getHarmonicMean(getStats('technique')));
      if (producers.length > 0) arrangePower += prodMaxArrangement * 0.2; // Producer heavily impacts arrangement detail
      let detail = (arrangePower * potentialWeight) + (avgSongQuality * achievementWeight);

      // --- SKILL MODIFIERS (Applied before clamp) ---
      if (unlockedSkills.includes('pass_3')) { // Aura Up
          aura *= 1.1;
      }
      
      if (unlockedSkills.includes('tech_6')) { // Quality/Detail Up
          detail *= 1.1;
          melody *= 1.05;
          narrative *= 1.05;
      }

      if (unlockedSkills.includes('friend_8')) { // Bond Boost 1
          synergy *= 1.1;
          connectionBase *= 1.1; // Apply to base
      }

      if (unlockedSkills.includes('comm_10')) { // Topic Boost Max (New)
          topic *= 1.4; // Huge boost to topic
          visual *= 1.1; // Slight boost to visual (Branding)
      }

      // Re-calculate connection before friend_10 check to use base
      let connection = connectionBase * stressPenalty;

      if (unlockedSkills.includes('friend_10')) { // Bond Boost 2 + No Stress Penalty
          synergy *= 1.2;
          // Ignore stress penalty or reduce its impact significantly
          connection = connectionBase * 1.3; 
      } else {
          // Re-apply if not friend_10 (already done above, but for clarity)
          connection = connectionBase * stressPenalty;
          if (unlockedSkills.includes('friend_8')) connection *= 1.05; // Slight extra boost on final
      }

      // --- 3. TAG MODIFIERS (Buffs/Nerfs) ---
      const allTags = members.flatMap(m => m.tags);
      allTags.forEach(tag => {
          const mod = TAG_BAND_MODIFIERS[tag];
          if (mod) {
              if (mod.precision) precision *= mod.precision;
              if (mod.tone) tone *= mod.tone;
              if (mod.rhythm) rhythm *= mod.rhythm;
              if (mod.dynamics) dynamics *= mod.dynamics;
              if (mod.aura) aura *= mod.aura;
              if (mod.interaction) interaction *= mod.interaction;
              if (mod.visual) visual *= mod.visual;
              if (mod.adaptation) adaptation *= mod.adaptation;
              if (mod.synergy) synergy *= mod.synergy;
              if (mod.connection) connection *= mod.connection;
              if (mod.topic) topic *= mod.topic;
              if (mod.narrative) narrative *= mod.narrative;
              if (mod.melody) melody *= mod.melody;
              if (mod.detail) detail *= mod.detail;
          }
      });

      // Clamp all to 120
      const clamp = (v: number) => Math.floor(Math.min(120, Math.max(0, v)));
      
      const subStats = {
          precision: clamp(precision), tone: clamp(tone), rhythm: clamp(rhythm), dynamics: clamp(dynamics),
          aura: clamp(aura), interaction: clamp(interaction), visual: clamp(visual), adaptation: clamp(adaptation),
          synergy: clamp(synergy), connection: clamp(connection), topic: clamp(topic),
          narrative: clamp(narrative), melody: clamp(melody), detail: clamp(detail)
      };

      // Calculate Aggregates
      const performance = (subStats.precision + subStats.tone + subStats.rhythm + subStats.dynamics) / 4;
      const stage = (subStats.aura + subStats.interaction + subStats.visual + subStats.adaptation) / 4;
      const bond = (subStats.synergy + subStats.connection + subStats.topic) / 3;
      const work = (subStats.narrative + subStats.melody + subStats.detail) / 3;

      const avgStat = (performance + stage + bond + work) / 4;
      
      let rating = 'F';
      if (avgStat >= 90) rating = 'SS';
      else if (avgStat >= 80) rating = 'S';
      else if (avgStat >= 70) rating = 'A';
      else if (avgStat >= 60) rating = 'B';
      else if (avgStat >= 40) rating = 'C';
      else if (avgStat >= 20) rating = 'D';

      return {
          ...subStats,
          performance: Math.floor(performance),
          stage: Math.floor(stage),
          bond: Math.floor(bond),
          work: Math.floor(work),
          totalRating: rating,
          // Legacy Mapping for compatibility
          technique: subStats.precision,
          appeal: subStats.aura,
          stability: (subStats.precision + subStats.synergy) / 2,
          chemistry: subStats.synergy
      };
};
