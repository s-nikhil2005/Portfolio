import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#0B0C0E",
          light: "#FAFAF8",
        },
        surface: {
          dark: "#141519",
          light: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#3DDC84",
          tint: "rgba(61, 220, 132, 0.10)",
          hover: "#34C776",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        container: "1160px",
        narrow: "840px",
      },
      borderRadius: {
        pill: "9999px",
        control: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
