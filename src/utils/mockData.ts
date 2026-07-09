import type {
  ExtractedResumeData,
  ATSScore,
  JobMatch,
  Suggestion,
  Analytics,
  Resume,
} from '../types';

export const mockResumeData: ExtractedResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    portfolio: 'alexjohnson.dev',
    address: 'San Francisco, CA',
  },
  summary:
    'Senior Full-Stack Developer with 6+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2016',
      endDate: '2018',
      gpa: 3.9,
      description: 'Specialized in Machine Learning and Distributed Systems',
    },
    {
      id: '2',
      institution: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2012',
      endDate: '2016',
      gpa: 3.7,
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      current: true,
      description: [
        'Led development of microservices architecture serving 2M+ daily users',
        'Reduced API response time by 40% through optimization and caching',
        'Mentored team of 5 junior developers on best practices and code quality',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      title: 'Full-Stack Developer',
      location: 'Remote',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      current: false,
      description: [
        'Built real-time collaboration platform from ground up',
        'Integrated third-party APIs and payment systems',
        'Developed mobile-responsive frontend using React',
        'Collaborated with design team to improve UX',
      ],
      technologies: ['React', 'TypeScript', 'MongoDB', 'Redis', 'Socket.io'],
    },
  ],
  projects: [
    {
      id: '1',
      name: 'CodeCollab',
      description: 'Real-time code collaboration platform with video chat',
      technologies: ['React', 'WebRTC', 'Node.js', 'Socket.io'],
      complexity: 'high',
      impactScore: 95,
    },
    {
      id: '2',
      name: 'AI Task Manager',
      description: 'Smart task management with AI-powered prioritization',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
      complexity: 'high',
      impactScore: 88,
    },
  ],
  skills: [
    { name: 'React', category: 'frontend', level: 'expert' },
    { name: 'TypeScript', category: 'programming', level: 'expert' },
    { name: 'Node.js', category: 'backend', level: 'advanced' },
    { name: 'Python', category: 'programming', level: 'advanced' },
    { name: 'PostgreSQL', category: 'database', level: 'advanced' },
    { name: 'AWS', category: 'cloud', level: 'intermediate' },
    { name: 'Docker', category: 'devops', level: 'intermediate' },
    { name: 'Git', category: 'tools', level: 'expert' },
  ],
  certificates: [
    { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
    { name: 'Professional Scrum Master', issuer: 'Scrum.org', date: '2022' },
  ],
  languages: [
    { name: 'English', proficiency: 'native' },
    { name: 'Spanish', proficiency: 'conversational' },
  ],
  achievements: [
    'First place winner at TechCrunch Hackathon 2022',
    'Open source contributor with 500+ GitHub stars',
  ],
};

export const mockATSScore: ATSScore = {
  overall: 82,
  breakdown: {
    formatting: 90,
    keywords: 78,
    skills: 85,
    education: 95,
    projects: 80,
    experience: 75,
  },
  suggestions: [
    'Add more industry-specific keywords to your summary',
    'Include measurable achievements in your experience section',
    'Consider adding a certifications section',
  ],
};

export const mockJobMatch: JobMatch = {
  jobId: 'job-1',
  jobTitle: 'Senior Frontend Engineer',
  company: 'OpenAI',
  description: 'We are looking for a Senior Frontend Engineer to join our team...',
  matchScore: 78,
  breakdown: {
    skills: 85,
    keywords: 72,
    experience: 80,
    education: 90,
  },
  matchingSkills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
  missingSkills: ['Next.js', 'GraphQL', 'WebSockets'],
  recommendations: [
    'Add experience with Next.js or similar React frameworks',
    'Highlight GraphQL knowledge if applicable',
    'Emphasize real-time features experience',
  ],
};

export const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'keyword',
    priority: 'high',
    title: 'Add Industry Keywords',
    description: 'Your resume is missing common ATS keywords for your target role.',
    original: 'Built web applications',
    suggested: 'Architected and developed scalable web applications using React and Node.js',
  },
  {
    id: '2',
    type: 'action_verb',
    priority: 'medium',
    title: 'Use Stronger Action Verbs',
    description: 'Replace passive phrases with strong action verbs.',
    original: 'Responsible for managing team',
    suggested: 'Led a cross-functional team of 8 engineers to deliver projects on schedule',
  },
  {
    id: '3',
    type: 'format',
    priority: 'low',
    title: 'Improve Date Formatting',
    description: 'Use consistent date format throughout your resume.',
  },
];

export const mockAnalytics: Analytics = {
  atsTrend: [
    { date: '2024-01', score: 65 },
    { date: '2024-02', score: 72 },
    { date: '2024-03', score: 75 },
    { date: '2024-04', score: 78 },
    { date: '2024-05', score: 82 },
    { date: '2024-06', score: 85 },
  ],
  skillDistribution: [
    { category: 'Frontend', count: 8 },
    { category: 'Backend', count: 6 },
    { category: 'Cloud', count: 4 },
    { category: 'DevOps', count: 3 },
    { category: 'Database', count: 5 },
  ],
  resumeHistory: [
    { date: '2024-01', score: 65 },
    { date: '2024-02', score: 72 },
    { date: '2024-03', score: 75 },
    { date: '2024-04', score: 78 },
    { date: '2024-05', score: 82 },
  ],
  topSkills: [
    { name: 'React', count: 15 },
    { name: 'TypeScript', count: 12 },
    { name: 'Node.js', count: 10 },
    { name: 'Python', count: 8 },
    { name: 'AWS', count: 6 },
  ],
  missingSkills: [
    { name: 'GraphQL', frequency: 8 },
    { name: 'Kubernetes', frequency: 6 },
    { name: 'Next.js', frequency: 5 },
  ],
  jobMatches: [
    { company: 'Google', score: 85 },
    { company: 'Meta', score: 82 },
    { company: 'Amazon', score: 78 },
    { company: 'Netflix', score: 75 },
  ],
};

export const mockResumes: Resume[] = [
  {
    id: '1',
    userId: 'user-1',
    fileName: 'Alex_Johnson_Resume_2024.pdf',
    fileUrl: '/resumes/resume1.pdf',
    uploadedAt: new Date('2024-06-15'),
    lastAnalyzed: new Date('2024-06-16'),
    atsScore: 82,
    status: 'completed',
  },
  {
    id: '2',
    userId: 'user-1',
    fileName: 'Alex_Johnson_Senior_SWE.pdf',
    fileUrl: '/resumes/resume2.pdf',
    uploadedAt: new Date('2024-05-20'),
    lastAnalyzed: new Date('2024-05-21'),
    atsScore: 75,
    status: 'completed',
  },
  {
    id: '3',
    userId: 'user-1',
    fileName: 'Draft_Resume_Notes.pdf',
    fileUrl: '/resumes/resume3.pdf',
    uploadedAt: new Date('2024-04-10'),
    lastAnalyzed: new Date('2024-04-11'),
    atsScore: 65,
    status: 'completed',
  },
];
