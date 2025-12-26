
import React from 'react';
import { Settings, Sparkles, ToggleLeft, ToggleRight, Key, ArrowRight, Zap, Trash2, X } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    showNetaNames: boolean;
    setShowNetaNames: (show: boolean) => void;
    hasEnvKey: boolean;
    hasStoredKey: boolean;
    apiKeyInput: string;
    handleApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearApiKey: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen, onClose, showNetaNames, setShowNetaNames, hasEnvKey, hasStoredKey, apiKeyInput, handleApiKeyChange, clearApiKey
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white p-10 rounded-[3rem] w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                <button 
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <X size={24} />
                </button>

                <h3 className="font-black text-4xl mb-10 flex items-center gap-3 text-slate-900 uppercase tracking-tighter italic">
                    <Settings size={32} className="text-slate-900"/> 设置
                </h3>

                {/* --- Neta Name Toggle --- */}
                <div className="mb-10 p-8 bg-slate-50 rounded-[2rem]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-xl text-amber-500"><Sparkles size={20}/></div>
                            <span className="font-black text-base text-slate-800">原典名显示 (Neta Mode)</span>
                        </div>
                        <button onClick={() => setShowNetaNames(!showNetaNames)} className="text-slate-300 hover:text-rose-500 transition-colors">
                            {showNetaNames ? <ToggleRight size={40} className="text-rose-500 fill-rose-100"/> : <ToggleLeft size={40}/>}
                        </button>
                    </div>
                    <p className="text-xs font-bold text-slate-400 leading-relaxed pl-1">
                        开启后，传说级角色将显示其致敬的原型角色名（如：鲸溶子 - 丰川祥子）。
                    </p>
                </div>

                {/* --- API Key Section --- */}
                <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-slate-900 uppercase tracking-tighter px-2">
                    <Key size={16} className="text-pink-500"/> API 设置
                </h4>
                <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed px-2">
                    本游戏使用 Google Gemini AI 生成动态内容。
                    <br/>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-pink-500 hover:underline flex items-center gap-1 mt-2 font-black bg-pink-50 inline-block px-3 py-1.5 rounded-lg transition-colors hover:bg-pink-100">
                        获取免费 API Key <ArrowRight size={12}/>
                    </a>
                </p>
                
                {hasEnvKey ? (
                    <div className="bg-emerald-50 text-emerald-700 p-6 rounded-[1.5rem] text-sm font-bold flex items-center gap-3 mb-10 border border-emerald-100">
                        <div className="p-2 bg-white rounded-full shadow-sm text-emerald-500"><Zap size={18} fill="currentColor"/></div>
                        API Key 已通过环境变量注入!
                    </div>
                ) : (
                    <div className="space-y-4 mb-10">
                        <div className="space-y-2">
                            <input 
                                type="password" 
                                value={apiKeyInput}
                                onChange={handleApiKeyChange}
                                placeholder="在此粘贴您的 Key..."
                                className="w-full bg-slate-50 rounded-2xl px-6 py-5 text-sm font-mono outline-none focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all font-bold placeholder:text-slate-300 border border-transparent focus:border-pink-200"
                            />
                        </div>
                        {hasStoredKey && (
                            <button 
                                onClick={clearApiKey}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 px-4 py-3 rounded-xl transition-colors w-full justify-center"
                            >
                                <Trash2 size={12}/> 清除保存的 Key
                            </button>
                        )}
                    </div>
                )}
                
                <button 
                    onClick={onClose}
                    className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/30 transition-all shadow-xl active:scale-95"
                >
                    保存并关闭
                </button>
            </div>
        </div>
    );
};
