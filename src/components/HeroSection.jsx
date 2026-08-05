import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'

const HeroSection = () => {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.5])
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX - innerWidth / 2) / innerWidth)
      mouseY.set((clientY - innerHeight / 2) / innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  const globeTiltY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
  const globeTiltX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-noir hero-india-3d"
    >
      {/* Colorful background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #2A1F1A 0%, #3D2E24 40%, #5C1E2E 100%)',
        }}
      />
      
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>
      
      {/* ═══════════════════════════════════════════════
          MASSIVE 3D INDIA GLOBE
          Rotates HORIZONTALLY (side to side)
      ═══════════════════════════════════════════════ */}
      <motion.div
        style={{ 
          rotateY: globeTiltY,
          rotateX: globeTiltX,
        }}
        className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={mounted ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ 
            perspective: '1500px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* GLOBE (rotates horizontally) */}
          <div className="india-globe-3d" style={{ animation: 'globeSpinHorizontal 30s linear infinite' }}>
            {/* Ocean */}
            <div className="globe-ocean-3d" />
            
            {/* India Saffron peninsula */}
            <div className="india-saffron-shape" />
            
            {/* Other continents */}
            <div className="continent continent-africa" />
            <div className="continent continent-asia" />
            <div className="continent continent-australia" />
            
            {/* Grid lines */}
            <div className="globe-line globe-line-eq" />
            <div className="globe-line globe-line-mer" />
            
            {/* Shine */}
            <div className="globe-shine-3d" />
            
            {/* Shadow */}
            <div className="globe-shadow-3d" />
          </div>
          
          {/* ═══════════════════════════════════════════════
              REAL 3D BUILDINGS POPPING OUT OF GLOBE!
              These stay in place (don't rotate with globe)
          ═══════════════════════════════════════════════ */}
          <div className="landmarks-container">
            
            {/* TAJ MAHAL — Detailed SVG */}
            <div className="landmark-3d taj-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="tajGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F5EBDD" />
                    <stop offset="100%" stopColor="#C8B092" />
                  </linearGradient>
                  <filter id="tajGlow">
                    <feGaussianBlur stdDeviation="2" result="glow"/>
                    <feMerge>
                      <feMergeNode in="glow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Main dome */}
                <ellipse cx="50" cy="40" rx="20" ry="22" fill="url(#tajGrad)" filter="url(#tajGlow)"/>
                {/* Dome top */}
                <circle cx="50" cy="18" r="3" fill="#FFD700"/>
                <rect x="49" y="14" width="2" height="6" fill="#FFD700"/>
                {/* Left minaret */}
                <rect x="15" y="55" width="6" height="45" fill="url(#tajGrad)"/>
                <circle cx="18" cy="52" r="4" fill="url(#tajGrad)"/>
                <rect x="17" y="46" width="2" height="6" fill="#FFD700"/>
                {/* Right minaret */}
                <rect x="79" y="55" width="6" height="45" fill="url(#tajGrad)"/>
                <circle cx="82" cy="52" r="4" fill="url(#tajGrad)"/>
                <rect x="81" y="46" width="2" height="6" fill="#FFD700"/>
                {/* Main building */}
                <rect x="25" y="55" width="50" height="45" fill="url(#tajGrad)"/>
                {/* Arch */}
                <path d="M 40 100 L 40 75 Q 40 65, 50 65 Q 60 65, 60 75 L 60 100 Z" fill="#2A1F1A"/>
                {/* Base platform */}
                <rect x="10" y="100" width="80" height="15" fill="#C8B092"/>
              </svg>
              <div className="landmark-label-3d">Taj Mahal</div>
            </div>
            
            {/* INDIA GATE — Delhi */}
            <div className="landmark-3d delhi-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="delhiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E8C4A0" />
                    <stop offset="100%" stopColor="#B8875E" />
                  </linearGradient>
                </defs>
                {/* Top decoration */}
                <rect x="20" y="15" width="60" height="8" fill="url(#delhiGrad)"/>
                <rect x="15" y="10" width="70" height="6" fill="url(#delhiGrad)"/>
                {/* Main structure */}
                <rect x="20" y="23" width="60" height="80" fill="url(#delhiGrad)"/>
                {/* Big arch */}
                <path d="M 30 105 L 30 55 Q 30 40, 50 40 Q 70 40, 70 55 L 70 105 Z" fill="#2A1F1A"/>
                {/* Small windows */}
                <rect x="25" y="70" width="4" height="8" fill="#2A1F1A"/>
                <rect x="71" y="70" width="4" height="8" fill="#2A1F1A"/>
                <rect x="25" y="85" width="4" height="8" fill="#2A1F1A"/>
                <rect x="71" y="85" width="4" height="8" fill="#2A1F1A"/>
                {/* Base */}
                <rect x="10" y="103" width="80" height="12" fill="#8B6543"/>
              </svg>
              <div className="landmark-label-3d">India Gate</div>
            </div>
            
            {/* GATEWAY OF INDIA — Mumbai */}
            <div className="landmark-3d mumbai-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="mumbaiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D4B896" />
                    <stop offset="100%" stopColor="#8B6543" />
                  </linearGradient>
                </defs>
                {/* Top dome */}
                <path d="M 30 25 Q 50 5, 70 25 L 70 40 L 30 40 Z" fill="url(#mumbaiGrad)"/>
                <circle cx="50" cy="15" r="3" fill="#FFD700"/>
                {/* Side towers */}
                <rect x="15" y="35" width="12" height="70" fill="url(#mumbaiGrad)"/>
                <rect x="73" y="35" width="12" height="70" fill="url(#mumbaiGrad)"/>
                <path d="M 15 35 L 21 25 L 27 35 Z" fill="url(#mumbaiGrad)"/>
                <path d="M 73 35 L 79 25 L 85 35 Z" fill="url(#mumbaiGrad)"/>
                {/* Main arch */}
                <rect x="27" y="35" width="46" height="70" fill="url(#mumbaiGrad)"/>
                <path d="M 35 105 L 35 55 Q 35 45, 50 45 Q 65 45, 65 55 L 65 105 Z" fill="#2A1F1A"/>
                {/* Base */}
                <rect x="5" y="105" width="90" height="12" fill="#5C4A2E"/>
                {/* Water lines */}
                <rect x="0" y="115" width="100" height="5" fill="#4A6E8E" opacity="0.6"/>
              </svg>
              <div className="landmark-label-3d">Gateway of India</div>
            </div>
            
            {/* VICTORIA MEMORIAL — KOLKATA (Your city!) */}
            <div className="landmark-3d kolkata-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="victoriaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F5EBDD" />
                    <stop offset="100%" stopColor="#C8B092" />
                  </linearGradient>
                </defs>
                {/* Central big dome */}
                <ellipse cx="50" cy="35" rx="22" ry="24" fill="url(#victoriaGrad)"/>
                {/* Dome top */}
                <circle cx="50" cy="11" r="4" fill="#FFD700"/>
                <rect x="49" y="7" width="2" height="6" fill="#FFD700"/>
                {/* Small side domes */}
                <ellipse cx="18" cy="55" rx="10" ry="12" fill="url(#victoriaGrad)"/>
                <ellipse cx="82" cy="55" rx="10" ry="12" fill="url(#victoriaGrad)"/>
                <circle cx="18" cy="42" r="2" fill="#FFD700"/>
                <circle cx="82" cy="42" r="2" fill="#FFD700"/>
                {/* Main building */}
                <rect x="8" y="65" width="84" height="40" fill="url(#victoriaGrad)"/>
                {/* Columns */}
                <rect x="20" y="70" width="3" height="35" fill="#2A1F1A" opacity="0.3"/>
                <rect x="35" y="70" width="3" height="35" fill="#2A1F1A" opacity="0.3"/>
                <rect x="50" y="70" width="3" height="35" fill="#2A1F1A" opacity="0.3"/>
                <rect x="62" y="70" width="3" height="35" fill="#2A1F1A" opacity="0.3"/>
                <rect x="77" y="70" width="3" height="35" fill="#2A1F1A" opacity="0.3"/>
                {/* Base */}
                <rect x="0" y="105" width="100" height="12" fill="#8B6543"/>
                {/* KOLKATA STAR */}
                <text x="50" y="80" fontSize="6" fill="#C87952" textAnchor="middle" fontWeight="bold">★</text>
              </svg>
              <div className="landmark-label-3d">Victoria Memorial ⭐</div>
            </div>
            
            {/* GOLDEN TEMPLE — Amritsar */}
            <div className="landmark-3d golden-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="goldenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                  <filter id="goldenGlow">
                    <feGaussianBlur stdDeviation="3" result="glow"/>
                    <feMerge>
                      <feMergeNode in="glow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Main dome */}
                <ellipse cx="50" cy="35" rx="22" ry="20" fill="url(#goldenGrad)" filter="url(#goldenGlow)"/>
                {/* Dome top spire */}
                <path d="M 46 20 L 50 5 L 54 20 Z" fill="#FFD700"/>
                <circle cx="50" cy="5" r="2" fill="#FFD700"/>
                {/* Corner domes */}
                <circle cx="18" cy="55" r="6" fill="url(#goldenGrad)"/>
                <circle cx="82" cy="55" r="6" fill="url(#goldenGrad)"/>
                {/* Main building */}
                <rect x="18" y="55" width="64" height="45" fill="url(#goldenGrad)"/>
                {/* Arches */}
                <path d="M 30 100 L 30 75 Q 30 65, 40 65 Q 50 65, 50 75 L 50 100 Z" fill="#8B4513"/>
                <path d="M 50 100 L 50 75 Q 50 65, 60 65 Q 70 65, 70 75 L 70 100 Z" fill="#8B4513"/>
                {/* Base (water reflection) */}
                <rect x="5" y="100" width="90" height="15" fill="#4A90E2" opacity="0.5"/>
                <rect x="18" y="100" width="64" height="8" fill="#B8860B"/>
              </svg>
              <div className="landmark-label-3d">Golden Temple</div>
            </div>
            
            {/* CHARMINAR — Hyderabad */}
            <div className="landmark-3d hyderabad-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="charGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D4B896" />
                    <stop offset="100%" stopColor="#8B6543" />
                  </linearGradient>
                </defs>
                {/* 4 Minaret tops */}
                <path d="M 8 20 L 12 5 L 16 20 Z" fill="url(#charGrad)"/>
                <path d="M 30 20 L 34 5 L 38 20 Z" fill="url(#charGrad)"/>
                <path d="M 62 20 L 66 5 L 70 20 Z" fill="url(#charGrad)"/>
                <path d="M 84 20 L 88 5 L 92 20 Z" fill="url(#charGrad)"/>
                {/* Minaret bulbs */}
                <circle cx="12" cy="22" r="3" fill="url(#charGrad)"/>
                <circle cx="34" cy="22" r="3" fill="url(#charGrad)"/>
                <circle cx="66" cy="22" r="3" fill="url(#charGrad)"/>
                <circle cx="88" cy="22" r="3" fill="url(#charGrad)"/>
                {/* 4 Minarets */}
                <rect x="10" y="22" width="4" height="80" fill="url(#charGrad)"/>
                <rect x="32" y="22" width="4" height="80" fill="url(#charGrad)"/>
                <rect x="64" y="22" width="4" height="80" fill="url(#charGrad)"/>
                <rect x="86" y="22" width="4" height="80" fill="url(#charGrad)"/>
                {/* Central structure */}
                <rect x="18" y="45" width="64" height="55" fill="url(#charGrad)"/>
                {/* 4 Arches */}
                <path d="M 25 100 L 25 60 Q 25 55, 32 55 Q 39 55, 39 60 L 39 100 Z" fill="#2A1F1A"/>
                <path d="M 45 100 L 45 60 Q 45 55, 55 55 Q 65 55, 65 60 L 65 100 Z" fill="#2A1F1A"/>
                <path d="M 61 100 L 61 60 Q 61 55, 68 55 Q 75 55, 75 60 L 75 100 Z" fill="#2A1F1A"/>
                {/* Base */}
                <rect x="0" y="100" width="100" height="15" fill="#5C4A2E"/>
              </svg>
              <div className="landmark-label-3d">Charminar</div>
            </div>
            
            {/* MYSORE PALACE */}
            <div className="landmark-3d mysore-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="mysoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E8A87C" />
                    <stop offset="100%" stopColor="#C68B59" />
                  </linearGradient>
                </defs>
                {/* Central big dome */}
                <path d="M 30 40 Q 50 15, 70 40 L 70 55 L 30 55 Z" fill="url(#mysoreGrad)"/>
                <circle cx="50" cy="18" r="4" fill="#FFD700"/>
                <rect x="49" y="10" width="2" height="10" fill="#FFD700"/>
                {/* Side domes */}
                <path d="M 5 55 Q 15 40, 25 55 L 25 65 L 5 65 Z" fill="url(#mysoreGrad)"/>
                <path d="M 75 55 Q 85 40, 95 55 L 95 65 L 75 65 Z" fill="url(#mysoreGrad)"/>
                {/* Main palace */}
                <rect x="5" y="55" width="90" height="50" fill="url(#mysoreGrad)"/>
                {/* Multiple arches */}
                <path d="M 15 105 L 15 75 Q 15 68, 22 68 Q 29 68, 29 75 L 29 105 Z" fill="#2A1F1A"/>
                <path d="M 35 105 L 35 75 Q 35 68, 42 68 Q 49 68, 49 75 L 49 105 Z" fill="#2A1F1A"/>
                <path d="M 51 105 L 51 75 Q 51 68, 58 68 Q 65 68, 65 75 L 65 105 Z" fill="#2A1F1A"/>
                <path d="M 71 105 L 71 75 Q 71 68, 78 68 Q 85 68, 85 75 L 85 105 Z" fill="#2A1F1A"/>
                {/* Base */}
                <rect x="0" y="105" width="100" height="12" fill="#8B6543"/>
              </svg>
              <div className="landmark-label-3d">Mysore Palace</div>
            </div>
            
            {/* HIMALAYAS */}
            <div className="landmark-3d himalaya-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="himGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#B0C4DE" />
                    <stop offset="100%" stopColor="#4682B4" />
                  </linearGradient>
                  <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E6F2FF" />
                  </linearGradient>
                </defs>
                {/* Back mountain (tallest) */}
                <path d="M 35 105 L 55 20 L 75 105 Z" fill="url(#himGrad)"/>
                {/* Snow cap on tall mountain */}
                <path d="M 48 45 L 55 20 L 62 45 L 58 42 L 55 45 L 52 42 Z" fill="url(#snowGrad)"/>
                {/* Left mountain */}
                <path d="M 10 105 L 30 40 L 50 105 Z" fill="url(#himGrad)" opacity="0.9"/>
                <path d="M 25 55 L 30 40 L 35 55 Z" fill="url(#snowGrad)"/>
                {/* Right mountain */}
                <path d="M 50 105 L 70 50 L 90 105 Z" fill="url(#himGrad)" opacity="0.85"/>
                <path d="M 65 62 L 70 50 L 75 62 Z" fill="url(#snowGrad)"/>
                {/* Base */}
                <rect x="0" y="105" width="100" height="12" fill="#5C4A2E"/>
              </svg>
              <div className="landmark-label-3d">Himalayas</div>
            </div>
            
            {/* KONARK SUN TEMPLE */}
            <div className="landmark-3d konark-position">
              <div className="landmark-shadow" />
              <svg viewBox="0 0 100 120" className="landmark-svg">
                <defs>
                  <linearGradient id="konarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B8875E" />
                    <stop offset="100%" stopColor="#6B4F30" />
                  </linearGradient>
                </defs>
                {/* Sun */}
                <circle cx="50" cy="15" r="8" fill="#FFD700"/>
                <path d="M 50 5 L 52 3 L 50 0 L 48 3 Z" fill="#FFD700"/>
                <path d="M 50 25 L 52 27 L 50 30 L 48 27 Z" fill="#FFD700"/>
                <path d="M 40 15 L 38 13 L 35 15 L 38 17 Z" fill="#FFD700"/>
                <path d="M 60 15 L 62 13 L 65 15 L 62 17 Z" fill="#FFD700"/>
                {/* Pyramid temple structure */}
                <path d="M 20 105 L 50 25 L 80 105 Z" fill="url(#konarkGrad)"/>
                {/* Steps */}
                <line x1="27" y1="95" x2="73" y2="95" stroke="#2A1F1A" strokeWidth="1"/>
                <line x1="30" y1="85" x2="70" y2="85" stroke="#2A1F1A" strokeWidth="1"/>
                <line x1="33" y1="75" x2="67" y2="75" stroke="#2A1F1A" strokeWidth="1"/>
                <line x1="36" y1="65" x2="64" y2="65" stroke="#2A1F1A" strokeWidth="1"/>
                <line x1="39" y1="55" x2="61" y2="55" stroke="#2A1F1A" strokeWidth="1"/>
                {/* Wheel */}
                <circle cx="50" cy="85" r="8" fill="none" stroke="#2A1F1A" strokeWidth="1.5"/>
                <line x1="42" y1="85" x2="58" y2="85" stroke="#2A1F1A" strokeWidth="1"/>
                <line x1="50" y1="77" x2="50" y2="93" stroke="#2A1F1A" strokeWidth="1"/>
                {/* Base */}
                <rect x="0" y="105" width="100" height="12" fill="#8B6543"/>
              </svg>
              <div className="landmark-label-3d">Konark Temple</div>
            </div>
          </div>
          
          {/* Glow */}
          <div className="globe-glow-3d" />
          
          {/* Orbit rings */}
          <div className="orbit-ring ring-1" />
          <div className="orbit-ring ring-2" />
          
          {/* Orbiting plane */}
          <div className="orbiting-object plane-orbit" style={{ animation: 'orbitLeft 20s linear infinite' }}>
            <div className="plane-icon">✈️</div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* TOP LABEL */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 md:top-40 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-2xl">🇮🇳</span>
            <p 
              className="text-tiny tracking-mega uppercase font-mono"
              style={{ 
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: '#E8B594',
              }}
            >
              Made in India · Loved Worldwide
            </p>
            <span className="text-2xl">✨</span>
          </div>
        </div>
      </motion.div>
      
      {/* BOTTOM CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-end pb-32 md:pb-40"
      >
        <div className="container-luxury w-full">
          <div className="max-w-6xl mx-auto text-center">
            
            <h1 
              className="font-cormorant font-light text-ivory leading-none mb-8"
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
              }}
            >
              <div className="overflow-hidden mb-2">
                <motion.span 
                  initial={{ y: '120%', opacity: 0 }}
                  animate={mounted ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                  style={{ textShadow: '0 0 40px rgba(200, 121, 82, 0.5)' }}
                >
                  Handmade in
                </motion.span>
              </div>
              
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: '120%', opacity: 0 }}
                  animate={mounted ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-champagne via-gold to-terracotta bg-clip-text text-transparent"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(200, 121, 82, 0.6))' }}
                >
                  <em className="italic">Incredible India</em>
                </motion.span>
              </div>
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="mb-10 max-w-2xl mx-auto"
            >
              <p 
                className="font-cormorant italic text-cream leading-relaxed"
                style={{ 
                  fontSize: 'clamp(1rem, 1.5vw, 1.375rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                }}
              >
                From the streets of Kolkata to your doorstep.
                <br />
                Delivered with <span className="text-gold not-italic">love</span> across India.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/shop"
                className="hero-btn-primary group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 rounded-full transition-all duration-500"
                data-cursor="hover"
              >
                <div className="hero-btn-glow" />
                <div className="hero-btn-ring" />
                <span 
                  className="relative z-10 text-tiny tracking-mega uppercase font-bold text-noir"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  Explore Collection 🛍️
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 border-2 border-champagne/40 text-champagne rounded-full hover:border-champagne hover:bg-champagne/10 transition-all duration-500 backdrop-blur-sm"
                data-cursor="hover"
              >
                <span 
                  className="text-tiny tracking-mega uppercase font-medium"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  Our Story ✨
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 right-0 py-4 border-t border-gold/20 overflow-hidden z-10"
        style={{
          background: 'linear-gradient(to right, rgba(92,30,46,0.7), rgba(42,31,26,0.95), rgba(200,121,82,0.7))',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div 
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: 'marqueeIndia 30s linear infinite' }}
        >
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-16 flex-shrink-0">
              {[
                { text: 'Est. Kolkata 2025', emoji: '🇮🇳' },
                { text: 'Handcrafted', emoji: '✨' },
                { text: 'Free Shipping ₹5,000+', emoji: '📦' },
                { text: 'COD Available', emoji: '💰' },
                { text: 'Pan-India Delivery', emoji: '🌏' },
                { text: 'Made with Love', emoji: '❤️' },
              ].map((item, i) => (
                <span 
                  key={i} 
                  className="text-tiny tracking-mega text-champagne uppercase font-mono flex items-center gap-3" 
                  style={{ fontSize: '0.75rem' }}
                >
                  <span className="text-base">{item.emoji}</span>
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      
      <style>{`
        .hero-india-3d * {
          will-change: auto;
          transform: translateZ(0);
        }
        
        @keyframes marqueeIndia {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        
        /* ORBS */
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 15s ease-in-out infinite;
        }
        
        .orb-1 {
          top: 10%; left: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255, 153, 51, 0.3) 0%, transparent 70%);
        }
        
        .orb-2 {
          top: 40%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(19, 136, 8, 0.25) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        .orb-3 {
          bottom: 20%; left: 30%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.4) 0%, transparent 70%);
          animation-delay: 6s;
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.15); }
        }
        
        /* ═══════════════════════════════════════════════
           3D INDIA GLOBE — HORIZONTAL ROTATION!
        ═══════════════════════════════════════════════ */
        .india-globe-3d {
          position: relative;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            inset -40px -40px 80px rgba(0, 0, 0, 0.6),
            inset 40px 40px 100px rgba(255, 255, 255, 0.15),
            0 0 80px rgba(100, 180, 255, 0.5),
            0 0 160px rgba(200, 121, 82, 0.3),
            0 40px 80px rgba(0, 0, 0, 0.5);
          background: radial-gradient(circle at 30% 30%, #4A90E2 0%, #2874A6 40%, #1A5490 100%);
        }
        
        @media (max-width: 1024px) {
          .india-globe-3d {
            width: 450px;
            height: 450px;
          }
        }
        
        @media (max-width: 768px) {
          .india-globe-3d {
            width: 380px;
            height: 380px;
          }
        }
        
        @media (max-width: 480px) {
          .india-globe-3d {
            width: 300px;
            height: 300px;
          }
        }
        
        /* HORIZONTAL SPIN (side to side) */
        @keyframes globeSpinHorizontal {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }
        
        /* Ocean */
        .globe-ocean-3d {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #5DADE2 0%, #2874A6 50%, #1A5490 100%);
          animation: oceanScroll 30s linear infinite;
        }
        
        @keyframes oceanScroll {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }
        
        /* India Saffron shape */
        .india-saffron-shape {
          position: absolute;
          top: 25%;
          left: 40%;
          width: 25%;
          height: 45%;
          background: linear-gradient(135deg, #FF9933 0%, #FF6B00 50%, #C44500 100%);
          border-radius: 40% 60% 30% 70% / 30% 40% 60% 70%;
          transform: rotate(-5deg);
          box-shadow: 
            0 0 30px rgba(255, 153, 51, 0.6),
            inset 0 -8px 20px rgba(0, 0, 0, 0.3);
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
          animation: shapePulse 4s ease-in-out infinite;
        }
        
        @keyframes shapePulse {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 153, 51, 0.6), inset 0 -8px 20px rgba(0, 0, 0, 0.3); }
          50% { box-shadow: 0 0 50px rgba(255, 153, 51, 0.9), inset 0 -8px 20px rgba(0, 0, 0, 0.3); }
        }
        
        /* Other continents */
        .continent {
          position: absolute;
          background: linear-gradient(135deg, #138808 0%, #0D6E06 100%);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          opacity: 0.85;
        }
        
        .continent-africa {
          top: 25%;
          left: 15%;
          width: 25%;
          height: 40%;
          border-radius: 40% 60% 30% 70% / 30% 40% 60% 70%;
          transform: rotate(-10deg);
        }
        
        .continent-asia {
          top: 25%;
          right: 8%;
          width: 25%;
          height: 30%;
          border-radius: 50% 50% 60% 40% / 40% 50% 60% 50%;
        }
        
        .continent-australia {
          bottom: 25%;
          right: 18%;
          width: 15%;
          height: 12%;
          border-radius: 50%;
        }
        
        /* Grid lines */
        .globe-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .globe-line-eq {
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
        }
        
        .globe-line-mer {
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
        }
        
        /* Shine */
        .globe-shine-3d {
          position: absolute;
          top: 10%;
          left: 15%;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 60%);
          filter: blur(25px);
          pointer-events: none;
        }
        
        /* Shadow */
        .globe-shadow-3d {
          position: absolute;
          top: 0;
          right: 0;
          width: 55%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(ellipse at right, rgba(0, 0, 0, 0.5) 0%, transparent 70%);
          pointer-events: none;
        }
        
        /* ═══════════════════════════════════════════════
           REAL 3D LANDMARKS (Pop out of globe!)
        ═══════════════════════════════════════════════ */
        .landmarks-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .landmark-3d {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: landmarkPop 4s ease-in-out infinite;
        }
        
        @keyframes landmarkPop {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        
        .landmark-svg {
          width: 70px;
          height: 84px;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(200, 121, 82, 0.5));
        }
        
        @media (max-width: 768px) {
          .landmark-svg {
            width: 50px;
            height: 60px;
          }
        }
        
        @media (max-width: 480px) {
          .landmark-svg {
            width: 40px;
            height: 48px;
          }
        }
        
        .landmark-shadow {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 12px;
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.6), transparent);
          border-radius: 50%;
          filter: blur(4px);
        }
        
        .landmark-label-3d {
          margin-top: 8px;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F5EBDD;
          background: rgba(42, 31, 26, 0.95);
          padding: 3px 8px;
          border-radius: 10px;
          border: 1px solid rgba(200, 121, 82, 0.6);
          white-space: nowrap;
          font-weight: 600;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }
        
        @media (max-width: 768px) {
          .landmark-label-3d {
            font-size: 0.5rem;
            padding: 2px 6px;
          }
        }
        
        /* LANDMARK POSITIONS (over the globe, not on it) */
        .taj-position {
          top: 15%;
          left: 45%;
          animation-delay: 0s;
        }
        
        .delhi-position {
          top: 10%;
          left: 30%;
          animation-delay: 0.5s;
        }
        
        .mumbai-position {
          top: 55%;
          left: 15%;
          animation-delay: 1s;
        }
        
        .kolkata-position {
          top: 30%;
          right: 15%;
          animation-delay: 1.5s;
        }
        
        .golden-position {
          top: 5%;
          left: 15%;
          animation-delay: 2s;
        }
        
        .hyderabad-position {
          top: 65%;
          left: 40%;
          animation-delay: 2.5s;
        }
        
        .mysore-position {
          bottom: 5%;
          left: 30%;
          animation-delay: 3s;
        }
        
        .himalaya-position {
          top: 5%;
          right: 30%;
          animation-delay: 3.5s;
        }
        
        .konark-position {
          bottom: 15%;
          right: 30%;
          animation-delay: 4s;
        }
        
        /* GLOW */
        .globe-glow-3d {
          position: absolute;
          inset: -60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.4) 0%, transparent 60%);
          filter: blur(60px);
          animation: globeGlow 4s ease-in-out infinite;
        }
        
        @keyframes globeGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        
        /* ORBIT RINGS */
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed rgba(200, 121, 82, 0.3);
        }
        
        .ring-1 {
          inset: -100px;
          animation: orbitSpin 25s linear infinite;
        }
        
        .ring-2 {
          inset: -180px;
          border-style: dotted;
          border-color: rgba(232, 181, 148, 0.2);
          animation: orbitSpin 40s linear infinite reverse;
        }
        
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* ORBITING PLANE */
        .orbiting-object {
          position: absolute;
          inset: -100px;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .plane-icon {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
        }
        
        @keyframes orbitLeft {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* BUTTONS */
        .hero-btn-primary {
          background: linear-gradient(135deg, #C87952 0%, #E8B594 100%);
          box-shadow:
            0 0 40px rgba(200, 121, 82, 0.5),
            0 10px 30px rgba(0, 0, 0, 0.4);
          position: relative;
        }
        
        .hero-btn-primary:hover {
          transform: translateY(-3px);
        }
        
        .hero-btn-glow {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #C87952, #E8B594);
          animation: btnGlow 3s ease-in-out infinite;
        }
        
        @keyframes btnGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0; }
        }
        
        .hero-btn-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid #C87952;
          animation: btnRing 3s ease-in-out infinite;
        }
        
        @keyframes btnRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection