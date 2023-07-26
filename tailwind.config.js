/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
  darkMode: "class",
}