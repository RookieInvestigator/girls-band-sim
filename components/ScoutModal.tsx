
import { Search, X, Loader2, Star, RefreshCw, UserPlus } from 'lucide-react';
import { MAX_MEMBERS, REFRESH_COST_BASE } from '../constants';

export const ScoutModal = ({ engine }: { engine: any }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
                
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white z-30 shrink-0">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3 md:gap-4 tracking-tighter">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-200 shrink-0">
                            <Search size={20} className="md:w-6 md:h-6"/>
                        </div>
                        招募成员
                    </h3>
                    <button onClick={() => engine.setShowScoutModal(false)} className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors">
                        <X size={20} className="text-slate-500"/>
                    </button>
                </div>
                
                {/* Scout List Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 relative min-h-[300px]">
                    {engine.isRefreshingScout ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 animate-in fade-in duration-300 z-10">
                            <Loader2 size={48} className="animate-spin mb-4 text-pink-500"/>
                            <p className="font-bold text-sm tracking-[0.2em] uppercase">正在寻找潜力新星...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 pb-4">
                            {engine.gameState.scoutPool.map((s: any, idx: number) => (
                                <div 
                                    key={s.id} 
                                    className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                                    style={{animation: `fadeIn 0.5s ease-out ${idx * 0.1}s backwards`}}
                                >
                                    {/* Card Highlight */}
                                    {s.id.startsWith('ur_') && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 z-0"/>}

                                    <div className="flex flex-col items-center text-center relative z-10">
                                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black text-white mb-4 shadow-xl ${s.id.startsWith('ur_') ? 'bg-gradient-to-br from-pink-500 to-amber-500' : 'bg-slate-900'}`}>
                                            {s.name[0]}
                                        </div>
                                        <div className="font-black text-xl text-slate-900 flex items-center gap-2 mb-1">
                                            {s.name}
                                            {s.id.startsWith('ur_') && <Star size={16} className="text-amber-400 fill-amber-400"/>}
                                        </div>
                                        
                                        <div className="mt-3 flex gap-2">
                                            <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500">{s.roles.join('/')}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 justify-center z-10">
                                        {s.tags.map((t: string) => <span key={t} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-500 uppercase">{t}</span>)}
                                    </div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 text-center italic leading-relaxed border border-slate-100 z-10">
                                        "{s.personality}"
                                    </div>

                                    <button 
                                        onClick={() => engine.recruitMember(s)} 
                                        disabled={engine.gameState.members.length >= MAX_MEMBERS} 
                                        className={`
                                            mt-auto w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all relative z-20 active:scale-95
                                            ${engine.gameState.members.length >= MAX_MEMBERS
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                : 'bg-slate-900 text-white hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-200'
                                            }
                                        `}
                                    >
                                        <UserPlus size={16}/>
                                        {engine.gameState.members.length >= MAX_MEMBERS ? '队伍已满' : '邀请入队'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 flex justify-center bg-white z-30 shrink-0">
                        <button 
                            onClick={engine.refreshScout} 
                            disabled={engine.isRefreshingScout} 
                            className="px-8 py-3 rounded-full border border-slate-200 text-xs font-black text-slate-600 uppercase tracking-widest hover:border-pink-500 hover:text-pink-500 flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95 bg-white shadow-sm hover:shadow-md"
                        >
                            <RefreshCw size={14} className={engine.isRefreshingScout ? 'animate-spin' : ''}/> 
                            刷新列表 (¥{engine.refreshCost})
                        </button>
                </div>
            </div>
        </div>
    );
};
