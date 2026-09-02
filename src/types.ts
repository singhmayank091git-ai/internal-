export type AuthMode = 'login' | 'signup';

export type UserRole = 'student' | 'company' | 'institution';

export interface RoleConfig {
  id: UserRole;
  label: string;
  shortLabel: string;
  description: string;
  tagline: string;
  badge: string;
  benefits: string[];
}

export interface FormData {
  role: UserRole;
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe: boolean;
  agreeToTerms: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

export type DashboardTab = 
  | 'dashboard' 
  | 'browse' 
  | 'applications' 
  | 'profile' 
  | 'my-listings' 
  | 'post-listing' 
  | 'applicants' 
  | 'company-profile'
  | 'pending-approvals'
  | 'all-listings'
  | 'students'
  | 'institution-profile';

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type RoleType = 'Internship' | 'Full-time';

export interface CompanyListingForm {
  roleTitle: string;
  roleType: RoleType;
  requiredSkills: string[];
  location: string;
  workMode: WorkMode;
  description: string;
}

export interface InternshipListing {
  id: string;
  company: string;
  companyLogoText: string;
  companyLogoBg: string;
  role: string;
  location: string;
  type: string;
  skills: string[];
  matchScore: number;
  postedDate: string;
  applied?: boolean;
  workMode?: WorkMode;
  status?: 'Live' | 'Pending Review' | 'Draft';
  applicantCount?: number;
  description?: string;
}

export interface ActivityUpdate {
  id: string;
  title: string;
  company: string;
  timestamp: string;
  type: 'viewed' | 'interview' | 'applied' | 'verified';
  details?: string;
}

