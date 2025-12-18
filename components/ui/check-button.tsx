import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import type React from 'react';

interface CheckButtonProps extends Omit<HTMLMotionProps<"div">, "children" | "onClick"> {
  children: React.ReactNode;
  description: string;
  isChecked: boolean;
  onClick: () => void;
  className?: string;
  variants?: Variants;
}

const CheckButton = ({
  children,
  description,
  isChecked,
  onClick,
  className,
  variants,
  ...props
}: CheckButtonProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={isChecked}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      variants={variants}
      className={cn(
        // Base styles
        'relative flex flex-col items-center justify-center rounded-xl p-4',
        // Minimum touch area - 64px minimum height
        'min-h-[80px]',
        // Border and background
        'border-2 transition-all duration-200',
        // Touch optimization
        'touch-action-manipulation cursor-pointer select-none',
        // Focus styles for accessibility
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
        // Conditional styles based on checked state
        isChecked
          ? 'border-red-500 bg-red-500/10 shadow-md'
          : 'border-red-300 bg-transparent hover:border-red-400 hover:bg-red-50/50',
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {/* Check indicator */}
      <div
        className={cn(
          'absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200',
          isChecked
            ? 'bg-red-500 text-white scale-100 opacity-100'
            : 'bg-gray-200 scale-75 opacity-0'
        )}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center">
        {children}
        <p className={cn(
          'mt-2 select-none text-center text-sm font-medium transition-colors duration-200',
          isChecked ? 'text-red-600' : 'text-red-500/80'
        )}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default CheckButton;
