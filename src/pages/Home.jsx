import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import MarqueeStrip from '../components/MarqueeStrip'
import FeaturedProducts from '../components/FeaturedProducts'
import Skeleton3D from '../components/Skeleton3D'
import CollectionShowcase from '../components/CollectionShowcase'
import VideoCampaign from '../components/VideoCampaign'
import BrandStory from '../components/BrandStory'
import Newsletter from '../components/Newsletter'

// ═══════════════════════════════════════════════════════════════
// MAISON — HOMEPAGE
// ═══════════════════════════════════════════════════════════════
// The grand assembly.
// Every section carefully sequenced for maximum emotional impact.
//
// The Journey:
// 1. HERO — First impression, full cinematic intro
// 2. MARQUEE — Values ticker (breathing space)
// 3. FEATURED PRODUCTS — What we make
// 4. MARQUEE (Editorial) — Poetic pause
// 5. 3D SKELETON — Interactive centerpiece
// 6. COLLECTIONS — Curated worlds
// 7. VIDEO CAMPAIGN — Cinematic film moment
// 8. BRAND STORY — Who we are
// 9. MARQUEE (Bold) — Final punch
// 10. NEWSLETTER — Convert visitors to community
// ═══════════════════════════════════════════════════════════════

const Home = () => {
  
  // ─────────────────────────────────────────
  // DOCUMENT TITLE
  // ─────────────────────────────────────────
  useEffect(() => {
    document.title = 'MAISON — Where Craftsmanship Meets Couture'
    
    // Cleanup on unmount
    return () => {
      document.title = 'MAISON'
    }
  }, [])
  
  return (
    <div className="bg-noir">
      
      {/* ═══════════════════════════════════════
          1. HERO SECTION
          Full-screen cinematic opening
      ═══════════════════════════════════════ */}
      <HeroSection />
      
      {/* ═══════════════════════════════════════
          2. MARQUEE — BRAND VALUES
          Breathing space after hero
      ═══════════════════════════════════════ */}
      <MarqueeStrip
        items={[
          'Handcrafted in Paris',
          'Est. 2025',
          'Master Artisans',
          'Ethical Sourcing',
          'Limited Editions',
          'Timeless Design',
          'Free Shipping Over $500',
          'Complimentary Returns',
        ]}
        speed={50}
        separator="dot"
        variant="default"
        pauseOnHover={true}
      />
      
      {/* ═══════════════════════════════════════
          3. FEATURED PRODUCTS
          The coveted pieces
      ═══════════════════════════════════════ */}
      <FeaturedProducts />
      
      {/* ═══════════════════════════════════════
          4. EDITORIAL MARQUEE
          Poetic pause between sections
      ═══════════════════════════════════════ */}
      <MarqueeStrip
        items={[
          'Where craftsmanship meets couture',
          'Timeless over trending',
          'Made to be worn for decades',
        ]}
        speed={60}
        separator="diamond"
        variant="italic"
        bgColor="bg-charcoal"
        pauseOnHover={true}
      />
      
      {/* ═══════════════════════════════════════
          5. 3D INTERACTIVE SCULPTURE
          The centerpiece experience
      ═══════════════════════════════════════ */}
      <Skeleton3D />
      
      {/* ═══════════════════════════════════════
          6. COLLECTION SHOWCASE
          Editorial collection storytelling
      ═══════════════════════════════════════ */}
      <CollectionShowcase />
      
      {/* ═══════════════════════════════════════
          7. VIDEO CAMPAIGN
          Cinematic film moment
      ═══════════════════════════════════════ */}
      <VideoCampaign />
      
      {/* ═══════════════════════════════════════
          8. BRAND STORY
          Who we are, what we believe
      ═══════════════════════════════════════ */}
      <BrandStory />
      
      {/* ═══════════════════════════════════════
          9. BOLD MARQUEE
          Final punch before newsletter
      ═══════════════════════════════════════ */}
      <MarqueeStrip
        items={[
          'MAISON',
          '2025',
          'Paris',
        ]}
        speed={40}
        separator="star"
        variant="huge"
        borderTop={true}
        borderBottom={true}
      />
      
      {/* ═══════════════════════════════════════
          10. NEWSLETTER
          Convert visitors to community
      ═══════════════════════════════════════ */}
      <Newsletter 
        variant="default"
        showImage={false}
      />
      
    </div>
  )
}

export default Home