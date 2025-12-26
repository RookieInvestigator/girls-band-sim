
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
        group relative flex flex-col p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 w-full h-24 md:h-36 justify-between overflow-hidden text-left shadow-sm
        ${disabled 
          ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed grayscale-[0.5]' 
          : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 active:scale-95'
        }
      `}
    >
       {/* Top Row: Icon + Price/Status */}
       <div className="flex justify-between items-start w-full relative z-10">
           <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${!disabled ? theme.iconBg + ' ' + theme.iconColor : 'bg-slate-200 text-slate-400'}`}>
              {getCategoryIcon(category, 14)}
           </div>
           
           <div className="flex flex-col items-end gap-1">
               {!disabled && cost > 0 && (
                   <span className="bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded text-[9px] font-black group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-colors">
                       ¥{cost}
                   </span>
               )}
               {isSpecial && (
                   <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${isMaxed ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100'}`}>
                       {count}/{limit}
                   </span>
               )}
           </div>
       </div>
       
       {/* Content */}
       <div className="z-10 relative mt-1 flex-1 flex items-end">
          <span className={`text-[10px] md:text-xs lg:text-sm font-black leading-tight line-clamp-2 w-full ${!disabled ? 'text-slate-800 group-hover:text-slate-900' : 'text-slate-400'}`}>
             {action}
          </span>
       </div>

        {/* Stat Badge (Desktop) */}
        {!disabled && primaryStat && (
            <div className="z-10 relative mt-1 hidden lg:block">
                <span className="inline-flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                    {primaryStat}
                </span>
            </div>
        )}

       {/* Decorative Background */}
       {!disabled && (
           <>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}/>
                <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${theme.iconBg} blur-2xl`}/>
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
    <div className="flex flex-col gap-4 animate-in fade-in duration-500 w-full pb-8">
      
      {/* 1. COMPACT DASHBOARD (Top) - Reduced Height & Padding */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4 shrink-0 flex flex-col gap-3">
         
         {/* Row 1: Header & Controls */}
         <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200 shrink-0">
                    <Calendar size={18} />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-900 leading-none tracking-tight">Schedule</h3>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Week {engine.gameState.currentWeek}</div>
                </div>
            </div>

            <button 
                onClick={engine.executeTurn} 
                disabled={engine.isProcessing || !isMemberEnough}
                className="px-6 h-10 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95 shadow-md"
            >
                {engine.isProcessing ? <Zap className="animate-spin" size={14}/> : <Play size={14} fill="currentColor"/>}
                <span>{engine.isProcessing ? 'Processing' : 'Start'}</span>
            </button>
         </div>

         {/* Row 2: Slots Grid - Significantly reduced height */}
         <div className="grid grid-cols-3 gap-2">
            {engine.gameState.weeklySchedule.map((action: ScheduleAction | null, i: number) => {
                const category = action ? ACTION_TO_CATEGORY[action] : null;
                const theme = category ? getCategoryTheme(category) : null;
                
                return (
                <div 
                    key={i} 
                    onClick={() => !action && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`
                        relative group rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center p-1 cursor-pointer overflow-hidden
                        h-16 md:h-24
                        ${action && theme 
                            ? `bg-white ${theme.border}` 
                            : 'bg-slate-50 border-dashed border-slate-200 hover:border-slate-400 hover:bg-white'}
                    `}
                >
                    {/* Slot Number */}
                    <div className="absolute top-1 left-2 z-20">
                        <span className="text-[8px] font-black text-slate-300 uppercase">
                            0{i+1}
                        </span>
                    </div>

                    {action && theme ? (
                        <>
                            {/* Card Content */}
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg ${theme.iconBg} ${theme.iconColor} flex items-center justify-center shadow-sm mb-1 relative z-10 scale-75 md:scale-100 origin-bottom`}>
                                {getCategoryIcon(category!, 14)} 
                            </div>
                            <div className="font-black text-[9px] md:text-[10px] text-slate-800 text-center leading-tight relative z-10 w-full px-1 truncate">
                                {action}
                            </div>
                            
                            <button 
                                onClick={(e) => { e.stopPropagation(); engine.setScheduleSlot(i, null); }} 
                                className="absolute top-1 right-1 p-1 text-slate-300 hover:text-rose-500 rounded-full z-20"
                            >
                                <Trash2 size={12}/>
                            </button>

                            <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} opacity-30`}/>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-all">
                            <Plus size={14} className="text-slate-400 group-hover:text-slate-600"/>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">Select</span>
                        </div>
                    )}
                </div>
                );
            })}
         </div>
         
         {!isMemberEnough && (
            <div className="text-[10px] font-bold text-amber-500 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg justify-center border border-amber-100">
                <AlertCircle size={12}/> 需 3 名成员
            </div>
         )}
      </div>

      {/* 2. ACTION LIST (Natural Flow) */}
      <div id="action-drawer" className="flex-1 flex flex-col min-h-0 relative">
          
          {/* Sticky Filters Header */}
          <div className="sticky top-0 z-30 py-2 bg-[#F8FAFC]/95 backdrop-blur-sm -mx-2 px-2 md:mx-0 md:px-0">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 flex flex-wrap gap-1.5 md:gap-2">
                  <div className="flex items-center gap-2 pr-2 border-r border-slate-100 mr-1 hidden md:flex">
                      <LayoutGrid size={14} className="text-slate-400"/>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter</span>
                  </div>
                  <button 
                     onClick={() => setActiveCategory('ALL')}
                     className={`px-2.5 py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all border ${activeCategory === 'ALL' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
                  >
                     All
                  </button>
                  {Object.values(ScheduleCategory).map(cat => (
                      <button 
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-2.5 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold flex items-center gap-1 transition-all border ${activeCategory === cat ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                      >
                          {getCategoryIcon(cat, 10)} {cat}
                      </button>
                  ))}
              </div>
          </div>

          {/* Grid Content - Auto Height */}
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-8">
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
