
import React from 'react';
import { Settings, Star, PenTool, ArrowRight, Mic as MicIcon, Guitar, Zap, Disc } from 'lucide-react';
import { Role } from '../types';

interface WelcomeScreenProps {
    engine: any;
    playerNameInput: string;
    setPlayerNameInput: (name: string) => void;
    onOpenSettings: () => void;
    defaultPlayerName: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
    engine, playerNameInput, setPlayerNameInput, onOpenSettings, defaultPlayerName
}) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden selection:bg-pink-100 selection:text-pink-600">
            
            {/* Background - Very subtle */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent pointer-events-none"/>
            
            {/* Settings Button */}
            <button 
                onClick={onOpenSettings}
                className="absolute top-6 right-6 p-3 rounded-2xl bg-white text-slate-400 hover:text-slate-900 border border-slate-100 hover:border-slate-300 transition-all z-50 shadow-sm"
            >
                <Settings size={20} />
            </button>

            <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-16 flex flex-col md:flex-row gap-12 md:gap-20 items-center relative overflow-hidden animate-in fade-in zoom-in duration-700">
                
                {/* Decorative Side Strip */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-rose-500 hidden md:block"/>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-50"/>

                {/* Left: Brand & Intro */}
                <div className="flex-1 space-y-8 relative z-10 text-center md:text-left w-full">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                            <Star size={10} fill="currentColor"/>
                            Band Simulator v1.0
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] italic">
                            GIRLS'<br/>
                            <span className="text-rose-500">BAND</span> LIFE
                        </h1>
                        <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-4">
                            从零开始的都市乐队物语
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                            Artist Name
                        </label>
                        <div className="relative group max-w-sm mx-auto md:mx-0">
                            <input 
                                type="text" 
                                value={playerNameInput}
                                onChange={(e) => setPlayerNameInput(e.target.value)}
                                placeholder={defaultPlayerName} 
                                className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 font-bold text-lg py-4 px-6 rounded-2xl outline-none focus:border-rose-500 focus:bg-white transition-all placeholder:text-slate-300"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                                <PenTool size={16}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Role Select */}
                <div className="flex-1 w-full relative z-10">
                    <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                        <div className="h-px w-8 bg-slate-200"/>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Position</span>
                        <div className="h-px w-full bg-slate-200 flex-1"/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: Role.Vocal, icon: MicIcon, label: 'Vocal', desc: '主唱 / 核心', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', hover: 'hover:border-rose-300' },
                            { id: Role.Guitar, icon: Guitar, label: 'Guitar', desc: '吉他 / 旋律', bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100', hover: 'hover:border-sky-300' },
                            { id: Role.Bass, icon: Zap, label: 'Bass', desc: '贝斯 / 节奏', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', hover: 'hover:border-amber-300' },
                            { id: Role.Drums, icon: Disc, label: 'Drums', desc: '鼓手 / 支柱', bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', hover: 'hover:border-indigo-300' }
                        ].map((role) => (
                            <button
                                key={role.id}
                                onClick={() => {
                                    const finalName = playerNameInput.trim() || defaultPlayerName;
                                    engine.initGame(role.id, finalName)
                                }}
                                className={`group relative p-5 rounded-3xl border-2 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 bg-white ${role.border} ${role.hover}`}
                            >
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 transition-colors ${role.bg} ${role.text} group-hover:scale-110 duration-300`}>
                                    <role.icon size={20}/>
                                </div>
                                <div>
                                    <div className="font-black text-slate-900 text-lg tracking-tight">{role.label}</div>
                                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">{role.desc}</div>
                                </div>
                                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <ArrowRight size={16} className="text-slate-300"/>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer Credit */}
            <div className="absolute bottom-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Tokyo Urban Story © 2024
            </div>
        </div>
    );
};
