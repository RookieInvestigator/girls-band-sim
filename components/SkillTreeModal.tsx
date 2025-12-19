
import React from 'react';
import { X, Heart, Star, Lock, Check, Zap, Book, Sparkles, Briefcase, Flame } from 'lucide-react';
import { SKILL_TREE } from '../data/skills';

export const SkillTreeModal = ({ engine }: { engine: any }) => {
    const { gameState, unlockSkill } = engine;

    const COLUMNS = [
        { 
            id: 'friendship', label: 'KIZUNA', sub: '羁绊·心态', icon: Heart, 
            color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', 
            node: 'bg-rose-500', ring: 'ring-rose-100',
            trackBg: 'bg-rose-50/20' 
        },
        { 
            id: 'passion', label: 'KIRAMEKI', sub: '闪耀·魅力', icon: Flame, 
            color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', 
            node: 'bg-amber-500', ring: 'ring-amber-100',
            trackBg: 'bg-amber-50/20' 
        },
        { 
            id: 'technique', label: 'OTO', sub: '技艺·实力', icon: Star, 
            color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-200', 
            node: 'bg-sky-500', ring: 'ring-sky-100',
            trackBg: 'bg-sky-50/20' 
        },
        { 
            id: 'commercial', label: 'PRODUCE', sub: '运营·策略', icon: Briefcase, 
            color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', 
            node: 'bg-slate-500', ring: 'ring-slate-100',
            trackBg: 'bg-slate-50/20' 
        },
    ];

    const getSkillsForCategory = (cat: string) => {
        return SKILL_TREE.filter(s => s.category === cat);
    };

    // Configuration for 8 Rows
    const COL_WIDTH = 190; 
    const ROW_HEIGHT = 90; // Slightly reduced to fit more
    const CARD_WIDTH = 160; 
    const CARD_HEIGHT = 50; 
    const START_Y = 30;
    const TRACK_HEIGHT = START_Y + (8 * ROW_HEIGHT); // Dynamic based on rows

    // Helper to calculate coordinates
    const getPos = (node: any) => {
        const xOffset = 0; 
        const left = (COL_WIDTH / 2) + xOffset - (CARD_WIDTH / 2); 
        const top = START_Y + (node.y * ROW_HEIGHT);
        return { left, top, centerX: (COL_WIDTH / 2) + xOffset, centerY: top + (CARD_HEIGHT / 2) };
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[120] flex items-center justify-center p-4 animate-in fade-in duration-300 font-sans">
            <div className="bg-slate-50 rounded-[2.5rem] w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative overflow-hidden ring-4 ring-white/10">
                
                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-200 flex justify-between items-center bg-white z-30 shrink-0 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                            <Book size={18}/>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">队长手账</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
                                    Band Strategy
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">可用点数 (PP)</span>
                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600 leading-none filter drop-shadow-sm">
                                {gameState.skillPoints}
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-200"/>
                        <button 
                            onClick={() => engine.setShowSkillTree(false)} 
                            className="p-2 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-500 text-slate-400 transition-colors"
                        >
                            <X size={20}/>
                        </button>
                    </div>
                </div>

                {/* Main Scrollable Content */}
                <div className="flex-1 overflow-auto bg-[#F8FAFC] relative custom-scrollbar">
                    {/* Technical Grid Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                         style={{
                             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                             backgroundSize: '20px 20px',
                             height: '200%' // Extend for scrolling
                         }}
                    />

                    {/* Centered Container */}
                    <div className="w-full flex justify-center p-6 pb-20 min-w-max">
                        <div className="flex gap-4">
                            {COLUMNS.map(col => {
                                const skills = getSkillsForCategory(col.id);
                                
                                return (
                                    <div key={col.id} className="flex flex-col shrink-0">
                                        
                                        {/* Column Header */}
                                        <div className={`w-[190px] py-3 rounded-t-2xl border-x border-t ${col.border} bg-white flex flex-col items-center justify-center relative z-10 shadow-sm border-b border-b-slate-100 sticky top-0`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <col.icon size={14} className={col.color}/>
                                                <span className="font-black text-sm text-slate-800 tracking-tight">{col.label}</span>
                                            </div>
                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-full">{col.sub}</div>
                                        </div>

                                        {/* Track Container */}
                                        <div 
                                            className={`w-[190px] bg-white rounded-b-2xl border-x border-b ${col.border} shadow-sm relative overflow-hidden`}
                                            style={{ height: TRACK_HEIGHT }}
                                        >
                                            <div className={`absolute inset-0 ${col.trackBg}`}/>
                                            
                                            {/* Tree Area */}
                                            <div className="relative w-full h-full">
                                                
                                                {/* Lines Layer */}
                                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                                    {skills.map(node => node.parents.map(parentId => {
                                                        const parent = skills.find(s => s.id === parentId);
                                                        if (!parent) return null;
                                                        
                                                        const pPos = getPos(parent);
                                                        const nPos = getPos(node);
                                                        
                                                        const isUnlocked = gameState.unlockedSkills.includes(node.id) && gameState.unlockedSkills.includes(parent.id);
                                                        
                                                        return (
                                                            <path 
                                                                key={`${parent.id}-${node.id}`}
                                                                d={`M ${pPos.centerX} ${pPos.centerY + CARD_HEIGHT/2} L ${nPos.centerX} ${nPos.centerY - CARD_HEIGHT/2}`}
                                                                stroke={isUnlocked ? (col.id === 'friendship' ? '#fda4af' : (col.id === 'passion' ? '#fcd34d' : (col.id === 'technique' ? '#7dd3fc' : '#cbd5e1'))) : "#e2e8f0"}
                                                                strokeWidth={isUnlocked ? "3" : "2"}
                                                                strokeDasharray={isUnlocked ? "0" : "4 4"}
                                                                className="transition-all duration-500"
                                                            />
                                                        );
                                                    }))}
                                                </svg>

                                                {/* Nodes Layer */}
                                                {skills.map(node => {
                                                    const { left, top } = getPos(node);
                                                    const isUnlocked = gameState.unlockedSkills.includes(node.id);
                                                    const parentsUnlocked = node.parents.length === 0 || node.parents.every(pid => gameState.unlockedSkills.includes(pid));
                                                    const canUnlock = !isUnlocked && parentsUnlocked && gameState.skillPoints >= node.cost;
                                                    const isLocked = !isUnlocked && !canUnlock;

                                                    return (
                                                        <div 
                                                            key={node.id}
                                                            className="absolute z-10 group perspective"
                                                            style={{ left, top, width: CARD_WIDTH, height: CARD_HEIGHT }}
                                                        >
                                                            <button
                                                                onClick={() => canUnlock && unlockSkill(node.id)}
                                                                disabled={!canUnlock && !isUnlocked}
                                                                className={`
                                                                    w-full h-full rounded-lg flex items-center px-2.5 gap-2.5 transition-all duration-200 relative border-2 text-left shadow-[0_2px_4px_rgba(0,0,0,0.02)]
                                                                    ${isUnlocked 
                                                                        ? 'bg-white border-slate-200' 
                                                                        : (canUnlock 
                                                                            ? `bg-white border-${col.color.split('-')[1]}-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${col.ring} ring-2 ring-offset-1` 
                                                                            : 'bg-slate-50 border-slate-100 opacity-60 grayscale'
                                                                          )
                                                                    }
                                                                `}
                                                            >
                                                                {/* Compact Icon */}
                                                                <div className={`
                                                                    w-6 h-6 rounded flex items-center justify-center shrink-0 transition-colors
                                                                    ${isUnlocked ? `${col.node} text-white shadow-sm` : 'bg-slate-200 text-slate-400'}
                                                                `}>
                                                                    {isUnlocked ? <Check size={12} strokeWidth={4}/> : (isLocked ? <Lock size={10}/> : <col.icon size={12}/>)}
                                                                </div>

                                                                {/* Compact Info */}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className={`font-black text-[10px] truncate leading-tight ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                                                                        {node.name}
                                                                    </div>
                                                                </div>

                                                                {/* Cost Badge */}
                                                                {!isUnlocked && (
                                                                    <div className={`px-1 py-0.5 rounded text-[7px] font-black border ${canUnlock ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                                                                        {node.cost}p
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Unlocked Sparkle */}
                                                                {isUnlocked && <Sparkles size={12} className="text-yellow-400 absolute -top-1.5 -right-1.5 animate-pulse filter drop-shadow-sm"/>}
                                                            </button>

                                                            {/* Hover Tooltip - Improved Z-index and Positioning */}
                                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[100] transform scale-95 group-hover:scale-100 origin-bottom">
                                                                <div className="bg-slate-800 text-white p-3 rounded-xl shadow-xl border border-slate-700 relative">
                                                                    <div className="font-bold text-[10px] text-slate-300 uppercase mb-1 tracking-wider border-b border-slate-700 pb-1">{node.name}</div>
                                                                    <div className="text-[10px] font-medium leading-relaxed text-slate-100">
                                                                        {node.description}
                                                                    </div>
                                                                    {/* Arrow */}
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
