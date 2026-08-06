import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PageTransition = ({ children }) => {
  const [showDrips, setShowDrips] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => setShowDrips(false), 2000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="page-transition-wrapper relative">
      
      {/* ═══════════════════════════════════════════════
          LAYER 1: MAIN CONTENT (Enters with cinematic feel)
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ 
            scale: 1.02,
            filter: 'blur(8px) brightness(1.2)',
          }}
          animate={{ 
            scale: 1,
            filter: 'blur(0px) brightness(1)',
          }}
          exit={{ 
            scale: 0.98,
            filter: 'blur(8px) brightness(0.8)',
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ minHeight: '100vh', width: '100%' }}
        >
          {children}
        </motion.div>
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          LAYER 2: LIQUID SPLASH — Main blob covers screen
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: '-120%' }}
        animate={{ y: '120%' }}
        transition={{ 
          duration: 1.2, 
          ease: [0.76, 0, 0.24, 1],
        }}
        className="fixed inset-0 z-[9000] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        {/* Main liquid body */}
        <div className="absolute inset-0 liquid-main" />
        
        {/* Glossy reflection on liquid */}
        <div className="absolute inset-0 liquid-gloss" />
        
        {/* Wobble edge at bottom (leading edge) */}
        <div className="absolute bottom-0 left-0 right-0 liquid-wobble-bottom" />
        
        {/* Wobble edge at top (trailing edge) */}
        <div className="absolute top-0 left-0 right-0 liquid-wobble-top" />
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          LAYER 3: SECOND LIQUID WAVE (Delayed, different speed)
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: '-120%' }}
        animate={{ y: '120%' }}
        transition={{ 
          duration: 1.1, 
          ease: [0.76, 0, 0.24, 1],
          delay: 0.06,
        }}
        className="fixed inset-0 z-[8999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 liquid-second" />
        <div className="absolute bottom-0 left-0 right-0 liquid-wobble-bottom-2" />
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          LAYER 4: THIRD LIQUID WAVE (Even more delayed)
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: '-120%' }}
        animate={{ y: '120%' }}
        transition={{ 
          duration: 1.0, 
          ease: [0.76, 0, 0.24, 1],
          delay: 0.12,
        }}
        className="fixed inset-0 z-[8998] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 liquid-third" />
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          LAYER 5: DRIPPING DROPLETS (Fall after main liquid)
      ═══════════════════════════════════════════════ */}
      {showDrips && (
        <div className="fixed inset-0 z-[9001] pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: '-10vh',
                x: `${5 + Math.random() * 90}vw`,
                scaleY: 1,
                opacity: 1,
              }}
              animate={{ 
                y: '110vh',
                scaleY: [1, 1.8, 1.2, 1],
                opacity: [1, 1, 1, 0],
              }}
              transition={{ 
                duration: 1 + Math.random() * 0.8,
                delay: 0.3 + i * 0.06,
                ease: [0.55, 0, 1, 0.45],
              }}
              style={{ 
                position: 'absolute',
                width: `${4 + Math.random() * 8}px`,
                willChange: 'transform, opacity',
              }}
            >
              {/* Droplet shape */}
              <div 
                className="droplet"
                style={{
                  width: '100%',
                  height: `${20 + Math.random() * 40}px`,
                  background: i % 3 === 0 
                    ? 'linear-gradient(180deg, #C87952 0%, #8B4A32 100%)' 
                    : i % 3 === 1
                    ? 'linear-gradient(180deg, #E8B594 0%, #C87952 100%)'
                    : 'linear-gradient(180deg, #3D2E24 0%, #2A1F1A 100%)',
                  borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                }}
              />
            </motion.div>
          ))}
          
          {/* Larger slow drips */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`big-${i}`}
              initial={{ 
                y: '-5vh',
                x: `${10 + Math.random() * 80}vw`,
                opacity: 1,
              }}
              animate={{ 
                y: '110vh',
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 0.5,
                delay: 0.5 + i * 0.12,
                ease: [0.45, 0, 0.55, 1],
              }}
              style={{ 
                position: 'absolute',
                willChange: 'transform, opacity',
              }}
            >
              <div 
                style={{
                  width: `${8 + Math.random() * 12}px`,
                  height: `${40 + Math.random() * 60}px`,
                  background: 'linear-gradient(180deg, #C87952 0%, rgba(200, 121, 82, 0.6) 50%, rgba(200, 121, 82, 0) 100%)',
                  borderRadius: '50% 50% 40% 40% / 20% 20% 80% 80%',
                  boxShadow: '0 4px 12px rgba(200, 121, 82, 0.5), inset 0 3px 6px rgba(255, 255, 255, 0.3)',
                }}
              />
            </motion.div>
          ))}
          
          {/* Tiny splash droplets (fast, small) */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`tiny-${i}`}
              initial={{ 
                y: '30vh',
                x: `${Math.random() * 100}vw`,
                scale: 0,
                opacity: 1,
              }}
              animate={{ 
                y: `${30 + Math.random() * 40}vh`,
                x: `${Math.random() * 100}vw`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 0.6,
                delay: 0.2 + i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 2 === 0 ? '#C87952' : '#E8B594',
                boxShadow: `0 0 6px ${i % 2 === 0 ? 'rgba(200, 121, 82, 0.8)' : 'rgba(232, 181, 148, 0.8)'}`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      )}
      
      {/* ═══════════════════════════════════════════════
          LAYER 6: STREAKS left on screen (fade slowly)
      ═══════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-[8997] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            initial={{ opacity: 0.4, scaleY: 1 }}
            animate={{ opacity: 0, scaleY: 0 }}
            transition={{ 
              duration: 1.5,
              delay: 0.8 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute origin-top"
            style={{
              left: `${10 + i * 15}%`,
              top: 0,
              width: `${1 + Math.random() * 3}px`,
              height: `${30 + Math.random() * 40}%`,
              background: `linear-gradient(180deg, rgba(200, 121, 82, 0.4) 0%, rgba(200, 121, 82, 0) 100%)`,
              borderRadius: '0 0 50% 50%',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
      
      {/* ═══════════════════════════════════════════════
          LAYER 7: Golden flash at impact moment
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ 
          duration: 0.4, 
          ease: 'easeOut',
          times: [0, 0.3, 1],
        }}
        className="fixed inset-0 z-[8996] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(200, 121, 82, 0.6) 0%, transparent 60%)',
        }}
      />
      
      {/* ═══════════════════════════════════════════════
          CSS FOR LIQUID EFFECTS
      ═══════════════════════════════════════════════ */}
      <style>{`
        /* MAIN LIQUID BODY */
        .liquid-main {
          background: linear-gradient(180deg, 
            #2A1F1A 0%, 
            #3D2E24 30%, 
            #C87952 50%, 
            #3D2E24 70%, 
            #2A1F1A 100%
          );
        }
        
        /* GLOSSY REFLECTION on liquid */
        .liquid-gloss {
          background: linear-gradient(
            135deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.15) 20%, 
            transparent 40%,
            rgba(255, 255, 255, 0.1) 60%,
            transparent 80%
          );
          animation: glossShimmer 0.6s ease-out forwards;
        }
        
        @keyframes glossShimmer {
          0% { opacity: 1; transform: translateX(-100%); }
          100% { opacity: 0.5; transform: translateX(100%); }
        }
        
        /* WOBBLE BOTTOM EDGE (leading edge of liquid) */
        .liquid-wobble-bottom {
          height: 80px;
          background: #2A1F1A;
          border-radius: 0 0 60% 60% / 0 0 100% 100%;
          transform: translateY(40px);
          animation: wobbleBottom 0.4s ease-in-out;
        }
        
        @keyframes wobbleBottom {
          0% { border-radius: 0 0 60% 60% / 0 0 100% 100%; }
          25% { border-radius: 0 0 40% 70% / 0 0 80% 120%; }
          50% { border-radius: 0 0 70% 40% / 0 0 120% 80%; }
          75% { border-radius: 0 0 50% 60% / 0 0 90% 110%; }
          100% { border-radius: 0 0 60% 60% / 0 0 100% 100%; }
        }
        
        /* WOBBLE TOP EDGE (trailing edge) */
        .liquid-wobble-top {
          height: 60px;
          background: #2A1F1A;
          border-radius: 60% 60% 0 0 / 100% 100% 0 0;
          transform: translateY(-30px);
          animation: wobbleTop 0.5s ease-in-out;
        }
        
        @keyframes wobbleTop {
          0% { border-radius: 60% 60% 0 0 / 100% 100% 0 0; }
          30% { border-radius: 40% 70% 0 0 / 80% 120% 0 0; }
          60% { border-radius: 70% 40% 0 0 / 120% 80% 0 0; }
          100% { border-radius: 60% 60% 0 0 / 100% 100% 0 0; }
        }
        
        /* SECOND LIQUID WAVE */
        .liquid-second {
          background: linear-gradient(180deg, 
            #3D2E24 0%, 
            #C87952 40%, 
            #E8B594 50%, 
            #C87952 60%, 
            #3D2E24 100%
          );
          opacity: 0.9;
        }
        
        .liquid-wobble-bottom-2 {
          height: 100px;
          background: #3D2E24;
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
          transform: translateY(50px);
          animation: wobbleBottom2 0.5s ease-in-out;
        }
        
        @keyframes wobbleBottom2 {
          0% { border-radius: 0 0 50% 50% / 0 0 100% 100%; }
          33% { border-radius: 0 0 30% 70% / 0 0 60% 140%; }
          66% { border-radius: 0 0 70% 30% / 0 0 140% 60%; }
          100% { border-radius: 0 0 50% 50% / 0 0 100% 100%; }
        }
        
        /* THIRD LIQUID WAVE */
        .liquid-third {
          background: linear-gradient(180deg, 
            #5C1E2E 0%, 
            #3D2E24 40%, 
            #2A1F1A 100%
          );
          opacity: 0.85;
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .liquid-main,
          .liquid-second,
          .liquid-third,
          .liquid-gloss,
          .liquid-wobble-bottom,
          .liquid-wobble-top,
          .liquid-wobble-bottom-2 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default PageTransition