import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  MapPin,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Award,
  Languages,
  FileText,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CircularProgress from '../components/ui/CircularProgress';
import ProgressBar, { CategoryProgressBar } from '../components/ui/ProgressBar';
import { useResume } from '../contexts/ResumeContext';
import { SKILL_CATEGORIES } from '../utils/constants';

export default function AnalysisPage() {
  const { currentResume, extractedData, atsScore, latestReport } = useResume();

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

  if (!extractedData || !atsScore) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto text-center py-20"
      >
        <div className="w-20 h-20 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-secondary-400" />
        </div>
        <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-4">
          No Resume Analyzed Yet
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-8 max-w-md mx-auto">
          Upload your resume to get started with AI-powered analysis and ATS scoring.
        </p>
        <Link to="/upload">
          <Button rightIcon={<ArrowRight className="w-5 h-5" />}>Upload Resume</Button>
        </Link>
      </motion.div>
    );
  }

  const getSkillColor = (category: string) => {
    const cat = SKILL_CATEGORIES.find((c) => c.id === category);
    return cat?.color || 'bg-secondary-500';
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-2">
              Resume Analysis
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400">
              AI-powered breakdown of your resume content
            </p>
          </div>
          <Link to="/matcher">
            <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
              Match with Jobs
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <CircularProgress value={atsScore.overall} size={64} strokeWidth={6} showLabel={false} />
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {atsScore.overall}%
              </p>
              <p className="text-sm text-secondary-500">ATS Score</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-success-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {extractedData.experience.length}
              </p>
              <p className="text-sm text-secondary-500">Experiences</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
              <FolderKanban className="w-6 h-6 text-accent-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {extractedData.projects.length}
              </p>
              <p className="text-sm text-secondary-500">Projects</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {extractedData.skills.length}
              </p>
              <p className="text-sm text-secondary-500">Skills</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Education */}
        <div className="space-y-6">
          {/* Personal Info */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-secondary-900 dark:text-white">
                    Personal Information
                  </h2>
                </div>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-4 space-y-4">
                <div>
                  <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {extractedData.personalInfo.name}
                  </p>
                  <p className="text-secondary-500 text-sm">{extractedData.summary}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-secondary-400" />
                    <span className="text-secondary-600 dark:text-secondary-400">
                      {extractedData.personalInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-secondary-400" />
                    <span className="text-secondary-600 dark:text-secondary-400">
                      {extractedData.personalInfo.phone}
                    </span>
                  </div>
                  {extractedData.personalInfo.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-secondary-400" />
                      <span className="text-secondary-600 dark:text-secondary-400">
                        {extractedData.personalInfo.address}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {extractedData.personalInfo.linkedin && (
                      <a
                        href={extractedData.personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        <Linkedin className="w-3 h-3" />
                        LinkedIn
                      </a>
                    )}
                    {extractedData.personalInfo.github && (
                      <a
                        href={extractedData.personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        GitHub
                      </a>
                    )}
                    {extractedData.personalInfo.portfolio && (
                      <a
                        href={`https://${extractedData.personalInfo.portfolio}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-secondary-900 dark:text-white">Education</h2>
                </div>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-4 space-y-4">
                {extractedData.education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-primary-200 dark:border-primary-800">
                    <h3 className="font-medium text-secondary-900 dark:text-white">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-secondary-500 mt-1">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                    {edu.gpa && (
                      <Badge variant="primary" size="sm" className="mt-2">
                        GPA: {edu.gpa}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardBody>
            </Card>
          </motion.div>

          {/* Languages */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-secondary-900 dark:text-white">Languages</h2>
                </div>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-4">
                <div className="flex flex-wrap gap-2">
                  {extractedData.languages.map((lang) => (
                    <Badge key={lang.name} variant="primary">
                      {lang.name} ({lang.proficiency})
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Middle Column - Experience & Projects */}
        <div className="space-y-6">
          {/* Experience */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-secondary-900 dark:text-white">Experience</h2>
                </div>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-4 space-y-6">
                {extractedData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-accent-200 dark:border-accent-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-secondary-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-primary-600 dark:text-primary-400">
                          {exp.company}
                        </p>
                        <p className="text-xs text-secondary-500 mt-1">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                      {exp.location && (
                        <Badge variant="default" size="sm">
                          {exp.location}
                        </Badge>
                      )}
                    </div>
                    <ul className="mt-3 space-y-1">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="text-sm text-secondary-600 dark:text-secondary-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardBody>
            </Card>
          </motion.div>

          {/* Projects */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-secondary-900 dark:text-white">Projects</h2>
                </div>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-4 space-y-4">
                {extractedData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl bg-secondary-50 dark:bg-secondary-800/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-secondary-900 dark:text-white">
                        {project.name}
                      </h3>
                      <Badge
                        variant={project.impactScore >= 80 ? 'success' : 'warning'}
                        size="sm"
                      >
                        {project.impactScore}% impact
                      </Badge>
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="info" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - ATS Score & Skills */}
        <div className="space-y-6">
          {/* ATS Score Breakdown */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-500" />
                    <h2 className="font-semibold text-secondary-900 dark:text-white">
                      ATS Score Breakdown
                    </h2>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-4">
                <div className="flex justify-center mb-6">
                  <CircularProgress value={atsScore.overall} size={120} label="Overall" />
                </div>
                <div className="space-y-4">
                  {Object.entries(atsScore.breakdown).map(([key, value]) => (
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
              </CardBody>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-secondary-900 dark:text-white">Skills</h2>
                </div>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-4 space-y-6">
                {SKILL_CATEGORIES.filter((cat) =>
                  extractedData.skills.some((s) => s.category === cat.id)
                ).map((category) => {
                  const categorySkills = extractedData.skills.filter(
                    (s) => s.category === category.id
                  );
                  return (
                    <div key={category.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${category.color}`} />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          {category.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {categorySkills.map((skill) => (
                          <Badge key={skill.name} variant="default" size="sm">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          </motion.div>

          {/* Suggestions */}
          {latestReport?.suggestions && latestReport.suggestions.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning-500" />
                    <h2 className="font-semibold text-secondary-900 dark:text-white">
                      AI Suggestions
                    </h2>
                  </div>
                </CardHeader>
                <CardBody className="px-0 pb-0 pt-4 space-y-3">
                  {latestReport.suggestions.slice(0, 4).map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`p-3 rounded-lg ${
                        suggestion.priority === 'high'
                          ? 'bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800'
                          : 'bg-secondary-50 dark:bg-secondary-800/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {suggestion.priority === 'high' ? (
                          <AlertTriangle className="w-4 h-4 text-error-500 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-secondary-900 dark:text-white">
                            {suggestion.title}
                          </p>
                          <p className="text-xs text-secondary-500 mt-1">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
