import { useEffect, useRef, useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'
import { FiArrowDown } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// 3D TINY PLANET WITH BUILDINGS
// ═══════════════════════════════════════════════════════════════

// Individual building component
function Building({ position, rotation, color, height, width, type = 'box' }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      {type === 'box' && <boxGeometry args={[width, height, width]} />}
      {type === 'cone' && <coneGeometry args={[width * 0.6, height, 4]} />}
      {type === 'cylinder' && <cylinderGeometry args={[width * 0.5, width * 0.6, height, 8]} />}
      {type === 'dome' && <sphereGeometry args={[width * 0.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />}
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
    </mesh>
  )
}

// Tree component
function Tree({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.2, 6]} />
        <meshStandardMaterial color="#5C3E28" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="#2D5A2D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial color="#3A7A3A" roughness={0.8} />
      </mesh>
    </group>
  )
}

// Cloud component
function Cloud({ position }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.9} transparent roughness={1} />
        </mesh>
        <mesh position={[0.12, 0.05, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.9} transparent roughness={1} />
        </mesh>
        <mesh position={[-0.1, 0.03, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.9} transparent roughness={1} />
        </mesh>
      </group>
    </Float>
  )
}

// The tiny planet
function TinyPlanet() {
  const planetRef = useRef()
  const cloudsRef = useRef()
  
  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.15
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= delta * 0.05
    }
  })
  
  // Generate positions on sphere
  const sphereRadius = 1.5
  
  // Function to position objects on sphere surface
  const positionOnSphere = (theta, phi, offset = 0) => {
    const r = sphereRadius + offset
    return [
      r * Math.sin(theta) * Math.cos(phi),
      r * Math.cos(theta),
      r * Math.sin(theta) * Math.sin(phi),
    ]
  }
  
  const rotationOnSphere = (theta, phi) => {
    return [theta, phi, 0]
  }
  
  return (
    <group>
      {/* MAIN GLOBE SPHERE */}
      <group ref={planetRef}>
        {/* Green land base */}
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[sphereRadius, 64, 64]} />
          <meshStandardMaterial 
            color="#4A7C3A" 
            roughness={0.9} 
            metalness={0}
          />
        </mesh>
        
        {/* Ocean/water patches */}
        <mesh position={[0.8, 0.5, 1]} scale={[0.7, 0.4, 0.4]}>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial 
            color="#3A7CA5" 
            roughness={0.4}
            metalness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        <mesh position={[-1, -0.3, 0.5]} scale={[0.5, 0.3, 0.5]}>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial 
            color="#3A7CA5" 
            roughness={0.4}
            metalness={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>
        
        {/* ═══════════════════════════════════
            INDIAN LANDMARKS (Stylized 3D)
        ═══════════════════════════════════ */}
        
        {/* TAJ MAHAL — Big central dome */}
        <group position={positionOnSphere(1.2, 0.5, 0)} rotation={rotationOnSphere(1.2, 0.5)}>
          {/* Base */}
          <mesh castShadow position={[0, 0.05, 0]}>
            <boxGeometry args={[0.4, 0.15, 0.4]} />
            <meshStandardMaterial color="#F5EBDD" roughness={0.5} />
          </mesh>
          {/* Main dome */}
          <mesh castShadow position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
          </mesh>
          {/* Dome top */}
          <mesh castShadow position={[0, 0.42, 0]}>
            <coneGeometry args={[0.03, 0.1, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* 4 Minarets */}
          {[[0.25, 0.25], [-0.25, 0.25], [0.25, -0.25], [-0.25, -0.25]].map((pos, i) => (
            <group key={i} position={[pos[0], 0, pos[1]]}>
              <mesh castShadow position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.03, 0.04, 0.3, 8]} />
                <meshStandardMaterial color="#F5EBDD" roughness={0.5} />
              </mesh>
              <mesh castShadow position={[0, 0.32, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} />
              </mesh>
            </group>
          ))}
        </group>
        
        {/* GOLDEN TEMPLE */}
        <group position={positionOnSphere(0.9, 2, 0)} rotation={rotationOnSphere(0.9, 2)}>
          <mesh castShadow position={[0, 0.05, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.3]} />
            <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh castShadow position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.13, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh castShadow position={[0, 0.33, 0]}>
            <coneGeometry args={[0.03, 0.08, 8]} />
            <meshStandardMaterial color="#FFA500" metalness={0.8} />
          </mesh>
        </group>
        
        {/* INDIA GATE */}
        <group position={positionOnSphere(1.5, 1.2, 0)} rotation={rotationOnSphere(1.5, 1.2)}>
          <mesh castShadow position={[0, 0.15, 0]}>
            <boxGeometry args={[0.3, 0.35, 0.15]} />
            <meshStandardMaterial color="#D4B896" roughness={0.6} />
          </mesh>
          {/* Arch cut */}
          <mesh castShadow position={[0, 0.15, 0]}>
            <boxGeometry args={[0.15, 0.25, 0.16]} />
            <meshStandardMaterial color="#3A2E22" />
          </mesh>
        </group>
        
        {/* GATEWAY OF INDIA (Mumbai) */}
        <group position={positionOnSphere(2, -1, 0)} rotation={rotationOnSphere(2, -1)}>
          <mesh castShadow position={[0, 0.12, 0]}>
            <boxGeometry args={[0.35, 0.28, 0.2]} />
            <meshStandardMaterial color="#C8A578" roughness={0.6} />
          </mesh>
          {/* Central dome */}
          <mesh castShadow position={[0, 0.32, 0]}>
            <sphereGeometry args={[0.1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#C8A578" roughness={0.5} />
          </mesh>
        </group>
        
        {/* VICTORIA MEMORIAL (Kolkata) - YOUR CITY! */}
        <group position={positionOnSphere(1.3, -1.5, 0)} rotation={rotationOnSphere(1.3, -1.5)}>
          <mesh castShadow position={[0, 0.08, 0]}>
            <boxGeometry args={[0.4, 0.15, 0.3]} />
            <meshStandardMaterial color="#F5EBDD" roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.15, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
          </mesh>
          <mesh castShadow position={[0, 0.38, 0]}>
            <coneGeometry args={[0.02, 0.05, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} />
          </mesh>
        </group>
        
        {/* CHARMINAR */}
        <group position={positionOnSphere(1.8, 2.5, 0)} rotation={rotationOnSphere(1.8, 2.5)}>
          <mesh castShadow position={[0, 0.1, 0]}>
            <boxGeometry args={[0.3, 0.2, 0.3]} />
            <meshStandardMaterial color="#B8875E" roughness={0.6} />
          </mesh>
          {/* 4 Minarets */}
          {[[0.13, 0.13], [-0.13, 0.13], [0.13, -0.13], [-0.13, -0.13]].map((pos, i) => (
            <group key={i} position={[pos[0], 0, pos[1]]}>
              <mesh castShadow position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.025, 0.03, 0.35, 8]} />
                <meshStandardMaterial color="#D4B896" roughness={0.5} />
              </mesh>
              <mesh castShadow position={[0, 0.4, 0]}>
                <coneGeometry args={[0.04, 0.08, 8]} />
                <meshStandardMaterial color="#8B6543" roughness={0.5} />
              </mesh>
            </group>
          ))}
        </group>
        
        {/* MOUNTAINS (Himalayas) */}
        <group position={positionOnSphere(0.3, 1, 0)} rotation={rotationOnSphere(0.3, 1)}>
          <mesh castShadow position={[0, 0.15, 0]}>
            <coneGeometry args={[0.2, 0.4, 6]} />
            <meshStandardMaterial color="#6B7A85" roughness={0.9} />
          </mesh>
          <mesh castShadow position={[0.15, 0.1, 0.1]}>
            <coneGeometry args={[0.15, 0.3, 6]} />
            <meshStandardMaterial color="#5A6B75" roughness={0.9} />
          </mesh>
          <mesh castShadow position={[-0.15, 0.12, 0.05]}>
            <coneGeometry args={[0.18, 0.35, 6]} />
            <meshStandardMaterial color="#6B7A85" roughness={0.9} />
          </mesh>
          {/* Snow caps */}
          <mesh position={[0, 0.32, 0]}>
            <coneGeometry args={[0.08, 0.12, 6]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
          </mesh>
        </group>
        
        {/* HOUSES (Small Indian houses) */}
        {[
          [1.0, 3, 'red'],
          [1.8, 3.5, 'blue'],
          [2.2, 0.3, 'yellow'],
          [0.7, -0.5, 'red'],
          [2.5, -0.8, 'blue'],
          [1.5, -2.2, 'yellow'],
          [2.4, 1.8, 'red'],
          [0.5, 2.3, 'blue'],
        ].map((house, i) => {
          const [theta, phi, color] = house
          const colorMap = { red: '#C87952', blue: '#5A8DBE', yellow: '#E8B594' }
          return (
            <group key={i} position={positionOnSphere(theta, phi, 0)} rotation={rotationOnSphere(theta, phi)}>
              {/* House body */}
              <mesh castShadow position={[0, 0.05, 0]}>
                <boxGeometry args={[0.15, 0.15, 0.15]} />
                <meshStandardMaterial color={colorMap[color]} roughness={0.6} />
              </mesh>
              {/* Roof */}
              <mesh castShadow position={[0, 0.15, 0]}>
                <coneGeometry args={[0.12, 0.1, 4]} />
                <meshStandardMaterial color="#8B4513" roughness={0.7} />
              </mesh>
            </group>
          )
        })}
        
        {/* TREES scattered on planet */}
        {[
          [0.5, 0.5], [0.6, 1.5], [0.7, 2.5], [0.8, 3.5],
          [1.0, 0.2], [1.1, 1.8], [1.2, 2.8], [1.3, 4],
          [1.5, 0.8], [1.6, 2.1], [1.7, 3.2], [1.8, 4.5],
          [2.0, 0.6], [2.1, 1.6], [2.2, 2.6], [2.3, 3.8],
          [2.5, 0.4], [2.6, 1.4], [2.7, 2.4], [2.8, 3.4],
        ].map((pos, i) => {
          const [theta, phi] = pos
          return (
            <group key={`tree-${i}`} position={positionOnSphere(theta, phi, 0)} rotation={rotationOnSphere(theta, phi)}>
              <Tree position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.4 + Math.random() * 0.3} />
            </group>
          )
        })}
      </group>
      
      {/* CLOUDS around planet (not rotating with globe) */}
      <group ref={cloudsRef}>
        <Cloud position={[2, 1, 0.5]} />
        <Cloud position={[-1.8, 0.5, 1]} />
        <Cloud position={[0.5, 2, -0.5]} />
        <Cloud position={[-0.5, -1.5, 1.5]} />
        <Cloud position={[1.5, -1, -1]} />
        <Cloud position={[-1.5, 1.5, -0.8]} />
      </group>
      
      {/* Ambient glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.6, 64]} />
        <meshBasicMaterial color="#C87952" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Scene lighting
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#C87952" />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#E8B594" />
    </>
  )
}

// Loading fallback
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-champagne text-sm font-mono uppercase tracking-widest">Loading...</div>
    </div>
  )
}


// MAIN HERO COMPONENT
const HeroSection = () => {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.5])
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-noir hero-planet-3d"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #2A1F1A 0%, #3D2E24 40%, #5C1E2E 100%)',
        }}
      />
      
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>
      
      {/* ═══════════════════════════════════════════════
          THE 3D CANVAS with ROTATING PLANET
      ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[5]">
        <Canvas
          shadows
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <TinyPlanet />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* TOP LABEL */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 md:top-40 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-2xl">🇮🇳</span>
            <p 
              className="text-tiny tracking-mega uppercase font-mono"
              style={{ 
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: '#E8B594',
              }}
            >
              Made in India · Loved Worldwide
            </p>
            <span className="text-2xl">✨</span>
          </div>
        </div>
      </motion.div>
      
      {/* BOTTOM CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-end pb-32 md:pb-40 pointer-events-none"
      >
        <div className="container-luxury w-full">
          <div className="max-w-6xl mx-auto text-center">
            
            <h1 
              className="font-cormorant font-light text-ivory leading-none mb-8"
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
              }}
            >
              <div className="overflow-hidden mb-2">
                <motion.span 
                  initial={{ y: '120%', opacity: 0 }}
                  animate={mounted ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                  style={{ textShadow: '0 0 40px rgba(200, 121, 82, 0.6)' }}
                >
                  Handmade in
                </motion.span>
              </div>
              
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: '120%', opacity: 0 }}
                  animate={mounted ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-champagne via-gold to-terracotta bg-clip-text text-transparent"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(200, 121, 82, 0.6))' }}
                >
                  <em className="italic">Incredible India</em>
                </motion.span>
              </div>
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="mb-10 max-w-2xl mx-auto"
            >
              <p 
                className="font-cormorant italic text-cream leading-relaxed"
                style={{ 
                  fontSize: 'clamp(1rem, 1.5vw, 1.375rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                }}
              >
                From the streets of Kolkata to your doorstep.
                <br />
                Delivered with <span className="text-gold not-italic">love</span> across India.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
            >
              <Link
                to="/shop"
                className="hero-btn-primary group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 rounded-full transition-all duration-500"
                data-cursor="hover"
              >
                <div className="hero-btn-glow" />
                <span 
                  className="relative z-10 text-tiny tracking-mega uppercase font-bold text-noir"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  Explore Collection 🛍️
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 border-2 border-champagne/40 text-champagne rounded-full hover:border-champagne hover:bg-champagne/10 transition-all duration-500 backdrop-blur-sm"
                data-cursor="hover"
              >
                <span 
                  className="text-tiny tracking-mega uppercase font-medium"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
                >
                  Our Story ✨
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 right-0 py-4 border-t border-gold/20 overflow-hidden z-10"
        style={{
          background: 'linear-gradient(to right, rgba(92,30,46,0.7), rgba(42,31,26,0.95), rgba(200,121,82,0.7))',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div 
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: 'marqueeIndia 30s linear infinite' }}
        >
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-16 flex-shrink-0">
              {[
                { text: 'Est. Kolkata 2025', emoji: '🇮🇳' },
                { text: 'Handcrafted', emoji: '✨' },
                { text: 'Free Shipping ₹5,000+', emoji: '📦' },
                { text: 'COD Available', emoji: '💰' },
                { text: 'Pan-India Delivery', emoji: '🌏' },
                { text: 'Made with Love', emoji: '❤️' },
              ].map((item, i) => (
                <span 
                  key={i} 
                  className="text-tiny tracking-mega text-champagne uppercase font-mono flex items-center gap-3" 
                  style={{ fontSize: '0.75rem' }}
                >
                  <span className="text-base">{item.emoji}</span>
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      
      <style>{`
        .hero-planet-3d * {
          will-change: auto;
        }
        
        @keyframes marqueeIndia {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 15s ease-in-out infinite;
        }
        
        .orb-1 {
          top: 10%; left: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255, 153, 51, 0.25) 0%, transparent 70%);
        }
        
        .orb-2 {
          top: 40%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(19, 136, 8, 0.2) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        .orb-3 {
          bottom: 20%; left: 30%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.35) 0%, transparent 70%);
          animation-delay: 6s;
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.15); }
        }
        
        .hero-btn-primary {
          background: linear-gradient(135deg, #C87952 0%, #E8B594 100%);
          box-shadow: 0 0 40px rgba(200, 121, 82, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4);
          position: relative;
        }
        
        .hero-btn-primary:hover {
          transform: translateY(-3px);
        }
        
        .hero-btn-glow {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #C87952, #E8B594);
          animation: btnGlow 3s ease-in-out infinite;
        }
        
        @keyframes btnGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection