import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  Clock,
  FileText,
  MapPin,
  Bot,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Lock,
  Layers,
  Award
} from 'lucide-react';
import { FAQS_LIST } from '../data/faqs';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800 text-xs font-semibold text-[#0D9488] dark:text-teal-300 shadow-subtle">
            <Award className="w-3.5 h-3.5" />
            <span>DevFusion Healthcare Innovation Entry</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102A43] dark:text-white tracking-tight leading-[1.15]">
            Healthcare information,{' '}
            <span className="text-[#0D9488] underline decoration-teal-300 dark:decoration-teal-700 underline-offset-4">
              made simple.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CuraGuide helps you navigate prescription medications, organize daily dosage routines, securely store health documents locally, and locate verified nearby care centers—all in one accessible interface.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/medicines"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-semibold text-sm sm:text-base shadow-md shadow-teal-600/20 hover:shadow-lg transition-all"
            >
              <span>Explore Medicines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm sm:text-base shadow-sm transition-all"
            >
              <span>Open Dashboard</span>
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
              WHO Model Formulary Grounded
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
              Zero-Cloud Local Privacy
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
              Bilingual English & Hindi
            </span>
          </div>
        </div>

        {/* Healthcare Dashboard Live Preview Mockup */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto rounded-2xl p-2 sm:p-3 bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/80 dark:border-slate-700/80 shadow-2xl">
          <div className="rounded-xl bg-white dark:bg-[#0E1A29] border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Mock Top bar */}
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#132235]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono text-slate-400">curaguide.health/dashboard</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0D9488] bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                Live Prototype Preview
              </span>
            </div>

            {/* Mock Dashboard Body */}
            <div className="p-4 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/40">
                  <p className="text-[11px] text-teal-800 dark:text-teal-300 font-semibold">Today's Doses</p>
                  <p className="text-xl sm:text-2xl font-bold text-teal-900 dark:text-teal-100 mt-1">4 Doses</p>
                  <p className="text-[10px] text-teal-700 dark:text-teal-400">75% Adherence today</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                  <p className="text-[11px] text-blue-800 dark:text-blue-300 font-semibold">Saved Drugs</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">8 Cataloged</p>
                  <p className="text-[10px] text-blue-700 dark:text-blue-400">Reference guides</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">Digital Vault</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">4 Records</p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400">Zero cloud storage</p>
                </div>
                <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40">
                  <p className="text-[11px] text-purple-800 dark:text-purple-300 font-semibold">Nearby Care</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">5 Verified</p>
                  <p className="text-[10px] text-purple-700 dark:text-purple-400">Hospitals & clinics</p>
                </div>
              </div>

              {/* Sample reminder row preview */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A43] dark:text-white">
                      Glucophage (Metformin HCl) — 500mg
                    </h4>
                    <p className="text-xs text-slate-500">Morning Dose • 08:00 AM • Prescribed after meal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Taken at 08:15 AM
                  </span>
                  <Link
                    to="/dashboard"
                    className="text-xs font-semibold text-[#0D9488] hover:underline"
                  >
                    Open Live Tracker →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-2">
            Engineered For Clarity
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43] dark:text-white">
            Comprehensive Tools for Healthcare Literacy
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Every feature is designed with clear visual hierarchy, accessible contrast, and verified educational references.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] flex items-center justify-center mb-4">
              <Pill className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[#102A43] dark:text-white mb-2">
              Medicine Explorer
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Search by brand or generic salt name. View verified therapeutic indications, side-effect profiles, and official references.
            </p>
            <Link
              to="/medicines"
              className="text-xs font-semibold text-[#0D9488] inline-flex items-center gap-1 hover:underline"
            >
              Browse Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[#102A43] dark:text-white mb-2">
              Adherence Reminders
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Organize daily dosages into Morning, Afternoon, Evening, and Night routines. Log statuses as Taken, Pending, or Skipped.
            </p>
            <Link
              to="/reminders"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 hover:underline"
            >
              Manage Schedule <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[#102A43] dark:text-white mb-2">
              Digital Health Records
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Organize prescriptions, laboratory reports, and discharge summaries with client-side zero-cloud metadata protection.
            </p>
            <Link
              to="/records"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline"
            >
              Open Vault <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[#102A43] dark:text-white mb-2">
              Healthcare Facilities
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Quickly discover nearby trauma centers, community urgent care clinics, and pharmacies with direct navigation links.
            </p>
            <Link
              to="/facilities"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 inline-flex items-center gap-1 hover:underline"
            >
              Explore Map <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100/70 dark:bg-[#0E1A29] py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-2">
              Seamless Workflow
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43] dark:text-white">
              How CuraGuide Simplifies Your Care
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-[#0D9488] font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-base text-[#102A43] dark:text-white">
                Look Up Your Medication
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter any trade name or active salt to review essential guidance, proper administration instructions, and storage rules.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-[#0D9488] font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-base text-[#102A43] dark:text-white">
                Set Adherence Routine
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                With a single click, convert medicine details into custom reminders across your day. Track daily adherence without double dosing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-[#0D9488] font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-base text-[#102A43] dark:text-white">
                Access Care & AI Answers
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Consult our bilingual educational AI for medication leaflet clarity or find emergency facilities within seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Privacy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#102A43] to-[#0A1826] text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy & Ethics By Design</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Built for Competition Excellence & Patient Trust
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              CuraGuide follows ethical software engineering practices. All demonstration records, reminders, and preference toggles are strictly isolated to your local client browser session. No medical files or sensitive data are uploaded to external databases.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-teal-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                No Account Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Zero Tracking Cookies
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Instant Data Reset Button
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-2">
            Got Questions?
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43] dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS_LIST.map(faq => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#132235] overflow-hidden transition-all shadow-subtle"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-[#102A43] dark:text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0D9488] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
