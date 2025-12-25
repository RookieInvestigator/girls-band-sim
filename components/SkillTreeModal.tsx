
import React, { useState } from 'react';
import { X, Heart, Star, Lock, Check, Zap, Book, Sparkles, Briefcase, Flame, ArrowUp } from 'lucide-react';
import { SKILL_TREE } from '../data/skills';

export const SkillTreeModal = ({ engine }: { engine: any }) => {
    const { gameState, unlockSkill } = engine;
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const COLUMNS = [
        { 
            id: 'friendship', label: 'KIZUNA', sub: '羁绊·心态', icon: Heart, 
            color: 'text-rose-600', border: 'border-rose-200', bg: 'bg-rose-50',
            nodeLocked: 'bg-rose-50 border-rose-200 text-rose-300',
            nodeUnlocked: 'bg-rose-600 border-rose-600 text-white',
            lineActive: '#e11d48', lineInactive: '#e2e8f0'
        },
        { 
            id: 'passion', label: 'KIRAMEKI', sub: '闪耀·魅力', icon: Flame, 
            color: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50',
            nodeLocked: 'bg-amber-50 border-amber-200 text-amber-300',
            nodeUnlocked: 'bg-amber-500 border-amber-500 text-white',
            lineActive: '#f59e0b', lineInactive: '#e2e8f0'
        },
        { 
            id: 'technique', label: 'OTO', sub: '技艺·实力', icon: Star, 
            color: 'text-sky-600', border: 'border-sky-200', bg: 'bg-sky-50',
            nodeLocked: 'bg-sky-50 border-sky-200 text-sky-300',
            nodeUnlocked: 'bg-sky-500 border-sky-500 text-white',
            lineActive: '#0ea5e9', lineInactive: '#e2e8f0'
        },
        { 
            id: 'commercial', label: 'PRODUCE', sub: '运营·策略', icon: Briefcase, 
            color: 'text-slate-600', border: 'border-slate-200', bg: 'bg-slate-50',
            nodeLocked: 'bg-slate-50 border-slate-200 text-slate-300',
            nodeUnlocked: 'bg-slate-600 border-slate-600 text-white',
            lineActive: '#475569', lineInactive: '#e2e8f0'
        },
    ];

    const getSkillsForCategory = (cat: string) => {
        return SKILL_TREE.filter(s => s.category === cat);
    };

    const selectedNode = selectedNodeId ? SKILL_TREE.find(s => s.id === selectedNodeId) : null;
    const selectedColumn = selectedNode ? COLUMNS.find(c => c.id === selectedNode.category) : null;

    // Configuration for 8 Rows
    const COL_WIDTH = 200; 
    const ROW_HEIGHT = 100; 
    const CARD_WIDTH = 170; 
    const CARD_HEIGHT = 60; 
    const START_Y = 40;
    const TRACK_HEIGHT = START_Y + (8 * ROW_HEIGHT);

    const getPos = (node: any) => {
        const xOffset = 0; 
        const left = (COL_WIDTH / 2) + xOffset - (CARD_WIDTH / 2); 
        const top = START_Y + (node.y * ROW_HEIGHT);
        return { left, top, centerX: (COL_WIDTH / 2) + xOffset, centerY: top + (CARD_HEIGHT / 2) };
    };

    const handleUnlock = () => {
        if (selectedNode) {
            unlockSkill(selectedNode.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 z-[120] flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
            <div className="bg-white rounded-xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl relative overflow-hidden border border-slate-200">
                
                {/* Header - Clean */}
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white z-20 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 rounded-lg text-white">
                            <Book size={18}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">队长手记</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Captain's Log</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PP</span>
                            <span className="text-xl font-black text-rose-500 leading-none">{gameState.skillPoints}</span>
                        </div>
                        <button 
                            onClick={() => engine.setShowSkillTree(false)} 
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X size={20}/>
                        </button>
                    </div>
                </div>

                {/* Main Scrollable Content */}
                <div className="flex-1 overflow-auto bg-slate-50 relative custom-scrollbar pb-64"> 
                    {/* Simple Grid Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                         style={{
                             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                             backgroundSize: '40px 40px',
                             height: '200%' 
                         }}
                    />

                    {/* Centered Container */}
                    <div className="w-full flex justify-center p-8 min-w-max">
                        <div className="flex gap-6">
                            {COLUMNS.map(col => {
                                const skills = getSkillsForCategory(col.id);
                                
                                return (
                                    <div key={col.id} className="flex flex-col shrink-0">
                                        
                                        {/* Column Header */}
                                        <div className={`w-[200px] py-4 rounded-t-xl border-x border-t ${col.border} bg-white flex flex-col items-center justify-center relative z-10 border-b border-b-slate-100`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <col.icon size={16} className={col.color}/>
                                                <span className="font-black text-sm text-slate-800 uppercase tracking-wide">{col.label}</span>
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-400">{col.sub}</div>
                                        </div>

                                        {/* Track Container */}
                                        <div 
                                            className={`w-[200px] bg-white rounded-b-xl border-x border-b ${col.border} relative`}
                                            style={{ height: TRACK_HEIGHT }}
                                        >
                                            <div className={`absolute inset-0 ${col.bg} opacity-30`}/>
                                            
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
                                                                stroke={isUnlocked ? col.lineActive : col.lineInactive}
                                                                strokeWidth="2"
                                                                strokeDasharray={isUnlocked ? "0" : "4 4"}
                                                                fill="none"
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
                                                    const isSelected = selectedNodeId === node.id;

                                                    return (
                                                        <div 
                                                            key={node.id}
                                                            className="absolute z-10"
                                                            style={{ left, top, width: CARD_WIDTH, height: CARD_HEIGHT }}
                                                        >
                                                            <button
                                                                onClick={() => setSelectedNodeId(node.id)}
                                                                className={`
                                                                    w-full h-full rounded-lg flex items-center px-3 gap-3 transition-all duration-200 border-2 text-left
                                                                    ${isSelected 
                                                                        ? `ring-2 ring-slate-800 border-slate-800 transform scale-105 shadow-md bg-white z-20`
                                                                        : (isUnlocked 
                                                                            ? `${col.nodeUnlocked}` 
                                                                            : (canUnlock 
                                                                                ? 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:-translate-y-0.5 cursor-pointer' 
                                                                                : `${col.nodeLocked} opacity-80 cursor-default`
                                                                              )
                                                                          )
                                                                    }
                                                                `}
                                                            >
                                                                {/* Icon */}
                                                                <div className="shrink-0">
                                                                    {isUnlocked ? <Check size={16} strokeWidth={3}/> : (isLocked ? <Lock size={14}/> : <div className="w-2 h-2 rounded-full bg-slate-400"/>)}
                                                                </div>

                                                                {/* Text */}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-bold text-[11px] truncate leading-tight">
                                                                        {node.name}
                                                                    </div>
                                                                    {!isUnlocked && (
                                                                        <div className="text-[9px] opacity-70 font-mono mt-0.5">
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
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* BOTTOM INSPECTOR PANEL - Clean & Solid */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-6 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] h-48 flex items-center">
                    <div className="max-w-4xl mx-auto w-full">
                        {selectedNode && selectedColumn ? (
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${selectedColumn.border} ${selectedColumn.color} bg-white`}>
                                            {selectedColumn.label}
                                        </span>
                                        {gameState.unlockedSkills.includes(selectedNode.id) && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                                                <Check size={12}/> Unlocked
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 mb-2 leading-none">
                                        {selectedNode.name}
                                    </h2>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
                                        {selectedNode.description}
                                    </p>
                                </div>

                                <div className="shrink-0">
                                    {gameState.unlockedSkills.includes(selectedNode.id) ? (
                                        <div className="px-8 py-3 rounded-lg bg-slate-100 text-slate-400 font-black uppercase tracking-widest text-xs border border-slate-200 select-none">
                                            已获得
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
                                                        px-8 py-3 rounded-lg font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all
                                                        ${isUnlockable 
                                                            ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg active:translate-y-0.5' 
                                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                        }
                                                    `}
                                                >
                                                    {isUnlockable ? <ArrowUp size={14}/> : <Lock size={14}/>}
                                                    <span>解锁技能</span>
                                                    <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                                                        {selectedNode.cost} PP
                                                    </span>
                                                </button>
                                            );
                                        })()
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center text-slate-400 gap-8 md:gap-16 opacity-90">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-3 bg-slate-50 rounded-full">
                                        <Book size={24} className="opacity-50"/>
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest">选择技能查看详情</span>
                                </div>
                                
                                <div className="hidden md:block w-px h-12 bg-slate-200"/>

                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-3 text-center md:text-left">PP (Point) 获取方式</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs font-bold text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"/>
                                            日程大成功 (+1)
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"/>
                                            演出评级 S/A (+3~5)
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>
                                            粉丝数奖励 (每周)
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"/>
                                            特殊事件奖励
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
