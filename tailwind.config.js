/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce1: 'bounce1 1s ease-in-out infinite',
        bounce2: 'bounce2 1s ease-in-out infinite',
        bounce3: 'bounce3 1s ease-in-out infinite',
      },
      keyframes: {
        bounce1: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounce2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounce3: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.animate-bounce1': {
          animationDelay: '0s',
        },
        '.animate-bounce2': {
          animationDelay: '0.6s', 
        },
        '.animate-bounce3': {
          animationDelay: '1s',
        },
      });
    },
  ],
}

