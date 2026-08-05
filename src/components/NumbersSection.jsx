import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const AnimatedNumber = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  
  useEffect(() => {
    if (!inView) return
    
    const duration = 2000
    const start = performance.now()
    const target = parseInt(value)
    
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [inView, value, delay])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="text-center border-l border-graphite/40 first:border-l-0 px-6 md:px-8 py-6"
    >
      <div 
        className="font-cormorant font-light text-cream mb-3 tabular-nums leading-none"
        style={{ 
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          textShadow: '0 0 40px rgba(200, 121, 82, 0.3)',
        }}
      >
        {String(count).padStart(2, '0')}
      </div>
      <p 
        className="text-tiny tracking-mega text-champagne uppercase font-mono"
        style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

const NumbersSection = () => {
  const stats = [
    { value: 47, label: 'Hours Per Piece' },
    { value: 12, label: 'Master Artisans' },
    { value: 8, label: 'Indian States' },
    { value: 100, label: 'Percent Handcrafted' },
  ]
  
  return (
    <section className="relative py-24 md:py-32 bg-noir overflow-hidden">
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200,121,82,0.2) 0%, transparent 60%)',
        }}
      />
      
      <div className="container-luxury relative z-10">
        
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-tiny tracking-mega text-gold uppercase mb-6 font-mono"
            style={{ fontSize: '0.7rem', letterSpacing: '0.4em' }}
          >
            — By The Numbers
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-cormorant font-light text-cream"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            The math of<br />
            <em className="italic text-gold">craft.</em>
          </motion.h2>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedNumber 
              key={index}
              value={stat.value}
              label={stat.label}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NumbersSection