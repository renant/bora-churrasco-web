import { cn } from '@/lib/utils';
import type React from 'react';

interface CheckButtonProps {
  children: React.ReactNode;
  description: string;
  isChecked: boolean;
  onClick: () => void;
  className?: string;
}

const CheckButton = ({
  children,
  description,
  isChecked,
  onClick,
  className,
}: CheckButtonProps) => {
  const backgroundColor = isChecked ? 'rgba(255, 165, 0, 0.5)' : 'transparent';

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isChecked}
      className={cn(
        'flex flex-col items-center justify-center rounded-md border border-red-400 p-2 hover:cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2',
        className
      )}
      style={{
        backgroundColor,
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
      <p className="mt-1 select-none text-center text-xs font-light text-red-500">
        {description}
      </p>
    </div>
  );
};

export default CheckButton;
