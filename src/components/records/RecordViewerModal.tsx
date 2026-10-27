import React from 'react';
import { Modal } from '../common/Modal';
import { DigitalRecord } from '../../types';
import { FileText, Download, Printer, ShieldCheck, CheckCircle2, User, Building, Calendar } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface RecordViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: DigitalRecord | null;
}

export const RecordViewerModal: React.FC<RecordViewerModalProps> = ({
  isOpen,
  onClose,
  record
}) => {
  const { showToast } = useToast();

  if (!record) return null;

  const handleSimulatedDownload = () => {
    showToast(`Downloading simulated copy: ${record.title}.${record.fileType}`, 'success');
  };

  const handlePrint = () => {
    showToast('Sending document to printer view...', 'info');
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={record.title}
      subtitle={`Category: ${record.category} • Format: ${record.fileType.toUpperCase()}`}
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Document Metadata Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-teal-600" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Facility / Physician</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{record.doctorOrClinic}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Document Date</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{record.documentDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Security Status</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Local Verified</span>
            </div>
          </div>
        </div>

        {/* Simulated Document Canvas / Mockup */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-inner space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-sans font-bold text-slate-800 dark:text-slate-100">
              <FileText className="w-4 h-4 text-[#0D9488]" />
              <span>CURAGUIDE CLINICAL RECORD VIEWER</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-sans">
              REF-DOC-2026-MC
            </span>
          </div>

          <div className="space-y-2 font-sans">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <p className="text-xs text-slate-500">Patient Identifier:</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Alex Chen (Fictional Demo Patient)</p>
              <p className="text-xs text-slate-500">DOB: 1992-05-18 | Blood Group: B+ | MRN: #MG-889024</p>
            </div>

            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Document Contents & Diagnostic Summary:
              </h5>
              <div className="p-4 rounded-xl bg-teal-50/40 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 text-slate-700 dark:text-slate-300 space-y-2 text-xs leading-relaxed">
                <p><strong>Primary Record Title:</strong> {record.title}</p>
                <p><strong>Issuing Provider:</strong> {record.doctorOrClinic}</p>
                <p><strong>Clinical Notes:</strong> {record.notes || 'Routine health examination. All vitals and parameters verified within stable clinical tolerance limits.'}</p>
                <p className="text-[11px] text-slate-400 pt-2 border-t border-teal-100 dark:border-teal-900/40">
                  Digitally signed by Attending Physician • Verification Key: SHA256-DEMO-SIMULATION
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Fictional sample document for UI demonstration</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleSimulatedDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Copy</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
