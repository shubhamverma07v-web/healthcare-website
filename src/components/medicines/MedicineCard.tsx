import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Bookmark, BookmarkCheck, Clock, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { MedicineRecord } from '../../types';
import { useSavedMedicines } from '../../context/SavedMedicinesContext';

interface MedicineCardProps {
  medicine: MedicineRecord;
  onScheduleReminder?: (medicine: MedicineRecord) => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onScheduleReminder }) => {
  const { isSaved, toggleSave } = useSavedMedicines();
  const saved = isSaved(medicine.id);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Antibiotic':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40';
      case 'Pain Relief':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40';
      case 'Antidiabetic':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40';
      case 'Cardiovascular':
      case 'Antihypertensive':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40';
      case 'Respiratory':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/40';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40';
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-teal-300 dark:hover:border-teal-700/60 transition-all duration-200">
      <div>
        {/* Top bar with category & save action */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(medicine.category)}`}>
              {medicine.category}
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {medicine.form}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(medicine.id, medicine.name);
            }}
            aria-label={saved ? `Remove ${medicine.name} from saved` : `Save ${medicine.name}`}
            className={`p-2 rounded-xl transition-colors ${
              saved
                ? 'bg-teal-50 dark:bg-teal-950/50 text-[#0D9488] dark:text-teal-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Medicine Name & Generic info */}
        <div className="mb-3">
          <Link
            to={`/medicines/${medicine.id}`}
            className="group-hover:text-[#0D9488] transition-colors focus:outline-none"
          >
            <h3 className="font-bold text-base text-[#102A43] dark:text-white line-clamp-1">
              {medicine.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 flex items-center gap-1">
            <span>Generic:</span>
            <span className="text-slate-700 dark:text-slate-300 italic font-normal line-clamp-1">
              {medicine.genericName}
            </span>
          </p>
        </div>

        {/* Strength & General Use snippet */}
        <div className="space-y-2 mb-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-200">Strength:</span>
            <span>{medicine.strength}</span>
            {medicine.prescriptionRequired && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/40">
                Rx Only
              </span>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {medicine.generalUses[0]}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <Link
          to={`/medicines/${medicine.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {onScheduleReminder && (
          <button
            type="button"
            onClick={() => onScheduleReminder(medicine)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Remind</span>
          </button>
        )}
      </div>
    </div>
  );
};
