
import { Search, X, Loader2, RefreshCw, UserPlus, Sparkles } from 'lucide-react';
import { MAX_MEMBERS } from '../constants';

export const ScoutModal = ({ engine, showNeta }: { engine: any, showNeta: boolean }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden ring-1 ring-white/20 font-sans">
                
                {/* Clean Header matching app style */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white z-30 shrink-0">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                            <div className="p-2.5 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200">
                                <Search size={20}/>
                            </div>
                            招募海报
                        </h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 ml-1">
                            寻找下一位成员 ({engine.gameState.members.length}/{MAX_MEMBERS})
                        </p>
                    </div>
                    <button 
                        onClick={() => engine.setShowScoutModal(false)} 
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={24}/>
                    </button>
                </div>
                
                {/* Content Grid */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 relative min-h-[300px]">
                    {engine.isRefreshingScout ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 animate-in fade-in duration-300 z-10 bg-slate-50/80 backdrop-blur-sm">
                            <div className="relative">
                                <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 animate-pulse"/>
                                <Loader2 size={48} className="animate-spin relative z-10 text-pink-500"/>
                            </div>
                            <p className="font-bold text-xs tracking-[0.2em] uppercase mt-6 text-slate-500">正在搜寻目标...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {engine.gameState.scoutPool.map((s: any, idx: number) => {
                                const isUR = s.id.startsWith('ur_');
                                const displayName = (showNeta && s.netaName) ? s.netaName : s.name;
                                const displayDesc = (showNeta && s.netaDesc) ? s.netaDesc : s.personality;

                                return (
                                    <div 
                                        key={s.id} 
                                        className={`
                                            group relative flex flex-col rounded-[2rem] border transition-all duration-300 overflow-hidden bg-white
                                            ${isUR ? 'border-amber-200 shadow-lg shadow-amber-100/50 hover:shadow-amber-200 ring-1 ring-amber-100' : 'border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-pink-200 hover:-translate-y-1'}
                                        `}
                                        style={{animation: `fadeIn 0.4s ease-out ${idx * 0.1}s backwards`}}
                                    >
                                        {/* UR Background Effect */}
                                        {isUR && <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-100/40 to-transparent rounded-bl-full pointer-events-none"/>}
                                        
                                        <div className="p-6 relative z-10 flex flex-col h-full">
                                            {/* Header Info */}
                                            <div className="flex items-start gap-5 mb-5">
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shrink-0 relative overflow-hidden ${isUR ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-slate-900'}`}>
                                                    {displayName[0]}
                                                    {isUR && <Sparkles size={16} className="absolute top-1 right-1 text-white/60 animate-pulse"/>}
                                                </div>
                                                <div className="flex-1 min-w-0 pt-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-black text-lg text-slate-900 truncate tracking-tight">{displayName}</h4>
                                                        {isUR && <span className="bg-amber-100 text-amber-600 text-[9px] px-1.5 py-0.5 rounded font-black border border-amber-200">UR</span>}
                                                    </div>
                                                    <div className="text-[10px] font-black text-pink-500 uppercase tracking-widest truncate">
                                                        {s.roles.join(' / ')}
                                                    </div>
                                                    {s.screenName && (
                                                        <div className="text-[9px] font-bold text-slate-400 truncate mt-1 font-mono flex items-center gap-1 opacity-80">
                                                            {s.screenName.startsWith('@') ? '' : '@'}{s.screenName}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {s.tags.map((t: string) => (
                                                    <span key={t} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${isUR ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-100 group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-100'}`}>
                                                        #{t}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            {/* Personality */}
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 flex-1 group-hover:bg-white group-hover:shadow-inner transition-all">
                                                <p className="text-xs text-slate-500 font-medium italic leading-relaxed line-clamp-3">
                                                    "{displayDesc}"
                                                </p>
                                            </div>

                                            {/* Recruit Button */}
                                            <button 
                                                onClick={() => engine.recruitMember(s)} 
                                                disabled={engine.gameState.members.length >= MAX_MEMBERS} 
                                                className={`
                                                    w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95
                                                    ${engine.gameState.members.length >= MAX_MEMBERS
                                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                                        : isUR 
                                                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-200 hover:shadow-xl hover:from-amber-400 hover:to-orange-500'
                                                            : 'bg-slate-900 text-white hover:bg-pink-500 shadow-lg shadow-slate-200 hover:shadow-pink-200'
                                                    }
                                                `}
                                            >
                                                {engine.gameState.members.length >= MAX_MEMBERS ? (
                                                    '名额已满'
                                                ) : (
                                                    <>
                                                        <UserPlus size={16}/> 签约
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex justify-center bg-white z-30 shrink-0">
                    <button 
                        onClick={engine.refreshScout} 
                        disabled={engine.isRefreshingScout || engine.gameState.money < engine.refreshCost} 
                        className="px-8 py-3.5 rounded-full border-2 border-slate-100 text-xs font-black text-slate-600 uppercase tracking-widest hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 bg-white shadow-sm"
                    >
                        <RefreshCw size={14} className={engine.isRefreshingScout ? 'animate-spin' : ''}/> 
                        刷新海报列表 <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500 ml-1 font-bold">¥{engine.refreshCost}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
