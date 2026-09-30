import React, { useState, useEffect } from 'react';
import type { Scheme } from '../types';
import { fetchAllSchemes } from '../services/api';
import { FilterBar } from '../components/FilterBar';
import { SchemeCard } from '../components/SchemeCard';
import { Layers, AlertCircle, Compass, RefreshCw } from 'lucide-react';

export const AllSchemesPage: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');

  const loadSchemes = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchAllSchemes();
      setSchemes(data);
    } catch (err: any) {
      console.error('Failed to load all schemes:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the backend server. Please make sure Spring Boot is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedProvider('ALL');
    setSelectedLevel('ALL');
    setSelectedState('ALL');
  };

  // Helper rank for level comparison
  const levelOrder: Record<string, number> = {
    CLASS_9_10: 1,
    CLASS_11_12: 2,
    DIPLOMA: 3,
    UG: 4,
    PG: 5,
    RESEARCH: 6,
  };

  const filteredSchemes = schemes.filter((scheme) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = scheme.name.toLowerCase().includes(q);
      const matchBenefit = scheme.benefitSummary.toLowerCase().includes(q);
      const matchCategory = scheme.categoryAllowed.some((c) => c.toLowerCase().includes(q));
      if (!matchName && !matchBenefit && !matchCategory) return false;
    }

    // 2. Provider Filter
    if (selectedProvider !== 'ALL' && scheme.provider !== selectedProvider) {
      return false;
    }

    // 3. Education Level Filter
    if (selectedLevel !== 'ALL') {
      const targetRank = levelOrder[selectedLevel];
      const minRank = levelOrder[scheme.levelMin] || 0;
      const maxRank = levelOrder[scheme.levelMax] || 99;
      if (targetRank < minRank || targetRank > maxRank) {
        return false;
      }
    }

    // 4. State Filter
    if (selectedState !== 'ALL') {
      if (selectedState === 'Central') {
        if (scheme.provider !== 'Central' && scheme.state) return false;
      } else {
        if (!scheme.state || scheme.state.toLowerCase() !== selectedState.toLowerCase()) {
          return false;
        }
      }
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
          <Layers className="w-3.5 h-3.5" />
          <span>Complete Repository</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Directory of All Government & College Schemes
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Browse the full directory of central, state, and institutional scholarship programs.
          Use the filters below to explore schemes by provider, academic qualification, or state.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProvider={selectedProvider}
        onProviderChange={setSelectedProvider}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        onReset={handleResetFilters}
        totalCount={schemes.length}
        filteredCount={filteredSchemes.length}
      />

      {/* Error state */}
      {errorMessage && (
        <div className="p-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Failed to load schemes</span>
              <span>{errorMessage}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={loadSchemes}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading Indian scholarship schemes from database...</p>
        </div>
      ) : filteredSchemes.length > 0 ? (
        /* Scheme Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              profile={null}
              showMatchReasons={false}
            />
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <Compass className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No schemes matched your filters</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search keywords, broadening your state selection, or resetting the filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
