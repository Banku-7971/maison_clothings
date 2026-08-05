import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'

const HeroSection = () => {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 })
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 30 })
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  }
  
  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%', opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-noir hero-container"
    >
      {/* BACKGROUND IMAGE */}
      <motion.div
        style={{ y: smoothImageY }}
        className="absolute inset-0 w-full h-[130%]"
      >
        <img
          src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=2400&q=90"
          alt="MAISON — Signature Collection"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(0.35) saturate(1.3) hue-rotate(-10deg) brightness(0.85)' }}
          draggable={false}
        />
      </motion.div>
      
      {/* RESPONSIVE BACKGROUND MAISON TEXT */}
      <motion.div
        style={{ x: bgTextX }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={mounted ? { opacity: 0.06, scale: 1 } : {}}
          transition={{ duration: 3, delay: 1 }}
          className="font-cormorant font-light text-cream whitespace-nowrap select-none bg-maison-text"
          style={{
            letterSpacing: '0.15em',
            lineHeight: 1,
            paddingLeft: '0.15em',
          }}
        >
          MAISON
        </motion.h2>
      </motion.div>
      
      {/* GRADIENT OVERLAYS */}
      <div 
        className="absolute inset-x-0 top-0 h-60 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(42,31,26,0.9) 0%, transparent 100%)',
        }}
      />
      
      <div 
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(42,31,26,0.98) 0%, rgba(42,31,26,0.5) 50%, transparent 100%)',
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(42,31,26,0.6) 100%)',
        }}
      />
      
      {/* AMBIENT ORBS */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>
      
      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`particle-${i}`}
            className={`hero-particle hero-particle-${(i % 4) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
      
      {/* GOLD DUST */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {[...Array(12)].map((_, i) => (
          <div 
            key={`dust-${i}`}
            className="hero-dust"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* SPARKLES */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {[...Array(8)].map((_, i) => (
          <div 
            key={`sparkle-${i}`}
            className="hero-sparkle"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* LIGHT BEAM */}
      <div className="absolute inset-0 pointer-events-none z-[2] hero-light-beam" />
      
      {/* SCAN LINES */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(200, 121, 82, 0.5) 50%)',
          backgroundSize: '100% 3px',
        }}
      />
      
      {/* ROTATING RINGS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
      </div>
      
      {/* TERRACOTTA GLOWS */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 z-[2]"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(200,121,82,0.5) 0%, transparent 40%)',
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-[2]"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(232,181,148,0.4) 0%, transparent 40%)',
        }}
      />
      
      {/* TOP LABEL */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 md:top-40 left-0 right-0 z-10"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-center gap-6">
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ width: 0 }}
              animate={mounted ? { width: 60 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <p 
              className="text-tiny tracking-mega uppercase font-mono"
              style={{ 
                fontSize: '0.65rem',
                letterSpacing: '0.4em',
                color: '#E4B590',
                textShadow: '0 0 15px rgba(232, 181, 148, 0.6)',
              }}
            >
              Fall / Winter 2025
            </p>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ width: 0 }}
              animate={mounted ? { width: 60 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* MAIN CONTENT */}
      <motion.div
        style={{ y: smoothTextY, opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container-luxury w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="max-w-6xl mx-auto text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-tiny tracking-mega text-gold uppercase mb-6 font-mono"
              style={{ 
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textShadow: '0 0 10px rgba(200, 121, 82, 0.5)',
              }}
            >
              — Est. Kolkata · 2025
            </motion.p>
            
            <h1 
              className="font-cormorant font-light text-ivory leading-none mb-8 md:mb-12 hero-headline"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              <div className="overflow-hidden mb-2">
                <motion.span 
                  className="inline-block"
                  variants={wordVariants}
                  style={{
                    textShadow: '0 0 40px rgba(200, 121, 82, 0.4), 0 0 80px rgba(200, 121, 82, 0.2)',
                  }}
                >
                  Where
                </motion.span>
              </div>
              
              <div className="overflow-hidden mb-2">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-champagne via-gold to-terracotta bg-clip-text text-transparent"
                  variants={wordVariants}
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(200, 121, 82, 0.5))',
                  }}
                >
                  craftsmanship
                </motion.span>
              </div>
              
              <div className="overflow-hidden">
                <motion.span 
                  className="inline-block"
                  variants={wordVariants}
                  style={{
                    textShadow: '0 0 40px rgba(200, 121, 82, 0.4), 0 0 80px rgba(200, 121, 82, 0.2)',
                  }}
                >
                  <em 
                    className="italic text-gold font-normal mr-6"
                    style={{
                      textShadow: '0 0 30px rgba(200, 121, 82, 0.8), 0 0 60px rgba(200, 121, 82, 0.4)',
                    }}
                  >
                    meets
                  </em>
                  couture.
                </motion.span>
              </div>
            </h1>
            
            <motion.div
              className="mx-auto mb-8 h-[1px]"
              initial={{ width: 0, opacity: 0 }}
              animate={mounted ? { width: 100, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 2 }}
              style={{
                background: 'linear-gradient(to right, transparent, #C87952, transparent)',
                boxShadow: '0 0 10px rgba(200, 121, 82, 0.8)',
              }}
            />
            
            <motion.div variants={fadeInUp} className="mb-12 max-w-2xl mx-auto">
              <p 
                className="font-cormorant italic text-cream leading-relaxed"
                style={{ 
                  fontSize: 'clamp(1.125rem, 1.75vw, 1.5rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                Timeless pieces meticulously crafted by master artisans 
                across India. Handmade luxury, delivered nationwide 
                from our Kolkata atelier.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
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
                  className="relative z-10 text-tiny tracking-mega uppercase font-semibold text-noir"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  Discover Collection
                </span>
                <FiArrowRight 
                  className="relative z-10 text-noir transition-transform duration-400 group-hover:translate-x-1" 
                  size={16} 
                />
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 border border-champagne/40 text-champagne rounded-full hover:border-champagne hover:bg-champagne/10 transition-all duration-500 backdrop-blur-sm"
                data-cursor="hover"
              >
                <span 
                  className="text-tiny tracking-mega uppercase font-medium"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  Our Story
                </span>
                <FiArrowRight 
                  className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-400" 
                  size={14} 
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* MARQUEE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 right-0 py-4 border-t border-gold/20 overflow-hidden z-10"
        style={{
          background: 'linear-gradient(to right, rgba(92,30,46,0.5), rgba(42,31,26,0.85), rgba(200,121,82,0.5))',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div 
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: 'marqueeHero 40s linear infinite' }}
        >
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-16 flex-shrink-0">
              {[
                { text: 'Handcrafted in India', color: 'text-champagne' },
                { text: 'Est. Kolkata 2025', color: 'text-cream' },
                { text: 'Pan-India Delivery', color: 'text-gold' },
                { text: 'Master Artisans', color: 'text-rose-gold' },
                { text: 'Free Shipping ₹5,000+', color: 'text-champagne' },
                { text: 'COD Available', color: 'text-gold' },
              ].map((item, i) => (
                <span key={i} className={`text-tiny tracking-mega ${item.color} uppercase font-mono flex items-center gap-4`} style={{ fontSize: '0.7rem' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ boxShadow: '0 0 8px rgba(200, 121, 82, 0.8)' }} />
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span 
          className="text-tiny tracking-mega uppercase font-mono"
          style={{ 
            fontSize: '0.65rem',
            color: '#E4B590',
            letterSpacing: '0.3em',
          }}
        >
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <FiArrowDown className="text-gold" size={16} style={{ filter: 'drop-shadow(0 0 8px rgba(200, 121, 82, 0.8))' }} />
        </motion.div>
      </motion.div>
      
      <style>{`
        .hero-container * {
          will-change: auto;
          transform: translateZ(0);
        }
        
        @keyframes marqueeHero {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        
        /* RESPONSIVE MAISON BACKGROUND TEXT */
        .bg-maison-text {
          font-size: 18rem;
        }
        
        @media (max-width: 1280px) {
          .bg-maison-text {
            font-size: 14rem;
          }
        }
        
        @media (max-width: 1024px) {
          .bg-maison-text {
            font-size: 11rem;
          }
        }
        
        @media (max-width: 768px) {
          .bg-maison-text {
            font-size: 7rem;
          }
        }
        
        @media (max-width: 480px) {
          .bg-maison-text {
            font-size: 5rem;
          }
        }
        
        @media (max-width: 380px) {
          .bg-maison-text {
            font-size: 4rem;
          }
        }
        
        /* AMBIENT ORBS */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: heroOrbFloat 15s ease-in-out infinite;
          will-change: transform;
        }
        
        .hero-orb-1 {
          top: 15%; left: 10%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.4) 0%, transparent 70%);
          animation-delay: 0s;
        }
        
        .hero-orb-2 {
          top: 60%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(232, 181, 148, 0.3) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        .hero-orb-3 {
          bottom: 20%; left: 30%;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(92, 30, 46, 0.4) 0%, transparent 70%);
          animation-delay: 6s;
        }
        
        @keyframes heroOrbFloat {
          0%, 100% { transform: translate(0, 0) scale(1) translateZ(0); }
          33% { transform: translate(30px, -40px) scale(1.15) translateZ(0); }
          66% { transform: translate(-20px, 30px) scale(0.9) translateZ(0); }
        }
        
        /* PARTICLES */
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          bottom: -20px;
          animation: heroParticleRise linear infinite;
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
        .hero-particle-4 {
          width: 2.5px; height: 2.5px;
          background: #C87952;
          box-shadow: 0 0 6px rgba(200, 121, 82, 0.6);
        }
        
        @keyframes heroParticleRise {
          0% {
            transform: translateY(0) translateX(0) translateZ(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-110vh) translateX(40px) translateZ(0);
            opacity: 0;
          }
        }
        
        /* GOLD DUST */
        .hero-dust {
          position: absolute;
          top: -10px;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #C87952;
          box-shadow: 0 0 4px rgba(200, 121, 82, 0.8);
          animation: heroDustFall linear infinite;
          will-change: transform, opacity;
        }
        
        @keyframes heroDustFall {
          0% {
            transform: translateY(0) translateX(0) translateZ(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(110vh) translateX(30px) translateZ(0);
            opacity: 0;
          }
        }
        
        /* SPARKLES */
        .hero-sparkle {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: heroSparkleTwinkle 4s ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        .hero-sparkle::before,
        .hero-sparkle::after {
          content: '';
          position: absolute;
          background: #E8B594;
          box-shadow: 0 0 6px rgba(232, 181, 148, 0.9);
        }
        
        .hero-sparkle::before {
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          transform: translateY(-50%);
        }
        
        .hero-sparkle::after {
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          transform: translateX(-50%);
        }
        
        @keyframes heroSparkleTwinkle {
          0%, 100% { transform: scale(0) rotate(0deg) translateZ(0); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg) translateZ(0); opacity: 1; }
        }
        
        /* LIGHT BEAM */
        .hero-light-beam {
          background: linear-gradient(90deg, transparent 45%, rgba(200, 121, 82, 0.15) 50%, transparent 55%);
          animation: heroLightBeam 6s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.35;
          will-change: transform;
        }
        
        @keyframes heroLightBeam {
          0% { transform: translateX(-100%) translateZ(0); }
          100% { transform: translateX(100%) translateZ(0); }
        }
        
        /* ROTATING RINGS */
        .hero-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(200, 121, 82, 0.1);
          will-change: transform;
        }
        
        .hero-ring-1 {
          width: 600px;
          height: 600px;
          animation: heroRingRotate 40s linear infinite;
        }
        
        .hero-ring-2 {
          width: 900px;
          height: 900px;
          border-style: dashed;
          border-color: rgba(232, 181, 148, 0.08);
          animation: heroRingRotate 60s linear infinite reverse;
        }
        
        @keyframes heroRingRotate {
          from { transform: rotate(0deg) translateZ(0); }
          to { transform: rotate(360deg) translateZ(0); }
        }
        
        .hero-headline em {
          position: relative;
        }
        
        .hero-headline em::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(200, 121, 82, 0.5), transparent);
        }
        
        /* PRIMARY CTA BUTTON */
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
          transform: translateY(-2px) translateZ(0);
        }
        
        .hero-btn-glow {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #C87952, #E8B594);
          animation: heroBtnGlow 3s ease-in-out infinite;
          will-change: transform, opacity;
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
          will-change: transform, opacity;
        }
        
        @keyframes heroBtnRing {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.3; }
          50% { transform: scale(1.3) translateZ(0); opacity: 0; }
        }
        
        /* MOBILE OPTIMIZATIONS */
        @media (max-width: 768px) {
          .hero-orb {
            filter: blur(40px);
          }
          
          .hero-ring-2 {
            display: none;
          }
        }
        
        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .hero-container *,
          .hero-container *::before,
          .hero-container *::after {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection