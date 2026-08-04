import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'

// ═══════════════════════════════════════════════════════════════
// MAISON — HOMEPAGE (HERO ONLY!)
// Just hero + footer (from App.jsx)
// Users click buttons to go to /shop, /about, etc.
// ═══════════════════════════════════════════════════════════════

const Home = () => {
  useEffect(() => {
    document.title = 'MAISON — Where Craftsmanship Meets Couture'
    return () => { document.title = 'MAISON' }
  }, [])
  
  return (
    <div className="bg-noir">
      <HeroSection />
    </div>
  )
}

export default Home