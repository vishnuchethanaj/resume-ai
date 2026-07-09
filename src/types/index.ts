export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  lastAnalyzed?: Date;
  atsScore?: number;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
}

export interface ExtractedResumeData {
  personalInfo: {
    name: string | null;
    email: string | null;
    phone: string | null;
    linkedin?: string | null;
    github?: string | null;
    portfolio?: string | null;
    address?: string | null;
  };
  summary: string | null;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certificates: Certificate[];
  languages: Language[];
  achievements: string[];
  rawText?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  complexity: 'low' | 'medium' | 'high';
  impactScore: number;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'ai'
  | 'devops'
  | 'programming'
  | 'tools'
  | 'soft';

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  name: string;
  proficiency: 'basic' | 'conversational' | 'proficient' | 'native';
}

export interface ATSScore {
  overall: number;
  breakdown: {
    formatting: number;
    keywords: number;
    skills: number;
    education: number;
    projects: number;
    experience: number;
  };
  suggestions: string[];
}

export interface JobMatch {
  jobId: string;
  jobTitle: string;
  company: string;
  description: string;
  matchScore: number;
  breakdown: {
    skills: number;
    keywords: number;
    experience: number;
    education: number;
  };
  matchingSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  content: string;
  url?: string;
  createdAt: Date;
}

export interface AnalysisReport {
  id: string;
  resumeId: string;
  jobId?: string;
  atsScore: ATSScore;
  jobMatch?: JobMatch;
  suggestions: Suggestion[];
  createdAt: Date;
}

export interface Suggestion {
  id: string;
  type: 'keyword' | 'action_verb' | 'grammar' | 'format' | 'certification' | 'project';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  original?: string;
  suggested?: string;
}

export interface Analytics {
  atsTrend: { date: string; score: number }[];
  skillDistribution: { category: string; count: number }[];
  resumeHistory: { date: string; score: number }[];
  topSkills: { name: string; count: number }[];
  missingSkills: { name: string; frequency: number }[];
  jobMatches: { company: string; score: number }[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  highlighted?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
