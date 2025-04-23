const { heroui } = require("@heroui/react");
const fluid = require("fluid-tailwind");
const { extract, screens, fontSize } = fluid;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    extract,
  ],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace, poppins",
    },
    screens,
    fontSize,

    fluid: ({ theme }) => ({
      defaultScreens: ["20rem", theme("screens.lg")],
    }),

    extend: {
      colors: {
        primary: "var(--primary-color)",

        "secondary-blue": "var(--secondary-blue)",
        "secondary-green": "var(--secondary-green)",
        "secondary-orange": "var(--secondary-orange)",
        "secondary-red": "var(--secondary-red)",

        "neutral-01": "var(--neutral-01)",
        "neutral-02": "var(--neutral-02)",
        "neutral-03": "var(--neutral-03)",
        "neutral-04": "var(--neutral-04)",
        "neutral-05": "var(--neutral-05)",
        "neutral-06": "var(--neutral-06)",
        "neutral-07": "var(--neutral-07)",

        "bg-color": "var(--bg-color)",

        // Add the new color definitions
        grey: {
          0: "#fff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#0d1b2a",
        },
        blue: {
          100: "#e0f2fe",
          700: "#0369a1",
        },
        green: {
          100: "#dcfce7",
          700: "#15803d",
        },
        yellow: {
          100: "#fef9c3",
          700: "#a16207",
        },
        silver: {
          100: "#e5e7eb",
          700: "#374151",
        },
        indigo: {
          100: "#e0e7ff",
          700: "#4338ca",
        },
        red: {
          100: "#fee2e2",
          700: "#b91c1c",
          800: "#991b1b",
        },
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      borderRadius: {
        tiny: "3px",
        sm: "5px",
        md: "7px",
        lg: "9px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)",
        lg: "0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)",
      },
      backdropColor: {
        DEFAULT: "rgba(255, 255, 255, 0.1)",
      },
      grayscale: {
        DEFAULT: "0",
        10: "10%",
      },
      opacity: {
        90: "90%",
        100: "100%",
      },
      fontSize: {
        hero: "var(--font-size-hero)",
        "heading-1": "var(--font-size-heading-1)",
        "heading-2": "var(--font-size-heading-2)",
        "heading-3": "var(--font-size-heading-3)",
        "heading-4": "var(--font-size-heading-4)",
        "heading-5": "var(--font-size-heading-5)",
        "heading-6": "var(--font-size-heading-6)",
        "heading-7": "var(--font-size-heading-7)",
      },
      screens: {
        xs: "20rem",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
    fluid({
      checkSC144: false, // default: true
    }),
  ],
};
