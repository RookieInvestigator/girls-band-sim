
import { Lock, Star, CheckCircle2, MapPin, Clock, Ticket, Users, Trophy, PlayCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { GIG_DEFINITIONS } from '../data/gigs';

export const GigTab = ({ engine }: { engine: any }) => {
  const { gameState, startGig } = engine;
  const memberCount = gameState.members.length;
  const isMemberEnough = memberCount >= 3; // UPDATED: Min 3

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full pb-20 lg:pb-0">
      
      {/* Header Banner - Cleared Right side */}
      <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden shrink-0 flex flex-col items-start gap-4 group">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         {/* Moving the decorative blur to the right to be background for floating bar */}
         <div className="absolute -right-20 -top-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-1000"/>

         <div className="relative z-10 w-full max-w-2xl">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-pink-500 rounded-xl text-white shadow-lg shadow-pink-500/30">
                    <Ticket size={20}/> 
                </div>
                <div className="text-xs font-black text-pink-400 uppercase tracking-[0.3em]">Live Stage</div>
             </div>
             <h3 className="text-3xl lg:text-4xl font-black tracking-tighter text-white">Performance</h3>
             <p className="text-slate-400 text-xs font-bold mt-2 max-w-md">
                挑战更大的舞台，积累粉丝，向着武道馆进发。
             </p>
         </div>

         {!isMemberEnough && (
            <div className="relative z-10 bg-amber-500 text-slate-900 px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-3 shadow-lg max-w-xs mt-2">
                <AlertCircle size={20} className="shrink-0"/>
                <span>成员不足！至少需要3人才能开始演出。</span>
            </div>
         )}
      </div>

      {/* Gigs List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
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
                        relative group overflow-hidden rounded-[2rem] border-2 transition-all duration-300
                        ${canPlay 
                            ? 'bg-white border-slate-100 hover:border-pink-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
                            : 'bg-slate-50 border-transparent opacity-80 cursor-not-allowed grayscale-[0.8]'}
                    `}
                  >
                      {/* Left "Stub" Visual */}
                      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-slate-50 border-r-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 z-10">
                          <div className={`text-[10px] font-black uppercase tracking-widest -rotate-90 whitespace-nowrap ${canPlay ? 'text-slate-400' : 'text-slate-300'}`}>
                              Ticket No. 00{gig.unlockWeek}
                          </div>
                      </div>

                      <div className="pl-20 md:pl-32 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                          
                          <div className="flex-1">
                              {/* Badges */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                  {isCompleted ? (
                                      <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={10}/> Cleared</span>
                                  ) : isLocked ? (
                                      <span className="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1"><Lock size={10}/> Locked</span>
                                  ) : (
                                      <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 animate-pulse"><Star size={10} fill="currentColor"/> Available</span>
                                  )}
                                  <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1"><MapPin size={10}/> {gig.venue}</span>
                              </div>

                              <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-pink-600 transition-colors">{gig.title}</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-lg">{gig.description}</p>
                          </div>

                          {/* Requirements & Rewards */}
                          <div className="flex flex-col gap-3 min-w-[140px]">
                              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg">
                                  <span>Fans</span>
                                  <span className={isFansEnough ? 'text-slate-800' : 'text-rose-500'}>{gig.requiredFans.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg">
                                  <span>Goal</span>
                                  <span className="text-slate-800">{gig.targetVoltage} V</span>
                              </div>
                              {canPlay && (
                                  <div className="mt-2 flex items-center justify-end gap-2 text-xs font-black text-pink-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                      Start Gig <ArrowRight size={14}/>
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
