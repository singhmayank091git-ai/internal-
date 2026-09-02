import React, { useState } from 'react';
import { Users, GraduationCap, Mail, Search, CheckCircle2, Award, ArrowUpRight, BookOpen } from 'lucide-react';

export const InstitutionStudentsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 'stu-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@cs.riverside.edu',
      department: 'Computer Science & Engineering',
      batch: 'Class of 2027',
      gpa: '3.88',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'SQL'],
      status: 'Placed (Internship)',
      company: 'TechCorp Labs',
    },
    {
      id: 'stu-2',
      name: 'Samantha Chen',
      email: 'samantha.chen@cs.riverside.edu',
      department: 'Software Engineering',
      batch: 'Class of 2026',
      gpa: '3.92',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      status: 'Interviewing',
      company: 'Apex AI',
    },
    {
      id: 'stu-3',
      name: 'Marcus Vance',
      email: 'marcus.v@ds.riverside.edu',
      department: 'Data Science & AI',
      batch: 'Class of 2026',
      gpa: '3.75',
      skills: ['Python', 'SQL', 'PyTorch', 'Pandas'],
      status: 'Actively Looking',
      company: '-',
    },
    {
      id: 'stu-4',
      name: 'Elena Rostova',
      email: 'elena.r@ee.riverside.edu',
      department: 'Electrical & Computer Engineering',
      batch: 'Class of 2027',
      gpa: '3.82',
      skills: ['C++', 'Rust', 'Embedded Systems', 'Python'],
      status: 'Actively Looking',
      company: '-',
    },
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6" id="institution-students-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Registered Students Directory
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            View student skill portfolios, batch details, and placement progress.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student, skill, branch..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Student List */}
      <div className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] shadow-xl overflow-hidden divide-y divide-white/[0.06]">
        {filteredStudents.map((stu) => (
          <div
            key={stu.id}
            className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 flex items-center justify-center font-bold text-xs text-slate-950 shrink-0">
                {stu.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{stu.name}</h3>
                  <span className="text-xs text-slate-400">• {stu.batch}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{stu.department} • GPA: {stu.gpa}</p>

                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  {stu.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-slate-200 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  stu.status.includes('Placed')
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    : stu.status === 'Interviewing'
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                }`}
              >
                {stu.status}
              </span>
              <span className="text-xs text-slate-400">
                {stu.email}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
