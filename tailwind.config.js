module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14120f',
        cream: '#faf7f2',
        creamdark: '#f2ebe0',
        'cream-dark': '#f2ebe0',
        beige: '#f2ebe0',
        gold: '#b08d57',
        golddeep: '#8a6a3d',
        'gold-dark': '#8a6a3d',
        goldlight: '#d9be8e',
        'gold-light': '#d9be8e',
        heading: '#14120f',
        body: '#5c5449',
        hairline: '#e7ddc9',
        chocolate: '#1e1813',
        night: '#14120f',
        warm: {
          400: '#6f6558',
          500: '#5c5449',
          600: '#4a433a',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'ui-sans-serif', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        luxe: '0 24px 70px -24px rgba(20, 18, 15, 0.28)',
        card: '0 12px 44px -14px rgba(20, 18, 15, 0.16)',
        gold: '0 16px 40px -16px rgba(176, 141, 87, 0.45)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        kenburns: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.12) translateY(-1.5%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slowzoom: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.08)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .9s cubic-bezier(0.22, 1, 0.36, 1) both',
        kenburns: 'kenburns 14s ease-out forwards',
        floaty: 'floaty 5s ease-in-out infinite',
        slowzoom: 'slowzoom 14s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
