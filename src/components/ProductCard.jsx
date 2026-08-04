import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiPlus, FiEye, FiShoppingBag } from 'react-icons/fi'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import useUIStore from '../store/uiStore'
import { formatPrice, formatDiscount } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — PRODUCT CARD (WARM + ROUNDED)
// ═══════════════════════════════════════════════════════════════

const ProductCard = ({ 
  product,
  variant = 'default',
  index = 0,
  showQuickAdd = true,
  showWishlist = true,
  showQuickView = false,
  showRating = false,
  showColors = true,
  showBadges = true,
  animate = true,
  className = '',
}) => {
  
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore(state => state.toggleItem)
  
  const addToCart = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  
  const openQuickView = useUIStore(state => state.openQuickView)
  const showToast = useUIStore(state => state.showToast)
  
  const isSoldOut = product.sizes?.every(s => !s.available)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount ? formatDiscount(product.originalPrice, product.price) : null
  
  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const result = toggleWishlist(product)
    showToast({
      type: 'default',
      title: result.message,
      duration: 2000,
    })
  }
  
  const handleQuickAdd = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSoldOut) return
    setIsAdding(true)
    const firstSize = product.sizes.find(s => s.available)
    const firstColor = product.colors.find(c => c.available)
    if (firstSize && firstColor) {
      addToCart(product, firstSize, firstColor, 1)
      await new Promise(resolve => setTimeout(resolve, 500))
      openCart()
    }
    setIsAdding(false)
  }
  
  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product)
  }
  
  const handleMouseEnter = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex(1)
    }
  }
  
  const handleMouseLeave = () => {
    setCurrentImageIndex(0)
  }
  
  const cardAnimation = animate ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { 
      duration: 0.8, 
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1] 
    },
  } : {}
  
  // COMPACT VARIANT
  if (variant === 'compact') {
    return (
      <motion.div {...cardAnimation} className={`group ${className}`}>
        <Link to={`/product/${product.slug}`} className="flex items-center gap-4" data-cursor="hover">
          <div className="w-20 h-24 flex-shrink-0 bg-charcoal overflow-hidden rounded-lg border border-graphite/40">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-800 ease-luxury"
              draggable={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-tiny tracking-mega text-silver uppercase mb-1" style={{ fontSize: '0.6rem' }}>
              {product.category}
            </p>
            <h4 className="font-cormorant text-base text-ivory group-hover:text-gold transition-colors duration-400 truncate">
              {product.name}
            </h4>
            <p className="font-cormorant text-sm text-platinum mt-1 tabular-nums">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </motion.div>
    )
  }
  
  // EDITORIAL VARIANT
  if (variant === 'editorial') {
    return (
      <motion.div {...cardAnimation} className={`group ${className}`}>
        <Link
          to={`/product/${product.slug}`}
          className="block"
          data-cursor="view"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-baseline justify-between mb-4">
            <span 
              className="font-cormorant font-light text-4xl text-gold tabular-nums"
              style={{ lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-tiny tracking-mega text-silver uppercase" style={{ fontSize: '0.6rem' }}>
              {product.category}
            </span>
          </div>
          
          <div className="relative aspect-product bg-charcoal overflow-hidden mb-6 rounded-2xl border border-graphite/40 shadow-warm">
            {!imageLoaded && <div className="absolute inset-0 bg-charcoal animate-pulse rounded-2xl" />}
            <motion.img
              src={product.images[currentImageIndex] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
              onLoad={() => setImageLoaded(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              draggable={false}
            />
            
            {showBadges && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="inline-block px-2.5 py-1 bg-gold text-noir text-tiny tracking-mega uppercase rounded-full" style={{ fontSize: '0.55rem' }}>
                    New
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-cormorant text-2xl md:text-3xl text-ivory group-hover:text-gold transition-colors duration-400 mb-2 leading-tight">
              {product.name}
            </h3>
            {product.subtitle && (
              <p className="font-cormorant italic text-silver text-sm mb-3">
                — {product.subtitle}
              </p>
            )}
            <p className="font-cormorant text-xl text-ivory tabular-nums">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </motion.div>
    )
  }
  
  // DEFAULT VARIANT
  return (
    <motion.div {...cardAnimation} className={`group relative ${className}`}>
      <Link
        to={`/product/${product.slug}`}
        className="block"
        data-cursor="view"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* IMAGE CONTAINER — ROUNDED & BORDERED */}
        <div className="relative aspect-product bg-charcoal overflow-hidden mb-6 rounded-2xl border border-graphite/40 shadow-warm hover:shadow-warm-lg transition-all duration-500">
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-charcoal rounded-2xl">
              <div 
                className="w-full h-full rounded-2xl"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(245,235,221,0.05), transparent)',
                  animation: 'shimmer 1.5s infinite',
                }}
              />
            </div>
          )}
          
          {isSoldOut && (
            <div className="absolute inset-0 bg-noir/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
              <span className="px-4 py-2 border border-ivory text-ivory text-tiny tracking-mega uppercase rounded-full" style={{ fontSize: '0.7rem' }}>
                Sold Out
              </span>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={product.images[currentImageIndex] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
              onLoad={() => setImageLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              draggable={false}
              style={{
                transform: 'scale(1)',
                transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </AnimatePresence>
          
          <style>{`
            .group:hover img {
              transform: scale(1.08) !important;
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
          
          <div className="absolute inset-0 bg-gradient-to-t from-noir/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none rounded-2xl" />
          
          {/* BADGES */}
          {showBadges && (
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.isNew && (
                <span className="inline-block px-2.5 py-1 bg-gold text-noir text-tiny tracking-mega uppercase font-medium rounded-full" style={{ fontSize: '0.55rem' }}>
                  New
                </span>
              )}
              {product.isBestseller && !product.isNew && (
                <span className="inline-block px-2.5 py-1 bg-noir/80 border border-ivory/40 text-ivory text-tiny tracking-mega uppercase backdrop-blur-sm rounded-full" style={{ fontSize: '0.55rem' }}>
                  Bestseller
                </span>
              )}
              {product.isLimited && (
                <span className="inline-block px-2.5 py-1 bg-noir/80 border border-gold text-gold text-tiny tracking-mega uppercase backdrop-blur-sm rounded-full" style={{ fontSize: '0.55rem' }}>
                  Limited
                </span>
              )}
              {hasDiscount && (
                <span className="inline-block px-2.5 py-1 bg-burgundy text-ivory text-tiny tracking-mega uppercase font-medium rounded-full" style={{ fontSize: '0.55rem' }}>
                  {discountPercent}
                </span>
              )}
            </div>
          )}
          
          {/* WISHLIST BUTTON */}
          {showWishlist && (
            <button
              onClick={handleWishlist}
              className={`
                absolute top-3 right-3 z-10
                w-10 h-10 flex items-center justify-center
                bg-noir/60 backdrop-blur-sm border rounded-full
                transition-all duration-400
                ${isInWishlist 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-ivory hover:border-ivory'
                }
              `}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              data-cursor="hover"
            >
              <motion.div
                animate={isInWishlist ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <FiHeart 
                  size={16} 
                  fill={isInWishlist ? '#B76E5D' : 'transparent'}
                />
              </motion.div>
            </button>
          )}
          
          {/* QUICK ADD */}
          {(showQuickAdd || showQuickView) && !isSoldOut && (
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-luxury z-10">
              <div className="flex gap-2">
                {showQuickAdd && (
                  <button
                    onClick={handleQuickAdd}
                    disabled={isAdding}
                    className="flex-1 py-3 bg-ivory text-noir flex items-center justify-center gap-2 hover:bg-gold transition-all duration-400 disabled:opacity-60 rounded-full"
                    data-cursor="hover"
                  >
                    {isAdding ? (
                      <span className="text-tiny tracking-mega uppercase font-medium" style={{ fontSize: '0.65rem' }}>
                        Adding...
                      </span>
                    ) : (
                      <>
                        <FiShoppingBag size={12} />
                        <span className="text-tiny tracking-mega uppercase font-medium" style={{ fontSize: '0.65rem' }}>
                          Quick Add
                        </span>
                      </>
                    )}
                  </button>
                )}
                {showQuickView && (
                  <button
                    onClick={handleQuickView}
                    className="w-12 h-12 flex items-center justify-center bg-noir/80 backdrop-blur-sm border border-ivory text-ivory hover:bg-ivory hover:text-noir transition-all duration-400 rounded-full"
                    aria-label="Quick view"
                    data-cursor="hover"
                  >
                    <FiEye size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* PRODUCT INFO */}
        <div className="space-y-2 px-1">
          <p className="text-tiny tracking-mega text-silver uppercase" style={{ fontSize: '0.6rem' }}>
            {product.category}
          </p>
          
          <h3 className="font-cormorant text-xl md:text-2xl text-ivory group-hover:text-gold transition-colors duration-400 leading-tight">
            {product.name}
          </h3>
          
          {product.subtitle && (
            <p className="font-cormorant italic text-silver text-sm">
              {product.subtitle}
            </p>
          )}
          
          {showRating && product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i}
                    className={`text-xs ${i < Math.floor(product.rating) ? 'text-gold' : 'text-graphite'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-tiny text-silver font-mono" style={{ fontSize: '0.65rem' }}>
                ({product.reviewCount || 0})
              </span>
            </div>
          )}
          
          <div className="flex items-baseline gap-3 pt-1">
            <span className={`font-cormorant text-xl tabular-nums ${hasDiscount ? 'text-burgundy' : 'text-ivory'}`}>
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-silver line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {showColors && product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-2">
              {product.colors.slice(0, 5).map((color, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                    color.available 
                      ? 'border-graphite hover:border-gold cursor-pointer' 
                      : 'border-graphite opacity-30'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-tiny text-silver ml-1 font-mono" style={{ fontSize: '0.6rem' }}>
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard