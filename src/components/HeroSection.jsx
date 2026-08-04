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
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-noir"
    >
      {/* BACKGROUND IMAGE with PARALLAX */}
      <motion.div
        style={{ y: smoothImageY }}
        className="absolute inset-0 w-full h-[130%]"
      >
        <img
          src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=2400&q=90"
          alt="MAISON — Signature Collection"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(0.3) saturate(1.2) hue-rotate(-10deg)' }}
          draggable={false}
        />
      </motion.div>
      
      {/* GRADIENT OVERLAYS */}
      <div 
        className="absolute inset-x-0 top-0 h-60 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(42,31,26,0.9) 0%, transparent 100%)',
        }}
      />
      
      <div 
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(42,31,26,0.95) 0%, rgba(42,31,26,0.5) 50%, transparent 100%)',
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(42,31,26,0.5) 100%)',
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(183,110,93,0.4) 0%, transparent 40%)',
        }}
      />
      
      {/* CORNER MARKERS */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute top-32 left-6 md:top-40 md:left-12 z-10"
      >
        <div className="w-6 h-px bg-gold" />
        <div className="w-px h-6 bg-gold" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute top-32 right-6 md:top-40 md:right-12 z-10"
      >
        <div className="w-6 h-px bg-champagne ml-auto" />
        <div className="w-px h-6 bg-champagne ml-auto" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="absolute bottom-32 left-6 md:bottom-40 md:left-12 z-10"
      >
        <div className="w-px h-6 bg-wine-warm" />
        <div className="w-6 h-px bg-wine-warm" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="absolute bottom-32 right-6 md:bottom-40 md:right-12 z-10"
      >
        <div className="w-px h-6 bg-gold ml-auto" />
        <div className="w-6 h-px bg-gold ml-auto" />
      </motion.div>
      
      {/* TOP LABELS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 md:top-40 left-0 right-0 z-10"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            <div className="hidden md:block">
              <p className="text-tiny tracking-mega text-gold uppercase font-mono" style={{ fontSize: '0.7rem' }}>
                Fall / Winter 2025
              </p>
            </div>
            <div className="hidden md:block">
              <p className="text-tiny tracking-mega text-champagne uppercase font-mono" style={{ fontSize: '0.7rem' }}>
                Vol. 001 — Noir
              </p>
            </div>
            <div>
              <p className="text-tiny tracking-mega text-silver uppercase font-mono" style={{ fontSize: '0.7rem' }}>
                Kolkata — 22.5726° N
              </p>
            </div>
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
            className="max-w-6xl"
          >
            <h1 
              className="font-cormorant font-light text-ivory leading-none mb-8 md:mb-12"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              <div className="overflow-hidden mb-2">
                <motion.span className="inline-block" variants={wordVariants}>
                  Where
                </motion.span>
              </div>
              
              <div className="overflow-hidden mb-2">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-champagne via-gold to-terracotta bg-clip-text text-transparent"
                  variants={wordVariants}
                >
                  craftsmanship
                </motion.span>
              </div>
              
              <div className="overflow-hidden">
                <motion.span className="inline-block" variants={wordVariants}>
                  <em className="italic text-gold font-normal mr-6">
                    meets
                  </em>
                  couture.
                </motion.span>
              </div>
            </h1>
            
            <motion.div variants={fadeInUp} className="mb-12 max-w-lg">
              <p 
                className="font-cormorant italic text-cream leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 1.75vw, 1.5rem)' }}
              >
                Timeless pieces meticulously crafted by master artisans 
                across India. Handmade luxury, delivered nationwide 
                from our Kolkata atelier.
              </p>
            </motion.div>
            
            {/* CTA BUTTONS */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 bg-gradient-terracotta text-ivory rounded-full hover:shadow-gold-glow-lg transition-all duration-500 ease-luxury shadow-warm-lg"
                data-cursor="hover"
              >
                <span 
                  className="text-tiny tracking-mega uppercase font-semibold"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  Discover Collection
                </span>
                <FiArrowRight 
                  className="transition-transform duration-400 group-hover:translate-x-1" 
                  size={16} 
                />
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 border-2 border-champagne/50 text-champagne rounded-full hover:border-champagne hover:bg-champagne/10 transition-all duration-500 backdrop-blur-sm"
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
      
      {/* BOTTOM MARQUEE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 right-0 py-4 border-t border-terracotta/30 overflow-hidden z-10"
        style={{
          background: 'linear-gradient(to right, rgba(92,30,46,0.6), rgba(42,31,26,0.8), rgba(200,121,82,0.6))',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div 
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: 'marqueeHero 40s linear infinite' }}
        >
          {[...Array(3)].map((_, groupIndex) => (
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
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span 
          className="text-tiny tracking-mega text-champagne uppercase font-mono"
          style={{ fontSize: '0.65rem' }}
        >
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <FiArrowDown className="text-gold" size={16} />
        </motion.div>
      </motion.div>
      
      <style>{`
        @keyframes marqueeHero {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection