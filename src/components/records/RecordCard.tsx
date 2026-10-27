import React, { useState } from 'react';
import {
  FileText,
  FileCheck,
  Eye,
  Trash2,
  Calendar,
  Building,
  HardDrive,
  Download,
  AlertCircle
} from 'lucide-react';
import { DigitalRecord } from '../../types';
import { Modal } from '../common/Modal';

interface RecordCardProps {
  record: DigitalRecord;
  onDelete: (record: DigitalRecord) => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, onDelete }) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Prescription':
        return 'bg-teal-50 text-[#0D9488] border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40';
      case 'Diagnostic Lab':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40';
      case 'Vaccination':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40';
      case 'Discharge Summary':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
        <div>
          {/* Category & File Type */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(record.category)}`}>
              {record.category}
            </span>
            <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {record.fileType} • {record.fileSize}
            </span>
          </div>

          {/* Document Title */}
          <h3 className="text-base font-bold text-[#102A43] dark:text-white line-clamp-2 mb-2">
            {record.title}
          </h3>

          {/* Metadata */}
          <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{record.doctorOrClinic}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>Document Date: {record.documentDate}</span>
            </div>
          </div>

          {/* Clinical Notes Summary */}
          {record.notes && (
            <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 line-clamp-2 leading-relaxed mb-4">
              {record.notes}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Record</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(record)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete record"
            aria-label="Delete record"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simulated Document Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Digital Record Viewer"
        size="lg"
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getCategoryColor(record.category)}`}>
                {record.category}
              </span>
              <h2 className="text-base font-bold text-[#102A43] dark:text-white mt-1">
                {record.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {record.doctorOrClinic} • Issued on {record.documentDate}
              </p>
            </div>
            <span className="text-xs font-mono font-medium px-2 py-1 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              {record.fileSize} [{record.fileType.toUpperCase()}]
            </span>
          </div>

          {/* Document Content Simulation */}
          <div className="p-6 bg-white dark:bg-[#0D1826] border border-slate-200 dark:border-slate-800 rounded-xl min-h-[220px] flex flex-col justify-between">
            <div className="border-b border-dashed border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>SIMULATED MEDICAL RECORD DOCUMENT</span>
                <span className="text-teal-600 font-semibold">VERIFIED ARCHIVE</span>
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Patient Consultation Notes & Prescription Slip
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Prescribing Authority: {record.doctorOrClinic}
              </p>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 py-2">
              <p>
                <strong>Clinical Assessment:</strong> {record.notes || 'Routine consultation and maintenance regimen assessment conducted. Vitals recorded within normal ambulatory thresholds.'}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Archived via CuraGuide zero-knowledge local client on {record.uploadedAt}.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="italic">Sample Record ID: {record.id}</span>
              <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                Local Session Protected
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40 text-xs text-teal-800 dark:text-teal-300">
            <strong>Prototype Security Notice:</strong> Health records are simulated locally in client browser storage for the DevFusion college demonstration. No genuine patient health records or sensitive binary files are transmitted to external servers.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#0D9488] text-white hover:bg-teal-700 transition-colors"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
