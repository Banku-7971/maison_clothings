import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const PageTransition = ({ children }) => {
  const [showLiquid, setShowLiquid] = useState(true)
  const turbulenceRef = useRef(null)
  const displacementRef = useRef(null)
  
  const liquidProgress = useMotionValue(0)
  
  // Derived motion values (no React re-renders!)
  const liquidY = useTransform(liquidProgress, [0, 0.3, 1], ['0vh', '0vh', '130vh'])
  const liquidOpacity = useTransform(liquidProgress, [0, 0.15, 0.85, 0.95], [0, 1, 1, 0])
  const glossX = useTransform(liquidProgress, [0.05, 0.35], ['-100%', '200%'])
  const glossOpacity = useTransform(liquidProgress, [0.05, 0.15, 0.35], [0, 0.8, 0])
  const flashOpacity = useTransform(liquidProgress, [0, 0.08, 0.25], [0, 0.5, 0])
  
  useEffect(() => {
    const controls = animate(liquidProgress, 1, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setShowLiquid(false)
      },
    })
    
    // Direct DOM animation for SVG noise (no React!)
    let frameId
    const startTime = performance.now()
    
    const animateNoise = (now) => {
      const elapsed = (now - startTime) / 1000
      
      if (elapsed < 2 && turbulenceRef.current) {
        const gravityPhase = Math.max(0, (elapsed - 0.6) / 1.4)
        const freq = 0.012 + gravityPhase * 0.025
        const seed = Math.floor(elapsed * 6)
        
        turbulenceRef.current.setAttribute('baseFrequency', `${freq} ${freq * 0.8}`)
        turbulenceRef.current.setAttribute('seed', String(seed))
        
        if (displacementRef.current) {
          const scale = 18 + gravityPhase * 35
          displacementRef.current.setAttribute('scale', String(scale))
        }
        
        frameId = requestAnimationFrame(animateNoise)
      }
    }
    
    frameId = requestAnimationFrame(animateNoise)
    
    return () => {
      controls.stop()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])
  
  // Generate drip data once
  const drips = useRef(
    Array.from({ length: 10 }, (_, i) => ({
      x: `${5 + i * 9.5}%`,
      w: 20 + Math.random() * 40,
      delay: i * 0.015,
    }))
  ).current
  
  const smallDrips = useRef(
    Array.from({ length: 10 }, (_, i) => ({
      x: `${9 + i * 9.5}%`,
      w: 12 + Math.random() * 20,
      delay: i * 0.02,
    }))
  ).current
  
  return (
    <div className="liquid-transition-root">
      
      {/* SVG FILTERS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          
          <filter id="noiseWarp" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.01"
              numOctaves="3"
              seed="42"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      
      {/* PAGE CONTENT — Always renders, never blocked */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(3px)' }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ minHeight: '100vh', width: '100%', position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>
      
      {/* LIQUID EFFECTS — Completely removed when done */}
      {showLiquid && (
        <div className="fixed inset-0 z-[9000] pointer-events-none" style={{ isolation: 'isolate' }}>
          
          {/* MAIN LIQUID BODY */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: liquidOpacity,
            }}
          >
            <motion.div
              className="absolute left-0 right-0"
              style={{
                top: '-25%',
                height: '150%',
                y: liquidY,
                filter: 'url(#noiseWarp)',
              }}
            >
              <div style={{ 
                width: '100%', 
                height: '100%',
                filter: 'url(#goo)',
              }}>
                {/* Central mass */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '-5%',
                    right: '-5%',
                    top: '12%',
                    height: '68%',
                    background: `linear-gradient(180deg, 
                      #1F1612 0%, 
                      #2A1F1A 10%,
                      #3D2E24 22%,
                      #6B4A35 36%,
                      #C87952 48%,
                      #E8B594 50%,
                      #C87952 52%,
                      #6B4A35 64%,
                      #3D2E24 78%,
                      #2A1F1A 90%,
                      #1F1612 100%
                    )`,
                    borderRadius: '0% 0% 45% 55% / 0% 0% 12% 12%',
                  }}
                />
                
                {/* Drip bulges (connected via goo filter) */}
                {drips.map((drip, i) => (
                  <motion.div
                    key={`drip-${i}`}
                    style={{
                      position: 'absolute',
                      left: drip.x,
                      top: '77%',
                      width: drip.w,
                      height: drip.w * 3,
                      background: 'radial-gradient(ellipse at 40% 15%, #6B4A35 0%, #3D2E24 50%, #2A1F1A 100%)',
                      borderRadius: '45% 45% 50% 50% / 8% 8% 92% 92%',
                      y: useTransform(
                        liquidProgress,
                        [0.3 + drip.delay, 0.5 + drip.delay, 0.8, 1],
                        [0, 25, 100, 300]
                      ),
                      scaleY: useTransform(
                        liquidProgress,
                        [0.3 + drip.delay, 0.5 + drip.delay, 0.8, 1],
                        [0.4, 1, 1.6, 2.2]
                      ),
                      transformOrigin: 'top center',
                    }}
                  />
                ))}
                
                {/* Smaller drips (fill gaps) */}
                {smallDrips.map((drip, i) => (
                  <motion.div
                    key={`sm-${i}`}
                    style={{
                      position: 'absolute',
                      left: drip.x,
                      top: '79%',
                      width: drip.w,
                      height: drip.w * 2.5,
                      background: 'radial-gradient(ellipse at 40% 15%, #5A4A3F 0%, #3D2E24 60%, #2A1F1A 100%)',
                      borderRadius: '45% 45% 50% 50% / 8% 8% 92% 92%',
                      y: useTransform(
                        liquidProgress,
                        [0.4 + drip.delay, 0.6 + drip.delay, 0.85, 1],
                        [0, 15, 80, 250]
                      ),
                      scaleY: useTransform(
                        liquidProgress,
                        [0.4 + drip.delay, 0.6 + drip.delay, 0.85, 1],
                        [0.3, 0.7, 1.4, 1.8]
                      ),
                      transformOrigin: 'top center',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* GLOSS SWEEP */}
          <motion.div
            className="absolute inset-0"
            style={{
              x: glossX,
              opacity: glossOpacity,
              background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 48%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.35) 52%, transparent 65%)',
            }}
          />
          
          {/* DETACHING DROPLETS */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`det-${i}`}
              className="absolute"
              style={{
                left: `${8 + i * 11}%`,
                width: 4 + Math.random() * 5,
                height: 6 + Math.random() * 8,
                background: i % 2 === 0 
                  ? 'radial-gradient(ellipse at 35% 25%, #C87952, #6B4A35)' 
                  : 'radial-gradient(ellipse at 35% 25%, #E8B594, #C87952)',
                borderRadius: '50% 50% 50% 50% / 35% 35% 65% 65%',
                boxShadow: 'inset 1px -1px 2px rgba(255,255,255,0.2), 1px 2px 3px rgba(0,0,0,0.4)',
                y: useTransform(
                  liquidProgress,
                  [0.55 + i * 0.03, 0.65 + i * 0.03, 1],
                  ['65vh', '75vh', '120vh']
                ),
                opacity: useTransform(
                  liquidProgress,
                  [0.55 + i * 0.03, 0.65 + i * 0.03, 0.9, 1],
                  [0, 1, 0.7, 0]
                ),
              }}
            />
          ))}
          
          {/* GLASS STREAKS */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`str-${i}`}
              className="absolute origin-top"
              style={{
                left: `${8 + i * 15}%`,
                top: 0,
                width: 1 + Math.random() * 2,
                height: `${15 + Math.random() * 20}%`,
                background: 'linear-gradient(180deg, rgba(200,121,82,0.2) 0%, transparent 100%)',
                borderRadius: '0 0 50% 50%',
                scaleY: useTransform(
                  liquidProgress,
                  [0.7 + i * 0.02, 0.9, 1],
                  [1, 0.3, 0]
                ),
                opacity: useTransform(
                  liquidProgress,
                  [0.7, 0.9, 1],
                  [0.35, 0.15, 0]
                ),
              }}
            />
          ))}
          
          {/* IMPACT FLASH */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 35%, rgba(200,121,82,0.5) 0%, transparent 60%)',
              opacity: flashOpacity,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default PageTransition