import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Upload,
  FileSearch,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import CircularProgress from '../components/ui/CircularProgress';
import Badge from '../components/ui/Badge';
import { useResume } from '../contexts/ResumeContext';
import { formatDate } from '../utils/helpers';
import { mockAnalytics } from '../utils/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#3b82f6', '#60a5fa', '#3b82f6', '#f59e0b', '#8b5cf6'];

export default function DashboardPage() {
  const { resumes, currentResume, atsScore } = useResume();

  const recentResumes = resumes.slice(0, 3);
  const avgScore = resumes.reduce((acc, r) => acc + (r.atsScore || 0), 0) / resumes.length || 0;

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
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Welcome back
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Here's an overview of your resume optimization progress.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4 mb-8">
        <Link to="/upload">
          <Card hover className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900 dark:text-white">Upload Resume</p>
                <p className="text-sm text-secondary-500">Analyze a new resume</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/reports">
          <Card hover className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white">
                <FileSearch className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900 dark:text-white">ATS Reports</p>
                <p className="text-sm text-secondary-500">View past analyses</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/matcher">
          <Card hover className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900 dark:text-white">Job Matcher</p>
                <p className="text-sm text-secondary-500">Compare with jobs</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/analytics">
          <Card hover className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning-500 to-warning-600 flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900 dark:text-white">Analytics</p>
                <p className="text-sm text-secondary-500">Track your progress</p>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* ATS Score Card */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-secondary-900 dark:text-white">Current ATS Score</h2>
              <Badge variant={atsScore?.overall && atsScore.overall >= 80 ? 'success' : 'warning'}>
                {atsScore?.overall ? `${atsScore.overall}%` : 'No data'}
              </Badge>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-6">
            <div className="flex items-center justify-center">
              <CircularProgress
                value={currentResume?.atsScore || avgScore || 0}
                size={140}
                strokeWidth={10}
                label="Overall"
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {resumes.length}
                </p>
                <p className="text-sm text-secondary-500">Resumes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {Math.round(avgScore)}%
                </p>
                <p className="text-sm text-secondary-500">Avg Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success-500">+12%</p>
                <p className="text-sm text-secondary-500">Improved</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Performance Chart */}
        <Card className="p-6 lg:col-span-2">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-secondary-900 dark:text-white">Score Trend</h2>
              <div className="flex items-center gap-2 text-success-500 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>Improving</span>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics.atsTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Recent & Skills */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
        {/* Recent Resumes */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-secondary-900 dark:text-white">Recent Resumes</h2>
              <Link to="/history">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View all
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-4">
            <div className="space-y-4">
              {recentResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary-50 dark:bg-secondary-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        resume.status === 'completed'
                          ? 'bg-success-100 dark:bg-success-900/30'
                          : resume.status === 'analyzing'
                          ? 'bg-warning-100 dark:bg-warning-900/30'
                          : 'bg-secondary-200 dark:bg-secondary-700'
                      }`}
                    >
                      {resume.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-success-500" />
                      ) : resume.status === 'analyzing' ? (
                        <Clock className="w-5 h-5 text-warning-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-secondary-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white text-sm">
                        {resume.fileName}
                      </p>
                      <p className="text-xs text-secondary-500">{formatDate(resume.uploadedAt)}</p>
                    </div>
                  </div>
                  {resume.atsScore && (
                    <Badge
                      variant={resume.atsScore >= 80 ? 'success' : 'warning'}
                      size="sm"
                    >
                      {resume.atsScore}%
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Skills Distribution */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <h2 className="font-semibold text-secondary-900 dark:text-white">Skills Distribution</h2>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-4">
            <div className="flex items-center justify-center h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAnalytics.skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="count"
                    nameKey="category"
                    label={({ name }) => name}
                    labelLine={false}
                  >
                    {mockAnalytics.skillDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {mockAnalytics.skillDistribution.slice(0, 6).map((item, index) => (
                <div key={item.category} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-secondary-600 dark:text-secondary-400">{item.category}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
}
