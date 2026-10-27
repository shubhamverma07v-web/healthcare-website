import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  Pill,
  Sparkles,
  SlidersHorizontal,
  BookmarkCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MedicineCard } from '../components/medicines/MedicineCard';
import { ReminderForm } from '../components/reminders/ReminderForm';
import { Modal } from '../components/common/Modal';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { SAMPLE_MEDICINES } from '../data/medicines';
import { MedicineRecord, MedicineCategory, DosageForm } from '../types';
import { useReminders } from '../context/RemindersContext';

export const MedicinesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedForm, setSelectedForm] = useState<string>('All');
  const [rxOnlyFilter, setRxOnlyFilter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reminder scheduling modal for a chosen medicine
  const [scheduleMedicine, setScheduleMedicine] = useState<MedicineRecord | null>(null);
  const { addReminder } = useReminders();

  // Debounce search input by 250ms
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsLoading(false);
      // Sync URL
      if (searchQuery.trim()) {
        setSearchParams({ q: searchQuery.trim() });
      } else {
        setSearchParams({});
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [searchQuery, setSearchParams]);

  // Distinct categories and dosage forms
  const categories: string[] = ['All', ...Array.from(new Set(SAMPLE_MEDICINES.map(m => m.category)))];
  const forms: string[] = ['All', ...Array.from(new Set(SAMPLE_MEDICINES.map(m => m.form)))];

  // Filtered medicines
  const filteredMedicines = useMemo(() => {
    return SAMPLE_MEDICINES.filter(med => {
      const q = debouncedQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        med.name.toLowerCase().includes(q) ||
        med.genericName.toLowerCase().includes(q) ||
        med.generalUses.some(u => u.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'All' || med.category === selectedCategory;

      const matchesForm = selectedForm === 'All' || med.form === selectedForm;

      const matchesRx = !rxOnlyFilter || med.prescriptionRequired;

      return matchesSearch && matchesCategory && matchesForm && matchesRx;
    });
  }, [debouncedQuery, selectedCategory, selectedForm, rxOnlyFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSelectedCategory('All');
    setSelectedForm('All');
    setRxOnlyFilter(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedForm !== 'All' ||
    rxOnlyFilter;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
              Medicine Explorer
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
              {SAMPLE_MEDICINES.length} Documented Drugs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse verified pharmaceutical formularies, active chemical compositions, and safety monographs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
          <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Demo educational reference data</span>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
        {/* Search bar with clear button */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by brand name (e.g. Glucophage, Lipitor) or generic chemical (e.g. Metformin, Atorvastatin)..."
            className="w-full text-xs sm:text-sm pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0E1A29] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold">Category:</span>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0E1A29] px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Dosage Form Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold">Form:</span>
              <select
                value={selectedForm}
                onChange={e => setSelectedForm(e.target.value)}
                className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0E1A29] px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              >
                {forms.map(f => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Rx Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rxOnlyFilter}
                onChange={e => setRxOnlyFilter(e.target.checked)}
                className="rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] w-4 h-4"
              />
              <span>Rx Only Only</span>
            </label>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold text-[#0D9488] hover:underline inline-flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong>{filteredMedicines.length}</strong> of {SAMPLE_MEDICINES.length} medicines
        </span>
        {debouncedQuery && (
          <span>
            Query match for: <em>"{debouncedQuery}"</em>
          </span>
        )}
      </div>

      {/* Grid or States */}
      {isLoading ? (
        <LoadingState message="Searching verified pharmaceutical catalog..." />
      ) : filteredMedicines.length === 0 ? (
        <EmptyState
          title="No Medicines Match Your Filter"
          description="We couldn't find any reference records matching your current keywords or selected categories. Try clearing filters or checking spelling."
          actionLabel="Clear Filters"
          onAction={handleClearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map(med => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onScheduleReminder={m => setScheduleMedicine(m)}
            />
          ))}
        </div>
      )}

      {/* Schedule Reminder Modal from Card */}
      <Modal
        isOpen={!!scheduleMedicine}
        onClose={() => setScheduleMedicine(null)}
        title={`Schedule Reminder: ${scheduleMedicine?.name}`}
      >
        {scheduleMedicine && (
          <ReminderForm
            presetMedicineName={scheduleMedicine.name}
            presetDosage={`${scheduleMedicine.strength} (${scheduleMedicine.form})`}
            presetInstructions={scheduleMedicine.samplePrescriptionSchedule}
            onSubmit={data => {
              addReminder(data);
              setScheduleMedicine(null);
            }}
            onCancel={() => setScheduleMedicine(null)}
          />
        )}
      </Modal>
    </div>
  );
};
