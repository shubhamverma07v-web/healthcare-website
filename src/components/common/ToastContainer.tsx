import React from 'react';
import { useToast, ToastType } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-teal-600 flex-shrink-0" />;
    }
  };

  const getBg = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200';
      case 'error':
        return 'border-rose-200 bg-rose-50 text-rose-950 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200';
      case 'warning':
        return 'border-amber-200 bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200';
      case 'info':
      default:
        return 'border-teal-200 bg-teal-50 text-teal-950 dark:bg-teal-950/40 dark:border-teal-800 dark:text-teal-200';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform duration-200 ease-out animate-in slide-in-from-bottom-2 ${getBg(
            toast.type
          )}`}
          role="status"
          aria-live="polite"
        >
          {getIcon(toast.type)}
          <p className="text-sm font-medium flex-1 leading-snug">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 opacity-70 hover:opacity-100" />
          </button>
        </div>
      ))}
    </div>
  );
};
