import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiZap } from 'react-icons/fi'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import useUIStore from '../store/uiStore'
import { formatPrice, formatDiscount } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — REFINED PRODUCT CARD
// Matches the warm dark theme perfectly
// ═══════════════════════════════════════════════════════════════

const ProductCard = ({ 
  product,
  variant = 'default',
  index = 0,
  showQuickAdd = true,
  showWishlist = true,
  showBadges = true,
  animate = true,
  className = '',
}) => {
  const navigate = useNavigate()
  
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore(state => state.toggleItem)
  
  const addToCart = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  
  const showToast = useUIStore(state => state.showToast)
  
  const isSoldOut = product.sizes?.every(s => !s.available)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount ? formatDiscount(product.originalPrice, product.price) : null
  
  const getBadgeLabel = () => {
    if (product.isLimited) return 'LIMITED'
    if (product.isBestseller) return 'BESTSELLER'
    if (product.isNew) return 'NEW'
    return 'FEATURED'
  }
  
  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const result = toggleWishlist(product)
    showToast({ type: 'default', title: result.message, duration: 2000 })
  }
  
  const handleAddToCart = async (e) => {
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
  
  const handleBuyNow = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSoldOut) return
    const firstSize = product.sizes.find(s => s.available)
    const firstColor = product.colors.find(c => c.available)
    if (firstSize && firstColor) {
      addToCart(product, firstSize, firstColor, 1)
      await new Promise(resolve => setTimeout(resolve, 300))
      navigate('/checkout')
    }
  }
  
  const cardAnimation = animate ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { 
      duration: 0.8, 
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1] 
    },
  } : {}
  
  // COMPACT VARIANT
  if (variant === 'compact') {
    return (
      <motion.div {...cardAnimation} className={`group ${className}`}>
        <Link to={`/product/${product.slug}`} className="flex items-center gap-4" data-cursor="hover">
          <div className="w-20 h-24 flex-shrink-0 bg-charcoal overflow-hidden rounded-xl border border-graphite/40">
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
  
  // DEFAULT — REFINED CARD (matches your theme!)
  return (
    <motion.div 
      {...cardAnimation}
      className={`group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${product.slug}`}
        className="block"
        data-cursor="view"
      >
        {/* ═══════════════════════════════════════
            IMAGE CONTAINER — Large product image
        ═══════════════════════════════════════ */}
        <div 
          className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-5 transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, #3D2E24 0%, #2A1F1A 100%)',
            boxShadow: isHovered 
              ? '0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(200, 121, 82, 0.3)' 
              : '0 15px 40px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(74, 58, 47, 0.5)',
          }}
        >
          
          {/* Product Image — FILLS the card */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-charcoal animate-pulse" />
          )}
          
          <motion.img
            src={product.thumbnail || product.images[0]}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />
          
          {/* Warm gradient overlay on hover */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(to top, rgba(42, 31, 26, 0.6) 0%, transparent 50%)',
            }}
          />
          
          {/* ═══════════════════════════════════════
              TOP BADGES
          ═══════════════════════════════════════ */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
            
            {/* 3D Badge — Terracotta */}
            {showBadges && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold text-noir rounded-full shadow-md"
              >
                <FiZap size={10} strokeWidth={2.5} fill="currentColor" />
                <span 
                  className="text-tiny font-bold tracking-wider uppercase"
                  style={{ fontSize: '0.55rem' }}
                >
                  3D
                </span>
              </motion.div>
            )}
            
            {/* Status Badge — Dark elegant */}
            {showBadges && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center px-3 py-1.5 bg-noir/80 backdrop-blur-md text-champagne border border-gold/40 rounded-full"
              >
                <span 
                  className="text-tiny font-bold tracking-wider uppercase"
                  style={{ fontSize: '0.55rem' }}
                >
                  {getBadgeLabel()}
                </span>
              </motion.div>
            )}
          </div>
          
          {/* ═══════════════════════════════════════
              WISHLIST BUTTON — Bottom right
          ═══════════════════════════════════════ */}
          {showWishlist && (
            <button
              onClick={handleWishlist}
              className={`
                absolute bottom-4 right-4 z-10
                w-11 h-11 flex items-center justify-center
                bg-noir/80 backdrop-blur-md rounded-full
                transition-all duration-400 hover:scale-110
                ${isInWishlist 
                  ? 'text-gold border-2 border-gold shadow-gold-glow-sm' 
                  : 'text-cream border-2 border-cream/30 hover:border-cream'
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
                  fill={isInWishlist ? '#C87952' : 'transparent'}
                  strokeWidth={2}
                />
              </motion.div>
            </button>
          )}
          
          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-noir/80 backdrop-blur-sm rounded-2xl z-20">
              <span 
                className="px-5 py-2 bg-cream text-noir text-tiny tracking-mega uppercase rounded-full font-bold"
                style={{ fontSize: '0.7rem' }}
              >
                Sold Out
              </span>
            </div>
          )}
          
          {/* Discount Badge (if on sale) */}
          {hasDiscount && !isSoldOut && (
            <div className="absolute bottom-4 left-4 z-10">
              <span 
                className="inline-block px-3 py-1.5 bg-burgundy text-cream text-tiny tracking-wider uppercase font-bold rounded-full"
                style={{ fontSize: '0.6rem' }}
              >
                {discountPercent}
              </span>
            </div>
          )}
        </div>
        
        {/* ═══════════════════════════════════════
            PRODUCT INFO — Below image
        ═══════════════════════════════════════ */}
        <div className="px-1 space-y-3">
          
          {/* Category */}
          <p 
            className="text-tiny tracking-mega text-gold uppercase font-mono"
            style={{ fontSize: '0.6rem', letterSpacing: '0.25em' }}
          >
            {product.category}
          </p>
          
          {/* Product Name */}
          <h3 
            className="font-cormorant font-light text-ivory group-hover:text-gold transition-colors duration-400 leading-tight"
            style={{ 
              fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
              lineHeight: 1.15,
            }}
          >
            {product.name}
          </h3>
          
          {/* Rating + Subtitle Row */}
          <div className="flex items-center justify-between gap-3">
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      className={i < Math.floor(product.rating) ? 'text-gold' : 'text-graphite'}
                      style={{ fontSize: '0.75rem' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span 
                  className="text-xs text-champagne font-mono tabular-nums"
                  style={{ fontSize: '0.75rem' }}
                >
                  {product.rating.toFixed(1)}
                </span>
                <span 
                  className="text-xs text-silver tabular-nums"
                  style={{ fontSize: '0.7rem' }}
                >
                  ({product.reviewCount?.toLocaleString('en-IN') || 0})
                </span>
              </div>
            )}
          </div>
          
          {/* Subtitle */}
          {product.subtitle && (
            <p 
              className="font-cormorant italic text-silver"
              style={{ fontSize: '0.9rem' }}
            >
              {product.subtitle}
            </p>
          )}
          
          {/* Price Row */}
          <div className="flex items-baseline gap-3 pt-1">
            <span 
              className="font-cormorant font-medium text-gold tabular-nums"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)' }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span 
                className="text-sm text-silver line-through tabular-nums font-cormorant"
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* ═══════════════════════════════════════
              ACTION BUTTONS
          ═══════════════════════════════════════ */}
          {!isSoldOut && (
            <div className="flex gap-2 pt-4">
              {/* ADD TO CART — Ghost pill */}
              {showQuickAdd && (
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 py-3 px-4 flex items-center justify-center gap-2 border border-cream/40 text-cream hover:bg-cream hover:text-noir hover:border-cream transition-all duration-400 rounded-full disabled:opacity-60"
                  data-cursor="hover"
                >
                  <FiShoppingBag size={13} />
                  <span 
                    className="text-tiny tracking-wider uppercase font-medium"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}
                  >
                    {isAdding ? 'Adding' : 'Add'}
                  </span>
                </button>
              )}
              
              {/* BUY NOW — Solid gold pill */}
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 flex items-center justify-center bg-gold text-noir hover:bg-champagne transition-all duration-400 rounded-full shadow-gold-glow-sm hover:shadow-gold-glow"
                data-cursor="hover"
              >
                <span 
                  className="text-tiny tracking-wider uppercase font-bold"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}
                >
                  Buy Now
                </span>
              </button>
            </div>
          )}
          
          {/* Sold Out Button */}
          {isSoldOut && (
            <button
              disabled
              className="w-full mt-4 py-3 px-4 border border-graphite text-silver rounded-full cursor-not-allowed"
            >
              <span className="text-tiny tracking-wider uppercase" style={{ fontSize: '0.65rem' }}>
                Notify When Available
              </span>
            </button>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard