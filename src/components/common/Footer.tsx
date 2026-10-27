import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, ShieldAlert, Heart, ExternalLink, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#102A43] text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0D9488] flex items-center justify-center text-white shadow-md">
                <Pill className="w-5 h-5 rotate-45" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Cura<span className="text-teal-400">Guide</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Healthcare information, made simple. CuraGuide bridges medical literacy and medication adherence with smart reminders, verified reference lookups, and simulated record management.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>DevFusion Innovation Competition 2026</span>
            </div>
          </div>

          {/* Platform Routes */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Patient Dashboard
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="hover:text-white transition-colors">
                  Medicine Explorer
                </Link>
              </li>
              <li>
                <Link to="/reminders" className="hover:text-white transition-colors">
                  Adherence Reminders
                </Link>
              </li>
              <li>
                <Link to="/records" className="hover:text-white transition-colors">
                  Digital Health Records
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-white transition-colors">
                  Healthcare Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Reference & Safety */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Clinical References
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>WHO Essential Meds</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://open.fda.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>OpenFDA Drug API</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://dailymed.nlm.nih.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>NIH DailyMed Labels</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-white transition-colors">
                  Health Literacy AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helpline */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Urgent Medical Help
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24/7 Emergency Numbers</span>
              </div>
              <p className="text-xs text-slate-400">
                For acute chest pain, anaphylaxis, poison ingestion, or severe injury:
              </p>
              <div className="text-sm font-bold text-white tracking-wide">
                911 (US) / 112 (India / EU)
              </div>
              <div className="text-[11px] text-teal-400">
                Poison Control: 1-800-222-1222
              </div>
            </div>
          </div>
        </div>

        {/* Medical & Prototype Disclaimer Banner */}
        <div className="pt-8 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 text-xs text-slate-400">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="leading-relaxed">
              <strong>College Competition Disclaimer:</strong> CuraGuide is an academic demonstration developed for the DevFusion innovation competition. All patient records, medicine listings, schedules, and healthcare facilities are simulated sample records. CuraGuide does not offer medical diagnoses, clinical prescriptions, or verified pharmaceutical guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 CuraGuide Platform. Built for DevFusion Innovation Hackathon.</p>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>for patient health literacy & adherence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
