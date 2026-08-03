/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════
      // MAISON LUXURY COLOR SYSTEM
      // ═══════════════════════════════════
      colors: {
        // Blacks & Grays
        noir: '#0A0A0A',
        charcoal: '#141414',
        graphite: '#1F1F1F',
        obsidian: '#0D0D0D',
        onyx: '#1A1A1A',
        
        // Grays
        smoke: '#3D3D3D',
        ash: '#5C5C5C',
        silver: '#8A8A8A',
        platinum: '#C0C0C0',
        pearl: '#E5E5E5',
        
        // Whites & Creams
        ivory: '#F5F0EB',
        cream: '#FAF7F2',
        bone: '#F0EBE3',
        alabaster: '#FAFAF7',
        
        // Accent Golds
        gold: '#C9A96E',
        'deep-gold': '#8B7355',
        'pale-gold': '#D4BC8B',
        champagne: '#E7D3AF',
        
        // Accent Colors
        'rose-gold': '#B76E79',
        burgundy: '#4A0E1F',
        wine: '#5C1A2B',
        forest: '#1A3D2E',
      },
      
      // ═══════════════════════════════════
      // TYPOGRAPHY SYSTEM
      // ═══════════════════════════════════
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      
      fontSize: {
        'micro': ['0.625rem', { lineHeight: '1', letterSpacing: '0.15em' }],
        'tiny': ['0.7rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
        'mega': 'clamp(4rem, 15vw, 15rem)',
        'hero': 'clamp(3rem, 12vw, 12rem)',
        'display': 'clamp(2.5rem, 8vw, 8rem)',
        'title': 'clamp(1.75rem, 5vw, 5rem)',
        'heading': 'clamp(1.5rem, 3vw, 3rem)',
      },
      
      letterSpacing: {
        'ultra': '0.5em',
        'mega': '0.3em',
        'wider-2': '0.15em',
        'tight-2': '-0.03em',
        'tight-3': '-0.05em',
      },
      
      lineHeight: {
        'ultra-tight': '0.85',
        'super-tight': '0.9',
        'display': '0.95',
      },
      
      // ═══════════════════════════════════
      // ANIMATIONS
      // ═══════════════════════════════════
      animation: {
        'fade-in': 'fadeIn 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in-slow': 'fadeIn 3s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-down': 'slideDown 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'scale-in': 'scaleIn 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'reveal': 'reveal 1.4s cubic-bezier(0.77, 0, 0.175, 1)',
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-slower': 'rotate 40s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'blob': 'blob 20s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5', transform: 'translateX(-100%)' },
          '50%': { opacity: '1', transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      
      // ═══════════════════════════════════
      // BACKGROUNDS
      // ═══════════════════════════════════
      backgroundImage: {
        'gradient-noir': 'linear-gradient(180deg, #0A0A0A 0%, #1F1F1F 100%)',
        'gradient-noir-radial': 'radial-gradient(ellipse at center, #1F1F1F 0%, #0A0A0A 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)',
        'gradient-ivory': 'linear-gradient(180deg, #F5F0EB 0%, #FAF7F2 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 50%, #0A0A0A 100%)',
        'shine': 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.4) 50%, transparent 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        'radial-gold': 'radial-gradient(circle at center, rgba(201,169,110,0.15) 0%, transparent 70%)',
      },
      
      // ═══════════════════════════════════
      // SHADOWS
      // ═══════════════════════════════════
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'luxury-lg': '0 45px 80px -20px rgba(0, 0, 0, 0.9)',
        'gold-glow': '0 0 40px rgba(201, 169, 110, 0.3)',
        'gold-glow-lg': '0 0 80px rgba(201, 169, 110, 0.5)',
        'inner-luxury': 'inset 0 2px 4px 0 rgba(255,255,255,0.05)',
        'inner-dark': 'inset 0 -20px 40px -20px rgba(0,0,0,0.8)',
        'card': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 30px 60px -15px rgba(0, 0, 0, 0.7)',
      },
      
      backdropBlur: {
        'xs': '2px',
        'luxury': '20px',
        'ultra': '40px',
      },
      
      // ═══════════════════════════════════
      // TRANSITIONS & EASING
      // ═══════════════════════════════════
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      
      // ═══════════════════════════════════
      // SPACING & SIZING
      // ═══════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '38': '9.5rem',
        '45': '11.25rem',
      },
      
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // ═══════════════════════════════════
      // BORDERS & RADIUS
      // ═══════════════════════════════════
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      
      // ═══════════════════════════════════
      // ASPECT RATIOS
      // ═══════════════════════════════════
      aspectRatio: {
        'portrait': '3 / 4',
        'product': '4 / 5',
        'landscape': '16 / 9',
        'cinema': '21 / 9',
        'square': '1 / 1',
      },
    },
  },
  plugins: [],
}