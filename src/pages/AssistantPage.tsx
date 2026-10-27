import React from 'react';
import { AssistantChat } from '../components/assistant/AssistantChat';
import {
  Bot,
  ShieldAlert,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileText,
  AlertTriangle,
  Languages
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AssistantPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
              CuraGuide Health Assistant
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
              Formulary Grounded
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Bilingual educational companion for reading medicine leaflets, decoding generic formulations, and clarifying health terms.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Informational AI prototype • Not a licensed doctor</span>
        </div>
      </div>

      {/* Main Grid: Assistant Chat & Scope Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Cols: Interactive Chat Window */}
        <div className="lg:col-span-3">
          <AssistantChat />
        </div>

        {/* Right 1 Col: Educational Boundaries & Quick FAQ Guide */}
        <div className="space-y-6">
          {/* Assistant Scope Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#102A43] dark:text-white">
              What I Can Help With
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-[#0D9488] font-bold">✓</span>
                <span>Explaining active ingredients vs brand trade names</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D9488] font-bold">✓</span>
                <span>Reading batch numbers, expiry dates, and packaging warnings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D9488] font-bold">✓</span>
                <span>Standard safe medicine storage practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D9488] font-bold">✓</span>
                <span>General protocols when a regular dose is forgotten</span>
              </li>
            </ul>
          </div>

          {/* Strict Safety Boundaries */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-100">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Strict AI Boundaries</span>
            </div>
            <p className="leading-relaxed">
              To guarantee competition safety and ethical standards, this assistant strictly will not:
            </p>
            <ul className="space-y-1.5 pl-2 list-disc list-inside text-amber-800 dark:text-amber-300">
              <li>Diagnose illnesses or symptoms</li>
              <li>Prescribe any drug or alter treatment plans</li>
              <li>Calculate custom dosage amounts</li>
              <li>Encourage doubling missed doses</li>
            </ul>
          </div>

          {/* Reference Attribution */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Grounded Reference Material:
            </p>
            <p>
              WHO Formulary, US FDA Drug Guides, and standard public pharmacopeia leaflets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
