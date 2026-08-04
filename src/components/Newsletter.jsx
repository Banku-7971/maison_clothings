import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiCheck, FiArrowRight } from 'react-icons/fi'
import { isValidEmail } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON — NEWSLETTER SUBSCRIPTION COMPONENT
// ═══════════════════════════════════════════════════════════════
// A standalone newsletter section that can be used anywhere.
// Different from Footer's newsletter — this is more prominent.
//
// Features:
// - Multiple variants (default, minimal, split, dark, light)
// - Editorial headline with italic accent
// - Elegant email input with underline animation
// - Email validation
// - Loading state during submission
// - Success state with celebration animation
// - Error handling
// - Privacy policy link
// - Optional image background
// - Optional decorative elements
// ═══════════════════════════════════════════════════════════════

const Newsletter = ({ 
  variant = 'default',      // 'default' | 'minimal' | 'split' | 'dark' | 'light'
  showImage = false,        // Show background image
  imageUrl = null,          // Custom background image
  headline = null,          // Custom headline
  subtitle = null,          // Custom subtitle
  ctaText = 'Subscribe',    // Custom CTA text
  benefits = null,          // Optional benefits array
}) => {
  
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  
  // ─────────────────────────────────────────
  // FORM SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate
    if (!email.trim()) {
      setStatus('error')
      setErrorMessage('Please enter your email')
      return
    }
    
    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email')
      return
    }
    
    setStatus('loading')
    setErrorMessage('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success
      setStatus('success')
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setEmail('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }
  
  // ─────────────────────────────────────────
  // DEFAULT CONTENT
  // ─────────────────────────────────────────
  const defaultHeadline = 'Join our world of'
  const defaultAccent = 'quiet luxury'
  const defaultSubtitle = 'Receive private access to new collections, exclusive events, and stories from the atelier — delivered with intention.'
  
  const defaultBenefits = [
    'Early access to new pieces',
    'Private sale invitations',
    'Stories from the atelier',
    'Exclusive editorial content',
  ]
  
  // ─────────────────────────────────────────
  // VARIANT: MINIMAL
  // Simple inline form
  // ─────────────────────────────────────────
  if (variant === 'minimal') {
    return (
      <div className="max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-3 pr-24 bg-transparent border-b border-silver/30 text-ivory placeholder:text-silver focus:border-gold transition-colors duration-400 font-cormorant text-lg"
              data-cursor="text"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-tiny tracking-mega uppercase text-ivory hover:text-gold transition-colors duration-400 disabled:opacity-40"
              style={{ fontSize: '0.7rem' }}
              data-cursor="hover"
            >
              {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Join →'}
            </button>
          </div>
        </form>
      </div>
    )
  }
  
  // ─────────────────────────────────────────
  // VARIANT: SPLIT
  // Side-by-side layout with image
  // ─────────────────────────────────────────
  if (variant === 'split') {
    return (
      <section className="py-24 md:py-32 bg-noir">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-portrait bg-charcoal overflow-hidden"
            >
              <img
                src={imageUrl || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=90'}
                alt="MAISON Newsletter"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
            </motion.div>
            
            {/* Right: Form */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-tiny tracking-mega text-gold uppercase mb-6"
                style={{ fontSize: '0.7rem' }}
              >
                — Correspondence
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-cormorant font-light text-ivory mb-6"
                style={{ 
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  lineHeight: 1,
                }}
              >
                {headline || defaultHeadline}
                <br />
                <em className="italic text-gold">
                  {defaultAccent}
                </em>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-cormorant italic text-platinum text-lg leading-relaxed mb-8"
              >
                {subtitle || defaultSubtitle}
              </motion.p>
              
              {/* Form */}
              <NewsletterForm
                email={email}
                setEmail={setEmail}
                status={status}
                errorMessage={errorMessage}
                handleSubmit={handleSubmit}
                ctaText={ctaText}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  // ─────────────────────────────────────────
  // VARIANT: DEFAULT (Centered Editorial)
  // ─────────────────────────────────────────
  return (
    <section className={`relative py-24 md:py-32 overflow-hidden ${variant === 'light' ? 'bg-ivory' : 'bg-noir'}`}>
      
      {/* Optional Background Image */}
      {showImage && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={imageUrl || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=2400&q=90'}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className={`absolute inset-0 ${variant === 'light' ? 'bg-ivory/70' : 'bg-noir/70'}`} />
        </div>
      )}
      
      {/* Ambient Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: variant === 'light' 
            ? 'radial-gradient(ellipse at center, rgba(201,169,110,0.1) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at center, rgba(201,169,110,0.15) 0%, transparent 60%)',
        }}
      />
      
      <div className="container-luxury relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 mb-8"
          >
            <FiMail className="text-gold" size={24} />
          </motion.div>
          
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-tiny tracking-mega text-gold uppercase mb-6"
            style={{ fontSize: '0.7rem' }}
          >
            — Correspondence
          </motion.p>
          
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`font-cormorant font-light mb-8 ${variant === 'light' ? 'text-noir' : 'text-ivory'}`}
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {headline || defaultHeadline}
            <br />
            <em className="italic text-gold">
              {defaultAccent}
            </em>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`font-cormorant italic text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto ${variant === 'light' ? 'text-charcoal' : 'text-platinum'}`}
          >
            {subtitle || defaultSubtitle}
          </motion.p>
          
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <NewsletterForm
              email={email}
              setEmail={setEmail}
              status={status}
              errorMessage={errorMessage}
              handleSubmit={handleSubmit}
              ctaText={ctaText}
              variant={variant}
            />
          </motion.div>
          
          {/* Benefits (optional) */}
          {benefits && benefits.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-2 gap-4 max-w-lg mx-auto"
            >
              {(benefits || defaultBenefits).map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-left">
                  <FiCheck className="text-gold flex-shrink-0" size={14} />
                  <span className="text-sm text-platinum font-cormorant italic">
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════
// NEWSLETTER FORM SUB-COMPONENT
// Reusable form used across variants
// ═══════════════════════════════════════════════════════════════
const NewsletterForm = ({ 
  email, 
  setEmail, 
  status, 
  errorMessage, 
  handleSubmit, 
  ctaText = 'Subscribe',
  variant = 'default',
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <AnimatePresence mode="wait">
        
        {/* IDLE / LOADING STATE */}
        {(status === 'idle' || status === 'loading' || status === 'error') && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status === 'loading'}
                className={`w-full py-4 pr-36 bg-transparent border-b transition-colors duration-400 font-cormorant text-lg placeholder:text-silver placeholder:text-sm placeholder:tracking-wider ${
                  status === 'error' 
                    ? 'border-red-500/50 text-ivory' 
                    : variant === 'light'
                    ? 'border-noir/30 text-noir focus:border-gold'
                    : 'border-silver/30 text-ivory focus:border-gold'
                }`}
                data-cursor="text"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`absolute right-0 top-1/2 -translate-y-1/2 py-2 flex items-center gap-2 text-tiny tracking-mega uppercase transition-colors duration-400 disabled:opacity-40 ${
                  variant === 'light' 
                    ? 'text-noir hover:text-gold' 
                    : 'text-ivory hover:text-gold'
                }`}
                style={{ fontSize: '0.7rem' }}
                data-cursor="hover"
              >
                <span>
                  {status === 'loading' ? 'Sending...' : ctaText}
                </span>
                {status !== 'loading' && (
                  <FiArrowRight 
                    size={14} 
                    className="transition-transform duration-400 group-hover:translate-x-1" 
                  />
                )}
              </button>
            </div>
            
            {/* Error Message */}
            {status === 'error' && errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-tiny text-red-400"
                style={{ fontSize: '0.75rem' }}
              >
                {errorMessage}
              </motion.p>
            )}
            
            {/* Privacy note */}
            <p 
              className={`text-tiny mt-6 tracking-wider ${variant === 'light' ? 'text-charcoal/60' : 'text-silver'}`}
              style={{ fontSize: '0.7rem' }}
            >
              By subscribing, you agree to our Privacy Policy
            </p>
          </motion.div>
        )}
        
        {/* SUCCESS STATE */}
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold mb-4"
            >
              <FiCheck className="text-noir" size={28} />
            </motion.div>
            
            <p className={`font-cormorant italic text-xl md:text-2xl mb-2 ${variant === 'light' ? 'text-gold' : 'text-gold'}`}>
              Welcome to the MAISON world
            </p>
            <p className={`text-sm ${variant === 'light' ? 'text-charcoal' : 'text-silver'}`}>
              Your invitation has been received
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

export default Newsletter