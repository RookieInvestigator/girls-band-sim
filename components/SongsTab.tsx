
import { Disc, PenTool, Star, Heart, Flame, Music2, Activity, Play, ListMusic } from 'lucide-react';
import { SongCard, StatBar } from './Shared';

export const SongsTab = ({ engine }: { engine: any }) => {
    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full pb-20 lg:pb-0">
            {/* LEFT: DISCOGRAPHY LIST */}
            <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col h-full overflow-hidden">
                        
                        {/* Header - Moved Stats to left/bottom to avoid top right */}
                        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-end bg-white z-10 relative gap-4">
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <ListMusic size={14}/> Discography
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                                    Released Tracks
                                </h3>
                            </div>
                            <div className="text-left md:text-right flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl">
                                <div className="text-3xl font-black text-slate-900 leading-none">{engine.gameState.songs.length}</div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Total<br/>Songs</div>
                            </div>
                        </div>

                        {/* Song List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                        {engine.gameState.songs.length > 0 ? (
                            engine.gameState.songs.slice().reverse().map((song: any, i: number) => (
                                <div key={song.id} className="group relative bg-white p-4 rounded-3xl border border-slate-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 flex items-center gap-5">
                                    {/* Cover Art Placeholder */}
                                    <div className={`w-20 h-20 rounded-2xl shrink-0 shadow-md flex items-center justify-center relative overflow-hidden ${song.isViral ? 'bg-gradient-to-br from-rose-500 to-orange-500' : 'bg-slate-900'}`}>
                                        <Disc size={32} className={`text-white/80 ${song.isViral ? 'animate-spin-slow' : ''}`}/>
                                        <div className="absolute inset-0 bg-black/10 rounded-2xl ring-1 ring-inset ring-white/10"/>
                                    </div>

                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-black text-lg text-slate-900 truncate tracking-tight group-hover:text-pink-600 transition-colors">{song.title}</h4>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-0.5">
                                                    <span className="uppercase tracking-wider">{song.genre}</span>
                                                    <span>•</span>
                                                    <span>{song.credits?.composer} & {song.credits?.lyricist}</span>
                                                </div>
                                            </div>
                                            {song.isViral && (
                                                <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border border-rose-100">
                                                    <Flame size={10}/> Viral
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="mt-3 flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                <Star size={10} className="text-amber-400 fill-amber-400"/>
                                                Quality: {Math.floor(song.quality)}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                <Heart size={10} className="text-pink-400 fill-pink-400"/>
                                                Pop: {song.popularity}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 items-center justify-center text-slate-300 group-hover:bg-pink-500 group-hover:text-white transition-all cursor-pointer">
                                        <Play size={16} fill="currentColor" className="ml-0.5"/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-60">
                                <Music2 size={48} className="mb-4"/>
                                <p className="font-black text-sm uppercase tracking-widest">No Releases Yet</p>
                            </div>
                        )}
                        </div>
                </div>
            </div>

            {/* RIGHT: CURRENT PROJECT CARD */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden shrink-0 min-h-[350px] flex flex-col ring-8 ring-slate-100">
                        {/* Background */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse" />
                        
                        <div className="relative z-10 flex-1 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-black text-xs text-pink-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Activity size={14} className="animate-pulse"/> Studio Status
                                </h4>
                                <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping"/>
                            </div>
                        
                            {engine.gameState.currentProject ? (
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 inline-block px-2 py-1 rounded mb-2">Work In Progress</div>
                                        <div className="text-3xl font-black leading-tight tracking-tight">{engine.gameState.currentProject.title}</div>
                                        <div className="text-sm text-slate-400 font-medium italic">"{engine.gameState.currentProject.description}"</div>
                                    </div>
                                    
                                    <div className="space-y-6 mt-8">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                <span>Completion</span>
                                                <span className="text-white">{Math.floor(engine.gameState.currentProject.completeness)}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_0_10px_#ec4899]" 
                                                    style={{width: `${engine.gameState.currentProject.completeness}%`}}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Genre</div>
                                                <div className="text-xs font-black text-slate-200 truncate">{engine.gameState.currentProject.genre}</div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Theme</div>
                                                <div className="text-xs font-black text-slate-200 truncate">{engine.gameState.currentProject.lyricTheme}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center mb-4">
                                        <PenTool size={32} className="text-slate-500"/>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-center text-slate-500">No Active Project</span>
                                </div>
                            )}
                        </div>
                </div>
            </div>
        </div>
    );
};
