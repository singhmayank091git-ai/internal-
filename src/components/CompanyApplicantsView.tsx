import React from 'react';
import { Users, Mail, GraduationCap, CheckCircle2, Clock, Calendar, ArrowUpRight } from 'lucide-react';

export const CompanyApplicantsView: React.FC = () => {
  const applicants = [
    {
      id: 'app-1',
      candidateName: 'Alex Rivera',
      role: 'Frontend Engineering Intern',
      university: 'State University of Technology',
      graduationYear: 'Class of 2027',
      appliedDate: 'May 12, 2026',
      matchScore: 94,
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'Reviewed',
      statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      id: 'app-2',
      candidateName: 'Samantha Chen',
      role: 'Frontend Engineering Intern',
      university: 'Institute of Applied Sciences',
      graduationYear: 'Class of 2026',
      appliedDate: 'May 11, 2026',
      matchScore: 89,
      skills: ['React', 'JavaScript', 'CSS Grid', 'REST APIs'],
      status: 'Interview Scheduled',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'app-3',
      candidateName: 'Marcus Vance',
      role: 'Data Science & Analytics Intern',
      university: 'Polytechnic State',
      graduationYear: 'Class of 2026',
      appliedDate: 'May 9, 2026',
      matchScore: 86,
      skills: ['Python', 'SQL', 'Pandas'],
      status: 'New Applicant',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="space-y-6" id="company-applicants-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Student Applicants
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Review student candidates matched directly by their technical skills and coursework.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] shadow-xl overflow-hidden">
        <div className="divide-y divide-white/[0.06]">
          {applicants.map((cand) => (
            <div
              key={cand.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-sm text-cyan-300 shrink-0">
                  {cand.candidateName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{cand.candidateName}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {cand.matchScore}% Skill Match
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>Applied for: <strong className="text-slate-200">{cand.role}</strong></span>
                    <span>•</span>
                    <span>{cand.university}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    {cand.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cand.statusColor}`}>
                  {cand.status}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {cand.appliedDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
