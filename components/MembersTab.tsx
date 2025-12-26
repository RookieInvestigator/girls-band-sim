
import React, { useState, useMemo } from 'react';
import { 
    Search, Heart, Frown, Battery, Music, Guitar, Star, Brain, PenTool, FileText, 
    Sparkles, Zap, Coffee, MessageCircle, Gift, AlertCircle, Lock,
    Activity, User, Crown, Terminal, TrendingUp, Music2, Mic2, Disc, Keyboard,
    Palette, Layers, Smile, LayoutGrid, BarChart3, DoorOpen, XCircle, Clapperboard, Trash2, PieChart,
    Wind, Cloud, Slash, Megaphone, ChevronLeft, ArrowLeft
} from 'lucide-react';
import { Member, InteractionType, SelfActionType, ActionResult, Role } from '../types';
import { INTERACTION_DATA } from '../data/interactions';
import { MAX_MEMBERS } from '../constants';

// --- HELPER: RANK SYSTEM ---
const getRankConfig = (val: number) => {
    if (val >= 100) return { label: 'SS', color: 'text-amber-500', bg: 'bg-amber-100', bar: 'bg-amber-500' };
    if (val >= 90) return { label: 'S', color: 'text-rose-500', bg: 'bg-rose-100', bar: 'bg-rose-500' };
    if (val >= 80) return { label: 'A', color: 'text-pink-500', bg: 'bg-pink-100', bar: 'bg-pink-500' };
    if (val >= 70) return { label: 'B', color: 'text-indigo-500', bg: 'bg-indigo-100', bar: 'bg-indigo-500' };
    if (val >= 60) return { label: 'C', color: 'text-sky-500', bg: 'bg-sky-100', bar: 'bg-sky-500' };
    return { label: 'D', color: 'text-slate-400', bg: 'bg-slate-100', bar: 'bg-slate-300' };
};

const StatRow = ({ label, value, icon: Icon, showMax = false }: any) => {
    const rank = getRankConfig(value);
    const maxVal = showMax ? 100 : 120; // Soft cap for visualization
    const widthPct = Math.min(100, (value / maxVal) * 100);

    return (
        <div className="flex items-center gap-3 py-1.5 group">
            {/* Label Icon */}
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${rank.bg} ${rank.color} bg-opacity-50`}>
                <Icon size={14} />
            </div>

            {/* Info Area */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        {label}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black px-1 rounded ${rank.bg} ${rank.color}`}>
                            {rank.label}
                        </span>
                        <span className="text-xs font-black text-slate-700 tabular-nums">
                            {Math.floor(value)}
                        </span>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
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
        case Role.Producer: return <Clapperboard size={size}/>;
        case Role.Accordion: return <Wind size={size}/>;
        case Role.Harp: return <Cloud size={size}/>;
        case Role.Shamisen: return <Slash size={size}/>;
        case Role.Rapper: return <Megaphone size={size}/>;
        default: return <Music2 size={size}/>;
    }
}

const ActionButton = ({ icon: Icon, label, cost, onClick, disabled, locked, highlight, isDanger }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled || locked}
        className={`
            relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-xl border transition-all duration-200 w-full group
            ${locked 
                ? 'bg-slate-50 border-slate-100 text-slate-300' 
                : (disabled 
                    ? 'bg-white border-slate-100 text-slate-300 cursor-not-allowed opacity-60' 
                    : (isDanger 
                        ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-md'
                        : `bg-white border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${highlight ? 'ring-2 ring-pink-100 border-pink-200' : ''}`)
                    )
            }
        `}
    >
        <div className={`
            w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mb-1 lg:mb-2 transition-all
            ${locked ? 'bg-slate-100' : (disabled ? 'bg-slate-50' : (isDanger ? 'bg-rose-100 group-hover:bg-white/20 group-hover:text-white' : 'bg-slate-50 group-hover:bg-slate-900 group-hover:text-white'))}
        `}>
            {locked ? <Lock size={14}/> : <Icon size={16}/>}
        </div>
        
        <span className={`text-[9px] lg:text-[10px] font-bold text-center leading-tight tracking-wide mb-0.5 ${!disabled && !locked && !isDanger ? 'text-slate-600' : ''}`}>
            {label}
        </span>
        
        {!locked && !isDanger && (
            <span className={`text-[9px] font-bold px-1.5 rounded text-slate-400 scale-90 lg:scale-100`}>
                {cost > 0 ? `¥${cost}` : 'Free'}
            </span>
        )}
    </button>
);

const RoleCompositionIndicator = ({ members }: { members: Member[] }) => {
    const rolesToCheck = [Role.Vocal, Role.Guitar, Role.Bass, Role.Drums, Role.Keyboard];
    const nonSpecialRoles = [Role.Vocal, Role.Guitar, Role.Bass, Role.Drums, Role.Keyboard, Role.Producer];
    const specialCount = members.filter(m => m.roles.some(r => !nonSpecialRoles.includes(r))).length;

    return (
        <div className="flex gap-1.5 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 justify-between items-center mb-2 mt-auto">
            {rolesToCheck.map(role => {
                const count = members.filter(m => m.roles.includes(role)).length;
                let statusColor = 'bg-slate-200 text-slate-400';
                if (count === 0) statusColor = 'bg-rose-100 text-rose-500';
                else if (count === 1) statusColor = 'bg-emerald-100 text-emerald-600';
                else statusColor = 'bg-amber-100 text-amber-600';

                return (
                    <div key={role} className="flex flex-col items-center gap-0.5 w-full">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${statusColor}`}>
                            <RoleIcon role={role} size={10}/>
                        </div>
                        <span className="text-[8px] font-black text-slate-400">{count}</span>
                    </div>
                )
            })}
            <div className="flex flex-col items-center gap-0.5 w-full relative">
                <div className="absolute left-0 top-1 bottom-3 w-px bg-slate-200"></div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${specialCount > 0 ? 'bg-fuchsia-100 text-fuchsia-600' : 'bg-slate-200 text-slate-400'}`}>
                    <Sparkles size={10}/>
                </div>
                <span className="text-[8px] font-black text-slate-400">{specialCount}</span>
            </div>
        </div>
    );
};

export const MembersTab = ({ engine, showNeta }: { engine: any, showNeta: boolean }) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [showFireConfirm, setShowFireConfirm] = useState(false);
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false); // Mobile Master-Detail State

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

    const getDisplayName = (m: Member) => {
        if (showNeta && m.netaName) return m.netaName;
        return m.name;
    };

    const getDisplayDesc = (m: Member) => {
        if (showNeta && m.netaDesc) return m.netaDesc;
        return m.personality;
    };

    const handleMemberClick = (id: string) => {
        setSelectedMemberId(id);
        engine.setLastInteraction(null);
        setIsMobileDetailOpen(true); // Switch to detail view on mobile
    };

    const handleBackToList = () => {
        setIsMobileDetailOpen(false);
    };

    // Calculate dynamic height for mobile to fit within viewport including safe areas
    // Using dvh ensures it handles address bar resizing
    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100dvh-140px)] lg:h-[calc(100vh-100px)] animate-in fade-in duration-500 pb-0 relative">
            
            {/* --- CUSTOM CONFIRM MODAL --- */}
            {showFireConfirm && (
                <div className="absolute inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200 rounded-3xl">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-slate-100 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DoorOpen size={32}/>
                        </div>
                        <h3 className="font-black text-2xl text-slate-900 mb-2">解雇确认</h3>
                        <p className="text-sm font-bold text-slate-500 mb-8 leading-relaxed">
                            确定要让 <span className="text-slate-900">{getDisplayName(selectedMember)}</span> 离开乐队吗？<br/>
                            <span className="text-xs text-rose-500 mt-1 block">此操作不可撤销，且可能影响团队士气。</span>
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowFireConfirm(false)} 
                                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 font-black rounded-xl text-slate-600 transition-colors uppercase tracking-widest text-xs"
                            >
                                取消
                            </button>
                            <button 
                                onClick={() => { 
                                    engine.fireMember(selectedMember); 
                                    setShowFireConfirm(false); 
                                    setSelectedMemberId('leader');
                                    setIsMobileDetailOpen(false);
                                }} 
                                className="flex-1 py-3.5 bg-rose-500 hover:bg-rose-600 font-black rounded-xl text-white transition-colors uppercase tracking-widest text-xs shadow-lg shadow-rose-200"
                            >
                                确定解雇
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- LEFT: ROSTER LIST --- */}
            {/* On mobile: Hidden if Detail is Open */}
            <div className={`
                w-full lg:w-72 shrink-0 flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full
                ${isMobileDetailOpen ? 'hidden lg:flex' : 'flex'}
            `}>
                <div className="px-6 py-5 bg-white z-10 border-b border-slate-100">
                    <h3 className="font-black text-lg text-slate-900 tracking-tight flex justify-between items-center">
                        Members
                        <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">
                            {engine.gameState.members.length}/{MAX_MEMBERS}
                        </span>
                    </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/50">
                    {engine.gameState.members.map((m: Member) => {
                        const isSelected = selectedMember?.id === m.id;
                        return (
                            <button 
                                key={m.id} 
                                onClick={() => handleMemberClick(m.id)} 
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
                                    {getDisplayName(m)[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{getDisplayName(m)}</div>
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

                <div className="px-3 pb-3">
                    <RoleCompositionIndicator members={engine.gameState.members} />
                </div>
            </div>

            {/* --- RIGHT: DATA PANEL (MASTER-DETAIL) --- */}
            {/* On mobile: Hidden if Detail is NOT Open */}
            <div className={`
                flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex-col overflow-hidden h-full relative
                ${isMobileDetailOpen ? 'flex' : 'hidden lg:flex'}
            `}>
                
                {/* 1. HEADER - Compact on Mobile */}
                <div className="p-4 lg:p-8 border-b border-slate-100 flex flex-col gap-4 bg-slate-50/30 relative shrink-0">
                    
                    {/* Mobile Navigation Bar */}
                    <div className="flex items-center justify-between lg:hidden mb-1">
                        <button 
                            onClick={handleBackToList}
                            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                                <ArrowLeft size={16}/>
                            </div>
                            <span>Back to List</span>
                        </button>
                        
                        {!selectedMember?.isLeader && (
                            <button 
                                onClick={() => setShowFireConfirm(true)}
                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                <Trash2 size={18}/>
                            </button>
                        )}
                    </div>

                    <div className="flex gap-4 lg:gap-6 items-center lg:items-start">
                        {/* Avatar */}
                        <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-3xl lg:text-4xl font-black text-white shadow-lg shrink-0">
                            {getDisplayName(selectedMember)[0]}
                        </div>
                        
                        {/* Info Block */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3 mb-1">
                                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-none truncate">
                                    {getDisplayName(selectedMember)}
                                </h2>
                                {selectedMember?.isLeader && (
                                    <span className="inline-flex"><Crown size={16} className="text-amber-500 fill-amber-500"/></span>
                                )}
                            </div>
                            
                            {/* DESCRIPTION RESTORED HERE */}
                            <div className="text-xs font-medium text-slate-500 italic mb-2 leading-relaxed line-clamp-2 lg:line-clamp-1">
                                "{getDisplayDesc(selectedMember)}"
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                    <User size={10}/> {selectedMember?.roles.join('/')}
                                </span>
                                {selectedMember?.tags.slice(0, 3).map((t: string) => (
                                    <span key={t} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Dismiss Button */}
                        {!selectedMember?.isLeader && (
                            <div className="hidden lg:block">
                                <button 
                                    onClick={() => setShowFireConfirm(true)}
                                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-transparent hover:border-rose-200 transition-all text-slate-300 hover:text-rose-500"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-wider hidden group-hover:inline-block">Dismiss</span>
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Vitals - Compact Horizontal Row */}
                    <div className="flex gap-2 lg:gap-4 bg-white p-2 lg:p-3 rounded-xl border border-slate-100 shadow-sm w-full">
                        <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-50 last:border-0">
                            <div className="text-[9px] lg:text-[10px] font-black uppercase text-rose-500 tracking-wider mb-0.5">Bond</div>
                            <div className="flex items-center gap-1">
                                <Heart size={12} className="fill-rose-500 text-rose-500"/>
                                <span className="text-sm lg:text-lg font-black text-slate-800">{selectedMember?.affection}</span>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-50 last:border-0">
                            <div className="text-[9px] lg:text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">Stress</div>
                            <span className={`text-sm lg:text-lg font-black ${selectedMember?.stress > 80 ? 'text-rose-500' : 'text-slate-800'}`}>{selectedMember?.stress}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="text-[9px] lg:text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">Fatigue</div>
                            <span className={`text-sm lg:text-lg font-black ${selectedMember?.fatigue > 80 ? 'text-amber-500' : 'text-slate-800'}`}>{selectedMember?.fatigue}</span>
                        </div>
                    </div>
                </div>

                {/* 2. STATS GRID (DATA CENTRIC) - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12 pb-4">
                        {/* Column 1: Performance */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Activity size={14} className="text-slate-400"/>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Stage</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="乐感" value={selectedMember?.musicality} icon={Music} />
                                <StatRow label="技巧" value={selectedMember?.technique} icon={Guitar} />
                                <StatRow label="表现力" value={selectedMember?.stagePresence} icon={Star} />
                            </div>
                        </div>

                        {/* Column 2: Creative & Mind */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Brain size={14} className="text-slate-400"/>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mind & Style</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="想象力" value={selectedMember?.creativity} icon={Sparkles} />
                                <StatRow label="心态" value={selectedMember?.mental} icon={Smile} />
                                <StatRow label="视觉" value={selectedMember?.design} icon={Palette} />
                            </div>
                        </div>

                        {/* Column 3: Production */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Disc size={14} className="text-slate-400"/>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Studio Work</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="作曲" value={selectedMember?.composing} icon={PenTool} />
                                <StatRow label="作词" value={selectedMember?.lyrics} icon={FileText} />
                                <StatRow label="编曲" value={selectedMember?.arrangement} icon={Layers} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. INTERACTION FOOTER - Fixed/Bottom */}
                <div className="p-4 lg:p-6 bg-slate-50 border-t border-slate-200 shrink-0 z-10">
                    {/* Interaction Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-slate-400"/>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Energy</span>
                            {[1, 2].map(i => (
                                <div key={i} className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all ${selectedMember?.interactionsLeft >= i ? 'bg-slate-900' : 'bg-slate-200'}`}/>
                            ))}
                        </div>
                    </div>

                    {/* Result Overlay Inline */}
                    {engine.lastInteraction && (
                        <div className="mb-3 bg-white p-3 lg:p-4 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 flex items-start gap-3">
                            <div className={`p-1.5 lg:p-2 rounded-full shrink-0 ${engine.lastInteraction.result === ActionResult.GreatSuccess ? 'bg-amber-100 text-amber-500' : (engine.lastInteraction.result === ActionResult.Failure ? 'bg-slate-100 text-slate-400' : 'bg-rose-100 text-rose-500')}`}>
                                {engine.lastInteraction.result === ActionResult.GreatSuccess ? <Sparkles size={16}/> : (engine.lastInteraction.result === ActionResult.Failure ? <Frown size={16}/> : <Heart size={16}/>)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{engine.lastInteraction.result}</span>
                                    <button onClick={() => engine.setLastInteraction(null)} className="text-slate-400 hover:text-slate-600"><XIcon size={12}/></button>
                                </div>
                                <p className="text-xs lg:text-sm font-bold text-slate-800 leading-snug line-clamp-2">{engine.lastInteraction.log}</p>
                            </div>
                        </div>
                    )}

                    {/* Action Grid */}
                    <div className="grid grid-cols-5 gap-2 lg:gap-3">
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
