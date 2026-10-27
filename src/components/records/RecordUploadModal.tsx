import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { DigitalRecord, RecordCategory } from '../../types';
import { Modal } from '../common/Modal';

interface RecordUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRecord: (record: Omit<DigitalRecord, 'id' | 'uploadedAt' | 'isDemoRecord'>) => void;
}

export const RecordUploadModal: React.FC<RecordUploadModalProps> = ({
  isOpen,
  onClose,
  onSaveRecord
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RecordCategory>('Prescription');
  const [doctorOrClinic, setDoctorOrClinic] = useState('');
  const [documentDate, setDocumentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    type: 'pdf' | 'png' | 'jpg';
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file format. Please select a PDF, PNG, or JPG file.');
      return;
    }

    // Validate size (max 10MB)
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setErrorMessage('File size exceeds the 10 MB demo limit.');
      return;
    }

    // Format size
    const sizeInKb = (file.size / 1024).toFixed(0);
    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${sizeInKb} KB`;

    const extension = file.name.split('.').pop()?.toLowerCase();
    const resolvedType: 'pdf' | 'png' | 'jpg' =
      extension === 'pdf' ? 'pdf' : extension === 'png' ? 'png' : 'jpg';

    setSelectedFile({
      name: file.name,
      size: formattedSize,
      type: resolvedType
    });

    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Document title is required.');
      return;
    }

    onSaveRecord({
      title: title.trim(),
      category,
      doctorOrClinic: doctorOrClinic.trim() || 'General Medical Practice',
      documentDate,
      fileSize: selectedFile ? selectedFile.size : '1.2 MB',
      fileType: selectedFile ? selectedFile.type : 'pdf',
      notes: notes.trim() || undefined
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setCategory('Prescription');
    setDoctorOrClinic('');
    setDocumentDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setSelectedFile(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Upload Health Record" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drop zone / File Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Prescription or Medical Document (PDF, JPG, PNG)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 rounded-2xl p-6 text-center transition-colors bg-slate-50/50 dark:bg-slate-800/30"
          >
            {selectedFile ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-[#0D9488]" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedFile.size} • {selectedFile.type.toUpperCase()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] mx-auto flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to select file from your device
                </p>
                <p className="text-[11px] text-slate-400">
                  Supported formats: PDF, JPG, PNG (Max 10 MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Document Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Blood Test Report, Rx Slip"
              className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as RecordCategory)}
              className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            >
              <option value="Prescription">Prescription</option>
              <option value="Diagnostic Lab">Diagnostic Lab</option>
              <option value="Discharge Summary">Discharge Summary</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Medical Imaging">Medical Imaging</option>
              <option value="Insurance">Insurance</option>
            </select>
          </div>
        </div>

        {/* Clinic & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Doctor or Healthcare Provider
            </label>
            <input
              type="text"
              value={doctorOrClinic}
              onChange={e => setDoctorOrClinic(e.target.value)}
              placeholder="e.g. Dr. A. Sharma / City Hospital"
              className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Document Issue Date
            </label>
            <input
              type="date"
              value={documentDate}
              onChange={e => setDocumentDate(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Clinical Summary or Instructions
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="e.g. Take twice daily after food; follow-up scheduled in 2 weeks"
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-[#132235] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          />
        </div>

        {/* Privacy Reassurance Banner */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
          <span>
            <strong>Zero Cloud Exposure:</strong> For the DevFusion prototype, metadata is simulated locally. Your personal files are never sent to third-party endpoints or cloud services.
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white shadow-sm transition-colors"
          >
            Save Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
