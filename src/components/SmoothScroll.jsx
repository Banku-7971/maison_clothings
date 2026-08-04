import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
// MAISON — SMOOTH SCROLL WRAPPER
// ═══════════════════════════════════════════════════════════════
// Wraps children with Lenis-style smooth scroll behavior.
// Creates the buttery smooth scrolling of Awwwards sites.
//
// Features:
// - Momentum-based interpolation
// - Configurable smoothness
// - Wheel event smoothing
// - Native touch on mobile (better UX)
// - Respects reduced motion preferences
// - RAF-optimized 60fps
// - Auto-disables on touch devices
// - Cleanup on unmount
// ═══════════════════════════════════════════════════════════════

const SmoothScroll = ({ 
  children,
  lerp = 0.08,              // Smoothing factor (0.05 = super smooth)
  enabled = true,           // Toggle on/off
  smoothTouch = false,      // Enable on touch (usually false)
}) => {
  
  const scrollState = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    lastTime: 0,
    isScrolling: false,
  })
  
  const rafId = useRef(null)
  
  useEffect(() => {
    // ─────────────────────────────────────────
    // EARLY EXITS
    // ─────────────────────────────────────────
    if (typeof window === 'undefined') return
    if (!enabled) return
    
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    // Skip on touch devices unless enabled
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice && !smoothTouch) return
    
    // ─────────────────────────────────────────
    // INITIALIZE
    // ─────────────────────────────────────────
    scrollState.current.current = window.scrollY
    scrollState.current.target = window.scrollY
    scrollState.current.lastTime = performance.now()
    
    // ─────────────────────────────────────────
    // ANIMATION LOOP
    // Interpolates current scroll towards target
    // ─────────────────────────────────────────
    const animate = () => {
      const state = scrollState.current
      const now = performance.now()
      const deltaTime = (now - state.lastTime) / 1000
      state.lastTime = now
      
      // Calculate distance to target
      const distance = state.target - state.current
      
      // Lerp towards target
      if (Math.abs(distance) > 0.1) {
        state.current += distance * lerp
        state.velocity = distance / deltaTime
        state.isScrolling = true
        
        // Apply scroll
        window.scrollTo(0, state.current)
      } else {
        // Snap to target when close enough
        state.current = state.target
        state.velocity = 0
        state.isScrolling = false
      }
      
      rafId.current = requestAnimationFrame(animate)
    }
    
    // ─────────────────────────────────────────
    // WHEEL HANDLER
    // Prevents default browser scroll, updates target
    // ─────────────────────────────────────────
    const handleWheel = (e) => {
      e.preventDefault()
      
      const state = scrollState.current
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      // Handle different delta modes
      let delta = e.deltaY
      if (e.deltaMode === 1) {
        // Line mode
        delta *= 16
      } else if (e.deltaMode === 2) {
        // Page mode
        delta *= window.innerHeight
      }
      
      // Update target scroll position
      state.target += delta
      
      // Clamp to document bounds
      state.target = Math.max(0, Math.min(state.target, maxScroll))
    }
    
    // ─────────────────────────────────────────
    // KEYBOARD HANDLER
    // Arrow keys, Page Up/Down, Space, Home, End
    // ─────────────────────────────────────────
    const handleKeydown = (e) => {
      // Skip if user is typing in an input
      const activeElement = document.activeElement
      const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
      )
      if (isTyping) return
      
      const state = scrollState.current
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const step = window.innerHeight * 0.8
      const smallStep = 100
      
      switch (e.key) {
        case 'ArrowDown':
          state.target = Math.min(state.target + smallStep, maxScroll)
          e.preventDefault()
          break
        case 'ArrowUp':
          state.target = Math.max(state.target - smallStep, 0)
          e.preventDefault()
          break
        case 'PageDown':
        case ' ':
          state.target = Math.min(state.target + step, maxScroll)
          e.preventDefault()
          break
        case 'PageUp':
          state.target = Math.max(state.target - step, 0)
          e.preventDefault()
          break
        case 'Home':
          state.target = 0
          e.preventDefault()
          break
        case 'End':
          state.target = maxScroll
          e.preventDefault()
          break
        default:
          break
      }
    }
    
    // ─────────────────────────────────────────
    // SYNC ON EXTERNAL SCROLL
    // (Anchor links, browser back, programmatic)
    // ─────────────────────────────────────────
    const handleScroll = () => {
      const state = scrollState.current
      
      // Only sync if not our animation causing it
      if (!state.isScrolling && Math.abs(window.scrollY - state.current) > 5) {
        state.current = window.scrollY
        state.target = window.scrollY
      }
    }
    
    // ─────────────────────────────────────────
    // RESIZE HANDLER
    // Recalculate bounds when window resizes
    // ─────────────────────────────────────────
    const handleResize = () => {
      const state = scrollState.current
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      state.target = Math.min(state.target, maxScroll)
      state.current = Math.min(state.current, maxScroll)
    }
    
    // ─────────────────────────────────────────
    // ATTACH LISTENERS
    // ─────────────────────────────────────────
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Start animation loop
    rafId.current = requestAnimationFrame(animate)
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [lerp, enabled, smoothTouch])
  
  return <>{children}</>
}

export default SmoothScroll


// ═══════════════════════════════════════════════════════════════
// USAGE (Already set up in App.jsx)
// ═══════════════════════════════════════════════════════════════
//
// Basic wrapping:
//   <SmoothScroll>
//     <YourContent />
//   </SmoothScroll>
//
// Slower/smoother (more luxurious):
//   <SmoothScroll lerp={0.05}>...</SmoothScroll>
//
// Snappier feel:
//   <SmoothScroll lerp={0.15}>...</SmoothScroll>
//
// Disable temporarily:
//   <SmoothScroll enabled={false}>...</SmoothScroll>
//
// Enable on touch (usually not recommended):
//   <SmoothScroll smoothTouch={true}>...</SmoothScroll>
//
// ═══════════════════════════════════════════════════════════════