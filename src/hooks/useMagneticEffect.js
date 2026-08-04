import { useRef, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════
// MAISON — MAGNETIC EFFECT HOOK
// ═══════════════════════════════════════════════════════════════
// Elements gently attracted to the cursor.
// Creates that premium "alive" feeling on buttons and links.
// Used by luxury brands like Apple, Nike, Balenciaga.
//
// Usage:
//   const ref = useMagneticEffect({ strength: 0.4, radius: 100 })
//   return <button ref={ref}>Hover Me</button>
// ═══════════════════════════════════════════════════════════════

const useMagneticEffect = (options = {}) => {
  const {
    strength = 0.4,        // How strongly element follows cursor (0-1)
    radius = 100,          // Detection radius in pixels
    duration = 0.6,        // Transition duration in seconds
    ease = 'cubic-bezier(0.22, 1, 0.36, 1)', // Luxury easing
    scale = 1,             // Scale on hover (1 = no scale, 1.05 = grow)
    disabled = false,      // Disable on demand
  } = options
  
  const ref = useRef(null)
  const animationFrame = useRef(null)
  
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return
    
    // Skip on touch devices (magnetic doesn't work with touch)
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return
    
    // Skip if disabled
    if (disabled) return
    
    const element = ref.current
    if (!element) return
    
    // Store initial transition
    const originalTransition = element.style.transition
    element.style.transition = `transform ${duration}s ${ease}`
    element.style.willChange = 'transform'
    
    // ─────────────────────────────────────────
    // MOUSE MOVE HANDLER
    // Calculate cursor distance from element center
    // Apply proportional transform
    // ─────────────────────────────────────────
    const handleMouseMove = (e) => {
      // Cancel previous frame for smooth performance
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      
      animationFrame.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        
        // Element center coordinates
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        // Distance from cursor to element center
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        
        // Distance magnitude
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        // Only apply effect if within radius
        if (distance < radius) {
          // Calculate movement (stronger when closer)
          const moveX = deltaX * strength
          const moveY = deltaY * strength
          
          // Apply transform
          element.style.transform = 
            `translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`
        }
      })
    }
    
    // ─────────────────────────────────────────
    // MOUSE LEAVE HANDLER
    // Reset element to original position
    // ─────────────────────────────────────────
    const handleMouseLeave = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      element.style.transform = 'translate3d(0px, 0px, 0) scale(1)'
    }
    
    // ─────────────────────────────────────────
    // ATTACH LISTENERS
    // Use document for magnetic detection (proximity based)
    // Use element for exit reset
    // ─────────────────────────────────────────
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    element.addEventListener('mouseleave', handleMouseLeave)
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave)
        element.style.transition = originalTransition
        element.style.transform = ''
        element.style.willChange = ''
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [strength, radius, duration, ease, scale, disabled])
  
  return ref
}

export default useMagneticEffect


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Basic usage:
//    const ref = useMagneticEffect()
//    <button ref={ref}>Click Me</button>
//
// 2. Strong magnetic pull:
//    const ref = useMagneticEffect({ strength: 0.6, radius: 150 })
//    <a ref={ref}>Explore</a>
//
// 3. Subtle effect:
//    const ref = useMagneticEffect({ strength: 0.2, radius: 60 })
//
// 4. With scale on hover:
//    const ref = useMagneticEffect({ strength: 0.3, scale: 1.05 })
//
// 5. Conditional (disable on mobile):
//    const isMobile = window.innerWidth < 768
//    const ref = useMagneticEffect({ disabled: isMobile })
//
// ═══════════════════════════════════════════════════════════════