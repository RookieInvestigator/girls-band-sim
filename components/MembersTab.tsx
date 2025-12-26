
import React, { useState, useMemo } from 'react';
import { 
    Search, Heart, Music, Guitar, Star, Brain, PenTool, FileText, 
    Sparkles, Zap, Coffee, MessageCircle, Gift, AlertCircle, Lock,
    Activity, User, Crown, Terminal, Mic2, Disc, Keyboard,
    Palette, Layers, Smile, DoorOpen, Clapperboard, Trash2,
    Wind, Cloud, Slash, Megaphone, ArrowLeft, Music2, UserMinus
} from 'lucide-react';
import { Member, InteractionType, SelfActionType, ActionResult, Role } from '../types';
import { INTERACTION_DATA } from '../data/interactions';
import { MAX_MEMBERS } from '../constants';

// --- HELPER: RANK SYSTEM ---
const getRankConfig = (val: number) => {
    if (val >= 100) return { label: 'SS', color: 'text-amber-600', bg: 'bg-amber-100', bar: 'bg-amber-500' };
    if (val >= 90) return { label: 'S', color: 'text-rose-600', bg: 'bg-rose-100', bar: 'bg-rose-500' };
    if (val >= 80) return { label: 'A', color: 'text-pink-600', bg: 'bg-pink-100', bar: 'bg-pink-500' };
    if (val >= 70) return { label: 'B', color: 'text-indigo-600', bg: 'bg-indigo-100', bar: 'bg-indigo-500' };
    if (val >= 60) return { label: 'C', color: 'text-sky-600', bg: 'bg-sky-100', bar: 'bg-sky-500' };
    return { label: 'D', color: 'text-slate-400', bg: 'bg-slate-100', bar: 'bg-slate-300' };
};

const StatRow = ({ label, value, icon: Icon, showMax = false }: any) => {
    const rank = getRankConfig(value);
    const maxVal = showMax ? 100 : 120;
    const widthPct = Math.min(100, (value / maxVal) * 100);

    return (
        <div className="flex items-center gap-4 py-2 group w-full">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${rank.bg} ${rank.color} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                <div className="flex justify-between items-center leading-none">
                    <span className="text-xs font-bold text-slate-500">{label}</span>
                    <div className="relative flex items-center justify-end group/badge">
                        {/* Value Tooltip (Hidden by default, shown on hover) */}
                        <span className="absolute right-full mr-2 opacity-0 group-hover/badge:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded pointer-events-none tabular-nums shadow-sm z-10 whitespace-nowrap">
                            {Math.floor(value)}
                        </span>
                        
                        {/* Rank Badge */}
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded cursor-help ${rank.bg} ${rank.color}`}>
                            {rank.label}
                        </span>
                    </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ease-out ${rank.bar}`} style={{ width: `${widthPct}%` }}/>
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

// Comfortable Text-Only Button
const ActionTile = ({ label, cost, onClick, disabled, locked, isDanger }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled || locked}
        className={`
            relative flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200 w-full group
            ${locked 
                ? 'bg-slate-50 border-slate-100 text-slate-300' 
                : (disabled 
                    ? 'bg-white border-slate-100 text-slate-300 cursor-not-allowed opacity-60' 
                    : (isDanger 
                        ? 'bg-white border-rose-100 text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:shadow-sm'
                        : `bg-white border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-slate-600 hover:text-slate-900`)
                    )
            }
        `}
    >
        <span className="text-xs font-bold truncate mr-2">
            {locked ? <span className="flex items-center gap-1.5"><Lock size={12}/> ???</span> : label}
        </span>
        
        {!locked && !isDanger && (
            <span className={`text-[10px] font-black px-2 py-1 rounded-md ${cost > 0 ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-600'}`}>
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
        <div className="flex gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 justify-between items-center mt-auto">
            {rolesToCheck.map(role => {
                const count = members.filter(m => m.roles.includes(role)).length;
                let statusColor = 'bg-slate-200 text-slate-400';
                if (count === 0) statusColor = 'bg-rose-100 text-rose-500';
                else if (count === 1) statusColor = 'bg-emerald-100 text-emerald-600';
                else statusColor = 'bg-amber-100 text-amber-600';

                return (
                    <div key={role} className="flex flex-col items-center gap-1 w-full">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${statusColor}`}>
                            <RoleIcon role={role} size={12}/>
                        </div>
                        <span className="text-[10px] font-black text-slate-400">{count}</span>
                    </div>
                )
            })}
            <div className="flex flex-col items-center gap-1 w-full relative">
                <div className="absolute left-0 top-1 bottom-4 w-px bg-slate-200"></div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${specialCount > 0 ? 'bg-fuchsia-100 text-fuchsia-600' : 'bg-slate-200 text-slate-400'}`}>
                    <Sparkles size={12}/>
                </div>
                <span className="text-[10px] font-black text-slate-400">{specialCount}</span>
            </div>
        </div>
    );
};

export const MembersTab = ({ engine, showNeta }: { engine: any, showNeta: boolean }) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [showFireConfirm, setShowFireConfirm] = useState(false);
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false); 

    const selectedMember = useMemo(() => 
        engine.gameState.members.find((m: Member) => m.id === (selectedMemberId || 'leader')) || engine.gameState.members[0]
    , [engine.gameState.members, selectedMemberId]);

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
        setIsMobileDetailOpen(true); 
    };

    const handleBackToList = () => {
        setIsMobileDetailOpen(false);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in duration-500 pb-0 relative items-start h-full">
            
            {/* --- CUSTOM CONFIRM MODAL --- */}
            {showFireConfirm && (
                <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
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
            <div className={`
                w-full lg:w-72 shrink-0 flex-col bg-white rounded-[2rem] border border-slate-200 shadow-sm
                lg:sticky lg:top-0 lg:self-start
                ${isMobileDetailOpen ? 'hidden lg:flex' : 'flex'}
            `}>
                <div className="px-6 py-5 bg-white z-10 border-b border-slate-100 rounded-t-[2rem]">
                    <h3 className="font-black text-lg text-slate-900 tracking-tight flex justify-between items-center">
                        Members
                        <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">
                            {engine.gameState.members.length}/{MAX_MEMBERS}
                        </span>
                    </h3>
                </div>
                
                <div className="flex-1 p-3 space-y-2 bg-slate-50/50">
                    {engine.gameState.members.map((m: Member) => {
                        const isSelected = selectedMember?.id === m.id;
                        return (
                            <button 
                                key={m.id} 
                                onClick={() => handleMemberClick(m.id)} 
                                className={`
                                    w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group border
                                    ${isSelected 
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                                        : 'bg-white border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-900 hover:shadow-sm'}
                                `}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <div className="font-bold text-sm truncate">{getDisplayName(m)}</div>
                                        {m.isLeader && <Crown size={12} className="text-amber-400 fill-amber-400"/>}
                                    </div>
                                    <div className={`text-[10px] uppercase tracking-wider flex items-center gap-1 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                                        <RoleIcon role={m.roles[0]} size={12}/> {m.roles[0]}
                                    </div>
                                </div>
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

                <div className="px-3 pb-3 rounded-b-[2rem] bg-slate-50/50">
                    <RoleCompositionIndicator members={engine.gameState.members} />
                </div>
            </div>

            {/* --- RIGHT: DATA PANEL (MASTER-DETAIL) --- */}
            <div className={`
                flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex-col relative min-w-0 overflow-hidden
                ${isMobileDetailOpen ? 'flex' : 'hidden lg:flex'}
            `}>
                
                {/* 1. HEADER (Breathing Room) */}
                <div className="px-8 py-8 border-b border-slate-100 flex flex-col gap-6 bg-slate-50/30 relative shrink-0">
                    
                    {/* Mobile Nav */}
                    <div className="flex items-center justify-between lg:hidden mb-1">
                        <button onClick={handleBackToList} className="flex items-center gap-2 text-sm font-bold text-slate-500">
                            <ArrowLeft size={16}/> Back
                        </button>
                        {!selectedMember?.isLeader && (
                            <button onClick={() => setShowFireConfirm(true)} className="p-2 text-slate-400 hover:text-rose-500">
                                <Trash2 size={18}/>
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                        <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none truncate">
                                    {getDisplayName(selectedMember)}
                                </h2>
                                {selectedMember?.isLeader && (
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100">
                                        <Crown size={10} className="fill-amber-500"/> LEADER
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                                    <User size={12}/> {selectedMember?.roles.join('/')}
                                </span>
                                {selectedMember?.tags.map((t: string) => (
                                    <span key={t} className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                        #{t}
                                    </span>
                                ))}
                            </div>

                            <div className="text-sm text-slate-500 font-medium italic leading-relaxed line-clamp-2 max-w-2xl pt-1">
                                "{getDisplayDesc(selectedMember)}"
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {/* Vitals - Larger, Cleaner Card */}
                            <div className="flex items-center gap-6 shrink-0 bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm w-full lg:w-auto justify-around lg:justify-start">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-[9px] font-black uppercase text-rose-500 tracking-wider">Bond</div>
                                    <div className="flex items-center gap-1.5 text-xl font-black text-slate-800">
                                        <Heart size={16} className="fill-rose-500 text-rose-500"/>{selectedMember?.affection}
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-slate-100"/>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Stress</div>
                                    <span className={`text-xl font-black ${selectedMember?.stress > 80 ? 'text-rose-500' : 'text-slate-800'}`}>{selectedMember?.stress}</span>
                                </div>
                                <div className="w-px h-8 bg-slate-100"/>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Fatigue</div>
                                    <span className={`text-xl font-black ${selectedMember?.fatigue > 80 ? 'text-amber-500' : 'text-slate-800'}`}>{selectedMember?.fatigue}</span>
                                </div>
                            </div>

                            {/* Dismiss Button Moved Here */}
                            {!selectedMember?.isLeader && (
                                <button 
                                    onClick={() => setShowFireConfirm(true)}
                                    className="hidden lg:flex flex-col items-center justify-center w-20 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-300 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all gap-1"
                                    title="Dismiss"
                                >
                                    <UserMinus size={20}/>
                                    <span className="text-[8px] font-bold uppercase tracking-widest">Fire</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. STATS GRID (Spacious) */}
                <div className="p-8 relative bg-white flex-1 min-h-0 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                        {/* Live */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-50 mb-2">
                                <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                                    <Activity size={16}/>
                                </div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Live Performance</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="乐感" value={selectedMember?.musicality} icon={Music} />
                                <StatRow label="技巧" value={selectedMember?.technique} icon={Guitar} />
                                <StatRow label="表现" value={selectedMember?.stagePresence} icon={Star} />
                            </div>
                        </div>

                        {/* Mind */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-50 mb-2">
                                <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                                    <Brain size={16}/>
                                </div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Mind & Style</h4>
                            </div>
                            <div className="space-y-1">
                                <StatRow label="想象" value={selectedMember?.creativity} icon={Sparkles} />
                                <StatRow label="心态" value={selectedMember?.mental} icon={Smile} />
                                <StatRow label="视觉" value={selectedMember?.design} icon={Palette} />
                            </div>
                        </div>

                        {/* Studio */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-50 mb-2">
                                <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                                    <Disc size={16}/>
                                </div>
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

                {/* 3. INTERACTION FOOTER (Action Tiles) */}
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Zap size={16} className="text-slate-400"/>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Interactions</span>
                        </div>
                        
                        {/* Energy Dots */}
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Energy</span>
                            <div className="flex gap-1">
                                {[1, 2].map(i => (
                                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${selectedMember?.interactionsLeft >= i ? 'bg-slate-900' : 'bg-slate-200'}`}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Result Log */}
                    {engine.lastInteraction && (
                        <div className="mb-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3 animate-in slide-in-from-bottom-2">
                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${engine.lastInteraction.result === ActionResult.GreatSuccess ? 'bg-amber-500' : (engine.lastInteraction.result === ActionResult.Failure ? 'bg-slate-400' : 'bg-rose-500')}`}/>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-700 leading-snug">{engine.lastInteraction.log}</p>
                            </div>
                            <button onClick={() => engine.setLastInteraction(null)} className="text-slate-300 hover:text-slate-500 p-1"><XIcon size={14}/></button>
                        </div>
                    )}

                    {/* Comfortable Button Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {selectedMember?.isLeader ? (
                            Object.values(SelfActionType).map((t) => (
                                <ActionTile 
                                    key={t}
                                    label={t}
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
                                    <ActionTile 
                                        key={t}
                                        label={t}
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
