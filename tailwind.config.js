/** @type {import('tailwindcss').Config} */

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
      colors: {
        // ═══════════════════════════════════════
        // MULTI-TONE LUXURY PALETTE
        // Each section gets its own atmosphere
        // ═══════════════════════════════════════
        
        // 🌑 DEEP ESPRESSO (Navbar, Base)
        noir: '#2A1F1A',
        'noir-soft': '#332620',
        obsidian: '#2A1F1A',
        charcoal: '#3D2E24',
        'charcoal-light': '#4A3A2F',
        graphite: '#4A3A2F',
        'graphite-light': '#5A4A3F',
        onyx: '#332620',
        ebony: '#2E221C',
        
        // 🌅 TERRACOTTA WARMTH (Hero, CTAs)
        gold: '#C87952',
        'gold-bright': '#D68B67',
        'gold-soft': '#B36847',
        'deep-gold': '#8B4A32',
        'dark-gold': '#6B3520',
        'pale-gold': '#DBA085',
        'antique-gold': '#A86040',
        champagne: '#E8B594',
        'champagne-dark': '#C9946F',
        terracotta: '#C87952',
        rust: '#B85D3A',
        
        // ☕ WARM CREAM & IVORY (Featured Products)
        ivory: '#F5EBDD',
        'ivory-soft': '#F7EEE1',
        cream: '#F0E5D3',
        'cream-warm': '#F2E8D8',
        'cream-pink': '#F5E4D5',
        bone: '#E8DDCB',
        'bone-light': '#EDE2D2',
        alabaster: '#FBF5EA',
        porcelain: '#F8F0E1',
        eggshell: '#F5EBDA',
        oat: '#E8DDC5',
        vanilla: '#F5E9C9',
        
        // 🌿 FOREST & SAGE (3D Section, Collections)
        forest: '#3D5342',
        'forest-deep': '#2A3B2E',
        'forest-light': '#4E6753',
        emerald: '#4A6650',
        sage: '#8B9B87',
        'sage-light': '#A0B09C',
        'sage-dark': '#6E7D6B',
        moss: '#6B7A65',
        eucalyptus: '#95A891',
        
        // 🍷 WINE & BURGUNDY (Video, Evening)
        burgundy: '#5C1E2E',
        'burgundy-light': '#7A2E42',
        wine: '#6E1F32',
        'wine-deep': '#42121F',
        merlot: '#5C1E2E',
        oxblood: '#4A1522',
        'wine-warm': '#8B3A4E',
        
        // 💎 CHAMPAGNE & GLAMOR (Story Section)
        'rose-gold': '#C48570',
        'rose-gold-light': '#D89A85',
        'blush': '#E8C4B0',
        'peach': '#F0C9A8',
        'apricot': '#E8B594',
        'nude': '#DDB89C',
        
        // 🌊 MIDDLE TONES (Text, UI)
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
        
        // 🎨 ACCENT SPARKS
        copper: '#B87333',
        bronze: '#8B6F47',
        brass: '#B5A642',
        amber: '#D4A574',
        honey: '#D4A574',
        caramel: '#C68E4E',
        cinnamon: '#A65A3E',
        
        // 🔵 UTILITY (rare use)
        success: '#4E6753',
        warning: '#C87952',
        error: '#8B2635',
        info: '#5A6E7A',
      },
      
      // TYPOGRAPHY
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
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
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
        'heading': 'clamp(1.5rem, 3vw, 3rem)',
        'title': 'clamp(1.75rem, 5vw, 5rem)',
        'display': 'clamp(2.5rem, 8vw, 8rem)',
        'hero': 'clamp(3rem, 12vw, 12rem)',
        'mega': 'clamp(4rem, 15vw, 15rem)',
      },
      
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'tight-2': '-0.03em',
        'wider-2': '0.15em',
        'mega': '0.3em',
        'ultra': '0.5em',
      },
      
      lineHeight: {
        'ultra-tight': '0.85',
        'display': '0.95',
      },
      
      // ANIMATIONS
      animation: {
        'fade-in': 'fadeIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-fast': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'reveal': 'reveal 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'rotate-slow': 'rotate 20s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'gradient-slow': 'gradient 15s ease infinite',
        'blob': 'blob 20s ease-in-out infinite',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 121, 82, 0.7)' },
          '50%': { boxShadow: '0 0 0 20px rgba(200, 121, 82, 0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      
      // GRADIENTS
      backgroundImage: {
        // Deep espresso gradients
        'gradient-noir': 'linear-gradient(180deg, #2A1F1A 0%, #3D2E24 100%)',
        'gradient-espresso': 'linear-gradient(135deg, #2A1F1A 0%, #4A3A2F 50%, #2A1F1A 100%)',
        
        // Terracotta gradients
        'gradient-terracotta': 'linear-gradient(135deg, #C87952 0%, #8B4A32 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #E8B594 0%, #C87952 50%, #8B4A32 100%)',
        'gradient-warm': 'linear-gradient(135deg, #DBA085 0%, #B36847 100%)',
        
        // Cream & ivory
        'gradient-cream': 'linear-gradient(180deg, #F5EBDD 0%, #F0E5D3 100%)',
        'gradient-vanilla': 'linear-gradient(180deg, #FBF5EA 0%, #F0E5D3 100%)',
        'gradient-bone': 'linear-gradient(180deg, #E8DDCB 0%, #DDD1C3 100%)',
        
        // Forest & sage
        'gradient-forest': 'linear-gradient(135deg, #3D5342 0%, #2A3B2E 100%)',
        'gradient-sage': 'linear-gradient(135deg, #8B9B87 0%, #6E7D6B 100%)',
        'gradient-eucalyptus': 'linear-gradient(180deg, #95A891 0%, #6E7D6B 100%)',
        
        // Wine & burgundy
        'gradient-wine': 'linear-gradient(135deg, #5C1E2E 0%, #42121F 100%)',
        'gradient-burgundy': 'linear-gradient(135deg, #7A2E42 0%, #5C1E2E 50%, #42121F 100%)',
        'gradient-oxblood': 'linear-gradient(180deg, #4A1522 0%, #2A0810 100%)',
        
        // Champagne & rose
        'gradient-champagne': 'linear-gradient(135deg, #E8B594 0%, #C9946F 100%)',
        'gradient-rose': 'linear-gradient(135deg, #E8C4B0 0%, #C48570 100%)',
        'gradient-nude': 'linear-gradient(180deg, #F0C9A8 0%, #DDB89C 100%)',
        
        // Multi-color luxury
        'gradient-luxury': 'linear-gradient(135deg, #2A1F1A 0%, #5C1E2E 25%, #C87952 50%, #E8B594 75%, #F5EBDD 100%)',
        'gradient-atelier': 'linear-gradient(135deg, #3D5342 0%, #C87952 100%)',
        'gradient-sunset-full': 'linear-gradient(180deg, #2A1F1A 0%, #5C1E2E 30%, #C87952 60%, #E8B594 100%)',
        
        // Shine effects
        'shine': 'linear-gradient(90deg, transparent 0%, rgba(200, 121, 82, 0.4) 50%, transparent 100%)',
        'shine-gold': 'linear-gradient(90deg, transparent 0%, rgba(212, 165, 116, 0.5) 50%, transparent 100%)',
        
        // Radial spots
        'radial-terracotta': 'radial-gradient(circle at center, rgba(200, 121, 82, 0.15) 0%, transparent 70%)',
        'radial-forest': 'radial-gradient(circle at center, rgba(61, 83, 66, 0.15) 0%, transparent 70%)',
        'radial-wine': 'radial-gradient(circle at center, rgba(92, 30, 46, 0.2) 0%, transparent 70%)',
        'radial-cream': 'radial-gradient(circle at center, rgba(245, 235, 221, 0.1) 0%, transparent 70%)',
        
        // Noise texture
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      
      // SHADOWS
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
        'gold-glow': '0 0 40px rgba(200, 121, 82, 0.4)',
        'gold-glow-sm': '0 0 20px rgba(200, 121, 82, 0.3)',
        'gold-glow-lg': '0 0 80px rgba(200, 121, 82, 0.5)',
        'terracotta-glow': '0 0 40px rgba(200, 121, 82, 0.4)',
        'wine-glow': '0 0 40px rgba(92, 30, 46, 0.5)',
        'forest-glow': '0 0 40px rgba(61, 83, 66, 0.4)',
        'sage-glow': '0 0 40px rgba(139, 155, 135, 0.3)',
        'champagne-glow': '0 0 40px rgba(232, 181, 148, 0.4)',
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
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      
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
      
      // ROUNDED CORNERS
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
      },
      
      aspectRatio: {
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '3 / 4',
        'product': '4 / 5',
        'landscape': '16 / 9',
        'cinema': '21 / 9',
      },
    },
  },
  plugins: [],
}