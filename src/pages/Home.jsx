import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'

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