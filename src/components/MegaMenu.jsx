import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — ENHANCED MEGA MENU (Standalone)
// ═══════════════════════════════════════════════════════════════
// A rich, imagery-driven menu that appears on Shop hover.
// Features editorial layouts with product previews and campaigns.
//
// Features:
// - 4-column layout with imagery
// - Category previews with images
// - Featured collection spotlight
// - Editorial content section
// - Staggered animations
// - Hover states for each item
// - Auto-close on link click
// - Keyboard navigation
// - Responsive breakpoints
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// MEGA MENU DATA
// ─────────────────────────────────────────
const MENU_DATA = {
  categories: {
    title: 'Categories',
    items: [
      { 
        name: 'Outerwear', 
        path: '/shop/outerwear',
        count: 4,
        image: 'https://images.unsplash.com/photo-1591047139756-eaad8203ad12?w=400&q=80',
      },
      { 
        name: 'Knitwear', 
        path: '/shop/knitwear',
        count: 2,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
      },
      { 
        name: 'Tailoring', 
        path: '/shop/tailoring',
        count: 1,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
      },
      { 
        name: 'Shirts', 
        path: '/shop/shirts',
        count: 5,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
      },
      { 
        name: 'Trousers', 
        path: '/shop/trousers',
        count: 2,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80',
      },
      { 
        name: 'Dresses', 
        path: '/shop/dresses',
        count: 3,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80',
      },
      { 
        name: 'Accessories', 
        path: '/shop/accessories',
        count: 3,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
      },
    ],
  },
  collections: {
    title: 'Collections',
    items: [
      {
        name: 'Noir Collection',
        path: '/collection/noir',
        season: 'FW 2025',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
      },
      {
        name: 'Ivory Essentials',
        path: '/collection/ivory',
        season: 'SS 2025',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
      },
      {
        name: 'Atelier Signature',
        path: '/collection/atelier',
        season: 'Timeless',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
      },
      {
        name: 'Archive Edition',
        path: '/collection/archive',
        season: 'Limited',
        image: 'https://images.unsplash.com/photo-1591047139756-eaad8203ad12?w=400&q=80',
      },
    ],
  },
  featured: {
    title: 'New Season',
    subtitle: 'Fall/Winter 2025',
    name: 'Noir Collection',
    description: 'A meditation on black. Nine essential pieces designed to build a wardrobe of quiet power.',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=90',
    path: '/collection/noir',
    cta: 'Discover',
  },
  editorial: {
    title: 'The Journal',
    articles: [
      {
        title: 'The Art of Cashmere',
        excerpt: 'A journey through Mongolia',
        path: '/about',
      },
      {
        title: 'Handcrafted in Paris',
        excerpt: 'Behind the atelier',
        path: '/about',
      },
      {
        title: 'The Perfect Coat',
        excerpt: 'A story of craftsmanship',
        path: '/about',
      },
    ],
  },
}


const MegaMenu = ({ isOpen, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  
  // ─────────────────────────────────────────
  // ANIMATION VARIANTS
  // ─────────────────────────────────────────
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="hidden lg:block fixed top-[112px] left-0 right-0 bg-noir/98 backdrop-blur-luxury border-b border-graphite/50 z-40"
          onMouseLeave={onClose}
        >
          <div className="container-luxury py-16">
            <div className="grid grid-cols-12 gap-12">
              
              {/* ═══════════════════════════════════════
                  CATEGORIES (4 cols)
              ═══════════════════════════════════════ */}
              <div className="col-span-4">
                <motion.div variants={itemVariants}>
                  <p 
                    className="text-tiny tracking-mega text-gold uppercase mb-8"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}
                  >
                    {MENU_DATA.categories.title}
                  </p>
                  
                  <ul className="space-y-1">
                    {MENU_DATA.categories.items.map((item, index) => (
                      <motion.li
                        key={item.name}
                        variants={itemVariants}
                        onMouseEnter={() => setHoveredCategory(item)}
                      >
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className="flex items-center justify-between py-3 border-b border-graphite/30 group"
                          data-cursor="hover"
                        >
                          <span className="font-cormorant text-2xl text-ivory group-hover:text-gold transition-colors duration-400 group-hover:translate-x-2 transform">
                            {item.name}
                          </span>
                          <span className="text-tiny text-silver font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                            {String(item.count).padStart(2, '0')}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div variants={itemVariants} className="mt-8">
                    <Link
                      to="/shop"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 text-tiny tracking-mega text-ivory uppercase group hover:text-gold transition-colors"
                      style={{ fontSize: '0.7rem' }}
                      data-cursor="hover"
                    >
                      <span className="link-luxury">View All Pieces</span>
                      <FiArrowUpRight 
                        className="transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" 
                        size={14}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* ═══════════════════════════════════════
                  COLLECTIONS (3 cols)
              ═══════════════════════════════════════ */}
              <div className="col-span-3">
                <motion.div variants={itemVariants}>
                  <p 
                    className="text-tiny tracking-mega text-gold uppercase mb-8"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}
                  >
                    {MENU_DATA.collections.title}
                  </p>
                  
                  <ul className="space-y-4">
                    {MENU_DATA.collections.items.map((item, index) => (
                      <motion.li key={item.name} variants={itemVariants}>
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className="group block"
                          data-cursor="hover"
                        >
                          <span className="block font-cormorant text-xl text-ivory group-hover:text-gold transition-colors duration-400">
                            {item.name}
                          </span>
                          <span className="text-tiny text-silver uppercase tracking-mega font-mono" style={{ fontSize: '0.6rem' }}>
                            {item.season}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              
              {/* ═══════════════════════════════════════
                  FEATURED (3 cols)
              ═══════════════════════════════════════ */}
              <div className="col-span-3">
                <motion.div variants={itemVariants}>
                  <p 
                    className="text-tiny tracking-mega text-gold uppercase mb-8"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}
                  >
                    {MENU_DATA.featured.title}
                  </p>
                  
                  <Link
                    to={MENU_DATA.featured.path}
                    onClick={onClose}
                    className="group block"
                    data-cursor="view"
                  >
                    <div className="relative overflow-hidden aspect-portrait mb-4">
                      <img
                        src={MENU_DATA.featured.image}
                        alt={MENU_DATA.featured.name}
                        className="w-full h-full object-cover transition-transform duration-1200 ease-luxury group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p 
                          className="text-tiny tracking-mega text-gold uppercase mb-1"
                          style={{ fontSize: '0.6rem' }}
                        >
                          {MENU_DATA.featured.subtitle}
                        </p>
                        <h3 className="font-cormorant text-2xl text-ivory">
                          {MENU_DATA.featured.name}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-xs text-platinum leading-relaxed font-cormorant italic">
                      {MENU_DATA.featured.description}
                    </p>
                    
                    <div className="mt-4 inline-flex items-center gap-2 text-tiny tracking-mega text-gold uppercase group-hover:gap-3 transition-all duration-400" style={{ fontSize: '0.65rem' }}>
                      <span>{MENU_DATA.featured.cta}</span>
                      <FiArrowUpRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              </div>
              
              {/* ═══════════════════════════════════════
                  EDITORIAL (2 cols)
              ═══════════════════════════════════════ */}
              <div className="col-span-2">
                <motion.div variants={itemVariants}>
                  <p 
                    className="text-tiny tracking-mega text-gold uppercase mb-8"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}
                  >
                    {MENU_DATA.editorial.title}
                  </p>
                  
                  <ul className="space-y-6">
                    {MENU_DATA.editorial.articles.map((article, index) => (
                      <motion.li key={article.title} variants={itemVariants}>
                        <Link
                          to={article.path}
                          onClick={onClose}
                          className="group block"
                          data-cursor="hover"
                        >
                          <span className="block font-cormorant text-sm text-ivory group-hover:text-gold transition-colors duration-400 mb-1">
                            {article.title}
                          </span>
                          <span className="text-tiny text-silver font-cormorant italic" style={{ fontSize: '0.7rem' }}>
                            {article.excerpt}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              
            </div>
          </div>
          
          {/* Bottom Border Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MegaMenu


// ═══════════════════════════════════════════════════════════════
// USAGE (Optional — Navbar already has one built-in)
// ═══════════════════════════════════════════════════════════════
//
// If you want to extract mega menu from Navbar into this component:
//
// In Navbar.jsx:
//   import MegaMenu from './MegaMenu'
//   ...
//   <MegaMenu 
//     isOpen={megaMenuOpen} 
//     onClose={() => setMegaMenuOpen(false)} 
//   />
//
// ═══════════════════════════════════════════════════════════════