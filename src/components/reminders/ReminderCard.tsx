import React from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Edit2,
  Trash2,
  AlertCircle,
  Pill,
  Sun,
  Sunset,
  Moon,
  Sunrise
} from 'lucide-react';
import { ReminderItem, ReminderStatus } from '../../types';

interface ReminderCardProps {
  reminder: ReminderItem;
  onUpdateStatus: (id: string, status: ReminderStatus) => void;
  onEdit: (reminder: ReminderItem) => void;
  onDelete: (reminder: ReminderItem) => void;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onUpdateStatus,
  onEdit,
  onDelete
}) => {
  const getSlotIcon = (slot: string) => {
    switch (slot) {
      case 'Morning':
        return <Sunrise className="w-3.5 h-3.5 text-amber-500" />;
      case 'Afternoon':
        return <Sun className="w-3.5 h-3.5 text-orange-500" />;
      case 'Evening':
        return <Sunset className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Night':
        return <Moon className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-teal-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (reminder.status) {
      case 'taken':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            <span>Taken</span>
          </span>
        );
      case 'skipped':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200/70 dark:border-rose-800">
            <XCircle className="w-3 h-3" />
            <span>Skipped</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-[#132235] border transition-all duration-200 shadow-card hover:shadow-card-hover ${
        reminder.status === 'taken'
          ? 'border-emerald-200/70 dark:border-emerald-900/40'
          : reminder.status === 'skipped'
          ? 'border-rose-200/70 dark:border-rose-900/40'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Main Info */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {getSlotIcon(reminder.timeSlot)}
              <span>{reminder.timeSlot}</span>
            </span>
            <span className="text-xs font-bold text-[#0D9488] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-0.5 rounded-md border border-teal-200/60 dark:border-teal-800/40">
              {reminder.scheduleTime}
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#102A43] dark:text-white flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#0D9488]" />
              <span>{reminder.medicineName}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Dosage: <span className="font-semibold text-slate-800 dark:text-slate-200">{reminder.dosage}</span> • {reminder.frequency}
            </p>
          </div>

          {reminder.instructions && (
            <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
              <span className="font-medium text-slate-700 dark:text-slate-300">Prescribed Instructions:</span>{' '}
              {reminder.instructions}
            </p>
          )}

          {reminder.statusTimestamp && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              Status updated at {reminder.statusTimestamp}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            {reminder.status !== 'taken' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(reminder.id, 'taken')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                title="Mark this dose as taken"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Take</span>
              </button>
            )}

            {reminder.status !== 'skipped' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(reminder.id, 'skipped')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-950/50 dark:hover:text-rose-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Mark this dose as skipped"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Skip</span>
              </button>
            )}

            {reminder.status !== 'pending' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(reminder.id, 'pending')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
                title="Revert to pending status"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden xs:inline">Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              onClick={() => onEdit(reminder)}
              className="p-1.5 rounded-lg hover:text-[#0D9488] hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors"
              title="Edit reminder"
              aria-label="Edit reminder"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(reminder)}
              className="p-1.5 rounded-lg hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Delete reminder"
              aria-label="Delete reminder"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
