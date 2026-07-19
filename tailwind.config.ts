import type { Config } from "tailwindcss";

/**
 * DigiDan design system: "The Grid" (Tron-infused high-performance frontend).
 * A dark, light-emitting canvas. Structure is drawn with cyan light tracks;
 * amber is reserved for high-priority actions. Every colour comes from these
 * tokens. No default Tailwind colours.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "2px",
      full: "9999px", // reserved for status dots and nodes
    },
    extend: {
      colors: {
        void: "#000000", // primary canvas
        cyan: "#00E5FF", // identity: borders, wireframes, circuits
        teal: "#00838F", // dormant frameworks, sub-text
        amber: "#FF9100", // high-priority actions, conversion, warnings
        white: "#FFFFFF", // primary typography
        // Dark glass surfaces layered over the void.
        panel: {
          DEFAULT: "#05090B",
          raised: "#080D10",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["clamp(2.5rem, 5.2vw, 4.4rem)", { lineHeight: "1.05" }],
        h2: ["clamp(1.4rem, 2.6vw, 2.1rem)", { lineHeight: "1.15" }],
        statement: ["clamp(1.1rem, 2vw, 1.55rem)", { lineHeight: "1.5" }],
        label: ["0.66rem", { lineHeight: "1", letterSpacing: "0.26em" }],
      },
      maxWidth: {
        shell: "1440px",
        statement: "52rem",
      },
      screens: {
        wide: "960px",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,229,255,0.35)",
        "glow-cyan-lg": "0 0 40px rgba(0,229,255,0.28)",
        "glow-amber": "0 0 20px rgba(255,145,0,0.45)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
