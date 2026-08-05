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
  
  const globeRotate = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
  const globeTilt = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-noir hero-creative"
    >
      {/* ═══════════════════════════════════════════════
          COLORFUL BACKGROUND GRADIENT
      ═══════════════════════════════════════════════ */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #2A1F1A 0%, #3D2E24 50%, #5C1E2E 100%)',
        }}
      />
      
      {/* Colorful ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="creative-orb creative-orb-1" />
        <div className="creative-orb creative-orb-2" />
        <div className="creative-orb creative-orb-3" />
        <div className="creative-orb creative-orb-4" />
      </div>
      
      {/* ═══════════════════════════════════════════════
          FLOATING STICKERS/EMOJIS (Playful!)
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={mounted ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.68, -0.55, 0.265, 1.55] }}
        className="absolute top-32 md:top-40 right-8 md:right-32 z-20 pointer-events-none"
        style={{ animation: 'floatSlow 6s ease-in-out infinite' }}
      >
        <div className="floating-sticker sticker-star" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 20 }}
        animate={mounted ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        className="absolute top-1/2 left-8 md:left-24 z-20 pointer-events-none"
        style={{ animation: 'floatSlow 5s ease-in-out infinite 1s' }}
      >
        <div className="floating-sticker sticker-sparkle" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={mounted ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 2, ease: [0.68, -0.55, 0.265, 1.55] }}
        className="absolute bottom-40 right-16 md:right-40 z-20 pointer-events-none"
        style={{ animation: 'floatSlow 7s ease-in-out infinite 2s' }}
      >
        <div className="floating-sticker sticker-diamond" />
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          THE STAR — CARTOON EARTH GLOBE
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
          transition={{ 
            duration: 2, 
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="relative"
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="cartoon-earth" style={{ animation: 'earthRotate 20s linear infinite' }}>
            {/* Ocean base */}
            <div className="earth-ocean" />
            
            {/* Continents (SVG-style) */}
            <div className="continent continent-1" />
            <div className="continent continent-2" />
            <div className="continent continent-3" />
            <div className="continent continent-4" />
            <div className="continent continent-5" />
            
            {/* Clouds */}
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="cloud cloud-3" />
            
            {/* Highlight shine */}
            <div className="earth-shine" />
            
            {/* Shadow */}
            <div className="earth-shadow" />
          </div>
          
          {/* Glow ring around earth */}
          <div className="earth-glow" />
          
          {/* Orbit ring */}
          <div className="earth-orbit-ring" />
        </motion.div>
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          TOP LABEL (Playful)
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 md:top-40 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-center gap-4">
            <span className="text-2xl">🌍</span>
            <p 
              className="text-tiny tracking-mega uppercase font-mono"
              style={{ 
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: '#E8B594',
              }}
            >
              Est. Kolkata · Made for the World
            </p>
            <span className="text-2xl">✨</span>
          </div>
        </div>
      </motion.div>
      
      {/* ═══════════════════════════════════════════════
          MAIN CONTENT (Layered over globe)
      ═══════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container-luxury w-full">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* HEADLINE — Playful & Bold */}
            <h1 
              className="font-cormorant font-light text-ivory leading-none mb-8 md:mb-12"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 12rem)',
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
                    textShadow: '0 0 40px rgba(200, 121, 82, 0.5), 0 0 80px rgba(200, 121, 82, 0.3)',
                  }}
                >
                  Craft
                </motion.span>
              </div>
              
              <div className="overflow-hidden mb-2">
                <motion.span 
                  initial={{ y: '120%', opacity: 0 }}
                  animate={mounted ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-champagne via-gold to-terracotta bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(200, 121, 82, 0.5))',
                  }}
                >
                  from
                </motion.span>
              </div>
              
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: '120%', opacity: 0 }}
                  animate={mounted ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  <em 
                    className="italic text-gold font-normal"
                    style={{
                      textShadow: '0 0 30px rgba(200, 121, 82, 0.8), 0 0 60px rgba(200, 121, 82, 0.4)',
                    }}
                  >
                    India
                  </em>
                  <span className="text-cream ml-4">🌏</span>
                </motion.span>
              </div>
            </h1>
            
            {/* Playful subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="mb-12 max-w-2xl mx-auto"
            >
              <p 
                className="font-cormorant italic text-cream leading-relaxed"
                style={{ 
                  fontSize: 'clamp(1.125rem, 1.75vw, 1.5rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                }}
              >
                Handmade luxury clothing, born in Kolkata,
                <br />
                shipped to <span className="text-gold not-italic">every corner</span> of India.
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
                className="hero-btn-primary group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 rounded-full transition-all duration-500 ease-luxury"
                data-cursor="hover"
              >
                <div className="hero-btn-glow" />
                <div className="hero-btn-ring" />
                
                <span 
                  className="relative z-10 text-tiny tracking-mega uppercase font-bold text-noir flex items-center gap-2"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  <span>Shop the Collection</span>
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
      
      {/* ═══════════════════════════════════════════════
          BOTTOM MARQUEE (Playful with emojis)
      ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 right-0 py-4 border-t border-gold/20 overflow-hidden z-10"
        style={{
          background: 'linear-gradient(to right, rgba(92,30,46,0.6), rgba(42,31,26,0.9), rgba(200,121,82,0.6))',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div 
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: 'marqueeCreative 30s linear infinite' }}
        >
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-16 flex-shrink-0">
              {[
                { text: 'Handcrafted in India', emoji: '🇮🇳' },
                { text: 'Free Shipping ₹5,000+', emoji: '📦' },
                { text: 'Made with Love', emoji: '❤️' },
                { text: 'COD Available', emoji: '💰' },
                { text: 'Est. Kolkata 2025', emoji: '✨' },
                { text: 'Pan-India Delivery', emoji: '🌏' },
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
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span 
          className="text-tiny tracking-mega uppercase font-mono flex items-center gap-2"
          style={{ 
            fontSize: '0.65rem',
            color: '#E4B590',
            letterSpacing: '0.3em',
          }}
        >
          <span>👇</span> Scroll for magic <span>👇</span>
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <FiArrowDown className="text-gold" size={16} />
        </motion.div>
      </motion.div>
      
      <style>{`
        .hero-creative * {
          will-change: auto;
          transform: translateZ(0);
        }
        
        @keyframes marqueeCreative {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg) translateZ(0); }
          50% { transform: translateY(-20px) rotate(5deg) translateZ(0); }
        }
        
        /* COLORFUL AMBIENT ORBS */
        .creative-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: creativeOrb 15s ease-in-out infinite;
          will-change: transform;
        }
        
        .creative-orb-1 {
          top: 10%; left: 5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.4) 0%, transparent 70%);
          animation-delay: 0s;
        }
        
        .creative-orb-2 {
          top: 40%; right: 5%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(92, 30, 46, 0.4) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        .creative-orb-3 {
          bottom: 10%; left: 20%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(232, 181, 148, 0.3) 0%, transparent 70%);
          animation-delay: 6s;
        }
        
        .creative-orb-4 {
          top: 20%; right: 30%;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(139, 74, 50, 0.4) 0%, transparent 70%);
          animation-delay: 9s;
        }
        
        @keyframes creativeOrb {
          0%, 100% { transform: translate(0, 0) scale(1) translateZ(0); }
          33% { transform: translate(50px, -50px) scale(1.2) translateZ(0); }
          66% { transform: translate(-30px, 40px) scale(0.9) translateZ(0); }
        }
        
        /* ═══════════════════════════════════════════════
           CARTOON EARTH GLOBE
        ═══════════════════════════════════════════════ */
        .cartoon-earth {
          position: relative;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            inset -30px -30px 60px rgba(0, 0, 0, 0.5),
            inset 30px 30px 80px rgba(255, 255, 255, 0.1),
            0 0 60px rgba(100, 180, 255, 0.4),
            0 0 120px rgba(100, 180, 255, 0.2),
            0 30px 60px rgba(0, 0, 0, 0.4);
          background: radial-gradient(circle at 30% 30%, #4A90E2 0%, #2E5C8A 50%, #1A3B5C 100%);
        }
        
        @media (max-width: 768px) {
          .cartoon-earth {
            width: 280px;
            height: 280px;
          }
        }
        
        @media (max-width: 480px) {
          .cartoon-earth {
            width: 220px;
            height: 220px;
          }
        }
        
        @keyframes earthRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* OCEAN */
        .earth-ocean {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: 
            radial-gradient(circle at 30% 30%, #5DADE2 0%, #2874A6 40%, #1A5490 100%);
        }
        
        /* CONTINENTS (blob shapes) */
        .continent {
          position: absolute;
          background: linear-gradient(135deg, #7CB342 0%, #558B2F 50%, #33691E 100%);
          border-radius: 50% 40% 60% 30% / 40% 50% 60% 50%;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
        
        .continent-1 {
          /* Africa/Europe */
          top: 20%;
          left: 30%;
          width: 40%;
          height: 45%;
          border-radius: 40% 60% 30% 70% / 30% 40% 60% 70%;
          transform: rotate(-15deg);
        }
        
        .continent-2 {
          /* Americas */
          top: 15%;
          left: 5%;
          width: 30%;
          height: 55%;
          border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
          transform: rotate(20deg);
        }
        
        .continent-3 {
          /* Asia */
          top: 25%;
          right: 5%;
          width: 35%;
          height: 40%;
          border-radius: 50% 50% 60% 40% / 40% 50% 60% 50%;
          background: linear-gradient(135deg, #8BC34A 0%, #689F38 100%);
        }
        
        .continent-4 {
          /* Australia */
          bottom: 20%;
          right: 20%;
          width: 20%;
          height: 20%;
          border-radius: 50%;
          background: linear-gradient(135deg, #9CCC65 0%, #7CB342 100%);
        }
        
        .continent-5 {
          /* Small island */
          bottom: 35%;
          left: 15%;
          width: 8%;
          height: 8%;
          border-radius: 50%;
          background: #7CB342;
        }
        
        /* CLOUDS */
        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          filter: blur(4px);
          animation: cloudDrift 30s linear infinite;
        }
        
        .cloud-1 {
          top: 20%;
          left: 20%;
          width: 60px;
          height: 20px;
        }
        
        .cloud-2 {
          top: 50%;
          right: 15%;
          width: 80px;
          height: 25px;
          animation-delay: -10s;
        }
        
        .cloud-3 {
          bottom: 25%;
          left: 30%;
          width: 50px;
          height: 18px;
          animation-delay: -20s;
        }
        
        @keyframes cloudDrift {
          from { transform: translateX(0); }
          to { transform: translateX(400px); }
        }
        
        /* SHINE HIGHLIGHT */
        .earth-shine {
          position: absolute;
          top: 10%;
          left: 15%;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 60%);
          filter: blur(20px);
          pointer-events: none;
        }
        
        /* SHADOW */
        .earth-shadow {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(ellipse at right, rgba(0, 0, 0, 0.5) 0%, transparent 70%);
          pointer-events: none;
        }
        
        /* GLOW AROUND EARTH */
        .earth-glow {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100, 180, 255, 0.3) 0%, transparent 60%);
          filter: blur(40px);
          animation: earthGlow 4s ease-in-out infinite;
        }
        
        @keyframes earthGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        /* ORBIT RING */
        .earth-orbit-ring {
          position: absolute;
          inset: -80px;
          border-radius: 50%;
          border: 2px dashed rgba(200, 121, 82, 0.3);
          animation: orbitRotate 30s linear infinite;
        }
        
        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* FLOATING STICKERS */
        .floating-sticker {
          width: 60px;
          height: 60px;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
        }
        
        @media (max-width: 768px) {
          .floating-sticker {
            width: 40px;
            height: 40px;
          }
        }
        
        .sticker-star {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
        }
        
        .sticker-sparkle {
          background: linear-gradient(135deg, #E8B594, #C87952);
          clip-path: polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%);
          box-shadow: 0 0 30px rgba(232, 181, 148, 0.6);
        }
        
        .sticker-diamond {
          background: linear-gradient(135deg, #C87952, #8B4A32);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          box-shadow: 0 0 30px rgba(200, 121, 82, 0.6);
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
          transform: translateY(-3px) translateZ(0);
        }
        
        .hero-btn-glow {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #C87952, #E8B594);
          animation: heroBtnGlow 3s ease-in-out infinite;
        }
        
        @keyframes heroBtnGlow {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.5; }
          50% { transform: scale(1.15) translateZ(0); opacity: 0; }
        }
        
        .hero-btn-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid #C87952;
          animation: heroBtnRing 3s ease-in-out infinite;
        }
        
        @keyframes heroBtnRing {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.3; }
          50% { transform: scale(1.3) translateZ(0); opacity: 0; }
        }
        
        @media (max-width: 768px) {
          .creative-orb {
            filter: blur(50px);
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection