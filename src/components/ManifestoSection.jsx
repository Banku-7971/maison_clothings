import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ManifestoSection = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2])
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ['0%', '100%'])
  
  const line1Words = [
    { text: 'We', style: 'normal' },
    { text: "don't", style: 'normal' },
    { text: 'follow', style: 'normal' },
    { text: 'trends.', style: 'strike' },
  ]
  
  const line2Words = [
    { text: 'We', style: 'normal' },
    { text: 'create', style: 'gold' },
    { text: 'them.', style: 'gold-italic' },
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-noir flex items-center justify-center py-32 md:py-40 overflow-hidden"
    >
      {/* Ambient warm glows */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 40%, rgba(200,121,82,0.25) 0%, transparent 60%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 80% 60%, rgba(232,181,148,0.2) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle at 50% 80%, rgba(92,30,46,0.3) 0%, transparent 50%)',
        }}
      />
      
      {/* Smaller MAISON watermark in background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="font-cormorant font-light text-cream whitespace-nowrap select-none manifesto-bg-text"
        >
          MAISON
        </motion.h2>
      </motion.div>
      
      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none manifesto-grain" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="manifesto-particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
              background: i % 2 === 0 ? '#C87952' : '#E8B594',
              boxShadow: `0 0 ${4 + Math.random() * 4}px ${i % 2 === 0 ? 'rgba(200,121,82,0.8)' : 'rgba(232,181,148,0.8)'}`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      
      {/* Top decorative label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 flex items-center gap-4"
      >
        <div className="w-8 h-px bg-gold/40" />
        <p 
          className="text-tiny tracking-mega uppercase font-mono"
          style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#C87952' }}
        >
          — The Manifesto
        </p>
        <div className="w-8 h-px bg-gold/40" />
      </motion.div>
      
      {/* MAIN MANIFESTO TEXT */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="container-luxury text-center relative z-10 px-4"
      >
        {/* LINE 1: "We don't follow trends." */}
        <div className="mb-4 md:mb-6">
          {line1Words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 1, 
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`
                inline-block mr-3 md:mr-5 font-cormorant font-light text-cream leading-[0.9]
                ${word.style === 'strike' ? 'manifesto-strike' : ''}
              `}
              style={{
                fontSize: 'clamp(2.5rem, 9vw, 9rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </div>
        
        {/* Animated divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-4 md:mb-6 h-[2px] max-w-lg origin-left"
          style={{
            background: 'linear-gradient(to right, transparent, #C87952, #E8B594, #C87952, transparent)',
            boxShadow: '0 0 15px rgba(200, 121, 82, 0.8)',
          }}
        />
        
        {/* LINE 2: "We create them." */}
        <div>
          {line2Words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 1, 
                delay: 0.6 + i * 0.15,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`
                inline-block mr-3 md:mr-5 font-cormorant leading-[0.9]
                ${word.style === 'gold' ? 'text-gold font-light' : ''}
                ${word.style === 'gold-italic' ? 'text-gold italic font-light' : ''}
                ${word.style === 'normal' ? 'text-cream font-light' : ''}
              `}
              style={{
                fontSize: 'clamp(2.5rem, 9vw, 9rem)',
                letterSpacing: '-0.03em',
                textShadow: word.style.includes('gold') 
                  ? '0 0 50px rgba(200, 121, 82, 0.6), 0 0 100px rgba(200, 121, 82, 0.3)' 
                  : 'none',
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </div>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 md:mt-16 font-cormorant italic text-platinum text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Every stitch is a statement. Every piece is a rebellion 
          against the ordinary. Handcrafted in Kolkata for those 
          who refuse to blend in.
        </motion.p>
        
        {/* Decorative diamond */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-10 mx-auto w-3 h-3 border border-gold/60"
          style={{ boxShadow: '0 0 10px rgba(200, 121, 82, 0.5)' }}
        />
      </motion.div>
      
      {/* Bottom decorative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-gold"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 8px rgba(200, 121, 82, 0.8)' }}
        />
        <div className="w-12 h-px bg-gold/30" />
        <p 
          className="text-tiny tracking-mega text-champagne/60 uppercase font-mono"
          style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}
        >
          Est. 2025
        </p>
        <div className="w-12 h-px bg-gold/30" />
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-champagne"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ boxShadow: '0 0 8px rgba(232, 181, 148, 0.8)' }}
        />
      </motion.div>
      
      <style>{`
        /* SMALLER Background MAISON watermark */
        .manifesto-bg-text {
          font-size: clamp(4rem, 15vw, 12rem);
          letter-spacing: 0.3em;
          line-height: 1;
          padding-left: 0.3em;
        }
        
        @media (max-width: 768px) {
          .manifesto-bg-text {
            font-size: 4rem;
          }
        }
        
        @media (max-width: 480px) {
          .manifesto-bg-text {
            font-size: 3rem;
          }
        }
        
        /* Strikethrough on "trends." */
        .manifesto-strike {
          position: relative;
          color: rgba(245, 235, 221, 0.4);
        }
        
        .manifesto-strike::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 3px;
          background: linear-gradient(to right, #C87952, #E8B594);
          box-shadow: 0 0 10px rgba(200, 121, 82, 0.8);
          transform: translateY(-50%) scaleX(0);
          transform-origin: left;
          animation: strikeReveal 0.8s ease-out forwards;
          animation-delay: 1.2s;
        }
        
        @keyframes strikeReveal {
          to { transform: translateY(-50%) scaleX(1); }
        }
        
        /* Film grain */
        .manifesto-grain {
          opacity: 0.04;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: grainShift 8s steps(6) infinite;
        }
        
        @keyframes grainShift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-10%, 5%); }
          50% { transform: translate(5%, -10%); }
          75% { transform: translate(-5%, 10%); }
        }
        
        /* Particles */
        .manifesto-particle {
          position: absolute;
          border-radius: 50%;
          bottom: -20px;
          animation: manifestoParticle linear infinite;
        }
        
        @keyframes manifestoParticle {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default ManifestoSection