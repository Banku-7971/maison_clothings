import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
// MAISON — MOUSE POSITION HOOK
// ═══════════════════════════════════════════════════════════════
// Real-time cursor tracking for premium effects:
// - Custom cursor
// - Parallax elements
// - Spotlight effects
// - 3D perspective transforms
// - Distortion effects
//
// Features:
// - X, Y coordinates
// - Normalized position (-1 to 1)
// - Velocity tracking
// - Idle detection
// - Smoothed/lerped values
// - Element-relative position
// - RAF-optimized for 60fps
// ═══════════════════════════════════════════════════════════════

const useMousePosition = (options = {}) => {
  const {
    smooth = false,          // Enable smoothing/lerping
    lerp = 0.1,              // Smoothing factor
    element = null,          // Track relative to specific element (null = window)
    normalized = false,      // Return values as -1 to 1
    trackVelocity = false,   // Calculate velocity
    idleTimeout = 2000,      // Ms before considered idle
  } = options
  
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocityX: 0,
    velocityY: 0,
    velocity: 0,
    isIdle: true,
    hasMoved: false,
  })
  
  // ─────────────────────────────────────────
  // REFS (for RAF loop)
  // ─────────────────────────────────────────
  const positionRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
    lastTime: performance.now(),
  })
  
  const rafId = useRef(null)
  const idleTimer = useRef(null)
  const hasInteractedRef = useRef(false)
  
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return
    
    // ─────────────────────────────────────────
    // GET TRACKED ELEMENT
    // ─────────────────────────────────────────
    const trackedElement = element?.current || window
    const isWindow = trackedElement === window
    
    // ─────────────────────────────────────────
    // NORMALIZE COORDINATES
    // Convert screen coords to -1 to 1 range
    // ─────────────────────────────────────────
    const normalizeCoords = (x, y) => {
      let width, height, offsetX = 0, offsetY = 0
      
      if (isWindow) {
        width = window.innerWidth
        height = window.innerHeight
      } else {
        const rect = trackedElement.getBoundingClientRect()
        width = rect.width
        height = rect.height
        offsetX = rect.left
        offsetY = rect.top
      }
      
      return {
        normalizedX: ((x - offsetX) / width) * 2 - 1,
        normalizedY: ((y - offsetY) / height) * 2 - 1,
      }
    }
    
    // ─────────────────────────────────────────
    // MOUSE MOVE HANDLER
    // ─────────────────────────────────────────
    const handleMouseMove = (e) => {
      hasInteractedRef.current = true
      
      let x, y
      
      if (isWindow) {
        x = e.clientX
        y = e.clientY
      } else {
        const rect = trackedElement.getBoundingClientRect()
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }
      
      // Update target position
      positionRef.current.targetX = x
      positionRef.current.targetY = y
      
      // If not using smoothing, update immediately
      if (!smooth) {
        positionRef.current.x = x
        positionRef.current.y = y
        updateState()
      }
      
      // Reset idle timer
      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        setMousePosition(prev => ({ ...prev, isIdle: true }))
      }, idleTimeout)
    }
    
    // ─────────────────────────────────────────
    // TOUCH MOVE HANDLER (Mobile support)
    // ─────────────────────────────────────────
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0]
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        })
      }
    }
    
    // ─────────────────────────────────────────
    // UPDATE STATE
    // ─────────────────────────────────────────
    const updateState = () => {
      const pos = positionRef.current
      const now = performance.now()
      const deltaTime = (now - pos.lastTime) / 1000
      pos.lastTime = now
      
      // Calculate velocity if enabled
      if (trackVelocity && deltaTime > 0) {
        pos.velocityX = (pos.x - pos.lastX) / deltaTime
        pos.velocityY = (pos.y - pos.lastY) / deltaTime
      }
      
      pos.lastX = pos.x
      pos.lastY = pos.y
      
      const velocity = trackVelocity 
        ? Math.sqrt(pos.velocityX ** 2 + pos.velocityY ** 2)
        : 0
      
      const normalized = normalizeCoords(pos.x, pos.y)
      
      setMousePosition({
        x: pos.x,
        y: pos.y,
        normalizedX: normalized.normalizedX,
        normalizedY: normalized.normalizedY,
        velocityX: pos.velocityX,
        velocityY: pos.velocityY,
        velocity,
        isIdle: false,
        hasMoved: hasInteractedRef.current,
      })
    }
    
    // ─────────────────────────────────────────
    // ANIMATION LOOP (For smoothing)
    // ─────────────────────────────────────────
    const animate = () => {
      if (smooth) {
        const pos = positionRef.current
        
        // Lerp towards target
        pos.x += (pos.targetX - pos.x) * lerp
        pos.y += (pos.targetY - pos.y) * lerp
        
        // Update state if moved significantly
        const dx = Math.abs(pos.targetX - pos.x)
        const dy = Math.abs(pos.targetY - pos.y)
        
        if (dx > 0.1 || dy > 0.1) {
          updateState()
        }
      }
      
      rafId.current = requestAnimationFrame(animate)
    }
    
    // ─────────────────────────────────────────
    // MOUSE LEAVE HANDLER
    // ─────────────────────────────────────────
    const handleMouseLeave = () => {
      setMousePosition(prev => ({ ...prev, isIdle: true }))
    }
    
    // ─────────────────────────────────────────
    // ATTACH LISTENERS
    // ─────────────────────────────────────────
    trackedElement.addEventListener('mousemove', handleMouseMove, { passive: true })
    trackedElement.addEventListener('touchmove', handleTouchMove, { passive: true })
    
    if (isWindow) {
      document.addEventListener('mouseleave', handleMouseLeave)
    } else {
      trackedElement.addEventListener('mouseleave', handleMouseLeave)
    }
    
    // Start animation loop if smoothing
    if (smooth) {
      rafId.current = requestAnimationFrame(animate)
    }
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      trackedElement.removeEventListener('mousemove', handleMouseMove)
      trackedElement.removeEventListener('touchmove', handleTouchMove)
      
      if (isWindow) {
        document.removeEventListener('mouseleave', handleMouseLeave)
      } else {
        trackedElement.removeEventListener('mouseleave', handleMouseLeave)
      }
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      
      clearTimeout(idleTimer.current)
    }
  }, [smooth, lerp, element, normalized, trackVelocity, idleTimeout])
  
  return mousePosition
}

export default useMousePosition


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Basic tracking:
//    const { x, y } = useMousePosition()
//    <div style={{ left: x, top: y }} />
//
// 2. Smoothed (perfect for custom cursor):
//    const { x, y } = useMousePosition({ smooth: true, lerp: 0.15 })
//
// 3. Normalized for parallax:
//    const { normalizedX, normalizedY } = useMousePosition({ normalized: true })
//    // Values from -1 to 1
//    <div style={{ transform: `translateX(${normalizedX * 50}px)` }} />
//
// 4. Track relative to element:
//    const containerRef = useRef(null)
//    const { x, y } = useMousePosition({ element: containerRef })
//    <div ref={containerRef}>...</div>
//
// 5. With velocity for effects:
//    const { velocity } = useMousePosition({ trackVelocity: true })
//    // Increase blur when moving fast
//    <div style={{ filter: `blur(${velocity * 0.01}px)` }} />
//
// 6. Idle detection:
//    const { isIdle } = useMousePosition({ idleTimeout: 3000 })
//    // Hide UI when user is idle
//
// ═══════════════════════════════════════════════════════════════