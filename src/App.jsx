import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — ROOT APPLICATION COMPONENT
// ═══════════════════════════════════════════════════════════════
// The gateway to ultra-premium luxury.
// Every route, every transition, every micro-interaction
// has been meticulously crafted for the discerning few.
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// CINEMATIC LAYER COMPONENTS
// These wrap around everything for the premium feel
// ─────────────────────────────────────────
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import NoiseOverlay from './components/NoiseOverlay'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import SmoothScroll from './components/SmoothScroll'

// ─────────────────────────────────────────
// LAYOUT COMPONENTS
// Persistent across all pages
// ─────────────────────────────────────────
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchModal from './components/SearchModal'

// ─────────────────────────────────────────
// LAZY-LOADED PAGES
// Code splitting for optimal performance
// Each page loads only when navigated to
// ─────────────────────────────────────────
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Contact = lazy(() => import('./pages/Contact'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const NotFound = lazy(() => import('./pages/NotFound'))


// ═══════════════════════════════════════════════════════════════
// PAGE FALLBACK LOADER
// Shown during lazy-load fetching
// ═══════════════════════════════════════════════════════════════
const PageLoader = () => {
  return (
    <div className="min-h-screen bg-noir flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-6"
      >
        {/* Animated Progress Line */}
        <div className="w-24 h-px bg-graphite overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
        
        {/* Loading Text */}
        <motion.p 
          className="text-tiny tracking-mega text-silver uppercase font-mono"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Curating
        </motion.p>
      </motion.div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════
// SCROLL TO TOP ON ROUTE CHANGE
// Ensures each page starts at the top
// ═══════════════════════════════════════════════════════════════
const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])
  
  return null
}


// ═══════════════════════════════════════════════════════════════
// ANIMATED ROUTES WITH PAGE TRANSITIONS
// Wraps each page in transition animation
// ═══════════════════════════════════════════════════════════════
const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Shop — All Products */}
        <Route
          path="/shop"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Shop />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Shop by Category */}
        <Route
          path="/shop/:category"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Shop />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Shop by Collection */}
        <Route
          path="/collection/:collectionId"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Shop />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Product Detail */}
        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <ProductDetail />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* About / Brand Story */}
        <Route
          path="/about"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Cart */}
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Cart />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Checkout />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Wishlist />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* Contact / Atelier */}
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            </PageTransition>
          }
        />
        
        {/* 404 — Not Found */}
        <Route
          path="*"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}


// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════
function App() {
  // ─────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [isReady, setIsReady] = useState(false)
  
  // ─────────────────────────────────────────
  // INITIAL LOAD HANDLER
  // Shows cinematic loading screen on first visit
  // Uses sessionStorage to skip on subsequent navigation
  // ─────────────────────────────────────────
  useEffect(() => {
    const visited = sessionStorage.getItem('maison_visited')
    
    if (visited) {
      // Skip loading screen if user already visited
      setIsFirstVisit(false)
      setIsLoading(false)
      setIsReady(true)
    } else {
      // Show 3.5-second cinematic loading screen
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('maison_visited', 'true')
        
        // Allow a brief moment before mounting main app
        setTimeout(() => {
          setIsReady(true)
        }, 100)
      }, 3500)
      
      return () => clearTimeout(timer)
    }
  }, [])
  
  // ─────────────────────────────────────────
  // PREVENT SCROLL DURING LOADING
  // Keeps user in place during intro
  // ─────────────────────────────────────────
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isLoading])
  
  // ─────────────────────────────────────────
  // KEYBOARD SHORTCUTS
  // ESC to close modals, etc.
  // ─────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Add global keyboard shortcuts here
      if (e.key === 'Escape') {
        // Close modals, drawers, etc.
        // Handled by individual components
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  // ─────────────────────────────────────────
  // WINDOW RESIZE HANDLER
  // Update viewport variables for mobile
  // ─────────────────────────────────────────
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    window.addEventListener('orientationchange', setViewportHeight)
    
    return () => {
      window.removeEventListener('resize', setViewportHeight)
      window.removeEventListener('orientationchange', setViewportHeight)
    }
  }, [])
  
  // ─────────────────────────────────────────
  // TIME-BASED GREETING (Premium Touch)
  // Logs a greeting based on visitor's time
  // ─────────────────────────────────────────
  useEffect(() => {
    const hour = new Date().getHours()
    let greeting = 'Welcome'
    
    if (hour < 12) greeting = 'Good morning'
    else if (hour < 18) greeting = 'Good afternoon'
    else if (hour < 22) greeting = 'Good evening'
    else greeting = 'Bonne nuit'
    
    if (isFirstVisit && !isLoading) {
      console.log(
        `%c ${greeting}, connoisseur. `,
        'color: #C9A96E; font-family: Georgia, serif; font-style: italic; font-size: 14px; letter-spacing: 0.2em; padding: 8px 0;'
      )
    }
  }, [isFirstVisit, isLoading])
  
  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <>
      {/* ═══════════════════════════════════════
          CINEMATIC LOADING SCREEN
          Only shown on first visit
      ═══════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {/* ═══════════════════════════════════════
          MAIN APPLICATION
          Rendered after loading completes
      ═══════════════════════════════════════ */}
      {isReady && (
        <>
          {/* Custom Cursor (hidden on touch devices) */}
          <CustomCursor />
          
          {/* Film Grain Overlay (cinematic effect) */}
          <NoiseOverlay />
          
          {/* Scroll Progress Bar (top of viewport) */}
          <ScrollProgress />
          
          {/* Smooth Scroll Wrapper (Lenis-style) */}
          <SmoothScroll>
            {/* Scroll Reset on Route Change */}
            <ScrollToTop />
            
            {/* Persistent Navigation */}
            <Navbar />
            
            {/* Cart Drawer (Slide-in from right) */}
            <CartDrawer />
            
            {/* Search Modal (Full-screen overlay) */}
            <SearchModal />
            
            {/* Main Page Content with Route Transitions */}
            <main className="relative min-h-screen">
              <AnimatedRoutes />
            </main>
            
            {/* Persistent Footer */}
            <Footer />
          </SmoothScroll>
        </>
      )}
    </>
  )
}

export default App