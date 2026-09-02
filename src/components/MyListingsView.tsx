import React, { useState } from 'react';
import { Plus, Briefcase, MapPin, Sparkles, Clock, Users, CheckCircle2, AlertCircle, Eye, ArrowUpRight } from 'lucide-react';
import { InternshipListing } from '../types';

interface MyListingsViewProps {
  listings: InternshipListing[];
  onNavigateToPost: () => void;
  onNavigateToApplicants?: (listingId: string) => void;
}

export const MyListingsView: React.FC<MyListingsViewProps> = ({
  listings,
  onNavigateToPost,
  onNavigateToApplicants,
}) => {
  const [filter, setFilter] = useState<'all' | 'Live' | 'Pending Review'>('all');

  const filteredListings = listings.filter((l) => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  return (
    <div className="space-y-6" id="my-listings-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Company Job & Internship Listings
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your company's active roles, review status, and student applicant pools.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToPost}
          className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-md shadow-emerald-950/40 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Listing</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-1">
        {(['all', 'Live', 'Pending Review'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === tab
                ? 'bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-white border border-cyan-500/30'
                : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
            }`}
          >
            {tab === 'all' ? 'All Listings' : tab}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/40 p-5 shadow-xl flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {item.type}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">
                    {item.role}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    item.status === 'Pending Review'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  }`}
                >
                  {item.status || 'Live'}
                </span>
              </div>

              {/* Location and Work Mode */}
              <div className="flex flex-wrap items-center gap-2 my-2.5 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {item.location}
                </span>
                {item.workMode && (
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                    {item.workMode}
                  </span>
                )}
              </div>

              {/* Required Skills */}
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Required Skills:</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, i) => (
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

            {/* Footer with Applicants Count & Details */}
            <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>{item.applicantCount ?? 0} Applicants</span>
              </div>

              <div className="text-xs text-slate-400">
                {item.postedDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
