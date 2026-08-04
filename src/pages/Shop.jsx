import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import QuickView from '../components/QuickView'
import Newsletter from '../components/Newsletter'
import useUIStore from '../store/uiStore'
import { 
  products, 
  categories, 
  getProductsByCategory,
  sortProducts 
} from '../data/products'
import { formatNumber } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — SHOP PAGE
// ═══════════════════════════════════════════════════════════════
// The heart of commerce. Every product discoverable.
// Advanced filtering, sorting, and viewing options.
//
// Features:
// - Category-based routing (/shop, /shop/:category)
// - Sidebar filters (desktop) + drawer (mobile)
// - Grid/list view toggle
// - Sort options
// - Active filter chips
// - Product count display
// - Empty state
// - Editorial header with category info
// - Staggered product reveal
// - Load more pagination (or infinite scroll)
// - Newsletter footer section
// ═══════════════════════════════════════════════════════════════

const Shop = () => {
  const { category: categoryParam } = useParams()
  
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const activeFilters = useUIStore(state => state.activeFilters)
  const openFilters = useUIStore(state => state.openFilters)
  const setFilter = useUIStore(state => state.setFilter)
  const toggleFilterValue = useUIStore(state => state.toggleFilterValue)
  const resetFilters = useUIStore(state => state.resetFilters)
  const getActiveFilterCount = useUIStore(state => state.getActiveFilterCount)
  
  // ─────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────
  const [viewMode, setViewMode] = useState('grid')  // 'grid' | 'list'
  const [itemsToShow, setItemsToShow] = useState(12)
  
  // ─────────────────────────────────────────
  // DOCUMENT TITLE
  // ─────────────────────────────────────────
  useEffect(() => {
    const catName = categoryParam 
      ? categories.find(c => c.slug === categoryParam)?.name || 'Shop'
      : 'Shop'
    document.title = `${catName} — MAISON`
    
    return () => {
      document.title = 'MAISON'
    }
  }, [categoryParam])
  
  // ─────────────────────────────────────────
  // AUTO-APPLY CATEGORY FROM URL
  // ─────────────────────────────────────────
  useEffect(() => {
    if (categoryParam && categoryParam !== 'all') {
      const category = categories.find(c => c.slug === categoryParam)
      if (category && !activeFilters.categories.includes(category.id)) {
        setFilter('categories', [category.id])
      }
    }
  }, [categoryParam])
  
  // ─────────────────────────────────────────
  // GET CURRENT CATEGORY DATA
  // ─────────────────────────────────────────
  const currentCategory = categoryParam 
    ? categories.find(c => c.slug === categoryParam) 
    : null
  
  // ─────────────────────────────────────────
  // FILTER + SORT PRODUCTS
  // ─────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    
    // Filter by category param
    if (categoryParam && categoryParam !== 'all') {
      filtered = filtered.filter(p => p.category === categoryParam)
    }
    
    // Filter by active categories
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(p => 
        activeFilters.categories.includes(p.category)
      )
    }
    
    // Filter by collections
    if (activeFilters.collections.length > 0) {
      filtered = filtered.filter(p => 
        activeFilters.collections.includes(p.collection)
      )
    }
    
    // Filter by colors
    if (activeFilters.colors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors?.some(c => activeFilters.colors.includes(c.name))
      )
    }
    
    // Filter by sizes
    if (activeFilters.sizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes?.some(s => 
          activeFilters.sizes.includes(s.size) && s.available
        )
      )
    }
    
    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= activeFilters.priceRange[0] && 
      p.price <= activeFilters.priceRange[1]
    )
    
    // Filter by tags
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter(p => 
        p.tags?.some(t => activeFilters.tags.includes(t))
      )
    }
    
    // Filter in stock only
    if (activeFilters.inStock) {
      filtered = filtered.filter(p => 
        p.sizes?.some(s => s.available)
      )
    }
    
    // Filter on sale
    if (activeFilters.onSale) {
      filtered = filtered.filter(p => 
        p.originalPrice && p.originalPrice > p.price
      )
    }
    
    // Sort
    filtered = sortProducts(filtered, activeFilters.sortBy)
    
    return filtered
  }, [categoryParam, activeFilters])
  
  const displayedProducts = filteredProducts.slice(0, itemsToShow)
  const hasMore = filteredProducts.length > itemsToShow
  const activeFilterCount = getActiveFilterCount()
  
  const loadMore = () => {
    setItemsToShow(prev => prev + 12)
  }
  
  return (
    <div className="bg-noir min-h-screen">
      
      {/* ═══════════════════════════════════════
          EDITORIAL HEADER
      ═══════════════════════════════════════ */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 border-b border-graphite/30">
        <div className="container-luxury">
          
          {/* Breadcrumb / Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <p 
              className="text-tiny tracking-mega text-gold uppercase"
              style={{ fontSize: '0.7rem' }}
            >
              — The Selection
              {currentCategory && ` / ${currentCategory.name}`}
            </p>
          </motion.div>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorant font-light text-ivory mb-4"
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            {currentCategory ? (
              <>
                {currentCategory.name.split(' ')[0]}
                {currentCategory.name.split(' ').length > 1 && (
                  <> <em className="italic text-gold">{currentCategory.name.split(' ').slice(1).join(' ')}</em></>
                )}
              </>
            ) : (
              <>
                The <em className="italic text-gold">Atelier</em>
              </>
            )}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-cormorant italic text-platinum text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Every piece meticulously crafted. Every material sourced with intention. 
            Discover the complete MAISON world.
          </motion.p>
          
          {/* Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-tiny tracking-mega text-silver uppercase font-mono"
            style={{ fontSize: '0.7rem' }}
          >
            {formatNumber(filteredProducts.length)} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
          </motion.p>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          ACTIVE FILTERS BAR
      ═══════════════════════════════════════ */}
      {activeFilterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b border-graphite/30 bg-charcoal/30"
        >
          <div className="container-luxury py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span 
                className="text-tiny tracking-mega text-silver uppercase mr-3"
                style={{ fontSize: '0.65rem' }}
              >
                Filters:
              </span>
              
              {/* Category chips */}
              {activeFilters.categories.map(catId => {
                const cat = categories.find(c => c.id === catId)
                return cat && (
                  <button
                    key={catId}
                    onClick={() => toggleFilterValue('categories', catId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 border border-gold text-gold text-tiny uppercase tracking-mega hover:bg-gold hover:text-noir transition-all duration-300"
                    style={{ fontSize: '0.6rem' }}
                    data-cursor="hover"
                  >
                    {cat.name}
                    <FiX size={10} />
                  </button>
                )
              })}
              
              {/* Color chips */}
              {activeFilters.colors.map(color => (
                <button
                  key={color}
                  onClick={() => toggleFilterValue('colors', color)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 border border-gold text-gold text-tiny uppercase tracking-mega hover:bg-gold hover:text-noir transition-all duration-300"
                  style={{ fontSize: '0.6rem' }}
                  data-cursor="hover"
                >
                  {color}
                  <FiX size={10} />
                </button>
              ))}
              
              {/* Size chips */}
              {activeFilters.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleFilterValue('sizes', size)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 border border-gold text-gold text-tiny uppercase tracking-mega hover:bg-gold hover:text-noir transition-all duration-300"
                  style={{ fontSize: '0.6rem' }}
                  data-cursor="hover"
                >
                  Size {size}
                  <FiX size={10} />
                </button>
              ))}
              
              {/* Clear all */}
              <button
                onClick={resetFilters}
                className="ml-2 text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors duration-300 link-luxury"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                Clear All
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* ═══════════════════════════════════════
                FILTERS SIDEBAR
            ═══════════════════════════════════════ */}
            <ProductFilters />
            
            {/* ═══════════════════════════════════════
                PRODUCTS AREA
            ═══════════════════════════════════════ */}
            <div className="flex-1 min-w-0">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-graphite/30">
                
                {/* Left: Mobile filter trigger + count */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={openFilters}
                    className="lg:hidden flex items-center gap-2 py-2 px-4 border border-graphite hover:border-gold text-ivory hover:text-gold transition-all duration-400"
                    data-cursor="hover"
                  >
                    <FiFilter size={14} />
                    <span 
                      className="text-tiny tracking-mega uppercase"
                      style={{ fontSize: '0.65rem' }}
                    >
                      Filter
                    </span>
                    {activeFilterCount > 0 && (
                      <span className="text-tiny text-gold" style={{ fontSize: '0.6rem' }}>
                        ({activeFilterCount})
                      </span>
                    )}
                  </button>
                  
                  <span 
                    className="text-tiny tracking-mega text-silver uppercase font-mono hidden md:block"
                    style={{ fontSize: '0.65rem' }}
                  >
                    Showing {String(displayedProducts.length).padStart(2, '0')} of {String(filteredProducts.length).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Right: View toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`w-9 h-9 flex items-center justify-center border transition-all duration-400 ${
                      viewMode === 'grid'
                        ? 'border-gold text-gold'
                        : 'border-graphite text-silver hover:text-ivory hover:border-ivory'
                    }`}
                    aria-label="Grid view"
                    data-cursor="hover"
                  >
                    <FiGrid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`w-9 h-9 flex items-center justify-center border transition-all duration-400 ${
                      viewMode === 'list'
                        ? 'border-gold text-gold'
                        : 'border-graphite text-silver hover:text-ivory hover:border-ivory'
                    }`}
                    aria-label="List view"
                    data-cursor="hover"
                  >
                    <FiList size={14} />
                  </button>
                </div>
              </div>
              
              {/* ═══════════════════════════════════════
                  PRODUCTS GRID / LIST
              ═══════════════════════════════════════ */}
              {displayedProducts.length > 0 ? (
                <>
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`grid gap-6 md:gap-8 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-2 md:grid-cols-3' 
                        : 'grid-cols-1 md:grid-cols-2'
                    }`}
                  >
                    {displayedProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        showQuickAdd={true}
                        showWishlist={true}
                        showQuickView={true}
                        showColors={true}
                      />
                    ))}
                  </motion.div>
                  
                  {/* Load More */}
                  {hasMore && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mt-16"
                    >
                      <button
                        onClick={loadMore}
                        className="group relative inline-block"
                        data-cursor="hover"
                      >
                        <span 
                          className="relative overflow-hidden inline-block py-4 px-12 border border-ivory text-ivory text-tiny tracking-mega uppercase transition-colors duration-500 group-hover:text-noir"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Load More
                          <motion.span 
                            className="absolute inset-0 bg-ivory -z-10"
                            initial={{ y: '100%' }}
                            whileHover={{ y: '0%' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </span>
                      </button>
                      <p 
                        className="mt-4 text-tiny text-silver font-mono uppercase tracking-mega"
                        style={{ fontSize: '0.65rem' }}
                      >
                        {filteredProducts.length - itemsToShow} more pieces
                      </p>
                    </motion.div>
                  )}
                </>
              ) : (
                /* ═══════════════════════════════════════
                    EMPTY STATE
                ═══════════════════════════════════════ */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24"
                >
                  <div className="mb-8">
                    <div className="w-24 h-24 mx-auto rounded-full border border-graphite flex items-center justify-center">
                      <FiFilter className="text-silver" size={32} />
                    </div>
                  </div>
                  
                  <h3 className="font-cormorant text-3xl md:text-4xl text-ivory mb-4">
                    No pieces match
                  </h3>
                  <p className="font-cormorant italic text-platinum text-lg mb-8 max-w-md mx-auto">
                    Your current selection has no matches. 
                    Try adjusting your filters to discover more.
                  </p>
                  
                  <button
                    onClick={resetFilters}
                    className="text-tiny tracking-mega text-gold uppercase link-luxury"
                    style={{ fontSize: '0.75rem' }}
                    data-cursor="hover"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════ */}
      <Newsletter variant="default" />
      
      {/* Quick View Modal (renders when triggered) */}
      <QuickView />
    </div>
  )
}

export default Shop