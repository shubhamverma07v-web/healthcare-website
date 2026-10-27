import React from 'react';
import { MedicineRecord } from '../../types';
import { Pill, Building, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

interface MedicineDetailsPanelProps {
  medicine: MedicineRecord;
  onClose?: () => void;
}

export const MedicineDetailsPanel: React.FC<MedicineDetailsPanelProps> = ({ medicine }) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600">
          <Pill className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{medicine.name}</h4>
          <p className="text-slate-500 italic">{medicine.genericName}</p>
        </div>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
        <p><strong>Form:</strong> {medicine.form} ({medicine.strength})</p>
        <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
        <p><strong>Prescription:</strong> {medicine.prescriptionRequired ? 'Rx Required' : 'OTC Available'}</p>
      </div>

      <div>
        <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Indications:</p>
        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
          {medicine.generalUses.map((use, i) => (
            <li key={i}>{use}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicineDetailsPanel;
