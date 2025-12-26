
import React, { useState, useMemo, useRef } from 'react';
import { 
    Search, Heart, Music, Guitar, Star, Brain, PenTool, FileText, 
    Sparkles, Zap, Clapperboard, Lock, Mic2, Disc, Keyboard,
    Palette, Layers, Smile, DoorOpen, Trash2,
    Wind, Cloud, Slash, Megaphone, ArrowLeft, User,
    Crown, Activity, Battery, Camera
} from 'lucide-react';
import { Member, InteractionType, SelfActionType, ActionResult, Role } from '../types';
import { INTERACTION_DATA } from '../data/interactions';
import { MAX_MEMBERS } from '../constants';
import { StatBar } from './Shared';

const RoleIcon = ({ role, size=16, className="" }: { role: Role, size?: number, className?: string }) => {
    const iconProps = { size, className };
    switch(role) {
        case Role.Vocal: return <Mic2 {...iconProps}/>;
        case Role.Guitar: return <Guitar {...iconProps}/>;
        case Role.Bass: return <Zap {...iconProps}/>;
        case Role.Drums: return <Disc {...iconProps}/>;
        case Role.Keyboard: return <Keyboard {...iconProps}/>;
        case Role.Producer: return <Clapperboard {...iconProps}/>;
        case Role.Accordion: return <Wind {...iconProps}/>;
        case Role.Harp: return <Cloud {...iconProps}/>;
        case Role.Shamisen: return <Slash {...iconProps}/>;
        case Role.Rapper: return <Megaphone {...iconProps}/>;
        default: return <Music {...iconProps}/>;
    }
}

const VitalItem = ({ icon: Icon, label, value, color, max = 100 }: any) => (
    <div className="flex items-center gap-3 bg-slate-50/80 px-4 py-3 rounded-2xl border border-slate-100 flex-1 min-w-[110px]">
        <div className={`p-2 rounded-full ${color} bg-opacity-20 text-${color.split('-')[1]}-600`}>
            <Icon size={16} />
        </div>
        <div className="flex flex-col">
            <div className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">{label}</div>
            <div className={`text-lg font-black leading-none ${value > 80 && label !== '羁绊' ? 'text-rose-500' : 'text-slate-800'}`}>
                {value}<span className="text-[10px] text-slate-300 font-normal ml-0.5">/{max}</span>
            </div>
        </div>
    </div>
);

const ActionTile = ({ label, cost, onClick, disabled, locked, isDanger }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled || locked}
        className={`
            relative flex flex-col justify-center items-center p-3 rounded-2xl transition-all duration-200 w-full min-h-[90px] text-center border border-slate-100 active:scale-95
            ${locked 
                ? 'bg-slate-50 text-slate-300' 
                : (disabled 
                    ? 'bg-white text-slate-300 cursor-not-allowed opacity-60' 
                    : (isDanger 
                        ? 'bg-white border-2 border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-transparent'
                        : `bg-white shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-slate-900 hover:text-white group`)
                    )
            }
        `}
    >
        <span className="text-xs font-black tracking-wider leading-tight line-clamp-2 mb-1.5">
            {locked ? <span className="flex items-center justify-center gap-1"><Lock size={12}/> ???</span> : label}
        </span>
        
        {!locked && !isDanger && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cost > 0 ? 'bg-slate-100 text-slate-500 group-hover:bg-white/20 group-hover:text-white' : 'text-emerald-500 bg-emerald-50 group-hover:bg-white/20 group-hover:text-white'}`}>
                {cost > 0 ? `¥${cost}` : 'Free'}
            </span>
        )}
    </button>
);

export const MembersTab = ({ engine, showNeta }: { engine: any, showNeta: boolean }) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [showFireConfirm, setShowFireConfirm] = useState(false);
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false); 
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectedMember = useMemo(() => 
        engine.gameState.members.find((m: Member) => m.id === (selectedMemberId || 'leader')) || engine.gameState.members[0]
    , [engine.gameState.members, selectedMemberId]);

    const getDisplayName = (m: Member) => (showNeta && m.netaName) ? m.netaName : m.name;
    const getDisplayDesc = (m: Member) => (showNeta && m.netaDesc) ? m.netaDesc : m.personality;

    const handleMemberClick = (id: string) => {
        setSelectedMemberId(id);
        engine.setLastInteraction(null);
        setIsMobileDetailOpen(true); 
    };

    const handleBackToList = () => {
        setIsMobileDetailOpen(false);
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && selectedMember) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const updatedMembers = engine.gameState.members.map((m: Member) => 
                    m.id === selectedMember.id ? { ...m, customAvatar: base64String } : m
                );
                engine.setGameState({ ...engine.gameState, members: updatedMembers });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] items-start font-sans">
            
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

            {/* --- CUSTOM CONFIRM MODAL --- */}
            {showFireConfirm && (
                <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center">
                        <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DoorOpen size={24}/>
                        </div>
                        <h3 className="font-black text-xl text-slate-900 mb-2">解雇确认</h3>
                        <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed">
                            确定要让 <span className="text-slate-900 bg-slate-100 px-1 rounded">{getDisplayName(selectedMember)}</span> 离开吗？
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowFireConfirm(false)} className="flex-1 py-3 bg-slate-100 font-black rounded-xl text-slate-600 uppercase tracking-widest text-[10px]">取消</button>
                            <button onClick={() => { engine.fireMember(selectedMember); setShowFireConfirm(false); setSelectedMemberId('leader'); setIsMobileDetailOpen(false); }} className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 font-black rounded-xl text-white uppercase tracking-widest text-[10px] shadow-lg shadow-rose-200">确定</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- LEFT: ROSTER LIST (Scrollable) --- */}
            <div className={`w-full lg:w-72 shrink-0 flex flex-col gap-3 h-full overflow-y-auto pr-1 scrollbar-hide pb-20 lg:pb-0 ${isMobileDetailOpen ? 'hidden lg:flex' : 'flex'}`}>
                <div className="flex justify-between items-end px-2 pt-1 shrink-0">
                    <h3 className="font-black text-2xl text-slate-900 tracking-tighter italic uppercase">名册</h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-lg border border-slate-100">
                        {engine.gameState.members.length} / {MAX_MEMBERS}
                    </span>
                </div>
                
                <div className="flex flex-col gap-2.5">
                    {engine.gameState.members.map((m: Member) => {
                        const isSelected = selectedMember?.id === m.id;
                        return (
                            <button 
                                key={m.id} 
                                onClick={() => handleMemberClick(m.id)} 
                                className={`
                                    w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group relative overflow-hidden active:scale-95
                                    ${isSelected 
                                        ? 'bg-slate-900 text-white shadow-lg z-10' 
                                        : 'bg-white text-slate-500 hover:bg-slate-50 hover:shadow-md'}
                                `}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-black text-sm shadow-sm overflow-hidden ${isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {m.customAvatar ? (
                                        <img src={m.customAvatar} alt="avatar" className="w-full h-full object-cover"/>
                                    ) : (
                                        <RoleIcon role={m.roles[0]} size={18}/>
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <div className={`font-black text-xs truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>{getDisplayName(m)}</div>
                                        {m.isLeader && <Crown size={12} className="text-amber-400 fill-amber-400 shrink-0"/>}
                                    </div>
                                    <div className="flex gap-2 text-[9px] uppercase font-bold tracking-wider opacity-70">
                                        <span>{m.roles.join('/')}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 items-end">
                                    <div className="flex gap-0.5">
                                        {[1,2].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${m.interactionsLeft >= i ? (isSelected ? 'bg-rose-500' : 'bg-slate-700') : 'bg-slate-200'}`}/>)}
                                    </div>
                                    {m.stress > 80 && <div className="w-1.5 h-1.5 rounded-full bg-rose-500"/>}
                                </div>
                            </button>
                        )
                    })}
                    
                    <button 
                        onClick={() => engine.setShowScoutModal(true)} 
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-dashed border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors font-bold text-[10px] uppercase tracking-widest active:scale-95"
                    >
                        <Search size={12}/> 招募海报
                    </button>
                </div>
            </div>

            {/* --- RIGHT: PROFILE (Scrollable Container) --- */}
            <div className={`flex-1 w-full h-full bg-white rounded-[2.5rem] shadow-sm relative overflow-hidden flex flex-col border border-slate-200 ${isMobileDetailOpen ? 'flex' : 'hidden lg:flex'}`}>
                
                {/* --- MAIN SCROLL AREA --- */}
                <div className="h-full overflow-y-auto scrollbar-hide p-6 md:p-8">
                    
                    {/* 1. Header Section */}
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-8 relative z-10">
                        <div className="lg:hidden w-full flex justify-between items-center mb-2">
                            <button onClick={handleBackToList} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
                                <ArrowLeft size={12}/> 名册
                            </button>
                        </div>

                        {/* Avatar */}
                        <div 
                            onClick={handleAvatarClick}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-inner relative overflow-hidden group shrink-0 cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            {selectedMember?.customAvatar ? (
                                <img src={selectedMember.customAvatar} alt="avatar" className="w-full h-full object-cover"/>
                            ) : (
                                <RoleIcon role={selectedMember?.roles[0]} size={48} className="text-slate-400"/>
                            )}
                            
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera size={24} className="text-white"/>
                            </div>

                            {selectedMember?.isLeader && (
                                <div className="absolute bottom-0 w-full bg-amber-400 text-white text-[10px] font-black text-center py-1 uppercase tracking-widest">Leader</div>
                            )}
                        </div>

                        {/* Info Block */}
                        <div className="flex-1 min-w-0 pt-1">
                            <div className="flex justify-between items-start">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none italic uppercase mb-2 truncate pr-2">
                                    {getDisplayName(selectedMember)}
                                </h2>
                                {!selectedMember?.isLeader && (
                                    <button 
                                        onClick={() => setShowFireConfirm(true)} 
                                        className="hidden lg:block p-2 text-slate-200 hover:text-rose-500 transition-colors hover:bg-rose-50 rounded-full"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {selectedMember?.roles.map(r => (
                                    <span key={r} className="px-2 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider shadow-sm transform -skew-x-12">
                                        {r}
                                    </span>
                                ))}
                                {selectedMember?.tags.map(t => (
                                    <span key={t} className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200 transform -skew-x-12">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-xl italic border-l-2 border-rose-300 pl-3">
                                "{getDisplayDesc(selectedMember)}"
                            </p>
                        </div>
                    </div>

                    {/* Vitals Row */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <VitalItem icon={Heart} label="羁绊" value={selectedMember?.affection} color="bg-rose-100" />
                        <VitalItem icon={Activity} label="压力" value={selectedMember?.stress} color="bg-slate-200" />
                        <VitalItem icon={Battery} label="疲劳" value={selectedMember?.fatigue} color="bg-amber-100" />
                        
                        <div className="flex flex-col items-end justify-center px-4 ml-auto">
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Energy</span>
                             <div className="flex gap-1">
                                {[1, 2].map(i => (
                                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${selectedMember?.interactionsLeft >= i ? 'bg-slate-900' : 'bg-slate-200'}`}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-slate-100 mb-8"/>

                    {/* 2. Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 mb-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"/>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">STAGE</h4>
                            </div>
                            <StatBar label="乐感" value={selectedMember?.musicality} icon={Music} color="bg-indigo-500"/>
                            <StatBar label="技巧" value={selectedMember?.technique} icon={Guitar} color="bg-blue-500"/>
                            <StatBar label="表现" value={selectedMember?.stagePresence} icon={Star} color="bg-sky-500"/>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"/>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">MENTAL</h4>
                            </div>
                            <StatBar label="想象" value={selectedMember?.creativity} icon={Sparkles} color="bg-purple-500"/>
                            <StatBar label="心态" value={selectedMember?.mental} icon={Smile} color="bg-fuchsia-500"/>
                            <StatBar label="视觉" value={selectedMember?.design} icon={Palette} color="bg-pink-500"/>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"/>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">CREATE</h4>
                            </div>
                            <StatBar label="作曲" value={selectedMember?.composing} icon={PenTool} color="bg-amber-500"/>
                            <StatBar label="作词" value={selectedMember?.lyrics} icon={FileText} color="bg-orange-500"/>
                            <StatBar label="编曲" value={selectedMember?.arrangement} icon={Layers} color="bg-yellow-500"/>
                        </div>
                    </div>

                    {/* 3. Interaction Section (In-flow) */}
                    <div className="bg-slate-50/50 rounded-[2.5rem] p-6 md:p-8 border border-slate-100">
                        
                        <div className="flex items-center gap-2 mb-4">
                            <Zap size={16} className="text-amber-500 fill-amber-500"/>
                            <span className="font-black text-xs uppercase tracking-widest text-slate-900">Interactions</span>
                        </div>

                        {/* Feedback Log (Inline) */}
                        {engine.lastInteraction && (
                            <div className="mb-4 bg-slate-800 text-white p-4 rounded-xl shadow-lg flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full shrink-0 ${engine.lastInteraction.result === ActionResult.GreatSuccess ? 'bg-amber-400' : (engine.lastInteraction.result === ActionResult.Failure ? 'bg-slate-500' : 'bg-rose-400')}`}/>
                                <div className="flex-1">
                                    <p className="text-xs font-bold leading-relaxed">{engine.lastInteraction.log}</p>
                                </div>
                                <button onClick={() => engine.setLastInteraction(null)} className="text-slate-400 hover:text-white transition-colors"><XIcon size={14}/></button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
        </div>
    );
};

const XIcon = ({size}:{size:number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
)
