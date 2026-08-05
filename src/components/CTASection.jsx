import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

const CTASection = () => {
  return (
    <section className="relative min-h-screen bg-noir flex items-center justify-center py-32 overflow-hidden">
      {/* Ambient orbs */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(200,121,82,0.3) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 70% 70%, rgba(232,181,148,0.25) 0%, transparent 50%)',
        }}
      />
      
      {/* MASSIVE background MAISON text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="font-cormorant font-light text-cream whitespace-nowrap select-none"
          style={{
            fontSize: 'clamp(10rem, 30vw, 25rem)',
            letterSpacing: '0.1em',
            lineHeight: 1,
            paddingLeft: '0.1em',
          }}
        >
          MAISON
        </motion.h2>
      </div>
      
      {/* Main CTA content */}
      <div className="container-luxury relative z-10 text-center">
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-tiny tracking-mega text-gold uppercase mb-8 font-mono"
          style={{ fontSize: '0.7rem', letterSpacing: '0.4em' }}
        >
          — Join The Maison
        </motion.p>
        
        {/* MASSIVE STATEMENT */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant font-light text-cream leading-[0.9] mb-12"
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 10rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Discover<br />
          <em className="italic text-gold" style={{
            textShadow: '0 0 60px rgba(200, 121, 82, 0.5)',
          }}>
            your piece.
          </em>
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cormorant italic text-platinum text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Twenty timeless pieces. Handcrafted across India. 
          Delivered to your door with intention.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="hero-btn-primary group inline-flex items-center gap-3 py-5 px-12 rounded-full transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, #C87952 0%, #E8B594 100%)',
              boxShadow: '0 0 60px rgba(200, 121, 82, 0.5), 0 20px 40px rgba(0, 0, 0, 0.4)',
            }}
            data-cursor="hover"
          >
            <span 
              className="text-tiny tracking-mega uppercase font-bold text-noir"
              style={{ fontSize: '0.8rem', letterSpacing: '0.25em' }}
            >
              Shop Collection
            </span>
            <FiArrowUpRight 
              className="text-noir group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-400" 
              size={18} 
            />
          </Link>
          
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 py-5 px-12 border border-champagne/40 text-champagne rounded-full hover:border-champagne hover:bg-champagne/10 transition-all duration-500"
            data-cursor="hover"
          >
            <span 
              className="text-tiny tracking-mega uppercase font-medium"
              style={{ fontSize: '0.8rem', letterSpacing: '0.25em' }}
            >
              Visit Atelier
            </span>
          </Link>
        </motion.div>
        
        {/* Bottom small text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 font-cormorant italic text-silver text-sm"
        >
          Kolkata · India · Est. 2025
        </motion.p>
      </div>
    </section>
  )
}

export default CTASection