/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#1C1A14',
        cream: '#F7F4EE',
        gold: {
          DEFAULT: '#B87D2E',
          light: '#F0DFB8',
          dark: '#8B5E1E',
        },
        rust: '#8B3A1E',
        sage: {
          DEFAULT: '#3B6D11',
          light: '#EAF3DE',
        },
      },
    },
  },
  plugins: [],
}
