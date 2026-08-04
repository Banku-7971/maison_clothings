import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize2, FiArrowUpRight } from 'react-icons/fi'

// ═══════════════════════════════════════════════════════════════
// MAISON — VIDEO CAMPAIGN SECTION
// ═══════════════════════════════════════════════════════════════
// Cinematic full-width video showcase.
// The moment where MAISON transitions from website to film.
//
// Features:
// - Full-width video background (or image fallback)
// - Play/pause controls
// - Mute/unmute toggle
// - Fullscreen option
// - Editorial overlay with campaign info
// - Parallax on scroll
// - Auto-play with muted (browser policy)
// - Progress bar
// - Corner cinematic markers
// - Campaign metadata display
// - "Watch Full Film" CTA
// ═══════════════════════════════════════════════════════════════

const VideoCampaign = () => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  
  // ─────────────────────────────────────────
  // PARALLAX SCROLL EFFECT
  // ─────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })
  
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 0.6, 0.3])
  
  // ─────────────────────────────────────────
  // VIDEO CONTROLS
  // ─────────────────────────────────────────
  const togglePlay = () => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }
  
  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }
  
  const toggleFullscreen = () => {
    if (!videoRef.current) return
    
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen()
    }
  }
  
  // ─────────────────────────────────────────
  // TRACK VIDEO PROGRESS
  // ─────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }
    
    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('loadeddata', () => setVideoLoaded(true))
    
    return () => {
      video.removeEventListener('timeupdate', updateProgress)
    }
  }, [])
  
  // ─────────────────────────────────────────
  // CAMPAIGN DATA
  // ─────────────────────────────────────────
  const campaign = {
    title: 'Into The Dark',
    subtitle: 'Noir Collection Film',
    season: 'Fall/Winter 2025',
    director: 'MAISON Films',
    photographer: 'Studio MAISON',
    location: 'Paris, France',
    duration: '02:47',
    posterImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=2400&q=90',
    videoUrl: null, // Would be actual .mp4 URL in production
  }
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-noir overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      
      {/* ═══════════════════════════════════════
          VIDEO CONTAINER
      ═══════════════════════════════════════ */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen min-h-[600px] overflow-hidden"
      >
        
        {/* Video / Poster Image with Parallax */}
        <motion.div
          style={{ scale: smoothScale }}
          className="absolute inset-0 w-full h-full"
        >
          {campaign.videoUrl ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              poster={campaign.posterImage}
            >
              <source src={campaign.videoUrl} type="video/mp4" />
              Your browser does not support video.
            </video>
          ) : (
            // Fallback: Poster image with animation
            <img
              src={campaign.posterImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          )}
        </motion.div>
        
        {/* ═══════════════════════════════════════
            OVERLAY GRADIENTS
        ═══════════════════════════════════════ */}
        
        {/* Top gradient */}
        <div 
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, transparent 100%)',
          }}
        />
        
        {/* Bottom gradient */}
        <div 
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)',
          }}
        />
        
        {/* Dynamic scroll-based overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-noir pointer-events-none"
        />
        
        {/* ═══════════════════════════════════════
            CORNER MARKERS (Film aesthetic)
        ═══════════════════════════════════════ */}
        <div className="absolute top-8 left-8 z-10">
          <div className="w-6 h-px bg-gold" />
          <div className="w-px h-6 bg-gold" />
        </div>
        <div className="absolute top-8 right-8 z-10">
          <div className="w-6 h-px bg-gold ml-auto" />
          <div className="w-px h-6 bg-gold ml-auto" />
        </div>
        <div className="absolute bottom-8 left-8 z-10">
          <div className="w-px h-6 bg-gold" />
          <div className="w-6 h-px bg-gold" />
        </div>
        <div className="absolute bottom-8 right-8 z-10">
          <div className="w-px h-6 bg-gold ml-auto" />
          <div className="w-6 h-px bg-gold ml-auto" />
        </div>
        
        {/* ═══════════════════════════════════════
            TOP METADATA
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-8 left-0 right-0 z-10"
        >
          <div className="container-luxury">
            <div className="flex items-center justify-between pl-16 pr-16">
              <p 
                className="text-tiny tracking-mega text-gold uppercase font-mono"
                style={{ fontSize: '0.7rem' }}
              >
                A MAISON Film
              </p>
              <p 
                className="text-tiny tracking-mega text-ivory/70 uppercase font-mono hidden md:block"
                style={{ fontSize: '0.7rem' }}
              >
                {campaign.duration}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* ═══════════════════════════════════════
            CENTER CONTENT
        ═══════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container-luxury text-center">
            
            {/* Season Badge */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-tiny tracking-mega text-gold uppercase mb-8"
              style={{ fontSize: '0.75rem' }}
            >
              {campaign.season} — {campaign.subtitle}
            </motion.p>
            
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-light text-ivory mb-12"
              style={{ 
                fontSize: 'clamp(3rem, 10vw, 10rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
              }}
            >
              {campaign.title.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-6 last:mr-0">
                  {i === 1 ? (
                    <em className="italic text-gold">{word}</em>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </motion.h2>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-cormorant italic text-platinum text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              A meditation on black. Nine essential pieces filmed 
              across the streets of Paris at the hour of blue.
            </motion.p>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                to="/collection/noir"
                className="group inline-flex items-center gap-4"
                data-cursor="hover"
              >
                <span className="relative overflow-hidden">
                  <span 
                    className="inline-block py-4 px-10 border border-ivory text-ivory text-tiny tracking-mega uppercase relative z-10 transition-colors duration-500 group-hover:text-noir"
                    style={{ fontSize: '0.75rem' }}
                  >
                    Explore The Collection
                    <motion.span 
                      className="absolute inset-0 bg-ivory -z-10"
                      initial={{ y: '100%' }}
                      whileHover={{ y: '0%' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </span>
                <FiArrowUpRight 
                  className="text-ivory group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400" 
                  size={18} 
                />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* ═══════════════════════════════════════
            VIDEO CONTROLS (Bottom)
        ═══════════════════════════════════════ */}
        {campaign.videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showControls ? 1 : 0, 
              y: showControls ? 0 : 20 
            }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-8 left-0 right-0 z-10 px-8"
          >
            <div className="container-luxury">
              <div className="flex items-center justify-between gap-6 pl-8 pr-8">
                
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 flex items-center justify-center border border-ivory text-ivory hover:bg-ivory hover:text-noir transition-all duration-400"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  data-cursor="hover"
                >
                  {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
                </button>
                
                {/* Progress Bar */}
                <div className="flex-1 h-px bg-ivory/20 relative">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gold transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 flex items-center justify-center border border-ivory text-ivory hover:bg-ivory hover:text-noir transition-all duration-400"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  data-cursor="hover"
                >
                  {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                </button>
                
                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="w-12 h-12 flex items-center justify-center border border-ivory text-ivory hover:bg-ivory hover:text-noir transition-all duration-400 hidden md:flex"
                  aria-label="Fullscreen"
                  data-cursor="hover"
                >
                  <FiMaximize2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* ═══════════════════════════════════════
          CAMPAIGN CREDITS BAR
      ═══════════════════════════════════════ */}
      <div className="border-t border-graphite/30 bg-noir">
        <div className="container-luxury py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {[
              { label: 'Direction', value: campaign.director },
              { label: 'Photography', value: campaign.photographer },
              { label: 'Location', value: campaign.location },
              { label: 'Season', value: campaign.season },
            ].map((credit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
              >
                <p 
                  className="text-tiny tracking-mega text-silver uppercase mb-2"
                  style={{ fontSize: '0.65rem' }}
                >
                  {credit.label}
                </p>
                <p className="font-cormorant text-lg text-ivory">
                  {credit.value}
                </p>
              </motion.div>
            ))}
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoCampaign