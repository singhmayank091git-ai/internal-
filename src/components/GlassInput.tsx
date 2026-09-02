import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  error?: string;
  hint?: string;
  isPassword?: boolean;
  rightElement?: React.ReactNode;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  id,
  label,
  icon,
  error,
  hint,
  isPassword = false,
  type = 'text',
  rightElement,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 text-left w-full" id={`input-group-${id}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-medium text-slate-300 tracking-wide"
        >
          {label}
        </label>
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
      </div>

      <div className="relative group">
        {/* Ambient subtle glow when focused */}
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-[2px]" />

        <div
          className={`relative flex items-center w-full rounded-xl bg-slate-900/60 backdrop-blur-md border transition-all duration-200 overflow-hidden shadow-inner ${
            error
              ? 'border-rose-500/60 bg-rose-950/10'
              : 'border-white/[0.08] hover:border-white/[0.18] group-focus-within:border-emerald-500/60 group-focus-within:bg-slate-900/80 group-focus-within:shadow-[0_0_15px_rgba(16,185,129,0.15)]'
          }`}
        >
          {icon && (
            <div className="pl-3.5 pr-1 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
              {icon}
            </div>
          )}

          <input
            id={id}
            type={inputType}
            className={`w-full bg-transparent px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
              icon ? 'pl-2' : 'pl-3.5'
            } ${isPassword || rightElement ? 'pr-10' : 'pr-3.5'} ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              id={`${id}-toggle-visibility`}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-slate-200 focus:text-emerald-400 focus:outline-none transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}

          {!isPassword && rightElement && (
            <div className="absolute right-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
