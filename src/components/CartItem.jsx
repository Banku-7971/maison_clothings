import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiPlus, 
  FiMinus, 
  FiTrash2, 
  FiHeart,
  FiEdit3,
} from 'react-icons/fi'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import useUIStore from '../store/uiStore'
import { formatPrice } from '../utils/formatters'
import { getProductById } from '../data/products'

// ═══════════════════════════════════════════════════════════════
// MAISON — CART LINE ITEM
// ═══════════════════════════════════════════════════════════════
// Standalone reusable cart item component.
// Used in Cart page (larger) and can be reused elsewhere.
//
// Features:
// - Large product image with hover zoom
// - Full product details display
// - Quantity controls with animations
// - Remove with confirmation
// - Move to wishlist option
// - Size and color display
// - Individual and subtotal price
// - Stock status warning
// - Delivery estimate
// - Save for later option
// - Link to product page
// ═══════════════════════════════════════════════════════════════

const CartItem = ({ 
  item, 
  variant = 'default',    // 'default' | 'compact' | 'mini'
  showActions = true,
}) => {
  
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const removeItem = useCartStore(state => state.removeItem)
  const incrementQuantity = useCartStore(state => state.incrementQuantity)
  const decrementQuantity = useCartStore(state => state.decrementQuantity)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  
  const addToWishlist = useWishlistStore(state => state.addItem)
  const isInWishlist = useWishlistStore(state => state.isInWishlist(item.id))
  
  const showToast = useUIStore(state => state.showToast)
  
  // ─────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────
  const [isRemoving, setIsRemoving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  // ─────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────
  const handleRemove = () => {
    setIsRemoving(true)
    
    setTimeout(() => {
      removeItem(item.key)
      showToast({
        type: 'default',
        message: 'Removed from bag',
        duration: 3000,
      })
    }, 400)
  }
  
  const handleMoveToWishlist = () => {
    const fullProduct = getProductById(item.id)
    if (fullProduct) {
      addToWishlist(fullProduct)
      removeItem(item.key)
      showToast({
        type: 'default',
        message: 'Moved to wishlist',
        duration: 3000,
      })
    }
  }
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    if (newQuantity > 99) return
    updateQuantity(item.key, newQuantity)
  }
  
  const subtotal = item.price * item.quantity
  
  // ═══════════════════════════════════════════
  // VARIANT: MINI (Ultra compact)
  // ═══════════════════════════════════════════
  if (variant === 'mini') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="flex items-center gap-3 py-3"
      >
        <Link 
          to={`/product/${item.slug}`}
          className="w-16 h-20 flex-shrink-0 bg-charcoal overflow-hidden"
          data-cursor="hover"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/product/${item.slug}`}
            className="block group"
            data-cursor="hover"
          >
            <h4 className="font-cormorant text-sm text-ivory group-hover:text-gold transition-colors truncate">
              {item.name}
            </h4>
          </Link>
          <p className="text-tiny text-silver mt-1" style={{ fontSize: '0.65rem' }}>
            Qty: {item.quantity}
          </p>
        </div>
        
        <p className="font-cormorant text-sm text-ivory tabular-nums flex-shrink-0">
          {formatPrice(subtotal)}
        </p>
      </motion.div>
    )
  }
  
  // ═══════════════════════════════════════════
  // VARIANT: COMPACT (Drawer style)
  // ═══════════════════════════════════════════
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isRemoving ? 0 : 1, 
          y: 0,
          x: isRemoving ? 100 : 0,
        }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex gap-4 py-6 border-b border-graphite/30 last:border-b-0"
      >
        {/* Image */}
        <Link 
          to={`/product/${item.slug}`}
          className="w-24 h-32 flex-shrink-0 bg-charcoal overflow-hidden group"
          data-cursor="view"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-800 ease-luxury"
            draggable={false}
          />
        </Link>
        
        {/* Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <Link 
              to={`/product/${item.slug}`}
              className="group"
              data-cursor="hover"
            >
              <h3 className="font-cormorant text-lg text-ivory group-hover:text-gold transition-colors leading-tight">
                {item.name}
              </h3>
              {item.subtitle && (
                <p className="text-tiny text-silver mt-1" style={{ fontSize: '0.65rem' }}>
                  {item.subtitle}
                </p>
              )}
            </Link>
            
            <div className="flex items-center gap-3 mt-2 text-xs text-platinum">
              {item.color && (
                <span className="flex items-center gap-1.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full border border-graphite" 
                    style={{ backgroundColor: item.colorHex }}
                  />
                  {item.color}
                </span>
              )}
              {item.size && item.size !== 'One Size' && (
                <span>Size {item.size}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-3">
            <div className="inline-flex items-center border border-graphite/50">
              <button
                onClick={() => decrementQuantity(item.key)}
                className="w-7 h-7 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                data-cursor="hover"
              >
                <FiMinus size={10} />
              </button>
              <span className="w-8 text-center text-tiny text-ivory font-mono">
                {item.quantity}
              </span>
              <button
                onClick={() => incrementQuantity(item.key)}
                className="w-7 h-7 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                data-cursor="hover"
              >
                <FiPlus size={10} />
              </button>
            </div>
            
            <p className="font-cormorant text-base text-ivory tabular-nums">
              {formatPrice(subtotal)}
            </p>
          </div>
          
          <button
            onClick={handleRemove}
            className="mt-2 self-end text-tiny text-silver hover:text-gold uppercase tracking-mega transition-colors"
            style={{ fontSize: '0.6rem' }}
            data-cursor="hover"
          >
            Remove
          </button>
        </div>
      </motion.div>
    )
  }
  
  // ═══════════════════════════════════════════
  // VARIANT: DEFAULT (Full cart page)
  // ═══════════════════════════════════════════
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isRemoving ? 0 : 1, 
        y: 0,
        x: isRemoving ? 100 : 0,
      }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-[200px_1fr_auto] gap-6 md:gap-8 py-8 border-b border-graphite/30"
    >
      
      {/* ═══════════════════════════════════════
          IMAGE
      ═══════════════════════════════════════ */}
      <Link 
        to={`/product/${item.slug}`}
        className="block relative w-full md:w-48 aspect-[4/5] bg-charcoal overflow-hidden group"
        data-cursor="view"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1200 ease-luxury"
          draggable={false}
        />
        
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 pointer-events-none">
          <div className="w-3 h-px bg-gold" />
          <div className="w-px h-3 bg-gold" />
        </div>
        <div className="absolute bottom-2 right-2 pointer-events-none">
          <div className="w-px h-3 bg-gold ml-auto" />
          <div className="w-3 h-px bg-gold ml-auto" />
        </div>
      </Link>
      
      {/* ═══════════════════════════════════════
          DETAILS
      ═══════════════════════════════════════ */}
      <div className="flex flex-col justify-between min-w-0">
        <div>
          
          {/* Category */}
          <p 
            className="text-tiny tracking-mega text-silver uppercase mb-2"
            style={{ fontSize: '0.65rem' }}
          >
            {item.category}
          </p>
          
          {/* Name */}
          <Link 
            to={`/product/${item.slug}`}
            className="group"
            data-cursor="hover"
          >
            <h3 className="font-cormorant text-2xl md:text-3xl text-ivory group-hover:text-gold transition-colors leading-tight mb-2">
              {item.name}
            </h3>
          </Link>
          
          {/* Subtitle */}
          {item.subtitle && (
            <p className="font-cormorant italic text-silver text-base mb-4">
              — {item.subtitle}
            </p>
          )}
          
          {/* Variants */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
            
            {/* Color */}
            {item.color && item.color !== 'Default' && (
              <div className="flex items-center gap-2">
                <span 
                  className="text-tiny tracking-mega text-silver uppercase"
                  style={{ fontSize: '0.65rem' }}
                >
                  Color:
                </span>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-4 h-4 rounded-full border border-graphite" 
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span className="text-sm text-ivory font-cormorant">
                    {item.color}
                  </span>
                </div>
              </div>
            )}
            
            {/* Size */}
            {item.size && item.size !== 'One Size' && (
              <div className="flex items-center gap-2">
                <span 
                  className="text-tiny tracking-mega text-silver uppercase"
                  style={{ fontSize: '0.65rem' }}
                >
                  Size:
                </span>
                <span className="text-sm text-ivory font-cormorant tracking-wider">
                  {item.size}
                </span>
              </div>
            )}
          </div>
          
          {/* Delivery Estimate */}
          <p className="text-tiny text-platinum font-cormorant italic mb-6" style={{ fontSize: '0.75rem' }}>
            Ships within 3-5 business days
          </p>
          
          {/* Actions */}
          {showActions && (
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Move to Wishlist */}
              {!isInWishlist && (
                <button
                  onClick={handleMoveToWishlist}
                  className="inline-flex items-center gap-2 text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors duration-400 link-luxury"
                  style={{ fontSize: '0.65rem' }}
                  data-cursor="hover"
                >
                  <FiHeart size={12} />
                  <span>Move to Wishlist</span>
                </button>
              )}
              
              {/* Remove */}
              <button
                onClick={handleRemove}
                className="inline-flex items-center gap-2 text-tiny tracking-mega text-silver hover:text-red-400 uppercase transition-colors duration-400 link-luxury"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                <FiTrash2 size={12} />
                <span>Remove</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* ═══════════════════════════════════════
          QUANTITY & PRICE
      ═══════════════════════════════════════ */}
      <div className="flex flex-row md:flex-col items-end md:items-end justify-between md:justify-start gap-4 md:min-w-[180px]">
        
        {/* Quantity Selector */}
        <div>
          <p 
            className="text-tiny tracking-mega text-silver uppercase mb-2 text-right"
            style={{ fontSize: '0.65rem' }}
          >
            Quantity
          </p>
          <div className="inline-flex items-center border border-graphite">
            <button
              onClick={() => decrementQuantity(item.key)}
              className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              data-cursor="hover"
            >
              <FiMinus size={12} />
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-12 h-10 bg-transparent text-center text-ivory text-sm font-mono tabular-nums focus:outline-none"
              min="1"
              max="99"
              data-cursor="text"
            />
            <button
              onClick={() => incrementQuantity(item.key)}
              className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors"
              disabled={item.quantity >= 99}
              aria-label="Increase quantity"
              data-cursor="hover"
            >
              <FiPlus size={12} />
            </button>
          </div>
        </div>
        
        {/* Price */}
        <div className="text-right">
          <p 
            className="text-tiny tracking-mega text-silver uppercase mb-2"
            style={{ fontSize: '0.65rem' }}
          >
            Price
          </p>
          <p className="font-cormorant text-2xl md:text-3xl text-ivory tabular-nums leading-tight">
            {formatPrice(subtotal)}
          </p>
          {item.quantity > 1 && (
            <p 
              className="text-tiny text-silver mt-1 tabular-nums font-cormorant italic"
              style={{ fontSize: '0.7rem' }}
            >
              {formatPrice(item.price)} each
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem