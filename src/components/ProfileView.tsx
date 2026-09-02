import React from 'react';
import { User, Code2, GraduationCap, Mail, ArrowRight, Building2, MapPin, Globe, ShieldCheck, Briefcase } from 'lucide-react';
import { STUDENT_PROFILE_DATA } from '../data/dashboardData';
import { UserRole } from '../types';

interface ProfileViewProps {
  studentName?: string;
  userRole?: UserRole;
  companyName?: string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  studentName = STUDENT_PROFILE_DATA.name,
  userRole = 'student',
  companyName = 'TechCorp Labs',
}) => {
  const isCompany = userRole === 'company';

  const skills = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Python',
    'SQL',
    'Data Structures',
    'Node.js',
    'REST APIs',
    'Git',
  ];

  const companyTechStack = [
    'TypeScript',
    'React & Next.js',
    'Python / FastAPI',
    'PostgreSQL',
    'Docker & Kubernetes',
    'AWS Cloud',
    'REST APIs',
    'Tailwind CSS',
  ];

  if (isCompany) {
    return (
      <div className="space-y-6" id="company-profile-page">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Company Profile
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage your employer profile, tech stack requirements, and institutional partnerships.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Company Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 mb-4 shadow-lg shadow-cyan-950/50">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center font-bold text-2xl text-cyan-300">
                TC
              </div>
            </div>

            <h2 className="text-lg font-bold text-white">{companyName}</h2>
            <p className="text-xs text-slate-400 mt-0.5">recruiting@techcorplabs.io</p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Employer</span>
            </div>

            <div className="w-full mt-6 pt-5 border-t border-white/[0.06] text-left space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Headquarters:
                </span>
                <span className="font-semibold text-slate-200">San Francisco, CA</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  Website:
                </span>
                <span className="font-semibold text-cyan-400">techcorplabs.io</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  Industry:
                </span>
                <span className="font-semibold text-slate-200">Cloud & AI Systems</span>
              </div>
            </div>
          </div>

          {/* Details & Tech Stack */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">About Organization</h3>
                </div>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Institution Partner
                </span>
              </div>

              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                TechCorp Labs builds cutting-edge developer platforms and distributed cloud systems. We partner with universities to offer high-impact engineering and product internships with dedicated 1:1 mentorship.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Primary Tech Stack</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {companyTechStack.length} tools
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-5">
                {companyTechStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/[0.04] text-slate-200 border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="profile-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Student Profile
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your skills, academic background, and profile information.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 mb-4 shadow-lg shadow-cyan-950/50">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center font-bold text-2xl text-white">
              {studentName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase() || 'AR'}
            </div>
          </div>

          <h2 className="text-lg font-bold text-white">{studentName}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{STUDENT_PROFILE_DATA.email}</p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-3">
            <User className="w-3.5 h-3.5" />
            <span>Student Account</span>
          </div>

          <div className="w-full mt-6 pt-5 border-t border-white/[0.06] text-left space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block">Major:</span>
              <span className="text-slate-200 font-semibold">{STUDENT_PROFILE_DATA.role}</span>
            </div>
            <div>
              <span className="text-slate-400 block">University:</span>
              <span className="text-slate-200 font-semibold">{STUDENT_PROFILE_DATA.university}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Graduation:</span>
              <span className="text-slate-200 font-semibold">{STUDENT_PROFILE_DATA.graduationYear}</span>
            </div>
          </div>
        </div>

        {/* Skills & Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Skills</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {skills.length} skills listed
              </span>
            </div>

            {/* Simple Skill Tags / Pills */}
            <div className="flex flex-wrap gap-2.5 mt-5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/[0.04] text-slate-200 border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-2">Complete Profile Milestones</h3>
            <p className="text-xs text-slate-400 mb-4">
              Complete these steps to finish your profile setup:
            </p>

            <div className="space-y-2.5">
              {STUDENT_PROFILE_DATA.missingProfileItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs sm:text-sm"
                >
                  <span className="text-slate-300">{item}</span>
                  <button className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer flex items-center gap-1">
                    <span>Add</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
