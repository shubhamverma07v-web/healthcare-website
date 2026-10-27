import { HealthcareFacility } from '../types';

export const SAMPLE_FACILITIES: HealthcareFacility[] = [
  {
    id: 'fac-1',
    name: 'Metro Hope Multi-Specialty Hospital',
    type: 'Hospital',
    address: '402 Health Avenue, Medical District',
    city: 'Metro City, MC 56001',
    phone: '+1 (555) 234-5678',
    operatingHours: 'Open 24/7 (Emergency & Trauma)',
    isOpenNow: true,
    emergencyServices: true,
    isDemoData: true,
    distanceKm: 1.8,
    rating: 4.8,
    latitude: 37.7749,
    longitude: -122.4194,
    services: [
      '24/7 Level 1 Emergency Trauma',
      'Cardiology & Catheterization Lab',
      'Intensive Care Unit (ICU)',
      'Digital Imaging & MRI'
    ]
  },
  {
    id: 'fac-2',
    name: 'Cedar Valley Community Urgent Care',
    type: 'Urgent Care',
    address: '815 Elmwood Boulevard, Suite 100',
    city: 'Metro City, MC 56004',
    phone: '+1 (555) 345-6789',
    operatingHours: '07:00 AM – 11:00 PM Daily',
    isOpenNow: true,
    emergencyServices: false,
    isDemoData: true,
    distanceKm: 3.2,
    rating: 4.6,
    latitude: 37.7849,
    longitude: -122.4094,
    services: [
      'Minor Injury & Laceration Treatment',
      'Rapid Strep & Flu Diagnostics',
      'On-site Digital X-Ray',
      'Walk-in Consultations'
    ]
  },
  {
    id: 'fac-3',
    name: 'Apex Care Family Clinic & Diagnostics',
    type: 'Community Clinic',
    address: '124 Greenpark Way, Westview',
    city: 'Metro City, MC 56012',
    phone: '+1 (555) 456-7890',
    operatingHours: '08:30 AM – 06:00 PM (Mon-Sat)',
    isOpenNow: true,
    emergencyServices: false,
    isDemoData: true,
    distanceKm: 4.5,
    rating: 4.7,
    latitude: 37.7649,
    longitude: -122.4294,
    services: [
      'Primary Care & Preventive Screenings',
      'Chronic Disease Management (Diabetes/BP)',
      'Pediatric Care & Immunization',
      'Routine Blood Pathology'
    ]
  },
  {
    id: 'fac-4',
    name: 'Evergreen 24-Hour Wellness Pharmacy',
    type: 'Pharmacy',
    address: '67 Sunrise Road, Crossroads Corner',
    city: 'Metro City, MC 56002',
    phone: '+1 (555) 567-8901',
    operatingHours: 'Open 24/7 (Prescription Dispensation)',
    isOpenNow: true,
    emergencyServices: false,
    isDemoData: true,
    distanceKm: 0.9,
    rating: 4.9,
    latitude: 37.7799,
    longitude: -122.4144,
    services: [
      '24/7 Prescription Dispensing',
      'Pharmacist Medication Counseling',
      'Blood Pressure Kiosk',
      'Over-the-Counter Healthcare Supplies'
    ]
  },
  {
    id: 'fac-5',
    name: 'St. Jude Community Charitable Dispensary',
    type: 'Community Clinic',
    address: '99 Mission Lane, Northgate',
    city: 'Metro City, MC 56015',
    phone: '+1 (555) 678-9012',
    operatingHours: '09:00 AM – 05:00 PM (Mon-Fri)',
    isOpenNow: false,
    emergencyServices: false,
    isDemoData: true,
    distanceKm: 6.1,
    rating: 4.5,
    latitude: 37.7549,
    longitude: -122.4394,
    services: [
      'Subsidized Generic Medicine Access',
      'Geriatric Health Checkups',
      'Nutrition Counseling',
      'Community Health Outreach'
    ]
  }
];
