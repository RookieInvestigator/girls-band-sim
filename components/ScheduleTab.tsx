
import { useState, useMemo } from 'react';
import { 
  PenTool, Mic2, Calendar, MessageCircle, Users, Coffee, Play, Zap, Trash2, 
  Ticket, BookOpen, Briefcase, Music2, Lock, Star, Sparkles, Filter, AlertCircle
} from 'lucide-react';
import { ScheduleAction, ScheduleCategory } from '../types';
import { ACTION_TO_CATEGORY, ACTION_UNLOCKS, SCHEDULE_COSTS } from '../constants';

// UI Helper for modern colors
const getCategoryTheme = (cat: ScheduleCategory) => {
  switch(cat) {
    case ScheduleCategory.Performance: 
      return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' };
    case ScheduleCategory.Creation: 
      return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' };
    case ScheduleCategory.Promotion: 
      return { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-800', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' };
    case ScheduleCategory.Band: 
      return { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', iconBg: 'bg-sky-100', iconColor: 'text-sky-600' };
    case ScheduleCategory.Solo: 
      return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', iconBg: 'bg-white', iconColor: 'text-slate-500' };
    case ScheduleCategory.Leisure: 
      return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' };
    case ScheduleCategory.Study: 
      return { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' };
    default: 
      return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800', iconBg: 'bg-gray-100', iconColor: 'text-gray-500' };
  }
};

const getCategoryIcon = (cat: ScheduleCategory, size = 16) => {
  switch(cat) {
    case ScheduleCategory.Performance: return <Ticket size={size}/>;
    case ScheduleCategory.Creation: return <PenTool size={size}/>;
    case ScheduleCategory.Promotion: return <MessageCircle size={size}/>;
    case ScheduleCategory.Band: return <Music2 size={size}/>;
    case ScheduleCategory.Solo: return <Users size={size}/>;
    case ScheduleCategory.Leisure: return <Coffee size={size}/>;
    case ScheduleCategory.Study: return <BookOpen size={size}/>;
    default: return <Calendar size={size}/>;
  }
};

const ActionButton = ({ action, category, unlocked, onClick, unlockInfo }: any) => {
  const theme = getCategoryTheme(category);
  const cost = SCHEDULE_COSTS[action as ScheduleAction];
  
  if (category === ScheduleCategory.Performance) {
    return (
      <button 
        disabled={!unlocked}
        onClick={onClick}
        className={`w-full relative group transition-all duration-300 ${!unlocked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:-translate-y-1'}`}
      >
        <div className={`relative overflow-hidden rounded-2xl border-2 ${unlocked ? theme.border : 'border-slate-200'} ${unlocked ? theme.bg : 'bg-slate-50'} p-4 flex items-center gap-4 shadow-sm group-hover:shadow-md`}>
           <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBg} ${theme.iconColor}`}>
              <Star fill="currentColor" size={20}/>
           </div>
           <div className="text-left min-w-0 flex-1">
              <div className="flex justify-between items-center">
                 <div className={`font-black text-sm ${theme.text} uppercase tracking-wide truncate`}>{action}</div>
                 {cost && <span className="text-[10px] font-bold text-slate-500 bg-white/50 px-2 py-1 rounded-md">¥{cost}</span>}
              </div>
              <div className="text-[10px] font-bold text-slate-400 mt-1 truncate uppercase tracking-wider">
                {unlocked ? '特殊事件' : `需: ${unlockInfo?.fans || 0} 粉丝`}
              </div>
           </div>
        </div>
      </button>
    );
  }

  return (
    <button 
      disabled={!unlocked}
      onClick={onClick}
      className={`relative p-4 rounded-2xl border text-left transition-all duration-200 group flex items-center gap-3 h-[64px]
        ${unlocked 
          ? `bg-white border-slate-100 hover:border-pink-300 hover:shadow-md hover:bg-slate-50` 
          : 'bg-slate-50 border-transparent opacity-40 cursor-not-allowed'
        }`}
    >
       <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${unlocked ? theme.iconBg : 'bg-slate-200'} ${unlocked ? theme.iconColor : 'text-slate-400'}`}>
          {getCategoryIcon(category, 16)}
       </div>
       <div className="min-w-0 flex-1">
          <div className="flex justify-between items-start">
              <div className={`text-xs font-bold leading-tight truncate ${unlocked ? 'text-slate-700' : 'text-slate-400'}`}>
                 {action}
              </div>
              {cost && unlocked && <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded ml-1">¥{cost}</span>}
          </div>
          {!unlocked && <div className="text-[9px] text-slate-400 flex items-center gap-1 mt-1 font-bold uppercase tracking-wider"><Lock size={8}/> 未解锁</div>}
       </div>
    </button>
  );
};

export const ScheduleTab = ({ engine }: { engine: any }) => {
  const [activeCategory, setActiveCategory] = useState<ScheduleCategory | 'ALL'>('ALL');
  const memberCount = engine.gameState.members.length;
  const isMemberEnough = memberCount > 3;

  const categorizedActions = useMemo(() => {
    const grouped: Record<string, ScheduleAction[]> = {};
    Object.values(ScheduleAction).forEach(action => {
      const cat = ACTION_TO_CATEGORY[action];
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(action);
    });
    return grouped;
  }, []);

  const handleSelectAction = (action: ScheduleAction) => {
    const emptyIndex = engine.gameState.weeklySchedule.indexOf(null);
    if (emptyIndex !== -1) engine.setScheduleSlot(emptyIndex, action);
  };

  const currentActions = activeCategory === 'ALL' 
    ? Object.values(ScheduleAction) 
    : categorizedActions[activeCategory] || [];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 lg:h-full h-auto">
      
      {/* TOP: Timeline */}
      <div className="bg-white p-6 lg:p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50 shrink-0">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
               <div className="p-2 bg-pink-100 text-pink-500 rounded-xl"><Calendar size={20}/></div>
               本周日程 
               <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full ml-2 uppercase tracking-widest">Week {engine.gameState.currentWeek}</span>
            </h3>
            
            <div className="flex flex-col items-end gap-1 w-full md:w-auto">
                <button 
                    onClick={engine.executeTurn} 
                    disabled={engine.isProcessing || !isMemberEnough}
                    className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-300"
                >
                    {engine.isProcessing ? <Zap className="animate-spin" size={14}/> : <Play size={14} fill="currentColor"/>}
                    {engine.isProcessing ? '执行中...' : '开始本周'}
                </button>
                {!isMemberEnough && (
                    <div className="text-[10px] font-bold text-amber-500 flex items-center gap-1 animate-pulse uppercase tracking-wider">
                        <AlertCircle size={10}/> 成员不足 ({memberCount}/4)
                    </div>
                )}
            </div>
         </div>

         {/* Timeline Slots - Super Compact (h-24) */}
         <div className="grid grid-cols-3 gap-3 md:gap-4 h-24">
            {engine.gameState.weeklySchedule.map((action: ScheduleAction | null, i: number) => {
                const category = action ? ACTION_TO_CATEGORY[action] : null;
                const theme = category ? getCategoryTheme(category) : null;
                
                return (
                  <div key={i} className={`relative h-full rounded-[1.5rem] border-2 transition-all duration-300 group flex flex-col items-center justify-center
                      ${action && theme 
                          ? `${theme.bg} ${theme.border}` 
                          : 'bg-slate-50 border-dashed border-slate-200 hover:border-pink-300 hover:bg-white'
                      }`}
                  >
                      <div className="absolute top-2 left-3">
                          <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${action ? theme?.text + ' opacity-60' : 'text-slate-300'}`}>
                              第 {i+1} 天
                          </span>
                      </div>

                      {action && theme ? (
                          <>
                              <div className={`w-8 h-8 rounded-lg ${theme.iconBg} ${theme.iconColor} flex items-center justify-center mb-1 shadow-sm`}>
                                  {getCategoryIcon(category!, 16)}
                              </div>
                              <div className={`font-bold text-[10px] ${theme.text} text-center leading-tight px-2 line-clamp-1`}>{action}</div>
                              {SCHEDULE_COSTS[action] && <div className="mt-0.5 text-[8px] font-bold text-slate-500 bg-white/40 px-1.5 rounded-full">¥{SCHEDULE_COSTS[action]}</div>}
                              
                              <button 
                                  onClick={() => engine.setScheduleSlot(i, null)} 
                                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-pink-500 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                              >
                                  <Trash2 size={12}/>
                              </button>
                          </>
                      ) : (
                          <div className="flex flex-col items-center justify-center opacity-30">
                              <div className="w-6 h-6 rounded-full border-2 border-slate-400 flex items-center justify-center mb-1">
                                  <span className="font-black text-slate-400 text-sm">+</span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">空闲</span>
                          </div>
                      )}
                  </div>
                );
            })}
         </div>
      </div>

      {/* BOTTOM: Action Drawer */}
      <div className="lg:flex-1 bg-white p-6 lg:p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col lg:min-h-0 min-h-[500px]">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide mb-4 pb-2 border-b border-slate-50 shrink-0">
              <button 
                 onClick={() => setActiveCategory('ALL')}
                 className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${activeCategory === 'ALL' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                 全部
              </button>
              {Object.values(ScheduleCategory).map(cat => (
                  <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap transition-all ${activeCategory === cat ? getCategoryTheme(cat).bg + ' ' + getCategoryTheme(cat).text + ' border border-' + getCategoryTheme(cat).text.split('-')[1] + '-200 shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent'}`}
                  >
                      {getCategoryIcon(cat, 12)} {cat}
                  </button>
              ))}
          </div>

          <div className="lg:flex-1 lg:overflow-y-auto scrollbar-hide lg:min-h-0 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {currentActions.map(action => (
                      <ActionButton 
                          key={action}
                          action={action}
                          category={ACTION_TO_CATEGORY[action]}
                          unlocked={engine.isActionUnlocked(action)}
                          unlockInfo={ACTION_UNLOCKS[action]}
                          onClick={() => handleSelectAction(action)}
                      />
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
