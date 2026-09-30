import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white font-bold text-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Eligible Schemes Finder</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A transparent, student-first platform designed to demystify complex eligibility rules
              across Central Government, State Portals, and Universities. Discovers real financial support
              so no eligible student drops out due to lack of funds.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-slate-800/80 px-3 py-1.5 rounded-md w-fit border border-slate-700">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free • No Sign-in Required • Official Portal Redirection</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Portal</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">Eligibility Matcher</Link>
              </li>
              <li>
                <Link to="/all-schemes" className="hover:text-white transition-colors">Directory of All Schemes</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About & Student Guide</Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Official Portals</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center space-x-1 transition-colors"
                >
                  <span>National Scholarship Portal (NSP)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.aicte-india.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center space-x-1 transition-colors"
                >
                  <span>AICTE Portals</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ugc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center space-x-1 transition-colors"
                >
                  <span>UGC Scholarships</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Disclaimer:</strong> This is a public service educational project. Scholarship eligibility is indicative. Always verify notifications on official portals before applying.
            </span>
          </div>
          <div className="flex items-center space-x-1 shrink-0">
            <span>Built for Indian Students with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
