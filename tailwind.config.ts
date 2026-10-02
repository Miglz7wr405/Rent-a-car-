import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        night: {
          950: "#070B18",
          900: "#0A0F1C",
          800: "#111828",
          700: "#1A2238",
          600: "#232C47"
        },
        bone: {
          50: "#F7F8FB",
          100: "#EEF1F6",
          200: "#D6DCE6",
          300: "#A8B1C2"
        },
        amber: {
          400: "#F7C844",
          500: "#F0B429",
          600: "#D29A14"
        },
        ink: {
          900: "#0C1222",
          600: "#4B5567",
          400: "#8B93A6"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-fraunces)", "Georgia", "serif"]
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        glow: "0 20px 60px -20px rgba(240, 180, 41, 0.35)",
        card: "0 10px 30px -15px rgba(10, 15, 28, 0.5)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
