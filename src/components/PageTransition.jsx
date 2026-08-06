import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

const PageTransition = ({ children }) => {
  const [phase, setPhase] = useState('splash')
  
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('covered'), 400)
    const t2 = setTimeout(() => setPhase('dripping'), 800)
    const t3 = setTimeout(() => setPhase('clean'), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])
  
  // Generate unique drip data
  const drips = useMemo(() => (
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 2 + (i * 5) + (Math.random() * 3 - 1.5),
      width: 15 + Math.random() * 35,
      delay: Math.random() * 0.8,
      duration: 1.2 + Math.random() * 1,
      height: 30 + Math.random() * 50,
    }))
  ), [])
  
  const streaks = useMemo(() => (
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 3 + Math.random() * 94,
      width: 1 + Math.random() * 4,
      delay: 1 + Math.random() * 0.8,
      duration: 0.8 + Math.random() * 0.5,
      height: 15 + Math.random() * 35,
    }))
  ), [])
  
  const droplets = useMemo(() => (
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: 20 + Math.random() * 60,
      size: 3 + Math.random() * 8,
      delay: 0.8 + Math.random() * 1.2,
      duration: 0.6 + Math.random() * 0.8,
    }))
  ), [])
  
  const miniDrops = useMemo(() => (
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 5,
      delay: 0.5 + Math.random() * 1,
      duration: 0.8 + Math.random() * 0.6,
    }))
  ), [])
  
  return (
    <div className="liquid-transition-wrapper">
      
      {/* ═══════════════════════════════════════
          CONTENT — Revealed through liquid gaps
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          initial={{ filter: 'blur(6px)', scale: 1.01 }}
          animate={{ filter: 'blur(0px)', scale: 1 }}
          exit={{ filter: 'blur(4px)', scale: 0.99 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          style={{ minHeight: '100vh', width: '100%' }}
        >
          {children}
        </motion.div>
      </motion.div>
      
      {/* ═══════════════════════════════════════
          PHASE 1: LIQUID SPLASH ON GLASS
          Thick blob hits the glass
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ 
          clipPath: 'circle(0% at 50% 40%)',
          opacity: 1,
        }}
        animate={{ 
          clipPath: 'circle(150% at 50% 40%)',
          opacity: 1,
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-0 z-[9000] pointer-events-none"
        style={{ willChange: 'clip-path' }}
      >
        {/* Main liquid body on glass */}
        <div className="absolute inset-0 liquid-on-glass" />
        
        {/* Glossy highlight (moves across) */}
        <motion.div
          initial={{ x: '-100%', opacity: 0.8 }}
          animate={{ x: '200%', opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.25) 55%, transparent 70%)',
            willChange: 'transform',
          }}
        />
        
        {/* Second gloss sweep */}
        <motion.div
          initial={{ x: '-100%', opacity: 0.5 }}
          animate={{ x: '200%', opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 52%, transparent 60%)',
            willChange: 'transform',
          }}
        />
        
        {/* Rim light edges */}
        <div 
          className="absolute inset-0"
          style={{
            boxShadow: 'inset 0 0 100px rgba(200, 121, 82, 0.3), inset 0 0 200px rgba(42, 31, 26, 0.5)',
          }}
        />
      </motion.div>
      
      {/* ═══════════════════════════════════════
          PHASE 2: GRAVITY PULLS LIQUID DOWN
          Liquid slides off the glass
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '100vh' }}
        transition={{ 
          duration: 1.2, 
          delay: 0.6,
          ease: [0.55, 0, 1, 0.45],
        }}
        className="fixed inset-0 z-[9000] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 liquid-on-glass" />
        
        {/* Wobbling bottom edge (surface tension) */}
        <div className="absolute -bottom-1 left-0 right-0 liquid-drip-edge" />
        
        {/* Gloss on sliding liquid */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.2) 35%, transparent 50%, rgba(255,255,255,0.15) 65%, transparent 80%)',
          }}
        />
      </motion.div>
      
      {/* ═══════════════════════════════════════
          PHASE 3: THICK DRIPS (Individual streams)
          Each drip falls at different speed
      ═══════════════════════════════════════ */}
      <div className="fixed inset-0 z-[8999] pointer-events-none">
        {drips.map((drip) => (
          <motion.div
            key={`drip-${drip.id}`}
            initial={{ 
              y: 0,
              scaleY: 0.3,
              opacity: 1,
            }}
            animate={{ 
              y: '110vh',
              scaleY: [0.3, 1, 1.5, 1.2, 1],
              opacity: [1, 1, 1, 0.8, 0],
            }}
            transition={{ 
              duration: drip.duration,
              delay: drip.delay,
              ease: [0.45, 0, 0.55, 1],
            }}
            className="absolute origin-top"
            style={{
              left: `${drip.x}%`,
              width: `${drip.width}px`,
              height: `${drip.height}%`,
              willChange: 'transform, opacity',
            }}
          >
            {/* Drip body */}
            <div 
              className="w-full h-full relative"
              style={{
                background: `linear-gradient(180deg, 
                  rgba(42, 31, 26, 0.95) 0%, 
                  rgba(61, 46, 36, 0.9) 30%, 
                  rgba(200, 121, 82, 0.85) 50%, 
                  rgba(61, 46, 36, 0.9) 70%, 
                  rgba(42, 31, 26, 0.95) 100%
                )`,
                borderRadius: '40% 40% 50% 50% / 10% 10% 90% 90%',
                boxShadow: `
                  inset ${drip.width > 25 ? '4' : '2'}px 0 ${drip.width > 25 ? '8' : '4'}px rgba(255, 255, 255, 0.2),
                  inset -2px 0 6px rgba(0, 0, 0, 0.3),
                  2px 4px 8px rgba(0, 0, 0, 0.4)
                `,
              }}
            >
              {/* Glossy highlight on drip */}
              <div 
                className="absolute top-0 left-[15%] w-[30%] h-full rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* ═══════════════════════════════════════
          PHASE 4: FALLING DROPLETS
          Small round drops that detached
      ═══════════════════════════════════════ */}
      <div className="fixed inset-0 z-[9001] pointer-events-none">
        {droplets.map((drop) => (
          <motion.div
            key={`drop-${drop.id}`}
            initial={{ 
              y: `${drop.startY}vh`,
              scale: 1,
              opacity: 1,
            }}
            animate={{ 
              y: '110vh',
              scale: [1, 0.8, 1.1, 0.9],
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{ 
              duration: drop.duration,
              delay: drop.delay,
              ease: [0.55, 0, 1, 0.45],
            }}
            className="absolute"
            style={{
              left: `${drop.x}%`,
              width: drop.size,
              height: drop.size * 1.3,
              willChange: 'transform, opacity',
            }}
          >
            {/* Teardrop shape */}
            <div 
              className="w-full h-full"
              style={{
                background: drop.id % 3 === 0 
                  ? 'radial-gradient(ellipse at 30% 30%, #E8B594, #C87952, #8B4A32)' 
                  : drop.id % 3 === 1
                  ? 'radial-gradient(ellipse at 30% 30%, #5A4A3F, #3D2E24, #2A1F1A)'
                  : 'radial-gradient(ellipse at 30% 30%, #C87952, #8B4A32, #5C1E2E)',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                boxShadow: `
                  inset 1px -1px 3px rgba(255, 255, 255, 0.3),
                  inset -1px 1px 2px rgba(0, 0, 0, 0.4),
                  1px 2px 4px rgba(0, 0, 0, 0.5)
                `,
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* ═══════════════════════════════════════
          PHASE 5: MINI DROPS (tiny splashes)
      ═══════════════════════════════════════ */}
      <div className="fixed inset-0 z-[9002] pointer-events-none">
        {miniDrops.map((mini) => (
          <motion.div
            key={`mini-${mini.id}`}
            initial={{ 
              scale: 0,
              opacity: 0,
            }}
            animate={{ 
              scale: [0, 1.2, 0],
              opacity: [0, 0.8, 0],
              y: [0, 30],
            }}
            transition={{ 
              duration: mini.duration,
              delay: mini.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute rounded-full"
            style={{
              left: `${mini.x}%`,
              top: `${mini.y}%`,
              width: mini.size,
              height: mini.size,
              background: mini.id % 2 === 0 
                ? 'radial-gradient(circle at 30% 30%, #E8B594, #C87952)' 
                : 'radial-gradient(circle at 30% 30%, #5A4A3F, #3D2E24)',
              boxShadow: 'inset 1px -1px 2px rgba(255,255,255,0.3), 1px 1px 3px rgba(0,0,0,0.4)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
      
      {/* ═══════════════════════════════════════
          PHASE 6: GLASS STREAKS
          Thin liquid trails remaining on glass
      ═══════════════════════════════════════ */}
      <div className="fixed inset-0 z-[8998] pointer-events-none">
        {streaks.map((streak) => (
          <motion.div
            key={`streak-${streak.id}`}
            initial={{ 
              scaleY: 1,
              opacity: 0.5,
            }}
            animate={{ 
              scaleY: 0,
              opacity: 0,
            }}
            transition={{ 
              duration: streak.duration,
              delay: streak.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute origin-top"
            style={{
              left: `${streak.x}%`,
              top: 0,
              width: `${streak.width}px`,
              height: `${streak.height}%`,
              background: `linear-gradient(180deg, 
                rgba(200, 121, 82, 0.3) 0%, 
                rgba(200, 121, 82, 0.15) 50%, 
                rgba(200, 121, 82, 0) 100%
              )`,
              borderRadius: '0 0 50% 50%',
              boxShadow: 'inset 0 0 3px rgba(255, 255, 255, 0.15)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
      
      {/* ═══════════════════════════════════════
          PHASE 7: GOLDEN IMPACT FLASH
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.5, times: [0, 0.2, 1] }}
        className="fixed inset-0 z-[8997] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(200, 121, 82, 0.5) 0%, transparent 60%)',
        }}
      />
      
      {/* ═══════════════════════════════════════
          PHASE 8: GLASS DISTORTION OVERLAY
          Subtle refraction where liquid was
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
        className="fixed inset-0 z-[8996] pointer-events-none"
        style={{
          backdropFilter: 'blur(2px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(2px) saturate(1.3)',
        }}
      />
      
      {/* ═══════════════════════════════════════
          CSS FOR LIQUID EFFECTS
      ═══════════════════════════════════════ */}
      <style>{`
        /* Main liquid on glass surface */
        .liquid-on-glass {
          background: linear-gradient(
            180deg,
            rgba(42, 31, 26, 0.97) 0%,
            rgba(61, 46, 36, 0.95) 20%,
            rgba(200, 121, 82, 0.9) 40%,
            rgba(139, 74, 50, 0.92) 50%,
            rgba(200, 121, 82, 0.9) 60%,
            rgba(61, 46, 36, 0.95) 80%,
            rgba(42, 31, 26, 0.97) 100%
          );
          box-shadow: 
            inset 0 0 60px rgba(0, 0, 0, 0.5),
            inset 0 10px 30px rgba(255, 255, 255, 0.1);
        }
        
        /* Wobbling drip edge at bottom */
        .liquid-drip-edge {
          height: 120px;
          background: rgba(42, 31, 26, 0.97);
          border-radius: 0 0 30% 70% / 0 0 100% 100%;
          animation: dripEdgeWobble 0.6s ease-in-out;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.5),
            inset 0 -10px 20px rgba(200, 121, 82, 0.3);
        }
        
        @keyframes dripEdgeWobble {
          0% { border-radius: 0 0 50% 50% / 0 0 100% 100%; }
          15% { border-radius: 0 0 30% 70% / 0 0 60% 140%; }
          30% { border-radius: 0 0 70% 30% / 0 0 140% 60%; }
          45% { border-radius: 0 0 40% 60% / 0 0 80% 120%; }
          60% { border-radius: 0 0 60% 40% / 0 0 120% 80%; }
          75% { border-radius: 0 0 45% 55% / 0 0 90% 110%; }
          100% { border-radius: 0 0 50% 50% / 0 0 100% 100%; }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .liquid-on-glass,
          .liquid-drip-edge {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default PageTransition