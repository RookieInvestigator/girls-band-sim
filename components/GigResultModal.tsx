
import { Trophy, Users, Coins, Sparkles, X, Star } from 'lucide-react';
import { GigResultData } from '../types';

export const GigResultModal = ({ data, onClose }: { data: GigResultData, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[150] flex items-center justify-center p-6 animate-in zoom-in duration-500">
            <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"/>
                </div>

                <div className="relative z-10 pt-12 pb-8 px-10 text-center">
                    <div className="inline-block p-4 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-xl shadow-amber-500/30 mb-6">
                        <Trophy size={48} className="text-white"/>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-2 tracking-tight">演出成功！</h2>
                    <p className="text-rose-200 font-bold uppercase tracking-[0.2em] text-sm">Gig Complete</p>
                </div>

                <div className="px-10 pb-10 flex-1 flex flex-col gap-8 bg-white pt-10 rounded-t-[3rem] -mt-10 relative z-20">
                    <div className="text-center">
                        <h3 className="text-2xl font-black text-slate-800">{data.gigTitle}</h3>
                        <p className="text-slate-400 font-bold text-sm mt-1">{data.venue}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-1">
                                <Sparkles size={20}/>
                            </div>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">热度</span>
                            <span className="text-3xl font-black text-slate-800">{Math.floor(data.finalHype)}</span>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center mb-1">
                                <Users size={20}/>
                            </div>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">新增粉丝</span>
                            <span className="text-3xl font-black text-emerald-500">+{data.fansEarned}</span>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mb-1">
                                <Coins size={20}/>
                            </div>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">资金收入</span>
                            <span className="text-3xl font-black text-slate-800">¥{data.moneyEarned}</span>
                        </div>
                    </div>

                    <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex items-center gap-4">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            <Star size={24} className="text-rose-500 fill-rose-500"/>
                        </div>
                        <div>
                            <div className="font-black text-rose-800 text-lg">声望提升!</div>
                            <div className="text-rose-600 text-xs font-bold mt-0.5">乐队的名声在业界传开了 (+{data.rewards.fame} Fame)</div>
                        </div>
                    </div>

                    <button onClick={onClose} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-rose-500 transition-colors shadow-xl active:scale-95 flex items-center justify-center gap-2 mt-auto">
                        确认
                    </button>
                </div>
            </div>
        </div>
    );
};
