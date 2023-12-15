/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx}",
    "./src/admin/**/*.{js,ts,jsx,tsx}",
    "./src/contents/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      tel: "320px",

      sm: "540px",
      // => @media (min-width: 540px) { ... }
      smd: "690px",
      // => @media (min-width: 690px) { ... }

      md: "798px",
      // => @media (min-width: 798px) { ... }

      lg: "1038px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        
      },
      colors: {
        primary : "#01384D",
        mainYellow: "#EABF9F"
      },
    },
    fontFamily: {
      
    },
  },
  plugins: [],
}
