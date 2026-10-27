import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  Menu,
  Pill,
  Clock,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useReminders } from '../../context/RemindersContext';

interface TopbarProps {
  onToggleMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { reminders, stats } = useReminders();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/medicines');
    }
  };

  const pendingReminders = reminders.filter(r => r.status === 'pending');

  return (
    <header className="h-16 bg-white dark:bg-[#101D2D] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Left: Mobile trigger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Quick Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search medicines, generic ingredients..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white dark:focus:bg-[#132235] transition-all"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-400 bg-slate-200/70 dark:bg-slate-700 hover:text-slate-700"
          >
            Enter
          </button>
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language switch */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-teal-600" />
          <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingReminders.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#132235] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold text-[#102A43] dark:text-white">Reminders & Alerts</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {stats.pending} Due
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                {pendingReminders.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
                    All scheduled doses for today have been taken!
                  </div>
                ) : (
                  pendingReminders.map(rem => (
                    <Link
                      key={rem.id}
                      to="/reminders"
                      onClick={() => setShowNotifications(false)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {rem.medicineName}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {rem.scheduleTime} • {rem.dosage}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  to="/reminders"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-teal-600 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Schedule Manager</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Fictional User Profile Pill */}
        <Link
          to="/settings"
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            AM
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">
              Alex Morgan
            </span>
            <span className="text-[10px] text-slate-400 leading-none">Demo Account</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
