import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiInfo } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — SIZE SELECTOR + SIZE GUIDE
// ═══════════════════════════════════════════════════════════════
// Elegant size selection with integrated size guide modal.
// Reusable across product pages, quick view, and cart.
//
// Features:
// - Grid layout for size chips
// - Disabled state for unavailable sizes
// - Selected state highlight
// - Stock indicator (few left, sold out)
// - Size guide button
// - Full size guide modal with measurements
// - Metric/Imperial toggle
// - Multiple size chart types (Tops, Bottoms, Outerwear)
// - Selected size display
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// SIZE CHARTS DATA
// ─────────────────────────────────────────
const SIZE_CHARTS = {
  tops: {
    title: 'Tops & Outerwear',
    metric: [
      { size: 'XS', chest: 84, waist: 68, hip: 90, shoulder: 40 },
      { size: 'S', chest: 88, waist: 72, hip: 94, shoulder: 41.5 },
      { size: 'M', chest: 92, waist: 76, hip: 98, shoulder: 43 },
      { size: 'L', chest: 98, waist: 82, hip: 104, shoulder: 45 },
      { size: 'XL', chest: 104, waist: 88, hip: 110, shoulder: 47 },
      { size: 'XXL', chest: 110, waist: 94, hip: 116, shoulder: 49 },
    ],
    imperial: [
      { size: 'XS', chest: 33, waist: 26.5, hip: 35.5, shoulder: 15.75 },
      { size: 'S', chest: 34.5, waist: 28.5, hip: 37, shoulder: 16.25 },
      { size: 'M', chest: 36.25, waist: 30, hip: 38.5, shoulder: 17 },
      { size: 'L', chest: 38.5, waist: 32.25, hip: 41, shoulder: 17.75 },
      { size: 'XL', chest: 41, waist: 34.75, hip: 43.25, shoulder: 18.5 },
      { size: 'XXL', chest: 43.25, waist: 37, hip: 45.75, shoulder: 19.25 },
    ],
    columns: ['Size', 'Chest', 'Waist', 'Hip', 'Shoulder'],
  },
  bottoms: {
    title: 'Bottoms',
    metric: [
      { size: 'XS', waist: 68, hip: 90, thigh: 54, inseam: 78 },
      { size: 'S', waist: 72, hip: 94, thigh: 56, inseam: 79 },
      { size: 'M', waist: 76, hip: 98, thigh: 58, inseam: 80 },
      { size: 'L', waist: 82, hip: 104, thigh: 61, inseam: 81 },
      { size: 'XL', waist: 88, hip: 110, thigh: 64, inseam: 82 },
      { size: 'XXL', waist: 94, hip: 116, thigh: 67, inseam: 83 },
    ],
    imperial: [
      { size: 'XS', waist: 26.5, hip: 35.5, thigh: 21.25, inseam: 30.75 },
      { size: 'S', waist: 28.5, hip: 37, thigh: 22, inseam: 31 },
      { size: 'M', waist: 30, hip: 38.5, thigh: 22.75, inseam: 31.5 },
      { size: 'L', waist: 32.25, hip: 41, thigh: 24, inseam: 32 },
      { size: 'XL', waist: 34.75, hip: 43.25, thigh: 25.25, inseam: 32.25 },
      { size: 'XXL', waist: 37, hip: 45.75, thigh: 26.5, inseam: 32.75 },
    ],
    columns: ['Size', 'Waist', 'Hip', 'Thigh', 'Inseam'],
  },
}


// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const SizeSelector = ({ 
  sizes = [],
  selectedSize = null,
  onSelectSize = () => {},
  category = 'tops',       // 'tops' | 'bottoms'
  showSizeGuide = true,
  layout = 'grid',         // 'grid' | 'inline'
  showLabel = true,
}) => {
  
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [unit, setUnit] = useState('cm')  // 'cm' | 'in'
  const [activeChart, setActiveChart] = useState('tops')
  
  const chartData = SIZE_CHARTS[activeChart]
  const currentData = unit === 'cm' ? chartData.metric : chartData.imperial
  
  return (
    <>
      {/* ═══════════════════════════════════════
          SIZE SELECTOR
      ═══════════════════════════════════════ */}
      <div>
        
        {/* Label & Size Guide Link */}
        {showLabel && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <p 
                className="text-tiny tracking-mega text-ivory uppercase"
                style={{ fontSize: '0.7rem' }}
              >
                Size
              </p>
              {selectedSize && (
                <p 
                  className="text-tiny text-gold font-cormorant italic"
                  style={{ fontSize: '0.8rem' }}
                >
                  — {selectedSize.size}
                </p>
              )}
            </div>
            
            {showSizeGuide && (
              <button
                onClick={() => setIsGuideOpen(true)}
                className="inline-flex items-center gap-1.5 text-tiny tracking-mega text-gold uppercase link-luxury group"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                <FiInfo size={12} />
                <span>Size Guide</span>
              </button>
            )}
          </div>
        )}
        
        {/* Size Chips */}
        <div className={`
          ${layout === 'grid' 
            ? 'grid grid-cols-4 md:grid-cols-6 gap-2' 
            : 'flex flex-wrap gap-2'
          }
        `}>
          {sizes.map((size) => {
            const isSelected = selectedSize?.size === size.size
            const isAvailable = size.available
            const isLowStock = isAvailable && size.stock <= 3
            
            return (
              <div key={size.size} className="relative">
                <button
                  onClick={() => isAvailable && onSelectSize(size)}
                  disabled={!isAvailable}
                  className={`
                    relative w-full py-3 px-3 border text-xs font-medium tracking-wider uppercase
                    transition-all duration-300
                    ${isSelected
                      ? 'border-gold text-gold bg-gold/10' 
                      : isAvailable
                      ? 'border-graphite text-platinum hover:border-ivory hover:text-ivory'
                      : 'border-graphite/30 text-silver/40 line-through cursor-not-allowed'
                    }
                  `}
                  data-cursor={isAvailable ? 'hover' : 'default'}
                  aria-label={`Select size ${size.size}`}
                >
                  {size.size}
                </button>
                
                {/* Low Stock Indicator */}
                {isLowStock && (
                  <span 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold animate-pulse"
                    title={`Only ${size.stock} left`}
                  />
                )}
              </div>
            )
          })}
        </div>
        
        {/* Stock Info */}
        {selectedSize && selectedSize.stock <= 3 && selectedSize.available && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-tiny text-gold font-cormorant italic"
            style={{ fontSize: '0.75rem' }}
          >
            Only {selectedSize.stock} left in this size
          </motion.p>
        )}
      </div>
      
      {/* ═══════════════════════════════════════
          SIZE GUIDE MODAL
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {isGuideOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGuideOpen(false)}
              className="fixed inset-0 bg-noir/85 backdrop-blur-md z-[290]"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-[300] flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full max-w-4xl max-h-[90vh] bg-charcoal border border-graphite pointer-events-auto overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-graphite/50">
                  <div>
                    <p 
                      className="text-tiny tracking-mega text-gold uppercase mb-2"
                      style={{ fontSize: '0.7rem' }}
                    >
                      — MAISON Reference
                    </p>
                    <h2 className="font-cormorant text-3xl md:text-4xl text-ivory">
                      Size Guide
                    </h2>
                  </div>
                  
                  <button
                    onClick={() => setIsGuideOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                    aria-label="Close size guide"
                    data-cursor="hover"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  
                  {/* Chart Type Tabs */}
                  <div className="flex items-center gap-4 mb-6 border-b border-graphite/30 pb-4">
                    {Object.keys(SIZE_CHARTS).map((chartKey) => (
                      <button
                        key={chartKey}
                        onClick={() => setActiveChart(chartKey)}
                        className={`
                          text-tiny tracking-mega uppercase pb-2 transition-colors duration-400 relative
                          ${activeChart === chartKey ? 'text-gold' : 'text-silver hover:text-ivory'}
                        `}
                        style={{ fontSize: '0.75rem' }}
                        data-cursor="hover"
                      >
                        {SIZE_CHARTS[chartKey].title}
                        {activeChart === chartKey && (
                          <motion.span
                            layoutId="sizeGuideTab"
                            className="absolute bottom-[-17px] left-0 right-0 h-px bg-gold"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Unit Toggle */}
                  <div className="flex items-center justify-end gap-1 mb-6">
                    <button
                      onClick={() => setUnit('cm')}
                      className={`
                        px-3 py-1.5 text-tiny tracking-mega uppercase transition-all duration-300
                        ${unit === 'cm' 
                          ? 'bg-gold text-noir' 
                          : 'text-silver hover:text-ivory'
                        }
                      `}
                      style={{ fontSize: '0.65rem' }}
                      data-cursor="hover"
                    >
                      CM
                    </button>
                    <button
                      onClick={() => setUnit('in')}
                      className={`
                        px-3 py-1.5 text-tiny tracking-mega uppercase transition-all duration-300
                        ${unit === 'in' 
                          ? 'bg-gold text-noir' 
                          : 'text-silver hover:text-ivory'
                        }
                      `}
                      style={{ fontSize: '0.65rem' }}
                      data-cursor="hover"
                    >
                      Inches
                    </button>
                  </div>
                  
                  {/* Size Chart Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-graphite/50">
                          {chartData.columns.map((col) => (
                            <th 
                              key={col}
                              className="text-tiny tracking-mega text-gold uppercase text-left py-3 px-4 font-medium"
                              style={{ fontSize: '0.65rem' }}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((row, index) => (
                          <motion.tr
                            key={row.size}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="border-b border-graphite/20 hover:bg-noir/40 transition-colors"
                          >
                            {Object.entries(row).map(([key, value]) => (
                              <td 
                                key={key}
                                className="py-4 px-4 text-sm text-platinum font-cormorant"
                              >
                                {key === 'size' ? (
                                  <span className="font-medium text-ivory tracking-wider uppercase text-xs">
                                    {value}
                                  </span>
                                ) : (
                                  <span className="tabular-nums">
                                    {value} {unit === 'cm' ? 'cm' : 'in'}
                                  </span>
                                )}
                              </td>
                            ))}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* How to Measure Section */}
                  <div className="mt-12 pt-8 border-t border-graphite/30">
                    <h3 className="font-cormorant text-2xl text-ivory mb-6">
                      How to <em className="italic text-gold">measure</em>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { 
                          label: 'Chest', 
                          instruction: 'Measure around the fullest part of your chest, keeping the tape horizontal.' 
                        },
                        { 
                          label: 'Waist', 
                          instruction: 'Measure around the narrowest part of your natural waistline.' 
                        },
                        { 
                          label: 'Hip', 
                          instruction: 'Stand with feet together and measure around the fullest part of your hips.' 
                        },
                        { 
                          label: 'Shoulder', 
                          instruction: 'Measure from shoulder tip to shoulder tip across the back.' 
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-10 h-10 flex items-center justify-center border border-gold text-gold text-xs font-mono flex-shrink-0">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <p 
                              className="text-tiny tracking-mega text-ivory uppercase mb-1"
                              style={{ fontSize: '0.7rem' }}
                            >
                              {item.label}
                            </p>
                            <p className="text-sm text-platinum font-cormorant italic leading-relaxed">
                              {item.instruction}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Note */}
                  <div className="mt-12 pt-8 border-t border-graphite/30">
                    <p className="text-sm text-silver font-cormorant italic leading-relaxed">
                      All measurements are approximate. Fit may vary slightly between pieces 
                      due to fabric and construction. For personalized guidance, please 
                      contact our client care team.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default SizeSelector