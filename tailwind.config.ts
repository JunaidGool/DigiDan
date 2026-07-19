import type { Config } from "tailwindcss";

/**
 * DigiDan design system: "The Grid" (neon interface) tuned to the DigiDan brand.
 * The Tron light-emitting language is kept, but the palette is the company's own
 * logo family: a neon teal identity, the brand teal for dormant structure, brand
 * orange for actions and brand yellow as the energy spark. Every colour comes
 * from these tokens.
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
      full: "9999px",
    },
    extend: {
      colors: {
        void: "#000000", // primary canvas
        neon: "#2DE1C6", // identity emitter: brand teal pushed to neon
        dim: "#45A08E", // dormant frameworks, sub-text (brand teal)
        action: "#F07E26", // high-priority actions, conversion (brand orange)
        spark: "#F5C518", // energy nodes and highlights (brand yellow)
        white: "#FFFFFF",
        panel: {
          DEFAULT: "#04100E",
          raised: "#07160F",
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
        "glow-neon": "0 0 20px rgba(45,225,198,0.35)",
        "glow-neon-lg": "0 0 40px rgba(45,225,198,0.28)",
        "glow-action": "0 0 20px rgba(240,126,38,0.45)",
        "glow-spark": "0 0 18px rgba(245,197,24,0.5)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
