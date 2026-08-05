import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

const SplitStorySection = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 })
  
  const numberY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])
  const smoothNumberY = useSpring(numberY, { stiffness: 100, damping: 30 })
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-charcoal overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* LEFT: Massive image with parallax */}
        <div className="relative overflow-hidden order-2 lg:order-1">
          <motion.div
            style={{ y: smoothImageY }}
            className="absolute inset-0 w-full h-[130%]"
          >
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&q=90"
              alt="MAISON Atelier"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(30%) contrast(1.1) brightness(0.85)' }}
              draggable={false}
            />
          </motion.div>
          
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(42,31,26,0.3) 0%, rgba(42,31,26,0.7) 100%)',
            }}
          />
          
          {/* HUGE floating number */}
          <motion.div
            style={{ y: smoothNumberY }}
            className="absolute top-1/2 -right-8 md:-right-16 -translate-y-1/2 pointer-events-none"
          >
            <span 
              className="font-cormorant font-light text-gold/10 select-none"
              style={{ 
                fontSize: 'clamp(15rem, 30vw, 30rem)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
              }}
            >
              01
            </span>
          </motion.div>
          
          {/* Image caption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10"
          >
            <p 
              className="text-tiny tracking-mega text-champagne uppercase font-mono mb-2"
              style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}
            >
              — The Atelier
            </p>
            <p className="font-cormorant italic text-cream text-lg">
              Park Street, Kolkata
            </p>
          </motion.div>
        </div>
        
        {/* RIGHT: Bold text content */}
        <div className="relative flex items-center px-8 md:px-16 lg:px-20 py-24 order-1 lg:order-2">
          <div className="max-w-lg">
            
            {/* Number label */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-8 font-mono"
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}
            >
              — Chapter 01
            </motion.p>
            
            {/* MASSIVE HEADING */}
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-light text-cream mb-8 leading-[0.9]"
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                letterSpacing: '-0.03em',
              }}
            >
              A house<br />
              built on<br />
              <em className="italic text-gold" style={{
                textShadow: '0 0 40px rgba(200, 121, 82, 0.4)',
              }}>
                obsession.
              </em>
            </motion.h3>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-cormorant italic text-platinum text-lg md:text-xl leading-relaxed mb-12"
            >
              Founded in Kolkata in 2025 with a singular belief: 
              that clothing should be an heirloom, not an object 
              of consumption.
            </motion.p>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-4"
                data-cursor="hover"
              >
                <div className="relative overflow-hidden">
                  <span 
                    className="block text-tiny tracking-mega text-cream uppercase font-medium border-b border-cream group-hover:text-gold group-hover:border-gold transition-all duration-500 pb-2"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.25em' }}
                  >
                    Read Our Story
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-cream group-hover:border-gold group-hover:bg-gold flex items-center justify-center transition-all duration-500">
                  <FiArrowUpRight 
                    className="text-cream group-hover:text-noir transition-colors duration-400" 
                    size={14} 
                  />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SplitStorySection