
import { Lock, CheckCircle2, MapPin, Ticket, AlertCircle, ArrowRight, Music, Crown } from 'lucide-react';
import { GIG_DEFINITIONS } from '../data/gigs';

export const GigTab = ({ engine }: { engine: any }) => {
  const { gameState, startGig } = engine;
  const memberCount = gameState.members.length;
  const isMemberEnough = memberCount >= 3; 

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-10 pt-4">
      
      {/* Header */}
      <div className="py-2 flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6 pt-2 w-full">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-[1rem] flex items-center justify-center text-white shadow-lg shadow-rose-500/30 transform -rotate-6">
                <Ticket size={24} />
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">演出舞台</h3>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 bg-white px-2 py-0.5 rounded-full inline-block shadow-sm">
                    Select Your Stage
                </div>
            </div>
         </div>

         {!isMemberEnough && (
            <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-3 rounded-[1rem] text-[10px] font-bold shadow-sm border border-amber-100">
                <AlertCircle size={14}/> 
                <span>需 3 人以上成员</span>
            </div>
         )}
      </div>

      {/* Gigs List */}
      <div className="space-y-4">
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

              // Card Styles based on status
              let bgClass = 'bg-white';
              let borderClass = 'border-l-[4px] border-slate-200';
              let opacityClass = 'opacity-100';

              if (canPlay) {
                  bgClass = 'bg-white hover:bg-slate-50';
                  borderClass = 'border-l-[6px] border-rose-500';
              } else if (isCompleted) {
                  bgClass = 'bg-slate-50';
                  borderClass = 'border-l-[6px] border-emerald-500';
              } else {
                  bgClass = 'bg-slate-50';
                  opacityClass = 'opacity-50 grayscale';
                  borderClass = 'border-l-[4px] border-slate-300';
              }

              if (gig.id === 'budokan_final') {
                  borderClass = 'border-l-[8px] border-amber-400';
                  if (canPlay) bgClass = 'bg-gradient-to-r from-slate-900 to-indigo-900 text-white';
              }

              return (
                  <div 
                    key={gig.id} 
                    onClick={() => { if (canPlay) startGig(gig.id); }}
                    className={`
                        relative overflow-hidden rounded-r-[2rem] rounded-l-xl shadow-sm transition-all duration-300 w-full group active:scale-95
                        ${bgClass} ${borderClass} ${opacityClass}
                        ${canPlay ? 'cursor-pointer hover:shadow-lg hover:-translate-x-1' : 'cursor-not-allowed'}
                    `}
                  >
                      {/* Ticket Stub Perforation Effect */}
                      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjOTRhM2I4IiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-50"/>

                      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                          
                          {/* Left: Icon & Status */}
                          <div className="flex flex-col items-center gap-3 shrink-0">
                              <div className={`
                                  w-14 h-14 rounded-2xl flex items-center justify-center shadow-md
                                  ${canPlay ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white' : (isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400')}
                              `}>
                                  {isCompleted ? <CheckCircle2 size={24}/> : (isLocked ? <Lock size={24}/> : (gig.id === 'budokan_final' ? <Crown size={24}/> : <Music size={24}/>))}
                              </div>
                              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${canPlay ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'}`}>
                                  {isCompleted ? 'CLEARED' : (canPlay ? 'OPEN' : 'LOCKED')}
                              </span>
                          </div>

                          {/* Middle: Info */}
                          <div className="flex-1 min-w-0 space-y-2">
                              <div>
                                  <div className="flex items-center gap-2 mb-1.5">
                                      <span className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 px-2 py-0.5 rounded ${gig.id === 'budokan_final' && canPlay ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                          <MapPin size={10}/> {gig.venue}
                                      </span>
                                      {gig.endWeek && (
                                          <span className="text-amber-600 text-[9px] font-black uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                                              <Crown size={10}/> 限时
                                          </span>
                                      )}
                                  </div>
                                  <h4 className={`text-2xl md:text-3xl font-black tracking-tighter italic uppercase ${gig.id === 'budokan_final' && canPlay ? 'text-white' : 'text-slate-900'}`}>
                                      {gig.title}
                                  </h4>
                              </div>
                              <p className={`text-[10px] font-medium leading-relaxed max-w-lg ${gig.id === 'budokan_final' && canPlay ? 'text-slate-300' : 'text-slate-500'}`}>
                                  {gig.description}
                              </p>
                          </div>

                          {/* Right: Stats & Action */}
                          <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100/10 mt-1 md:mt-0 shrink-0 md:pl-6">
                              <div className="space-y-1 text-right">
                                  <div className="flex flex-col md:flex-row items-baseline md:items-center gap-2 md:gap-3 justify-end">
                                      <span className={`text-[9px] font-bold uppercase tracking-wider ${gig.id === 'budokan_final' && canPlay ? 'text-slate-400' : 'text-slate-400'}`}>要求粉丝</span>
                                      <span className={`text-lg font-black ${isFansEnough ? (gig.id === 'budokan_final' && canPlay ? 'text-white' : 'text-slate-900') : 'text-rose-500'}`}>
                                          {gig.requiredFans > 1000 ? (gig.requiredFans/1000)+'k' : gig.requiredFans}
                                      </span>
                                  </div>
                                  <div className="flex flex-col md:flex-row items-baseline md:items-center gap-2 md:gap-3 justify-end">
                                      <span className={`text-[9px] font-bold uppercase tracking-wider ${gig.id === 'budokan_final' && canPlay ? 'text-slate-400' : 'text-slate-400'}`}>目标分数</span>
                                      <span className={`text-lg font-black ${gig.id === 'budokan_final' && canPlay ? 'text-white' : 'text-slate-900'}`}>
                                          {gig.targetVoltage} V
                                      </span>
                                  </div>
                              </div>
                              
                              {canPlay && (
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-all ${gig.id === 'budokan_final' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white group-hover:bg-rose-500'}`}>
                                      <ArrowRight size={18} />
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
