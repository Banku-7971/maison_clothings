import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ═══════════════════════════════════════════════════════════════
// MAISON — CART STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════
// Complete shopping cart with:
// - Add/remove/update items
// - Size and color variants
// - Quantity management
// - Coupon codes
// - Shipping calculations
// - Tax calculations
// - LocalStorage persistence
// - Cart drawer toggle
// - Item count badge
// - Free shipping threshold
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const FREE_SHIPPING_THRESHOLD = 500 // $500+ gets free shipping
const STANDARD_SHIPPING_COST = 25
const EXPRESS_SHIPPING_COST = 45
const INTERNATIONAL_SHIPPING_COST = 75
const TAX_RATE = 0.08 // 8% tax rate

// ─────────────────────────────────────────
// VALID COUPON CODES
// ─────────────────────────────────────────
const VALID_COUPONS = {
  'WELCOME10': { discount: 0.10, type: 'percentage', description: '10% off welcome discount' },
  'MAISON15': { discount: 0.15, type: 'percentage', description: '15% off MAISON insider' },
  'ATELIER20': { discount: 0.20, type: 'percentage', description: '20% off atelier members' },
  'FREESHIP': { discount: 0, type: 'shipping', description: 'Free express shipping' },
  'FIRST100': { discount: 100, type: 'fixed', description: '$100 off first order' },
  'LUXURY50': { discount: 50, type: 'fixed', description: '$50 off luxury items' },
}


// ═══════════════════════════════════════════════════════════════
// CART STORE — Zustand with persistence
// ═══════════════════════════════════════════════════════════════
const useCartStore = create(
  persist(
    (set, get) => ({
      
      // ─────────────────────────────────────────
      // STATE
      // ─────────────────────────────────────────
      items: [],
      isOpen: false,
      couponCode: null,
      couponDiscount: 0,
      couponType: null,
      shippingMethod: 'standard', // standard | express | international
      shippingAddress: null,
      lastAdded: null, // For toast notifications
      
      // ─────────────────────────────────────────
      // OPEN/CLOSE CART DRAWER
      // ─────────────────────────────────────────
      openCart: () => set({ isOpen: true }),
      
      closeCart: () => set({ isOpen: false }),
      
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      
      // ─────────────────────────────────────────
      // ADD ITEM TO CART
      // ─────────────────────────────────────────
      addItem: (product, size = null, color = null, quantity = 1) => {
        const items = get().items
        
        // Create unique identifier based on product + size + color
        const itemKey = `${product.id}-${size?.size || 'onesize'}-${color?.name || 'default'}`
        
        // Check if this exact variant already exists
        const existingItem = items.find(item => item.key === itemKey)
        
        if (existingItem) {
          // Update quantity of existing item
          set({
            items: items.map(item =>
              item.key === itemKey
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            lastAdded: {
              id: product.id,
              name: product.name,
              timestamp: Date.now(),
            },
          })
        } else {
          // Add new item
          const newItem = {
            key: itemKey,
            id: product.id,
            slug: product.slug,
            name: product.name,
            subtitle: product.subtitle,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.thumbnail || product.images[0],
            size: size?.size || 'One Size',
            color: color?.name || 'Default',
            colorHex: color?.hex || '#000000',
            quantity: quantity,
            category: product.category,
            addedAt: Date.now(),
          }
          
          set({
            items: [...items, newItem],
            lastAdded: {
              id: product.id,
              name: product.name,
              timestamp: Date.now(),
            },
          })
        }
      },
      
      // ─────────────────────────────────────────
      // REMOVE ITEM FROM CART
      // ─────────────────────────────────────────
      removeItem: (itemKey) => {
        set(state => ({
          items: state.items.filter(item => item.key !== itemKey),
        }))
      },
      
      // ─────────────────────────────────────────
      // UPDATE ITEM QUANTITY
      // ─────────────────────────────────────────
      updateQuantity: (itemKey, quantity) => {
        if (quantity < 1) {
          // Remove if quantity drops to 0
          get().removeItem(itemKey)
          return
        }
        
        if (quantity > 99) {
          // Cap at 99
          quantity = 99
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.key === itemKey ? { ...item, quantity } : item
          ),
        }))
      },
      
      // ─────────────────────────────────────────
      // INCREMENT QUANTITY
      // ─────────────────────────────────────────
      incrementQuantity: (itemKey) => {
        const item = get().items.find(i => i.key === itemKey)
        if (item) {
          get().updateQuantity(itemKey, item.quantity + 1)
        }
      },
      
      // ─────────────────────────────────────────
      // DECREMENT QUANTITY
      // ─────────────────────────────────────────
      decrementQuantity: (itemKey) => {
        const item = get().items.find(i => i.key === itemKey)
        if (item) {
          get().updateQuantity(itemKey, item.quantity - 1)
        }
      },
      
      // ─────────────────────────────────────────
      // CLEAR ENTIRE CART
      // ─────────────────────────────────────────
      clearCart: () => {
        set({
          items: [],
          couponCode: null,
          couponDiscount: 0,
          couponType: null,
          lastAdded: null,
        })
      },
      
      // ─────────────────────────────────────────
      // APPLY COUPON CODE
      // ─────────────────────────────────────────
      applyCoupon: (code) => {
        const upperCode = code.toUpperCase().trim()
        const coupon = VALID_COUPONS[upperCode]
        
        if (coupon) {
          set({
            couponCode: upperCode,
            couponDiscount: coupon.discount,
            couponType: coupon.type,
          })
          return {
            success: true,
            message: coupon.description,
            discount: coupon.discount,
          }
        } else {
          return {
            success: false,
            message: 'Invalid coupon code',
            discount: 0,
          }
        }
      },
      
      // ─────────────────────────────────────────
      // REMOVE COUPON
      // ─────────────────────────────────────────
      removeCoupon: () => {
        set({
          couponCode: null,
          couponDiscount: 0,
          couponType: null,
        })
      },
      
      // ─────────────────────────────────────────
      // SET SHIPPING METHOD
      // ─────────────────────────────────────────
      setShippingMethod: (method) => {
        if (['standard', 'express', 'international'].includes(method)) {
          set({ shippingMethod: method })
        }
      },
      
      // ─────────────────────────────────────────
      // SET SHIPPING ADDRESS
      // ─────────────────────────────────────────
      setShippingAddress: (address) => {
        set({ shippingAddress: address })
      },
      
      // ═══════════════════════════════════════
      // COMPUTED VALUES (Getters)
      // ═══════════════════════════════════════
      
      // Get total item count (with quantities)
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      // Get unique item count
      getUniqueItemCount: () => {
        return get().items.length
      },
      
      // Get subtotal (before discount, shipping, tax)
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
      
      // Get discount amount
      getDiscountAmount: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        
        if (!state.couponCode) return 0
        
        if (state.couponType === 'percentage') {
          return subtotal * state.couponDiscount
        } else if (state.couponType === 'fixed') {
          return Math.min(state.couponDiscount, subtotal)
        }
        
        return 0
      },
      
      // Get shipping cost
      getShippingCost: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        
        // Free shipping over threshold
        if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
        
        // Free shipping coupon
        if (state.couponType === 'shipping') return 0
        
        // Empty cart
        if (state.items.length === 0) return 0
        
        // Calculate based on method
        switch (state.shippingMethod) {
          case 'express':
            return EXPRESS_SHIPPING_COST
          case 'international':
            return INTERNATIONAL_SHIPPING_COST
          case 'standard':
          default:
            return STANDARD_SHIPPING_COST
        }
      },
      
      // Get tax amount
      getTaxAmount: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        const discount = state.getDiscountAmount()
        return (subtotal - discount) * TAX_RATE
      },
      
      // Get grand total
      getTotal: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        const discount = state.getDiscountAmount()
        const shipping = state.getShippingCost()
        const tax = state.getTaxAmount()
        return subtotal - discount + shipping + tax
      },
      
      // Get amount needed for free shipping
      getAmountForFreeShipping: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal
        return remaining > 0 ? remaining : 0
      },
      
      // Check if item is in cart
      isInCart: (productId, size = null, color = null) => {
        const itemKey = `${productId}-${size || 'onesize'}-${color || 'default'}`
        return get().items.some(item => item.key === itemKey)
      },
      
      // Get specific item from cart
      getItem: (itemKey) => {
        return get().items.find(item => item.key === itemKey)
      },
      
      // Check if cart is empty
      isEmpty: () => {
        return get().items.length === 0
      },
      
      // Get shipping threshold info
      getShippingInfo: () => {
        const subtotal = get().getSubtotal()
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal
        const percentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
        
        return {
          threshold: FREE_SHIPPING_THRESHOLD,
          current: subtotal,
          remaining: remaining > 0 ? remaining : 0,
          percentage: percentage,
          qualifiesForFreeShipping: subtotal >= FREE_SHIPPING_THRESHOLD,
        }
      },
    }),
    
    // ═══════════════════════════════════════
    // PERSISTENCE CONFIGURATION
    // Save cart to localStorage
    // ═══════════════════════════════════════
    {
      name: 'maison-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
        couponType: state.couponType,
        shippingMethod: state.shippingMethod,
      }),
      version: 1,
    }
  )
)

export default useCartStore

// ═══════════════════════════════════════════════════════════════
// EXPORTS FOR EXTERNAL USE
// ═══════════════════════════════════════════════════════════════
export {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
  EXPRESS_SHIPPING_COST,
  INTERNATIONAL_SHIPPING_COST,
  TAX_RATE,
  VALID_COUPONS,
}