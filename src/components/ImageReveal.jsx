import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — IMAGE REVEAL COMPONENT
// ═══════════════════════════════════════════════════════════════
// Cinematic image reveals with mask animations.
// The technique used by all luxury/editorial sites.
//
// Reveal Types:
// - curtain-left: Curtain slides right (revealing image)
// - curtain-right: Curtain slides left
// - curtain-up: Curtain slides down
// - curtain-down: Curtain slides up
// - split: Splits open from center
// - zoom: Zoom in from 120% scale
// - fade: Simple fade
// - parallax: Image scales down as you scroll
// - grow: Image scales up from 0
//
// Features:
// - Multiple animation types
// - Configurable direction
// - Gold or dark curtain colors
// - Parallax scroll effect
// - Loading state
// - Aspect ratio control
// - Object-fit options
// - Loading lazy support
// ═══════════════════════════════════════════════════════════════

const ImageReveal = ({
  src,
  alt = '',
  type = 'curtain-left',       // 'curtain-left' | 'curtain-right' | 'curtain-up' | 'curtain-down' | 'split' | 'zoom' | 'fade' | 'grow'
  duration = 1.5,              // Animation duration
  delay = 0,                   // Initial delay
  ease = [0.77, 0, 0.175, 1], // Expo easing (cinematic)
  aspectRatio = 'aspect-[4/5]', // Tailwind aspect ratio class
  objectFit = 'cover',         // 'cover' | 'contain'
  curtainColor = 'bg-noir',    // Color of the reveal curtain
  triggerOnce = true,
  viewportAmount = 0.3,
  showLoader = true,
  loading = 'lazy',
  className = '',
  imgClassName = '',
  overlay = false,             // Add gradient overlay after reveal
  overlayGradient = 'from-noir/60 to-transparent',
  cornerBrackets = false,      // Add film corner brackets
  caption = null,              // Optional caption text
  onClick = null,
  children,                    // Optional overlay content
}) => {
  
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const isInView = useInView(containerRef, { 
    once: triggerOnce, 
    amount: viewportAmount 
  })
  
  // ═══════════════════════════════════════════
  // CURTAIN ANIMATION VARIANTS
  // ═══════════════════════════════════════════
  
  const getCurtainVariants = () => {
    switch (type) {
      case 'curtain-left':
        return {
          hidden: { x: '0%' },
          visible: {
            x: '100%',
            transition: { duration, delay: delay + 0.2, ease },
          },
        }
      case 'curtain-right':
        return {
          hidden: { x: '0%' },
          visible: {
            x: '-100%',
            transition: { duration, delay: delay + 0.2, ease },
          },
        }
      case 'curtain-up':
        return {
          hidden: { y: '0%' },
          visible: {
            y: '-100%',
            transition: { duration, delay: delay + 0.2, ease },
          },
        }
      case 'curtain-down':
        return {
          hidden: { y: '0%' },
          visible: {
            y: '100%',
            transition: { duration, delay: delay + 0.2, ease },
          },
        }
      default:
        return {
          hidden: { x: '0%' },
          visible: {
            x: '100%',
            transition: { duration, delay: delay + 0.2, ease },
          },
        }
    }
  }
  
  // ═══════════════════════════════════════════
  // IMAGE ANIMATION VARIANTS
  // ═══════════════════════════════════════════
  
  const getImageVariants = () => {
    switch (type) {
      case 'zoom':
        return {
          hidden: { scale: 1.2, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: duration * 1.3, delay, ease },
          },
        }
      case 'grow':
        return {
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration, delay, ease },
          },
        }
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay, ease },
          },
        }
      case 'curtain-left':
      case 'curtain-right':
      case 'curtain-up':
      case 'curtain-down':
      case 'split':
      default:
        return {
          hidden: { scale: 1.15 },
          visible: {
            scale: 1,
            transition: { duration: duration * 1.5, delay: delay + 0.3, ease },
          },
        }
    }
  }
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      onClick={onClick}
      data-cursor={onClick ? 'view' : undefined}
    >
      
      {/* ═══════════════════════════════════════
          LOADING SKELETON
      ═══════════════════════════════════════ */}
      {showLoader && !imageLoaded && (
        <div className="absolute inset-0 bg-charcoal z-10">
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
              animation: 'imageShimmer 1.5s infinite',
            }}
          />
          <style>{`
            @keyframes imageShimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}
      
      {/* ═══════════════════════════════════════
          IMAGE
      ═══════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        variants={getImageVariants()}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${imgClassName}`}
          draggable={false}
        />
      </motion.div>
      
      {/* ═══════════════════════════════════════
          CURTAIN(S) — For reveal types
      ═══════════════════════════════════════ */}
      
      {/* SINGLE CURTAIN */}
      {(type === 'curtain-left' || type === 'curtain-right' || type === 'curtain-up' || type === 'curtain-down') && (
        <motion.div
          className={`absolute inset-0 ${curtainColor} z-20`}
          variants={getCurtainVariants()}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
      )}
      
      {/* SPLIT CURTAINS (open from center) */}
      {type === 'split' && (
        <>
          {/* Top Half */}
          <motion.div
            className={`absolute inset-x-0 top-0 h-1/2 ${curtainColor} z-20`}
            initial={{ y: '0%' }}
            animate={isInView ? { y: '-100%' } : { y: '0%' }}
            transition={{ duration, delay: delay + 0.2, ease }}
          />
          
          {/* Bottom Half */}
          <motion.div
            className={`absolute inset-x-0 bottom-0 h-1/2 ${curtainColor} z-20`}
            initial={{ y: '0%' }}
            animate={isInView ? { y: '100%' } : { y: '0%' }}
            transition={{ duration, delay: delay + 0.2, ease }}
          />
          
          {/* Center Gold Line (decorative) */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px bg-gold z-30"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView 
              ? { scaleX: [0, 1, 0], opacity: [0, 1, 0] } 
              : { scaleX: 0, opacity: 0 }
            }
            transition={{ 
              duration: duration + 0.4, 
              delay: delay + 0.1,
              times: [0, 0.5, 1],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: 'center' }}
          />
        </>
      )}
      
      {/* ═══════════════════════════════════════
          GRADIENT OVERLAY (Optional)
      ═══════════════════════════════════════ */}
      {overlay && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} pointer-events-none z-10`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: delay + duration,
          }}
        />
      )}
      
      {/* ═══════════════════════════════════════
          CORNER BRACKETS (Optional)
      ═══════════════════════════════════════ */}
      {cornerBrackets && (
        <>
          <motion.div
            className="absolute top-4 left-4 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: delay + duration + 0.2 }}
          >
            <div className="w-4 h-px bg-gold" />
            <div className="w-px h-4 bg-gold" />
          </motion.div>
          
          <motion.div
            className="absolute top-4 right-4 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: delay + duration + 0.2 }}
          >
            <div className="w-4 h-px bg-gold ml-auto" />
            <div className="w-px h-4 bg-gold ml-auto" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-4 left-4 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: delay + duration + 0.3 }}
          >
            <div className="w-px h-4 bg-gold" />
            <div className="w-4 h-px bg-gold" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-4 right-4 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: delay + duration + 0.3 }}
          >
            <div className="w-px h-4 bg-gold ml-auto" />
            <div className="w-4 h-px bg-gold ml-auto" />
          </motion.div>
        </>
      )}
      
      {/* ═══════════════════════════════════════
          CAPTION (Optional)
      ═══════════════════════════════════════ */}
      {caption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: delay + duration + 0.4 }}
          className="absolute bottom-4 left-4 right-4 z-30 pointer-events-none"
        >
          <p 
            className="text-tiny tracking-mega text-ivory uppercase font-mono"
            style={{ fontSize: '0.6rem' }}
          >
            {caption}
          </p>
        </motion.div>
      )}
      
      {/* ═══════════════════════════════════════
          CHILDREN (Custom overlay content)
      ═══════════════════════════════════════ */}
      {children && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {children}
        </div>
      )}
    </div>
  )
}

export default ImageReveal


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Basic curtain reveal:
//    <ImageReveal 
//      src="/hero.jpg" 
//      alt="Hero image" 
//    />
//
// 2. Split reveal (dramatic):
//    <ImageReveal 
//      src="/product.jpg"
//      type="split"
//      aspectRatio="aspect-square"
//    />
//
// 3. Zoom in reveal:
//    <ImageReveal 
//      src="/campaign.jpg"
//      type="zoom"
//      duration={2}
//    />
//
// 4. Portrait with overlay + brackets:
//    <ImageReveal 
//      src="/model.jpg"
//      type="curtain-up"
//      aspectRatio="aspect-[3/4]"
//      cornerBrackets={true}
//      overlay={true}
//      caption="MSN—Vol.001"
//    />
//
// 5. Gold curtain (luxury):
//    <ImageReveal 
//      src="/lookbook.jpg"
//      curtainColor="bg-gold"
//    />
//
// 6. Click to view:
//    <ImageReveal 
//      src="/product.jpg"
//      onClick={() => openLightbox()}
//    />
//
// 7. With custom content overlay:
//    <ImageReveal src="/hero.jpg">
//      <div className="absolute bottom-8 left-8 text-ivory">
//        <h2 className="font-cormorant text-4xl">Featured</h2>
//      </div>
//    </ImageReveal>
//
// 8. Grow from zero:
//    <ImageReveal 
//      src="/logo.png"
//      type="grow"
//      duration={1.2}
//    />
//
// ═══════════════════════════════════════════════════════════════