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
