import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════
// A premium cursor experience with multiple states.
// Replaces default cursor with luxury dot + outline circle.
//
// States:
// - default:  Small dot + gold outline circle
// - hover:    Larger outline over interactive elements
// - text:     Blends with text (mix-blend-mode)
// - view:     "VIEW" label for product cards
// - drag:     "DRAG" label for 3D models
// - hidden:   Off-screen or on touch devices
//
// Detection via data attributes:
//   data-cursor="hover"  → Enlarged outline
//   data-cursor="text"   → Text mode
//   data-cursor="view"   → View label
//   data-cursor="drag"   → Drag label
// ═══════════════════════════════════════════════════════════════

const CustomCursor = () => {
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  // ─────────────────────────────────────────
  // REFS
  // ─────────────────────────────────────────
  const outlineRef = useRef(null)
  const dotRef = useRef(null)
  const outlinePosition = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)
  
  // ═══════════════════════════════════════════
  // INITIAL SETUP
  // ═══════════════════════════════════════════
  useEffect(() => {
    // Detect touch device
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    setIsTouch(isTouchDevice)
    
    if (isTouchDevice) return
    
    // ─────────────────────────────────────────
    // MOUSE MOVE HANDLER
    // ─────────────────────────────────────────
    const handleMouseMove = (e) => {
      setIsVisible(true)
      
      // Update dot position immediately (fast follow)
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Update target for outline (smoothed follow)
      targetPosition.current = { x: e.clientX, y: e.clientY }
    }
    
    // ─────────────────────────────────────────
    // MOUSE ENTER/LEAVE WINDOW
    // ─────────────────────────────────────────
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    
    // ─────────────────────────────────────────
    // CLICK ANIMATION
    // ─────────────────────────────────────────
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    
    // ─────────────────────────────────────────
    // DETECT HOVER TARGETS
    // Uses data-cursor attribute or element type
    // ─────────────────────────────────────────
    const handleElementHover = (e) => {
      const target = e.target
      
      // Check for data-cursor attribute (custom)
      const cursorAttr = target.closest('[data-cursor]')
      if (cursorAttr) {
        setCursorType(cursorAttr.getAttribute('data-cursor'))
        return
      }
      
      // Check for interactive elements
      const isLink = target.closest('a')
      const isButton = target.closest('button')
      const isInteractive = target.closest('[role="button"]')
      const isInput = target.matches('input, textarea, select')
      
      if (isInput) {
        setCursorType('text')
      } else if (isLink || isButton || isInteractive) {
        setCursorType('hover')
      } else {
        setCursorType('default')
      }
    }
    
    // ─────────────────────────────────────────
    // ANIMATION LOOP FOR OUTLINE (Lerp/Smooth)
    // ─────────────────────────────────────────
    const animateOutline = () => {
      const lerp = 0.15
      
      outlinePosition.current.x += 
        (targetPosition.current.x - outlinePosition.current.x) * lerp
      outlinePosition.current.y += 
        (targetPosition.current.y - outlinePosition.current.y) * lerp
      
      if (outlineRef.current) {
        outlineRef.current.style.transform = 
          `translate3d(${outlinePosition.current.x}px, ${outlinePosition.current.y}px, 0) translate(-50%, -50%)`
      }
      
      rafId.current = requestAnimationFrame(animateOutline)
    }
    
    // ─────────────────────────────────────────
    // ATTACH LISTENERS
    // ─────────────────────────────────────────
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleElementHover)
    
    // Start animation loop
    rafId.current = requestAnimationFrame(animateOutline)
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleElementHover)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])
  
  // Don't render on touch devices
  if (isTouch) return null
  
  // ─────────────────────────────────────────
  // OUTLINE SIZE BY CURSOR TYPE
  // ─────────────────────────────────────────
  const getOutlineStyles = () => {
    const baseStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 9998,
      borderRadius: '50%',
      transition: 
        'width 0.4s cubic-bezier(0.22, 1, 0.36, 1), ' +
        'height 0.4s cubic-bezier(0.22, 1, 0.36, 1), ' +
        'background 0.3s cubic-bezier(0.22, 1, 0.36, 1), ' +
        'border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1), ' +
        'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    }
    
    switch (cursorType) {
      case 'hover':
        return {
          ...baseStyle,
          width: '80px',
          height: '80px',
          background: 'rgba(201, 169, 110, 0.1)',
          border: '1px solid #C9A96E',
        }
      case 'text':
        return {
          ...baseStyle,
          width: '120px',
          height: '120px',
          background: '#C9A96E',
          border: 'none',
          mixBlendMode: 'difference',
        }
      case 'view':
        return {
          ...baseStyle,
          width: '100px',
          height: '100px',
          background: '#C9A96E',
          border: 'none',
        }
      case 'drag':
        return {
          ...baseStyle,
          width: '80px',
          height: '80px',
          background: 'transparent',
          border: '1px dashed #C9A96E',
        }
      default:
        return {
          ...baseStyle,
          width: '40px',
          height: '40px',
          background: 'transparent',
          border: '1px solid #C9A96E',
        }
    }
  }
  
  // ─────────────────────────────────────────
  // DOT SIZE BY CURSOR TYPE
  // ─────────────────────────────────────────
  const getDotStyles = () => {
    const baseStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      borderRadius: '50%',
      transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
      transition: 
        'width 0.3s cubic-bezier(0.22, 1, 0.36, 1), ' +
        'height 0.3s cubic-bezier(0.22, 1, 0.36, 1), ' +
        'background 0.3s cubic-bezier(0.22, 1, 0.36, 1), ' +
        'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      mixBlendMode: 'difference',
    }
    
    switch (cursorType) {
      case 'hover':
        return {
          ...baseStyle,
          width: '4px',
          height: '4px',
          background: '#C9A96E',
        }
      case 'text':
      case 'view':
      case 'drag':
        return {
          ...baseStyle,
          opacity: 0,
        }
      default:
        return {
          ...baseStyle,
          width: '6px',
          height: '6px',
          background: '#F5F0EB',
        }
    }
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* ═══════════════════════════════════════
              OUTLINE CIRCLE (Smoothed/Lerped)
          ═══════════════════════════════════════ */}
          <motion.div
            ref={outlineRef}
            style={getOutlineStyles()}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isClicking ? 0.9 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* View Label */}
            {cursorType === 'view' && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  color: '#0A0A0A',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  fontFamily: 'monospace',
                  fontWeight: 500,
                }}
              >
                VIEW
              </div>
            )}
            
            {/* Drag Label */}
            {cursorType === 'drag' && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  color: '#C9A96E',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  fontFamily: 'monospace',
                  fontWeight: 500,
                }}
              >
                DRAG
              </div>
            )}
          </motion.div>
          
          {/* ═══════════════════════════════════════
              CENTER DOT (Fast follow)
          ═══════════════════════════════════════ */}
          <div
            ref={dotRef}
            style={getDotStyles()}
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default CustomCursor