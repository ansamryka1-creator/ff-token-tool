import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0a0e27',
        'darker': '#050812',
        'card-bg': '#0f1629',
        'card-border': '#1a2a4a',
        'accent-purple': '#a855f7',
        'accent-blue': '#0ea5e9',
        'accent-cyan': '#06b6d4',
        'neon-purple': '#d946ef',
        'neon-blue': '#3b82f6',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-blue': '0 0 20px rgba(14, 165, 233, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'neon': '0 0 30px rgba(217, 70, 239, 0.5)',
      },
      backdropBlur: {
        'xl': '16px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.2))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config