
import { ActiveGigState, GigCard } from '../types';
import { Zap, Music, Star, User, Mic2, Guitar, Drum, Keyboard, Sparkles, Activity, Disc, Radio, TrendingUp, AlertTriangle, Monitor, BarChart3, HeartPulse } from 'lucide-react';
import { useEffect, useState } from 'react';

const RoleIcon = ({ id, className = "" }: { id?: string, className?: string }) => {
    if (!id) return <Music size={14} className={className} />;
    if (id.includes('vocal')) return <Mic2 size={14} className={className} />;
    if (id.includes('guitar')) return <Guitar size={14} className={className} />;
    if (id.includes('drum')) return <Drum size={14} className={className} />;
    if (id.includes('key')) return <Keyboard size={14} className={className} />;
    return <User size={14} className={className} />;
};

export const LiveStage = ({ activeGig, onOptionSelect, onFinish }: { activeGig: ActiveGigState, onOptionSelect: (card: GigCard) => void, onFinish: () => void }) => {
    const { definition, currentRound, maxRounds, currentVoltage, targetVoltage, currentHype, currentOptions, logs, isFinished, lastResult, phaseName } = activeGig;
    
    // Parse Phase Name: "Label|Desc"
    const [phaseLabel, phaseDesc] = phaseName.includes('|') ? phaseName.split('|') : [phaseName, ''];

    // Smooth progress for visual effect
    const [displayVoltage, setDisplayVoltage] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => setDisplayVoltage(currentVoltage), 50);
        return () => clearTimeout(timer);
    }, [currentVoltage]);

    const isWin = currentVoltage >= targetVoltage;

    // Difficulty Color Logic
    const getRiskColor = (diff: number) => {
        if (diff < 20) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        if (diff < 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    };

    const getTypeColor = (card: GigCard) => {
        if (card.isSongCard) return 'from-amber-500 via-orange-500 to-red-500 shadow-amber-500/20 border-amber-500/50';
        if (card.type === 'Melody') return 'from-rose-500 via-pink-600 to-fuchsia-600 shadow-rose-500/20 border-rose-500/50';
        if (card.type === 'Rhythm') return 'from-cyan-500 via-sky-600 to-blue-600 shadow-cyan-500/20 border-cyan-500/50';
        if (card.type === 'Technique') return 'from-violet-500 via-purple-600 to-indigo-600 shadow-violet-500/20 border-violet-500/50';
        return 'from-emerald-400 via-teal-500 to-cyan-500 shadow-emerald-500/20 border-emerald-500/50'; 
    };

    // --- FINISHED SCREEN ---
    if (isFinished) {
        return (
            <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-6 animate-in fade-in duration-700 font-sans">
                 {/* Background FX */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80"/>
                
                <div className="relative z-10 w-full max-w-lg">
                    {/* Vinyl Record Visual */}
                    <div className="flex justify-center mb-10 relative">
                        <div className={`w-64 h-64 rounded-full bg-slate-900 border-8 border-slate-800 shadow-2xl flex items-center justify-center relative ${isWin ? 'shadow-rose-500/50' : 'shadow-slate-500/20'}`}>
                            <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" style={{animationDuration: '10s'}} />
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                                <Disc size={48} className="text-white animate-spin-slow" />
                            </div>
                        </div>
                        {isWin && <div className="absolute -top-4 -right-4 text-6xl animate-bounce">✨</div>}
                    </div>

                    <div className="text-center space-y-6">
                        <div>
                            <div className="text-rose-500 font-black tracking-[0.5em] uppercase text-xs mb-2">LIVE SESSION COMPLETE</div>
                            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic pr-2">
                                {isWin ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-amber-400">SUCCESS</span> : <span className="text-slate-500">FINISHED</span>}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                            <div>
                                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">最终得分</div>
                                <div className="text-3xl font-black text-white">{Math.floor(currentVoltage)}</div>
                            </div>
                            <div className="border-l border-white/10">
                                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">结果</div>
                                <div className={`text-3xl font-black ${isWin ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {isWin ? 'CLEAR' : 'FAILED'}
                                </div>
                            </div>
                        </div>

                        <button onClick={onFinish} className="w-full py-5 bg-white text-black rounded-full font-black text-lg uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(244,63,94,0.6)] active:scale-95 flex items-center justify-center gap-2 group">
                            查看结算 <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- MAIN STAGE ---
    return (
        <div className="fixed inset-0 bg-slate-950 z-[100] text-white flex flex-col font-sans overflow-hidden select-none">
             {/* Background Ambience - Darker for Live */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-slate-950"/>
             
             {/* Subtle Grid Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"/>

             {/* --- HUD HEADER --- */}
             <div className="relative z-20 pt-safe-top bg-gradient-to-b from-slate-950/90 to-transparent pb-4">
                 {/* Top Info Bar */}
                 <div className="flex justify-between items-start px-6 pt-6 pb-2">
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-rose-500 mb-1">
                             <Radio size={14} className="animate-pulse"/>
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">ON AIR</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tighter italic uppercase text-white drop-shadow-lg leading-none max-w-[200px] md:max-w-none truncate pr-2">
                            {definition.title}
                        </h2>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1"><Music size={10}/> {definition.venue}</span>
                        </div>
                     </div>

                     {/* Round Counter */}
                     <div className="flex flex-col items-end">
                         <div className="flex items-end gap-1">
                             <span className="text-4xl font-black leading-none italic pr-1">{currentRound}</span>
                             <span className="text-sm font-bold text-slate-500 mb-1">/ {maxRounds}</span>
                         </div>
                         <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">回合</div>
                     </div>
                 </div>

                 {/* High-Tech Progress Bar */}
                 <div className="px-6 mt-2 relative">
                    <div className="h-4 w-full bg-slate-900/80 rounded border border-slate-700/50 overflow-hidden flex items-center relative backdrop-blur-sm skew-x-[-10deg]">
                        {/* Target Marker */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10 shadow-[0_0_10px_white]" style={{left: '100%'}}/> 
                        
                        {/* Fill */}
                        <div 
                            className="h-full bg-gradient-to-r from-indigo-600 via-rose-500 to-amber-400 shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-500 ease-out relative" 
                            style={{width: `${Math.min(100, (displayVoltage / targetVoltage) * 100)}%`}}
                        >
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-pulse shadow-[0_0_15px_white]"/>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-amber-400 fill-amber-400"/>
                            <span className="text-2xl font-black tracking-tighter text-white tabular-nums leading-none">{displayVoltage}</span>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-900/50 px-2 py-1 rounded skew-x-[-10deg] border border-slate-800">
                            目标: {targetVoltage}
                        </div>
                    </div>
                 </div>
             </div>

             {/* --- CENTER STAGE (Monitor & Feedback) --- */}
             <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">
                 
                 {/* Live Monitor Box */}
                 <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-md border-y-2 border-rose-500/30 p-4 mb-8 overflow-hidden group">
                     <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-10 transition-opacity"/>
                     {/* Scanning Line */}
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-rose-500/50 shadow-[0_0_10px_#f43f5e] animate-scan"/>
                     
                     <div className="flex items-start gap-3">
                         <Monitor size={16} className="text-rose-400 mt-1 shrink-0 animate-pulse"/>
                         <div className="flex-1">
                             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-1">当前阶段</div>
                             <div className="text-lg md:text-xl font-black italic text-white tracking-wide uppercase leading-none pr-1">{phaseLabel}</div>
                             <div className="mt-2 text-xs md:text-sm font-medium text-slate-300 leading-relaxed border-l-2 border-slate-600 pl-2">
                                 {phaseDesc}
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Last Result Feedback (Floating) */}
                 <div className="h-32 flex flex-col items-center justify-center">
                    {lastResult ? (
                        <div key={logs.length} className="animate-in zoom-in slide-in-from-bottom-4 duration-300 text-center">
                            <div className={`text-5xl md:text-6xl font-black italic tracking-tighter uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] pr-2 ${
                                lastResult.outcome === 'Critical' ? 'text-amber-300' : 
                                (lastResult.outcome === 'Miss' ? 'text-slate-600' : 'text-rose-400')
                            }`}>
                                {lastResult.outcome}!
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <span className="text-xl font-black text-white tracking-widest bg-black/30 px-2 rounded">
                                    {lastResult.voltage > 0 ? '+' : ''}{lastResult.voltage} V
                                </span>
                                {lastResult.hypeDelta !== 0 && (
                                    <span className={`text-xs font-bold ${lastResult.hypeDelta > 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                                        ({lastResult.hypeDelta > 0 ? '+' : ''}{lastResult.hypeDelta}% Hype)
                                    </span>
                                )}
                            </div>
                            {/* Bonuses */}
                            {lastResult.bonuses && lastResult.bonuses.length > 0 && (
                                <div className="flex flex-wrap gap-1 justify-center mt-2 max-w-[250px]">
                                    {lastResult.bonuses.map((b, i) => (
                                        <span key={i} className="text-[8px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30 animate-pulse">
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-white/10 font-black text-4xl tracking-[0.5em] uppercase animate-pulse">
                            READY
                        </div>
                    )}
                 </div>
             </div>

             {/* --- BOTTOM DECK (Cards) --- */}
             <div className="relative z-30 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent pt-8 pb-safe-bottom px-4 lg:px-8">
                 <div className="max-w-7xl mx-auto w-full">
                     {/* Deck Header */}
                     <div className="flex justify-between items-end mb-4 px-2">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                            <Sparkles size={12} className="text-rose-500"/>
                            行动卡牌
                        </div>
                        <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">观众热度</span>
                            <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full ${currentHype >= 100 ? 'bg-amber-400' : 'bg-rose-500'} transition-all duration-500`} style={{width: `${Math.min(100, currentHype)}%`}}/>
                            </div>
                            <span className={`text-sm font-black ${currentHype >= 100 ? 'text-amber-400' : 'text-white'}`}>{currentHype}%</span>
                        </div>
                     </div>

                     {/* Card Grid - Mobile Optimized (Horizontal Scroll) */}
                     <div className="flex md:grid md:grid-cols-5 gap-3 h-[150px] md:h-[190px] overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 md:px-0">
                         {currentOptions.map((opt, i) => {
                             const gradient = getTypeColor(opt);
                             return (
                                 <button 
                                    key={opt.instanceId || i}
                                    onClick={() => onOptionSelect(opt)}
                                    className={`
                                        group relative min-w-[85%] md:min-w-0 w-full h-full rounded-xl overflow-hidden
                                        bg-slate-900 border-l-[3px] hover:border-l-[6px]
                                        transition-all duration-200 ease-out
                                        hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,0,0,0.6)]
                                        flex flex-col text-left
                                        active:scale-95 snap-center
                                        ${gradient.split(' ').pop()} // Border color from utility
                                    `}
                                 >
                                     {/* Background Gradient opacity */}
                                     <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`}/>
                                     
                                     {/* Tech Patterns */}
                                     <div className="absolute top-0 right-0 p-2 opacity-20">
                                         <Activity size={48} className="text-white"/>
                                     </div>

                                     <div className="p-3 md:p-4 flex flex-col h-full justify-between relative z-10">
                                         <div>
                                             <div className="flex justify-between items-start mb-2">
                                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wider ${getRiskColor(opt.difficulty)}`}>
                                                    风险 {opt.difficulty}%
                                                </span>
                                                {opt.isSongCard && <Music size={12} className="text-amber-400 animate-pulse"/>}
                                             </div>
                                             
                                             <h4 className="font-black text-sm md:text-base text-white leading-tight group-hover:text-rose-300 transition-colors line-clamp-2 mb-1 drop-shadow-md tracking-tight">
                                                 {opt.title}
                                             </h4>
                                             <p className="text-[9px] text-slate-400 font-medium leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100">
                                                 {opt.description}
                                             </p>
                                         </div>

                                         {/* Footer Stats */}
                                         <div className="grid grid-cols-2 gap-1 mt-2">
                                             <div className="bg-black/30 rounded px-2 py-1 flex items-center gap-1.5">
                                                 <Zap size={10} className="text-amber-400 fill-amber-400"/>
                                                 <span className="text-[10px] font-black text-slate-200">{opt.baseVoltage}</span>
                                             </div>
                                             {opt.hypeGain && (
                                                <div className="bg-black/30 rounded px-2 py-1 flex items-center gap-1.5">
                                                    <TrendingUp size={10} className="text-rose-400"/>
                                                    <span className="text-[10px] font-black text-slate-200">+{opt.hypeGain}</span>
                                                </div>
                                             )}
                                         </div>
                                     </div>
                                 </button>
                             )
                         })}
                     </div>
                 </div>
             </div>
        </div>
    );
};
