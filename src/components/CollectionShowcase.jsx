import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FiArrowUpRight, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { collectionsData } from '../data/collections'

// ═══════════════════════════════════════════════════════════════
// MAISON — COLLECTION SHOWCASE
// ═══════════════════════════════════════════════════════════════
// Editorial presentation of curated collections.
// Each collection is a story. Each story deserves its stage.
//
// Features:
// - Full-width horizontal scroll layout
// - Large editorial images per collection
// - Season badges and metadata
// - Philosophy quote per collection
// - Number pagination (01/04)
// - Navigation arrows
// - Keyboard navigation support
// - Snap scroll behavior
// - Image reveal on scroll
// - Color palette preview per collection
// - CTA to explore each collection
// - Editorial typography throughout
// ═══════════════════════════════════════════════════════════════

const CollectionShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  const collections = collectionsData
  const totalCollections = collections.length
  
  // ─────────────────────────────────────────
  // SCROLL TO SPECIFIC COLLECTION
  // ─────────────────────────────────────────
  const scrollToCollection = (index) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cardWidth = container.offsetWidth * 0.85 // Card + gap
    const scrollPosition = index * cardWidth
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })
    
    setActiveIndex(index)
  }
  
  // ─────────────────────────────────────────
  // NAVIGATION HANDLERS
  // ─────────────────────────────────────────
  const goToPrevious = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : totalCollections - 1
    scrollToCollection(newIndex)
  }
  
  const goToNext = () => {
    const newIndex = activeIndex < totalCollections - 1 ? activeIndex + 1 : 0
    scrollToCollection(newIndex)
  }
  
  // ─────────────────────────────────────────
  // KEYBOARD NAVIGATION
  // ─────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isInView) return
      
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, isInView])
  
  // ─────────────────────────────────────────
  // TRACK SCROLL POSITION
  // ─────────────────────────────────────────
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.offsetWidth * 0.85
      const newIndex = Math.round(scrollLeft / cardWidth)
      
      if (newIndex !== activeIndex && newIndex < totalCollections) {
        setActiveIndex(newIndex)
      }
    }
    
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeIndex, totalCollections])
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-noir overflow-hidden"
    >
      {/* Ambient background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 30%, rgba(201,169,110,0.15) 0%, transparent 60%)',
        }}
      />
      
      {/* ═══════════════════════════════════════
          SECTION HEADER
      ═══════════════════════════════════════ */}
      <div className="container-luxury mb-16 md:mb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          
          {/* Left: Title */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-tiny tracking-mega text-gold uppercase mb-6"
              style={{ fontSize: '0.7rem' }}
            >
              — The Collections
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-light text-ivory"
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Stories in
              <br />
              <em className="italic text-gold">fabric.</em>
            </motion.h2>
          </div>
          
          {/* Right: Description + Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <p className="font-cormorant italic text-platinum text-lg md:text-xl leading-relaxed mb-8">
              Four collections. Four philosophies. 
              Each piece within them speaks to a different 
              moment, a different mood, a different you.
            </p>
            
            {/* Pagination + Arrows */}
            <div className="flex items-center justify-between">
              
              {/* Counter */}
              <div className="flex items-baseline gap-2">
                <span 
                  className="font-cormorant text-4xl text-gold tabular-nums"
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-tiny text-silver font-mono tabular-nums" style={{ fontSize: '0.8rem' }}>
                  / {String(totalCollections).padStart(2, '0')}
                </span>
              </div>
              
              {/* Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={goToPrevious}
                  className="w-12 h-12 flex items-center justify-center border border-graphite hover:border-gold hover:bg-gold hover:text-noir text-ivory transition-all duration-400"
                  aria-label="Previous collection"
                  data-cursor="hover"
                >
                  <FiArrowLeft size={16} />
                </button>
                <button
                  onClick={goToNext}
                  className="w-12 h-12 flex items-center justify-center border border-graphite hover:border-gold hover:bg-gold hover:text-noir text-ivory transition-all duration-400"
                  aria-label="Next collection"
                  data-cursor="hover"
                >
                  <FiArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* ═══════════════════════════════════════
          HORIZONTAL SCROLL CONTAINER
      ═══════════════════════════════════════ */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pl-6 md:pl-12 lg:pl-24"
        style={{ scrollBehavior: 'smooth' }}
      >
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="flex-shrink-0 snap-start"
            style={{ 
              width: 'calc(85vw - 24px)',
              maxWidth: '900px',
              marginRight: '32px',
            }}
          >
            <Link
              to={`/collection/${collection.slug}`}
              className="block group"
              data-cursor="view"
            >
              {/* ═══════════════════════════════════════
                  COLLECTION CARD
              ═══════════════════════════════════════ */}
              <div className="relative aspect-[4/5] md:aspect-[3/4] bg-charcoal overflow-hidden">
                
                {/* Hero Image */}
                <motion.img
                  src={collection.heroImage}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05 }}
                  draggable={false}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent" />
                
                {/* Top Metadata */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <span 
                    className="px-3 py-1.5 bg-noir/60 backdrop-blur-sm border border-gold/50 text-gold text-tiny tracking-mega uppercase"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {collection.season}
                  </span>
                  
                  <span 
                    className="text-tiny tracking-mega text-ivory/70 uppercase font-mono"
                    style={{ fontSize: '0.6rem' }}
                  >
                    Vol. {String(index + 1).padStart(3, '0')}
                  </span>
                </div>
                
                {/* Corner Brackets */}
                <div className="absolute top-4 left-4">
                  <div className="w-3 h-px bg-gold/60" />
                  <div className="w-px h-3 bg-gold/60" />
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-px bg-gold/60 ml-auto" />
                  <div className="w-px h-3 bg-gold/60 ml-auto" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-px h-3 bg-gold/60" />
                  <div className="w-3 h-px bg-gold/60" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-px h-3 bg-gold/60 ml-auto" />
                  <div className="w-3 h-px bg-gold/60 ml-auto" />
                </div>
                
                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  
                  {/* Collection Name */}
                  <h3 
                    className="font-cormorant font-light text-ivory mb-3"
                    style={{ 
                      fontSize: 'clamp(2rem, 5vw, 4rem)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {collection.name}
                  </h3>
                  
                  {/* Subtitle */}
                  <p 
                    className="font-cormorant italic text-gold mb-6"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.375rem)' }}
                  >
                    {collection.subtitle}
                  </p>
                  
                  {/* Color Palette Preview */}
                  {collection.colorPalette && (
                    <div className="flex items-center gap-2 mb-6">
                      {collection.colorPalette.slice(0, 5).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* CTA */}
                  <div className="inline-flex items-center gap-3 group/cta">
                    <span 
                      className="text-tiny tracking-mega text-ivory uppercase pb-1 border-b border-ivory group-hover/cta:border-gold group-hover/cta:text-gold transition-all duration-400"
                      style={{ fontSize: '0.7rem' }}
                    >
                      Explore Collection
                    </span>
                    <FiArrowUpRight 
                      className="text-ivory group-hover/cta:text-gold group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-all duration-400" 
                      size={14} 
                    />
                  </div>
                </div>
              </div>
              
              {/* ═══════════════════════════════════════
                  BELOW-CARD PHILOSOPHY
              ═══════════════════════════════════════ */}
              <div className="mt-8 px-4">
                <p 
                  className="font-cormorant italic text-platinum text-lg md:text-xl leading-relaxed max-w-2xl"
                >
                  " {collection.philosophy} "
                </p>
                
                <div className="mt-4 flex items-center gap-4">
                  <span 
                    className="text-tiny tracking-mega text-silver uppercase font-mono"
                    style={{ fontSize: '0.65rem' }}
                  >
                    {collection.productIds.length} Pieces
                  </span>
                  <span className="w-1 h-1 rounded-full bg-silver/40" />
                  <span 
                    className="text-tiny tracking-mega text-silver uppercase font-mono"
                    style={{ fontSize: '0.65rem' }}
                  >
                    {collection.materials?.length || 0} Materials
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* ═══════════════════════════════════════
          DOTS INDICATOR
      ═══════════════════════════════════════ */}
      <div className="container-luxury mt-12 md:mt-16">
        <div className="flex items-center justify-center gap-3">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCollection(index)}
              className={`transition-all duration-400 ${
                activeIndex === index
                  ? 'w-12 h-px bg-gold'
                  : 'w-6 h-px bg-graphite hover:bg-silver'
              }`}
              aria-label={`Go to collection ${index + 1}`}
              data-cursor="hover"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectionShowcase