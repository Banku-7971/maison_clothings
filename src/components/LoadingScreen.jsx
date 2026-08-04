import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — ULTRA-OPTIMIZED LOADING SCREEN
// 60fps smooth on ALL devices
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
  
  const DURATION = 5000
  
  const messages = [
    'Curating your experience',
    'Preparing the atelier',
    'Awakening the collection',
    'Refining the details',
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
    
    const logoTimer = setTimeout(() => setShowLogo(true), 300)
    const barTimer = setTimeout(() => setShowBar(true), 1400)
    const skipTimer = setTimeout(() => setShowSkip(true), 900)
    
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 800)
    
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
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden loading-screen-container"
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
      {/* Breathing backgrounds */}
      <div className="absolute inset-0 pointer-events-none breathing-bg" />
      <div className="absolute inset-0 pointer-events-none breathing-bg-2" />
      
      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none aurora-effect" />
      
      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none film-grain" />
      
      {/* Light beam */}
      <div className="absolute inset-0 pointer-events-none light-beam" />
      
      {/* 4 orbs (reduced from 6) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="ambient-orb orb-4" />
      </div>
      
      {/* 20 particles (reduced from 25) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`particle-${i}`}
            className={`particle particle-${(i % 4) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${9 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* 8 sparkles (reduced from 12) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* 10 gold dust (reduced from 15) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={`dust-${i}`}
            className="gold-dust"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${9 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* 8 constellation dots (reduced from 10) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={`const-${i}`}
            className="constellation-dot"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      {/* 3 orbital rings (reduced from 4) */}
      <div className="orbital-ring ring-1" />
      <div className="orbital-ring ring-2" />
      <div className="orbital-ring ring-3" />
      
      {/* 2 orbiting dots (reduced from 3) */}
      <div className="ring-orbit ring-orbit-1">
        <div className="orbit-dot orbit-dot-gold" />
      </div>
      <div className="ring-orbit ring-orbit-2">
        <div className="orbit-dot orbit-dot-champagne" />
      </div>
      
      {/* 2 ripples (reduced from 3) */}
      <div className="ripple ripple-1" />
      <div className="ripple ripple-2" />
      
      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-6">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p 
            className="text-tiny tracking-mega uppercase font-mono"
            style={{ 
              fontSize: '0.65rem', 
              letterSpacing: '0.4em',
              color: '#E4B590',
            }}
          >
            Est. Kolkata · 2025
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>
        
        <div className="flex items-center justify-center relative">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] logo-underline"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: showLogo ? 1 : 0,
              opacity: showLogo ? 1 : 0,
            }}
            transition={{ 
              duration: 2, 
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
                  delay: 0.4 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block font-cormorant font-light logo-letter"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 12rem)',
                  letterSpacing: '0.4em',
                  lineHeight: 1,
                  color: '#F5EBDD',
                  transformStyle: 'preserve-3d',
                  paddingLeft: index === 0 ? '0.2em' : 0,
                }}
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showLogo ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 2.2 }}
          className="mt-8 md:mt-10 font-cormorant italic text-center"
          style={{ 
            fontSize: 'clamp(1rem, 1.5vw, 1.375rem)',
            color: '#E4B590',
          }}
        >
          Where craftsmanship meets couture
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={showLogo ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mt-8 diamond-decoration"
        />
        
        <div className="mt-16 md:mt-20 w-64 md:w-80">
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={showBar ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[4px] rounded-full overflow-hidden origin-left progress-track"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div className="progress-shimmer" />
            <div
              className="absolute top-1/2 -translate-y-1/2 progress-dot"
              style={{
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={showBar ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="mt-6 flex items-center justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
                className="text-tiny tracking-mega uppercase font-mono"
                style={{ 
                  fontSize: '0.6rem', 
                  letterSpacing: '0.3em',
                  color: '#E4B590',
                }}
              >
                {messages[currentMessage]}
              </motion.p>
            </AnimatePresence>
            
            <div className="flex items-baseline gap-1">
              <span className="text-tiny tracking-widest font-mono tabular-nums font-medium progress-counter">
                {String(Math.floor(progress)).padStart(3, '0')}
              </span>
              <span 
                className="text-tiny font-mono"
                style={{ fontSize: '0.65rem', color: 'rgba(200, 121, 82, 0.7)' }}
              >
                %
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {showSkip && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-30"
          >
            <button
              onClick={handleSkip}
              onMouseEnter={() => setSkipHovered(true)}
              onMouseLeave={() => setSkipHovered(false)}
              className="skip-button group relative inline-flex items-center gap-3 py-4 px-8 bg-gold text-noir rounded-full transition-all duration-500 hover:bg-champagne hover:scale-105"
              data-cursor="hover"
            >
              <div className="skip-button-glow" />
              <div className="skip-button-ring" />
              
              <span 
                className="relative z-10 text-tiny tracking-widest uppercase font-bold"
                style={{ fontSize: '0.75rem', letterSpacing: '0.25em' }}
              >
                Skip Intro
              </span>
              
              <div
                className="relative z-10 w-6 h-6 flex items-center justify-center rounded-full bg-noir/20 skip-arrow"
                style={{
                  transform: skipHovered ? 'translateX(3px)' : 'translateX(0)',
                  transition: 'transform 0.3s',
                }}
              >
                <FiArrowRight size={14} strokeWidth={2.5} />
              </div>
            </button>
            
            <p
              className="mt-4 text-center font-cormorant italic text-champagne/70"
              style={{ fontSize: '0.85rem' }}
            >
              or wait for the magic ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ═══════════════════════════════════════════════
          OPTIMIZED CSS — GPU accelerated
      ═══════════════════════════════════════════════ */}
      <style>{`
        /* Force GPU acceleration + Contain paint area */
        .loading-screen-container {
          contain: strict;
          will-change: transform, opacity;
        }
        
        .loading-screen-container * {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* BREATHING BACKGROUNDS - reduced blur intensity */
        .breathing-bg {
          background: radial-gradient(circle at center, rgba(200, 121, 82, 0.3) 0%, transparent 60%);
          animation: breathe 6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        .breathing-bg-2 {
          background: radial-gradient(circle at 30% 70%, rgba(92, 30, 46, 0.3) 0%, transparent 50%);
          animation: breathe 8s ease-in-out infinite 1s;
          will-change: transform, opacity;
        }
        
        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: scale(1) translateZ(0); }
          50% { opacity: 0.65; transform: scale(1.08) translateZ(0); }
        }
        
        /* AURORA - lighter version */
        .aurora-effect {
          background: linear-gradient(45deg, transparent 30%, rgba(200, 121, 82, 0.12) 50%, transparent 70%);
          animation: aurora 12s linear infinite;
          will-change: transform;
        }
        
        @keyframes aurora {
          0% { transform: translateX(-100%) translateZ(0); }
          100% { transform: translateX(100%) translateZ(0); }
        }
        
        /* FILM GRAIN */
        .film-grain {
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: grainMove 8s steps(6) infinite;
          will-change: transform;
        }
        
        @keyframes grainMove {
          0%, 100% { transform: translate(0, 0) translateZ(0); }
          25% { transform: translate(-10%, 5%) translateZ(0); }
          50% { transform: translate(5%, -10%) translateZ(0); }
          75% { transform: translate(-5%, 10%) translateZ(0); }
        }
        
        /* LIGHT BEAM */
        .light-beam {
          background: linear-gradient(90deg, transparent 45%, rgba(200, 121, 82, 0.25) 50%, transparent 55%);
          animation: lightBeam 5s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.35;
          will-change: transform;
        }
        
        @keyframes lightBeam {
          0% { transform: translateX(-100%) translateZ(0); }
          100% { transform: translateX(100%) translateZ(0); }
        }
        
        /* AMBIENT ORBS - SMALLER BLUR (main performance killer) */
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation: orbFloat 14s ease-in-out infinite;
          will-change: transform;
        }
        
        .orb-1 {
          top: 10%; left: 10%;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.25) 0%, transparent 70%);
          animation-delay: 0s;
        }
        .orb-2 {
          top: 65%; left: 75%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(232, 181, 148, 0.25) 0%, transparent 70%);
          animation-delay: 2s;
        }
        .orb-3 {
          top: 75%; left: 15%;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(92, 30, 46, 0.25) 0%, transparent 70%);
          animation-delay: 4s;
        }
        .orb-4 {
          top: 20%; left: 80%;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(183, 110, 93, 0.25) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) translateZ(0); }
          50% { transform: translate(30px, -40px) translateZ(0); }
        }
        
        /* PARTICLES - simplified shadows */
        .particle {
          position: absolute;
          border-radius: 50%;
          bottom: -20px;
          animation: particleRise linear infinite;
          will-change: transform, opacity;
        }
        
        .particle-1 {
          width: 2px; height: 2px;
          background: #C87952;
          box-shadow: 0 0 4px rgba(200, 121, 82, 0.6);
        }
        .particle-2 {
          width: 3px; height: 3px;
          background: #E8B594;
          box-shadow: 0 0 6px rgba(232, 181, 148, 0.6);
        }
        .particle-3 {
          width: 1.5px; height: 1.5px;
          background: #F5EBDD;
          box-shadow: 0 0 3px rgba(245, 235, 221, 0.6);
        }
        .particle-4 {
          width: 2.5px; height: 2.5px;
          background: #C87952;
          box-shadow: 0 0 5px rgba(200, 121, 82, 0.5);
        }
        
        @keyframes particleRise {
          0% {
            transform: translateY(0) translateZ(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-110vh) translateZ(0);
            opacity: 0;
          }
        }
        
        /* SPARKLES */
        .sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: sparkleTwinkle 3s ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        .sparkle::before,
        .sparkle::after {
          content: '';
          position: absolute;
          background: #E8B594;
          box-shadow: 0 0 4px rgba(232, 181, 148, 0.8);
        }
        
        .sparkle::before {
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          transform: translateY(-50%);
        }
        
        .sparkle::after {
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          transform: translateX(-50%);
        }
        
        @keyframes sparkleTwinkle {
          0%, 100% { transform: scale(0) rotate(0deg) translateZ(0); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg) translateZ(0); opacity: 1; }
        }
        
        /* GOLD DUST */
        .gold-dust {
          position: absolute;
          top: -10px;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #C87952;
          box-shadow: 0 0 3px rgba(200, 121, 82, 0.7);
          animation: dustFall linear infinite;
          will-change: transform, opacity;
        }
        
        @keyframes dustFall {
          0% {
            transform: translateY(0) translateZ(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(110vh) translateZ(0);
            opacity: 0;
          }
        }
        
        /* CONSTELLATION DOTS */
        .constellation-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #E8B594;
          box-shadow: 0 0 6px rgba(232, 181, 148, 0.8);
          animation: constellationPulse 2.5s ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        @keyframes constellationPulse {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.4; }
          50% { transform: scale(1.4) translateZ(0); opacity: 1; }
        }
        
        /* ORBITAL RINGS - simplified */
        .orbital-ring {
          position: absolute;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          will-change: transform;
        }
        
        .ring-1 {
          width: 500px; height: 500px;
          border: 1px solid rgba(200, 121, 82, 0.12);
          margin: -250px 0 0 -250px;
          animation: ringRotate 35s linear infinite;
        }
        
        .ring-2 {
          width: 700px; height: 700px;
          border: 1px dashed rgba(232, 181, 148, 0.08);
          margin: -350px 0 0 -350px;
          animation: ringRotate 50s linear infinite reverse;
        }
        
        .ring-3 {
          width: 900px; height: 900px;
          border: 1px solid rgba(200, 121, 82, 0.06);
          margin: -450px 0 0 -450px;
          animation: ringRotate 70s linear infinite;
        }
        
        @keyframes ringRotate {
          from { transform: rotate(0deg) translateZ(0); }
          to { transform: rotate(360deg) translateZ(0); }
        }
        
        /* ORBITING DOTS */
        .ring-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          will-change: transform;
        }
        
        .ring-orbit-1 {
          width: 500px; height: 500px;
          margin: -250px 0 0 -250px;
          animation: ringRotate 15s linear infinite;
        }
        
        .ring-orbit-2 {
          width: 700px; height: 700px;
          margin: -350px 0 0 -350px;
          animation: ringRotate 20s linear infinite reverse;
        }
        
        .orbit-dot {
          position: absolute;
          border-radius: 50%;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          animation: dotPulse 2s ease-in-out infinite;
          will-change: transform;
        }
        
        .orbit-dot-gold {
          width: 10px; height: 10px;
          background: #C87952;
          box-shadow: 0 0 15px rgba(200, 121, 82, 1);
        }
        
        .orbit-dot-champagne {
          width: 8px; height: 8px;
          background: #E8B594;
          box-shadow: 0 0 12px rgba(232, 181, 148, 1);
        }
        
        @keyframes dotPulse {
          0%, 100% { transform: translateX(-50%) scale(1) translateZ(0); }
          50% { transform: translateX(-50%) scale(1.4) translateZ(0); }
        }
        
        /* RIPPLES */
        .ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(200, 121, 82, 0.35);
          animation: rippleExpand 5s ease-out infinite;
          will-change: transform, opacity;
        }
        
        .ripple-1 { animation-delay: 0s; }
        .ripple-2 { animation-delay: 2s; }
        
        @keyframes rippleExpand {
          0% {
            width: 100px; height: 100px;
            margin: -50px 0 0 -50px;
            opacity: 0.7;
          }
          100% {
            width: 800px; height: 800px;
            margin: -400px 0 0 -400px;
            opacity: 0;
          }
        }
        
        /* LOGO */
        .logo-underline {
          background: linear-gradient(90deg, transparent, #C87952, #E8B594, #C87952, transparent);
          box-shadow: 0 0 15px rgba(200, 121, 82, 0.7);
        }
        
        .logo-letter {
          text-shadow:
            0 0 30px rgba(200, 121, 82, 0.5),
            0 0 60px rgba(200, 121, 82, 0.2);
        }
        
        /* DIAMOND */
        .diamond-decoration {
          width: 12px;
          height: 12px;
          border: 1px solid rgba(200, 121, 82, 0.6);
          transform: rotate(45deg);
          box-shadow: 0 0 8px rgba(200, 121, 82, 0.4);
          animation: diamondSpin 12s linear infinite;
          will-change: transform;
        }
        
        @keyframes diamondSpin {
          0% { transform: rotate(45deg) translateZ(0); }
          100% { transform: rotate(405deg) translateZ(0); }
        }
        
        /* PROGRESS BAR */
        .progress-track {
          background: linear-gradient(90deg, rgba(232, 181, 148, 0.1), rgba(200, 121, 82, 0.2), rgba(232, 181, 148, 0.1));
        }
        
        .progress-fill {
          background: linear-gradient(90deg, #8B4A32 0%, #C87952 40%, #E8B594 100%);
          box-shadow: 0 0 15px rgba(200, 121, 82, 0.9);
          transition: width 0.1s linear;
        }
        
        .progress-shimmer {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 128px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
          animation: shimmerMove 1.8s linear infinite;
          will-change: transform;
        }
        
        @keyframes shimmerMove {
          0% { transform: translateX(-115%) translateZ(0); }
          100% { transform: translateX(410%) translateZ(0); }
        }
        
        .progress-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #F5EBDD;
          box-shadow:
            0 0 15px rgba(245, 235, 221, 1),
            0 0 30px rgba(232, 181, 148, 0.7);
          animation: dotPulse 1s ease-in-out infinite;
          transition: left 0.1s linear;
        }
        
        .progress-counter {
          font-size: 0.8rem;
          color: #F5EBDD;
          text-shadow: 0 0 8px rgba(200, 121, 82, 0.7);
        }
        
        /* SKIP BUTTON */
        .skip-button {
          box-shadow:
            0 0 30px rgba(200, 121, 82, 0.5),
            0 10px 25px rgba(0, 0, 0, 0.4);
          animation: skipFloat 2.5s ease-in-out infinite;
          will-change: transform;
        }
        
        @keyframes skipFloat {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-5px) translateZ(0); }
        }
        
        .skip-button-glow {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #C87952;
          animation: skipGlow 2s ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        @keyframes skipGlow {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.6; }
          50% { transform: scale(1.15) translateZ(0); opacity: 0; }
        }
        
        .skip-button-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid #C87952;
          animation: skipRing 2.5s ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        @keyframes skipRing {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.3; }
          50% { transform: scale(1.35) translateZ(0); opacity: 0; }
        }
        
        /* MOBILE OPTIMIZATIONS */
        @media (max-width: 768px) {
          .ambient-orb {
            filter: blur(35px);
          }
          
          .ring-3 {
            display: none; /* Hide outermost ring on mobile */
          }
        }
        
        /* RESPECT reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .loading-screen-container * {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default LoadingScreen