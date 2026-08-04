import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiX, 
  FiPlus, 
  FiMinus, 
  FiTrash2, 
  FiArrowRight,
  FiShoppingBag,
  FiCheck,
  FiTruck,
} from 'react-icons/fi'
import useCartStore from '../store/cartStore'
import { formatPrice } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — CART DRAWER
// ═══════════════════════════════════════════════════════════════
// Slides in from the right when cart icon is clicked.
// Shows all cart items with full functionality.
//
// Features:
// - Slide-in animation from right
// - Backdrop with blur
// - Item list with images
// - Quantity controls (+/-)
// - Remove item
// - Size and color display
// - Subtotal calculation
// - Free shipping progress bar
// - Empty state
// - Checkout CTA
// - Continue shopping link
// - Scroll shadow indicators
// - Keyboard: ESC to close
// - Lock body scroll when open
// ═══════════════════════════════════════════════════════════════

const CartDrawer = () => {
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const isOpen = useCartStore(state => state.isOpen)
  const items = useCartStore(state => state.items)
  const closeCart = useCartStore(state => state.closeCart)
  const removeItem = useCartStore(state => state.removeItem)
  const incrementQuantity = useCartStore(state => state.incrementQuantity)
  const decrementQuantity = useCartStore(state => state.decrementQuantity)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const getItemCount = useCartStore(state => state.getItemCount)
  const getShippingInfo = useCartStore(state => state.getShippingInfo)
  
  const subtotal = getSubtotal()
  const itemCount = getItemCount()
  const shippingInfo = getShippingInfo()
  
  // ─────────────────────────────────────────
  // LOCK BODY SCROLL WHEN OPEN
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
  // ESC KEY TO CLOSE
  // ─────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeCart])
  
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeCart}
            className="fixed inset-0 bg-noir/70 backdrop-blur-sm z-[190]"
            aria-hidden="true"
          />
          
          {/* ═══════════════════════════════════════
              DRAWER PANEL
          ═══════════════════════════════════════ */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md md:max-w-lg bg-noir border-l border-graphite/50 z-[200] flex flex-col"
            role="dialog"
            aria-labelledby="cart-title"
            aria-modal="true"
          >
            
            {/* ─────────────────────────────────
                HEADER
            ───────────────────────────────── */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-graphite/50">
              <div>
                <p 
                  className="text-tiny tracking-mega text-gold uppercase mb-1"
                  style={{ fontSize: '0.65rem' }}
                >
                  Your Selection
                </p>
                <h2 
                  id="cart-title"
                  className="font-cormorant text-3xl md:text-4xl text-ivory"
                >
                  Cart ({String(itemCount).padStart(2, '0')})
                </h2>
              </div>
              
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors duration-400"
                aria-label="Close cart"
                data-cursor="hover"
              >
                <FiX size={22} />
              </button>
            </div>
            
            {/* ─────────────────────────────────
                FREE SHIPPING PROGRESS
            ───────────────────────────────── */}
            {items.length > 0 && (
              <div className="px-6 md:px-8 py-4 border-b border-graphite/50">
                {shippingInfo.qualifiesForFreeShipping ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-gold"
                  >
                    <FiTruck size={16} />
                    <p className="text-xs tracking-wider">
                      You've qualified for complimentary shipping
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-platinum">
                        Add <span className="text-gold font-medium">
                          {formatPrice(shippingInfo.remaining)}
                        </span> for free shipping
                      </p>
                      <p className="text-tiny text-silver font-mono tabular-nums">
                        {Math.round(shippingInfo.percentage)}%
                      </p>
                    </div>
                    <div className="h-px bg-graphite overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${shippingInfo.percentage}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gold"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* ═══════════════════════════════════════
                EMPTY STATE
            ═══════════════════════════════════════ */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiShoppingBag 
                    size={48} 
                    className="text-graphite mx-auto mb-6" 
                  />
                  <h3 className="font-cormorant text-2xl text-ivory mb-3">
                    Your selection awaits
                  </h3>
                  <p className="font-cormorant italic text-platinum text-base mb-8 max-w-xs">
                    No pieces have been chosen yet. 
                    Discover our curated collection.
                  </p>
                  <button
                    onClick={closeCart}
                    className="btn-luxury"
                    data-cursor="hover"
                  >
                    <span className="relative z-10">Explore Collection</span>
                  </button>
                </motion.div>
              </div>
            ) : (
              <>
                {/* ═══════════════════════════════════════
                    CART ITEMS LIST
                ═══════════════════════════════════════ */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  <ul className="divide-y divide-graphite/50">
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.li
                          key={item.key}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.22, 1, 0.36, 1],
                            delay: index * 0.05,
                          }}
                          className="p-6 md:p-8"
                        >
                          <div className="flex gap-4">
                            
                            {/* Product Image */}
                            <Link
                              to={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="flex-shrink-0 block w-24 h-32 md:w-28 md:h-36 bg-charcoal overflow-hidden"
                              data-cursor="view"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-800 ease-luxury"
                              />
                            </Link>
                            
                            {/* Product Details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                {/* Name */}
                                <Link
                                  to={`/product/${item.slug}`}
                                  onClick={closeCart}
                                  className="block group"
                                  data-cursor="hover"
                                >
                                  <h3 className="font-cormorant text-xl text-ivory group-hover:text-gold transition-colors duration-400 mb-1">
                                    {item.name}
                                  </h3>
                                  {item.subtitle && (
                                    <p 
                                      className="text-tiny text-silver uppercase tracking-mega"
                                      style={{ fontSize: '0.65rem' }}
                                    >
                                      {item.subtitle}
                                    </p>
                                  )}
                                </Link>
                                
                                {/* Size & Color */}
                                <div className="flex items-center gap-3 mt-3 text-xs text-platinum">
                                  {item.color && item.color !== 'Default' && (
                                    <div className="flex items-center gap-1.5">
                                      <span 
                                        className="w-3 h-3 rounded-full border border-graphite" 
                                        style={{ backgroundColor: item.colorHex }}
                                      />
                                      <span>{item.color}</span>
                                    </div>
                                  )}
                                  {item.size && item.size !== 'One Size' && (
                                    <span>Size {item.size}</span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Price & Quantity Controls */}
                              <div className="flex items-end justify-between mt-4">
                                
                                {/* Quantity */}
                                <div className="inline-flex items-center border border-graphite/50">
                                  <button
                                    onClick={() => decrementQuantity(item.key)}
                                    className="w-8 h-8 flex items-center justify-center text-ivory hover:text-gold transition-colors duration-300"
                                    aria-label="Decrease quantity"
                                    data-cursor="hover"
                                  >
                                    <FiMinus size={12} />
                                  </button>
                                  <span 
                                    className="w-10 h-8 flex items-center justify-center text-xs text-ivory font-mono tabular-nums"
                                  >
                                    {String(item.quantity).padStart(2, '0')}
                                  </span>
                                  <button
                                    onClick={() => incrementQuantity(item.key)}
                                    className="w-8 h-8 flex items-center justify-center text-ivory hover:text-gold transition-colors duration-300"
                                    aria-label="Increase quantity"
                                    data-cursor="hover"
                                  >
                                    <FiPlus size={12} />
                                  </button>
                                </div>
                                
                                {/* Price */}
                                <p className="font-cormorant text-lg text-ivory tabular-nums">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                              
                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.key)}
                                className="mt-3 inline-flex items-center gap-2 text-tiny text-silver hover:text-gold uppercase tracking-mega transition-colors duration-400"
                                style={{ fontSize: '0.65rem' }}
                                data-cursor="hover"
                              >
                                <FiTrash2 size={12} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
                
                {/* ═══════════════════════════════════════
                    FOOTER — TOTALS & CHECKOUT
                ═══════════════════════════════════════ */}
                <div className="border-t border-graphite/50 p-6 md:p-8 space-y-6 bg-noir">
                  
                  {/* Subtotal */}
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span 
                        className="text-tiny tracking-mega text-silver uppercase"
                        style={{ fontSize: '0.7rem' }}
                      >
                        Subtotal
                      </span>
                      <span className="font-cormorant text-2xl text-ivory tabular-nums">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <p 
                      className="text-tiny text-silver italic font-cormorant"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-px bg-graphite/50" />
                  
                  {/* Checkout Button */}
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="block w-full"
                    data-cursor="hover"
                  >
                    <button
                      className="w-full py-4 bg-ivory text-noir flex items-center justify-center gap-3 group hover:bg-gold transition-all duration-500 ease-luxury"
                    >
                      <span 
                        className="text-tiny tracking-mega uppercase font-medium"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Proceed to Checkout
                      </span>
                      <FiArrowRight 
                        size={16} 
                        className="transition-transform duration-400 group-hover:translate-x-1" 
                      />
                    </button>
                  </Link>
                  
                  {/* View Cart Link */}
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="block text-center"
                    data-cursor="hover"
                  >
                    <span 
                      className="text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors duration-400 link-luxury"
                      style={{ fontSize: '0.7rem' }}
                    >
                      View Full Cart
                    </span>
                  </Link>
                  
                  {/* Trust Signals */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-graphite/30">
                    <div className="text-center">
                      <FiCheck className="text-gold mx-auto mb-1.5" size={14} />
                      <p 
                        className="text-tiny text-silver uppercase tracking-mega"
                        style={{ fontSize: '0.55rem' }}
                      >
                        Secure Payment
                      </p>
                    </div>
                    <div className="text-center">
                      <FiTruck className="text-gold mx-auto mb-1.5" size={14} />
                      <p 
                        className="text-tiny text-silver uppercase tracking-mega"
                        style={{ fontSize: '0.55rem' }}
                      >
                        Free Returns
                      </p>
                    </div>
                    <div className="text-center">
                      <svg 
                        className="text-gold mx-auto mb-1.5" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z" />
                      </svg>
                      <p 
                        className="text-tiny text-silver uppercase tracking-mega"
                        style={{ fontSize: '0.55rem' }}
                      >
                        Handcrafted
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer