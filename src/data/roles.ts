import { RoleConfig } from '../types';

export const ROLES: RoleConfig[] = [
  {
    id: 'student',
    label: 'Student',
    shortLabel: 'Student / Talent',
    description: 'Build your verified skill graph, tackle real-world challenges, and unlock vetted tech opportunities.',
    tagline: 'Showcase verified proof of work, skip the resume black hole.',
    badge: 'Aspiring Talent',
    benefits: [
      'Verified Skill Credentialing',
      'Direct interview invites from top startups',
      'Personalized learning roadmaps'
    ]
  },
  {
    id: 'company',
    label: 'Company',
    shortLabel: 'Company / Recruiter',
    description: 'Source pre-vetted engineers, designers, and researchers matched by real code benchmarks.',
    tagline: 'Hire top 1% talent based on audited abilities, not keyword matching.',
    badge: 'Hiring Partners',
    benefits: [
      'Algorithmic Skill Matching (98%+ precision)',
      'Automated technical screening reports',
      'Direct pipeline to premier campus talent'
    ]
  },
  {
    id: 'institution',
    label: 'Institution',
    shortLabel: 'University / Academy',
    description: 'Track graduate outcome trajectories, partner with leading employers, and issue cryptographically verifiable credentials.',
    tagline: 'Elevate placement rates and bridge academia directly with high-growth industry.',
    badge: 'Academic Partners',
    benefits: [
      'Alumni career trajectory analytics',
      'Direct curriculum-to-industry alignment',
      'Automated cohort credential issuance'
    ]
  }
];
