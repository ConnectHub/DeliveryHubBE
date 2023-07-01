/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: '#001529',
    },
  },
};
export const corePlugins = {
  preflight: false,
};
export const plugins = [];
