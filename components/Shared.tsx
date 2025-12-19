
import React from 'react';
import { Star, Heart, Disc, Music, FileText, Palette, LucideIcon, PenTool, Flame } from 'lucide-react';

export const StatBar = ({ label, value, color, icon: Icon, showPercent = true, max = 100 }: any) => {
  const isOverMax = value > max;
  const widthPercent = Math.min(100, (value / max) * 100);
  
  return (
    <div className="space-y-1.5 w-full group">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors px-1">
        <div className="flex items-center gap-1.5"><Icon size={12}/> {label}</div>
        <span className={isOverMax ? "text-amber-500 font-black animate-pulse" : ""}>{Math.floor(value)}{showPercent ? '%' : ''}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-50">
        <div className={`h-full transition-all duration-1000 ease-out ${isOverMax ? 'bg-gradient-to-r from-amber-300 to-amber-500' : color} relative`} style={{ width: `${widthPercent}%` }}>
          <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const SongCard: React.FC<{ song: any, isLatest?: boolean }> = ({ song, isLatest }) => (
  <div className={`relative flex items-center gap-4 p-5 rounded-2xl border transition-all ${song.isViral ? 'bg-gradient-to-r from-rose-900 to-amber-900 text-white border-rose-500 ring-2 ring-rose-300 ring-offset-2' : (isLatest ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border-transparent shadow-xl' : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm')}`}>
    <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden ${song.isViral ? 'bg-gradient-to-br from-orange-500 to-red-600' : (isLatest ? 'bg-gradient-to-br from-rose-500 to-amber-500' : 'bg-slate-100')}`}>
        <Disc size={isLatest || song.isViral ? 32 : 24} className={(isLatest || song.isViral) ? 'text-white/80 animate-spin-slow' : 'text-slate-400'} />
        {(isLatest || song.isViral) && <div className="absolute inset-0 bg-white/10 rounded-full" />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <h4 className={`font-black text-lg truncate ${isLatest || song.isViral ? 'text-white' : 'text-slate-800'}`}>{song.title}</h4>
        {song.isViral && <span className="text-[9px] font-black bg-white text-rose-600 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><Flame size={8}/> Viral Hit</span>}
        {isLatest && !song.isViral && <span className="text-[9px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>}
      </div>
      <p className={`text-xs truncate ${isLatest || song.isViral ? 'text-white/70' : 'text-slate-500'}`}>{song.description}</p>
      
      {song.credits && (
        <div className={`mt-2 text-[9px] font-bold uppercase tracking-wider ${isLatest || song.isViral ? 'text-white/60' : 'text-slate-400'}`}>
            曲: {song.credits.composer} / 词: {song.credits.lyricist}
        </div>
      )}

      <div className="flex items-center gap-2 mt-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${isLatest || song.isViral ? 'border-white/20 text-white/60' : 'border-slate-200 text-slate-400'}`}>{song.genre}</span>
        {song.lyricTheme && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 ${isLatest || song.isViral ? 'border-white/20 text-white/60' : 'border-indigo-100 text-indigo-400 bg-indigo-50'}`}>
                <PenTool size={8}/> {song.lyricTheme}
            </span>
        )}
        <div className="flex items-center gap-1 text-[10px] font-bold opacity-80 ml-auto">
            <Star size={10} fill="currentColor" className="text-amber-400"/>
            <span>{Math.floor(song.quality)}</span>
        </div>
      </div>
    </div>
  </div>
);
