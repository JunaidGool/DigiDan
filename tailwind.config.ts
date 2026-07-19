import type { Config } from "tailwindcss";

/**
 * DigiDan design system (spec v1.0, section 2).
 * The clean lab (light) over the engine room (dark), joined by an amber weld
 * seam. Every colour and size on the site comes from these tokens. No Tailwind
 * default colours, no rounded corners, no gradients.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    // Square everything: the site has no rounded corners anywhere (spec 1).
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      full: "9999px", // reserved for the pulsing LIVE dot only
    },
    extend: {
      colors: {
        paper: "#F1F2F0", // lab background
        ink: "#141717", // text on paper
        obsidian: "#0E1111", // engine room background
        platinum: "#EAEAEA", // text on obsidian
        console: "#0A0D0D", // console blocks only
        slate: {
          l: "#66716F", // muted text on paper
          d: "#7A8B8B", // muted text on obsidian
        },
        amber: {
          l: "#A9851E", // accent on paper (darkened for contrast)
          d: "#D4AF37", // accent on obsidian
        },
        seam: "#C9A227", // weld lines and primary buttons
        line: {
          l: "rgba(20,23,23,.16)", // hairlines on paper
          d: "rgba(122,139,139,.28)", // hairlines on obsidian
        },
        // Logo brand colours: used ONLY inside the logo mark, never as UI colour.
        brand: {
          teal: "#45A08E",
          orange: "#F07E26",
          yellow: "#F5C518",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["clamp(2.6rem, 5.4vw, 4.6rem)", { lineHeight: "1.06" }],
        h2: ["clamp(1.5rem, 2.6vw, 2.2rem)", { lineHeight: "1.15" }],
        statement: ["clamp(1.15rem, 2vw, 1.6rem)", { lineHeight: "1.5" }],
        label: ["0.66rem", { lineHeight: "1", letterSpacing: "0.24em" }],
      },
      maxWidth: {
        shell: "1440px",
        statement: "52rem",
      },
      screens: {
        // Spec breakpoint (section 2.3): below it, columns stack and the hero
        // grid violation is disabled.
        wide: "960px",
      },
      transitionTimingFunction: {
        // ease-out cubic for the telemetry count-up and reveals.
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
