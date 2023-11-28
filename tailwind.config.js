/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#f1ee63',
        txt:'#271F4B',
        outline:'#615C7F'
      },

    },
  },
  plugins: [],
 
}

