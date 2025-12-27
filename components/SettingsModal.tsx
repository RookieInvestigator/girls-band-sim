
import React from 'react';
import { Settings, Sparkles, ToggleLeft, ToggleRight, Key, ArrowRight, Zap, Trash2 } from 'lucide-react';

interface SettingsModalProps {
    onClose: () => void;
    showNetaNames: boolean;
    setShowNetaNames: (v: boolean) => void;
    hasEnvKey: boolean;
    hasStoredKey: boolean;
    apiKeyInput: string;
    setApiKeyInput: (v: string) => void;
    handleApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearApiKey: () => void;
}

export const SettingsModal = ({
    onClose,
    showNetaNames,
    setShowNetaNames,
    hasEnvKey,
    hasStoredKey,
    apiKeyInput,
    handleApiKeyChange,
    clearApiKey
}: SettingsModalProps) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-100 relative overflow-hidden">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <Settings size={20} />
                </button>

                <h3 className="font-black text-2xl mb-6 flex items-center gap-2 text-slate-900 uppercase tracking-tighter italic">
                    <Settings size={24} className="text-slate-900"/> 设置
                </h3>

                {/* --- Neta Name Toggle --- */}
                <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-amber-500"/>
                            <span className="font-black text-sm text-slate-800">原典名显示 (Neta Mode)</span>
                        </div>
                        <button onClick={() => setShowNetaNames(!showNetaNames)} className="text-slate-400 hover:text-slate-900 transition-colors">
                            {showNetaNames ? <ToggleRight size={32} className="text-rose-500 fill-rose-50"/> : <ToggleLeft size={32}/>}
                        </button>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
                        开启后，传说级角色将显示其致敬的原型角色名（如：鲸溶子 - 丰川祥子）。
                    </p>
                </div>

                {/* --- API Key Section --- */}
                <h4 className="font-black text-sm mb-2 flex items-center gap-2 text-slate-900 uppercase tracking-tighter">
                    <Key size={16} className="text-pink-500"/> API 设置
                </h4>
                <p className="text-xs font-bold text-slate-500 mb-4 leading-relaxed">
                    本游戏使用 Google Gemini AI 生成动态内容。
                    <br/>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-pink-500 hover:underline flex items-center gap-1 mt-1 font-black bg-pink-50 inline-block px-2 py-1 rounded">
                        获取免费 API Key <ArrowRight size={10}/>
                    </a>
                </p>
                
                {hasEnvKey ? (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm font-bold flex items-center gap-3 mb-6 border-2 border-emerald-100 border-dashed">
                        <div className="p-2 bg-white rounded-full shadow-sm"><Zap size={16} fill="currentColor"/></div>
                        API Key 已通过环境变量注入!
                    </div>
                ) : (
                    <div className="space-y-4 mb-6">
                        <div className="space-y-2">
                            <input 
                                type="password" 
                                value={apiKeyInput}
                                onChange={handleApiKeyChange}
                                placeholder="在此粘贴您的 Key..."
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-pink-500 focus:bg-white transition-all font-bold"
                            />
                        </div>
                        {hasStoredKey && (
                            <button 
                                onClick={clearApiKey}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors w-full justify-center border border-rose-100"
                            >
                                <Trash2 size={12}/> 清除保存的 Key
                            </button>
                        )}
                    </div>
                )}
                
                <button 
                    onClick={onClose}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-pink-500 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200 active:translate-y-0 active:shadow-none border-2 border-transparent"
                >
                    保存并关闭
                </button>
            </div>
        </div>
    );
};
