
import React, { useState } from 'react';
import { Star, Disc, Flame } from 'lucide-react';

export const StatBar = ({ label, value, color, icon: Icon, showMax = false }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const max = showMax ? 100 : 120;
  // Ensure bar is at least visible (5%) even if value is low
  const widthPercent = Math.min(100, Math.max(5, (value / max) * 100));

  // Rank Calculation
  let rank = 'E';
  if (value >= 100) rank = 'SS';
  else if (value >= 90) rank = 'S';
  else if (value >= 80) rank = 'A';
  else if (value >= 60) rank = 'B';
  else if (value >= 40) rank = 'C';
  else if (value >= 20) rank = 'D';

  // Low value is C and below (Rank B starts at 60)
  const isLow = value < 60;
  
  // Extract color name like 'rose', 'blue' from 'bg-rose-500'
  const colorName = color.replace('bg-', '').replace('-500', '');

  // Flat style classes without gloss/highlights
  const activeBarClass = isLow
    ? "bg-slate-300"
    : `bg-${colorName}-500 shadow-sm`;

  const iconColor = isLow ? "text-slate-300" : `text-${colorName}-500`;
  const rankColor = isLow ? "text-slate-300" : `text-${colorName}-500`;

  return (
    <div
      className="w-full group/stat select-none cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-end mb-1.5 px-1">
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/stat:text-slate-600 transition-colors">
          <Icon size={12} className={iconColor} />
          <span>{label}</span>
        </div>
        <div className={`text-xs font-black tabular-nums transition-all duration-300 ${isHovered ? 'scale-125 text-slate-800' : rankColor}`}>
          {isHovered ? Math.floor(value) : rank}
        </div>
      </div>
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-[2px]">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative ${activeBarClass}`}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
};

export const SongCard: React.FC<{ song: any, isLatest?: boolean }> = ({ song, isLatest }) => (
  <div className={`relative flex items-center gap-4 p-5 rounded-[2rem] transition-all group active:scale-95 ${song.isViral ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/30' : 'bg-white shadow-sm hover:shadow-lg border border-slate-100'}`}>
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden ${song.isViral ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/20' : 'bg-slate-50 text-slate-300'}`}>
        <Disc size={28} className={song.isViral || isLatest ? 'animate-spin-slow' : ''} />
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <h4 className={`font-black text-lg truncate ${song.isViral ? 'text-white' : 'text-slate-900'}`}>{song.title}</h4>
        {song.isViral && <span className="text-[9px] font-black bg-white text-slate-900 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1"><Flame size={8}/> Viral</span>}
        {isLatest && !song.isViral && <span className="text-[9px] font-black bg-rose-500 text-white px-2 py-0.5 rounded uppercase tracking-wider">New</span>}
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${song.isViral ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
            {song.genre}
        </span>
        <div className={`flex items-center gap-1 text-[10px] font-bold ml-auto ${song.isViral ? 'text-white/80' : 'text-slate-400'}`}>
            <Star size={10} fill="currentColor" className="text-amber-400"/>
            <span>{Math.floor(song.quality)}</span>
        </div>
      </div>
    </div>
  </div>
);
