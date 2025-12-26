
import { Loader2, Music, PenTool, Lightbulb, Sparkles } from 'lucide-react';

export const AiLoadingModal = () => (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 text-center font-sans">
        <div className="relative mb-12">
            {/* Ambient Background Rings */}
            <div className="absolute inset-0 rounded-full border border-slate-700/50 animate-[ping_3s_ease-out_infinite] opacity-30"/>
            <div className="absolute inset-[-12px] rounded-full border border-pink-500/20 animate-[ping_3s_ease-out_infinite] opacity-30" style={{animationDelay: '0.5s'}}/>
            
            {/* Central Icon Group */}
            <div className="relative z-10 w-28 h-28 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-[0_0_60px_-15px_rgba(236,72,153,0.5)]">
                <Music size={48} className="text-pink-500 animate-bounce" style={{animationDuration: '2s'}}/>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-2 bg-slate-800 p-2.5 rounded-full border-2 border-slate-700 shadow-lg animate-pulse">
                    <Lightbulb size={24} className="text-amber-400 fill-amber-400"/>
                </div>
                <div className="absolute -bottom-2 -left-2 bg-slate-800 p-2 rounded-full border-2 border-slate-700 shadow-lg">
                    <PenTool size={20} className="text-sky-400"/>
                </div>
            </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 animate-pulse tracking-tighter italic drop-shadow-2xl">
            新曲构思中<span className="text-pink-500">...</span>
        </h2>
        
        <div className="flex flex-col gap-3 w-full max-w-xs relative">
            {/* Progress Steps Simulation */}
            <div className="flex items-center gap-4 text-slate-300 text-xs font-bold uppercase tracking-[0.2em] animate-in slide-in-from-bottom-2 fade-in duration-700 delay-100 bg-white/5 p-3 rounded-xl border border-white/5">
                <Sparkles size={14} className="text-amber-400"/> 
                <span>捕捉灵感碎片</span>
                <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full animate-pulse"/>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-[0.2em] animate-in slide-in-from-bottom-2 fade-in duration-700 delay-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <Music size={14} className="text-pink-400"/> 
                <span>谱写主旋律</span>
                <div className="ml-auto w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}/>
            </div>
            
            <div className="flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-[0.2em] animate-in slide-in-from-bottom-2 fade-in duration-700 delay-500 bg-white/5 p-3 rounded-xl border border-white/5">
                <PenTool size={14} className="text-sky-400"/> 
                <span>打磨歌词细节</span>
                <Loader2 size={12} className="ml-auto text-sky-400 animate-spin"/>
            </div>
        </div>
        
        <p className="absolute bottom-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
            Creative Process In Progress
        </p>
    </div>
);
