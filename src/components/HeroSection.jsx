import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'

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
  const globeY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const smoothGlobeY = useSpring(globeY, { stiffness: 100, damping: 30 })
  
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
  
  const globeRotate = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const globeTilt = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-noir hero-india"
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
        <div className="india-orb orb-saffron" />
        <div className="india-orb orb-green" />
        <div className="india-orb orb-gold" />
      </div>
      
      {/* ═══════════════════════════════════════════════
          THE MASSIVE INDIA GLOBE 🇮🇳
      ═══════════════════════════════════════════════ */}
      <motion.div
        style={{ 
          y: smoothGlobeY,
          rotateY: globeRotate,
          rotateX: globeTilt,
        }}
        className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={mounted ? { scale: 1, opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 2.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ 
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="india-globe" style={{ animation: 'globeRotate 30s linear infinite' }}>
            {/* Ocean base */}
            <div className="globe-ocean" />
            
            {/* India shape prominent */}
            <div className="india-shape" />
            
            {/* Continents subtle */}
            <div className="globe-continent globe-continent-1" />
            <div className="globe-continent globe-continent-2" />
            <div className="globe-continent globe-continent-3" />
            
            {/* Grid lines (like a globe) */}
            <div className="globe-grid globe-grid-h" />
            <div className="globe-grid globe-grid-v" />
            
            {/* Clouds */}
            <div className="globe-cloud globe-cloud-1" />
            <div className="globe-cloud globe-cloud-2" />
            
            {/* Shine highlight */}
            <div className="globe-shine" />
            
            {/* Shadow */}
            <div className="globe-shadow" />
            
            {/* ═══════════════════════════════════
                INDIAN LANDMARKS ON GLOBE
            ═══════════════════════════════════ */}
            
            {/* TAJ MAHAL (top center of India) */}
            <div className="landmark landmark-taj" style={{ animation: 'landmarkFloat 4s ease-in-out infinite' }}>
              <div className="landmark-emoji">🕌</div>
              <div className="landmark-label">Taj Mahal</div>
            </div>
            
            {/* RED FORT / INDIA GATE (Delhi) */}
            <div className="landmark landmark-delhi" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 0.5s' }}>
              <div className="landmark-emoji">🏛️</div>
              <div className="landmark-label">Delhi</div>
            </div>
            
            {/* GOLDEN TEMPLE */}
            <div className="landmark landmark-golden" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 1s' }}>
              <div className="landmark-emoji">🛕</div>
              <div className="landmark-label">Golden Temple</div>
            </div>
            
            {/* GATEWAY OF INDIA (Mumbai) */}
            <div className="landmark landmark-mumbai" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 1.5s' }}>
              <div className="landmark-emoji">🌊</div>
              <div className="landmark-label">Mumbai</div>
            </div>
            
            {/* VICTORIA MEMORIAL (Kolkata - YOUR CITY!) */}
            <div className="landmark landmark-kolkata" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 2s' }}>
              <div className="landmark-emoji">🏛️</div>
              <div className="landmark-label">Kolkata ⭐</div>
            </div>
            
            {/* CHARMINAR (Hyderabad) */}
            <div className="landmark landmark-hyderabad" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 2.5s' }}>
              <div className="landmark-emoji">🕌</div>
              <div className="landmark-label">Hyderabad</div>
            </div>
            
            {/* MYSORE PALACE */}
            <div className="landmark landmark-mysore" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 3s' }}>
              <div className="landmark-emoji">🏰</div>
              <div className="landmark-label">Mysore</div>
            </div>
            
            {/* KONARK SUN TEMPLE */}
            <div className="landmark landmark-konark" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 3.5s' }}>
              <div className="landmark-emoji">☀️</div>
              <div className="landmark-label">Konark</div>
            </div>
            
            {/* HIMALAYAS (top) */}
            <div className="landmark landmark-himalaya" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 4s' }}>
              <div className="landmark-emoji">⛰️</div>
              <div className="landmark-label">Himalayas</div>
            </div>
            
            {/* KERALA (South) */}
            <div className="landmark landmark-kerala" style={{ animation: 'landmarkFloat 4s ease-in-out infinite 4.5s' }}>
              <div className="landmark-emoji">🌴</div>
              <div className="landmark-label">Kerala</div>
            </div>
          </div>
          
          {/* Glow around globe */}
          <div className="india-glow" />
          
          {/* Multiple orbit rings */}
          <div className="india-orbit-ring india-orbit-ring-1" />
          <div className="india-orbit-ring india-orbit-ring-2" />
          <div className="india-orbit-ring india-orbit-ring-3" />
          
          {/* Orbiting satellite - Airplane */}
          <div className="orbiting-plane" style={{ animation: 'orbitPlane 15s linear infinite' }}>
            <div className="plane-emoji">✈️</div>
          </div>
          
          {/* Orbiting satellite - Star */}
          <div className="orbiting-star" style={{ animation: 'orbitStar 20s linear infinite reverse' }}>
            <div className="star-emoji">⭐</div>
          </div>
          
          {/* Orbiting satellite - Sparkle */}
          <div className="orbiting-sparkle" style={{ animation: 'orbitSparkle 12s linear infinite' }}>
            <div className="sparkle-emoji">✨</div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          TOP LABEL
      ═══════════════════════════════════════════════ */}
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
      
      {/* ═══════════════════════════════════════════════
          MAIN HEADLINE (Bottom half)
      ═══════════════════════════════════════════════ */}
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
                  style={{
                    textShadow: '0 0 40px rgba(200, 121, 82, 0.5)',
                  }}
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
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(200, 121, 82, 0.6))',
                  }}
                >
                  <em className="italic">Incredible India</em>
                </motion.span>
              </div>
            </h1>
            
            {/* Subtitle */}
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
                Delivered with <span className="text-gold not-italic">love</span> 
                {' '}across every state of India.
              </p>
            </motion.div>
            
            {/* CTA Buttons */}
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
                  className="relative z-10 text-tiny tracking-mega uppercase font-bold text-noir flex items-center gap-2"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  <span>Explore Collection</span>
                  <span className="text-lg">🛍️</span>
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 border-2 border-champagne/40 text-champagne rounded-full hover:border-champagne hover:bg-champagne/10 transition-all duration-500 backdrop-blur-sm"
                data-cursor="hover"
              >
                <span 
                  className="text-tiny tracking-mega uppercase font-medium flex items-center gap-2"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  <span>Our Story</span>
                  <span className="text-lg">✨</span>
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
        .hero-india * {
          will-change: auto;
          transform: translateZ(0);
        }
        
        @keyframes marqueeIndia {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        
        /* AMBIENT ORBS */
        .india-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 15s ease-in-out infinite;
        }
        
        .orb-saffron {
          top: 10%; left: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255, 153, 51, 0.3) 0%, transparent 70%);
        }
        
        .orb-green {
          top: 40%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(19, 136, 8, 0.25) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        .orb-gold {
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
           MASSIVE INDIA GLOBE
        ═══════════════════════════════════════════════ */
        .india-globe {
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
          .india-globe {
            width: 450px;
            height: 450px;
          }
        }
        
        @media (max-width: 768px) {
          .india-globe {
            width: 350px;
            height: 350px;
          }
        }
        
        @media (max-width: 480px) {
          .india-globe {
            width: 280px;
            height: 280px;
          }
        }
        
        @keyframes globeRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* OCEAN */
        .globe-ocean {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #5DADE2 0%, #2874A6 50%, #1A5490 100%);
        }
        
        /* INDIA PROMINENT SHAPE (Saffron/Orange - Peninsula) */
        .india-shape {
          position: absolute;
          top: 25%;
          left: 45%;
          width: 22%;
          height: 45%;
          background: linear-gradient(135deg, #FF9933 0%, #FF6B00 50%, #C44500 100%);
          border-radius: 40% 60% 30% 70% / 30% 40% 60% 70%;
          transform: rotate(-5deg);
          box-shadow: 
            0 0 20px rgba(255, 153, 51, 0.6),
            inset 0 -5px 15px rgba(0, 0, 0, 0.3);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
        
        /* Other continents (subtle green) */
        .globe-continent {
          position: absolute;
          background: linear-gradient(135deg, #138808 0%, #0D6E06 100%);
          border-radius: 50% 40% 60% 30% / 40% 50% 60% 50%;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          opacity: 0.9;
        }
        
        .globe-continent-1 {
          top: 20%;
          left: 15%;
          width: 30%;
          height: 40%;
          border-radius: 40% 60% 30% 70% / 30% 40% 60% 70%;
          transform: rotate(-15deg);
        }
        
        .globe-continent-2 {
          top: 40%;
          right: 8%;
          width: 25%;
          height: 30%;
          border-radius: 50% 50% 60% 40% / 40% 50% 60% 50%;
        }
        
        .globe-continent-3 {
          bottom: 15%;
          right: 20%;
          width: 15%;
          height: 15%;
          border-radius: 50%;
        }
        
        /* GRID LINES (globe effect) */
        .globe-grid {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }
        
        .globe-grid-h {
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
        }
        
        .globe-grid-v {
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
        }
        
        /* CLOUDS */
        .globe-cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          filter: blur(6px);
          animation: cloudDrift 25s linear infinite;
        }
        
        .globe-cloud-1 {
          top: 20%;
          left: 20%;
          width: 80px;
          height: 25px;
        }
        
        .globe-cloud-2 {
          top: 55%;
          right: 15%;
          width: 100px;
          height: 30px;
          animation-delay: -12s;
        }
        
        @keyframes cloudDrift {
          from { transform: translateX(0); }
          to { transform: translateX(600px); }
        }
        
        /* SHINE */
        .globe-shine {
          position: absolute;
          top: 8%;
          left: 12%;
          width: 45%;
          height: 45%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 60%);
          filter: blur(25px);
          pointer-events: none;
        }
        
        /* SHADOW */
        .globe-shadow {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(ellipse at right, rgba(0, 0, 0, 0.5) 0%, transparent 70%);
          pointer-events: none;
        }
        
        /* ═══════════════════════════════════════════════
           INDIAN LANDMARKS (Floating on globe)
        ═══════════════════════════════════════════════ */
        .landmark {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));
          z-index: 10;
        }
        
        .landmark-emoji {
          font-size: 2rem;
          background: rgba(245, 235, 221, 0.95);
          border: 2px solid #C87952;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(200, 121, 82, 0.4);
        }
        
        .landmark-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F5EBDD;
          background: rgba(42, 31, 26, 0.9);
          padding: 3px 8px;
          border-radius: 12px;
          border: 1px solid rgba(200, 121, 82, 0.5);
          white-space: nowrap;
          font-weight: 600;
          backdrop-filter: blur(4px);
        }
        
        @media (max-width: 768px) {
          .landmark-emoji {
            font-size: 1.5rem;
            width: 40px;
            height: 40px;
          }
          
          .landmark-label {
            font-size: 0.5rem;
            padding: 2px 6px;
          }
        }
        
        @keyframes landmarkFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        
        /* LANDMARK POSITIONS ON GLOBE */
        .landmark-taj {
          top: 30%;
          left: 55%;
        }
        
        .landmark-delhi {
          top: 22%;
          left: 48%;
        }
        
        .landmark-golden {
          top: 20%;
          left: 42%;
        }
        
        .landmark-mumbai {
          top: 55%;
          left: 40%;
        }
        
        .landmark-kolkata {
          top: 40%;
          right: 30%;
        }
        
        .landmark-hyderabad {
          top: 60%;
          left: 50%;
        }
        
        .landmark-mysore {
          bottom: 25%;
          left: 45%;
        }
        
        .landmark-konark {
          top: 50%;
          right: 25%;
        }
        
        .landmark-himalaya {
          top: 15%;
          left: 52%;
        }
        
        .landmark-kerala {
          bottom: 18%;
          left: 43%;
        }
        
        /* GLOW AROUND GLOBE */
        .india-glow {
          position: absolute;
          inset: -50px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.4) 0%, transparent 60%);
          filter: blur(50px);
          animation: globeGlow 4s ease-in-out infinite;
        }
        
        @keyframes globeGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        
        /* ORBIT RINGS */
        .india-orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed rgba(200, 121, 82, 0.3);
        }
        
        .india-orbit-ring-1 {
          inset: -80px;
          animation: orbitRotate 25s linear infinite;
        }
        
        .india-orbit-ring-2 {
          inset: -140px;
          border-style: dotted;
          border-color: rgba(232, 181, 148, 0.25);
          animation: orbitRotate 40s linear infinite reverse;
        }
        
        .india-orbit-ring-3 {
          inset: -200px;
          border-color: rgba(200, 121, 82, 0.15);
          animation: orbitRotate 60s linear infinite;
        }
        
        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* ORBITING PLANE */
        .orbiting-plane {
          position: absolute;
          inset: -80px;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .plane-emoji {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
        }
        
        @keyframes orbitPlane {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* ORBITING STAR */
        .orbiting-star {
          position: absolute;
          inset: -140px;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .star-emoji {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
        }
        
        @keyframes orbitStar {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* ORBITING SPARKLE */
        .orbiting-sparkle {
          position: absolute;
          inset: -200px;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .sparkle-emoji {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          filter: drop-shadow(0 0 12px rgba(232, 181, 148, 0.8));
        }
        
        @keyframes orbitSparkle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* PRIMARY BUTTON */
        .hero-btn-primary {
          background: linear-gradient(135deg, #C87952 0%, #E8B594 100%);
          box-shadow:
            0 0 40px rgba(200, 121, 82, 0.5),
            0 0 80px rgba(200, 121, 82, 0.2),
            0 10px 30px rgba(0, 0, 0, 0.4);
          position: relative;
        }
        
        .hero-btn-primary:hover {
          box-shadow:
            0 0 60px rgba(200, 121, 82, 0.7),
            0 0 120px rgba(200, 121, 82, 0.3),
            0 15px 40px rgba(0, 0, 0, 0.5);
          transform: translateY(-3px);
        }
        
        .hero-btn-glow {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #C87952, #E8B594);
          animation: heroBtnGlow 3s ease-in-out infinite;
        }
        
        @keyframes heroBtnGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0; }
        }
        
        .hero-btn-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid #C87952;
          animation: heroBtnRing 3s ease-in-out infinite;
        }
        
        @keyframes heroBtnRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0; }
        }
        
        @media (max-width: 768px) {
          .india-orb {
            filter: blur(50px);
          }
          
          .india-orbit-ring-3 {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection