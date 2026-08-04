import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ═══════════════════════════════════════════════════════════════
// MAISON — WISHLIST STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════
// The wishlist is where desire lives.
// Items saved here are treasured, considered, revisited.
// Complete features:
// - Add/remove/toggle items
// - Persistence across sessions
// - Recent additions tracking
// - Share wishlist functionality
// - Move to cart integration
// - Maximum items limit
// - Sort and filter
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const MAX_WISHLIST_ITEMS = 100
const RECENT_ITEMS_LIMIT = 5


// ═══════════════════════════════════════════════════════════════
// WISHLIST STORE — Zustand with persistence
// ═══════════════════════════════════════════════════════════════
const useWishlistStore = create(
  persist(
    (set, get) => ({
      
      // ─────────────────────────────────────────
      // STATE
      // ─────────────────────────────────────────
      items: [],
      recentlyAdded: [],
      lastAction: null, // 'added' | 'removed' | null
      lastActionProduct: null,
      lastActionTimestamp: null,
      
      // ─────────────────────────────────────────
      // ADD ITEM TO WISHLIST
      // ─────────────────────────────────────────
      addItem: (product) => {
        const items = get().items
        
        // Check if already exists
        if (items.some(item => item.id === product.id)) {
          return {
            success: false,
            message: 'Already in wishlist',
          }
        }
        
        // Check max limit
        if (items.length >= MAX_WISHLIST_ITEMS) {
          return {
            success: false,
            message: `Wishlist limit reached (${MAX_WISHLIST_ITEMS} items)`,
          }
        }
        
        // Create wishlist item (minimal data)
        const wishlistItem = {
          id: product.id,
          slug: product.slug,
          name: product.name,
          subtitle: product.subtitle,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.thumbnail || product.images[0],
          category: product.category,
          collection: product.collection,
          isNew: product.isNew,
          isBestseller: product.isBestseller,
          isLimited: product.isLimited,
          addedAt: Date.now(),
        }
        
        // Add to items
        set(state => ({
          items: [...state.items, wishlistItem],
          recentlyAdded: [
            wishlistItem,
            ...state.recentlyAdded.slice(0, RECENT_ITEMS_LIMIT - 1),
          ],
          lastAction: 'added',
          lastActionProduct: product.name,
          lastActionTimestamp: Date.now(),
        }))
        
        return {
          success: true,
          message: 'Added to wishlist',
        }
      },
      
      // ─────────────────────────────────────────
      // REMOVE ITEM FROM WISHLIST
      // ─────────────────────────────────────────
      removeItem: (productId) => {
        const item = get().items.find(i => i.id === productId)
        
        set(state => ({
          items: state.items.filter(i => i.id !== productId),
          lastAction: 'removed',
          lastActionProduct: item?.name || 'Item',
          lastActionTimestamp: Date.now(),
        }))
        
        return {
          success: true,
          message: 'Removed from wishlist',
        }
      },
      
      // ─────────────────────────────────────────
      // TOGGLE ITEM (add if not exists, remove if exists)
      // Perfect for heart icon click
      // ─────────────────────────────────────────
      toggleItem: (product) => {
        const isInWishlist = get().items.some(item => item.id === product.id)
        
        if (isInWishlist) {
          return get().removeItem(product.id)
        } else {
          return get().addItem(product)
        }
      },
      
      // ─────────────────────────────────────────
      // CLEAR ENTIRE WISHLIST
      // ─────────────────────────────────────────
      clearWishlist: () => {
        set({
          items: [],
          recentlyAdded: [],
          lastAction: null,
          lastActionProduct: null,
          lastActionTimestamp: null,
        })
      },
      
      // ─────────────────────────────────────────
      // CLEAR RECENTLY ADDED
      // ─────────────────────────────────────────
      clearRecentlyAdded: () => {
        set({ recentlyAdded: [] })
      },
      
      // ─────────────────────────────────────────
      // CLEAR LAST ACTION (after toast dismisses)
      // ─────────────────────────────────────────
      clearLastAction: () => {
        set({
          lastAction: null,
          lastActionProduct: null,
          lastActionTimestamp: null,
        })
      },
      
      // ═══════════════════════════════════════
      // COMPUTED VALUES (Getters)
      // ═══════════════════════════════════════
      
      // Check if item is in wishlist
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId)
      },
      
      // Get wishlist count
      getCount: () => {
        return get().items.length
      },
      
      // Get total value of wishlist
      getTotalValue: () => {
        return get().items.reduce((total, item) => total + item.price, 0)
      },
      
      // Check if wishlist is empty
      isEmpty: () => {
        return get().items.length === 0
      },
      
      // Get wishlist item by ID
      getItem: (productId) => {
        return get().items.find(item => item.id === productId)
      },
      
      // Get items by category
      getByCategory: (category) => {
        if (category === 'all') return get().items
        return get().items.filter(item => item.category === category)
      },
      
      // Get items by collection
      getByCollection: (collection) => {
        return get().items.filter(item => item.collection === collection)
      },
      
      // Sort wishlist items
      getSorted: (sortBy = 'newest') => {
        const items = [...get().items]
        
        switch (sortBy) {
          case 'newest':
            return items.sort((a, b) => b.addedAt - a.addedAt)
          case 'oldest':
            return items.sort((a, b) => a.addedAt - b.addedAt)
          case 'price-high':
            return items.sort((a, b) => b.price - a.price)
          case 'price-low':
            return items.sort((a, b) => a.price - b.price)
          case 'name-asc':
            return items.sort((a, b) => a.name.localeCompare(b.name))
          case 'name-desc':
            return items.sort((a, b) => b.name.localeCompare(a.name))
          default:
            return items
        }
      },
      
      // Get most expensive item
      getMostExpensive: () => {
        const items = get().items
        if (items.length === 0) return null
        return items.reduce((max, item) => 
          item.price > max.price ? item : max
        )
      },
      
      // Get least expensive item
      getLeastExpensive: () => {
        const items = get().items
        if (items.length === 0) return null
        return items.reduce((min, item) => 
          item.price < min.price ? item : min
        )
      },
      
      // Get average price
      getAveragePrice: () => {
        const items = get().items
        if (items.length === 0) return 0
        const total = items.reduce((sum, item) => sum + item.price, 0)
        return total / items.length
      },
      
      // ─────────────────────────────────────────
      // SHARE WISHLIST
      // Generate shareable URL/data
      // ─────────────────────────────────────────
      generateShareableList: () => {
        const items = get().items
        const itemIds = items.map(item => item.id)
        const encoded = btoa(JSON.stringify(itemIds))
        
        return {
          url: `${window.location.origin}/wishlist?shared=${encoded}`,
          items: itemIds,
          count: items.length,
          shareText: `Check out my MAISON wishlist — ${items.length} curated pieces`,
        }
      },
      
      // ─────────────────────────────────────────
      // COPY SHARE LINK TO CLIPBOARD
      // ─────────────────────────────────────────
      copyShareLink: async () => {
        try {
          const { url } = get().generateShareableList()
          await navigator.clipboard.writeText(url)
          return {
            success: true,
            message: 'Link copied to clipboard',
          }
        } catch (error) {
          return {
            success: false,
            message: 'Failed to copy link',
          }
        }
      },
      
      // ─────────────────────────────────────────
      // IMPORT SHARED WISHLIST
      // Decode and add items from shared URL
      // ─────────────────────────────────────────
      importSharedWishlist: (encodedString, allProducts) => {
        try {
          const itemIds = JSON.parse(atob(encodedString))
          const productsToAdd = allProducts.filter(p => 
            itemIds.includes(p.id) && 
            !get().items.some(item => item.id === p.id)
          )
          
          productsToAdd.forEach(product => {
            get().addItem(product)
          })
          
          return {
            success: true,
            added: productsToAdd.length,
            message: `Added ${productsToAdd.length} items from shared wishlist`,
          }
        } catch (error) {
          return {
            success: false,
            added: 0,
            message: 'Invalid shared wishlist',
          }
        }
      },
    }),
    
    // ═══════════════════════════════════════
    // PERSISTENCE CONFIGURATION
    // ═══════════════════════════════════════
    {
      name: 'maison-wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        recentlyAdded: state.recentlyAdded,
      }),
      version: 1,
    }
  )
)

export default useWishlistStore

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════
export {
  MAX_WISHLIST_ITEMS,
  RECENT_ITEMS_LIMIT,
}