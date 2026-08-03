import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// ═══════════════════════════════════════════════════════════════
// MAISON — REACT APPLICATION ENTRY POINT
// ═══════════════════════════════════════════════════════════════
// This is where our luxury experience begins.
// Every millisecond matters. Every render is intentional.
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// PREMIUM FONT IMPORTS
// Loaded locally as fallback if Google Fonts fails
// ─────────────────────────────────────────

// Cormorant Garamond — Editorial headings
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500-italic.css'

// Inter — Body text and UI
import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'

// Playfair Display — Display typography
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/800.css'
import '@fontsource/playfair-display/900.css'
import '@fontsource/playfair-display/400-italic.css'

// JetBrains Mono — Monospace details
import '@fontsource/jetbrains-mono/300.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/600.css'

// ═══════════════════════════════════════════════════════════════
// CONSOLE BRANDING SIGNATURE
// A premium touch — visible when devs open DevTools
// ═══════════════════════════════════════════════════════════════
const printConsoleSignature = () => {
  const styles = {
    logo: [
      'background: #0A0A0A',
      'color: #C9A96E',
      'font-size: 50px',
      'font-family: Georgia, serif',
      'font-weight: 300',
      'letter-spacing: 0.5em',
      'padding: 30px 60px',
      'border: 1px solid #C9A96E',
      'text-shadow: 0 0 20px rgba(201, 169, 110, 0.5)',
    ].join(';'),
    
    tagline: [
      'color: #8A8A8A',
      'font-family: Georgia, serif',
      'font-style: italic',
      'font-size: 16px',
      'letter-spacing: 0.2em',
      'padding: 10px 0',
    ].join(';'),
    
    credits: [
      'color: #C9A96E',
      'font-family: monospace',
      'font-size: 11px',
      'letter-spacing: 0.15em',
      'padding: 5px 0',
    ].join(';'),
    
    warning: [
      'color: #8B2635',
      'font-family: monospace',
      'font-size: 13px',
      'font-weight: bold',
      'padding: 10px 0',
    ].join(';'),
  }
  
  console.log('%c MAISON ', styles.logo)
  console.log('%c Where Craftsmanship Meets Couture ', styles.tagline)
  console.log('%c Crafted with obsession by MAISON Atelier © 2025 ', styles.credits)
  console.log('%c ⚠ STOP — This is a browser feature intended for developers.', styles.warning)
  console.log('%c If someone told you to copy-paste something here, it is a scam.', styles.warning)
}

// ═══════════════════════════════════════════════════════════════
// GLOBAL ERROR HANDLERS
// Catch and log any uncaught errors gracefully
// ═══════════════════════════════════════════════════════════════
if (typeof window !== 'undefined') {
  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[MAISON] Unhandled promise rejection:', event.reason)
  })
  
  // Global errors
  window.addEventListener('error', (event) => {
    console.error('[MAISON] Global error:', event.error)
  })
}

// ═══════════════════════════════════════════════════════════════
// PERFORMANCE MONITORING
// Track key metrics for luxury experience
// ═══════════════════════════════════════════════════════════════
if (typeof window !== 'undefined' && 'performance' in window) {
  window.addEventListener('load', () => {
    // Log load time
    const loadTime = performance.now()
    if (loadTime > 3000) {
      console.warn(`[MAISON] Slow load detected: ${Math.round(loadTime)}ms`)
    }
    
    // Track largest contentful paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry.startTime > 2500) {
            console.warn(`[MAISON] LCP is slow: ${Math.round(lastEntry.startTime)}ms`)
          }
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        // Silently fail if not supported
      }
    }
  })
}

// ═══════════════════════════════════════════════════════════════
// DISABLE IMAGE DRAGGING (Premium feel)
// Prevents users from dragging our luxury imagery
// ═══════════════════════════════════════════════════════════════
if (typeof document !== 'undefined') {
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault()
    }
  })
}

// ═══════════════════════════════════════════════════════════════
// PREVENT SAVE SHORTCUTS (Optional premium touch)
// Uncomment to prevent Ctrl+S, Ctrl+P
// ═══════════════════════════════════════════════════════════════
// document.addEventListener('keydown', (e) => {
//   if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
//     e.preventDefault()
//   }
// })

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ═══════════════════════════════════════════════════════════════
if (typeof window !== 'undefined' && !('scrollBehavior' in document.documentElement.style)) {
  console.info('[MAISON] Smooth scroll not natively supported')
}

// ═══════════════════════════════════════════════════════════════
// APP INITIALIZATION
// ═══════════════════════════════════════════════════════════════

// Print console signature (only in production or dev)
printConsoleSignature()

// Get root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(
    '[MAISON] Root element not found. Please check index.html.'
  )
}

// Create React root
const root = createRoot(rootElement)

// ═══════════════════════════════════════════════════════════════
// RENDER APPLICATION
// StrictMode wraps App for double-render bug detection in dev
// BrowserRouter enables client-side routing across all pages
// ═══════════════════════════════════════════════════════════════
root.render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
)

// ═══════════════════════════════════════════════════════════════
// SERVICE WORKER REGISTRATION (For PWA — Optional)
// Uncomment when ready to enable offline support
// ═══════════════════════════════════════════════════════════════
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(reg => console.log('[MAISON] SW registered:', reg.scope))
//       .catch(err => console.error('[MAISON] SW registration failed:', err))
//   })
// }