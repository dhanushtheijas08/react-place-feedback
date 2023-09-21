/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primay-color": "#6558f5",
        "text-primary-color": "#283945",
        "text-secondary-color": "#c5ced6",
      },
    },
  },
  plugins: [],
};
