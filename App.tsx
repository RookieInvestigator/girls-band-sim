
import React, { useState, useEffect } from 'react';
import { 
  Music, Users, Calendar, MessageCircle, Layout, Disc, Ticket, Star, Coins, Settings, Zap
} from 'lucide-react';
import { useGameEngine } from './logic/game_engine';
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
import { SettingsModal } from './components/SettingsModal';
import { WelcomeScreen } from './components/WelcomeScreen';

declare var process: { env: { API_KEY: string } };

const DEFAULT_PLAYER_NAME = "七濑舞禾";

const App = () => {
  const engine = useGameEngine();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'members' | 'songs' | 'sns' | 'gigs'>('dashboard');
  const [playerNameInput, setPlayerNameInput] = useState('');
  
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasEnvKey, setHasEnvKey] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNetaNames, setShowNetaNames] = useState(false);

  useEffect(() => {
      if (process.env.API_KEY && process.env.API_KEY.length > 0) {
          setHasEnvKey(true);
      } else {
          const stored = localStorage.getItem('gemini_api_key');
          if (stored) {
              setApiKeyInput(stored);
              setHasStoredKey(true);
          }
      }
  }, []);

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

  useEffect(() => { (window as any).handleNextRound = engine.nextRound; }, [engine.nextRound]);

  const NAV_ITEMS = [
    { id: 'dashboard', icon: Layout, label: '主页' },
    { id: 'schedule', icon: Calendar, label: '日程' },
    { id: 'members', icon: Users, label: '成员' },
    { id: 'gigs', icon: Ticket, label: '演出' },
    { id: 'songs', icon: Disc, label: '作品' },
    { id: 'sns', icon: MessageCircle, label: 'SNS' },
  ];

  if (engine.gameState.activeGig) {
      return (
          <LiveStage 
            activeGig={engine.gameState.activeGig} 
            onOptionSelect={engine.playCard} 
            onFinish={engine.finishGigAndContinueTurn} 
          />
      );
  }

  if (!engine.isStarted) {
    return (
        <>
            <WelcomeScreen 
                engine={engine}
                playerNameInput={playerNameInput}
                setPlayerNameInput={setPlayerNameInput}
                onOpenSettings={() => setShowSettings(true)}
                defaultPlayerName={DEFAULT_PLAYER_NAME}
            />
            <SettingsModal 
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                showNetaNames={showNetaNames}
                setShowNetaNames={setShowNetaNames}
                hasEnvKey={hasEnvKey}
                hasStoredKey={hasStoredKey}
                apiKeyInput={apiKeyInput}
                handleApiKeyChange={handleApiKeyChange}
                clearApiKey={clearApiKey}
            />
        </>
    );
  }

  const formatNumber = (num: number) => {
      if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
      return num;
  };

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden relative selection:bg-rose-200 selection:text-rose-600">
      
      {/* --- GLOBAL LIQUID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-rose-100 via-purple-50 to-transparent rounded-full blur-[100px] animate-pulse" style={{animationDuration: '8s'}}/>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-t from-sky-100 via-cyan-50 to-transparent rounded-full blur-[80px]"/>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-multiply"/>
      </div>

      {/* --- OVERLAYS --- */}
      <SettingsModal 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          showNetaNames={showNetaNames}
          setShowNetaNames={setShowNetaNames}
          hasEnvKey={hasEnvKey}
          hasStoredKey={hasStoredKey}
          apiKeyInput={apiKeyInput}
          handleApiKeyChange={handleApiKeyChange}
          clearApiKey={clearApiKey}
      />
      {engine.showSkillTree && <SkillTreeModal engine={engine} />}
      {engine.isEventOpen && engine.activeEvent && <EventModal engine={engine} showNeta={showNetaNames} />}
      {engine.showScoutModal && <ScoutModal engine={engine} showNeta={showNetaNames} />}
      {engine.showTurnResult && engine.turnResultData && <TurnResultModal data={engine.turnResultData} onFinish={engine.finishTurnResult} />}
      {engine.showGigResult && engine.gigResultData && <GigResultModal data={engine.gigResultData} onClose={engine.closeGigResult} />}
      {engine.isGeneratingSong && <AiLoadingModal />}

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-20 xl:w-64 flex-col items-center xl:items-stretch py-6 px-3 gap-4 shrink-0 z-50 bg-white/60 backdrop-blur-2xl border-r border-white/60 shadow-[2px_0_12px_rgba(0,0,0,0.02)] relative">
          <div className="mb-2 flex flex-col items-center xl:items-start px-2 relative group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[0.8rem] flex items-center justify-center text-white mb-2 shadow-lg shadow-slate-900/20 transform -rotate-3 transition-transform group-hover:rotate-0 group-hover:scale-110">
                  <Star size={20} fill="currentColor" />
              </div>
              <h1 className="hidden xl:block font-black text-slate-900 text-xl tracking-tighter italic">
                  BAND<span className="text-rose-500">SIM</span>
              </h1>
          </div>

          <nav className="flex-1 w-full space-y-2">
              {NAV_ITEMS.map((tab) => (
                  <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`
                          w-full flex items-center gap-3 px-3 py-3 rounded-[1rem] transition-all duration-300 group relative overflow-hidden active:scale-95
                          ${activeTab === tab.id 
                              ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50 ring-1 ring-black/5' 
                              : 'text-slate-400 hover:bg-white/60 hover:text-slate-600'}
                      `}
                  >
                      <div className="relative z-10 flex items-center gap-3">
                        <tab.icon size={20} className={`transition-all duration-300 ${activeTab === tab.id ? 'text-rose-500 fill-rose-50' : 'group-hover:scale-110'}`} strokeWidth={activeTab === tab.id ? 2.5 : 2}/>
                        <span className={`hidden xl:block text-xs font-black tracking-widest uppercase ${activeTab === tab.id ? 'text-slate-900' : ''}`}>{tab.label}</span>
                      </div>
                      {activeTab === tab.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-r-full"/>}
                  </button>
              ))}
          </nav>

          {/* SETTINGS BUTTON (SIDEBAR BOTTOM) */}
          <div className="mt-auto w-full border-t border-slate-200/50 pt-4">
              <button
                  onClick={() => setShowSettings(true)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-[1rem] text-slate-400 hover:bg-white/60 hover:text-slate-900 transition-all duration-300 group relative overflow-hidden active:scale-95"
              >
                  <div className="relative z-10 flex items-center gap-3">
                    <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500"/>
                    <span className="hidden xl:block text-xs font-black tracking-widest uppercase">设置</span>
                  </div>
              </button>
          </div>
      </aside>

      {/* --- MOBILE SETTINGS BUTTON (Top Left) --- */}
      <div className="fixed top-6 left-6 z-[60] pointer-events-auto lg:hidden">
           <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-md hover:shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all active:scale-90 ring-1 ring-black/5"
          >
              <Settings size={18}/>
          </button>
      </div>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
          
          {/* --- TOP RIGHT FLOATING CAPSULE (HUD) --- */}
          <div className="absolute top-6 right-6 z-50 flex items-center pointer-events-none select-none">
              
              {/* Stats Capsule - Widened */}
              <div className="pointer-events-auto bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-full p-1.5 flex items-center gap-2 hover:scale-[1.02] transition-transform duration-300 group ring-1 ring-black/5 px-6">
                  
                  {/* Week Badge */}
                  <div className="flex items-center gap-2 bg-slate-900 rounded-full px-4 py-2 shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]"/>
                      <span className="text-[10px] font-black text-white tracking-widest uppercase whitespace-nowrap">
                          W{engine.gameState.currentWeek}
                      </span>
                  </div>

                  {/* Fans */}
                  <div className="flex items-center gap-1.5 bg-rose-50/50 rounded-full px-4 py-2 border border-rose-100/50 group-hover:bg-rose-50 transition-colors">
                      <Users size={12} className="text-rose-500"/>
                      <span className="text-[10px] font-black text-rose-600 tabular-nums">
                          {formatNumber(engine.gameState.fans)}
                      </span>
                  </div>

                  {/* Money */}
                  <div className="flex items-center gap-1.5 bg-amber-50/50 rounded-full px-4 py-2 border border-amber-100/50 group-hover:bg-amber-50 transition-colors">
                      <Coins size={12} className="text-amber-500"/>
                      <span className="text-[10px] font-black text-amber-600 tabular-nums">
                          ¥{formatNumber(engine.gameState.money)}
                      </span>
                  </div>
              </div>
          </div>

          {/* --- SCROLLABLE CONTENT --- */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide px-4 lg:px-8 pb-32 lg:pb-12 pt-24 lg:pt-24">
            <div className="max-w-6xl mx-auto w-full">
                {activeTab === 'dashboard' && <DashboardTab engine={engine} />}
                {activeTab === 'schedule' && <ScheduleTab engine={engine} />}
                {activeTab === 'members' && <MembersTab engine={engine} showNeta={showNetaNames} />}
                {activeTab === 'songs' && <SongsTab engine={engine} />}
                {activeTab === 'sns' && <SnsTab engine={engine} />}
                {activeTab === 'gigs' && <GigTab engine={engine} />}
            </div>
          </main>

          {/* --- MOBILE BOTTOM NAV (Floating Jelly) --- */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm pointer-events-none">
            <nav className="pointer-events-auto bg-white/80 backdrop-blur-2xl rounded-[2rem] p-1.5 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-white/60 flex justify-between items-center relative ring-1 ring-black/5">
                {NAV_ITEMS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-[1.5rem] transition-all duration-300 relative z-10 active:scale-90
                                ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-600'}
                            `}
                        >
                            <tab.icon 
                                size={20} 
                                strokeWidth={isActive ? 2.5 : 2} 
                                className={`transition-transform duration-300 ${isActive ? '-translate-y-1 scale-110' : ''}`}
                            />
                            {isActive && (
                                <span className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"/>
                            )}
                        </button>
                    );
                })}
                
                {/* Animated Background Pill */}
                <div 
                    className="absolute top-1.5 bottom-1.5 bg-slate-900 rounded-[1.5rem] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] -z-0 shadow-lg shadow-slate-900/20"
                    style={{
                        left: `${(NAV_ITEMS.findIndex(t => t.id === activeTab)) * (100 / NAV_ITEMS.length) + 1}%`,
                        width: `${94 / NAV_ITEMS.length}%`
                    }}
                />
            </nav>
          </div>

      </div>
    </div>
  );
};

export default App;
