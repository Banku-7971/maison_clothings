import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import MarqueeStrip from '../components/MarqueeStrip'
import Newsletter from '../components/Newsletter'

// ═══════════════════════════════════════════════════════════════
// MAISON INDIA — ABOUT PAGE (Kolkata Story)
// ═══════════════════════════════════════════════════════════════

const VALUES = [
  {
    number: '01',
    title: 'Timelessness',
    description: 'We design pieces to be worn for decades, not seasons. Every stitch, every seam, made to endure.',
  },
  {
    number: '02',
    title: 'Craftsmanship',
    description: 'Every piece is handmade by Indian master artisans. Machines cannot replicate what human hands know.',
  },
  {
    number: '03',
    title: 'Materials',
    description: 'We source only the finest natural materials from mills across India — Kashmir cashmere, Bangalore silk, Kanpur leather.',
  },
  {
    number: '04',
    title: 'Sustainability',
    description: 'Fewer pieces, better made. Less waste. Longer life. This is our contribution to a wiser India.',
  },
  {
    number: '05',
    title: 'Discretion',
    description: 'True luxury whispers. Our pieces speak only to those who listen carefully.',
  },
]

const TIMELINE = [
  {
    year: '2025',
    title: 'The Beginning',
    description: 'MAISON is founded in Kolkata. First atelier opens on Park Street.',
  },
  {
    year: '2025',
    title: 'First Collection',
    description: 'The debut Noir Collection launches — nine pieces defining our aesthetic.',
  },
  {
    year: '2025',
    title: 'Master Artisans',
    description: 'Twelve master artisans join the atelier, bringing generations of Indian craftsmanship.',
  },
  {
    year: '2025',
    title: 'Pan-India Delivery',
    description: 'We expand shipping to every state in India, connecting artisans to admirers nationwide.',
  },
]

const MATERIALS = [
  { name: 'Kashmiri Cashmere', origin: 'Kashmir, India', description: 'Grade-A extra-fine fibers' },
  { name: 'Bangalore Silk', origin: 'Karnataka, India', description: 'Mulberry silk of the highest grade' },
  { name: 'Kanpur Leather', origin: 'Uttar Pradesh, India', description: 'Vegetable-tanned buffalo leather' },
  { name: 'Gujarat Cotton', origin: 'Ahmedabad, India', description: 'Giza long-staple cotton' },
  { name: 'Ladakh Merino', origin: 'Himalayas, India', description: 'Extra-fine Merino wool' },
  { name: 'Kerala Linen', origin: 'Kerala, India', description: 'Pure natural linen' },
]


const About = () => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  
  useEffect(() => {
    document.title = 'The Atelier — MAISON'
    return () => {
      document.title = 'MAISON'
    }
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 })
  
  return (
    <div className="bg-noir min-h-screen">
      
      {/* HERO */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-24">
        <div className="container-luxury">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-tiny tracking-mega text-gold uppercase mb-8"
            style={{ fontSize: '0.7rem' }}
          >
            — The Story
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorant font-light text-ivory leading-none mb-12"
            style={{ 
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}
          >
            A house<br />
            built on<br />
            <em className="italic text-gold">obsession.</em>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-cormorant italic text-platinum text-lg md:text-2xl max-w-2xl leading-relaxed"
          >
            Founded in Kolkata in 2025 with a singular belief: 
            that clothing should be an heirloom, not an object of consumption.
          </motion.p>
        </div>
      </section>
      
      {/* MANIFESTO */}
      <section className="py-24 md:py-32 border-y border-graphite/30">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-8"
              style={{ fontSize: '0.7rem' }}
            >
              — The Manifesto
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-light text-ivory leading-tight"
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
              }}
            >
              We do not chase
              <br />
              <em className="italic text-gold">trends.</em>
              <br />
              We create pieces
              <br />
              that outlive them.
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 max-w-2xl mx-auto space-y-6"
            >
              <p className="font-cormorant text-platinum text-lg md:text-xl leading-relaxed">
                In an era of endless consumption, MAISON exists as a refusal. 
                A refusal to compromise on quality. A refusal to design for the moment. 
                A refusal to be anything less than exceptional.
              </p>
              
              <p className="font-cormorant italic text-gold text-lg md:text-xl leading-relaxed">
                We create fewer pieces, better made — 
                for those who understand the difference.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CRAFT SECTION */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <motion.div
                style={{ y: smoothImageY }}
                className="absolute inset-0 w-full h-[120%]"
              >
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&q=90"
                  alt="MAISON Atelier Kolkata"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </motion.div>
              
              <div className="absolute top-6 left-6 z-10">
                <div className="w-4 h-px bg-gold" />
                <div className="w-px h-4 bg-gold" />
              </div>
              <div className="absolute bottom-6 right-6 z-10">
                <div className="w-px h-4 bg-gold ml-auto" />
                <div className="w-4 h-px bg-gold ml-auto" />
              </div>
              
              <div className="absolute bottom-6 left-6">
                <p 
                  className="text-tiny tracking-mega text-ivory/70 uppercase font-mono mb-1"
                  style={{ fontSize: '0.6rem' }}
                >
                  The Atelier
                </p>
                <p className="font-cormorant italic text-ivory text-base">
                  Kolkata, India
                </p>
              </div>
            </div>
            
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-tiny tracking-mega text-gold uppercase mb-6"
                style={{ fontSize: '0.7rem' }}
              >
                — The Craft
              </motion.p>
              
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-cormorant font-light text-ivory mb-8"
                style={{ 
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  lineHeight: 1,
                }}
              >
                Where hands<br />
                shape <em className="italic text-gold">time.</em>
              </motion.h3>
              
              <div className="space-y-5">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-cormorant text-platinum text-lg leading-relaxed"
                >
                  Our atelier sits on Park Street in Kolkata, 
                  where twelve master artisans work with materials sourced 
                  from the finest regions across India — Kashmir, Bangalore, 
                  Kanpur, and beyond.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-cormorant text-platinum text-lg leading-relaxed"
                >
                  Each piece requires between 40 and 60 hours of manual work. 
                  Nothing is rushed. Nothing is compromised. Nothing is made 
                  that does not meet our uncompromising standard.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-cormorant italic text-gold text-lg leading-relaxed"
                >
                  This is not fashion. This is Indian architecture for the body.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* STATS */}
      <section className="py-24 md:py-32 border-y border-graphite/30 bg-charcoal/30">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-4"
              style={{ fontSize: '0.7rem' }}
            >
              — By The Numbers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-cormorant font-light text-ivory"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              The math of <em className="italic text-gold">craft</em>
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '47', label: 'Hours Per Piece' },
              { number: '12', label: 'Master Artisans' },
              { number: '08', label: 'Indian States Sourced' },
              { number: '100', label: 'Percent Handcrafted' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="font-cormorant font-light text-ivory mb-2 tabular-nums"
                  style={{ 
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
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
        </div>
      </section>
      
      {/* MATERIALS */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-tiny tracking-mega text-gold uppercase mb-6"
                style={{ fontSize: '0.7rem' }}
              >
                — Materials
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-cormorant font-light text-ivory"
                style={{ 
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  lineHeight: 1,
                }}
              >
                Sourced from<br />
                <em className="italic text-gold">across India.</em>
              </motion.h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 lg:pt-8"
            >
              <p className="font-cormorant italic text-platinum text-lg leading-relaxed">
                We travel across India to source. We visit the shepherds in Ladakh 
                who tend the pashmina goats. We meet the silk weavers in Bangalore. 
                We shake hands with the tanners in Kanpur. Every material has a name, 
                a face, a story that we honor.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MATERIALS.map((material, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="p-6 border border-graphite hover:border-gold transition-all duration-400 group rounded-2xl"
              >
                <p 
                  className="text-tiny tracking-mega text-gold uppercase mb-3"
                  style={{ fontSize: '0.6rem' }}
                >
                  {String(index + 1).padStart(2, '0')} — {material.origin}
                </p>
                <h4 className="font-cormorant text-2xl text-ivory group-hover:text-gold transition-colors duration-400 mb-2">
                  {material.name}
                </h4>
                <p className="text-sm text-platinum font-cormorant italic">
                  {material.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* VALUES */}
      <section className="py-24 md:py-32 border-y border-graphite/30">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-6"
              style={{ fontSize: '0.7rem' }}
            >
              — What We Believe
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-cormorant font-light text-ivory"
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1,
              }}
            >
              Five <em className="italic text-gold">principles.</em>
            </motion.h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-8 border-b border-graphite/30 group"
              >
                <div>
                  <span 
                    className="font-cormorant font-light text-gold"
                    style={{ 
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      lineHeight: 1,
                    }}
                  >
                    {value.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl md:text-3xl text-ivory mb-3 group-hover:text-gold transition-colors duration-400">
                    {value.title}
                  </h3>
                  <p className="font-cormorant text-platinum text-base md:text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* TIMELINE */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-6"
              style={{ fontSize: '0.7rem' }}
            >
              — The Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-cormorant font-light text-ivory"
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1,
              }}
            >
              Our <em className="italic text-gold">chapters.</em>
            </motion.h2>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-8 md:left-24 top-0 bottom-0 w-px bg-graphite" />
            
            {TIMELINE.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 pb-16 last:pb-0"
              >
                <div className="absolute left-6 md:left-22 top-1 w-4 h-4 rounded-full bg-gold border-2 border-noir z-10" />
                
                <div>
                  <span 
                    className="text-tiny tracking-mega text-gold uppercase font-mono"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {event.year}
                  </span>
                </div>
                
                <div className="pl-4">
                  <h3 className="font-cormorant text-2xl md:text-3xl text-ivory mb-3">
                    {event.title}
                  </h3>
                  <p className="font-cormorant italic text-platinum text-base md:text-lg leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <MarqueeStrip
        items={['MAISON', 'Est. 2025', 'Kolkata, India']}
        variant="huge"
        separator="diamond"
        speed={50}
      />
      
      {/* CTA */}
      <section className="py-24 md:py-32 border-y border-graphite/30">
        <div className="container-luxury text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-tiny tracking-mega text-gold uppercase mb-6"
            style={{ fontSize: '0.7rem' }}
          >
            — Visit The Atelier
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cormorant font-light text-ivory mb-8"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1,
            }}
          >
            Come <em className="italic text-gold">meet us.</em>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant italic text-platinum text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Book a private appointment in our Kolkata atelier on Park Street. 
            Meet the artisans. See the craftsmanship. 
            Discover the pieces that will define your wardrobe.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 group py-4 px-12 bg-gold text-noir hover:bg-ivory transition-all duration-500 rounded-full shadow-warm-lg"
              data-cursor="hover"
            >
              <span 
                className="text-tiny tracking-mega uppercase font-semibold"
                style={{ fontSize: '0.75rem' }}
              >
                Book Appointment
              </span>
              <FiArrowUpRight 
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400" 
                size={18} 
              />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Newsletter variant="default" />
    </div>
  )
}

export default About