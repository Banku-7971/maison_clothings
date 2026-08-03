/** @type {import('tailwindcss').Config} */

// ═══════════════════════════════════════════════════════════════
// MAISON — LEGENDARY TAILWIND CONFIGURATION
// ═══════════════════════════════════════════════════════════════
// The most comprehensive design system for the world's most
// premium luxury fashion brand experience.
//
// Includes:
// - 40+ luxury colors organized by tone families
// - 4 premium font families with 9 weights each
// - Fluid responsive typography
// - 25+ custom animations and keyframes
// - 10 premium easing functions
// - Luxury gradients and shadow systems
// - Extended spacing, sizing, and z-index scales
// - Aspect ratios for fashion photography
// - Backdrop filters for glassmorphism
// - Custom breakpoints for luxury layouts
// ═══════════════════════════════════════════════════════════════

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  darkMode: 'class',
  
  theme: {
    // ─────────────────────────────────────────
    // CUSTOM BREAKPOINTS
    // Luxury-focused responsive design
    // ─────────────────────────────────────────
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      'tall': { 'raw': '(min-height: 800px)' },
      'short': { 'raw': '(max-height: 600px)' },
      'landscape': { 'raw': '(orientation: landscape)' },
      'portrait': { 'raw': '(orientation: portrait)' },
      'motion-safe': { 'raw': '(prefers-reduced-motion: no-preference)' },
      'motion-reduce': { 'raw': '(prefers-reduced-motion: reduce)' },
    },
    
    extend: {
      // ═══════════════════════════════════════
      // COMPLETE LUXURY COLOR SYSTEM
      // 40+ carefully curated shades
      // ═══════════════════════════════════════
      colors: {
        // ─────────────────────────────────
        // BLACKS — Deep, rich, cinematic
        // ─────────────────────────────────
        noir: '#0A0A0A',
        'noir-soft': '#0F0F0F',
        obsidian: '#0D0D0D',
        onyx: '#1A1A1A',
        charcoal: '#141414',
        'charcoal-light': '#1C1C1C',
        graphite: '#1F1F1F',
        'graphite-light': '#252525',
        ebony: '#181818',
        
        // ─────────────────────────────────
        // GRAYS — Sophisticated middle tones
        // ─────────────────────────────────
        smoke: '#3D3D3D',
        'smoke-light': '#4A4A4A',
        ash: '#5C5C5C',
        'ash-light': '#6B6B6B',
        silver: '#8A8A8A',
        'silver-light': '#9B9B9B',
        platinum: '#C0C0C0',
        'platinum-soft': '#CFCFCF',
        pearl: '#E5E5E5',
        mist: '#EBEBEB',
        
        // ─────────────────────────────────
        // WHITES & CREAMS — Warm luxury
        // ─────────────────────────────────
        ivory: '#F5F0EB',
        'ivory-soft': '#F7F2ED',
        cream: '#FAF7F2',
        'cream-warm': '#FBF8F3',
        bone: '#F0EBE3',
        'bone-light': '#F3EEE7',
        alabaster: '#FAFAF7',
        porcelain: '#F8F6F1',
        eggshell: '#F5F1EA',
        
        // ─────────────────────────────────
        // GOLDS — Signature accent
        // ─────────────────────────────────
        gold: '#C9A96E',
        'gold-bright': '#D4B77E',
        'gold-soft': '#BEA066',
        'deep-gold': '#8B7355',
        'dark-gold': '#6B5940',
        'pale-gold': '#D4BC8B',
        'antique-gold': '#A88B5C',
        champagne: '#E7D3AF',
        'champagne-dark': '#C8B492',
        
        // ─────────────────────────────────
        // ACCENT COLORS — Luxury tones
        // ─────────────────────────────────
        'rose-gold': '#B76E79',
        'rose-gold-light': '#C48592',
        burgundy: '#4A0E1F',
        'burgundy-light': '#5C1224',
        wine: '#5C1A2B',
        'wine-deep': '#3D0F1D',
        merlot: '#6E0E1E',
        forest: '#1A3D2E',
        'forest-deep': '#0F2A1E',
        emerald: '#2D5A3D',
        sage: '#8A9A8B',
        
        // ─────────────────────────────────
        // UTILITY COLORS
        // ─────────────────────────────────
        success: '#4A7C59',
        warning: '#C9A96E',
        error: '#8B2635',
        info: '#4A6B7C',
      },
      
      // ═══════════════════════════════════════
      // TYPOGRAPHY SYSTEM
      // ═══════════════════════════════════════
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        editorial: ['"Playfair Display"', '"Times New Roman"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      
      // ─────────────────────────────────────────
      // FLUID RESPONSIVE FONT SIZES
      // Auto-scale with viewport
      // ─────────────────────────────────────────
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
        
        // FLUID CLAMP SIZES — Responsive to viewport
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
        'ultra': 'clamp(5rem, 20vw, 20rem)',
      },
      
      // ─────────────────────────────────────────
      // FONT WEIGHTS
      // ─────────────────────────────────────────
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
      
      // ─────────────────────────────────────────
      // LETTER SPACING
      // ─────────────────────────────────────────
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
        'ultra-2': '0.7em',
      },
      
      // ─────────────────────────────────────────
      // LINE HEIGHTS
      // ─────────────────────────────────────────
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
      // ANIMATIONS — 25+ Custom Motions
      // ═══════════════════════════════════════
      animation: {
        // Fades
        'fade-in': 'fadeIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-fast': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-slow': 'fadeIn 3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-out': 'fadeOut 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        
        // Slides
        'slide-up': 'slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-down': 'slideDown 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slideLeft 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slideRight 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        
        // Scales
        'scale-in': 'scaleIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-out': 'scaleOut 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        
        // Reveals
        'reveal': 'reveal 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'reveal-up': 'revealUp 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'reveal-mask': 'revealMask 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        
        // Rotates
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-slower': 'rotate 40s linear infinite',
        'rotate-reverse': 'rotateReverse 20s linear infinite',
        
        // Marquees
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'marquee-reverse': 'marqueeReverse 40s linear infinite',
        
        // Effects
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'shimmer-slow': 'shimmer 5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'gradient-slow': 'gradient 15s ease infinite',
        'blob': 'blob 20s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'blink': 'blink 1s step-end infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      
      // ═══════════════════════════════════════
      // KEYFRAMES — Full definitions
      // ═══════════════════════════════════════
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
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        revealUp: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        revealMask: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotateReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
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
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 169, 110, 0.7)' },
          '50%': { boxShadow: '0 0 0 20px rgba(201, 169, 110, 0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 60% 40%' },
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
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // ═══════════════════════════════════════
      // BACKGROUND IMAGES & GRADIENTS
      // ═══════════════════════════════════════
      backgroundImage: {
        'gradient-noir': 'linear-gradient(180deg, #0A0A0A 0%, #1F1F1F 100%)',
        'gradient-noir-radial': 'radial-gradient(ellipse at center, #1F1F1F 0%, #0A0A0A 100%)',
        'gradient-noir-conic': 'conic-gradient(from 180deg at 50% 50%, #0A0A0A 0deg, #1F1F1F 180deg, #0A0A0A 360deg)',
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)',
        'gradient-gold-radial': 'radial-gradient(circle, #D4BC8B 0%, #8B7355 100%)',
        'gradient-ivory': 'linear-gradient(180deg, #F5F0EB 0%, #FAF7F2 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 50%, #0A0A0A 100%)',
        'gradient-dark-to-gold': 'linear-gradient(135deg, #0A0A0A 0%, #C9A96E 100%)',
        'gradient-champagne': 'linear-gradient(135deg, #E7D3AF 0%, #C9A96E 100%)',
        'shine': 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.4) 50%, transparent 100%)',
        'shine-ivory': 'linear-gradient(90deg, transparent 0%, rgba(245,240,235,0.3) 50%, transparent 100%)',
        'radial-gold': 'radial-gradient(circle at center, rgba(201,169,110,0.15) 0%, transparent 70%)',
        'radial-fade': 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.9) 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        'dots': 'radial-gradient(circle, rgba(201,169,110,0.3) 1px, transparent 1px)',
        'grid': 'linear-gradient(to right, rgba(245,240,235,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,240,235,0.05) 1px, transparent 1px)',
      },
      
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '200': '200% 200%',
        '400': '400% 400%',
        'dots': '20px 20px',
        'grid': '40px 40px',
      },
      
      // ═══════════════════════════════════════
      // SHADOWS
      // ═══════════════════════════════════════
      boxShadow: {
        'none': 'none',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 6px 12px -2px rgba(0, 0, 0, 0.15)',
        'lg': '0 15px 30px -5px rgba(0, 0, 0, 0.3)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        '2xl': '0 35px 70px -15px rgba(0, 0, 0, 0.6)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'luxury-lg': '0 45px 80px -20px rgba(0, 0, 0, 0.9)',
        'luxury-xl': '0 65px 100px -25px rgba(0, 0, 0, 1)',
        'gold-glow': '0 0 40px rgba(201, 169, 110, 0.3)',
        'gold-glow-sm': '0 0 20px rgba(201, 169, 110, 0.2)',
        'gold-glow-lg': '0 0 80px rgba(201, 169, 110, 0.5)',
        'ivory-glow': '0 0 30px rgba(245, 240, 235, 0.15)',
        'inner-luxury': 'inset 0 2px 4px 0 rgba(255,255,255,0.05)',
        'inner-dark': 'inset 0 -20px 40px -20px rgba(0,0,0,0.8)',
        'card': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 30px 60px -15px rgba(0, 0, 0, 0.7)',
        'product': '0 20px 60px -15px rgba(0, 0, 0, 0.5)',
        'product-hover': '0 40px 80px -20px rgba(0, 0, 0, 0.8)',
      },
      
      // ═══════════════════════════════════════
      // BACKDROP FILTERS
      // ═══════════════════════════════════════
      backdropBlur: {
        'none': '0',
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        'luxury': '20px',
        'ultra': '40px',
        'extreme': '60px',
      },
      
      backdropSaturate: {
        '0': '0',
        '50': '.5',
        '100': '1',
        '150': '1.5',
        '180': '1.8',
        '200': '2',
      },
      
      // ═══════════════════════════════════════
      // TRANSITIONS & EASING
      // ═══════════════════════════════════════
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
        'anticipate': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
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
        '3000': '3000ms',
      },
      
      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
        '1500': '1500ms',
      },
      
      // ═══════════════════════════════════════
      // SPACING SYSTEM
      // ═══════════════════════════════════════
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
        '58': '14.5rem',
        '68': '17rem',
        '76': '19rem',
        '84': '21rem',
        '92': '23rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      
      // ═══════════════════════════════════════
      // WIDTHS & HEIGHTS
      // ═══════════════════════════════════════
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
        'screen-3xl': '1920px',
        'prose-lg': '80ch',
        'prose-xl': '100ch',
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
      
      // ═══════════════════════════════════════
      // Z-INDEX SCALE
      // ═══════════════════════════════════════
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
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
        'cursor': '9998',
        'grain': '9997',
        'menu': '9000',
        'modal': '8000',
        'drawer': '7000',
        'header': '5000',
      },
      
      // ═══════════════════════════════════════
      // BORDERS & RADIUS
      // ═══════════════════════════════════════
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
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
      
      // ═══════════════════════════════════════
      // ASPECT RATIOS
      // Fashion photography ratios
      // ═══════════════════════════════════════
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '3 / 4',
        'portrait-tall': '2 / 3',
        'product': '4 / 5',
        'product-tall': '3 / 5',
        'landscape': '16 / 9',
        'cinema': '21 / 9',
        'ultrawide': '32 / 9',
        'lookbook': '5 / 7',
        'editorial': '4 / 6',
        'fashion': '2 / 3',
        'polaroid': '4 / 5',
        'story': '9 / 16',
      },
      
      // ═══════════════════════════════════════
      // BLUR
      // ═══════════════════════════════════════
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
      
      // ═══════════════════════════════════════
      // OPACITY
      // ═══════════════════════════════════════
      opacity: {
        '0': '0',
        '2': '0.02',
        '5': '0.05',
        '8': '0.08',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '35': '0.35',
        '40': '0.4',
        '45': '0.45',
        '50': '0.5',
        '55': '0.55',
        '60': '0.6',
        '65': '0.65',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
      
      // ═══════════════════════════════════════
      // CURSOR
      // ═══════════════════════════════════════
      cursor: {
        'none': 'none',
        'default': 'default',
        'pointer': 'pointer',
        'wait': 'wait',
        'text': 'text',
        'move': 'move',
        'grab': 'grab',
        'grabbing': 'grabbing',
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
      },
    },
  },
  
  plugins: [],
}