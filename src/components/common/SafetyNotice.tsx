import React from 'react';
import { ShieldAlert, PhoneCall, Info } from 'lucide-react';

interface SafetyNoticeProps {
  compact?: boolean;
}

export const SafetyNotice: React.FC<SafetyNoticeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Educational Prototype:</strong> Sample records only. Not medically verified. For acute emergencies, call <strong>911 / 112</strong>.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-[#0F1E30] dark:to-[#132A38] border border-blue-100 dark:border-teal-900/40 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shadow-sm flex-shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#102A43] dark:text-white flex items-center gap-2">
              Clinical & Competition Safety Advisory
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300">
                DevFusion Demo
              </span>
            </h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              CuraGuide is an academic prototype showcasing healthcare UI/UX architecture. Drug references and schedules are fictional demonstration models and must never substitute for licensed physician diagnostics, dosage plans, or emergency triage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <a
            href="tel:911"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Emergency: 911 / 112
          </a>
          <a
            href="https://www.who.int/emergencies"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs transition-colors"
            title="Global WHO Guidelines"
          >
            <Info className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
