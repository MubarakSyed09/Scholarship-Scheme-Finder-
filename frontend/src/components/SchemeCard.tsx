import React, { useState } from 'react';
import type { Scheme, ProfileRequest } from '../types';
import { ProviderBadge, DeadlineBadge } from './Badge';
import { formatINRCompact, getEducationLevelName, generateMatchReasons } from '../utils/helpers';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  Gift,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  profile?: ProfileRequest | null;
  showMatchReasons?: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  profile,
  showMatchReasons = false,
}) => {
  const [docsExpanded, setDocsExpanded] = useState(false);
  const matchReasons = profile ? generateMatchReasons(scheme, profile) : [];

  // 3-4 key eligibility bullets
  const eligibilityBullets: string[] = [];

  // Education bullet
  eligibilityBullets.push(
    scheme.levelMin === scheme.levelMax
      ? `Level: ${getEducationLevelName(scheme.levelMin)}`
      : `Level: ${getEducationLevelName(scheme.levelMin)} to ${getEducationLevelName(scheme.levelMax)}`
  );

  // Category bullet
  if (scheme.categoryAllowed && scheme.categoryAllowed.length > 0) {
    const isAll = scheme.categoryAllowed.some(
      (c) => c.toUpperCase() === 'ALL' || c.toUpperCase() === 'ANY'
    );
    eligibilityBullets.push(
      isAll ? 'Category: All Categories (General/SC/ST/OBC/Minority/PwD)' : `Category: ${scheme.categoryAllowed.join(', ')}`
    );
  }

  // Income bullet
  eligibilityBullets.push(
    scheme.incomeMax
      ? `Income Cap: Annual family income ≤ ${formatINRCompact(scheme.incomeMax)}`
      : 'Income Cap: No family income limit'
  );

  // Marks or Gender bullet
  if (scheme.marksMin) {
    eligibilityBullets.push(`Min Marks: ${scheme.marksMin}% in qualifying exam`);
  } else if (scheme.genderAllowed && scheme.genderAllowed.toUpperCase() !== 'ALL') {
    eligibilityBullets.push(
      scheme.genderAllowed.toUpperCase() === 'FEMALE'
        ? 'Gender: Girl / Female students only'
        : `Gender: ${scheme.genderAllowed}`
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col justify-between">
      <div className="p-6">
        {/* Top meta bar: Provider & Deadline */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <ProviderBadge provider={scheme.provider} state={scheme.state} />
            {scheme.genderAllowed === 'FEMALE' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                Women Only
              </span>
            )}
          </div>
          <DeadlineBadge deadline={scheme.deadline} />
        </div>

        {/* Scheme Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
          {scheme.name}
        </h3>

        {/* Benefit Summary Box */}
        <div className="mb-4 bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-3.5 text-slate-800">
          <div className="flex items-start space-x-2.5">
            <Gift className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                Financial Benefit
              </span>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {scheme.benefitSummary}
              </p>
            </div>
          </div>
        </div>

        {/* "Why You Match" Box (when profile is provided) */}
        {showMatchReasons && matchReasons.length > 0 && (
          <div className="mb-4 bg-blue-50/60 border border-blue-100 rounded-lg p-3">
            <div className="flex items-center space-x-1.5 text-blue-900 font-semibold text-xs mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Why you qualify for this scheme</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {matchReasons.slice(0, 3).map((r, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{r.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Eligibility Bullets */}
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Key Criteria
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            {eligibilityBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start space-x-1.5 bg-slate-50 p-2 rounded-md border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span className="leading-tight">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Collapsible Documents Required */}
        {scheme.docsRequired && scheme.docsRequired.length > 0 && (
          <div className="border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => setDocsExpanded(!docsExpanded)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors py-1 cursor-pointer"
            >
              <div className="flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Documents Needed ({scheme.docsRequired.length})</span>
              </div>
              {docsExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {docsExpanded && (
              <div className="mt-2.5 bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-xs">
                <p className="text-slate-500 font-medium mb-2">Keep scanned copies ready before applying:</p>
                <ul className="space-y-1.5 text-slate-700">
                  {scheme.docsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-blue-600 font-bold shrink-0">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500 flex items-center space-x-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Verification Required</span>
        </span>

        <a
          href={scheme.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-2xs hover:shadow-xs transition-all active:scale-[0.98]"
        >
          <span>Apply Now</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
