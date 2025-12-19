
import { useState, useEffect } from 'react';
import { 
  Music, Users, Calendar, MessageCircle, Layout, Disc, Ticket, Star, Mic as MicIcon, Guitar, Zap, PenTool, Coins, Activity, Key, Settings
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

  // --- WELCOME SCREEN (Lighter Theme) ---
  if (!engine.isStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800 relative overflow-hidden font-sans">
        
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
            <p className="text-slate-400 font-bold tracking-[0.4em] uppercase text-xs md:text-sm">通往武道馆之路 // 都市传说</p>
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
                className="group relative overflow-hidden p-6 bg-white border border-slate-200 rounded-3xl hover:border-pink-500 hover:shadow-lg hover:shadow-pink-100 transition-all duration-300 flex flex-col items-center gap-4 active:scale-95"
                style={{ animationDelay: `${500 + i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                  {role === Role.Vocal && <MicIcon size={24} />}
                  {role === Role.Guitar && <Guitar size={24} />}
                  {role === Role.Bass && <Music size={24} />}
                  {role === Role.Drums && <Zap size={24} />}
                </div>
                <span className="block text-sm font-black text-slate-600 group-hover:text-slate-900 uppercase tracking-widest">{role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* API Settings Modal */}
        {showSettings && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-600"/>
                    <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                        <Key size={20} className="text-pink-500"/>
                        API 设置
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                        本游戏使用 Google Gemini API 生成剧情。
                        <br/>
                        如果您未配置环境变量，请输入您的 API Key。
                        <br/>
                        <span className="text-xs text-slate-400 mt-2 block bg-slate-50 p-2 rounded border border-slate-100">注意：Key 仅存储在您的本地浏览器中，不会上传至任何服务器。</span>
                    </p>
                    
                    {!hasEnvKey ? (
                        <div className="space-y-4">
                            <input 
                                type="password" 
                                value={apiKeyInput}
                                onChange={handleApiKeyChange}
                                placeholder="sk-..." 
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-800 outline-none focus:border-pink-500 transition-all text-center tracking-widest placeholder-slate-300"
                            />
                            <div className="flex justify-end gap-3 mt-6">
                                <button 
                                    onClick={() => setShowSettings(false)}
                                    className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                >
                                    取消
                                </button>
                                <button 
                                    onClick={() => setShowSettings(false)}
                                    className="px-6 py-2.5 rounded-xl font-black bg-slate-900 text-white hover:bg-pink-500 shadow-lg hover:shadow-pink-200 transition-all"
                                >
                                    保存设置
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-emerald-700 font-bold text-sm">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <Activity size={16}/>
                            </div>
                            已通过环境变量配置 API Key。
                            <button 
                                onClick={() => setShowSettings(false)}
                                className="ml-auto px-4 py-1.5 bg-white border border-emerald-200 rounded-lg text-emerald-600 hover:bg-emerald-50"
                            >
                                确定
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}

      </div>
    );
  }

  // --- MAIN LAYOUT ---
  const NAV_ITEMS = [
    { id: 'dashboard', label: '主页', icon: Layout },
    { id: 'schedule', label: '日程', icon: Calendar },
    { id: 'gigs', label: '演出', icon: Ticket },
    { id: 'members', label: '成员', icon: Users },
    { id: 'songs', label: '作品', icon: Disc },
    { id: 'sns', label: '动态', icon: MessageCircle }
  ];

  return (
    <div className="h-[100dvh] flex bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-24 xl:w-64 bg-white border-r border-slate-100 flex-col justify-between py-8 z-20 shrink-0 relative">
        <div className="flex flex-col gap-8 px-4 xl:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3 xl:justify-start justify-center">
             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200"><Music size={20} /></div>
             <span className="font-black text-lg tracking-tight text-slate-900 hidden xl:block">BAND SIM</span>
          </div>
          
          {/* Nav */}
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                    flex items-center gap-4 px-3 xl:px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden
                    ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}
                    ${activeTab !== tab.id ? 'xl:justify-start justify-center' : ''}
                `}
              >
                <tab.icon size={22} className={`shrink-0 ${activeTab === tab.id ? 'text-pink-400' : 'group-hover:text-slate-600'}`} />
                <span className={`font-bold text-sm tracking-wide hidden xl:block ${activeTab === tab.id ? 'text-white' : ''}`}>{tab.label}</span>
                {activeTab === tab.id && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-500 rounded-l hidden xl:block"/>}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats Widget */}
        <div className="px-4 xl:px-6 hidden xl:block">
           <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 relative overflow-hidden group hover:border-slate-200 transition-colors">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-2 mb-2 opacity-50">
                    <Activity size={14} className="text-pink-500"/>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">STATUS</span>
                 </div>
                 <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">粉丝数</div>
                    <div className="text-xl font-black text-slate-900">{engine.gameState.fans.toLocaleString()}</div>
                 </div>
                 <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">资金</div>
                    <div className="text-xl font-black text-slate-900">¥{engine.gameState.money.toLocaleString()}</div>
                 </div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="h-16 lg:h-24 px-6 lg:px-10 flex items-center justify-between shrink-0">
           <div>
               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">CURRENT BAND</div>
               <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter truncate max-w-[200px] lg:max-w-none">{engine.gameState.bandName}</h2>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Week</span>
                  <span className="text-2xl font-black text-slate-900 leading-none">第 {engine.gameState.currentWeek} 周</span>
              </div>
              
              {/* Mobile Stats Toggle */}
              <div className="lg:hidden flex flex-col items-end mr-2">
                 <span className="text-xs font-black">¥{engine.gameState.money}</span>
                 <span className="text-[10px] text-slate-400">{engine.gameState.fans} 粉丝</span>
              </div>
           </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:px-10 pb-24 lg:pb-10 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto h-full">
            {activeTab === 'dashboard' && <DashboardTab engine={engine} />}
            {activeTab === 'schedule' && <ScheduleTab engine={engine} />}
            {activeTab === 'gigs' && <GigTab engine={engine} />}
            {activeTab === 'members' && <MembersTab engine={engine} />}
            {activeTab === 'songs' && <SongsTab engine={engine} />}
            {activeTab === 'sns' && <SnsTab engine={engine} />}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-slate-100 fixed bottom-0 w-full z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-2">
           {NAV_ITEMS.map(tab => {
             const isActive = activeTab === tab.id;
             return (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${isActive ? 'text-pink-500' : 'text-slate-300'}`}
               >
                 <tab.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-sm' : ''} />
                 <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-0 scale-0'} transition-all duration-300`}>{tab.label}</span>
               </button>
             )
           })}
        </div>
      </nav>

      {/* --- MODALS --- */}
      {engine.isGeneratingSong && <AiLoadingModal />}
      {engine.showTurnResult && engine.turnResultData && <TurnResultModal data={engine.turnResultData} onFinish={engine.finishTurnResult} />}
      {engine.showGigResult && engine.gigResultData && <GigResultModal data={engine.gigResultData} onClose={engine.closeGigResult} />}
      {engine.showScoutModal && <ScoutModal engine={engine} />}
      {engine.isEventOpen && engine.activeEvent && <EventModal engine={engine} />}
    </div>
  );
};

export default App;
    