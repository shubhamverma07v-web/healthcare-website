import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary' | string;
  confirmVariant?: 'danger' | 'warning' | 'primary' | string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant,
  confirmVariant
}) => {
  const handleClose = onClose || onCancel || (() => {});
  const actualVariant = confirmVariant || variant || 'danger';

  const getButtonStyles = () => {
    switch (actualVariant) {
      case 'danger':
        return 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500';
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500';
      case 'primary':
      default:
        return 'bg-[#0D9488] hover:bg-[#0F766E] text-white focus:ring-teal-500';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} maxWidth="md">
      <div className="flex gap-4 items-start">
        <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex-shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors focus:ring-2 focus:ring-slate-400"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          className={`px-4 py-2 text-sm font-medium rounded-xl shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 ${getButtonStyles()}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
