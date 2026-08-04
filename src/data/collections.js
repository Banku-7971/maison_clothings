// ═══════════════════════════════════════════════════════════════
// MAISON — CURATED COLLECTIONS
// ═══════════════════════════════════════════════════════════════
// Each collection tells a story.
// Each piece is chosen with obsessive care.
// ═══════════════════════════════════════════════════════════════

export const collectionsData = [
  // ─────────────────────────────────────────
  // COLLECTION 01 — NOIR
  // ─────────────────────────────────────────
  {
    id: 'noir',
    slug: 'noir',
    name: 'Noir Collection',
    subtitle: 'The Darkness Within',
    season: 'Fall/Winter 2025',
    year: 2025,
    
    description: 'A meditation on black. Every shade of darkness explored through fabric, form, and shadow. The Noir Collection is our love letter to the color that reveals everything by hiding it.',
    
    editorial: 'Black is not a color. It is a state of mind. A refusal. A statement. In our Noir Collection, we explore the infinite depths of darkness through nine essential pieces designed to build a wardrobe of quiet power.',
    
    philosophy: 'Where light ends, elegance begins.',
    
    heroImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1920&q=90',
    heroImageMobile: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=90',
    
    gallery: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80',
      'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=1200&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80',
    ],
    
    thumbnail: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    
    colorPalette: [
      { name: 'Noir', hex: '#0A0A0A' },
      { name: 'Charcoal', hex: '#2D2D2D' },
      { name: 'Graphite', hex: '#1F1F1F' },
      { name: 'Ivory', hex: '#F5F0EB' },
    ],
    
    materials: [
      'Italian Virgin Wool',
      'Silk Crepe',
      'Camel Hair',
      'Cashmere',
    ],
    
    designer: 'MAISON Atelier',
    launchDate: '2025-09-15',
    
    isNew: false,
    isFeatured: true,
    isLimited: false,
    
    productIds: [
      'MSN-001', 
      'MSN-004', 
      'MSN-015', 
      'MSN-016', 
      'MSN-017',
    ],
    
    campaign: {
      title: 'Into The Dark',
      photographer: 'Studio MAISON',
      location: 'Paris, France',
      model: 'Anonymous',
      year: 2025,
    },
    
    tags: ['featured', 'signature'],
  },
  
  // ─────────────────────────────────────────
  // COLLECTION 02 — IVORY ESSENTIALS
  // ─────────────────────────────────────────
  {
    id: 'ivory',
    slug: 'ivory',
    name: 'Ivory Essentials',
    subtitle: 'The Purity of Form',
    season: 'Spring/Summer 2025',
    year: 2025,
    
    description: 'Studies in whiteness. Ivory, cream, bone, alabaster — the subtle variations of pale that define modern luxury. Essential pieces that transcend season.',
    
    editorial: 'White is complexity disguised as simplicity. The Ivory Essentials collection presents six pieces that demonstrate how much depth exists within the palest palette.',
    
    philosophy: 'Silence has never spoken louder.',
    
    heroImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1920&q=90',
    heroImageMobile: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90',
    
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1200&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80',
    ],
    
    thumbnail: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
    
    colorPalette: [
      { name: 'Ivory', hex: '#F5F0EB' },
      { name: 'Cream', hex: '#FAF7F2' },
      { name: 'Bone', hex: '#F0EBE3' },
      { name: 'Alabaster', hex: '#FAFAF7' },
      { name: 'Champagne', hex: '#E7D3AF' },
    ],
    
    materials: [
      'Mongolian Cashmere',
      'Egyptian Giza 87 Cotton',
      'Mulberry Silk',
      'Belgian Linen',
    ],
    
    designer: 'MAISON Atelier',
    launchDate: '2025-03-01',
    
    isNew: true,
    isFeatured: true,
    isLimited: false,
    
    productIds: [
      'MSN-002', 
      'MSN-006', 
      'MSN-009', 
      'MSN-011', 
      'MSN-014', 
      'MSN-019',
    ],
    
    campaign: {
      title: 'Studies in Silence',
      photographer: 'Studio MAISON',
      location: 'Provence, France',
      model: 'Anonymous',
      year: 2025,
    },
    
    tags: ['new', 'featured', 'seasonal'],
  },
  
  // ─────────────────────────────────────────
  // COLLECTION 03 — ATELIER SIGNATURE
  // ─────────────────────────────────────────
  {
    id: 'atelier',
    slug: 'atelier',
    name: 'Atelier Signature',
    subtitle: 'Beyond Season',
    season: 'Timeless',
    year: 2025,
    
    description: 'The pieces that define us. Timeless investments crafted to remain in your wardrobe for decades. The Atelier Signature collection represents MAISON at its most essential — pieces that transcend trend.',
    
    editorial: 'Some garments are not designed. They are discovered. The Atelier Signature collection presents pieces that have earned their place through obsessive refinement, season after season.',
    
    philosophy: 'The best purchase is one you never regret.',
    
    heroImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1920&q=90',
    heroImageMobile: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=90',
    
    gallery: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80',
      'https://images.unsplash.com/photo-1608228088998-57828365d486?w=1200&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1200&q=80',
    ],
    
    thumbnail: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    
    colorPalette: [
      { name: 'Camel', hex: '#C9A96E' },
      { name: 'Charcoal', hex: '#2D2D2D' },
      { name: 'Noir', hex: '#0A0A0A' },
      { name: 'Indigo', hex: '#3B4B75' },
    ],
    
    materials: [
      'Super 130s Wool',
      'Japanese Selvedge Denim',
      'Extra-fine Merino',
      'Italian Nappa Leather',
    ],
    
    designer: 'MAISON Atelier',
    launchDate: '2020-01-01',
    
    isNew: false,
    isFeatured: true,
    isLimited: false,
    
    productIds: [
      'MSN-003', 
      'MSN-007', 
      'MSN-008', 
      'MSN-012', 
      'MSN-013', 
      'MSN-018',
    ],
    
    campaign: {
      title: 'The Permanent Wardrobe',
      photographer: 'Studio MAISON',
      location: 'Milan, Italy',
      model: 'Anonymous',
      year: 2025,
    },
    
    tags: ['timeless', 'signature', 'essential'],
  },
  
  // ─────────────────────────────────────────
  // COLLECTION 04 — ARCHIVE EDITION
  // ─────────────────────────────────────────
  {
    id: 'archive',
    slug: 'archive',
    name: 'Archive Edition',
    subtitle: 'Numbered Rarities',
    season: 'Limited',
    year: 2025,
    
    description: 'The rarest pieces in the MAISON world. Numbered editions of extraordinary craftsmanship — pieces that will be discussed in years to come. Each piece includes an authentication card and is signed by our master atelier.',
    
    editorial: 'Some things are not made to be worn. They are made to be witnessed. The Archive Edition presents pieces of such exceptional craftsmanship that we produce them in numbered editions, ensuring each owner holds something truly singular.',
    
    philosophy: 'Rarity is not a marketing strategy. It is a natural consequence of obsession.',
    
    heroImage: 'https://images.unsplash.com/photo-1591047139756-eaad8203ad12?w=1920&q=90',
    heroImageMobile: 'https://images.unsplash.com/photo-1591047139756-eaad8203ad12?w=800&q=90',
    
    gallery: [
      'https://images.unsplash.com/photo-1591047139756-eaad8203ad12?w=1200&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80',
    ],
    
    thumbnail: 'https://images.unsplash.com/photo-1591047139756-eaad8203ad12?w=600&q=80',
    
    colorPalette: [
      { name: 'Cognac', hex: '#8B4513' },
      { name: 'Noir', hex: '#0A0A0A' },
      { name: 'Burgundy', hex: '#4A0E1F' },
      { name: 'Gold', hex: '#C9A96E' },
    ],
    
    materials: [
      'Vegetable-tanned Tuscan Calfskin',
      'CITES-certified Crocodile',
      'Silk Satin',
      '18k Gold-plated Hardware',
    ],
    
    designer: 'MAISON Atelier',
    launchDate: '2025-01-01',
    
    isNew: false,
    isFeatured: true,
    isLimited: true,
    
    productIds: [
      'MSN-005', 
      'MSN-010', 
      'MSN-020',
    ],
    
    campaign: {
      title: 'Numbered Nine',
      photographer: 'Studio MAISON',
      location: 'Florence, Italy',
      model: 'Anonymous',
      year: 2025,
    },
    
    tags: ['limited', 'archive', 'investment', 'rare'],
  },
]

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// Get all collections
export const getAllCollections = () => collectionsData

// Get collection by ID
export const getCollectionById = (id) => 
  collectionsData.find(c => c.id === id)

// Get collection by slug
export const getCollectionBySlug = (slug) => 
  collectionsData.find(c => c.slug === slug)

// Get featured collections
export const getFeaturedCollections = () => 
  collectionsData.filter(c => c.isFeatured)

// Get new collections
export const getNewCollections = () => 
  collectionsData.filter(c => c.isNew)

// Get limited collections
export const getLimitedCollections = () => 
  collectionsData.filter(c => c.isLimited)

// Get products for a collection (requires importing products separately)
export const getProductIdsForCollection = (collectionId) => {
  const collection = getCollectionById(collectionId)
  return collection ? collection.productIds : []
}

// Get current season collections
export const getCurrentSeasonCollections = () => {
  const currentYear = new Date().getFullYear()
  return collectionsData.filter(c => c.year === currentYear)
}

// Sort collections by launch date
export const getCollectionsByDate = (order = 'desc') => {
  return [...collectionsData].sort((a, b) => {
    const dateA = new Date(a.launchDate)
    const dateB = new Date(b.launchDate)
    return order === 'desc' ? dateB - dateA : dateA - dateB
  })
}

export default collectionsData