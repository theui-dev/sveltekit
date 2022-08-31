/** @type {import('tailwindcss').Config} */
const config = {
  presets: [require("theui/preset.cjs")],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {},
  plugins: [],
}

module.exports = config
