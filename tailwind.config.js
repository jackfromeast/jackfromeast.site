// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Poppins','var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
        customPurple: {
          DEFAULT: '#9900ff',
          dark: '#dd06b8',
          light: '#b4a7d6',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.customPurple.DEFAULT'),
              '&:hover': {
                color: `${theme('colors.customPurple.dark')}`,
              },
              code: { color: theme('colors.customPurple.light') },
            },
            'h1,h2': {
              fontWeight: '400',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '400',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.customPurple.DEFAULT'),
              '&:hover': {
                color: `${theme('colors.customPurple.dark')}`,
              },
              code: { color: theme('colors.customPurple.light') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
