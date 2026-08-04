import { useEffect, useState } from 'react'

// ═══════════════════════════════════════════════════════════════
// MAISON — FILM GRAIN NOISE OVERLAY
// ═══════════════════════════════════════════════════════════════
// A subtle cinematic layer that adds analog warmth to the digital.
// Used by Balenciaga, Rick Owens, and other luxury houses to give
// their sites that "shot on film" feel.
//
// Features:
// - SVG-based fractal noise (no image files needed)
// - Animated shifting positions
// - Configurable intensity
// - Blend mode overlay
// - GPU-accelerated
// - Respects reduced motion
// - Adjustable opacity
// ═══════════════════════════════════════════════════════════════

const NoiseOverlay = ({ 
  opacity = 0.08,           // Grain intensity (0.03 = subtle, 0.15 = heavy)
  blendMode = 'overlay',    // 'overlay' | 'multiply' | 'screen' | 'difference'
  animated = true,          // Enable grain movement animation
  zIndex = 9997,            // Layer position
} = {}) => {
  
  const [reducedMotion, setReducedMotion] = useState(false)
  
  // ─────────────────────────────────────────
  // RESPECT REDUCED MOTION
  // ─────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  // ─────────────────────────────────────────
  // GENERATE NOISE SVG DATA URL
  // Base frequency = grain size (higher = finer)
  // Num octaves = grain complexity (higher = richer)
  // ─────────────────────────────────────────
  const noiseSvg = `
    <svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'>
      <filter id='grainFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='0.9' 
          numOctaves='2' 
          stitchTiles='stitch'
        />
        <feColorMatrix values='0 0 0 0 0
                                0 0 0 0 0
                                0 0 0 0 0
                                0 0 0 0.5 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#grainFilter)'/>
    </svg>
  `.trim()
  
  const encodedSvg = encodeURIComponent(noiseSvg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
  
  const backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`
  
  return (
    <div
      className="grain-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: zIndex,
        opacity: opacity,
        mixBlendMode: blendMode,
        backgroundImage: backgroundImage,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        animation: animated && !reducedMotion 
          ? 'grainShift 8s steps(10) infinite' 
          : 'none',
        willChange: animated && !reducedMotion ? 'transform' : 'auto',
      }}
      aria-hidden="true"
    >
      {/* ═══════════════════════════════════════
          GRAIN ANIMATION KEYFRAMES
          Injected inline for portability
      ═══════════════════════════════════════ */}
      <style>{`
        @keyframes grainShift {
          0%, 100% { 
            transform: translate(0, 0); 
          }
          10% { 
            transform: translate(-5%, -10%); 
          }
          20% { 
            transform: translate(-15%, 5%); 
          }
          30% { 
            transform: translate(7%, -25%); 
          }
          40% { 
            transform: translate(-5%, 25%); 
          }
          50% { 
            transform: translate(-15%, 10%); 
          }
          60% { 
            transform: translate(15%, 0%); 
          }
          70% { 
            transform: translate(0%, 15%); 
          }
          80% { 
            transform: translate(3%, 35%); 
          }
          90% { 
            transform: translate(-10%, 10%); 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .grain-overlay {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default NoiseOverlay


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Default (recommended):
//    <NoiseOverlay />
//
// 2. Subtle grain:
//    <NoiseOverlay opacity={0.04} />
//
// 3. Heavy analog feel:
//    <NoiseOverlay opacity={0.15} blendMode="multiply" />
//
// 4. Static (no animation):
//    <NoiseOverlay animated={false} />
//
// 5. Bright overlay:
//    <NoiseOverlay blendMode="screen" opacity={0.05} />
//
// 6. Dramatic effect:
//    <NoiseOverlay blendMode="difference" opacity={0.1} />
//
// ═══════════════════════════════════════════════════════════════