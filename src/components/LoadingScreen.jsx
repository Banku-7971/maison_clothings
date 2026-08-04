import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════
// MAISON — LEGENDARY CINEMATIC LOADING SCREEN
// ═══════════════════════════════════════════════════════════════
// The first breath of MAISON.
// A moment designed to make the world pause.
//
// Features:
// - Animated brand mark (SVG draws itself)
// - Split letter reveal with 3D rotation
// - Liquid gold progress bar with particle glow
// - Rotating orbital rings
// - Ambient breathing background
// - Rotating loading messages
// - Corner brackets expanding from center
// - Film grain + scan lines
// - Cinematic exit animation
// ═══════════════════════════════════════════════════════════════

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [showBar, setShowBar] = useState(false)
  
  // Rotating loading messages
  const messages = [
    'Curating your experience',
    'Preparing the atelier',
    'Refining the details',
    'Awakening the collection',
    'Setting the stage',
  ]
  
  // Progress counter
  useEffect(() => {
    const duration = 3500
    const interval = 25
    const increment = 100 / (duration / interval)
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, interval)
    
    // Show elements progressively
    setTimeout(() => setShowLogo(true), 300)
    setTimeout(() => setShowBar(true), 1200)
    
    // Rotate messages
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 800)
    
    return () => {
      clearInterval(timer)
      clearInterval(messageTimer)
    }
  }, [])
  
  const letters = 'MAISON'.split('')
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ 
        zIndex: 10000,
        background: 'radial-gradient(ellipse at center, #3D2E24 0%, #2A1F1A 60%, #1F1612 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: '-100%',
        transition: { 
          duration: 1.4, 
          ease: [0.87, 0, 0.13, 1],
          delay: 0.3,
        }
      }}
    >
      {/* ═══════════════════════════════════════════════
          LAYER 1: BREATHING RADIAL GRADIENT BG
      ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(200, 121, 82, 0.3) 0%, transparent 60%)',
        }}
      />
      
      {/* ═══════════════════════════════════════════════
          LAYER 2: FILM GRAIN
      ═══════════════════════════════════════════════ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: 'grainShift 8s steps(10) infinite',
        }}
      />
      
      {/* ═══════════════════════════════════════════════
          LAYER 3: HORIZONTAL SCAN LINES
      ═══════════════════════════════════════════════ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(200, 121, 82, 0.15) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
      
      {/* ═══════════════════════════════════════════════
          LAYER 4: FLOATING AMBIENT ORBS
      ═══════════════════════════════════════════════ */}
      {[
        { top: '15%', left: '10%', size: 300, color: '200, 121, 82', delay: 0 },
        { top: '60%', left: '75%', size: 400, color: '232, 181, 148', delay: 1.5 },
        { top: '75%', left: '15%', size: 250, color: '92, 30, 46', delay: 3 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, rgba(${orb.color}, 0.25) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
      
      {/* ═══════════════════════════════════════════════
          LAYER 5: ROTATING ORBITAL RINGS (behind logo)
      ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          border: '1px solid rgba(200, 121, 82, 0.15)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 800,
          border: '1px dashed rgba(232, 181, 148, 0.08)',
          borderRadius: '50%',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Small orbiting dot on inner ring */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ width: 600, height: 600 }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-gold"
          style={{ 
            top: '-4px', 
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px rgba(200, 121, 82, 0.8), 0 0 40px rgba(200, 121, 82, 0.4)',
          }}
        />
      </motion.div>
      
      {/* Small orbiting dot on outer ring (opposite direction) */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ width: 800, height: 800 }}
      >
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-champagne"
          style={{ 
            top: '-3px', 
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 15px rgba(232, 181, 148, 0.9)',
          }}
        />
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          LAYER 6: CORNER BRACKETS (Expand from center)
      ═══════════════════════════════════════════════ */}
      {/* Top Left */}
      <motion.div
        initial={{ opacity: 0, x: 100, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 left-8 md:top-12 md:left-12"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="w-8 h-px bg-gradient-to-r from-gold to-transparent origin-left"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent origin-top"
        />
      </motion.div>
      
      {/* Top Right */}
      <motion.div
        initial={{ opacity: 0, x: -100, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 right-8 md:top-12 md:right-12"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="w-8 h-px bg-gradient-to-l from-gold to-transparent ml-auto origin-right"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent ml-auto origin-top"
        />
      </motion.div>
      
      {/* Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: 100, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="w-px h-8 bg-gradient-to-t from-gold to-transparent origin-bottom"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="w-8 h-px bg-gradient-to-r from-gold to-transparent origin-left"
        />
      </motion.div>
      
      {/* Bottom Right */}
      <motion.div
        initial={{ opacity: 0, x: -100, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="w-px h-8 bg-gradient-to-t from-gold to-transparent ml-auto origin-bottom"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="w-8 h-px bg-gradient-to-l from-gold to-transparent ml-auto origin-right"
        />
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          MAIN CONTENT — CENTER STAGE
      ═══════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center px-6">
        
        {/* ─────────────────────────────────
            TOP LABEL — Location & Est.
        ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <div className="w-8 h-px bg-gold/50" />
          <p 
            className="text-tiny tracking-mega text-champagne uppercase font-mono"
            style={{ fontSize: '0.65rem', letterSpacing: '0.4em' }}
          >
            Est. Kolkata · 2025
          </p>
          <div className="w-8 h-px bg-gold/50" />
        </motion.div>
        
        {/* ─────────────────────────────────
            MAISON LOGO — Letter by Letter
            with 3D flip effect!
        ───────────────────────────────── */}
        <div className="flex items-center justify-center relative">
          {/* Golden underline that draws itself */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: showLogo ? 1 : 0,
              opacity: showLogo ? [0, 1, 0.6] : 0,
            }}
            transition={{ 
              duration: 1.5, 
              delay: 1.5, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          />
          
          {letters.map((letter, index) => (
            <div key={index} className="overflow-hidden" style={{ perspective: '1000px' }}>
              <motion.span
                initial={{ 
                  y: '120%',
                  rotateX: -90,
                  opacity: 0,
                }}
                animate={showLogo ? { 
                  y: '0%',
                  rotateX: 0,
                  opacity: 1,
                } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.4 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block font-cormorant font-light"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 12rem)',
                  letterSpacing: '0.4em',
                  lineHeight: 1,
                  color: '#F5EBDD',
                  textShadow: `
                    0 0 40px rgba(200, 121, 82, 0.4),
                    0 0 80px rgba(200, 121, 82, 0.2),
                    0 2px 10px rgba(0, 0, 0, 0.5)
                  `,
                  transformStyle: 'preserve-3d',
                  paddingLeft: index === 0 ? '0.2em' : 0,
                }}
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>
        
        {/* ─────────────────────────────────
            TAGLINE
        ───────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showLogo ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-8 md:mt-10 font-cormorant italic text-center"
          style={{ 
            fontSize: 'clamp(1rem, 1.5vw, 1.375rem)',
            color: '#E4B590',
            letterSpacing: '0.05em',
          }}
        >
          Where craftsmanship meets couture
        </motion.p>
        
        {/* Small decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={showLogo ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-8 w-12 h-px bg-gold/40 origin-center"
        />
        
        {/* ═══════════════════════════════════════════════
            PROGRESS BAR — LIQUID GOLD WITH SHIMMER
        ═══════════════════════════════════════════════ */}
        <div className="mt-16 md:mt-20 w-64 md:w-80">
          
          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={showBar ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[3px] rounded-full overflow-hidden origin-left"
            style={{
              background: 'linear-gradient(90deg, rgba(232, 181, 148, 0.1), rgba(200, 121, 82, 0.2), rgba(232, 181, 148, 0.1))',
            }}
          >
            {/* Progress fill with gradient */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #8B4A32 0%, #C87952 50%, #E8B594 100%)',
                boxShadow: `
                  0 0 20px rgba(200, 121, 82, 0.8),
                  0 0 40px rgba(200, 121, 82, 0.4)
                `,
              }}
            />
            
            {/* Shimmer effect on top of progress */}
            <motion.div
              className="absolute inset-y-0 w-32 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                filter: 'blur(4px)',
              }}
              animate={{
                left: ['-15%', '110%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Glowing dot at end of progress */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                background: '#E8B594',
                boxShadow: `
                  0 0 15px rgba(232, 181, 148, 1),
                  0 0 30px rgba(232, 181, 148, 0.6),
                  0 0 50px rgba(232, 181, 148, 0.3)
                `,
              }}
              animate={{
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
          
          {/* Progress info row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showBar ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-6 flex items-center justify-between"
          >
            {/* Rotating message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
                className="text-tiny tracking-mega text-champagne uppercase font-mono"
                style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}
              >
                {messages[currentMessage]}
              </motion.p>
            </AnimatePresence>
            
            {/* Percentage */}
            <div className="flex items-baseline gap-1">
              <span 
                className="text-tiny tracking-widest text-gold font-mono tabular-nums font-medium"
                style={{ fontSize: '0.75rem' }}
              >
                {String(Math.floor(progress)).padStart(3, '0')}
              </span>
              <span 
                className="text-tiny text-gold/70 font-mono"
                style={{ fontSize: '0.65rem' }}
              >
                %
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* ═══════════════════════════════════════════════
          BOTTOM STATUS BAR
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-between items-center px-8 md:px-16"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-2 rounded-full bg-gold"
            style={{
              boxShadow: '0 0 10px rgba(200, 121, 82, 0.8)',
            }}
          />
          <span 
            className="text-tiny tracking-mega text-silver uppercase font-mono"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}
          >
            MSN—25
          </span>
        </div>
        
        <span 
          className="text-tiny tracking-mega text-silver uppercase font-mono hidden md:block"
          style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}
        >
          Volume 001 — Noir
        </span>
        
        <div className="flex items-center gap-3">
          <span 
            className="text-tiny tracking-mega text-silver uppercase font-mono"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}
          >
            22.5726° N
          </span>
          <motion.div
            animate={{ 
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="w-2 h-2 rounded-full bg-champagne"
            style={{
              boxShadow: '0 0 10px rgba(232, 181, 148, 0.8)',
            }}
          />
        </div>
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          TOP MARQUEE (subtle)
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 2.5 }}
        className="absolute top-0 left-0 right-0 overflow-hidden py-3"
      >
        <div 
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: 'marqueeLoad 30s linear infinite' }}
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-16 flex-shrink-0">
              <span className="text-tiny tracking-mega text-gold/40 uppercase font-mono" style={{ fontSize: '0.55rem' }}>
                • MAISON • ATELIER • KOLKATA • EST. 2025 • HANDCRAFTED • WHERE CRAFTSMANSHIP MEETS COUTURE
              </span>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          ANIMATIONS
      ═══════════════════════════════════════════════ */}
      <style>{`
        @keyframes grainShift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        
        @keyframes marqueeLoad {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  )
}

export default LoadingScreen