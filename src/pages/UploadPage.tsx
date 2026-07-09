import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Upload as UploadIcon,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useResume } from '../contexts/ResumeContext';
import { FILE_UPLOAD_CONFIG } from '../utils/constants';

export default function UploadPage() {
  const navigate = useNavigate();
  const { uploadResume, analyzeResume, isAnalyzing, currentResume } = useResume();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [uploadStage, setUploadStage] = useState<'idle' | 'uploading' | 'uploaded' | 'analyzing'>('idle');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setError('');
      setUploadedFile(file);
      setUploadStage('uploading');
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      try {
        await uploadResume(file);
        setUploadStage('uploaded');
      } catch {
        setError('Failed to upload file. Please try again.');
        setUploadStage('idle');
      }
    },
    [uploadResume]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: FILE_UPLOAD_CONFIG.maxSize,
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!currentResume) return;

    setUploadStage('analyzing');
    try {
      await analyzeResume();
      navigate('/analysis');
    } catch {
      setError('Analysis failed. Please try again.');
      setUploadStage('uploaded');
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadStage('idle');
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Upload Resume
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Upload your resume to get instant AI-powered analysis and ATS score.
        </p>
      </div>

      <Card className="p-8">
        <AnimatePresence mode="wait">
          {uploadStage === 'idle' && (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : isDragReject
                    ? 'border-error-500 bg-error-50 dark:bg-error-900/20'
                    : 'border-secondary-300 dark:border-secondary-700 hover:border-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800/50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                      isDragActive
                        ? 'bg-primary-100 dark:bg-primary-900/50'
                        : 'bg-secondary-100 dark:bg-secondary-800'
                    }`}
                  >
                    <UploadIcon
                      className={`w-8 h-8 ${
                        isDragActive
                          ? 'text-primary-500'
                          : 'text-secondary-400 dark:text-secondary-500'
                      }`}
                    />
                  </div>
                  <p className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                    {isDragActive
                      ? 'Drop your resume here'
                      : 'Drag and drop your resume'}
                  </p>
                  <p className="text-secondary-500 mb-4">or click to browse files</p>
                  <div className="flex items-center gap-3">
                    <Badge variant="primary">PDF</Badge>
                    <Badge variant="primary">DOC</Badge>
                    <Badge variant="primary">DOCX</Badge>
                  </div>
                  <p className="text-xs text-secondary-400 mt-4">
                    Maximum file size: {FILE_UPLOAD_CONFIG.maxSize / (1024 * 1024)}MB
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {(uploadStage === 'uploading' || uploadStage === 'uploaded') && uploadedFile && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* File Info */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary-50 dark:bg-secondary-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      {uploadedFile.name}
                    </p>
                    <p className="text-sm text-secondary-500">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              {uploadStage === 'uploading' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600 dark:text-secondary-400">Uploading...</span>
                    <span className="font-medium text-secondary-900 dark:text-white">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary-200 dark:bg-secondary-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Success State */}
              {uploadStage === 'uploaded' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800"
                >
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span className="text-success-700 dark:text-success-400">
                    File uploaded successfully! Ready to analyze.
                  </span>
                </motion.div>
              )}

              {/* Analyze Button */}
              {uploadStage === 'uploaded' && (
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleReset} className="flex-1">
                    Upload Different File
                  </Button>
                  <Button
                    onClick={handleAnalyze}
                    className="flex-1"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Analyze Resume
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {uploadStage === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mx-auto mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="w-10 h-10 text-primary-500" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Analyzing Your Resume
              </h3>
              <p className="text-secondary-500 mb-8">
                Our AI is extracting information and calculating your ATS score...
              </p>
              <div className="space-y-3 text-left max-w-xs mx-auto">
                {['Extracting personal information', 'Analyzing skills and experience', 'Calculating ATS score', 'Generating suggestions'].map(
                  (step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.5 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-primary-500" />
                      <span className="text-secondary-600 dark:text-secondary-400">{step}</span>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 text-error-600 dark:text-error-400"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}
      </Card>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid md:grid-cols-3 gap-4"
      >
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-primary-500" />
            </div>
            <div>
              <p className="font-medium text-secondary-900 dark:text-white mb-1">
                Use PDF format
              </p>
              <p className="text-sm text-secondary-500">
                PDFs maintain formatting and are best for ATS systems.
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-primary-500" />
            </div>
            <div>
              <p className="font-medium text-secondary-900 dark:text-white mb-1">
                Include keywords
              </p>
              <p className="text-sm text-secondary-500">
                Use industry-specific keywords for better matching.
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-primary-500" />
            </div>
            <div>
              <p className="font-medium text-secondary-900 dark:text-white mb-1">
                Keep it updated
              </p>
              <p className="text-sm text-secondary-500">
                Regularly update your resume with new skills and experiences.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
