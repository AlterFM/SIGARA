/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.php", 
    "./pages/**/*.php", 
    "./src/**/*.{php,html,js,ts,jsx,tsx}", 
    "./_includes/**/*.php", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Definisikan ulang warna Anda sesuai kebutuhan
        // Pastikan nama kelas Tailwind Anda (misalnya bg-custom-purple) sesuai dengan definisi di sini
        // Jika Anda ingin menggunakan 'purple' sebagai nama umum untuk berbagai shades
        'purple': {
          '50': '#F8F5FF', // card-purple
          '100': '#F0EAFE',
          '200': '#DCD0F2', // border-card-purple
          '300': '#C8B6E7',
          '400': '#B49CE0',
          '500': '#A082D9',
          '600': '#8C68D2',
          '700': '#5F27CD', // custom-purple
          '800': '#4A1F9C',
          '900': '#35166B',
        },
        // Jika Anda masih ingin nama spesifik seperti ini, ini akan dibuat sebagai utility class terpisah
        'custom-purple': '#5F27CD', 
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
    require('@tailwindcss/forms'),
  ],
}