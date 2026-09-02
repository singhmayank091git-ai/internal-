import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  FileCheck2, 
  User, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Briefcase,
  PlusCircle,
  Users,
  Building2,
  Clock
} from 'lucide-react';
import { DashboardTab, UserRole } from '../types';
import { SkillBridgeLogo } from './SkillBridgeLogo';

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onLogout: () => void;
  userRole?: UserRole;
  userName?: string;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onSwitchRole?: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
  userRole = 'student',
  userName = 'Alex Rivera',
  isMobileOpen = false,
  onCloseMobile,
  onSwitchRole,
}) => {
  const studentNavItems: { id: DashboardTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'browse', label: 'Browse Internships', icon: Compass },
    { id: 'applications', label: 'My Applications', icon: FileCheck2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const companyNavItems: { id: DashboardTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-listings', label: 'My Listings', icon: Briefcase },
    { id: 'post-listing', label: 'Post a Listing', icon: PlusCircle },
    { id: 'applicants', label: 'Applicants', icon: Users },
    { id: 'profile', label: 'Profile', icon: Building2 },
  ];

  const institutionNavItems: { id: DashboardTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pending-approvals', label: 'Pending Approvals', icon: Clock },
    { id: 'all-listings', label: 'All Listings', icon: Briefcase },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'profile', label: 'Profile', icon: Building2 },
  ];

  let navItems = studentNavItems;
  if (userRole === 'company') {
    navItems = companyNavItems;
  } else if (userRole === 'institution') {
    navItems = institutionNavItems;
  }

  const handleNavClick = (tab: DashboardTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="dashboard-sidebar"
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-[#0B0F1E]/95 lg:bg-[#0B0F1E]/80 backdrop-blur-xl border-r border-white/[0.08] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Section: Logo & Navigation */}
        <div className="p-6 flex flex-col gap-6">
          {/* Logo Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
            <SkillBridgeLogo size="md" />
          </div>

          {/* Role Switcher Pill / Indicator */}
          {onSwitchRole && (
            <div className="flex items-center justify-between p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
              <button
                type="button"
                onClick={() => onSwitchRole('student')}
                className={`flex-1 py-1.5 px-1.5 rounded-lg font-medium transition-all text-center cursor-pointer text-[11px] ${
                  userRole === 'student'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole('company')}
                className={`flex-1 py-1.5 px-1.5 rounded-lg font-medium transition-all text-center cursor-pointer text-[11px] ${
                  userRole === 'company'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Company
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole('institution')}
                className={`flex-1 py-1.5 px-1.5 rounded-lg font-medium transition-all text-center cursor-pointer text-[11px] ${
                  userRole === 'institution'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Institution
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5" aria-label="Sidebar Navigation">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 px-3 pb-1">
              {userRole === 'institution' ? 'TPO Menu' : userRole === 'company' ? 'Company Menu' : 'Menu'}
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-white border border-emerald-500/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm'
                          : 'bg-white/[0.05] text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={isActive ? 'font-semibold text-white' : ''}>{item.label}</span>
                  </div>

                  {isActive ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile Mini Card & Logout */}
        <div className="p-6 border-t border-white/[0.08] flex flex-col gap-4 bg-black/20">
          {/* Status Badge */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shrink-0 flex items-center justify-center font-bold text-xs text-slate-950">
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase() || (userRole === 'company' ? 'TC' : 'AR')}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">{userName}</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>
                  {userRole === 'institution'
                    ? 'TPO / Placement Office'
                    : userRole === 'company'
                    ? 'Verified Employer'
                    : 'Student Account'}
                </span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

