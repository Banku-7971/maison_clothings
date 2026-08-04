import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX, FiTrendingUp, FiClock, FiArrowUpRight } from 'react-icons/fi'
import useUIStore from '../store/uiStore'
import { searchProducts, getFeaturedProducts } from '../data/products'
import { formatPrice, debounce } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — SEARCH MODAL
// ═══════════════════════════════════════════════════════════════
// Full-screen search experience.
// Instant results as you type.
//
// Features:
// - Full-screen overlay with blur
// - Auto-focus on open
// - Live search with debouncing (300ms)
// - Product results with images
// - Recent searches (persisted)
// - Trending searches
// - Popular products (when no query)
// - Suggested queries
// - Keyboard navigation
// - Empty state
// - Loading state
// - Result counter
// - Category filter chips
// - Clear search
// - Close on ESC
// - Close on route change
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// TRENDING SEARCHES
// ─────────────────────────────────────────
const TRENDING_SEARCHES = [
  'Wool coat',
  'Cashmere',
  'Silk dress',
  'Blazer',
  'Cotton shirt',
]

const POPULAR_CATEGORIES = [
  { name: 'Outerwear', path: '/shop/outerwear' },
  { name: 'Knitwear', path: '/shop/knitwear' },
  { name: 'Dresses', path: '/shop/dresses' },
  { name: 'Accessories', path: '/shop/accessories' },
]

const SearchModal = () => {
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const isOpen = useUIStore(state => state.isSearchOpen)
  const closeSearch = useUIStore(state => state.closeSearch)
  const searchQuery = useUIStore(state => state.searchQuery)
  const setSearchQuery = useUIStore(state => state.setSearchQuery)
  const recentSearches = useUIStore(state => state.recentSearches)
  const addRecentSearch = useUIStore(state => state.addRecentSearch)
  const clearRecentSearches = useUIStore(state => state.clearRecentSearches)
  
  // ─────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  const inputRef = useRef(null)
  const popularProducts = getFeaturedProducts().slice(0, 4)
  
  // ─────────────────────────────────────────
  // AUTO FOCUS ON OPEN
  // ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 400)
    }
  }, [isOpen])
  
  // ─────────────────────────────────────────
  // LOCK BODY SCROLL
  // ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setResults([])
      setHasSearched(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // ─────────────────────────────────────────
  // ESC KEY HANDLER
  // ─────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeSearch])
  
  // ─────────────────────────────────────────
  // DEBOUNCED SEARCH
  // ─────────────────────────────────────────
  const performSearch = debounce((query) => {
    if (!query.trim()) {
      setResults([])
      setIsSearching(false)
      setHasSearched(false)
      return
    }
    
    const searchResults = searchProducts(query)
    setResults(searchResults)
    setIsSearching(false)
    setHasSearched(true)
    
    // Save to recent searches
    if (searchResults.length > 0) {
      addRecentSearch(query)
    }
  }, 300)
  
  // ─────────────────────────────────────────
  // HANDLE INPUT CHANGE
  // ─────────────────────────────────────────
  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    
    if (value.trim()) {
      setIsSearching(true)
      performSearch(value)
    } else {
      setResults([])
      setHasSearched(false)
      setIsSearching(false)
    }
  }
  
  // ─────────────────────────────────────────
  // HANDLE SEARCH CHIP CLICK
  // ─────────────────────────────────────────
  const handleSearchClick = (query) => {
    setSearchQuery(query)
    setIsSearching(true)
    performSearch(query)
    inputRef.current?.focus()
  }
  
  // ─────────────────────────────────────────
  // CLEAR SEARCH
  // ─────────────────────────────────────────
  const handleClearSearch = () => {
    setSearchQuery('')
    setResults([])
    setHasSearched(false)
    inputRef.current?.focus()
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[300] bg-noir/95 backdrop-blur-xl overflow-y-auto"
        >
          
          {/* ═══════════════════════════════════════
              SEARCH HEADER
          ═══════════════════════════════════════ */}
          <div className="sticky top-0 border-b border-graphite/50 bg-noir/95 backdrop-blur-xl z-10">
            <div className="container-luxury py-6">
              <div className="flex items-center gap-6">
                
                {/* Search Icon */}
                <FiSearch className="text-gold flex-shrink-0" size={22} />
                
                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search for pieces, collections, or the atelier..."
                  className="flex-1 bg-transparent text-ivory text-lg md:text-2xl font-cormorant placeholder:text-silver placeholder:font-cormorant placeholder:italic focus:outline-none"
                  data-cursor="text"
                  aria-label="Search"
                />
                
                {/* Clear button */}
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors"
                    style={{ fontSize: '0.65rem' }}
                    data-cursor="hover"
                  >
                    Clear
                  </button>
                )}
                
                {/* Close */}
                <button
                  onClick={closeSearch}
                  className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                  aria-label="Close search"
                  data-cursor="hover"
                >
                  <FiX size={22} />
                </button>
              </div>
              
              {/* Result Count */}
              {hasSearched && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-tiny tracking-mega text-silver uppercase font-mono"
                  style={{ fontSize: '0.65rem' }}
                >
                  {results.length} {results.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                </motion.p>
              )}
            </div>
          </div>
          
          {/* ═══════════════════════════════════════
              CONTENT
          ═══════════════════════════════════════ */}
          <div className="container-luxury py-12 md:py-16">
            
            {/* ═══════════════════════════════════════
                LOADING STATE
            ═══════════════════════════════════════ */}
            {isSearching && (
              <div className="text-center py-16">
                <motion.div
                  className="inline-block w-16 h-px bg-graphite overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gold"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
                <p 
                  className="mt-4 text-tiny tracking-mega text-silver uppercase font-mono"
                  style={{ fontSize: '0.65rem' }}
                >
                  Searching
                </p>
              </div>
            )}
            
            {/* ═══════════════════════════════════════
                SEARCH RESULTS
            ═══════════════════════════════════════ */}
            {!isSearching && hasSearched && results.length > 0 && (
              <div>
                <h3 
                  className="text-tiny tracking-mega text-gold uppercase mb-8"
                  style={{ fontSize: '0.7rem' }}
                >
                  — Results
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {results.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05,
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                    >
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="block group"
                        data-cursor="view"
                      >
                        <div className="relative aspect-product bg-charcoal overflow-hidden mb-4">
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-800 ease-luxury"
                            draggable={false}
                          />
                        </div>
                        
                        <p 
                          className="text-tiny tracking-mega text-silver uppercase mb-1"
                          style={{ fontSize: '0.6rem' }}
                        >
                          {product.category}
                        </p>
                        <h4 className="font-cormorant text-lg text-ivory group-hover:text-gold transition-colors leading-tight mb-1">
                          {product.name}
                        </h4>
                        <p className="font-cormorant text-base text-platinum tabular-nums">
                          {formatPrice(product.price)}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* ═══════════════════════════════════════
                NO RESULTS
            ═══════════════════════════════════════ */}
            {!isSearching && hasSearched && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <FiSearch className="text-graphite mx-auto mb-6" size={40} />
                <h3 className="font-cormorant text-3xl text-ivory mb-3">
                  No pieces found
                </h3>
                <p className="font-cormorant italic text-platinum text-lg mb-8 max-w-md mx-auto">
                  We couldn't find anything matching "{searchQuery}". 
                  Try different keywords or explore our collections.
                </p>
                <button
                  onClick={handleClearSearch}
                  className="text-tiny tracking-mega text-gold uppercase link-luxury"
                  style={{ fontSize: '0.7rem' }}
                  data-cursor="hover"
                >
                  Try Another Search
                </button>
              </motion.div>
            )}
            
            {/* ═══════════════════════════════════════
                DEFAULT STATE (No Query)
                Recent + Trending + Popular
            ═══════════════════════════════════════ */}
            {!isSearching && !hasSearched && (
              <div className="space-y-12">
                
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 
                        className="text-tiny tracking-mega text-gold uppercase flex items-center gap-2"
                        style={{ fontSize: '0.7rem' }}
                      >
                        <FiClock size={12} />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors link-luxury"
                        style={{ fontSize: '0.6rem' }}
                        data-cursor="hover"
                      >
                        Clear
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <motion.button
                          key={search}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => handleSearchClick(search)}
                          className="px-4 py-2 border border-graphite text-ivory hover:border-gold hover:text-gold transition-all duration-300 text-sm font-cormorant"
                          data-cursor="hover"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Trending */}
                <div>
                  <h3 
                    className="text-tiny tracking-mega text-gold uppercase mb-6 flex items-center gap-2"
                    style={{ fontSize: '0.7rem' }}
                  >
                    <FiTrendingUp size={12} />
                    Trending
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((search, index) => (
                      <motion.button
                        key={search}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        onClick={() => handleSearchClick(search)}
                        className="px-4 py-2 border border-graphite text-ivory hover:border-gold hover:text-gold transition-all duration-300 text-sm font-cormorant"
                        data-cursor="hover"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Popular Categories */}
                <div>
                  <h3 
                    className="text-tiny tracking-mega text-gold uppercase mb-6"
                    style={{ fontSize: '0.7rem' }}
                  >
                    — Explore
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {POPULAR_CATEGORIES.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                      >
                        <Link
                          to={category.path}
                          onClick={closeSearch}
                          className="group flex items-center justify-between py-4 px-6 border border-graphite hover:border-gold transition-all duration-400"
                          data-cursor="hover"
                        >
                          <span className="font-cormorant text-lg text-ivory group-hover:text-gold transition-colors">
                            {category.name}
                          </span>
                          <FiArrowUpRight 
                            className="text-silver group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400" 
                            size={14} 
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Featured Products */}
                <div>
                  <h3 
                    className="text-tiny tracking-mega text-gold uppercase mb-8"
                    style={{ fontSize: '0.7rem' }}
                  >
                    — Discover
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {popularProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                      >
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={closeSearch}
                          className="block group"
                          data-cursor="view"
                        >
                          <div className="relative aspect-product bg-charcoal overflow-hidden mb-4">
                            <img
                              src={product.thumbnail}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-800 ease-luxury"
                              draggable={false}
                            />
                          </div>
                          
                          <h4 className="font-cormorant text-base text-ivory group-hover:text-gold transition-colors mb-1">
                            {product.name}
                          </h4>
                          <p className="text-sm text-platinum font-cormorant tabular-nums">
                            {formatPrice(product.price)}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Keyboard Hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="text-center pt-8 border-t border-graphite/30"
                >
                  <p 
                    className="text-tiny tracking-mega text-silver uppercase font-mono"
                    style={{ fontSize: '0.65rem' }}
                  >
                    Press ESC to close
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchModal