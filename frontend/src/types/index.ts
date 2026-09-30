export type ProviderType = 'Central' | 'State' | 'College';

export type EducationLevelType =
  | 'CLASS_9_10'
  | 'CLASS_11_12'
  | 'DIPLOMA'
  | 'UG'
  | 'PG'
  | 'RESEARCH';

export type CategoryType =
  | 'General'
  | 'SC'
  | 'ST'
  | 'OBC'
  | 'EBC'
  | 'DNT'
  | 'Minority'
  | 'PwD';

export type CourseStreamType =
  | 'Science'
  | 'Commerce'
  | 'Arts'
  | 'Vocational'
  | 'Technical/Professional';

export type GenderType = 'Male' | 'Female' | 'Other';

export interface Scheme {
  id: number;
  name: string;
  provider: ProviderType;
  state?: string;
  levelMin: string;
  levelMax: string;
  categoryAllowed: string[];
  incomeMax?: number;
  marksMin?: number;
  genderAllowed: string;
  courseStreamsAllowed?: string[];
  benefitSummary: string;
  applyUrl: string;
  deadline?: string;
  docsRequired: string[];
}

export interface ProfileRequest {
  educationLevel: string;
  category: string;
  familyIncome: number;
  marksPercent: number;
  gender: string;
  state: string;
  district?: string;
  courseStream: string;
}

export interface MatchReason {
  label: string;
  matched: boolean;
  detail: string;
}
