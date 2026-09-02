import React from 'react';
import { Send, Clock, CheckCircle2, Building2, Calendar, FileText, ArrowUpRight } from 'lucide-react';

export const ApplicationsView: React.FC = () => {
  const applications = [
    {
      id: 'app-1',
      company: 'TechCorp',
      role: 'Frontend Engineering Intern',
      submittedDate: 'May 12, 2026',
      status: 'Viewed',
      statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 'app-2',
      company: 'Innovate Labs',
      role: 'Data Science & Analytics Intern',
      submittedDate: 'May 10, 2026',
      status: 'Interview Scheduled',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      skills: ['Python', 'SQL', 'Data Modeling'],
    },
    {
      id: 'app-3',
      company: 'Nexa Systems',
      role: 'Software Development Intern',
      submittedDate: 'May 8, 2026',
      status: 'In Review',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      skills: ['Node.js', 'REST APIs', 'PostgreSQL'],
    },
    {
      id: 'app-4',
      company: 'Quantum Dynamics',
      role: 'Backend Engineering Intern',
      submittedDate: 'May 4, 2026',
      status: 'In Review',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      skills: ['Go', 'Docker', 'PostgreSQL'],
    },
  ];

  return (
    <div className="space-y-6" id="my-applications-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            My Applications
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Track status, interview schedules, and recruiter feedback in real time.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] shadow-xl overflow-hidden">
        <div className="divide-y divide-white/[0.06]">
          {applications.map((app) => (
            <div key={app.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{app.company}</div>
                  <h3 className="text-base font-bold text-white mt-0.5">{app.role}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {app.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${app.statusColor}`}>
                  {app.status}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {app.submittedDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
