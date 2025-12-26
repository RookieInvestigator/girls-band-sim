
import { Disc, PenTool, Star, Heart, Flame, Music2, Activity, Play, ListMusic, AudioWaveform, Sliders, Mic2, Guitar } from 'lucide-react';
import { SongCard } from './Shared';

export const SongsTab = ({ engine }: { engine: any }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 items-start pb-8 pt-4">
            
            {/* 1. STUDIO DASHBOARD (Dark Mode Console) */}
            <div className={`
                w-full lg:w-[400px] rounded-[2.5rem] relative overflow-hidden shrink-0 transition-all duration-500 flex flex-col shadow-2xl
                lg:sticky lg:top-24
                ${engine.gameState.currentProject 
                    ? 'bg-slate-900 text-white min-h-[380px]' 
                    : 'bg-white text-slate-400 min-h-[180px] border border-slate-100 hover:shadow-lg cursor-pointer group'
                }
            `}
            onClick={() => !engine.gameState.currentProject && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
            >
                {/* Background Texture */}
                {engine.gameState.currentProject && (
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none"/>
                )}

                {engine.gameState.currentProject ? (
                    <div className="flex flex-col p-8 h-full justify-between relative z-10">
                        
                        {/* Top Bar */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-500 rounded-lg text-white shadow-lg shadow-rose-500/30 animate-pulse">
                                    <Activity size={16}/>
                                </div>
                                <div>
                                    <h4 className="font-black text-[9px] text-rose-500 uppercase tracking-[0.2em] mb-0.5">Recording</h4>
                                    <div className="text-white font-black text-xs tracking-widest">STUDIO A</div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
                                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">流派</span>
                                <span className="text-[10px] font-bold text-white tracking-wide">{engine.gameState.currentProject.genre}</span>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-black tracking-tighter leading-none mb-3 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 italic">
                                {engine.gameState.currentProject.title}
                            </h2>
                            <p className="text-[10px] text-slate-400 font-medium italic border-t border-slate-800 pt-3 px-4 inline-block max-w-[80%] leading-relaxed">
                                "{engine.gameState.currentProject.description}"
                            </p>
                        </div>

                        {/* Visualizer & Progress */}
                        <div className="mt-auto space-y-6">
                            {/* Fake Visualizer */}
                            <div className="flex items-end justify-center gap-1 h-12 opacity-50">
                                {[...Array(24)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="w-1 bg-rose-500 rounded-full animate-bounce" 
                                        style={{
                                            height: `${20 + Math.random() * 80}%`, 
                                            animationDuration: `${0.5 + Math.random() * 0.5}s`,
                                            animationDelay: `${i * 0.05}s`
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">混音进度</span>
                                    <span className="text-xl font-black text-white tracking-tighter">
                                        {Math.floor(engine.gameState.currentProject.completeness)}<span className="text-xs text-rose-500">%</span>
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-700 ease-out relative shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
                                        style={{width: `${engine.gameState.currentProject.completeness}%`}}
                                    />
                                </div>
                            </div>

                            {/* Sub Stats */}
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">品质</div>
                                    <div className="text-lg font-black text-white flex items-center gap-1">
                                        <Star size={12} className="text-amber-400 fill-amber-400"/> {Math.floor(engine.gameState.currentProject.quality)}
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">主题</div>
                                    <div className="text-xs font-bold text-slate-300 truncate">{engine.gameState.currentProject.lyricTheme}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-6">
                        <div className="p-6 bg-slate-50 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <PenTool size={32} className="text-slate-300 group-hover:text-slate-900 transition-colors"/>
                        </div>
                        <div className="text-center">
                            <h4 className="font-black text-xl text-slate-700 uppercase tracking-tight">录音室闲置</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">
                                开始一个新的企划吧
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. DISCOGRAPHY LIST */}
            <div className="flex-1 w-full flex flex-col gap-6">
                <div className="flex items-end justify-between px-2 pt-1 w-full">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">发行唱片</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 pl-1">
                            {engine.gameState.songs.length} Tracks Released
                        </p>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
                        <ListMusic size={20} className="text-slate-900"/>
                    </div>
                </div>

                <div className="space-y-3">
                    {engine.gameState.songs.length > 0 ? (
                        engine.gameState.songs.slice().reverse().map((song: any, i: number) => (
                            <SongCard key={song.id} song={song} isLatest={i === 0}/>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-300 opacity-60 min-h-[250px] border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                            <Music2 size={32} className="mb-3 text-slate-200"/>
                            <p className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">暂无作品</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
