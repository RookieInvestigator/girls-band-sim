
import { useState, useMemo } from 'react';
import { 
  PenTool, Mic2, Calendar, MessageCircle, Users, Coffee, Play, Zap, Trash2, 
  Ticket, BookOpen, Briefcase, Music2, Lock, Star, AlertCircle, Plus, ChevronRight
} from 'lucide-react';
import { ScheduleAction, ScheduleCategory } from '../types';
import { ACTION_TO_CATEGORY, ACTION_UNLOCKS, SCHEDULE_COSTS } from '../constants';

// Theme Helpers
const getCategoryTheme = (cat: ScheduleCategory) => {
  switch(cat) {
    case ScheduleCategory.Performance: 
      return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', gradient: 'from-amber-100 to-amber-50' };
    case ScheduleCategory.Creation: 
      return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', gradient: 'from-purple-100 to-purple-50' };
    case ScheduleCategory.Promotion: 
      return { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-800', iconBg: 'bg-pink-100', iconColor: 'text-pink-600', gradient: 'from-pink-100 to-pink-50' };
    case ScheduleCategory.Band: 
      return { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', gradient: 'from-sky-100 to-sky-50' };
    case ScheduleCategory.Solo: 
      return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', iconBg: 'bg-white', iconColor: 'text-slate-500', gradient: 'from-slate-100 to-slate-50' };
    case ScheduleCategory.Leisure: 
      return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', gradient: 'from-emerald-100 to-emerald-50' };
    case ScheduleCategory.Study: 
      return { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', gradient: 'from-indigo-100 to-indigo-50' };
    default: 
      return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800', iconBg: 'bg-gray-100', iconColor: 'text-gray-500', gradient: 'from-gray-100 to-gray-50' };
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

// --- COMPONENTS ---

const ActionIconBtn = ({ action, category, unlocked, onClick }: any) => {
  const theme = getCategoryTheme(category);
  const cost = SCHEDULE_COSTS[action as ScheduleAction];
  
  return (
    <button 
      disabled={!unlocked}
      onClick={onClick}
      className={`
        group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 w-full h-auto min-h-[90px] justify-between
        ${unlocked 
          ? 'bg-white border-2 border-slate-100 hover:border-pink-300 hover:shadow-lg hover:-translate-y-1 active:scale-95' 
          : 'bg-slate-50 border-2 border-transparent opacity-50 cursor-not-allowed grayscale'
        }
      `}
    >
       <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-transform group-hover:scale-110 ${unlocked ? theme.iconBg : 'bg-slate-200'} ${unlocked ? theme.iconColor : 'text-slate-400'}`}>
          {getCategoryIcon(category, 20)}
       </div>
       
       <div className="flex flex-col items-center gap-1 w-full">
          <span className={`text-[10px] font-bold text-center leading-tight line-clamp-2 w-full ${unlocked ? 'text-slate-700 group-hover:text-pink-600' : 'text-slate-400'}`}>
             {action}
          </span>
          {unlocked && cost && <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-1.5 rounded">¥{cost}</span>}
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
    <div className="flex flex-col gap-4 h-full animate-in fade-in duration-500 pb-24 lg:pb-0">
      
      {/* 1. PLANNER HEADER */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 shrink-0 relative overflow-hidden">
         {/* Decorative Right Shape avoiding overlap */}
         <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-bl-[4rem] -mr-8 -mt-8 pointer-events-none"/>

         <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-1 max-w-md">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-full uppercase tracking-widest">Planner</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Schedule Management</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                    本周行程安排
                </h3>
                
                {/* Start Button Moved Here */}
                <button 
                    onClick={engine.executeTurn} 
                    disabled={engine.isProcessing || !isMemberEnough}
                    className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 active:scale-95 disabled:bg-slate-300 group w-full md:w-auto justify-center md:justify-start"
                >
                    {engine.isProcessing ? <Zap className="animate-spin" size={16}/> : <Play size={16} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform"/>}
                    {engine.isProcessing ? '执行中...' : '开始本周'}
                </button>
                
                {!isMemberEnough && (
                    <div className="mt-3 text-[10px] font-bold text-amber-500 flex items-center gap-1.5">
                        <AlertCircle size={12}/> 需要至少4名成员才能开始。
                    </div>
                )}
            </div>

            {/* Timeline Slots */}
            <div className="flex-1 grid grid-cols-3 gap-3 md:gap-4 relative z-10">
                {engine.gameState.weeklySchedule.map((action: ScheduleAction | null, i: number) => {
                    const category = action ? ACTION_TO_CATEGORY[action] : null;
                    const theme = category ? getCategoryTheme(category) : null;
                    
                    return (
                    <div key={i} className="relative group h-24 md:h-28 flex flex-col">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                            <span className="inline-block bg-slate-100/90 text-slate-400 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-slate-200/50 backdrop-blur-sm shadow-sm">
                                Day 0{i+1}
                            </span>
                        </div>

                        <div className={`
                            flex-1 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden p-2
                            ${action && theme 
                                ? `${theme.bg} ${theme.border}` 
                                : 'bg-white border-dashed border-slate-200 hover:border-pink-300 hover:bg-pink-50 cursor-pointer'}
                        `}
                        onClick={() => !action && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {action && theme ? (
                                <>
                                    <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-bl ${theme.gradient} opacity-50 rounded-full blur-xl`}/>
                                    <div className={`w-8 h-8 rounded-xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center mb-1 shadow-sm relative z-10 mt-3`}>
                                        {getCategoryIcon(category!, 16)}
                                    </div>
                                    <div className={`font-black text-[10px] ${theme.text} text-center leading-tight relative z-10 line-clamp-2 px-1`}>{action}</div>
                                    
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); engine.setScheduleSlot(i, null); }} 
                                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-20"
                                    >
                                        <Trash2 size={12}/>
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center opacity-30 group-hover:opacity-100 transition-all group-hover:scale-110">
                                    <Plus size={20} className="text-slate-400 group-hover:text-pink-500 mb-1"/>
                                </div>
                            )}
                        </div>
                    </div>
                    );
                })}
            </div>
         </div>
      </div>

      {/* 2. ACTION DRAWER (App Grid) */}
      <div id="action-drawer" className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden min-h-[400px]">
          {/* Tabs */}
          <div className="px-6 pt-4 pb-2 overflow-x-auto scrollbar-hide flex items-center gap-2 border-b border-slate-50 shrink-0 sticky top-0 bg-white z-20">
              <button 
                 onClick={() => setActiveCategory('ALL')}
                 className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${activeCategory === 'ALL' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                 All
              </button>
              {Object.values(ScheduleCategory).map(cat => (
                  <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-2 rounded-full text-[10px] font-bold flex items-center gap-1 whitespace-nowrap transition-all ${activeCategory === cat ? getCategoryTheme(cat).bg + ' ' + getCategoryTheme(cat).text + ' border border-' + getCategoryTheme(cat).text.split('-')[1] + '-200 shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent'}`}
                  >
                      {getCategoryIcon(cat, 12)} {cat}
                  </button>
              ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 pb-20">
                  {currentActions.map(action => (
                      <ActionIconBtn 
                          key={action}
                          action={action}
                          category={ACTION_TO_CATEGORY[action]}
                          unlocked={engine.isActionUnlocked(action)}
                          onClick={() => handleSelectAction(action)}
                      />
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
