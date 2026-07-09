import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useTheme } from '../../contexts/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-secondary-900 z-50 shadow-2xl"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-secondary-200 dark:border-secondary-800">
              <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-semibold text-lg text-secondary-900 dark:text-white">
                  ResumeIQ AI
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-secondary-500 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-6 space-y-6">
              <div className="space-y-4">
                <a
                  href="#features"
                  onClick={onClose}
                  className="block text-lg font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  onClick={onClose}
                  className="block text-lg font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  onClick={onClose}
                  className="block text-lg font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#faq"
                  onClick={onClose}
                  className="block text-lg font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  FAQ
                </a>
              </div>

              <div className="pt-6 border-t border-secondary-200 dark:border-secondary-800 space-y-3">
                <Link to="/login" onClick={onClose} className="block">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={onClose} className="block">
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="pt-6 border-t border-secondary-200 dark:border-secondary-800">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {theme === 'dark' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      Switch to Dark Mode
                    </>
                  )}
                </button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
