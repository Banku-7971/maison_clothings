import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAISON — INFINITE MARQUEE STRIP
// ═══════════════════════════════════════════════════════════════
// Editorial banner with continuously scrolling text.
// Used to break up sections and add movement/texture.
// Reminiscent of luxury magazine spreads.
//
// Features:
// - Infinite horizontal scroll (CSS animation)
// - Configurable speed and direction
// - Pause on hover
// - Multiple variants (default, bold, italic)
// - Separator options (dot, dash, star, none)
// - Font size options
// - Border options (top, bottom, both, none)
// - Configurable items array
// ═══════════════════════════════════════════════════════════════

const MarqueeStrip = ({
  items = [
    'Handcrafted in Paris',
    'Since 2025',
    'Limited Editions',
    'Master Artisans',
    'Ethical Sourcing',
    'Timeless Design',
  ],
  speed = 40,                    // Seconds for full cycle (higher = slower)
  direction = 'left',            // 'left' | 'right'
  variant = 'default',           // 'default' | 'bold' | 'italic' | 'huge'
  separator = 'dot',             // 'dot' | 'dash' | 'star' | 'diamond' | 'none'
  pauseOnHover = true,
  borderTop = true,
  borderBottom = true,
  bgColor = 'bg-noir',
  textColor = 'text-ivory',
  accentColor = 'text-gold',
  className = '',
}) => {
  
  // ─────────────────────────────────────────
  // SEPARATOR RENDER
  // ─────────────────────────────────────────
  const renderSeparator = () => {
    switch (separator) {
      case 'dot':
        return (
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${accentColor.replace('text-', 'bg-')} mx-6 md:mx-12`} />
        )
      case 'dash':
        return (
          <span className={`inline-block w-6 h-px ${accentColor.replace('text-', 'bg-')} mx-6 md:mx-12`} />
        )
      case 'star':
        return (
          <span className={`inline-block ${accentColor} mx-6 md:mx-12 text-xl`}>✦</span>
        )
      case 'diamond':
        return (
          <span className={`inline-block ${accentColor} mx-6 md:mx-12 text-lg`}>◆</span>
        )
      case 'none':
      default:
        return <span className="inline-block w-16" />
    }
  }
  
  // ─────────────────────────────────────────
  // TYPOGRAPHY VARIANTS
  // ─────────────────────────────────────────
  const getTypographyClasses = () => {
    switch (variant) {
      case 'bold':
        return 'font-sans font-medium tracking-widest uppercase text-sm md:text-base'
      case 'italic':
        return 'font-cormorant italic text-2xl md:text-4xl'
      case 'huge':
        return 'font-cormorant text-4xl md:text-7xl lg:text-8xl'
      case 'default':
      default:
        return 'font-sans tracking-widest uppercase text-xs md:text-sm'
    }
  }
  
  // ─────────────────────────────────────────
  // DIRECTION
  // ─────────────────────────────────────────
  const animationName = direction === 'right' ? 'marqueeStripReverse' : 'marqueeStripForward'
  
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items]
  
  return (
    <div 
      className={`
        relative overflow-hidden
        ${bgColor}
        ${borderTop ? 'border-t border-graphite/50' : ''}
        ${borderBottom ? 'border-b border-graphite/50' : ''}
        ${className}
      `}
    >
      {/* ═══════════════════════════════════════
          MARQUEE TRACK
      ═══════════════════════════════════════ */}
      <div 
        className={`flex items-center whitespace-nowrap py-4 md:py-6 marquee-strip ${pauseOnHover ? 'hover:pause' : ''}`}
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <span 
              className={`
                ${textColor}
                ${getTypographyClasses()}
              `}
            >
              {item}
            </span>
            {renderSeparator()}
          </div>
        ))}
      </div>
      
      {/* ═══════════════════════════════════════
          KEYFRAMES + HOVER PAUSE
      ═══════════════════════════════════════ */}
      <style>{`
        @keyframes marqueeStripForward {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            transform: translateX(-33.333%); 
          }
        }
        
        @keyframes marqueeStripReverse {
          0% { 
            transform: translateX(-33.333%); 
          }
          100% { 
            transform: translateX(0); 
          }
        }
        
        .marquee-strip.hover\\:pause:hover {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee-strip {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default MarqueeStrip


// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════
//
// 1. Default (brand values):
//    <MarqueeStrip />
//
// 2. Custom items:
//    <MarqueeStrip 
//      items={['New Collection', 'Now Available', 'Limited Edition']}
//    />
//
// 3. Huge italic (dramatic):
//    <MarqueeStrip 
//      variant="huge"
//      items={['MAISON']}
//      separator="star"
//      speed={60}
//    />
//
// 4. Announcement bar (slow):
//    <MarqueeStrip 
//      items={['Free shipping over $500']}
//      speed={80}
//      variant="bold"
//      separator="dot"
//    />
//
// 5. Editorial italic:
//    <MarqueeStrip 
//      variant="italic"
//      items={['Where craftsmanship meets couture']}
//      separator="diamond"
//      bgColor="bg-charcoal"
//    />
//
// 6. Reverse direction (going right):
//    <MarqueeStrip direction="right" />
//
// 7. No borders:
//    <MarqueeStrip borderTop={false} borderBottom={false} />
//
// 8. Custom colors:
//    <MarqueeStrip 
//      bgColor="bg-gold"
//      textColor="text-noir"
//      accentColor="text-noir"
//    />
//
// ═══════════════════════════════════════════════════════════════