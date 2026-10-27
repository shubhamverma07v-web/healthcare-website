import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { ReminderItem } from '../../types';
import { SAMPLE_MEDICINES } from '../../data/medicines';

interface ReminderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ReminderItem, 'id'>) => void;
  initialData?: ReminderItem | null;
}

export const ReminderFormModal: React.FC<ReminderFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('08:00 AM');
  const [timeSlot, setTimeSlot] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Night'>('Morning');
  const [frequency, setFrequency] = useState<'Daily' | 'Twice Daily' | 'Three Times Daily' | 'Weekly' | 'As Needed'>('Daily');
  const [instructions, setInstructions] = useState('');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');
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
      setMedicineName('');
      setDosage('');
      setScheduleTime('08:00 AM');
      setTimeSlot('Morning');
      setFrequency('Daily');
      setInstructions('');
      setStartDate(new Date().toISOString().split('T')[0]);
      setNotes('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSelectSampleMedicine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const medId = e.target.value;
    if (!medId) return;
    const found = SAMPLE_MEDICINES.find(m => m.id === medId);
    if (found) {
      setMedicineName(found.name);
      setDosage(`${found.strength} — 1 ${found.form.includes('Tablet') ? 'Tablet' : found.form.includes('Inhaler') ? 'Puff' : 'Capsule'}`);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!medicineName.trim()) newErrors.medicineName = 'Medicine name is required';
    if (!dosage.trim()) newErrors.dosage = 'Dosage instruction is required (e.g., 500mg - 1 Tablet)';
    if (!scheduleTime.trim()) newErrors.scheduleTime = 'Schedule time is required';
    if (!startDate.trim()) newErrors.startDate = 'Start date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Medicine Reminder' : 'Add Medicine Schedule Reminder'}
      subtitle="Organize doses according to your doctor's exact prescription schedule."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick select from demo library */}
        {!initialData && (
          <div className="p-3 bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800 rounded-xl">
            <label className="block text-xs font-semibold text-teal-900 dark:text-teal-200 mb-1">
              Quick Autofill from Demo Medicines:
            </label>
            <select
              onChange={handleSelectSampleMedicine}
              className="w-full text-xs p-2 bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">-- Choose a sample medicine or type custom below --</option>
              {SAMPLE_MEDICINES.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.strength})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Medicine Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Medicine Name *
          </label>
          <input
            type="text"
            value={medicineName}
            onChange={e => setMedicineName(e.target.value)}
            placeholder="e.g. Glucophage (Metformin)"
            className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.medicineName && (
            <p className="mt-1 text-xs text-rose-600">{errors.medicineName}</p>
          )}
        </div>

        {/* Dosage */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Dosage Description *
          </label>
          <input
            type="text"
            value={dosage}
            onChange={e => setDosage(e.target.value)}
            placeholder="e.g. 500 mg — 1 Tablet with meals"
            className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.dosage && (
            <p className="mt-1 text-xs text-rose-600">{errors.dosage}</p>
          )}
        </div>

        {/* Time and Time Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time (e.g. 08:00 AM) *
            </label>
            <input
              type="text"
              value={scheduleTime}
              onChange={e => setScheduleTime(e.target.value)}
              placeholder="08:00 AM"
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.scheduleTime && (
              <p className="mt-1 text-xs text-rose-600">{errors.scheduleTime}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time Slot
            </label>
            <select
              value={timeSlot}
              onChange={e => setTimeSlot(e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Morning">Morning (Breakfast / AM)</option>
              <option value="Afternoon">Afternoon (Lunch / Midday)</option>
              <option value="Evening">Evening (Dinner / PM)</option>
              <option value="Night">Night (Bedtime)</option>
            </select>
          </div>
        </div>

        {/* Frequency & Start Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Frequency
            </label>
            <select
              value={frequency}
              onChange={e => setFrequency(e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Daily">Daily</option>
              <option value="Twice Daily">Twice Daily</option>
              <option value="Three Times Daily">Three Times Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="As Needed">As Needed (PRN)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.startDate && (
              <p className="mt-1 text-xs text-rose-600">{errors.startDate}</p>
            )}
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Prescription Instructions (Optional)
          </label>
          <input
            type="text"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            placeholder="e.g. Take with a full glass of water, do not crush tablet"
            className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Doctor / Regimen Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Prescribed by Dr. Elena Vance (Apex Heart Clinic)"
            className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Submission buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-semibold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-teal-500"
          >
            {initialData ? 'Save Changes' : 'Create Reminder'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
