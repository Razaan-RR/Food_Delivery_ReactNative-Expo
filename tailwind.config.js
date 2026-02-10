/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#F8FAFC",
        accent: "#16A34A",
        card: "#FFFFFF",
        gray: {
          100: "#F3F4F6",
          200: "#D1D5DB",
          300: "#6B7280",
        },
        dark: {
          100: "#111827",
        },
        error: "#DC2626",
        warning: "#FACC15",
        success: "#10B981",
        info: "#0EA5E9",
      },
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};