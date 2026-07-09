import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variants = {
    default: 'bg-primary-500',
    gradient: 'bg-gradient-to-r from-primary-400 to-primary-600',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };

  const getAutoVariant = (p: number) => {
    if (p >= 80) return 'bg-success-500';
    if (p >= 60) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-sm text-secondary-600 dark:text-secondary-400">{label}</span>}
          {showLabel && (
            <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-secondary-200 dark:bg-secondary-800 rounded-full overflow-hidden',
          sizes[size]
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full',
            variant === 'default' ? variants.gradient : variants[variant]
          )}
        />
      </div>
    </div>
  );
}

export function CategoryProgressBar({
  label,
  value,
  max = 100,
  color,
}: {
  label: string;
  value: number;
  max?: number;
  color: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-secondary-600 dark:text-secondary-400">{label}</span>
        <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-secondary-200 dark:bg-secondary-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
    </div>
  );
}
