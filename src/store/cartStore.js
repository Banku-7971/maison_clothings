import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ═══════════════════════════════════════════════════════════════
// MAISON INDIA — CART (Prices in INR)
// ═══════════════════════════════════════════════════════════════

// INDIAN RUPEE VALUES
const FREE_SHIPPING_THRESHOLD = 5000  // Free shipping above ₹5,000
const STANDARD_SHIPPING_COST = 200    // ₹200
const EXPRESS_SHIPPING_COST = 500     // ₹500
const INTERNATIONAL_SHIPPING_COST = 2000  // (not needed for India-only)
const TAX_RATE = 0.18  // 18% GST

// COUPONS (INR values)
const VALID_COUPONS = {
  'WELCOME10': { discount: 0.10, type: 'percentage', description: '10% off welcome discount' },
  'MAISON15': { discount: 0.15, type: 'percentage', description: '15% off MAISON insider' },
  'ATELIER20': { discount: 0.20, type: 'percentage', description: '20% off atelier members' },
  'FREESHIP': { discount: 0, type: 'shipping', description: 'Free express shipping' },
  'FIRST500': { discount: 500, type: 'fixed', description: '₹500 off first order' },
  'LUXURY1000': { discount: 1000, type: 'fixed', description: '₹1000 off luxury items' },
  'INDIA50': { discount: 0.50, type: 'percentage', description: '50% off — India special' },
}

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      couponDiscount: 0,
      couponType: null,
      shippingMethod: 'standard',
      shippingAddress: null,
      lastAdded: null,
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      
      addItem: (product, size = null, color = null, quantity = 1) => {
        const items = get().items
        const itemKey = `${product.id}-${size?.size || 'onesize'}-${color?.name || 'default'}`
        const existingItem = items.find(item => item.key === itemKey)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.key === itemKey
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            lastAdded: { id: product.id, name: product.name, timestamp: Date.now() },
          })
        } else {
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
            lastAdded: { id: product.id, name: product.name, timestamp: Date.now() },
          })
        }
      },
      
      removeItem: (itemKey) => {
        set(state => ({
          items: state.items.filter(item => item.key !== itemKey),
        }))
      },
      
      updateQuantity: (itemKey, quantity) => {
        if (quantity < 1) { get().removeItem(itemKey); return }
        if (quantity > 99) quantity = 99
        set(state => ({
          items: state.items.map(item =>
            item.key === itemKey ? { ...item, quantity } : item
          ),
        }))
      },
      
      incrementQuantity: (itemKey) => {
        const item = get().items.find(i => i.key === itemKey)
        if (item) get().updateQuantity(itemKey, item.quantity + 1)
      },
      
      decrementQuantity: (itemKey) => {
        const item = get().items.find(i => i.key === itemKey)
        if (item) get().updateQuantity(itemKey, item.quantity - 1)
      },
      
      clearCart: () => {
        set({
          items: [], couponCode: null, couponDiscount: 0,
          couponType: null, lastAdded: null,
        })
      },
      
      applyCoupon: (code) => {
        const upperCode = code.toUpperCase().trim()
        const coupon = VALID_COUPONS[upperCode]
        if (coupon) {
          set({
            couponCode: upperCode,
            couponDiscount: coupon.discount,
            couponType: coupon.type,
          })
          return { success: true, message: coupon.description, discount: coupon.discount }
        }
        return { success: false, message: 'Invalid coupon code', discount: 0 }
      },
      
      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0, couponType: null })
      },
      
      setShippingMethod: (method) => {
        if (['standard', 'express'].includes(method)) {
          set({ shippingMethod: method })
        }
      },
      
      setShippingAddress: (address) => set({ shippingAddress: address }),
      
      getItemCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getUniqueItemCount: () => get().items.length,
      getSubtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      
      getDiscountAmount: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        if (!state.couponCode) return 0
        if (state.couponType === 'percentage') return subtotal * state.couponDiscount
        if (state.couponType === 'fixed') return Math.min(state.couponDiscount, subtotal)
        return 0
      },
      
      getShippingCost: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
        if (state.couponType === 'shipping') return 0
        if (state.items.length === 0) return 0
        switch (state.shippingMethod) {
          case 'express': return EXPRESS_SHIPPING_COST
          case 'standard':
          default: return STANDARD_SHIPPING_COST
        }
      },
      
      getTaxAmount: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        const discount = state.getDiscountAmount()
        return (subtotal - discount) * TAX_RATE
      },
      
      getTotal: () => {
        const state = get()
        return state.getSubtotal() - state.getDiscountAmount() + state.getShippingCost() + state.getTaxAmount()
      },
      
      getAmountForFreeShipping: () => {
        const remaining = FREE_SHIPPING_THRESHOLD - get().getSubtotal()
        return remaining > 0 ? remaining : 0
      },
      
      isInCart: (productId, size = null, color = null) => {
        const itemKey = `${productId}-${size || 'onesize'}-${color || 'default'}`
        return get().items.some(item => item.key === itemKey)
      },
      
      getItem: (itemKey) => get().items.find(item => item.key === itemKey),
      isEmpty: () => get().items.length === 0,
      
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
    {
      name: 'maison-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items, couponCode: state.couponCode,
        couponDiscount: state.couponDiscount, couponType: state.couponType,
        shippingMethod: state.shippingMethod,
      }),
      version: 1,
    }
  )
)

export default useCartStore

export {
  FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST, EXPRESS_SHIPPING_COST,
  INTERNATIONAL_SHIPPING_COST, TAX_RATE, VALID_COUPONS,
}