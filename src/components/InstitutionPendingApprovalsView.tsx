import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { DashboardTab } from '../types';

interface RealPendingListing {
  id: string;
  role: string;
  company: string;
  companyLogoText: string;
  location: string;
  workMode: string;
  description: string;
  skills: string[];
  postedDate: string;
}

interface InstitutionPendingApprovalsViewProps {
  onNavigateTab: (tab: DashboardTab) => void;
}

function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export const InstitutionPendingApprovalsView: React.FC<InstitutionPendingApprovalsViewProps> = ({
  onNavigateTab,
}) => {
  const [pending, setPending] = useState<RealPendingListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from('listings')
      .select('id, title, required_skills, location, work_mode, description, created_at, companies(company_name)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
      return;
    }

    const mapped: RealPendingListing[] = (data || []).map((row: any) => {
      const companyName = row.companies?.company_name || 'Unknown Company';
      return {
        id: row.id,
        role: row.title,
        company: companyName,
        companyLogoText: companyName.slice(0, 2).toUpperCase(),
        location: row.location || 'Not specified',
        workMode: row.work_mode || '',
        description: row.description || '',
        skills: row.required_skills || [],
        postedDate: timeAgo(row.created_at),
      };
    });

    setPending(mapped);
    setIsLoading(false);
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('listings')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setPending((prev) => prev.filter((l) => l.id !== id));
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from('listings')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setPending((prev) => prev.filter((l) => l.id !== id));
  };

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

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading pending listings...</span>
        </div>
      ) : pending.length === 0 ? (
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
                    {listing.companyLogoText}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{listing.role}</h3>
                    <span className="text-xs text-cyan-300 font-medium">{listing.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span>{listing.location}</span>
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
                  onClick={() => handleReject(listing.id)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all cursor-pointer"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(listing.id)}
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
