
import { GameState, EventOption, Member, ActionResult, Role, Impact, GameEvent } from '../types';
import { calculateBandStats } from './stats_system';
import { formatText } from './utils';

interface EventResult {
    newState: GameState;
    outcome: {
        result: ActionResult;
        log: string;
        impact: Impact;
    };
}

export const processEventChoice = (
    state: GameState, 
    activeEvent: GameEvent | null,
    option: EventOption, 
    member: Member | null, 
    customData?: string
): EventResult => {
    const successChance = option.successChance ?? 1;
    const isSuccess = Math.random() < successChance;
    const impact = isSuccess ? option.impact : (option.failImpact || {});
    
    // We use the helper to format description, but we need member name
    const effectDesc = formatText(option.effectDescription, state, member?.name);
    const failDesc = option.failDescription ? formatText(option.failDescription, state, member?.name) : undefined;

    const resultOutcome = {
        result: isSuccess ? ActionResult.Success : ActionResult.Failure,
        log: isSuccess ? effectDesc : (failDesc || "遗憾的是，并没有达到预期的效果。"),
        impact
    };

    const memberId = member?.id;
    
    // Calculate New State
    let updatedMembers = state.members.map(m => {
        let newM = { ...m };
        if (impact.allMemberStress) newM.stress = Math.max(0, Math.min(100, newM.stress + impact.allMemberStress));
        if (impact.allMemberMental) newM.mental = Math.max(0, Math.min(100, newM.mental + impact.allMemberMental));

        if (m.id === memberId) {
           newM = {
               ...newM,
               stress: Math.max(0, Math.min(100, newM.stress + (impact.stressChange || 0))),
               fatigue: Math.max(0, Math.min(100, newM.fatigue + (impact.fatigue || 0))),
               affection: Math.max(0, Math.min(100, newM.affection + (impact.affectionChange || 0))),
               musicality: Math.min(100, newM.musicality + (impact.musicality || 0)),
               technique: Math.min(100, newM.technique + (impact.technique || 0)),
               stagePresence: Math.min(100, newM.stagePresence + (impact.stagePresence || 0)),
               creativity: Math.min(100, newM.creativity + (impact.creativity || 0)),
               mental: Math.min(100, newM.mental + (impact.mental || 0)),
               composing: Math.min(100, newM.composing + (impact.composing || 0)),
               lyrics: Math.min(100, newM.lyrics + (impact.lyrics || 0)),
               arrangement: Math.min(100, newM.arrangement + (impact.arrangement || 0)),
               design: Math.min(100, newM.design + (impact.design || 0)),
           };
           if (impact.newRole) {
               if (!newM.originalRoles) newM.originalRoles = [...newM.roles];
               newM.roles = [impact.newRole];
           }
           if (impact.restoreOriginalRole && newM.originalRoles) {
               newM.roles = [...newM.originalRoles];
               newM.originalRoles = undefined;
           }
        }
        return newM;
    });

    if (option.isQuitConfirmed && memberId !== 'leader') {
        updatedMembers = updatedMembers.filter(m => m.id !== memberId);
    }

    let currentProject = state.currentProject;
    if (currentProject) {
        if (impact.quality) {
            currentProject = { ...currentProject, quality: Math.min(100, currentProject.quality + impact.quality) };
        }
        if (impact.songProgress) {
            currentProject = { ...currentProject, completeness: Math.min(100, currentProject.completeness + impact.songProgress) };
        }
    }

    let chemistryChange = 0;
    if (impact.chemistry) chemistryChange += impact.chemistry;
    if (impact.stability) chemistryChange += impact.stability * 0.5;

    let newRival = { ...state.rival };
    if (impact.unlockRival) newRival.isUnlocked = true;
    if (impact.rivalFans) newRival.fans = Math.max(0, newRival.fans + impact.rivalFans);
    if (impact.rivalRelation) newRival.relation = Math.max(0, Math.min(100, newRival.relation + impact.rivalRelation));

    let newFutureEvents = [...state.futureEvents];
    if (impact.scheduleEventId && impact.scheduleEventDelay && memberId) {
        newFutureEvents.push({
            triggerWeek: state.currentWeek + impact.scheduleEventDelay,
            eventId: impact.scheduleEventId,
            memberId: memberId
        });
    }
    
    const finalFans = Math.max(0, state.fans + (impact.fans || 0));
    const finalRawChemistry = state.rawChemistry + chemistryChange;
    const newTeamStats = calculateBandStats(updatedMembers, state.songs, finalRawChemistry, finalFans, state.unlockedSkills);

    const newState = {
        ...state,
        bandName: (activeEvent?.isNamingEvent && customData) ? customData : state.bandName,
        money: Math.max(0, state.money + (impact.money || 0)),
        fans: finalFans,
        members: updatedMembers,
        currentProject,
        rawChemistry: finalRawChemistry,
        teamStats: newTeamStats,
        rival: newRival,
        skillPoints: state.skillPoints + (impact.skillPoints || 0),
        futureEvents: newFutureEvents
    };

    return { newState, outcome: resultOutcome };
};
