
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
      return { bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', text: 'text-fuchsia-600', iconBg: 'bg-fuchsia-500', iconColor: 'text-white', shadow: 'shadow-fuchsia-100', ring: 'focus:ring-fuchsia-200' };
    case ScheduleCategory.Creation: 
      return { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', iconBg: 'bg-purple-500', iconColor: 'text-white', shadow: 'shadow-purple-100', ring: 'focus:ring-purple-200' };
    case ScheduleCategory.Promotion: 
      return { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-600', iconBg: 'bg-pink-500', iconColor: 'text-white', shadow: 'shadow-pink-100', ring: 'focus:ring-pink-200' };
    case ScheduleCategory.Band: 
      return { bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-600', iconBg: 'bg-sky-500', iconColor: 'text-white', shadow: 'shadow-sky-100', ring: 'focus:ring-sky-200' };
    case ScheduleCategory.Solo: 
      return { bg: 'bg-slate-50', border: 'border-slate-100', text: 'text-slate-600', iconBg: 'bg-slate-500', iconColor: 'text-white', shadow: 'shadow-slate-100', ring: 'focus:ring-slate-200' };
    case ScheduleCategory.Leisure: 
      return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', iconBg: 'bg-emerald-500', iconColor: 'text-white', shadow: 'shadow-emerald-100', ring: 'focus:ring-emerald-200' };
    case ScheduleCategory.Study: 
      return { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', iconBg: 'bg-indigo-500', iconColor: 'text-white', shadow: 'shadow-indigo-100', ring: 'focus:ring-indigo-200' };
    default: 
      return { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-600', iconBg: 'bg-gray-500', iconColor: 'text-white', shadow: 'shadow-gray-100', ring: 'focus:ring-gray-200' };
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
        group relative flex flex-col p-3.5 rounded-[1.5rem] border transition-all duration-300 w-full h-28 md:h-32 justify-between overflow-hidden text-left
        ${disabled 
          ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' 
          : `bg-white border-slate-100 hover:border-transparent hover:ring-2 hover:${theme.ring} hover:shadow-xl hover:${theme.shadow} hover:-translate-y-1`
        }
      `}
    >
       {/* Background Decoration */}
       {!disabled && (
           <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${theme.iconBg} blur-2xl pointer-events-none`}/>
       )}

       {/* Top Row: Icon + Price/Status */}
       <div className="flex justify-between items-start w-full relative z-10">
           <div className={`
                w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                ${!disabled ? theme.iconBg + ' ' + theme.iconColor : 'bg-slate-200 text-slate-400'}
           `}>
              {disabled ? <Lock size={14}/> : getCategoryIcon(category, 16)}
           </div>
           
           <div className="flex flex-col items-end gap-1">
               {!disabled && cost > 0 && (
                   <span className="bg-slate-50 text-slate-500 border border-slate-100 px-1.5 py-0.5 rounded-md text-[9px] font-black group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors">
                       ¥{cost}
                   </span>
               )}
               {isSpecial && (
                   <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border ${isMaxed ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100'}`}>
                       {count}/{limit}
                   </span>
               )}
           </div>
       </div>
       
       {/* Content */}
       <div className="z-10 relative mt-auto flex flex-col items-start w-full">
          {/* Stat Badge (Moved Top, lighter font) */}
          {primaryStat ? (
            <div className={`text-[9px] font-bold uppercase tracking-wider truncate mb-0.5 transition-colors ${!disabled ? theme.text : 'text-slate-300'}`}>
                {primaryStat}
            </div>
          ) : (
            <div className="h-3.5"></div> 
          )}

          {/* Action Name (Larger) */}
          <span className={`block text-sm md:text-base font-black leading-tight line-clamp-2 transition-colors ${!disabled ? 'text-slate-800 group-hover:text-slate-900' : 'text-slate-400'}`}>
             {action}
          </span>
       </div>
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
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-8">
      
      {/* 1. COMPACT DASHBOARD (Top) - Reduced Height & Padding */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 shrink-0 flex flex-col gap-4">
         
         {/* Row 1: Header & Controls */}
         <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 shrink-0">
                    <Calendar size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 leading-none tracking-tight">Schedule</h3>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Week {engine.gameState.currentWeek} Planning</div>
                </div>
            </div>

            <button 
                onClick={engine.executeTurn} 
                disabled={engine.isProcessing || !isMemberEnough}
                className="px-6 h-12 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95 shadow-lg shadow-slate-200 hover:shadow-rose-200"
            >
                {engine.isProcessing ? <Zap className="animate-spin" size={16}/> : <Play size={16} fill="currentColor"/>}
                <span>{engine.isProcessing ? 'Processing' : 'Start Week'}</span>
            </button>
         </div>

         {/* Row 2: Slots Grid - Significantly reduced height */}
         <div className="grid grid-cols-3 gap-3 md:gap-4">
            {engine.gameState.weeklySchedule.map((action: ScheduleAction | null, i: number) => {
                const category = action ? ACTION_TO_CATEGORY[action] : null;
                const theme = category ? getCategoryTheme(category) : null;
                
                return (
                <div 
                    key={i} 
                    onClick={() => !action && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`
                        relative group rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-2 cursor-pointer overflow-hidden
                        h-20 md:h-28
                        ${action && theme 
                            ? `bg-white ${theme.border} shadow-sm` 
                            : 'bg-slate-50 border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-100'}
                    `}
                >
                    {/* Slot Number */}
                    <div className="absolute top-2 left-2.5 z-20">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            DAY 0{i+1}
                        </span>
                    </div>

                    {action && theme ? (
                        <>
                            {/* Card Content */}
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center shadow-md mb-1.5 relative z-10 transition-transform group-hover:scale-110`}>
                                {getCategoryIcon(category!, 16)} 
                            </div>
                            <div className="font-black text-[10px] md:text-xs text-slate-800 text-center leading-tight relative z-10 w-full px-1 truncate">
                                {action}
                            </div>
                            
                            <button 
                                onClick={(e) => { e.stopPropagation(); engine.setScheduleSlot(i, null); }} 
                                className="absolute top-1.5 right-1.5 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full z-20 transition-colors"
                            >
                                <Trash2 size={12}/>
                            </button>

                            <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} opacity-40 group-hover:opacity-60 transition-opacity`}/>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-all group-hover:scale-105">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-white group-hover:bg-slate-300 transition-colors">
                                <Plus size={16}/>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">Assign</span>
                        </div>
                    )}
                </div>
                );
            })}
         </div>
         
         {!isMemberEnough && (
            <div className="text-[10px] font-bold text-amber-600 flex items-center gap-2 bg-amber-50 px-4 py-3 rounded-2xl border border-amber-100">
                <AlertCircle size={14}/> 
                <span>需要至少 3 名成员才能开始活动。请前往【成员】页面招募更多伙伴。</span>
            </div>
         )}
      </div>

      {/* 2. ACTION LIST (Natural Flow) */}
      <div id="action-drawer" className="flex-1 flex flex-col min-h-0 relative">
          
          {/* Sticky Filters Header - Sleek Pill Design */}
          <div className="sticky top-0 z-30 py-3 bg-[#F8FAFC]/95 backdrop-blur-md -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 mask-linear-fade">
                  <button 
                     onClick={() => setActiveCategory('ALL')}
                     className={`
                        px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border shadow-sm
                        ${activeCategory === 'ALL' 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-slate-200 transform scale-105' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'}
                     `}
                  >
                     All Actions
                  </button>
                  {Object.values(ScheduleCategory).map(cat => {
                      const theme = getCategoryTheme(cat);
                      const isActive = activeCategory === cat;
                      return (
                          <button 
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={`
                                  px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap border shadow-sm
                                  ${isActive 
                                      ? `${theme.iconBg} text-white ${theme.border} shadow-md transform scale-105` 
                                      : `bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700`}
                              `}
                          >
                              {getCategoryIcon(cat, 12)} {cat}
                          </button>
                      );
                  })}
              </div>
          </div>

          {/* Grid Content - Auto Height */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 pb-12 pt-2">
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
  );
};
