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
      borderRadius: {
        lg: 'var(--radius, 0.75rem)',
        md: 'calc(var(--radius, 0.75rem) - 2px)',
        sm: 'calc(var(--radius, 0.75rem) - 4px)',
      },
      colors: {
        // Shadcn tokens
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 0 0% 7.1%))',
        card: {
          DEFAULT: 'hsl(var(--card, 0 0% 100%))',
          foreground: 'hsl(var(--card-foreground, 0 0% 7.1%))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 0 0% 100%))',
          foreground: 'hsl(var(--popover-foreground, 0 0% 7.1%))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary, 207 77% 54%))',
          foreground: 'hsl(var(--primary-foreground, 0 0% 100%))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 0 0% 20%))',
          foreground: 'hsl(var(--secondary-foreground, 0 0% 100%))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, 0 0% 96.1%))',
          foreground: 'hsl(var(--muted-foreground, 0 0% 45.1%))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent, 51 100% 50%))',
          foreground: 'hsl(var(--accent-foreground, 0 0% 7.1%))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84.2% 60.2%))',
          foreground: 'hsl(var(--destructive-foreground, 0 0% 98%))',
        },
        border: 'hsl(var(--border, 0 0% 89.8%))',
        input: 'hsl(var(--input, 0 0% 89.8%))',
        ring: 'hsl(var(--ring, 207 77% 54%))',

        // Cores de Aventura & Boulder
        boulder: {
          blue: '#1E88E5',
          dark: '#080A0E',
          ink: '#0F1116',
          paper: '#FAFAF7',
          gold: '#FFD700',
          magma: '#FF4D2B',
          gray: '#333333',
        },

        // Cores originais do XperienceClimb preservadas
        climb: {
          50: '#f0f9fa',
          100: '#d9f2f4',
          200: '#b6e5ea',
          300: '#86d1db',
          400: '#4fb3c4',
          500: '#21808d',
          600: '#1d7480',
          700: '#1a6873',
          800: '#175861',
          900: '#144a52',
          950: '#0a2d33',
        },
        orange: {
          50: '#fef6f0',
          100: '#fdead9',
          200: '#fad1b3',
          300: '#f6b082',
          400: '#f4a261',
          500: '#e76f51',
          600: '#d85b3f',
          700: '#b5442f',
          800: '#92392a',
          900: '#773127',
        },
        neutral: {
          50: '#fcfcf9',
          100: '#fffffe',
          900: '#13343b',
          700: '#626c71',
          600: '#5e5240',
        },
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', '"Archivo Black"', 'sans-serif'],
        'serif-it': ['Fraunces', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['FKGroteskNeue', 'Geist', 'Inter', 'system-ui', 'sans-serif'],
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
        '7xl': ['64px', { lineHeight: '72px' }],
        '8xl': ['80px', { lineHeight: '88px' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        drift: 'drift-y 9s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'drift-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
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
        hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
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
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
