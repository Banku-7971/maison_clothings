import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHeart, FiShoppingBag, FiCheck, FiChevronLeft,
  FiTruck, FiRefreshCw, FiShield, FiPlus, FiMinus,
  FiChevronDown, FiChevronUp, FiShare2,
} from 'react-icons/fi'
import ProductGallery from '../components/ProductGallery'
import SizeSelector from '../components/SizeSelector'
import ProductCard from '../components/ProductCard'
import Newsletter from '../components/Newsletter'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import useUIStore from '../store/uiStore'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { formatPrice, formatRating, formatReviewCount } from '../utils/formatters'

const AccordionSection = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="border-b border-graphite/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
        data-cursor="hover"
      >
        <h3 
          className="text-tiny tracking-mega text-ivory uppercase group-hover:text-gold transition-colors duration-400"
          style={{ fontSize: '0.75rem' }}
        >
          {title}
        </h3>
        {isOpen ? (
          <FiChevronUp className="text-silver group-hover:text-gold transition-colors" size={16} />
        ) : (
          <FiChevronDown className="text-silver group-hover:text-gold transition-colors" size={16} />
        )}
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
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


const ProductDetail = () => {
  const { id: slug } = useParams()
  const navigate = useNavigate()
  
  const product = getProductBySlug(slug)
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : []
  
  const addToCart = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  const isInWishlist = useWishlistStore(state => 
    product ? state.isInWishlist(product.id) : false
  )
  const toggleWishlist = useWishlistStore(state => state.toggleItem)
  const showToast = useUIStore(state => state.showToast)
  const addRecentlyViewed = useUIStore(state => state.addRecentlyViewed)
  
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.find(s => s.available) || null)
      setSelectedColor(product.colors?.find(c => c.available) || null)
      setQuantity(1)
      addRecentlyViewed(product)
      document.title = `${product.name} — ${product.subtitle} | MAISON`
    }
    return () => { document.title = 'MAISON' }
  }, [product])
  
  if (!product) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cormorant text-4xl text-ivory mb-4">Piece not found</h1>
          <p className="font-cormorant italic text-platinum mb-8">
            The piece you seek exists only in imagination.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="text-tiny tracking-mega text-gold uppercase link-luxury"
            data-cursor="hover"
          >
            Return to Shop →
          </button>
        </div>
      </div>
    )
  }
  
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      showToast({ type: 'error', message: 'Please select size and color' })
      return
    }
    setIsAdding(true)
    addToCart(product, selectedSize, selectedColor, quantity)
    await new Promise(resolve => setTimeout(resolve, 500))
    setShowAddedFeedback(true)
    setIsAdding(false)
    setTimeout(() => {
      setShowAddedFeedback(false)
      openCart()
    }, 1500)
  }
  
  const handleWishlist = () => {
    const result = toggleWishlist(product)
    showToast({ type: 'default', message: result.message, duration: 2000 })
  }
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} from MAISON`,
          url: window.location.href,
        })
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(window.location.href)
      showToast({ type: 'default', message: 'Link copied to clipboard', duration: 2000 })
    }
  }
  
  return (
    <div className="bg-noir min-h-screen">
      
      <div className="pt-32 md:pt-40 pb-6 border-b border-graphite/30">
        <div className="container-luxury">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors duration-400"
            style={{ fontSize: '0.65rem' }}
            data-cursor="hover"
          >
            <FiChevronLeft size={14} />
            <span>Back</span>
          </button>
        </div>
      </div>
      
      <section className="py-12 md:py-16">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="lg:sticky lg:top-32">
                <ProductGallery 
                  images={product.images}
                  productName={product.name}
                  aspectRatio="aspect-[4/5]"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:py-8"
            >
              <p 
                className="text-tiny tracking-mega text-gold uppercase mb-4"
                style={{ fontSize: '0.7rem' }}
              >
                — {product.category}
              </p>
              
              <h1 
                className="font-cormorant font-light text-ivory mb-2"
                style={{ 
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {product.name}
              </h1>
              
              {product.subtitle && (
                <p className="font-cormorant italic text-silver text-xl md:text-2xl mb-6">
                  — {product.subtitle}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-6">
                {product.isNew && (
                  <span 
                    className="inline-block px-3 py-1 bg-gold text-noir text-tiny tracking-mega uppercase rounded-full"
                    style={{ fontSize: '0.6rem' }}
                  >
                    New Arrival
                  </span>
                )}
                {product.isBestseller && (
                  <span 
                    className="inline-block px-3 py-1 border border-ivory text-ivory text-tiny tracking-mega uppercase rounded-full"
                    style={{ fontSize: '0.6rem' }}
                  >
                    Bestseller
                  </span>
                )}
                {product.isLimited && (
                  <span 
                    className="inline-block px-3 py-1 border border-gold text-gold text-tiny tracking-mega uppercase rounded-full"
                    style={{ fontSize: '0.6rem' }}
                  >
                    Limited Edition
                  </span>
                )}
                {product.isSustainable && (
                  <span 
                    className="inline-block px-3 py-1 border border-forest text-forest text-tiny tracking-mega uppercase rounded-full"
                    style={{ fontSize: '0.6rem' }}
                  >
                    Made in India
                  </span>
                )}
              </div>
              
              {product.rating && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={i < Math.floor(product.rating) ? 'text-gold' : 'text-graphite'}
                        style={{ fontSize: '0.85rem' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-platinum font-cormorant">
                    {formatRating(product.rating)}
                  </span>
                  <span className="text-tiny text-silver" style={{ fontSize: '0.7rem' }}>
                    ({formatReviewCount(product.reviewCount)})
                  </span>
                </div>
              )}
              
              <div className="mb-8 pb-8 border-b border-graphite/30">
                <p className="font-cormorant text-4xl text-ivory tabular-nums">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-base text-silver line-through mt-1 tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                <p 
                  className="mt-2 text-tiny text-silver italic font-cormorant"
                  style={{ fontSize: '0.75rem' }}
                >
                  Inclusive of all taxes • Free shipping across India
                </p>
              </div>
              
              <p className="font-cormorant italic text-platinum text-base leading-relaxed mb-8">
                {product.description}
              </p>
              
              {/* COLOR SELECTOR */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-tiny tracking-mega text-ivory uppercase" style={{ fontSize: '0.75rem' }}>
                      Color
                    </p>
                    {selectedColor && (
                      <p className="text-tiny text-gold font-cormorant italic" style={{ fontSize: '0.85rem' }}>
                        — {selectedColor.name}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => color.available && setSelectedColor(color)}
                        disabled={!color.available}
                        className={`
                          relative w-10 h-10 rounded-full border-2 transition-all duration-300
                          ${selectedColor?.name === color.name
                            ? 'border-gold scale-110' 
                            : 'border-graphite hover:border-ivory'
                          }
                          ${!color.available ? 'opacity-30 cursor-not-allowed' : ''}
                        `}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        data-cursor="hover"
                      >
                        {selectedColor?.name === color.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FiCheck 
                              size={14}
                              className={color.hex === '#0A0A0A' || color.hex === '#4A0E1F' ? 'text-ivory' : 'text-noir'}
                              strokeWidth={3}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <SizeSelector 
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    onSelectSize={setSelectedSize}
                    category={product.category === 'trousers' ? 'bottoms' : 'tops'}
                    showSizeGuide={true}
                  />
                </div>
              )}
              
              <div className="mb-8">
                <p className="text-tiny tracking-mega text-ivory uppercase mb-3" style={{ fontSize: '0.75rem' }}>
                  Quantity
                </p>
                <div className="inline-flex items-center border border-graphite rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                    data-cursor="hover"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-14 text-center text-ivory text-sm font-mono tabular-nums">
                    {String(quantity).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                    data-cursor="hover"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || showAddedFeedback}
                  className={`
                    flex-1 py-4 flex items-center justify-center gap-3 transition-all duration-500 rounded-full
                    ${showAddedFeedback 
                      ? 'bg-gold text-noir' 
                      : 'bg-ivory text-noir hover:bg-gold'
                    }
                  `}
                  data-cursor="hover"
                >
                  {showAddedFeedback ? (
                    <>
                      <FiCheck size={16} />
                      <span className="text-tiny tracking-mega uppercase font-medium" style={{ fontSize: '0.75rem' }}>
                        Added to Bag
                      </span>
                    </>
                  ) : isAdding ? (
                    <span className="text-tiny tracking-mega uppercase font-medium" style={{ fontSize: '0.75rem' }}>
                      Adding...
                    </span>
                  ) : (
                    <>
                      <FiShoppingBag size={16} />
                      <span className="text-tiny tracking-mega uppercase font-medium" style={{ fontSize: '0.75rem' }}>
                        Add to Bag — {formatPrice(product.price * quantity)}
                      </span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleWishlist}
                  className={`
                    w-14 h-14 flex items-center justify-center border transition-all duration-400 rounded-full
                    ${isInWishlist 
                      ? 'border-gold text-gold' 
                      : 'border-graphite text-ivory hover:border-ivory'
                    }
                  `}
                  data-cursor="hover"
                >
                  <FiHeart 
                    size={16}
                    fill={isInWishlist ? '#B76E5D' : 'transparent'}
                  />
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-14 h-14 flex items-center justify-center border border-graphite text-ivory hover:border-ivory transition-all duration-400 rounded-full"
                  data-cursor="hover"
                >
                  <FiShare2 size={16} />
                </button>
              </div>
              
              {/* TRUST SIGNALS — INDIA */}
              <div className="grid grid-cols-3 gap-4 mb-12 py-6 border-y border-graphite/30">
                {[
                  { icon: FiTruck, label: 'Free Shipping', sub: 'Across India' },
                  { icon: FiRefreshCw, label: 'Easy Returns', sub: '30 days' },
                  { icon: FiShield, label: 'Handcrafted', sub: 'Kolkata atelier' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <item.icon className="text-gold mx-auto mb-2" size={18} />
                    <p 
                      className="text-tiny tracking-mega text-ivory uppercase mb-1"
                      style={{ fontSize: '0.6rem' }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-tiny text-silver font-cormorant italic"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
              
              <div>
                <AccordionSection title="Materials & Craft" defaultOpen={true}>
                  <div className="space-y-4">
                    {product.materials?.map((material, i) => (
                      <div key={i}>
                        <p 
                          className="text-tiny tracking-mega text-gold uppercase mb-1"
                          style={{ fontSize: '0.6rem' }}
                        >
                          {material.name}
                        </p>
                        <p className="font-cormorant text-base text-platinum">
                          {material.composition}
                        </p>
                        {material.origin && (
                          <p 
                            className="text-tiny text-silver mt-1 italic"
                            style={{ fontSize: '0.7rem' }}
                          >
                            Origin: {material.origin}
                          </p>
                        )}
                      </div>
                    ))}
                    
                    {product.features && (
                      <div className="mt-6 pt-6 border-t border-graphite/30">
                        <ul className="space-y-2">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-platinum font-cormorant">
                              <span className="text-gold mt-1">·</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionSection>
                
                <AccordionSection title="Care Instructions">
                  <ul className="space-y-2">
                    {product.care?.map((instruction, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-platinum font-cormorant">
                        <span className="text-gold mt-1">·</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionSection>
                
                <AccordionSection title="Shipping & Returns">
                  <div className="space-y-4 text-sm text-platinum font-cormorant leading-relaxed">
                    <div>
                      <p 
                        className="text-tiny tracking-mega text-gold uppercase mb-2"
                        style={{ fontSize: '0.6rem' }}
                      >
                        Delivery Across India
                      </p>
                      <p>Standard: {product.delivery?.standard}</p>
                      <p>Express: {product.delivery?.express}</p>
                      <p className="mt-2 italic">Free shipping on orders above ₹5,000</p>
                      <p className="italic">Cash on Delivery available</p>
                    </div>
                    
                    <div className="pt-4 border-t border-graphite/30">
                      <p 
                        className="text-tiny tracking-mega text-gold uppercase mb-2"
                        style={{ fontSize: '0.6rem' }}
                      >
                        Returns
                      </p>
                      <p className="italic">
                        Free returns within 30 days. 
                        Items must be unworn with original tags. 
                        Pickup available in major Indian cities.
                      </p>
                    </div>
                  </div>
                </AccordionSection>
                
                <AccordionSection title="Origin & Craftsmanship">
                  <p className="text-sm text-platinum font-cormorant italic leading-relaxed">
                    {product.origin}. Every piece bears the invisible mark 
                    of the Indian artisan who created it — a signature of care that 
                    cannot be replicated by machines.
                  </p>
                </AccordionSection>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {relatedProducts.length > 0 && (
        <section className="py-24 md:py-32 border-t border-graphite/30">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <p 
                className="text-tiny tracking-mega text-gold uppercase mb-4"
                style={{ fontSize: '0.7rem' }}
              >
                — Complete the Look
              </p>
              <h2 
                className="font-cormorant font-light text-ivory"
                style={{ 
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  lineHeight: 1,
                }}
              >
                You may also <em className="italic text-gold">love</em>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                  showQuickAdd={true}
                  showWishlist={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Newsletter variant="default" />
    </div>
  )
}

export default ProductDetail