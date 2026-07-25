import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["'Pixelify Sans'", "sans-serif"],
        retro: ["'Press Start 2P'", "monospace"],
        vt: ["'VT323'", "monospace"],
      },
      colors: {
        pythonia: {
          dark: "#0a0518",
          card: "#120a2a",
          border: "#3b1e6e",
          purple: "#9333ea",
          "purple-light": "#c084fc",
          green: "#22c55e",
          "green-light": "#4ade80",
          gold: "#f59e0b",
          cyan: "#06b6d4",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
