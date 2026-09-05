import React, { useState, useEffect } from 'react';
import { Building2, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface RealApplication {
  id: string;
  company: string;
  role: string;
  submittedDate: string;
  status: string;
  statusColor: string;
  skills: string[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'shortlisted':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'selected':
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    case 'rejected':
      return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    default:
      return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  }
}

function formatStatusLabel(status: string): string {
  switch (status) {
    case 'shortlisted':
      return 'Shortlisted';
    case 'selected':
      return 'Selected';
    case 'rejected':
      return 'Rejected';
    default:
      return 'Applied';
  }
}

export const ApplicationsView: React.FC = () => {
  const [applications, setApplications] = useState<RealApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setErrorMsg('You must be logged in to view applications.');
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('applications')
      .select('id, status, applied_at, listings(title, required_skills, companies(company_name))')
      .eq('student_id', userData.user.id)
      .order('applied_at', { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
      return;
    }

    const mapped: RealApplication[] = (data || []).map((row: any) => ({
      id: row.id,
      company: row.listings?.companies?.company_name || 'Unknown Company',
      role: row.listings?.title || 'Untitled Role',
      submittedDate: formatDate(row.applied_at),
      status: formatStatusLabel(row.status),
      statusColor: getStatusColor(row.status),
      skills: row.listings?.required_skills || [],
    }));

    setApplications(mapped);
    setIsLoading(false);
  };

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

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading your applications...</span>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          You haven't applied to any listings yet.
        </div>
      ) : (
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
      )}
    </div>
  );
};
