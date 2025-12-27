
import React, { useState, useEffect } from 'react';
import { 
  Music, Users, Calendar, MessageCircle, Layout, Disc, Ticket, Star, Settings, Key, ArrowRight, PenTool, Mic as MicIcon, Guitar, Zap, Coins
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
import { WelcomeScreen } from './components/WelcomeScreen';
import { SettingsModal } from './components/SettingsModal';

declare var process: { env: { API_KEY: string } };

const App = () => {
  const engine = useGameEngine();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'members' | 'songs' | 'sns' | 'gigs'>('dashboard');
  
  // API Key handling for static hosting
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasEnvKey, setHasEnvKey] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Neta Name Toggle
  const [showNetaNames, setShowNetaNames] = useState(false);

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
      <>
        <WelcomeScreen 
            onStartGame={engine.initGame} 
            onOpenSettings={() => setShowSettings(true)}
        />
        {showSettings && (
            <SettingsModal 
                onClose={() => setShowSettings(false)}
                showNetaNames={showNetaNames}
                setShowNetaNames={setShowNetaNames}
                hasEnvKey={hasEnvKey}
                hasStoredKey={hasStoredKey}
                apiKeyInput={apiKeyInput}
                setApiKeyInput={setApiKeyInput}
                handleApiKeyChange={handleApiKeyChange}
                clearApiKey={clearApiKey}
            />
        )}
      </>
    );
  }

  // --- MAIN GAME UI (SIDEBAR LAYOUT) ---
  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden relative selection:bg-pink-100 selection:text-pink-600">
      
      {/* --- OVERLAYS --- */}
      {showSettings && (
          <SettingsModal 
              onClose={() => setShowSettings(false)}
              showNetaNames={showNetaNames}
              setShowNetaNames={setShowNetaNames}
              hasEnvKey={hasEnvKey}
              hasStoredKey={hasStoredKey}
              apiKeyInput={apiKeyInput}
              setApiKeyInput={setApiKeyInput}
              handleApiKeyChange={handleApiKeyChange}
              clearApiKey={clearApiKey}
          />
      )}
      {engine.showSkillTree && <SkillTreeModal engine={engine} />}
      {engine.isEventOpen && engine.activeEvent && <EventModal engine={engine} showNeta={showNetaNames} />}
      {engine.showScoutModal && <ScoutModal engine={engine} showNeta={showNetaNames} />}
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
          
          {/* --- HEADER (Exquisite Floating Capsule) --- */}
          <header className="shrink-0 z-40 mx-4 md:mx-6 mt-4 mb-2 rounded-full bg-white/50 backdrop-blur-md border border-white/40 shadow-sm flex justify-between items-center px-6 py-2.5 transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:border-white/60">
              <div className="flex items-center gap-4">
                  {/* Mobile Title */}
                  <div className="lg:hidden text-slate-900 font-black tracking-tight text-lg">BAND<span className="text-pink-500">SIM</span></div>
                  {/* Desktop Week */}
                  <div className="hidden lg:flex items-center gap-1 font-black text-slate-900 tracking-tighter text-lg">

                      <span className="text-xl text-slate-900 font-black">#WEEK {engine.gameState.currentWeek}</span>
                  </div>
              </div>
              
              {/* Resources Pills */}
              <div className="flex gap-2 md:gap-3">
                  <div className="flex items-center gap-2 text-xs md:text-sm font-black text-slate-700 bg-white/60 px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                      <Users size={14} className="text-pink-500 fill-pink-500/20"/> 
                      <span>{engine.gameState.fans > 1000 ? (engine.gameState.fans/1000).toFixed(1) + 'k' : engine.gameState.fans}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-black text-slate-700 bg-white/60 px-4 py-2 rounded-full border border-amber-100 shadow-sm">
                      <Coins size={14} className="text-amber-500 fill-amber-500/20"/> 
                      <span>¥{engine.gameState.money > 1000 ? (engine.gameState.money/1000).toFixed(1) + 'k' : engine.gameState.money}</span>
                  </div>
              </div>
          </header>

          {/* --- SCROLLABLE CONTENT --- */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto w-full p-4 lg:p-8 pb-32 lg:pb-12 pt-2">
                {activeTab === 'dashboard' && <DashboardTab engine={engine} />}
                {activeTab === 'schedule' && <ScheduleTab engine={engine} />}
                {activeTab === 'members' && <MembersTab engine={engine} showNeta={showNetaNames} />}
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
