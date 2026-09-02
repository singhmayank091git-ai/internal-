import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Building2, Landmark } from 'lucide-react';
import { UserRole } from '../types';
import { ROLES } from '../data/roles';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onChange }) => {
  const getIcon = (roleId: UserRole) => {
    switch (roleId) {
      case 'student':
        return <GraduationCap className="w-4 h-4" />;
      case 'company':
        return <Building2 className="w-4 h-4" />;
      case 'institution':
        return <Landmark className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-2" id="role-selector-container">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-slate-300">Select your account type</label>
        <span className="text-slate-400 text-[11px]">Personalized experience</span>
      </div>

      <div 
        className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md"
        role="radiogroup"
        aria-label="Account Role Selection"
      >
        {ROLES.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              id={`role-btn-${role.id}`}
              onClick={() => onChange(role.id)}
              className={`relative flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
                isSelected
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
              role="radio"
              aria-checked={isSelected}
            >
              {isSelected && (
                <motion.div
                  layoutId="roleActivePill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 border border-white/20 shadow-md shadow-emerald-950/40 backdrop-blur-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span className={isSelected ? 'text-emerald-100' : 'text-slate-400'}>
                  {getIcon(role.id)}
                </span>
                <span className="whitespace-nowrap font-medium">{role.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
