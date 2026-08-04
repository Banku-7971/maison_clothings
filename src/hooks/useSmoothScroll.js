import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
// MAISON — SMOOTH SCROLL HOOK
// ═══════════════════════════════════════════════════════════════
// Lenis-inspired smooth scrolling for buttery-smooth navigation.
// Creates the premium scroll experience of Awwwards sites.
// 
// Features:
// - Momentum-based smoothing
// - Configurable lerp (linear interpolation)
// - Wheel + touch support
// - Programmatic scroll to element/position
// - Respects reduced motion preferences
// - Automatic disable on touch devices (native is better)
// - Direction detection
// - Velocity tracking
// ═══════════════════════════════════════════════════════════════

const useSmoothScroll = (options = {}) => {
  const {
    lerp = 0.1,              // Smoothing factor (0.05 = super smooth, 0.5 = quick)
    duration = 1.2,          // Duration for programmatic scrolls
    smoothWheel = true,      // Enable smooth wheel scrolling
    smoothTouch = false,     // Native touch is usually better
    disabled = false,        // Disable entirely
  } = options
  
  const scrollState = useRef({
    current: 0,       // Current scroll position (smoothed)
    target: 0,        // Target scroll position (immediate)
    velocity: 0,      // Current scroll velocity
    direction: 0,     // 1 = down, -1 = up, 0 = idle
    isScrolling: false,
    lastTime: 0,
    lastY: 0,
  })
  
  const rafId = useRef(null)
  
  useEffect(() => {
    // ─────────────────────────────────────────
    // EARLY EXITS
    // ─────────────────────────────────────────
    if (typeof window === 'undefined') return
    if (disabled) return
    
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    // Skip on touch devices unless explicitly enabled
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice && !smoothTouch) return
    
    // ─────────────────────────────────────────
    // INITIALIZE
    // ─────────────────────────────────────────
    scrollState.current.current = window.scrollY
    scrollState.current.target = window.scrollY
    scrollState.current.lastY = window.scrollY
    scrollState.current.lastTime = performance.now()
    
    // ─────────────────────────────────────────
    // ANIMATION LOOP
    // Interpolates current towards target every frame
    // ─────────────────────────────────────────
    const animate = () => {
      const state = scrollState.current
      const now = performance.now()
      const deltaTime = (now - state.lastTime) / 1000
      state.lastTime = now
      
      // Linear interpolation towards target
      const distance = state.target - state.current
      state.current += distance * lerp
      
      // Calculate velocity
      state.velocity = (state.current - state.lastY) / deltaTime
      state.lastY = state.current
      
      // Update direction
      if (Math.abs(distance) > 0.5) {
        state.direction = distance > 0 ? 1 : -1
        state.isScrolling = true
      } else {
        state.direction = 0
        state.isScrolling = false
      }
      
      // Apply scroll (only if changed significantly)
      if (Math.abs(distance) > 0.1) {
        window.scrollTo(0, state.current)
      } else {
        state.current = state.target
        window.scrollTo(0, state.current)
      }
      
      rafId.current = requestAnimationFrame(animate)
    }
    
    // ─────────────────────────────────────────
    // WHEEL HANDLER
    // Prevents default and updates target smoothly
    // ─────────────────────────────────────────
    const handleWheel = (e) => {
      if (!smoothWheel) return
      
      e.preventDefault()
      
      const state = scrollState.current
      const delta = e.deltaY
      
      // Update target
      state.target += delta
      
      // Clamp to document bounds
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      state.target = Math.max(0, Math.min(state.target, maxScroll))
    }
    
    // ─────────────────────────────────────────
    // SYNC ON EXTERNAL SCROLL
    // (Anchor links, browser back, etc.)
    // ─────────────────────────────────────────
    const handleScroll = () => {
      const state = scrollState.current
      // If scroll is not from our animation, sync
      if (!state.isScrolling && Math.abs(window.scrollY - state.current) > 5) {
        state.current = window.scrollY
        state.target = window.scrollY
      }
    }
    
    // ─────────────────────────────────────────
    // KEYBOARD HANDLERS
    // Arrow keys, Page Up/Down, Space, Home, End
    // ─────────────────────────────────────────
    const handleKeydown = (e) => {
      const state = scrollState.current
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const step = window.innerHeight * 0.8
      
      switch (e.key) {
        case 'ArrowDown':
          state.target = Math.min(state.target + 100, maxScroll)
          e.preventDefault()
          break
        case 'ArrowUp':
          state.target = Math.max(state.target - 100, 0)
          e.preventDefault()
          break
        case 'PageDown':
        case ' ':
          if (e.target === document.body) {
            state.target = Math.min(state.target + step, maxScroll)
            e.preventDefault()
          }
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
      }
    }
    
    // ─────────────────────────────────────────
    // RESIZE HANDLER
    // Recalculate max scroll on resize
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Start animation loop
    rafId.current = requestAnimationFrame(animate)
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('resize', handleResize)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [lerp, duration, smoothWheel, smoothTouch, disabled])
  
  // ═══════════════════════════════════════════
  // PROGRAMMATIC CONTROLS
  // ═══════════════════════════════════════════
  
  /**
   * Scroll to specific position
   */
  const scrollTo = (target, options = {}) => {
    const { immediate = false, offset = 0 } = options
    const state = scrollState.current
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    
    let targetY = 0
    
    // Handle different target types
    if (typeof target === 'number') {
      targetY = target
    } else if (typeof target === 'string') {
      // CSS selector
      const element = document.querySelector(target)
      if (element) {
        targetY = element.getBoundingClientRect().top + window.scrollY
      }
    } else if (target instanceof HTMLElement) {
      // DOM element
      targetY = target.getBoundingClientRect().top + window.scrollY
    }
    
    // Apply offset
    targetY += offset
    
    // Clamp
    targetY = Math.max(0, Math.min(targetY, maxScroll))
    
    if (immediate) {
      state.current = targetY
      state.target = targetY
      window.scrollTo(0, targetY)
    } else {
      state.target = targetY
    }
  }
  
  /**
   * Scroll to top
   */
  const scrollToTop = (immediate = false) => {
    scrollTo(0, { immediate })
  }
  
  /**
   * Scroll to bottom
   */
  const scrollToBottom = (immediate = false) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    scrollTo(maxScroll, { immediate })
  }
  
  /**
   * Get current scroll state
   */
  const getState = () => ({ ...scrollState.current })
  
  return {
    scrollTo,
    scrollToTop,
    scrollToBottom,
    getState,
  }
}

export default useSmoothScroll


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Basic setup in App.jsx:
//    const { scrollTo } = useSmoothScroll()
//
// 2. Slower/smoother (more premium):
//    useSmoothScroll({ lerp: 0.06 })
//
// 3. Faster/snappier:
//    useSmoothScroll({ lerp: 0.15 })
//
// 4. Scroll to element:
//    scrollTo('#footer')
//    scrollTo('#footer', { offset: -80 })
//
// 5. Scroll to top:
//    scrollToTop()
//
// 6. Instant scroll (no animation):
//    scrollTo(0, { immediate: true })
//
// ═══════════════════════════════════════════════════════════════