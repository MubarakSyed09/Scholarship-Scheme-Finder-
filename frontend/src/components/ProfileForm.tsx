import React, { useState } from 'react';
import type { ProfileRequest } from '../types';
import {
  EDUCATION_LEVELS,
  CATEGORIES,
  GENDERS,
  INDIAN_STATES,
  COURSE_STREAMS,
  DEMO_PROFILES
} from '../utils/constants';
import { formatINR } from '../utils/helpers';
import {
  Sparkles,
  ArrowRight,
  AlertCircle,
  IndianRupee,
  CheckCircle
} from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (profile: ProfileRequest) => void;
  isLoading?: boolean;
  initialValues?: ProfileRequest | null;
}

interface FormErrors {
  educationLevel?: string;
  category?: string;
  familyIncome?: string;
  marksPercent?: string;
  gender?: string;
  state?: string;
  courseStream?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  isLoading = false,
  initialValues,
}) => {
  const [formData, setFormData] = useState<ProfileRequest>(
    initialValues || {
      educationLevel: 'UG',
      category: 'OBC',
      familyIncome: 250000,
      marksPercent: 75,
      gender: 'Female',
      state: 'Maharashtra',
      district: '',
      courseStream: 'Technical/Professional',
    }
  );

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Please select your current education level.';
    }

    if (!formData.category) {
      newErrors.category = 'Please choose your social reservation category.';
    }

    if (formData.familyIncome === undefined || formData.familyIncome === null || formData.familyIncome < 0) {
      newErrors.familyIncome = 'Please provide a valid annual family income (0 or above).';
    } else if (formData.familyIncome > 50000000) {
      newErrors.familyIncome = 'Income exceeds reasonable range for student scholarship grants.';
    }

    if (
      formData.marksPercent === undefined ||
      formData.marksPercent === null ||
      formData.marksPercent < 0 ||
      formData.marksPercent > 100
    ) {
      newErrors.marksPercent = 'Marks percentage must be between 0% and 100%.';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender.';
    }

    if (!formData.state) {
      newErrors.state = 'Please select your state of domicile.';
    }

    if (!formData.courseStream) {
      newErrors.courseStream = 'Please select your course stream.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleDemoSelect = (sampleData: ProfileRequest) => {
    setFormData({ ...sampleData });
    setErrors({});
  };

  const handleIncomePreset = (val: number) => {
    setFormData({ ...formData, familyIncome: val });
    if (errors.familyIncome) {
      setErrors({ ...errors, familyIncome: undefined });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      {/* Demo Profiles Quick Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Quick test with real student sample profiles:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_PROFILES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDemoSelect(sample.data as ProfileRequest)}
                className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 transition-all shadow-2xs"
                title={sample.description}
              >
                {sample.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Current Education Level <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.educationLevel}
              onChange={(e) => {
                setFormData({ ...formData, educationLevel: e.target.value });
                if (errors.educationLevel) setErrors({ ...errors, educationLevel: undefined });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.educationLevel ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300'
              }`}
            >
              <option value="">Select your education level...</option>
              {EDUCATION_LEVELS.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </option>
              ))}
            </select>
            {errors.educationLevel ? (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.educationLevel}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">From Class 9 up to PhD Research.</p>
            )}
          </div>

          {/* Social Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Social Category / Caste Group <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
                if (errors.category) setErrors({ ...errors, category: undefined });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.category ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300'
              }`}
            >
              <option value="">Select your category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category ? (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.category}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">Government schemes are targeted by reserved categories.</p>
            )}
          </div>

          {/* Family Annual Income */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Annual Family Income (INR) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {formatINR(formData.familyIncome)} / yr
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="0"
                step="10000"
                value={formData.familyIncome === 0 ? '0' : formData.familyIncome || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                  setFormData({ ...formData, familyIncome: isNaN(val) ? 0 : val });
                  if (errors.familyIncome) setErrors({ ...errors, familyIncome: undefined });
                }}
                placeholder="e.g. 250000"
                className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.familyIncome ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
            </div>
            {/* Quick Income Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 mr-1">Caps:</span>
              {[100000, 200000, 250000, 350000, 450000, 800000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleIncomePreset(amt)}
                  className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                    formData.familyIncome === amt
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  }`}
                >
                  ₹{(amt / 100000).toFixed(1)}L
                </button>
              ))}
            </div>
            {errors.familyIncome && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.familyIncome}</span>
              </p>
            )}
          </div>

          {/* Marks Percentage */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Qualifying Marks Percentage (%) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {formData.marksPercent}%
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="35"
                max="100"
                value={formData.marksPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setFormData({ ...formData, marksPercent: val });
                  if (errors.marksPercent) setErrors({ ...errors, marksPercent: undefined });
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={formData.marksPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setFormData({ ...formData, marksPercent: isNaN(val) ? 0 : val });
                  if (errors.marksPercent) setErrors({ ...errors, marksPercent: undefined });
                }}
                className="w-16 px-2.5 py-1 text-sm font-semibold text-center border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.marksPercent ? (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.marksPercent}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">Aggregate % in your latest completed grade/board exam.</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Gender <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, gender: g.value });
                    if (errors.gender) setErrors({ ...errors, gender: undefined });
                  }}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    formData.gender === g.value
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            {errors.gender && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.gender}</span>
              </p>
            )}
          </div>

          {/* Course Stream */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Course Stream / Discipline <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.courseStream}
              onChange={(e) => {
                setFormData({ ...formData, courseStream: e.target.value });
                if (errors.courseStream) setErrors({ ...errors, courseStream: undefined });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.courseStream ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300'
              }`}
            >
              <option value="">Select your course stream...</option>
              {COURSE_STREAMS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            {errors.courseStream ? (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.courseStream}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">e.g., Engineering, Medicine, Pure Sciences, Commerce, Arts.</p>
            )}
          </div>

          {/* State of Domicile */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              State of Domicile / Residence <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => {
                setFormData({ ...formData, state: e.target.value });
                if (errors.state) setErrors({ ...errors, state: undefined });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.state ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300'
              }`}
            >
              <option value="">Select Indian State / UT...</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state ? (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.state}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">State where you hold a native domicile certificate.</p>
            )}
          </div>

          {/* District (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              District <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.district || ''}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              placeholder="e.g. Pune, Visakhapatnam, Lucknow"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-[11px] text-slate-500">Used for district-level minority or tribal verification.</p>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Instant rule evaluation • No email or phone number required</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Matching Schemes...</span>
              </>
            ) : (
              <>
                <span>Find Eligible Schemes</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
