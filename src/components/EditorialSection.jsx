import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

const EditorialSection = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 })
  
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])
  const smoothTextScale = useSpring(textScale, { stiffness: 100, damping: 30 })
  
  return (
    <section 
      ref={containerRef}
      className="relative h-[120vh] min-h-[900px] bg-noir overflow-hidden"
    >
      {/* Full-bleed background image */}
      <motion.div
        style={{ y: smoothImageY }}
        className="absolute inset-0 w-full h-[130%]"
      >
        <img
          src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=2400&q=90"
          alt="MAISON Editorial"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(0.4) saturate(1.4) hue-rotate(-15deg) brightness(0.65)' }}
          draggable={false}
        />
      </motion.div>
      
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(42,31,26,0.7) 0%, rgba(42,31,26,0.4) 50%, rgba(42,31,26,0.9) 100%)',
        }}
      />
      
      {/* Terracotta accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(200,121,82,0.4) 0%, transparent 50%)',
        }}
      />
      
      {/* Content centered */}
      <div className="relative z-10 h-full flex items-center justify-center px-8">
        <motion.div
          style={{ scale: smoothTextScale }}
          className="text-center max-w-6xl"
        >
          {/* Small label */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-tiny tracking-mega text-gold uppercase mb-8 font-mono"
            style={{ fontSize: '0.7rem', letterSpacing: '0.4em' }}
          >
            — The Collection
          </motion.p>
          
          {/* HUGE editorial text */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorant font-light text-cream leading-[0.9] mb-12"
            style={{ 
              fontSize: 'clamp(3rem, 12vw, 12rem)',
              letterSpacing: '-0.04em',
            }}
          >
            Fewer<br />
            pieces,<br />
            <em className="italic text-gold" style={{
              textShadow: '0 0 60px rgba(200, 121, 82, 0.6), 0 0 120px rgba(200, 121, 82, 0.3)',
            }}>
              better made.
            </em>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-cormorant italic text-platinum text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)' }}
          >
            For those who understand the difference between 
            quantity and quality. Between trend and timelessness.
          </motion.p>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 py-5 px-12 bg-gold text-noir rounded-full hover:bg-cream transition-all duration-500 shadow-2xl group"
              style={{
                boxShadow: '0 0 60px rgba(200, 121, 82, 0.5), 0 20px 40px rgba(0, 0, 0, 0.4)',
              }}
              data-cursor="hover"
            >
              <span 
                className="text-tiny tracking-mega uppercase font-bold"
                style={{ fontSize: '0.8rem', letterSpacing: '0.25em' }}
              >
                Explore Collection
              </span>
              <FiArrowUpRight 
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-400" 
                size={18} 
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EditorialSection