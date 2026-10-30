// Core Types for CuraGuide Platform

export type MedicineCategory = 
  | 'Antibiotic'
  | 'Pain Relief'
  | 'Antidiabetic'
  | 'Cardiovascular'
  | 'Antihistamine'
  | 'Gastrointestinal'
  | 'Respiratory'
  | 'Antihypertensive';

export type DosageForm = 
  | 'Oral Tablet'
  | 'Capsule'
  | 'Liquid Syrup'
  | 'Metered Dose Inhaler'
  | 'Extended Release Tablet'
  | 'Oral Suspension';

export interface MedicineRecord {
  id: string;
  name: string;
  genericName: string;
  category: MedicineCategory;
  form: DosageForm;
  strength: string;
  manufacturer: string;
  prescriptionRequired: boolean;
  isDemoData: true;
  generalUses: string[];
  samplePrescriptionSchedule: string;
  warningsAndPrecautions: string[];
  commonSideEffects: {
    effect: string;
    frequency: 'Common' | 'Uncommon' | 'Rare';
  }[];
  referenceSource: {
    name: string;
    url: string;
    lastReviewed: string;
  };
  storageInstructions: string;
}

export type ReminderStatus = 'pending' | 'taken' | 'skipped';

export interface ReminderItem {
  id: string;
  medicineId?: string;
  medicineName: string;
  dosage: string;
  scheduleTime: string; // "08:00 AM" or "20:00"
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  frequency: 'Daily' | 'Twice Daily' | 'Three Times Daily' | 'Weekly' | 'As Needed';
  instructions?: string;
  startDate: string;
  status: ReminderStatus;
  statusTimestamp?: string;
  notes?: string;
}

export type FacilityType = 'Hospital' | 'Urgent Care' | 'Community Clinic' | 'Pharmacy';

export interface HealthcareFacility {
  id: string;
  name: string;
  type: FacilityType;
  address: string;
  city: string;
  phone: string;
  operatingHours: string;
  isOpenNow: boolean;
  emergencyServices: boolean;
  isDemoData: true;
  distanceKm: number;
  rating: number;
  latitude: number;
  longitude: number;
  services: string[];
}

export type RecordCategory = 
  | 'Prescription'
  | 'Diagnostic Lab'
  | 'Discharge Summary'
  | 'Vaccination'
  | 'Insurance'
  | 'Medical Imaging';

export interface DigitalRecord {
  id: string;
  title: string;
  category: RecordCategory;
  doctorOrClinic: string;
  documentDate: string;
  uploadedAt: string;
  fileSize: string;
  fileType: 'pdf' | 'png' | 'jpg';
  previewUrl?: string;
  notes?: string;
  isDemoRecord: boolean;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language: 'en' | 'hi';
  suggestedFollowUps?: string[];
  sourceReference?: string;
}

export type LanguageMode = 'en' | 'hi';
export type ThemeMode = 'light' | 'dark';

