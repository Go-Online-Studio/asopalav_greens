/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F2',  // Warm Alabaster Silk (Dominant Canvas)
          100: '#F3EDE2', // Linen Cream (Secondary Panels/Cards)
          200: '#EADFCF',
          300: '#DED0BC',
        },
        gold: {
          300: '#E2CCA6',
          400: '#D4AF37', // Antique Brushed Gold
          500: '#C5A880', // Signature Antique Gold
          600: '#A88B63',
          700: '#8A6D47',
        },
        espresso: {
          800: '#432E25',
          900: '#38251D',
          950: '#2A1C16', // Rich Espresso / Bronze-Brown (Primary Typography)
        },
        cognac: {
          700: '#6D4937',
          800: '#5C3D2E', // Warm Cognac / Burnished Bronze
          900: '#4A3023',
        },
        wine: {
          800: '#8A242E',
          900: '#721B24', // Royal Crimson / Deep Wine (Royal Badges & CTAs)
          950: '#4A0E17', // Velvet Wine Accent
        },
        olive: {
          800: '#3C4F42',
          900: '#2F3E34', // Deep Olive Noir (Minimalist Botanical Micro-Accent)
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        editorial: ['Italiana', 'Cormorant Garamond', 'serif'],
        display: ['Cinzel', 'Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderColor: {
        'gold-hairline': 'rgba(197, 168, 128, 0.35)',
      },
    },
  },
  plugins: [],
}
