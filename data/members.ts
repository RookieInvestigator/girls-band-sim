
import { Member } from '../types';
import { LEGENDARY_MEMBERS } from './members/legendary';
import { VOCALS } from './members/vocals';
import { GUITARS } from './members/guitars';
import { BASSISTS } from './members/bass';
import { DRUMMERS } from './members/drums';
import { KEYBOARDS } from './members/keyboards';
import { SPECIALISTS } from './members/specialists';

export const MEMBER_POOL: Member[] = [
    ...LEGENDARY_MEMBERS,
    ...VOCALS,
    ...GUITARS,
    ...BASSISTS,
    ...DRUMMERS,
    ...KEYBOARDS,
    ...SPECIALISTS
];
