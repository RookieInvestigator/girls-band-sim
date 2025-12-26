
import React, { useState } from 'react';
import { ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { ActionResult } from '../types';

const ImpactBadge: React.FC<{ label: string, value: number, isGood?: boolean }> = ({ label, value, isGood }) => {
    if (value === 0) return null;
    const isPositive = value > 0;
    const displayColor = isGood ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-slate-100 text-slate-500 border-slate-200';
    
    return (
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${displayColor}`}>
            <span>{label}</span>
            <span className="flex items-center">
                {isPositive ? '+' : ''}{value}
                {isGood ? <ArrowUp size={10} className="ml-0.5"/> : <ArrowDown size={10} className="ml-0.5"/>}
            </span>
        </div>
    );
};

const STAT_MAPPING: Record<string, string> = {
    money: '资金', fans: '粉丝', stressChange: '压力', fatigue: '疲劳', affectionChange: '羁绊',
    musicality: '乐感', technique: '技巧', stagePresence: '表现', creativity: '想象',
    mental: '心态', stability: '稳定', composing: '作曲', lyrics: '作词', arrangement: '编曲',
    design: '设计', rivalFans: '劲敌粉丝', rivalRelation: '劲敌关系', quality: '品质', songProgress: '进度'
};

export const EventModal = ({ engine, showNeta }: { engine: any, showNeta: boolean }) => {
    const [customNameInput, setCustomNameInput] = useState('');

    const getMemberName = () => {
        const m = engine.eventMember;
        if (!m) return 'Everyone';
        if (showNeta && m.netaName) return m.netaName;
        return m.name;
    }

    const memberName = getMemberName();
    
    // Determine which title/desc to show
    const displayTitle = (showNeta && engine.activeEvent.netaTitle) ? engine.activeEvent.netaTitle : engine.activeEvent.title;
    const displayDesc = (showNeta && engine.activeEvent.netaDescription) ? engine.activeEvent.netaDescription : engine.activeEvent.description;

    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[60] flex items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="bg-white rounded-[2.5rem] max-w-3xl w-full shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-700 max-h-[90vh] border border-white/20 flex flex-col">
                <div className="overflow-y-auto p-10 md:p-12 w-full flex flex-col items-center">
                    {/* Result View */}
                    {engine.eventResult ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center w-full">
                            <div className="w-16 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-8"/>
                            <div className="uppercase text-xs font-black text-slate-400 tracking-[0.4em] mb-4">Event Result</div>
                            
                            <div className="mb-10 w-full text-center">
                                <span className={`inline-block px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest text-white shadow-lg mb-8 ${engine.eventResult.result === ActionResult.Success ? 'bg-pink-500 shadow-pink-200' : 'bg-slate-400'}`}>
                                    {engine.eventResult.result === ActionResult.Success ? 'SUCCESS' : 'FAILURE'}
                                </span>
                                <p className="text-2xl md:text-3xl text-slate-900 font-bold leading-relaxed px-2 lg:px-12 mb-8">
                                    “{engine.eventResult.log}”
                                </p>
                                
                                {/* Stat Changes Visualization */}
                                {engine.eventResult.impact && (
                                    <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                                        {Object.entries(engine.eventResult.impact).map(([key, val]) => {
                                            if (key === 'addTags' || key === 'removeTags' || key === 'newDescription' || key === 'newName' || key === 'newNetaName') return null;
                                            
                                            const label = STAT_MAPPING[key] || key;
                                            let isGood = Number(val) > 0;
                                            if (key === 'stressChange' || key === 'fatigue' || (key === 'money' && Number(val) < 0)) {
                                                isGood = Number(val) < 0; 
                                                if (key === 'money') isGood = Number(val) > 0;
                                                else isGood = Number(val) < 0; 
                                            }
                                            return <ImpactBadge key={key} label={label} value={Number(val)} isGood={isGood} />;
                                        })}
                                        {engine.eventResult.impact.addTags && (
                                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-600 border-purple-200">
                                                New Tags: {engine.eventResult.impact.addTags.join(', ')}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button onClick={engine.closeEvent} className="px-12 py-4 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-pink-500 transition-colors shadow-xl active:scale-95 text-sm">
                                Continue
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full">
                            <div className="w-16 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-8"/>
                            <div className="uppercase text-xs font-black text-slate-400 tracking-[0.4em] mb-4">Event Triggered</div>
                            
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight text-center">
                                {displayTitle}
                            </h3>
                            
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-10 w-full text-center relative overflow-hidden">
                                {showNeta && engine.activeEvent.netaDescription && (
                                    <div className="absolute top-0 right-0 bg-amber-100 text-amber-600 text-[9px] font-black px-2 py-1 rounded-bl-xl uppercase tracking-wider">
                                        Neta Mode
                                    </div>
                                )}
                                <p className="text-lg md:text-xl text-slate-600 font-medium italic leading-relaxed whitespace-pre-wrap">
                                    "{engine.formatText(displayDesc, memberName)}"
                                </p>
                            </div>
                            
                            {engine.activeEvent.isNamingEvent && (
                                <input 
                                    type="text" 
                                    value={customNameInput} 
                                    onChange={(e) => setCustomNameInput(e.target.value)} 
                                    placeholder="输入乐队名称..." 
                                    className="w-full py-4 px-6 rounded-[2rem] border-2 border-slate-200 text-center font-black text-xl mb-8 focus:border-pink-500 outline-none focus:ring-4 focus:ring-pink-100 transition-all" 
                                />
                            )}

                            <div className="grid gap-4 w-full">
                                {engine.activeEvent.options.map((o: any, i: number) => {
                                    const hasTag = !o.requiredTag || engine.gameState.members.some((m: any) => m.tags.includes(o.requiredTag!));
                                    const isDisabled = !hasTag || (engine.activeEvent?.isNamingEvent && !customNameInput.trim());
                                    
                                    const displayLabel = (showNeta && o.netaLabel) ? o.netaLabel : o.label;
                                    const displayEffect = (showNeta && o.netaEffectDescription) ? o.netaEffectDescription : o.effectDescription;

                                    return (
                                        <button 
                                            key={i} 
                                            disabled={isDisabled} 
                                            onClick={() => engine.handleEventChoice(o, customNameInput.trim())} 
                                            className={`w-full p-5 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between group 
                                                ${isDisabled 
                                                    ? 'border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed' 
                                                    : 'border-slate-200 hover:border-pink-500 hover:bg-pink-50/50 hover:shadow-md'
                                                }`}
                                        >
                                            <div>
                                                <div className={`font-black text-base md:text-lg ${isDisabled ? 'text-slate-300' : 'text-slate-800 group-hover:text-pink-600'}`}>{displayLabel}</div>
                                                <div className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">{engine.formatText(displayEffect, memberName)}</div>
                                            </div>
                                            {!isDisabled && <ChevronRight className="text-slate-300 group-hover:text-pink-500 transition-transform group-hover:translate-x-1" />}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
