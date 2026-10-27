import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageMode } from '../types';

interface LanguageContextType {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<LanguageMode, Record<string, string>> = {
  en: {
    'brand.tagline': 'Healthcare information, made simple.',
    'nav.dashboard': 'Dashboard',
    'nav.medicines': 'Medicines',
    'nav.reminders': 'Reminders',
    'nav.records': 'Health Records',
    'nav.facilities': 'Facilities',
    'nav.assistant': 'Assistant',
    'nav.settings': 'Settings',
    'common.search': 'Search medicines, generic names...',
    'common.demo': 'Demo Educational Data',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View Details',
    'common.openNow': 'Open Now',
    'common.emergency247': '24/7 Emergency',
    'dashboard.welcome': 'Welcome back, Alex',
    'dashboard.subtitle': 'Here is your personalized medication overview and adherence tracker for today.',
    'dashboard.todaySchedule': "Today's Medicine Schedule",
    'dashboard.stats.scheduled': 'Scheduled Doses',
    'dashboard.stats.completed': 'Adherence Rate',
    'dashboard.stats.saved': 'Saved Medicines',
    'dashboard.stats.records': 'Digital Records',
    'dashboard.quickActions': 'Quick Health Actions',
    'dashboard.safetyTitle': 'Healthcare Safety Protocol',
    'reminders.add': 'Add Reminder',
    'reminders.markTaken': 'Mark Taken',
    'reminders.markSkipped': 'Skip Dose',
    'reminders.revertPending': 'Set Pending',
    'assistant.title': 'CuraGuide Health Assistant',
    'assistant.disclaimer': 'Informational AI prototype. Not medical advice.',
    'settings.title': 'Preferences & Settings',
    'settings.reset': 'Reset Demo Data',
  },
  hi: {
    'brand.tagline': 'स्वास्थ्य जानकारी, अब हुई आसान।',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.medicines': 'दवाएं',
    'nav.reminders': 'रिमाइंडर',
    'nav.records': 'स्वास्थ्य रिकॉर्ड',
    'nav.facilities': 'स्वास्थ्य केंद्र',
    'nav.assistant': 'हेल्थ सहायक',
    'nav.settings': 'सेटिंग्स',
    'common.search': 'दवा का नाम या सॉल्ट खोजें...',
    'common.demo': 'डेमो शैक्षिक डेटा',
    'common.save': 'सुरक्षित करें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संशोधित करें',
    'common.view': 'विवरण देखें',
    'common.openNow': 'अभी खुला है',
    'common.emergency247': '24/7 आपातकालीन',
    'dashboard.welcome': 'नमस्ते, एलेक्स',
    'dashboard.subtitle': 'यहाँ आज की आपकी दवाओं का विवरण और ट्रैकिंग रिपोर्ट है।',
    'dashboard.todaySchedule': 'आज का दवा शेड्यूल',
    'dashboard.stats.scheduled': 'निर्धारित खुराकें',
    'dashboard.stats.completed': 'नियमितता दर',
    'dashboard.stats.saved': 'सहेजी गई दवाएं',
    'dashboard.stats.records': 'डिजिटल रिकॉर्ड्स',
    'dashboard.quickActions': 'त्वरित स्वास्थ्य क्रियाएं',
    'dashboard.safetyTitle': 'स्वास्थ्य सुरक्षा नियम',
    'reminders.add': 'नया रिमाइंडर जोड़ें',
    'reminders.markTaken': 'दवा ले ली',
    'reminders.markSkipped': 'खुराक छोड़ें',
    'reminders.revertPending': 'लंबित रखें',
    'assistant.title': 'क्यूरागाइड स्वास्थ्य सहायक',
    'assistant.disclaimer': 'शैक्षिक प्रोटोटाइप। यह डॉक्टरी सलाह नहीं है।',
    'settings.title': 'प्राथमिकताएं व सेटिंग्स',
    'settings.reset': 'डेमो डेटा रीसेट करें',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('mediguide_language');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('mediguide_language', language);
  }, [language]);

  const setLanguage = (lang: LanguageMode) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
