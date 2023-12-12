/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                secondary: '#f1ee63',
                txt: '#0D062D',
                outline: '#615C7F',
                bgColor: '#FAFBFF',
            },
            backgroundImage: {
                hero: "url('/src/assets/img/Hero-illustration.svg')",
            },
        },
        screens: {
            '3xl': '1920px',
            '2xl': '1536px',
            xl: '1280px',
            lg: '1024px',
            md: '768px',
            sm: '640px',
            xs: '425px',
        },
    },
    plugins: [],
};
