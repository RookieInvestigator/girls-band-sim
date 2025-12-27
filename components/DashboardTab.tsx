
import { useState, useMemo } from 'react';
import { 
    Music, Star, Zap, Disc, Sword, Activity, Sparkles, Book, Lock, Smile, Coffee, 
    ChevronRight, Check, Users, Coins, TrendingUp, Crown, ArrowRight, Radio, 
    Megaphone, Newspaper, Command, LayoutGrid, Heart, Mic2, BarChart3, PenTool
} from 'lucide-react';
import { BandState } from '../types';
import { SKILL_TREE } from '../data/skills';

export const DashboardTab = ({ engine }: { engine: any }) => {
    const { gameState, setBandState, setShowSkillTree } = engine;
    const stats = gameState.teamStats;

    const isStateUnlocked = (s: BandState) => {
        if (s === BandState.Normal) return true;
        const skill = SKILL_TREE.find(n => n.effect?.unlockState === s);
        return skill && gameState.unlockedSkills.includes(skill.id);
    };

    const getStateConfig = (s: BandState) => {
        switch(s) {
            case BandState.Serious: return { label: 'SERIOUS', desc: '训练UP / 压力UP', bg: 'bg-amber-500', text: 'text-white' };
            case BandState.Relaxed: return { label: 'RELAXED', desc: '恢复UP / 羁绊UP', bg: 'bg-emerald-500', text: 'text-white' };
            default: return { label: 'NORMAL', desc: '标准平衡', bg: 'bg-slate-900', text: 'text-white' };
        }
    };

    // Progress to Budokan (100,000 fans)
    const rawProgress = (gameState.fans / 100000) * 100;
    const progress = Math.min(100, rawProgress);

    const newsItems = gameState.currentNews || ["No news today."];

    const StatGroup = ({ title, total, icon: Icon, items, color }: any) => (
        <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden group hover:bg-white border border-transparent hover:border-slate-200 transition-all">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${color} text-white`}>
                        <Icon size={14}/>
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</h4>
                </div>
                <div className="text-xl font-black text-slate-900 leading-none">{total}</div>
            </div>
            <div className="space-y-2">
                {items.map((item: any) => (
                    <div key={item.label} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-400">{item.label}</span>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full ${color.replace('bg-', 'bg-')}`} style={{width: `${Math.min(100, item.value)}%`}}/>
                            </div>
                            <span className="font-black text-slate-800 w-6 text-right">{Math.floor(item.value)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans h-full">
            
            {/* --- HEADER (Floating Capsule) --- */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white pointer-events-none"/>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                        <Crown size={24} className="text-pink-500 fill-pink-500"/>
                    </div>
                    <div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-slate-200">
                                Week {gameState.currentWeek}
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider text-white ${gameState.bandState === BandState.Serious ? 'bg-amber-500' : (gameState.bandState === BandState.Relaxed ? 'bg-emerald-500' : 'bg-slate-400')}`}>
                                {gameState.bandState}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-[0.9]">
                            {gameState.bandName || 'NO NAME'}
                        </h1>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                    <div className="text-center">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Rating</div>
                        <div className="text-3xl font-black italic text-slate-900 leading-none">{stats.totalRating}</div>
                    </div>
                    <div className="w-px h-8 bg-slate-200"/>
                    <div className="text-center">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Fans</div>
                        <div className="text-xl font-black text-slate-900 leading-none">{gameState.fans > 1000 ? (gameState.fans/1000).toFixed(1) + 'k' : gameState.fans}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                
                {/* 1. HERO CARD (Col 8) */}
                <div className="md:col-span-8 bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[360px] group shadow-2xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-rose-600/20 via-purple-900/40 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none animate-pulse"/>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"/>
                    
                    {/* Top Row */}
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 flex items-center gap-2">
                            <Crown size={12} className="text-rose-400 fill-rose-400"/> 
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-100">Target: Budokan</span>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Goal</div>
                            <div className="text-lg font-black italic">{gameState.fans >= 100000 ? 'WORLD TOUR' : '100,000 Fans'}</div>
                        </div>
                    </div>

                    {/* Middle: Big Number */}
                    <div className="relative z-10 flex flex-col justify-center flex-1 my-6">
                        <div className="flex items-baseline gap-2 md:gap-4 flex-wrap">
                            <div className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-sm">
                                {gameState.fans.toLocaleString()}
                            </div>
                            <span className="text-xl md:text-2xl font-black text-rose-500 tracking-widest uppercase">Fans</span>
                        </div>
                        <p className="text-xs md:text-sm text-slate-400 font-medium max-w-md mt-2 leading-relaxed">
                            距离武道馆还有 <span className="text-white font-bold">{Math.max(0, 100000 - gameState.fans).toLocaleString()}</span> 名粉丝。保持势头，继续前进！
                        </p>
                    </div>

                    {/* Bottom: Progress */}
                    <div className="relative z-10 mt-auto">
                        <div className="flex justify-between items-end mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Road to Legend</span>
                            <span className="text-white">{Math.floor(rawProgress)}%</span>
                        </div>
                        <div className="h-5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1 shadow-inner">
                            <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 relative overflow-hidden transition-all duration-1000" style={{width: `${progress}%`}}>
                                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN (Col 4) - SKILL TREE & TACTICS */}
                <div className="md:col-span-4 flex flex-col gap-4">
                    
                    {/* A. SKILL TREE BUTTON */}
                    <button 
                        onClick={() => setShowSkillTree(true)}
                        className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl flex items-center justify-between group relative overflow-hidden border border-slate-800 hover:border-pink-500 transition-colors h-[140px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"/>
                        
                        <div className="relative z-10 text-left flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] mb-1">
                                    <Sparkles size={10} className="animate-pulse"/> Strategy
                                </div>
                                <div className="text-2xl font-black italic tracking-tighter group-hover:text-pink-100 transition-colors">
                                    SKILL TREE
                                </div>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold w-fit">
                                <span className="text-amber-400">PP</span> 
                                <span>{gameState.skillPoints}</span>
                            </div>
                        </div>

                        <div className="relative z-10 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all shadow-lg group-hover:scale-110">
                            <Book size={24}/>
                        </div>
                    </button>

                    {/* B. COMPACT COMMAND CENTER */}
                    <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex flex-col flex-1 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-slate-900">
                                <Command size={18}/>
                                <h4 className="font-black text-sm uppercase tracking-widest">Tactics</h4>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-2 justify-center">
                            {[BandState.Normal, BandState.Serious, BandState.Relaxed].map(s => {
                                const conf = getStateConfig(s);
                                const unlocked = isStateUnlocked(s);
                                const isActive = gameState.bandState === s;
                                
                                return (
                                    <button
                                        key={s}
                                        disabled={!unlocked}
                                        onClick={() => setBandState(s)}
                                        className={`
                                            relative w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 border-2
                                            ${isActive 
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg z-10 scale-[1.02]' 
                                                : (unlocked ? 'bg-white border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-slate-50' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed')
                                            }
                                        `}
                                    >
                                        <div className="flex flex-col items-start">
                                            <span className="font-black text-xs uppercase tracking-wider leading-none">{conf.label}</span>
                                            {isActive && <span className="text-[9px] font-bold opacity-70 mt-1">{conf.desc}</span>}
                                        </div>
                                        
                                        {!unlocked ? <Lock size={12}/> : (isActive ? <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_#ec4899]"/> : <div className="w-2 h-2 rounded-full bg-slate-200"/>)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 3. NEWS TICKER */}
                <div className="md:col-span-12 bg-white rounded-2xl py-3 px-4 flex items-center gap-0 overflow-hidden border border-slate-200 shadow-sm relative group">
                    <div className="flex items-center gap-2 font-black uppercase tracking-widest shrink-0 z-20 bg-rose-500 text-white px-4 py-1.5 rounded-xl shadow-lg shadow-rose-200 mr-6">
                        <Radio size={14} className="animate-pulse"/> News
                    </div>
                    <div className="absolute left-24 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"/>
                    <div className="flex-1 overflow-hidden relative h-6">
                        <div className="absolute whitespace-nowrap animate-marquee flex gap-12 font-bold text-sm text-slate-600 items-center hover:pause-animation">
                            {newsItems.map((news: string, i: number) => (
                                <span key={i} className="flex items-center gap-3 group/item">
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover/item:bg-rose-400 transition-colors"/>
                                    {news}
                                </span>
                            ))}
                            {newsItems.map((news: string, i: number) => (
                                <span key={`dup-${i}`} className="flex items-center gap-3 group/item">
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover/item:bg-rose-400 transition-colors"/>
                                    {news}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. COMPREHENSIVE STATS MONITOR (Col 12) */}
                <div className="md:col-span-12 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                            <Activity size={18}/> BAND ANALYSIS REPORT
                        </h3>
                        <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Real-time Data
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatGroup 
                            title="PERFORMANCE (演奏)" 
                            total={stats.performance}
                            icon={Music}
                            color="bg-sky-500"
                            items={[
                                { label: '精准 (Precision)', value: stats.precision },
                                { label: '音色 (Tone)', value: stats.tone },
                                { label: '律动 (Rhythm)', value: stats.rhythm },
                                { label: '动态 (Dynamics)', value: stats.dynamics },
                            ]}
                        />
                        <StatGroup 
                            title="STAGE (现场)" 
                            total={stats.stage}
                            icon={Sparkles}
                            color="bg-amber-500"
                            items={[
                                { label: '气场 (Aura)', value: stats.aura },
                                { label: '互动 (Interact)', value: stats.interaction },
                                { label: '视觉 (Visual)', value: stats.visual },
                                { label: '改编 (Live Arr)', value: stats.adaptation },
                            ]}
                        />
                        <StatGroup 
                            title="BOND (羁绊)" 
                            total={stats.bond}
                            icon={Heart}
                            color="bg-rose-500"
                            items={[
                                { label: '默契 (Synergy)', value: stats.synergy },
                                { label: '联结 (Connect)', value: stats.connection },
                                { label: '话题 (Buzz)', value: stats.topic },
                            ]}
                        />
                        <StatGroup 
                            title="CREATIVE (作品力)" 
                            total={stats.work}
                            icon={Disc}
                            color="bg-purple-500"
                            items={[
                                { label: '叙事 (Narrative)', value: stats.narrative },
                                { label: '旋律 (Melody)', value: stats.melody },
                                { label: '细节 (Detail)', value: stats.detail },
                            ]}
                        />
                    </div>
                </div>

                {/* 5. LATEST DISC (Col 6) */}
                <div className="md:col-span-6 bg-slate-100 rounded-[2.5rem] p-8 border border-slate-200 relative overflow-hidden flex items-center gap-6 group hover:bg-white transition-colors">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-200 rounded-full blur-2xl group-hover:bg-rose-100 transition-colors"/>
                    {gameState.songs.length > 0 ? (
                        <>
                            <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center shadow-xl shrink-0 relative animate-spin-slow border-4 border-slate-800">
                                <div className="absolute inset-0 rounded-full border border-white/20"/>
                                <div className={`w-12 h-12 rounded-full ${gameState.songs[gameState.songs.length-1].isViral ? 'bg-rose-500' : 'bg-amber-400'}`}/>
                            </div>
                            <div className="relative z-10 flex-1 min-w-0">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 bg-white inline-block px-2 py-1 rounded shadow-sm">
                                    Latest Release
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 tracking-tight truncate leading-none mb-1">
                                    {gameState.songs[gameState.songs.length-1].title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                                    <span className="bg-slate-200 px-1.5 rounded">{gameState.songs[gameState.songs.length-1].genre}</span>
                                    {gameState.songs[gameState.songs.length-1].lyricTheme && <span>• {gameState.songs[gameState.songs.length-1].lyricTheme}</span>}
                                </div>
                                
                                <p className="text-[10px] font-medium text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                                    "{gameState.songs[gameState.songs.length-1].description}"
                                </p>

                                {gameState.songs[gameState.songs.length-1].credits && (
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-2 bg-slate-200/50 inline-flex px-2 py-1 rounded">
                                        <PenTool size={10}/>
                                        <span>Composed by {gameState.songs[gameState.songs.length-1].credits.composer} / Lyrics by {gameState.songs[gameState.songs.length-1].credits.lyricist}</span>
                                    </div>
                                )}

                                <div className="flex gap-3 mt-2">
                                    <div className="flex items-center gap-1 text-[10px] font-bold bg-white/80 px-2 py-1 rounded shadow-sm">
                                        <Star size={10} className="text-amber-500 fill-amber-500"/>
                                        <span>Quality: {Math.floor(gameState.songs[gameState.songs.length-1].quality)}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold bg-white/80 px-2 py-1 rounded shadow-sm">
                                        <Heart size={10} className="text-rose-500 fill-rose-500"/>
                                        <span>Pop: {gameState.songs[gameState.songs.length-1].popularity}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full text-slate-400 py-8">
                            <Disc size={40} className="mb-2 opacity-50"/>
                            <span className="font-black uppercase tracking-widest text-xs">No Releases Yet</span>
                        </div>
                    )}
                </div>

                {/* 6. RIVAL (Col 6) */}
                <div className="md:col-span-6 relative h-auto rounded-[2.5rem] overflow-hidden group cursor-pointer border border-slate-200 min-h-[240px]">
                    <div className="absolute inset-0 bg-slate-900 group-hover:scale-105 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"/>
                    
                    {gameState.rival.isUnlocked ? (
                        <div className="absolute inset-0 flex flex-col p-10">
                            {/* Header */}
                            <div className="flex justify-between items-start z-10 mb-4">
                                <div>
                                    <div className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                        <Sword size={12}/> Rival Band
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none mb-2">{gameState.rival.name}</h3>
                                    <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-wider">
                                        {gameState.rival.style}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Relation</div>
                                    <div className={`text-4xl font-black ${gameState.rival.relation > 60 ? 'text-emerald-400' : 'text-rose-500'}`}>
                                        {gameState.rival.relation}%
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="relative z-10 text-xs text-slate-400 font-medium leading-relaxed line-clamp-2 max-w-md mb-auto bg-slate-900/50 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                                "{gameState.rival.description}"
                            </p>

                            {/* Footer Stats */}
                            <div className="relative z-10 mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-slate-500"/>
                                    <span className="text-xl font-black text-slate-200">{gameState.rival.fans.toLocaleString()}</span>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Followers</span>
                                </div>
                            </div>

                            {/* Background Art */}
                            <Sword size={240} className="absolute -bottom-10 -right-10 text-white/5 rotate-12"/>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center gap-4 text-slate-600">
                            <Lock size={24}/>
                            <span className="font-black uppercase tracking-[0.2em] text-sm">Rival Locked</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
