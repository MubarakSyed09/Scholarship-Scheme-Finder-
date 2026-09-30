import type { Scheme, ProfileRequest, MatchReason } from '../types';
import { EDUCATION_LEVELS } from './constants';

/**
 * Format currency into Indian Rupee format (e.g. 250000 -> ₹2,50,000)
 */
export function formatINR(amount?: number | null): string {
  if (amount === undefined || amount === null) return 'No limit';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Human-friendly currency shorthand (e.g. ₹2.5 Lakhs)
 */
export function formatINRCompact(amount?: number | null): string {
  if (amount === undefined || amount === null) return 'No cap';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} Lakhs`;
  }
  return formatINR(amount);
}

/**
 * Get readable education level name
 */
export function getEducationLevelName(levelKey: string): string {
  const match = EDUCATION_LEVELS.find((l) => l.value === levelKey);
  return match ? match.label.split('(')[0].trim() : levelKey;
}

/**
 * Generate human-readable "Why you match" explanation reasons
 * comparing the student's profile against scheme eligibility criteria.
 */
export function generateMatchReasons(scheme: Scheme, profile?: ProfileRequest | null): MatchReason[] {
  if (!profile) return [];

  const reasons: MatchReason[] = [];

  // 1. Income match
  if (scheme.incomeMax !== null && scheme.incomeMax !== undefined) {
    reasons.push({
      label: 'Income Eligibility',
      matched: true,
      detail: `Your family income (${formatINRCompact(profile.familyIncome)}) is within the ${formatINRCompact(scheme.incomeMax)} ceiling.`,
    });
  } else {
    reasons.push({
      label: 'Open Income Criteria',
      matched: true,
      detail: 'This scheme has no income cap (open to all income brackets).',
    });
  }

  // 2. Category match
  if (scheme.categoryAllowed && scheme.categoryAllowed.length > 0) {
    const isAll = scheme.categoryAllowed.some(
      (c) => c.toUpperCase() === 'ALL' || c.toUpperCase() === 'ANY'
    );
    if (isAll) {
      reasons.push({
        label: 'Category Match',
        matched: true,
        detail: `Open to all categories including ${profile.category}.`,
      });
    } else {
      reasons.push({
        label: 'Category Match',
        matched: true,
        detail: `You qualify under the ${profile.category} category quota.`,
      });
    }
  }

  // 3. Education level match
  const minName = getEducationLevelName(scheme.levelMin);
  const maxName = getEducationLevelName(scheme.levelMax);
  const levelDetail =
    scheme.levelMin === scheme.levelMax
      ? `Specifically open for ${minName} students.`
      : `Covers education from ${minName} up to ${maxName}.`;

  reasons.push({
    label: 'Academic Level',
    matched: true,
    detail: levelDetail,
  });

  // 4. Marks match
  if (scheme.marksMin !== null && scheme.marksMin !== undefined) {
    reasons.push({
      label: 'Academic Performance',
      matched: true,
      detail: `Your ${profile.marksPercent}% marks satisfies the minimum ${scheme.marksMin}% benchmark.`,
    });
  }

  // 5. Gender criteria
  if (scheme.genderAllowed && scheme.genderAllowed.toUpperCase() === 'FEMALE') {
    reasons.push({
      label: 'Gender Inclusivity',
      matched: true,
      detail: 'Reserved exclusively for women/girl students to promote higher education.',
    });
  }

  // 6. State criteria
  if (scheme.state && scheme.state.trim().length > 0) {
    reasons.push({
      label: 'State Quota',
      matched: true,
      detail: `Domicile benefits applicable for residents of ${scheme.state}.`,
    });
  } else {
    reasons.push({
      label: 'National Scheme',
      matched: true,
      detail: 'Pan-India Central scheme open to students from all Indian States & UTs.',
    });
  }

  return reasons;
}
