import React from 'react';
import type { ProviderType } from '../types';
import { Landmark, MapPin, School, Calendar, Tag } from 'lucide-react';

interface ProviderBadgeProps {
  provider: ProviderType;
  state?: string;
  className?: string;
}

export const ProviderBadge: React.FC<ProviderBadgeProps> = ({ provider, state, className = '' }) => {
  if (provider === 'Central') {
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/80 shadow-2xs ${className}`}>
        <Landmark className="w-3.5 h-3.5 mr-1 text-blue-600" />
        Central Govt
      </span>
    );
  }

  if (provider === 'State') {
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs ${className}`}>
        <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600" />
        State Govt {state ? `(${state})` : ''}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200/80 shadow-2xs ${className}`}>
      <School className="w-3.5 h-3.5 mr-1 text-purple-600" />
      College / University
    </span>
  );
};

interface DeadlineBadgeProps {
  deadline?: string;
}

export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ deadline }) => {
  if (!deadline) return null;

  return (
    <span className="inline-flex items-center text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
      <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" />
      Deadline: {deadline}
    </span>
  );
};

interface TagBadgeProps {
  label: string;
  variant?: 'slate' | 'blue' | 'emerald';
}

export const TagBadge: React.FC<TagBadgeProps> = ({ label, variant = 'slate' }) => {
  const styles = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    blue: 'bg-sky-50 text-sky-800 border-sky-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${styles[variant]}`}>
      <Tag className="w-2.5 h-2.5 mr-1 opacity-60" />
      {label}
    </span>
  );
};
