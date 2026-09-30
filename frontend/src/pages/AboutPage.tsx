import React from 'react';
import { Link } from 'react-router-dom';
import {
  Info,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
          <Info className="w-3.5 h-3.5" />
          <span>Mission & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Eligible Schemes Finder
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Democratizing access to Indian education grants and fellowships through clear eligibility rules,
          automated matching, and direct official access.
        </p>
      </div>

      {/* The Core Problem */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>The Problem We’re Solving</span>
        </h2>
        <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
          <p>
            In India, both the Union Government, State Governments, and universities allocate thousands
            of crores of rupees every academic year towards student financial aid, fee waivers, and maintenance stipends.
          </p>
          <p>
            However, a massive proportion of deserving students — particularly from rural areas, lower-income households,
            and reserved social categories — fail to benefit because:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 font-medium">
            <li>Rules and guidelines are scattered across dozens of disconnected departmental portals.</li>
            <li>Eligibility criteria are written in dense, legalistic PDFs often 50–100 pages long.</li>
            <li>Misconceptions persist that scholarships are exclusively for 95%+ board toppers, when most schemes are actually means-tested (income-capped).</li>
            <li>Students miss strict application deadlines or lack awareness of document prerequisites.</li>
          </ul>
          <p>
            <strong>Eligible Schemes Finder</strong> provides a single, instant, intuitive interface where a student
            enters basic demographic and academic details and immediately receives a tailored list of schemes they actually qualify for.
          </p>
        </div>
      </section>

      {/* Data Sources */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <span>Verified Data Sources</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The eligibility rules, income ceilings, and allowance benchmarks mapped in this platform
          are curated directly from published government gazettes and institutional circulars:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-900 text-sm mb-1">Central Portals</h4>
            <p className="text-xs text-slate-600 mb-2">
              National Scholarship Portal (NSP), Ministry of Minority Affairs, Ministry of Social Justice & Empowerment, AICTE Pragati/Saksham, UGC.
            </p>
            <a
              href="https://scholarships.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-1"
            >
              <span>scholarships.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-900 text-sm mb-1">State Welfare Portals</h4>
            <p className="text-xs text-slate-600 mb-2">
              MahaDBT (Maharashtra), Jnanabhumi (Andhra Pradesh), Telangana ePass, UP Scholarship Portal, SSP Karnataka, and SVMCM West Bengal.
            </p>
            <span className="text-xs text-slate-500">Curated from official state gazettes</span>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
          <span>Project Notice & Legal Disclaimer</span>
        </div>
        <div className="text-xs sm:text-sm text-amber-900/90 space-y-2 leading-relaxed">
          <p>
            <strong>Educational Project:</strong> Eligible Schemes Finder is an independent student / engineering project
            created to assist students in discovering aid opportunities. It is <strong>not</strong> an official government agency
            or operated by any Ministry.
          </p>
          <p>
            <strong>Eligibility is Indicative:</strong> While our matching algorithms closely mirror official criteria,
            government policies, income limits, and application deadlines may change through ministerial notifications.
            Students must always verify the latest information on the respective official portals (e.g. NSP or state portals)
            before submitting applications.
          </p>
        </div>
      </section>

      {/* Practical Guide for Students */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <FileCheck className="w-5 h-5 text-purple-600" />
          <span>Student Guide: Key Documents to Prepare Early</span>
        </h2>
        <p className="text-sm text-slate-600">
          Most scholarship rejections occur due to outdated certificates or bank account mismatch.
          Here is your essential checklist:
        </p>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Income Certificate:</strong> Must be issued by the competent revenue authority (Tahsildar / Revenue Inspector / MeeSeva) within the valid financial year.
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Caste / Community Certificate:</strong> SC/ST/OBC/EBC certificate with digital signature or barcoded verification number.
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Aadhaar-Seeded Bank Account (DBT):</strong> Ensure your savings bank account is active and seeded with your Aadhaar on the NPCI mapper for Direct Benefit Transfer.
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Bonafide Student Certificate:</strong> Signed and stamped by your current school principal or college head of institution.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/profile"
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <span>Check Your Eligibility Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
