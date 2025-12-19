
import { Member, InteractionType, ActionResult, InteractionOutcome } from '../types';
import { INTERACTION_TEMPLATES } from '../data/interactions';

export const calculateInteractionOutcome = (member: Member, type: InteractionType): InteractionOutcome => {
  const data = INTERACTION_TEMPLATES[type];
  
  let baseSuccessRate = 55;
  let bonus = (member.affection * 0.15) + (member.mental * 0.05) - (member.stress * 0.1) - (member.fatigue * 0.05);
  
  if (member.tags.includes('可靠')) bonus += 8;
  if (member.tags.includes('情绪化')) bonus -= 10;
  
  const finalSuccessThreshold = baseSuccessRate + bonus;
  const roll = Math.random() * 100;
  
  let result: ActionResult;
  if (roll > 94) {
    result = ActionResult.GreatSuccess;
  } else if (roll < (100 - finalSuccessThreshold)) {
    result = ActionResult.Failure;
  } else {
    result = ActionResult.Success;
  }

  // FIXED: Changed 'fatigueChange' to 'fatigue' to match Impact interface in types.ts
  let impact = { stressChange: 0, fatigue: 0, affectionChange: 0, techniqueChange: 0 };
  const mult = result === ActionResult.GreatSuccess ? 1.5 : (result === ActionResult.Failure ? -0.5 : 1.0);

  switch (type) {
    case InteractionType.IntensivePractice:
      impact = { stressChange: 12, fatigue: 20, affectionChange: -4 * mult, techniqueChange: 2 * mult };
      break;
    case InteractionType.CafeDate:
      // Buff: Fatigue reduction -15 -> -20
      impact = { stressChange: -35 * mult, fatigue: -20 * mult, affectionChange: 12 * mult, techniqueChange: 0 };
      break;
    case InteractionType.DeepTalk:
      impact = { stressChange: -20 * mult, fatigue: 4, affectionChange: 8 * mult, techniqueChange: 0.5 * mult };
      break;
    case InteractionType.Gift:
      impact = { stressChange: -8 * mult, fatigue: 0, affectionChange: 15 * mult, techniqueChange: 0 };
      break;
    case InteractionType.Reprimand:
      impact = { stressChange: 15, fatigue: 0, affectionChange: -8 * mult, techniqueChange: 1.5 * mult };
      break;
  }

  const possibleTexts = data.templates[result];
  const rawLog = possibleTexts[Math.floor(Math.random() * possibleTexts.length)];
  const finalLog = rawLog.replace("[NAME]", member.name);

  return { result, log: finalLog, impact };
};
