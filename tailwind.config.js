/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", 
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}", 
    "./_includes/**/*.html", 
  ],
  theme: {
    extend: {
      fontFamily: {
        // Menambahkan font Poppins
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Menambahkan warna kustom Anda
        'purple': { // Mengganti default purple Tailwind jika Anda ingin warna ini menjadi 'purple' utama
          '50': '#F8F5FF', // bg-card-purple
          '100': '#F0EAFE',
          '200': '#DCD0F2', // border-card-purple
          '300': '#C8B6E7',
          '400': '#B49CE0',
          '500': '#A082D9',
          '600': '#8C68D2',
          '700': '#5F27CD', // custom-purple, bg-custom-purple, border-custom-purple
          '800': '#4A1F9C',
          '900': '#35166B',
        },
        'custom-purple': '#5F27CD', // Jika Anda tetap ingin nama custom-purple
        'card-purple': '#F8F5FF',
        'border-card-purple': '#DCD0F2',
        'icon-purple': '#EBE1FA',

        'card-green': '#F2FBF7',
        'border-card-green': '#D3EADD',
        'icon-green': '#DEF1E8',

        'card-gray': '#F9F9F9',
        'border-card-gray': '#E5E5E5',
        'icon-gray': '#EEEEEE',

        'card-pink': '#FFF6F5',
        'border-card-pink': '#F8DBD7',
        'icon-pink': '#FBE6E3',
        'custom-pink': '#A56056',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Pastikan plugin forms masih ada
  ],
}