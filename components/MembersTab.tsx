
import React, { useState, useMemo, useRef } from 'react';
import { 
    Search, Heart, Music, Guitar, Star, Brain, PenTool, FileText, 
    Sparkles, Zap, Clapperboard, Lock, Mic2, Disc, Keyboard,
    Palette, Layers, Smile, DoorOpen, Trash2,
    Wind, Cloud, Slash, Megaphone, ArrowLeft, Music2, UserMinus, User,
    Crown, Activity, Camera, Upload
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
                    <div className="flex items-center gap-2">
                        {/* Value restored for mobile accessibility, subtle style */}
                        <span className="text-[10px] font-bold text-slate-300 tabular-nums">
                            {Math.floor(value)}
                        </span>
                        {/* Rank Badge */}
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${rank.bg} ${rank.color}`}>
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

// --- NEW COMPONENT: VITAL CARD ---
const VitalCard = ({ label, value, icon: Icon, color, max = 100 }: any) => {
    const pct = Math.min(100, (value / max) * 100);
    
    // Color schemes
    const schemes: Record<string, any> = {
        rose: { bg: 'bg-rose-50', text: 'text-rose-600', bar: 'bg-rose-500', border: 'border-rose-100' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', bar: 'bg-indigo-500', border: 'border-indigo-100' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600', bar: 'bg-amber-500', border: 'border-amber-100' }
    };
    const s = schemes[color] || schemes.rose;

    return (
        <div className={`flex flex-col gap-1.5 p-2.5 rounded-2xl border ${s.bg} ${s.border} w-full`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                    <Icon size={12} className={s.text}/>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${s.text} opacity-80`}>{label}</span>
                </div>
                <span className={`text-xs font-black ${s.text}`}>{value}</span>
            </div>
            <div className="h-1.5 w-full bg-white/60 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${s.bar}`} style={{width: `${pct}%`}}/>
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
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        // Scroll to top of window to ensure visibility on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToList = () => {
        setIsMobileDetailOpen(false);
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && selectedMember) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    engine.updateMemberAvatar(selectedMember.id, reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    // Important: Removed 'h-full' and 'overflow-hidden' from containers to allow natural scrolling on mobile
    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in duration-500 pb-0 relative items-start">
            
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
                                <div className="relative">
                                    {m.avatarUrl ? (
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                                            <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm bg-white/10 text-current border border-white/10`}>
                                            {m.name[0]}
                                        </div>
                                    )}
                                    {m.isLeader && <div className="absolute -top-1 -right-1 text-amber-400"><Crown size={12} fill="currentColor"/></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{getDisplayName(m)}</div>
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
            {/* Removed internal scrolling constraints to allow page scroll */}
            <div className={`
                flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex-col relative
                ${isMobileDetailOpen ? 'flex' : 'hidden lg:flex'}
            `}>
                
                {/* 1. HEADER (Redesigned) */}
                <div className="p-6 md:p-8 pb-0 flex flex-col gap-6 relative shrink-0">
                    
                    {/* Top Controls (Back Only on Mobile) */}
                    <div className="flex items-center justify-between mb-2 lg:hidden">
                        <button onClick={handleBackToList} className="flex items-center gap-2 text-sm font-bold text-slate-500">
                            <ArrowLeft size={16}/> Back
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                        {/* Avatar Section */}
                        <div 
                            className="relative group shrink-0 cursor-pointer w-32 h-32 md:w-36 md:h-36 mx-auto md:mx-0"
                            onClick={triggerUpload}
                        >
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                            <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative ring-1 ring-slate-100">
                                {selectedMember?.avatarUrl ? (
                                    <img src={selectedMember.avatarUrl} alt={selectedMember.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                                        <span className="text-5xl font-black opacity-20">{selectedMember?.name[0]}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]">
                                    <Camera size={24}/>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 flex flex-col justify-center text-center md:text-left w-full relative">
                            
                            {/* Name Row */}
                            <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-3 mb-2 justify-center md:justify-start">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                                    {getDisplayName(selectedMember)}
                                </h2>
                                {selectedMember?.isLeader && (
                                    <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-amber-200">
                                        Leader
                                    </span>
                                )}
                            </div>

                            {/* Tags & Role Row */}
                            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start items-center">
                                {/* Role Pill */}
                                <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                                    <RoleIcon role={selectedMember?.roles[0]} size={10}/>
                                    {selectedMember?.roles.join(' / ')}
                                </span>

                                {/* Other Tags */}
                                {selectedMember?.tags.map((t: string) => (
                                    <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                                        #{t}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 max-w-xl mx-auto md:mx-0 mb-4">
                                "{getDisplayDesc(selectedMember)}"
                            </div>

                            {/* Vitals Row - Visually Enhanced Cards */}
                            <div className="grid grid-cols-3 gap-3 w-full max-w-md mx-auto md:mx-0 mb-2">
                                <VitalCard label="羁绊" value={selectedMember?.affection} icon={Heart} color="rose" max={120} />
                                <VitalCard label="压力" value={selectedMember?.stress} icon={Activity} color="indigo" />
                                <VitalCard label="疲劳" value={selectedMember?.fatigue} icon={Zap} color="amber" />
                            </div>

                            {/* Dismiss Button - Weakened & Moved to Bottom Right of Header */}
                            {!selectedMember?.isLeader && (
                                <div className="absolute right-0 bottom-0 hidden md:block">
                                    <button 
                                        onClick={() => setShowFireConfirm(true)}
                                        className="text-[10px] font-bold text-slate-300 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-rose-50"
                                        title="解雇成员"
                                    >
                                        <UserMinus size={12}/> 解雇
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. STATS GRID (Spacious) - Removed internal scroll */}
                <div className="p-6 md:p-8 bg-white relative">
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
                <div className="px-6 md:px-8 py-6 bg-slate-50 border-t border-slate-200 shrink-0 rounded-b-[2.5rem]">
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
