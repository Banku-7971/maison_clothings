/** @type {import('tailwindcss').Config} */

// ═══════════════════════════════════════════════════════════════
// MAISON — WARM LUXURY TAILWIND CONFIG
// ═══════════════════════════════════════════════════════════════

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    
    extend: {
      // ═══════════════════════════════════════
      // WARM LUXURY COLOR PALETTE
      // ═══════════════════════════════════════
      colors: {
        // Warm Espresso Backgrounds (was black)
        noir: '#2A1F1A',
        'noir-soft': '#332620',
        obsidian: '#2A1F1A',
        charcoal: '#3D2E24',
        'charcoal-light': '#4A3A2F',
        graphite: '#4A3A2F',
        'graphite-light': '#5A4A3F',
        onyx: '#332620',
        ebony: '#2E221C',
        
        // Warm Middle Tones
        smoke: '#6B5647',
        'smoke-light': '#7A6555',
        ash: '#8B7566',
        'ash-light': '#9A8474',
        silver: '#A89684',
        'silver-light': '#B5A594',
        platinum: '#C4B5A3',
        'platinum-soft': '#D0C2B0',
        pearl: '#D4C7B8',
        mist: '#DDD1C3',
        
        // Warm Cream Lights
        ivory: '#F5EBDD',
        'ivory-soft': '#F7EEE1',
        cream: '#F0E5D3',
        'cream-warm': '#F2E8D8',
        bone: '#E8DDCB',
        'bone-light': '#EDE2D2',
        alabaster: '#FBF5EA',
        porcelain: '#F8F0E1',
        eggshell: '#F5EBDA',
        
        // Terracotta / Warm Accents
        gold: '#B76E5D',
        'gold-bright': '#C97F6C',
        'gold-soft': '#A56556',
        'deep-gold': '#8B5A4A',
        'dark-gold': '#6D4535',
        'pale-gold': '#D4967D',
        'antique-gold': '#A16951',
        champagne: '#E4B590',
        'champagne-dark': '#C89574',
        
        // Additional Warm Accents
        'rose-gold': '#C97F6C',
        'rose-gold-light': '#D89484',
        burgundy: '#7A2E2E',
        'burgundy-light': '#8B3838',
        wine: '#8B3A3A',
        'wine-deep': '#5C1E1E',
        merlot: '#8B3838',
        forest: '#4A5D3F',
        'forest-deep': '#3A4A31',
        emerald: '#5E7A50',
        sage: '#9CAF8F',
        
        // Utility
        success: '#5E7A50',
        warning: '#B76E5D',
        error: '#7A2E2E',
        info: '#5A6E7A',
      },
      
      // ═══════════════════════════════════════
      // TYPOGRAPHY
      // ═══════════════════════════════════════
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        editorial: ['"Playfair Display"', '"Times New Roman"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      
      fontSize: {
        'micro': ['0.625rem', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '500' }],
        'tiny': ['0.7rem', { lineHeight: '1.2', letterSpacing: '0.1em', fontWeight: '500' }],
        'xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
        
        'fluid-xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 1.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 2.5vw, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 3vw, 2rem)',
        'heading': 'clamp(1.5rem, 3vw, 3rem)',
        'title': 'clamp(1.75rem, 5vw, 5rem)',
        'display': 'clamp(2.5rem, 8vw, 8rem)',
        'hero': 'clamp(3rem, 12vw, 12rem)',
        'mega': 'clamp(4rem, 15vw, 15rem)',
      },
      
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'tighter-2': '-0.04em',
        'tight-2': '-0.03em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'wider-2': '0.15em',
        'mega': '0.3em',
        'ultra': '0.5em',
      },
      
      lineHeight: {
        'ultra-tight': '0.85',
        'super-tight': '0.9',
        'display': '0.95',
        'none': '1',
        'tight': '1.1',
        'snug': '1.25',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      
      // ═══════════════════════════════════════
      // ANIMATIONS
      // ═══════════════════════════════════════
      animation: {
        'fade-in': 'fadeIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-fast': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-slow': 'fadeIn 3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-out': 'fadeOut 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-down': 'slideDown 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slideLeft 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slideRight 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'reveal': 'reveal 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-slower': 'rotate 40s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'shimmer-slow': 'shimmer 5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
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
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
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
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(183, 110, 93, 0.7)' },
          '50%': { boxShadow: '0 0 0 20px rgba(183, 110, 93, 0)' },
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
      
      // ═══════════════════════════════════════
      // WARM GRADIENTS
      // ═══════════════════════════════════════
      backgroundImage: {
        'gradient-noir': 'linear-gradient(180deg, #2A1F1A 0%, #3D2E24 100%)',
        'gradient-noir-radial': 'radial-gradient(ellipse at center, #3D2E24 0%, #2A1F1A 100%)',
        'gradient-gold': 'linear-gradient(135deg, #B76E5D 0%, #8B5A4A 100%)',
        'gradient-gold-radial': 'radial-gradient(circle, #D4967D 0%, #8B5A4A 100%)',
        'gradient-ivory': 'linear-gradient(180deg, #F5EBDD 0%, #F0E5D3 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #2A1F1A 0%, #4A3A2F 50%, #2A1F1A 100%)',
        'gradient-warm': 'linear-gradient(135deg, #3D2E24 0%, #5A4A3F 100%)',
        'gradient-terracotta': 'linear-gradient(135deg, #B76E5D 0%, #C97F6C 100%)',
        'shine': 'linear-gradient(90deg, transparent 0%, rgba(183,110,93,0.4) 50%, transparent 100%)',
        'radial-gold': 'radial-gradient(circle at center, rgba(183,110,93,0.15) 0%, transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      
      // ═══════════════════════════════════════
      // WARM SHADOWS
      // ═══════════════════════════════════════
      boxShadow: {
        'none': 'none',
        'sm': '0 2px 8px 0 rgba(42, 31, 26, 0.15)',
        'DEFAULT': '0 4px 12px -1px rgba(42, 31, 26, 0.2)',
        'md': '0 8px 20px -2px rgba(42, 31, 26, 0.25)',
        'lg': '0 15px 35px -5px rgba(42, 31, 26, 0.3)',
        'xl': '0 25px 50px -12px rgba(42, 31, 26, 0.4)',
        '2xl': '0 35px 70px -15px rgba(42, 31, 26, 0.5)',
        'luxury': '0 25px 50px -12px rgba(42, 31, 26, 0.5)',
        'luxury-lg': '0 45px 80px -20px rgba(42, 31, 26, 0.6)',
        'gold-glow': '0 0 40px rgba(183, 110, 93, 0.3)',
        'gold-glow-sm': '0 0 20px rgba(183, 110, 93, 0.2)',
        'gold-glow-lg': '0 0 80px rgba(183, 110, 93, 0.4)',
        'ivory-glow': '0 0 30px rgba(245, 235, 221, 0.2)',
        'card': '0 10px 40px -10px rgba(42, 31, 26, 0.3)',
        'card-hover': '0 30px 60px -15px rgba(42, 31, 26, 0.5)',
        'warm': '0 20px 60px -15px rgba(139, 90, 74, 0.25)',
        'warm-lg': '0 30px 80px -20px rgba(139, 90, 74, 0.35)',
        'product': '0 20px 60px -15px rgba(42, 31, 26, 0.4)',
        'product-hover': '0 40px 80px -20px rgba(42, 31, 26, 0.5)',
      },
      
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        'luxury': '20px',
        'ultra': '40px',
      },
      
      transitionTimingFunction: {
        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '45': '11.25rem',
        '50': '12.5rem',
      },
      
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      
      minHeight: {
        'screen-50': '50vh',
        'screen-75': '75vh',
        'screen-90': '90vh',
      },
      
      height: {
        'screen-50': '50vh',
        'screen-75': '75vh',
        'screen-90': '90vh',
      },
      
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'max': '9999',
      },
      
      // ═══════════════════════════════════════
      // ROUNDED CORNERS — MUCH CURVIER!
      // ═══════════════════════════════════════
      borderRadius: {
        'none': '0',
        'sm': '8px',
        DEFAULT: '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '36px',
        '3xl': '48px',
        '4xl': '60px',
        'full': '9999px',
      },
      
      borderWidth: {
        '0': '0',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '3 / 4',
        'portrait-tall': '2 / 3',
        'product': '4 / 5',
        'landscape': '16 / 9',
        'cinema': '21 / 9',
        'lookbook': '5 / 7',
        'fashion': '2 / 3',
      },
      
      blur: {
        'none': '0',
        'xs': '2px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
      
      cursor: {
        'none': 'none',
        'default': 'default',
        'pointer': 'pointer',
        'wait': 'wait',
        'text': 'text',
        'move': 'move',
        'grab': 'grab',
        'grabbing': 'grabbing',
      },
    },
  },
  
  plugins: [],
}