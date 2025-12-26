
import React, { useState } from 'react';
import { ChevronRight, ArrowUp, ArrowDown, Sparkles, MessageSquare, AlertCircle, Quote } from 'lucide-react';
import { ActionResult } from '../types';

const ImpactBadge: React.FC<{ label: string, value: number, isGood?: boolean }> = ({ label, value, isGood }) => {
    if (value === 0) return null;
    const isPositive = value > 0;
    const displayColor = isGood ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100';
    
    return (
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${displayColor} shadow-sm`}>
            <span>{label}</span>
            <span className="flex items-center font-mono">
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
    design: '视觉', rivalFans: '劲敌粉丝', rivalRelation: '劲敌关系', quality: '品质', songProgress: '进度'
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
    const displayTitle = (showNeta && engine.activeEvent.netaTitle) ? engine.activeEvent.netaTitle : engine.activeEvent.title;
    const displayDesc = (showNeta && engine.activeEvent.netaDescription) ? engine.activeEvent.netaDescription : engine.activeEvent.description;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500 max-h-[90vh] flex flex-col border border-white/50">
                
                {/* Glossy Header Highlight */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-0"/>
                
                {/* Decorative Elements */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-gradient-to-bl from-rose-200 to-transparent rounded-full blur-3xl pointer-events-none opacity-60"/>
                <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-gradient-to-tr from-blue-200 to-transparent rounded-full blur-3xl pointer-events-none opacity-60"/>
                
                <div className="overflow-y-auto p-8 md:p-12 w-full flex flex-col relative z-10 scrollbar-hide">
                    {/* Result View */}
                    {engine.eventResult ? (
                        <div className="flex flex-col items-center w-full text-center">
                            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl transform rotate-3 ${engine.eventResult.result === ActionResult.Success ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                {engine.eventResult.result === ActionResult.Success ? <Sparkles size={40}/> : <AlertCircle size={40}/>}
                            </div>
                            
                            <div className="mb-2 uppercase text-[10px] font-black tracking-[0.3em] text-slate-400 bg-white/50 px-3 py-1 rounded-full">Event Result</div>
                            <h2 className={`text-4xl font-black italic tracking-tight mb-8 ${engine.eventResult.result === ActionResult.Success ? 'text-emerald-500' : 'text-slate-500'}`}>
                                {engine.eventResult.result === ActionResult.Success ? 'SUCCESS' : 'FAILURE'}
                            </h2>
                            
                            <div className="bg-slate-50/80 p-8 rounded-[2.5rem] border border-slate-100 w-full mb-8 relative group">
                                <Quote size={24} className="absolute top-4 left-4 text-slate-300"/>
                                <p className="text-lg text-slate-700 font-bold leading-relaxed pt-2">
                                    {engine.eventResult.log}
                                </p>
                            </div>
                            
                            {/* Stat Changes */}
                            {engine.eventResult.impact && (
                                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mb-10">
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
                                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-100">
                                            Tags: {engine.eventResult.impact.addTags.join(', ')}
                                        </div>
                                    )}
                                </div>
                            )}

                            <button onClick={engine.closeEvent} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-rose-500 transition-all shadow-xl hover:shadow-rose-500/30 active:scale-95 text-xs">
                                CONTINUE
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-4 py-1.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-rose-200">
                                    BREAKING NEWS
                                </div>
                                <div className="h-px bg-slate-200 flex-1"/>
                            </div>
                            
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.95] italic uppercase">
                                {displayTitle}
                            </h3>
                            
                            <div className="relative mb-10 pl-6 border-l-4 border-rose-500/30">
                                <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                                    {engine.formatText(displayDesc, memberName)}
                                </p>
                                {showNeta && engine.activeEvent.netaDescription && (
                                    <div className="mt-2">
                                        <span className="text-[9px] font-black bg-amber-400 text-white px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">Neta Mode</span>
                                    </div>
                                )}
                            </div>
                            
                            {engine.activeEvent.isNamingEvent && (
                                <input 
                                    type="text" 
                                    value={customNameInput} 
                                    onChange={(e) => setCustomNameInput(e.target.value)} 
                                    placeholder="输入乐队名称..." 
                                    className="w-full py-5 px-8 rounded-2xl bg-slate-50 text-center font-black text-2xl mb-8 focus:bg-white focus:shadow-xl focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 border border-slate-200" 
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
                                            className={`w-full p-6 rounded-[2rem] text-left transition-all flex items-center justify-between group relative overflow-hidden border-2
                                                ${isDisabled 
                                                    ? 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed' 
                                                    : 'bg-white border-slate-100 hover:border-slate-900 hover:shadow-xl active:scale-[0.98]'
                                                }`}
                                        >
                                            <div className="relative z-10 flex-1">
                                                <div className={`font-black text-lg ${isDisabled ? 'text-slate-300' : 'text-slate-900'}`}>{displayLabel}</div>
                                                <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isDisabled ? 'text-slate-300' : 'text-slate-400'}`}>
                                                    {engine.formatText(displayEffect, memberName)}
                                                </div>
                                            </div>
                                            {!isDisabled && <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors"><ChevronRight size={18}/></div>}
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
