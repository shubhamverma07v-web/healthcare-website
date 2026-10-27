import React, { useState } from 'react';
import { ReminderItem, ReminderStatus } from '../../types';
import { useReminders } from '../../context/RemindersContext';
import { Check, X, Clock, Sun, Sunset, Moon, Coffee, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScheduleTimelineProps {
  onAddReminderClick?: () => void;
}

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({ onAddReminderClick }) => {
  const { reminders, updateStatus } = useReminders();
  const [slotFilter, setSlotFilter] = useState<'All' | 'Morning' | 'Afternoon' | 'Evening' | 'Night'>('All');

  const filtered = reminders.filter(r => {
    if (slotFilter === 'All') return true;
    return r.timeSlot === slotFilter;
  });

  const getSlotIcon = (slot: string) => {
    switch (slot) {
      case 'Morning':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Afternoon':
        return <Coffee className="w-4 h-4 text-orange-500" />;
      case 'Evening':
        return <Sunset className="w-4 h-4 text-rose-500" />;
      case 'Night':
      default:
        return <Moon className="w-4 h-4 text-indigo-500" />;
    }
  };

  const getStatusBadge = (status: ReminderStatus) => {
    switch (status) {
      case 'taken':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
            <Check className="w-3 h-3" /> Taken
          </span>
        );
      case 'skipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
            <X className="w-3 h-3" /> Skipped
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
            <Clock className="w-3 h-3" /> Due Today
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-[#132235] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-[#102A43] dark:text-white flex items-center gap-2">
            Today's Medicine Schedule
            <span className="text-xs font-normal text-slate-500">
              ({reminders.filter(r => r.status === 'taken').length}/{reminders.length} taken)
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Log adherence timestamps to maintain accurate dosage records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onAddReminderClick && (
            <button
              onClick={onAddReminderClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Dose</span>
            </button>
          )}
          <Link
            to="/reminders"
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 hover:underline px-2"
          >
            Manage All →
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-800 text-xs">
        {(['All', 'Morning', 'Afternoon', 'Evening', 'Night'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSlotFilter(tab)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              slotFilter === tab
                ? 'bg-teal-50 dark:bg-teal-950/70 text-[#0D9488] dark:text-teal-300 font-semibold border border-teal-200/60 dark:border-teal-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Schedule Items List */}
      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No medicine reminders scheduled for this time slot.
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.status === 'taken'
                  ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200/60 dark:border-emerald-900/40'
                  : item.status === 'skipped'
                  ? 'bg-rose-50/20 dark:bg-rose-950/10 border-rose-200/50 dark:border-rose-900/30'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60'
              }`}
            >
              {/* Medicine & Timing Details */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 shadow-sm flex-shrink-0">
                  {getSlotIcon(item.timeSlot)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-[#102A43] dark:text-white">
                      {item.medicineName}
                    </h4>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    <span className="font-semibold text-teal-700 dark:text-teal-300">
                      {item.scheduleTime}
                    </span>{' '}
                    • {item.dosage}
                  </p>
                  {item.instructions && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                      "{item.instructions}"
                    </p>
                  )}
                  {item.statusTimestamp && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                      Completed at {item.statusTimestamp}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {item.status !== 'taken' && (
                  <button
                    onClick={() => updateStatus(item.id, 'taken')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Take</span>
                  </button>
                )}
                {item.status !== 'skipped' && (
                  <button
                    onClick={() => updateStatus(item.id, 'skipped')}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 text-xs font-medium transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Skip</span>
                  </button>
                )}
                {item.status !== 'pending' && (
                  <button
                    onClick={() => updateStatus(item.id, 'pending')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
