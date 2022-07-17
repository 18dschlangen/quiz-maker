/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "bumblebee",
      "emerald",
      {
        happy: {
          primary: "#ffd803",
          secondary: "#e3f6f5",
          accent: "#bae8e8",
          neutral: "#272343",
          "base-100": "#fffffe",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
