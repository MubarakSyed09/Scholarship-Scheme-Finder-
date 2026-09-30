import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { EDUCATION_LEVELS, INDIAN_STATES } from '../utils/constants';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedProvider: string;
  onProviderChange: (p: string) => void;
  selectedLevel: string;
  onLevelChange: (l: string) => void;
  selectedState: string;
  onStateChange: (s: string) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedProvider,
  onProviderChange,
  selectedLevel,
  onLevelChange,
  selectedState,
  onStateChange,
  onReset,
  totalCount,
  filteredCount,
}) => {
  const isFiltered =
    Boolean(searchQuery) ||
    selectedProvider !== 'ALL' ||
    selectedLevel !== 'ALL' ||
    selectedState !== 'ALL';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="md:col-span-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search schemes by name or keywords..."
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Provider Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedProvider}
            onChange={(e) => onProviderChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Providers (Central, State, College)</option>
            <option value="Central">Central Government Schemes</option>
            <option value="State">State Government Schemes</option>
            <option value="College">College / Institute Fellowships</option>
          </select>
        </div>

        {/* Education Level Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Education Levels</option>
            {EDUCATION_LEVELS.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label.split('(')[0].trim()}
              </option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div className="md:col-span-2">
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All States</option>
            <option value="Central">Pan-India (Central)</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Counter and Reset */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div>
          Showing <span className="font-bold text-slate-800">{filteredCount}</span> of{' '}
          <span className="font-bold text-slate-800">{totalCount}</span> total schemes
          {isFiltered && <span className="text-blue-600 font-medium ml-1.5">(Filtered)</span>}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center space-x-1 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
