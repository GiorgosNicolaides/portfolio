import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d14',
        panel: '#0f1520',
        'panel-2': '#141c2b',
        'border-subtle': '#1f2a3c',
        accent: '#34d399',
        'accent-dim': '#10b981',
        sky: { DEFAULT: '#38bdf8' },
        'text-primary': '#e6edf6',
        'text-muted': '#8b98ad',
        danger: '#f87171',
        warning: '#fbbf24',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        flow: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '24px 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease forwards',
        blink: 'blink 1s step-end infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        flow: 'flow 1s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
