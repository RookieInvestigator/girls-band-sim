
import { Disc, PenTool, Star, Heart, Flame, Music2, Activity, Play, ListMusic, AudioWaveform, Sliders } from 'lucide-react';

export const SongsTab = ({ engine }: { engine: any }) => {
    return (
        // Changed container to align-start so sticky works
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 items-start pb-8">
            
            {/* 1. STUDIO DASHBOARD (Left Panel) */}
            {/* Added sticky positioning for desktop so it follows as you scroll the list */}
            <div className={`
                w-full lg:w-[420px] xl:w-[480px] rounded-[2.5rem] relative overflow-hidden shrink-0 transition-all duration-500 flex flex-col
                lg:sticky lg:top-0
                ${engine.gameState.currentProject 
                    ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-slate-100 min-h-[300px]' 
                    : 'bg-white border-2 border-dashed border-slate-200 min-h-[120px] lg:min-h-[200px] hover:border-slate-300 group cursor-pointer'
                }
            `}
            onClick={() => !engine.gameState.currentProject && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
            >
                {engine.gameState.currentProject ? (
                    <div className="absolute inset-0 flex flex-col p-6 md:p-8 lg:p-10 justify-between">
                        {/* Background FX */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse pointer-events-none" />

                        {/* Top Bar */}
                        <div className="relative z-10 flex justify-between items-start mb-6 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-pink-500 rounded-lg animate-pulse shadow-lg shadow-pink-500/20">
                                    <Activity size={20} className="text-white"/>
                                </div>
                                <div>
                                    <h4 className="font-black text-xs text-pink-400 uppercase tracking-[0.3em] mb-1">Recording Studio</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"/>
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Session Active</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 flex flex-col items-end">
                                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Target Genre</span>
                                <span className="text-xs font-black text-white">{engine.gameState.currentProject.genre}</span>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="relative z-10 mb-8 flex-1 flex flex-col justify-center">
                            <div className="mb-2 flex items-center gap-2 opacity-60">
                                <Music2 size={12}/>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Working Title</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] mb-4 line-clamp-3">
                                {engine.gameState.currentProject.title}
                            </h2>
                            <p className="text-sm text-slate-400 font-medium italic border-l-2 border-pink-500 pl-3 py-1">
                                "{engine.gameState.currentProject.description}"
                            </p>
                        </div>

                        {/* Progress Section */}
                        <div className="relative z-10 mt-auto space-y-6 shrink-0 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                            {/* Main Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                        <AudioWaveform size={14}/> Completion
                                    </span>
                                    <span className="text-3xl font-black text-white tracking-tighter leading-none">
                                        {Math.floor(engine.gameState.currentProject.completeness)}<span className="text-sm text-pink-500">%</span>
                                    </span>
                                </div>
                                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                                    {/* Animated Striped Bar */}
                                    <div 
                                        className="h-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-700 ease-out relative" 
                                        style={{width: `${engine.gameState.currentProject.completeness}%`}}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-bar-stripes_1s_linear_infinite] opacity-30"/>
                                    </div>
                                </div>
                            </div>

                            {/* Sub Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1">
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Quality</div>
                                    <div className="text-xl font-black text-amber-400 flex items-center gap-1">
                                        <Star size={16} fill="currentColor"/> {Math.floor(engine.gameState.currentProject.quality)}
                                    </div>
                                </div>
                                <div className="space-y-1 text-right">
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Theme</div>
                                    <div className="text-sm font-bold text-white truncate">{engine.gameState.currentProject.lyricTheme}</div>
                                </div>
                            </div>
                            
                            <div className="pt-2 border-t border-white/10 flex justify-between text-[10px] font-bold text-slate-400">
                                <span>Composer: {engine.gameState.currentProject.credits?.composer}</span>
                                <span>Lyrics: {engine.gameState.currentProject.credits?.lyricist}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8 gap-4 transition-transform group-hover:scale-[1.02]">
                        <div className="p-5 bg-slate-50 rounded-full group-hover:bg-slate-100 transition-colors shadow-sm">
                            <PenTool size={36} className="text-slate-300 group-hover:text-slate-500 transition-colors"/>
                        </div>
                        <div className="text-center">
                            <h4 className="font-black text-xl text-slate-600 uppercase tracking-tight">Studio Idle</h4>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2 bg-slate-100 px-3 py-1 rounded-full inline-block">
                                Start a new project in Schedule
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. DISCOGRAPHY LIST - Removed internal scrolling */}
            <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col min-h-0 relative w-full">
                {/* Playlist Header */}
                <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white/95 backdrop-blur z-20 rounded-t-[2.5rem]">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                            <ListMusic size={24} className="text-slate-900"/> 
                            Discography
                        </h3>
                        <p className="text-xs font-bold text-slate-400 mt-1 pl-1">
                            {engine.gameState.songs.length} Tracks Released
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                            <Sliders size={20}/>
                        </button>
                    </div>
                </div>

                {/* Song List - Natural Flow */}
                <div className="p-0 bg-slate-50/50 rounded-b-[2.5rem]">
                    {engine.gameState.songs.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {engine.gameState.songs.slice().reverse().map((song: any, i: number) => (
                                <div key={song.id} className="group hover:bg-white transition-colors p-4 md:p-6 flex items-center gap-4 md:gap-6 relative first:rounded-t-none last:rounded-b-[2.5rem]">
                                    {/* Numbering */}
                                    <span className="hidden md:block text-2xl font-black text-slate-200 w-8 text-center">{engine.gameState.songs.length - i}</span>

                                    {/* Cover Art */}
                                    <div className={`
                                        w-16 h-16 md:w-20 md:h-20 rounded-2xl shrink-0 shadow-md flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-all
                                        ${song.isViral ? 'bg-gradient-to-br from-rose-500 to-orange-600 ring-2 ring-rose-200' : 'bg-slate-900'}
                                    `}>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
                                        <Disc size={32} className={`text-white/90 ${song.isViral ? 'animate-spin-slow' : ''}`}/>
                                        {song.isViral && (
                                            <div className="absolute top-1 right-1 bg-white text-rose-600 text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                                                <Flame size={8} fill="currentColor"/> HOT
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-base md:text-xl text-slate-900 truncate group-hover:text-pink-600 transition-colors tracking-tight">
                                                {song.title}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 mt-1">
                                                <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase tracking-wider text-[10px]">
                                                    {song.genre}
                                                </span>
                                                <span className="hidden md:inline">•</span>
                                                <span className="truncate max-w-[200px]">By {song.credits?.composer} & {song.credits?.lyricist}</span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 shrink-0 mt-2 md:mt-0">
                                            <div className="flex flex-col items-end w-16">
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Quality</span>
                                                <div className="flex items-center gap-1 text-sm font-black text-slate-700">
                                                    <Star size={12} className="text-amber-400 fill-amber-400"/> {Math.floor(song.quality)}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end w-20">
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Popularity</span>
                                                <div className="flex items-center gap-1 text-sm font-black text-slate-700">
                                                    <Heart size={12} className="text-rose-400 fill-rose-400"/> {song.popularity > 1000 ? (song.popularity/1000).toFixed(1)+'k' : song.popularity}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Play Button Visual */}
                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all cursor-pointer shadow-sm shrink-0 ml-2">
                                        <Play size={20} fill="currentColor" className="ml-1"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-300 opacity-60 min-h-[300px]">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <Music2 size={48} className="stroke-1"/>
                            </div>
                            <p className="font-black text-sm uppercase tracking-widest">No Releases Yet</p>
                            <p className="text-xs font-medium mt-2">Finish a project to add to your discography</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
