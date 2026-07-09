import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  Briefcase,
  BarChart3,
  PieChart,
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { mockAnalytics } from '../utils/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#3b82f6', '#60a5fa', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function AnalyticsPage() {
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
          Analytics
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Track your resume performance and skill development.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">+20%</p>
              <p className="text-sm text-secondary-500">Score Improvement</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">82%</p>
              <p className="text-sm text-secondary-500">Avg ATS Score</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">12</p>
              <p className="text-sm text-secondary-500">Jobs Matched</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning-500 to-warning-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">5</p>
              <p className="text-sm text-secondary-500">Skills to Add</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* ATS Score Trend */}
        <Card className="p-6 lg:col-span-2">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-secondary-900 dark:text-white">
                ATS Score Trend
              </h2>
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

        {/* Skill Distribution Pie */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-secondary-900 dark:text-white">
                Skill Categories
              </h2>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={mockAnalytics.skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="count"
                    nameKey="category"
                  >
                    {mockAnalytics.skillDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {mockAnalytics.skillDistribution.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-secondary-600 dark:text-secondary-400 truncate">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Top Skills */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-secondary-900 dark:text-white">Top Skills</h2>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-4 space-y-4">
            {mockAnalytics.topSkills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary-400">#{index + 1}</span>
                    <span className="font-medium text-secondary-900 dark:text-white">
                      {skill.name}
                    </span>
                  </div>
                  <Badge variant="primary" size="sm">
                    {skill.count} mentions
                  </Badge>
                </div>
                <ProgressBar
                  value={skill.count}
                  max={mockAnalytics.topSkills[0].count}
                />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Missing Skills */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning-500" />
              <h2 className="font-semibold text-secondary-900 dark:text-white">
                Missing Skills
              </h2>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-4 space-y-4">
            {mockAnalytics.missingSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-secondary-900 dark:text-white">
                    {skill.name}
                  </span>
                  <Badge variant="warning" size="sm">
                    {skill.frequency} job posts
                  </Badge>
                </div>
                <ProgressBar
                  value={skill.frequency}
                  max={mockAnalytics.missingSkills[0].frequency}
                  variant="warning"
                />
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>

      {/* Job Matches Chart */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-secondary-900 dark:text-white">
                Job Match Scores
              </h2>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0 pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.jobMatches} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="company"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
}
