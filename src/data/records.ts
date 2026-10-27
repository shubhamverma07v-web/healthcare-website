import { DigitalRecord } from '../types';

export const SAMPLE_RECORDS: DigitalRecord[] = [
  {
    id: 'rec-1',
    title: 'Routine Comprehensive Metabolic Panel & HbA1c',
    category: 'Diagnostic Lab',
    doctorOrClinic: 'Apex Pathology Center (Dr. K. Patel)',
    documentDate: '2026-10-14',
    uploadedAt: '2026-10-15',
    fileSize: '1.4 MB',
    fileType: 'pdf',
    notes: 'Fasting blood glucose: 104 mg/dL, HbA1c: 6.2%. Kidney and liver panels within normal reference ranges.',
    isDemoRecord: true
  },
  {
    id: 'rec-2',
    title: 'Cardiology Follow-Up & Lipid Regimen Prescription',
    category: 'Prescription',
    doctorOrClinic: 'Metro Hope Heart Institute (Dr. Elena Vance)',
    documentDate: '2026-09-15',
    uploadedAt: '2026-09-15',
    fileSize: '820 KB',
    fileType: 'pdf',
    notes: 'Prescribed Atorvastatin 20mg once daily at bedtime. Advised lifestyle modifications and 6-month lipid re-test.',
    isDemoRecord: true
  },
  {
    id: 'rec-3',
    title: 'Seasonal Influenza Quadrivalent Vaccine Certificate',
    category: 'Vaccination',
    doctorOrClinic: 'Evergreen Wellness Center',
    documentDate: '2026-09-28',
    uploadedAt: '2026-09-29',
    fileSize: '650 KB',
    fileType: 'jpg',
    notes: 'Administered 0.5 mL intramuscularly in left deltoid. Lot #FL-88290. No immediate adverse reactions noted.',
    isDemoRecord: true
  },
  {
    id: 'rec-4',
    title: 'Dental Assessment & Amoxicillin Antibiotic Course',
    category: 'Prescription',
    doctorOrClinic: 'BrightSmile Dental Arts (Dr. Marcus Lee)',
    documentDate: '2026-08-05',
    uploadedAt: '2026-08-06',
    fileSize: '540 KB',
    fileType: 'pdf',
    notes: 'Post-extraction prophylactic Amoxicillin 500mg tid x 7 days. Regimen completed successfully.',
    isDemoRecord: true
  }
];
