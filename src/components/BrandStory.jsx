import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — BRAND STORY SECTION
// ═══════════════════════════════════════════════════════════════
// The editorial heart of the homepage.
// Where visitors learn what MAISON stands for.
// Every word deliberate. Every image intentional.
//
// Features:
// - Split-screen layout (image + text)
// - Parallax image effect on scroll
// - Editorial typography with italic accents
// - Sequential text reveal
// - Signature/manifesto quote
// - Craftsmanship stats
// - Read More CTA
// - Corner brackets on image
// - Rotating "MAISON" text watermark
// - Ambient background elements
// ═══════════════════════════════════════════════════════════════

const BrandStory = () => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  
  // ─────────────────────────────────────────
  // PARALLAX SCROLL
  // ─────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  // Image parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 })
  
  // Text parallax
  const textY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 30 })
  
  // Rotation for watermark
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180])
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 30 })
  
  // ─────────────────────────────────────────
  // CRAFT STATS
  // ─────────────────────────────────────────
  const craftStats = [
    { number: '47', label: 'Hours Per Piece' },
    { number: '12', label: 'Master Artisans' },
    { number: '05', label: 'Countries Sourced' },
    { number: '100', label: 'Percent Handcrafted' },
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-noir overflow-hidden"
    >
      
      {/* ═══════════════════════════════════════
          ROTATING WATERMARK
      ═══════════════════════════════════════ */}
      <motion.div
        style={{ rotate: smoothRotation }}
        className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none opacity-[0.03] hidden lg:block"
      >
        <h2 
          className="font-cormorant font-light text-ivory whitespace-nowrap"
          style={{ 
            fontSize: '30rem',
            lineHeight: 1,
            letterSpacing: '0.1em',
          }}
        >
          MAISON
        </h2>
      </motion.div>
      
      {/* Ambient gradients */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 10% 50%, rgba(201,169,110,0.1) 0%, transparent 50%)',
        }}
      />
      
      <div className="container-luxury relative z-10">
        
        {/* ═══════════════════════════════════════
            SECTION LABEL
        ═══════════════════════════════════════ */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-tiny tracking-mega text-gold uppercase text-center mb-8"
          style={{ fontSize: '0.7rem' }}
        >
          — Our Philosophy
        </motion.p>
        
        {/* ═══════════════════════════════════════
            MASSIVE SIGNATURE QUOTE
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-32 max-w-5xl mx-auto"
        >
          <h2 
            className="font-cormorant font-light text-ivory leading-none"
            style={{ 
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            We do not chase
            <br />
            <em className="italic text-gold">trends.</em>
            <br />
            We create pieces
            <br />
            that outlive them.
          </h2>
        </motion.div>
        
        {/* ═══════════════════════════════════════
            SPLIT-SCREEN LAYOUT
        ═══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          
          {/* ─────────────────────────────────
              LEFT: PARALLAX IMAGE
          ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Image Container */}
            <div 
              ref={imageRef}
              className="relative aspect-[3/4] bg-charcoal overflow-hidden"
            >
              <motion.div
                style={{ y: smoothImageY }}
                className="absolute inset-0 w-full h-[130%]"
              >
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&q=90"
                  alt="MAISON Atelier"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </motion.div>
              
              {/* Vignette */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%)',
                }}
              />
              
              {/* Corner Brackets */}
              <div className="absolute top-6 left-6 z-10">
                <div className="w-6 h-px bg-gold" />
                <div className="w-px h-6 bg-gold" />
              </div>
              <div className="absolute top-6 right-6 z-10">
                <div className="w-6 h-px bg-gold ml-auto" />
                <div className="w-px h-6 bg-gold ml-auto" />
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <div className="w-px h-6 bg-gold" />
                <div className="w-6 h-px bg-gold" />
              </div>
              <div className="absolute bottom-6 right-6 z-10">
                <div className="w-px h-6 bg-gold ml-auto" />
                <div className="w-6 h-px bg-gold ml-auto" />
              </div>
              
              {/* Image Label */}
              <div className="absolute bottom-8 left-8 z-10">
                <p 
                  className="text-tiny tracking-mega text-ivory/70 uppercase font-mono mb-1"
                  style={{ fontSize: '0.6rem' }}
                >
                  The Atelier
                </p>
                <p 
                  className="font-cormorant italic text-ivory text-lg"
                >
                  Paris, France
                </p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gold flex flex-col items-center justify-center text-noir"
            >
              <span 
                className="font-cormorant italic text-2xl md:text-3xl"
              >
                Est.
              </span>
              <span 
                className="font-cormorant text-3xl md:text-4xl font-light tabular-nums"
              >
                2025
              </span>
              <span 
                className="text-tiny tracking-mega uppercase mt-1"
                style={{ fontSize: '0.55rem' }}
              >
                Paris
              </span>
            </motion.div>
          </motion.div>
          
          {/* ─────────────────────────────────
              RIGHT: EDITORIAL TEXT
          ───────────────────────────────── */}
          <motion.div
            style={{ y: smoothTextY }}
            className="space-y-6 lg:pl-8"
          >
            
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-tiny tracking-mega text-gold uppercase"
              style={{ fontSize: '0.7rem' }}
            >
              — The Maison
            </motion.p>
            
            {/* Heading */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-light text-ivory"
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              A house built on
              <br />
              <em className="italic text-gold">obsession.</em>
            </motion.h3>
            
            {/* Body Paragraphs */}
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-cormorant text-platinum text-lg md:text-xl leading-relaxed"
              >
                MAISON was founded in Paris in 2025 with a singular 
                belief: that clothing should be an heirloom, not 
                an object of consumption.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-cormorant text-platinum text-lg md:text-xl leading-relaxed"
              >
                Every piece begins in our atelier in the 8th arrondissement, 
                where master artisans work with materials sourced from the 
                finest mills in Italy, Scotland, and Japan.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-cormorant italic text-gold text-xl md:text-2xl leading-relaxed pt-4"
              >
                We create fewer pieces, better made — 
                for those who understand the difference.
              </motion.p>
            </div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-8"
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-3"
                data-cursor="hover"
              >
                <span 
                  className="text-tiny tracking-mega text-ivory uppercase pb-2 border-b border-ivory group-hover:border-gold group-hover:text-gold transition-all duration-400"
                  style={{ fontSize: '0.75rem' }}
                >
                  Read Our Story
                </span>
                <FiArrowUpRight 
                  className="text-ivory group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400" 
                  size={18} 
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* ═══════════════════════════════════════
            CRAFTSMANSHIP STATS
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-graphite/30"
        >
          <div className="text-center mb-12">
            <p 
              className="text-tiny tracking-mega text-gold uppercase mb-4"
              style={{ fontSize: '0.7rem' }}
            >
              — By The Numbers
            </p>
            <h3 
              className="font-cormorant font-light text-ivory"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              The math of <em className="italic text-gold">craft</em>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {craftStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="text-center border-l border-graphite/30 first:border-l-0 lg:border-l first:lg:border-l-0"
              >
                <div 
                  className="font-cormorant font-light text-ivory mb-2 tabular-nums"
                  style={{ 
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </div>
                <p 
                  className="text-tiny tracking-mega text-silver uppercase"
                  style={{ fontSize: '0.7rem' }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* ═══════════════════════════════════════
            SIGNATURE / MANIFESTO
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-24 md:mt-32 pt-16 border-t border-graphite/30"
        >
          <p 
            className="font-cormorant italic text-gold mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            "Quality is not an act, it is a habit."
          </p>
          <p 
            className="text-tiny tracking-mega text-silver uppercase font-mono"
            style={{ fontSize: '0.7rem' }}
          >
            — The MAISON Manifesto
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandStory