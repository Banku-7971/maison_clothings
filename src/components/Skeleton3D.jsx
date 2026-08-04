import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { FiRotateCw, FiMove, FiZoomIn } from 'react-icons/fi'

const SculptureModel = ({ autoRotate }) => {
  const groupRef = useRef()
  const torusRef = useRef()
  const sphereRef = useRef()
  const ringRef = useRef()
  
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.2
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.15
    }
  })
  
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshPhysicalMaterial
            color="#B76E5D"
            metalness={0.9}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
      
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshPhysicalMaterial
          color="#B76E5D"
          metalness={1}
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>
      
      <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#B76E5D" transparent opacity={0.4} />
      </mesh>
      
      {[
        { position: [2.5, 0.5, 0], size: 0.15, delay: 0 },
        { position: [-2.3, -0.3, 0.5], size: 0.12, delay: 1 },
        { position: [0.5, 2.2, -0.5], size: 0.1, delay: 2 },
        { position: [-0.8, -2, 0.3], size: 0.13, delay: 3 },
        { position: [1.8, -1.5, -0.8], size: 0.11, delay: 4 },
        { position: [-1.9, 1.7, 0.6], size: 0.14, delay: 5 },
      ].map((sat, index) => (
        <Float
          key={index}
          speed={1 + sat.delay * 0.2}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <mesh position={sat.position}>
            <sphereGeometry args={[sat.size, 32, 32]} />
            <meshPhysicalMaterial
              color="#F5EBDD"
              metalness={0.8}
              roughness={0.1}
              clearcoat={1}
            />
          </mesh>
        </Float>
      ))}
      
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.015, 8, 100]} />
        <meshBasicMaterial color="#F5EBDD" transparent opacity={0.15} />
      </mesh>
      
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.015, 8, 100]} />
        <meshBasicMaterial color="#F5EBDD" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

const SceneLighting = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#F5EBDD" castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#B76E5D" />
      <directionalLight position={[0, -5, 5]} intensity={0.5} color="#B76E5D" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} color="#F5EBDD" />
    </>
  )
}

const LoadingFallback = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-noir">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-px bg-graphite overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <p 
          className="text-tiny tracking-mega text-silver uppercase font-mono"
          style={{ fontSize: '0.65rem' }}
        >
          Loading Sculpture
        </p>
      </div>
    </div>
  )
}


const Skeleton3D = () => {
  const [autoRotate, setAutoRotate] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  
  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => setShowInstructions(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [hasInteracted])
  
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setAutoRotate(false)
    }
  }
  
  return (
    <section className="relative w-full min-h-screen bg-noir py-24 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(183,110,93,0.15) 0%, transparent 60%)',
        }}
      />
      
      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-tiny tracking-mega text-gold uppercase mb-8"
              style={{ fontSize: '0.7rem' }}
            >
              — The Atelier Signature
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-light text-ivory mb-8"
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Sculpture of
              <br />
              <em className="italic text-gold">form and intention</em>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-cormorant italic text-platinum text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Every MAISON piece begins as sculpture in our Kolkata atelier — 
              form conceived in three dimensions before touching fabric. 
              Explore our signature symbol from every angle.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              {[
                { icon: FiRotateCw, text: 'Drag to rotate 360°' },
                { icon: FiMove, text: 'Right-click to pan' },
                { icon: FiZoomIn, text: 'Scroll to zoom' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <item.icon className="text-gold" size={16} />
                  <span className="text-sm text-platinum font-cormorant">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => setAutoRotate(!autoRotate)}
              className="inline-flex items-center gap-3 py-3 px-6 border border-graphite hover:border-gold text-ivory hover:text-gold transition-all duration-400 rounded-full"
              data-cursor="hover"
            >
              <div className={`w-2 h-2 rounded-full transition-colors duration-400 ${autoRotate ? 'bg-gold animate-pulse' : 'bg-silver'}`} />
              <span 
                className="text-tiny tracking-mega uppercase"
                style={{ fontSize: '0.7rem' }}
              >
                {autoRotate ? 'Auto Rotating' : 'Auto Rotate Off'}
              </span>
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full max-w-2xl mx-auto"
            onMouseDown={handleInteraction}
            onTouchStart={handleInteraction}
            data-cursor="drag"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-charcoal to-noir border border-graphite/30 overflow-hidden rounded-2xl">
              
              <div className="absolute top-4 left-4 z-10">
                <div className="w-4 h-px bg-gold" />
                <div className="w-px h-4 bg-gold" />
              </div>
              <div className="absolute top-4 right-4 z-10">
                <div className="w-4 h-px bg-gold ml-auto" />
                <div className="w-px h-4 bg-gold ml-auto" />
              </div>
              <div className="absolute bottom-4 left-4 z-10">
                <div className="w-px h-4 bg-gold" />
                <div className="w-4 h-px bg-gold" />
              </div>
              <div className="absolute bottom-4 right-4 z-10">
                <div className="w-px h-4 bg-gold ml-auto" />
                <div className="w-4 h-px bg-gold ml-auto" />
              </div>
              
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                <p 
                  className="text-tiny tracking-mega text-silver uppercase font-mono"
                  style={{ fontSize: '0.6rem' }}
                >
                  MSN—SCULPT—001
                </p>
              </div>
              
              {showInstructions && !hasInteracted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-end justify-center pb-8 pointer-events-none"
                >
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-center"
                  >
                    <FiRotateCw className="text-gold mx-auto mb-2" size={20} />
                    <p 
                      className="text-tiny tracking-mega text-gold uppercase font-mono"
                      style={{ fontSize: '0.65rem' }}
                    >
                      Drag to Rotate
                    </p>
                  </motion.div>
                </motion.div>
              )}
              
              <Suspense fallback={<LoadingFallback />}>
                <Canvas
                  camera={{ position: [0, 0, 6], fov: 45 }}
                  gl={{ antialias: true, alpha: true }}
                  dpr={[1, 2]}
                  onCreated={({ gl }) => gl.setClearColor('#2A1F1A', 0)}
                >
                  <fog attach="fog" args={['#2A1F1A', 8, 15]} />
                  <SceneLighting />
                  <SculptureModel autoRotate={autoRotate} />
                  <ContactShadows
                    position={[0, -2.5, 0]}
                    opacity={0.4}
                    scale={8}
                    blur={2.5}
                    far={4}
                    color="#000000"
                  />
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={false}
                    onChange={handleInteraction}
                  />
                </Canvas>
              </Suspense>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <p 
                  className="text-tiny tracking-mega text-silver uppercase font-mono"
                  style={{ fontSize: '0.6rem' }}
                >
                  Interactive 3D · WebGL
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skeleton3D