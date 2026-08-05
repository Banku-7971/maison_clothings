import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ManifestoSection = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  
  const words = [
    { text: 'We', color: 'text-cream' },
    { text: 'do', color: 'text-cream' },
    { text: 'not', color: 'text-cream' },
    { text: 'chase', color: 'text-cream' },
    { text: 'trends.', color: 'text-gold', italic: true },
    { text: 'We', color: 'text-cream' },
    { text: 'create', color: 'text-cream' },
    { text: 'pieces', color: 'text-cream' },
    { text: 'that', color: 'text-cream' },
    { text: 'outlive', color: 'text-champagne', italic: true },
    { text: 'them.', color: 'text-cream' },
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-noir flex items-center justify-center py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(200,121,82,0.2) 0%, transparent 60%)',
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(232,181,148,0.15) 0%, transparent 50%)',
        }}
      />
      
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-1/2 -translate-x-1/2"
      >
        <p 
          className="text-tiny tracking-mega text-gold uppercase font-mono"
          style={{ fontSize: '0.65rem', letterSpacing: '0.4em' }}
        >
          — Manifesto —
        </p>
      </motion.div>
      
      {/* MAIN MANIFESTO TEXT */}
      <motion.div
        style={{ y, opacity }}
        className="container-luxury text-center relative z-10"
      >
        <h2 
          className="font-cormorant font-light leading-[0.95]"
          style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 10rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`inline-block mr-4 md:mr-6 ${word.color} ${word.italic ? 'italic' : ''}`}
              style={{
                textShadow: word.italic 
                  ? '0 0 40px rgba(200, 121, 82, 0.5), 0 0 80px rgba(200, 121, 82, 0.2)' 
                  : 'none',
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </h2>
      </motion.div>
      
      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        <div className="w-8 h-px bg-gold/40" />
        <div className="w-1 h-1 rounded-full bg-gold" style={{ boxShadow: '0 0 8px rgba(200, 121, 82, 0.8)' }} />
        <div className="w-8 h-px bg-gold/40" />
      </motion.div>
    </section>
  )
}

export default ManifestoSection