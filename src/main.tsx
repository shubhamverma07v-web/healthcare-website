import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { SavedMedicinesProvider } from './context/SavedMedicinesContext';
import { RemindersProvider } from './context/RemindersContext';
import { RecordsProvider } from './context/RecordsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <SavedMedicinesProvider>
              <RemindersProvider>
                <RecordsProvider>
                  <App />
                </RecordsProvider>
              </RemindersProvider>
            </SavedMedicinesProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
