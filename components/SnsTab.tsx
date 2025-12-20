
import { MessageCircle, Heart, Share2, MoreHorizontal, Sword, Repeat2 } from 'lucide-react';
import { SNSPost } from '../types';

export const SnsTab = ({ engine }: { engine: any }) => {
    return (
        <div className="max-w-2xl mx-auto h-full pb-20 lg:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col h-full overflow-hidden relative">
                
                {/* Header - Moved Badge to left */}
                <div className="p-6 border-b border-slate-50 bg-white/90 backdrop-blur sticky top-0 z-20 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h3 className="font-black text-xl text-slate-900 flex items-center gap-3 tracking-tight">
                            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                                <MessageCircle size={20}/>
                            </div>
                            Social Feed
                        </h3>
                        <div className="flex gap-2 items-center bg-slate-50 px-2 py-1 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"/>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live</span>
                        </div>
                    </div>
                    {/* Right side empty for floating bar */}
                    <div className="w-24"></div> 
                </div>

                {/* Feed */}
                <div className="flex-1 overflow-y-auto p-0 bg-slate-50">
                        {engine.gameState.snsPosts.map((p: SNSPost) => {
                            // Logic to strip @ from display ID if present
                            const displayId = p.authorId.replace(/^@/, '');
                            
                            return (
                            <div key={p.id} className={`p-6 border-b border-slate-100 bg-white hover:bg-slate-50/50 transition-colors ${p.type === 'rival' ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] border-slate-800' : ''} ${p.type === 'system' ? 'bg-slate-50' : ''}`}>
                                
                                {/* System Post Special Style */}
                                {p.type === 'system' ? (
                                    <div className="flex flex-col items-center text-center gap-2 py-2 opacity-70">
                                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-200 text-slate-500 px-2 py-0.5 rounded">SYSTEM</span>
                                        <p className="text-xs font-bold text-slate-500">{p.content}</p>
                                    </div>
                                ) : (
                                    <div className="flex gap-4">
                                        {/* Avatar */}
                                        <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-lg font-black shadow-sm ring-2 ring-offset-2 ${
                                            p.type === 'member' ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white ring-pink-100' : 
                                            (p.type === 'rival' ? 'bg-indigo-600 text-white ring-indigo-900 border-none' : 
                                            'bg-slate-200 text-slate-500 ring-transparent')
                                        }`}>
                                        {p.type === 'rival' ? <Sword size={18}/> : p.authorName[0]}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <div className="flex flex-col">
                                                    <span className={`font-black text-sm truncate ${p.type === 'member' ? 'text-slate-900' : (p.type === 'rival' ? 'text-white' : 'text-slate-900')}`}>
                                                        {p.authorName}
                                                    </span>
                                                    <span className={`text-[10px] font-bold ${p.type === 'rival' ? 'text-slate-500' : 'text-slate-400'}`}>ID: {displayId}</span>
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${p.type === 'rival' ? 'text-slate-600' : 'text-slate-300'}`}>
                                                    {p.timestamp}
                                                </span>
                                            </div>
                                            
                                            <p className={`text-sm mt-2 leading-relaxed whitespace-pre-wrap font-medium ${p.type === 'rival' ? 'text-slate-300' : 'text-slate-600'}`}>
                                                {p.content}
                                            </p>
                                            
                                            {/* Actions */}
                                            <div className={`flex gap-8 mt-4 ${p.type === 'rival' ? 'text-slate-600' : 'text-slate-400'}`}>
                                                <button className={`flex items-center gap-2 text-xs font-bold group transition-colors ${p.type === 'rival' ? 'hover:text-pink-400' : 'hover:text-pink-500'}`}>
                                                    <MessageCircle size={16} className="group-hover:scale-110 transition-transform"/> 
                                                    <span>Reply</span>
                                                </button>
                                                <button className={`flex items-center gap-2 text-xs font-bold group transition-colors ${p.type === 'rival' ? 'hover:text-emerald-400' : 'hover:text-emerald-500'}`}>
                                                    <Repeat2 size={16} className="group-hover:scale-110 transition-transform"/> 
                                                    <span>Repost</span>
                                                </button>
                                                <button className={`flex items-center gap-2 text-xs font-bold group transition-colors ${p.type === 'rival' ? 'hover:text-pink-400' : 'hover:text-pink-500'}`}>
                                                    <Heart size={16} className={`transition-all group-hover:scale-110 ${p.type === 'rival' ? 'group-hover:fill-pink-400' : 'group-hover:fill-pink-500'}`}/> 
                                                    {p.likes}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )})}
                </div>
            </div>
        </div>
    );
};
