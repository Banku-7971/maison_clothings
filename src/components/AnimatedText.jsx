import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — ANIMATED TEXT COMPONENT
// ═══════════════════════════════════════════════════════════════
// Reveal text with cinematic character/word/line animations.
// Used throughout the site for editorial impact.
//
// Animation Types:
// - char: Each character reveals one by one
// - word: Each word reveals one by one
// - line: Each line reveals one by one
// - fade: Simple fade in
// - slide: Slide up reveal
// - blur: Blur to focus
// - typewriter: Types character by character
// - split: Split animation (top/bottom halves)
//
// Features:
// - Multiple element types (h1, h2, p, span, div)
// - Configurable delays and durations
// - Stagger control
// - View-triggered or immediate
// - Once or repeat animations
// - Custom easing
// - Italic highlight support
// ═══════════════════════════════════════════════════════════════

const AnimatedText = ({
  text,                          // The text to animate (string or array of strings for lines)
  as = 'div',                    // HTML element: h1, h2, h3, p, span, div
  type = 'word',                 // 'char' | 'word' | 'line' | 'fade' | 'slide' | 'blur' | 'typewriter' | 'split'
  duration = 0.8,                // Animation duration in seconds
  delay = 0,                     // Initial delay before starting
  stagger = 0.05,                // Delay between each element
  ease = [0.22, 1, 0.36, 1],     // Cubic bezier easing
  triggerOnce = true,            // Only animate once when in view
  viewportAmount = 0.3,          // % of element visible before triggering
  className = '',                // Custom classes
  style = {},                    // Custom styles
  italicWords = [],              // Words to render in italic (for highlights)
  goldWords = [],                // Words to render in gold
  animate = 'onView',            // 'onView' | 'immediate' | 'manual'
  isVisible = true,              // For manual control
}) => {
  
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    amount: viewportAmount 
  })
  
  // Determine when to animate
  const shouldAnimate = 
    animate === 'immediate' ? true :
    animate === 'manual' ? isVisible :
    isInView
  
  // ═══════════════════════════════════════════
  // ANIMATION VARIANTS
  // ═══════════════════════════════════════════
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }
  
  const childVariants = {
    // CHAR / WORD animation (slide up + fade)
    char: {
      hidden: { 
        y: '100%',
        opacity: 0,
      },
      visible: {
        y: '0%',
        opacity: 1,
        transition: { duration, ease },
      },
    },
    
    // FADE animation
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, ease },
      },
    },
    
    // SLIDE animation
    slide: {
      hidden: { y: 40, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration, ease },
      },
    },
    
    // BLUR animation
    blur: {
      hidden: { 
        opacity: 0,
        filter: 'blur(20px)',
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration, ease },
      },
    },
    
    // SPLIT animation (both halves)
    splitTop: {
      hidden: { y: '-100%' },
      visible: {
        y: '0%',
        transition: { duration, ease },
      },
    },
    splitBottom: {
      hidden: { y: '100%' },
      visible: {
        y: '0%',
        transition: { duration, ease },
      },
    },
  }
  
  // ═══════════════════════════════════════════
  // WORD HIGHLIGHTING
  // ═══════════════════════════════════════════
  const getWordStyle = (word) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase()
    
    const isItalic = italicWords.some(w => 
      w.toLowerCase() === cleanWord
    )
    
    const isGold = goldWords.some(w => 
      w.toLowerCase() === cleanWord
    )
    
    if (isItalic && isGold) {
      return { fontStyle: 'italic', color: '#C9A96E' }
    }
    if (isItalic) {
      return { fontStyle: 'italic' }
    }
    if (isGold) {
      return { color: '#C9A96E' }
    }
    return {}
  }
  
  // ═══════════════════════════════════════════
  // RENDER BY TYPE
  // ═══════════════════════════════════════════
  
  const Element = motion[as] || motion.div
  
  // ─────────────────────────────────────────
  // TYPE: CHAR (character by character)
  // ─────────────────────────────────────────
  if (type === 'char') {
    const characters = text.split('')
    
    return (
      <Element
        ref={ref}
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
      >
        {characters.map((char, i) => (
          <span 
            key={i} 
            style={{ 
              display: 'inline-block',
              overflow: 'hidden',
              lineHeight: '1',
            }}
          >
            <motion.span
              variants={childVariants.char}
              style={{ 
                display: 'inline-block',
                whiteSpace: 'pre',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Element>
    )
  }
  
  // ─────────────────────────────────────────
  // TYPE: WORD (word by word)
  // ─────────────────────────────────────────
  if (type === 'word') {
    const words = text.split(' ')
    
    return (
      <Element
        ref={ref}
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
      >
        {words.map((word, i) => (
          <span 
            key={i}
            style={{ 
              display: 'inline-block',
              overflow: 'hidden',
              marginRight: '0.25em',
              paddingBottom: '0.1em',
            }}
          >
            <motion.span
              variants={childVariants.char}
              style={{ 
                display: 'inline-block',
                ...getWordStyle(word),
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Element>
    )
  }
  
  // ─────────────────────────────────────────
  // TYPE: LINE (accepts array of strings)
  // ─────────────────────────────────────────
  if (type === 'line') {
    const lines = Array.isArray(text) ? text : [text]
    
    return (
      <Element
        ref={ref}
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
      >
        {lines.map((line, i) => (
          <div 
            key={i}
            style={{ 
              overflow: 'hidden',
              paddingBottom: '0.1em',
            }}
          >
            <motion.div
              variants={childVariants.char}
              style={{ display: 'inline-block' }}
            >
              {line}
            </motion.div>
          </div>
        ))}
      </Element>
    )
  }
  
  // ─────────────────────────────────────────
  // TYPE: FADE
  // ─────────────────────────────────────────
  if (type === 'fade') {
    return (
      <Element
        ref={ref}
        className={className}
        style={style}
        variants={childVariants.fade}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
        transition={{ duration, delay, ease }}
      >
        {text}
      </Element>
    )
  }
  
  // ─────────────────────────────────────────
  // TYPE: SLIDE
  // ─────────────────────────────────────────
  if (type === 'slide') {
    return (
      <Element
        ref={ref}
        className={className}
        style={style}
        variants={childVariants.slide}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
        transition={{ duration, delay, ease }}
      >
        {text}
      </Element>
    )
  }
  
  // ─────────────────────────────────────────
  // TYPE: BLUR
  // ─────────────────────────────────────────
  if (type === 'blur') {
    return (
      <Element
        ref={ref}
        className={className}
        style={style}
        variants={childVariants.blur}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
        transition={{ duration, delay, ease }}
      >
        {text}
      </Element>
    )
  }
  
  // ─────────────────────────────────────────
  // TYPE: TYPEWRITER
  // ─────────────────────────────────────────
  if (type === 'typewriter') {
    return (
      <Element
        ref={ref}
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.05 } },
            }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            ease: 'steps(1)',
          }}
          className="inline-block ml-1 text-gold"
        >
          |
        </motion.span>
      </Element>
    )
  }
  
  // ─────────────────────────────────────────
  // TYPE: SPLIT (top and bottom halves)
  // ─────────────────────────────────────────
  if (type === 'split') {
    return (
      <div 
        ref={ref}
        className={`relative overflow-hidden inline-block ${className}`}
        style={style}
      >
        {/* Top Half */}
        <motion.div
          variants={childVariants.splitTop}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          transition={{ duration, delay, ease }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            overflow: 'hidden',
          }}
        >
          {text}
        </motion.div>
        
        {/* Bottom Half */}
        <motion.div
          variants={childVariants.splitBottom}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          transition={{ duration, delay: delay + 0.1, ease }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            overflow: 'hidden',
            transform: 'translateY(50%)',
          }}
        >
          {text}
        </motion.div>
        
        {/* Invisible placeholder for correct sizing */}
        <span style={{ visibility: 'hidden' }}>{text}</span>
      </div>
    )
  }
  
  // ─────────────────────────────────────────
  // DEFAULT (fade)
  // ─────────────────────────────────────────
  return (
    <Element
      ref={ref}
      className={className}
      style={style}
      variants={childVariants.fade}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease }}
    >
      {text}
    </Element>
  )
}

export default AnimatedText


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Word-by-word reveal (most common):
//    <AnimatedText 
//      text="Where craftsmanship meets couture"
//      type="word"
//      className="text-4xl"
//    />
//
// 2. Character animation:
//    <AnimatedText 
//      text="MAISON"
//      type="char"
//      stagger={0.1}
//    />
//
// 3. Multiple lines:
//    <AnimatedText 
//      text={['Where', 'craftsmanship', 'meets', 'couture']}
//      type="line"
//      stagger={0.15}
//    />
//
// 4. With italic + gold highlights:
//    <AnimatedText 
//      text="We create pieces that outlive trends"
//      type="word"
//      italicWords={['pieces', 'trends']}
//      goldWords={['outlive']}
//    />
//
// 5. Blur to focus:
//    <AnimatedText 
//      text="Discover luxury"
//      type="blur"
//      duration={1.5}
//    />
//
// 6. Typewriter effect:
//    <AnimatedText 
//      text="Loading collection..."
//      type="typewriter"
//    />
//
// 7. Simple slide up:
//    <AnimatedText 
//      text="Fall/Winter 2025"
//      type="slide"
//      as="p"
//    />
//
// 8. Manual control:
//    <AnimatedText 
//      text="Custom trigger"
//      animate="manual"
//      isVisible={myState}
//    />
//
// ═══════════════════════════════════════════════════════════════