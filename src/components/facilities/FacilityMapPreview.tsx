import React from 'react';
import { HealthcareFacility } from '../../types';
import { MapPin, Navigation, Compass, Hospital, Info } from 'lucide-react';

interface FacilityMapPreviewProps {
  facilities: HealthcareFacility[];
  selectedFacility: HealthcareFacility | null;
  onSelectFacility: (facility: HealthcareFacility) => void;
}

export const FacilityMapPreview: React.FC<FacilityMapPreviewProps> = ({
  facilities,
  selectedFacility,
  onSelectFacility
}) => {
  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-card">
      {/* SVG Stylized Vector Map */}
      <svg
        className="w-full h-full object-cover opacity-80"
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B192C" />
            <stop offset="100%" stopColor="#08101E" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Map Background Grid */}
        <rect width="100%" height="100%" fill="url(#gridGrad)" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* River / Blue canal feature */}
        <path
          d="M -10 320 Q 200 340 380 280 T 820 220"
          fill="none"
          stroke="#0F766E"
          strokeWidth="24"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Major Medical District Avenues */}
        <path d="M 0 160 L 800 160" stroke="#334155" strokeWidth="6" />
        <path d="M 0 380 L 800 380" stroke="#334155" strokeWidth="5" />
        <path d="M 220 0 L 220 500" stroke="#334155" strokeWidth="5" />
        <path d="M 480 0 L 480 500" stroke="#334155" strokeWidth="7" />
        <path d="M 680 0 L 680 500" stroke="#334155" strokeWidth="4" />

        {/* Secondary Cross-streets */}
        <path d="M 100 80 L 700 420" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="4,4" />
        <path d="M 120 450 L 750 100" stroke="#1E293B" strokeWidth="2" strokeDasharray="5,5" />

        {/* Green Parks */}
        <rect x="70" y="210" width="110" height="90" rx="12" fill="#064E3B" opacity="0.3" />
        <text x="85" y="260" fill="#34D399" fontSize="10" fontFamily="sans-serif" opacity="0.6">
          West Green Park
        </text>

        <rect x="520" y="60" width="130" height="70" rx="10" fill="#064E3B" opacity="0.25" />
        <text x="535" y="100" fill="#34D399" fontSize="10" fontFamily="sans-serif" opacity="0.6">
          Civic Botanical
        </text>

        {/* Street labels */}
        <text x="240" y="150" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
          Health Avenue (Medical Corridor)
        </text>
        <text x="495" y="40" fill="#64748B" fontSize="10" fontFamily="sans-serif">
          Metro Parkway
        </text>
      </svg>

      {/* Interactive Facility Map Pins Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Facility 1: Metro Hope Hospital */}
        <div
          onClick={() => onSelectFacility(facilities[0])}
          className="absolute left-[30%] top-[34%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
        >
          <div className="relative flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl transition-transform transform group-hover:scale-125 ${
                selectedFacility?.id === 'fac-1'
                  ? 'bg-rose-600 ring-4 ring-rose-400/50 scale-125 animate-bounce'
                  : 'bg-rose-500'
              }`}
            >
              <Hospital className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-semibold whitespace-nowrap shadow-md">
              Metro Hope Hospital (24/7 ER)
            </div>
          </div>
        </div>

        {/* Facility 2: Cedar Valley Urgent Care */}
        <div
          onClick={() => onSelectFacility(facilities[1])}
          className="absolute left-[62%] top-[25%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
        >
          <div className="relative flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xl transition-transform transform group-hover:scale-125 ${
                selectedFacility?.id === 'fac-2'
                  ? 'bg-amber-600 ring-4 ring-amber-400/50 scale-125'
                  : 'bg-amber-500'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-semibold whitespace-nowrap shadow-md">
              Cedar Valley Urgent Care
            </div>
          </div>
        </div>

        {/* Facility 3: Apex Care Family Clinic */}
        <div
          onClick={() => onSelectFacility(facilities[2])}
          className="absolute left-[75%] top-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
        >
          <div className="relative flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xl transition-transform transform group-hover:scale-125 ${
                selectedFacility?.id === 'fac-3'
                  ? 'bg-teal-600 ring-4 ring-teal-400/50 scale-125'
                  : 'bg-teal-500'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-semibold whitespace-nowrap shadow-md">
              Apex Care Clinic
            </div>
          </div>
        </div>

        {/* Facility 4: Evergreen Pharmacy */}
        {facilities[3] && (
          <div
            onClick={() => onSelectFacility(facilities[3])}
            className="absolute left-[20%] top-[65%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
          >
            <div className="relative flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xl transition-transform transform group-hover:scale-125 ${
                  selectedFacility?.id === 'fac-4'
                    ? 'bg-emerald-600 ring-4 ring-emerald-400/50 scale-125'
                    : 'bg-emerald-500'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-semibold whitespace-nowrap shadow-md">
                Evergreen 24h Pharmacy
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 bg-[#102A43]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-white flex items-center gap-2">
        <Compass className="w-4 h-4 text-teal-400 animate-spin-slow" />
        <span className="font-semibold">Metro Health Grid (Simulated GPS Radius: 5km)</span>
      </div>

      {/* Map Hint */}
      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-slate-300">
        Click pins to inspect facility details
      </div>
    </div>
  );
};
