import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080a0f',
        surface: {
          DEFAULT: '#0e1118',
          2: '#141820',
          3: '#1c2030',
        },
        border: {
          DEFAULT: '#1a2030',
          2: '#232c42',
        },
        muted: {
          DEFAULT: '#8892a6',
          2: '#48566a',
        },
        accent: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
          light: '#fcd34d',
          subtle: 'rgba(245, 158, 11, 0.12)',
        },
        'spot-free': '#22c55e',
        'spot-occupied': '#ef4444',
        'spot-blocked': '#2d3748',
        'spot-reserved': '#3b82f6',
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
