
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

interface SavedMedicinesContextType {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string, name?: string) => void;
  clearSaved: () => void;
}

const SavedMedicinesContext = createContext<SavedMedicinesContextType | undefined>(undefined);

export const SavedMedicinesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('mediguide_saved_medicines');
      if (!stored) return [];
      return JSON.parse(stored) as string[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mediguide_saved_medicines', JSON.stringify(savedIds));
    } catch (error) {
      console.error('Could not save medicines:', error);
    }
  }, [savedIds]);

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSave = (id: string, name?: string) => {
    setSavedIds(prev => {
      const exists = prev.includes(id);

      if (exists) {
        showToast(`Removed ${name || 'medicine'} from saved medicines`, 'info');
        return prev.filter(item => item !== id);
      }

      showToast(`Added ${name || 'medicine'} to saved medicines`, 'success');
      return [...prev, id];
    });
  };

  const clearSaved = () => {
    setSavedIds([]);
    showToast('Saved medicines cleared', 'info');
  };

  return (
    <SavedMedicinesContext.Provider
      value={{ savedIds, isSaved, toggleSave, clearSaved }}
    >
      {children}
    </SavedMedicinesContext.Provider>
  );
};

export const useSavedMedicines = (): SavedMedicinesContextType => {
  const context = useContext(SavedMedicinesContext);

  if (!context) {
    throw new Error('useSavedMedicines must be used within a SavedMedicinesProvider');
  }

  return context;
};
