import type { Config } from "tailwindcss";

/**
 * Seventies supergraphic palette (brief section 4.1). Cream canvas, warm-brown
 * ink, and four block families in burnt orange, harvest gold, deep teal and
 * avocado olive. No pure white and no neutral grey anywhere.
 *
 * Family names (teal / coral / amber) are historical class aliases; their
 * values now carry the brief's burnt-orange (coral) and harvest-gold (amber)
 * roles. `paper` aliases the cream canvas; `paper.warm` the sand band.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep teal (brief: teal #14705C, teal-l #8FCBB4, teal-d #0B4A3B).
        teal: {
          100: "#D6E9E1",
          300: "#8FCBB4",
          500: "#14705C",
          900: "#0B4A3B",
        },
        // Burnt orange (brief: orange #C4531D, orange-l #E89B6E, orange-d #9C3F14).
        // 600 is a slightly deeper orange reserved for orange-fill buttons so
        // cream label text clears WCAG AA (the 500 band carries large text only).
        coral: {
          100: "#F6E0D2",
          300: "#E89B6E",
          500: "#C4531D",
          600: "#A8431C",
          900: "#9C3F14",
        },
        // Harvest gold (brief: gold #E3A21A, gold-l #F2C36B, gold-d #8A5E08).
        amber: {
          100: "#F7EACB",
          200: "#F2C36B",
          400: "#E3A21A",
          900: "#8A5E08",
        },
        // Avocado olive (brief: olive #6B7A34, olive-l #9FAF62).
        olive: {
          100: "#E4E8CF",
          300: "#9FAF62",
          500: "#6B7A34",
          900: "#3F4A1C",
        },
        ink: "#3B2D20",
        brown: "#6E5638",
        faint: "#A18B60",
        // `paper` = cream canvas; `paper.warm` = sand band (brief 4.1).
        cream: "#F6EDD8",
        sand: "#EFE1C2",
        paper: {
          DEFAULT: "#F6EDD8",
          warm: "#EFE1C2",
        },
        line: "#E1CFA9",
        muted: "#6E5638",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        prose: "68ch",
        shell: "78rem",
      },
      borderRadius: {
        tile: "10px",
      },
      transitionTimingFunction: {
        settle: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "ambient-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "harness-pulse": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "ambient-float": "ambient-float 6s ease-in-out infinite",
        "harness-pulse": "harness-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
