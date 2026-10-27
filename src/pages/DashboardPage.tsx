import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Bookmark,
  FileText,
  Search,
  Plus,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Pill,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { ReminderCard } from '../components/reminders/ReminderCard';
import { ReminderForm } from '../components/reminders/ReminderForm';
import { MedicineCard } from '../components/medicines/MedicineCard';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useReminders } from '../context/RemindersContext';
import { useSavedMedicines } from '../context/SavedMedicinesContext';
import { useRecords } from '../context/RecordsContext';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_MEDICINES } from '../data/medicines';
import { ReminderItem } from '../types';

export const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { reminders, stats, updateStatus, addReminder, updateReminder, deleteReminder } = useReminders();
  const { savedIds } = useSavedMedicines();
  const { records } = useRecords();

  const [dashboardSearch, setDashboardSearch] = useState('');
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ReminderItem | null>(null);
  const [deletingReminder, setDeletingReminder] = useState<ReminderItem | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dashboardSearch.trim()) {
      navigate(`/medicines?q=${encodeURIComponent(dashboardSearch.trim())}`);
    }
  };

  const savedMedicinesList = SAMPLE_MEDICINES.filter(m => savedIds.includes(m.id));

  // Find next upcoming pending reminder
  const nextPendingReminder = reminders.find(r => r.status === 'pending');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner & Quick Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-teal-500/10 via-blue-500/5 to-transparent p-6 sm:p-8 rounded-3xl border border-teal-100 dark:border-teal-900/40">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-100/80 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Demo Patient Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
            Welcome back, Alex Morgan
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={dashboardSearch}
              onChange={e => setDashboardSearch(e.target.value)}
              placeholder="Quick search medicines, generic names..."
              className="w-full text-xs sm:text-sm pl-10 pr-24 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#132235] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-semibold transition-colors"
            >
              Explore
            </button>
          </div>
        </form>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <SummaryCard
          title="Scheduled Doses"
          value={stats.total}
          subtitle={`${stats.pending} pending for today`}
          icon={Clock}
          colorVariant="teal"
        />
        <SummaryCard
          title="Adherence Rate"
          value={`${stats.adherenceRate}%`}
          subtitle={`${stats.taken} of ${stats.total} taken`}
          trend={stats.adherenceRate >= 80 ? 'Optimal Adherence' : 'Follow Prescribed Times'}
          icon={CheckCircle2}
          colorVariant="emerald"
        />
        <SummaryCard
          title="Saved Medicines"
          value={savedIds.length}
          subtitle="Formulary bookmarks"
          icon={Bookmark}
          colorVariant="blue"
        />
        <SummaryCard
          title="Digital Records"
          value={records.length}
          subtitle="Zero-cloud local vault"
          icon={FileText}
          colorVariant="amber"
        />
      </div>

      {/* Quick Action Ribbon */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsAddReminderOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Dose Reminder</span>
        </button>

        <Link
          to="/medicines"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#132235] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          <Search className="w-4 h-4 text-[#0D9488]" />
          <span>Browse 8+ Medicines</span>
        </Link>

        <Link
          to="/records"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#132235] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          <FileText className="w-4 h-4 text-blue-500" />
          <span>Upload Record</span>
        </Link>

        <Link
          to="/facilities"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#132235] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>Locate Emergency Care</span>
        </Link>
      </div>

      {/* Main Grid: Today's Schedule & Next Due / Safety Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Medicine Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#102A43] dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0D9488]" />
                <span>Today's Medicine Schedule</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Active reminders and dose logs for current routine
              </p>
            </div>

            <Link
              to="/reminders"
              className="text-xs font-semibold text-[#0D9488] hover:text-teal-700 dark:hover:text-teal-400 inline-flex items-center gap-1"
            >
              <span>Manage All Reminders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {reminders.length === 0 ? (
            <EmptyState
              title="No Reminders Scheduled"
              description="You have not created any medication reminders yet. Add your first reminder to track daily adherence."
              actionLabel="Add Reminder"
              onAction={() => setIsAddReminderOpen(true)}
            />
          ) : (
            <div className="space-y-3">
              {reminders.slice(0, 4).map(reminder => (
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
        </div>

        {/* Right 1 Col: Next Due Callout & Healthcare Safety */}
        <div className="space-y-6">
          {/* Next Due Dose Callout */}
          <div className="p-5 rounded-2xl bg-[#E8F3FF] dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                Next Scheduled Dose
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            </div>

            {nextPendingReminder ? (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-blue-950 dark:text-blue-100">
                  {nextPendingReminder.medicineName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-blue-900 dark:text-blue-200 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{nextPendingReminder.scheduleTime} ({nextPendingReminder.timeSlot})</span>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  Dosage: {nextPendingReminder.dosage}
                </p>
                {nextPendingReminder.instructions && (
                  <p className="text-[11px] text-blue-700 dark:text-blue-400 bg-white/60 dark:bg-slate-900/40 p-2 rounded-lg italic">
                    {nextPendingReminder.instructions}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => updateStatus(nextPendingReminder.id, 'taken')}
                  className="w-full mt-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark This Dose Taken</span>
                </button>
              </div>
            ) : (
              <div className="text-xs text-blue-800 dark:text-blue-300 py-3">
                <p className="font-semibold">All daily doses logged!</p>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Great job staying aligned with your healthcare routine today.
                </p>
              </div>
            )}
          </div>

          {/* Healthcare Safety Information Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-[#102A43] dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#0D9488]" />
              <span>Healthcare Safety Protocol</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#0D9488] font-bold">•</span>
                <span>
                  <strong>Missed Dose Safety:</strong> If you miss a scheduled medicine time, take it as soon as remembered unless it is nearly time for your next scheduled dose. Never double up.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D9488] font-bold">•</span>
                <span>
                  <strong>Storage:</strong> Keep prescription tablets away from bathroom heat and humidity unless refrigerated storage is expressly indicated.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D9488] font-bold">•</span>
                <span>
                  <strong>Emergency:</strong> In cases of suspected allergic reaction or overdose, call emergency response (911 / 112) immediately.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recently Viewed / Saved Medicines Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#102A43] dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#0D9488]" />
              <span>Saved Formulary Medicines</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Quick access to your bookmarked educational drug references
            </p>
          </div>
          <Link
            to="/medicines"
            className="text-xs font-semibold text-[#0D9488] hover:text-teal-700 dark:hover:text-teal-400 inline-flex items-center gap-1"
          >
            <span>View All Drugs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {savedMedicinesList.length === 0 ? (
          <div className="p-6 text-center bg-white dark:bg-[#132235] border border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-xs sm:text-sm text-slate-500">
              No saved medicines yet. Browse the catalog and click the bookmark icon to save medications for quick review.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedMedicinesList.map(med => (
              <MedicineCard
                key={med.id}
                medicine={med}
                onScheduleReminder={() => {
                  setEditingReminder(null);
                  setIsAddReminderOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      <Modal
        isOpen={isAddReminderOpen}
        onClose={() => setIsAddReminderOpen(false)}
        title="Schedule New Dose Reminder"
      >
        <ReminderForm
          onSubmit={data => {
            addReminder(data);
            setIsAddReminderOpen(false);
          }}
          onCancel={() => setIsAddReminderOpen(false)}
        />
      </Modal>

      {/* Edit Reminder Modal */}
      <Modal
        isOpen={!!editingReminder}
        onClose={() => setEditingReminder(null)}
        title="Edit Reminder Schedule"
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingReminder}
        title="Delete Reminder Schedule"
        message={`Are you sure you want to remove the reminder schedule for "${deletingReminder?.medicineName}"? This action cannot be undone.`}
        confirmLabel="Delete Reminder"
        confirmVariant="danger"
        onConfirm={() => {
          if (deletingReminder) {
            deleteReminder(deletingReminder.id);
            setDeletingReminder(null);
          }
        }}
        onCancel={() => setDeletingReminder(null)}
      />
    </div>
  );
};
