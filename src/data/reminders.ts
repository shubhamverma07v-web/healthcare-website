import { ReminderItem } from '../types';

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    medicineId: 'med-metformin',
    medicineName: 'Glucophage (Metformin)',
    dosage: '500 mg — 1 Tablet',
    scheduleTime: '08:00 AM',
    timeSlot: 'Morning',
    frequency: 'Daily',
    instructions: 'Take immediately with breakfast',
    startDate: '2026-10-01',
    status: 'taken',
    statusTimestamp: '08:05 AM',
    notes: 'Prescribed by Dr. Elena Vance'
  },
  {
    id: 'rem-2',
    medicineId: 'med-omeprazole',
    medicineName: 'Prilosec (Omeprazole)',
    dosage: '20 mg — 1 Capsule',
    scheduleTime: '08:30 AM',
    timeSlot: 'Morning',
    frequency: 'Daily',
    instructions: 'Take 30 mins before breakfast with a glass of water',
    startDate: '2026-10-10',
    status: 'taken',
    statusTimestamp: '08:32 AM',
    notes: 'Swallow whole, do not crush'
  },
  {
    id: 'rem-3',
    medicineId: 'med-paracetamol',
    medicineName: 'Panadol (Paracetamol)',
    dosage: '500 mg — 1 Tablet',
    scheduleTime: '01:30 PM',
    timeSlot: 'Afternoon',
    frequency: 'As Needed',
    instructions: 'Post-lunch for mild tension headache',
    startDate: '2026-10-24',
    status: 'pending',
    notes: 'Max 2 tablets in 6 hours'
  },
  {
    id: 'rem-4',
    medicineId: 'med-atorvastatin',
    medicineName: 'Lipitor (Atorvastatin)',
    dosage: '20 mg — 1 Tablet',
    scheduleTime: '08:00 PM',
    timeSlot: 'Evening',
    frequency: 'Daily',
    instructions: 'Take after dinner',
    startDate: '2026-09-15',
    status: 'pending',
    notes: 'Cardiology lipid profile regimen'
  },
  {
    id: 'rem-5',
    medicineId: 'med-cetirizine',
    medicineName: 'Zyrtec (Cetirizine)',
    dosage: '10 mg — 1 Tablet',
    scheduleTime: '10:00 PM',
    timeSlot: 'Night',
    frequency: 'Daily',
    instructions: 'Take before bedtime for seasonal allergy relief',
    startDate: '2026-10-18',
    status: 'pending',
    notes: 'May cause drowsiness'
  }
];
