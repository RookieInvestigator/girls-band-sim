
import { useState, useEffect } from 'react';
import { Disc, ChevronRight, X } from 'lucide-react';
import { ActionResult } from '../types';

export const TurnResultModal = ({ data, onFinish }: { data: any, onFinish: () => void }) => {
    const [step, setStep] = useState(0);
    // Steps: 0, 1, 2 (logs), 3 (summary)
    
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
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative">
                
                {/* Header */}
                <div className="p-8 pb-4 text-center border-b border-slate-100 bg-slate-50/50">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] block mb-2">
                        {isSummary ? `第 ${data.week} 周结算` : `日程: ${currentLog.date}`}
                    </span>
                    <h2 className="text-3xl font-black text-slate-800">
                        {isSummary ? "本周总结" : currentLog.action}
                    </h2>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[300px]">
                    {!isSummary ? (
                        <div className="text-center space-y-6 w-full animate-in slide-in-from-right-8 duration-300 key={step}">
                            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest text-white shadow-lg ${currentLog.result === ActionResult.GreatSuccess ? 'bg-amber-400' : (currentLog.result === ActionResult.Success ? 'bg-rose-400' : 'bg-slate-400')}`}>
                                {currentLog.result}
                            </div>
                            
                            {currentLog.flavorText && (
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-slate-600 text-lg leading-relaxed relative">
                                    <span className="absolute -top-3 -left-2 text-4xl text-slate-200 font-serif">“</span>
                                    {currentLog.flavorText}
                                </div>
                            )}

                            <div className="space-y-2">
                                {currentLog.details.map((d: string, i: number) => (
                                    <div key={i} className="text-sm font-bold text-slate-400">{d}</div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full space-y-8 animate-in zoom-in-95 duration-500">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-rose-500">+{data.fansDelta}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">新增粉丝</div>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-emerald-500">{data.moneyDelta > 0 ? '+' : ''}{data.moneyDelta}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">营业额</div>
                                </div>
                            </div>
                            
                            {data.newSong && (
                                <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-6 rounded-3xl text-white flex items-center gap-4 shadow-xl">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"><Disc size={24}/></div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80">新曲发布</div>
                                        <div className="text-xl font-black">{data.newSong.title}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-white">
                    <button onClick={handleNext} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-rose-500 transition-colors shadow-xl active:scale-95 flex items-center justify-center gap-2">
                        {isSummary ? "完成结算" : "下一步"} <ChevronRight size={18}/>
                    </button>
                </div>
            </div>
        </div>
    );
};
