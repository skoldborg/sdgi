/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      print: { raw: 'print' },
    },
    colors: {
      white: '#fff',
      black: '#000',
      dark: '#1a1a1a',
      red: '#e5243b',
      green: '#56C02B',
      gray: '#d8d8d8',
      'gray-medium': '#cccccc',
      'gray-light': '#f1f1f1',
      'gray-medium': '#cccccc',
      'gray-dark': '#999999',
      'goal-1': '#e5243b',
      'goal-2': '#dda63a',
      'goal-3': '#4c9f38',
      'goal-4': '#c5192d',
      'goal-5': '#ff3a21',
      'goal-6': '#26bde2',
      'goal-7': '#fcc30b',
      'goal-8': '#a21942',
      'goal-9': '#fd6925',
      'goal-10': '#dd1367',
      'goal-11': '#fd9d24',
      'goal-12': '#bf8b2e',
      'goal-13': '#3f7e44',
      'goal-14': '#0a97d9',
      'goal-15': '#56c02b',
      'goal-16': '#00689d',
      'goal-17': '#19486a',
    },
    fontFamily: {
      sans: ['Helvetica Neue', '-apple-system', 'sans-serif'],
      header: ['Open Sans Condensed', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.08em',
    },
    safelist: [
      {
        pattern: /bg-goal-.+/,
      },
    ],
    extend: {
      boxShadow: {
        DEFAULT: '0px 2px 10px 0px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'scale-up': 'scale 1s cubic-bezier(0.4, 0, 0.2, 1) 1s forwards',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
