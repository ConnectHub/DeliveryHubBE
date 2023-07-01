/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: '#001529',   // dark blue
      "dark-primary":' #181a1b', // dark grey
      "dark-secondary":' #1b1d1e', // light dark grey
    },
  },
};
export const corePlugins = {
  preflight: false,
};
export const plugins = [];
