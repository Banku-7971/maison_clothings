import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCheck, 
  FiChevronLeft, 
  FiLock, 
  FiCreditCard,
  FiTruck,
  FiMail,
  FiMapPin,
  FiShield,
} from 'react-icons/fi'
import CartItem from '../components/CartItem'
import useCartStore from '../store/cartStore'
import useUIStore from '../store/uiStore'
import { formatPrice, isValidEmail, generateOrderNumber, isValidIndianPhone, isValidIndianPincode } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON INDIA — CHECKOUT (Kolkata → All India)
// ═══════════════════════════════════════════════════════════════

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Chandigarh', 'Jammu and Kashmir',
  'Ladakh', 'Puducherry',
]


const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-12 md:mb-16">
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isComplete = index < currentStep
        
        return (
          <div key={index} className="flex items-center">
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


const Checkout = () => {
  const navigate = useNavigate()
  
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
  
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    subscribeNewsletter: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'West Bengal',
    pincode: '',
    country: 'India',
    phone: '',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    upiId: '',
  })
  
  const [errors, setErrors] = useState({})
  
  const steps = ['Contact', 'Shipping', 'Payment', 'Complete']
  
  useEffect(() => {
    if (items.length === 0 && currentStep < 3) {
      navigate('/cart')
    }
  }, [items, currentStep])
  
  useEffect(() => {
    document.title = 'Checkout — MAISON'
    return () => { document.title = 'MAISON' }
  }, [])
  
  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const shipping = getShippingCost()
  const tax = getTaxAmount()
  const total = getTotal()
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }
  
  const validateStep = () => {
    const newErrors = {}
    
    if (currentStep === 0) {
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!isValidEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    } else if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name required'
      if (!formData.lastName) newErrors.lastName = 'Last name required'
      if (!formData.address) newErrors.address = 'Address required'
      if (!formData.city) newErrors.city = 'City required'
      if (!formData.pincode) newErrors.pincode = 'PIN Code required'
      else if (!isValidIndianPincode(formData.pincode)) newErrors.pincode = 'Invalid PIN Code'
      if (!formData.phone) newErrors.phone = 'Phone required'
      else if (!isValidIndianPhone(formData.phone.replace(/\D/g, '').slice(-10))) newErrors.phone = 'Invalid Indian phone'
    } else if (currentStep === 2) {
      if (formData.paymentMethod === 'card') {
        if (!formData.cardName) newErrors.cardName = 'Name on card required'
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number required'
        if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry required'
        if (!formData.cardCvc) newErrors.cardCvc = 'CVC required'
      } else if (formData.paymentMethod === 'upi') {
        if (!formData.upiId) newErrors.upiId = 'UPI ID required'
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
      
      {/* HEADER */}
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
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95 }}
          >
            {currentStep === 3 ? (
              <>Order <em className="italic text-gold">confirmed.</em></>
            ) : (
              <>Checkout</>
            )}
          </motion.h1>
          
          {currentStep < 3 && <StepIndicator steps={steps} currentStep={currentStep} />}
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container-luxury">
          
          {/* CONFIRMATION */}
          {currentStep === 3 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold flex items-center justify-center"
              >
                <FiCheck className="text-noir" size={40} strokeWidth={2.5} />
              </motion.div>
              
              <h2 className="font-cormorant font-light text-ivory text-4xl md:text-5xl mb-4">
                Thank you, <em className="italic text-gold">{formData.firstName}</em>
              </h2>
              
              <p className="font-cormorant italic text-platinum text-lg md:text-xl mb-8 leading-relaxed">
                Your order has been received. 
                A confirmation has been sent to your email.
              </p>
              
              <div className="inline-block bg-charcoal border border-graphite p-6 mb-12 rounded-2xl">
                <p className="text-tiny tracking-mega text-silver uppercase mb-2" style={{ fontSize: '0.65rem' }}>
                  Order Number
                </p>
                <p className="font-mono text-gold text-xl tracking-wider">
                  {orderNumber}
                </p>
              </div>
              
              <div className="max-w-md mx-auto text-left space-y-4 mb-12 pb-12 border-b border-graphite/30">
                <div className="flex justify-between text-sm">
                  <span className="text-silver font-cormorant">Confirmation sent to:</span>
                </div>
                <p className="text-gold font-mono text-sm">{formData.email}</p>
                
                <div className="pt-4 flex justify-between text-sm">
                  <span className="text-silver font-cormorant">Shipping to:</span>
                </div>
                <p className="text-ivory font-cormorant italic">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address}<br />
                  {formData.city}, {formData.state} {formData.pincode}<br />
                  India
                </p>
                
                <div className="pt-4 flex justify-between items-baseline">
                  <span className="text-tiny tracking-mega text-silver uppercase" style={{ fontSize: '0.7rem' }}>
                    Total (incl. GST)
                  </span>
                  <span className="font-cormorant text-2xl text-ivory tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
              
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 py-4 px-12 bg-gold text-noir hover:bg-ivory transition-all duration-500 rounded-full"
                data-cursor="hover"
              >
                <span className="text-tiny tracking-mega uppercase font-semibold" style={{ fontSize: '0.75rem' }}>
                  Continue Shopping
                </span>
              </Link>
            </motion.div>
          ) : (
            
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* LEFT: FORM */}
              <div className="lg:col-span-2">
                
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
                  
                  {/* STEP 0: CONTACT */}
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
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
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
                  
                  {/* STEP 1: SHIPPING */}
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
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
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
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
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
                        <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                          Street Address *
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateField('address', e.target.value)}
                          placeholder="House no, Building name, Street"
                          className={`w-full py-3 bg-transparent border-b text-ivory ${errors.address ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                          data-cursor="text"
                        />
                        {errors.address && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.address}</p>}
                      </div>
                      
                      <div className="mb-6">
                        <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                          Locality / Landmark (optional)
                        </label>
                        <input
                          type="text"
                          value={formData.apartment}
                          onChange={(e) => updateField('apartment', e.target.value)}
                          placeholder="Near landmark, area name"
                          className="w-full py-3 bg-transparent border-b border-silver/30 focus:border-gold text-ivory"
                          data-cursor="text"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
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
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => updateField('pincode', e.target.value)}
                            placeholder="700016"
                            maxLength={6}
                            className={`w-full py-3 bg-transparent border-b text-ivory ${errors.pincode ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.pincode && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.pincode}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                            State *
                          </label>
                          <select
                            value={formData.state}
                            onChange={(e) => updateField('state', e.target.value)}
                            className="w-full py-3 bg-noir border-b border-silver/30 focus:border-gold text-ivory"
                            data-cursor="hover"
                          >
                            {INDIAN_STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                            Phone *
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-ivory text-sm">+91</span>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => updateField('phone', e.target.value)}
                              placeholder="98765 43210"
                              maxLength={10}
                              className={`flex-1 py-3 bg-transparent border-b text-ivory ${errors.phone ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                              data-cursor="text"
                            />
                          </div>
                          {errors.phone && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.phone}</p>}
                        </div>
                      </div>
                      
                      {/* SHIPPING METHOD */}
                      <div className="pt-8 border-t border-graphite/30">
                        <h3 className="text-tiny tracking-mega text-ivory uppercase mb-6" style={{ fontSize: '0.75rem' }}>
                          Shipping Method
                        </h3>
                        
                        <div className="space-y-3">
                          {[
                            { id: 'standard', label: 'Standard Delivery', time: '5-7 business days', price: subtotal >= 5000 ? 0 : 200 },
                            { id: 'express', label: 'Express Delivery', time: '2-3 business days', price: 500 },
                          ].map(method => (
                            <button
                              key={method.id}
                              onClick={() => setShippingMethod(method.id)}
                              className={`
                                w-full flex items-center justify-between p-4 border transition-all duration-300 rounded-lg
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
                                {method.price === 0 ? 'FREE' : formatPrice(method.price)}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* STEP 2: PAYMENT */}
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
                      
                      <div className="mb-8 flex items-center gap-3 p-4 bg-charcoal border border-graphite rounded-lg">
                        <FiLock className="text-gold flex-shrink-0" size={16} />
                        <p className="text-sm text-platinum font-cormorant italic">
                          Your payment is encrypted and secure. All prices in INR (incl. 18% GST)
                        </p>
                      </div>
                      
                      {/* PAYMENT METHOD SELECTOR */}
                      <div className="grid grid-cols-3 gap-2 mb-8">
                        {[
                          { id: 'card', label: 'Card' },
                          { id: 'upi', label: 'UPI' },
                          { id: 'cod', label: 'COD' },
                        ].map(method => (
                          <button
                            key={method.id}
                            onClick={() => updateField('paymentMethod', method.id)}
                            className={`
                              py-3 border transition-all duration-300 rounded-lg
                              ${formData.paymentMethod === method.id 
                                ? 'border-gold bg-gold/10 text-gold' 
                                : 'border-graphite text-platinum hover:border-ivory'
                              }
                            `}
                            style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}
                            data-cursor="hover"
                          >
                            {method.label}
                          </button>
                        ))}
                      </div>
                      
                      {/* CARD PAYMENT */}
                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-6">
                          <div>
                            <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
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
                            <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
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
                              <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
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
                            </div>
                            
                            <div>
                              <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                                CVV *
                              </label>
                              <input
                                type="text"
                                value={formData.cardCvc}
                                onChange={(e) => updateField('cardCvc', e.target.value)}
                                placeholder="•••"
                                className={`w-full py-3 bg-transparent border-b text-ivory font-mono ${errors.cardCvc ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                                data-cursor="text"
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-4">
                            {['Visa', 'Mastercard', 'RuPay', 'Amex'].map(brand => (
                              <span key={brand} className="text-xs text-silver border border-graphite/50 px-3 py-1 rounded" style={{ fontSize: '0.65rem' }}>
                                {brand}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* UPI PAYMENT */}
                      {formData.paymentMethod === 'upi' && (
                        <div className="space-y-6">
                          <div>
                            <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                              UPI ID *
                            </label>
                            <input
                              type="text"
                              value={formData.upiId}
                              onChange={(e) => updateField('upiId', e.target.value)}
                              placeholder="yourname@paytm / yourname@ybl"
                              className={`w-full py-3 bg-transparent border-b text-ivory ${errors.upiId ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                              data-cursor="text"
                            />
                            {errors.upiId && <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>{errors.upiId}</p>}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                              <span key={app} className="text-xs text-silver border border-graphite/50 px-3 py-1 rounded" style={{ fontSize: '0.65rem' }}>
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* COD */}
                      {formData.paymentMethod === 'cod' && (
                        <div className="bg-charcoal border border-graphite p-6 rounded-lg">
                          <h4 className="font-cormorant text-xl text-ivory mb-3">
                            Cash on Delivery
                          </h4>
                          <p className="font-cormorant italic text-platinum text-sm leading-relaxed">
                            Pay in cash when your order is delivered. 
                            Additional handling fee of ₹100 applies. 
                            Available across India.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {currentStep < 3 && (
                  <div className="mt-12">
                    <button
                      onClick={currentStep === 2 ? handlePlaceOrder : handleNext}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gold text-noir flex items-center justify-center gap-3 hover:bg-ivory transition-all duration-500 disabled:opacity-60 rounded-full"
                      data-cursor="hover"
                    >
                      {isProcessing ? (
                        <span className="text-tiny tracking-mega uppercase font-semibold" style={{ fontSize: '0.75rem' }}>
                          Processing...
                        </span>
                      ) : (
                        <span className="text-tiny tracking-mega uppercase font-semibold" style={{ fontSize: '0.75rem' }}>
                          {currentStep === 2 
                            ? `Place Order — ${formatPrice(total)}` 
                            : 'Continue'
                          }
                        </span>
                      )}
                    </button>
                    
                    <p className="mt-4 text-tiny text-silver italic font-cormorant text-center" style={{ fontSize: '0.7rem' }}>
                      By placing your order, you agree to our Terms & Privacy Policy
                    </p>
                  </div>
                )}
              </div>
              
              {/* RIGHT: SUMMARY */}
              <div>
                <div className="sticky top-32 space-y-6">
                  <div className="bg-charcoal border border-graphite p-6 rounded-2xl">
                    <h3 className="font-cormorant text-xl text-ivory mb-6">
                      Order Summary
                    </h3>
                    
                    <div className="mb-6 divide-y divide-graphite/30">
                      {items.map(item => (
                        <CartItem 
                          key={item.key}
                          item={item}
                          variant="mini"
                        />
                      ))}
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-graphite/30">
                      <div className="flex justify-between text-sm text-platinum">
                        <span className="font-cormorant">Subtotal</span>
                        <span className="tabular-nums font-cormorant">{formatPrice(subtotal)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-gold">
                          <span className="font-cormorant">Discount ({couponCode})</span>
                          <span className="tabular-nums font-cormorant">−{formatPrice(discount)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm text-platinum">
                        <span className="font-cormorant">Shipping</span>
                        <span className="tabular-nums font-cormorant">
                          {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-platinum">
                        <span className="font-cormorant">GST (18%)</span>
                        <span className="tabular-nums font-cormorant">{formatPrice(tax)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-graphite/50">
                      <div className="flex items-baseline justify-between">
                        <span className="text-tiny tracking-mega text-ivory uppercase" style={{ fontSize: '0.7rem' }}>
                          Total
                        </span>
                        <span className="font-cormorant text-2xl text-ivory tabular-nums">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { icon: FiShield, text: 'Secure checkout · SSL encrypted' },
                      { icon: FiTruck, text: 'Free shipping across India' },
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