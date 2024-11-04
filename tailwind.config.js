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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "linear-gradient-yellow": "linear-gradient(to bottom, rgba(255, 196, 27, 0), rgba(255, 196, 27, 1), rgba(255, 196, 27, 1))",
        "linear-gradient-red": "linear-gradient(to bottom, rgba(250, 67, 84, 0), rgba(250, 67, 84, 1), rgba(250, 67, 84, 1))",
        "linear-gradient-blue": "linear-gradient(to bottom, rgba(85, 196, 241, 0), rgba(85, 196, 241, 1), rgba(85, 196, 241, 1))",
      },
      colors: {
        "white.100": "rgba(180, 190, 203, 1)",
        "white.200": "rgba(255, 255, 255, 1)",
        "black.100": "rgba(0, 0, 0, 1)",
        "black.200": "rgba(27, 28, 32, 1)",
        "grey.100": "rgba(27, 28, 32, 1)",
        "yellow.100": "rgba(255, 196, 27, 1)",
        "green.100": "rgba(0, 166, 153, 1)",
        "red.100": "rgba(250, 67, 84, 1)",
        "blue.100": "rgba(85, 196, 241, 1)",
        "green.200": "rgba(0, 166, 153, 1)",
        "green.300": "rgba(0, 138, 128, 1)",
        "red.200": "#FA4354",
        "grey.200": "#B4BECB",
        "grey.300": "#1B1C20",
        "green.400": "#00A699",
        "red.300": "#FE4365",
        "grey.400": "#343F4B",
        "grey.500": "#222428",
        "grey.600": "#63768D",
        "black.300": "#060809",
        "yellow.200": "#FFF3D1",
        "yellow.400": "#FFCE41",
        "yellow.500": "#FFC41B",
        "blue.200": "#55C4F1",
        "black-background":"#060809"
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
      maxWidth: {
        container: "1400px",
      },
      fontFamily: {
        mattersq: "Matter SQ Regular",
        mdtest: ["MD Nichrome Test, sans-serif;"]
      },
    },
  },
  plugins: [
    // require('flowbite/plugin'),
  ],
};
