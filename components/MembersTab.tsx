
import React, { useState, useMemo } from 'react';
import { 
    Search, Heart, Frown, Battery, Music, Guitar, Star, Brain, PenTool, FileText, 
    Sparkles, Zap, Coffee, MessageCircle, Gift, AlertCircle, Lock,
    Activity, User, Crown, Terminal, TrendingUp, Music2, Mic2, Disc, Keyboard,
    Palette, Layers, Smile, LayoutGrid, BarChart3
} from 'lucide-react';
import { Member, InteractionType, SelfActionType, ActionResult, Role } from '../types';
import { INTERACTION_DATA } from '../data/interactions';

// --- HELPER: RANK SYSTEM ---
const getRankConfig = (val: number) => {
    if (val >= 100) return { label: 'SS', color: 'text-amber-500', bg: 'bg-amber-100', bar: 'bg-amber-500' };
    if (val >= 90) return { label: 'S', color: 'text-rose-500', bg: 'bg-rose-100', bar: 'bg-rose-500' };
    if (val >= 80) return { label: 'A', color: 'text-pink-500', bg: 'bg-pink-100', bar: 'bg-pink-500' };
    if (val >= 70) return { label: 'B', color: 'text-indigo-500', bg: 'bg-indigo-100', bar: 'bg-indigo-500' };
    if (val >= 60) return { label: 'C', color: 'text-sky-500', bg: 'bg-sky-100', bar: 'bg-sky-500' };
    return { label: 'D', color: 'text-slate-400', bg: 'bg-slate-100', bar: 'bg-slate-300' };
};

// --- VISUAL COMPONENTS ---

const StatRow = ({ label, value, icon: Icon, showMax = false }: any) => {
    const rank = getRankConfig(value);
    const maxVal = showMax ? 100 : 120; // Soft cap for visualization
    const widthPct = Math.min(100, (value / maxVal) * 100);

    return (
        <div className="flex items-center gap-4 py-2 group">
            {/* Label Icon */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${rank.bg} ${rank.color} bg-opacity-50`}>
                <Icon size={16} />
            </div>

            {/* Info Area */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        {label}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-1.5 rounded ${rank.bg} ${rank.color}`}>
                            {rank.label}
                        </span>
                        <span className="text-sm font-black text-slate-700 tabular-nums">
                            {Math.floor(value)}
                        </span>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${rank.bar}`} 
                        style={{ width: `${widthPct}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

const RoleIcon = ({ role, size=16 }: { role: Role, size?: number }) => {
    switch(role) {
        case Role.Vocal: return <Mic2 size={size}/>;
        case Role.Guitar: return <Guitar size={size}/>;
        case Role.Bass: return <Zap size={size}/>;
        case Role.Drums: return <Disc size={size}/>;
        case Role.Keyboard: return <Keyboard size={size}/>;
        default: return <Music2 size={size}/>;
    }
}

const ActionButton = ({ icon: Icon, label, cost, onClick, disabled, locked, highlight }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled || locked}
        className={`
            relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 w-full group
            ${locked 
                ? 'bg-slate-50 border-slate-100 text-slate-300' 
                : (disabled 
                    ? 'bg-white border-slate-100 text-slate-300 cursor-not-allowed opacity-60' 
                    : `bg-white border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${highlight ? 'ring-2 ring-pink-100 border-pink-200' : ''}`)
            }
        `}
    >
        <div className={`
            w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all
            ${locked ? 'bg-slate-100' : (disabled ? 'bg-slate-50' : 'bg-slate-50 group-hover:bg-slate-900 group-hover:text-white')}
        `}>
            {locked ? <Lock size={14}/> : <Icon size={16}/>}
        </div>
        
        <span className={`text-[10px] font-bold text-center leading-tight tracking-wide mb-1 ${!disabled && !locked ? 'text-slate-600' : ''}`}>
            {label}
        </span>
        
        {!locked && (
            <span className={`text-[9px] font-bold px-1.5 rounded text-slate-400`}>
                {cost > 0 ? `¥${cost}` : 'Free'}
            </span>
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

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)] animate-in fade-in duration-500 pb-20 lg:pb-0">
            
            {/* --- LEFT: ROSTER LIST --- */}
            <div className="lg:w-72 shrink-0 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full">
                <div className="px-6 py-5 bg-white z-10 border-b border-slate-100">
                    <h3 className="font-black text-lg text-slate-900 tracking-tight flex justify-between items-center">
                        Members
                        <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">
                            {engine.gameState.members.length}/5
                        </span>
                    </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/50">
                    {engine.gameState.members.map((m: Member) => {
                        const isSelected = selectedMember?.id === m.id;
                        return (
                            <button 
                                key={m.id} 
                                onClick={() => { setSelectedMemberId(m.id); engine.setLastInteraction(null); }} 
                                className={`
                                    w-full flex items-center gap-3 p-2.5 rounded-2xl transition-all text-left group border
                                    ${isSelected 
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                                        : 'bg-white border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-900'}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors
                                    ${isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
                                `}>
                                    {m.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{m.name}</div>
                                    <div className={`text-[10px] uppercase tracking-wider flex items-center gap-1 mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                                        <RoleIcon role={m.roles[0]} size={10}/> {m.roles[0]}
                                    </div>
                                </div>
                                {m.isLeader && <Crown size={12} className="text-amber-400 fill-amber-400"/>}
                            </button>
                        )
                    })}
                    
                    <button 
                        onClick={() => engine.setShowScoutModal(true)} 
                        className="w-full flex items-center justify-center gap-2 p-3 mt-2 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600 hover:bg-white transition-all font-bold text-xs uppercase tracking-widest"
                    >
                        <Search size={14}/> Scout
                    </button>
                </div>
            </div>

            {/* --- RIGHT: DATA PANEL --- */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
                
                {/* 1. HEADER */}
                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center md:items-start bg-slate-50/30">
                    {/* Avatar */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-4xl font-black text-white shadow-lg shrink-0">
                        {selectedMember?.name[0]}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0 text-center md:text-left space-y-2">
                        <div>
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{selectedMember?.name}</h2>
                                {selectedMember?.isLeader && (
                                    <Crown size={16} className="text-amber-500 fill-amber-500"/>
                                )}
                            </div>
                            <div className="text-xs font-medium text-slate-500 italic">
                                "{selectedMember?.personality}"
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-2.5 py-1 rounded bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <User size={10}/> {selectedMember?.roles.join(' & ')}
                            </span>
                            {selectedMember?.tags.map((t: string) => (
                                <span key={t} className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Vitals Compact */}
                    <div className="flex gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="text-center w-16">
                            <div className="text-[10px] font-black uppercase text-rose-500 tracking-wider mb-1">羁绊 (Bond)</div>
                            <div className="flex justify-center items-baseline gap-0.5">
                                <Heart size={14} className="fill-rose-500 text-rose-500"/>
                                <span className="text-lg font-black text-slate-800">{selectedMember?.affection}</span>
                            </div>
                        </div>
                        <div className="w-px bg-slate-100"/>
                        <div className="text-center w-12">
                            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">压力</div>
                            <span className={`text-lg font-black ${selectedMember?.stress > 80 ? 'text-rose-500' : 'text-slate-800'}`}>{selectedMember?.stress}</span>
                        </div>
                        <div className="w-px bg-slate-100"/>
                        <div className="text-center w-12">
                            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">疲劳</div>
                            <span className={`text-lg font-black ${selectedMember?.fatigue > 80 ? 'text-amber-500' : 'text-slate-800'}`}>{selectedMember?.fatigue}</span>
                        </div>
                    </div>
                </div>

                {/* 2. STATS GRID (DATA CENTRIC) */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
                        
                        {/* Column 1: Performance */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Activity size={16} className="text-slate-400"/>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Live Stage</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="乐感" value={selectedMember?.musicality} icon={Music} />
                                <StatRow label="技巧" value={selectedMember?.technique} icon={Guitar} />
                                <StatRow label="表现力" value={selectedMember?.stagePresence} icon={Star} />
                            </div>
                        </div>

                        {/* Column 2: Creative & Mind */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Brain size={16} className="text-slate-400"/>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Mind & Style</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="想象力" value={selectedMember?.creativity} icon={Sparkles} />
                                <StatRow label="心态" value={selectedMember?.mental} icon={Smile} />
                                <StatRow label="视觉" value={selectedMember?.design} icon={Palette} />
                            </div>
                        </div>

                        {/* Column 3: Production */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Disc size={16} className="text-slate-400"/>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Studio Work</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="作曲" value={selectedMember?.composing} icon={PenTool} />
                                <StatRow label="作词" value={selectedMember?.lyrics} icon={FileText} />
                                <StatRow label="编曲" value={selectedMember?.arrangement} icon={Layers} />
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. INTERACTION FOOTER */}
                <div className="p-6 bg-slate-50 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-slate-400"/>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Energy</span>
                            {[1, 2].map(i => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-all ${selectedMember?.interactionsLeft >= i ? 'bg-slate-900' : 'bg-slate-200'}`}/>
                            ))}
                        </div>
                    </div>

                    {/* Result Overlay Inline */}
                    {engine.lastInteraction && (
                        <div className="mb-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 flex items-start gap-4">
                            <div className={`p-2 rounded-full shrink-0 ${engine.lastInteraction.result === ActionResult.GreatSuccess ? 'bg-amber-100 text-amber-500' : (engine.lastInteraction.result === ActionResult.Failure ? 'bg-slate-100 text-slate-400' : 'bg-rose-100 text-rose-500')}`}>
                                {engine.lastInteraction.result === ActionResult.GreatSuccess ? <Sparkles size={18}/> : (engine.lastInteraction.result === ActionResult.Failure ? <Frown size={18}/> : <Heart size={18}/>)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{engine.lastInteraction.result}</span>
                                    <button onClick={() => engine.setLastInteraction(null)} className="text-slate-400 hover:text-slate-600"><XIcon size={14}/></button>
                                </div>
                                <p className="text-sm font-bold text-slate-800 leading-snug">{engine.lastInteraction.log}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
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
    );
};

const XIcon = ({size}:{size:number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
)
