import { RoleConfig } from '../types';

export const ROLES: RoleConfig[] = [
  {
    id: 'student',
    label: 'Student',
    shortLabel: 'Student / Talent',
    description: 'Build your skill profile, explore verified opportunities, and track applications transparently.',
    tagline: 'Showcase verified skills and connect directly with open roles.',
    badge: 'Candidate Portal',
    benefits: [
      'Skill-based matching',
      'Verified institution listings',
      'Application tracking'
    ]
  },
  {
    id: 'company',
    label: 'Company',
    shortLabel: 'Company / Recruiter',
    description: 'Discover candidates matched by verified skills and post job openings directly.',
    tagline: 'Discover qualified candidates matched by verified skill sets.',
    badge: 'Hiring Portal',
    benefits: [
      'Skill-based candidate search',
      'Application tracking pipeline',
      'Verified institution connections'
    ]
  },
  {
    id: 'institution',
    label: 'Institution',
    shortLabel: 'University / Academy',
    description: 'Manage verified student directories, connect with hiring companies, and track outcomes.',
    tagline: 'Connect students and academic programs with verified employers.',
    badge: 'Institution Portal',
    benefits: [
      'Verified institution listings',
      'Student career outcomes',
      'Employer network directory'
    ]
  }
];

