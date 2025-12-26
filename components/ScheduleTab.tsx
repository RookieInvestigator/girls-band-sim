
import React, { useState, useMemo } from 'react';
import { 
  PenTool, Mic2, Calendar, MessageCircle, Users, Coffee, Play, Zap, Trash2, 
  Ticket, BookOpen, Briefcase, Music2, Lock, Star, AlertCircle, Plus, ChevronRight,
  LayoutGrid, ArrowRight, Sparkles, Heart
} from 'lucide-react';
import { ScheduleAction, ScheduleCategory } from '../types';
import { ACTION_TO_CATEGORY, ACTION_UNLOCKS, SCHEDULE_COSTS, MAX_SPECIAL_EXECUTIONS, SPECIAL_ACTION_LIMITS, ACTION_PRIMARY_STAT } from '../constants';

// Clean Theme Helpers
const getCategoryTheme = (cat: ScheduleCategory) => {
  switch(cat) {
    case ScheduleCategory.Special: 
      return { bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', text: 'text-fuchsia-700', iconBg: 'bg-gradient-to-br from-fuchsia-500 to-purple-600', iconColor: 'text-white' };
    case ScheduleCategory.Creation: 
      return { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700', iconBg: 'bg-purple-500', iconColor: 'text-white' };
    case ScheduleCategory.Promotion: 
      return { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-700', iconBg: 'bg-pink-500', iconColor: 'text-white' };
    case ScheduleCategory.Band: 
      return { bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-700', iconBg: 'bg-sky-500', iconColor: 'text-white' };
    case ScheduleCategory.Solo: 
      return { bg: 'bg-slate-50', border: 'border-slate-100', text: 'text-slate-700', iconBg: 'bg-slate-500', iconColor: 'text-white' };
    case ScheduleCategory.Leisure: 
      return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', iconBg: 'bg-emerald-500', iconColor: 'text-white' };
    case ScheduleCategory.Study: 
      return { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700', iconBg: 'bg-indigo-500', iconColor: 'text-white' };
    default: 
      return { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-700', iconBg: 'bg-gray-500', iconColor: 'text-white' };
  }
};

const getCategoryIcon = (cat: ScheduleCategory, size = 16) => {
  switch(cat) {
    case ScheduleCategory.Special: return <Sparkles size={size}/>;
    case ScheduleCategory.Creation: return <PenTool size={size}/>;
    case ScheduleCategory.Promotion: return <MessageCircle size={size}/>;
    case ScheduleCategory.Band: return <Music2 size={size}/>;
    case ScheduleCategory.Solo: return <Users size={size}/>;
    case ScheduleCategory.Leisure: return <Coffee size={size}/>;
    case ScheduleCategory.Study: return <BookOpen size={size}/>;
    default: return <Calendar size={size}/>;
  }
};

const ActionCard = ({ action, category, unlocked, onClick, count = 0 }: any) => {
  const theme = getCategoryTheme(category);
  const cost = SCHEDULE_COSTS[action as ScheduleAction] || 0;
  const isSpecial = category === ScheduleCategory.Special;
  const primaryStat = ACTION_PRIMARY_STAT[action as ScheduleAction];
  
  const limit = SPECIAL_ACTION_LIMITS[action as ScheduleAction] || MAX_SPECIAL_EXECUTIONS;
  const isMaxed = isSpecial && count >= limit;
  
  const disabled = !unlocked || isMaxed;

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`
        group relative flex flex-col p-3 md:p-5 rounded-2xl md:rounded-[2rem] border-2 transition-all duration-300 w-full h-28 md:h-44 justify-between overflow-hidden text-left shadow-sm
        ${disabled 
          ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed grayscale-[0.5]' 
          : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 active:scale-95'
        }
      `}
    >
       {/* Top Row: Icon + Price/Status */}
       <div className="flex justify-between items-start w-full relative z-10">
           <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${!disabled ? theme.iconBg + ' ' + theme.iconColor : 'bg-slate-200 text-slate-400'}`}>
              {getCategoryIcon(category, 16)}
           </div>
           
           <div className="flex flex-col items-end gap-1">
               {!disabled && cost > 0 && (
                   <span className="bg-slate-100 text-slate-600 border border-slate-200 px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-lg text-[9px] md:text-[11px] font-black group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-colors">
                       ¥{cost}
                   </span>
               )}
               {isSpecial && (
                   <span className={`text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-lg border ${isMaxed ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100'}`}>
                       {count}/{limit}
                   </span>
               )}
           </div>
       </div>
       
       {/* Middle: Content */}
       <div className="z-10 relative mt-1 md:mt-2 flex-1 flex items-end">
          <span className={`text-[10px] md:text-base font-black leading-tight md:leading-snug line-clamp-2 w-full ${!disabled ? 'text-slate-800 group-hover:text-slate-900' : 'text-slate-400'}`}>
             {action}
          </span>
       </div>

        {/* Bottom: Stat Badge (Desktop only) */}
        {!disabled && primaryStat && (
            <div className="z-10 relative mt-2 hidden md:block">
                <span className="inline-flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded-md text-[9px] font-bold text-slate-500 uppercase tracking-wider backdrop-blur-sm border border-slate-200/50">
                    <ArrowRight size={8} className="text-pink-500"/> {primaryStat}
                </span>
            </div>
        )}

       {/* Decorative Background */}
       {!disabled && (
           <>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}/>
                <div className={`absolute -right-4 -bottom-4 w-20 h-20 md:w-24 md:h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${theme.iconBg} blur-2xl`}/>
           </>
       )}
    </button>
  );
};

export const ScheduleTab = ({ engine }: { engine: any }) => {
  const [activeCategory, setActiveCategory] = useState<ScheduleCategory | 'ALL'>('ALL');
  const memberCount = engine.gameState.members.length;
  const isMemberEnough = memberCount >= 3; 

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
    <div className="flex flex-col gap-4 h-[calc(100dvh-140px)] lg:h-full animate-in fade-in duration-500 pb-0 lg:pb-0">
      
      {/* 1. COMPACT DASHBOARD (Top) */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 shrink-0 flex flex-col gap-4">
         
         {/* Row 1: Status & Start Button */}
         <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current</span>
                    <span className="bg-rose-50 text-rose-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Week {engine.gameState.currentWeek}
                    </span>
                </div>
                <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                    Schedule
                </h3>
            </div>

            <button 
                onClick={engine.executeTurn} 
                disabled={engine.isProcessing || !isMemberEnough}
                className="flex-1 max-w-[180px] md:max-w-[240px] bg-slate-900 text-white h-12 rounded-xl md:rounded-2xl font-black text-xs uppercase tracking-[0.1em] hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-300"
            >
                {engine.isProcessing ? <Zap className="animate-spin" size={16}/> : <Play size={16} fill="currentColor"/>}
                <span>{engine.isProcessing ? 'Processing...' : 'Start Week'}</span>
            </button>
         </div>

         {/* Row 2: Slots Grid */}
         <div className="grid grid-cols-3 gap-2 md:gap-4">
            {engine.gameState.weeklySchedule.map((action: ScheduleAction | null, i: number) => {
                const category = action ? ACTION_TO_CATEGORY[action] : null;
                const theme = category ? getCategoryTheme(category) : null;
                
                return (
                <div 
                    key={i} 
                    onClick={() => !action && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`
                        relative group rounded-xl md:rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center p-2 cursor-pointer overflow-hidden
                        h-20 md:h-32
                        ${action && theme 
                            ? `bg-white ${theme.border}` 
                            : 'bg-slate-50 border-dashed border-slate-200 hover:border-slate-400 hover:bg-white'}
                    `}
                >
                    {/* Slot Number */}
                    <div className="absolute top-1 left-2 md:top-2 md:left-3 z-20">
                        <span className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase">
                            0{i+1}
                        </span>
                    </div>

                    {action && theme ? (
                        <>
                            {/* Card Content */}
                            <div className={`w-6 h-6 md:w-10 md:h-10 rounded-lg md:rounded-xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center shadow-md mb-1 md:mb-2 relative z-10`}>
                                {getCategoryIcon(category!, 14)} 
                            </div>
                            <div className="font-black text-[9px] md:text-xs text-slate-800 text-center leading-tight relative z-10 w-full px-1 truncate">
                                {action}
                            </div>
                            
                            <button 
                                onClick={(e) => { e.stopPropagation(); engine.setScheduleSlot(i, null); }} 
                                className="absolute top-1 right-1 p-1 text-slate-300 hover:text-rose-500 rounded-full z-20"
                            >
                                <Trash2 size={12}/>
                            </button>

                            <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} opacity-50`}/>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-all">
                            <Plus size={16} className="text-slate-400 group-hover:text-slate-600"/>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">Select</span>
                        </div>
                    )}
                </div>
                );
            })}
         </div>
         
         {!isMemberEnough && (
            <div className="text-[10px] font-bold text-amber-500 flex items-center gap-1.5 bg-amber-50 px-3 py-2 rounded-lg justify-center border border-amber-100">
                <AlertCircle size={12}/> 需要至少 3 名成员才能开始活动
            </div>
         )}
      </div>

      {/* 2. ACTION DRAWER (Scrollable Area) */}
      <div id="action-drawer" className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden min-h-0 relative">
          {/* Filters Sticky Header */}
          <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-50 flex flex-col gap-2 sticky top-0 bg-white/95 backdrop-blur z-20 shrink-0">
              <div className="flex items-center gap-2">
                  <LayoutGrid size={14} className="text-slate-900"/>
                  <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest">Select Action</h4>
              </div>
              
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                  <button 
                     onClick={() => setActiveCategory('ALL')}
                     className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all border ${activeCategory === 'ALL' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
                  >
                     All
                  </button>
                  {Object.values(ScheduleCategory).map(cat => (
                      <button 
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold flex items-center gap-1 transition-all border ${activeCategory === cat ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-white text-slate-400 border-slate-100'}`}
                      >
                          {getCategoryIcon(cat, 10)} {cat}
                      </button>
                  ))}
              </div>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-slate-50">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 pb-20">
                  {currentActions.map(action => (
                      <ActionCard 
                          key={action}
                          action={action}
                          category={ACTION_TO_CATEGORY[action]}
                          unlocked={engine.isActionUnlocked(action)}
                          count={engine.gameState.actionCounts[action]}
                          onClick={() => handleSelectAction(action)}
                      />
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
