/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        app: "var(--bg)",
      },
      boxShadow: {
        glow: "0 0 24px -4px var(--glow)",
      },
    },
  },
  plugins: [],
};
