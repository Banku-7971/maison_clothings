import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import NoiseOverlay from './components/NoiseOverlay'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import SmoothScroll from './components/SmoothScroll'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchModal from './components/SearchModal'

const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Contact = lazy(() => import('./pages/Contact'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const NotFound = lazy(() => import('./pages/NotFound'))


const PageLoader = () => (
  <div className="min-h-screen bg-noir flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-6"
    >
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


const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  
  return null
}


const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Suspense fallback={<PageLoader />}><Home /></Suspense></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Suspense fallback={<PageLoader />}><Shop /></Suspense></PageTransition>} />
        <Route path="/shop/:category" element={<PageTransition><Suspense fallback={<PageLoader />}><Shop /></Suspense></PageTransition>} />
        <Route path="/collection/:collectionId" element={<PageTransition><Suspense fallback={<PageLoader />}><Shop /></Suspense></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><Suspense fallback={<PageLoader />}><ProductDetail /></Suspense></PageTransition>} />
        <Route path="/about" element={<PageTransition><Suspense fallback={<PageLoader />}><About /></Suspense></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Suspense fallback={<PageLoader />}><Cart /></Suspense></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Suspense fallback={<PageLoader />}><Checkout /></Suspense></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><Suspense fallback={<PageLoader />}><Wishlist /></Suspense></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Suspense fallback={<PageLoader />}><Contact /></Suspense></PageTransition>} />
        <Route path="*" element={<PageTransition><Suspense fallback={<PageLoader />}><NotFound /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  
  const LOADING_DURATION = 4500  // ⏱️ MUST MATCH LoadingScreen!
  
  useEffect(() => {
    const visited = sessionStorage.getItem('maison_visited')
    
    if (visited) {
      setIsLoading(false)
      setIsReady(true)
    } else {
      // Regular timer
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('maison_visited', 'true')
        setTimeout(() => setIsReady(true), 100)
      }, LOADING_DURATION)
      
      // Skip button handler
      const handleSkip = () => {
        clearTimeout(timer)
        setIsLoading(false)
        sessionStorage.setItem('maison_visited', 'true')
        setTimeout(() => setIsReady(true), 100)
      }
      
      window.addEventListener('skipLoading', handleSkip)
      
      return () => {
        clearTimeout(timer)
        window.removeEventListener('skipLoading', handleSkip)
      }
    }
  }, [])
  
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
  
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {isReady && (
        <>
          <CustomCursor />
          <NoiseOverlay />
          <ScrollProgress />
          
          <SmoothScroll>
            <ScrollToTop />
            <Navbar />
            <CartDrawer />
            <SearchModal />
            <main className="relative min-h-screen">
              <AnimatedRoutes />
            </main>
            <Footer />
          </SmoothScroll>
        </>
      )}
    </>
  )
}

export default App