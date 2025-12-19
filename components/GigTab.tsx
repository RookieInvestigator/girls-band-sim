
import { Lock, Star, CheckCircle2, MapPin, Clock, Ticket, Users, Trophy, PlayCircle, AlertCircle } from 'lucide-react';
import { GIG_DEFINITIONS } from '../data/gigs';

export const GigTab = ({ engine }: { engine: any }) => {
  const { gameState, startGig } = engine;
  const memberCount = gameState.members.length;
  const isMemberEnough = memberCount > 3;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 lg:h-full h-auto">
      
      {/* Header Banner - Super Compact Version */}
      <div className="bg-slate-900 text-white p-5 md:p-6 rounded-[2rem] shadow-lg relative overflow-hidden shrink-0 min-h-[120px] flex items-center">
         <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

         <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center gap-4">
             <div className="flex items-center gap-4 shrink-0">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                    <Ticket className="text-pink-400" size={24}/> 
                </div>
                <div>
                    <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em] mb-0.5">PERFORMANCE</div>
                    <h3 className="text-2xl font-black tracking-tighter text-white">Live 演出</h3>
                </div>
             </div>
             <div className="hidden md:block h-8 w-px bg-white/10 mx-2"></div>
             <p className="text-slate-400 text-xs font-medium max-w-lg leading-relaxed">
                挑战不同的演出场馆来积累粉丝。只有征服每一个舞台，通往武道馆的大门才会开启。
             </p>
         </div>
      </div>

      {/* Member Warning */}
      {!isMemberEnough && (
         <div className="mx-1 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 shadow-sm">
            <div className="p-1 bg-amber-100 rounded-full text-amber-600"><AlertCircle size={14}/></div>
            <div className="text-xs font-bold text-amber-800">
               成员不足！至少需要4名成员（当前：{memberCount}）才能进行演出。请招募更多成员。
            </div>
         </div>
      )}

      {/* Gigs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:flex-1 lg:overflow-y-auto scrollbar-hide pb-32 lg:pb-0 p-1">
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

              // Card Appearance
              let cardStyle = "bg-white border-slate-200";
              let statusBadge = <span className="text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm"><Star size={8} fill="currentColor"/> 可进行</span>;
              
              if (isCompleted) {
                  cardStyle = "bg-slate-50 border-emerald-100 opacity-75";
                  statusBadge = <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={8}/> 已完成</span>;
              } else if (isExpired) {
                  cardStyle = "bg-slate-100 border-slate-200 opacity-60 grayscale";
                  statusBadge = <span className="text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">已结束</span>;
              } else if (isLocked) {
                  cardStyle = "bg-slate-50 border-slate-200 opacity-90";
                  statusBadge = <span className="text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1"><Lock size={8}/> 未解锁</span>;
              }

              return (
                  <div 
                    key={gig.id} 
                    onClick={() => {
                        if (canPlay) startGig(gig.id);
                    }}
                    className={`
                        relative flex flex-col justify-between
                        p-5 rounded-[2rem] border-2 
                        transition-all duration-300 group
                        ${cardStyle}
                        ${canPlay ? 'hover:-translate-y-1 hover:shadow-xl hover:border-pink-300 cursor-pointer active:scale-[0.98]' : 'cursor-not-allowed'}
                    `}
                  >
                      {/* Top Section */}
                      <div>
                          <div className="flex justify-between items-start mb-3">
                              {statusBadge}
                              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                                  <MapPin size={10}/> {gig.venue}
                              </div>
                          </div>

                          <h4 className={`text-lg font-black mb-2 leading-tight transition-colors tracking-tight ${canPlay ? 'text-slate-900 group-hover:text-pink-600' : 'text-slate-700'}`}>
                              {gig.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-2 min-h-[2.5em]">
                              {gig.description}
                          </p>
                      </div>

                      {/* Info Grid */}
                      <div className="mt-4 space-y-2">
                          <div className={`rounded-xl p-3 border space-y-2 transition-colors ${canPlay ? 'bg-slate-50 border-slate-100 group-hover:bg-white group-hover:border-pink-100' : 'bg-white border-slate-100'}`}>
                              
                              {/* Schedule Requirement */}
                              {gig.unlockWeek && (
                                  <div className="flex justify-between items-center text-[10px]">
                                      <span className="font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                          <Clock size={12}/> 时间
                                      </span>
                                      <span className={`font-black ${currentWeek >= gig.unlockWeek ? (isExpired ? 'text-slate-400' : 'text-slate-700') : 'text-pink-500'}`}>
                                          第 {gig.unlockWeek} 周{gig.endWeek ? ` - ${gig.endWeek}` : ' 起'}
                                      </span>
                                  </div>
                              )}
                              
                              {/* Fans Requirement */}
                              <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                      <Users size={12}/> 粉丝门槛
                                  </span>
                                  <span className={`font-black ${isFansEnough ? (isCompleted ? 'text-slate-700' : 'text-emerald-500') : 'text-pink-500'}`}>
                                      {currentFans.toLocaleString()} / {gig.requiredFans.toLocaleString()}
                                  </span>
                              </div>

                              {/* Target */}
                              <div className="flex justify-between items-center text-[10px] pt-2 border-t border-slate-200/50">
                                  <span className="font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                      <Trophy size={12}/> 目标热度
                                  </span>
                                  <span className="font-black text-slate-700">
                                      {gig.targetVoltage} V
                                  </span>
                              </div>
                          </div>

                          {/* Action Button */}
                          <div className={`
                              w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-all
                              ${canPlay 
                                  ? 'bg-slate-900 text-white group-hover:bg-pink-500 group-hover:shadow-lg group-hover:shadow-pink-200' 
                                  : 'bg-slate-100 text-slate-300'}
                          `}>
                              {canPlay ? (
                                  <>开始演出 <PlayCircle size={14}/></>
                              ) : (
                                  <>{isCompleted ? '已完成' : isExpired ? '已过期' : (isLocked ? '未解锁' : '成员不足')}</>
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
