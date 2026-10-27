import React from 'react';
import { MedicineCategory, DosageForm } from '../../types';
import { Filter, RotateCcw } from 'lucide-react';

interface MedicineFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedForm: string;
  onSelectForm: (form: string) => void;
  prescriptionFilter: 'all' | 'rx' | 'otc';
  onSelectPrescription: (filter: 'all' | 'rx' | 'otc') => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export const MedicineFilters: React.FC<MedicineFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedForm,
  onSelectForm,
  prescriptionFilter,
  onSelectPrescription,
  onReset,
  hasActiveFilters
}) => {
  const categories: (MedicineCategory | 'All')[] = [
    'All',
    'Antidiabetic',
    'Antibiotic',
    'Pain Relief',
    'Cardiovascular',
    'Antihistamine',
    'Gastrointestinal',
    'Respiratory',
    'Antihypertensive'
  ];

  const forms: (DosageForm | 'All')[] = [
    'All',
    'Oral Tablet',
    'Capsule',
    'Extended Release Tablet',
    'Metered Dose Inhaler'
  ];

  return (
    <div className="bg-white dark:bg-[#132235] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-teal-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Filter Medicine Directory
          </h4>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-semibold hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div>
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Therapeutic Category
        </p>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* Dosage Form */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Dosage Form
          </label>
          <select
            value={selectedForm}
            onChange={e => onSelectForm(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {forms.map(form => (
              <option key={form} value={form}>
                {form === 'All' ? 'All Dosage Forms' : form}
              </option>
            ))}
          </select>
        </div>

        {/* Prescription status */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Regulatory Status
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs text-center font-medium">
            <button
              type="button"
              onClick={() => onSelectPrescription('all')}
              className={`py-1 rounded-lg transition-colors ${
                prescriptionFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => onSelectPrescription('rx')}
              className={`py-1 rounded-lg transition-colors ${
                prescriptionFilter === 'rx'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Rx Only
            </button>
            <button
              type="button"
              onClick={() => onSelectPrescription('otc')}
              className={`py-1 rounded-lg transition-colors ${
                prescriptionFilter === 'otc'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              OTC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
