import { GameState, Member, InteractionType, SelfActionType, ActionResult, Impact, InteractionOutcome } from '../types';
import { SELF_ACTION_TEMPLATES } from '../data/interactions';
import { calculateInteractionOutcome } from './interaction_system';
import { calculateBandStats } from './stats_system';

export const processInteraction = (
    state: GameState, 
    member: Member, 
    type: InteractionType, 
    cost: number
): { newState: GameState, outcome: InteractionOutcome } | null => {
    
    if (state.money < cost) return null;
    if (member.interactionsLeft <= 0) return null; // Logic usually handled in UI, but safe check here

    const outcome = calculateInteractionOutcome(member, type);
    
    const newMembers = state.members.map(m => m.id === member.id ? {
        ...m,
        stress: Math.max(0, Math.min(100, m.stress + (outcome.impact.stressChange || 0))),
        fatigue: Math.max(0, Math.min(100, m.fatigue + (outcome.impact.fatigue || 0))),
        affection: Math.max(0, Math.min(100, m.affection + (outcome.impact.affectionChange || 0))),
        technique: Math.min(100, m.technique + (outcome.impact.technique || 0)),
        interactionsLeft: m.interactionsLeft - 1
    } : m);

    const newTeamStats = calculateBandStats(newMembers, state.songs, state.rawChemistry, state.fans);

    return {
        newState: {
            ...state,
            money: state.money - cost,
            members: newMembers,
            teamStats: newTeamStats
        },
        outcome
    };
};

export const processSelfAction = (
    state: GameState, 
    type: SelfActionType
): { newState: GameState, outcome: InteractionOutcome } | { error: string } => {
    
    const leaderIndex = state.members.findIndex(m => m.isLeader);
    if (leaderIndex === -1) return { error: "队长不存在" };
    const leader = state.members[leaderIndex];
    if (leader.interactionsLeft <= 0) return { error: "精力耗尽" };

    const data = SELF_ACTION_TEMPLATES[type];
    let impact: Impact = {};
    
    // Define impacts
    switch(type) {
        case SelfActionType.SoloPractice: impact = { technique: 2, fatigue: 10 }; break;
        case SelfActionType.Meditation: impact = { stressChange: -30, mental: 2 }; break;
        case SelfActionType.Songwriting: impact = { creativity: 2, composing: 1, fatigue: 10 }; break;
        case SelfActionType.AdminWork: impact = { stressChange: 5, money: 200 }; break;
        case SelfActionType.QuickNap: impact = { fatigue: -30, stressChange: -10 }; break;
    }
    
    const result = ActionResult.Success;
    const log = data.templates[result][0];

    const newMembers = [...state.members];
    const m = newMembers[leaderIndex];
    newMembers[leaderIndex] = {
        ...m,
        interactionsLeft: m.interactionsLeft - 1,
        technique: Math.min(100, m.technique + (impact.technique || 0)),
        stress: Math.max(0, Math.min(100, m.stress + (impact.stressChange || 0))),
        fatigue: Math.max(0, Math.min(100, m.fatigue + (impact.fatigue || 0))),
        mental: Math.min(100, m.mental + (impact.mental || 0)),
        creativity: Math.min(100, m.creativity + (impact.creativity || 0)),
        composing: Math.min(100, m.composing + (impact.composing || 0)),
    };
    
    const newTeamStats = calculateBandStats(newMembers, state.songs, state.rawChemistry, state.fans);

    return {
        newState: { 
            ...state, 
            members: newMembers, 
            money: state.money + (impact.money || 0),
            teamStats: newTeamStats 
        },
        outcome: { result, log, impact }
    };
};

export const processDismissal = (state: GameState, member: Member): { newState: GameState, outcome: InteractionOutcome } => {
    const newMembers = state.members.filter(m => m.id !== member.id);
    const newTeamStats = calculateBandStats(newMembers, state.songs, state.rawChemistry, state.fans);

    return {
        newState: {
            ...state,
            members: newMembers,
            teamStats: newTeamStats
        },
        outcome: {
            result: ActionResult.Failure,
            log: `${member.name} 收拾好东西，一言不发地离开了乐队。`,
            impact: { stability: -15 }
        }
    };
};