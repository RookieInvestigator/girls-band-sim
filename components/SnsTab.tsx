
import { MessageCircle, Heart, Share2, MoreHorizontal, Sword } from 'lucide-react';
import { SNSPost } from '../types';

export const SnsTab = ({ engine }: { engine: any }) => {
    return (
        <div className="max-w-2xl mx-auto lg:h-full h-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col lg:h-full h-auto lg:overflow-hidden relative min-h-[80vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-50 bg-white/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between">
                    <h3 className="font-black text-xl text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                            <MessageCircle size={20}/>
                        </div>
                        社交动态
                    </h3>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                        实时更新
                    </div>
                </div>

                {/* Feed */}
                <div className="lg:flex-1 lg:overflow-y-auto p-0 scrollbar-hide bg-slate-50">
                        {engine.gameState.snsPosts.map((p: SNSPost) => (
                            <div key={p.id} className={`p-6 border-b border-slate-100 bg-white hover:bg-slate-50/50 transition-colors ${p.type === 'rival' ? 'bg-slate-900 text-white hover:bg-slate-800' : ''}`}>
                                <div className="flex gap-4">
                                    {/* Avatar */}
                                    <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-lg font-black shadow-sm ring-2 ring-offset-2 ${
                                        p.type === 'member' ? 'bg-pink-500 text-white ring-pink-100' : 
                                        (p.type === 'rival' ? 'bg-indigo-600 text-white ring-indigo-900' : 
                                        'bg-slate-200 text-slate-500 ring-transparent')
                                    }`}>
                                    {p.type === 'rival' ? <Sword size={18}/> : p.authorName[0]}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold text-sm ${p.type === 'member' ? 'text-pink-600' : (p.type === 'rival' ? 'text-indigo-300' : 'text-slate-900')}`}>
                                                    {p.authorName}
                                                </span>
                                                {p.type === 'system' && <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase">系统</span>}
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${p.type === 'rival' ? 'text-slate-500' : 'text-slate-300'}`}>
                                                {p.timestamp}
                                            </span>
                                        </div>
                                        
                                        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${p.type === 'rival' ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {p.content}
                                        </p>
                                        
                                        {/* Actions */}
                                        <div className="flex gap-6 mt-4 opacity-60">
                                            <button className={`flex items-center gap-1.5 text-xs font-bold group transition-colors ${p.type === 'rival' ? 'hover:text-pink-400' : 'hover:text-pink-500'}`}>
                                                <Heart size={16} className={`transition-all group-hover:scale-110 ${p.type === 'rival' ? 'group-hover:fill-pink-400' : 'group-hover:fill-pink-500'}`}/> 
                                                {p.likes}
                                            </button>
                                            <button className="flex items-center gap-1.5 text-xs font-bold hover:text-sky-500 transition-colors">
                                                <Share2 size={16}/>
                                            </button>
                                            <button className="ml-auto">
                                                <MoreHorizontal size={16}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
