import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// ═══════════════════════════════════════════════════════════════
// MAISON — REACT APPLICATION ENTRY POINT
// Using HashRouter for 100% reliable SPA routing on Vercel
// ═══════════════════════════════════════════════════════════════

// Premium font imports
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

// Console signature
if (typeof window !== 'undefined') {
  console.log(
    '%c MAISON ',
    'background: #2A1F1A; color: #C87952; font-size: 40px; font-family: Georgia, serif; letter-spacing: 0.5em; padding: 20px 40px; border: 1px solid #C87952;'
  )
  console.log(
    '%c Where Craftsmanship Meets Couture ',
    'color: #A89684; font-family: Georgia, serif; font-style: italic; font-size: 14px; letter-spacing: 0.2em;'
  )
  console.log(
    '%c Est. Kolkata 2025 ',
    'color: #C87952; font-family: monospace; font-size: 11px; letter-spacing: 0.15em;'
  )
}

// Get root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('[MAISON] Root element not found')
}

// Create React root
const root = createRoot(rootElement)

// Render app with HashRouter (100% works on all hosting)
root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)