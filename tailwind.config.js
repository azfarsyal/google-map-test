/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        'min-mob': { min: '0px', max: '570px' },
        'sm-mob': { min: '0px', max: '450px' },
        'max-mob': { min: '451px', max: '767px' },
        'min-tab': { min: '1024px', max: '1130px' },
        xs: { min: '0px', max: '767px' },
        xlg: { min: '0px', max: '1024px' },
        xllg: { min: '1220px', max: '1330px' },
        xmlg: { min: '1120px', max: '1219px' },
        xslg: { min: '1025px', max: '1119px' },
      },
    },
  },
  plugins: [],
};
