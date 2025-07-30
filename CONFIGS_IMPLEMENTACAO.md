# 🔧 Detailed Implementation Configurations

## 📝 Main TypeScript Types

### types/index.ts
```typescript
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface PackageType {
  id: 'silver' | 'gold' | 'premium';
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  shape: 'hexagon' | 'triangle' | 'circle';
  color: string;
  popular?: boolean;
}

export interface CartItem {
  id: string;
  packageId: string;
  packageName: string;
  price: number;
  quantity: number;
  participantName: string;
  experience?: string;
  addedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentId?: string;
  mercadoPagoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MercadoPagoPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}
```

### types/mercadopago.ts
```typescript
export interface MercadoPagoItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: 'BRL';
  description?: string;
}

export interface MercadoPagoPayer {
  name: string;
  surname: string;
  email: string;
  phone?: {
    area_code: string;
    number: string;
  };
}

export interface MercadoPagoWebhookEvent {
  id: number;
  live_mode: boolean;
  type: string;
  date_created: string;
  application_id: number;
  user_id: number;
  version: number;
  api_version: string;
  action: string;
  data: {
    id: string;
  };
}
```

---

## 🎨 Detailed Tailwind CSS Configuration

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores principais do XperienceClimb
        climb: {
          // Verdes (tons principais)
          50: '#f0f9fa',
          100: '#d9f2f4',
          200: '#b6e5ea',
          300: '#86d1db',
          400: '#4fb3c4',
          500: '#21808d', // Primary
          600: '#1d7480',
          700: '#1a6873',
          800: '#175861',
          900: '#144a52',
          950: '#0a2d33',
        },
        orange: {
          // Laranjas (acentos)
          50: '#fef6f0',
          100: '#fdead9',
          200: '#fad1b3',
          300: '#f6b082',
          400: '#f4a261', // Accent
          500: '#e76f51',
          600: '#d85b3f',
          700: '#b5442f',
          800: '#92392a',
          900: '#773127',
        },
        neutral: {
          // Neutros (backgrounds e textos)
          50: '#fcfcf9', // Background light
          100: '#fffffe', // Surface light
          900: '#13343b', // Text primary
          700: '#626c71', // Text secondary
          600: '#5e5240', // Border
        }
      },
      fontFamily: {
        sans: ['FKGroteskNeue', 'Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Berkeley Mono', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['11px', { lineHeight: '16px' }],
        sm: ['12px', { lineHeight: '18px' }],
        base: ['14px', { lineHeight: '21px' }],
        lg: ['16px', { lineHeight: '24px' }],
        xl: ['18px', { lineHeight: '27px' }],
        '2xl': ['20px', { lineHeight: '30px' }],
        '3xl': ['24px', { lineHeight: '32px' }],
        '4xl': ['30px', { lineHeight: '38px' }],
        '5xl': ['36px', { lineHeight: '44px' }],
        '6xl': ['48px', { lineHeight: '56px' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        // Custom animations
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      clipPath: {
        // For custom geometric shapes
        hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom plugin for clip-path
    function({ addUtilities }) {
      const newUtilities = {
        '.clip-hexagon': {
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        },
        '.clip-triangle': {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        },
        '.clip-diamond': {
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
```

---

## 🏗️ Estrutura de Componentes Base

### components/ui/Button.tsx
```typescript
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
```

### components/ui/Card.tsx
```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
  shape?: 'default' | 'hexagon' | 'triangle' | 'circle';
  interactive?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', shape = 'default', interactive = false, className, children, ...props }, ref) => {
    const baseClasses = "relative bg-white border transition-all duration-300";
    
    const variants = {
      default: "border-neutral-200 shadow-sm",
      elevated: "border-neutral-200 shadow-lg",
      outline: "border-2 border-climb-500",
    };

    const shapes = {
      default: "rounded-xl",
      hexagon: "clip-hexagon",
      triangle: "clip-triangle",
      circle: "rounded-full aspect-square",
    };

    const interactiveClasses = interactive 
      ? "hover:shadow-xl hover:-translate-y-2 cursor-pointer group" 
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          shapes[shape],
          interactiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
```

---

## 🛒 Zustand Store for Shopping Cart

### store/useCartStore.ts
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: (packageId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.packageId === newItem.packageId && 
                   item.participantName === newItem.participantName
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const id = `${newItem.packageId}-${Date.now()}`;
          set({
            items: [...items, { 
              ...newItem, 
              id, 
              addedAt: new Date() 
            }]
          });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      getItemCount: (packageId) => {
        return get().items
          .filter((item) => item.packageId === packageId)
          .reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'xperience-climb-cart',
      version: 1,
    }
  )
);
```

---

## 🔧 Utilities and Helpers

### lib/utils.ts
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
}

export function formatPhone(phone: string): string {
  const numbers = phone.replace(/\D/g, '');
  if (numbers.length === 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  } else if (numbers.length === 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return phone;
}
```

### lib/constants.ts
```typescript
export const PACKAGES = {
  silver: {
    id: 'silver' as const,
    name: 'Silver',
    price: 30000, // in cents
    originalPrice: 35000,
    description: 'Basic experience with climbing and equipment',
    features: [
      '🧗 Natural rock climbing',
      '🛡️ Safety equipment',
      '👨‍🏫 Experienced instructor',
      '📋 Participation certificate',
    ],
    shape: 'hexagon' as const,
    color: 'climb-300',
    duration: '1 day',
    maxParticipants: 8,
  },
  gold: {
    id: 'gold' as const,
    name: 'Gold',
    price: 50000,
    originalPrice: 60000,
    description: 'Intermediate package with breakfast and technical class',
    features: [
      '✨ Everything from Silver package',
      '☕ Breakfast included',
      '🎓 Advanced techniques class',
      '📈 Training planning',
      '🏆 Exclusive kit',
    ],
    shape: 'triangle' as const,
    color: 'orange-400',
    duration: '1 day',
    maxParticipants: 6,
    popular: true,
  },
  premium: {
    id: 'premium' as const,
    name: 'Premium',
    price: 80000,
    originalPrice: 95000,
    description: 'Complete experience with accommodation and personalized guidance',
    features: [
      '🌟 Everything from previous packages',
      '🏨 Accommodation included',
      '👨‍🏫 Personal instructor',
      '📸 Professional photo session',
      '🎁 Exclusive premium kit',
      '🚗 Transportation included',
    ],
    shape: 'circle' as const,
    color: 'purple-500',
    duration: '2 days',
    maxParticipants: 4,
  },
} as const;

export const NAVIGATION_ITEMS = [
  { id: 'hero', label: 'Home', icon: '🏔️' },
  { id: 'program', label: 'Program', icon: '📅' },
  { id: 'gallery', label: 'Gallery', icon: '📸' },
  { id: 'packages', label: 'Packages', icon: '💎' },
  { id: 'partners', label: 'Partners', icon: '🤝' },
  { id: 'contact', label: 'Contact', icon: '📞' },
] as const;

export const CONTACT_INFO = {
  phone: '(15) 99999-9999',
  email: 'contact@xperienceclimb.com',
  instagram: '@xperienceclimb',
  address: 'Morro Araçoiaba - Ipanema National Forest',
  distance: '120km from São Paulo',
} as const;

export const MERCADOPAGO_CONFIG = {
  public_key: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!,
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  webhook_secret: process.env.MERCADOPAGO_WEBHOOK_SECRET!,
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
  failure_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure`,
  pending_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pending`,
} as const;

export const PRIVY_CONFIG = {
  app_id: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  login_methods: ['email', 'google', 'apple'] as const,
  theme: {
    accentColor: '#21808D',
    borderRadius: 'lg',
  },
} as const;
```

---

## 🚀 Scripts Package.json

### package.json (scripts section)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "analyze": "cross-env ANALYZE=true next build",
    "clean": "rimraf .next out",
    "prepare": "husky install"
  }
}
```

---

## 📦 Complete Dependencies

### package.json (dependencies)
```json
{
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@mercadopago/sdk-react": "^0.0.19",
    "@next/bundle-analyzer": "^14.0.3",
    "@privy-io/react-auth": "^1.54.0",
    "@privy-io/wagmi-connector": "^0.19.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.294.0",
    "mercadopago": "^2.0.4",
    "next": "14.0.3",
    "react": "^18",
    "react-dom": "^18",
    "react-hot-toast": "^2.4.1",
    "tailwind-merge": "^2.0.0",
    "tailwindcss": "^3.3.6",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@typescript-eslint/eslint-plugin": "^6.13.1",
    "@typescript-eslint/parser": "^6.13.1",
    "autoprefixer": "^10.0.1",
    "cross-env": "^7.0.3",
    "eslint": "^8",
    "eslint-config-next": "14.0.3",
    "eslint-config-prettier": "^9.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "postcss": "^8",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.7",
    "rimraf": "^5.0.5",
    "typescript": "^5"
  }
}
```

This technical documentation complements the main plan and provides all specific configurations needed to implement the XperienceClimb project in Next.js with modern development best practices and standards.