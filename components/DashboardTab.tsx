
import { useState, useMemo } from 'react';
import { 
    Music, Star, Zap, Disc, Sword, Activity, Sparkles, Book, Lock, Smile, Coffee, 
    ChevronRight, Check, Users, Coins, TrendingUp, Crown, ArrowRight, Radio, 
    Megaphone, Newspaper, Command, LayoutGrid, Heart 
} from 'lucide-react';
import { BandState } from '../types';
import { SKILL_TREE } from '../data/skills';
import { NEWS_LIBRARY } from '../data/news_content';

export const DashboardTab = ({ engine }: { engine: any }) => {
    const { gameState, setBandState } = engine;
    const [isStateMenuOpen, setIsStateMenuOpen] = useState(false);

    const isStateUnlocked = (s: BandState) => {
        if (s === BandState.Normal) return true;
        const skill = SKILL_TREE.find(n => n.effect?.unlockState === s);
        return skill && gameState.unlockedSkills.includes(skill.id);
    };

    const getStateConfig = (s: BandState) => {
        switch(s) {
            case BandState.Serious: return { label: 'SERIOUS', desc: '训练效果UP / 压力UP', bg: 'bg-amber-500', text: 'text-white' };
            case BandState.Relaxed: return { label: 'RELAXED', desc: '恢复效果UP / 羁绊UP', bg: 'bg-emerald-500', text: 'text-white' };
            default: return { label: 'NORMAL', desc: '标准平衡状态', bg: 'bg-slate-900', text: 'text-white' };
        }
    };

    const currentStateConfig = getStateConfig(gameState.bandState);

    // Progress to Budokan (100,000 fans)
    const rawProgress = (gameState.fans / 100000) * 100;
    const progress = Math.min(100, rawProgress);

    // News
    const newsItems = useMemo(() => {
        const items = [];
        // Rival News
        if (gameState.rival.isUnlocked) {
            items.push(`【劲敌情报】${gameState.rival.name} 的粉丝数突破了 ${gameState.rival.fans}！`);
        }
        // Random
        items.push(NEWS_LIBRARY.industry[Math.floor(Math.random() * NEWS_LIBRARY.industry.length)]);
        items.push(NEWS_LIBRARY.trend[Math.floor(Math.random() * NEWS_LIBRARY.trend.length)]);
        return items;
    }, [gameState.currentWeek]);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans h-full">
            
            {/* --- HEADER: Magazine Style --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-slate-900 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                            Vol. {Math.ceil(gameState.currentWeek / 4)}
                        </span>
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                            {gameState.bandState} MODE ACTIVE
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.85] uppercase italic">
                        {gameState.bandName || 'NO NAME'}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => engine.setShowSkillTree(true)}
                        className="group flex items-center gap-3 bg-white border-2 border-slate-900 px-5 py-3 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                        <div className="flex flex-col items-end leading-none">
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Strategy</span>
                            <span className="text-sm font-black">队长手账</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-xs group-hover:bg-white group-hover:text-slate-900 transition-colors">
                            {gameState.skillPoints}
                        </div>
                    </button>
                </div>
            </div>

            {/* --- BENTO GRID LAYOUT --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                
                {/* 1. HERO CARD (Col 8) */}
                <div className="md:col-span-8 bg-slate-900 text-white rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px] group shadow-2xl">
                    {/* Abstract Background */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-rose-500/30 via-purple-600/20 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none animate-pulse"/>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"/>
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                <Crown size={12}/> Current Goal
                            </div>
                            <div className="text-3xl font-black italic tracking-tighter">BUDOKAN LIVE</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                            <span className="text-xs font-bold text-slate-300">FANS</span>
                        </div>
                    </div>

                    {/* Big Stats */}
                    <div className="relative z-10 flex items-end gap-4 mt-8">
                        <div className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                            {gameState.fans.toLocaleString()}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative z-10 mt-auto pt-8">
                        <div className="flex justify-between items-end mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Road to Legend</span>
                            <span className="text-white">{Math.floor(rawProgress)}%</span>
                        </div>
                        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10 p-0.5">
                            <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 relative overflow-hidden transition-all duration-1000" style={{width: `${progress}%`}}>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"/>
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/80 box-shadow-[0_0_10px_white]"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. COMMAND CENTER (Col 4) */}
                <div className="md:col-span-4 bg-white rounded-[2rem] p-6 border-2 border-slate-100 shadow-[8px_8px_0px_0px_rgba(241,245,249,1)] flex flex-col relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                            <Command size={20}/>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tactics</div>
                            <div className="text-lg font-black text-slate-900 leading-none">队长指令</div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
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
                                        relative w-full p-4 rounded-xl text-left transition-all duration-200 border-2
                                        ${isActive 
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-[1.02] z-10' 
                                            : (unlocked ? 'bg-white border-slate-200 hover:border-slate-400 text-slate-500 hover:bg-slate-50' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed')
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-black text-sm uppercase tracking-wider">{conf.label}</span>
                                        {!unlocked ? <Lock size={12}/> : (isActive && <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"/>)}
                                    </div>
                                    <div className={`text-[10px] font-bold mt-1 ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                                        {conf.desc}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. NEWS TICKER (Full Width) */}
                <div className="md:col-span-12 bg-rose-500 text-white rounded-2xl py-3 px-6 flex items-center gap-4 overflow-hidden shadow-lg shadow-rose-500/20 relative">
                    <div className="flex items-center gap-2 font-black uppercase tracking-widest shrink-0 z-10 bg-rose-500 pr-4">
                        <Radio size={16} className="animate-pulse"/> Breaking News
                    </div>
                    <div className="flex-1 overflow-hidden relative h-6">
                        <div className="absolute whitespace-nowrap animate-marquee flex gap-16 font-bold text-sm items-center">
                            {newsItems.map((news, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"/>
                                    {news}
                                </span>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {newsItems.map((news, i) => (
                                <span key={`dup-${i}`} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"/>
                                    {news}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. STATS MONITOR (Col 6) */}
                <div className="md:col-span-6 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                            <Activity size={18}/> BAND STATUS
                        </h3>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"/>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"/>
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"/>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { l: 'Technique', v: gameState.teamStats.technique, c: 'bg-indigo-500' },
                            { l: 'Appeal', v: gameState.teamStats.appeal, c: 'bg-amber-500' },
                            { l: 'Stability', v: gameState.teamStats.stability, c: 'bg-sky-500' },
                            { l: 'Chemistry', v: gameState.teamStats.chemistry, c: 'bg-pink-500' },
                        ].map(s => (
                            <div key={s.l} className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group hover:bg-slate-100 transition-colors">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.l}</div>
                                <div className="text-3xl font-black text-slate-900">{Math.floor(s.v)}</div>
                                <div className={`absolute bottom-0 left-0 h-1.5 ${s.c} transition-all duration-500`} style={{width: `${Math.min(100, s.v)}%`}}/>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. LATEST DISC (Col 6) */}
                <div className="md:col-span-6 bg-slate-100 rounded-[2rem] p-6 border border-slate-200 relative overflow-hidden flex items-center gap-6 group hover:bg-white transition-colors">
                    {/* Decorative */}
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
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                                    {gameState.songs[gameState.songs.length-1].genre}
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-slate-400">QUAL</span>
                                        <span className="text-lg font-black text-slate-800">{Math.floor(gameState.songs[gameState.songs.length-1].quality)}</span>
                                    </div>
                                    <div className="w-px h-8 bg-slate-300"/>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-slate-400">POP</span>
                                        <span className="text-lg font-black text-slate-800">{gameState.songs[gameState.songs.length-1].popularity}</span>
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

                {/* 6. RIVAL (Col 12 - Banner) */}
                <div className="md:col-span-12 relative h-32 rounded-[2rem] overflow-hidden group cursor-pointer border border-slate-200">
                    <div className="absolute inset-0 bg-slate-900 group-hover:scale-105 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"/>
                    
                    {gameState.rival.isUnlocked ? (
                        <div className="absolute inset-0 flex items-center justify-between px-8 md:px-12">
                            <div className="z-10">
                                <div className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] mb-1">Rival Band</div>
                                <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase">{gameState.rival.name}</h3>
                            </div>
                            <div className="z-10 flex flex-col items-end">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Relation</div>
                                <div className={`text-4xl font-black ${gameState.rival.relation > 60 ? 'text-emerald-400' : 'text-rose-500'}`}>
                                    {gameState.rival.relation}%
                                </div>
                            </div>
                            <Sword size={180} className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/5 rotate-12"/>
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
