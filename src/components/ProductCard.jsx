import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiEye, FiBox } from 'react-icons/fi'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import useUIStore from '../store/uiStore'
import { formatPrice, formatDiscount } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — FLOATING PRODUCT CARD
// Editorial magazine style with floating product image
// ═══════════════════════════════════════════════════════════════

const ProductCard = ({ 
  product,
  variant = 'default',
  index = 0,
  showQuickAdd = true,
  showWishlist = true,
  showQuickView = false,
  showRating = true,
  showColors = true,
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
  
  const openQuickView = useUIStore(state => state.openQuickView)
  const showToast = useUIStore(state => state.showToast)
  
  const isSoldOut = product.sizes?.every(s => !s.available)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount ? formatDiscount(product.originalPrice, product.price) : null
  
  // Get badge label
  const getBadgeLabel = () => {
    if (product.isLimited) return 'LIMITED'
    if (product.isBestseller) return 'BESTSELLER'
    if (product.isNew) return 'NEW'
    if (product.isSustainable) return 'ARTISAN'
    return 'FEATURED'
  }
  
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
  
  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product)
  }
  
  const cardAnimation = animate ? {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { 
      duration: 0.9, 
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1] 
    },
  } : {}
  
  // COMPACT VARIANT (for mini carts, wishlists)
  if (variant === 'compact') {
    return (
      <motion.div {...cardAnimation} className={`group ${className}`}>
        <Link to={`/product/${product.slug}`} className="flex items-center gap-4" data-cursor="hover">
          <div className="w-20 h-24 flex-shrink-0 bg-cream overflow-hidden rounded-2xl border border-champagne/40">
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
  
  // ═══════════════════════════════════════════
  // DEFAULT VARIANT — FLOATING EDITORIAL
  // ═══════════════════════════════════════════
  return (
    <motion.div 
      {...cardAnimation}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${product.slug}`}
        className="block"
        data-cursor="view"
      >
        {/* ═══════════════════════════════════════
            CARD CONTAINER (Cream background)
        ═══════════════════════════════════════ */}
        <div 
          className="relative rounded-[32px] overflow-hidden transition-all duration-700 ease-luxury"
          style={{
            background: 'linear-gradient(180deg, #F5EBDD 0%, #F0E5D3 100%)',
            boxShadow: isHovered 
              ? '0 40px 80px -20px rgba(139, 90, 74, 0.35), 0 0 0 1px rgba(200, 121, 82, 0.2)' 
              : '0 20px 60px -20px rgba(139, 90, 74, 0.25), 0 0 0 1px rgba(200, 121, 82, 0.1)',
            paddingTop: '60px',
          }}
        >
          
          {/* ═══════════════════════════════════════
              TOP BADGES
          ═══════════════════════════════════════ */}
          <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-20">
            {/* Left: 3D Badge (if applicable) */}
            {showBadges && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gold to-terracotta text-noir rounded-full shadow-md"
              >
                <FiBox size={11} strokeWidth={2.5} />
                <span 
                  className="text-tiny font-bold tracking-wider uppercase"
                  style={{ fontSize: '0.6rem' }}
                >
                  3D
                </span>
              </motion.div>
            )}
            
            {/* Right: Status Badge */}
            {showBadges && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`
                  inline-flex items-center px-3 py-1.5 rounded-full backdrop-blur-md
                  ${product.isNew 
                    ? 'bg-gradient-to-r from-gold to-terracotta text-noir' 
                    : product.isLimited
                    ? 'bg-noir/90 text-champagne border border-gold/40'
                    : product.isBestseller
                    ? 'bg-noir/90 text-cream border border-champagne/30'
                    : 'bg-charcoal/90 text-platinum border border-silver/30'
                  }
                `}
              >
                <span 
                  className="text-tiny font-bold tracking-wider uppercase"
                  style={{ fontSize: '0.6rem' }}
                >
                  {getBadgeLabel()}
                </span>
              </motion.div>
            )}
          </div>
          
          {/* ═══════════════════════════════════════
              WISHLIST BUTTON (Floating over image)
          ═══════════════════════════════════════ */}
          {showWishlist && (
            <button
              onClick={handleWishlist}
              className={`
                absolute top-20 right-6 z-30
                w-10 h-10 flex items-center justify-center
                bg-cream/90 backdrop-blur-md border-2 rounded-full
                transition-all duration-400 hover:scale-110
                ${isInWishlist 
                  ? 'border-gold text-gold shadow-gold-glow-sm' 
                  : 'border-champagne/40 text-noir hover:border-gold'
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
          
          {/* ═══════════════════════════════════════
              FLOATING PRODUCT IMAGE
              This is the star of the card!
          ═══════════════════════════════════════ */}
          <div className="relative h-64 md:h-72 flex items-center justify-center mb-4 px-8">
            
            {/* Soft shadow beneath product */}
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 rounded-full opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(ellipse, rgba(139, 90, 74, 0.4), transparent)' }}
            />
            
            {/* Product image with hover float effect */}
            <motion.div
              animate={{ 
                y: isHovered ? -12 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              {!imageLoaded && (
                <div className="absolute inset-0 bg-champagne/20 rounded-full animate-pulse" />
              )}
              
              <img
                src={product.thumbnail || product.images[0]}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(139, 90, 74, 0.4))',
                }}
                draggable={false}
              />
            </motion.div>
            
            {/* Sold Out Overlay */}
            {isSoldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-cream/70 backdrop-blur-sm rounded-3xl z-20">
                <span 
                  className="px-6 py-2 bg-noir text-cream text-tiny tracking-mega uppercase rounded-full"
                  style={{ fontSize: '0.7rem' }}
                >
                  Sold Out
                </span>
              </div>
            )}
          </div>
          
          {/* ═══════════════════════════════════════
              PRODUCT INFO
          ═══════════════════════════════════════ */}
          <div className="px-8 pb-8">
            
            {/* Product Name — LARGE */}
            <h3 
              className="font-cormorant font-bold text-noir mb-3 leading-tight"
              style={{ 
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h3>
            
            {/* Rating */}
            {showRating && product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      className={`
                        transition-colors duration-300
                        ${i < Math.floor(product.rating) 
                          ? 'text-gold' 
                          : i < product.rating
                          ? 'text-gold'
                          : 'text-champagne/40'
                        }
                      `}
                      style={{ fontSize: '0.9rem' }}
                    >
                      {i < Math.floor(product.rating) ? '★' : i < product.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span 
                  className="text-sm text-noir font-semibold tabular-nums"
                  style={{ fontSize: '0.9rem' }}
                >
                  {product.rating.toFixed(1)}
                </span>
                <span 
                  className="text-sm text-smoke tabular-nums"
                  style={{ fontSize: '0.85rem' }}
                >
                  ({product.reviewCount?.toLocaleString('en-IN') || 0})
                </span>
              </div>
            )}
            
            {/* Description (subtitle if available) */}
            {product.subtitle && (
              <p className="text-sm text-smoke mb-5 leading-relaxed" style={{ fontSize: '0.95rem' }}>
                {product.subtitle} — {product.category === 'outerwear' ? 'meticulously tailored' : 
                                     product.category === 'knitwear' ? 'artisanally crafted' :
                                     product.category === 'dresses' ? 'timelessly elegant' :
                                     'thoughtfully designed'}.
              </p>
            )}
            
            {/* Price Section */}
            <div className="flex items-baseline gap-3 mb-2">
              {product.originalPrice && (
                <span 
                  className="text-lg text-smoke line-through tabular-nums font-cormorant"
                  style={{ fontSize: '1.1rem' }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span 
                className="font-cormorant font-bold text-terracotta tabular-nums"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}
              >
                {formatPrice(product.price)}
              </span>
            </div>
            
            {/* Price tagline */}
            <p 
              className="text-sm text-smoke italic mb-6 font-cormorant"
              style={{ fontSize: '0.9rem' }}
            >
              {product.isLimited ? 'Rarity, artisanally applied.' :
               product.isBestseller ? 'Loved by connoisseurs.' :
               product.isNew ? 'Fresh from the atelier.' :
               'Craftsmanship, honestly priced.'}
            </p>
            
            {/* ═══════════════════════════════════════
                ACTION BUTTONS
            ═══════════════════════════════════════ */}
            {!isSoldOut && (
              <div className="flex gap-3 items-center">
                {/* ADD TO CART — Outline pill */}
                {showQuickAdd && (
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 py-3.5 px-4 flex items-center justify-center gap-2 border-2 border-noir text-noir bg-transparent hover:bg-noir hover:text-cream transition-all duration-400 rounded-full group/btn disabled:opacity-60"
                    data-cursor="hover"
                  >
                    <FiShoppingCart 
                      size={14} 
                      className="transition-transform duration-300 group-hover/btn:scale-110" 
                    />
                    <span 
                      className="text-tiny tracking-wider uppercase font-bold"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}
                    >
                      {isAdding ? 'Adding...' : 'Add to Cart'}
                    </span>
                  </button>
                )}
                
                {/* BUY NOW — Dark pill */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-4 flex items-center justify-center bg-noir text-cream hover:bg-terracotta transition-all duration-400 rounded-full shadow-lg hover:shadow-xl"
                  data-cursor="hover"
                >
                  <span 
                    className="text-tiny tracking-wider uppercase font-bold"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}
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
                className="w-full py-3.5 px-4 border-2 border-smoke text-smoke bg-transparent rounded-full cursor-not-allowed"
              >
                <span 
                  className="text-tiny tracking-wider uppercase font-bold"
                  style={{ fontSize: '0.7rem' }}
                >
                  Sold Out — Notify Me
                </span>
              </button>
            )}
          </div>
          
          {/* ═══════════════════════════════════════
              DECORATIVE BOTTOM GLOW
          ═══════════════════════════════════════ */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(200, 121, 82, 0.2), transparent)',
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard