import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Pill, ArrowLeft, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] flex items-center justify-center mb-6 shadow-md border border-teal-100 dark:border-teal-900/50">
        <Pill className="w-8 h-8 rotate-45" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-2">
        Error 404 • Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] dark:text-white tracking-tight mb-3">
        Page Does Not Exist
      </h1>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        The healthcare information or route you requested cannot be located. It may have moved or the web address was mistyped.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Go to Dashboard</span>
        </Link>

        <Link
          to="/medicines"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm shadow-sm transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Explore Medicines</span>
        </Link>
      </div>
    </div>
  );
};
