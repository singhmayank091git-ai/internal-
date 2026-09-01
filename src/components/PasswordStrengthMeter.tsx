import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  if (!password) return null;

  const hasMinLength = password.length >= 8;
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasMinLength, hasMixedCase, hasNumbers, hasSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    switch (score) {
      case 1:
        return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
      case 2:
        return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
      case 3:
        return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-400' };
      case 4:
        return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
      default:
        return { label: 'Very weak', color: 'bg-slate-700', text: 'text-slate-400' };
    }
  };

  const strength = getStrengthLabel();

  return (
    <div className="space-y-1.5 pt-1" id="password-strength-meter">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Password strength:</span>
        <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step <= score ? strength.color : 'bg-white/[0.08]'
            }`}
          />
        ))}
      </div>

      {/* Checklist items in micro style */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-400 pt-1">
        <div className="flex items-center gap-1">
          {hasMinLength ? (
            <Check className="w-3 h-3 text-emerald-400" />
          ) : (
            <X className="w-3 h-3 text-slate-600" />
          )}
          <span className={hasMinLength ? 'text-slate-300' : ''}>8+ characters</span>
        </div>
        <div className="flex items-center gap-1">
          {hasMixedCase ? (
            <Check className="w-3 h-3 text-emerald-400" />
          ) : (
            <X className="w-3 h-3 text-slate-600" />
          )}
          <span className={hasMixedCase ? 'text-slate-300' : ''}>Uppercase & lowercase</span>
        </div>
        <div className="flex items-center gap-1">
          {hasNumbers ? (
            <Check className="w-3 h-3 text-emerald-400" />
          ) : (
            <X className="w-3 h-3 text-slate-600" />
          )}
          <span className={hasNumbers ? 'text-slate-300' : ''}>At least one number</span>
        </div>
        <div className="flex items-center gap-1">
          {hasSpecial ? (
            <Check className="w-3 h-3 text-emerald-400" />
          ) : (
            <X className="w-3 h-3 text-slate-600" />
          )}
          <span className={hasSpecial ? 'text-slate-300' : ''}>Special character</span>
        </div>
      </div>
    </div>
  );
};
