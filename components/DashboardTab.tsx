
import { 
    Music, Star, Disc, Activity, Sparkles, Book, Lock, Command, Heart, Crown, Sword, Users, TrendingUp, Zap
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
            case BandState.Serious: return { label: '严肃模式', desc: '训练UP / 压力UP', bg: 'bg-amber-500', text: 'text-white', dot: 'bg-white' };
            case BandState.Relaxed: return { label: '轻松模式', desc: '恢复UP / 羁绊UP', bg: 'bg-emerald-500', text: 'text-white', dot: 'bg-white' };
            default: return { label: '标准模式', desc: '标准平衡', bg: 'bg-slate-900', text: 'text-white', dot: 'bg-white' };
        }
    };

    const rawProgress = (gameState.fans / 100000) * 100;
    const progress = Math.min(100, rawProgress);
    const newsItems = gameState.currentNews || ["今天也是和平的一天。"];

    const StatGroup = ({ title, total, icon: Icon, items, color, accent }: any) => (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${color} text-white`}>
                        <Icon size={16}/>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">{title}</h4>
                        <div className="text-2xl font-black text-slate-900 leading-none tracking-tight">{total}</div>
                    </div>
                </div>
                <div className="space-y-2">
                    {items.map((item: any) => (
                        <div key={item.label} className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-slate-500">{item.label}</span>
                            <div className="flex items-center gap-2 flex-1 justify-end">
                                <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${color}`} style={{width: `${Math.min(100, item.value)}%`}}/>
                                </div>
                                <span className="font-black text-slate-900 w-5 text-right tabular-nums">{Math.floor(item.value)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-5 font-sans w-full pb-10 pt-4">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col gap-4 mb-2 w-full">
                <div className="flex justify-between items-end w-full">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">
                                Vol. {Math.ceil(gameState.currentWeek / 4)}
                            </span>
                            <div className="h-px w-6 bg-slate-300"/>
                            <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                                #BandLife
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9] italic uppercase">
                            {gameState.bandName || 'NO NAME'}
                        </h1>
                    </div>
                    
                    {/* Compact Stats Row */}
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rank</span>
                            <span className="text-xl font-black text-slate-900 leading-none">{stats.totalRating}</span>
                        </div>
                        <div className="w-px h-6 bg-slate-100"/>
                        <div className="p-1.5 bg-slate-100 rounded-lg">
                            <Activity size={16} className="text-slate-400"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* 1. HERO CARD (Compact) */}
                <div className="md:col-span-8 bg-slate-900 text-white rounded-[1.5rem] p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900"/>
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-3">
                                <Crown size={10} className="text-amber-300 fill-amber-300"/> 
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Goal</span>
                            </div>
                            <div className="text-3xl md:text-5xl font-black tracking-tighter italic text-white">
                                日本武道馆
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="flex items-end gap-3 mb-6">
                            <div className="text-6xl md:text-7xl font-black tracking-tighter leading-none text-white">
                                {gameState.fans.toLocaleString()}
                            </div>
                            <div className="pb-2 flex flex-col">
                                <TrendingUp size={20} className="text-emerald-400 mb-0.5"/>
                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Fans</span>
                            </div>
                        </div>

                        <div className="relative pt-1">
                            <div className="flex justify-between items-end mb-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60">
                                <span>Progress</span>
                                <span className="text-white">{Math.floor(rawProgress)}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10">
                                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 relative" style={{width: `${progress}%`}}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN */}
                <div className="md:col-span-4 flex flex-col gap-5">
                    <button 
                        onClick={() => setShowSkillTree(true)}
                        className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-all h-[130px] relative overflow-hidden"
                    >
                        <div className="absolute top-4 right-4 text-slate-100 group-hover:text-rose-100 transition-colors">
                            <Book size={64}/>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-1.5 text-[9px] font-black text-rose-500 uppercase tracking-[0.2em] mb-1">
                                <Sparkles size={10}/> Skill Tree
                            </div>
                            <div className="text-2xl font-black tracking-tight text-slate-900">
                                队长手记
                            </div>
                        </div>
                        <div className="relative z-10 mt-auto flex items-center gap-2">
                            <div className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-black">
                                {gameState.skillPoints} <span className="text-[9px] font-bold text-slate-400">PP</span>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400">Available</span>
                        </div>
                    </button>

                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-200 flex flex-col gap-3 flex-1">
                        <div className="flex items-center justify-between px-1 mb-0.5">
                            <div className="flex items-center gap-1.5 text-slate-900">
                                <Command size={14}/>
                                <h4 className="font-black text-xs uppercase tracking-widest">方针</h4>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
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
                                            w-full px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-200 relative overflow-hidden
                                            ${isActive 
                                                ? `${conf.bg} ${conf.text}` 
                                                : (unlocked ? 'bg-slate-50 hover:bg-slate-100 text-slate-600' : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50')
                                            }
                                        `}
                                    >
                                        <div className="flex flex-col items-start relative z-10">
                                            <span className="font-black text-[10px] uppercase tracking-wider">{conf.label}</span>
                                        </div>
                                        {isActive && <div className={`w-1.5 h-1.5 rounded-full ${conf.dot} relative z-10`}/>}
                                        {!unlocked && <Lock size={12}/>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 3. NEWS TICKER (Compact) */}
                <div className="md:col-span-12 bg-white border border-slate-200 rounded-xl py-3 px-2 flex items-center overflow-hidden">
                    <div className="bg-rose-500 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest shrink-0 ml-2 z-10">
                        NEWS
                    </div>
                    <div className="flex-1 overflow-hidden relative h-5 ml-4">
                        <div className="absolute whitespace-nowrap animate-marquee flex gap-12 font-bold text-xs text-slate-600 items-center">
                            {newsItems.map((news: string, i: number) => (
                                <span key={i} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"/>
                                    {news}
                                </span>
                            ))}
                            {newsItems.map((news: string, i: number) => (
                                <span key={`dup-${i}`} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"/>
                                    {news}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. STATS MONITOR */}
                <div className="md:col-span-12">
                    <h3 className="font-black text-xl text-slate-900 flex items-center gap-2 mb-4 px-1 italic tracking-tight">
                        <Activity size={20} className="text-slate-300"/> 乐队分析
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatGroup title="演奏力" total={stats.performance} icon={Music} color="bg-sky-500" accent="sky"
                            items={[{ label: '精准', value: stats.precision }, { label: '音色', value: stats.tone }, { label: '律动', value: stats.rhythm }, { label: '动态', value: stats.dynamics }]} />
                        <StatGroup title="舞台力" total={stats.stage} icon={Sparkles} color="bg-amber-500" accent="amber"
                            items={[{ label: '气场', value: stats.aura }, { label: '互动', value: stats.interaction }, { label: '视觉', value: stats.visual }, { label: '改编', value: stats.adaptation }]} />
                        <StatGroup title="羁绊" total={stats.bond} icon={Heart} color="bg-rose-500" accent="rose"
                            items={[{ label: '默契', value: stats.synergy }, { label: '联结', value: stats.connection }, { label: '话题', value: stats.topic }]} />
                        <StatGroup title="创作力" total={stats.work} icon={Disc} color="bg-purple-500" accent="purple"
                            items={[{ label: '叙事', value: stats.narrative }, { label: '旋律', value: stats.melody }, { label: '细节', value: stats.detail }]} />
                    </div>
                </div>

                {/* 5. LATEST DISC */}
                <div className="md:col-span-6 bg-white border border-slate-200 rounded-[2rem] p-8 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    {gameState.songs.length > 0 ? (
                        <>
                            <div className={`w-28 h-28 rounded-xl shrink-0 shadow-md relative z-10 flex items-center justify-center border border-slate-100 ${gameState.songs[gameState.songs.length-1].isViral ? 'bg-rose-100' : 'bg-slate-50'}`}>
                                <Disc size={40} className={`text-slate-300 ${gameState.songs[gameState.songs.length-1].isViral ? 'text-rose-500' : ''}`}/>
                            </div>
                            <div className="flex-1 min-w-0 relative z-10">
                                <div className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1.5 bg-rose-50 inline-block px-2 py-0.5 rounded-full">
                                    New Release
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 tracking-tight truncate leading-tight mb-2 italic">
                                    {gameState.songs[gameState.songs.length-1].title}
                                </h4>
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider mb-0.5">Quality</span>
                                        <div className="flex items-center gap-1 font-black text-slate-900 text-lg leading-none">
                                            <Star size={12} className="text-amber-400 fill-amber-400"/> {Math.floor(gameState.songs[gameState.songs.length-1].quality)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider mb-0.5">Sales</span>
                                        <div className="flex items-center gap-1 font-black text-slate-900 text-lg leading-none">
                                            {gameState.songs[gameState.songs.length-1].popularity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full text-slate-300 py-2">
                            <Disc size={32} className="mb-2 opacity-50"/>
                            <span className="font-bold uppercase tracking-widest text-[10px]">暂无作品</span>
                        </div>
                    )}
                </div>

                {/* 6. RIVAL */}
                <div className="md:col-span-6 bg-slate-900 rounded-[2rem] relative overflow-hidden p-8 shadow-md border border-slate-800">
                    
                    {gameState.rival.isUnlocked ? (
                        <div className="flex flex-col h-full justify-between relative z-10 text-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-[9px] font-black text-slate-950 bg-white px-2 py-0.5 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">
                                        Rival
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none italic">
                                        {gameState.rival.name}
                                    </h3>
                                    <div className="text-[10px] font-bold text-slate-400 mt-3 bg-white/10 px-2 py-1 inline-block rounded-md border border-white/10">
                                        {gameState.rival.style}
                                    </div>
                                </div>
                                <div className="text-right bg-slate-800 p-3 rounded-xl border border-slate-700">
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">关系</div>
                                    <div className={`text-xl font-black ${gameState.rival.relation > 60 ? 'text-emerald-400' : 'text-rose-500'}`}>
                                        {gameState.rival.relation}%
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Users size={16}/>
                                    <span className="text-lg font-black text-white">{gameState.rival.fans.toLocaleString()}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Fans</span>
                                </div>
                                <Sword size={24} className="text-slate-600"/>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 gap-3">
                            <div className="p-4 bg-slate-800 rounded-full"><Lock size={24} className="text-slate-600"/></div>
                            <span className="font-black uppercase tracking-[0.2em] text-xs">劲敌未解锁</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
