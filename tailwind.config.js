/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elan: {
          bg: "#F4F1EA",          // Warm ivory
          surface: "#ECE8DE",     // Slightly deeper ivory for surfaces
          border: "#DDD8CB",      // Subtle warm line
          text: "#11110F",        // Soft black
          muted: "#77736B",       // Muted warm gray
          faint: "#A8A49C",       // Faint gray
          dark: "#151613",        // Deep charcoal / near black
          darkSurface: "#1D1E1B", // Dark surface
          darkBorder: "rgba(244, 241, 234, 0.12)",
          darkText: "#F4F1EA",    // Ivory text for dark sections
          darkMuted: "#928E85",   // Muted for dark sections
          terracotta: "#A65D45",  // Muted terracotta accent
          olive: "#28352B",       // Deep olive secondary accent
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"DM Serif Display"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.06em",
        widest: "0.18em",
      },
    },
  },
  plugins: [],
};
