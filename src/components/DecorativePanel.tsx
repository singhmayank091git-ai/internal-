import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, TrendingUp, Zap, ShieldCheck, ArrowUpRight, Award, Compass } from 'lucide-react';
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
      {/* 1. Deep Gradient Mesh Background & Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Navy/Dark grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Primary Blue Glow Blob (Top Left / Center) */}
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
          className="absolute -top-16 -left-16 w-[420px] h-[420px] rounded-full bg-blue-600/30 blur-[110px]"
        />

        {/* Vivid Purple / Violet Glow Blob (Bottom Right) */}
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
          className="absolute -bottom-20 -right-16 w-[480px] h-[480px] rounded-full bg-purple-600/35 blur-[120px]"
        />

        {/* Electric Indigo Glow Center Blob */}
        <motion.div
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-indigo-500/25 blur-[90px]"
        />

        {/* Subtle Cyan Edge Light */}
        <div className="absolute top-1/4 -right-12 w-64 h-64 rounded-full bg-cyan-500/15 blur-[80px]" />
      </div>

      {/* 2. Top Bar: Brand Pill Badge & Real-Time Match Telemetry */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-lg"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-slate-200">Skill Graph v3.4 Active</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>SOC-2 & Cryptographically Verified</span>
        </motion.div>
      </div>

      {/* 3. Center Section: Floating Abstract UI Modules */}
      <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
        
        {/* Floating Card 1: Intelligent Match Engine card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-md p-5 rounded-2xl bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/[0.12] backdrop-blur-2xl shadow-2xl shadow-black/40 hover:border-white/20 transition-all duration-300 animate-float-slow"
          id="showcase-match-card"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-900/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  Autonomous Skill Match
                </h4>
                <p className="text-xs text-slate-400">
                  Real-world code & project verification
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>98.4% Match</span>
            </div>
          </div>

          {/* Skill Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['Distributed Systems', 'TypeScript', 'LLM Agent Arch', 'Next.js 15'].map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 text-indigo-200 border border-indigo-500/20"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Dynamic insight reflecting left panel role */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-slate-300 font-medium">{currentRole.badge}:</span>
              <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">{currentRole.tagline}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-indigo-400 shrink-0" />
          </div>
        </motion.div>

        {/* Floating Mini Badges & Orbiting nodes */}
        <div className="w-full max-w-md relative mt-4">
          {/* Floating Pill Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute -top-3 -left-4 sm:-left-6 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-indigo-500/30 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-medium text-slate-200 animate-float-reverse"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span>Instant Opportunity Bridge</span>
          </motion.div>

          {/* Floating Pill Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="absolute -top-2 -right-4 sm:-right-6 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-purple-500/30 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-medium text-slate-200 animate-float-slow"
          >
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span>Top 1% Verified Talent</span>
          </motion.div>
        </div>

        {/* Partner Logos / Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-4 text-slate-500 text-xs font-medium"
        >
          <span className="text-[11px] text-slate-400 tracking-wider uppercase font-semibold">
            Connecting leaders at
          </span>
          <div className="flex items-center gap-3 text-slate-300 font-semibold tracking-tight">
            <span className="opacity-70 hover:opacity-100 transition-opacity">Stanford</span>
            <span className="text-slate-700">•</span>
            <span className="opacity-70 hover:opacity-100 transition-opacity">MIT</span>
            <span className="text-slate-700">•</span>
            <span className="opacity-70 hover:opacity-100 transition-opacity">Vercel</span>
            <span className="text-slate-700">•</span>
            <span className="opacity-70 hover:opacity-100 transition-opacity">Linear</span>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Hero Tagline & Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative z-10 pt-6 border-t border-white/[0.08]"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30">
            Next-Gen Talent Infrastructure
          </span>
        </div>

        {/* Prompt required tagline */}
        <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
          Where skills meet{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            opportunity.
          </span>
        </h3>

        <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-lg">
          The intelligent platform connecting ambitious students, breakthrough companies, and world-class academic institutions through verified, proof-of-work talent pipelines.
        </p>

        {/* Benefits checklist based on active role */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          {currentRole.benefits.slice(0, 2).map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{benefit}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
