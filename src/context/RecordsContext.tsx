
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DigitalRecord } from '../types';
import { useToast } from './ToastContext';

interface RecordsContextType {
  records: DigitalRecord[];
  addRecord: (record: Omit<DigitalRecord, 'id' | 'uploadedAt' | 'isDemoRecord'>) => void;
  deleteRecord: (id: string) => void;
  resetRecords: () => void;
}

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [records, setRecords] = useState<DigitalRecord[]>(() => {
    try {
      const stored = localStorage.getItem('mediguide_records_meta');
      if (!stored) return [];
      return JSON.parse(stored) as DigitalRecord[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mediguide_records_meta', JSON.stringify(records));
    } catch (error) {
      console.error('Could not save records:', error);
    }
  }, [records]);

  const addRecord = (data: Omit<DigitalRecord, 'id' | 'uploadedAt' | 'isDemoRecord'>) => {
    const today = new Date().toISOString().split('T')[0];

    const newRecord: DigitalRecord = {
      ...data,
      id: `rec-${Date.now()}`,
      uploadedAt: today,
      isDemoRecord: false
    };

    setRecords(prev => [newRecord, ...prev]);
    showToast(`Added document: ${data.title}`, 'success');
  };

  const deleteRecord = (id: string) => {
    const doc = records.find(r => r.id === id);
    setRecords(prev => prev.filter(r => r.id !== id));
    showToast(`Removed document: ${doc?.title || 'record'}`, 'info');
  };

  const resetRecords = () => {
    setRecords([]);
    showToast('Health records cleared', 'info');
  };

  return (
    <RecordsContext.Provider value={{ records, addRecord, deleteRecord, resetRecords }}>
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = (): RecordsContextType => {
  const context = useContext(RecordsContext);

  if (!context) {
    throw new Error('useRecords must be used within a RecordsProvider');
  }

  return context;
};
