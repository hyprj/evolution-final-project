/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridColumnEnd: {
        14: "14",
      },
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      screens: {
        "mobile-landscape": {
          raw: "(orientation: landscape) and (max-height: 600px)",
        },
      },
    },
  },
  safelist: [
    {
      pattern: /(col|row)-(start|end)-(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16)/,
    },
  ],
  plugins: [],
};
