import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isValid?: boolean;
  showValidation?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, isValid, showValidation = false, ...props }, ref) => {
    const hasError = showValidation && error;
    const hasSuccess = showValidation && isValid && !error;

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            // Base styles
            'flex w-full rounded-md border bg-background px-3 py-2 text-base shadow-xs transition-all duration-200',
            // Min height for touch targets
            'min-h-[48px]',
            // File input styles
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            // Focus styles
            'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1',
            // Disabled styles
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Touch optimization
            'touch-manipulation',
            // Conditional styles based on validation state
            hasError && 'border-red-500 focus-visible:ring-red-500 pr-10',
            hasSuccess && 'border-green-500 focus-visible:ring-green-500 pr-10',
            !hasError && !hasSuccess && 'border-input focus-visible:ring-ring',
            className
          )}
          ref={ref}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={hasError ? `${props.id}-error` : undefined}
          {...props}
        />
        
        {/* Validation icon */}
        {hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
        {hasSuccess && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        )}

        {/* Error message */}
        {hasError && (
          <p
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
