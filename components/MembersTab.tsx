
import React, { useState, useMemo } from 'react';
import { 
    Search, Heart, Frown, Battery, Music, Guitar, Star, Brain, PenTool, FileText, Disc, Palette, 
    Sparkles, X, Zap, Coffee, MessageCircle, Gift, AlertCircle, Hash, AtSign, Lock,
    Activity, Mic2, User, Crown, Terminal, ArrowRight, TrendingUp
} from 'lucide-react';
import { Member, InteractionType, SelfActionType, ActionResult } from '../types';
import { INTERACTION_DATA } from '../data/interactions';

// --- CLEAN COMPONENTS ---

const CleanStat = ({ label, value, icon: Icon, colorClass = "bg-slate-900" }: any) => (
    <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-end text-slate-500">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                <Icon size={12}/> {label}
            </div>
            <span className="text-xs font-mono font-bold text-slate-900">{Math.floor(value)}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
            <div 
                className={`h-full rounded-full transition-all duration-500 ${colorClass}`} 
                style={{ width: `${Math.min(100, value)}%` }}
            />
        </div>
    </div>
);

const TagBadge: React.FC<{ text: string }> = ({ text }) => (
    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
        #{text}
    </span>
);

const ActionButton = ({ icon: Icon, label, cost, onClick, disabled, locked }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled || locked}
        className={`
            relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 h-24
            ${locked 
                ? 'bg-slate-50 border-slate-100 text-slate-300' 
                : (disabled 
                    ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-white border-slate-200 hover:border-pink-300 hover:shadow-md hover:-translate-y-1 text-slate-700 hover:text-pink-600 cursor-pointer')
            }
        `}
    >
        {locked ? <Lock size={20} className="mb-2"/> : <Icon size={24} className="mb-2"/>}
        <span className="text-[10px] font-bold text-center leading-tight">{label}</span>
        {!locked && cost > 0 && (
            <span className={`text-[9px] font-mono mt-1 ${disabled ? 'text-slate-300' : 'text-slate-400'}`}>¥{cost}</span>
        )}
    </button>
);

export const MembersTab = ({ engine }: { engine: any }) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    const selectedMember = useMemo(() => 
        engine.gameState.members.find((m: Member) => m.id === (selectedMemberId || 'leader')) || engine.gameState.members[0]
    , [engine.gameState.members, selectedMemberId]);

    const getIconForType = (type: string) => {
        switch(type) {
            case SelfActionType.SoloPractice: return Guitar;
            case SelfActionType.Meditation: return Brain;
            case SelfActionType.Songwriting: return PenTool;
            case SelfActionType.AdminWork: return Terminal;
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
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)] animate-in fade-in duration-500">
            
            {/* --- LEFT: ROSTER LIST --- */}
            <div className="lg:w-72 shrink-0 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-black text-sm text-slate-500 uppercase tracking-widest">Members</h3>
                    <span className="text-xs font-bold text-slate-400">{engine.gameState.members.length} / 5</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {engine.gameState.members.map((m: Member) => {
                        const isSelected = selectedMember?.id === m.id;
                        return (
                            <button 
                                key={m.id} 
                                onClick={() => { setSelectedMemberId(m.id); engine.setLastInteraction(null); }} 
                                className={`
                                    w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left
                                    ${isSelected 
                                        ? 'bg-slate-900 text-white shadow-md' 
                                        : 'hover:bg-slate-50 text-slate-600'}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0
                                    ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}
                                `}>
                                    {m.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{m.name}</div>
                                    <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                                        {m.roles[0]}
                                    </div>
                                </div>
                                {(m.fatigue > 80 || m.stress > 80) && (
                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"/>
                                )}
                            </button>
                        )
                    })}
                    
                    <button 
                        onClick={() => engine.setShowScoutModal(true)} 
                        className="w-full flex items-center justify-center gap-2 p-3 mt-2 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50 transition-all font-bold text-xs uppercase tracking-wider"
                    >
                        <Search size={14}/> Scout Member
                    </button>
                </div>
            </div>

            {/* --- RIGHT: PROFILE CARD --- */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
                
                {/* 1. HEADER (Identity) */}
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl font-black text-slate-400 shadow-inner">
                        {selectedMember?.name[0]}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedMember?.name}</h2>
                            {selectedMember?.isLeader && (
                                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-amber-200">
                                    <Crown size={10} fill="currentColor"/> Leader
                                </span>
                            )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 mb-4">
                            <span className="flex items-center gap-1.5"><User size={14}/> {selectedMember?.roles.join(' / ')}</span>
                            <span className="flex items-center gap-1.5 text-pink-500"><AtSign size={14}/> {selectedMember?.screenName || 'unknown'}</span>
                            <span className="text-slate-300">|</span>
                            <span className="italic">"{selectedMember?.personality}"</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {selectedMember?.tags.map((t: string) => <TagBadge key={t} text={t} />)}
                        </div>
                    </div>
                </div>

                {/* 2. BODY */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* 2. VITALS (Left Side of Details) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest pb-2 border-b border-slate-100">
                                <Activity size={16}/> Status Check
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-pink-50 border border-pink-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-pink-700 uppercase tracking-wider flex items-center gap-1"><Heart size={12}/> Affection</span>
                                        <span className="text-sm font-black text-pink-600">{selectedMember?.affection}%</span>
                                    </div>
                                    <div className="h-2 bg-white rounded-full overflow-hidden">
                                        <div className="h-full bg-pink-500 rounded-full" style={{width: `${selectedMember?.affection}%`}}/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Frown size={10}/> Stress</span>
                                            <span className={`text-xs font-black ${selectedMember?.stress > 80 ? 'text-rose-500' : 'text-slate-700'}`}>{selectedMember?.stress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${selectedMember?.stress > 80 ? 'bg-rose-500' : 'bg-indigo-400'}`} style={{width: `${selectedMember?.stress}%`}}/>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Battery size={10}/> Fatigue</span>
                                            <span className={`text-xs font-black ${selectedMember?.fatigue > 80 ? 'text-amber-500' : 'text-slate-700'}`}>{selectedMember?.fatigue}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${selectedMember?.fatigue > 80 ? 'bg-amber-500' : 'bg-slate-400'}`} style={{width: `${selectedMember?.fatigue}%`}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. STATS (Right Side of Details) */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest pb-2 border-b border-slate-100">
                                <TrendingUp size={16}/> Performance Metrics
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <CleanStat label="Musicality" value={selectedMember?.musicality} icon={Music} colorClass="bg-indigo-500" />
                                <CleanStat label="Technique" value={selectedMember?.technique} icon={Guitar} colorClass="bg-sky-500" />
                                <CleanStat label="Stage Presence" value={selectedMember?.stagePresence} icon={Star} colorClass="bg-amber-500" />
                                <CleanStat label="Creativity" value={selectedMember?.creativity} icon={Brain} colorClass="bg-purple-500" />
                                <CleanStat label="Composing" value={selectedMember?.composing} icon={PenTool} colorClass="bg-violet-500" />
                                <CleanStat label="Lyrics" value={selectedMember?.lyrics} icon={FileText} colorClass="bg-pink-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. STATIC ACTION DOCK (Bottom) */}
                <div className="bg-slate-50 border-t border-slate-200 p-6 shrink-0 relative">
                    
                    {/* Result Overlay Mode */}
                    {engine.lastInteraction ? (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur z-10 flex items-center justify-center p-6 animate-in fade-in duration-200">
                            <div className="w-full max-w-2xl flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                                    engine.lastInteraction.result === ActionResult.GreatSuccess ? 'bg-amber-100 text-amber-600' : 
                                    (engine.lastInteraction.result === ActionResult.Failure ? 'bg-slate-100 text-slate-500' : 'bg-pink-100 text-pink-600')
                                }`}>
                                    {engine.lastInteraction.result === ActionResult.GreatSuccess ? <Sparkles/> : (engine.lastInteraction.result === ActionResult.Failure ? <Frown/> : <Heart/>)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-black uppercase text-xs tracking-widest bg-slate-900 text-white px-2 py-0.5 rounded">
                                            {engine.lastInteraction.result}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 font-medium text-sm leading-relaxed mb-2">
                                        {engine.lastInteraction.log}
                                    </p>
                                    <div className="flex gap-2">
                                        {engine.lastInteraction.impact && Object.entries(engine.lastInteraction.impact).slice(0, 3).map(([k,v]) => (
                                            Number(v) !== 0 && (
                                                <span key={k} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                                                    {statLabelMap[k] || k} {Number(v) > 0 ? '+' : ''}{Number(v)}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => engine.setLastInteraction(null)}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    ) : null}

                    {/* Normal Action Grid */}
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        {/* AP Counter */}
                        <div className="flex items-center gap-4 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm shrink-0">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Energy</div>
                            <div className="flex gap-1.5">
                                {[1, 2].map(i => (
                                    <div key={i} className={`w-3 h-3 rounded-full ${selectedMember?.interactionsLeft >= i ? 'bg-pink-500' : 'bg-slate-200'}`}/>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex-1 grid grid-cols-4 md:grid-cols-5 gap-3 w-full overflow-x-auto">
                            {selectedMember?.isLeader ? (
                                Object.values(SelfActionType).map((t) => (
                                    <ActionButton 
                                        key={t}
                                        label={t}
                                        icon={getIconForType(t)}
                                        cost={0}
                                        onClick={() => engine.performSelfAction(t)}
                                        disabled={selectedMember.interactionsLeft <= 0}
                                    />
                                ))
                            ) : (
                                Object.values(InteractionType).map((t) => {
                                    const cost = INTERACTION_DATA[t].cost;
                                    const canAfford = engine.gameState.money >= cost;
                                    const hasEnergy = selectedMember.interactionsLeft > 0;
                                    const isUnlocked = engine.isInteractionUnlocked(t);
                                    return (
                                        <ActionButton 
                                            key={t}
                                            label={t}
                                            icon={getIconForType(t)}
                                            cost={cost}
                                            onClick={() => engine.performInteraction(selectedMember!, t, cost)}
                                            disabled={!canAfford || !hasEnergy || !isUnlocked}
                                            locked={!isUnlocked}
                                        />
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
