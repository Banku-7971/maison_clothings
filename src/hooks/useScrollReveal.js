import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
// MAISON — SCROLL REVEAL HOOK
// ═══════════════════════════════════════════════════════════════
// Elegant scroll-triggered animations using IntersectionObserver.
// Elements reveal beautifully as they enter the viewport.
//
// Features:
// - IntersectionObserver-based (performant)
// - Configurable threshold and root margin
// - Trigger once or repeatedly
// - Delay support
// - Batch reveal for staggered effects
// - Direction detection (scrolling up/down)
// - Visibility percentage
// - Respects reduced motion
// ═══════════════════════════════════════════════════════════════

const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.15,           // How much element must be visible (0-1)
    rootMargin = '0px',         // Margin around root (like CSS)
    triggerOnce = true,         // Only animate once
    delay = 0,                  // Delay before revealing (ms)
    disabled = false,           // Disable observation
    onReveal = null,            // Callback when revealed
    onHide = null,              // Callback when hidden (if !triggerOnce)
  } = options
  
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const [visibilityRatio, setVisibilityRatio] = useState(0)
  
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return
    
    // Skip if disabled
    if (disabled) {
      setIsVisible(true)
      return
    }
    
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      setHasBeenVisible(true)
      return
    }
    
    const element = ref.current
    if (!element) return
    
    // ─────────────────────────────────────────
    // INTERSECTION OBSERVER
    // ─────────────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibilityRatio(entry.intersectionRatio)
          
          if (entry.isIntersecting) {
            // Element is visible
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true)
                setHasBeenVisible(true)
                if (onReveal) onReveal(entry)
              }, delay)
            } else {
              setIsVisible(true)
              setHasBeenVisible(true)
              if (onReveal) onReveal(entry)
            }
            
            // Unobserve if triggerOnce
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else {
            // Element is not visible
            if (!triggerOnce) {
              setIsVisible(false)
              if (onHide) onHide(entry)
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )
    
    observer.observe(element)
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      if (element) {
        observer.unobserve(element)
      }
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, delay, disabled])
  
  return {
    ref,
    isVisible,
    hasBeenVisible,
    visibilityRatio,
  }
}

export default useScrollReveal


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Basic reveal on scroll:
//    const { ref, isVisible } = useScrollReveal()
//    <div ref={ref} className={isVisible ? 'fade-in' : 'opacity-0'}>
//      Content
//    </div>
//
// 2. With delay:
//    const { ref, isVisible } = useScrollReveal({ delay: 300 })
//
// 3. Trigger every time (not just once):
//    const { ref, isVisible } = useScrollReveal({ triggerOnce: false })
//
// 4. Adjust when to trigger:
//    const { ref, isVisible } = useScrollReveal({ 
//      threshold: 0.5,  // 50% visible
//      rootMargin: '-100px' // 100px before entering viewport
//    })
//
// 5. With callback:
//    const { ref } = useScrollReveal({
//      onReveal: () => console.log('Revealed!')
//    })
//
// 6. Track visibility percentage:
//    const { ref, visibilityRatio } = useScrollReveal({ triggerOnce: false })
//    // Use for parallax/scroll-linked animations
//    const opacity = visibilityRatio
//
// 7. Batch stagger (in parent):
//    const items = data.map((item, i) => {
//      const { ref, isVisible } = useScrollReveal({ delay: i * 100 })
//      return <div ref={ref} className={isVisible ? 'in' : 'out'}>...</div>
//    })
//
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// BONUS: STAGGERED REVEAL HOOK
// For animating multiple children with automatic stagger
// ═══════════════════════════════════════════════════════════════

export const useStaggeredReveal = (itemCount, options = {}) => {
  const {
    staggerDelay = 100,        // Delay between each item (ms)
    threshold = 0.15,
    rootMargin = '0px',
    triggerOnce = true,
  } = options
  
  const containerRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(new Set())
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show all immediately
      const allIndices = new Set(Array.from({ length: itemCount }, (_, i) => i))
      setVisibleItems(allIndices)
      return
    }
    
    const container = containerRef.current
    if (!container) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal items one by one with stagger
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, i]))
              }, i * staggerDelay)
            }
            
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setVisibleItems(new Set())
          }
        })
      },
      { threshold, rootMargin }
    )
    
    observer.observe(container)
    
    return () => {
      observer.disconnect()
    }
  }, [itemCount, staggerDelay, threshold, rootMargin, triggerOnce])
  
  return {
    containerRef,
    visibleItems,
    isItemVisible: (index) => visibleItems.has(index),
  }
}


// ═══════════════════════════════════════════════════════════════
// BONUS: SCROLL DIRECTION HOOK
// Detect if user is scrolling up or down
// ═══════════════════════════════════════════════════════════════

export const useScrollDirection = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState('up')
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
      
      if (
        direction !== scrollDirection && 
        Math.abs(currentScrollY - lastScrollY.current) > threshold
      ) {
        setScrollDirection(direction)
      }
      
      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0
      ticking.current = false
    }
    
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking.current = true
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollDirection, threshold])
  
  return { scrollDirection, scrollY, isScrollingDown: scrollDirection === 'down' }
}


// ═══════════════════════════════════════════════════════════════
// BONUS: SCROLL PROGRESS HOOK
// Get 0-1 progress of page scroll
// ═══════════════════════════════════════════════════════════════

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const updateProgress = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = maxScroll > 0 ? scrolled / maxScroll : 0
      setProgress(Math.min(Math.max(currentProgress, 0), 1))
    }
    
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])
  
  return progress
}