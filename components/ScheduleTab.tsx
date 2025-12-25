
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
  
  // Specific Limits Logic
  const limit = SPECIAL_ACTION_LIMITS[action as ScheduleAction] || MAX_SPECIAL_EXECUTIONS;
  const isMaxed = isSpecial && count >= limit;
  
  const disabled = !unlocked || isMaxed;

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`
        group relative flex flex-col p-5 rounded-[2rem] border-2 transition-all duration-300 w-full h-44 justify-between overflow-hidden text-left shadow-sm
        ${disabled 
          ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed grayscale-[0.5]' 
          : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 active:scale-95'
        }
      `}
    >
       {/* Top Row: Icon + Price/Status */}
       <div className="flex justify-between items-start w-full relative z-10">
           <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${!disabled ? theme.iconBg + ' ' + theme.iconColor : 'bg-slate-200 text-slate-400'}`}>
              {getCategoryIcon(category, 18)}
           </div>
           
           <div className="flex flex-col items-end gap-1.5">
               {!disabled && cost > 0 && (
                   <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-black group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-colors">
                       ¥{cost}
                   </span>
               )}
               {isSpecial && (
                   <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${isMaxed ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100'}`}>
                       {count}/{limit}
                   </span>
               )}
           </div>
       </div>
       
       {/* Middle: Content */}
       <div className="z-10 relative mt-3 flex-1">
          <span className={`text-base font-black leading-snug line-clamp-2 w-full ${!disabled ? 'text-slate-800 group-hover:text-slate-900' : 'text-slate-400'}`}>
             {action}
          </span>
       </div>

        {/* Bottom: Stat Badge */}
        {!disabled && primaryStat && (
            <div className="z-10 relative mt-2">
                <span className="inline-flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded-md text-[9px] font-bold text-slate-500 uppercase tracking-wider backdrop-blur-sm border border-slate-200/50">
                    <ArrowRight size={8} className="text-pink-500"/> {primaryStat}
                </span>
            </div>
        )}

       {/* Decorative Background */}
       {!disabled && (
           <>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}/>
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${theme.iconBg} blur-2xl`}/>
           </>
       )}
    </button>
  );
};

export const ScheduleTab = ({ engine }: { engine: any }) => {
  const [activeCategory, setActiveCategory] = useState<ScheduleCategory | 'ALL'>('ALL');
  const memberCount = engine.gameState.members.length;
  const isMemberEnough = memberCount >= 3; // UPDATED: Min 3

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
    <div className="flex flex-col gap-6 h-full animate-in fade-in duration-500 pb-24 lg:pb-0">
      
      {/* 1. PLANNER HEADER & TIMELINE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 shrink-0 relative overflow-hidden flex flex-col md:flex-row gap-8 items-stretch">
         
         {/* Left: Control Panel */}
         <div className="flex-1 flex flex-col justify-between max-w-sm">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-full uppercase tracking-widest">
                        Week {engine.gameState.currentWeek}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Planner</span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">
                    SCHEDULE
                </h3>
                <p className="text-xs font-bold text-slate-400">
                    安排本周的 3 个行动槽位。
                </p>
            </div>
            
            <div className="mt-6 md:mt-0">
                <button 
                    onClick={engine.executeTurn} 
                    disabled={engine.isProcessing || !isMemberEnough}
                    className="w-full bg-slate-900 text-white h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between px-6 active:scale-95 disabled:bg-slate-300 group"
                >
                    <span className="flex items-center gap-2">
                        {engine.isProcessing ? <Zap className="animate-spin" size={16}/> : <Play size={16} fill="currentColor"/>}
                        {engine.isProcessing ? 'Executing...' : 'Start Week'}
                    </span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                {!isMemberEnough && (
                    <div className="mt-3 text-[10px] font-bold text-amber-500 flex items-center gap-1.5 bg-amber-50 px-3 py-2 rounded-xl">
                        <AlertCircle size={12}/> 需要至少3名成员。
                    </div>
                )}
            </div>
         </div>

         {/* Right: Timeline Slots */}
         <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {engine.gameState.weeklySchedule.map((action: ScheduleAction | null, i: number) => {
                const category = action ? ACTION_TO_CATEGORY[action] : null;
                const theme = category ? getCategoryTheme(category) : null;
                
                return (
                <div 
                    key={i} 
                    onClick={() => !action && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`
                        relative group rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden min-h-[140px]
                        ${action && theme 
                            ? `bg-white ${theme.border}` 
                            : 'bg-slate-50 border-dashed border-slate-200 hover:border-slate-400 hover:bg-white'}
                    `}
                >
                    {/* Slot Label */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">
                            0{i+1}
                        </span>
                    </div>

                    {action && theme ? (
                        <>
                            {/* Card Content */}
                            <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center shadow-lg mb-3 relative z-10`}>
                                {getCategoryIcon(category!, 20)}
                            </div>
                            <div className="font-black text-sm text-slate-800 text-center leading-tight relative z-10 px-2 line-clamp-2">
                                {action}
                            </div>
                            
                            {/* Remove Button */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); engine.setScheduleSlot(i, null); }} 
                                className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
                            >
                                <Trash2 size={14}/>
                            </button>

                            {/* Background Splash */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} opacity-50`}/>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-all group-hover:scale-105">
                            <div className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-300 group-hover:border-slate-900 group-hover:text-slate-900">
                                <Plus size={20}/>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900">Select</span>
                        </div>
                    )}
                </div>
                );
            })}
         </div>
      </div>

      {/* 2. ACTION DRAWER */}
      <div id="action-drawer" className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden min-h-[400px] relative">
          {/* Header & Filters */}
          <div className="px-8 py-6 border-b border-slate-50 flex flex-col gap-4 sticky top-0 bg-white/95 backdrop-blur z-20">
              <div className="flex items-center gap-2">
                  <LayoutGrid size={16} className="text-slate-900"/>
                  <h4 className="font-black text-sm text-slate-900 uppercase tracking-widest">Actions</h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                  <button 
                     onClick={() => setActiveCategory('ALL')}
                     className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${activeCategory === 'ALL' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                  >
                     All
                  </button>
                  {Object.values(ScheduleCategory).map(cat => (
                      <button 
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-3 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all border ${activeCategory === cat ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                      >
                          {getCategoryIcon(cat, 12)} {cat}
                      </button>
                  ))}
              </div>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-20">
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
