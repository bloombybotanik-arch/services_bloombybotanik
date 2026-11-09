import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'botanik-linen': '#F9F6F0',
        'botanik-bg': '#F9F6F0',
        'botanik-cream': '#F5F0E6',
        'botanik-tan': '#D4C5B9',
        'botanik-ash': '#8A8177',
        'botanik-green': '#3E4A3D',
        'botanik-sage': '#A8B8A0',
        'botanik-orange': '#C8AB8A',
        'botanik-clay': '#C8AB8A',
        'botanik-border': '#E7DFD3',
        'botanik-dark': '#0F261E',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    tailwindAnimate,
  ],
};
