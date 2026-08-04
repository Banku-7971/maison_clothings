import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — PAGE TRANSITION WRAPPER
// ═══════════════════════════════════════════════════════════════
// Wraps each page for buttery smooth transitions between routes.
// Uses Framer Motion's AnimatePresence (set up in App.jsx).
//
// Features:
// - Fade + subtle slide animation
// - Blur effect during transition
// - Configurable transition type
// - Multiple variants: fade, slide, blur, scale, curtain
// - Luxury cubic-bezier easing
// - No layout shift during transitions
// ═══════════════════════════════════════════════════════════════

const PageTransition = ({ 
  children,
  variant = 'fade',            // 'fade' | 'slide' | 'blur' | 'scale' | 'curtain'
  duration = 0.6,              // Duration in seconds
  delay = 0,                   // Delay before starting
}) => {
  
  // ─────────────────────────────────────────
  // ANIMATION VARIANTS
  // Each variant creates a different transition style
  // ─────────────────────────────────────────
  
  const variants = {
    // ─────────────────────────────────
    // FADE — Simple opacity + subtle Y
    // ─────────────────────────────────
    fade: {
      initial: {
        opacity: 0,
        y: 20,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.22, 1, 0.36, 1], // Luxury easing
        },
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: duration * 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    
    // ─────────────────────────────────
    // SLIDE — Horizontal reveal
    // ─────────────────────────────────
    slide: {
      initial: {
        opacity: 0,
        x: 100,
      },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      exit: {
        opacity: 0,
        x: -100,
        transition: {
          duration: duration * 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    
    // ─────────────────────────────────
    // BLUR — Cinematic focus effect
    // ─────────────────────────────────
    blur: {
      initial: {
        opacity: 0,
        filter: 'blur(20px)',
      },
      animate: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: duration * 1.2,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      exit: {
        opacity: 0,
        filter: 'blur(20px)',
        transition: {
          duration: duration * 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    
    // ─────────────────────────────────
    // SCALE — Zoom in reveal
    // ─────────────────────────────────
    scale: {
      initial: {
        opacity: 0,
        scale: 0.95,
      },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      exit: {
        opacity: 0,
        scale: 1.05,
        transition: {
          duration: duration * 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    
    // ─────────────────────────────────
    // CURTAIN — Dramatic reveal from top
    // ─────────────────────────────────
    curtain: {
      initial: {
        opacity: 0,
        y: 100,
        clipPath: 'inset(100% 0 0 0)',
      },
      animate: {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        transition: {
          duration: duration * 1.5,
          delay: delay,
          ease: [0.87, 0, 0.13, 1], // Expo easing
        },
      },
      exit: {
        opacity: 0,
        y: -100,
        clipPath: 'inset(0 0 100% 0)',
        transition: {
          duration: duration * 0.6,
          ease: [0.87, 0, 0.13, 1],
        },
      },
    },
  }
  
  // ─────────────────────────────────────────
  // GET SELECTED VARIANT
  // ─────────────────────────────────────────
  const selectedVariant = variants[variant] || variants.fade
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedVariant}
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition


// ═══════════════════════════════════════════════════════════════
// USAGE (Already set up in App.jsx)
// ═══════════════════════════════════════════════════════════════
//
// Basic (default fade):
//   <PageTransition>
//     <Home />
//   </PageTransition>
//
// With blur (very cinematic):
//   <PageTransition variant="blur">
//     <ProductDetail />
//   </PageTransition>
//
// Slide horizontal:
//   <PageTransition variant="slide">
//     <Shop />
//   </PageTransition>
//
// Custom duration:
//   <PageTransition duration={1.2}>
//     <About />
//   </PageTransition>
//
// Dramatic curtain reveal:
//   <PageTransition variant="curtain">
//     <Contact />
//   </PageTransition>
//
// ═══════════════════════════════════════════════════════════════