/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const config = {
  presets: [require("@theui/core/preset.cjs")],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {},
  plugins: [
    plugin(function ({ addVariant }) {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant('not-first', '&:not(:first-child)')
    })
  ],
}

module.exports = config
