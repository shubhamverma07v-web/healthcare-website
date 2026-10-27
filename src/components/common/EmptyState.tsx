import React from 'react';
import { LucideIcon, Info } from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Info,
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white dark:bg-[#132235] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 my-4">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-[#0D9488] flex items-center justify-center mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-[#102A43] dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-medium rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-teal-500 hover:shadow"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
