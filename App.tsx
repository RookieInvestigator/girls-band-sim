
import React, { useState, useEffect } from 'react';
import { 
  Music, Users, Calendar, MessageCircle, Layout, Disc, Ticket, Star, Mic as MicIcon, Guitar, Zap, PenTool, Coins, Activity, Key, Settings, LogOut, Menu
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

const App = () => {
  const engine = useGameEngine();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'members' | 'songs' | 'sns' | 'gigs'>('dashboard');
  const [playerNameInput, setPlayerNameInput] = useState('');
  
  // API Key handling for static hosting
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasEnvKey, setHasEnvKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
      // Check if env key is present and not empty
      if (process.env.API_KEY && process.env.API_KEY.length > 0) {
          setHasEnvKey(true);
      } else {
          // Pre-fill from local storage if available
          const stored = localStorage.getItem('gemini_api_key');
          if (stored) setApiKeyInput(stored);
      }
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setApiKeyInput(val);
      localStorage.setItem('gemini_api_key', val);
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

  // --- WELCOME SCREEN ---
  if (!engine.isStarted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-slate-800 relative overflow-hidden font-sans">
        
        {/* Settings Button */}
        <button 
            onClick={() => setShowSettings(true)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:shadow-md transition-all z-50"
        >
            <Settings size={20} />
        </button>

        <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl mx-auto text-center animate-in fade-in zoom-in duration-1000 w-full">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-slate-200 text-pink-500 font-black uppercase tracking-[0.3em] text-[10px] shadow-sm">
               <Star size={10} fill="currentColor"/> EARLY ACCESS
            </div>
            {/* Added larger pr-14 to prevent italic text clipping */}
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-slate-900 leading-[0.85] pr-14">
              GIRLS'<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600">BAND SIM</span>
            </h1>
            <p className="text-slate-400 font-bold tracking-[0.4em] uppercase text-xs md:text-sm">通往武道馆之路 // 都市物语</p>
          </div>

          <div className="w-full max-w-md space-y-4">
              <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center transition-all focus-within:ring-2 focus-within:ring-pink-500/50">
                <input 
                type="text" 
                value={playerNameInput}
                onChange={(e) => setPlayerNameInput(e.target.value)}
                placeholder="请输入你的名字" 
                className="w-full bg-transparent border-none outline-none text-center font-black text-lg md:text-xl text-slate-800 placeholder-slate-300 py-3 tracking-widest"
                />
              </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[Role.Vocal, Role.Guitar, Role.Bass, Role.Drums].map((role, i) => (
              <button 
                key={role} 
                onClick={() => {
                    if(!playerNameInput.trim()) { alert("请输入你的名字"); return; }
                    engine.initGame(role, playerNameInput.trim())
                }}
                className="group relative flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-pink-300 transition-all hover:-translate-y-2 active:scale-95"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-pink-50 group-hover:text-white transition-colors">
                    {role === Role.Vocal && <MicIcon size={32}/>}
                    {role === Role.Guitar && <Guitar size={32}/>}
                    {role === Role.Bass && <Guitar size={32} className="rotate-180"/>}
                    {role === Role.Drums && <Disc size={32}/>}
                </div>
                <span className="font-black uppercase tracking-widest text-xs text-slate-500 group-hover:text-pink-600">{role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* API KEY SETTINGS MODAL */}
        {showSettings && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in">
                <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
                    <h3 className="font-black text-xl mb-4 flex items-center gap-2"><Key size={20}/> API Settings</h3>
                    <p className="text-xs text-slate-500 mb-4">
                        This game requires a Google Gemini API Key for AI features (Song generation, SNS posts). 
                        If not provided via environment variables, please enter it here.
                        <br/><br/>
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-pink-500 underline">Get API Key</a>
                    </p>
                    
                    {hasEnvKey ? (
                        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-bold flex items-center gap-2 mb-4">
                            <Zap size={16}/> API Key injected via Environment!
                        </div>
                    ) : (
                        <input 
                            type="password" 
                            value={apiKeyInput}
                            onChange={handleApiKeyChange}
                            placeholder="Enter Gemini API Key"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono mb-4 outline-none focus:border-pink-500"
                        />
                    )}
                    
                    <button 
                        onClick={() => setShowSettings(false)}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-800"
                    >
                        Save & Close
                    </button>
                </div>
            </div>
        )}
      </div>
    );
  }

  // --- MAIN GAME UI (SIDEBAR LAYOUT) ---
  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden relative">
      
      {/* --- OVERLAYS --- */}
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
                    <span className="hidden xl:block font-bold text-sm">Settings</span>
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
