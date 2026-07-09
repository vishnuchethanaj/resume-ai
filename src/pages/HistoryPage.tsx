import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SortAsc,
  MoreVertical,
  Eye,
  Trash2,
  Download,
  FileText,
  Calendar,
  Building2,
  Star,
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Dropdown from '../components/ui/Dropdown';
import Modal from '../components/ui/Modal';
import { useResume } from '../contexts/ResumeContext';
import { formatDate } from '../utils/helpers';

export default function HistoryPage() {
  const { resumes, deleteResume } = useResume();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedResume, setSelectedResume] = useState<typeof resumes[0] | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredResumes = resumes
    .filter((r) => r.fileName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
      if (sortBy === 'score') {
        return (b.atsScore || 0) - (a.atsScore || 0);
      }
      return a.fileName.localeCompare(b.fileName);
    });

  const handleDelete = () => {
    if (selectedResume) {
      deleteResume(selectedResume.id);
      setShowDeleteModal(false);
      setSelectedResume(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Resume History
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          View and manage your previously uploaded resumes.
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search resumes..."
              leftIcon={<Search className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Dropdown
              options={[
                { value: 'date', label: 'Sort by Date' },
                { value: 'score', label: 'Sort by Score' },
                { value: 'name', label: 'Sort by Name' },
              ]}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
            />
            <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Resumes Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">
                  Resume
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">
                  Uploaded
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">
                  ATS Score
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-secondary-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredResumes.map((resume, index) => (
                <motion.tr
                  key={resume.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-secondary-100 dark:border-secondary-800/50 last:border-0 hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white">
                          {resume.fileName}
                        </p>
                        <p className="text-xs text-secondary-500">ID: {resume.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(resume.uploadedAt)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {resume.atsScore ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
                          <Star className="w-4 h-4 text-primary-500" />
                        </div>
                        <span
                          className={`font-semibold ${
                            resume.atsScore >= 80
                              ? 'text-success-500'
                              : resume.atsScore >= 60
                              ? 'text-warning-500'
                              : 'text-error-500'
                          }`}
                        >
                          {resume.atsScore}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-secondary-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      variant={
                        resume.status === 'completed'
                          ? 'success'
                          : resume.status === 'analyzing'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {resume.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link to="/analysis">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedResume(resume);
                          setShowDeleteModal(true);
                        }}
                        className="text-error-500 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResumes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-secondary-400" />
            </div>
            <p className="text-secondary-600 dark:text-secondary-400">
              {searchQuery ? 'No resumes found matching your search.' : 'No resumes uploaded yet.'}
            </p>
          </div>
        )}
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Resume"
      >
        <div className="space-y-4">
          <p className="text-secondary-600 dark:text-secondary-400">
            Are you sure you want to delete "{selectedResume?.fileName}"? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} className="flex-1">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
