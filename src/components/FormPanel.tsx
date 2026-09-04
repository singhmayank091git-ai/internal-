import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2, Check, Sparkles } from 'lucide-react';
import { AuthMode, UserRole, FormData, FormErrors } from '../types';
import { SkillBridgeLogo } from './SkillBridgeLogo';
import { RoleSelector } from './RoleSelector';
import { GlassInput } from './GlassInput';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { supabase } from '../lib/supabaseClient';

interface FormPanelProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSuccess: (data: FormData) => void;
}

export const FormPanel: React.FC<FormPanelProps> = ({
  mode,
  onModeChange,
  selectedRole,
  onRoleChange,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    role: selectedRole,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
    agreeToTerms: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Sync role changes
  const handleRoleSelect = (role: UserRole) => {
    onRoleChange(role);
    setFormData((prev) => ({ ...prev, role }));
  };

  // Switch between Login and Sign Up
  const handleModeSwitch = (newMode: AuthMode) => {
    onModeChange(newMode);
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup' && formData.confirmPassword !== undefined && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (mode === 'signup' && !formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate high-speed SaaS auth pipeline
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(formData);
    }, 900);
  };

  const handleSocialAuth = (provider: string) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      onSuccess({
        ...formData,
        email: `${provider.toLowerCase()}.user@example.com`,
        fullName: `${provider} Verified User`,
      });
    }, 800);
  };

  return (
    <div
      className="w-full max-w-xl mx-auto flex flex-col justify-between min-h-[640px] p-6 sm:p-10 lg:p-12 text-slate-200"
      id="form-panel-container"
    >
      {/* Top Header: Logo & Subtitle */}
      <div>
        <div className="flex items-center justify-between">
          <SkillBridgeLogo size="md" />
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.08] shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Secure Connection</span>
          </div>
        </div>

        {/* Form Title & Dynamic Welcome Headline */}
        <div className="mt-8">
          <motion.h1
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </motion.h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            {mode === 'login'
              ? 'Sign in to manage your profile, explore opportunities, and track applications.'
              : 'Sign up to start connecting your verified skills with top opportunities.'}
          </p>
        </div>

        {/* Tab Switcher: Login / Sign Up */}
        <div className="mt-6">
          <div
            className="grid grid-cols-2 p-1 rounded-xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md relative"
            role="tablist"
            id="auth-mode-tablist"
          >
            <button
              type="button"
              id="tab-login"
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => handleModeSwitch('login')}
              className={`relative py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'login' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode === 'login' && (
                <motion.div
                  layoutId="authTabIndicator"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 border border-white/20 shadow-md shadow-emerald-950/40"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">Sign In</span>
            </button>

            <button
              type="button"
              id="tab-signup"
              role="tab"
              aria-selected={mode === 'signup'}
              onClick={() => handleModeSwitch('signup')}
              className={`relative py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'signup' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode === 'signup' && (
                <motion.div
                  layoutId="authTabIndicator"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 border border-white/20 shadow-md shadow-emerald-950/40"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">Sign Up</span>
            </button>
          </div>
        </div>

        {/* Role Selector */}
        <div className="mt-5">
          <RoleSelector
            selectedRole={selectedRole}
            onChange={handleRoleSelect}
          />
        </div>

        {/* Quick Social Buttons */}
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              id="social-google-btn"
              onClick={() => handleSocialAuth('Google')}
              disabled={isLoading || !!socialLoading}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-slate-200 transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {socialLoading === 'Google' ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.8C6.5 7.1 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.4C.7 9.8 0 12.5 0 15.3c0 2.8.7 5.5 1.9 7.9l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"
                  />
                </svg>
              )}
              <span>Google</span>
            </button>

            <button
              type="button"
              id="social-github-btn"
              onClick={() => handleSocialAuth('GitHub')}
              disabled={isLoading || !!socialLoading}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-slate-200 transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {socialLoading === 'GitHub' ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              )}
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-[#0A0E1A] px-3 text-slate-500 font-medium">
                Or with work email
              </span>
            </div>
          </div>
        </div>

        {/* Main Interactive Form */}
        <form onSubmit={handleSubmit} className="space-y-4" id="auth-main-form">
          <AnimatePresence mode="popLayout">
            {mode === 'signup' && (
              <motion.div
                key="fullname-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <GlassInput
                  id="input-fullname"
                  label="Full name"
                  type="text"
                  placeholder={selectedRole === 'company' ? 'Acme Corp / HR Lead' : 'Jane Doe'}
                  icon={<User className="w-4 h-4" />}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  error={errors.fullName}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <GlassInput
            id="input-email"
            label="Email address"
            type="email"
            placeholder={
              selectedRole === 'student'
                ? 'you@university.edu'
                : selectedRole === 'company'
                ? 'talent@company.com'
                : 'dean@institution.edu'
            }
            icon={<Mail className="w-4 h-4" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            autoComplete="email"
          />

          <div className="space-y-1">
            <GlassInput
              id="input-password"
              label="Password"
              isPassword
              placeholder="••••••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              autoComplete={
                mode === 'login' ? 'current-password' : 'new-password'
              }
            />

            {mode === 'signup' && (
              <PasswordStrengthMeter password={formData.password} />
            )}
          </div>

          {/* Login Options: Remember Me & Forgot Password */}
          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                <input
                  type="checkbox"
                  id="remember-me-checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-3.5 h-3.5 rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500/30 focus:ring-offset-0 accent-emerald-500 cursor-pointer"
                />
                <span className="text-slate-300 hover:text-white transition-colors">
                  Remember this device
                </span>
              </label>

              <button
                type="button"
                id="forgot-password-trigger"
                onClick={() => {
                  setForgotPasswordOpen(true);
                  setForgotEmailSent(false);
                }}
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Sign Up Terms Checkbox */}
          {mode === 'signup' && (
            <div className="space-y-1 pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-300">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeToTerms: e.target.checked })
                  }
                  className="w-3.5 h-3.5 mt-0.5 rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500/30 focus:ring-offset-0 accent-emerald-500 cursor-pointer"
                />
                <span className="text-slate-400 leading-snug">
                  I agree to the{' '}
                  <span className="text-emerald-400 hover:underline cursor-pointer">
                    Terms of Service
                  </span>{' '}
                  and{' '}
                  <span className="text-emerald-400 hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-xs text-rose-400">{errors.agreeToTerms}</p>
              )}
            </div>
          )}

          {/* Primary Gradient Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="continue-button"
              disabled={isLoading}
              className="relative group w-full py-3 px-5 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/80 transition-all duration-300 active:scale-[0.99] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Vibrant subtle emerald-to-cyan gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 group-hover:from-emerald-400 group-hover:via-teal-400 group-hover:to-cyan-400 transition-all duration-300" />
              
              {/* Shimmer light sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Switcher Link */}
      <div className="mt-8 pt-4 border-t border-white/[0.06] text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <span>
          {mode === 'login'
            ? "Don't have an account yet?"
            : 'Already registered with SkillBridge?'}
        </span>
        <button
          type="button"
          id="mode-switch-bottom-btn"
          onClick={() => handleModeSwitch(mode === 'login' ? 'signup' : 'login')}
          className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors"
        >
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm p-6 rounded-2xl bg-[#0F1423] border border-white/15 shadow-2xl text-left"
            >
              <h4 className="text-base font-bold text-white">Reset Password</h4>
              <p className="mt-1 text-xs text-slate-300">
                Enter your account email to receive password reset instructions.
              </p>

              {forgotEmailSent ? (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Reset link dispatched to {formData.email || 'your email'}.</span>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <GlassInput
                    id="forgot-email-input"
                    label="Account Email"
                    type="email"
                    placeholder="you@example.com"
                    icon={<Mail className="w-4 h-4" />}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setForgotEmailSent(true)}
                    className="w-full py-2.5 rounded-xl font-medium text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
                  >
                    Send Recovery Link
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="mt-4 w-full py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
