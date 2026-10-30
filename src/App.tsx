import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { MedicineDetailPage } from './pages/MedicineDetailPage';
import { RemindersPage } from './pages/RemindersPage';
import { RecordsPage } from './pages/RecordsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { AssistantPage } from './pages/AssistantPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './auth/LoginPage';
import { SignupPage } from './auth/SignupPage';


export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* Public Pages with Marketing Nav & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Internal Portal App Pages with Sidebar & Topbar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/medicines/:id" element={<MedicineDetailPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
