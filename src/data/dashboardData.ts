import { InternshipListing, ActivityUpdate } from '../types';

export const RECOMMENDED_INTERNSHIPS: InternshipListing[] = [
  {
    id: 'intern-1',
    company: 'TechCorp',
    companyLogoText: 'TC',
    companyLogoBg: 'from-blue-600 to-cyan-600',
    role: 'Frontend Engineering Intern',
    location: 'Remote / San Francisco, CA',
    type: 'Full-time Summer 2026',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    matchScore: 94,
    postedDate: '2 days ago',
  },
  {
    id: 'intern-2',
    company: 'Innovate Labs',
    companyLogoText: 'IL',
    companyLogoBg: 'from-emerald-600 to-teal-600',
    role: 'Data Science & Analytics Intern',
    location: 'Hybrid / Austin, TX',
    type: 'Part-time Fall 2026',
    skills: ['Python', 'SQL', 'Data Modeling'],
    matchScore: 88,
    postedDate: '3 days ago',
  },
  {
    id: 'intern-3',
    company: 'Nexa Systems',
    companyLogoText: 'NS',
    companyLogoBg: 'from-indigo-600 to-purple-600',
    role: 'Software Development Intern',
    location: 'Remote / Seattle, WA',
    type: 'Full-time Summer 2026',
    skills: ['Node.js', 'REST APIs', 'PostgreSQL'],
    matchScore: 85,
    postedDate: '5 days ago',
  },
];

export const RECENT_ACTIVITIES: ActivityUpdate[] = [
  {
    id: 'act-1',
    title: 'Application viewed by TechCorp',
    company: 'TechCorp',
    timestamp: '2 hours ago',
    type: 'viewed',
    details: 'Recruiting team opened your verified React & TypeScript skill profile.',
  },
  {
    id: 'act-2',
    title: 'Interview invitation received from Innovate Labs',
    company: 'Innovate Labs',
    timestamp: 'Yesterday at 4:15 PM',
    type: 'interview',
    details: 'Introductory 30-minute technical fit screening scheduled.',
  },
  {
    id: 'act-3',
    title: 'Application submitted to Nexa Systems',
    company: 'Nexa Systems',
    timestamp: '3 days ago',
    type: 'applied',
    details: 'Role: Software Development Intern. Status: Under Initial Review.',
  },
];

export const STUDENT_PROFILE_DATA = {
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  role: 'Computer Science & Software Engineering',
  university: 'State University of Technology',
  graduationYear: 'Class of 2027',
  completionPercentage: 60,
  applicationsSentCount: 4,
  applicationsBreakdown: {
    inReview: 2,
    interviews: 1,
    viewed: 1,
  },
  missingProfileItems: [
    'Add a portfolio/resume link',
    'Add your batch year and department',
  ],
};
