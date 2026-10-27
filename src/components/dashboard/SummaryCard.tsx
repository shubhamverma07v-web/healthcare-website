import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: string;
  colorVariant?: 'teal' | 'blue' | 'emerald' | 'amber';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorVariant = 'teal'
}) => {
  const getVariants = () => {
    switch (colorVariant) {
      case 'emerald':
        return {
          iconBg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-100 dark:border-emerald-900/30'
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
          border: 'border-blue-100 dark:border-blue-900/30'
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400',
          border: 'border-amber-100 dark:border-amber-900/30'
        };
      case 'teal':
      default:
        return {
          iconBg: 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400',
          border: 'border-teal-100 dark:border-teal-900/30'
        };
    }
  };

  const style = getVariants();

  return (
    <div className={`p-5 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#102A43] dark:text-white">
              {value}
            </span>
            {trend && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {trend}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${style.iconBg} shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
