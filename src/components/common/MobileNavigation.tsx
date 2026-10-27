import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Pill, Clock, FileText, Bot } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MobileNavigation: React.FC = () => {
  const { t } = useLanguage();

  const links = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.medicines'), path: '/medicines', icon: Pill },
    { name: t('nav.reminders'), path: '/reminders', icon: Clock },
    { name: t('nav.records'), path: '/records', icon: FileText },
    { name: t('nav.assistant'), path: '/assistant', icon: Bot },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#101D2D]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {links.map(link => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'text-[#0D9488] font-semibold dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-[10px] tracking-tight">{link.name}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
