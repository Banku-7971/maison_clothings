import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FiArrowUpRight, FiHeart, FiEye, FiPlus } from 'react-icons/fi'
import { getFeaturedProducts, getNewArrivals, getBestsellers } from '../data/products'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import { formatPrice } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — FEATURED PRODUCTS SHOWCASE
// ═══════════════════════════════════════════════════════════════
// Editorial product grid with luxury hover effects.
// Curated selection of the atelier's most coveted pieces.
//
// Features:
// - Editorial headline with italic accent
// - Filter tabs: Featured / New / Bestsellers
// - 2-4 column responsive grid
// - Product cards with:
//   * Image hover zoom
//   * Wishlist heart (interactive)
//   * Quick add to cart button
//   * VIEW label on hover
//   * Category label
//   * Badge (NEW, BESTSELLER, LIMITED)
//   * Price with italic Cormorant
// - Staggered scroll reveal
// - View All CTA
// - Section counter (of X pieces)
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// PRODUCT CARD SUB-COMPONENT
// ─────────────────────────────────────────
const ProductCard = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // ─────────────────────────────────────────
  // WISHLIST STATE
  // ─────────────────────────────────────────
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore(state => state.toggleItem)
  
  // ─────────────────────────────────────────
  // CART ACTIONS
  // ─────────────────────────────────────────
  const addToCart = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  
  // ─────────────────────────────────────────
  // QUICK ADD HANDLER
  // ─────────────────────────────────────────
  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Add first available size and color
    const firstSize = product.sizes.find(s => s.available)
    const firstColor = product.colors.find(c => c.available)
    
    if (firstSize && firstColor) {
      addToCart(product, firstSize, firstColor, 1)
      openCart()
    }
  }
  
  // ─────────────────────────────────────────
  // WISHLIST HANDLER
  // ─────────────────────────────────────────
  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }
  
  // ─────────────────────────────────────────
  // IMAGE HOVER (Cycle through images)
  // ─────────────────────────────────────────
  const handleMouseEnter = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex(1)
    }
  }
  
  const handleMouseLeave = () => {
    setCurrentImageIndex(0)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group"
    >
      <Link
        to={`/product/${product.slug}`}
        className="block"
        data-cursor="view"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ═══════════════════════════════════════
            IMAGE CONTAINER
        ═══════════════════════════════════════ */}
        <div className="relative aspect-product bg-charcoal overflow-hidden mb-6">
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-charcoal animate-pulse" />
          )}
          
          {/* Primary Image */}
          <motion.img
            src={product.images[currentImageIndex] || product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
          
          {/* ─────────────────────────────────
              BADGES (Top Left)
          ───────────────────────────────── */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span 
                className="inline-block px-2.5 py-1 bg-gold text-noir text-tiny tracking-mega uppercase"
                style={{ fontSize: '0.55rem' }}
              >
                New
              </span>
            )}
            {product.isBestseller && (
              <span 
                className="inline-block px-2.5 py-1 bg-noir/90 border border-ivory/30 text-ivory text-tiny tracking-mega uppercase backdrop-blur-sm"
                style={{ fontSize: '0.55rem' }}
              >
                Bestseller
              </span>
            )}
            {product.isLimited && (
              <span 
                className="inline-block px-2.5 py-1 bg-noir/90 border border-gold text-gold text-tiny tracking-mega uppercase backdrop-blur-sm"
                style={{ fontSize: '0.55rem' }}
              >
                Limited
              </span>
            )}
          </div>
          
          {/* ─────────────────────────────────
              WISHLIST BUTTON (Top Right)
          ───────────────────────────────── */}
          <button
            onClick={handleWishlist}
            className={`
              absolute top-4 right-4 w-10 h-10 
              flex items-center justify-center 
              bg-noir/60 backdrop-blur-sm border
              transition-all duration-400
              ${isInWishlist 
                ? 'border-gold text-gold' 
                : 'border-transparent text-ivory hover:border-ivory'
              }
            `}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            data-cursor="hover"
          >
            <FiHeart 
              size={16} 
              fill={isInWishlist ? '#C9A96E' : 'transparent'}
              className="transition-all duration-300"
            />
          </button>
          
          {/* ─────────────────────────────────
              QUICK ADD BUTTON (Bottom, appears on hover)
          ───────────────────────────────── */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-luxury"
          >
            <button
              onClick={handleQuickAdd}
              className="w-full py-3 bg-ivory text-noir flex items-center justify-center gap-2 hover:bg-gold transition-all duration-400"
              data-cursor="hover"
            >
              <FiPlus size={14} />
              <span 
                className="text-tiny tracking-mega uppercase font-medium"
                style={{ fontSize: '0.7rem' }}
              >
                Quick Add
              </span>
            </button>
          </motion.div>
          
        </div>
        
        {/* ═══════════════════════════════════════
            PRODUCT INFO
        ═══════════════════════════════════════ */}
        <div className="space-y-2">
          
          {/* Category Label */}
          <p 
            className="text-tiny tracking-mega text-silver uppercase"
            style={{ fontSize: '0.65rem' }}
          >
            {product.category}
          </p>
          
          {/* Product Name */}
          <h3 className="font-cormorant text-xl md:text-2xl text-ivory group-hover:text-gold transition-colors duration-400 leading-tight">
            {product.name}
          </h3>
          
          {/* Subtitle */}
          {product.subtitle && (
            <p className="font-cormorant italic text-silver text-sm">
              {product.subtitle}
            </p>
          )}
          
          {/* Price */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="font-cormorant text-xl text-ivory tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-silver line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Color Swatches (First 4) */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-2">
              {product.colors.slice(0, 4).map((color, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                    color.available ? 'border-graphite' : 'border-graphite opacity-30'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span 
                  className="text-tiny text-silver ml-1"
                  style={{ fontSize: '0.65rem' }}
                >
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}


// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState('featured')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  // ─────────────────────────────────────────
  // FILTER TABS
  // ─────────────────────────────────────────
  const filters = [
    { id: 'featured', label: 'Featured', data: getFeaturedProducts() },
    { id: 'new', label: 'New Arrivals', data: getNewArrivals() },
    { id: 'bestsellers', label: 'Bestsellers', data: getBestsellers() },
  ]
  
  const activeProducts = filters.find(f => f.id === activeFilter)?.data.slice(0, 8) || []
  const activeFilterData = filters.find(f => f.id === activeFilter)
  const totalCount = activeFilterData?.data.length || 0
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-noir overflow-hidden"
    >
      {/* Ambient gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(201,169,110,0.1) 0%, transparent 60%)',
        }}
      />
      
      <div className="container-luxury relative z-10">
        
        {/* ═══════════════════════════════════════
            SECTION HEADER
        ═══════════════════════════════════════ */}
        <div className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            
            {/* Left: Title */}
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
                className="font-cormorant font-light text-ivory"
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
            
            {/* Right: Description + Count */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-16"
            >
              <p className="font-cormorant italic text-platinum text-lg md:text-xl leading-relaxed mb-6">
                Each piece selected with obsessive care. 
                Handcrafted by master artisans. 
                Made to become the most-worn treasures 
                in your wardrobe.
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-tiny text-silver font-mono tabular-nums" style={{ fontSize: '0.7rem' }}>
                  {String(activeProducts.length).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                </span>
                <span className="text-tiny tracking-mega text-silver uppercase" style={{ fontSize: '0.65rem' }}>
                  Currently Shown
                </span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* ═══════════════════════════════════════
            FILTER TABS
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-8 md:gap-12 mb-12 md:mb-16 border-b border-graphite/30 pb-6"
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
              
              {/* Active underline */}
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
            PRODUCT GRID
        ═══════════════════════════════════════ */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20"
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
            <p className="font-cormorant italic text-platinum text-lg">
              No pieces to show at this moment.
            </p>
          </div>
        )}
        
        {/* ═══════════════════════════════════════
            VIEW ALL CTA
        ═══════════════════════════════════════ */}
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
              className="inline-flex items-center gap-4 group"
              data-cursor="hover"
            >
              <span 
                className="relative overflow-hidden inline-block"
              >
                <span 
                  className="inline-block py-4 px-12 border border-ivory text-ivory text-tiny tracking-mega uppercase relative z-10 transition-colors duration-500 group-hover:text-noir"
                  style={{ fontSize: '0.75rem' }}
                >
                  Discover All Pieces
                  <motion.span 
                    className="absolute inset-0 bg-ivory -z-10"
                    initial={{ y: '100%' }}
                    whileHover={{ y: '0%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </span>
              <FiArrowUpRight 
                className="text-ivory group-hover:text-gold transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" 
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