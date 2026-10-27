/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0D9488',
          'teal-dark': '#0F766E',
          'teal-light': '#14B8A6',
          'teal-subtle': '#CCFBF1',
          navy: '#102A43',
          'navy-dark': '#0B1D30',
          'navy-light': '#1F3A5A',
          bg: '#F7FAFC',
          card: '#FFFFFF',
          'light-blue': '#E8F3FF',
          'light-blue-dark': '#D0E6FF',
          text: '#172B4D',
          'text-secondary': '#64748B',
          border: '#E2E8F0',
          success: '#15803D',
          'success-bg': '#DCFCE7',
          warning: '#B45309',
          'warning-bg': '#FEF3C7',
          error: '#B91C1C',
          'error-bg': '#FEE2E2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(16, 42, 67, 0.04), 0 2px 4px -2px rgba(16, 42, 67, 0.04)',
        'card-hover': '0 10px 15px -3px rgba(16, 42, 67, 0.08), 0 4px 6px -4px rgba(16, 42, 67, 0.04)',
        'modal': '0 20px 25px -5px rgba(16, 42, 67, 0.1), 0 8px 10px -6px rgba(16, 42, 67, 0.1)',
      }
    },
  },
  plugins: [],
}
