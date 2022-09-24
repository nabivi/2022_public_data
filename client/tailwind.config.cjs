/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['autumn'],
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
}
