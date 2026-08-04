import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { getFeaturedProducts, getNewArrivals, getBestsellers } from '../data/products'
import ProductCard from './ProductCard'


const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState('featured')
  const sectionRef = useRef(null)
  
  const filters = [
    { id: 'featured', label: 'Featured', data: getFeaturedProducts() },
    { id: 'new', label: 'New Arrivals', data: getNewArrivals() },
    { id: 'bestsellers', label: 'Bestsellers', data: getBestsellers() },
  ]
  
  const activeProducts = filters.find(f => f.id === activeFilter)?.data.slice(0, 6) || []
  const totalCount = filters.find(f => f.id === activeFilter)?.data.length || 0
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2A1F1A 0%, #3D2E24 50%, #2A1F1A 100%)',
      }}
    >
      {/* Warm ambient glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(200,121,82,0.15) 0%, transparent 60%)',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(232,181,148,0.15) 0%, transparent 60%)',
        }}
      />
      
      <div className="container-luxury relative z-10">
        
        {/* HEADER */}
        <div className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-tiny tracking-mega text-gold uppercase mb-6"
                style={{ fontSize: '0.7rem' }}
              >
                — The Selection
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-cormorant font-light text-cream"
                style={{ 
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                Coveted
                <br />
                <em className="italic text-gold">pieces.</em>
              </motion.h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-16"
            >
              <p className="font-cormorant italic text-champagne text-lg md:text-xl leading-relaxed mb-6">
                Each piece selected with obsessive care. 
                Handcrafted by master artisans across India. 
                Made to become the most-worn treasures 
                in your wardrobe.
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-tiny text-gold font-mono tabular-nums" style={{ fontSize: '0.7rem' }}>
                  {String(activeProducts.length).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                </span>
                <span className="text-tiny tracking-mega text-silver uppercase" style={{ fontSize: '0.65rem' }}>
                  Currently Shown
                </span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* FILTER TABS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-8 md:gap-12 mb-16 md:mb-20 border-b border-gold/20 pb-6"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                relative pb-2 text-tiny tracking-mega uppercase transition-colors duration-400
                ${activeFilter === filter.id ? 'text-gold' : 'text-champagne/60 hover:text-cream'}
              `}
              style={{ fontSize: '0.75rem' }}
              data-cursor="hover"
            >
              {filter.label}
              <span className="ml-2 font-mono opacity-60">
                ({filter.data.length})
              </span>
              
              {activeFilter === filter.id && (
                <motion.span
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-[-25px] left-0 right-0 h-px bg-gold"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </motion.div>
        
        {/* ═══════════════════════════════════════
            FLOATING PRODUCT CARDS!
        ═══════════════════════════════════════ */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20"
        >
          {activeProducts.map((product, index) => (
            <ProductCard 
              key={`${activeFilter}-${product.id}`} 
              product={product} 
              index={index} 
            />
          ))}
        </motion.div>
        
        {/* Empty State */}
        {activeProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-cormorant italic text-champagne text-lg">
              No pieces to show at this moment.
            </p>
          </div>
        )}
        
        {/* VIEW ALL CTA */}
        {activeProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-4 group py-5 px-14 bg-gradient-to-r from-gold to-terracotta text-noir rounded-full shadow-gold-glow-lg hover:shadow-warm-lg transition-all duration-500"
              data-cursor="hover"
            >
              <span 
                className="text-tiny tracking-mega uppercase font-bold"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
              >
                Discover All Pieces
              </span>
              <FiArrowUpRight 
                className="transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" 
                size={18} 
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts