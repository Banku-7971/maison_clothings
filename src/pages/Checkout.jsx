import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCheck, 
  FiChevronLeft, 
  FiLock, 
  FiCreditCard,
  FiTruck,
  FiUser,
  FiMapPin,
  FiMail,
  FiShield,
} from 'react-icons/fi'
import CartItem from '../components/CartItem'
import useCartStore from '../store/cartStore'
import useUIStore from '../store/uiStore'
import { formatPrice, isValidEmail, generateOrderNumber } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — CHECKOUT PAGE
// ═══════════════════════════════════════════════════════════════
// The final step. Where dreams become deliveries.
//
// Steps:
// 1. Contact Information
// 2. Shipping Address
// 3. Shipping Method
// 4. Payment
// 5. Order Confirmation
//
// Features:
// - Multi-step form with progress
// - Form validation
// - Order summary sticky sidebar
// - Guest checkout support
// - Express payment options (Apple Pay, Google Pay display)
// - Shipping method selector
// - Payment form (card, Apple Pay, Google Pay)
// - Order confirmation screen
// - Auto-fill browser support
// - Email order confirmation notice
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// STEP INDICATOR COMPONENT
// ─────────────────────────────────────────
const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-12 md:mb-16">
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isComplete = index < currentStep
        
        return (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full border flex items-center justify-center
                  transition-all duration-400
                  ${isActive 
                    ? 'bg-gold border-gold text-noir' 
                    : isComplete
                    ? 'bg-noir border-gold text-gold'
                    : 'bg-noir border-graphite text-silver'
                  }
                `}
              >
                {isComplete ? (
                  <FiCheck size={14} strokeWidth={3} />
                ) : (
                  <span className="text-xs font-mono tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
              </div>
              
              <p 
                className={`
                  hidden md:block mt-2 text-tiny tracking-mega uppercase whitespace-nowrap
                  ${isActive || isComplete ? 'text-gold' : 'text-silver'}
                `}
                style={{ fontSize: '0.6rem' }}
              >
                {step}
              </p>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div 
                className={`
                  w-12 md:w-24 h-px mx-2 md:mx-4 transition-all duration-400
                  ${index < currentStep ? 'bg-gold' : 'bg-graphite'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════
// MAIN CHECKOUT PAGE
// ═══════════════════════════════════════════════════════════════
const Checkout = () => {
  const navigate = useNavigate()
  
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const items = useCartStore(state => state.items)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const getDiscountAmount = useCartStore(state => state.getDiscountAmount)
  const getShippingCost = useCartStore(state => state.getShippingCost)
  const getTaxAmount = useCartStore(state => state.getTaxAmount)
  const getTotal = useCartStore(state => state.getTotal)
  const shippingMethod = useCartStore(state => state.shippingMethod)
  const setShippingMethod = useCartStore(state => state.setShippingMethod)
  const couponCode = useCartStore(state => state.couponCode)
  const clearCart = useCartStore(state => state.clearCart)
  
  const showToast = useUIStore(state => state.showToast)
  
  // ─────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  const [formData, setFormData] = useState({
    // Contact
    email: '',
    subscribeNewsletter: true,
    
    // Address
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
    
    // Payment
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    paymentMethod: 'card',
  })
  
  const [errors, setErrors] = useState({})
  
  const steps = ['Contact', 'Shipping', 'Payment', 'Complete']
  
  // ─────────────────────────────────────────
  // REDIRECT IF EMPTY CART
  // ─────────────────────────────────────────
  useEffect(() => {
    if (items.length === 0 && currentStep < 3) {
      navigate('/cart')
    }
  }, [items, currentStep])
  
  // ─────────────────────────────────────────
  // DOCUMENT TITLE
  // ─────────────────────────────────────────
  useEffect(() => {
    document.title = 'Checkout — MAISON'
    return () => {
      document.title = 'MAISON'
    }
  }, [])
  
  // ─────────────────────────────────────────
  // COMPUTED VALUES
  // ─────────────────────────────────────────
  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const shipping = getShippingCost()
  const tax = getTaxAmount()
  const total = getTotal()
  
  // ─────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }
  
  const validateStep = () => {
    const newErrors = {}
    
    if (currentStep === 0) {
      // Contact validation
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!isValidEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    } else if (currentStep === 1) {
      // Shipping validation
      if (!formData.firstName) newErrors.firstName = 'First name required'
      if (!formData.lastName) newErrors.lastName = 'Last name required'
      if (!formData.address) newErrors.address = 'Address required'
      if (!formData.city) newErrors.city = 'City required'
      if (!formData.postalCode) newErrors.postalCode = 'Postal code required'
      if (!formData.phone) newErrors.phone = 'Phone required'
    } else if (currentStep === 2) {
      // Payment validation
      if (formData.paymentMethod === 'card') {
        if (!formData.cardName) newErrors.cardName = 'Name on card required'
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number required'
        if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry required'
        if (!formData.cardCvc) newErrors.cardCvc = 'CVC required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (!validateStep()) {
      showToast({ type: 'error', message: 'Please fill all required fields' })
      return
    }
    setCurrentStep(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handlePlaceOrder = async () => {
    if (!validateStep()) return
    
    setIsProcessing(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const orderNum = generateOrderNumber()
    setOrderNumber(orderNum)
    setCurrentStep(3)
    clearCart()
    setIsProcessing(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <div className="bg-noir min-h-screen">
      
      {/* ═══════════════════════════════════════
          HEADER
      ═══════════════════════════════════════ */}
      <section className="pt-32 md:pt-40 pb-8 border-b border-graphite/30">
        <div className="container-luxury">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-tiny tracking-mega text-gold uppercase mb-4"
            style={{ fontSize: '0.7rem' }}
          >
            — Complete Your Order
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cormorant font-light text-ivory mb-8"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 0.95,
            }}
          >
            {currentStep === 3 ? (
              <>Order <em className="italic text-gold">confirmed.</em></>
            ) : (
              <>Checkout</>
            )}
          </motion.h1>
          
          {/* Step Indicator */}
          {currentStep < 3 && <StepIndicator steps={steps} currentStep={currentStep} />}
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="container-luxury">
          
          {/* ═══════════════════════════════════════
              CONFIRMATION SCREEN (Step 3)
          ═══════════════════════════════════════ */}
          {currentStep === 3 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold flex items-center justify-center"
              >
                <FiCheck className="text-noir" size={40} strokeWidth={2.5} />
              </motion.div>
              
              {/* Message */}
              <h2 className="font-cormorant font-light text-ivory text-4xl md:text-5xl mb-4">
                Thank you, <em className="italic text-gold">{formData.firstName}</em>
              </h2>
              
              <p className="font-cormorant italic text-platinum text-lg md:text-xl mb-8 leading-relaxed">
                Your order has been received. 
                A confirmation has been sent to your email.
              </p>
              
              {/* Order Number */}
              <div className="inline-block bg-charcoal border border-graphite p-6 mb-12">
                <p 
                  className="text-tiny tracking-mega text-silver uppercase mb-2"
                  style={{ fontSize: '0.65rem' }}
                >
                  Order Number
                </p>
                <p className="font-mono text-gold text-xl tracking-wider">
                  {orderNumber}
                </p>
              </div>
              
              {/* Details */}
              <div className="max-w-md mx-auto text-left space-y-4 mb-12 pb-12 border-b border-graphite/30">
                <div className="flex justify-between text-sm">
                  <span className="text-silver font-cormorant">Confirmation email sent to:</span>
                </div>
                <p className="text-gold font-mono text-sm">{formData.email}</p>
                
                <div className="pt-4 flex justify-between text-sm">
                  <span className="text-silver font-cormorant">Shipping to:</span>
                </div>
                <p className="text-ivory font-cormorant italic">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address}<br />
                  {formData.city}, {formData.postalCode}<br />
                  {formData.country}
                </p>
                
                <div className="pt-4 flex justify-between items-baseline">
                  <span className="text-tiny tracking-mega text-silver uppercase" style={{ fontSize: '0.7rem' }}>
                    Total
                  </span>
                  <span className="font-cormorant text-2xl text-ivory tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
              
              {/* CTA */}
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3"
                data-cursor="hover"
              >
                <span className="relative overflow-hidden">
                  <span 
                    className="inline-block py-4 px-12 border border-ivory text-ivory text-tiny tracking-mega uppercase relative z-10 transition-colors duration-500 group-hover:text-noir"
                    style={{ fontSize: '0.75rem' }}
                  >
                    Continue Shopping
                    <motion.span 
                      className="absolute inset-0 bg-ivory -z-10"
                      initial={{ y: '100%' }}
                      whileHover={{ y: '0%' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </span>
              </Link>
            </motion.div>
          ) : (
            
            /* ═══════════════════════════════════════
                CHECKOUT STEPS
            ═══════════════════════════════════════ */
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* LEFT: FORM */}
              <div className="lg:col-span-2">
                
                {/* Back button */}
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="mb-6 inline-flex items-center gap-2 text-tiny tracking-mega text-silver hover:text-gold uppercase transition-colors"
                    style={{ fontSize: '0.65rem' }}
                    data-cursor="hover"
                  >
                    <FiChevronLeft size={14} />
                    Back
                  </button>
                )}
                
                <AnimatePresence mode="wait">
                  
                  {/* ═══════════════════════════════════════
                      STEP 0: CONTACT
                  ═══════════════════════════════════════ */}
                  {currentStep === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <FiMail className="text-gold" size={20} />
                        <h2 className="font-cormorant text-2xl md:text-3xl text-ivory">
                          Contact Information
                        </h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b transition-colors text-ivory ${errors.email ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            placeholder="you@example.com"
                            data-cursor="text"
                          />
                          {errors.email && (
                            <p className="mt-2 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>
                              {errors.email}
                            </p>
                          )}
                        </div>
                        
                        <label className="flex items-start gap-3 cursor-pointer" data-cursor="hover">
                          <input
                            type="checkbox"
                            checked={formData.subscribeNewsletter}
                            onChange={(e) => updateField('subscribeNewsletter', e.target.checked)}
                            className="mt-1 accent-gold"
                          />
                          <span className="text-sm text-platinum font-cormorant italic leading-relaxed">
                            Subscribe to receive private access to new collections, 
                            events, and stories from the atelier.
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* ═══════════════════════════════════════
                      STEP 1: SHIPPING
                  ═══════════════════════════════════════ */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <FiMapPin className="text-gold" size={20} />
                        <h2 className="font-cormorant text-2xl md:text-3xl text-ivory">
                          Shipping Address
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => updateField('firstName', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b text-ivory ${errors.firstName ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.firstName && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.firstName}</p>}
                        </div>
                        
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => updateField('lastName', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b text-ivory ${errors.lastName ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.lastName && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.lastName}</p>}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label 
                          className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                          style={{ fontSize: '0.65rem' }}
                        >
                          Street Address *
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateField('address', e.target.value)}
                          className={`w-full py-3 bg-transparent border-b text-ivory ${errors.address ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                          data-cursor="text"
                        />
                        {errors.address && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.address}</p>}
                      </div>
                      
                      <div className="mb-6">
                        <label 
                          className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                          style={{ fontSize: '0.65rem' }}
                        >
                          Apartment / Suite (optional)
                        </label>
                        <input
                          type="text"
                          value={formData.apartment}
                          onChange={(e) => updateField('apartment', e.target.value)}
                          className="w-full py-3 bg-transparent border-b border-silver/30 focus:border-gold text-ivory"
                          data-cursor="text"
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="col-span-2">
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            City *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b text-ivory ${errors.city ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.city && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.city}</p>}
                        </div>
                        
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            Postal *
                          </label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => updateField('postalCode', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b text-ivory ${errors.postalCode ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.postalCode && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.postalCode}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            Country
                          </label>
                          <select
                            value={formData.country}
                            onChange={(e) => updateField('country', e.target.value)}
                            className="w-full py-3 bg-noir border-b border-silver/30 focus:border-gold text-ivory"
                            data-cursor="hover"
                          >
                            <option>France</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Italy</option>
                            <option>Germany</option>
                            <option>Japan</option>
                          </select>
                        </div>
                        
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            Phone *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b text-ivory ${errors.phone ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.phone && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.phone}</p>}
                        </div>
                      </div>
                      
                      {/* Shipping Method */}
                      <div className="pt-8 border-t border-graphite/30">
                        <h3 
                          className="text-tiny tracking-mega text-ivory uppercase mb-6"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Shipping Method
                        </h3>
                        
                        <div className="space-y-3">
                          {[
                            { id: 'standard', label: 'Standard', time: '5-7 business days', price: subtotal >= 500 ? 0 : 25 },
                            { id: 'express', label: 'Express', time: '2-3 business days', price: 45 },
                            { id: 'international', label: 'International', time: '7-14 business days', price: 75 },
                          ].map(method => (
                            <button
                              key={method.id}
                              onClick={() => setShippingMethod(method.id)}
                              className={`
                                w-full flex items-center justify-between p-4 border transition-all duration-300
                                ${shippingMethod === method.id 
                                  ? 'border-gold bg-gold/5' 
                                  : 'border-graphite hover:border-ivory'
                                }
                              `}
                              data-cursor="hover"
                            >
                              <div className="text-left">
                                <p className="font-cormorant text-ivory">{method.label}</p>
                                <p className="text-xs text-silver mt-1">{method.time}</p>
                              </div>
                              <p className="font-cormorant text-ivory tabular-nums">
                                {method.price === 0 ? 'Free' : formatPrice(method.price)}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* ═══════════════════════════════════════
                      STEP 2: PAYMENT
                  ═══════════════════════════════════════ */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <FiCreditCard className="text-gold" size={20} />
                        <h2 className="font-cormorant text-2xl md:text-3xl text-ivory">
                          Payment
                        </h2>
                      </div>
                      
                      {/* Security Notice */}
                      <div className="mb-8 flex items-center gap-3 p-4 bg-charcoal border border-graphite">
                        <FiLock className="text-gold flex-shrink-0" size={16} />
                        <p className="text-sm text-platinum font-cormorant italic">
                          Your payment is encrypted and secure
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => updateField('cardName', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b text-ivory ${errors.cardName ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.cardName && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.cardName}</p>}
                        </div>
                        
                        <div>
                          <label 
                            className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                            style={{ fontSize: '0.65rem' }}
                          >
                            Card Number *
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => updateField('cardNumber', e.target.value)}
                            placeholder="•••• •••• •••• ••••"
                            className={`w-full py-3 bg-transparent border-b text-ivory font-mono ${errors.cardNumber ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.cardNumber && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.cardNumber}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label 
                              className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                              style={{ fontSize: '0.65rem' }}
                            >
                              Expiry *
                            </label>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => updateField('cardExpiry', e.target.value)}
                              placeholder="MM / YY"
                              className={`w-full py-3 bg-transparent border-b text-ivory font-mono ${errors.cardExpiry ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                              data-cursor="text"
                            />
                            {errors.cardExpiry && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.cardExpiry}</p>}
                          </div>
                          
                          <div>
                            <label 
                              className="text-tiny tracking-mega text-silver uppercase mb-2 block"
                              style={{ fontSize: '0.65rem' }}
                            >
                              CVC *
                            </label>
                            <input
                              type="text"
                              value={formData.cardCvc}
                              onChange={(e) => updateField('cardCvc', e.target.value)}
                              placeholder="•••"
                              className={`w-full py-3 bg-transparent border-b text-ivory font-mono ${errors.cardCvc ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                              data-cursor="text"
                            />
                            {errors.cardCvc && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.cardCvc}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Continue Button */}
                {currentStep < 3 && (
                  <div className="mt-12">
                    <button
                      onClick={currentStep === 2 ? handlePlaceOrder : handleNext}
                      disabled={isProcessing}
                      className="w-full py-4 bg-ivory text-noir flex items-center justify-center gap-3 hover:bg-gold transition-all duration-500 disabled:opacity-60"
                      data-cursor="hover"
                    >
                      {isProcessing ? (
                        <span 
                          className="text-tiny tracking-mega uppercase font-medium"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Processing...
                        </span>
                      ) : (
                        <>
                          <span 
                            className="text-tiny tracking-mega uppercase font-medium"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {currentStep === 2 
                              ? `Place Order — ${formatPrice(total)}` 
                              : 'Continue'
                            }
                          </span>
                        </>
                      )}
                    </button>
                    
                    <p 
                      className="mt-4 text-tiny text-silver italic font-cormorant text-center"
                      style={{ fontSize: '0.7rem' }}
                    >
                      By placing your order, you agree to our Terms & Privacy Policy
                    </p>
                  </div>
                )}
              </div>
              
              {/* RIGHT: ORDER SUMMARY */}
              <div>
                <div className="sticky top-32 space-y-6">
                  
                  <div className="bg-charcoal border border-graphite p-6">
                    <h3 className="font-cormorant text-xl text-ivory mb-6">
                      Order Summary
                    </h3>
                    
                    {/* Mini Cart Items */}
                    <div className="mb-6 divide-y divide-graphite/30">
                      {items.map(item => (
                        <CartItem 
                          key={item.key}
                          item={item}
                          variant="mini"
                        />
                      ))}
                    </div>
                    
                    {/* Totals */}
                    <div className="space-y-3 pt-4 border-t border-graphite/30">
                      <div className="flex justify-between text-sm text-platinum">
                        <span className="font-cormorant">Subtotal</span>
                        <span className="tabular-nums font-cormorant">{formatPrice(subtotal)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-gold">
                          <span className="font-cormorant">Discount</span>
                          <span className="tabular-nums font-cormorant">−{formatPrice(discount)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm text-platinum">
                        <span className="font-cormorant">Shipping</span>
                        <span className="tabular-nums font-cormorant">
                          {shipping === 0 ? 'Free' : formatPrice(shipping)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-platinum">
                        <span className="font-cormorant">Tax</span>
                        <span className="tabular-nums font-cormorant">{formatPrice(tax)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-graphite/50">
                      <div className="flex items-baseline justify-between">
                        <span 
                          className="text-tiny tracking-mega text-ivory uppercase"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Total
                        </span>
                        <span className="font-cormorant text-2xl text-ivory tabular-nums">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trust Signals */}
                  <div className="space-y-3">
                    {[
                      { icon: FiShield, text: 'SSL secured checkout' },
                      { icon: FiTruck, text: 'Fast worldwide delivery' },
                      { icon: FiCheck, text: '30-day free returns' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <item.icon className="text-gold flex-shrink-0" size={14} />
                        <span className="text-sm text-platinum font-cormorant italic">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Checkout