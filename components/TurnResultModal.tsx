
import { useState } from 'react';
import { Disc, ChevronRight, TrendingUp } from 'lucide-react';
import { ActionResult } from '../types';

export const TurnResultModal = ({ data, onFinish }: { data: any, onFinish: () => void }) => {
    const [step, setStep] = useState(0);
    // Steps: 0..n (logs), last (summary)
    
    const currentLog = data.actionLogs[step];
    const isSummary = step >= data.actionLogs.length;

    const handleNext = () => {
        if (isSummary) {
            onFinish();
        } else {
            setStep(s => s + 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] w-full max-w-xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative border border-white/50">
                
                {/* Header Strip */}
                <div className="bg-slate-900 px-10 py-6 flex justify-between items-center text-white sticky top-0 z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        {isSummary ? `WEEKLY REPORT` : `ACTION LOG ${data.week}-${step+1}`}
                    </span>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse delay-75"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse delay-150"/>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-12 flex flex-col items-center justify-center min-h-[400px] relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"/>

                    {!isSummary ? (
                        <div className="text-center w-full animate-in slide-in-from-right-8 duration-300 key={step} relative z-10">
                            <div className="mb-8 flex flex-col items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 bg-slate-100 px-3 py-1 rounded-full">{currentLog.date}</span>
                                <h2 className="text-4xl font-black text-slate-900 leading-tight italic uppercase tracking-tighter">{currentLog.action}</h2>
                            </div>

                            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest text-white shadow-xl mb-10 transform -rotate-3 hover:rotate-0 transition-transform ${currentLog.result === ActionResult.GreatSuccess ? 'bg-gradient-to-r from-amber-400 to-orange-500' : (currentLog.result === ActionResult.Success ? 'bg-gradient-to-r from-rose-500 to-pink-500' : 'bg-slate-400')}`}>
                                {currentLog.result === ActionResult.GreatSuccess && <StarIcon size={14}/>}
                                {currentLog.result}
                            </div>
                            
                            {currentLog.flavorText && (
                                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-8 relative shadow-sm max-w-sm mx-auto">
                                    <p className="italic text-slate-600 font-medium leading-relaxed text-sm">
                                        "{currentLog.flavorText}"
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                {currentLog.details.map((d: string, i: number) => (
                                    <div key={i} className="text-sm font-bold text-slate-500 flex items-center justify-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 mx-auto max-w-xs">
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"/> {d}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full space-y-8 animate-in zoom-in-95 duration-500 relative z-10">
                            <div className="text-center mb-8">
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">SUMMARY</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 bg-slate-100 inline-block px-3 py-1 rounded-full">Week {data.week} Results</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Fans</span>
                                    <div className="text-4xl font-black text-rose-500 flex items-center gap-1 tracking-tighter">
                                        {data.fansDelta > 0 && <TrendingUp size={24}/>}
                                        {data.fansDelta}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                                    <div className="text-4xl font-black text-emerald-500 tracking-tighter">
                                        {data.moneyDelta > 0 ? '+' : ''}{data.moneyDelta}
                                    </div>
                                </div>
                            </div>
                            
                            {data.newSong && (
                                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex items-center gap-6 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-500 opacity-20 group-hover:opacity-30 transition-opacity"/>
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0 border border-white/20"><Disc size={32} className="animate-spin-slow"/></div>
                                    <div>
                                        <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1 bg-white/20 inline-block px-2 py-0.5 rounded">New Release</div>
                                        <div className="text-2xl font-black leading-none italic">{data.newSong.title}</div>
                                        <div className="text-[10px] font-bold opacity-60 mt-2">{data.newSong.genre}</div>
                                    </div>
                                </div>
                            )}

                            {data.ppEarned > 0 && (
                                <div className="flex items-center justify-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest bg-amber-50 py-3 rounded-full border border-amber-100 shadow-sm">
                                    <StarIcon size={16}/>
                                    Skill Points +{data.ppEarned}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-white border-t border-slate-100 z-20 relative">
                    <button onClick={handleNext} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/30 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 group">
                        {isSummary ? "COMPLETE" : "NEXT"} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

const StarIcon = ({size}:{size:number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)
