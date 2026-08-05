import { useEffect, useRef, useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════
// TAJ MAHAL
// ═══════════════════════════════════════════════════════════════
function TajMahal({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.4]} />
        <meshStandardMaterial color="#E8DCC8" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.15, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0, 0.5, 0]}>
        <coneGeometry args={[0.02, 0.1, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} />
      </mesh>
      {[[0.25, 0.25], [-0.25, 0.25], [0.25, -0.25], [-0.25, -0.25]].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
          <mesh castShadow position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
          </mesh>
          <mesh castShadow position={[0, 0.43, 0]}>
            <sphereGeometry args={[0.05, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// GOLDEN TEMPLE
function GoldenTemple({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.35, 0.1, 0.35]} />
        <meshStandardMaterial color="#FFD700" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh castShadow position={[0, 0.4, 0]}>
        <coneGeometry args={[0.03, 0.1, 8]} />
        <meshStandardMaterial color="#FFA500" metalness={0.9} />
      </mesh>
    </group>
  )
}

// INDIA GATE
function IndiaGate({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.2]} />
        <meshStandardMaterial color="#8B6543" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.15]} />
        <meshStandardMaterial color="#D4B896" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[0.45, 0.05, 0.18]} />
        <meshStandardMaterial color="#B8875E" roughness={0.6} />
      </mesh>
    </group>
  )
}

// VICTORIA MEMORIAL
function VictoriaMemorial({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.35]} />
        <meshStandardMaterial color="#E8DCC8" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[0.45, 0.15, 0.3]} />
        <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.13, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0.18, 0.27, 0]}>
        <sphereGeometry args={[0.07, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <mesh castShadow position={[-0.18, 0.27, 0]}>
        <sphereGeometry args={[0.07, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
    </group>
  )
}

// GATEWAY OF INDIA
function GatewayOfIndia({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.35, 0.1, 0.25]} />
        <meshStandardMaterial color="#8B6543" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.2]} />
        <meshStandardMaterial color="#C8A578" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.13, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C8A578" roughness={0.5} />
      </mesh>
    </group>
  )
}

// CHARMINAR
function Charminar({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.35, 0.1, 0.35]} />
        <meshStandardMaterial color="#8B6543" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#B8875E" roughness={0.6} />
      </mesh>
      {[[0.13, 0.13], [-0.13, 0.13], [0.13, -0.13], [-0.13, -0.13]].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
          <mesh castShadow position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.4, 8]} />
            <meshStandardMaterial color="#D4B896" roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0, 0.53, 0]}>
            <coneGeometry args={[0.04, 0.08, 8]} />
            <meshStandardMaterial color="#8B6543" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// MOUNTAIN
function Mountain({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.25, 0]}>
        <coneGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial color="#6B7A85" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.13, 0.16, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.28, 0.2, 0.1]}>
        <coneGeometry args={[0.22, 0.4, 6]} />
        <meshStandardMaterial color="#5A6B75" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.28, 0.18, 0.05]}>
        <coneGeometry args={[0.24, 0.36, 6]} />
        <meshStandardMaterial color="#6B7A85" roughness={0.9} />
      </mesh>
    </group>
  )
}

// HOUSE
function House({ position, rotation, color = '#C87952', scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[0.2, 0.16, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 0.22, 0]}>
        <coneGeometry args={[0.16, 0.14, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
    </group>
  )
}

// TREE
function Tree({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.15, 6]} />
        <meshStandardMaterial color="#5C3E28" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]}>
        <coneGeometry args={[0.14, 0.3, 8]} />
        <meshStandardMaterial color="#2D5A2D" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.42, 0]}>
        <coneGeometry args={[0.11, 0.25, 8]} />
        <meshStandardMaterial color="#3A7A3A" roughness={0.8} />
      </mesh>
    </group>
  )
}

// CLOUD
function Cloud({ position, scale = 1 }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.9} transparent roughness={1} />
        </mesh>
        <mesh position={[0.3, 0.08, 0]}>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.9} transparent roughness={1} />
        </mesh>
        <mesh position={[-0.28, 0.05, 0]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.9} transparent roughness={1} />
        </mesh>
        <mesh position={[0, 0.15, 0.15]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.9} transparent roughness={1} />
        </mesh>
      </group>
    </Float>
  )
}

// ═══════════════════════════════════════════════════════════════
// THE TINY PLANET
// ═══════════════════════════════════════════════════════════════
function TinyPlanet() {
  const planetRef = useRef()
  const cloudsRef = useRef()
  
  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.08
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= delta * 0.02
    }
  })
  
  const sphereRadius = 2
  
  // Position on sphere
  const onSphere = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return [
      -sphereRadius * Math.sin(phi) * Math.cos(theta),
      sphereRadius * Math.cos(phi),
      sphereRadius * Math.sin(phi) * Math.sin(theta),
    ]
  }
  
  const rotOnSphere = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return [
      -phi + Math.PI / 2,
      -theta + Math.PI / 2,
      0,
    ]
  }
  
  return (
    <group>
      {/* PLANET (rotates) */}
      <group ref={planetRef}>
        
        {/* GREEN PLANET */}
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[sphereRadius, 64, 64]} />
          <meshStandardMaterial 
            color="#5B8B4A" 
            roughness={0.9} 
            metalness={0}
          />
        </mesh>
        
        {/* Ocean patches (smaller and less prominent) */}
        <mesh position={[1.5, 0.8, 1.2]} scale={[0.7, 0.4, 0.5]}>
          <sphereGeometry args={[sphereRadius * 0.95, 32, 32]} />
          <meshStandardMaterial 
            color="#4A90C2" 
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
        
        <mesh position={[-1.6, -0.3, 1]} scale={[0.5, 0.4, 0.5]}>
          <sphereGeometry args={[sphereRadius * 0.95, 32, 32]} />
          <meshStandardMaterial 
            color="#4A90C2" 
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
        
        {/* LANDMARKS */}
        <group position={onSphere(70, 0)} rotation={rotOnSphere(70, 0)}>
          <TajMahal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
        
        <group position={onSphere(50, -50)} rotation={rotOnSphere(50, -50)}>
          <GoldenTemple position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
        
        <group position={onSphere(30, 70)} rotation={rotOnSphere(30, 70)}>
          <IndiaGate position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
        
        <group position={onSphere(20, 140)} rotation={rotOnSphere(20, 140)}>
          <VictoriaMemorial position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
        
        <group position={onSphere(0, -110)} rotation={rotOnSphere(0, -110)}>
          <GatewayOfIndia position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
        
        <group position={onSphere(-30, 40)} rotation={rotOnSphere(-30, 40)}>
          <Charminar position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
        
        <group position={onSphere(75, 150)} rotation={rotOnSphere(75, 150)}>
          <Mountain position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.9} />
        </group>
        
        <group position={onSphere(-60, -50)} rotation={rotOnSphere(-60, -50)}>
          <Mountain position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
        
        {/* HOUSES */}
        {[
          { lat: 45, lon: 90, color: '#C87952' },
          { lat: 25, lon: -60, color: '#5A8DBE' },
          { lat: 55, lon: 30, color: '#E8B594' },
          { lat: -25, lon: -30, color: '#C87952' },
          { lat: -45, lon: 110, color: '#5A8DBE' },
          { lat: -55, lon: -110, color: '#E8B594' },
          { lat: 5, lon: 160, color: '#C87952' },
          { lat: 35, lon: -160, color: '#5A8DBE' },
          { lat: 50, lon: 160, color: '#E8B594' },
          { lat: -35, lon: 170, color: '#C87952' },
          { lat: 0, lon: -40, color: '#5A8DBE' },
          { lat: -15, lon: 60, color: '#E8B594' },
        ].map((h, i) => (
          <group key={`house-${i}`} position={onSphere(h.lat, h.lon)} rotation={rotOnSphere(h.lat, h.lon)}>
            <House position={[0, 0, 0]} rotation={[0, Math.random() * Math.PI * 2, 0]} color={h.color} scale={0.7} />
          </group>
        ))}
        
        {/* TREES */}
        {[
          { lat: 60, lon: -20 }, { lat: 50, lon: 60 }, { lat: 40, lon: -80 },
          { lat: 30, lon: 100 }, { lat: 20, lon: -30 }, { lat: 10, lon: 40 },
          { lat: -5, lon: 130 }, { lat: -15, lon: -50 }, { lat: -30, lon: 70 },
          { lat: -40, lon: -30 }, { lat: -50, lon: 130 }, { lat: 65, lon: -60 },
          { lat: 55, lon: 100 }, { lat: 35, lon: 130 }, { lat: 25, lon: -140 },
          { lat: 10, lon: -170 }, { lat: -5, lon: 80 }, { lat: -15, lon: -110 },
          { lat: -30, lon: 40 }, { lat: -60, lon: -50 }, { lat: 60, lon: 50 },
          { lat: 40, lon: 170 }, { lat: 0, lon: -140 }, { lat: -25, lon: 150 },
          { lat: 15, lon: 130 }, { lat: -10, lon: -80 }, { lat: 20, lon: 20 },
          { lat: -45, lon: 90 }, { lat: 50, lon: -110 }, { lat: 35, lon: -50 },
          { lat: 15, lon: 90 }, { lat: -20, lon: 100 }, { lat: 45, lon: -20 },
          { lat: 0, lon: 20 }, { lat: -35, lon: -80 }, { lat: 25, lon: 170 },
        ].map((t, i) => (
          <group key={`tree-${i}`} position={onSphere(t.lat, t.lon)} rotation={rotOnSphere(t.lat, t.lon)}>
            <Tree 
              position={[0, 0, 0]} 
              rotation={[0, Math.random() * Math.PI * 2, 0]} 
              scale={0.5 + Math.random() * 0.4}
            />
          </group>
        ))}
      </group>
      
      {/* CLOUDS - Independent rotation */}
      <group ref={cloudsRef}>
        <Cloud position={[3.5, 1.5, 1.5]} scale={0.8} />
        <Cloud position={[-3.2, 0.8, 1.8]} scale={0.9} />
        <Cloud position={[1.5, 3, -1]} scale={0.7} />
        <Cloud position={[-1.5, -3, 1.8]} scale={0.8} />
        <Cloud position={[3.2, -1.8, -1.8]} scale={0.75} />
        <Cloud position={[-3.2, 2.5, -1.2]} scale={0.85} />
        <Cloud position={[0, 3.5, 0]} scale={0.9} />
        <Cloud position={[3.5, 0.5, -2.2]} scale={0.7} />
      </group>
      
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 3.15, 64]} />
        <meshBasicMaterial color="#C87952" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// LIGHTING
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[8, 12, 8]} 
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-8, -3, -5]} intensity={0.4} color="#C87952" />
      <pointLight position={[0, 8, 8]} intensity={0.6} color="#FFD700" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#E8B594" />
    </>
  )
}


// MAIN HERO
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
          3D CANVAS - CAMERA FIXED! Now sees whole planet
      ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[5]">
        <Canvas
          shadows
          camera={{ position: [0, 2, 12], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <TinyPlanet />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate={false}
              minDistance={8}
              maxDistance={20}
              rotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
              minPolarAngle={Math.PI / 4}
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
              Drag to Rotate · Pinch to Zoom
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
                Drag the globe to explore. Discover landmarks from Kolkata to Kashmir.
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
          background: radial-gradient(circle, rgba(255, 153, 51, 0.2) 0%, transparent 70%);
        }
        
        .orb-2 {
          top: 40%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(19, 136, 8, 0.15) 0%, transparent 70%);
          animation-delay: 3s;
        }
        
        .orb-3 {
          bottom: 20%; left: 30%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200, 121, 82, 0.3) 0%, transparent 70%);
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