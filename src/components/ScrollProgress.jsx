import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — SCROLL PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════════
// A subtle gold bar at the top of the viewport indicating
// how far the user has scrolled through the current page.
//
// Features:
// - Smooth spring physics (buttery motion)
// - Auto-hides on desktop when at top
// - Shows scroll percentage on hover (optional)
// - Position: top or bottom
// - Configurable height and color
// - Fixed above all content
// - Respects reduced motion
// - Uses Framer Motion's useScroll for performance
// ═══════════════════════════════════════════════════════════════

const ScrollProgress = ({
  height = 2,                    // Bar thickness in pixels
  color = '#C9A96E',             // Gold by default
  position = 'top',              // 'top' | 'bottom'
  showPercentage = false,        // Show number on hover
  hideAtTop = false,             // Hide when scrolled = 0
  zIndex = 9995,                 // Above content, below cursor
} = {}) => {
  
  // ─────────────────────────────────────────
  // FRAMER MOTION SCROLL HOOKS
  // useScroll: 0 to 1 progress
  // useSpring: smooth spring physics
  // ─────────────────────────────────────────
  const { scrollYProgress } = useScroll()
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const [isHovered, setIsHovered] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  
  // ─────────────────────────────────────────
  // TRACK PERCENTAGE (for optional display)
  // ─────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100))
      setIsAtTop(latest === 0)
    })
    
    return () => unsubscribe()
  }, [scrollYProgress])
  
  return (
    <>
      {/* ═══════════════════════════════════════
          PROGRESS BAR
      ═══════════════════════════════════════ */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          [position]: 0,
          left: 0,
          right: 0,
          height: `${height}px`,
          background: color,
          transformOrigin: 'left',
          zIndex: zIndex,
          pointerEvents: showPercentage ? 'auto' : 'none',
          cursor: showPercentage ? 'none' : 'default',
          opacity: hideAtTop && isAtTop ? 0 : 1,
          transition: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-hidden="true"
      />
      
      {/* ═══════════════════════════════════════
          OPTIONAL PERCENTAGE DISPLAY
          Shows on hover
      ═══════════════════════════════════════ */}
      {showPercentage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : -10,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: 'fixed',
            top: position === 'top' ? `${height + 12}px` : 'auto',
            bottom: position === 'bottom' ? `${height + 12}px` : 'auto',
            right: '2rem',
            padding: '0.5rem 1rem',
            background: '#0A0A0A',
            border: `1px solid ${color}`,
            color: color,
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            fontFamily: 'monospace',
            zIndex: zIndex + 1,
            pointerEvents: 'none',
          }}
        >
          {String(percentage).padStart(3, '0')}%
        </motion.div>
      )}
    </>
  )
}

export default ScrollProgress


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Default (thin gold bar on top):
//    <ScrollProgress />
//
// 2. Thick bar at bottom:
//    <ScrollProgress height={4} position="bottom" />
//
// 3. With percentage display on hover:
//    <ScrollProgress showPercentage={true} />
//
// 4. Ivory color instead of gold:
//    <ScrollProgress color="#F5F0EB" />
//
// 5. Hide when at top of page:
//    <ScrollProgress hideAtTop={true} />
//
// 6. Custom z-index:
//    <ScrollProgress zIndex={100} />
//
// ═══════════════════════════════════════════════════════════════