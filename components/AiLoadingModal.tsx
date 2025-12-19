
import { Loader2, Sparkles } from 'lucide-react';

export const AiLoadingModal = () => (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 text-center font-sans">
        <div className="relative">
            <Loader2 size={80} className="text-pink-500 animate-spin mb-8 opacity-80"/>
            <Sparkles size={32} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"/>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 animate-pulse tracking-tight">AI 生成中...</h2>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">正在为你编织故事，请稍候...</p>
    </div>
);
