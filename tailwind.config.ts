import type { Config } from "tailwindcss";

/**
 * DigiDan design system: a dark, premium interface modelled on the CoLab
 * language (near-black canvas, big bold headings, rounded surfaces, one warm
 * gradient signature) rebuilt around the DigiDan brand. The single bright accent
 * is DigiDan orange; the deep-plum second stop gives the gradient its richness.
 *
 * Everything here is hand-built. No component library, no borrowed theme. The
 * primitives in components/ui consume these tokens directly.
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
        // Canvas + surfaces (dark, faintly warm-neutral).
        ink: "#050609", // page canvas
        night: "#0A0B10", // section alt
        surface: "#111219", // card
        raised: "#191B24", // elevated card / control
        line: "rgba(255,255,255,0.08)",
        // Brand accent family.
        orange: {
          DEFAULT: "#F07E26",
          light: "#FF9C52",
          deep: "#C25E12",
        },
        plum: "#3B2352", // gradient depth stop
        gold: "#F5C518", // sparks / stars
        teal: "#2DE1C6", // secondary data accent
        // Foreground scale.
        ash: "#9BA1AF", // body text
        fog: "#6B7080", // muted / captions
      },
      borderRadius: {
        none: "0",
        sm: "8px",
        DEFAULT: "12px",
        md: "14px",
        lg: "18px",
        xl: "24px",
        "2xl": "30px",
        "3xl": "38px",
        full: "9999px",
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 8vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(2rem, 5.4vw, 3.6rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        h3: [
          "clamp(1.4rem, 3vw, 2.1rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
        lead: ["clamp(1.15rem, 2.2vw, 1.6rem)", { lineHeight: "1.5" }],
        label: ["0.7rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      maxWidth: {
        shell: "1200px",
        prose: "46rem",
      },
      screens: {
        wide: "900px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 60px -30px rgba(0,0,0,0.9)",
        glow: "0 0 0 1px rgba(240,126,38,0.35), 0 18px 50px -18px rgba(240,126,38,0.55)",
        "glow-soft": "0 20px 80px -30px rgba(240,126,38,0.45)",
        lift: "0 30px 70px -35px rgba(0,0,0,0.85)",
      },
      backgroundImage: {
        // The signature showcase gradient: orange leading into deep plum.
        ember:
          "linear-gradient(155deg, #F07E26 0%, #C2521B 30%, #5A2E52 68%, #120E1C 100%)",
        "ember-soft":
          "radial-gradient(120% 120% at 15% 12%, rgba(240,126,38,0.30) 0%, rgba(90,46,82,0.18) 45%, rgba(5,6,9,0) 78%)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        sheen: {
          "0%": { transform: "translateX(-140%) skewX(-18deg)" },
          "100%": { transform: "translateX(240%) skewX(-18deg)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.28" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
