module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#8B5CF6',
        },
        pink: {
          500: '#EC4899',
        },
        white: '#FFFFFF',
      },
      backgroundImage: {
        'gradient-diagonal': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      },
    },
  },
  plugins: [],
  safelist: [
    'dark',
  ],
}
