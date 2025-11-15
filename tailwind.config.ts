import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dark: "#111",
        light: colors.white,

        primary: colors.violet,
        secondary: colors.purple,

        "primary-text": "rgb(var(--primary-text) / <alpha-value>)",
        "secondary-text": "rgb(var(--secondary-text) / <alpha-value>)",
      },

      backgroundColor: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        "canvas-100": "rgb(var(--canvas-100) / <alpha-value>)",
        "canvas-200": "rgb(var(--canvas-200) / <alpha-value>)",
      },

      borderColor: {
        DEFAULT: "rgb(var(--border) / <alpha-value>)",
        "border-100": "rgb(var(--border-100) / <alpha-value>)",
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "rgb(var(--secondary-text))",

            h1: {
              color: "rgb(var(--primary-text))",
            },
            h2: {
              color: "rgb(var(--primary-text))",
            },
            h3: {
              color: "rgb(var(--primary-text))",
            },
            h4: {
              color: "rgb(var(--primary-text))",
            },

            strong: {
              color: "rgb(var(--primary-text))",
            },

            a: {
              color: "rgb(var(--primary-text))",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
} satisfies Config;