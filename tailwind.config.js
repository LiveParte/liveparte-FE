/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-bottom': 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 99.19%)',
        'gradient-to-top': 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 99.19%)',
      },
      screens: {
        tall: { raw: "(max-height: 600px)" },
        tallM: { raw: "(max-height: 650px)" },
        tallI: { raw: "(max-height: 720px)" },
        tallT: { raw: "(max-width: 1100px)" },
        width1300: { raw: "(max-width: 1476px)" },
        smallWidth: { raw: "(min-width: 320px)" },
        //1100
        // => @media (min-height: 800px) { ... }
      },
    },
  },
  plugins: [
    // require('flowbite/plugin'),
  ],
};
