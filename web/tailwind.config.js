/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'large-shadow': '0px 0px 25px 25px rgb(0 0 0 / 0.15)',
      },
      colors: {
        'nice-green': '#1aebb6',
      },
      borderColor: ['focus']
    },
  },
  plugins: [],
};
