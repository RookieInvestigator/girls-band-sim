
import React, { useState } from 'react';
import { X, Heart, Star, Lock, Check, Book, Sparkles, Briefcase, Flame, ArrowUp, Map, ArrowDown, Zap } from 'lucide-react';
import { SKILL_TREE } from '../data/skills';

export const SkillTreeModal = ({ engine }: { engine: any }) => {
    const { gameState, unlockSkill } = engine;
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const COLUMNS = [
        { 
            id: 'friendship', label: 'KIZUNA', sub: '羁绊·心态', icon: Heart, 
            color: 'text-rose-600', border: 'border-rose-200', bg: 'bg-rose-50',
            barColor: 'bg-rose-500',
            nodeLocked: 'bg-white border-slate-200 text-slate-300',
            nodeUnlockable: 'bg-white border-rose-400 text-rose-600 ring-2 ring-rose-100',
            nodeUnlocked: 'bg-rose-500 border-rose-500 text-white shadow-rose-200',
            lineActive: '#f43f5e', lineInactive: '#e2e8f0'
        },
        { 
            id: 'passion', label: 'KIRAMEKI', sub: '闪耀·魅力', icon: Flame, 
            color: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50',
            barColor: 'bg-amber-500',
            nodeLocked: 'bg-white border-slate-200 text-slate-300',
            nodeUnlockable: 'bg-white border-amber-400 text-amber-600 ring-2 ring-amber-100',
            nodeUnlocked: 'bg-amber-500 border-amber-500 text-white shadow-amber-200',
            lineActive: '#f59e0b', lineInactive: '#e2e8f0'
        },
        { 
            id: 'technique', label: 'OTO', sub: '技艺·实力', icon: Star, 
            color: 'text-sky-600', border: 'border-sky-200', bg: 'bg-sky-50',
            barColor: 'bg-sky-500',
            nodeLocked: 'bg-white border-slate-200 text-slate-300',
            nodeUnlockable: 'bg-white border-sky-400 text-sky-600 ring-2 ring-sky-100',
            nodeUnlocked: 'bg-sky-500 border-sky-500 text-white shadow-sky-200',
            lineActive: '#0ea5e9', lineInactive: '#e2e8f0'
        },
        { 
            id: 'commercial', label: 'PRODUCE', sub: '运营·策略', icon: Briefcase, 
            color: 'text-slate-600', border: 'border-slate-200', bg: 'bg-slate-50',
            barColor: 'bg-slate-600',
            nodeLocked: 'bg-white border-slate-200 text-slate-300',
            nodeUnlockable: 'bg-white border-slate-400 text-slate-600 ring-2 ring-slate-100',
            nodeUnlocked: 'bg-slate-700 border-slate-700 text-white shadow-slate-200',
            lineActive: '#475569', lineInactive: '#e2e8f0'
        },
    ];

    const getSkillsForCategory = (cat: string) => {
        return SKILL_TREE.filter(s => s.category === cat);
    };

    const selectedNode = selectedNodeId ? SKILL_TREE.find(s => s.id === selectedNodeId) : null;
    const selectedColumn = selectedNode ? COLUMNS.find(c => c.id === selectedNode.category) : null;

    // Compact Dimensions
    const ROW_HEIGHT = 70; // Even tighter vertical spacing
    const CARD_HEIGHT = 46; 
    const START_Y = 20; 
    const maxDepth = Math.max(...SKILL_TREE.map(n => n.y));
    const TRACK_HEIGHT = START_Y + ((maxDepth + 1) * ROW_HEIGHT) + 20; 

    // Helper to position nodes relatively within their column container
    const getRelativePos = (node: any) => {
        const top = START_Y + (node.y * ROW_HEIGHT);
        return { top, height: CARD_HEIGHT };
    };

    const handleUnlock = () => {
        if (selectedNode) {
            unlockSkill(selectedNode.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4 animate-in fade-in duration-300 font-sans">
            <div className="bg-white rounded-[2rem] w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative overflow-hidden ring-1 ring-white/20">
                
                {/* Compact Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-20 shrink-0 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200">
                            <Book size={18}/>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">队长手记</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Captain's Strategy Log</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available PP</span>
                            <span className="text-xl font-black text-rose-500 leading-none">{gameState.skillPoints}</span>
                        </div>
                        <button 
                            onClick={() => engine.setShowSkillTree(false)} 
                            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X size={20}/>
                        </button>
                    </div>
                </div>

                {/* Main Content Area - Responsive Grid */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50 relative custom-scrollbar">
                    {/* Grid Background Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                         style={{
                             backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
                             backgroundSize: '24px 24px'
                         }}
                    />

                    <div className="max-w-6xl mx-auto p-4 md:p-8 pb-32">
                        {/* 
                            Grid Layout:
                            - Mobile: 1 column
                            - Tablet: 2 columns
                            - Desktop: 4 columns
                            This ensures NO horizontal scrollbar is needed on desktop.
                        */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {COLUMNS.map(col => {
                                const skills = getSkillsForCategory(col.id);
                                
                                return (
                                    <div key={col.id} className="flex flex-col relative group">
                                        
                                        {/* Column Header */}
                                        <div className="flex items-center gap-3 mb-6 sticky top-0 z-20 py-3 bg-slate-50/95 backdrop-blur-sm rounded-xl border border-slate-100 px-4 shadow-sm">
                                            <div className={`w-8 h-8 rounded-lg ${col.bg} ${col.color} flex items-center justify-center shrink-0`}>
                                                <col.icon size={16}/>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-sm text-slate-800 uppercase tracking-tight leading-none mb-0.5">{col.label}</span>
                                                <span className="text-[9px] font-bold text-slate-400">{col.sub}</span>
                                            </div>
                                        </div>

                                        {/* Vertical Track Line */}
                                        <div className="absolute top-16 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-slate-200/50 -z-10"/>

                                        {/* Nodes Container */}
                                        <div className="relative w-full" style={{ height: TRACK_HEIGHT }}>
                                            {/* Connector Lines Layer */}
                                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                                                {skills.map(node => node.parents.map(parentId => {
                                                    const parent = skills.find(s => s.id === parentId);
                                                    if (!parent) return null;
                                                    
                                                    const pPos = getRelativePos(parent);
                                                    const nPos = getRelativePos(node);
                                                    
                                                    const isUnlocked = gameState.unlockedSkills.includes(node.id) && gameState.unlockedSkills.includes(parent.id);
                                                    
                                                    return (
                                                        <line 
                                                            key={`${parent.id}-${node.id}`}
                                                            x1="50%" y1={pPos.top + CARD_HEIGHT}
                                                            x2="50%" y2={nPos.top}
                                                            stroke={isUnlocked ? col.lineActive : col.lineInactive}
                                                            strokeWidth={isUnlocked ? 2 : 1} // Thinner lines
                                                            strokeLinecap="round"
                                                            strokeDasharray={isUnlocked ? "" : "3 3"}
                                                        />
                                                    );
                                                }))}
                                            </svg>

                                            {/* Cards Layer */}
                                            {skills.map(node => {
                                                const { top, height } = getRelativePos(node);
                                                const isUnlocked = gameState.unlockedSkills.includes(node.id);
                                                const parentsUnlocked = node.parents.length === 0 || node.parents.every(pid => gameState.unlockedSkills.includes(pid));
                                                const canUnlock = !isUnlocked && parentsUnlocked && gameState.skillPoints >= node.cost;
                                                const isLocked = !isUnlocked && !canUnlock;
                                                const isSelected = selectedNodeId === node.id;

                                                let cardStyle = col.nodeLocked;
                                                if (isUnlocked) cardStyle = col.nodeUnlocked;
                                                else if (canUnlock) cardStyle = col.nodeUnlockable;

                                                return (
                                                    <div 
                                                        key={node.id}
                                                        className="absolute w-full px-1 lg:px-2 left-0 right-0 flex justify-center z-10"
                                                        style={{ top, height }}
                                                    >
                                                        <button
                                                            onClick={() => setSelectedNodeId(node.id)}
                                                            className={`
                                                                w-full max-w-[200px] h-full rounded-lg flex items-center px-3 gap-2 transition-all duration-200 border-2 text-left relative overflow-hidden
                                                                ${cardStyle}
                                                                ${isSelected ? 'transform scale-105 shadow-md ring-2 ring-offset-1 ring-slate-300 z-20' : 'shadow-sm hover:-translate-y-0.5'}
                                                                ${isLocked ? 'opacity-60 cursor-default' : 'cursor-pointer'}
                                                            `}
                                                        >
                                                            {/* Background Progress/Fill for Unlocked */}
                                                            {isUnlocked && <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"/>}

                                                            {/* Icon State */}
                                                            <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-white/20' : 'bg-slate-100'}`}>
                                                                {isUnlocked ? <Check size={12} strokeWidth={4} className="text-white"/> : (isLocked ? <Lock size={10} className="text-slate-400"/> : <ArrowUp size={12} className={col.color}/>)}
                                                            </div>

                                                            {/* Text Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className={`font-black text-[10px] truncate leading-tight ${isUnlocked ? 'text-white' : 'text-slate-700'}`}>
                                                                    {node.name}
                                                                </div>
                                                                {!isUnlocked && (
                                                                    <div className={`text-[8px] font-bold mt-0.5 ${canUnlock ? col.color : 'text-slate-400'}`}>
                                                                        {node.cost} PP
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Compact Inspector Panel */}
                <div className="bg-white border-t border-slate-200 p-4 shrink-0 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative">
                    <div className="max-w-5xl mx-auto w-full">
                        {selectedNode && selectedColumn ? (
                            <div className="flex flex-row gap-6 items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
                                {/* Left: Info */}
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${selectedColumn.border} ${selectedColumn.color} bg-white`}>
                                            {selectedColumn.label}
                                        </span>
                                        <h2 className="text-lg font-black text-slate-900 leading-none tracking-tight truncate">
                                            {selectedNode.name}
                                        </h2>
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-2xl line-clamp-2">
                                        {selectedNode.description}
                                    </p>
                                </div>

                                {/* Right: Action */}
                                <div className="shrink-0">
                                    {gameState.unlockedSkills.includes(selectedNode.id) ? (
                                        <div className="px-6 py-3 rounded-xl bg-slate-100 text-slate-400 font-black uppercase tracking-widest text-xs border border-slate-200 flex items-center gap-2 select-none">
                                            <Check size={14}/> Learned
                                        </div>
                                    ) : (
                                        (() => {
                                            const parentsUnlocked = selectedNode.parents.length === 0 || selectedNode.parents.every(pid => gameState.unlockedSkills.includes(pid));
                                            const canAfford = gameState.skillPoints >= selectedNode.cost;
                                            const isUnlockable = parentsUnlocked && canAfford;

                                            return (
                                                <button
                                                    onClick={handleUnlock}
                                                    disabled={!isUnlockable}
                                                    className={`
                                                        px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all min-w-[140px]
                                                        ${isUnlockable 
                                                            ? 'bg-slate-900 text-white hover:bg-rose-500 hover:shadow-lg active:scale-95 cursor-pointer' 
                                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                        }
                                                    `}
                                                >
                                                    {isUnlockable ? <Zap size={14} fill="currentColor"/> : <Lock size={14}/>}
                                                    <span>解锁 ({selectedNode.cost} PP)</span>
                                                </button>
                                            );
                                        })()
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center text-slate-300 gap-4 py-2 opacity-60">
                                <Map size={24} strokeWidth={1.5}/>
                                <span className="text-xs font-black uppercase tracking-widest">Select a Node to View Details</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
