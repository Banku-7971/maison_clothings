import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock,
  FiInstagram,
  FiCheck,
  FiArrowRight,
  FiCalendar,
} from 'react-icons/fi'
import Newsletter from '../components/Newsletter'
import useUIStore from '../store/uiStore'
import { isValidEmail } from '../utils/formatters'

// ═══════════════════════════════════════════════════════════════
// MAISON INDIA — CONTACT PAGE (Kolkata Atelier)
// ═══════════════════════════════════════════════════════════════

const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'order', label: 'Order Assistance' },
  { value: 'appointment', label: 'Book Appointment' },
  { value: 'press', label: 'Press & Media' },
  { value: 'wholesale', label: 'Wholesale & Partnerships' },
  { value: 'careers', label: 'Careers' },
  { value: 'other', label: 'Other' },
]

const HOURS = [
  { day: 'Monday — Saturday', time: '11:00 — 21:00' },
  { day: 'Sunday', time: '12:00 — 20:00' },
]


const Contact = () => {
  const showToast = useUIStore(state => state.showToast)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })
  
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  
  useEffect(() => {
    document.title = 'Contact — MAISON'
    return () => { document.title = 'MAISON' }
  }, [])
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }
  
  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email address'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.length < 10) newErrors.message = 'Message too short (min 10 characters)'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      showToast({ type: 'error', message: 'Please fill all required fields' })
      return
    }
    
    setStatus('sending')
    await new Promise(resolve => setTimeout(resolve, 2000))
    setStatus('success')
    
    setTimeout(() => {
      setStatus('idle')
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' })
    }, 5000)
  }
  
  return (
    <div className="bg-noir min-h-screen">
      
      {/* HERO */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-24 border-b border-graphite/30">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-6"
              style={{ fontSize: '0.7rem' }}
            >
              — Correspondence
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cormorant font-light text-ivory mb-8"
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Reach the<br />
              <em className="italic text-gold">atelier.</em>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-cormorant italic text-platinum text-lg md:text-2xl max-w-2xl leading-relaxed"
            >
              We are here to answer your questions, share stories, 
              and welcome you into the world of MAISON.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* MAIN CONTENT */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* LEFT: KOLKATA INFO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              
              {/* ATELIER */}
              <div>
                <p className="text-tiny tracking-mega text-gold uppercase mb-4" style={{ fontSize: '0.7rem' }}>
                  — The Atelier
                </p>
                <h2 className="font-cormorant text-2xl md:text-3xl text-ivory mb-6">
                  Visit us in Kolkata
                </h2>
                
                <div className="space-y-4">
                  {/* ADDRESS */}
                  <div className="flex gap-4">
                    <FiMapPin className="text-gold flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="font-cormorant text-ivory text-base leading-relaxed">
                        Maison Atelier<br />
                        24 Park Street<br />
                        Kolkata, West Bengal<br />
                        700016, India
                      </p>
                    </div>
                  </div>
                  
                  {/* PHONE */}
                  <a
                    href="tel:+919876543210"
                    className="flex gap-4 group"
                    data-cursor="hover"
                  >
                    <FiPhone className="text-gold flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="font-cormorant text-ivory text-base group-hover:text-gold transition-colors">
                        +91 98765 43210
                      </p>
                    </div>
                  </a>
                  
                  {/* EMAIL */}
                  <a
                    href="mailto:atelier@maison.com"
                    className="flex gap-4 group"
                    data-cursor="hover"
                  >
                    <FiMail className="text-gold flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="font-cormorant text-ivory text-base group-hover:text-gold transition-colors">
                        atelier@maison.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* HOURS */}
              <div className="pt-8 border-t border-graphite/30">
                <div className="flex items-center gap-2 mb-6">
                  <FiClock className="text-gold" size={14} />
                  <p className="text-tiny tracking-mega text-ivory uppercase" style={{ fontSize: '0.7rem' }}>
                    Opening Hours (IST)
                  </p>
                </div>
                
                <div className="space-y-3">
                  {HOURS.map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline">
                      <span className="text-sm text-platinum font-cormorant">
                        {item.day}
                      </span>
                      <span className="text-sm text-ivory font-cormorant italic">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* SHIPPING */}
              <div className="pt-8 border-t border-graphite/30">
                <p className="text-tiny tracking-mega text-gold uppercase mb-4" style={{ fontSize: '0.7rem' }}>
                  — Delivery
                </p>
                <p className="font-cormorant italic text-platinum text-base leading-relaxed mb-4">
                  We ship pan-India from our Kolkata atelier. 
                  Free shipping on all orders above ₹5,000.
                </p>
                <p className="text-sm text-silver">
                  Standard: 5-7 business days<br />
                  Express: 2-3 business days
                </p>
              </div>
              
              {/* CLIENT CARE */}
              <div className="pt-8 border-t border-graphite/30">
                <p className="text-tiny tracking-mega text-gold uppercase mb-4" style={{ fontSize: '0.7rem' }}>
                  — Client Care
                </p>
                <p className="font-cormorant italic text-platinum text-base leading-relaxed mb-6">
                  For urgent matters regarding existing orders, 
                  please reach us directly via WhatsApp or email during atelier hours.
                </p>
                
                <a
                  href="mailto:care@maison.com"
                  className="inline-flex items-center gap-2 text-tiny tracking-mega text-gold uppercase link-luxury"
                  style={{ fontSize: '0.7rem' }}
                  data-cursor="hover"
                >
                  <FiMail size={12} />
                  care@maison.com
                </a>
              </div>
              
              {/* SOCIAL */}
              <div className="pt-8 border-t border-graphite/30">
                <p className="text-tiny tracking-mega text-gold uppercase mb-4" style={{ fontSize: '0.7rem' }}>
                  — Follow The Journey
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/maison"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-11 h-11 flex items-center justify-center border border-graphite text-ivory hover:bg-gold hover:border-gold hover:text-noir transition-all duration-400 rounded-full"
                    data-cursor="hover"
                  >
                    <FiInstagram size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* RIGHT: FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-charcoal border border-gold/30 p-12 md:p-16 text-center rounded-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold flex items-center justify-center"
                    >
                      <FiCheck className="text-noir" size={32} strokeWidth={2.5} />
                    </motion.div>
                    
                    <h3 className="font-cormorant text-3xl md:text-4xl text-ivory mb-4">
                      Message <em className="italic text-gold">received.</em>
                    </h3>
                    
                    <p className="font-cormorant italic text-platinum text-lg leading-relaxed mb-6 max-w-md mx-auto">
                      Thank you for reaching out. Our team will respond 
                      within 24 hours during atelier hours (IST).
                    </p>
                    
                    <p className="text-tiny tracking-mega text-silver uppercase font-mono" style={{ fontSize: '0.65rem' }}>
                      A confirmation has been sent to {formData.email}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-8">
                      <p className="text-tiny tracking-mega text-gold uppercase mb-4" style={{ fontSize: '0.7rem' }}>
                        — Send a Message
                      </p>
                      <h2 
                        className="font-cormorant font-light text-ivory"
                        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
                      >
                        Tell us <em className="italic text-gold">everything.</em>
                      </h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b transition-colors text-ivory font-cormorant text-base ${errors.name ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.name && (
                            <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>
                              {errors.name}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className={`w-full py-3 bg-transparent border-b transition-colors text-ivory font-cormorant text-base ${errors.email ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                            data-cursor="text"
                          />
                          {errors.email && (
                            <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                            Phone (India) — optional
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full py-3 bg-transparent border-b border-silver/30 focus:border-gold transition-colors text-ivory font-cormorant text-base"
                            data-cursor="text"
                          />
                        </div>
                        
                        <div>
                          <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                            Inquiry Type
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) => updateField('subject', e.target.value)}
                            className="w-full py-3 bg-noir border-b border-silver/30 focus:border-gold transition-colors text-ivory font-cormorant text-base"
                            data-cursor="hover"
                          >
                            {INQUIRY_TYPES.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-tiny tracking-mega text-silver uppercase mb-2 block" style={{ fontSize: '0.65rem' }}>
                          Message *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          rows={6}
                          placeholder="Tell us how we can help..."
                          className={`w-full py-3 bg-transparent border-b resize-none transition-colors text-ivory font-cormorant text-base placeholder:text-silver placeholder:italic ${errors.message ? 'border-red-500/50' : 'border-silver/30 focus:border-gold'}`}
                          data-cursor="text"
                        />
                        {errors.message && (
                          <p className="mt-1 text-tiny text-red-400" style={{ fontSize: '0.7rem' }}>
                            {errors.message}
                          </p>
                        )}
                        <p className="mt-2 text-tiny text-silver text-right font-mono" style={{ fontSize: '0.65rem' }}>
                          {formData.message.length} characters
                        </p>
                      </div>
                      
                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="group inline-flex items-center gap-3 py-4 px-12 bg-ivory text-noir hover:bg-gold transition-all duration-500 disabled:opacity-60 rounded-full"
                          data-cursor="hover"
                        >
                          <span className="text-tiny tracking-mega uppercase font-medium" style={{ fontSize: '0.75rem' }}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                          </span>
                          {status !== 'sending' && (
                            <FiArrowRight 
                              size={16} 
                              className="transition-transform duration-400 group-hover:translate-x-1" 
                            />
                          )}
                        </button>
                        
                        <p className="mt-6 text-tiny text-silver italic font-cormorant" style={{ fontSize: '0.75rem' }}>
                          We respond within 24 hours during atelier hours (Mon–Sat, IST).
                        </p>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* BOOK APPOINTMENT CTA */}
      <section className="py-24 md:py-32 border-y border-graphite/30 bg-charcoal/30">
        <div className="container-luxury text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-tiny tracking-mega text-gold uppercase mb-6"
            style={{ fontSize: '0.7rem' }}
          >
            — Private Experience
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cormorant font-light text-ivory mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1 }}
          >
            Book a private<br />
            <em className="italic text-gold">appointment.</em>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant italic text-platinum text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Experience MAISON in our Kolkata atelier on Park Street. 
            Meet the artisans. Try pieces from the collection. 
            Discover fabrics before they exist in stores.
          </motion.p>
          
          <motion.a
            href="mailto:appointments@maison.com"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group inline-flex items-center gap-4 py-4 px-12 bg-gold text-noir hover:bg-ivory transition-all duration-500 rounded-full shadow-warm-lg"
            data-cursor="hover"
          >
            <FiCalendar size={14} />
            <span className="text-tiny tracking-mega uppercase font-semibold" style={{ fontSize: '0.75rem' }}>
              Request Appointment
            </span>
          </motion.a>
        </div>
      </section>
      
      <Newsletter variant="default" />
    </div>
  )
}

export default Contact