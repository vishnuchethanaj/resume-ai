export const APP_NAME = 'ResumeIQ AI';
export const APP_DESCRIPTION = 'AI-powered resume analysis and ATS optimization platform';

export const SKILL_CATEGORIES = [
  { id: 'frontend', label: 'Frontend', color: 'bg-blue-500' },
  { id: 'backend', label: 'Backend', color: 'bg-green-500' },
  { id: 'database', label: 'Database', color: 'bg-yellow-500' },
  { id: 'cloud', label: 'Cloud', color: 'bg-cyan-500' },
  { id: 'ai', label: 'AI/ML', color: 'bg-purple-500' },
  { id: 'devops', label: 'DevOps', color: 'bg-orange-500' },
  { id: 'programming', label: 'Languages', color: 'bg-pink-500' },
  { id: 'tools', label: 'Tools', color: 'bg-indigo-500' },
  { id: 'soft', label: 'Soft Skills', color: 'bg-teal-500' },
] as const;

export const PROFICIENCY_LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'expert', label: 'Expert' },
] as const;

export const FILE_UPLOAD_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  acceptedFormats: ['.pdf', '.doc', '.docx'],
  acceptedMimeTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

export const STATS = [
  { value: '50K+', label: 'Resumes Analyzed' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '200+', label: 'ATS Systems Supported' },
  { value: '4.9/5', label: 'User Rating' },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Software Engineer',
    company: 'Google',
    content: 'ResumeIQ AI helped me optimize my resume and I landed my dream job at Google. The ATS analysis was incredibly accurate.',
    avatar: 'https://images.pexels.com/photos/7749094/pexels-photo-7749094.jpeg?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Roberts',
    role: 'Product Manager',
    company: 'Stripe',
    content: 'The job matching feature is a game-changer. It showed me exactly which skills to highlight for each application.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Zhang',
    role: 'Data Scientist',
    company: 'Netflix',
    content: 'I was skeptical at first, but the detailed feedback on my resume was spot-on. Got callbacks from 5 top companies!',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop',
    rating: 5,
  },
];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    billingPeriod: 'monthly',
    features: [
      '3 resume analyses per month',
      'Basic ATS scoring',
      'Skill extraction',
      'Limited suggestions',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious job seekers',
    price: 19,
    billingPeriod: 'monthly',
    highlighted: true,
    features: [
      'Unlimited resume analyses',
      'Advanced ATS optimization',
      'Job matching',
      'AI suggestions',
      'Cover letter generator',
      'Priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For teams and organizations',
    price: 99,
    billingPeriod: 'monthly',
    features: [
      'Everything in Pro',
      'Team management',
      'Custom branding',
      'API access',
      'Dedicated support',
      'SSO authentication',
    ],
  },
];

export const FAQS = [
  {
    id: '1',
    question: 'How does ResumeIQ AI analyze my resume?',
    answer: 'Our AI uses advanced natural language processing to extract information from your resume and compare it against thousands of successful resumes and job requirements.',
  },
  {
    id: '2',
    question: 'Is my resume data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption and never share your data with third parties. You can delete your resume data at any time.',
  },
  {
    id: '3',
    question: 'What file formats are supported?',
    answer: 'We support PDF, DOC, and DOCX files. For best results, we recommend uploading a well-formatted PDF.',
  },
  {
    id: '4',
    question: 'How accurate is the ATS score?',
    answer: 'Our ATS scoring is based on analysis of 200+ major ATS systems and achieves 98% accuracy in predicting how your resume will be parsed.',
  },
  {
    id: '5',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
  },
];
