import React from 'react';
import {
  Building2,
  Clock,
  Phone,
  Navigation,
  Star,
  ShieldAlert,
  MapPin,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { HealthcareFacility } from '../../types';

interface FacilityCardProps {
  facility: HealthcareFacility;
  onSelectMap?: (facility: HealthcareFacility) => void;
  isSelected?: boolean;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  facility,
  onSelectMap,
  isSelected
}) => {
  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'Hospital':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40';
      case 'Urgent Care':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40';
      case 'Pharmacy':
        return 'bg-teal-50 text-[#0D9488] border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40';
    }
  };

  const getMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${facility.name}, ${facility.address}, ${facility.city}`
    )}`;
  };

  return (
    <div
      className={`bg-white dark:bg-[#132235] border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'border-[#0D9488] ring-2 ring-teal-500/20'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(facility.type)}`}>
              {facility.type}
            </span>
            {facility.emergencyServices && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
                24/7 Trauma / Emergency
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/40">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{facility.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Facility Name & Location */}
        <h3 className="text-base font-bold text-[#102A43] dark:text-white mb-1">
          {facility.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
          <span>{facility.address}, {facility.city}</span>
        </p>

        {/* Operating hours & Distance */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 mb-3 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="truncate">{facility.operatingHours}</span>
          </div>
          <div className="flex items-center justify-end gap-1.5 font-medium text-slate-700 dark:text-slate-200">
            <span>{facility.distanceKm} km away</span>
          </div>
        </div>

        {/* Services Badges */}
        <div className="space-y-1.5 mb-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Available Capabilities
          </p>
          <div className="flex flex-wrap gap-1.5">
            {facility.services.slice(0, 3).map((srv, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {srv}
              </span>
            ))}
            {facility.services.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded text-slate-400">
                +{facility.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2">
          {facility.phone && (
            <a
              href={`tel:${facility.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#0D9488]" />
              <span>Call</span>
            </a>
          )}
          {onSelectMap && (
            <button
              type="button"
              onClick={() => onSelectMap(facility)}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800 text-[#0D9488] dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              <span>Pin Map</span>
            </button>
          )}
        </div>

        <a
          href={getMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
        >
          <span>Get Directions</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
