/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#0061FF0A",
          200: "#0061FF1A",
          300: "#0061FF"
        },
        accent: {
          100: "#FBFBFD"
        },
        dark: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31"
        },
        danger: "#F75555"

      },
     fontFamily: {
        lightFont: ["Light Font","sans-serif"],
        regularFont: ["Regular Font","sans-serif"],
        mediumFont: ["Medium Font","sans-serif"],
        semiBoldFont: ["SemiBold Font","sans-serif"],
        boldFont: ["Bold Font","sans-serif"],
        extraBoldFont: ["ExtraBold Font","sans-serif"],
     }
    },
  },
  plugins: [],
}