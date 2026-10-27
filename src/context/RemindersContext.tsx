import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReminderItem, ReminderStatus } from '../types';
import { INITIAL_REMINDERS } from '../data/reminders';
import { useToast } from './ToastContext';

interface RemindersContextType {
  reminders: ReminderItem[];
  addReminder: (reminder: Omit<ReminderItem, 'id'>) => void;
  updateReminder: (id: string, updated: Partial<ReminderItem>) => void;
  deleteReminder: (id: string) => void;
  updateStatus: (id: string, status: ReminderStatus) => void;
  resetReminders: () => void;
  stats: {
    total: number;
    taken: number;
    pending: number;
    skipped: number;
    adherenceRate: number;
  };
}

const RemindersContext = createContext<RemindersContextType | undefined>(undefined);

export const RemindersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    try {
      const stored = localStorage.getItem('mediguide_reminders');
      return stored ? JSON.parse(stored) : INITIAL_REMINDERS;
    } catch {
      return INITIAL_REMINDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('mediguide_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (data: Omit<ReminderItem, 'id'>) => {
    const newReminder: ReminderItem = {
      ...data,
      id: `rem-${Date.now()}`
    };
    setReminders(prev => [newReminder, ...prev]);
    showToast(`Added schedule reminder for ${data.medicineName}`, 'success');
  };

  const updateReminder = (id: string, updated: Partial<ReminderItem>) => {
    setReminders(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
    showToast('Reminder updated successfully', 'success');
  };

  const deleteReminder = (id: string) => {
    const item = reminders.find(r => r.id === id);
    setReminders(prev => prev.filter(r => r.id !== id));
    showToast(`Removed reminder for ${item?.medicineName || 'medicine'}`, 'info');
  };

  const updateStatus = (id: string, status: ReminderStatus) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setReminders(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          statusTimestamp: status === 'taken' ? now : undefined
        };
      }
      return item;
    }));

    if (status === 'taken') {
      showToast('Logged dose as taken!', 'success');
    } else if (status === 'skipped') {
      showToast('Dose recorded as skipped', 'warning');
    } else {
      showToast('Dose set back to pending', 'info');
    }
  };

  const resetReminders = () => {
    setReminders(INITIAL_REMINDERS);
    localStorage.setItem('mediguide_reminders', JSON.stringify(INITIAL_REMINDERS));
    showToast('Demo reminders reset to initial sample state', 'info');
  };

  const total = reminders.length;
  const taken = reminders.filter(r => r.status === 'taken').length;
  const pending = reminders.filter(r => r.status === 'pending').length;
  const skipped = reminders.filter(r => r.status === 'skipped').length;
  const adherenceRate = total > 0 ? Math.round((taken / total) * 100) : 0;

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        addReminder,
        updateReminder,
        deleteReminder,
        updateStatus,
        resetReminders,
        stats: { total, taken, pending, skipped, adherenceRate }
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = (): RemindersContextType => {
  const context = useContext(RemindersContext);
  if (!context) {
    throw new Error('useReminders must be used within a RemindersProvider');
  }
  return context;
};
