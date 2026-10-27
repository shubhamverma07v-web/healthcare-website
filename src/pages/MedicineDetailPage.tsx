import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SAMPLE_MEDICINES } from '../data/medicines';
import { useSavedMedicines } from '../context/SavedMedicinesContext';
import { useReminders } from '../context/RemindersContext';
import { ReminderFormModal } from '../components/reminders/ReminderFormModal';
import {
  Pill,
  Bookmark,
  BookmarkCheck,
  Clock,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  Calendar,
  Building,
  CheckCircle2,
  Share2,
  Printer
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const MedicineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isSaved, toggleSave } = useSavedMedicines();
  const { addReminder } = useReminders();

  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const medicine = SAMPLE_MEDICINES.find(m => m.id === id);

  if (!medicine) {
    return (
      <div className="p-8 text-center bg-white dark:bg-[#132235] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-8">
        <Pill className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-[#102A43] dark:text-white">Medicine Record Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested pharmaceutical record does not exist in the demonstration catalog.
        </p>
        <Link
          to="/medicines"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D9488] text-white text-xs font-semibold rounded-xl"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Medicine Explorer</span>
        </Link>
      </div>
    );
  }

  const saved = isSaved(medicine.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Medicine link copied to clipboard!', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Print Clinical Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white dark:bg-[#132235] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-[#0D9488] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
                {medicine.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {medicine.form}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                  medicine.prescriptionRequired
                    ? 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}
              >
                {medicine.prescriptionRequired ? 'Prescription Required (Rx)' : 'Over-The-Counter (OTC)'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
              {medicine.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Active Salt / Generic: <strong className="text-slate-900 dark:text-white">{medicine.genericName}</strong>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {medicine.manufacturer}
              </span>
              <span>•</span>
              <span>Standard Strength: <strong>{medicine.strength}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2.5 flex-shrink-0">
            <button
              onClick={() => toggleSave(medicine.id, medicine.name)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                saved
                  ? 'bg-teal-50 dark:bg-teal-950 text-[#0D9488] border-teal-300 dark:border-teal-700'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              {saved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
              <span>{saved ? 'Saved in My Meds' : 'Save Medicine'}</span>
            </button>

            <button
              onClick={() => setIsReminderModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Clock className="w-4 h-4" />
              <span>Schedule Reminder</span>
            </button>
          </div>
        </div>

        {/* Demo Data Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Demonstration Medicine Profile:</strong> This profile is compiled for the DevFusion innovation competition from public formulary references. Dosages and administration schedules must strictly follow your physician's personalized prescription.
          </div>
        </div>

        {/* Clinical Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* General Therapeutic Uses */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43] dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Therapeutic Indications & Uses</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {medicine.generalUses.map((use, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Prescribing Schedule Notice */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43] dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Sample Regimen Model</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>{medicine.samplePrescriptionSchedule}</p>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Note: Never adjust schedule or double doses without direct physician consent.
            </p>
          </div>
        </div>

        {/* Warnings & Precautions */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Clinical Warnings & Precautions</span>
          </h3>
          <div className="space-y-2">
            {medicine.warningsAndPrecautions.map((warn, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed flex items-start gap-2.5"
              >
                <span className="font-bold text-rose-600">•</span>
                <span>{warn}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Side Effects */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43] dark:text-white">
            Observed Clinical Side Effects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {medicine.commonSideEffects.map((side, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {side.effect}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    side.frequency === 'Common'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : side.frequency === 'Uncommon'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {side.frequency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Instructions & Reference Source Citation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Storage Instructions</h4>
            <p className="text-slate-500 leading-relaxed">{medicine.storageInstructions}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
              Verified Formulary Reference
            </h4>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{medicine.referenceSource.name}</p>
            <div className="mt-1 flex items-center gap-3 text-slate-400">
              <span>Reviewed: {medicine.referenceSource.lastReviewed}</span>
              <a
                href={medicine.referenceSource.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#0D9488] hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>External Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder modal if user clicks 'Schedule Reminder' */}
      <ReminderFormModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSubmit={addReminder}
        initialData={{
          id: '',
          medicineId: medicine.id,
          medicineName: medicine.name,
          dosage: `${medicine.strength} — 1 ${medicine.form.includes('Tablet') ? 'Tablet' : medicine.form.includes('Inhaler') ? 'Puff' : 'Capsule'}`,
          scheduleTime: '08:00 AM',
          timeSlot: 'Morning',
          frequency: 'Daily',
          instructions: medicine.generalUses[0],
          startDate: new Date().toISOString().split('T')[0],
          status: 'pending'
        }}
      />
    </div>
  );
};
