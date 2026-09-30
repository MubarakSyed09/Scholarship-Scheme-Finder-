import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../components/ProfileForm';
import type { ProfileRequest, Scheme } from '../types';
import { fetchEligibleSchemes } from '../services/api';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Retrieve saved profile if returning
  const savedProfileStr = sessionStorage.getItem('student_profile');
  const initialValues: ProfileRequest | null = savedProfileStr ? JSON.parse(savedProfileStr) : null;

  const handleProfileSubmit = async (profile: ProfileRequest) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const results: Scheme[] = await fetchEligibleSchemes(profile);
      // Persist in sessionStorage for results page restoration and back navigation
      sessionStorage.setItem('student_profile', JSON.stringify(profile));
      sessionStorage.setItem('matched_schemes', JSON.stringify(results));

      navigate('/results', {
        state: {
          profile,
          schemes: results,
        },
      });
    } catch (err: any) {
      console.error('Error during scheme matching:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the matching backend service. Please check your network or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
          Step 1 of 2: Student Profile
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Enter Your Profile for Eligibility Matching
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Provide your current academic qualification, social category, annual family income,
          and domicile state. Our engine runs instant eligibility verification against all official schemes.
        </p>
      </div>

      {/* Error notification if API failed */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Failed to fetch matching schemes</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Main Profile Form */}
      <ProfileForm
        onSubmit={handleProfileSubmit}
        isLoading={isLoading}
        initialValues={initialValues}
      />

      {/* Privacy note */}
      <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-center space-x-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <p>
          <strong>Privacy Guarantee:</strong> We do not store, track, or share your financial or personal details.
          All eligibility checks are calculated in-memory for your active session only.
        </p>
      </div>
    </div>
  );
};
