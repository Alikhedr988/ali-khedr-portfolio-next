import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // CSS vars defined as R G B channels for opacity modifier support
        ink:        "rgb(var(--ink) / <alpha-value>)",
        "ink-2":    "rgb(var(--ink-2) / <alpha-value>)",
        "ink-3":    "rgb(var(--ink-3) / <alpha-value>)",
        cream:      "rgb(var(--cream) / <alpha-value>)",
        "cream-2":  "rgb(var(--cream-2) / <alpha-value>)",
        muted:      "rgb(var(--muted) / <alpha-value>)",
        ochre:      "rgb(var(--ochre) / <alpha-value>)",
        "ochre-dim":"rgb(var(--ochre-dim) / <alpha-value>)",
        teal:       "rgb(var(--teal) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
