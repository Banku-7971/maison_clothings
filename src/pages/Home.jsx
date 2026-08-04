import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'

// ═══════════════════════════════════════════════════════════════
// MAISON — HOMEPAGE (HERO ONLY)
// ═══════════════════════════════════════════════════════════════
// Landing page for the website.
// Shows ONLY:
// - Hero section (with buttons)
// - Footer (rendered from App.jsx)
//
// User must click buttons or navbar to see:
// - /shop = All products
// - /about = Brand story
// - /contact = Contact form
// - /cart = Shopping cart
// - /wishlist = Saved items
// ═══════════════════════════════════════════════════════════════

const Home = () => {
  
  useEffect(() => {
    document.title = 'MAISON — Where Craftsmanship Meets Couture'
    return () => {
      document.title = 'MAISON'
    }
  }, [])
  
  return (
    <div className="bg-noir">
      <HeroSection />
    </div>
  )
}

export default Home