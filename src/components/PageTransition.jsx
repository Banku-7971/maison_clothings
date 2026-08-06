import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const PageTransition = ({ children }) => {
  const [showLiquid, setShowLiquid] = useState(true)
  const svgRef = useRef(null)
  const turbulenceRef = useRef(null)
  const displacementRef = useRef(null)
  
  // Framer Motion values — NO React state updates per frame!
  const liquidProgress = useMotionValue(0)
  const liquidY = useTransform(liquidProgress, [0, 0.25, 1], [0, 0, 120])
  const liquidScale = useTransform(liquidProgress, [0, 0.15, 0.25, 1], [0, 1, 1, 1])
  const liquidOpacity = useTransform(liquidProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const glossX = useTransform(liquidProgress, [0, 0.4], [-100, 200])
  const glossOpacity = useTransform(liquidProgress, [0, 0.15, 0.4], [0, 0.8, 0])
  const refractionOpacity = useTransform(liquidProgress, [0.1, 0.25, 0.8, 1], [0, 0.6, 0.3, 0])
  
  useEffect(() => {
    // Animate the single progress value (0 to 1)
    // This drives EVERYTHING without React re-renders
    const controls = animate(liquidProgress, 1, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => setShowLiquid(false),
    })
    
    // Animate SVG turbulence directly on DOM (no React!)
    let frameId
    const startTime = performance.now()
    
    const animateNoise = (now) => {
      const elapsed = (now - startTime) / 1000
      
      if (turbulenceRef.current && elapsed < 2.2) {
        // Noise evolves based on gravity phase
        const gravityPhase = Math.max(0, (elapsed - 0.5) / 1.5)
        const freq = 0.012 + gravityPhase * 0.03
        const seed = Math.floor(elapsed * 8) // Stepping seed for organic change
        
        turbulenceRef.current.setAttribute('baseFrequency', `${freq} ${freq * 0.8}`)
        turbulenceRef.current.setAttribute('seed', seed)
        
        // Displacement scale increases as liquid stretches
        if (displacementRef.current) {
          const scale = 20 + gravityPhase * 40
          displacementRef.current.setAttribute('scale', scale)
        }
        
        frameId = requestAnimationFrame(animateNoise)
      }
    }
    
    frameId = requestAnimationFrame(animateNoise)
    
    // Safety cleanup
    const safety = setTimeout(() => setShowLiquid(false), 3000)
    
    return () => {
      controls.stop()
      cancelAnimationFrame(frameId)
      clearTimeout(safety)
    }
  }, [])
  
  return (
    <div className="liquid-glass-transition">
      
      {/* SVG FILTERS — Defined once, referenced by CSS */}
      <svg 
        ref={svgRef}
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          {/* GOOEY MERGE FILTER — Makes shapes connect like liquid */}
          <filter id="goo-merge" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 30 -12"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          
          {/* NOISE DISTORTION — Organic edges driven by turbulence */}
          <filter id="liquid-noise" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.01"
              numOctaves="4"
              seed="42"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          
          {/* LIQUID MASK for refraction — Only blurs where liquid exists */}
          <filter id="glass-warp" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.02"
              numOctaves="3"
              seed="13"
              result="warpNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warpNoise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
      </svg>
      
      {/* ═══════════════════════════════════════
          PAGE CONTENT
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          initial={{ filter: 'blur(4px)' }}
          animate={{ filter: 'blur(0px)' }}
          exit={{ filter: 'blur(3px)' }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ minHeight: '100vh', width: '100%' }}
        >
          {children}
        </motion.div>
      </motion.div>
      
      {/* ═══════════════════════════════════════
          LIQUID SYSTEM (All driven by motionValues)
      ═══════════════════════════════════════ */}
      {showLiquid && (
        <>
          {/* MAIN LIQUID MASS — One connected body */}
          <motion.div
            className="fixed inset-0 z-[9000] pointer-events-none"
            style={{
              opacity: liquidOpacity,
              willChange: 'opacity',
            }}
          >
            <motion.div
              className="absolute left-0 right-0"
              style={{
                top: '-25%',
                height: '150%',
                y: liquidY,
                scale: liquidScale,
                filter: 'url(#liquid-noise)',
                willChange: 'transform',
              }}
            >
              {/* Gooey group — everything inside MERGES */}
              <div style={{ 
                width: '100%', 
                height: '100%',
                filter: 'url(#goo-merge)',
              }}>
                {/* Central liquid mass */}
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
                      #3D2E24 20%,
                      #6B4A35 35%,
                      #C87952 48%,
                      #E8B594 50%,
                      #C87952 52%,
                      #6B4A35 65%,
                      #3D2E24 80%,
                      #2A1F1A 90%,
                      #1F1612 100%
                    )`,
                    borderRadius: '0% 0% 45% 55% / 0% 0% 15% 15%',
                  }}
                />
                
                {/* Drip bulges — CONNECTED to main body via gooey filter */}
                {[
                  { x: '5%', w: 55, d: 0 },
                  { x: '14%', w: 40, d: 0.08 },
                  { x: '24%', w: 65, d: 0.03 },
                  { x: '33%', w: 45, d: 0.12 },
                  { x: '43%', w: 70, d: 0.06 },
                  { x: '52%', w: 38, d: 0.15 },
                  { x: '62%', w: 60, d: 0.04 },
                  { x: '71%', w: 42, d: 0.1 },
                  { x: '80%', w: 55, d: 0.07 },
                  { x: '89%', w: 48, d: 0.13 },
                ].map((drip, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: drip.x,
                      top: '77%',
                      width: drip.w,
                      height: drip.w * 3,
                      background: `radial-gradient(ellipse at 40% 15%, 
                        #6B4A35 0%, 
                        #3D2E24 40%, 
                        #2A1F1A 100%
                      )`,
                      borderRadius: '45% 45% 50% 50% / 10% 10% 90% 90%',
                      y: useTransform(
                        liquidProgress,
                        [0.3 + drip.d, 0.5 + drip.d, 0.8 + drip.d * 0.5, 1],
                        [0, 30, 120, 350]
                      ),
                      scaleY: useTransform(
                        liquidProgress,
                        [0.3 + drip.d, 0.5 + drip.d, 0.8 + drip.d * 0.5, 1],
                        [0.4, 1, 1.8, 2.5]
                      ),
                      transformOrigin: 'top center',
                      willChange: 'transform',
                    }}
                  />
                ))}
                
                {/* Smaller secondary drips (fill gaps) */}
                {[
                  { x: '10%', w: 28 },
                  { x: '20%', w: 22 },
                  { x: '29%', w: 30 },
                  { x: '38%', w: 25 },
                  { x: '48%', w: 32 },
                  { x: '58%', w: 24 },
                  { x: '67%', w: 28 },
                  { x: '76%', w: 26 },
                  { x: '85%', w: 30 },
                  { x: '94%', w: 22 },
                ].map((drip, i) => (
                  <motion.div
                    key={`sm-${i}`}
                    style={{
                      position: 'absolute',
                      left: drip.x,
                      top: '79%',
                      width: drip.w,
                      height: drip.w * 2.5,
                      background: `radial-gradient(ellipse at 40% 15%, 
                        #5A4A3F 0%, 
                        #3D2E24 60%, 
                        #2A1F1A 100%
                      )`,
                      borderRadius: '45% 45% 50% 50% / 10% 10% 90% 90%',
                      y: useTransform(
                        liquidProgress,
                        [0.4 + i * 0.02, 0.6 + i * 0.02, 0.9, 1],
                        [0, 20, 100, 280]
                      ),
                      scaleY: useTransform(
                        liquidProgress,
                        [0.4 + i * 0.02, 0.6 + i * 0.02, 0.9, 1],
                        [0.3, 0.8, 1.5, 2]
                      ),
                      transformOrigin: 'top center',
                      willChange: 'transform',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* GLOSSY HIGHLIGHT — Sweeps across liquid */}
          <motion.div
            className="fixed inset-0 z-[9001] pointer-events-none"
            style={{
              x: glossX,
              opacity: glossOpacity,
              background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 48%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.35) 52%, transparent 65%)',
              willChange: 'transform, opacity',
            }}
          />
          
          {/* GLASS REFRACTION — Masked to liquid area only */}
          <motion.div
            className="fixed inset-0 z-[8998] pointer-events-none"
            style={{
              opacity: refractionOpacity,
              backdropFilter: 'blur(4px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(4px) saturate(1.5)',
              maskImage: useTransform(
                liquidProgress,
                [0, 0.25, 0.8, 1],
                [
                  'linear-gradient(180deg, black 0%, black 100%)',
                  'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
                  'linear-gradient(180deg, black 0%, black 30%, transparent 60%)',
                  'linear-gradient(180deg, transparent 0%, transparent 100%)',
                ]
              ),
              WebkitMaskImage: useTransform(
                liquidProgress,
                [0, 0.25, 0.8, 1],
                [
                  'linear-gradient(180deg, black 0%, black 100%)',
                  'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
                  'linear-gradient(180deg, black 0%, black 30%, transparent 60%)',
                  'linear-gradient(180deg, transparent 0%, transparent 100%)',
                ]
              ),
              willChange: 'opacity',
            }}
          />
          
          {/* DETACHING DROPLETS — Separate after stretching */}
          <div className="fixed inset-0 z-[9002] pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`det-${i}`}
                style={{
                  position: 'absolute',
                  left: `${8 + i * 9}%`,
                  width: 4 + Math.random() * 6,
                  height: 6 + Math.random() * 10,
                  background: i % 2 === 0 
                    ? 'radial-gradient(ellipse at 35% 25%, #C87952, #6B4A35, #3D2E24)' 
                    : 'radial-gradient(ellipse at 35% 25%, #E8B594, #C87952, #8B4A32)',
                  borderRadius: '50% 50% 50% 50% / 35% 35% 65% 65%',
                  boxShadow: 'inset 1px -1px 2px rgba(255,255,255,0.2), 1px 2px 3px rgba(0,0,0,0.4)',
                  y: useTransform(
                    liquidProgress,
                    [0.6 + i * 0.03, 0.7 + i * 0.03, 1],
                    ['70vh', '80vh', '120vh']
                  ),
                  opacity: useTransform(
                    liquidProgress,
                    [0.6 + i * 0.03, 0.7 + i * 0.03, 0.95, 1],
                    [0, 1, 0.8, 0]
                  ),
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>
          
          {/* GLASS STREAKS — Residue on glass */}
          <div className="fixed inset-0 z-[8997] pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`res-${i}`}
                className="absolute origin-top"
                style={{
                  left: `${6 + i * 12}%`,
                  top: 0,
                  width: 1 + Math.random() * 2,
                  height: `${15 + Math.random() * 25}%`,
                  background: `linear-gradient(180deg, rgba(200,121,82,0.2) 0%, transparent 100%)`,
                  borderRadius: '0 0 50% 50%',
                  scaleY: useTransform(
                    liquidProgress,
                    [0.7 + i * 0.02, 0.9 + i * 0.01, 1],
                    [1, 0.5, 0]
                  ),
                  opacity: useTransform(
                    liquidProgress,
                    [0.7, 0.85, 1],
                    [0.4, 0.2, 0]
                  ),
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>
          
          {/* IMPACT FLASH */}
          <motion.div
            className="fixed inset-0 z-[8996] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 35%, rgba(200,121,82,0.5) 0%, transparent 60%)',
              opacity: useTransform(
                liquidProgress,
                [0, 0.05, 0.2],
                [0, 0.5, 0]
              ),
              willChange: 'opacity',
            }}
          />
        </>
      )}
    </div>
  )
}

export default PageTransition