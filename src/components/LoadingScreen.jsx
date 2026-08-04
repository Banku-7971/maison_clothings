import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — THE MOST COMPLEX LOADING SCREEN EVER
// 6 seconds of pure magic
// ═══════════════════════════════════════════════════════════════

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [skipHovered, setSkipHovered] = useState(false)
  
  const startTimeRef = useRef(null)
  const animationRef = useRef(null)
  
  const DURATION = 6000 // 6 seconds now
  
  const messages = [
    'Curating your experience',
    'Preparing the atelier',
    'Awakening the collection',
    'Refining the details',
    'Weaving the magic',
    'Almost there',
  ]
  
  useEffect(() => {
    startTimeRef.current = performance.now()
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current
      const percent = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(percent)
      
      if (elapsed < DURATION) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setProgress(100)
      }
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    const logoTimer = setTimeout(() => setShowLogo(true), 400)
    const barTimer = setTimeout(() => setShowBar(true), 1600)
    const skipTimer = setTimeout(() => setShowSkip(true), 1000)
    
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 850)
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      clearTimeout(logoTimer)
      clearTimeout(barTimer)
      clearTimeout(skipTimer)
      clearInterval(messageTimer)
    }
  }, [])
  
  const handleSkip = () => {
    setProgress(100)
    window.dispatchEvent(new CustomEvent('skipLoading'))
  }
  
  const letters = 'MAISON'.split('')
  
  // Generate 50 random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    color: i % 3 === 0 ? '200, 121, 82' : i % 3 === 1 ? '232, 181, 148' : '245, 235, 221',
  }))
  
  // Generate 20 sparkles
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 1,
  }))
  
  // Generate constellation dots
  const constellationDots = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    delay: Math.random() * 2,
  }))
  
  // Falling gold dust
  const dustParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 6,
  }))
  
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
        transition: { duration: 1.4, ease: [0.87, 0, 0.13, 1], delay: 0.3 }
      }}
    >
      {/* ═══════════════════════════════════════════════
          LAYER 1: BREATHING GRADIENT BACKGROUND
      ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at center, rgba(200, 121, 82, 0.4) 0%, transparent 60%)',
        }}
      />
      
      {/* LAYER 2: SECONDARY GRADIENT (offset) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(92, 30, 46, 0.4) 0%, transparent 50%)',
        }}
      />
      
      {/* LAYER 3: AURORA WAVE */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        animate={{
          background: [
            'linear-gradient(45deg, transparent 0%, rgba(200, 121, 82, 0.3) 30%, transparent 60%)',
            'linear-gradient(135deg, transparent 20%, rgba(232, 181, 148, 0.3) 50%, transparent 80%)',
            'linear-gradient(225deg, transparent 40%, rgba(200, 121, 82, 0.3) 70%, transparent 100%)',
            'linear-gradient(45deg, transparent 0%, rgba(200, 121, 82, 0.3) 30%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* LAYER 4: FILM GRAIN */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: 'grainShift 8s steps(10) infinite',
        }}
      />
      
      {/* LAYER 5: LIGHT BEAM SWEEPING */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        animate={{
          background: [
            'linear-gradient(90deg, transparent 0%, transparent 50%, rgba(200, 121, 82, 0.4) 55%, transparent 60%, transparent 100%)',
            'linear-gradient(90deg, transparent 40%, transparent 50%, rgba(200, 121, 82, 0.4) 55%, transparent 60%, transparent 100%)',
            'linear-gradient(90deg, transparent 0%, transparent 50%, rgba(200, 121, 82, 0.4) 55%, transparent 60%, transparent 100%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* LAYER 6: AMBIENT ORBS (6 total) */}
      {[
        { top: '10%', left: '10%', size: 400, color: '200, 121, 82', delay: 0 },
        { top: '65%', left: '80%', size: 500, color: '232, 181, 148', delay: 1.5 },
        { top: '75%', left: '15%', size: 350, color: '92, 30, 46', delay: 3 },
        { top: '20%', left: '85%', size: 300, color: '183, 110, 93', delay: 2 },
        { top: '50%', left: '5%', size: 250, color: '212, 150, 125', delay: 4 },
        { top: '5%', left: '55%', size: 400, color: '200, 121, 82', delay: 2.5 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, rgba(${orb.color}, 0.25) 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
      
      {/* ═══════════════════════════════════════════════
          LAYER 7: 50 FLOATING PARTICLES
      ═══════════════════════════════════════════════ */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `rgba(${particle.color}, 0.8)`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(${particle.color}, 0.6)`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, 30, -30, 0],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* ═══════════════════════════════════════════════
          LAYER 8: 20 GOLDEN SPARKLES
      ═══════════════════════════════════════════════ */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill="#E8B594"
              style={{ filter: 'drop-shadow(0 0 4px rgba(232, 181, 148, 0.8))' }}
            />
          </svg>
        </motion.div>
      ))}
      
      {/* ═══════════════════════════════════════════════
          LAYER 9: FALLING GOLD DUST
      ═══════════════════════════════════════════════ */}
      {dustParticles.map((dust) => (
        <motion.div
          key={`dust-${dust.id}`}
          className="absolute w-0.5 h-0.5 rounded-full bg-gold pointer-events-none"
          style={{
            left: `${dust.x}%`,
            top: '-10px',
            boxShadow: '0 0 6px rgba(200, 121, 82, 0.8)',
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 1, 1, 0],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: dust.duration,
            repeat: Infinity,
            delay: dust.delay,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* ═══════════════════════════════════════════════
          LAYER 10: CONSTELLATION DOTS
      ═══════════════════════════════════════════════ */}
      {constellationDots.map((dot) => (
        <motion.div
          key={`dot-${dot.id}`}
          className="absolute w-1 h-1 rounded-full bg-champagne pointer-events-none"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            boxShadow: '0 0 8px rgba(232, 181, 148, 0.8)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* ═══════════════════════════════════════════════
          LAYER 11: 5 ORBITAL RINGS
      ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500,
          border: '1px solid rgba(200, 121, 82, 0.15)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700,
          border: '1px dashed rgba(232, 181, 148, 0.1)',
          borderRadius: '50%',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 900, height: 900,
          border: '1px solid rgba(200, 121, 82, 0.08)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 1100, height: 1100,
          border: '1px dotted rgba(200, 121, 82, 0.05)',
          borderRadius: '50%',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Expanding rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border pointer-events-none"
          style={{
            borderColor: 'rgba(200, 121, 82, 0.3)',
          }}
          animate={{
            width: [100, 800],
            height: [100, 800],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: 'easeOut',
          }}
        />
      ))}
      
      {/* ═══════════════════════════════════════════════
          LAYER 12: ORBITING GLOW DOTS (multiple)
      ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ width: 500, height: 500 }}
      >
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-gold"
          style={{ 
            top: '-6px', 
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 25px rgba(200, 121, 82, 1), 0 0 50px rgba(200, 121, 82, 0.6)',
          }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      <motion.div
        className="absolute pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ width: 700, height: 700 }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-champagne"
          style={{ 
            top: '-4px', 
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px rgba(232, 181, 148, 1)',
          }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
      
      <motion.div
        className="absolute pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ width: 900, height: 900 }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-rose-gold"
          style={{ 
            top: '-4px', 
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 15px rgba(196, 133, 112, 1)',
          }}
        />
      </motion.div>
      
      <motion.div
        className="absolute pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ width: 1100, height: 1100 }}
      >
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/60"
          style={{ 
            top: '-3px', 
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 12px rgba(200, 121, 82, 0.7)',
          }}
        />
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          LAYER 13: ROTATING SVG STAR BURST BEHIND LOGO
      ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute pointer-events-none opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="600" height="600" viewBox="0 0 600 600">
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="300"
              y1="300"
              x2="300"
              y2="50"
              stroke="rgba(200, 121, 82, 0.15)"
              strokeWidth="0.5"
              transform={`rotate(${i * 15} 300 300)`}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Counter-rotating star */}
      <motion.div
        className="absolute pointer-events-none opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="800" height="800" viewBox="0 0 800 800">
          {[...Array(36)].map((_, i) => (
            <line
              key={i}
              x1="400"
              y1="400"
              x2="400"
              y2="100"
              stroke="rgba(232, 181, 148, 0.1)"
              strokeWidth="0.3"
              transform={`rotate(${i * 10} 400 400)`}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center px-6">
        
        {/* Top Label with wave lines */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <motion.div 
            className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            animate={{ scaleX: [0, 1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <p 
            className="text-tiny tracking-mega uppercase font-mono"
            style={{ 
              fontSize: '0.65rem', 
              letterSpacing: '0.4em',
              color: '#E4B590',
              textShadow: '0 0 10px rgba(232, 181, 148, 0.5)',
            }}
          >
            Est. Kolkata · 2025
          </p>
          <motion.div 
            className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            animate={{ scaleX: [1, 0.5, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        {/* MAISON Logo with GLOWING TEXT */}
        <div className="flex items-center justify-center relative">
          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #C87952, #E8B594, #C87952, transparent)',
              boxShadow: '0 0 20px rgba(200, 121, 82, 0.8)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: showLogo ? 1 : 0,
              opacity: showLogo ? [0, 1, 0.6, 1] : 0,
            }}
            transition={{ 
              duration: 2, 
              delay: 1.8, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          />
          
          {/* Second decorative underline */}
          <motion.div
            className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-champagne/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showLogo ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 2.3 }}
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
                  duration: 1.4,
                  delay: 0.5 + index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block font-cormorant font-light"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 12rem)',
                  letterSpacing: '0.4em',
                  lineHeight: 1,
                  color: '#F5EBDD',
                  textShadow: `
                    0 0 40px rgba(200, 121, 82, 0.6),
                    0 0 80px rgba(200, 121, 82, 0.3),
                    0 0 120px rgba(200, 121, 82, 0.15),
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
        
        {/* Tagline with typewriter feel */}
        <motion.p
          initial={{ opacity: 0, y: 20, letterSpacing: '1em' }}
          animate={showLogo ? { 
            opacity: 1, 
            y: 0, 
            letterSpacing: '0.05em',
          } : {}}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="mt-8 md:mt-10 font-cormorant italic text-center"
          style={{ 
            fontSize: 'clamp(1rem, 1.5vw, 1.375rem)',
            color: '#E4B590',
            textShadow: '0 0 20px rgba(232, 181, 148, 0.5)',
          }}
        >
          Where craftsmanship meets couture
        </motion.p>
        
        {/* Decorative diamond */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={showLogo ? { scale: 1, rotate: 45 } : {}}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-8 w-3 h-3 border border-gold/60 relative"
          style={{
            boxShadow: '0 0 10px rgba(200, 121, 82, 0.5)',
          }}
        >
          <motion.div
            className="absolute inset-0 border border-gold/40"
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        
        {/* Progress Bar with GLOWING */}
        <div className="mt-16 md:mt-20 w-64 md:w-80">
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={showBar ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[4px] rounded-full overflow-hidden origin-left"
            style={{
              background: 'linear-gradient(90deg, rgba(232, 181, 148, 0.1), rgba(200, 121, 82, 0.2), rgba(232, 181, 148, 0.1))',
              boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #8B4A32 0%, #C87952 30%, #E8B594 60%, #F5EBDD 100%)',
                boxShadow: `
                  0 0 20px rgba(200, 121, 82, 1),
                  0 0 40px rgba(200, 121, 82, 0.6),
                  0 0 60px rgba(200, 121, 82, 0.3)
                `,
              }}
            />
            
            {/* Double shimmer */}
            <motion.div
              className="absolute inset-y-0 w-32 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                filter: 'blur(4px)',
              }}
              animate={{ left: ['-15%', '110%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            
            <motion.div
              className="absolute inset-y-0 w-24 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(232, 181, 148, 0.6) 50%, transparent 100%)',
                filter: 'blur(3px)',
              }}
              animate={{ left: ['-15%', '110%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            />
            
            {/* Big glowing dot at end */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              style={{
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                background: '#F5EBDD',
                boxShadow: `
                  0 0 20px rgba(245, 235, 221, 1),
                  0 0 40px rgba(232, 181, 148, 0.8),
                  0 0 60px rgba(200, 121, 82, 0.5),
                  0 0 80px rgba(200, 121, 82, 0.3)
                `,
              }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Particles trailing behind progress */}
            {progress > 5 && [...Array(3)].map((_, i) => (
              <motion.div
                key={`trail-${i}`}
                className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold pointer-events-none"
                style={{
                  left: `${progress - (i + 1) * 3}%`,
                  boxShadow: '0 0 8px rgba(200, 121, 82, 0.8)',
                }}
                animate={{
                  opacity: [1, 0],
                  scale: [1, 0],
                  y: [0, -20],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={showBar ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-6 flex items-center justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -5, filter: 'blur(4px)' }}
                transition={{ duration: 0.5 }}
                className="text-tiny tracking-mega uppercase font-mono"
                style={{ 
                  fontSize: '0.6rem', 
                  letterSpacing: '0.3em',
                  color: '#E4B590',
                  textShadow: '0 0 8px rgba(232, 181, 148, 0.5)',
                }}
              >
                {messages[currentMessage]}
              </motion.p>
            </AnimatePresence>
            
            <motion.div 
              className="flex items-baseline gap-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span 
                className="text-tiny tracking-widest font-mono tabular-nums font-medium"
                style={{ 
                  fontSize: '0.8rem',
                  color: '#F5EBDD',
                  textShadow: '0 0 10px rgba(200, 121, 82, 0.8)',
                }}
              >
                {String(Math.floor(progress)).padStart(3, '0')}
              </span>
              <span 
                className="text-tiny font-mono"
                style={{ fontSize: '0.65rem', color: 'rgba(200, 121, 82, 0.7)' }}
              >
                %
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* ═══════════════════════════════════════════════
          BOLD SKIP BUTTON
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSkip && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-30"
          >
            <motion.button
              onClick={handleSkip}
              onMouseEnter={() => setSkipHovered(true)}
              onMouseLeave={() => setSkipHovered(false)}
              className="group relative inline-flex items-center gap-3 py-4 px-8 bg-gold text-noir rounded-full transition-all duration-500 hover:bg-champagne hover:scale-105"
              style={{
                boxShadow: `
                  0 0 40px rgba(200, 121, 82, 0.6),
                  0 0 80px rgba(200, 121, 82, 0.3),
                  0 10px 30px rgba(0, 0, 0, 0.5)
                `,
              }}
              data-cursor="hover"
              animate={{ y: [0, -6, 0] }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Pulsing outer glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Second outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
              
              <span 
                className="relative z-10 text-tiny tracking-widest uppercase font-bold"
                style={{ 
                  fontSize: '0.75rem', 
                  letterSpacing: '0.25em',
                }}
              >
                Skip Intro
              </span>
              
              <motion.div
                className="relative z-10 w-6 h-6 flex items-center justify-center rounded-full bg-noir/20"
                animate={{ x: skipHovered ? 3 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiArrowRight size={14} strokeWidth={2.5} />
              </motion.div>
            </motion.button>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.6] }}
              transition={{ duration: 3, delay: 0.3 }}
              className="mt-4 text-center font-cormorant italic text-champagne/70"
              style={{ fontSize: '0.85rem' }}
            >
              or wait for the magic ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
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
      `}</style>
    </motion.div>
  )
}

export default LoadingScreen