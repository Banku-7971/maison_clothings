// ═══════════════════════════════════════════════════════════════
// MAISON — ANIMATION LIBRARY
// ═══════════════════════════════════════════════════════════════
// Central animation utilities for consistency across the app.
// Includes:
// - Framer Motion variants (fade, slide, scale, reveal)
// - GSAP timeline presets
// - Custom easing functions
// - Stagger configurations
// - Text animation helpers
// - Scroll trigger presets
// - Hover effect presets
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// EASING CURVES
// Custom cubic-bezier easings for luxury feel
// ═══════════════════════════════════════════════════════════════
export const easings = {
  luxury: [0.22, 1, 0.36, 1],
  smooth: [0.65, 0, 0.35, 1],
  sharp: [0.4, 0, 0.6, 1],
  elastic: [0.68, -0.55, 0.265, 1.55],
  expo: [0.87, 0, 0.13, 1],
  back: [0.34, 1.56, 0.64, 1],
  anticipate: [0.68, -0.6, 0.32, 1.6],
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
}


// ═══════════════════════════════════════════════════════════════
// DURATIONS
// Standard animation lengths
// ═══════════════════════════════════════════════════════════════
export const durations = {
  instant: 0.1,
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  slower: 1.5,
  slowest: 2.5,
  cinematic: 3.5,
}


// ═══════════════════════════════════════════════════════════════
// FADE VARIANTS
// ═══════════════════════════════════════════════════════════════
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}

export const fadeInSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.slower,
      ease: easings.luxury,
    },
  },
}

export const fadeOut = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.luxury,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// SLIDE VARIANTS
// ═══════════════════════════════════════════════════════════════
export const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}

export const slideUpBig = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    },
  },
}

export const slideDown = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}

export const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}

export const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// SCALE VARIANTS
// ═══════════════════════════════════════════════════════════════
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}

export const scaleInSubtle = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}

export const scaleInBig = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// REVEAL VARIANTS (Clip-path based)
// ═══════════════════════════════════════════════════════════════
export const revealLeft = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
}

export const revealRight = {
  hidden: { clipPath: 'inset(0 0 0 100%)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
}

export const revealUp = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
}

export const revealDown = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// STAGGER CONTAINERS
// For animating children in sequence
// ═══════════════════════════════════════════════════════════════
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// TEXT ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════
export const textReveal = {
  hidden: {
    y: '100%',
    transition: {
      duration: durations.slow,
      ease: easings.expo,
    },
  },
  visible: {
    y: '0%',
    transition: {
      duration: durations.slow,
      ease: easings.expo,
    },
  },
}

export const wordReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    },
  },
}

export const charReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// PAGE TRANSITION VARIANTS
// ═══════════════════════════════════════════════════════════════
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.fast,
      ease: easings.luxury,
    },
  },
}

export const pageTransitionBlur = {
  initial: {
    opacity: 0,
    filter: 'blur(20px)',
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(20px)',
    transition: {
      duration: durations.fast,
      ease: easings.luxury,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// MODAL / DRAWER VARIANTS
// ═══════════════════════════════════════════════════════════════
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.fast },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast },
  },
}

export const modalContent = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: durations.fast,
      ease: easings.luxury,
    },
  },
}

export const drawerRight = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: durations.fast,
      ease: easings.luxury,
    },
  },
}

export const drawerLeft = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: durations.fast,
      ease: easings.luxury,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: durations.fast,
    ease: easings.luxury,
  },
}

export const hoverLift = {
  y: -8,
  transition: {
    duration: durations.fast,
    ease: easings.luxury,
  },
}

export const hoverTilt = {
  rotate: 2,
  scale: 1.02,
  transition: {
    duration: durations.fast,
    ease: easings.elastic,
  },
}


// ═══════════════════════════════════════════════════════════════
// TAP EFFECTS
// ═══════════════════════════════════════════════════════════════
export const tapScale = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: easings.sharp,
  },
}


// ═══════════════════════════════════════════════════════════════
// FLOAT / BOUNCE INFINITE ANIMATIONS
// ═══════════════════════════════════════════════════════════════
export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    ease: 'easeInOut',
    repeat: Infinity,
  },
}

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    ease: 'easeInOut',
    repeat: Infinity,
  },
}

export const rotateAnimation = {
  rotate: 360,
  transition: {
    duration: 20,
    ease: 'linear',
    repeat: Infinity,
  },
}


// ═══════════════════════════════════════════════════════════════
// VIEWPORT SETTINGS
// Common intersection observer configs
// ═══════════════════════════════════════════════════════════════
export const viewportSettings = {
  once: true,
  amount: 0.3,
  margin: '-100px',
}

export const viewportSettingsEarly = {
  once: true,
  amount: 0.1,
}

export const viewportSettingsRepeat = {
  once: false,
  amount: 0.3,
}


// ═══════════════════════════════════════════════════════════════
// TEXT SPLIT UTILITIES
// Helpers for character/word animations
// ═══════════════════════════════════════════════════════════════
export const splitTextIntoChars = (text) => {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    index: i,
  }))
}

export const splitTextIntoWords = (text) => {
  return text.split(' ').map((word, i) => ({
    word,
    index: i,
  }))
}


// ═══════════════════════════════════════════════════════════════
// CUSTOM STAGGER GENERATOR
// ═══════════════════════════════════════════════════════════════
export const createStaggerContainer = (staggerDelay = 0.1, initialDelay = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
})


// ═══════════════════════════════════════════════════════════════
// CUSTOM SLIDE GENERATOR
// ═══════════════════════════════════════════════════════════════
export const createSlideVariant = (direction = 'up', distance = 60, duration = durations.normal) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }
  
  return {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: easings.luxury,
      },
    },
  }
}


// ═══════════════════════════════════════════════════════════════
// GSAP HELPERS (For when we use GSAP directly)
// ═══════════════════════════════════════════════════════════════
export const gsapDefaults = {
  ease: 'power3.out',
  duration: 1,
}

export const scrollTriggerDefaults = {
  start: 'top 80%',
  toggleActions: 'play none none reverse',
}


// ═══════════════════════════════════════════════════════════════
// LOADING SCREEN VARIANTS
// ═══════════════════════════════════════════════════════════════
export const loadingScreenExit = {
  y: '-100%',
  transition: {
    duration: durations.slow,
    ease: easings.expo,
    delay: 0.3,
  },
}


// ═══════════════════════════════════════════════════════════════
// PRODUCT CARD VARIANTS
// ═══════════════════════════════════════════════════════════════
export const productCardVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.normal,
      ease: easings.luxury,
    },
  },
}

export const productImageVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    },
  },
  hover: {
    scale: 1.08,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    },
  },
}


// ═══════════════════════════════════════════════════════════════
// DEFAULT EXPORT — ALL VARIANTS
// ═══════════════════════════════════════════════════════════════
export default {
  // Easings
  easings,
  durations,
  
  // Fades
  fadeIn,
  fadeInSlow,
  fadeOut,
  
  // Slides
  slideUp,
  slideUpBig,
  slideDown,
  slideLeft,
  slideRight,
  
  // Scales
  scaleIn,
  scaleInSubtle,
  scaleInBig,
  
  // Reveals
  revealLeft,
  revealRight,
  revealUp,
  revealDown,
  
  // Staggers
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  
  // Text
  textReveal,
  wordReveal,
  charReveal,
  
  // Pages
  pageTransition,
  pageTransitionBlur,
  
  // Modals & Drawers
  modalBackdrop,
  modalContent,
  drawerRight,
  drawerLeft,
  
  // Interactions
  hoverScale,
  hoverLift,
  hoverTilt,
  tapScale,
  
  // Infinite
  floatAnimation,
  pulseAnimation,
  rotateAnimation,
  
  // Viewport
  viewportSettings,
  viewportSettingsEarly,
  viewportSettingsRepeat,
  
  // Utilities
  splitTextIntoChars,
  splitTextIntoWords,
  createStaggerContainer,
  createSlideVariant,
  
  // GSAP
  gsapDefaults,
  scrollTriggerDefaults,
  
  // Loading
  loadingScreenExit,
  
  // Products
  productCardVariants,
  productImageVariants,
}