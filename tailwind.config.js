/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE5D4',
        },
        obsidian: '#0F1010',
        slate: '#1C2027',
        aegean: {
          DEFAULT: '#1B4F6B',
          light: '#2A6F94',
        },
        terracotta: {
          DEFAULT: '#C4552A',
          light: '#D4724A',
        },
        gold: {
          DEFAULT: '#B8923A',
          light: '#D4A84E',
        },
        mist: '#8B9098',
        cream: '#FDFCFA',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(52px, 6vw, 88px)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(36px, 5vw, 64px)', { lineHeight: '1.1' }],
        'display-md': ['clamp(32px, 4vw, 52px)', { lineHeight: '1.1' }],
      },
      borderRadius: {
        'sm': '2px',
        'DEFAULT': '3px',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'slide-in-right': 'slideInRight 0.9s ease forwards',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(61,190,124,0.4)' },
          '50%': { boxShadow: '0 0 0 6px rgba(61,190,124,0)' },
        },
      },
    },
  },
  plugins: [],
}
