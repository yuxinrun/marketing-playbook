import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        cream: {
          50: "#FCFBF8",
          100: "#F7F4ED",
          200: "#F0EBE0",
          300: "#E5DDCB",
        },
        ink: {
          DEFAULT: "#191C1E",
          soft: "#4E565B",
          muted: "#858C91",
          faint: "#B9BEC1",
        },
        brand: {
          50: "#FFF4EC",
          100: "#FFE6D3",
          200: "#FFC9A6",
          300: "#FFA66B",
          400: "#FB8338",
          500: "#EE6514",
          600: "#D9500B",
          700: "#B23C0D",
          800: "#8E3012",
          900: "#742912",
        },
        navy: {
          DEFAULT: "#123B57",
          deep: "#0C2A3F",
          light: "#1D5679",
        },
        forest: {
          DEFAULT: "#1E4D42",
          light: "#2F7362",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(25,28,30,0.04), 0 8px 30px -12px rgba(25,28,30,0.10)",
        "card-hover": "0 2px 4px rgba(25,28,30,0.05), 0 18px 45px -16px rgba(25,28,30,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
