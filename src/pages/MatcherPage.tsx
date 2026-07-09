import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ClipboardPaste,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Textarea from '../components/ui/Textarea';
import CircularProgress from '../components/ui/CircularProgress';
import ProgressBar, { CategoryProgressBar } from '../components/ui/ProgressBar';
import { useResume } from '../contexts/ResumeContext';
import { mockJobMatch } from '../utils/mockData';

export default function MatcherPage() {
  const { currentResume } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<typeof mockJobMatch | null>(null);

  const handleMatch = async () => {
    if (!jobDescription.trim()) return;

    setIsMatching(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMatchResult(mockJobMatch);
    setIsMatching(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Job Matcher
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Compare your resume against job descriptions to see how well you match.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Job Description Input */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="p-6 border-b border-secondary-200 dark:border-secondary-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <ClipboardPaste className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-secondary-900 dark:text-white">
                    Paste Job Description
                  </h2>
                  <p className="text-sm text-secondary-500">
                    Copy and paste the job posting you're interested in
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="text-sm"
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-secondary-500">
                  {jobDescription.length} characters
                </p>
                <Button
                  onClick={handleMatch}
                  isLoading={isMatching}
                  disabled={!jobDescription.trim() || !currentResume}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Match Resume
                </Button>
              </div>

              {!currentResume && (
                <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Please upload a resume first
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>

        {/* Match Results */}
        <motion.div variants={itemVariants}>
          {matchResult ? (
            <Card className="h-full">
              <CardHeader className="p-6 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-secondary-900 dark:text-white">
                        Match Results
                      </h2>
                      <p className="text-sm text-secondary-500">
                        {matchResult.jobTitle} at {matchResult.company}
                      </p>
                    </div>
                  </div>
                  <CircularProgress
                    value={matchResult.matchScore}
                    size={64}
                    strokeWidth={6}
                    showLabel={false}
                  />
                </div>
              </CardHeader>
              <CardBody className="p-6 space-y-6">
                {/* Overall Match */}
                <div className="text-center py-4">
                  <p
                    className={`text-4xl font-bold ${
                      matchResult.matchScore >= 80
                        ? 'text-success-500'
                        : matchResult.matchScore >= 60
                        ? 'text-warning-500'
                        : 'text-error-500'
                    }`}
                  >
                    {matchResult.matchScore}% Match
                  </p>
                  <p className="text-secondary-500 mt-1">
                    {matchResult.matchScore >= 80
                      ? "You're a strong match for this role!"
                      : matchResult.matchScore >= 60
                      ? 'Good match, but some improvements needed'
                      : 'Consider improving your resume for this role'}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Score Breakdown
                  </h3>
                  {Object.entries(matchResult.breakdown).map(([key, value]) => (
                    <CategoryProgressBar
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                      color={
                        value >= 80
                          ? 'bg-success-500'
                          : value >= 60
                          ? 'bg-warning-500'
                          : 'bg-error-500'
                      }
                    />
                  ))}
                </div>

                {/* Skills Match */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-success-500" />
                      <h3 className="font-medium text-success-700 dark:text-success-400">
                        Matching Skills
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {matchResult.matchingSkills.map((skill) => (
                        <Badge key={skill} variant="success" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-error-500" />
                      <h3 className="font-medium text-error-700 dark:text-error-400">
                        Missing Skills
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {matchResult.missingSkills.map((skill) => (
                        <Badge key={skill} variant="error" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                    Recommendations
                  </h3>
                  <div className="space-y-2">
                    {matchResult.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 rounded-lg bg-secondary-50 dark:bg-secondary-800/50"
                      >
                        <Zap className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-secondary-400" />
                </div>
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                  No Match Yet
                </h3>
                <p className="text-secondary-500 max-w-xs">
                  Paste a job description and click "Match Resume" to see how well you fit the role.
                </p>
              </div>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div variants={itemVariants} className="mt-8">
        <Card className="p-6">
          <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">
            Tips for Better Matching
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 dark:text-white text-sm">
                  Be Specific
                </p>
                <p className="text-xs text-secondary-500">
                  Include the full job posting for accurate matching.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 dark:text-white text-sm">
                  Highlight Keywords
                </p>
                <p className="text-xs text-secondary-500">
                  Use the same terminology as the job description.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 dark:text-white text-sm">
                  Show Impact
                </p>
                <p className="text-xs text-secondary-500">
                  Quantify your achievements with metrics.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
