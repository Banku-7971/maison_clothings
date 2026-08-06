import { motion } from 'framer-motion'

const PageTransition = ({ children }) => {
  return (
    <div className="page-transition-wrapper">
      
      {/* LAYER 1: Main content with fade + slide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LAYER 2: Scale + blur effect */}
        <motion.div
          initial={{ 
            scale: 0.97,
            filter: 'blur(10px)',
            y: 30,
          }}
          animate={{ 
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
          }}
          exit={{ 
            scale: 0.97,
            filter: 'blur(10px)',
            y: -30,
          }}
          transition={{ 
            duration: 0.7, 
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ 
            minHeight: '100vh',
            width: '100%',
          }}
        >
          {children}
        </motion.div>
      </motion.div>
      
      {/* LAYER 3: Golden curtain wipe — TOP */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.87, 0, 0.13, 1],
        }}
        className="fixed inset-0 z-[9000] pointer-events-none origin-top"
        style={{
          background: 'linear-gradient(180deg, #2A1F1A 0%, #3D2E24 50%, #5C1E2E 100%)',
        }}
      />
      
      {/* LAYER 4: Golden accent line sweeping */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
        className="fixed top-1/2 left-0 right-0 h-[2px] z-[9001] pointer-events-none origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, #C87952, #E8B594, #C87952, transparent)',
          boxShadow: '0 0 20px rgba(200, 121, 82, 0.8), 0 0 40px rgba(200, 121, 82, 0.4)',
        }}
      />
      
      {/* LAYER 5: Second curtain — BOTTOM (delayed) */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.87, 0, 0.13, 1],
          delay: 0.08,
        }}
        className="fixed inset-0 z-[8999] pointer-events-none origin-bottom"
        style={{
          background: 'linear-gradient(0deg, #2A1F1A 0%, #3D2E24 50%, #5C1E2E 100%)',
        }}
      />
      
      {/* LAYER 6: Golden flash overlay */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ 
          duration: 0.4, 
          ease: 'easeOut',
          delay: 0.2,
        }}
        className="fixed inset-0 z-[8998] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(200, 121, 82, 0.4) 0%, transparent 70%)',
        }}
      />
      
      {/* LAYER 7: MAISON text flash */}
      <motion.div
        initial={{ opacity: 0.15, scale: 1 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05,
        }}
        className="fixed inset-0 z-[9002] pointer-events-none flex items-center justify-center"
      >
        <span 
          className="font-cormorant font-light text-gold/30 select-none"
          style={{
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            letterSpacing: '0.5em',
            paddingLeft: '0.5em',
          }}
        >
          MAISON
        </span>
      </motion.div>
      
      {/* LAYER 8: Corner sparkles during transition */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed inset-0 z-[9003] pointer-events-none"
      >
        {/* Top left sparkle */}
        <motion.div
          initial={{ scale: 0, x: -20, y: -20 }}
          animate={{ scale: [0, 1.5, 0], x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute top-20 left-20 w-4 h-4"
        >
          <div className="w-full h-full" style={{
            background: '#C87952',
            clipPath: 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)',
            filter: 'drop-shadow(0 0 10px rgba(200, 121, 82, 1))',
          }} />
        </motion.div>
        
        {/* Top right sparkle */}
        <motion.div
          initial={{ scale: 0, x: 20, y: -20 }}
          animate={{ scale: [0, 1.5, 0], x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-32 right-16 w-3 h-3"
        >
          <div className="w-full h-full" style={{
            background: '#E8B594',
            clipPath: 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)',
            filter: 'drop-shadow(0 0 8px rgba(232, 181, 148, 1))',
          }} />
        </motion.div>
        
        {/* Bottom sparkle */}
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: [0, 1.5, 0], y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-3 h-3"
        >
          <div className="w-full h-full" style={{
            background: '#C87952',
            clipPath: 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)',
            filter: 'drop-shadow(0 0 8px rgba(200, 121, 82, 1))',
          }} />
        </motion.div>
      </motion.div>
      
      {/* LAYER 9: Particle burst during transition */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed inset-0 z-[8997] pointer-events-none"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: '50vw', 
              y: '50vh',
              scale: 0,
              opacity: 1,
            }}
            animate={{ 
              x: `${20 + Math.random() * 60}vw`,
              y: `${20 + Math.random() * 60}vh`,
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ 
              duration: 0.8,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? '#C87952' : '#E8B594',
              boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(200, 121, 82, 0.8)' : 'rgba(232, 181, 148, 0.8)'}`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default PageTransition