
import { GameState } from '../types';

export const formatText = (text: string, state: GameState, memberName?: string): string => {
    if (!text) return "";
    let res = text;
    if (memberName) res = res.replace(/\[NAME\]/g, memberName);
    if (state.rival) res = res.replace(/\[RIVAL_NAME\]/g, state.rival.name);
    return res;
};
