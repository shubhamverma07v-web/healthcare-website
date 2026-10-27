import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Clock, FileUp, MapPin, Bot, ShieldCheck } from 'lucide-react';

interface QuickActionsProps {
  onAddReminderClick?: () => void;
  onUploadRecordClick?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddReminderClick,
  onUploadRecordClick
}) => {
  return (
    <div className="bg-white dark:bg-[#132235] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card">
      <h3 className="text-base font-bold text-[#102A43] dark:text-white mb-1">
        Quick Actions
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Direct workflows for routine health and medication operations.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/medicines"
          className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Pill className="w-5 h-5 rotate-45" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Search Medicines
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Brand & Generics</span>
        </Link>

        {onAddReminderClick ? (
          <button
            onClick={onAddReminderClick}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Add Reminder
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Custom Dosage</span>
          </button>
        ) : (
          <Link
            to="/reminders"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Add Reminder
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Schedule Doses</span>
          </Link>
        )}

        {onUploadRecordClick ? (
          <button
            onClick={onUploadRecordClick}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <FileUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Upload Record
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">PDF or Image</span>
          </button>
        ) : (
          <Link
            to="/records"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <FileUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Health Records
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Simulated Vault</span>
          </Link>
        )}

        <Link
          to="/facilities"
          className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Find Facilities
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Nearby Clinics</span>
        </Link>
      </div>
    </div>
  );
};
