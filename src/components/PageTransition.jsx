import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

const PageTransition = ({ children }) => {
  const [showEffects, setShowEffects] = useState(true)
  
  // Hide ALL effects after transition completes
  useEffect(() => {
    const timer = setTimeout(() => setShowEffects(false), 2500)
    return () => clearTimeout(timer)
  }, [])
  
  // Generate unique drip data
  const drips = useMemo(() => (
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 3 + (i * 6.5),
      width: 15 + Math.random() * 30,
      delay: 0.3 + Math.random() * 0.6,
      duration: 1 + Math.random() * 0.8,
      height: 25 + Math.random() * 40,
    }))
  ), [])
  
  const droplets = useMemo(() => (
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: 20 + Math.random() * 50,
      size: 3 + Math.random() * 7,
      delay: 0.6 + Math.random() * 1,
      duration: 0.5 + Math.random() * 0.6,
    }))
  ), [])
  
  const streaks = useMemo(() => (
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      width: 1 + Math.random() * 3,
      delay: 1.2 + Math.random() * 0.5,
      height: 15 + Math.random() * 30,
    }))
  ), [])
  
  return (
    <div className="liquid-transition-wrapper">
      
      {/* ═══════════════════════════════════════
          CONTENT — Always visible underneath
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(6px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{ minHeight: '100vh', width: '100%' }}
      >
        {children}
      </motion.div>
      
      {/* ═══════════════════════════════════════
          ALL LIQUID EFFECTS (disappear after 2.5s)
      ═══════════════════════════════════════ */}
      {showEffects && (
        <>
          {/* PHASE 1: Liquid splashes onto glass (circle expand) */}
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 40%)' }}
            animate={{ 
              clipPath: [
                'circle(0% at 50% 40%)',
                'circle(150% at 50% 40%)',
                'circle(150% at 50% 40%)',
              ],
              opacity: [1, 1, 0],
            }}
            transition={{ 
              duration: 1.8, 
              times: [0, 0.25, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[9000] pointer-events-none"
          >
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, 
                  rgba(42, 31, 26, 0.97) 0%, 
                  rgba(61, 46, 36, 0.95) 20%, 
                  rgba(200, 121, 82, 0.9) 45%, 
                  rgba(139, 74, 50, 0.92) 55%, 
                  rgba(61, 46, 36, 0.95) 80%, 
                  rgba(42, 31, 26, 0.97) 100%
                )`,
                boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.5)',
              }}
            />
            
            {/* Glossy highlight sweep */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 48%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 52%, transparent 70%)',
              }}
            />
          </motion.div>
          
          {/* PHASE 2: Main liquid slides DOWN with gravity */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: '120vh', opacity: [1, 1, 0] }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              ease: [0.55, 0, 1, 0.45],
            }}
            className="fixed inset-0 z-[8999] pointer-events-none"
          >
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, 
                  rgba(42, 31, 26, 0.97) 0%, 
                  rgba(200, 121, 82, 0.9) 50%, 
                  rgba(42, 31, 26, 0.97) 100%
                )`,
              }}
            />
            
            {/* Wobbling bottom edge */}
            <div 
              className="absolute -bottom-1 left-0 right-0"
              style={{
                height: '100px',
                background: 'rgba(42, 31, 26, 0.97)',
                borderRadius: '0 0 40% 60% / 0 0 100% 100%',
                animation: 'dripWobble 0.5s ease-in-out',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              }}
            />
            
            {/* Gloss on sliding liquid */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.15) 40%, transparent 60%)',
              }}
            />
          </motion.div>
          
          {/* PHASE 3: Thick drip streams */}
          {drips.map((drip) => (
            <motion.div
              key={`drip-${drip.id}`}
              initial={{ y: 0, scaleY: 0.3, opacity: 1 }}
              animate={{ 
                y: '120vh', 
                scaleY: [0.3, 1, 1.5, 1.2, 1],
                opacity: [1, 1, 1, 0.7, 0],
              }}
              transition={{ 
                duration: drip.duration,
                delay: drip.delay,
                ease: [0.45, 0, 0.55, 1],
              }}
              className="fixed origin-top z-[9001] pointer-events-none"
              style={{
                left: `${drip.x}%`,
                top: 0,
                width: `${drip.width}px`,
                height: `${drip.height}%`,
              }}
            >
              <div 
                className="w-full h-full"
                style={{
                  background: `linear-gradient(180deg, 
                    rgba(42, 31, 26, 0.95) 0%, 
                    rgba(200, 121, 82, 0.85) 50%, 
                    rgba(42, 31, 26, 0.95) 100%
                  )`,
                  borderRadius: '40% 40% 50% 50% / 5% 5% 95% 95%',
                  boxShadow: `
                    inset 2px 0 6px rgba(255, 255, 255, 0.2),
                    inset -2px 0 4px rgba(0, 0, 0, 0.3),
                    2px 4px 8px rgba(0, 0, 0, 0.4)
                  `,
                }}
              >
                <div 
                  className="absolute top-0 left-[15%] w-[25%] h-full rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
          
          {/* PHASE 4: Falling droplets */}
          {droplets.map((drop) => (
            <motion.div
              key={`drop-${drop.id}`}
              initial={{ y: `${drop.startY}vh`, scale: 1, opacity: 1 }}
              animate={{ 
                y: '120vh',
                scale: [1, 0.8, 1.1, 0.9],
                opacity: [1, 1, 0.7, 0],
              }}
              transition={{ 
                duration: drop.duration,
                delay: drop.delay,
                ease: [0.55, 0, 1, 0.45],
              }}
              className="fixed z-[9002] pointer-events-none"
              style={{
                left: `${drop.x}%`,
                width: drop.size,
                height: drop.size * 1.4,
              }}
            >
              <div 
                className="w-full h-full"
                style={{
                  background: drop.id % 2 === 0 
                    ? 'radial-gradient(ellipse at 30% 30%, #E8B594, #C87952, #8B4A32)' 
                    : 'radial-gradient(ellipse at 30% 30%, #5A4A3F, #3D2E24, #2A1F1A)',
                  borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                  boxShadow: 'inset 1px -1px 3px rgba(255,255,255,0.3), 1px 2px 4px rgba(0,0,0,0.5)',
                }}
              />
            </motion.div>
          ))}
          
          {/* PHASE 5: Glass streaks (fade last) */}
          {streaks.map((streak) => (
            <motion.div
              key={`streak-${streak.id}`}
              initial={{ scaleY: 1, opacity: 0.4 }}
              animate={{ scaleY: 0, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                delay: streak.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed origin-top z-[8998] pointer-events-none"
              style={{
                left: `${streak.x}%`,
                top: 0,
                width: `${streak.width}px`,
                height: `${streak.height}%`,
                background: `linear-gradient(180deg, rgba(200, 121, 82, 0.3) 0%, transparent 100%)`,
                borderRadius: '0 0 50% 50%',
              }}
            />
          ))}
          
          {/* PHASE 6: Impact flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.4, times: [0, 0.2, 1] }}
            className="fixed inset-0 z-[8997] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 40%, rgba(200, 121, 82, 0.5) 0%, transparent 60%)',
            }}
          />
        </>
      )}
      
      <style>{`
        @keyframes dripWobble {
          0% { border-radius: 0 0 50% 50% / 0 0 100% 100%; }
          20% { border-radius: 0 0 30% 70% / 0 0 60% 140%; }
          40% { border-radius: 0 0 70% 30% / 0 0 140% 60%; }
          60% { border-radius: 0 0 40% 60% / 0 0 80% 120%; }
          80% { border-radius: 0 0 55% 45% / 0 0 110% 90%; }
          100% { border-radius: 0 0 50% 50% / 0 0 100% 100%; }
        }
      `}</style>
    </div>
  )
}

export default PageTransition