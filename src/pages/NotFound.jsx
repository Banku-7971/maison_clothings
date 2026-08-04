import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiHome, FiSearch } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import MarqueeStrip from '../components/MarqueeStrip'
import useUIStore from '../store/uiStore'
import { getBestsellers } from '../data/products'

// ═══════════════════════════════════════════════════════════════
// MAISON — 404 NOT FOUND PAGE
// ═══════════════════════════════════════════════════════════════
// When paths lead nowhere.
// Even our errors are editorial.
//
// Features:
// - Cinematic 404 display
// - Animated massive number
// - Elegant messaging
// - Multiple CTAs (Home, Search, Shop)
// - Recommended products
// - Search suggestion
// - Editorial marquee
// - Back button
// ═══════════════════════════════════════════════════════════════

const NotFound = () => {
  const navigate = useNavigate()
  const openSearch = useUIStore(state => state.openSearch)
  
  // ─────────────────────────────────────────
  // DOCUMENT TITLE
  // ─────────────────────────────────────────
  useEffect(() => {
    document.title = '404 — MAISON'
    return () => {
      document.title = 'MAISON'
    }
  }, [])
  
  // ─────────────────────────────────────────
  // RECOMMENDED PRODUCTS
  // ─────────────────────────────────────────
  const recommended = getBestsellers().slice(0, 4)
  
  return (
    <div className="bg-noir min-h-screen">
      
      {/* ═══════════════════════════════════════
          HERO — 404 DISPLAY
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center py-24 md:py-32 overflow-hidden">
        
        {/* Ambient gradient */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.15) 0%, transparent 60%)',
          }}
        />
        
        {/* Corner Markers */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-8 left-8 md:top-12 md:left-12"
        >
          <div className="w-4 h-px bg-gold" />
          <div className="w-px h-4 bg-gold" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-8 right-8 md:top-12 md:right-12"
        >
          <div className="w-4 h-px bg-gold ml-auto" />
          <div className="w-px h-4 bg-gold ml-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
        >
          <div className="w-px h-4 bg-gold" />
          <div className="w-4 h-px bg-gold" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        >
          <div className="w-px h-4 bg-gold ml-auto" />
          <div className="w-4 h-px bg-gold ml-auto" />
        </motion.div>
        
        <div className="container-luxury relative z-10 text-center">
          
          {/* Small Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-tiny tracking-mega text-gold uppercase mb-8"
            style={{ fontSize: '0.75rem' }}
          >
            — Page Not Found
          </motion.p>
          
          {/* Massive 404 */}
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorant font-light text-ivory leading-none mb-8"
            style={{ 
              fontSize: 'clamp(8rem, 25vw, 25rem)',
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
            }}
          >
            <span className="inline-block">4</span>
            <em className="italic text-gold inline-block mx-2">0</em>
            <span className="inline-block">4</span>
          </motion.h1>
          
          {/* Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-cormorant font-light text-ivory mb-6"
            style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            This path leads<br />
            <em className="italic text-gold">nowhere.</em>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-cormorant italic text-platinum text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed"
          >
            The piece you seek exists only in imagination. 
            Return to the atelier, where all things are possible.
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-3 py-4 px-8 border border-graphite text-silver hover:text-ivory hover:border-ivory transition-all duration-400"
              data-cursor="hover"
            >
              <FiArrowLeft 
                size={14} 
                className="transition-transform duration-400 group-hover:-translate-x-1" 
              />
              <span 
                className="text-tiny tracking-mega uppercase"
                style={{ fontSize: '0.7rem' }}
              >
                Go Back
              </span>
            </button>
            
            {/* Home Button */}
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
              data-cursor="hover"
            >
              <span className="relative overflow-hidden">
                <span 
                  className="inline-flex items-center gap-2 py-4 px-8 border border-ivory text-ivory text-tiny tracking-mega uppercase relative z-10 transition-colors duration-500 group-hover:text-noir"
                  style={{ fontSize: '0.7rem' }}
                >
                  <FiHome size={14} />
                  Return Home
                  <motion.span 
                    className="absolute inset-0 bg-ivory -z-10"
                    initial={{ y: '100%' }}
                    whileHover={{ y: '0%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </span>
            </Link>
            
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="group inline-flex items-center gap-3 py-4 px-8 bg-gold text-noir hover:bg-ivory transition-colors duration-500"
              data-cursor="hover"
            >
              <FiSearch size={14} />
              <span 
                className="text-tiny tracking-mega uppercase font-medium"
                style={{ fontSize: '0.7rem' }}
              >
                Search
              </span>
            </button>
          </motion.div>
          
          {/* Bottom coordinate label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 text-tiny tracking-mega text-silver uppercase font-mono"
            style={{ fontSize: '0.6rem' }}
          >
            ERR—404 · Location Unknown
          </motion.p>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════ */}
      <MarqueeStrip
        items={[
          'Return to the atelier',
          'All pieces await',
          'Continue your journey',
        ]}
        speed={50}
        separator="diamond"
        variant="italic"
        bgColor="bg-charcoal"
      />
      
      {/* ═══════════════════════════════════════
          SUGGESTED PIECES
      ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-6"
              style={{ fontSize: '0.7rem' }}
            >
              — While You're Here
            </motion.p>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-cormorant font-light text-ivory mb-4"
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1,
              }}
            >
              Discover <em className="italic text-gold">these.</em>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cormorant italic text-platinum text-base max-w-md mx-auto"
            >
              Our most-loved pieces from the atelier
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {recommended.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
                showQuickAdd={true}
                showWishlist={true}
              />
            ))}
          </div>
          
          {/* View All */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3"
              data-cursor="hover"
            >
              <span 
                className="text-tiny tracking-mega text-ivory uppercase pb-2 border-b border-ivory group-hover:border-gold group-hover:text-gold transition-all duration-400"
                style={{ fontSize: '0.75rem' }}
              >
                Explore All Pieces
              </span>
              <FiArrowRight 
                className="text-ivory group-hover:text-gold group-hover:translate-x-1 transition-all duration-400" 
                size={16} 
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default NotFound