
import { Disc, PenTool, Star, Heart, Flame, Music2, Activity } from 'lucide-react';
import { SongCard, StatBar } from './Shared';

export const SongsTab = ({ engine }: { engine: any }) => {
    return (
        <div className="h-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* LEFT: DISCOGRAPHY */}
            <div className="lg:col-span-8 space-y-6 overflow-hidden flex flex-col">
                <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100 h-full flex flex-col">
                        <h3 className="text-2xl font-black text-slate-900 mb-8 px-2 flex items-center gap-3">
                            <div className="p-2 bg-slate-900 text-white rounded-xl"><Disc size={20}/></div>
                            DISCOGRAPHY
                        </h3>
                        <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide pr-2">
                        {engine.gameState.songs.length > 0 ? (
                            engine.gameState.songs.map((song: any) => (
                                <SongCard key={song.id} song={song} isLatest={song.id === engine.gameState.songs[engine.gameState.songs.length-1].id} />
                            ))
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-300 bg-slate-50/50">
                                <Music2 size={32} className="mx-auto mb-4 opacity-50"/>
                                <p className="font-bold text-sm uppercase tracking-widest">No Releases Yet</p>
                            </div>
                        )}
                        </div>
                </div>
            </div>

            {/* RIGHT: CURRENT PROJECT */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-slate-900 text-white p-6 lg:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden shrink-0 min-h-[400px] flex flex-col">
                        {/* Background */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        
                        <div className="relative z-10 flex-1 flex flex-col">
                        <h4 className="font-black text-xs text-pink-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                            <Activity size={14}/> Current Project
                        </h4>
                        
                        {engine.gameState.currentProject ? (
                            <div className="space-y-8 flex-1 flex flex-col">
                                <div>
                                    <div className="text-3xl font-black leading-tight tracking-tight mb-2">{engine.gameState.currentProject.title}</div>
                                    <div className="text-sm text-slate-400 font-medium">{engine.gameState.currentProject.description}</div>
                                </div>
                                
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-4 backdrop-blur-sm">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <span>Progress</span>
                                        <span className="text-white">{Math.floor(engine.gameState.currentProject.completeness)}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                                        <div 
                                            className="h-full bg-gradient-to-r from-pink-600 to-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-700 ease-out relative" 
                                            style={{width: `${engine.gameState.currentProject.completeness}%`}}
                                        >
                                            <div className="absolute top-0 right-0 h-full w-1 bg-white/50 animate-pulse"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                            {engine.gameState.currentProject.genre}
                                        </div>
                                        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                            {engine.gameState.currentProject.lyricTheme}
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-[10px] font-bold text-pink-200 leading-relaxed">
                                        TIP: Schedule "Creation" activities to progress.
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-30">
                                <PenTool size={48} className="mb-4 text-slate-500"/>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-center">No Active Project</span>
                            </div>
                        )}
                        </div>
                </div>
            </div>
        </div>
    );
};
