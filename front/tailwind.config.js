/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js,tsx}'];
export const theme = {
  extend: {
    colors: {
      'primary': '#001529',
      'dark-primary': ' #181a1b',
      'dark-secondary': ' #1b1d1e',
    },
    boxShadow: {
      custom: '0 0 0 3px rgba(131, 192, 253, 0.5)',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
};
export const corePlugins = {
  preflight: false,
};
export const plugins = [];
