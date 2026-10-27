export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'medicines' | 'reminders' | 'privacy';
}

export const FAQS_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What is CuraGuide and who is it designed for?',
    answer: 'CuraGuide is a smart healthcare and pharmaceutical information platform designed to simplify medicine literacy, streamline medication adherence with smart reminders, organize digital health records, and connect patients to nearby verified facilities. It serves patients, caregivers, and families seeking an accessible health companion.'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Is CuraGuide a replacement for professional medical consultation?',
    answer: 'No. CuraGuide is strictly an informational and educational platform built for demonstration purposes. It does not provide medical diagnosis, treatment protocols, or personalized clinical advice. Always consult a licensed physician or healthcare professional regarding any medical condition or prescription change.'
  },
  {
    id: 'faq-3',
    category: 'medicines',
    question: 'Where does the medicine information displayed on CuraGuide come from?',
    answer: 'All demonstration medicine profiles cite established public health formularies, including the World Health Organization (WHO) Model List of Essential Medicines, OpenFDA, and national pharmacopeias. Every record is clearly labeled as sample demonstration data for competition review.'
  },
  {
    id: 'faq-4',
    category: 'medicines',
    question: 'Can I check whether a generic medicine has the same effect as a brand-name drug?',
    answer: 'Yes! Our Medicine Explorer and Assistant provide clear explanations of generic bioequivalence. Generic drugs contain the identical active pharmaceutical ingredient (API) in the same strength and dosage form as the originator brand-name product.'
  },
  {
    id: 'faq-5',
    category: 'reminders',
    question: 'How do the medicine reminders work, and will they sound alerts?',
    answer: 'CuraGuide features an interactive daily schedule tracker where you can organize morning, afternoon, evening, and bedtime doses. You can log statuses as Taken, Pending, or Skipped. Reminder preferences and logs persist directly in your browser without transmitting personal health data.'
  },
  {
    id: 'faq-6',
    category: 'privacy',
    question: 'How is patient privacy protected on this platform?',
    answer: 'CuraGuide follows strict privacy-by-design principles. No medical records or prescription documents are uploaded to cloud servers or third-party databases. All mock records, reminder states, and preference toggles remain stored locally in your browser session.'
  },
  {
    id: 'faq-7',
    category: 'privacy',
    question: 'Can I reset or clear all demonstration data at any time?',
    answer: 'Yes. In the Settings tab, you can click "Reset Demo Data" to instantly clear all localStorage reminders and revert the entire application back to its pristine default demonstration state.'
  }
];
