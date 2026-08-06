import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const PageTransition = ({ children }) => {
  const [showLiquid, setShowLiquid] = useState(true)
  const [noiseFreq, setNoiseFreq] = useState(0.015)
  const [liquidY, setLiquidY] = useState(0)
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)
  
  // Animate liquid sliding down with accelerating gravity
  useEffect(() => {
    startTimeRef.current = performance.now()
    
    const animate = (now) => {
      const elapsed = (now - startTimeRef.current) / 1000
      
      // Phase 1: Hold (0-0.4s) — liquid covers screen
      // Phase 2: Slide (0.4-1.8s) — gravity pulls liquid down
      // Phase 3: Clean (1.8s+) — remove everything
      
      if (elapsed < 0.4) {
        // Hold phase - liquid stays, noise increases
        setNoiseFreq(0.015 + elapsed * 0.02)
        setLiquidY(0)
      } else if (elapsed < 1.8) {
        // Gravity phase - accelerating downward
        const gravityTime = elapsed - 0.4
        const gravity = gravityTime * gravityTime * 1.2 // Accelerating
        setLiquidY(gravity * 100)
        
        // Noise increases as liquid stretches
        setNoiseFreq(0.015 + gravityTime * 0.04)
      } else {
        // Clean phase
        setShowLiquid(false)
        return
      }
      
      rafRef.current = requestAnimationFrame(animate)
    }
    
    rafRef.current = requestAnimationFrame(animate)
    
    // Safety cleanup
    const safetyTimer = setTimeout(() => setShowLiquid(false), 3000)
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearTimeout(safetyTimer)
    }
  }, [])
  
  return (
    <div className="liquid-glass-wrapper">
      
      {/* ═══════════════════════════════════════
          SVG FILTERS (The magic sauce!)
          Creates organic liquid edges
      ═══════════════════════════════════════ */}
      <svg className="fixed" style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          {/* GOOEY FILTER — Makes shapes merge like liquid */}
          <filter id="liquid-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 25 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          
          {/* DISTORTION FILTER — Warps edges organically */}
          <filter id="liquid-distort" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={noiseFreq}
              numOctaves="3"
              seed="42"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015;0.025;0.035;0.02"
                dur="2s"
                repeatCount="1"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          
          {/* GLASS REFRACTION — Distorts content behind liquid */}
          <filter id="glass-refract" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
      </svg>
      
      {/* ═══════════════════════════════════════
          CONTENT — Page underneath
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{ minHeight: '100vh', width: '100%' }}
      >
        {children}
      </motion.div>
      
      {/* ═══════════════════════════════════════
          THE LIQUID — One connected mass
      ═══════════════════════════════════════ */}
      {showLiquid && (
        <>
          {/* Main liquid body with gooey filter */}
          <div 
            className="fixed inset-0 z-[9000] pointer-events-none"
            style={{ filter: 'url(#liquid-distort)' }}
          >
            <motion.div
              initial={{ y: '-5%' }}
              animate={{ y: `${liquidY}%` }}
              className="absolute left-0 right-0"
              style={{
                top: '-20%',
                height: '140%',
                willChange: 'transform',
              }}
            >
              {/* Connected liquid mass with gooey effect */}
              <div 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  filter: 'url(#liquid-goo)',
                }}
              >
                {/* Main body blob */}
                <div 
                  className="absolute left-0 right-0"
                  style={{
                    top: '10%',
                    height: '75%',
                    background: `linear-gradient(180deg, 
                      #2A1F1A 0%, 
                      #3D2E24 15%,
                      #6B4A35 30%,
                      #C87952 45%,
                      #E8B594 50%,
                      #C87952 55%,
                      #6B4A35 70%,
                      #3D2E24 85%,
                      #2A1F1A 100%
                    )`,
                    borderRadius: '0% 0% 50% 50% / 0% 0% 20% 20%',
                  }}
                />
                
                {/* Connected drip bulges at bottom
                    These MERGE with main body via gooey filter! */}
                {[
                  { left: '8%', size: 60, delay: 0 },
                  { left: '18%', size: 45, delay: 0.1 },
                  { left: '30%', size: 70, delay: 0.05 },
                  { left: '42%', size: 50, delay: 0.15 },
                  { left: '55%', size: 65, delay: 0.08 },
                  { left: '65%', size: 40, delay: 0.2 },
                  { left: '75%', size: 55, delay: 0.12 },
                  { left: '85%', size: 48, delay: 0.07 },
                  { left: '93%', size: 58, delay: 0.18 },
                ].map((drip, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, scaleY: 0.5 }}
                    animate={{ 
                      y: [0, 20, 80, 200],
                      scaleY: [0.5, 1, 1.8, 2.5],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + drip.delay,
                      ease: [0.55, 0, 1, 0.45],
                    }}
                    className="absolute origin-top"
                    style={{
                      left: drip.left,
                      top: '82%',
                      width: drip.size,
                      height: drip.size * 2.5,
                      background: 'radial-gradient(ellipse at 40% 20%, #6B4A35, #3D2E24, #2A1F1A)',
                      borderRadius: '45% 45% 50% 50% / 20% 20% 80% 80%',
                    }}
                  />
                ))}
                
                {/* Extra small drip bulges (merge together) */}
                {[
                  { left: '12%', size: 30 },
                  { left: '25%', size: 25 },
                  { left: '38%', size: 35 },
                  { left: '50%', size: 28 },
                  { left: '60%', size: 32 },
                  { left: '72%', size: 26 },
                  { left: '80%', size: 33 },
                  { left: '90%', size: 29 },
                ].map((drip, i) => (
                  <motion.div
                    key={`small-${i}`}
                    initial={{ y: 0, scaleY: 0.3 }}
                    animate={{ 
                      y: [0, 30, 120, 300],
                      scaleY: [0.3, 0.8, 1.5, 2],
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.7 + i * 0.06,
                      ease: [0.55, 0, 1, 0.45],
                    }}
                    className="absolute origin-top"
                    style={{
                      left: drip.left,
                      top: '84%',
                      width: drip.size,
                      height: drip.size * 2,
                      background: 'radial-gradient(ellipse at 40% 20%, #5A4A3F, #3D2E24)',
                      borderRadius: '45% 45% 50% 50% / 15% 15% 85% 85%',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Glossy highlight layer (sweeps across liquid) */}
          <motion.div
            initial={{ x: '-100%', opacity: 0.8 }}
            animate={{ x: '200%', opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="fixed inset-0 z-[9001] pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 48%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 52%, transparent 65%)',
            }}
          />
          
          {/* Second gloss sweep (delayed, softer) */}
          <motion.div
            initial={{ x: '-100%', opacity: 0.4 }}
            animate={{ x: '200%', opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[9001] pointer-events-none"
            style={{
              background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.2) 49%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.2) 51%, transparent 60%)',
            }}
          />
          
          {/* Glass refraction where liquid exists */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-[8998] pointer-events-none"
            style={{
              backdropFilter: 'blur(3px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(3px) saturate(1.4)',
              maskImage: 'linear-gradient(180deg, black 0%, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 60%, transparent 100%)',
            }}
          />
          
          {/* Detaching droplets (fall AFTER separating from body) */}
          <div className="fixed inset-0 z-[9002] pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`detach-${i}`}
                initial={{ 
                  y: `${50 + Math.random() * 30}vh`,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{ 
                  y: '120vh',
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 0.8, 0.6],
                }}
                transition={{ 
                  duration: 0.7 + Math.random() * 0.4,
                  delay: 1 + Math.random() * 0.6,
                  ease: [0.55, 0, 1, 0.45],
                }}
                className="absolute"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  width: `${4 + Math.random() * 8}px`,
                  height: `${6 + Math.random() * 12}px`,
                  background: i % 2 === 0 
                    ? 'radial-gradient(ellipse at 35% 25%, #C87952, #6B4A35, #3D2E24)' 
                    : 'radial-gradient(ellipse at 35% 25%, #E8B594, #C87952, #8B4A32)',
                  borderRadius: '50% 50% 50% 50% / 35% 35% 65% 65%',
                  boxShadow: 'inset 1px -1px 2px rgba(255,255,255,0.25), 1px 2px 3px rgba(0,0,0,0.4)',
                }}
              />
            ))}
          </div>
          
          {/* Glass streaks (thin residue on glass) */}
          <div className="fixed inset-0 z-[8997] pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`residue-${i}`}
                initial={{ scaleY: 1, opacity: 0.3 }}
                animate={{ scaleY: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 1.5 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute origin-top"
                style={{
                  left: `${8 + i * 12}%`,
                  top: 0,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${20 + Math.random() * 30}%`,
                  background: `linear-gradient(180deg, rgba(200, 121, 82, 0.25) 0%, transparent 100%)`,
                  borderRadius: '0 0 50% 50%',
                }}
              />
            ))}
          </div>
          
          {/* Impact flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.35, times: [0, 0.25, 1] }}
            className="fixed inset-0 z-[8996] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 35%, rgba(200, 121, 82, 0.5) 0%, transparent 60%)',
            }}
          />
        </>
      )}
    </div>
  )
}

export default PageTransition