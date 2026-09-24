/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: "#F5F5F0",          // Warm off-white
          text: "#111111",        // Near-black
          muted: "#666666",       // Secondary gray
          border: "#E2E2DC",      // Clean hairline border
          lime: "#B8FF3D",        // Playful acid/lime green accent
          coral: "#FF6B4A",       // Warm coral secondary accent
          dark: "#111111",        // Pure black for contrast sections
          darkText: "#F5F5F0",    // Off-white text for dark sections
          darkMuted: "#888888",   // Muted for dark sections
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Inter"', '"Manrope"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.06em",
        widest: "0.15em",
        ultra: "0.25em",
      },
    },
  },
  plugins: [],
};
