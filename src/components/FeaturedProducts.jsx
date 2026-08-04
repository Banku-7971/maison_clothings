import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { getFeaturedProducts, getNewArrivals, getBestsellers } from '../data/products'
import ProductCard from './ProductCard'


const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState('featured')
  
  const filters = [
    { id: 'featured', label: 'Featured', data: getFeaturedProducts() },
    { id: 'new', label: 'New Arrivals', data: getNewArrivals() },
    { id: 'bestsellers', label: 'Bestsellers', data: getBestsellers() },
  ]
  
  const activeProducts = filters.find(f => f.id === activeFilter)?.data.slice(0, 6) || []
  const totalCount = filters.find(f => f.id === activeFilter)?.data.length || 0
  
  return (
    <section className="relative py-24 md:py-32 bg-noir overflow-hidden">
      
      {/* Subtle warm ambient */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(200,121,82,0.2) 0%, transparent 50%)',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 70%, rgba(92,30,46,0.3) 0%, transparent 50%)',
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
                transition={{ duration: 0.6 }}
                className="text-tiny tracking-mega text-gold uppercase mb-6"
                style={{ fontSize: '0.7rem' }}
              >
                — The Selection
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-cormorant font-light text-ivory"
                style={{ 
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
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
              <p className="font-cormorant italic text-platinum text-lg leading-relaxed mb-6">
                Each piece selected with obsessive care. 
                Handcrafted by master artisans across India.
              </p>
              
              <div className="flex items-center gap-4">
                <span 
                  className="text-tiny text-gold font-mono tabular-nums"
                  style={{ fontSize: '0.7rem' }}
                >
                  {String(activeProducts.length).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                </span>
                <span 
                  className="text-tiny tracking-mega text-silver uppercase"
                  style={{ fontSize: '0.65rem' }}
                >
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
          className="flex flex-wrap items-center gap-8 md:gap-12 mb-14 border-b border-graphite/50 pb-6"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                relative pb-2 text-tiny tracking-mega uppercase transition-colors duration-400
                ${activeFilter === filter.id ? 'text-gold' : 'text-silver hover:text-ivory'}
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
        
        {/* PRODUCT GRID — 2 cols mobile, 3 cols desktop */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {activeProducts.map((product, index) => (
            <ProductCard 
              key={`${activeFilter}-${product.id}`} 
              product={product} 
              index={index} 
            />
          ))}
        </motion.div>
        
        {activeProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-cormorant italic text-platinum text-lg">
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
              className="inline-flex items-center gap-4 group py-4 px-12 bg-gold text-noir hover:bg-champagne transition-all duration-500 rounded-full shadow-gold-glow hover:shadow-gold-glow-lg"
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