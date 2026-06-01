/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['pt-safe-top', 'pb-safe-bottom'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        surface: {
          light: '#ffffff',
          dark:  '#0f0f1a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-light': `
          radial-gradient(at 40% 20%, hsla(228, 100%, 85%, 0.5) 0px, transparent 50%),
          radial-gradient(at 80% 0%,  hsla(189, 100%, 85%, 0.4) 0px, transparent 50%),
          radial-gradient(at 0%  50%, hsla(355, 100%, 85%, 0.3) 0px, transparent 50%)
        `,
        'mesh-dark': `
          radial-gradient(at 40% 20%, hsla(228, 80%, 25%, 0.6) 0px, transparent 50%),
          radial-gradient(at 80% 0%,  hsla(189, 80%, 20%, 0.5) 0px, transparent 50%),
          radial-gradient(at 0%  50%, hsla(280, 80%, 20%, 0.4) 0px, transparent 50%)
        `,
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient':     'gradient 8s ease infinite',
        'shimmer':      'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glass':      '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glow':       '0 0 40px rgba(99, 102, 241, 0.35)',
        'glow-sm':    '0 0 20px rgba(99, 102, 241, 0.25)',
      },
    },
  },
  plugins: [],
}
