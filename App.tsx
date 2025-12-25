
import React, { useState, useEffect } from 'react';
import { 
  Music, Users, Calendar, MessageCircle, Layout, Disc, Ticket, Star, Mic as MicIcon, Guitar, Zap, PenTool, Coins, Activity, Key, Settings, LogOut, Menu, ArrowRight, PlayCircle, Sparkles, Heart, Crown, Headphones, Trash2
} from 'lucide-react';
import { useGameEngine } from './logic/game_engine';
import { Role } from './types';
import { TurnResultModal } from './components/TurnResultModal';
import { DashboardTab } from './components/DashboardTab';
import { ScheduleTab } from './components/ScheduleTab';
import { LiveStage } from './components/LiveStage'; 
import { GigTab } from './components/GigTab';
import { GigResultModal } from './components/GigResultModal';
import { MembersTab } from './components/MembersTab';
import { SongsTab } from './components/SongsTab';
import { SnsTab } from './components/SnsTab';
import { ScoutModal } from './components/ScoutModal';
import { EventModal } from './components/EventModal';
import { AiLoadingModal } from './components/AiLoadingModal';
import { SkillTreeModal } from './components/SkillTreeModal';

declare var process: { env: { API_KEY: string } };

const DEFAULT_PLAYER_NAME = "七曜 舞禾";

const App = () => {
  const engine = useGameEngine();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'members' | 'songs' | 'sns' | 'gigs'>('dashboard');
  const [playerNameInput, setPlayerNameInput] = useState('');
  
  // API Key handling for static hosting
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasEnvKey, setHasEnvKey] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
      // Check if env key is present and not empty
      if (process.env.API_KEY && process.env.API_KEY.length > 0) {
          setHasEnvKey(true);
      } else {
          // Pre-fill from local storage if available
          const stored = localStorage.getItem('gemini_api_key');
          if (stored) {
              setApiKeyInput(stored);
              setHasStoredKey(true);
          }
      }
  }, []);

  // Sync API status to engine for UI Logic
  useEffect(() => {
      engine.setHasApiKey(hasEnvKey || hasStoredKey);
  }, [hasEnvKey, hasStoredKey, engine.setHasApiKey]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setApiKeyInput(val);
      if (val.trim().length > 0) {
          localStorage.setItem('gemini_api_key', val);
          setHasStoredKey(true);
      } else {
          localStorage.removeItem('gemini_api_key');
          setHasStoredKey(false);
      }
  };

  const clearApiKey = () => {
      setApiKeyInput('');
      localStorage.removeItem('gemini_api_key');
      setHasStoredKey(false);
  };

  // HACK: Expose nextRound to window for LiveStage
  useEffect(() => { (window as any).handleNextRound = engine.nextRound; }, [engine.nextRound]);

  const NAV_ITEMS = [
    { id: 'dashboard', icon: Layout, label: '主页' },
    { id: 'schedule', icon: Calendar, label: '日程' },
    { id: 'members', icon: Users, label: '成员' },
    { id: 'gigs', icon: Ticket, label: '演出' },
    { id: 'songs', icon: Disc, label: '作品' },
    { id: 'sns', icon: MessageCircle, label: 'SNS' },
  ];

  // --- SETTINGS MODAL COMPONENT ---
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in fade-in duration-200">
        <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-100 relative overflow-hidden">
            <button 
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
            >
                <Settings size={20} />
            </button>

            <h3 className="font-black text-2xl mb-2 flex items-center gap-2 text-slate-900 uppercase tracking-tighter italic">
                <Key size={24} className="text-pink-500"/> API 设置
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed">
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
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gemini API Key</label>
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
                onClick={() => setShowSettings(false)}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-pink-500 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200 active:translate-y-0 active:shadow-none border-2 border-transparent"
            >
                保存并关闭
            </button>
        </div>
    </div>
  );

  // --- GIG OVERLAY ---
  if (engine.gameState.activeGig) {
      return (
          <LiveStage 
            activeGig={engine.gameState.activeGig} 
            onOptionSelect={engine.playCard} 
            onFinish={engine.finishGigAndContinueTurn} 
          />
      );
  }

  // --- WELCOME SCREEN (CLEAN URBAN MAGAZINE THEME) ---
  if (!engine.isStarted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden selection:bg-pink-100 selection:text-pink-600">
        
        {/* Background - Very subtle */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent pointer-events-none"/>
        
        {/* Settings Button */}
        <button 
            onClick={() => setShowSettings(true)}
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
                            placeholder={DEFAULT_PLAYER_NAME} 
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
                                const finalName = playerNameInput.trim() || DEFAULT_PLAYER_NAME;
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

        {/* Render Settings Modal if open */}
        {showSettings && <SettingsModal />}
      </div>
    );
  }

  // --- MAIN GAME UI (SIDEBAR LAYOUT) ---
  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden relative selection:bg-pink-100 selection:text-pink-600">
      
      {/* --- OVERLAYS --- */}
      {showSettings && <SettingsModal />}
      {engine.showSkillTree && <SkillTreeModal engine={engine} />}
      {engine.isEventOpen && engine.activeEvent && <EventModal engine={engine} />}
      {engine.showScoutModal && <ScoutModal engine={engine} />}
      {engine.showTurnResult && engine.turnResultData && <TurnResultModal data={engine.turnResultData} onFinish={engine.finishTurnResult} />}
      {engine.showGigResult && engine.gigResultData && <GigResultModal data={engine.gigResultData} onClose={engine.closeGigResult} />}
      {engine.isGeneratingSong && <AiLoadingModal />}

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-24 xl:w-64 bg-slate-900 flex-col items-center xl:items-stretch py-8 px-4 gap-2 shrink-0 z-50 shadow-2xl">
          <div className="mb-8 flex flex-col items-center xl:items-start px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg shadow-pink-500/30">
                  <Star size={20} fill="currentColor" />
              </div>
              <h1 className="hidden xl:block font-black text-white text-lg tracking-tight">BAND<span className="text-pink-500">SIM</span></h1>
          </div>

          <nav className="flex-1 w-full space-y-1">
              {NAV_ITEMS.map((tab) => (
                  <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`
                          w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group
                          ${activeTab === tab.id 
                              ? 'bg-white text-slate-900 shadow-lg' 
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                      `}
                  >
                      <tab.icon size={20} className={activeTab === tab.id ? 'text-pink-500' : 'group-hover:text-white'} strokeWidth={2.5}/>
                      <span className="hidden xl:block font-bold text-sm tracking-wide">{tab.label}</span>
                      {activeTab === tab.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-500 hidden xl:block"/>}
                  </button>
              ))}
          </nav>

          <div className="mt-auto w-full pt-4 border-t border-slate-800">
                <button 
                    onClick={() => setShowSettings(true)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-800 hover:text-white transition-all group"
                >
                    <Settings size={20} />
                    <span className="hidden xl:block font-bold text-sm">设置</span>
                </button>
          </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* --- HEADER (Sticky) --- */}
          <header className="shrink-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-4">
                  <div className="lg:hidden text-slate-900 font-black tracking-tight text-lg">BAND<span className="text-pink-500">SIM</span></div>
                  <div className="hidden lg:block font-black text-slate-900 tracking-tighter text-lg">
                      <span className="text-pink-500 mr-1">#</span>Week {engine.gameState.currentWeek}
                  </div>
              </div>
              <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                      <Users size={14} className="text-pink-500"/> {engine.gameState.fans > 1000 ? (engine.gameState.fans/1000).toFixed(1) + 'k' : engine.gameState.fans}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                      <Coins size={14} className="text-amber-500"/> ¥{engine.gameState.money > 1000 ? (engine.gameState.money/1000).toFixed(1) + 'k' : engine.gameState.money}
                  </div>
              </div>
          </header>

          {/* --- SCROLLABLE CONTENT --- */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto w-full p-4 lg:p-8 pb-32 lg:pb-12">
                {activeTab === 'dashboard' && <DashboardTab engine={engine} />}
                {activeTab === 'schedule' && <ScheduleTab engine={engine} />}
                {activeTab === 'members' && <MembersTab engine={engine} />}
                {activeTab === 'songs' && <SongsTab engine={engine} />}
                {activeTab === 'sns' && <SnsTab engine={engine} />}
                {activeTab === 'gigs' && <GigTab engine={engine} />}
            </div>
          </main>

          {/* --- MOBILE BOTTOM NAVIGATION (Hidden on LG) --- */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            <nav className="pointer-events-auto bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 pb-safe safe-area-bottom pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center pb-3">
                {NAV_ITEMS.map((tab) => (
                    <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex flex-col items-center gap-1 transition-all duration-200 p-2 rounded-xl ${activeTab === tab.id ? 'text-slate-900 bg-slate-100' : 'text-slate-400'}`}
                    >
                    <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} className={activeTab === tab.id ? 'text-pink-500' : ''} />
                    <span className="text-[9px] font-bold uppercase tracking-wide">
                        {tab.label}
                    </span>
                    </button>
                ))}
                </div>
            </nav>
          </div>

      </div>
    </div>
  );
};

export default App;
