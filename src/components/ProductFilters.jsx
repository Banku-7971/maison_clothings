import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi'
import useUIStore from '../store/uiStore'
import { categories } from '../data/products'
import { collectionsData } from '../data/collections'
import { formatPrice } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — PRODUCT FILTERS
// ═══════════════════════════════════════════════════════════════
// Sophisticated filtering system for the shop.
// Desktop: Sidebar layout
// Mobile: Full-screen drawer
//
// Filter Types:
// - Categories (checkbox list)
// - Collections (checkbox list)
// - Colors (visual swatches)
// - Sizes (chip selector)
// - Price range (min/max)
// - Sort by (dropdown)
// - Tags (bestseller, new, sale, etc.)
// - Availability (in stock only)
//
// Features:
// - Expandable/collapsible sections
// - Live filter count
// - Clear all button
// - Apply button (mobile)
// - Active filter chips
// - Persistent state via store
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// FILTER OPTIONS DATA
// ─────────────────────────────────────────
const COLORS = [
  { name: 'Noir', hex: '#0A0A0A' },
  { name: 'Ivory', hex: '#F5F0EB' },
  { name: 'Charcoal', hex: '#2D2D2D' },
  { name: 'Camel', hex: '#C9A96E' },
  { name: 'Cream', hex: '#FAF7F2' },
  { name: 'Burgundy', hex: '#4A0E1F' },
  { name: 'Cognac', hex: '#8B4513' },
  { name: 'Champagne', hex: '#E7D3AF' },
  { name: 'Wine', hex: '#5C1A2B' },
  { name: 'Forest', hex: '#1A3D2E' },
  { name: 'Navy', hex: '#1A2B4A' },
  { name: 'Sage', hex: '#8A9A8B' },
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Highest Rated' },
]

const TAGS = [
  { value: 'new-arrival', label: 'New Arrivals' },
  { value: 'bestseller', label: 'Bestsellers' },
  { value: 'limited', label: 'Limited Edition' },
  { value: 'sustainable', label: 'Sustainable' },
  { value: 'featured', label: 'Featured' },
  { value: 'evening', label: 'Evening' },
  { value: 'essential', label: 'Essentials' },
]

// ─────────────────────────────────────────
// FILTER SECTION COMPONENT
// Collapsible filter category
// ─────────────────────────────────────────
const FilterSection = ({ title, count = 0, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="border-b border-graphite/30 pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-4 text-left"
        data-cursor="hover"
      >
        <div className="flex items-center gap-3">
          <h3 
            className="text-tiny tracking-mega text-ivory uppercase"
            style={{ fontSize: '0.75rem' }}
          >
            {title}
          </h3>
          {count > 0 && (
            <span 
              className="text-tiny text-gold font-mono tabular-nums"
              style={{ fontSize: '0.65rem' }}
            >
              ({count})
            </span>
          )}
        </div>
        {isOpen ? <FiChevronUp size={14} className="text-silver" /> : <FiChevronDown size={14} className="text-silver" />}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ─────────────────────────────────────────
// FILTER CONTENT COMPONENT
// Shared between desktop and mobile
// ─────────────────────────────────────────
const FilterContent = ({ onClose = null }) => {
  const activeFilters = useUIStore(state => state.activeFilters)
  const setFilter = useUIStore(state => state.setFilter)
  const toggleFilterValue = useUIStore(state => state.toggleFilterValue)
  const resetFilters = useUIStore(state => state.resetFilters)
  const getActiveFilterCount = useUIStore(state => state.getActiveFilterCount)
  
  const activeCount = getActiveFilterCount()
  
  return (
    <div className="space-y-8">
      
      {/* ═══════════════════════════════════════
          HEADER
      ═══════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="font-cormorant text-2xl md:text-3xl text-ivory"
          >
            Refine
          </h2>
          {activeCount > 0 && (
            <p 
              className="text-tiny text-gold mt-1"
              style={{ fontSize: '0.7rem' }}
            >
              {activeCount} filter{activeCount !== 1 ? 's' : ''} applied
            </p>
          )}
        </div>
        
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-tiny tracking-mega text-gold uppercase hover:text-ivory transition-colors duration-400 link-luxury"
            style={{ fontSize: '0.65rem' }}
            data-cursor="hover"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* ═══════════════════════════════════════
          SORT BY
      ═══════════════════════════════════════ */}
      <FilterSection title="Sort By" defaultOpen={true}>
        <div className="space-y-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter('sortBy', option.value)}
              className="flex items-center gap-3 w-full text-left group"
              data-cursor="hover"
            >
              <div className={`
                w-4 h-4 rounded-full border transition-all duration-300
                ${activeFilters.sortBy === option.value 
                  ? 'border-gold bg-gold' 
                  : 'border-silver/50 group-hover:border-ivory'
                }
              `}>
                {activeFilters.sortBy === option.value && (
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-noir" />
                  </div>
                )}
              </div>
              <span 
                className={`text-sm transition-colors duration-300 font-cormorant ${
                  activeFilters.sortBy === option.value ? 'text-gold' : 'text-platinum group-hover:text-ivory'
                }`}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════ */}
      <FilterSection 
        title="Category" 
        count={activeFilters.categories.length}
      >
        <div className="space-y-2">
          {categories.filter(c => c.id !== 'all').map((category) => (
            <button
              key={category.id}
              onClick={() => toggleFilterValue('categories', category.id)}
              className="flex items-center gap-3 w-full text-left group"
              data-cursor="hover"
            >
              <div className={`
                w-4 h-4 border transition-all duration-300 flex items-center justify-center
                ${activeFilters.categories.includes(category.id)
                  ? 'border-gold bg-gold' 
                  : 'border-silver/50 group-hover:border-ivory'
                }
              `}>
                {activeFilters.categories.includes(category.id) && (
                  <FiCheck size={10} className="text-noir" strokeWidth={3} />
                )}
              </div>
              <span 
                className={`text-sm transition-colors duration-300 font-cormorant ${
                  activeFilters.categories.includes(category.id) 
                    ? 'text-gold' 
                    : 'text-platinum group-hover:text-ivory'
                }`}
              >
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          COLLECTIONS
      ═══════════════════════════════════════ */}
      <FilterSection 
        title="Collection" 
        count={activeFilters.collections.length}
      >
        <div className="space-y-2">
          {collectionsData.map((collection) => (
            <button
              key={collection.id}
              onClick={() => toggleFilterValue('collections', collection.id)}
              className="flex items-center gap-3 w-full text-left group"
              data-cursor="hover"
            >
              <div className={`
                w-4 h-4 border transition-all duration-300 flex items-center justify-center
                ${activeFilters.collections.includes(collection.id)
                  ? 'border-gold bg-gold' 
                  : 'border-silver/50 group-hover:border-ivory'
                }
              `}>
                {activeFilters.collections.includes(collection.id) && (
                  <FiCheck size={10} className="text-noir" strokeWidth={3} />
                )}
              </div>
              <span 
                className={`text-sm transition-colors duration-300 font-cormorant ${
                  activeFilters.collections.includes(collection.id) 
                    ? 'text-gold' 
                    : 'text-platinum group-hover:text-ivory'
                }`}
              >
                {collection.name}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          COLORS
      ═══════════════════════════════════════ */}
      <FilterSection 
        title="Color" 
        count={activeFilters.colors.length}
      >
        <div className="grid grid-cols-6 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleFilterValue('colors', color.name)}
              className={`
                relative aspect-square rounded-full border-2 transition-all duration-300
                ${activeFilters.colors.includes(color.name)
                  ? 'border-gold scale-110' 
                  : 'border-graphite hover:border-ivory'
                }
              `}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Filter by ${color.name}`}
              data-cursor="hover"
            >
              {activeFilters.colors.includes(color.name) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiCheck 
                    size={14} 
                    className={color.hex === '#0A0A0A' || color.hex === '#2D2D2D' || color.hex === '#4A0E1F' ? 'text-ivory' : 'text-noir'}
                    strokeWidth={3}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          SIZES
      ═══════════════════════════════════════ */}
      <FilterSection 
        title="Size" 
        count={activeFilters.sizes.length}
      >
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleFilterValue('sizes', size)}
              className={`
                py-2 px-3 border text-xs font-medium tracking-wider uppercase
                transition-all duration-300
                ${activeFilters.sizes.includes(size)
                  ? 'border-gold text-gold bg-gold/10' 
                  : 'border-graphite text-platinum hover:border-ivory hover:text-ivory'
                }
              `}
              data-cursor="hover"
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          PRICE RANGE
      ═══════════════════════════════════════ */}
      <FilterSection title="Price">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label 
                className="text-tiny text-silver uppercase tracking-mega mb-2 block"
                style={{ fontSize: '0.6rem' }}
              >
                Min
              </label>
              <input
                type="number"
                value={activeFilters.priceRange[0]}
                onChange={(e) => setFilter('priceRange', [Number(e.target.value), activeFilters.priceRange[1]])}
                className="w-full bg-transparent border-b border-graphite text-ivory text-sm py-2 focus:border-gold transition-colors font-cormorant"
                min="0"
                data-cursor="text"
              />
            </div>
            <div className="text-silver">—</div>
            <div className="flex-1">
              <label 
                className="text-tiny text-silver uppercase tracking-mega mb-2 block"
                style={{ fontSize: '0.6rem' }}
              >
                Max
              </label>
              <input
                type="number"
                value={activeFilters.priceRange[1]}
                onChange={(e) => setFilter('priceRange', [activeFilters.priceRange[0], Number(e.target.value)])}
                className="w-full bg-transparent border-b border-graphite text-ivory text-sm py-2 focus:border-gold transition-colors font-cormorant"
                min="0"
                data-cursor="text"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-tiny text-silver" style={{ fontSize: '0.7rem' }}>
            <span className="font-cormorant italic">
              {formatPrice(activeFilters.priceRange[0])}
            </span>
            <span className="font-cormorant italic">
              {formatPrice(activeFilters.priceRange[1])}
            </span>
          </div>
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          TAGS
      ═══════════════════════════════════════ */}
      <FilterSection 
        title="Tags" 
        count={activeFilters.tags.length}
        defaultOpen={false}
      >
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag.value}
              onClick={() => toggleFilterValue('tags', tag.value)}
              className={`
                px-3 py-1.5 border text-tiny tracking-mega uppercase
                transition-all duration-300
                ${activeFilters.tags.includes(tag.value)
                  ? 'border-gold text-gold bg-gold/10' 
                  : 'border-graphite text-silver hover:border-ivory hover:text-ivory'
                }
              `}
              style={{ fontSize: '0.6rem' }}
              data-cursor="hover"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          AVAILABILITY
      ═══════════════════════════════════════ */}
      <FilterSection title="Availability" defaultOpen={false}>
        <div className="space-y-3">
          <button
            onClick={() => setFilter('inStock', !activeFilters.inStock)}
            className="flex items-center gap-3 w-full text-left group"
            data-cursor="hover"
          >
            <div className={`
              w-4 h-4 border transition-all duration-300 flex items-center justify-center
              ${activeFilters.inStock
                ? 'border-gold bg-gold' 
                : 'border-silver/50 group-hover:border-ivory'
              }
            `}>
              {activeFilters.inStock && (
                <FiCheck size={10} className="text-noir" strokeWidth={3} />
              )}
            </div>
            <span 
              className={`text-sm font-cormorant transition-colors ${
                activeFilters.inStock ? 'text-gold' : 'text-platinum group-hover:text-ivory'
              }`}
            >
              In Stock Only
            </span>
          </button>
          
          <button
            onClick={() => setFilter('onSale', !activeFilters.onSale)}
            className="flex items-center gap-3 w-full text-left group"
            data-cursor="hover"
          >
            <div className={`
              w-4 h-4 border transition-all duration-300 flex items-center justify-center
              ${activeFilters.onSale
                ? 'border-gold bg-gold' 
                : 'border-silver/50 group-hover:border-ivory'
              }
            `}>
              {activeFilters.onSale && (
                <FiCheck size={10} className="text-noir" strokeWidth={3} />
              )}
            </div>
            <span 
              className={`text-sm font-cormorant transition-colors ${
                activeFilters.onSale ? 'text-gold' : 'text-platinum group-hover:text-ivory'
              }`}
            >
              On Sale
            </span>
          </button>
        </div>
      </FilterSection>
      
      {/* ═══════════════════════════════════════
          MOBILE APPLY BUTTON
      ═══════════════════════════════════════ */}
      {onClose && (
        <div className="pt-6 sticky bottom-0 bg-noir">
          <button
            onClick={onClose}
            className="w-full py-4 bg-ivory text-noir text-tiny tracking-mega uppercase hover:bg-gold transition-all duration-400"
            style={{ fontSize: '0.75rem' }}
            data-cursor="hover"
          >
            View {activeCount > 0 ? `${activeCount} filter` : 'Results'}{activeCount !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════
// MAIN PRODUCT FILTERS COMPONENT
// ═══════════════════════════════════════════════════════════════
const ProductFilters = () => {
  const isFilterOpen = useUIStore(state => state.isFilterOpen)
  const openFilters = useUIStore(state => state.openFilters)
  const closeFilters = useUIStore(state => state.closeFilters)
  const getActiveFilterCount = useUIStore(state => state.getActiveFilterCount)
  
  const activeCount = getActiveFilterCount()
  
  // ─────────────────────────────────────────
  // LOCK BODY SCROLL ON MOBILE FILTER OPEN
  // ─────────────────────────────────────────
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFilterOpen])
  
  return (
    <>
      {/* ═══════════════════════════════════════
          MOBILE FILTER TRIGGER BUTTON
      ═══════════════════════════════════════ */}
      <button
        onClick={openFilters}
        className="lg:hidden flex items-center gap-2 py-3 px-6 border border-graphite hover:border-gold text-ivory hover:text-gold transition-all duration-400"
        data-cursor="hover"
      >
        <FiFilter size={14} />
        <span 
          className="text-tiny tracking-mega uppercase"
          style={{ fontSize: '0.7rem' }}
        >
          Filters
        </span>
        {activeCount > 0 && (
          <span 
            className="ml-2 min-w-[20px] h-5 px-1 flex items-center justify-center bg-gold text-noir text-tiny rounded-full"
            style={{ fontSize: '0.6rem' }}
          >
            {activeCount}
          </span>
        )}
      </button>
      
      {/* ═══════════════════════════════════════
          DESKTOP SIDEBAR
      ═══════════════════════════════════════ */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-32">
          <FilterContent />
        </div>
      </aside>
      
      {/* ═══════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFilters}
              className="lg:hidden fixed inset-0 bg-noir/70 backdrop-blur-sm z-[190]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-full max-w-sm bg-noir z-[200] flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-graphite/50 bg-noir z-10">
                <h2 className="font-cormorant text-2xl text-ivory">
                  Refine
                </h2>
                <button
                  onClick={closeFilters}
                  className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                  aria-label="Close filters"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6">
                <FilterContent onClose={closeFilters} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProductFilters