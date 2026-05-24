/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        charcoal: '#2C2C2C',
        beige: '#E8DED2',
        gold: '#D4AF37',
        terracotta: '#C9A58C',
        primary: '#3B82F6',      // Blue
        'primary-dark': '#2563EB', // Darker Blue
        secondary: '#10B981',     // Green/Teal
        'secondary-dark': '#059669', // Darker Green
        accent: '#8B5CF6',        // Purple
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
