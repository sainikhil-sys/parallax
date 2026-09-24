/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        liminal: {
          base: "#050505",
          surface: "#0c0c0c",
          card: "#121212",
          elevated: "#181818",
          border: "rgba(245, 245, 240, 0.08)",
          "border-subtle": "rgba(245, 245, 240, 0.04)",
          text: "#F5F5F0",
          muted: "#858585",
          dim: "#505050",
          accent: "#00F0FF",
          "accent-hover": "#38F4FF",
          "accent-dim": "#00A8B3",
          "accent-glow": "rgba(0, 240, 255, 0.18)",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.03em",
        widest: "0.25em",
        ultra: "0.4em",
      },
    },
  },
  plugins: [],
};
