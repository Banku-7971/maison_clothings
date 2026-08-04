import { create } from 'zustand'

// ═══════════════════════════════════════════════════════════════
// MAISON — GLOBAL UI STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════
// Controls all UI elements that need global access:
// - Navigation menu (mobile & mega menu)
// - Search modal
// - Cart drawer
// - Quick view modal
// - Size guide modal
// - Toast notifications
// - Custom cursor states
// - Scroll direction detection
// - Theme mode
// - Loading states
// ═══════════════════════════════════════════════════════════════

const useUIStore = create((set, get) => ({
  
  // ═══════════════════════════════════════
  // NAVIGATION STATE
  // ═══════════════════════════════════════
  isMobileMenuOpen: false,
  isMegaMenuOpen: false,
  activeMegaMenu: null, // 'shop' | 'collections' | 'about' | null
  
  openMobileMenu: () => set({ 
    isMobileMenuOpen: true,
    isSearchOpen: false,
    isCartOpen: false,
  }),
  
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  toggleMobileMenu: () => set(state => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen 
  })),
  
  openMegaMenu: (menuName) => set({
    isMegaMenuOpen: true,
    activeMegaMenu: menuName,
  }),
  
  closeMegaMenu: () => set({
    isMegaMenuOpen: false,
    activeMegaMenu: null,
  }),
  
  
  // ═══════════════════════════════════════
  // SEARCH MODAL
  // ═══════════════════════════════════════
  isSearchOpen: false,
  searchQuery: '',
  recentSearches: [],
  
  openSearch: () => set({
    isSearchOpen: true,
    isMobileMenuOpen: false,
    isCartOpen: false,
  }),
  
  closeSearch: () => set({
    isSearchOpen: false,
    searchQuery: '',
  }),
  
  toggleSearch: () => set(state => ({
    isSearchOpen: !state.isSearchOpen,
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addRecentSearch: (query) => {
    if (!query.trim()) return
    set(state => {
      const filtered = state.recentSearches.filter(s => s !== query)
      return {
        recentSearches: [query, ...filtered].slice(0, 5),
      }
    })
  },
  
  clearRecentSearches: () => set({ recentSearches: [] }),
  
  
  // ═══════════════════════════════════════
  // QUICK VIEW MODAL
  // Preview product without leaving current page
  // ═══════════════════════════════════════
  isQuickViewOpen: false,
  quickViewProduct: null,
  
  openQuickView: (product) => set({
    isQuickViewOpen: true,
    quickViewProduct: product,
  }),
  
  closeQuickView: () => set({
    isQuickViewOpen: false,
    quickViewProduct: null,
  }),
  
  
  // ═══════════════════════════════════════
  // SIZE GUIDE MODAL
  // ═══════════════════════════════════════
  isSizeGuideOpen: false,
  sizeGuideCategory: null,
  
  openSizeGuide: (category) => set({
    isSizeGuideOpen: true,
    sizeGuideCategory: category,
  }),
  
  closeSizeGuide: () => set({
    isSizeGuideOpen: false,
    sizeGuideCategory: null,
  }),
  
  
  // ═══════════════════════════════════════
  // NEWSLETTER MODAL
  // ═══════════════════════════════════════
  isNewsletterOpen: false,
  hasShownNewsletter: false,
  
  openNewsletter: () => set({ isNewsletterOpen: true }),
  
  closeNewsletter: () => set({
    isNewsletterOpen: false,
    hasShownNewsletter: true,
  }),
  
  markNewsletterShown: () => set({ hasShownNewsletter: true }),
  
  
  // ═══════════════════════════════════════
  // TOAST NOTIFICATIONS
  // Beautiful ephemeral messages
  // ═══════════════════════════════════════
  toasts: [],
  
  showToast: (options) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      type: options.type || 'default', // 'default' | 'success' | 'error' | 'info'
      title: options.title || '',
      message: options.message || '',
      icon: options.icon || null,
      duration: options.duration || 4000,
      action: options.action || null,
    }
    
    set(state => ({
      toasts: [...state.toasts, toast],
    }))
    
    // Auto-dismiss after duration
    if (toast.duration > 0) {
      setTimeout(() => {
        get().dismissToast(id)
      }, toast.duration)
    }
    
    return id
  },
  
  dismissToast: (id) => {
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    }))
  },
  
  dismissAllToasts: () => set({ toasts: [] }),
  
  
  // ═══════════════════════════════════════
  // CUSTOM CURSOR STATE
  // ═══════════════════════════════════════
  cursorType: 'default', // 'default' | 'hover' | 'text' | 'view' | 'drag'
  cursorText: '',
  
  setCursorType: (type, text = '') => set({
    cursorType: type,
    cursorText: text,
  }),
  
  resetCursor: () => set({
    cursorType: 'default',
    cursorText: '',
  }),
  
  
  // ═══════════════════════════════════════
  // SCROLL STATE
  // ═══════════════════════════════════════
  scrollY: 0,
  scrollDirection: 'up', // 'up' | 'down'
  isScrolled: false,
  isAtBottom: false,
  scrollProgress: 0, // 0 to 1
  
  updateScroll: (scrollY, direction, progress) => set({
    scrollY,
    scrollDirection: direction,
    isScrolled: scrollY > 50,
    scrollProgress: progress,
  }),
  
  setAtBottom: (atBottom) => set({ isAtBottom: atBottom }),
  
  
  // ═══════════════════════════════════════
  // THEME MODE (Future feature)
  // ═══════════════════════════════════════
  theme: 'dark', // 'dark' | 'light'
  
  toggleTheme: () => set(state => ({
    theme: state.theme === 'dark' ? 'light' : 'dark',
  })),
  
  setTheme: (theme) => set({ theme }),
  
  
  // ═══════════════════════════════════════
  // GLOBAL LOADING STATE
  // ═══════════════════════════════════════
  isPageLoading: false,
  loadingMessage: '',
  
  startLoading: (message = '') => set({
    isPageLoading: true,
    loadingMessage: message,
  }),
  
  stopLoading: () => set({
    isPageLoading: false,
    loadingMessage: '',
  }),
  
  
  // ═══════════════════════════════════════
  // MOUSE POSITION (For magnetic effects)
  // ═══════════════════════════════════════
  mouseX: 0,
  mouseY: 0,
  
  updateMousePosition: (x, y) => set({
    mouseX: x,
    mouseY: y,
  }),
  
  
  // ═══════════════════════════════════════
  // FILTER STATE (Shop page)
  // ═══════════════════════════════════════
  isFilterOpen: false,
  activeFilters: {
    categories: [],
    collections: [],
    colors: [],
    sizes: [],
    priceRange: [0, 15000],
    sortBy: 'featured', // 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'
    tags: [],
    inStock: false,
    onSale: false,
  },
  
  openFilters: () => set({ isFilterOpen: true }),
  closeFilters: () => set({ isFilterOpen: false }),
  toggleFilters: () => set(state => ({ isFilterOpen: !state.isFilterOpen })),
  
  setFilter: (filterName, value) => set(state => ({
    activeFilters: {
      ...state.activeFilters,
      [filterName]: value,
    },
  })),
  
  toggleFilterValue: (filterName, value) => set(state => {
    const currentValues = state.activeFilters[filterName]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    return {
      activeFilters: {
        ...state.activeFilters,
        [filterName]: newValues,
      },
    }
  }),
  
  resetFilters: () => set({
    activeFilters: {
      categories: [],
      collections: [],
      colors: [],
      sizes: [],
      priceRange: [0, 15000],
      sortBy: 'featured',
      tags: [],
      inStock: false,
      onSale: false,
    },
  }),
  
  getActiveFilterCount: () => {
    const filters = get().activeFilters
    let count = 0
    count += filters.categories.length
    count += filters.collections.length
    count += filters.colors.length
    count += filters.sizes.length
    count += filters.tags.length
    if (filters.inStock) count++
    if (filters.onSale) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 15000) count++
    return count
  },
  
  
  // ═══════════════════════════════════════
  // RECENTLY VIEWED PRODUCTS
  // ═══════════════════════════════════════
  recentlyViewed: [],
  
  addRecentlyViewed: (product) => set(state => {
    const filtered = state.recentlyViewed.filter(p => p.id !== product.id)
    return {
      recentlyViewed: [product, ...filtered].slice(0, 8),
    }
  }),
  
  clearRecentlyViewed: () => set({ recentlyViewed: [] }),
  
  
  // ═══════════════════════════════════════
  // CLOSE ALL OVERLAYS
  // Utility to close everything at once
  // ═══════════════════════════════════════
  closeAllOverlays: () => set({
    isMobileMenuOpen: false,
    isMegaMenuOpen: false,
    isSearchOpen: false,
    isQuickViewOpen: false,
    isSizeGuideOpen: false,
    isNewsletterOpen: false,
    isFilterOpen: false,
    activeMegaMenu: null,
    quickViewProduct: null,
    sizeGuideCategory: null,
  }),
  
  
  // ═══════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════
  
  // Check if any overlay is open
  isAnyOverlayOpen: () => {
    const state = get()
    return (
      state.isMobileMenuOpen ||
      state.isSearchOpen ||
      state.isQuickViewOpen ||
      state.isSizeGuideOpen ||
      state.isNewsletterOpen ||
      state.isFilterOpen
    )
  },
  
  // Get current toast count
  getToastCount: () => get().toasts.length,
  
}))

export default useUIStore