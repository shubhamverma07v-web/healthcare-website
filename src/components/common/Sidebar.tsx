import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Pill,
  Clock,
  FileText,
  MapPin,
  Bot,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useReminders } from '../../context/RemindersContext';
import { useSavedMedicines } from '../../context/SavedMedicinesContext';
import { useRecords } from '../../context/RecordsContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { t } = useLanguage();
  const { stats } = useReminders();
  const { savedIds } = useSavedMedicines();
  const { records } = useRecords();

  const navItems = [
    {
      name: t('nav.dashboard'),
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: t('nav.medicines'),
      path: '/medicines',
      icon: Pill,
      badge: savedIds.length > 0 ? `${savedIds.length} saved` : null
    },
    {
      name: t('nav.reminders'),
      path: '/reminders',
      icon: Clock,
      badge: stats.pending > 0 ? `${stats.pending} due` : null,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
    },
    {
      name: t('nav.records'),
      path: '/records',
      icon: FileText,
      badge: `${records.length} docs`
    },
    {
      name: t('nav.facilities'),
      path: '/facilities',
      icon: MapPin,
      badge: '5 near'
    },
    {
      name: t('nav.assistant'),
      path: '/assistant',
      icon: Bot,
      badge: 'Bilingual'
    },
    {
      name: t('nav.settings'),
      path: '/settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-white dark:bg-[#101D2D] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D9488] to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 flex-shrink-0">
            <Pill className="w-5 h-5 rotate-45" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-bold text-lg tracking-tight text-[#102A43] dark:text-white">
                Cura<span className="text-[#0D9488]">Guide</span>
              </span>
              <span className="block text-[10px] text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wider">
                DevFusion Demo
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                  isActive
                    ? 'bg-[#0D9488] text-white shadow-sm shadow-teal-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-[#102A43] dark:hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? item.name : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400 group-hover:text-teal-600'
                    }`}
                  />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between truncate">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            isActive
                              ? 'bg-teal-700/60 text-white'
                              : item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Educational Prototype Card */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-2xl bg-teal-50/60 dark:bg-slate-800/40 border border-teal-100 dark:border-slate-700/60">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#102A43] dark:text-slate-200">
                Simulated Sandbox
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Data persists in your local browser only. No external PHI storage.
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="mt-3 flex items-center justify-between text-[11px] font-semibold text-teal-700 dark:text-teal-300 hover:underline"
          >
            <span>Public Home</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}
    </aside>
  );
};
