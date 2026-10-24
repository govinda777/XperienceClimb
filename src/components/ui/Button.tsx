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
        'bg-forest-700 hover:bg-forest-800 active:bg-forest-900 text-white shadow-lg shadow-forest-900/20 hover:shadow-forest-900/35 hover:-translate-y-0.5 focus:ring-forest-500',
      accent:
        'bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold shadow-lg shadow-terracotta-500/25 hover:-translate-y-0.5 focus:ring-terracotta-400',
      glow: 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold shadow-xl shadow-terracotta-500/25 hover:shadow-terracotta-500/40 hover:-translate-y-0.5 focus:ring-terracotta-400',
      boulder:
        'bg-forest-800 hover:bg-forest-900 text-white font-mono uppercase tracking-widest text-xs shadow-xl hover:-translate-y-0.5 focus:ring-forest-500',
      dark: 'bg-ink-900 hover:bg-black text-white border border-white/15 hover:border-white/25 shadow-md hover:-translate-y-0.5 focus:ring-forest-500',
      secondary:
        'bg-white/15 backdrop-blur-md hover:bg-white/25 text-white border border-white/20 hover:border-white/30 focus:ring-white/30',
      outline:
        'border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm focus:ring-white/30 hover:-translate-y-0.5',
      ghost: 'text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/20',
    };

    const sizes = {
      sm: 'min-h-[36px] h-9 px-3.5 py-2 text-xs rounded-xl',
      md: 'min-h-[44px] h-11 px-5 py-2.5 text-sm rounded-xl',
      lg: 'min-h-[56px] h-14 px-7 py-3.5 text-base rounded-2xl font-semibold',
      xl: 'min-h-[64px] h-16 px-9 py-4 text-lg rounded-2xl font-bold',
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
