
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
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden text-slate-900">
            
            {/* Simple Background */}
            <div className="absolute inset-0 bg-slate-50 z-0"/>
            
            {/* Settings Button */}
            <button 
                onClick={onOpenSettings}
                className="absolute top-6 right-6 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors z-50 hover:bg-slate-50"
            >
                <Settings size={20} />
            </button>

            {/* Main Container */}
            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-12 items-center relative z-10">
                
                {/* Left: Brand & Intro */}
                <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left w-full lg:pl-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
                            <Star size={10} fill="currentColor"/>
                            Band Simulator v1.0
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] italic">
                            GIRLS'<br/>
                            <span className="text-rose-500">BAND</span><br/>
                            SIM
                        </h1>
                        <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-4">
                            从零开始的都市乐队物语
                        </p>
                    </div>

                    <div className="space-y-2 max-w-sm mx-auto lg:mx-0">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                            Artist Name
                        </label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={playerNameInput}
                                onChange={(e) => setPlayerNameInput(e.target.value)}
                                placeholder={defaultPlayerName} 
                                className="w-full bg-white text-slate-900 font-black text-lg py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-300 border border-slate-200"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                                <PenTool size={16}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Role Select */}
                <div className="flex-1 w-full relative z-10 lg:pr-10">
                    <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Position</span>
                        <div className="h-px w-full bg-slate-200 flex-1"/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { id: Role.Vocal, icon: MicIcon, label: 'Vocal', desc: '主唱 / 核心', bg: 'bg-rose-50', text: 'text-rose-600' },
                            { id: Role.Guitar, icon: Guitar, label: 'Guitar', desc: '吉他 / 旋律', bg: 'bg-sky-50', text: 'text-sky-600' },
                            { id: Role.Bass, icon: Zap, label: 'Bass', desc: '贝斯 / 节奏', bg: 'bg-amber-50', text: 'text-amber-600' },
                            { id: Role.Drums, icon: Disc, label: 'Drums', desc: '鼓手 / 支柱', bg: 'bg-indigo-50', text: 'text-indigo-600' }
                        ].map((role) => (
                            <button
                                key={role.id}
                                onClick={() => {
                                    const finalName = playerNameInput.trim() || defaultPlayerName;
                                    engine.initGame(role.id, finalName)
                                }}
                                className="group relative p-5 rounded-2xl text-left transition-all hover:-translate-y-1 bg-white hover:shadow-md border border-slate-100"
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${role.bg} ${role.text}`}>
                                    <role.icon size={20}/>
                                </div>
                                <div>
                                    <div className="font-black text-slate-900 text-base tracking-tight mb-0.5">{role.label}</div>
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{role.desc}</div>
                                </div>
                                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300">
                                    <ArrowRight size={18}/>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer Credit */}
            <div className="absolute bottom-6 text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
                Tokyo Urban Story © 2024
            </div>
        </div>
    );
};
