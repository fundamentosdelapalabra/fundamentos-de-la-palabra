/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fafaf9',
        ink: '#1f2937',
        navy: {
          DEFAULT: '#1e3a8a',
          dark: '#172a64',
          light: '#3b56a8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(31, 41, 55, 0.06), 0 1px 2px -1px rgba(31, 41, 55, 0.06)',
      },
    },
  },
  plugins: [],
}
