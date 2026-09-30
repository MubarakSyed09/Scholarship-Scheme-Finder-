import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold mb-6 border border-blue-200/60 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Dedicated Discovery Engine for Indian Students</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Find scholarships you’re{' '}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
              actually eligible for
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 mb-10 leading-relaxed">
            Answer 6–7 quick questions. Get a personalized list of government & college schemes
            with direct apply links, exact document checklists, and eligibility rationale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/profile"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <span>Start Now — Check Eligibility</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/all-schemes"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-300 transition-colors shadow-2xs"
            >
              <Compass className="w-4 h-4 text-slate-500" />
              <span>Browse All Schemes</span>
            </Link>
          </div>

          {/* Micro Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-200 text-left">
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-2xl font-bold text-slate-900">25+</div>
              <div className="text-xs text-slate-500 font-medium">Verified Active Schemes</div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-2xl font-bold text-slate-900">₹1.25L</div>
              <div className="text-xs text-slate-500 font-medium">Max Annual Grants</div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-2xl font-bold text-slate-900">3-Tier</div>
              <div className="text-xs text-slate-500 font-medium">Central, State & College</div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-2xl font-bold text-emerald-600">0 Sign-in</div>
              <div className="text-xs text-slate-500 font-medium">100% Free & Anonymous</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            How Eligible Schemes Finder Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No more digging through 80-page government gazettes or complex criteria charts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-lg mb-5">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Enter Your Profile</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tell us your education level (Class 9 to PhD), annual family income, category (SC, ST, OBC, General), state, and course stream. Takes under 45 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold text-lg mb-5">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Rule Matching</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our backend rules engine evaluates your eligibility criteria against income ceilings, quota reservations, minimum marks cutoffs, and state domicile policies.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-bold text-lg mb-5">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Apply Directly on Portals</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              See why you qualify, prepare your required documents with our checklist, and click straight to the official National Scholarship Portal or State site.
            </p>
          </div>
        </div>
      </section>

      {/* Realities & Myths Highlight */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">
                Did You Know?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                Thousands of crores in education aid go unclaimed each year.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Most students assume scholarships are strictly for 95%+ board toppers. In reality, over 65% of Central and State schemes are <strong>means-tested</strong> (income & category based) requiring standard passing marks of 50–60%.
              </p>
              <Link
                to="/profile"
                className="inline-flex items-center space-x-2 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-lg transition-colors"
              >
                <span>Check What You Qualify For</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3.5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200">
                  <strong>Post-Matric (SC/ST/OBC):</strong> Reimburses up to 100% of compulsory college tuition plus maintenance allowances.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200">
                  <strong>AICTE Pragati:</strong> Grants ₹50,000/yr to eligible female engineering and diploma students.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200">
                  <strong>State Fee Reimbursement:</strong> Programs like AP Jagananna Vidya Deevena & MahaDBT cover higher degree costs.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA bottom */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          Ready to discover your education benefits?
        </h3>
        <p className="text-slate-600 text-sm mb-6 max-w-xl mx-auto">
          Start your free search now. No account creation or personal phone numbers needed.
        </p>
        <Link
          to="/profile"
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <span>Find My Eligible Schemes</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
