import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  variant = 'default',
  hover = false,
  onClick,
}: CardProps) {
  const baseStyles = 'rounded-2xl overflow-hidden';

  const variants = {
    default:
      'bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-card',
    glass:
      'bg-white/70 dark:bg-secondary-900/70 backdrop-blur-xl border border-white/20 dark:border-secondary-700/50 shadow-glass',
    gradient:
      'bg-gradient-to-br from-white to-secondary-50 dark:from-secondary-900 dark:to-secondary-950 border border-secondary-200 dark:border-secondary-800',
  };

  const hoverStyles = hover
    ? 'cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-b border-secondary-200 dark:border-secondary-800', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-secondary-200 dark:border-secondary-800', className)}>
      {children}
    </div>
  );
}
