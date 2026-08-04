import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'
import Skeleton3D from '../components/Skeleton3D'
import Newsletter from '../components/Newsletter'

const Home = () => {
  useEffect(() => {
    document.title = 'MAISON — Where Craftsmanship Meets Couture'
    return () => { document.title = 'MAISON' }
  }, [])
  
  return (
    <div className="bg-noir">
      <HeroSection />
      <FeaturedProducts />
      <Skeleton3D />
      <Newsletter variant="default" />
    </div>
  )
}

export default Home