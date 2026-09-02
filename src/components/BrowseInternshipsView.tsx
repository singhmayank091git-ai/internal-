import React, { useState } from 'react';
import { Search, Filter, MapPin, Sparkles, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { RECOMMENDED_INTERNSHIPS } from '../data/dashboardData';
import { InternshipListing } from '../types';

export const BrowseInternshipsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [internships, setInternships] = useState<InternshipListing[]>([
    ...RECOMMENDED_INTERNSHIPS,
    {
      id: 'intern-4',
      company: 'Quantum Dynamics',
      companyLogoText: 'QD',
      companyLogoBg: 'from-cyan-600 to-blue-600',
      role: 'Backend Engineering Intern',
      location: 'New York, NY / Hybrid',
      type: 'Full-time Summer 2026',
      skills: ['Go', 'Docker', 'PostgreSQL'],
      matchScore: 82,
      postedDate: '1 week ago',
    },
    {
      id: 'intern-5',
      company: 'Apex Robotics',
      companyLogoText: 'AR',
      companyLogoBg: 'from-teal-600 to-emerald-600',
      role: 'Machine Learning Research Intern',
      location: 'Boston, MA / On-site',
      type: 'Full-time Fall 2026',
      skills: ['PyTorch', 'Python', 'Computer Vision'],
      matchScore: 79,
      postedDate: '4 days ago',
    },
  ]);

  const allSkills = ['All', 'React', 'TypeScript', 'Python', 'SQL', 'Node.js', 'Go', 'Docker'];

  const filtered = internships.filter((item) => {
    const matchesSearch = 
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkill = selectedSkill === 'All' || item.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  const handleApply = (id: string) => {
    setInternships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, applied: true } : item))
    );
  };

  return (
    <div className="space-y-6" id="browse-internships-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Browse Verified Internships
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Explore verified opportunities matched directly to your demonstrated capabilities.
          </p>
        </div>
      </div>

      {/* Search & Skill Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role, company, or skill..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {allSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => setSelectedSkill(skill)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedSkill === skill
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-sm'
                  : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/40 p-5 shadow-xl flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.companyLogoBg} flex items-center justify-center font-bold text-sm text-white`}
                  >
                    {item.companyLogoText}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {item.company}
                    </h4>
                    <h3 className="text-sm font-bold text-white leading-snug">{item.role}</h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 my-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  {item.matchScore}% Match
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {item.location}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <div className="text-[11px] text-slate-400 mb-1.5">Required Skills:</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/[0.06]">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {item.postedDate}
              </span>

              {item.applied ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Applied</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApply(item.id)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
