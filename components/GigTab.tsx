
import { Lock, Star, CheckCircle2, MapPin, Ticket, Users, AlertCircle, ArrowRight, Music, Trophy, Crown, Sparkles } from 'lucide-react';
import { GIG_DEFINITIONS } from '../data/gigs';

export const GigTab = ({ engine }: { engine: any }) => {
  const { gameState, startGig } = engine;
  const memberCount = gameState.members.length;
  const isMemberEnough = memberCount >= 3; 

  return (
    <div className="flex flex-col h-[calc(100dvh-140px)] lg:h-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-0">
      
      {/* Header - Transparent & Airy */}
      <div className="px-2 py-4 shrink-0 flex items-center justify-between mb-2">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                <Ticket size={24} />
            </div>
            <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Live Stages</h3>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                    Select Your Stage
                </div>
            </div>
         </div>

         {!isMemberEnough && (
            <div className="hidden md:flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-xl text-xs font-bold border border-amber-100 shadow-sm">
                <AlertCircle size={14}/> 
                <span>需 3 人以上成员</span>
            </div>
         )}
      </div>

      {/* Mobile Warning */}
      {!isMemberEnough && (
        <div className="md:hidden mx-2 mb-4 bg-amber-50 text-amber-600 px-4 py-3 rounded-xl text-xs font-bold border border-amber-100 flex items-center gap-2 shadow-sm animate-pulse">
            <AlertCircle size={16}/> 需要至少 3 名成员才能演出。
        </div>
      )}

      {/* Gigs List - Refined Cards */}
      <div className="flex-1 overflow-y-auto px-2 pb-24 lg:pb-10 custom-scrollbar space-y-4">
          {Object.values(GIG_DEFINITIONS).map((gig: any) => {
              const currentFans = gameState.fans;
              const currentWeek = gameState.currentWeek;
              
              const isCompleted = gameState.completedGigs.includes(gig.id);
              const isFansEnough = currentFans >= gig.requiredFans;
              const isWeekStart = !gig.unlockWeek || currentWeek >= gig.unlockWeek;
              const isWeekEnd = gig.endWeek ? currentWeek > gig.endWeek : false;
              
              const isExpired = isWeekEnd;
              const isLocked = !isFansEnough || !isWeekStart;
              const canPlay = !isCompleted && !isLocked && !isExpired && isMemberEnough;

              return (
                  <div 
                    key={gig.id} 
                    onClick={() => { if (canPlay) startGig(gig.id); }}
                    className={`
                        relative group overflow-hidden rounded-[2rem] border-2 transition-all duration-500 w-full
                        ${canPlay 
                            ? 'bg-white border-slate-100 hover:border-rose-200 shadow-lg shadow-slate-100 hover:shadow-xl hover:shadow-rose-100 cursor-pointer transform hover:-translate-y-1' 
                            : 'bg-slate-50 border-slate-100 opacity-80 cursor-not-allowed grayscale-[0.8]'}
                    `}
                  >
                      {/* Interactive Glow for Available Gigs */}
                      {canPlay && (
                          <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>
                      )}

                      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                          
                          {/* Left: Icon & Status */}
                          <div className="flex flex-col items-center gap-3 shrink-0">
                              <div className={`
                                  w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110
                                  ${canPlay ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-200' : (isCompleted ? 'bg-emerald-100 text-emerald-500' : 'bg-slate-200 text-slate-400')}
                              `}>
                                  {isCompleted ? <CheckCircle2 size={28}/> : (isLocked ? <Lock size={24}/> : <Music size={28} className={canPlay ? 'animate-bounce' : ''} style={{animationDuration: '3s'}}/>)}
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${canPlay ? 'bg-rose-50 text-rose-500 border-rose-100' : (isCompleted ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200')}`}>
                                  {isCompleted ? 'Cleared' : (canPlay ? 'Open' : 'Locked')}
                              </span>
                          </div>

                          {/* Middle: Info */}
                          <div className="flex-1 min-w-0 space-y-2">
                              <div>
                                  <div className="flex items-center gap-2 mb-1">
                                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                          <MapPin size={10}/> {gig.venue}
                                      </span>
                                      {gig.endWeek && (
                                          <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                                              <AlertCircle size={10}/> Limited
                                          </span>
                                      )}
                                  </div>
                                  <h4 className={`text-xl md:text-2xl font-black tracking-tight leading-tight ${canPlay ? 'text-slate-900' : 'text-slate-500'}`}>
                                      {gig.title}
                                  </h4>
                              </div>
                              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                                  {gig.description}
                              </p>
                          </div>

                          {/* Right: Stats & Action */}
                          <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 mt-2 md:mt-0 shrink-0">
                              <div className="space-y-1 text-right">
                                  <div className="flex flex-col md:flex-row items-baseline md:items-center gap-1 md:gap-2 justify-end">
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Required Fans</span>
                                      <span className={`text-sm md:text-base font-black ${isFansEnough ? 'text-slate-800' : 'text-rose-500'}`}>
                                          {gig.requiredFans > 1000 ? (gig.requiredFans/1000)+'k' : gig.requiredFans}
                                      </span>
                                  </div>
                                  <div className="flex flex-col md:flex-row items-baseline md:items-center gap-1 md:gap-2 justify-end">
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target</span>
                                      <span className="text-sm md:text-base font-black text-slate-800">
                                          {gig.targetVoltage} V
                                      </span>
                                  </div>
                              </div>
                              
                              {canPlay && (
                                  <div className={`
                                      w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
                                      bg-slate-900 text-white group-hover:bg-rose-500 group-hover:scale-110 group-active:scale-95
                                  `}>
                                      <ArrowRight size={20} />
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              );
          })}
      </div>
    </div>
  );
};
