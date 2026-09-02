import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Send, 
  Sparkles, 
  Clock, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Briefcase, 
  Eye, 
  MessageSquare,
  AlertCircle,
  Search,
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import { 
  RECOMMENDED_INTERNSHIPS, 
  RECENT_ACTIVITIES, 
  STUDENT_PROFILE_DATA 
} from '../data/dashboardData';
import { DashboardTab, InternshipListing } from '../types';

interface DashboardViewProps {
  studentName?: string;
  onNavigateTab: (tab: DashboardTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  studentName = STUDENT_PROFILE_DATA.name,
  onNavigateTab,
}) => {
  const [internships, setInternships] = useState<InternshipListing[]>(RECOMMENDED_INTERNSHIPS);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const handleApply = (internship: InternshipListing) => {
    setInternships((prev) =>
      prev.map((item) =>
        item.id === internship.id ? { ...item, applied: true } : item
      )
    );
    setAppliedNotification(`Application submitted to ${internship.company} for ${internship.role}`);
    setTimeout(() => setAppliedNotification(null), 4000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'viewed':
        return <Eye className="w-4 h-4 text-cyan-400" />;
      case 'interview':
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case 'applied':
        return <Send className="w-4 h-4 text-teal-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8" id="main-dashboard-content">
      {/* Toast Notification for Interactivity */}
      {appliedNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center justify-between shadow-lg shadow-emerald-950/40"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{appliedNotification}</span>
          </div>
          <button
            onClick={() => setAppliedNotification(null)}
            className="text-emerald-400 hover:text-emerald-200 text-xs underline cursor-pointer"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* 1. Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {studentName}
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Candidate
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Track your skills, internship applications, and role recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="browse-internships-quick-btn"
            onClick={() => onNavigateTab('browse')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-200 shadow-md shadow-emerald-950/40 flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Find Internships</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {/* Profile Completion Card (7 cols) */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-7 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
          id="profile-completion-card"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Profile Completion</h3>
                  <p className="text-xs text-slate-400">Skill verification & profile strength</p>
                </div>
              </div>

              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {STUDENT_PROFILE_DATA.completionPercentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="my-3">
              <div className="w-full h-3 rounded-full bg-slate-800/80 border border-white/[0.06] overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${STUDENT_PROFILE_DATA.completionPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.5)]"
                />
              </div>
            </div>

            {/* Missing items helper */}
            <div className="space-y-1.5 text-xs text-slate-400 mt-3 pt-3 border-t border-white/[0.06]">
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Recommended next steps:
              </div>
              {STUDENT_PROFILE_DATA.missingProfileItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between">
            <span className="text-xs text-slate-400">3 of 5 profile sections complete</span>
            <button
              type="button"
              id="complete-profile-link"
              onClick={() => onNavigateTab('profile')}
              className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer group"
            >
              <span>Complete your profile</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>

        {/* Applications Sent Card (5 cols) */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-5 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
          id="applications-sent-card"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Applications Sent</h3>
                  <p className="text-xs text-slate-400">Active submissions overview</p>
                </div>
              </div>

              <span className="text-3xl font-extrabold text-white">
                {STUDENT_PROFILE_DATA.applicationsSentCount}
              </span>
            </div>

            {/* Breakdown Badges */}
            <div className="grid grid-cols-3 gap-2 my-3">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-xs text-slate-400">In Review</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">
                  {STUDENT_PROFILE_DATA.applicationsBreakdown.inReview}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-xs text-slate-400">Interviews</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">
                  {STUDENT_PROFILE_DATA.applicationsBreakdown.interviews}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-xs text-slate-400">Viewed</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">
                  {STUDENT_PROFILE_DATA.applicationsBreakdown.viewed}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/[0.06]">
            <span className="text-xs text-slate-400">All submissions verified</span>
            <button
              type="button"
              id="view-applications-link"
              onClick={() => onNavigateTab('applications')}
              className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer group"
            >
              <span>View applications</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3. Recommended For You Section */}
      <div className="space-y-4" id="recommended-internships-section">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Recommended For You</span>
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                (Matched by your verified technical skills)
              </span>
            </h2>
            <p className="text-xs text-slate-400 sm:hidden">
              Matched by your verified technical skills
            </p>
          </div>

          <button
            type="button"
            id="see-all-recommendations-btn"
            onClick={() => onNavigateTab('browse')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>See all listings</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Row of Listing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {internships.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/40 p-5 shadow-xl flex flex-col justify-between transition-all duration-200 group"
              id={`internship-card-${item.id}`}
            >
              <div>
                {/* Header: Company & Match Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.companyLogoBg} flex items-center justify-center font-bold text-sm text-white shadow-md`}
                    >
                      {item.companyLogoText}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {item.company}
                      </h4>
                      <h3 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Match Pill & Type */}
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

                {/* Skill Tag Pills */}
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Required Skills:</div>
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

              {/* Card Footer: Posted date & Apply Action */}
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
                    onClick={() => handleApply(item)}
                    id={`apply-btn-${item.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-150 shadow-sm cursor-pointer flex items-center gap-1"
                  >
                    <span>Apply</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Recent Activity Section */}
      <div
        className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] p-5 sm:p-6 shadow-xl"
        id="recent-activity-section"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Recent Activity</h2>
              <p className="text-xs text-slate-400">Real-time status updates on your applications</p>
            </div>
          </div>
        </div>

        {/* List of 2-3 Recent Status Updates */}
        <div className="divide-y divide-white/[0.06] mt-1">
          {RECENT_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="py-3.5 first:pt-3 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group"
              id={`activity-item-${activity.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] mt-0.5 shrink-0 group-hover:border-cyan-500/30 transition-colors">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {activity.title}
                  </div>
                  {activity.details && (
                    <div className="text-xs text-slate-400 mt-0.5">{activity.details}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 self-start sm:self-center pl-11 sm:pl-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
