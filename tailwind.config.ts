import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dbe7ff',
          200: '#b9ceff',
          300: '#8fb0ff',
          400: '#5c89ff',
          500: '#3a6dff', // primary
          600: '#2e58e6',
          700: '#2647bf',
          800: '#203c9c',
          900: '#1c337f',
        },
        accent: { 500: '#00C5A3' },
        ink: { 700: '#0f172a', 500: '#334155' },
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)',
        hover: '0 12px 28px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
export default config
