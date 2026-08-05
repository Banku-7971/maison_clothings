import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ManifestoSection from '../components/ManifestoSection'
import SplitStorySection from '../components/SplitStorySection'
import EditorialSection from '../components/EditorialSection'
import NumbersSection from '../components/NumbersSection'
import CTASection from '../components/CTASection'

const Home = () => {
  useEffect(() => {
    document.title = 'MAISON — Where Craftsmanship Meets Couture'
    return () => { document.title = 'MAISON' }
  }, [])
  
  return (
    <div className="bg-noir">
      <HeroSection />
      <ManifestoSection />
      <SplitStorySection />
      <EditorialSection />
      <NumbersSection />
      <CTASection />
    </div>
  )
}

export default Home