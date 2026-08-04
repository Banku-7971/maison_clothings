import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingBag, 
  FiMenu, 
  FiX,
  FiUser,
  FiChevronRight,
} from 'react-icons/fi'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import useUIStore from '../store/uiStore'

// ═══════════════════════════════════════════════════════════════
// MAISON — PREMIUM NAVIGATION
// ═══════════════════════════════════════════════════════════════
// The persistent navigation across every page.
// Adapts to scroll position, page context, and device.
//
// Features:
// - Announcement bar with rotating messages
// - Logo (Cormorant serif, letter-spaced)
// - Desktop nav links with underline hover
// - Mobile hamburger with slide-in menu
// - Search icon → opens search modal
// - Wishlist icon with count badge
// - Cart icon with count badge
// - Auto-hide on scroll down (shows on scroll up)
// - Transparent on hero, solid on scroll
// - Mega menu on Shop hover (desktop)
// - Active route highlighting
// - Smooth animations throughout
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// NAVIGATION ITEMS
// ─────────────────────────────────────────
const NAV_LINKS = [
  { name: 'Shop', path: '/shop', hasMegaMenu: true },
  { name: 'Collections', path: '/shop', hasMegaMenu: false },
  { name: 'Story', path: '/about', hasMegaMenu: false },
  { name: 'Contact', path: '/contact', hasMegaMenu: false },
]

// ─────────────────────────────────────────
// ANNOUNCEMENT MESSAGES (Rotating)
// ─────────────────────────────────────────
const ANNOUNCEMENTS = [
  'Complimentary shipping on orders above $500',
  'New arrivals — Discover the Noir Collection',
  'Handcrafted in Paris • Est. 2025',
  'Free returns within 30 days',
]

// ─────────────────────────────────────────
// MEGA MENU CATEGORIES
// ─────────────────────────────────────────
const MEGA_MENU_ITEMS = {
  categories: [
    { name: 'All Pieces', path: '/shop' },
    { name: 'Outerwear', path: '/shop/outerwear' },
    { name: 'Knitwear', path: '/shop/knitwear' },
    { name: 'Tailoring', path: '/shop/tailoring' },
    { name: 'Shirts', path: '/shop/shirts' },
    { name: 'Trousers', path: '/shop/trousers' },
    { name: 'Dresses', path: '/shop/dresses' },
    { name: 'Accessories', path: '/shop/accessories' },
  ],
  collections: [
    { name: 'Noir Collection', path: '/collection/noir' },
    { name: 'Ivory Essentials', path: '/collection/ivory' },
    { name: 'Atelier Signature', path: '/collection/atelier' },
    { name: 'Archive Edition', path: '/collection/archive' },
  ],
  featured: {
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=90',
    title: 'Noir Collection',
    subtitle: 'Fall/Winter 2025',
    path: '/collection/noir',
  },
}


const Navbar = () => {
  const location = useLocation()
  
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // ─────────────────────────────────────────
  // STORE STATE
  // ─────────────────────────────────────────
  const cartItemCount = useCartStore(state => state.getItemCount())
  const wishlistCount = useWishlistStore(state => state.getCount())
  const openCart = useCartStore(state => state.openCart)
  const openSearch = useUIStore(state => state.openSearch)
  
  // ═══════════════════════════════════════════
  // SCROLL BEHAVIOR
  // ═══════════════════════════════════════════
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Set scrolled state (for background)
      setScrolled(currentScrollY > 50)
      
      // Auto-hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  // ═══════════════════════════════════════════
  // ANNOUNCEMENT ROTATION
  // ═══════════════════════════════════════════
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % ANNOUNCEMENTS.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  // ═══════════════════════════════════════════
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // ═══════════════════════════════════════════
  useEffect(() => {
    setMobileMenuOpen(false)
    setMegaMenuOpen(false)
  }, [location.pathname])
  
  // ═══════════════════════════════════════════
  // PREVENT SCROLL WHEN MOBILE MENU OPEN
  // ═══════════════════════════════════════════
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])
  
  return (
    <>
      {/* ═══════════════════════════════════════
          ANNOUNCEMENT BAR
      ═══════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-noir border-b border-graphite h-8 overflow-hidden">
        <div className="h-full flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={announcementIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-tiny tracking-mega text-silver uppercase text-center whitespace-nowrap"
              style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
            >
              {ANNOUNCEMENTS[announcementIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      
      {/* ═══════════════════════════════════════
          MAIN NAVIGATION
      ═══════════════════════════════════════ */}
      <motion.nav
        className={`
          fixed left-0 right-0 z-50 
          transition-all duration-500 ease-luxury
          ${scrolled 
            ? 'bg-noir/90 backdrop-blur-luxury border-b border-graphite/50' 
            : 'bg-transparent'
          }
        `}
        style={{ top: '32px' }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* ─────────────────────────────────
                MOBILE MENU BUTTON
            ───────────────────────────────── */}
            <button
              className="lg:hidden w-8 h-8 flex items-center justify-center text-ivory"
              onClick={() => setMobileMenuOpen(true)}
              data-cursor="hover"
              aria-label="Open menu"
            >
              <FiMenu size={20} />
            </button>
            
            {/* ─────────────────────────────────
                DESKTOP NAV LINKS (LEFT)
            ───────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasMegaMenu && setMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMegaMenu && setMegaMenuOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`
                      relative py-2 text-tiny tracking-mega uppercase 
                      transition-colors duration-400
                      ${location.pathname === link.path 
                        ? 'text-gold' 
                        : 'text-ivory hover:text-gold'
                      }
                    `}
                    style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}
                    data-cursor="hover"
                  >
                    {link.name}
                    <span 
                      className={`
                        absolute bottom-0 left-0 h-px bg-gold 
                        transition-all duration-500 ease-luxury
                        ${location.pathname === link.path ? 'w-full' : 'w-0'}
                      `} 
                    />
                  </Link>
                </div>
              ))}
            </div>
            
            {/* ─────────────────────────────────
                LOGO (CENTER)
            ───────────────────────────────── */}
            <Link
              to="/"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              data-cursor="hover"
              aria-label="MAISON Home"
            >
              <span 
                className="font-cormorant font-light text-ivory pl-2"
                style={{ 
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  letterSpacing: '0.5em',
                }}
              >
                MAISON
              </span>
            </Link>
            
            {/* ─────────────────────────────────
                ACTION ICONS (RIGHT)
            ───────────────────────────────── */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* Search */}
              <button
                onClick={openSearch}
                className="w-8 h-8 flex items-center justify-center text-ivory hover:text-gold transition-colors duration-400"
                data-cursor="hover"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
              
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-8 h-8 flex items-center justify-center text-ivory hover:text-gold transition-colors duration-400"
                data-cursor="hover"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <FiHeart size={18} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center bg-gold text-noir text-[9px] font-medium rounded-full"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>
              
              {/* Cart */}
              <button
                onClick={openCart}
                className="relative w-8 h-8 flex items-center justify-center text-ivory hover:text-gold transition-colors duration-400"
                data-cursor="hover"
                aria-label={`Cart (${cartItemCount})`}
              >
                <FiShoppingBag size={18} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center bg-gold text-noir text-[9px] font-medium rounded-full"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>
              
            </div>
          </div>
        </div>
        
        {/* ═══════════════════════════════════════
            MEGA MENU (Desktop only)
        ═══════════════════════════════════════ */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-noir/95 backdrop-blur-luxury border-b border-graphite/50"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="container-luxury py-12">
                <div className="grid grid-cols-3 gap-16">
                  
                  {/* Categories Column */}
                  <div>
                    <p className="text-tiny tracking-mega text-gold uppercase mb-6" style={{ fontSize: '0.65rem' }}>
                      Categories
                    </p>
                    <ul className="space-y-3">
                      {MEGA_MENU_ITEMS.categories.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="text-sm text-ivory hover:text-gold transition-colors duration-400 font-cormorant font-light"
                            style={{ fontSize: '1.1rem' }}
                            data-cursor="hover"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Collections Column */}
                  <div>
                    <p className="text-tiny tracking-mega text-gold uppercase mb-6" style={{ fontSize: '0.65rem' }}>
                      Collections
                    </p>
                    <ul className="space-y-3">
                      {MEGA_MENU_ITEMS.collections.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="text-sm text-ivory hover:text-gold transition-colors duration-400 font-cormorant font-light"
                            style={{ fontSize: '1.1rem' }}
                            data-cursor="hover"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Featured Image */}
                  <Link
                    to={MEGA_MENU_ITEMS.featured.path}
                    className="relative group overflow-hidden aspect-portrait"
                    data-cursor="view"
                  >
                    <img
                      src={MEGA_MENU_ITEMS.featured.image}
                      alt={MEGA_MENU_ITEMS.featured.title}
                      className="w-full h-full object-cover transition-transform duration-1200 ease-luxury group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-tiny tracking-mega text-gold uppercase mb-2" style={{ fontSize: '0.65rem' }}>
                        {MEGA_MENU_ITEMS.featured.subtitle}
                      </p>
                      <h3 className="font-cormorant text-2xl text-ivory">
                        {MEGA_MENU_ITEMS.featured.title}
                      </h3>
                    </div>
                  </Link>
                  
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* ═══════════════════════════════════════
          MOBILE MENU
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-noir/60 backdrop-blur-sm z-[70]"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-noir z-[80] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-graphite">
                <span 
                  className="font-cormorant font-light text-ivory pl-1"
                  style={{ letterSpacing: '0.4em', fontSize: '1.25rem' }}
                >
                  MAISON
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-ivory"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                    >
                      <Link
                        to={link.path}
                        className="flex items-center justify-between py-4 border-b border-graphite/50 group"
                      >
                        <span className="font-cormorant text-3xl text-ivory group-hover:text-gold transition-colors duration-400">
                          {link.name}
                        </span>
                        <FiChevronRight 
                          className="text-silver group-hover:text-gold transition-all duration-400 group-hover:translate-x-2" 
                          size={20} 
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Categories in Mobile */}
                <div className="mt-12">
                  <p className="text-tiny tracking-mega text-gold uppercase mb-6" style={{ fontSize: '0.65rem' }}>
                    Shop by Category
                  </p>
                  <ul className="space-y-3">
                    {MEGA_MENU_ITEMS.categories.slice(1).map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.4 + index * 0.05,
                        }}
                      >
                        <Link
                          to={item.path}
                          className="text-sm text-platinum hover:text-gold transition-colors duration-400"
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-graphite">
                <p className="text-tiny tracking-mega text-silver uppercase mb-2" style={{ fontSize: '0.6rem' }}>
                  Contact
                </p>
                <a 
                  href="mailto:atelier@maison.com" 
                  className="text-sm text-ivory hover:text-gold transition-colors"
                >
                  atelier@maison.com
                </a>
                <div className="mt-6 flex gap-4">
                  <a href="#" className="text-xs text-silver hover:text-gold uppercase tracking-widest">Instagram</a>
                  <a href="#" className="text-xs text-silver hover:text-gold uppercase tracking-widest">Pinterest</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar