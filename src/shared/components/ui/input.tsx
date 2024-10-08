import * as React from 'react';

import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  action?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, action, label, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        <Label>{label}</Label>
        <span className="flex relative items-center">
          {icon && <div className="absolute left-0 px-3 py-1">{icon}</div>}
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-8',
              action && 'pr-8',
              error && 'border-red-500 placeholder:text-red-500 outline-none ring-0 text-red-500',
              className,
            )}
            ref={ref}
            {...props}
          />
          {action && <div className="absolute right-0 px-3 py-1">{action}</div>}
        </span>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export { Input };
