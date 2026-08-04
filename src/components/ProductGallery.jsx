import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiZoomIn, 
  FiX,
  FiMaximize2,
} from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — PRODUCT IMAGE GALLERY
// ═══════════════════════════════════════════════════════════════
// The visual heart of every product page.
// Where luxury meets interactivity.
//
// Features:
// - Multiple images with thumbnail navigation
// - Click to zoom (magnifier on hover for desktop)
// - Fullscreen lightbox mode
// - Keyboard navigation (arrow keys, ESC)
// - Swipe gestures (mobile)
// - Image counter (01/04)
// - Smooth transitions between images
// - Loading skeletons
// - Corner brackets
// - Vertical thumbnails (desktop)
// - Horizontal thumbnails (mobile)
// ═══════════════════════════════════════════════════════════════

const ProductGallery = ({ 
  images = [], 
  productName = 'Product',
  aspectRatio = 'aspect-[4/5]',
}) => {
  
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState({})
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  
  // ─────────────────────────────────────────
  // REFS
  // ─────────────────────────────────────────
  const mainImageRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  
  // ─────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────
  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
  }
  
  const goToNext = () => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
  }
  
  const goToImage = (index) => {
    setCurrentIndex(index)
  }
  
  // ─────────────────────────────────────────
  // KEYBOARD NAVIGATION
  // ─────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])
  
  // ─────────────────────────────────────────
  // TOUCH GESTURES (Mobile Swipe)
  // ─────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isSignificantSwipe = Math.abs(distance) > 50
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    
    touchStartX.current = 0
    touchEndX.current = 0
  }
  
  // ─────────────────────────────────────────
  // ZOOM ON HOVER (Desktop)
  // ─────────────────────────────────────────
  const handleMouseMove = (e) => {
    if (!mainImageRef.current || !isZoomed) return
    
    const rect = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setZoomPosition({ x, y })
  }
  
  // ─────────────────────────────────────────
  // LOCK BODY SCROLL WHEN LIGHTBOX OPEN
  // ─────────────────────────────────────────
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])
  
  // ─────────────────────────────────────────
  // MARK IMAGE AS LOADED
  // ─────────────────────────────────────────
  const markImageLoaded = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }
  
  // ─────────────────────────────────────────
  // NO IMAGES FALLBACK
  // ─────────────────────────────────────────
  if (!images || images.length === 0) {
    return (
      <div className={`${aspectRatio} bg-charcoal flex items-center justify-center`}>
        <p className="text-silver text-sm">No image available</p>
      </div>
    )
  }
  
  return (
    <>
      {/* ═══════════════════════════════════════
          MAIN GALLERY LAYOUT
      ═══════════════════════════════════════ */}
      <div className="grid lg:grid-cols-[100px_1fr] gap-4 lg:gap-6">
        
        {/* ─────────────────────────────────
            VERTICAL THUMBNAILS (Desktop)
        ───────────────────────────────── */}
        <div className="hidden lg:flex flex-col gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`
                relative aspect-square overflow-hidden 
                transition-all duration-400 group
                ${currentIndex === index 
                  ? 'ring-1 ring-gold opacity-100' 
                  : 'opacity-50 hover:opacity-80'
                }
              `}
              aria-label={`View image ${index + 1}`}
              data-cursor="hover"
            >
              <img
                src={image}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {currentIndex === index && (
                <div className="absolute inset-0 border border-gold pointer-events-none" />
              )}
            </button>
          ))}
        </div>
        
        {/* ═══════════════════════════════════════
            MAIN IMAGE DISPLAY
        ═══════════════════════════════════════ */}
        <div 
          ref={mainImageRef}
          className={`relative ${aspectRatio} bg-charcoal overflow-hidden group`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          data-cursor={isZoomed ? 'default' : 'hover'}
        >
          
          {/* Corner Brackets */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <div className="w-4 h-px bg-gold" />
            <div className="w-px h-4 bg-gold" />
          </div>
          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <div className="w-4 h-px bg-gold ml-auto" />
            <div className="w-px h-4 bg-gold ml-auto" />
          </div>
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <div className="w-px h-4 bg-gold" />
            <div className="w-4 h-px bg-gold" />
          </div>
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <div className="w-px h-4 bg-gold ml-auto" />
            <div className="w-4 h-px bg-gold ml-auto" />
          </div>
          
          {/* Loading Skeleton */}
          {!imageLoaded[currentIndex] && (
            <div className="absolute inset-0 bg-charcoal animate-pulse" />
          )}
          
          {/* Image with fade transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={images[currentIndex]}
                alt={`${productName} view ${currentIndex + 1}`}
                onLoad={() => markImageLoaded(currentIndex)}
                onClick={() => setIsZoomed(!isZoomed)}
                className={`
                  w-full h-full object-cover cursor-zoom-in
                  transition-transform duration-800 ease-luxury
                  ${isZoomed ? 'scale-200 cursor-zoom-out' : ''}
                `}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        transform: 'scale(2)',
                      }
                    : {}
                }
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* ─────────────────────────────────
              NAVIGATION ARROWS (Desktop)
          ───────────────────────────────── */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-noir/60 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous image"
                data-cursor="hover"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={goToNext}
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-noir/60 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next image"
                data-cursor="hover"
              >
                <FiChevronRight size={18} />
              </button>
            </>
          )}
          
          {/* ─────────────────────────────────
              TOP RIGHT ACTIONS
          ───────────────────────────────── */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
            
            {/* Fullscreen Button */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-noir/60 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400"
              aria-label="View fullscreen"
              data-cursor="hover"
            >
              <FiMaximize2 size={14} />
            </button>
            
            {/* Zoom Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className={`w-10 h-10 flex items-center justify-center bg-noir/60 backdrop-blur-sm border transition-all duration-400 ${
                isZoomed 
                  ? 'border-gold text-gold' 
                  : 'border-ivory/20 text-ivory hover:bg-ivory hover:text-noir'
              }`}
              aria-label="Toggle zoom"
              data-cursor="hover"
            >
              <FiZoomIn size={14} />
            </button>
          </div>
          
          {/* ─────────────────────────────────
              IMAGE COUNTER (Bottom Right)
          ───────────────────────────────── */}
          {images.length > 1 && (
            <div className="absolute bottom-6 right-6 z-10">
              <div className="px-3 py-1.5 bg-noir/60 backdrop-blur-sm border border-ivory/20">
                <p 
                  className="text-tiny tracking-mega text-ivory uppercase font-mono tabular-nums"
                  style={{ fontSize: '0.65rem' }}
                >
                  {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* ═══════════════════════════════════════
          HORIZONTAL THUMBNAILS (Mobile)
      ═══════════════════════════════════════ */}
      <div className="lg:hidden mt-4 flex gap-2 overflow-x-auto no-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`
              flex-shrink-0 w-16 h-20 overflow-hidden
              transition-all duration-400
              ${currentIndex === index 
                ? 'ring-1 ring-gold opacity-100' 
                : 'opacity-50'
              }
            `}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>
      
      {/* ═══════════════════════════════════════
          LIGHTBOX (Fullscreen)
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] bg-noir flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-noir border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400 z-10"
              aria-label="Close fullscreen"
              data-cursor="hover"
            >
              <FiX size={20} />
            </button>
            
            {/* Counter */}
            <div className="absolute top-6 left-6 z-10">
              <p 
                className="text-tiny tracking-mega text-ivory uppercase font-mono tabular-nums"
                style={{ fontSize: '0.7rem' }}
              >
                {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </p>
            </div>
            
            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-noir border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400 z-10"
                  aria-label="Previous"
                  data-cursor="hover"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-noir border border-ivory/20 text-ivory hover:bg-ivory hover:text-noir transition-all duration-400 z-10"
                  aria-label="Next"
                  data-cursor="hover"
                >
                  <FiChevronRight size={20} />
                </button>
              </>
            )}
            
            {/* Fullscreen Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${productName} fullscreen ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                draggable={false}
              />
            </AnimatePresence>
            
            {/* Thumbnails at Bottom */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`transition-all duration-400 ${
                      currentIndex === index
                        ? 'w-12 h-px bg-gold'
                        : 'w-6 h-px bg-ivory/30 hover:bg-ivory'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProductGallery