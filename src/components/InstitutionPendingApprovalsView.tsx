import React from 'react';
import { Clock, Briefcase, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { InternshipListing, DashboardTab } from '../types';

interface InstitutionPendingApprovalsViewProps {
  listings: InternshipListing[];
  onApproveListing: (id: string) => void;
  onRejectListing: (id: string) => void;
  onNavigateTab: (tab: DashboardTab) => void;
}

export const InstitutionPendingApprovalsView: React.FC<InstitutionPendingApprovalsViewProps> = ({
  listings,
  onApproveListing,
  onRejectListing,
  onNavigateTab,
}) => {
  const pending = listings.filter((l) => l.status === 'Pending Review');

  return (
    <div className="space-y-6" id="institution-pending-approvals-view">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Pending Company Postings
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Review employer role specifications and enforce institutional placement guidelines.
          </p>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] shadow-xl">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-90" />
          <h2 className="text-lg font-bold text-white">No Pending Approvals</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            All company internship and job submissions have been processed.
          </p>
          <button
            type="button"
            onClick={() => onNavigateTab('all-listings')}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Active Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((listing) => (
            <div
              key={listing.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                    {listing.companyLogoText || listing.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{listing.role}</h3>
                    <span className="text-xs text-cyan-300 font-medium">{listing.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span>{listing.location}</span>
                  <span>•</span>
                  <span>{listing.type}</span>
                  {listing.workMode && (
                    <>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300">
                        {listing.workMode}
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span className="text-slate-400">Submitted {listing.postedDate}</span>
                </div>

                {listing.description && (
                  <p className="text-xs text-slate-300 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/[0.04]">
                    {listing.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 mr-1">Skills:</span>
                  {listing.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-slate-200 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06] w-full lg:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => onRejectListing(listing.id)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all cursor-pointer"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => onApproveListing(listing.id)}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-md cursor-pointer"
                >
                  Approve Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
