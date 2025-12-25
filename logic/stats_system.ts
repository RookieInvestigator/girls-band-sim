
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

// Geometric Mean: Good for "Synergy" stats (e.g. Adaptation). Requires multiple factors to be good.
const getGeometricMean = (values: number[]) => {
    if (values.length === 0) return 0;
    const validValues = values.map(v => Math.max(1, v));
    const product = validValues.reduce((acc, v) => acc * v, 1);
    return Math.pow(product, 1 / values.length);
};

// SoftMax-ish: Good for "Star Power" (e.g. Aura). The best member defines the ceiling, others contribute marginally.
const getSoftMaxBase = (values: number[]) => {
    if (values.length === 0) return 0;
    const maxVal = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    // Formula: Max + (Average of the rest) * 0.3
    // Simplified: Max + (Sum - Max) / (Count - 1 || 1) * 0.3
    if (values.length === 1) return maxVal;
    const avgOthers = (sum - maxVal) / (values.length - 1);
    return maxVal + (avgOthers * 0.35);
};

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

      const getStats = (prop: keyof Member) => members.map(m => m[prop] as number);
      const getAvg = (prop: keyof Member) => members.reduce((sum, m) => sum + (m[prop] as number), 0) / members.length;
      const getMax = (prop: keyof Member) => Math.max(...members.map(m => m[prop] as number));
      const hasRole = (r: Role) => members.some(m => m.roles.includes(r));

      // --- 1. REALIZATION RATE (磨合度系数) ---
      const cappedChemistry = Math.min(100, rawChemistry);
      // Logic: A band needs time (Chemistry) to sound like a unit.
      let realizationRate = 0.25 + (cappedChemistry / 100) * 0.75; 
      
      // Experience Bonus (Song Count) - Practice makes perfect
      const expBonus = Math.min(0.25, songs.length * 0.04); 
      realizationRate += expBonus;
      realizationRate = Math.min(1.25, realizationRate); // Can exceed 100%

      // --- 2. STAT CALCULATION WITH COMPLEX FORMULAS ---

      // === Performance (演奏) ===
      // Precision: Harmonic Mean of Technique (Woodbucket theory) + Mental stability.
      // If one person has low technique, Precision tanks.
      const techHarmonic = getHarmonicMean(getStats('technique'));
      const mentalMin = Math.min(...getStats('mental')); // Weakest mental state affects precision
      let precisionBase = (techHarmonic * 0.7) + (mentalMin * 0.3);
      let precision = precisionBase * realizationRate;

      // Tone: Vocal/Solo Musicality + Gear Quality (Money/Tags implied) + Mental.
      // Weighted towards Vocal but supported by average musicality.
      let toneBase = 0;
      const vocal = members.find(m => m.roles.includes(Role.Vocal));
      if (vocal) {
          toneBase = vocal.musicality * 0.5 + getAvg('musicality') * 0.3 + getAvg('mental') * 0.2;
      } else {
          toneBase = getAvg('musicality') * 0.6; // No vocal penalty
      }
      let tone = toneBase * realizationRate;

      // Rhythm: Geometric Mean of Drum & Bass. They must lock in.
      // If no Drum or Bass, this stat suffers greatly.
      const drum = members.find(m => m.roles.includes(Role.Drums));
      const bass = members.find(m => m.roles.includes(Role.Bass));
      let rhythmBase = 0;
      if (drum && bass) {
          rhythmBase = Math.sqrt(drum.technique * bass.technique);
      } else if (drum) {
          rhythmBase = drum.technique * 0.6;
      } else if (bass) {
          rhythmBase = bass.technique * 0.4;
      } else {
          rhythmBase = getAvg('technique') * 0.2;
      }
      let rhythm = rhythmBase * realizationRate;

      // Dynamics: Range between soft and loud. Needs Technique (control) and Presence (impact).
      // Calculated as Geometric Mean of Avg Tech and Avg Presence.
      let dynamicsBase = Math.sqrt(getAvg('technique') * getAvg('stagePresence'));
      if (members.length < 3) dynamicsBase *= 0.8; // Hard to create dynamics with few instruments
      let dynamics = dynamicsBase * realizationRate;

      // === Stage (现场) ===
      // Aura: SoftMax. The Center defines the ceiling, others contribute marginally.
      // Also affected by Visuals (Design).
      let auraBase = getSoftMaxBase(getStats('stagePresence'));
      if (!hasRole(Role.Vocal)) auraBase *= 0.7; // Frontman is key
      let aura = auraBase * realizationRate;
      
      // Interaction: Mental (Reading room) + Outgoing Tags? 
      // Base: Avg Mental. Bonus if Avg Stress is low.
      const avgStress = getAvg('stress');
      let interactionBase = getAvg('mental');
      if (avgStress > 50) interactionBase *= (1 - (avgStress - 50)/100); // Stress penalty
      let interaction = interactionBase * realizationRate;
      
      // Visual: Weighted Design + Creativity boost.
      // Visuals are less dependent on band practice (realization rate).
      // Logic: Max Design sets the style, Creativity adds flair.
      let visualBase = getMax('design') * 0.6 + getAvg('design') * 0.4;
      let visual = visualBase * (0.6 + realizationRate * 0.4); 
      
      // Adaptation: The ability to Jam.
      // Logic: Geometric Mean of Creativity and Technique. 
      // High Tech but Low Creativity = Robot (Low Adaptation).
      // High Creativity but Low Tech = Sloppy (Low Adaptation).
      let adaptationBase = Math.sqrt(getAvg('creativity') * getAvg('technique'));
      let adaptation = adaptationBase * realizationRate;

      // === Bond (羁绊) ===
      // Synergy: Directly linked to Chemistry and time together.
      let synergy = cappedChemistry; 
      
      // Connection: Complex logic per user request.
      // Base: (Avg Affection * 0.7 + Avg Mental * 0.3)
      // Modifier: Stress Penalty. 
      const avgAffection = getAvg('affection');
      const avgMental = getAvg('mental');
      
      let connectionBase = (avgAffection * 0.7) + (avgMental * 0.3);
      
      // Stress Penalty: High Stress KILLS Connection.
      // Formula: Multiplier = 1.0 - (AvgStress / 200). 
      // If AvgStress is 100, effective connection is reduced by 50%.
      let stressPenalty = Math.max(0.4, 1.0 - (avgStress / 200));
      
      // Topic: Logarithmic Fan Scale + Design (Visuals drive clicks) + Viral Hits.
      const viralCount = songs.filter(s => s.isViral).length;
      const fanScore = Math.max(0, Math.log10(Math.max(10, fans)) - 1) * 15; 
      let topic = (fanScore * 0.6) + (getAvg('design') * 0.2) + (viralCount * 10);

      // === Work (作品) ===
      const hasSongs = songs.length > 0;
      const maxSongQuality = hasSongs ? Math.max(...songs.map(s => s.quality)) : 0;
      const avgSongQuality = hasSongs ? songs.reduce((a, b) => a + b.quality, 0) / songs.length : 0;
      
      const potentialWeight = hasSongs ? 0.3 : 0.2;
      const achievementWeight = hasSongs ? 0.7 : 0.0;

      // Narrative: Lyrics * Creativity (Geometric).
      let lyricPower = Math.sqrt(getMax('lyrics') * getAvg('creativity'));
      let narrative = (lyricPower * potentialWeight) + (avgSongQuality * achievementWeight);
      
      // Melody: Composing * Musicality.
      let compPower = Math.sqrt(getMax('composing') * getAvg('musicality'));
      let melody = (compPower * potentialWeight) + (maxSongQuality * achievementWeight);
      
      // Detail: Arrangement * Technique (Harmonic Mean for precision in details).
      let arrangePower = Math.sqrt(getMax('arrangement') * getHarmonicMean(getStats('technique')));
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
