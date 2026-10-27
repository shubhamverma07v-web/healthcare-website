import React, { useState } from 'react';
import {
  User,
  Globe,
  Sun,
  Moon,
  Bell,
  Volume2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
  Heart,
  Mail,
  Phone,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useReminders } from '../context/RemindersContext';
import { useSavedMedicines } from '../context/SavedMedicinesContext';
import { useRecords } from '../context/RecordsContext';
import { useToast } from '../context/ToastContext';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { resetReminders } = useReminders();
  const { clearSaved } = useSavedMedicines();
  const { resetRecords } = useRecords();
  const { showToast } = useToast();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [advanceWarning, setAdvanceWarning] = useState(true);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleResetAllData = () => {
    localStorage.removeItem('mediguide_reminders');
    localStorage.removeItem('mediguide_saved_medicines');
    localStorage.removeItem('mediguide_records_meta');
    resetReminders();
    clearSaved();
    resetRecords();
    setIsResetConfirmOpen(false);
    showToast('All local demonstration data reset to default competition state', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
          Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Configure application theme, language options, adherence reminder preferences, and manage local storage.
        </p>
      </div>

      {/* Demo Profile Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-xl shadow-md">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#102A43] dark:text-white">
                  Alex Morgan
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Fictional Demo Patient
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Patient ID: DEMO-DEV-2026 • Age: 42 • Blood Group: A+
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
            DevFusion Prototype Sandbox
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>alex.morgan.demo@curaguide.internal</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>Emergency Contact: +1 (555) 019-2831 (Spouse)</span>
          </div>
        </div>
      </div>

      {/* Appearance & Interface Settings */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
        <h3 className="text-base font-bold text-[#102A43] dark:text-white">
          Interface & Language Preferences
        </h3>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-teal-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#102A43] dark:text-white">
                Interface Color Theme
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch between clinical crisp light mode and high-contrast dark theme
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-500 transition-colors shadow-sm"
          >
            {theme === 'dark' ? 'Dark Mode (Active)' : 'Light Mode (Active)'}
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#102A43] dark:text-white">
                Display Language
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose primary language for navigation, alerts, and AI explanations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLanguage('en');
                showToast('Switched language to English', 'info');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                language === 'en'
                  ? 'bg-[#0D9488] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => {
                setLanguage('hi');
                showToast('भाषा बदलकर हिंदी कर दी गई', 'info');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                language === 'hi'
                  ? 'bg-[#0D9488] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        {/* Reminder Preferences */}
        <div className="space-y-4 pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Adherence Reminder Toggles
          </p>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-teal-600" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Browser Push Notifications Simulation
                </p>
                <p className="text-slate-400">Show notification banner when scheduled dose is reached</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={browserNotifications}
              onChange={e => setBrowserNotifications(e.target.checked)}
              className="rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-teal-600" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Audio Tone for Timed Doses
                </p>
                <p className="text-slate-400">Play pleasant alert tone at exact schedule times</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={e => setSoundEnabled(e.target.checked)}
              className="rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  15-Minute Advance Dose Notice
                </p>
                <p className="text-slate-400">Pre-alert with instructions (e.g. "Prepare water or food")</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={advanceWarning}
              onChange={e => setAdvanceWarning(e.target.checked)}
              className="rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] w-4 h-4"
            />
          </div>
        </div>
      </div>

      {/* Privacy Information & Reset Local Data */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
        <h3 className="text-base font-bold text-[#102A43] dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#0D9488]" />
          <span>Privacy & Data Management</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          CuraGuide stores all demo medication reminders, health record metadata, and user settings strictly in your browser’s localStorage. No private health information or clinical documents are ever uploaded to cloud endpoints.
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold text-rose-700 dark:text-rose-400">
              Reset Application to Default Demonstration State
            </p>
            <p className="text-[11px] text-slate-500">
              Clears custom reminders and uploaded demo records, restoring original competition data.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset All Demonstration Data?"
        message="This action will clear all custom dosage reminders, bookmarked medicines, and uploaded records, resetting CuraGuide back to the initial DevFusion evaluation defaults."
        confirmLabel="Confirm Reset"
        confirmVariant="danger"
        onConfirm={handleResetAllData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
