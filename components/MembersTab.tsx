
import { useState, useMemo } from 'react';
import { 
    Search, Heart, Frown, Battery, Music, Guitar, Star, Brain, PenTool, FileText, Disc, Palette, 
    Sparkles, X, ChevronRight, Zap, Coffee, MessageCircle, Gift, AlertCircle, ArrowUp, ArrowDown 
} from 'lucide-react';
import { Member, InteractionType, SelfActionType, ActionResult } from '../types';
import { INTERACTION_DATA } from '../data/interactions';
import { StatBar } from './Shared';

const ActionBtn = ({ icon: Icon, label, cost, onClick, disabled }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`
            relative group flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-200 h-full
            ${disabled 
                ? 'bg-slate-800/50 border-white/5 text-slate-600 cursor-not-allowed' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 active:scale-95'
            }
        `}
    >
        <div className={`p-2 rounded-full transition-colors ${disabled ? 'bg-slate-800 text-slate-600' : 'bg-slate-800 group-hover:bg-pink-500 group-hover:text-white text-pink-400'}`}>
            <Icon size={20} />
        </div>
        <div className="text-center">
            <div className={`text-[10px] font-bold uppercase tracking-wider ${disabled ? 'text-slate-600' : 'text-slate-200 group-hover:text-white'}`}>{label}</div>
            {cost > 0 && (
                <div className={`text-[9px] font-black mt-0.5 ${disabled ? 'text-slate-700' : 'text-slate-400'}`}>¥{cost}</div>
            )}
        </div>
    </button>
);

const ImpactBadge = ({ label, value }: { label: string, value: number }) => {
    if (!value || value === 0) return null;
    const isGood = label === '压力' || label === '疲劳' ? value < 0 : value > 0;
    return (
        <span className={`text-[10px] font-bold px-2 py-1 rounded bg-white/10 border border-white/5 flex items-center gap-1 ${isGood ? 'text-emerald-400' : 'text-rose-400'}`}>
            {label} {value > 0 ? '+' : ''}{value}
        </span>
    );
};

export const MembersTab = ({ engine }: { engine: any }) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    const selectedMember = useMemo(() => 
        engine.gameState.members.find((m: Member) => m.id === (selectedMemberId || 'leader')) || engine.gameState.members[0]
    , [engine.gameState.members, selectedMemberId]);

    const getIconForType = (type: string) => {
        switch(type) {
            // Self
            case SelfActionType.SoloPractice: return Music;
            case SelfActionType.Meditation: return Brain;
            case SelfActionType.Songwriting: return PenTool;
            case SelfActionType.AdminWork: return FileText;
            case SelfActionType.QuickNap: return Battery;
            // Interaction
            case InteractionType.IntensivePractice: return Zap;
            case InteractionType.CafeDate: return Coffee;
            case InteractionType.DeepTalk: return MessageCircle;
            case InteractionType.Gift: return Gift;
            case InteractionType.Reprimand: return AlertCircle;
            default: return Star;
        }
    };

    return (
        <div className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* LEFT COLUMN: LIST */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-hide shrink-0 pb-2 lg:pb-2 h-auto lg:h-full snap-x p-1">
                {engine.gameState.members.map((m: Member) => (
                    <button 
                        key={m.id} 
                        onClick={() => { setSelectedMemberId(m.id); engine.setLastInteraction(null); }} 
                        className={`
                            min-w-[150px] lg:min-w-0 lg:w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center gap-3 group relative snap-start
                            ${selectedMember?.id === m.id 
                                ? 'bg-slate-900 border-slate-900 shadow-md transform scale-[1.02]' 
                                : 'bg-white border-transparent hover:border-slate-200'}
                        `}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors shrink-0 ${selectedMember?.id === m.id ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                            {m.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`font-bold truncate text-sm flex items-center gap-2 ${selectedMember?.id === m.id ? 'text-white' : 'text-slate-700'}`}>
                                {m.name}
                            </div>
                            <div className={`text-[9px] font-black uppercase tracking-widest ${selectedMember?.id === m.id ? 'text-slate-400' : 'text-slate-400'}`}>{m.roles[0]}</div>
                        </div>
                        
                        {/* Status Dots */}
                        <div className="flex flex-col gap-1.5">
                            {m.stress >= 70 && <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ring-2 ring-white/20"/>}
                            {m.fatigue >= 70 && <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-2 ring-white/20"/>}
                        </div>
                    </button>
                ))}
                
                <button 
                    onClick={() => engine.setShowScoutModal(true)} 
                    className="min-w-[100px] lg:min-w-0 lg:w-full p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 flex lg:flex-row flex-col items-center justify-center gap-2 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50 transition-all bg-white/50 shrink-0 group snap-start"
                >
                    <div className="p-1 rounded-full bg-slate-100 group-hover:bg-pink-100 transition-colors"><Search size={16}/></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">招募</span>
                </button>
            </div>

            {/* RIGHT COLUMN: DETAIL DASHBOARD */}
            <div className="lg:col-span-9 flex-1 bg-white p-5 lg:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-6 min-h-0 overflow-hidden relative">
                
                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row gap-6 items-start shrink-0 relative z-10">
                    <div className="flex gap-5 w-full items-center">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-slate-900 rounded-3xl flex items-center justify-center text-4xl lg:text-5xl font-black text-white shrink-0 shadow-xl shadow-slate-200">
                            {selectedMember?.name[0]}
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                            <div className="flex flex-col">
                                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                                    <span className="truncate">{selectedMember?.name}</span>
                                    {selectedMember?.isLeader && <span className="bg-slate-100 text-slate-500 text-[9px] px-2 py-1 rounded-md uppercase tracking-widest font-bold border border-slate-200 shrink-0">LEADER</span>}
                                </h2>
                                {selectedMember?.screenName && (
                                    <div className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1.5">
                                        ID: <span className="text-slate-600 bg-slate-100 px-1.5 rounded">{selectedMember.screenName}</span>
                                    </div>
                                )}
                                <p className="text-xs text-slate-500 font-medium mt-2 line-clamp-1 italic border-l-2 border-slate-300 pl-3">
                                    “{selectedMember?.personality}”
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {selectedMember?.tags.map((t: string) => <span key={t} className="px-2 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-md uppercase tracking-wider">{t}</span>)}
                            </div>
                        </div>
                    </div>
                    
                    {/* Status Bar */}
                    <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[180px]">
                        <div className="flex-1 flex flex-col gap-1">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <span className="flex items-center gap-1.5"><Heart size={12} className="text-pink-500"/> 羁绊</span>
                                <span className="text-slate-600">{selectedMember?.affection}%</span>
                             </div>
                             <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{width: `${selectedMember?.affection}%`}}/>
                             </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <span className="flex items-center gap-1.5"><Frown size={12} className="text-indigo-500"/> 压力</span>
                                <span className={selectedMember?.stress > 70 ? 'text-indigo-600 font-black' : 'text-slate-600'}>{selectedMember?.stress}%</span>
                             </div>
                             <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full transition-colors ${selectedMember?.stress > 70 ? 'bg-indigo-600' : 'bg-indigo-400'}`} style={{width: `${selectedMember?.stress}%`}}/>
                             </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <span className="flex items-center gap-1.5"><Battery size={12} className="text-amber-500"/> 疲劳</span>
                                <span className={selectedMember?.fatigue > 70 ? 'text-amber-600 font-black' : 'text-slate-600'}>{selectedMember?.fatigue}%</span>
                             </div>
                             <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full transition-colors ${selectedMember?.fatigue > 70 ? 'bg-amber-600' : 'bg-amber-400'}`} style={{width: `${selectedMember?.fatigue}%`}}/>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 2. Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 shrink-0 relative z-10">
                    <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><Music size={14}/></div>
                            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">表现力</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <StatBar label="乐感" value={selectedMember?.musicality} color="bg-indigo-500" icon={Music} />
                            <StatBar label="技巧" value={selectedMember?.technique} color="bg-sky-500" icon={Guitar} />
                            <StatBar label="表现" value={selectedMember?.stagePresence} color="bg-amber-500" icon={Star} />
                            <StatBar label="心态" value={selectedMember?.mental} color="bg-teal-500" icon={Brain} />
                        </div>
                    </div>
                    <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-pink-100 text-pink-600 rounded-lg"><PenTool size={14}/></div>
                            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">创造力</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <StatBar label="作曲" value={selectedMember?.composing} color="bg-purple-500" icon={Music} />
                            <StatBar label="作词" value={selectedMember?.lyrics} color="bg-pink-500" icon={FileText} />
                            <StatBar label="编曲" value={selectedMember?.arrangement} color="bg-blue-500" icon={Disc} />
                            <StatBar label="设计" value={selectedMember?.design} color="bg-orange-500" icon={Palette} />
                        </div>
                    </div>
                </div>

                {/* 3. Interactions - Redesigned Command Center */}
                <div className="flex-1 bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col min-h-[260px] border border-slate-800">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 relative z-10 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-pink-500/20 rounded-lg text-pink-400"><Sparkles size={14}/></div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Command</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-white/5">
                            <span className="text-[9px] font-bold text-slate-400 uppercase mr-1 tracking-wider">AP</span>
                            {[1, 2].map(i => (
                                <div key={i} className={`w-1.5 h-4 rounded-sm transform skew-x-[-15deg] transition-all ${i <= (selectedMember?.interactionsLeft || 0) ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'bg-slate-700'}`}/>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 relative z-10 overflow-hidden">
                        {engine.lastInteraction ? (
                            // RESULT VIEW
                            <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 text-center px-4">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-2xl ring-4 ${
                                    engine.lastInteraction.result === ActionResult.Failure ? 'bg-slate-700 text-slate-400 ring-slate-800' : 
                                    (engine.lastInteraction.result === ActionResult.GreatSuccess ? 'bg-amber-400 text-white ring-amber-500/30' : 'bg-pink-500 text-white ring-pink-500/30')
                                }`}>
                                    {engine.lastInteraction.result === ActionResult.GreatSuccess ? <Sparkles size={32}/> : (engine.lastInteraction.result === ActionResult.Failure ? <Frown size={32}/> : <Heart size={32}/>)}
                                </div>
                                
                                <div className={`text-lg font-black uppercase tracking-[0.2em] mb-2 ${
                                    engine.lastInteraction.result === ActionResult.GreatSuccess ? 'text-amber-400' : 
                                    (engine.lastInteraction.result === ActionResult.Failure ? 'text-slate-400' : 'text-pink-400')
                                }`}>
                                    {engine.lastInteraction.result}
                                </div>
                                
                                <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed max-w-lg mb-6">
                                    “{engine.lastInteraction.log}”
                                </p>

                                {/* Stat Impacts */}
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {engine.lastInteraction.impact && Object.entries(engine.lastInteraction.impact).map(([key, val]) => {
                                        const labelMap: Record<string, string> = {
                                            stressChange: '压力', fatigue: '疲劳', affectionChange: '羁绊', technique: '技巧', techniqueChange: '技巧',
                                            mental: '心态', creativity: '想象', composing: '作曲', money: '资金'
                                        };
                                        return <ImpactBadge key={key} label={labelMap[key] || key} value={Number(val)} />;
                                    })}
                                </div>

                                <button 
                                    onClick={() => engine.setLastInteraction(null)}
                                    className="px-8 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold text-white transition-all flex items-center gap-2 group"
                                >
                                    继续 <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform"/>
                                </button>
                            </div>
                        ) : (
                            // ACTION GRID
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 h-full content-start overflow-y-auto scrollbar-hide pb-2">
                                {selectedMember?.isLeader ? (
                                    Object.values(SelfActionType).map(t => (
                                        <ActionBtn 
                                            key={t}
                                            label={t}
                                            icon={getIconForType(t)}
                                            cost={0}
                                            onClick={() => engine.performSelfAction(t)}
                                            disabled={selectedMember.interactionsLeft <= 0}
                                        />
                                    ))
                                ) : (
                                    Object.values(InteractionType).map(t => {
                                        const cost = INTERACTION_DATA[t].cost;
                                        const canAfford = engine.gameState.money >= cost;
                                        const hasEnergy = selectedMember.interactionsLeft > 0;
                                        return (
                                            <ActionBtn 
                                                key={t}
                                                label={t}
                                                icon={getIconForType(t)}
                                                cost={cost}
                                                onClick={() => engine.performInteraction(selectedMember!, t, cost)}
                                                disabled={!canAfford || !hasEnergy}
                                            />
                                        )
                                    })
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Background Decorations */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Sparkles size={120}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
