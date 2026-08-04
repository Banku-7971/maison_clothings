import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg'
import { motion } from 'framer-motion'
import { FiRotateCw, FiMove, FiZoomIn } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — REALISTIC 3D SKULL
// Built with CSG operations for eye sockets and details
// ═══════════════════════════════════════════════════════════════

const Skull3DCanvas = () => {
  const containerRef = useRef(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const controlsRef = useRef(null)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const width = container.clientWidth
    const height = container.clientHeight
    
    // ─────────────────────────────────────────
    // SCENE SETUP
    // ─────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x2A1F1A, 0.05)
    
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 6)
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)
    
    // ─────────────────────────────────────────
    // ENVIRONMENT
    // ─────────────────────────────────────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
    
    // ─────────────────────────────────────────
    // LIGHTING — Dramatic and warm
    // ─────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    
    // Key light (warm, from top-right)
    const keyLight = new THREE.DirectionalLight(0xffe4b5, 2)
    keyLight.position.set(5, 8, 5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    keyLight.shadow.bias = -0.0001
    scene.add(keyLight)
    
    // Fill light (terracotta glow from left)
    const fillLight = new THREE.DirectionalLight(0xC87952, 0.8)
    fillLight.position.set(-5, 3, -3)
    scene.add(fillLight)
    
    // Rim light (dramatic edge highlight)
    const rimLight = new THREE.DirectionalLight(0xE8B594, 0.6)
    rimLight.position.set(0, -5, -5)
    scene.add(rimLight)
    
    // Bottom warm glow
    const bottomLight = new THREE.PointLight(0xC87952, 0.5)
    bottomLight.position.set(0, -3, 3)
    scene.add(bottomLight)
    
    // ─────────────────────────────────────────
    // BONE TEXTURE — Aged ivory
    // ─────────────────────────────────────────
    function createBoneTexture() {
      const size = 512
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      
      // Base bone color (aged ivory)
      const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
      gradient.addColorStop(0, '#e8dcc0')
      gradient.addColorStop(0.4, '#d4c4a0')
      gradient.addColorStop(0.8, '#b8a480')
      gradient.addColorStop(1, '#8a7860')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)
      
      // Age stains (darker patches)
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const r = Math.random() * 40 + 10
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, 'rgba(90, 70, 40, 0.4)')
        g.addColorStop(1, 'rgba(90, 70, 40, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Cracks (fine dark lines)
      ctx.strokeStyle = 'rgba(60, 40, 20, 0.3)'
      ctx.lineWidth = 0.8
      for (let i = 0; i < 30; i++) {
        ctx.beginPath()
        const startX = Math.random() * size
        const startY = Math.random() * size
        ctx.moveTo(startX, startY)
        let x = startX
        let y = startY
        for (let j = 0; j < 5; j++) {
          x += (Math.random() - 0.5) * 60
          y += (Math.random() - 0.5) * 60
          ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      
      // Fine grain texture
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const r = Math.random() * 1.5 + 0.3
        const alpha = Math.random() * 0.3
        const shade = Math.random() > 0.5 ? 70 : 200
        ctx.fillStyle = `rgba(${shade}, ${shade * 0.9}, ${shade * 0.7}, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Highlights (subtle light spots)
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const r = Math.random() * 20 + 8
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, 'rgba(255, 240, 210, 0.25)')
        g.addColorStop(1, 'rgba(255, 240, 210, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    }
    
    // ─────────────────────────────────────────
    // SKULL GROUP
    // ─────────────────────────────────────────
    const skullGroup = new THREE.Group()
    scene.add(skullGroup)
    
    // ─────────────────────────────────────────
    // CRANIUM (Main skull dome)
    // Slightly elongated sphere
    // ─────────────────────────────────────────
    const craniumGeom = new THREE.SphereGeometry(1.3, 64, 64)
    const cranPos = craniumGeom.attributes.position
    const v = new THREE.Vector3()
    
    // Deform sphere into skull shape
    for (let i = 0; i < cranPos.count; i++) {
      v.fromBufferAttribute(cranPos, i)
      
      // Elongate slightly (skull is taller than wide)
      v.y *= 1.15
      
      // Narrow at bottom (jaw area)
      if (v.y < 0) {
        const factor = 1 - Math.abs(v.y) * 0.15
        v.x *= factor
        v.z *= factor
      }
      
      // Slight front-back asymmetry (forehead bulge)
      if (v.z > 0 && v.y > 0.3) {
        v.z += 0.08
      }
      
      // Back of skull (occipital bulge)
      if (v.z < 0 && v.y > -0.3) {
        v.z -= 0.05
      }
      
      // Add micro-detail bumps (bone texture)
      const noise = 
        Math.sin(v.x * 8) * Math.cos(v.y * 8) * 0.02 +
        Math.sin(v.z * 6) * 0.015
      
      const dir = v.clone().normalize()
      v.add(dir.multiplyScalar(noise))
      
      cranPos.setXYZ(i, v.x, v.y, v.z)
    }
    craniumGeom.computeVertexNormals()
    
    // ─────────────────────────────────────────
    // EYE SOCKETS (CSG Subtraction)
    // ─────────────────────────────────────────
    const leftEyeGeom = new THREE.SphereGeometry(0.35, 32, 32)
    // Deform eye socket to be more oval
    const lePos = leftEyeGeom.attributes.position
    for (let i = 0; i < lePos.count; i++) {
      v.fromBufferAttribute(lePos, i)
      v.y *= 0.9  // Slightly compressed vertically
      v.z *= 1.5  // Deeper socket
      lePos.setXYZ(i, v.x, v.y, v.z)
    }
    leftEyeGeom.computeVertexNormals()
    
    const rightEyeGeom = leftEyeGeom.clone()
    
    // ─────────────────────────────────────────
    // NASAL CAVITY (Triangular hole)
    // ─────────────────────────────────────────
    const noseGeom = new THREE.ConeGeometry(0.15, 0.5, 4)
    noseGeom.rotateX(Math.PI / 2)
    
    // ─────────────────────────────────────────
    // CSG OPERATIONS — Carve out features
    // ─────────────────────────────────────────
    const craniumBrush = new Brush(craniumGeom)
    
    // Left eye socket
    const leftEyeBrush = new Brush(leftEyeGeom)
    leftEyeBrush.position.set(-0.42, 0.15, 0.9)
    leftEyeBrush.updateMatrixWorld()
    
    // Right eye socket
    const rightEyeBrush = new Brush(rightEyeGeom)
    rightEyeBrush.position.set(0.42, 0.15, 0.9)
    rightEyeBrush.updateMatrixWorld()
    
    // Nose cavity
    const noseBrush = new Brush(noseGeom)
    noseBrush.position.set(0, -0.15, 1.1)
    noseBrush.updateMatrixWorld()
    
    const evaluator = new Evaluator()
    let skullResult = evaluator.evaluate(craniumBrush, leftEyeBrush, SUBTRACTION)
    skullResult = evaluator.evaluate(skullResult, rightEyeBrush, SUBTRACTION)
    skullResult = evaluator.evaluate(skullResult, noseBrush, SUBTRACTION)
    skullResult.geometry.computeVertexNormals()
    
    // ─────────────────────────────────────────
    // BONE MATERIAL
    // ─────────────────────────────────────────
    const boneMat = new THREE.MeshStandardMaterial({
      map: createBoneTexture(),
      roughness: 0.85,
      metalness: 0.02,
      side: THREE.DoubleSide,
    })
    
    const skullMesh = new THREE.Mesh(skullResult.geometry, boneMat)
    skullMesh.castShadow = true
    skullMesh.receiveShadow = true
    skullGroup.add(skullMesh)
    
    // ─────────────────────────────────────────
    // JAW (Lower mandible)
    // ─────────────────────────────────────────
    const jawGeom = new THREE.SphereGeometry(0.9, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2)
    const jawPos = jawGeom.attributes.position
    for (let i = 0; i < jawPos.count; i++) {
      v.fromBufferAttribute(jawPos, i)
      v.y *= 0.6  // Flatten vertically
      v.z *= 1.2  // Extend forward
      
      // Narrow the back
      if (v.z < 0) {
        v.x *= 0.7
        v.z *= 0.5
      }
      
      // Add bone detail
      const noise = Math.sin(v.x * 10) * Math.cos(v.z * 10) * 0.015
      const dir = v.clone().normalize()
      v.add(dir.multiplyScalar(noise))
      
      jawPos.setXYZ(i, v.x, v.y, v.z)
    }
    jawGeom.computeVertexNormals()
    
    const jawMesh = new THREE.Mesh(jawGeom, boneMat)
    jawMesh.position.set(0, -1.1, 0.1)
    jawMesh.rotation.x = Math.PI
    jawMesh.castShadow = true
    jawMesh.receiveShadow = true
    skullGroup.add(jawMesh)
    
    // ─────────────────────────────────────────
    // TEETH (Both upper and lower jaws)
    // ─────────────────────────────────────────
    const toothMat = new THREE.MeshPhysicalMaterial({
      color: '#f0e8d5',
      roughness: 0.35,
      metalness: 0.0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
    })
    
    // Upper teeth (attached to skull)
    const upperTeethCount = 14
    for (let i = 0; i < upperTeethCount; i++) {
      const angle = (i - upperTeethCount / 2) * 0.22
      const isCenter = Math.abs(i - upperTeethCount / 2) < 2
      const isCanine = Math.abs(i - upperTeethCount / 2) === 2 || Math.abs(i - upperTeethCount / 2) === 3
      
      let toothGeom
      if (isCanine) {
        // Canine tooth (pointed)
        toothGeom = new THREE.ConeGeometry(0.05, 0.18, 6)
      } else if (isCenter) {
        // Incisor (flat)
        toothGeom = new THREE.BoxGeometry(0.07, 0.15, 0.05)
      } else {
        // Molar (rounded)
        toothGeom = new THREE.CylinderGeometry(0.055, 0.05, 0.13, 8)
      }
      
      const tooth = new THREE.Mesh(toothGeom, toothMat)
      const radius = 0.68
      tooth.position.set(
        Math.sin(angle) * radius,
        -0.7,
        Math.cos(angle) * radius + 0.15
      )
      tooth.rotation.y = angle
      if (isCanine) {
        tooth.rotation.x = Math.PI // Point downward
      }
      tooth.castShadow = true
      skullGroup.add(tooth)
    }
    
    // Lower teeth (attached to jaw)
    const lowerTeethCount = 14
    for (let i = 0; i < lowerTeethCount; i++) {
      const angle = (i - lowerTeethCount / 2) * 0.22
      const isCenter = Math.abs(i - lowerTeethCount / 2) < 2
      const isCanine = Math.abs(i - lowerTeethCount / 2) === 2 || Math.abs(i - lowerTeethCount / 2) === 3
      
      let toothGeom
      if (isCanine) {
        toothGeom = new THREE.ConeGeometry(0.05, 0.18, 6)
      } else if (isCenter) {
        toothGeom = new THREE.BoxGeometry(0.07, 0.15, 0.05)
      } else {
        toothGeom = new THREE.CylinderGeometry(0.055, 0.05, 0.13, 8)
      }
      
      const tooth = new THREE.Mesh(toothGeom, toothMat)
      const radius = 0.62
      tooth.position.set(
        Math.sin(angle) * radius,
        -0.95,
        Math.cos(angle) * radius + 0.15
      )
      tooth.rotation.y = angle
      if (!isCanine) {
        tooth.rotation.x = Math.PI // Point upward
      }
      tooth.castShadow = true
      skullGroup.add(tooth)
    }
    
    // ─────────────────────────────────────────
    // CHEEKBONES (Zygomatic arches)
    // ─────────────────────────────────────────
    const cheekGeom = new THREE.SphereGeometry(0.2, 16, 16)
    
    const leftCheek = new THREE.Mesh(cheekGeom, boneMat)
    leftCheek.position.set(-0.75, -0.1, 0.7)
    leftCheek.scale.set(1.5, 0.7, 0.6)
    leftCheek.castShadow = true
    skullGroup.add(leftCheek)
    
    const rightCheek = new THREE.Mesh(cheekGeom, boneMat)
    rightCheek.position.set(0.75, -0.1, 0.7)
    rightCheek.scale.set(1.5, 0.7, 0.6)
    rightCheek.castShadow = true
    skullGroup.add(rightCheek)
    
    // ─────────────────────────────────────────
    // FLOATING DUST PARTICLES (Atmospheric)
    // ─────────────────────────────────────────
    const dustCount = 30
    const dustGeo = new THREE.DodecahedronGeometry(1, 0)
    const dustMat = new THREE.MeshStandardMaterial({
      color: '#E4B590',
      roughness: 0.9,
      emissive: '#C87952',
      emissiveIntensity: 0.3,
    })
    const dust = new THREE.InstancedMesh(dustGeo, dustMat, dustCount)
    scene.add(dust)
    
    const dustData = []
    const dummy = new THREE.Object3D()
    for (let i = 0; i < dustCount; i++) {
      dustData.push({
        pos: [(Math.random() - 0.5) * 8, Math.random() * 4 + 1, (Math.random() - 0.5) * 8],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        rotSpeed: [(Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02],
        fallSpeed: Math.random() * 0.006 + 0.002,
        driftX: (Math.random() - 0.5) * 0.003,
        driftZ: (Math.random() - 0.5) * 0.003,
        scale: Math.random() * 0.02 + 0.01,
      })
    }
    
    // ─────────────────────────────────────────
    // CONTROLS (360° rotation)
    // ─────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.enableZoom = true
    controls.minDistance = 4
    controls.maxDistance = 10
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.8
    controlsRef.current = controls
    
    // ─────────────────────────────────────────
    // ANIMATION LOOP
    // ─────────────────────────────────────────
    const clock = new THREE.Clock()
    let animationId
    
    function animate() {
      animationId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      
      // Gentle float
      skullGroup.position.y = Math.sin(t * 0.8) * 0.08
      
      // Update dust particles
      for (let i = 0; i < dustCount; i++) {
        const p = dustData[i]
        p.pos[1] -= p.fallSpeed
        p.pos[0] += p.driftX
        p.pos[2] += p.driftZ
        p.rot[0] += p.rotSpeed[0]
        p.rot[1] += p.rotSpeed[1]
        
        if (p.pos[1] < -2) {
          p.pos[1] = 4
          p.pos[0] = (Math.random() - 0.5) * 8
          p.pos[2] = (Math.random() - 0.5) * 8
        }
        
        dummy.position.set(p.pos[0], p.pos[1], p.pos[2])
        dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2])
        dummy.scale.setScalar(p.scale)
        dummy.updateMatrix()
        dust.setMatrixAt(i, dummy.matrix)
      }
      dust.instanceMatrix.needsUpdate = true
      
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
    
    // ─────────────────────────────────────────
    // RESIZE HANDLER
    // ─────────────────────────────────────────
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)
    
    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  // Toggle auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
    }
  }, [autoRotate])
  
  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      
      {/* Auto-rotate toggle button (positioned outside canvas) */}
      <button
        onClick={() => setAutoRotate(!autoRotate)}
        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 py-2 px-4 bg-noir/80 backdrop-blur-md border border-graphite hover:border-gold text-ivory hover:text-gold transition-all duration-400 rounded-full"
        data-cursor="hover"
      >
        <div className={`w-2 h-2 rounded-full transition-colors duration-400 ${autoRotate ? 'bg-gold animate-pulse' : 'bg-silver'}`} />
        <span 
          className="text-tiny tracking-mega uppercase"
          style={{ fontSize: '0.6rem' }}
        >
          {autoRotate ? 'Rotating' : 'Manual'}
        </span>
      </button>
    </>
  )
}


// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const Skeleton3D = () => {
  return (
    <section className="relative w-full min-h-screen bg-noir py-24 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(200,121,82,0.15) 0%, transparent 60%)',
        }}
      />
      
      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: TEXT */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-tiny tracking-mega text-gold uppercase mb-8"
              style={{ fontSize: '0.7rem' }}
            >
              — Memento Mori
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cormorant font-light text-ivory mb-8"
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Remember<br />
              <em className="italic text-gold">that you are mortal.</em>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-cormorant italic text-platinum text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Every MAISON piece begins with an ancient wisdom — 
              time is precious, craftsmanship is eternal. 
              Explore the essence of our craft from every angle.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4"
            >
              {[
                { icon: FiRotateCw, text: 'Drag to rotate 360°' },
                { icon: FiZoomIn, text: 'Scroll to zoom' },
                { icon: FiMove, text: 'Explore every detail' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <item.icon className="text-gold" size={16} />
                  <span className="text-sm text-platinum font-cormorant">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* RIGHT: 3D CANVAS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full max-w-2xl mx-auto"
            data-cursor="drag"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-charcoal to-noir border border-graphite/30 overflow-hidden rounded-2xl">
              
              {/* Corner brackets */}
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
              
              {/* Label */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                <p 
                  className="text-tiny tracking-mega text-silver uppercase font-mono"
                  style={{ fontSize: '0.6rem' }}
                >
                  MSN—MEMENTO—001
                </p>
              </div>
              
              {/* THE 3D SKULL */}
              <Skull3DCanvas />
              
              {/* Bottom info */}
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