import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import type React from 'react';

type MotionButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'children' | 'onClick' | 'type'
>;

interface CheckButtonProps extends MotionButtonProps {
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
  return (
    <motion.button
      type="button"
      aria-pressed={isChecked}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      variants={variants}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-xl p-4',
        'min-h-[80px]',
        'border-2 transition-all duration-200',
        'touch-action-manipulation cursor-pointer select-none',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
        isChecked
          ? 'border-red-500 bg-red-500/10 shadow-md'
          : 'border-red-300 bg-transparent hover:border-red-400 hover:bg-red-50/50',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div
        className={cn(
          'absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200',
          isChecked
            ? 'bg-red-500 text-white scale-100 opacity-100'
            : 'bg-gray-200 scale-75 opacity-0'
        )}
        aria-hidden="true"
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </div>

      <div className="flex flex-col items-center justify-center">
        {children}
        <p
          className={cn(
            'mt-2 select-none text-center text-sm font-medium transition-colors duration-200',
            isChecked ? 'text-red-600' : 'text-red-500/80'
          )}
        >
          {description}
        </p>
      </div>
    </motion.button>
  );
};

export default CheckButton;
