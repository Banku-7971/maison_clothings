import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'

const HeroSection = () => {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.5])
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-noir"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(135deg, #2A1F1A 0%, #3D2E24 40%, #5C1E2E 100%)',
        }}
      />
      
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>
      
      {/* MAISON BRAND NAME — Fixed at top */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-28 md:top-36 left-0 right-0 z-20 pointer-events-none"
      >
        <div className="container-luxury text-center">
          {/* Small label */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-gold/50" />
            <p 
              className="text-tiny tracking-mega uppercase font-mono"
              style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#E4B590' }}
            >
              Est. Kolkata · 2025
            </p>
            <div className="w-8 h-px bg-gold/50" />
          </div>
          
          {/* BIG MAISON TEXT — Solid, Not Transparent */}
          <h1 
            className="font-cormorant font-light text-ivory"
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '0.5em',
              paddingLeft: '0.5em',
              lineHeight: 1,
              textShadow: '0 0 30px rgba(200, 121, 82, 0.4)',
            }}
          >
            MAISON
          </h1>
        </div>
      </motion.div>
      
      {/* REALISTIC ROTATING GLOBE VIDEO */}
      <div className="absolute inset-0 flex items-center justify-center z-[3]">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={mounted ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative globe-container"
        >
          {/* Globe video — circular mask */}
          <div className="globe-mask">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="globe-video"
            >
              <source 
                src="https://cdn.pixabay.com/video/2024/03/22/205072-926411498_large.mp4" 
                type="video/mp4" 
              />
            </video>
          </div>
          
          {/* Globe shine highlight */}
          <div className="globe-shine" />
          
          {/* Globe atmospheric glow */}
          <div className="globe-atmosphere" />
          
          {/* Outer glow ring */}
          <div className="globe-outer-glow" />
          
          {/* Orbit ring 1 */}
          <div className="globe-orbit globe-orbit-1" />
          
          {/* Orbit ring 2 */}
          <div className="globe-orbit globe-orbit-2" />
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-[4]">
        {[...Array(15)].map((_, i) => (
          <div 
            key={`p-${i}`}
            className={`hero-particle hero-particle-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
      
      {/* BOTTOM CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-end pb-32 md:pb-40 pointer-events-none"
      >
        <div className="container-luxury w-full">
          <div className="max-w-6xl mx-auto text-center">
            
            <h2 
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
                  style={{ textShadow: '0 0 40px rgba(200, 121, 82, 0.6)' }}
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
            </h2>
            
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
              className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
            >
              <Link
                to="/shop"
                className="hero-btn-primary group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 rounded-full transition-all duration-500"
                data-cursor="hover"
              >
                <div className="hero-btn-glow" />
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
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <FiArrowDown className="text-gold" size={16} />
        </motion.div>
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
        @keyframes marqueeIndia {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        
        /* GLOBE CONTAINER */
        .globe-container {
          position: relative;
          width: 450px;
          height: 450px;
        }
        
        @media (max-width: 1024px) {
          .globe-container {
            width: 380px;
            height: 380px;
          }
        }
        
        @media (max-width: 768px) {
          .globe-container {
            width: 300px;
            height: 300px;
          }
        }
        
        @media (max-width: 480px) {
          .globe-container {
            width: 250px;
            height: 250px;
          }
        }
        
        /* CIRCULAR MASK for globe */
        .globe-mask {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            inset -30px -30px 60px rgba(0, 0, 0, 0.6),
            inset 20px 20px 50px rgba(255, 255, 255, 0.1);
        }
        
        .globe-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        
        /* SHINE on globe */
        .globe-shine {
          position: absolute;
          top: 8%;
          left: 12%;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 60%);
          filter: blur(20px);
          pointer-events: none;
        }
        
        /* ATMOSPHERE glow */
        .globe-atmosphere {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100, 180, 255, 0.25) 50%, transparent 70%);
          filter: blur(30px);
          pointer-events: none;
          animation: atmospherePulse 4s ease-in-out infinite;
        }
        
        @keyframes atmospherePulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        /* OUTER GLOW */
        .globe-outer-glow {
          position: absolute;
          inset: -50px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.35) 0%, transparent 60%);
          filter: blur(40px);
          pointer-events: none;
          animation: outerGlowPulse 5s ease-in-out infinite;
        }
        
        @keyframes outerGlowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        /* ORBIT RINGS */
        .globe-orbit {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .globe-orbit-1 {
          inset: -60px;
          border: 2px dashed rgba(200, 121, 82, 0.3);
          animation: orbitRotate 30s linear infinite;
        }
        
        .globe-orbit-2 {
          inset: -100px;
          border: 1px dotted rgba(232, 181, 148, 0.2);
          animation: orbitRotate 45s linear infinite reverse;
        }
        
        @keyframes orbitRotate {
          from { transform: rotate(0deg) rotateX(60deg); }
          to { transform: rotate(360deg) rotateX(60deg); }
        }
        
        /* AMBIENT ORBS */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 15s ease-in-out infinite;
        }
        
        .hero-orb-1 {
          top: 10%; left: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255, 153, 51, 0.2) 0%, transparent 70%);
        }
        
        .hero-orb-2 {
          top: 40%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(19, 136, 8, 0.15) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        .hero-orb-3 {
          bottom: 20%; left: 30%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.3) 0%, transparent 70%);
          animation-delay: 6s;
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.15); }
        }
        
        /* PARTICLES */
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          bottom: -20px;
          animation: particleRise linear infinite;
          will-change: transform, opacity;
        }
        
        .hero-particle-1 {
          width: 2px; height: 2px;
          background: #C87952;
          box-shadow: 0 0 5px rgba(200, 121, 82, 0.8);
        }
        .hero-particle-2 {
          width: 3px; height: 3px;
          background: #E8B594;
          box-shadow: 0 0 8px rgba(232, 181, 148, 0.8);
        }
        .hero-particle-3 {
          width: 1.5px; height: 1.5px;
          background: #F5EBDD;
          box-shadow: 0 0 4px rgba(245, 235, 221, 0.7);
        }
        
        @keyframes particleRise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-110vh) translateX(40px);
            opacity: 0;
          }
        }
        
        /* BUTTONS */
        .hero-btn-primary {
          background: linear-gradient(135deg, #C87952 0%, #E8B594 100%);
          box-shadow: 0 0 40px rgba(200, 121, 82, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4);
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
        
        @media (max-width: 768px) {
          .hero-orb {
            filter: blur(50px);
          }
          
          .globe-orbit-2 {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection