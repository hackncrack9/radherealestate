/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0D1117",         // Deep charcoal / near-black
          surface: "#141922",      // Elevated dark surface
          charcoal: "#1C2331",     // Charcoal border and card tone
          ivory: "#FAF8F5",        // Warm ivory / off-white primary light
          cream: "#F4F0E8",        // Warm stone / soft background
          sand: "#E8E2D5",         // Border light tone
          stone: "#79756E",        // Warm grey secondary text
          muted: "#9D988F",        // Subdued text
          gold: {
            DEFAULT: "#C5A880",    // Elegant muted champagne gold
            light: "#DFC7A8",
            dark: "#A88B63",
            subtle: "rgba(197, 168, 128, 0.12)",
          }
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(13, 17, 23, 0.08)',
        'luxury-hover': '0 30px 60px -20px rgba(13, 17, 23, 0.18)',
        'gold-glow': '0 0 25px rgba(197, 168, 128, 0.25)',
      },
      letterSpacing: {
        'widest-editorial': '0.25em',
        'luxury': '0.15em',
      }
    },
  },
  plugins: [],
}
