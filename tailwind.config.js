/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Jika ada index.html di root
    "./pages/**/*.{html,js,ts,jsx,tsx}", // Memindai semua .html DAN .js di dalam folder 'pages'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}