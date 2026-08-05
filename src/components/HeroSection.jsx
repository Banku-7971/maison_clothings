import { useEffect, useRef, useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════
// 3D INDIAN LANDMARKS (Real geometry)
// ═══════════════════════════════════════════════════════════════

// TAJ MAHAL — Detailed
function TajMahal({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base platform */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#E8DCC8" roughness={0.6} />
      </mesh>
      
      {/* Main building */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
      </mesh>
      
      {/* Main dome */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Dome spire */}
      <mesh castShadow position={[0, 0.6, 0]}>
        <coneGeometry args={[0.03, 0.15, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* 4 Minarets */}
      {[[0.35, 0.35], [-0.35, 0.35], [0.35, -0.35], [-0.35, -0.35]].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
          <mesh castShadow position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 0.5, 8]} />
            <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
          </mesh>
          <mesh castShadow position={[0, 0.55, 0]}>
            <sphereGeometry args={[0.06, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          <mesh castShadow position={[0, 0.63, 0]}>
            <coneGeometry args={[0.02, 0.06, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// GOLDEN TEMPLE
function GoldenTemple({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.4]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Middle */}
      <mesh castShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[0.35, 0.15, 0.35]} />
        <meshStandardMaterial color="#FFA500" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Main dome */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
      </mesh>
      
      {/* Small domes on corners */}
      {[[0.15, 0.15], [-0.15, 0.15], [0.15, -0.15], [-0.15, -0.15]].map((pos, i) => (
        <mesh key={i} castShadow position={[pos[0], 0.3, pos[1]]}>
          <sphereGeometry args={[0.05, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      
      {/* Top spire */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <coneGeometry args={[0.03, 0.12, 8]} />
        <meshStandardMaterial color="#FFA500" metalness={0.9} />
      </mesh>
    </group>
  )
}

// INDIA GATE
function IndiaGate({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.2]} />
        <meshStandardMaterial color="#8B6543" roughness={0.7} />
      </mesh>
      
      {/* Main arch structure */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.4, 0.35, 0.15]} />
        <meshStandardMaterial color="#D4B896" roughness={0.6} />
      </mesh>
      
      {/* Top decoration */}
      <mesh castShadow position={[0, 0.48, 0]}>
        <boxGeometry args={[0.45, 0.05, 0.18]} />
        <meshStandardMaterial color="#B8875E" roughness={0.6} />
      </mesh>
      
      {/* Arch opening (dark) */}
      <mesh position={[0, 0.2, 0.076]}>
        <boxGeometry args={[0.15, 0.25, 0.02]} />
        <meshStandardMaterial color="#1A1108" />
      </mesh>
    </group>
  )
}

// VICTORIA MEMORIAL (Kolkata!)
function VictoriaMemorial({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#E8DCC8" roughness={0.5} />
      </mesh>
      
      {/* Main building */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.55, 0.2, 0.35]} />
        <meshStandardMaterial color="#F5EBDD" roughness={0.4} />
      </mesh>
      
      {/* Central big dome */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.15, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      
      {/* Center spire */}
      <mesh castShadow position={[0, 0.58, 0]}>
        <coneGeometry args={[0.02, 0.1, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} />
      </mesh>
      
      {/* Side domes */}
      <mesh castShadow position={[0.2, 0.35, 0]}>
        <sphereGeometry args={[0.08, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <mesh castShadow position={[-0.2, 0.35, 0]}>
        <sphereGeometry args={[0.08, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
    </group>
  )
}

// GATEWAY OF INDIA (Mumbai)
function GatewayOfIndia({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.25]} />
        <meshStandardMaterial color="#8B6543" roughness={0.7} />
      </mesh>
      
      {/* Main structure */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.2]} />
        <meshStandardMaterial color="#C8A578" roughness={0.6} />
      </mesh>
      
      {/* Central dome */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.15, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C8A578" roughness={0.5} />
      </mesh>
    </group>
  )
}

// CHARMINAR
function Charminar({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.4]} />
        <meshStandardMaterial color="#8B6543" roughness={0.7} />
      </mesh>
      
      {/* Central structure */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.35]} />
        <meshStandardMaterial color="#B8875E" roughness={0.6} />
      </mesh>
      
      {/* 4 Corner minarets */}
      {[[0.15, 0.15], [-0.15, 0.15], [0.15, -0.15], [-0.15, -0.15]].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
          <mesh castShadow position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.5, 8]} />
            <meshStandardMaterial color="#D4B896" roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0, 0.6, 0]}>
            <coneGeometry args={[0.05, 0.1, 8]} />
            <meshStandardMaterial color="#8B6543" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// MOUNTAIN (Himalayas)
function Mountain({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main peak */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <coneGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial color="#6B7A85" roughness={0.9} />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.12, 0.15, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
      </mesh>
      {/* Side peaks */}
      <mesh castShadow position={[0.25, 0.2, 0.1]}>
        <coneGeometry args={[0.2, 0.4, 6]} />
        <meshStandardMaterial color="#5A6B75" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.25, 0.18, 0.05]}>
        <coneGeometry args={[0.22, 0.35, 6]} />
        <meshStandardMaterial color="#6B7A85" roughness={0.9} />
      </mesh>
    </group>
  )
}

// HOUSE
function House({ position, rotation, color = '#C87952' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh castShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[0.18, 0.16, 0.18]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Roof */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <coneGeometry args={[0.14, 0.12, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
    </group>
  )
}

// TREE
function Tree({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Trunk */}
      <mesh castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.15, 6]} />
        <meshStandardMaterial color="#5C3E28" roughness={0.9} />
      </mesh>
      {/* Leaves layers */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#2D5A2D" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.4, 0]}>
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshStandardMaterial color="#3A7A3A" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.52, 0]}>
        <coneGeometry args={[0.08, 0.18, 8]} />
        <meshStandardMaterial color="#4A8A4A" roughness={0.8} />
      </mesh>
    </group>
  )
}

// CLOUD
function Cloud({ position }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.85} transparent roughness={1} />
        </mesh>
        <mesh position={[0.2, 0.05, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.85} transparent roughness={1} />
        </mesh>
        <mesh position={[-0.18, 0.03, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.85} transparent roughness={1} />
        </mesh>
        <mesh position={[0, 0.1, 0.1]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" opacity={0.85} transparent roughness={1} />
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
      planetRef.current.rotation.y += delta * 0.1
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= delta * 0.03
    }
  })
  
  const sphereRadius = 2
  
  // Function to place objects on sphere surface
  const onSphere = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return [
      -sphereRadius * Math.sin(phi) * Math.cos(theta),
      sphereRadius * Math.cos(phi),
      sphereRadius * Math.sin(phi) * Math.sin(theta),
    ]
  }
  
  // Rotation to make object stand upright on sphere
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
      {/* MAIN PLANET (rotates) */}
      <group ref={planetRef}>
        
        {/* GREEN GLOBE */}
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[sphereRadius, 64, 64]} />
          <meshStandardMaterial 
            color="#5B8B4A" 
            roughness={0.9} 
            metalness={0}
          />
        </mesh>
        
        {/* Water/Ocean patches */}
        <mesh position={[1.2, 0.8, 1.4]} scale={[0.9, 0.5, 0.5]}>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial 
            color="#4A90C2" 
            roughness={0.3}
            metalness={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        
        <mesh position={[-1.5, -0.5, 1]} scale={[0.6, 0.4, 0.6]}>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial 
            color="#4A90C2" 
            roughness={0.3}
            metalness={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        <mesh position={[0.5, -1.5, 1.2]} scale={[0.5, 0.5, 0.5]}>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial 
            color="#4A90C2" 
            roughness={0.3}
            metalness={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Green grass patches (lighter areas) */}
        <mesh position={[0, 2, 0]} scale={[0.8, 0.3, 0.8]}>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial color="#6B9B5A" roughness={0.9} transparent opacity={0.6} />
        </mesh>
        
        {/* ═══════════════════════════════════
            LANDMARKS on the sphere
        ═══════════════════════════════════ */}
        
        {/* TAJ MAHAL - Top center */}
        <group position={onSphere(70, 0)} rotation={rotOnSphere(70, 0)}>
          <TajMahal position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* GOLDEN TEMPLE - Top left */}
        <group position={onSphere(60, -40)} rotation={rotOnSphere(60, -40)}>
          <GoldenTemple position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* INDIA GATE - Middle right */}
        <group position={onSphere(30, 60)} rotation={rotOnSphere(30, 60)}>
          <IndiaGate position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* VICTORIA MEMORIAL (Kolkata!) - Front */}
        <group position={onSphere(20, 120)} rotation={rotOnSphere(20, 120)}>
          <VictoriaMemorial position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* GATEWAY OF INDIA (Mumbai) - Left */}
        <group position={onSphere(10, -90)} rotation={rotOnSphere(10, -90)}>
          <GatewayOfIndia position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* CHARMINAR - Bottom right */}
        <group position={onSphere(-30, 40)} rotation={rotOnSphere(-30, 40)}>
          <Charminar position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* HIMALAYAS - Top far */}
        <group position={onSphere(75, 180)} rotation={rotOnSphere(75, 180)}>
          <Mountain position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* MOUNTAIN 2 - Back */}
        <group position={onSphere(40, 200)} rotation={rotOnSphere(40, 200)}>
          <Mountain position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        {/* HOUSES scattered */}
        {[
          { lat: 40, lon: 80, color: '#C87952' },
          { lat: 20, lon: -60, color: '#5A8DBE' },
          { lat: 50, lon: 30, color: '#E8B594' },
          { lat: -20, lon: -30, color: '#C87952' },
          { lat: -40, lon: 100, color: '#5A8DBE' },
          { lat: -50, lon: -100, color: '#E8B594' },
          { lat: 0, lon: 150, color: '#C87952' },
          { lat: 30, lon: -150, color: '#5A8DBE' },
          { lat: 45, lon: 150, color: '#E8B594' },
          { lat: -30, lon: 170, color: '#C87952' },
        ].map((h, i) => (
          <group key={`house-${i}`} position={onSphere(h.lat, h.lon)} rotation={rotOnSphere(h.lat, h.lon)}>
            <House position={[0, 0, 0]} rotation={[0, 0, 0]} color={h.color} />
          </group>
        ))}
        
        {/* TREES scattered everywhere */}
        {[
          { lat: 55, lon: -20 }, { lat: 45, lon: 50 }, { lat: 35, lon: -80 },
          { lat: 25, lon: 90 }, { lat: 15, lon: -20 }, { lat: 5, lon: 40 },
          { lat: -10, lon: 130 }, { lat: -20, lon: -50 }, { lat: -35, lon: 70 },
          { lat: -45, lon: -30 }, { lat: -55, lon: 130 }, { lat: 65, lon: -60 },
          { lat: 55, lon: 100 }, { lat: 35, lon: 130 }, { lat: 25, lon: -140 },
          { lat: 10, lon: -170 }, { lat: -5, lon: 80 }, { lat: -15, lon: -110 },
          { lat: -30, lon: 40 }, { lat: -60, lon: -50 }, { lat: 60, lon: 50 },
          { lat: 40, lon: 170 }, { lat: 0, lon: -140 }, { lat: -25, lon: 150 },
          { lat: 15, lon: 130 }, { lat: -10, lon: -80 }, { lat: 20, lon: 20 },
          { lat: -45, lon: 90 }, { lat: 50, lon: -110 }, { lat: 35, lon: -50 },
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
      
      {/* CLOUDS - Don't rotate with planet */}
      <group ref={cloudsRef}>
        <Cloud position={[3, 1, 1]} />
        <Cloud position={[-2.5, 0.5, 1.5]} />
        <Cloud position={[1, 2.5, -1]} />
        <Cloud position={[-1, -2.5, 1.5]} />
        <Cloud position={[2.5, -1.5, -1.5]} />
        <Cloud position={[-2.5, 2, -1]} />
        <Cloud position={[0, 3, 0]} />
        <Cloud position={[3, 0, -2]} />
      </group>
      
      {/* Glow ring around planet */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.4, 64]} />
        <meshBasicMaterial color="#C87952" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// SCENE LIGHTING
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#C87952" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#FFD700" />
      <pointLight position={[3, -3, 3]} intensity={0.3} color="#E8B594" />
    </>
  )
}


// ═══════════════════════════════════════════════════════════════
// MAIN HERO
// ═══════════════════════════════════════════════════════════════
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
          3D CANVAS - DRAGGABLE PLANET!
      ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[5]">
        <Canvas
          shadows
          camera={{ position: [0, 0, 7], fov: 45 }}
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
              minDistance={5}
              maxDistance={12}
              rotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
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
              Drag to Explore India · 360°
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