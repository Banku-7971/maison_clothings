import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ManifestoSection from '../components/ManifestoSection'

const Home = () => {
  useEffect(() => {
    document.title = 'MAISON — Where Craftsmanship Meets Couture'
    return () => { document.title = 'MAISON' }
  }, [])
  
  return (
    <div className="bg-noir">
      <HeroSection />
      <ManifestoSection />
    </div>
  )
}

export default Home