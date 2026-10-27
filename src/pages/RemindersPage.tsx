import React, { useState, useMemo } from 'react';
import {
  Clock,
  Plus,
  Filter,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldAlert,
  Calendar,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Moon
} from 'lucide-react';
import { ReminderCard } from '../components/reminders/ReminderCard';
import { ReminderForm } from '../components/reminders/ReminderForm';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { useReminders } from '../context/RemindersContext';
import { ReminderItem, ReminderStatus } from '../types';

export const RemindersPage: React.FC = () => {
  const {
    reminders,
    stats,
    addReminder,
    updateReminder,
    deleteReminder,
    updateStatus,
    resetReminders
  } = useReminders();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'taken' | 'skipped'>('all');
  const [selectedSlot, setSelectedSlot] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ReminderItem | null>(null);
  const [deletingReminder, setDeletingReminder] = useState<ReminderItem | null>(null);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  // Filter reminders
  const filteredReminders = useMemo(() => {
    return reminders.filter(r => {
      const matchesStatus = activeTab === 'all' || r.status === activeTab;
      const matchesSlot = selectedSlot === 'All' || r.timeSlot === selectedSlot;
      return matchesStatus && matchesSlot;
    });
  }, [reminders, activeTab, selectedSlot]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
              Medicine Reminders
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
              {stats.total} Doses Scheduled
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Organize daily medication routines, record adherence timestamps, and maintain healthy compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Adherence Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card">
        <div>
          <p className="text-xs text-slate-500 font-medium">Scheduled Today</p>
          <p className="text-2xl font-bold text-[#102A43] dark:text-white mt-1">{stats.total}</p>
        </div>
        <div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Doses Taken</p>
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">{stats.taken}</p>
        </div>
        <div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Pending Doses</p>
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">{stats.pending}</p>
        </div>
        <div>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Adherence Score</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {stats.adherenceRate}%
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              ({stats.taken}/{stats.total})
            </span>
          </div>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Strict Clinical Safety Protocol:</strong> CuraGuide tracks compliance with existing physician prescriptions. Never alter your dosage amount or take a double dose to compensate for a missed reminder. If uncertain, consult your licensed pharmacist.
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#132235] text-[#102A43] dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All ({reminders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'pending'
                ? 'bg-white dark:bg-[#132235] text-amber-700 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('taken')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'taken'
                ? 'bg-white dark:bg-[#132235] text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Taken ({stats.taken})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skipped')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'skipped'
                ? 'bg-white dark:bg-[#132235] text-rose-700 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Skipped ({stats.skipped})
          </button>
        </div>

        {/* Time slot filter & Reset */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold">Time Slot:</span>
            <select
              value={selectedSlot}
              onChange={e => setSelectedSlot(e.target.value)}
              className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#132235] px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            >
              <option value="All">All Routine Slots</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night / Bedtime</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setIsConfirmResetOpen(true)}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:underline inline-flex items-center gap-1"
            title="Restore sample reminders"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Doses</span>
          </button>
        </div>
      </div>

      {/* Reminders List or Empty State */}
      {filteredReminders.length === 0 ? (
        <EmptyState
          title="No Matching Reminders"
          description={
            activeTab !== 'all' || selectedSlot !== 'All'
              ? 'No scheduled doses match your chosen status or slot filter. Try switching tabs.'
              : 'You have cleared all dose reminders. Click "Add Reminder" or "Reset Demo Doses" to populate.'
          }
          actionLabel="Add Reminder"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReminders.map(reminder => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onUpdateStatus={updateStatus}
              onEdit={rem => setEditingReminder(rem)}
              onDelete={rem => setDeletingReminder(rem)}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Medicine Dose"
      >
        <ReminderForm
          onSubmit={data => {
            addReminder(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingReminder}
        onClose={() => setEditingReminder(null)}
        title="Edit Medication Reminder"
      >
        {editingReminder && (
          <ReminderForm
            initialData={editingReminder}
            onSubmit={data => {
              updateReminder(editingReminder.id, data);
              setEditingReminder(null);
            }}
            onCancel={() => setEditingReminder(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingReminder}
        title="Delete Reminder Schedule"
        message={`Are you sure you want to permanently delete the reminder for "${deletingReminder?.medicineName}"?`}
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={() => {
          if (deletingReminder) {
            deleteReminder(deletingReminder.id);
            setDeletingReminder(null);
          }
        }}
        onCancel={() => setDeletingReminder(null)}
      />

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={isConfirmResetOpen}
        title="Reset Demo Reminders"
        message="This will reset your reminders list to the competition demonstration schedule. Continue?"
        confirmLabel="Reset to Default"
        confirmVariant="primary"
        onConfirm={() => {
          resetReminders();
          setIsConfirmResetOpen(false);
        }}
        onCancel={() => setIsConfirmResetOpen(false)}
      />
    </div>
  );
};
