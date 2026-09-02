import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, UserCheck, RefreshCw, Sparkles, Building2, GraduationCap, Landmark } from 'lucide-react';
import { AuthMode, UserRole, FormData } from '../types';

interface AuthSuccessModalProps {
  isOpen: boolean;
  mode: AuthMode;
  role: UserRole;
  formData: FormData;
  onReset: () => void;
}

export const AuthSuccessModal: React.FC<AuthSuccessModalProps> = ({
  isOpen,
  mode,
  role,
  formData,
  onReset,
}) => {
  if (!isOpen) return null;

  const getRoleIcon = () => {
    switch (role) {
      case 'student':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'company':
        return <Building2 className="w-5 h-5 text-teal-400" />;
      case 'institution':
        return <Landmark className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'student':
        return 'Student & Talent Portal';
      case 'company':
        return 'Enterprise Recruitment Console';
      case 'institution':
        return 'Institutional Dean & Career Dashboard';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0F1423] border border-white/15 shadow-2xl shadow-emerald-950/60 overflow-hidden text-center"
          id="auth-success-dialog"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Success Icon */}
          <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-lg shadow-emerald-900/50 mb-5">
            <div className="w-full h-full rounded-2xl bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {mode === 'signup' ? 'Welcome to SkillBridge!' : 'Authenticated Successfully!'}
          </h3>

          <p className="mt-2 text-sm text-slate-300">
            {mode === 'signup'
              ? 'Your workspace has been provisioned. Connecting your skill graph now.'
              : 'Signed in securely. Preparing your personalized workspace.'}
          </p>

          {/* User & Role Summary Card */}
          <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-white/[0.08] text-left space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.06]">
              <span className="text-slate-400">Authenticated as:</span>
              <span className="font-semibold text-slate-200 truncate max-w-[200px]">
                {formData.email}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10">
                {getRoleIcon()}
              </div>
              <div>
                <div className="text-xs font-semibold text-white">{getRoleTitle()}</div>
                <div className="text-[11px] text-slate-400 capitalize">
                  Account Tier: Verified {role}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <button
              type="button"
              id="success-continue-btn"
              onClick={onReset}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-950/50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Dashboard Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              id="success-reset-btn"
              onClick={onReset}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Back to Authentication Screen</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
