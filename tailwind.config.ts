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
      // Colours are theme tokens: RGB channels live in CSS custom properties
      // (set per data-theme) so a single toggle retints the whole site while
      // Tailwind's /alpha modifiers keep working.
      colors: {
        void: "rgb(var(--c-bg) / <alpha-value>)", // themed page canvas
        neon: "rgb(var(--c-neon) / <alpha-value>)", // identity emitter
        dim: "rgb(var(--c-dim) / <alpha-value>)", // dormant / sub-text
        action: "rgb(var(--c-action) / <alpha-value>)", // primary actions
        spark: "rgb(var(--c-spark) / <alpha-value>)", // energy / highlights
        white: "rgb(var(--c-text) / <alpha-value>)", // primary foreground
        panel: {
          DEFAULT: "rgb(var(--c-surface) / <alpha-value>)",
          raised: "rgb(var(--c-surface-2) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
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
        "glow-neon": "0 0 20px rgb(var(--c-neon) / 0.35)",
        "glow-neon-lg": "0 0 40px rgb(var(--c-neon) / 0.28)",
        "glow-action": "0 0 20px rgb(var(--c-action) / 0.45)",
        "glow-spark": "0 0 18px rgb(var(--c-spark) / 0.5)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
