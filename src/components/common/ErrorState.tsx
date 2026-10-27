import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred while loading this healthcare information. Please try refreshing or return to the dashboard.',
  onRetry,
  showHomeButton = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-8 bg-white dark:bg-[#132235] border border-red-200/80 dark:border-red-900/40 rounded-2xl shadow-card">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 shadow-sm border border-red-100 dark:border-red-900/30">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-[#102A43] dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
        {showHomeButton && (
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
        )}
      </div>
    </div>
  );
};
