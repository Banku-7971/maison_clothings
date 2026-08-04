import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [showTagline, setShowTagline] = useState(false)
  
  useEffect(() => {
    const duration = 3000
    const interval = 30
    const increment = 100 / (duration / interval)
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, interval)
    
    const taglineTimer = setTimeout(() => setShowTagline(true), 800)
    
    return () => {
      clearInterval(timer)
      clearTimeout(taglineTimer)
    }
  }, [])
  
  const letters = 'MAISON'.split('')
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
    exit: {
      opacity: 0, y: '-100%',
      transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.3 },
    },
  }
  
  const letterVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%', opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  }
  
  const taglineVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }
  
  const barVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 3, ease: [0.87, 0, 0.13, 1], delay: 0.5 },
    },
  }
  
  const percentageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.7 },
    },
  }
  
  return (
    <motion.div
      className="fixed inset-0 z-max bg-noir flex items-center justify-center overflow-hidden"
      style={{ zIndex: 10000 }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: 'grainMove 8s steps(10) infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(183, 110, 93, 0.15) 0%, transparent 70%)',
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        
        {/* CHANGED: KOLKATA, NOT PARIS */}
        <motion.p
          className="text-tiny tracking-mega text-silver uppercase font-mono mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Est. 2025 — Kolkata
        </motion.p>
        
        <div className="flex items-center justify-center overflow-hidden pl-[0.5em]">
          {letters.map((letter, index) => (
            <div key={index} className="overflow-hidden">
              <motion.span
                className="inline-block font-cormorant font-light text-ivory"
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                  letterSpacing: '0.5em',
                  lineHeight: 1,
                }}
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>
        
        <AnimatePresence>
          {showTagline && (
            <motion.p
              className="mt-8 md:mt-12 font-cormorant italic text-platinum text-lg md:text-xl tracking-wide"
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
            >
              Where craftsmanship meets couture
            </motion.p>
          )}
        </AnimatePresence>
        
        <div className="mt-16 md:mt-20 w-48 md:w-64">
          <div className="relative h-px bg-graphite overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gold origin-left"
              variants={barVariants}
            />
          </div>
        </div>
        
        <motion.div
          className="mt-6 flex items-center gap-4 text-tiny tracking-mega text-gold uppercase font-mono"
          variants={percentageVariants}
        >
          <span>Loading</span>
          <span className="tabular-nums">
            {String(Math.floor(progress)).padStart(3, '0')}%
          </span>
        </motion.div>
      </div>
      
      {/* BOTTOM STATUS */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-between px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-tiny tracking-mega text-silver uppercase font-mono">
          MSN—25
        </span>
        <span className="text-tiny tracking-mega text-silver uppercase font-mono hidden md:block">
          Curating your experience
        </span>
        <span className="text-tiny tracking-mega text-silver uppercase font-mono">
          Vol. 001
        </span>
      </motion.div>
      
      {/* CORNER MARKERS */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <div className="w-4 h-px bg-gold" />
        <div className="w-px h-4 bg-gold" />
      </motion.div>
      
      <motion.div
        className="absolute top-8 right-8 md:top-12 md:right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <div className="w-4 h-px bg-gold ml-auto" />
        <div className="w-px h-4 bg-gold ml-auto" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="w-px h-4 bg-gold" />
        <div className="w-4 h-px bg-gold" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="w-px h-4 bg-gold ml-auto" />
        <div className="w-4 h-px bg-gold ml-auto" />
      </motion.div>
      
      <style>{`
        @keyframes grainMove {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </motion.div>
  )
}

export default LoadingScreen