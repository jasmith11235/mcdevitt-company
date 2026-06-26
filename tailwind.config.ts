import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fathom: '#1D2B45',
        shallows: '#3D9B82',
        cream: '#F5F0EB',
        navy: '#1C2541',
        green: '#4A7C6F',
        muted: '#E8E2DB',
      },
      fontFamily: {
        sans: ['"Mona Sans Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', '"Times New Roman"', 'serif'],
        gotham: ['var(--font-gotham)', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mercury: ['var(--font-mercury)', 'Georgia', '"Times New Roman"', 'serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        widest: '0.25em',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        elevated: '0 3px 12px rgba(0,0,0,0.10)',
        photo: '0 4px 16px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
}
export default config
