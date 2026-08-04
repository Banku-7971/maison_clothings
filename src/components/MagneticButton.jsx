import { useRef, useState, useEffect, forwardRef } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — MAGNETIC BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════
// The button that pulls you in.
// A luxury interactive element with magnetic cursor attraction.
// Used by top-tier brands to create memorable micro-interactions.
//
// Features:
// - Cursor attraction (element follows cursor when nearby)
// - Text also moves (slightly slower for depth)
// - Multiple visual variants
// - Fill-up hover animation
// - Icon support with slide animation
// - Loading state
// - Disabled state
// - Sizes (sm, md, lg, xl)
// - Full click handler support
// - Link or button (via 'as' prop)
// - Touch device fallback (no magnetic on touch)
// ═══════════════════════════════════════════════════════════════

const MagneticButton = forwardRef(({
  children,
  onClick,
  href = null,              // If provided, renders as <a>
  variant = 'primary',      // 'primary' | 'secondary' | 'ghost' | 'gold' | 'ivory'
  size = 'md',              // 'sm' | 'md' | 'lg' | 'xl'
  icon = null,              // Optional React icon component
  iconPosition = 'right',   // 'left' | 'right'
  loading = false,
  disabled = false,
  fullWidth = false,
  strength = 0.4,           // Magnetic strength (0-1)
  radius = 100,             // Detection radius in pixels
  textStrength = 0.2,       // Text magnetic strength (softer)
  className = '',
  type = 'button',
  ariaLabel,
  ...props
}, ref) => {
  
  const buttonRef = useRef(null)
  const textRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const animationFrame = useRef(null)
  
  // Merge refs
  const setRefs = (element) => {
    buttonRef.current = element
    if (typeof ref === 'function') {
      ref(element)
    } else if (ref) {
      ref.current = element
    }
  }
  
  // ─────────────────────────────────────────
  // MAGNETIC EFFECT
  // ─────────────────────────────────────────
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return
    
    // Skip on touch devices
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return
    
    // Skip if disabled
    if (disabled || loading) return
    
    const button = buttonRef.current
    const text = textRef.current
    if (!button) return
    
    // ─────────────────────────────────────────
    // MOUSE MOVE HANDLER
    // ─────────────────────────────────────────
    const handleMouseMove = (e) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      
      animationFrame.current = requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect()
        
        // Center of button
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        // Distance from cursor to center
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        // Apply magnetic effect if within radius
        if (distance < radius) {
          const moveX = deltaX * strength
          const moveY = deltaY * strength
          
          button.style.transform = 
            `translate3d(${moveX}px, ${moveY}px, 0)`
          
          // Text moves slightly less for depth effect
          if (text) {
            const textMoveX = deltaX * textStrength
            const textMoveY = deltaY * textStrength
            text.style.transform = 
              `translate3d(${textMoveX}px, ${textMoveY}px, 0)`
          }
        }
      })
    }
    
    // ─────────────────────────────────────────
    // MOUSE LEAVE HANDLER
    // ─────────────────────────────────────────
    const handleMouseLeave = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      button.style.transform = 'translate3d(0px, 0px, 0)'
      if (text) {
        text.style.transform = 'translate3d(0px, 0px, 0)'
      }
    }
    
    // ─────────────────────────────────────────
    // ATTACH LISTENERS
    // ─────────────────────────────────────────
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    button.addEventListener('mouseleave', handleMouseLeave)
    
    // Set transitions
    button.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
    if (text) {
      text.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
    }
    button.style.willChange = 'transform'
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (button) {
        button.removeEventListener('mouseleave', handleMouseLeave)
        button.style.transform = ''
        button.style.willChange = ''
      }
      if (text) {
        text.style.transform = ''
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [strength, radius, textStrength, disabled, loading])
  
  // ─────────────────────────────────────────
  // SIZE CLASSES
  // ─────────────────────────────────────────
  const sizeClasses = {
    sm: 'py-3 px-6 text-tiny',
    md: 'py-4 px-10 text-tiny',
    lg: 'py-5 px-14 text-xs',
    xl: 'py-6 px-16 text-sm',
  }
  
  const sizeStyles = {
    sm: { fontSize: '0.65rem' },
    md: { fontSize: '0.75rem' },
    lg: { fontSize: '0.8rem' },
    xl: { fontSize: '0.85rem' },
  }
  
  // ─────────────────────────────────────────
  // VARIANT CLASSES
  // ─────────────────────────────────────────
  const getVariantClasses = () => {
    const base = 'relative overflow-hidden inline-flex items-center justify-center gap-3 tracking-mega uppercase font-medium transition-colors duration-500 ease-luxury'
    
    switch (variant) {
      case 'gold':
        return `${base} bg-gold text-noir border border-gold hover:text-noir`
      case 'ivory':
        return `${base} bg-ivory text-noir border border-ivory hover:text-noir`
      case 'ghost':
        return `${base} bg-transparent text-silver border border-silver hover:text-noir`
      case 'secondary':
        return `${base} bg-transparent text-ivory border border-graphite hover:text-noir hover:border-ivory`
      case 'primary':
      default:
        return `${base} bg-transparent text-ivory border border-ivory hover:text-noir`
    }
  }
  
  // ─────────────────────────────────────────
  // FILL COLOR (slide-up background)
  // ─────────────────────────────────────────
  const getFillColor = () => {
    switch (variant) {
      case 'gold':
        return 'bg-ivory'
      case 'ivory':
        return 'bg-gold'
      case 'ghost':
        return 'bg-silver'
      case 'primary':
      case 'secondary':
      default:
        return 'bg-ivory'
    }
  }
  
  // ─────────────────────────────────────────
  // BUTTON CONTENT
  // ─────────────────────────────────────────
  const ButtonContent = () => (
    <>
      {/* Slide-up Fill Background */}
      <motion.span
        className={`absolute inset-0 ${getFillColor()} z-0`}
        initial={{ y: '100%' }}
        animate={{ y: isHovered ? '0%' : '100%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Text + Icon Container (Magnetic) */}
      <span
        ref={textRef}
        className="relative z-10 inline-flex items-center gap-3 whitespace-nowrap"
      >
        
        {/* Loading Spinner */}
        {loading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="60"
                strokeDashoffset="20"
                fill="none"
              />
            </svg>
          </motion.span>
        )}
        
        {/* Icon Left */}
        {!loading && icon && iconPosition === 'left' && (
          <motion.span
            className="inline-flex items-center"
            animate={{ x: isHovered ? -2 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {icon}
          </motion.span>
        )}
        
        {/* Text */}
        <span>{loading ? 'Loading...' : children}</span>
        
        {/* Icon Right */}
        {!loading && icon && iconPosition === 'right' && (
          <motion.span
            className="inline-flex items-center"
            animate={{ x: isHovered ? 2 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </>
  )
  
  // ─────────────────────────────────────────
  // RENDER AS LINK (if href provided)
  // ─────────────────────────────────────────
  if (href) {
    return (
      <a
        ref={setRefs}
        href={href}
        className={`
          ${getVariantClasses()}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${disabled ? 'opacity-40 pointer-events-none' : ''}
          ${className}
        `}
        style={{
          ...sizeStyles[size],
          letterSpacing: '0.25em',
        }}
        onClick={disabled ? undefined : onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={ariaLabel}
        data-cursor="hover"
        {...props}
      >
        <ButtonContent />
      </a>
    )
  }
  
  // ─────────────────────────────────────────
  // RENDER AS BUTTON
  // ─────────────────────────────────────────
  return (
    <button
      ref={setRefs}
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`
        ${getVariantClasses()}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
      style={{
        ...sizeStyles[size],
        letterSpacing: '0.25em',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
      aria-busy={loading}
      data-cursor="hover"
      {...props}
    >
      <ButtonContent />
    </button>
  )
})

MagneticButton.displayName = 'MagneticButton'

export default MagneticButton


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Basic primary button:
//    <MagneticButton onClick={handleClick}>
//      Discover Collection
//    </MagneticButton>
//
// 2. Gold CTA:
//    <MagneticButton variant="gold" size="lg">
//      Shop Now
//    </MagneticButton>
//
// 3. With icon:
//    import { FiArrowRight } from 'react-icons/fi'
//    <MagneticButton icon={<FiArrowRight size={16} />}>
//      Explore
//    </MagneticButton>
//
// 4. As link:
//    <MagneticButton href="/shop" variant="ivory">
//      View All
//    </MagneticButton>
//
// 5. Loading state:
//    <MagneticButton loading={isSubmitting}>
//      Submit
//    </MagneticButton>
//
// 6. Full width:
//    <MagneticButton fullWidth variant="gold">
//      Add to Cart
//    </MagneticButton>
//
// 7. Custom magnetic strength:
//    <MagneticButton strength={0.6} radius={150}>
//      Strong Attraction
//    </MagneticButton>
//
// 8. Ghost variant:
//    <MagneticButton variant="ghost" size="sm">
//      Learn More
//    </MagneticButton>
//
// ═══════════════════════════════════════════════════════════════