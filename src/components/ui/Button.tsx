'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'boulder' | 'accent' | 'glow' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'default' | 'hexagon' | 'circle' | 'rounded';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'default',
      loading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    const baseClasses =
      'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-climb-500 hover:bg-climb-600 active:bg-climb-700 text-white shadow-lg shadow-climb-900/20 hover:shadow-climb-900/35 hover:-translate-y-0.5 focus:ring-climb-400',
      accent:
        'bg-orange-400 hover:bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 focus:ring-orange-400',
      glow: 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 focus:ring-orange-400',
      boulder:
        'bg-climb-700 hover:bg-climb-800 text-white font-mono uppercase tracking-widest text-xs shadow-xl hover:-translate-y-0.5 focus:ring-climb-400',
      dark: 'bg-neutral-900 hover:bg-climb-950 text-white border border-white/15 hover:border-white/25 shadow-md hover:-translate-y-0.5 focus:ring-climb-400',
      secondary:
        'bg-white/15 backdrop-blur-md hover:bg-white/25 text-white border border-white/20 hover:border-white/30 focus:ring-white/30',
      outline:
        'border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm focus:ring-white/30 hover:-translate-y-0.5',
      ghost: 'text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/20',
    };

    const sizes = {
      sm: 'h-8 px-3.5 text-xs rounded-lg',
      md: 'h-11 px-5 text-sm rounded-xl',
      lg: 'h-13 px-7 text-base rounded-2xl',
      xl: 'h-15 px-9 text-lg rounded-2xl font-bold',
    };

    const shapes = {
      default: '',
      hexagon: 'clip-hexagon rounded-none',
      circle: 'rounded-full',
      rounded: 'rounded-3xl',
    };

    return (
      <Comp
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], shapes[shape], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
