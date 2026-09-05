import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  MapPin, 
  Briefcase, 
  Info, 
  Clock, 
  ChevronDown,
  ArrowRight,
  ShieldAlert,
  Send
} from 'lucide-react';
import { CompanyListingForm, RoleType, WorkMode, InternshipListing } from '../types';
import { supabase } from '../lib/supabaseClient';

interface PostListingViewProps {
  onListingCreated?: (listing: InternshipListing) => void;
  onNavigateToMyListings?: () => void;
  companyName?: string;
}

export const PostListingView: React.FC<PostListingViewProps> = ({
  onListingCreated,
  onNavigateToMyListings,
  companyName = 'TechCorp Labs',
}) => {
  const [formData, setFormData] = useState<CompanyListingForm>({
    roleTitle: '',
    roleType: 'Internship',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
    location: 'San Francisco, CA / Remote',
    workMode: 'Remote',
    description: '',
  });

  const [currentSkillInput, setCurrentSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedListing, setSubmittedListing] = useState<InternshipListing | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const workModes: WorkMode[] = ['Remote', 'Hybrid', 'On-site'];
  const suggestedSkills = ['Node.js', 'Python', 'SQL', 'PostgreSQL', 'Figma', 'Docker', 'REST APIs', 'AWS'];

  const handleAddSkill = (skillToAdd?: string) => {
    const raw = skillToAdd !== undefined ? skillToAdd : currentSkillInput;
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (formData.requiredSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setCurrentSkillInput('');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, trimmed],
    }));
    setCurrentSkillInput('');
    if (formErrors.skills) {
      setFormErrors((prev) => ({ ...prev, skills: '' }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.roleTitle.trim()) {
      errors.roleTitle = 'Please enter a role title';
    }
    if (formData.requiredSkills.length === 0) {
      errors.skills = 'Please add at least one required skill';
    }
    if (!formData.location.trim()) {
      errors.location = 'Please specify a location or timezone';
    }
    if (!formData.description.trim()) {
      errors.description = 'Please provide a role description and student expectations';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setIsSubmitting(false);
      return;
    }

    const { data: inserted, error } = await supabase
      .from('listings')
      .insert({
        company_id: userData.user.id,
        title: formData.roleTitle,
        required_skills: formData.requiredSkills,
        location: formData.location,
        work_mode: formData.workMode,
        description: formData.description,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      setIsSubmitting(false);
      alert('Error posting listing: ' + error.message);
      return;
    }

    const newListing: InternshipListing = {
      id: inserted.id,
      company: companyName,
      companyLogoText: companyName.slice(0, 2).toUpperCase(),
      companyLogoBg: 'from-emerald-600 to-cyan-600',
      role: formData.roleTitle,
      location: formData.location,
      type: formData.roleType === 'Internship' ? 'Summer Internship 2026' : 'Full-time Entry Level',
      skills: formData.requiredSkills,
      matchScore: 92,
      postedDate: 'Just now',
      workMode: formData.workMode,
      status: 'Pending Review',
      applicantCount: 0,
      description: formData.description,
    };

    if (onListingCreated) {
      onListingCreated(newListing);
    }

    setSubmittedListing(newListing);
    setIsSubmitting(false);
  };

  const handleResetForm = () => {
    setFormData({
      roleTitle: '',
      roleType: 'Internship',
      requiredSkills: ['React', 'TypeScript'],
      location: '',
      workMode: 'Remote',
      description: '',
    });
    setSubmittedListing(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto" id="post-listing-container">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Company Portal
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {companyName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1.5">
            Post a New Listing
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Create and publish verified student internship or full-time opportunities.
          </p>
        </div>

        {onNavigateToMyListings && (
          <button
            type="button"
            onClick={onNavigateToMyListings}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>View My Listings</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submittedListing ? (
          /* Success / Submitted Card State */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="rounded-3xl bg-[#0B0F1E]/90 backdrop-blur-2xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-950/50">
                <div className="w-full h-full rounded-2xl bg-[#0B0F1E] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Listing Submitted for Review!</h3>
                <p className="text-xs text-slate-400">Status: Pending Institution Approval</p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3 my-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Role</span>
                  <div className="text-base font-bold text-white">{submittedListing.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {submittedListing.type}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {submittedListing.workMode}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{submittedListing.location}</span>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block mb-1.5">Required Skill Set:</span>
                <div className="flex flex-wrap gap-1.5">
                  {submittedListing.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/[0.05] text-slate-200 border border-white/[0.08]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5 my-4">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Next Step:</strong> Your listing will be reviewed by the institution before it goes live. You will receive an instant notification once students can start applying.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
              {onNavigateToMyListings && (
                <button
                  type="button"
                  onClick={onNavigateToMyListings}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-md shadow-emerald-950/40 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Go to My Listings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                Post Another Listing
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Creation Form */
          <motion.div
            key="creation-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-3xl bg-[#0B0F1E]/90 backdrop-blur-2xl border border-white/[0.08] p-5 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background ambient light */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Create Internship/Job Listing</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fill in the listing details below to match with qualified students.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" id="create-listing-form">
              {/* 1. Role Title & Role Type */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
                {/* Role Title */}
                <div className="sm:col-span-8">
                  <label htmlFor="role-title-input" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Role Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="role-title-input"
                    type="text"
                    value={formData.roleTitle}
                    onChange={(e) => {
                      setFormData({ ...formData, roleTitle: e.target.value });
                      if (formErrors.roleTitle) setFormErrors({ ...formErrors, roleTitle: '' });
                    }}
                    placeholder="e.g. Frontend Engineering Intern, Data Analyst"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border ${
                      formErrors.roleTitle ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/[0.08] focus:border-cyan-400'
                    } text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-all`}
                  />
                  {formErrors.roleTitle && (
                    <p className="mt-1 text-xs text-rose-400">{formErrors.roleTitle}</p>
                  )}
                </div>

                {/* Role Type Dropdown */}
                <div className="sm:col-span-4">
                  <label htmlFor="role-type-select" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Role Type <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="role-type-select"
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value as RoleType })}
                      className="w-full appearance-none px-4 py-2.5 rounded-xl bg-[#0E1424] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/40 pr-10 cursor-pointer"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 2. Required Skills (Tag Input) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Required Skills <span className="text-rose-400">*</span>
                  <span className="text-slate-400 font-normal lowercase ml-1.5">(type and press enter or click Add)</span>
                </label>

                {/* Tag Input Box */}
                <div className={`p-2.5 rounded-xl bg-white/[0.04] border ${
                  formErrors.skills ? 'border-rose-500/60' : 'border-white/[0.08] focus-within:border-cyan-400'
                } transition-all`}>
                  {/* Current Active Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 text-cyan-200 border border-cyan-500/30 shadow-sm"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-cyan-400 hover:text-white rounded-md p-0.5 hover:bg-white/10 transition-colors cursor-pointer"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Input field inside container */}
                  <div className="flex items-center gap-2">
                    <input
                      id="skill-tag-input"
                      type="text"
                      value={currentSkillInput}
                      onChange={(e) => setCurrentSkillInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add a skill (e.g. Python, SQL, Docker, React)..."
                      className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-slate-500 focus:outline-none px-1"
                    />
                    <button
                      type="button"
                      id="add-skill-btn"
                      onClick={() => handleAddSkill()}
                      disabled={!currentSkillInput.trim()}
                      className="px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-cyan-500/20 text-xs font-semibold text-slate-200 hover:text-cyan-300 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {formErrors.skills && (
                  <p className="mt-1 text-xs text-rose-400">{formErrors.skills}</p>
                )}

                {/* Suggested Quick Add Chips */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 mr-1">Suggestions:</span>
                  {suggestedSkills
                    .filter((s) => !formData.requiredSkills.includes(s))
                    .slice(0, 6)
                    .map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleAddSkill(suggestion)}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.03] text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] border border-white/[0.06] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-2.5 h-2.5" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* 3. Location & Work Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
                {/* Location Input */}
                <div className="sm:col-span-6">
                  <label htmlFor="location-input" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Location <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="location-input"
                      type="text"
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (formErrors.location) setFormErrors({ ...formErrors, location: '' });
                      }}
                      placeholder="e.g. Austin, TX, Remote (US), London, UK"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border ${
                        formErrors.location ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/[0.08] focus:border-cyan-400'
                      } text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-all`}
                    />
                  </div>
                  {formErrors.location && (
                    <p className="mt-1 text-xs text-rose-400">{formErrors.location}</p>
                  )}
                </div>

                {/* Work Mode Pill Selector */}
                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Work Mode <span className="text-rose-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Work Mode Selector">
                    {workModes.map((mode) => {
                      const isSelected = formData.workMode === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          id={`work-mode-pill-${mode.toLowerCase()}`}
                          onClick={() => setFormData({ ...formData, workMode: mode })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-cyan-950/50 border border-cyan-400/40'
                              : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.07] border border-white/[0.06]'
                          }`}
                        >
                          <span>{mode}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Description Textarea */}
              <div>
                <label htmlFor="description-textarea" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Description & Student Responsibilities <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="description-textarea"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (formErrors.description) setFormErrors({ ...formErrors, description: '' });
                  }}
                  placeholder="Outline the internship overview, expected tasks, learning outcomes, and mentoring support..."
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                    formErrors.description ? 'border-rose-500/60 focus:border-rose-400' : 'border-white/[0.08] focus:border-cyan-400'
                  } text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-all resize-y`}
                />
                {formErrors.description && (
                  <p className="mt-1 text-xs text-rose-400">{formErrors.description}</p>
                )}
              </div>

              {/* 5. Submit Section & Institution Review Note */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Review Note */}
                <div className="flex items-start gap-2 text-xs text-slate-400 max-w-md">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Your listing will be reviewed by the institution before it goes live.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="submit-listing-btn"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
