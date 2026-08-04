import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, 
  FiShoppingBag, 
  FiTag,
  FiCheck,
  FiX,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from 'react-icons/fi'
import CartItem from '../components/CartItem'
import ProductCard from '../components/ProductCard'
import Newsletter from '../components/Newsletter'
import useCartStore from '../store/cartStore'
import useUIStore from '../store/uiStore'
import { getBestsellers } from '../data/products'
import { formatPrice } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — CART PAGE
// ═══════════════════════════════════════════════════════════════
// Full-page cart experience.
// Where consideration becomes commitment.
//
// Features:
// - Editorial header
// - Full item list (larger than drawer)
// - Coupon code input with validation
// - Shipping estimator
// - Order summary with breakdown
// - Free shipping progress bar
// - Trust signals (secure, returns, guarantee)
// - Recommended products
// - Empty state with CTA
// - Continue shopping link
// - Checkout button (prominent)
// - Newsletter footer
// ═══════════════════════════════════════════════════════════════

const Cart = () => {
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const items = useCartStore(state => state.items)
  const getItemCount = useCartStore(state => state.getItemCount)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const getDiscountAmount = useCartStore(state => state.getDiscountAmount)
  const getShippingCost = useCartStore(state => state.getShippingCost)
  const getTaxAmount = useCartStore(state => state.getTaxAmount)
  const getTotal = useCartStore(state => state.getTotal)
  const getShippingInfo = useCartStore(state => state.getShippingInfo)
  const applyCoupon = useCartStore(state => state.applyCoupon)
  const removeCoupon = useCartStore(state => state.removeCoupon)
  const couponCode = useCartStore(state => state.couponCode)
  const shippingMethod = useCartStore(state => state.shippingMethod)
  const setShippingMethod = useCartStore(state => state.setShippingMethod)
  const clearCart = useCartStore(state => state.clearCart)
  
  const showToast = useUIStore(state => state.showToast)
  
  // ─────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')
  
  // ─────────────────────────────────────────
  // DOCUMENT TITLE
  // ─────────────────────────────────────────
  useEffect(() => {
    document.title = `Your Bag (${getItemCount()}) — MAISON`
    return () => {
      document.title = 'MAISON'
    }
  }, [items])
  
  // ─────────────────────────────────────────
  // RECOMMENDED PRODUCTS
  // ─────────────────────────────────────────
  const recommended = getBestsellers().slice(0, 4)
  
  // ─────────────────────────────────────────
  // COMPUTED VALUES
  // ─────────────────────────────────────────
  const itemCount = getItemCount()
  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const shipping = getShippingCost()
  const tax = getTaxAmount()
  const total = getTotal()
  const shippingInfo = getShippingInfo()
  
  // ─────────────────────────────────────────
  // COUPON HANDLER
  // ─────────────────────────────────────────
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCouponError('Please enter a code')
      setCouponSuccess('')
      return
    }
    
    const result = applyCoupon(couponInput)
    
    if (result.success) {
      setCouponSuccess(result.message)
      setCouponError('')
      setCouponInput('')
      showToast({
        type: 'default',
        message: 'Coupon applied successfully',
        duration: 3000,
      })
    } else {
      setCouponError(result.message)
      setCouponSuccess('')
    }
  }
  
  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponSuccess('')
    setCouponError('')
    showToast({
      type: 'default',
      message: 'Coupon removed',
      duration: 2000,
    })
  }
  
  // ═══════════════════════════════════════════
  // EMPTY CART STATE
  // ═══════════════════════════════════════════
  if (items.length === 0) {
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
              — Your Selection
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
              Your <em className="italic text-gold">bag</em>
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
                <FiShoppingBag className="text-silver" size={32} />
              </div>
              
              <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-4">
                Your bag is empty
              </h2>
              
              <p className="font-cormorant italic text-platinum text-lg leading-relaxed mb-10">
                No pieces have been chosen yet. 
                Discover the atelier and find something worthy of your collection.
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
                    Explore Collection
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
              — You May Love
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
  // CART WITH ITEMS
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
                — Your Selection
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
                Your <em className="italic text-gold">bag</em>
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-tiny tracking-mega text-silver uppercase font-mono"
              style={{ fontSize: '0.75rem' }}
            >
              {String(itemCount).padStart(2, '0')} {itemCount === 1 ? 'Piece' : 'Pieces'}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* ═══════════════════════════════════════
                LEFT: CART ITEMS
            ═══════════════════════════════════════ */}
            <div className="lg:col-span-2">
              
              {/* Items List */}
              <div className="divide-y divide-graphite/30">
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem 
                      key={item.key}
                      item={item}
                      variant="default"
                    />
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Clear Cart Button */}
              <div className="mt-8 pt-8 border-t border-graphite/30 flex flex-wrap items-center justify-between gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-tiny tracking-mega text-ivory hover:text-gold uppercase transition-colors duration-400"
                  style={{ fontSize: '0.7rem' }}
                  data-cursor="hover"
                >
                  ← Continue Shopping
                </Link>
                
                <button
                  onClick={() => {
                    if (confirm('Clear all items from your bag?')) {
                      clearCart()
                      showToast({
                        type: 'default',
                        message: 'Bag cleared',
                        duration: 2000,
                      })
                    }
                  }}
                  className="text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors duration-400 link-luxury"
                  style={{ fontSize: '0.7rem' }}
                  data-cursor="hover"
                >
                  Clear Bag
                </button>
              </div>
            </div>
            
            {/* ═══════════════════════════════════════
                RIGHT: ORDER SUMMARY
            ═══════════════════════════════════════ */}
            <div>
              <div className="sticky top-32 space-y-6">
                
                {/* Summary Card */}
                <div className="bg-charcoal border border-graphite p-6 md:p-8">
                  
                  <h2 className="font-cormorant text-2xl md:text-3xl text-ivory mb-6">
                    Order Summary
                  </h2>
                  
                  {/* Free Shipping Progress */}
                  {!shippingInfo.qualifiesForFreeShipping && (
                    <div className="mb-6 p-4 bg-noir/50 border border-gold/30">
                      <p className="text-xs text-platinum mb-3">
                        Add <span className="text-gold font-medium">
                          {formatPrice(shippingInfo.remaining)}
                        </span> more for free shipping
                      </p>
                      <div className="h-px bg-graphite overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${shippingInfo.percentage}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-gold"
                        />
                      </div>
                    </div>
                  )}
                  
                  {shippingInfo.qualifiesForFreeShipping && (
                    <div className="mb-6 p-4 bg-gold/10 border border-gold/30 flex items-center gap-3">
                      <FiCheck className="text-gold" size={16} />
                      <p className="text-xs text-gold tracking-wider">
                        Complimentary shipping unlocked
                      </p>
                    </div>
                  )}
                  
                  {/* Line Items */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-sm text-platinum font-cormorant"
                      >
                        Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                      </span>
                      <span className="text-sm text-ivory tabular-nums font-cormorant">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gold font-cormorant">
                          Discount ({couponCode})
                        </span>
                        <span className="text-sm text-gold tabular-nums font-cormorant">
                          −{formatPrice(discount)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-platinum font-cormorant">
                        Shipping
                      </span>
                      <span className="text-sm text-ivory tabular-nums font-cormorant">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-platinum font-cormorant">
                        Tax (est.)
                      </span>
                      <span className="text-sm text-ivory tabular-nums font-cormorant">
                        {formatPrice(tax)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="pt-4 border-t border-graphite/50 mb-6">
                    <div className="flex items-baseline justify-between">
                      <span 
                        className="text-tiny tracking-mega text-ivory uppercase"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Total
                      </span>
                      <span className="font-cormorant text-3xl text-ivory tabular-nums">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <p 
                      className="text-tiny text-silver italic font-cormorant mt-2 text-right"
                      style={{ fontSize: '0.7rem' }}
                    >
                      Shipping calculated at checkout
                    </p>
                  </div>
                  
                  {/* Checkout Button */}
                  <Link
                    to="/checkout"
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
                </div>
                
                {/* Coupon Code */}
                <div className="bg-charcoal border border-graphite p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiTag className="text-gold" size={14} />
                    <h3 
                      className="text-tiny tracking-mega text-ivory uppercase"
                      style={{ fontSize: '0.7rem' }}
                    >
                      Promotional Code
                    </h3>
                  </div>
                  
                  {couponCode ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-3 bg-gold/10 border border-gold/30"
                    >
                      <div>
                        <p className="text-tiny tracking-mega text-gold uppercase" style={{ fontSize: '0.65rem' }}>
                          {couponCode}
                        </p>
                        <p className="text-xs text-platinum mt-1 italic">
                          Applied successfully
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-silver hover:text-gold transition-colors"
                        aria-label="Remove coupon"
                        data-cursor="hover"
                      >
                        <FiX size={16} />
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase())
                            setCouponError('')
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2.5 bg-noir border border-graphite text-ivory text-sm placeholder:text-silver focus:border-gold transition-colors uppercase tracking-wider font-mono"
                          data-cursor="text"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="px-4 py-2.5 bg-ivory text-noir text-tiny tracking-mega uppercase hover:bg-gold transition-colors duration-400"
                          style={{ fontSize: '0.65rem' }}
                          data-cursor="hover"
                        >
                          Apply
                        </button>
                      </div>
                      
                      {couponError && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-tiny text-red-400"
                          style={{ fontSize: '0.7rem' }}
                        >
                          {couponError}
                        </motion.p>
                      )}
                      
                      <p 
                        className="mt-3 text-tiny text-silver italic font-cormorant"
                        style={{ fontSize: '0.7rem' }}
                      >
                        Try: WELCOME10 or FIRST100
                      </p>
                    </>
                  )}
                </div>
                
                {/* Trust Signals */}
                <div className="space-y-3">
                  {[
                    { icon: FiShield, text: 'Secure checkout & payment' },
                    { icon: FiTruck, text: 'Free worldwide shipping' },
                    { icon: FiRefreshCw, text: 'Complimentary returns' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="text-gold flex-shrink-0" size={14} />
                      <span className="text-sm text-platinum font-cormorant italic">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
              — Complete The Look
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

export default Cart