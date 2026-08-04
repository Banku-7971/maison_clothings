import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingBag, 
  FiMenu, 
  FiX,
  FiChevronRight,
} from 'react-icons/fi'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import useUIStore from '../store/uiStore'

// ═══════════════════════════════════════════════════════════════
// MAISON — NAVIGATION (FIXED SPACING)
// ═══════════════════════════════════════════════════════════════

const NAV_LINKS = [
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/shop' },
  { name: 'Story', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const ANNOUNCEMENTS = [
  'Complimentary shipping on orders above $500',
  'New arrivals — Discover the Noir Collection',
  'Handcrafted in Paris • Est. 2025',
  'Free returns within 30 days',
]

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
}


const Navbar = () => {
  const location = useLocation()
  
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const cartItemCount = useCartStore(state => state.getItemCount())
  const wishlistCount = useWishlistStore(state => state.getCount())
  const openCart = useCartStore(state => state.openCart)
  const openSearch = useUIStore(state => state.openSearch)
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % ANNOUNCEMENTS.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])
  
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
      {/* ANNOUNCEMENT BAR */}
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
      
      {/* MAIN NAVIGATION — FIXED SPACING! */}
      <motion.nav
        className={`
          fixed left-0 right-0 z-50 
          transition-all duration-500 ease-luxury
          ${scrolled 
            ? 'bg-noir/95 backdrop-blur-luxury border-b border-graphite/50' 
            : 'bg-noir/40 backdrop-blur-sm'
          }
        `}
        style={{ top: '32px' }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-luxury">
          {/* GRID LAYOUT prevents overlap */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 md:h-20 gap-4">
            
            {/* LEFT: Mobile Menu OR Desktop Nav Links */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center text-ivory rounded-full hover:bg-graphite/50 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                data-cursor="hover"
                aria-label="Open menu"
              >
                <FiMenu size={20} />
              </button>
              
              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
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
                ))}
              </div>
            </div>
            
            {/* CENTER: LOGO — Own column, always centered */}
            <div className="flex items-center justify-center">
              <Link
                to="/"
                data-cursor="hover"
                aria-label="MAISON Home"
              >
                <span 
                  className="font-cormorant font-light text-ivory block"
                  style={{ 
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                    letterSpacing: '0.4em',
                    paddingLeft: '0.4em',
                  }}
                >
                  MAISON
                </span>
              </Link>
            </div>
            
            {/* RIGHT: Action Icons — Own column */}
            <div className="flex items-center gap-1 md:gap-2">
              
              {/* Search */}
              <button
                onClick={openSearch}
                className="w-10 h-10 flex items-center justify-center text-ivory hover:text-gold hover:bg-graphite/50 rounded-full transition-all duration-400"
                data-cursor="hover"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
              
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-10 h-10 flex items-center justify-center text-ivory hover:text-gold hover:bg-graphite/50 rounded-full transition-all duration-400"
                data-cursor="hover"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <FiHeart size={18} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-gold text-noir text-[9px] font-semibold rounded-full"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>
              
              {/* Cart */}
              <button
                onClick={openCart}
                className="relative w-10 h-10 flex items-center justify-center text-ivory hover:text-gold hover:bg-graphite/50 rounded-full transition-all duration-400"
                data-cursor="hover"
                aria-label={`Cart (${cartItemCount})`}
              >
                <FiShoppingBag size={18} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-gold text-noir text-[9px] font-semibold rounded-full"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>
              
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-noir/60 backdrop-blur-sm z-[70]"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-noir z-[80] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-graphite">
                <span 
                  className="font-cormorant font-light text-ivory"
                  style={{ letterSpacing: '0.4em', fontSize: '1.25rem', paddingLeft: '0.4em' }}
                >
                  MAISON
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-ivory hover:bg-graphite/50 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>
              
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