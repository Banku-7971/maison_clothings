import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiInstagram, 
  FiTwitter, 
  FiFacebook,
  FiYoutube,
  FiArrowUpRight,
  FiArrowUp,
  FiMail,
  FiMapPin,
  FiPhone,
  FiChevronDown,
} from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — THE FOOTER
// ═══════════════════════════════════════════════════════════════
// The final impression. The lasting statement.
// Every luxury site ends with obsession — this is ours.
//
// Sections:
// - Newsletter signup with elegant form
// - Massive brand name display (visual anchor)
// - 4 organized link columns
// - Contact information
// - Social media links
// - Language & currency selectors
// - Payment methods display
// - Copyright bar
// - Back to top button
// - Legal links
// - Craftsmanship note
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// FOOTER LINK COLUMNS
// ─────────────────────────────────────────
const FOOTER_LINKS = {
  shop: {
    title: 'Shop',
    links: [
      { name: 'All Pieces', path: '/shop' },
      { name: 'New Arrivals', path: '/shop?filter=new' },
      { name: 'Bestsellers', path: '/shop?filter=bestsellers' },
      { name: 'Outerwear', path: '/shop/outerwear' },
      { name: 'Knitwear', path: '/shop/knitwear' },
      { name: 'Tailoring', path: '/shop/tailoring' },
      { name: 'Accessories', path: '/shop/accessories' },
      { name: 'Gift Cards', path: '/gift-cards' },
    ],
  },
  maison: {
    title: 'Maison',
    links: [
      { name: 'Our Story', path: '/about' },
      { name: 'The Atelier', path: '/about#atelier' },
      { name: 'Craftsmanship', path: '/about#craft' },
      { name: 'Sustainability', path: '/about#sustainability' },
      { name: 'Collections', path: '/collections' },
      { name: 'The Journal', path: '/journal' },
      { name: 'Press', path: '/press' },
      { name: 'Careers', path: '/careers' },
    ],
  },
  services: {
    title: 'Services',
    links: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Client Care', path: '/contact#care' },
      { name: 'Personal Styling', path: '/services/styling' },
      { name: 'Made to Measure', path: '/services/measure' },
      { name: 'Alterations', path: '/services/alterations' },
      { name: 'Repair Service', path: '/services/repair' },
      { name: 'Book Appointment', path: '/contact#appointment' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
  legal: {
    title: 'Information',
    links: [
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'Care Guide', path: '/care-guide' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
    ],
  },
}

// ─────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────
const SOCIAL_LINKS = [
  { name: 'Instagram', icon: FiInstagram, url: 'https://instagram.com/maison' },
  { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com/maison' },
  { name: 'Facebook', icon: FiFacebook, url: 'https://facebook.com/maison' },
  { name: 'YouTube', icon: FiYoutube, url: 'https://youtube.com/@maison' },
]

// ─────────────────────────────────────────
// PAYMENT METHODS
// ─────────────────────────────────────────
const PAYMENT_METHODS = [
  'Visa',
  'Mastercard',
  'American Express',
  'Apple Pay',
  'Google Pay',
  'PayPal',
  'Klarna',
  'Afterpay',
]

// ─────────────────────────────────────────
// LANGUAGES
// ─────────────────────────────────────────
const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'FR', name: 'Français' },
  { code: 'IT', name: 'Italiano' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'ES', name: 'Español' },
  { code: 'JA', name: '日本語' },
]

// ─────────────────────────────────────────
// CURRENCIES
// ─────────────────────────────────────────
const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
]


const Footer = () => {
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedLang, setSelectedLang] = useState('EN')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [langOpen, setLangOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  
  // ─────────────────────────────────────────
  // NEWSLETTER SUBMIT
  // ─────────────────────────────────────────
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubscribed(true)
    setIsSubmitting(false)
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 5000)
  }
  
  // ─────────────────────────────────────────
  // BACK TO TOP BUTTON
  // ─────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // ─────────────────────────────────────────
  // PARIS TIME DISPLAY
  // ─────────────────────────────────────────
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const parisTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setCurrentTime(parisTime)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])
  
  return (
    <footer className="relative bg-noir text-ivory overflow-hidden">
      
      {/* ═══════════════════════════════════════
          NEWSLETTER SECTION
      ═══════════════════════════════════════ */}
      <section className="relative border-b border-graphite/50">
        <div className="container-luxury py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-cormorant font-light text-4xl md:text-6xl lg:text-7xl leading-tight mb-8"
            >
              Join our world of
              <br />
              <em className="italic text-gold">quiet luxury</em>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-platinum text-base md:text-lg font-cormorant italic mb-12 max-w-xl mx-auto leading-relaxed"
            >
              Receive private access to new collections, exclusive events, 
              and stories from the atelier — delivered with intention.
            </motion.p>
            
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto"
            >
              {!isSubscribed ? (
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={isSubmitting}
                    className="w-full py-4 pr-32 bg-transparent border-b border-silver/30 text-ivory placeholder:text-silver placeholder:tracking-wider placeholder:text-sm focus:border-gold transition-colors duration-400 font-cormorant text-lg"
                    data-cursor="text"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-0 top-1/2 -translate-y-1/2 py-2 text-tiny tracking-mega uppercase text-ivory hover:text-gold transition-colors duration-400 disabled:opacity-40"
                    style={{ fontSize: '0.7rem' }}
                    data-cursor="hover"
                  >
                    {isSubmitting ? 'Sending...' : 'Subscribe →'}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6"
                >
                  <p className="text-gold font-cormorant italic text-xl mb-2">
                    Welcome to the MAISON world
                  </p>
                  <p className="text-silver text-sm">
                    Your invitation has been received
                  </p>
                </motion.div>
              )}
              
              <p className="text-tiny text-silver mt-6 tracking-wider" style={{ fontSize: '0.7rem' }}>
                By subscribing, you agree to our{' '}
                <Link to="/privacy" className="text-gold hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          MAIN FOOTER CONTENT
      ═══════════════════════════════════════ */}
      <section className="border-b border-graphite/50">
        <div className="container-luxury py-16 md:py-24">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* ─────────────────────────────────
                BRAND COLUMN (2 cols wide)
            ───────────────────────────────── */}
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="inline-block mb-8" data-cursor="hover">
                <span 
                  className="font-cormorant font-light text-ivory pl-2"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    letterSpacing: '0.5em',
                  }}
                >
                  MAISON
                </span>
              </Link>
              
              <p className="font-cormorant italic text-platinum text-lg leading-relaxed mb-8 max-w-sm">
                Where craftsmanship meets couture. An exclusive maison of 
                ultra-premium clothing crafted for the discerning few.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <a 
                  href="mailto:atelier@maison.com" 
                  className="flex items-center gap-3 text-sm text-platinum hover:text-gold transition-colors duration-400"
                  data-cursor="hover"
                >
                  <FiMail size={14} className="text-gold" />
                  atelier@maison.com
                </a>
                <a 
                  href="tel:+33100000000" 
                  className="flex items-center gap-3 text-sm text-platinum hover:text-gold transition-colors duration-400"
                  data-cursor="hover"
                >
                  <FiPhone size={14} className="text-gold" />
                  +33 (0)1 00 00 00 00
                </a>
                <div className="flex items-center gap-3 text-sm text-platinum">
                  <FiMapPin size={14} className="text-gold" />
                  Rue du Faubourg Saint-Honoré, Paris
                </div>
              </div>
              
              {/* Social */}
              <div>
                <p className="text-tiny tracking-mega text-silver uppercase mb-4" style={{ fontSize: '0.65rem' }}>
                  Follow the Journey
                </p>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="w-10 h-10 flex items-center justify-center border border-graphite/50 text-ivory hover:bg-gold hover:text-noir hover:border-gold transition-all duration-400"
                        data-cursor="hover"
                      >
                        <Icon size={16} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* ─────────────────────────────────
                LINK COLUMNS
            ───────────────────────────────── */}
            {Object.entries(FOOTER_LINKS).map(([key, section]) => (
              <div key={key}>
                <h3 
                  className="text-tiny tracking-mega text-gold uppercase mb-6"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-platinum hover:text-gold transition-colors duration-400 inline-block"
                        data-cursor="hover"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          MASSIVE BRAND DISPLAY
          Signature visual anchor
      ═══════════════════════════════════════ */}
      <section className="border-b border-graphite/50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center py-16 md:py-24"
        >
          <h2 
            className="font-cormorant font-light text-ivory whitespace-nowrap select-none"
            style={{ 
              fontSize: 'clamp(4rem, 20vw, 20rem)',
              letterSpacing: '0.15em',
              lineHeight: 0.9,
              paddingLeft: '0.15em',
            }}
          >
            MAISON
          </h2>
          <p 
            className="font-cormorant italic text-gold mt-4"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.5rem)' }}
          >
            — Where Craftsmanship Meets Couture —
          </p>
        </motion.div>
      </section>
      
      {/* ═══════════════════════════════════════
          UTILITIES BAR
          Language, Currency, Payment
      ═══════════════════════════════════════ */}
      <section className="border-b border-graphite/50">
        <div className="container-luxury py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Language & Currency */}
            <div className="flex items-center gap-6">
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setLangOpen(!langOpen)
                    setCurrencyOpen(false)
                  }}
                  className="flex items-center gap-2 text-tiny tracking-mega text-ivory hover:text-gold transition-colors duration-400 uppercase"
                  style={{ fontSize: '0.7rem' }}
                  data-cursor="hover"
                >
                  <span>{selectedLang}</span>
                  <FiChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 left-0 bg-charcoal border border-graphite py-2 min-w-[140px]"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang.code)
                          setLangOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-noir hover:text-gold transition-colors ${
                          selectedLang === lang.code ? 'text-gold' : 'text-platinum'
                        }`}
                      >
                        {lang.code} — {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setCurrencyOpen(!currencyOpen)
                    setLangOpen(false)
                  }}
                  className="flex items-center gap-2 text-tiny tracking-mega text-ivory hover:text-gold transition-colors duration-400 uppercase"
                  style={{ fontSize: '0.7rem' }}
                  data-cursor="hover"
                >
                  <span>{selectedCurrency}</span>
                  <FiChevronDown size={12} className={`transition-transform duration-300 ${currencyOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 left-0 bg-charcoal border border-graphite py-2 min-w-[120px]"
                  >
                    {CURRENCIES.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code)
                          setCurrencyOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-noir hover:text-gold transition-colors ${
                          selectedCurrency === currency.code ? 'text-gold' : 'text-platinum'
                        }`}
                      >
                        {currency.symbol} {currency.code}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {/* Paris Time */}
              <div className="hidden md:flex items-center gap-2 text-tiny text-silver uppercase tracking-mega font-mono" style={{ fontSize: '0.65rem' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Paris · {currentTime}
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-tiny text-silver uppercase tracking-mega mr-2" style={{ fontSize: '0.65rem' }}>
                Accepted
              </span>
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="text-xs text-platinum border border-graphite/50 px-2 py-1"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}
                >
                  {method}
                </span>
              ))}
            </div>
            
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          COPYRIGHT BAR
      ═══════════════════════════════════════ */}
      <section>
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-tiny text-silver uppercase tracking-mega font-mono" style={{ fontSize: '0.65rem' }}>
              © 2025 MAISON. All rights reserved. Est. Paris.
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/privacy" 
                className="text-tiny text-silver hover:text-gold uppercase tracking-mega transition-colors duration-400"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="text-tiny text-silver hover:text-gold uppercase tracking-mega transition-colors duration-400"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                Terms
              </Link>
              <Link 
                to="/cookies" 
                className="text-tiny text-silver hover:text-gold uppercase tracking-mega transition-colors duration-400"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                Cookies
              </Link>
              <Link 
                to="/accessibility" 
                className="text-tiny text-silver hover:text-gold uppercase tracking-mega transition-colors duration-400"
                style={{ fontSize: '0.65rem' }}
                data-cursor="hover"
              >
                Accessibility
              </Link>
            </div>
            
            {/* Craft Note */}
            <p className="text-tiny text-silver italic font-cormorant" style={{ fontSize: '0.75rem' }}>
              Crafted with obsession.
            </p>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════
          BACK TO TOP BUTTON
      ═══════════════════════════════════════ */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-noir border border-gold text-gold hover:bg-gold hover:text-noir transition-all duration-400 z-40"
          data-cursor="hover"
          aria-label="Back to top"
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
      
    </footer>
  )
}

export default Footer