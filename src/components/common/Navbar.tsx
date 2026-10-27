import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pill, Sun, Moon, Globe, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isPublicHome = location.pathname === '/';

  const navLinks = [
    { name: 'Medicines', path: '/medicines' },
    { name: 'Reminders', path: '/reminders' },
    { name: 'Health Records', path: '/records' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'AI Assistant', path: '/assistant' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0E1A29]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D9488] to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Pill className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-[#102A43] dark:text-white">
                  Cura<span className="text-[#0D9488]">Guide</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
                  DevFusion
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block -mt-0.5">
                {t('brand.tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#0D9488] bg-teal-50 dark:bg-teal-950/50'
                      : 'text-slate-600 hover:text-[#102A43] dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Controls & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Switch Language (English / Hindi)"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* CTA */}
            {isPublicHome ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-sm transition-all shadow-teal-600/20 hover:shadow"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/medicines"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-sm transition-all shadow-teal-600/20 hover:shadow"
              >
                <span>Find Medicines</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1A29] px-4 pt-2 pb-5 space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Navigation Menu
            </span>
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-teal-600"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'en' ? 'हिन्दी में देखें' : 'Switch to English'}
            </button>
          </div>

          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-[#0D9488] font-semibold text-sm"
          >
            <span>Open Main Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800"
            >
              Settings & Demo Preferences
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>DevFusion 2026 Academic Health Prototype</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
