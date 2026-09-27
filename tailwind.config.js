/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B1120',
        surface: '#111827',
        elevated: '#172033',
        border: '#263247',
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },
        accent: '#3B82F6',
        present: '#22C55E',
        absent: '#EF4444',
        warn: '#F59E0B',
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
