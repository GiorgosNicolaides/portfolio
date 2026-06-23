import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a',
        panel: '#0f1520',
        'border-subtle': '#1e2d40',
        accent: '#00ff88',
        'accent-dim': '#00cc6a',
        'text-primary': '#e2e8f0',
        'text-muted': '#64748b',
        danger: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
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
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease forwards',
        blink: 'blink 1s step-end infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
