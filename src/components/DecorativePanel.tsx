import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight, GraduationCap, Building2, Landmark, CheckSquare, ShieldCheck, Compass, FileCheck } from 'lucide-react';
import { UserRole } from '../types';
import { ROLES } from '../data/roles';

interface DecorativePanelProps {
  selectedRole: UserRole;
}

export const DecorativePanel: React.FC<DecorativePanelProps> = ({ selectedRole }) => {
  const currentRole = ROLES.find(r => r.id === selectedRole) || ROLES[0];

  return (
    <div
      className="relative w-full h-full min-h-[640px] rounded-3xl overflow-hidden bg-[#0A0E1A] border border-white/[0.08] shadow-2xl flex flex-col justify-between p-8 lg:p-12 select-none"
      id="decorative-panel"
    >
      {/* 1. Deep Gradient Mesh Background with Emerald & Cyan Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Navy/Dark grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Primary Emerald Glow Blob (Top Left / Center) */}
        <motion.div
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-16 -left-16 w-[420px] h-[420px] rounded-full bg-emerald-500/20 blur-[110px]"
        />

        {/* Vivid Cyan Glow Blob (Bottom Right) */}
        <motion.div
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 25, -25, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 -right-16 w-[480px] h-[480px] rounded-full bg-cyan-500/25 blur-[120px]"
        />

        {/* Teal Center Glow Blob */}
        <motion.div
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-teal-500/20 blur-[90px]"
        />
      </div>

      {/* 2. Top Bar: Clean, Honest Platform Tag */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-slate-200">Skill-Based Matching Platform</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Unified Portal</span>
        </motion.div>
      </div>

      {/* 3. Center Section: 3 Clear, Real Feature Highlight Cards */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
        
        {/* Main Central Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.12] backdrop-blur-2xl shadow-2xl shadow-black/40 animate-float-slow"
          id="showcase-match-card"
        >
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-950/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  Core Capabilities
                </h4>
                <p className="text-xs text-slate-400">
                  Real tools built for candidates & employers
                </p>
              </div>
            </div>
          </div>

          {/* 3 Real Feature Highlights in Card List */}
          <div className="space-y-2.5 mb-4">
            {/* Feature 1: Skill-Based Matching */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/[0.05] hover:border-emerald-500/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Skill-Based Matching</div>
                <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                  Directly connect candidate profiles with open opportunities based on demonstrated abilities.
                </div>
              </div>
            </div>

            {/* Feature 2: Verified Institution Listings */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/[0.05] hover:border-teal-500/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Verified Institution Listings</div>
                <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                  Access accredited universities and programs with authentic student and program directories.
                </div>
              </div>
            </div>

            {/* Feature 3: Application Tracking */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/[0.05] hover:border-cyan-500/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Application Tracking</div>
                <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                  Keep track of submission statuses, interview schedules, and employer responses in one place.
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic contextual hint matching currently selected role on the left */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.08] flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5 text-xs min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-slate-200 font-semibold shrink-0">{currentRole.label} View:</span>
              <span className="text-slate-300 font-normal truncate">{currentRole.tagline}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
        </motion.div>

        {/* Floating Mini Badges */}
        <div className="w-full max-w-md relative mt-4">
          {/* Floating Pill Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute -top-3 -left-3 sm:-left-5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-medium text-slate-200 animate-float-reverse"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Direct Skill Discovery</span>
          </motion.div>

          {/* Floating Pill Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="absolute -top-2 -right-3 sm:-right-5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-medium text-slate-200 animate-float-slow"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Real-Time Status</span>
          </motion.div>
        </div>
      </div>

      {/* 4. Bottom Hero Tagline & Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 pt-6 border-t border-white/[0.08]"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30">
            Skill-Based Ecosystem
          </span>
        </div>

        {/* Requested honest headline */}
        <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
          Where skills meet{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            opportunity.
          </span>
        </h3>

        <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-lg">
          SkillBridge connects students, companies, and educational institutions through direct skill-based matching and transparent hiring workflows.
        </p>

        {/* 3 Core Honest Feature Highlights */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Skill-based matching</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Verified institution listings</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Application tracking</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

