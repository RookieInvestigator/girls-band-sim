
import { MessageCircle, Heart, Share2, MoreHorizontal, Sword, Repeat2, WifiOff, TrendingUp, Hash } from 'lucide-react';
import { SNSPost } from '../types';

export const SnsTab = ({ engine }: { engine: any }) => {
    const isOffline = !engine.hasApiKey;

    return (
        <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 pt-4 lg:pb-0">
            
            {/* Header: Trending Topics */}
            <div className="mb-6 flex overflow-x-auto gap-2 pb-2 scrollbar-hide pt-1">
                <div className="shrink-0 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-md shadow-slate-300 flex items-center gap-1.5 transform hover:-translate-y-1 transition-transform">
                    <TrendingUp size={14} className="text-rose-500"/>
                    <span className="font-black text-[10px] uppercase tracking-widest">趋势</span>
                </div>
                <div className="shrink-0 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-1.5 text-slate-600 hover:shadow-md transition-shadow cursor-pointer">
                    <Hash size={12} className="text-slate-400"/>
                    <span className="font-bold text-[10px]">#BandLife</span>
                </div>
                <div className="shrink-0 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-1.5 text-slate-600 hover:shadow-md transition-shadow cursor-pointer">
                    <Hash size={12} className="text-slate-400"/>
                    <span className="font-bold text-[10px]">#{engine.gameState.bandName || 'NewBand'}</span>
                </div>
                {engine.gameState.rival.isUnlocked && (
                    <div className="shrink-0 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-1.5 text-slate-600 hover:shadow-md transition-shadow cursor-pointer">
                        <Hash size={12} className="text-slate-400"/>
                        <span className="font-bold text-[10px]">#{engine.gameState.rival.name}</span>
                    </div>
                )}
            </div>

            {/* Main Feed Container */}
            <div className="flex flex-col gap-4">
                
                {/* Offline Warning */}
                {isOffline && (
                    <div className="p-4 bg-amber-50 rounded-2xl flex items-center gap-3 text-amber-700 text-xs font-bold shadow-sm border border-amber-100">
                        <div className="p-1.5 bg-amber-200 rounded-full"><WifiOff size={14}/></div>
                        <div>离线模式：使用本地模板生成内容。</div>
                    </div>
                )}

                {/* Posts */}
                {engine.gameState.snsPosts.map((p: SNSPost) => {
                    const displayId = p.authorId ? p.authorId.replace(/^@/, '') : 'unknown';
                    
                    // Style Variants based on Poster Type
                    let containerClass = "bg-white border border-slate-100";
                    let textClass = "text-slate-600";
                    let metaClass = "text-slate-400";
                    let avatarClass = "bg-slate-100 text-slate-500";
                    
                    if (p.type === 'member') {
                        avatarClass = "bg-gradient-to-br from-rose-100 to-pink-200 text-rose-600 ring-4 ring-white shadow-md";
                    } else if (p.type === 'rival') {
                        containerClass = "bg-slate-900 border border-slate-800";
                        textClass = "text-slate-300";
                        metaClass = "text-slate-500";
                        avatarClass = "bg-white text-slate-900";
                    } else if (p.type === 'system') {
                        containerClass = "bg-slate-50 border-2 border-slate-200 border-dashed shadow-none";
                    }

                    return (
                        <div key={p.id} className={`p-5 rounded-[2rem] transition-all shadow-sm hover:shadow-lg ${containerClass} relative overflow-hidden group`}>
                            
                            {/* System Post Special Style */}
                            {p.type === 'system' ? (
                                <div className="flex flex-col items-center text-center gap-1.5 py-1 opacity-70">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-slate-200 text-slate-500 px-3 py-1 rounded-full">SYSTEM</span>
                                    <p className="text-[10px] font-bold text-slate-500 font-mono mt-0.5">{p.content}</p>
                                </div>
                            ) : (
                                <div className="flex gap-4 relative z-10">
                                    {/* Avatar */}
                                    <div className={`w-12 h-12 rounded-[1rem] shrink-0 flex items-center justify-center text-base font-black ${avatarClass}`}>
                                        {p.type === 'rival' ? <Sword size={18}/> : p.authorName[0]}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <div className="flex justify-between items-baseline mb-1.5">
                                            <div className="flex flex-col">
                                                <span className={`font-black text-sm truncate ${p.type === 'rival' ? 'text-white' : 'text-slate-900'} leading-none mb-0.5`}>
                                                    {p.authorName}
                                                </span>
                                                <span className={`text-[9px] font-bold font-mono ${metaClass}`}>@{displayId}</span>
                                            </div>
                                            <span className={`text-[9px] font-bold uppercase tracking-widest ${metaClass}`}>
                                                {p.timestamp}
                                            </span>
                                        </div>
                                        
                                        <p className={`text-xs mt-2 leading-relaxed whitespace-pre-wrap font-medium ${textClass}`}>
                                            {p.content}
                                        </p>
                                        
                                        {/* Actions */}
                                        <div className={`flex gap-6 mt-4 ${metaClass}`}>
                                            <button className="flex items-center gap-1.5 text-[10px] font-bold hover:text-rose-500 transition-colors group/btn">
                                                <MessageCircle size={14} className="group-hover/btn:scale-110 transition-transform"/> 
                                            </button>
                                            <button className="flex items-center gap-1.5 text-[10px] font-bold hover:text-emerald-500 transition-colors group/btn">
                                                <Repeat2 size={14} className="group-hover/btn:rotate-180 transition-transform duration-500"/> 
                                            </button>
                                            <button className="flex items-center gap-1.5 text-[10px] font-bold hover:text-rose-500 transition-colors group/btn">
                                                <Heart size={14} className="group-hover/btn:fill-rose-500 transition-colors"/> 
                                                {p.likes}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
