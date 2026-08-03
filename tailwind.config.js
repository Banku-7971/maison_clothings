/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MAISON Luxury Palette
        noir: '#0A0A0A',
        charcoal: '#1A1A1A',
        graphite: '#2D2D2D',
        silver: '#8A8A8A',
        platinum: '#C0C0C0',
        ivory: '#F5F0EB',
        cream: '#FAF7F2',
        gold: '#C9A96E',
        'rose-gold': '#B76E79',
        'deep-gold': '#8B7355',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        editorial: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 12vw, 12rem)',
        'display': 'clamp(2rem, 8vw, 8rem)',
        'title': 'clamp(1.5rem, 4vw, 4rem)',
        'tiny': '0.65rem',
      },
      letterSpacing: {
        'ultra': '0.5em',
        'mega': '0.3em',
        'wider-2': '0.15em',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        'scale-in': 'scaleIn 1s ease-out',
        'rotate-slow': 'rotate 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-noir': 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)',
        'gradient-ivory': 'linear-gradient(180deg, #F5F0EB 0%, #FAF7F2 100%)',
        'shine': 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'gold-glow': '0 0 40px rgba(201, 169, 110, 0.3)',
        'inner-luxury': 'inset 0 2px 4px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        'xs': '2px',
        'luxury': '20px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
}