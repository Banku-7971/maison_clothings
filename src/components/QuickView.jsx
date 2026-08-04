import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiX, 
  FiChevronLeft, 
  FiChevronRight, 
  FiHeart, 
  FiShoppingBag,
  FiArrowRight,
  FiCheck,
} from 'react-icons/fi'
import useUIStore from '../store/uiStore'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import { formatPrice } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — QUICK VIEW MODAL
// ═══════════════════════════════════════════════════════════════
// Preview any product without leaving the current page.
// Split-screen layout with gallery + info + purchase controls.
//
// Features:
// - Full-screen backdrop with blur
// - Split layout (image + details)
// - Image gallery with navigation
// - Size selector
// - Color selector
// - Quantity selector
// - Add to cart with animation
// - Wishlist toggle
// - View full details link
// - ESC to close
// - Body scroll lock
// - Smooth transitions
// - Mobile responsive
// ═══════════════════════════════════════════════════════════════

const QuickView = () => {
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const isOpen = useUIStore(state => state.isQuickViewOpen)
  const product = useUIStore(state => state.quickViewProduct)
  const closeQuickView = useUIStore(state => state.closeQuickView)
  const showToast = useUIStore(state => state.showToast)
  
  const addToCart = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  
  const isInWishlist = useWishlistStore(state => 
    product ? state.isInWishlist(product.id) : false
  )
  const toggleWishlist = useWishlistStore(state => state.toggleItem)
  
  // ─────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  
  // ─────────────────────────────────────────
  // RESET STATE WHEN PRODUCT CHANGES
  // ─────────────────────────────────────────
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0)
      setSelectedSize(product.sizes?.find(s => s.available) || null)
      setSelectedColor(product.colors?.find(c => c.available) || null)
      setQuantity(1)
      setShowAddedFeedback(false)
    }
  }, [product])
  
  // ─────────────────────────────────────────
  // LOCK BODY SCROLL
  // ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // ─────────────────────────────────────────
  // KEYBOARD ESC
  // ─────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeQuickView()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeQuickView])
  
  // ─────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────
  const goToPreviousImage = () => {
    if (!product?.images) return
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }
  
  const goToNextImage = () => {
    if (!product?.images) return
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }
  
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      showToast({
        type: 'error',
        message: 'Please select size and color',
      })
      return
    }
    
    setIsAdding(true)
    
    addToCart(product, selectedSize, selectedColor, quantity)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setShowAddedFeedback(true)
    setIsAdding(false)
    
    setTimeout(() => {
      setShowAddedFeedback(false)
      closeQuickView()
      openCart()
    }, 1200)
  }
  
  const handleWishlist = () => {
    const result = toggleWishlist(product)
    showToast({
      type: 'default',
      message: result.message,
      duration: 2000,
    })
  }
  
  // ─────────────────────────────────────────
  // NO PRODUCT (Nothing to show)
  // ─────────────────────────────────────────
  if (!product) return null
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ═══════════════════════════════════════
              BACKDROP
          ═══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-noir/85 backdrop-blur-md z-[290]"
          />
          
          {/* ═══════════════════════════════════════
              MODAL CONTENT
          ═══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[300] flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-charcoal border border-graphite pointer-events-auto overflow-hidden">
              
              {/* ═══════════════════════════════════════
                  CLOSE BUTTON
              ═══════════════════════════════════════ */}
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center bg-noir/60 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400"
                aria-label="Close quick view"
                data-cursor="hover"
              >
                <FiX size={18} />
              </button>
              
              {/* ═══════════════════════════════════════
                  SPLIT LAYOUT
              ═══════════════════════════════════════ */}
              <div className="grid md:grid-cols-2 h-full">
                
                {/* ─────────────────────────────────
                    LEFT: IMAGE GALLERY
                ───────────────────────────────── */}
                <div className="relative bg-noir overflow-hidden">
                  
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={product.images[currentImageIndex] || product.thumbnail}
                      alt={product.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </AnimatePresence>
                  
                  {/* Corner Brackets */}
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <div className="w-4 h-px bg-gold" />
                    <div className="w-px h-4 bg-gold" />
                  </div>
                  <div className="absolute bottom-4 left-4 pointer-events-none">
                    <div className="w-px h-4 bg-gold" />
                    <div className="w-4 h-px bg-gold" />
                  </div>
                  
                  {/* Image Navigation */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={goToPreviousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-noir/60 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400"
                        aria-label="Previous image"
                        data-cursor="hover"
                      >
                        <FiChevronLeft size={16} />
                      </button>
                      <button
                        onClick={goToNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-noir/60 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400"
                        aria-label="Next image"
                        data-cursor="hover"
                      >
                        <FiChevronRight size={16} />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-noir/60 backdrop-blur-sm border border-ivory/20">
                        <p 
                          className="text-tiny tracking-mega text-ivory uppercase font-mono tabular-nums"
                          style={{ fontSize: '0.6rem' }}
                        >
                          {String(currentImageIndex + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                {/* ─────────────────────────────────
                    RIGHT: PRODUCT DETAILS
                ───────────────────────────────── */}
                <div className="relative overflow-y-auto p-8 md:p-10 lg:p-12 bg-charcoal">
                  
                  {/* Category */}
                  <p 
                    className="text-tiny tracking-mega text-gold uppercase mb-4"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {product.category}
                  </p>
                  
                  {/* Product Name */}
                  <h2 
                    className="font-cormorant font-light text-ivory mb-2"
                    style={{ 
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      lineHeight: 1.1,
                    }}
                  >
                    {product.name}
                  </h2>
                  
                  {/* Subtitle */}
                  {product.subtitle && (
                    <p className="font-cormorant italic text-silver text-lg mb-6">
                      — {product.subtitle}
                    </p>
                  )}
                  
                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-graphite/30">
                    <p className="font-cormorant text-3xl text-ivory tabular-nums">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-silver line-through mt-1 tabular-nums">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-platinum leading-relaxed mb-8 font-cormorant italic">
                    {product.description?.substring(0, 200)}
                    {product.description?.length > 200 && '...'}
                  </p>
                  
                  {/* ─────────────────────────────────
                      COLOR SELECTOR
                  ───────────────────────────────── */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <p 
                          className="text-tiny tracking-mega text-ivory uppercase"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Color
                        </p>
                        {selectedColor && (
                          <p 
                            className="text-tiny text-gold font-cormorant italic"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {selectedColor.name}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => color.available && setSelectedColor(color)}
                            disabled={!color.available}
                            className={`
                              relative w-8 h-8 rounded-full border-2 transition-all duration-300
                              ${selectedColor?.name === color.name
                                ? 'border-gold scale-110' 
                                : 'border-graphite hover:border-ivory'
                              }
                              ${!color.available ? 'opacity-30 cursor-not-allowed' : ''}
                            `}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                            data-cursor="hover"
                          >
                            {selectedColor?.name === color.name && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FiCheck 
                                  size={12} 
                                  className={color.hex === '#0A0A0A' ? 'text-ivory' : 'text-noir'}
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* ─────────────────────────────────
                      SIZE SELECTOR
                  ───────────────────────────────── */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <p 
                          className="text-tiny tracking-mega text-ivory uppercase"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Size
                        </p>
                        <button 
                          className="text-tiny text-gold uppercase tracking-mega link-luxury"
                          style={{ fontSize: '0.65rem' }}
                          data-cursor="hover"
                        >
                          Size Guide
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size.size}
                            onClick={() => size.available && setSelectedSize(size)}
                            disabled={!size.available}
                            className={`
                              py-3 border text-xs font-medium tracking-wider uppercase
                              transition-all duration-300
                              ${selectedSize?.size === size.size
                                ? 'border-gold text-gold bg-gold/10' 
                                : 'border-graphite text-platinum hover:border-ivory hover:text-ivory'
                              }
                              ${!size.available 
                                ? 'opacity-30 line-through cursor-not-allowed' 
                                : ''
                              }
                            `}
                            data-cursor="hover"
                          >
                            {size.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* ─────────────────────────────────
                      QUANTITY SELECTOR
                  ───────────────────────────────── */}
                  <div className="mb-8">
                    <p 
                      className="text-tiny tracking-mega text-ivory uppercase mb-3"
                      style={{ fontSize: '0.7rem' }}
                    >
                      Quantity
                    </p>
                    <div className="inline-flex items-center border border-graphite">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                        aria-label="Decrease quantity"
                        data-cursor="hover"
                      >
                        —
                      </button>
                      <span className="w-12 text-center text-ivory font-mono tabular-nums">
                        {String(quantity).padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(99, quantity + 1))}
                        className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                        aria-label="Increase quantity"
                        data-cursor="hover"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* ─────────────────────────────────
                      ADD TO CART + WISHLIST
                  ───────────────────────────────── */}
                  <div className="flex gap-3 mb-6">
                    
                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding || showAddedFeedback}
                      className={`
                        flex-1 py-4 flex items-center justify-center gap-3 transition-all duration-500
                        ${showAddedFeedback 
                          ? 'bg-gold text-noir' 
                          : 'bg-ivory text-noir hover:bg-gold'
                        }
                      `}
                      data-cursor="hover"
                    >
                      {showAddedFeedback ? (
                        <>
                          <FiCheck size={16} />
                          <span 
                            className="text-tiny tracking-mega uppercase font-medium"
                            style={{ fontSize: '0.7rem' }}
                          >
                            Added
                          </span>
                        </>
                      ) : isAdding ? (
                        <span 
                          className="text-tiny tracking-mega uppercase font-medium"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Adding...
                        </span>
                      ) : (
                        <>
                          <FiShoppingBag size={16} />
                          <span 
                            className="text-tiny tracking-mega uppercase font-medium"
                            style={{ fontSize: '0.7rem' }}
                          >
                            Add to Bag
                          </span>
                        </>
                      )}
                    </button>
                    
                    {/* Wishlist */}
                    <button
                      onClick={handleWishlist}
                      className={`
                        w-14 h-14 flex items-center justify-center border transition-all duration-400
                        ${isInWishlist 
                          ? 'border-gold text-gold' 
                          : 'border-graphite text-ivory hover:border-ivory'
                        }
                      `}
                      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      data-cursor="hover"
                    >
                      <FiHeart 
                        size={16}
                        fill={isInWishlist ? '#C9A96E' : 'transparent'}
                      />
                    </button>
                  </div>
                  
                  {/* ─────────────────────────────────
                      VIEW FULL DETAILS LINK
                  ───────────────────────────────── */}
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={closeQuickView}
                    className="inline-flex items-center gap-2 text-tiny tracking-mega text-gold uppercase link-luxury group"
                    style={{ fontSize: '0.7rem' }}
                    data-cursor="hover"
                  >
                    <span>View Full Details</span>
                    <FiArrowRight 
                      size={14} 
                      className="transition-transform duration-400 group-hover:translate-x-1" 
                    />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default QuickView