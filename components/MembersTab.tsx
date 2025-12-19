
import { useState, useMemo } from 'react';
import { 
    Search, Heart, Frown, Battery, Music, Guitar, Star, Brain, PenTool, FileText, Disc, Palette, 
    Sparkles, X, Zap, Coffee, MessageCircle, Gift, AlertCircle
} from 'lucide-react';
import { Member, InteractionType, SelfActionType, ActionResult } from '../types';
import { INTERACTION_DATA } from '../data/interactions';
import { StatBar } from './Shared';

// Compact Action Button for the Strip
const CompactActionBtn = ({ icon: Icon, label, cost, onClick, disabled }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`
            relative group flex flex-col items-center justify-center shrink-0 w-[72px] h-full rounded-xl transition-all duration-200 border
            ${disabled 
                ? 'bg-transparent border-transparent text-slate-600 cursor-not-allowed opacity-50' 
                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-pink-500/30 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)] active:scale-95'
            }
        `}
    >
        <Icon size={18} className={`mb-1 transition-colors ${disabled ? 'text-slate-600' : 'text-slate-300 group-hover:text-pink-400'}`} />
        <div className="text-[9px] font-bold text-slate-400 group-hover:text-white truncate max-w-full px-1">{label}</div>
        {cost > 0 && <div className="text-[8px] font-black text-slate-500 group-hover:text-slate-400 -mt-0.5">¥{cost}</div>}
    </button>
);

export const MembersTab = ({ engine }: { engine: any }) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    const selectedMember = useMemo(() => 
        engine.gameState.members.find((m: Member) => m.id === (selectedMemberId || 'leader')) || engine.gameState.members[0]
    , [engine.gameState.members, selectedMemberId]);

    const getIconForType = (type: string) => {
        switch(type) {
            case SelfActionType.SoloPractice: return Music;
            case SelfActionType.Meditation: return Brain;
            case SelfActionType.Songwriting: return PenTool;
            case SelfActionType.AdminWork: return FileText;
            case SelfActionType.QuickNap: return Battery;
            case InteractionType.IntensivePractice: return Zap;
            case InteractionType.CafeDate: return Coffee;
            case InteractionType.DeepTalk: return MessageCircle;
            case InteractionType.Gift: return Gift;
            case InteractionType.Reprimand: return AlertCircle;
            default: return Star;
        }
    };

    const statLabelMap: Record<string, string> = {
        stressChange: '压力', fatigue: '疲劳', affectionChange: '羁绊', technique: '技巧', 
        mental: '心态', creativity: '想象', composing: '作曲', money: '资金'
    };

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 lg:h-full h-auto">
            
            {/* LEFT: MEMBER LIST */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-hide shrink-0 pb-2 lg:pb-0 min-h-[90px] lg:h-full snap-x p-1">
                {engine.gameState.members.map((m: Member) => (
                    <button 
                        key={m.id} 
                        onClick={() => { setSelectedMemberId(m.id); engine.setLastInteraction(null); }} 
                        className={`
                            min-w-[140px] lg:min-w-0 lg:w-full p-3 rounded-2xl text-left border-2 transition-all flex items-center gap-3 group relative snap-start
                            ${selectedMember?.id === m.id 
                                ? 'bg-slate-900 border-slate-900 shadow-lg transform scale-[1.02] ring-2 ring-slate-200 ring-offset-2' 
                                : 'bg-white border-transparent hover:border-slate-200'}
                        `}
                    >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs transition-colors shrink-0 ${selectedMember?.id === m.id ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                            {m.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`font-bold truncate text-xs flex items-center gap-2 ${selectedMember?.id === m.id ? 'text-white' : 'text-slate-700'}`}>
                                {m.name}
                            </div>
                            <div className={`text-[8px] font-black uppercase tracking-widest truncate ${selectedMember?.id === m.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                {m.roles.join(' / ')}
                            </div>
                        </div>
                        
                        {/* Status Dots */}
                        <div className="flex flex-col gap-1">
                            {m.stress >= 70 && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"/>}
                            {m.fatigue >= 70 && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"/>}
                        </div>
                    </button>
                ))}
                
                <button 
                    onClick={() => engine.setShowScoutModal(true)} 
                    className="min-w-[80px] lg:min-w-0 lg:w-full p-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 flex lg:flex-row flex-col items-center justify-center gap-2 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50 transition-all bg-white/50 shrink-0 group snap-start"
                >
                    <Search size={14}/>
                    <span className="text-[9px] font-black uppercase tracking-widest">招募</span>
                </button>
            </div>

            {/* RIGHT: DASHBOARD & COMMAND STRIP */}
            <div className="lg:col-span-9 flex flex-col lg:h-full h-auto gap-4">
                
                {/* 1. TOP SCROLLABLE AREA (Profile + Stats) */}
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide min-h-0">
                    {/* Header Card */}
                    <div className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm shrink-0 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
                        <div className="flex gap-4 items-center w-full md:w-auto">
                            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-lg shadow-slate-200">
                                {selectedMember?.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="mb-2">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-0.5">
                                        <h2 className="text-xl font-black text-slate-900 tracking-tighter truncate">{selectedMember?.name}</h2>
                                        {selectedMember?.screenName && (
                                            <span className="text-[10px] font-bold text-slate-400 truncate font-mono">
                                                {selectedMember.screenName.startsWith('@') ? '' : '@'}{selectedMember.screenName}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest truncate">
                                            {selectedMember?.roles.join(' / ')}
                                        </span>
                                        {selectedMember?.isLeader && <span className="bg-slate-100 text-slate-500 text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold border border-slate-200">LEADER</span>}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedMember?.tags.map((t: string) => <span key={t} className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 text-[8px] font-bold text-slate-500 rounded uppercase tracking-wider">{t}</span>)}
                                </div>
                            </div>
                        </div>

                        {/* Compact Status Bars */}
                        <div className="w-full md:w-56 grid grid-cols-3 md:grid-cols-1 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {[{label: '羁绊', val: selectedMember?.affection, color: 'bg-pink-500', icon: Heart}, 
                              {label: '压力', val: selectedMember?.stress, color: 'bg-indigo-500', icon: Frown}, 
                              {label: '疲劳', val: selectedMember?.fatigue, color: 'bg-amber-500', icon: Battery}].map((s, i) => (
                                <div key={i} className="flex flex-col gap-0.5">
                                    <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-slate-400">
                                        <span className="flex items-center gap-1"><s.icon size={8} className={s.color.replace('bg-', 'text-')}/> {s.label}</span>
                                        <span>{s.val}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className={`h-full ${s.color}`} style={{width: `${s.val}%`}}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                        <div className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="p-1 bg-indigo-50 text-indigo-500 rounded-lg"><Music size={12}/></div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">表现力</span>
                            </div>
                            <StatBar label="乐感" value={selectedMember?.musicality} color="bg-indigo-500" icon={Music} />
                            <StatBar label="技巧" value={selectedMember?.technique} color="bg-sky-500" icon={Guitar} />
                            <StatBar label="表现" value={selectedMember?.stagePresence} color="bg-amber-500" icon={Star} />
                            <StatBar label="心态" value={selectedMember?.mental} color="bg-teal-500" icon={Brain} />
                        </div>
                        <div className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="p-1 bg-pink-50 text-pink-500 rounded-lg"><PenTool size={12}/></div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">创造力</span>
                            </div>
                            <StatBar label="作曲" value={selectedMember?.composing} color="bg-purple-500" icon={Music} />
                            <StatBar label="作词" value={selectedMember?.lyrics} color="bg-pink-500" icon={FileText} />
                            <StatBar label="编曲" value={selectedMember?.arrangement} color="bg-blue-500" icon={Disc} />
                            <StatBar label="设计" value={selectedMember?.design} color="bg-orange-500" icon={Palette} />
                        </div>
                    </div>
                </div>

                {/* 2. COMPACT COMMAND STRIP (Fixed Bottom) */}
                <div className="shrink-0 z-20 sticky bottom-0 lg:static">
                    <div className="bg-slate-900 text-white rounded-[1.5rem] shadow-xl overflow-hidden border border-slate-800 relative transition-all duration-300 h-[84px] ring-1 ring-white/10">
                        {/* Header Label (Absolute) */}
                        <div className="absolute top-2 left-4 text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] pointer-events-none z-10 flex items-center gap-2">
                            <Sparkles size={8}/> COMMAND
                            <span className="text-slate-700">|</span>
                            <span className="text-slate-500">AP: </span>
                            <span className={selectedMember?.interactionsLeft > 0 ? 'text-pink-400' : 'text-slate-600'}>{selectedMember?.interactionsLeft}</span>
                        </div>

                        {engine.lastInteraction ? (
                            // RESULT STRIP (One Sentence)
                            <div className="flex items-center justify-between px-2 w-full h-full relative bg-slate-800/50 backdrop-blur-md animate-in slide-in-from-bottom-2 duration-200">
                                <div className="flex items-center gap-3 pl-2 flex-1 min-w-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                                        engine.lastInteraction.result === ActionResult.GreatSuccess ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 
                                        (engine.lastInteraction.result === ActionResult.Failure ? 'bg-slate-700 text-slate-400' : 'bg-gradient-to-br from-pink-500 to-rose-600 text-white')
                                    }`}>
                                        {engine.lastInteraction.result === ActionResult.GreatSuccess ? <Sparkles size={18}/> : (engine.lastInteraction.result === ActionResult.Failure ? <Frown size={18}/> : <Heart size={18}/>)}
                                    </div>
                                    <div className="flex flex-col justify-center min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-black uppercase tracking-wider ${
                                                engine.lastInteraction.result === ActionResult.GreatSuccess ? 'text-amber-400' : 
                                                (engine.lastInteraction.result === ActionResult.Failure ? 'text-slate-500' : 'text-pink-400')
                                            }`}>
                                                {engine.lastInteraction.result}
                                            </span>
                                            {/* Inline Impact Badges */}
                                            <div className="flex gap-1">
                                                {engine.lastInteraction.impact && Object.entries(engine.lastInteraction.impact).slice(0, 3).map(([k,v]) => (
                                                    Number(v) !== 0 && (
                                                        <span key={k} className={`text-[8px] font-bold px-1 rounded flex items-center ${
                                                            (k === 'stressChange' || k === 'fatigue') ? (Number(v) < 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10') :
                                                            (Number(v) > 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10')
                                                        }`}>
                                                            {statLabelMap[k] || k} {Number(v) > 0 ? '+' : ''}{Number(v)}
                                                        </span>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm font-bold text-white truncate pr-2 opacity-90">
                                            {engine.lastInteraction.log}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => engine.setLastInteraction(null)}
                                    className="h-full px-5 hover:bg-white/5 border-l border-white/5 flex items-center justify-center transition-colors group"
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <X size={18} className="text-slate-400 group-hover:text-white transition-colors"/>
                                </button>
                            </div>
                        ) : (
                            // ACTION STRIP (Horizontal Scroll)
                            <div className="flex items-end gap-1 px-2 pb-2 h-full overflow-x-auto scrollbar-hide snap-x pt-6">
                                {selectedMember?.isLeader ? (
                                    Object.values(SelfActionType).map((t, i) => (
                                        <div key={t} className="snap-start h-full">
                                            <CompactActionBtn 
                                                label={t}
                                                icon={getIconForType(t)}
                                                cost={0}
                                                onClick={() => engine.performSelfAction(t)}
                                                disabled={selectedMember.interactionsLeft <= 0}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    Object.values(InteractionType).map((t, i) => {
                                        const cost = INTERACTION_DATA[t].cost;
                                        const canAfford = engine.gameState.money >= cost;
                                        const hasEnergy = selectedMember.interactionsLeft > 0;
                                        return (
                                            <div key={t} className="snap-start h-full">
                                                <CompactActionBtn 
                                                    label={t}
                                                    icon={getIconForType(t)}
                                                    cost={cost}
                                                    onClick={() => engine.performInteraction(selectedMember!, t, cost)}
                                                    disabled={!canAfford || !hasEnergy}
                                                />
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
