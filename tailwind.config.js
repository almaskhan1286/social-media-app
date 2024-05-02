/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      dropShadow: {
        custom: '0 10px 30px -15px rgba(217, 219, 223, 0.7)',
      },
    },
  },
  plugins: [],
};