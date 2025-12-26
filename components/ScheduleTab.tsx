
import React, { useState, useMemo } from 'react';
import { 
  PenTool, Mic2, Calendar, MessageCircle, Users, Coffee, Play, Zap, Trash2, 
  Ticket, BookOpen, Briefcase, Music2, Lock, Star, AlertCircle, Plus, ChevronRight,
  LayoutGrid, ArrowRight, Sparkles, Heart
} from 'lucide-react';
import { ScheduleAction, ScheduleCategory } from '../types';
import { ACTION_TO_CATEGORY, ACTION_UNLOCKS, SCHEDULE_COSTS, MAX_SPECIAL_EXECUTIONS, SPECIAL_ACTION_LIMITS, ACTION_PRIMARY_STAT } from '../constants';

const getCategoryStyle = (cat: ScheduleCategory) => {
  switch(cat) {
    case ScheduleCategory.Special: 
      return { 
          iconBg: 'bg-fuchsia-50 text-fuchsia-600',
          border: 'border-fuchsia-100'
      };
    case ScheduleCategory.Creation: 
      return { 
          iconBg: 'bg-purple-50 text-purple-600',
          border: 'border-purple-100'
      };
    case ScheduleCategory.Promotion: 
      return { 
          iconBg: 'bg-rose-50 text-rose-600',
          border: 'border-rose-100'
      };
    case ScheduleCategory.Band: 
      return { 
          iconBg: 'bg-blue-50 text-blue-600',
          border: 'border-blue-100'
      };
    case ScheduleCategory.Solo: 
      return { 
          iconBg: 'bg-slate-100 text-slate-600',
          border: 'border-slate-100'
      };
    case ScheduleCategory.Leisure: 
      return { 
          iconBg: 'bg-emerald-50 text-emerald-600',
          border: 'border-emerald-100'
      };
    case ScheduleCategory.Study: 
      return { 
          iconBg: 'bg-amber-50 text-amber-600',
          border: 'border-amber-100'
      };
    default: 
      return { 
          iconBg: 'bg-slate-50 text-slate-400',
          border: 'border-slate-100'
      };
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
  const style = getCategoryStyle(category);
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
        group relative flex flex-col p-4 rounded-2xl transition-all duration-200 w-full h-32 justify-between text-left overflow-hidden bg-white
        ${disabled 
          ? 'opacity-60 cursor-not-allowed border border-slate-100 bg-slate-50' 
          : `border border-slate-200 hover:shadow-md hover:border-slate-300`
        }
      `}
    >
       <div className="flex justify-between items-start w-full relative z-10">
           <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${style.iconBg}`}>
              {getCategoryIcon(category, 16)}
           </div>
           
           <div className="flex flex-col items-end gap-1">
               {!disabled && cost > 0 && (
                   <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-slate-50 text-slate-500 border border-slate-100">
                       ¥{cost}
                   </span>
               )}
               {isSpecial && (
                   <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isMaxed ? 'bg-slate-200 text-slate-500' : 'bg-rose-50 text-rose-600'}`}>
                       {count}/{limit}
                   </span>
               )}
           </div>
       </div>
       
       <div className="mt-1 flex-1 flex flex-col justify-end relative z-10">
          <span className={`text-xs font-black leading-tight line-clamp-2 w-full ${disabled ? 'text-slate-400' : 'text-slate-800'}`}>
             {action}
          </span>
          
          {!disabled && primaryStat && (
            <span className="text-[9px] font-bold uppercase tracking-wider mt-1 truncate text-slate-400">
                {primaryStat}
            </span>
          )}
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
    <div className="flex flex-col gap-6 w-full pb-8 pt-4">
      
      {/* 1. DASHBOARD (Top) */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 shrink-0 flex flex-col gap-6 relative overflow-hidden">
         {/* Row 1: Header & Controls */}
         <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between relative z-10 w-full">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Calendar size={20} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none tracking-tighter italic uppercase">日程安排</h3>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5 bg-slate-50 px-2 py-0.5 rounded-lg inline-block">
                        Week {engine.gameState.currentWeek} Planning
                    </div>
                </div>
            </div>

            <button 
                onClick={engine.executeTurn} 
                disabled={engine.isProcessing || !isMemberEnough}
                className="w-full md:w-auto px-8 h-10 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {engine.isProcessing ? <Zap className="animate-spin" size={16}/> : <Play size={16} fill="currentColor"/>}
                <span>开始本周</span>
            </button>
         </div>

         {/* Row 2: Slots Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {engine.gameState.weeklySchedule.map((action: ScheduleAction | null, i: number) => {
                const category = action ? ACTION_TO_CATEGORY[action] : null;
                const style = category ? getCategoryStyle(category) : null;
                
                return (
                <div 
                    key={i} 
                    onClick={() => !action && document.getElementById('action-drawer')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`
                        relative group rounded-2xl transition-all duration-200 flex flex-col items-center justify-center p-2 cursor-pointer overflow-hidden
                        h-28 border-[2px] bg-white
                        ${action && style 
                            ? `border-transparent shadow-sm ring-1 ring-slate-100` 
                            : 'border-slate-100 border-dashed hover:border-slate-300'}
                    `}
                >
                    <div className="absolute top-3 right-4 z-10">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            SLOT 0{i+1}
                        </span>
                    </div>

                    {action && style ? (
                        <>
                            <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center mb-2 relative z-10`}>
                                {getCategoryIcon(category!, 16)} 
                            </div>
                            <div className="font-black text-xs text-slate-900 text-center leading-tight relative z-10 w-full px-3 truncate">
                                {action}
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); engine.setScheduleSlot(i, null); }} 
                                className="absolute bottom-2 right-2 p-1.5 text-slate-300 hover:text-rose-500 rounded-full z-20 hover:bg-slate-50 transition-colors"
                            >
                                <Trash2 size={12}/>
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Plus size={24} strokeWidth={2}/>
                            <span className="text-[9px] font-black uppercase tracking-widest">Add Action</span>
                        </div>
                    )}
                </div>
                );
            })}
         </div>
         
         {!isMemberEnough && (
            <div className="text-[10px] font-bold text-amber-600 flex items-center gap-2 bg-amber-50 px-4 py-3 rounded-xl justify-center border border-amber-100">
                <AlertCircle size={14}/> 
                <span>需要至少3名成员才能开始活动。</span>
            </div>
         )}
      </div>

      {/* 2. ACTION LIST */}
      <div id="action-drawer" className="flex-1 flex flex-col min-h-0 relative">
          
          <div className="sticky top-0 z-30 py-4 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-slate-200/50 mb-4">
              <div className="flex flex-wrap gap-2 px-1">
                  <button 
                     onClick={() => setActiveCategory('ALL')}
                     className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === 'ALL' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
                  >
                     全部
                  </button>
                  {Object.values(ScheduleCategory).map(cat => (
                      <button 
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-3 py-2 rounded-lg text-[9px] font-bold flex items-center gap-1.5 transition-all ${activeCategory === cat ? 'bg-white text-slate-900 ring-2 ring-slate-900' : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'}`}
                      >
                          {getCategoryIcon(cat, 10)} {cat}
                      </button>
                  ))}
              </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
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
