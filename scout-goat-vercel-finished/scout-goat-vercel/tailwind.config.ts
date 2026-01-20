import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0d10',
        bone: '#f8f7f4',
        blush: '#e7a9c5',
        slate: '#1f2937'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.12)',
        softer: '0 20px 60px rgba(0,0,0,0.18)'
      },
      borderRadius: {
        xl: '18px'
      }
    },
  },
  plugins: [],
} satisfies Config;
