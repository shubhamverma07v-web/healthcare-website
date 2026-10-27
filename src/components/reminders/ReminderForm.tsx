import React, { useState, useEffect } from 'react';
import { Pill, Clock, Calendar, AlertCircle, ShieldAlert } from 'lucide-react';
import { ReminderItem } from '../../types';
import { SAMPLE_MEDICINES } from '../../data/medicines';
import { Modal } from '../common/Modal';

export interface ReminderFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit: (data: Omit<ReminderItem, 'id'>) => void;
  initialData?: ReminderItem | null;
  presetMedicineName?: string;
  presetDosage?: string;
  presetInstructions?: string;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  isOpen,
  onClose,
  onCancel,
  onSubmit,
  initialData,
  presetMedicineName,
  presetDosage,
  presetInstructions
}) => {
  const [medicineName, setMedicineName] = useState(
    initialData?.medicineName || presetMedicineName || ''
  );
  const [dosage, setDosage] = useState(
    initialData?.dosage || presetDosage || ''
  );
  const [scheduleTime, setScheduleTime] = useState(
    initialData?.scheduleTime || '08:00 AM'
  );
  const [timeSlot, setTimeSlot] = useState<ReminderItem['timeSlot']>(
    initialData?.timeSlot || 'Morning'
  );
  const [frequency, setFrequency] = useState<ReminderItem['frequency']>(
    initialData?.frequency || 'Daily'
  );
  const [instructions, setInstructions] = useState(
    initialData?.instructions || presetInstructions || ''
  );
  const [startDate, setStartDate] = useState(
    initialData?.startDate || new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setMedicineName(initialData.medicineName);
      setDosage(initialData.dosage);
      setScheduleTime(initialData.scheduleTime);
      setTimeSlot(initialData.timeSlot);
      setFrequency(initialData.frequency);
      setInstructions(initialData.instructions || '');
      setStartDate(initialData.startDate);
      setNotes(initialData.notes || '');
    } else {
      setMedicineName(presetMedicineName || '');
      setDosage(presetDosage || '');
      setScheduleTime('08:00 AM');
      setTimeSlot('Morning');
      setFrequency('Daily');
      setInstructions(presetInstructions || '');
      setStartDate(new Date().toISOString().split('T')[0]);
      setNotes('');
    }
    setErrors({});
  }, [initialData, presetMedicineName, presetDosage, presetInstructions, isOpen]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!medicineName.trim()) {
      errs.medicineName = 'Medicine name is required.';
    }
    if (!dosage.trim()) {
      errs.dosage = 'Dosage amount or form is required (e.g. 500mg, 1 tablet).';
    }
    if (!scheduleTime.trim()) {
      errs.scheduleTime = 'Schedule time is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleDismiss = () => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      medicineName: medicineName.trim(),
      dosage: dosage.trim(),
      scheduleTime: scheduleTime.trim(),
      timeSlot,
      frequency,
      instructions: instructions.trim() || undefined,
      startDate,
      status: initialData ? initialData.status : 'pending',
      notes: notes.trim() || undefined
    });
  };

  const handleSelectSample = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const found = SAMPLE_MEDICINES.find(m => m.id === selectedId);
    if (found) {
      setMedicineName(found.name);
      setDosage(`${found.strength} (${found.form})`);
      setInstructions(found.samplePrescriptionSchedule);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Quick Autofill from Demo Medicines */}
      {!initialData && (
        <div className="p-3 bg-teal-50/60 dark:bg-teal-950/40 rounded-xl border border-teal-200/60 dark:border-teal-800/50">
          <label className="block text-xs font-semibold text-[#0D9488] dark:text-teal-400 mb-1">
            Quick Autofill from Reference Medicines (Optional)
          </label>
          <select
            onChange={handleSelectSample}
            defaultValue=""
            className="w-full text-xs rounded-lg border border-teal-200 dark:border-teal-800 bg-white dark:bg-[#132235] px-2.5 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select a demo medicine to fill fields...</option>
            {SAMPLE_MEDICINES.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.strength}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Medicine Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Medicine Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={medicineName}
          onChange={e => setMedicineName(e.target.value)}
          placeholder="e.g. Glucophage (Metformin)"
          className={`w-full text-sm rounded-xl border px-3.5 py-2.5 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors ${
            errors.medicineName
              ? 'border-red-400 focus:ring-red-400'
              : 'border-slate-200 dark:border-slate-700 focus:ring-[#0D9488]'
          }`}
        />
        {errors.medicineName && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.medicineName}</span>
          </p>
        )}
      </div>

      {/* Dosage & Frequency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Dosage & Form <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={dosage}
            onChange={e => setDosage(e.target.value)}
            placeholder="e.g. 500 mg, 1 tablet"
            className={`w-full text-sm rounded-xl border px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors ${
              errors.dosage
                ? 'border-red-400 focus:ring-red-400'
                : 'border-slate-200 dark:border-slate-700 focus:ring-[#0D9488]'
            }`}
          />
          {errors.dosage && (
            <p className="text-xs text-red-500 mt-1">{errors.dosage}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Frequency
          </label>
          <select
            value={frequency}
            onChange={e => setFrequency(e.target.value as ReminderItem['frequency'])}
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          >
            <option value="Daily">Daily</option>
            <option value="Twice Daily">Twice Daily</option>
            <option value="Three Times Daily">Three Times Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="As Needed">As Needed</option>
          </select>
        </div>
      </div>

      {/* Time Slot & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Day Routine Slot
          </label>
          <select
            value={timeSlot}
            onChange={e => setTimeSlot(e.target.value as ReminderItem['timeSlot'])}
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          >
            <option value="Morning">Morning (e.g. 08:00 AM)</option>
            <option value="Afternoon">Afternoon (e.g. 01:00 PM)</option>
            <option value="Evening">Evening (e.g. 07:00 PM)</option>
            <option value="Night">Night / Bedtime (e.g. 10:00 PM)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Scheduled Time <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={scheduleTime}
            onChange={e => setScheduleTime(e.target.value)}
            placeholder="e.g. 08:30 AM or 20:00"
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          />
          {errors.scheduleTime && (
            <p className="text-xs text-red-500 mt-1">{errors.scheduleTime}</p>
          )}
        </div>
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
        />
      </div>

      {/* Instructions */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Prescribed Doctor Instructions
        </label>
        <input
          type="text"
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          placeholder="e.g. Take with breakfast; do not chew extended-release tab"
          className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
        />
      </div>

      {/* Safety Notice */}
      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <span>
          <strong>Adherence Safety Rule:</strong> CuraGuide reminders are intended to support adherence to your licensed physician's existing prescription. Never double doses or alter your schedule if a previous dose was missed.
        </span>
      </div>

      {/* Form Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handleDismiss}
          className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white shadow-sm transition-colors"
        >
          {initialData ? 'Update Schedule' : 'Save Reminder'}
        </button>
      </div>
    </form>
  );

  // If isOpen is provided as a boolean, wrap inside Modal
  if (typeof isOpen === 'boolean') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleDismiss}
        title={initialData ? 'Edit Medication Reminder' : 'Schedule New Dose Reminder'}
      >
        {formContent}
      </Modal>
    );
  }

  return formContent;
};

export default ReminderForm;
