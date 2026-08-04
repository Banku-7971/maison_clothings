import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHeart, 
  FiTrash2, 
  FiShoppingBag, 
  FiShare2,
  FiArrowRight,
  FiX,
  FiCheck,
} from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import Newsletter from '../components/Newsletter'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import useUIStore from '../store/uiStore'
import { getProductById, getBestsellers } from '../data/products'
import { formatPrice, formatNumber } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — WISHLIST PAGE
// ═══════════════════════════════════════════════════════════════
// The saved. The considered. The desired.
// Where pieces wait to become owned.
//
// Features:
// - Editorial header
// - Grid of saved items
// - Sort options
// - Total value display
// - Move all to cart
// - Share wishlist
// - Clear wishlist
// - Empty state
// - Recommended products
// - Newsletter footer
// ═══════════════════════════════════════════════════════════════

const Wishlist = () => {
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const items = useWishlistStore(state => state.items)
  const getCount = useWishlistStore(state => state.getCount)
  const getTotalValue = useWishlistStore(state => state.getTotalValue)
  const getSorted = useWishlistStore(state => state.getSorted)
  const clearWishlist = useWishlistStore(state => state.clearWishlist)
  const copyShareLink = useWishlistStore(state => state.copyShareLink)
  
  const addToCart = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  
  const showToast = useUIStore(state => state.showToast)
  
  // ─────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────
  const [sortBy, setSortBy] = useState('newest')
  const [isAddingAll, setIsAddingAll] = useState(false)
  
  // ─────────────────────────────────────────
  // DOCUMENT TITLE
  // ─────────────────────────────────────────
  useEffect(() => {
    document.title = `Wishlist (${getCount()}) — MAISON`
    return () => {
      document.title = 'MAISON'
    }
  }, [items])
  
  // ─────────────────────────────────────────
  // COMPUTED
  // ─────────────────────────────────────────
  const sortedItems = getSorted(sortBy)
  const totalValue = getTotalValue()
  const itemCount = getCount()
  const recommended = getBestsellers().slice(0, 4)
  
  const sortOptions = [
    { value: 'newest', label: 'Recently Added' },
    { value: 'oldest', label: 'First Added' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ]
  
  // ─────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────
  const handleAddAllToCart = async () => {
    setIsAddingAll(true)
    
    let addedCount = 0
    
    items.forEach(item => {
      const fullProduct = getProductById(item.id)
      if (fullProduct) {
        const firstSize = fullProduct.sizes?.find(s => s.available)
        const firstColor = fullProduct.colors?.find(c => c.available)
        
        if (firstSize && firstColor) {
          addToCart(fullProduct, firstSize, firstColor, 1)
          addedCount++
        }
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    showToast({
      type: 'default',
      message: `${addedCount} pieces added to bag`,
      duration: 3000,
    })
    
    setIsAddingAll(false)
    setTimeout(() => openCart(), 500)
  }
  
  const handleShare = async () => {
    const result = await copyShareLink()
    showToast({
      type: result.success ? 'default' : 'error',
      message: result.message,
      duration: 3000,
    })
  }
  
  const handleClear = () => {
    if (confirm('Remove all pieces from your wishlist?')) {
      clearWishlist()
      showToast({
        type: 'default',
        message: 'Wishlist cleared',
        duration: 2000,
      })
    }
  }
  
  // ═══════════════════════════════════════════
  // EMPTY STATE
  // ═══════════════════════════════════════════
  if (itemCount === 0) {
    return (
      <div className="bg-noir min-h-screen">
        
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-16 border-b border-graphite/30">
          <div className="container-luxury">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-6"
              style={{ fontSize: '0.7rem' }}
            >
              — Saved For Later
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cormorant font-light text-ivory"
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: 0.95,
              }}
            >
              Your <em className="italic text-gold">wishlist</em>
            </motion.h1>
          </div>
        </section>
        
        {/* Empty State */}
        <section className="py-24 md:py-32">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full border border-graphite flex items-center justify-center">
                <FiHeart className="text-silver" size={32} />
              </div>
              
              <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-4">
                Your wishlist awaits
              </h2>
              
              <p className="font-cormorant italic text-platinum text-lg leading-relaxed mb-10">
                Nothing has been saved yet. 
                Tap the heart on any piece to keep it here for later contemplation.
              </p>
              
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3"
                data-cursor="hover"
              >
                <span className="relative overflow-hidden">
                  <span 
                    className="inline-block py-4 px-12 border border-ivory text-ivory text-tiny tracking-mega uppercase relative z-10 transition-colors duration-500 group-hover:text-noir"
                    style={{ fontSize: '0.75rem' }}
                  >
                    Discover Pieces
                    <motion.span 
                      className="absolute inset-0 bg-ivory -z-10"
                      initial={{ y: '100%' }}
                      whileHover={{ y: '0%' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </span>
                <FiArrowRight 
                  className="text-ivory group-hover:text-gold group-hover:translate-x-1 transition-all duration-400" 
                  size={18} 
                />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Recommended */}
        <section className="py-24 border-t border-graphite/30">
          <div className="container-luxury">
            <h3 
              className="text-tiny tracking-mega text-gold uppercase mb-8 text-center"
              style={{ fontSize: '0.7rem' }}
            >
              — Loved by others
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        <Newsletter variant="default" />
      </div>
    )
  }
  
  // ═══════════════════════════════════════════
  // WISHLIST WITH ITEMS
  // ═══════════════════════════════════════════
  return (
    <div className="bg-noir min-h-screen">
      
      {/* ═══════════════════════════════════════
          HEADER
      ═══════════════════════════════════════ */}
      <section className="pt-32 md:pt-40 pb-8 md:pb-12 border-b border-graphite/30">
        <div className="container-luxury">
          <div className="flex items-end justify-between flex-wrap gap-4">
            
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-tiny tracking-mega text-gold uppercase mb-4"
                style={{ fontSize: '0.7rem' }}
              >
                — Saved For Later
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-cormorant font-light text-ivory mb-2"
                style={{ 
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  lineHeight: 0.95,
                }}
              >
                Your <em className="italic text-gold">wishlist</em>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-cormorant italic text-platinum text-lg"
              >
                {formatNumber(itemCount)} {itemCount === 1 ? 'piece' : 'pieces'} · 
                Total value {formatPrice(totalValue)}
              </motion.p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          TOOLBAR
      ═══════════════════════════════════════ */}
      <section className="py-6 border-b border-graphite/30 sticky top-16 md:top-20 z-30 bg-noir/95 backdrop-blur-luxury">
        <div className="container-luxury">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Sort */}
            <div className="flex items-center gap-3">
              <label 
                className="text-tiny tracking-mega text-silver uppercase hidden md:block"
                style={{ fontSize: '0.65rem' }}
              >
                Sort:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-graphite text-ivory text-tiny tracking-mega uppercase py-2 px-4 hover:border-gold transition-colors cursor-pointer"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                {sortOptions.map(option => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    className="bg-noir"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Add All to Cart */}
              <button
                onClick={handleAddAllToCart}
                disabled={isAddingAll}
                className="inline-flex items-center gap-2 py-2 px-4 bg-ivory text-noir hover:bg-gold transition-colors duration-400 disabled:opacity-60"
                data-cursor="hover"
              >
                <FiShoppingBag size={12} />
                <span 
                  className="text-tiny tracking-mega uppercase font-medium"
                  style={{ fontSize: '0.65rem' }}
                >
                  {isAddingAll ? 'Adding...' : 'Add All to Bag'}
                </span>
              </button>
              
              {/* Share */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 py-2 px-4 border border-graphite text-ivory hover:border-gold hover:text-gold transition-all duration-400"
                data-cursor="hover"
              >
                <FiShare2 size={12} />
                <span 
                  className="text-tiny tracking-mega uppercase hidden md:inline"
                  style={{ fontSize: '0.65rem' }}
                >
                  Share
                </span>
              </button>
              
              {/* Clear */}
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 py-2 px-4 border border-graphite text-silver hover:border-red-400 hover:text-red-400 transition-all duration-400"
                data-cursor="hover"
              >
                <FiTrash2 size={12} />
                <span 
                  className="text-tiny tracking-mega uppercase hidden md:inline"
                  style={{ fontSize: '0.65rem' }}
                >
                  Clear
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          WISHLIST GRID
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="container-luxury">
          
          <motion.div
            key={sortBy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {sortedItems.map((item, index) => {
                // Fetch full product data for the card
                const fullProduct = getProductById(item.id)
                if (!fullProduct) return null
                
                return (
                  <ProductCard
                    key={item.id}
                    product={fullProduct}
                    index={index}
                    showQuickAdd={true}
                    showWishlist={true}
                    showQuickView={true}
                    showColors={true}
                  />
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          RECOMMENDED
      ═══════════════════════════════════════ */}
      <section className="py-24 border-t border-graphite/30">
        <div className="container-luxury">
          <div className="mb-12 text-center">
            <p 
              className="text-tiny tracking-mega text-gold uppercase mb-4"
              style={{ fontSize: '0.7rem' }}
            >
              — Complete Your Collection
            </p>
            <h3 
              className="font-cormorant font-light text-ivory"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              You may also <em className="italic text-gold">love</em>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════ */}
      <Newsletter variant="default" />
    </div>
  )
}

export default Wishlist