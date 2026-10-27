import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Building2,
  Phone,
  Clock,
  Navigation,
  Star,
  ShieldAlert,
  SlidersHorizontal,
  Compass,
  ExternalLink,
  Crosshair
} from 'lucide-react';
import { FacilityCard } from '../components/facilities/FacilityCard';
import { EmptyState } from '../components/common/EmptyState';
import { SAMPLE_FACILITIES } from '../data/facilities';
import { HealthcareFacility, FacilityType } from '../types';

export const FacilitiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility>(SAMPLE_FACILITIES[0]);

  const facilityTypes = ['All', 'Hospital', 'Urgent Care', 'Community Clinic', 'Pharmacy'];

  const filteredFacilities = useMemo(() => {
    return SAMPLE_FACILITIES.filter(fac => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        fac.name.toLowerCase().includes(q) ||
        fac.address.toLowerCase().includes(q) ||
        fac.city.toLowerCase().includes(q) ||
        fac.services.some(s => s.toLowerCase().includes(q));

      const matchesType =
        selectedType === 'All' || fac.type === selectedType;

      const matchesEmergency = !emergencyOnly || fac.emergencyServices;

      return matchesSearch && matchesType && matchesEmergency;
    });
  }, [searchQuery, selectedType, emergencyOnly]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] dark:text-white tracking-tight">
              Healthcare Facilities
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
              {SAMPLE_FACILITIES.length} Sample Care Centers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Discover nearby emergency hospitals, urgent care centers, and dispensing pharmacies with verified contacts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Fictional sample listings for DevFusion demo</span>
        </div>
      </div>

      {/* Interactive Map & Facility Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Preview Canvas */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900 text-white p-6 shadow-card border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Simulated Map Background Grid & Vector Nodes */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>

          {/* Map Top Status */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <Compass className="w-4 h-4 text-[#0D9488] animate-spin-slow" />
              <span>Simulated Geospatial Viewport</span>
            </div>
            <span className="text-xs text-slate-400">
              Lat: {selectedFacility.latitude.toFixed(4)}, Lng: {selectedFacility.longitude.toFixed(4)}
            </span>
          </div>

          {/* Interactive Pin Visualization */}
          <div className="relative z-10 py-8 flex flex-wrap items-center justify-around gap-4">
            {SAMPLE_FACILITIES.map(fac => {
              const isPinned = selectedFacility.id === fac.id;
              return (
                <button
                  key={fac.id}
                  type="button"
                  onClick={() => setSelectedFacility(fac)}
                  className={`group relative flex flex-col items-center transition-transform ${
                    isPinned ? 'scale-110' : 'opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${
                      isPinned
                        ? 'bg-[#0D9488] ring-4 ring-teal-400/30'
                        : fac.emergencyServices
                        ? 'bg-rose-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span
                    className={`mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap ${
                      isPinned
                        ? 'bg-[#0D9488] text-white'
                        : 'bg-slate-800/90 text-slate-300'
                    }`}
                  >
                    {fac.name.split(' ')[0]} ({fac.distanceKm}km)
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Facility Information Overlay */}
          <div className="relative z-10 p-4 rounded-xl bg-slate-800/90 backdrop-blur-md border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-teal-400">
                Selected Facility Pin
              </p>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {selectedFacility.name}
              </h4>
              <p className="text-slate-300 text-xs">
                {selectedFacility.address} • {selectedFacility.operatingHours}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${selectedFacility.name}, ${selectedFacility.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D9488] hover:bg-teal-600 text-white font-semibold transition-colors flex-shrink-0"
            >
              <span>Launch Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Emergency Triage Notice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#102A43] dark:text-white mb-2">
              Immediate Emergency Protocol
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              If you or someone around you is experiencing life-threatening symptoms—such as severe chest pain, sudden numbness, acute breathing difficulty, or anaphylaxis—do not wait for an appointment.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-200 font-semibold flex items-center justify-between">
                <span>Emergency Services</span>
                <span>Call 911 / 112</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Poison Control Helpline</span>
                <span>1-800-222-1222</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 italic">
            *Always verify current emergency department wait times with the facility before non-ambulance travel.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#132235] border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search care centers by name, street, or specialty..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0E1A29] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-1.5">
            {facilityTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-[#0D9488] text-white font-semibold shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 ml-auto md:ml-2">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={e => setEmergencyOnly(e.target.checked)}
              className="rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] w-4 h-4"
            />
            <span>24/7 Trauma Only</span>
          </label>
        </div>
      </div>

      {/* Facilities Grid */}
      {filteredFacilities.length === 0 ? (
        <EmptyState
          title="No Facilities Found"
          description="No healthcare centers match your current filter settings. Try expanding your search or selecting 'All'."
          actionLabel="Show All Facilities"
          onAction={() => {
            setSearchQuery('');
            setSelectedType('All');
            setEmergencyOnly(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFacilities.map(fac => (
            <FacilityCard
              key={fac.id}
              facility={fac}
              isSelected={selectedFacility.id === fac.id}
              onSelectMap={f => setSelectedFacility(f)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
