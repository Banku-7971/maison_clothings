import { motion } from 'framer-motion'

const PageTransition = ({ children }) => {
  return (
    <>
      {/* PAGE CONTENT — Always visible, never blocked */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ minHeight: '100vh', width: '100%' }}
      >
        {children}
      </motion.div>
      
      {/* TRANSITION OVERLAY — Slides through and LEAVES */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
        className="fixed inset-0 pointer-events-none origin-bottom"
        style={{
          zIndex: 9000,
          background: 'linear-gradient(180deg, #2A1F1A 0%, #3D2E24 30%, #C87952 50%, #3D2E24 70%, #2A1F1A 100%)',
        }}
      />
      
      {/* SECOND LAYER — Slightly delayed */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1], delay: 0.1 }}
        className="fixed inset-0 pointer-events-none origin-top"
        style={{
          zIndex: 8999,
          background: 'linear-gradient(0deg, #2A1F1A 0%, #5C1E2E 50%, #2A1F1A 100%)',
        }}
      />
      
      {/* GOLDEN LINE SWEEP */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="fixed top-1/2 left-0 right-0 h-[2px] pointer-events-none origin-left"
        style={{
          zIndex: 9001,
          background: 'linear-gradient(90deg, transparent, #C87952, #E8B594, #C87952, transparent)',
          boxShadow: '0 0 20px rgba(200, 121, 82, 0.8)',
        }}
      />
    </>
  )
}

export default PageTransition