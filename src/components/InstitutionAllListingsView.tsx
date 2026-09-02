import React, { useState } from 'react';
import { Search, Filter, MapPin, Building2, CheckCircle2, Clock, XCircle, ArrowUpRight } from 'lucide-react';
import { InternshipListing } from '../types';

interface InstitutionAllListingsViewProps {
  listings: InternshipListing[];
  onApproveListing?: (id: string) => void;
  onRejectListing?: (id: string) => void;
}

export const InstitutionAllListingsView: React.FC<InstitutionAllListingsViewProps> = ({
  listings,
  onApproveListing,
  onRejectListing,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = listings.filter((item) => {
    const statusMatch =
      filterStatus === 'All'
        ? true
        : filterStatus === 'Pending'
        ? item.status === 'Pending Review'
        : filterStatus === 'Live'
        ? item.status === 'Live' || !item.status
        : true;

    const searchMatch =
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-6" id="institution-all-listings">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            All Company Listings
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Comprehensive directory of all submitted, approved, and live employer opportunities.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-full sm:w-auto">
          {['All', 'Pending', 'Live'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, role, skill..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isPending = item.status === 'Pending Review';

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/30 transition-all shadow-xl flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                      {item.companyLogoText || item.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-xs text-cyan-400 font-medium">{item.company}</div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 border ${
                      isPending
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    }`}
                  >
                    {isPending ? 'Pending Review' : 'Live & Active'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span>{item.type}</span>
                  {item.workMode && (
                    <>
                      <span>•</span>
                      <span>{item.workMode}</span>
                    </>
                  )}
                </div>

                {item.description && (
                  <p className="text-xs text-slate-300 line-clamp-2">{item.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-slate-200 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions if Pending */}
              {isPending && onApproveListing && onRejectListing && (
                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => onRejectListing(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => onApproveListing(item.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 cursor-pointer shadow-sm"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
