import type { Config } from "tailwindcss";

/**
 * Palette derived from the DigiDan logo (brief section 3.1).
 * Rule enforced by usage, not by the config: colour lives in blocks, tiles,
 * badges and illustration, never in backgrounds behind body copy.
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
        teal: {
          100: "#E1F5EE",
          300: "#5DCAA5",
          500: "#1D9E75",
          900: "#085041",
        },
        coral: {
          100: "#FAECE7",
          300: "#F0997B",
          500: "#D85A30",
          900: "#712B13",
        },
        amber: {
          100: "#FAEEDA",
          200: "#FAC775",
          400: "#EF9F27",
          900: "#633806",
        },
        ink: "#26261F",
        paper: {
          DEFAULT: "#FFFFFF",
          warm: "#FAF9F6",
        },
        line: "#E5E3DC",
        muted: "#726F63",
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
