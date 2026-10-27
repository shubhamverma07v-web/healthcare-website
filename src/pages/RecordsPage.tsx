import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  UploadCloud,
  Search,
  Filter,
  ShieldCheck,
  RotateCcw,
  HardDrive,
  FileCheck
} from 'lucide-react';
import { RecordCard } from '../components/records/RecordCard';
import { RecordUploadModal } from '../components/records/RecordUploadModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { useRecords } from '../context/RecordsContext';
import { DigitalRecord, RecordCategory } from '../types';

export const RecordsPage: React.FC = () => {
  const { records, addRecord, deleteRecord, resetRecords } = useRecords();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState<DigitalRecord | null>(null);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  const categories = ['All', 'Prescription', 'Diagnostic Lab', 'Vaccination', 'Discharge Summary', 'Medical Imaging'];

  const filteredRecords = useMemo(() => {
    return records.filter(rec => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        rec.title.toLowerCase().includes(q) ||
        rec.doctorOrClinic.toLowerCase().includes(q) ||
        (rec.notes && rec.notes.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'All' || rec.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [records, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
              Digital Health Records
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
              {records.length} Documents Archived
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Organize prescription slips, lab results, and immunization certificates in your zero-cloud local vault.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/50 flex items-start gap-3 text-xs text-teal-900 dark:text-teal-200 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
        <div>
          <strong>Zero-Cloud Privacy Guarantee:</strong> CuraGuide does not upload sensitive prescription or clinical binary files to external servers or third-party cloud vendors. In this college prototype, records and metadata exist safely inside your browser session for demo evaluation.
        </div>
      </div>

      {/* Search and Category Filter Ribbon */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search records by title, doctor, or keyword..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0E1A29] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          />
        </div>

        {/* Category Pills & Reset */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0D9488] text-white font-semibold shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsConfirmResetOpen(true)}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 inline-flex items-center gap-1 ml-2"
            title="Restore sample records"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Records Grid or Empty State */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          title="No Health Records Found"
          description={
            searchQuery || selectedCategory !== 'All'
              ? 'No health documents match your search criteria. Try selecting "All" or clearing the query.'
              : 'Your health record vault is currently empty. Upload your first test report or prescription document.'
          }
          actionLabel="Upload Document"
          onAction={() => setIsUploadModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecords.map(record => (
            <RecordCard
              key={record.id}
              record={record}
              onDelete={rec => setDeletingRecord(rec)}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <RecordUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSaveRecord={rec => addRecord(rec)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingRecord}
        title="Delete Health Record"
        message={`Are you sure you want to remove "${deletingRecord?.title}" from your records? This action cannot be undone.`}
        confirmLabel="Delete Record"
        confirmVariant="danger"
        onConfirm={() => {
          if (deletingRecord) {
            deleteRecord(deletingRecord.id);
            setDeletingRecord(null);
          }
        }}
        onCancel={() => setDeletingRecord(null)}
      />

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={isConfirmResetOpen}
        title="Reset Health Records"
        message="This will reset your digital records back to the default demonstration sample set. Continue?"
        confirmLabel="Reset to Default"
        confirmVariant="primary"
        onConfirm={() => {
          resetRecords();
          setIsConfirmResetOpen(false);
        }}
        onCancel={() => setIsConfirmResetOpen(false)}
      />
    </div>
  );
};
