
import { Music, Star, Zap, Disc, Heart, Sword, TrendingUp, Users, Activity, Sparkles, Trophy } from 'lucide-react';
import { StatBar, SongCard } from './Shared';

export const DashboardTab = ({ engine }: { engine: any }) => (
  <div className="grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Main Stats Panel - Redesigned to be lighter and cleaner */}
    <div className="col-span-12 lg:col-span-8 bg-white text-slate-800 p-8 lg:p-10 rounded-[2.5rem] relative overflow-hidden shadow-sm border border-slate-200">
        
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full justify-between gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <Activity size={12} className="mr-1.5"/> BAND STATUS
                    </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-slate-900 italic pr-2">
                    Create Your<br/><span className="text-pink-500">Masterpiece.</span>
                </h3>
              </div>
              
              <div className="text-right bg-slate-50 p-5 rounded-2xl border border-slate-100 min-w-[140px]">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">武道馆目标</div>
                <div className="text-3xl font-black tracking-tighter text-slate-900">
                    {Math.floor((engine.gameState.fans/100000)*100)}<span className="text-lg text-slate-400 ml-1">%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-pink-500" style={{width: `${Math.min(100, (engine.gameState.fans/100000)*100)}%`}}/>
                </div>
              </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                <Music className="mb-3 text-slate-400 group-hover:text-indigo-500 transition-colors" size={20}/>
                <div className="text-2xl font-black text-slate-800">{engine.gameState.teamStats.technique}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">技巧</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-amber-200 transition-colors group">
                <Star className="mb-3 text-slate-400 group-hover:text-amber-500 transition-colors" size={20}/>
                <div className="text-2xl font-black text-slate-800">{engine.gameState.teamStats.appeal}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">魅力</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-sky-200 transition-colors group">
                <Zap className="mb-3 text-slate-400 group-hover:text-sky-500 transition-colors" size={20}/>
                <div className="text-2xl font-black text-slate-800">{engine.gameState.teamStats.stability}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">稳定</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-5 rounded-2xl shadow-lg shadow-pink-200">
                <Sparkles className="mb-3 text-pink-200" size={20}/>
                <div className="text-2xl font-black text-white">{engine.gameState.teamStats.chemistry || 0}</div>
                <div className="text-[10px] font-bold text-pink-100 uppercase tracking-widest mt-1">默契</div>
              </div>
          </div>
        </div>
    </div>

    {/* Side Panel: Song & Rival */}
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        {/* Latest Song */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col min-h-[220px]">
            <h4 className="font-black text-lg text-slate-900 mb-6 flex items-center gap-3 tracking-tight uppercase">
              <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500"><Disc size={16}/></span>
              最新单曲
            </h4>
            {engine.gameState.songs.length > 0 ? (
              <div className="flex-1 flex flex-col justify-center">
                  <SongCard song={engine.gameState.songs[engine.gameState.songs.length-1]} isLatest={true} />
                  <div className="mt-6 space-y-4">
                    <StatBar label="品质" value={engine.gameState.songs[engine.gameState.songs.length-1].quality} color="bg-amber-400" icon={Star} showPercent={false} />
                    <StatBar label="人气" value={engine.gameState.songs[engine.gameState.songs.length-1].popularity} color="bg-pink-500" icon={Heart} showPercent={false} max={5000} />
                  </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl py-8">
                  <Disc size={40} className="opacity-20 mb-3"/>
                  <span className="text-xs font-black uppercase tracking-widest">暂无作品</span>
              </div>
            )}
        </div>

        {/* Rival Card (Conditionally Rendered) */}
        {engine.gameState.rival.isUnlocked && (
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden flex flex-col group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
                
                <div className="relative z-10 flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                           <Sword size={14}/>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">劲敌乐队</span>
                    </div>
                    {/* Relation Badge */}
                    <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${
                        engine.gameState.rival.relation < 40 ? 'bg-rose-50 text-rose-500 border-rose-100' : 
                        (engine.gameState.rival.relation > 60 ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100')
                    }`}>
                        {engine.gameState.rival.relation < 40 ? '敌对' : (engine.gameState.rival.relation > 60 ? '友好' : '中立')}
                    </div>
                </div>
                
                <div className="relative z-10 text-center mb-6">
                    <h4 className="text-2xl font-black mb-2 text-slate-900 tracking-tight italic pr-1">{engine.gameState.rival.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{engine.gameState.rival.style}</p>
                </div>
                
                <div className="relative z-10 bg-slate-50 rounded-xl p-4 flex justify-between items-center border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">粉丝基数</span>
                    <span className="text-lg font-black text-slate-800">{engine.gameState.rival.fans.toLocaleString()}</span>
                </div>
            </div>
        )}
    </div>
  </div>
);
