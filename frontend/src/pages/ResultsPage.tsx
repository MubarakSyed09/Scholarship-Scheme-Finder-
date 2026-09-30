import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import type { ProfileRequest, Scheme } from '../types';
import { SchemeCard } from '../components/SchemeCard';
import { formatINRCompact, getEducationLevelName } from '../utils/helpers';
import {
  ArrowLeft,
  Search,
  RotateCcw,
  AlertTriangle,
  Compass,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Load state from navigation or restore from sessionStorage
  const [profile] = useState<ProfileRequest | null>(() => {
    if (location.state?.profile) return location.state.profile;
    const saved = sessionStorage.getItem('student_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [schemes] = useState<Scheme[]>(() => {
    if (location.state?.schemes) return location.state.schemes;
    const saved = sessionStorage.getItem('matched_schemes');
    return saved ? JSON.parse(saved) : [];
  });

  const [providerFilter, setProviderFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // If page was loaded directly without profile, redirect to enter profile
  useEffect(() => {
    if (!profile) {
      navigate('/profile');
    }
  }, [profile, navigate]);

  if (!profile) {
    return null;
  }

  // Filter schemes
  const filteredSchemes = schemes.filter((scheme) => {
    if (providerFilter !== 'ALL' && scheme.provider !== providerFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = scheme.name.toLowerCase().includes(q);
      const benefitMatch = scheme.benefitSummary.toLowerCase().includes(q);
      const stateMatch = scheme.state?.toLowerCase().includes(q) || false;
      if (!nameMatch && !benefitMatch && !stateMatch) return false;
    }
    return true;
  });

  const centralCount = schemes.filter((s) => s.provider === 'Central').length;
  const stateCount = schemes.filter((s) => s.provider === 'State').length;
  const collegeCount = schemes.filter((s) => s.provider === 'College').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Navigation & Profile Summary */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <Link
            to="/profile"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Profile & Search Again</span>
          </Link>

          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 w-fit">
            Rules Evaluated on Official NSP & State Norms
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                <span>Active Student Profile</span>
              </div>
              {/* Profile Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  {getEducationLevelName(profile.educationLevel)}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                  Category: {profile.category}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Income: {formatINRCompact(profile.familyIncome)}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                  Marks: {profile.marksPercent}%
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  {profile.gender}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {profile.state}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  {profile.courseStream}
                </span>
              </div>
            </div>

            <Link
              to="/profile"
              className="inline-flex items-center justify-center space-x-1 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Modify Details</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Results Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Based on your profile, you likely qualify for these schemes:
        </h1>
        <p className="text-sm text-slate-600 mt-1.5">
          Sorted by Central schemes first, followed by State and College opportunities.
        </p>
      </div>

      {/* Filter and Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Provider Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setProviderFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              providerFilter === 'ALL'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Matched ({schemes.length})
          </button>
          <button
            type="button"
            onClick={() => setProviderFilter('Central')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              providerFilter === 'Central'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Central ({centralCount})
          </button>
          <button
            type="button"
            onClick={() => setProviderFilter('State')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              providerFilter === 'State'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            State ({stateCount})
          </button>
          <button
            type="button"
            onClick={() => setProviderFilter('College')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              providerFilter === 'College'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            College / Fellowships ({collegeCount})
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in matched results..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results List */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              profile={profile}
              showMatchReasons={true}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No matching schemes found for this combination
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We couldn’t find an exact match under your specific criteria ({getEducationLevelName(profile.educationLevel)}, Category: {profile.category}, Family Income: {formatINRCompact(profile.familyIncome)}).
            </p>
          </div>

          {/* Actionable suggestions */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">Recommended next steps:</span>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Higher income brackets may qualify for open merit-based scholarships or national research fellowships.</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Check if your university has specific institutional endowment grants or alumni support funds.</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Browse our directory of all schemes to explore relaxing individual parameters.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/profile"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-xs hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Adjust Your Profile</span>
            </Link>
            <Link
              to="/all-schemes"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              <span>Browse All 27+ Schemes</span>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Exploration Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">Want to see all schemes in the database?</h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Explore our complete database of Central, State, and College scholarship programs.
          </p>
        </div>
        <Link
          to="/all-schemes"
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-lg bg-white text-blue-700 font-semibold text-xs border border-blue-200 hover:bg-blue-50 shadow-2xs transition-colors shrink-0"
        >
          <span>View All Schemes</span>
          <Compass className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
