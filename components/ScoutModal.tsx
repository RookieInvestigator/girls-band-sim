import { Search, X, Loader2, RefreshCw, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { MAX_MEMBERS } from '../constants';
import { Member, Role } from '../types';

const getRoleAbbr = (roles: Role[]) => {
    const mainRole = roles[0];
    switch (mainRole) {
        case Role.Vocal: return 'Vo';
        case Role.Guitar: return 'Gt';
        case Role.Bass: return 'Ba';
        case Role.Drums: return 'Dr';
        case Role.Keyboard: return 'Key';
        default: return 'Sp';
    }
};

const getRoleColor = (abbr: string) => {
    switch (abbr) {
        case 'Vo': return 'bg-rose-50 text-rose-600';
        case 'Gt': return 'bg-sky-50 text-sky-600';
        case 'Ba': return 'bg-amber-50 text-amber-600';
        case 'Dr': return 'bg-indigo-50 text-indigo-600';
        case 'Key': return 'bg-purple-50 text-purple-600';
        default: return 'bg-teal-50 text-teal-600';
    }
}

interface LineupSlot {
    id: string;
    role: Role | 'SPECIAL';
    activeClass: string;
}

// Configuration for the 6 lineup slots
const LINEUP_SLOTS: LineupSlot[] = [
    { id: 'Vo', role: Role.Vocal, activeClass: 'bg-rose-500 text-white shadow-rose-200' },
    { id: 'Gt', role: Role.Guitar, activeClass: 'bg-sky-500 text-white shadow-sky-200' },
    { id: 'Ba', role: Role.Bass, activeClass: 'bg-amber-500 text-white shadow-amber-200' },
    { id: 'Dr', role: Role.Drums, activeClass: 'bg-indigo-500 text-white shadow-indigo-200' },
    { id: 'Key', role: Role.Keyboard, activeClass: 'bg-purple-500 text-white shadow-purple-200' },
    { id: 'Sp', role: 'SPECIAL', activeClass: 'bg-teal-500 text-white shadow-teal-200' },
];

export const ScoutModal = ({ engine, showNeta }: { engine: any, showNeta: boolean }) => {
    
    // Helper to check if we have this role currently
    const hasRoleInTeam = (targetRole: Role | 'SPECIAL') => {
        if (targetRole === 'SPECIAL') {
            const standardRoles = [Role.Vocal, Role.Guitar, Role.Bass, Role.Drums, Role.Keyboard];
            return engine.gameState.members.some((m: Member) => !standardRoles.includes(m.roles[0]));
        }
        return engine.gameState.members.some((m: Member) => m.roles.includes(targetRole as Role));
    };

    return (
        <div className="fixed inset-0 bg-slate-200/60 backdrop-blur-xl z-[150] flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-[2.5rem] w-full max-w-5xl h-full md:h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
                
                {/* Header */}
                <div className="px-8 py-6 bg-white/80 backdrop-blur-md z-30 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                                <Search size={24} className="text-slate-300"/>
                                SCOUT
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 pl-1">
                                寻找新的伙伴 ({engine.gameState.members.length}/{MAX_MEMBERS})
                            </p>
                        </div>
                        {/* Mobile Close Button (visible only on small screens) */}
                        <button 
                            onClick={() => engine.setShowScoutModal(false)} 
                            className="md:hidden w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
                        >
                            <X size={20}/>
                        </button>
                    </div>

                    {/* Band Composition Indicator */}
                    <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-2xl self-start md:self-auto">
                        {LINEUP_SLOTS.map(slot => {
                            const isFilled = hasRoleInTeam(slot.role);
                            return (
                                <div 
                                    key={slot.id}
                                    className={`
                                        w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all
                                        ${isFilled ? `${slot.activeClass} shadow-lg scale-105` : 'bg-slate-200/50 text-slate-400 grayscale'}
                                    `}
                                    title={isFilled ? '已拥有' : '缺席'}
                                >
                                    {slot.id}
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Close Button */}
                    <button 
                        onClick={() => engine.setShowScoutModal(false)} 
                        className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                    >
                        <X size={20}/>
                    </button>
                </div>
                
                {/* Content Grid */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 relative min-h-[300px]">
                    {engine.isRefreshingScout ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 z-10">
                            <Loader2 size={32} className="animate-spin mb-4"/>
                            <p className="font-bold text-xs tracking-widest uppercase">Scouting...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
                            {engine.gameState.scoutPool.map((s: Member) => {
                                const isUR = s.id.startsWith('ur_');
                                const displayName = (showNeta && s.netaName) ? s.netaName : s.name;
                                const displayDesc = (showNeta && s.netaDesc) ? s.netaDesc : s.personality;
                                const isRecruited = engine.gameState.members.some((m: Member) => m.id === s.id);
                                const roleAbbr = getRoleAbbr(s.roles);

                                return (
                                    <div 
                                        key={s.id} 
                                        className={`
                                            flex flex-col rounded-[1.5rem] bg-white p-6 transition-all duration-300 relative group
                                            ${isRecruited 
                                                ? 'opacity-40 grayscale cursor-default' 
                                                : 'shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1'
                                            }
                                        `}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            {/* Role Indicator (Card) */}
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm ${getRoleColor(roleAbbr)}`}>
                                                {roleAbbr}
                                            </div>
                                            
                                            {/* Status / Rarity */}
                                            <div className="flex flex-col items-end gap-1">
                                                {isRecruited ? (
                                                    <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                                                        Joined
                                                    </span>
                                                ) : isUR && (
                                                    <span className="text-[9px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1">
                                                        <Sparkles size={8}/> UR
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <h4 className="font-black text-xl text-slate-900 leading-tight mb-1">{displayName}</h4>
                                            {s.screenName && (
                                                <div className="text-[10px] font-bold text-slate-400 font-mono">
                                                    {s.screenName}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {s.tags.map((t: string) => (
                                                <span key={t} className="px-2.5 py-1 rounded-md text-[9px] font-bold bg-slate-50 text-slate-500">
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <div className="flex-1 mb-6">
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-3">
                                                {displayDesc}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => engine.recruitMember(s)} 
                                            disabled={isRecruited || engine.gameState.members.length >= MAX_MEMBERS} 
                                            className={`
                                                w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all
                                                ${isRecruited 
                                                    ? 'bg-slate-100 text-slate-400 cursor-default'
                                                    : (engine.gameState.members.length >= MAX_MEMBERS
                                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200 active:scale-95')
                                                }
                                            `}
                                        >
                                            {isRecruited ? (
                                                <span className="flex items-center gap-1"><CheckCircle2 size={12}/> 已加入</span>
                                            ) : (engine.gameState.members.length >= MAX_MEMBERS ? (
                                                '名额已满'
                                            ) : (
                                                <span className="flex items-center gap-2"><UserPlus size={14}/> 签约</span>
                                            ))}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent flex justify-center pointer-events-none">
                    <button 
                        onClick={engine.refreshScout} 
                        disabled={engine.isRefreshingScout || engine.gameState.money < engine.refreshCost} 
                        className="pointer-events-auto px-8 py-4 rounded-[2rem] bg-white text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-50 hover:shadow-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                        <RefreshCw size={16} className={engine.isRefreshingScout ? 'animate-spin' : ''}/> 
                        <span>刷新列表 <span className="text-slate-400 ml-1">¥{engine.refreshCost}</span></span>
                    </button>
                </div>
            </div>
        </div>
    );
};