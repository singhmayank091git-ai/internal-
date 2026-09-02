import React from 'react';
import { Landmark, MapPin, Globe, ShieldCheck, Award, Users, BookOpen, Mail, Phone } from 'lucide-react';

interface InstitutionProfileViewProps {
  institutionName?: string;
}

export const InstitutionProfileView: React.FC<InstitutionProfileViewProps> = ({
  institutionName = 'Riverside Institute of Technology — Placement Cell',
}) => {
  const verifiedStats = [
    { label: 'Active Company Partners', value: '1 Employer Partner' },
    { label: 'Batch Under Review', value: '2026 - 2028' },
    { label: 'Verification Standard', value: 'SkillBridge Certified' },
  ];

  const approvedDomains = [
    'Computer Science & Eng.',
    'Data Science & AI',
    'Electrical Engineering',
    'Product Management',
    'Cloud Architecture',
    'Full-stack Web Eng.',
  ];

  return (
    <div className="space-y-6" id="institution-profile-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Institution & TPO Profile
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage university credentials, placement criteria, and employer partnerships.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Institution Card */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 mb-4 shadow-lg shadow-cyan-950/50">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center font-bold text-2xl text-cyan-300">
              <Landmark className="w-9 h-9" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-white">{institutionName}</h2>
          <p className="text-xs text-slate-400 mt-0.5">placements@riverside.edu</p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Placement Cell</span>
          </div>

          <div className="w-full mt-6 pt-5 border-t border-white/[0.06] text-left space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Campus:
              </span>
              <span className="font-semibold text-slate-200">Main Campus, Riverside</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                Portal:
              </span>
              <span className="font-semibold text-cyan-400">placements.riverside.edu</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                Office:
              </span>
              <span className="font-semibold text-slate-200">+1 (951) 555-0190</span>
            </div>
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Placement Guidelines & Verification</h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Verified TPO
              </span>
            </div>

            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              All company-submitted internship and full-time postings must undergo Placement Cell review. Positions are checked for fair stipend rates, clear mentorship goals, and alignment with academic degree criteria before going live on the student portal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {verifiedStats.map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xs text-slate-400">{stat.label}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Approved Academic Disciplines</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {approvedDomains.length} disciplines
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-5">
              {approvedDomains.map((domain, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/[0.04] text-slate-200 border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all shadow-sm"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
