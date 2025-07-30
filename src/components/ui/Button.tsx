import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'default' | 'hexagon' | 'circle' | 'rounded';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    shape = 'default',
    loading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-climb-500 hover:bg-climb-600 active:bg-climb-700 text-white focus:ring-climb-500/50",
      secondary: "bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-900 focus:ring-neutral-500/50",
      outline: "border-2 border-climb-500 text-climb-500 hover:bg-climb-500 hover:text-white focus:ring-climb-500/50",
      ghost: "text-climb-500 hover:bg-climb-50 active:bg-climb-100 focus:ring-climb-500/50",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
      xl: "h-14 px-8 text-xl",
    };

    const shapes = {
      default: "rounded-lg",
      hexagon: "clip-hexagon rounded-none",
      circle: "rounded-full",
      rounded: "rounded-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          shapes[shape],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button }; 