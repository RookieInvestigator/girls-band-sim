
import { useState, useMemo } from 'react';
import { 
    Music, Star, Zap, Disc, Sword, Activity, Sparkles, Book, Lock, Smile, Coffee, 
    ChevronRight, Check, Users, Coins, TrendingUp, Crown, ArrowRight, Radio, 
    Megaphone, Newspaper, Command, LayoutGrid, Heart, Mic2, BarChart3, PenTool,
    Skull, Flame, Sun, Moon, Cloud, Umbrella, Anchor, X, Hexagon,
    Bird, Cat, Dog, Fish, Rabbit, Bug,
    Flower, Leaf, TreeDeciduous, Droplets, Snowflake, Wind,
    Gem, Gift, GlassWater, Headphones, Key, Map, Rocket, Trophy, Watch,
    Atom, Award, Compass, Cookie, Feather, Ghost, Globe, GraduationCap, IceCream,
    Infinity, Joystick, Lightbulb, Magnet, Medal, Palette, Plane, Puzzle, Scissors,
    Shirt, Speaker, Ticket, Wand, Banana, Cherry, Pizza, Candy, Bike
} from 'lucide-react';
import { BandState } from '../types';
import { SKILL_TREE } from '../data/skills';

// --- ICON MAP FOR PICKER (Expanded) ---
const BAND_ICONS: Record<string, any> = {
    // Basics
    'crown': Crown, 'music': Music, 'zap': Zap, 'star': Star, 'heart': Heart,
    'skull': Skull, 'flame': Flame, 'sun': Sun, 'moon': Moon, 'cloud': Cloud,
    'umbrella': Umbrella, 'anchor': Anchor, 'mic': Mic2, 'disc': Disc, 'sword': Sword,
    
    // Animals
    'bird': Bird, 'cat': Cat, 'dog': Dog, 'fish': Fish, 'rabbit': Rabbit, 'bug': Bug,
    
    // Nature
    'flower': Flower, 'leaf': Leaf, 'tree': TreeDeciduous, 'water': Droplets, 'snow': Snowflake, 'wind': Wind,
    
    // Objects
    'gem': Gem, 'gift': Gift, 'glass': GlassWater, 'headphones': Headphones, 'key': Key, 'map': Map,
    'rocket': Rocket, 'trophy': Trophy, 'watch': Watch,
    
    // Abstract / Misc
    'atom': Atom, 'award': Award, 'coffee': Coffee, 'compass': Compass, 'cookie': Cookie,
    'feather': Feather, 'ghost': Ghost, 'globe': Globe, 'grad': GraduationCap, 'icecream': IceCream,
    'infinity': Infinity, 'joystick': Joystick, 'lightbulb': Lightbulb, 'magnet': Magnet,
    'medal': Medal, 'palette': Palette, 'plane': Plane, 'puzzle': Puzzle, 'scissors': Scissors,
    'shirt': Shirt, 'smile': Smile, 'speaker': Speaker, 'ticket': Ticket, 'wand': Wand,
    'banana': Banana, 'cherry': Cherry, 'pizza': Pizza, 'candy': Candy, 'bike': Bike
};

export const DashboardTab = ({ engine }: { engine: any }) => {
    const { gameState, setBandState, setShowSkillTree, updateBandIcon } = engine;
    const stats = gameState.teamStats;
    const [showIconPicker, setShowIconPicker] = useState(false);

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

    // Current Band Icon
    const BandIcon = BAND_ICONS[gameState.bandIconId || 'crown'] || Crown;

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
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans h-full relative">
            
            {/* --- ICON PICKER MODAL --- */}
            {showIconPicker && (
                <div className="absolute top-24 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in zoom-in-95 duration-200 w-72">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Select Icon</span>
                        <button onClick={() => setShowIconPicker(false)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                    </div>
                    <div className="grid grid-cols-5 gap-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-hide">
                        {Object.entries(BAND_ICONS).map(([key, IconComponent]) => (
                            <button
                                key={key}
                                onClick={() => { updateBandIcon(key); setShowIconPicker(false); }}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${gameState.bandIconId === key ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
                                title={key}
                            >
                                <IconComponent size={20}/>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* --- HEADER (Editorial Style) --- */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group min-h-[140px] flex items-center">
                {/* Decorative Elements */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-50 rounded-full pointer-events-none"/>
                <div className="absolute right-20 bottom-[-20px] w-20 h-20 bg-rose-50 rounded-full pointer-events-none"/>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
                    
                    <div className="flex items-center gap-6 w-full md:w-auto">
                        {/* Logo Mark */}
                        <button 
                            onClick={() => setShowIconPicker(!showIconPicker)}
                            className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 hover:rotate-3 transition-all shrink-0 active:scale-95 group/icon relative"
                        >
                            <BandIcon size={36} className="text-white group-hover/icon:text-rose-400 transition-colors"/>
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"/>
                        </button>
                        
                        {/* Typography */}
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">Artist Profile</span>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9] truncate max-w-2xl">
                                {gameState.bandName || 'NO NAME'}
                            </h1>
                        </div>
                    </div>

                    {/* Rating Stamp */}
                    <div className="relative shrink-0 group/rating cursor-default">
                        <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 group-hover/rating:opacity-30 transition-opacity"/>
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full text-slate-900 animate-[spin_10s_linear_infinite] opacity-10" viewBox="0 0 100 100">
                                <path id="curve" d="M 20 50 A 30 30 0 1 1 80 50 A 30 30 0 1 1 20 50" fill="transparent" />
                                <text width="100%">
                                    <textPath href="#curve" className="text-[10px] font-black uppercase tracking-widest fill-current">
                                        Band Rank System • Band Rank System •
                                    </textPath>
                                </text>
                            </svg>
                            <div className="text-5xl font-black text-rose-500 italic tracking-tighter drop-shadow-sm">
                                {stats.totalRating}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                
                {/* 1. HERO CARD (Budokan) */}
                <div className="md:col-span-8 bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[320px] group shadow-2xl">
                    {/* Background Art */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/30 via-rose-600/10 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none animate-pulse"/>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none"/>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"/>
                    
                    {/* Top Row: Clean Label */}
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] mb-1">Next Goal</span>
                            <div className="text-2xl font-black italic tracking-tighter uppercase text-white flex items-center gap-2">
                                <Crown size={20} className="text-amber-400 fill-amber-400"/>
                                {gameState.fans >= 100000 ? 'WORLD TOUR' : 'BUDOKAN'}
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                            {Math.floor(rawProgress)}% Complete
                        </div>
                    </div>

                    {/* Middle: Big Number - Optimized to prevent clipping */}
                    <div className="relative z-10 flex flex-col justify-center flex-1 my-4">
                        <div className="flex items-baseline flex-wrap">
                            {/* Added pr-4 to prevent right-side clipping of italic fonts */}
                            <div className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-white drop-shadow-2xl pr-4 -ml-1">
                                {gameState.fans.toLocaleString()}
                            </div>
                            <span className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400 tracking-[0.2em] uppercase self-end mb-2 md:mb-4">
                                Fans
                            </span>
                        </div>
                    </div>

                    {/* Bottom: Progress Bar */}
                    <div className="relative z-10 mt-auto">
                        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
                            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 relative overflow-hidden transition-all duration-1000" style={{width: `${progress}%`}}>
                                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"/>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <span>0</span>
                            <span>Target: 100,000</span>
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
