import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { Topbar } from '../common/Topbar';
import { MobileNavigation } from '../common/MobileNavigation';
import { ToastContainer } from '../common/ToastContainer';
import { SafetyNotice } from '../common/SafetyNotice';
import {
  LayoutDashboard,
  Pill,
  Clock,
  FileText,
  MapPin,
  Bot,
  Settings,
  X,
  Globe
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.medicines'), path: '/medicines', icon: Pill },
    { name: t('nav.reminders'), path: '/reminders', icon: Clock },
    { name: t('nav.records'), path: '/records', icon: FileText },
    { name: t('nav.facilities'), path: '/facilities', icon: MapPin },
    { name: t('nav.assistant'), path: '/assistant', icon: Bot },
    { name: t('nav.settings'), path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1521] text-[#172B4D] dark:text-[#E2E8F0]">
      {/* Desktop Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#102A43]/50 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-[#101D2D] h-full shadow-2xl z-10 flex flex-col p-4 border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center text-white">
                  <Pill className="w-4 h-4 rotate-45" />
                </div>
                <span className="font-bold text-base text-[#102A43] dark:text-white">
                  Cura<span className="text-[#0D9488]">Guide</span>
                </span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3 flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-xs text-slate-500 font-medium">Bilingual Interface</span>
              <button
                onClick={toggleLanguage}
                className="text-xs font-semibold text-teal-600 flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0D9488] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link
                to="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="block text-center text-xs font-semibold text-slate-500 hover:text-teal-600 py-1"
              >
                ← Back to Public Website
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onToggleMobileMenu={() => setMobileDrawerOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-8 focus:outline-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <SafetyNotice compact />
            <Outlet />
          </div>
        </main>

        {/* Mobile bottom navigation */}
        <MobileNavigation />
      </div>

      <ToastContainer />
    </div>
  );
};
