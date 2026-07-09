import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileSearch,
  BarChart3,
  Briefcase,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
  Play,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Accordion from '../components/ui/Accordion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MobileMenu from '../components/layout/MobileMenu';
import { STATS, TESTIMONIALS, PRICING_PLANS, FAQS } from '../utils/constants';
import CircularProgress from '../components/ui/CircularProgress';

const features = [
  {
    icon: FileSearch,
    title: 'AI Resume Analysis',
    description: 'Extract all information from your resume automatically with advanced AI technology.',
  },
  {
    icon: BarChart3,
    title: 'ATS Score Calculator',
    description: 'Get an accurate ATS score and understand how your resume performs against ATS systems.',
  },
  {
    icon: Briefcase,
    title: 'Job Description Matcher',
    description: 'Compare your resume against job descriptions and identify missing skills.',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Receive actionable suggestions to improve your resume and increase interview rates.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your resume data is encrypted and never shared with third parties.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Analyze your resume anytime, anywhere. No waiting for human reviewers.',
  },
];

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      <Navbar isLandingPage onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Powered by Advanced AI
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-secondary-900 dark:text-white leading-tight mb-6">
                Analyze Your Resume with{' '}
                <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Instantly extract resume details, calculate ATS score, compare with job descriptions,
                identify missing skills, and improve your chances of getting hired.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Analyze Resume
                  </Button>
                </Link>
                <Button variant="outline" size="lg" leftIcon={<Play className="w-5 h-5" />}>
                  Try Demo
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-secondary-500 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-500" />
                  <span>256-bit encryption</span>
                </div>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-3xl p-8 shadow-2xl">
                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-6 bg-white dark:bg-secondary-900 rounded-xl p-4 shadow-lg border border-secondary-200 dark:border-secondary-800"
                >
                  <div className="flex items-center gap-3">
                    <CircularProgress value={82} size={48} strokeWidth={4} showLabel={false} />
                    <div>
                      <p className="text-2xl font-bold text-secondary-900 dark:text-white">82%</p>
                      <p className="text-xs text-secondary-500">ATS Score</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-secondary-900 rounded-xl p-4 shadow-lg border border-secondary-200 dark:border-secondary-800"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary-900 dark:text-white">12 Skills Found</p>
                      <p className="text-xs text-secondary-500">Ready to match</p>
                    </div>
                  </div>
                </motion.div>

                {/* Main Image Placeholder */}
                <div className="aspect-[4/3] bg-white dark:bg-secondary-800 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <FileSearch className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                    <p className="text-secondary-600 dark:text-secondary-400 font-medium">Resume Analysis Dashboard</p>
                    <p className="text-sm text-secondary-500 mt-2">Upload and analyze in seconds</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {stat.value}
                </p>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 text-lg">
              Our AI-powered platform provides comprehensive resume analysis and optimization tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full p-6">
                  <CardBody className="p-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Loved by thousands of job seekers
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 text-lg">
              See how ResumeIQ AI has helped people land their dream jobs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6">
                  <CardBody className="p-0">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-warning-400 text-warning-400" />
                      ))}
                    </div>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-secondary-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-secondary-500">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 text-lg">
              Choose the plan that works for you. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}
              >
                <Card
                  variant={plan.highlighted ? 'gradient' : 'default'}
                  className={`h-full relative ${
                    plan.highlighted
                      ? 'ring-2 ring-primary-500 dark:ring-primary-400'
                      : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardBody className="p-6">
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-secondary-500 dark:text-secondary-400 text-sm mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-secondary-900 dark:text-white">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-secondary-500 dark:text-secondary-400">
                          /month
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          <span className="text-secondary-600 dark:text-secondary-400 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/register" className="block">
                      <Button
                        variant={plan.highlighted ? 'primary' : 'outline'}
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 text-lg">
              Everything you need to know about ResumeIQ AI.
            </p>
          </motion.div>

          <Card className="p-6">
            <Accordion
              items={FAQS.map((faq) => ({
                id: faq.id,
                title: faq.question,
                content: faq.answer,
              }))}
            />
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-accent-600 p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Ready to optimize your resume?
              </h2>
              <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of job seekers who have improved their resumes and landed their dream jobs.
              </p>
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-primary-50"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
