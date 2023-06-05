/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
         'MobileS': {'min': '320px'},
        // => @media (min-width: 320px) { ... }

        'MobileM': {'min': '375px'},
        // => @media (min-width: 375px) { ... }
        
        'MobileL': {'min': '425px'},
        // => @media (min-width: 425px) { ... }

        'Tablet': {'min': '768px'},
        // => @media (min-width: 768px) { ... }

        'Laptop': {'min': '1024px'},
        // => @media (min-width: 1024px) { ... }

        'LaptopL': {'min': '1440px'},
        // => @media (min-width: 1440px) { ... }

        '4K': {'min': '2560px',},
        // => @media (min-width: 2560px) { ... }
      },
    },
  },
  plugins: [],
}
