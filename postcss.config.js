// ═══════════════════════════════════════════════════════════════
// MAISON — POSTCSS CONFIGURATION
// ═══════════════════════════════════════════════════════════════
// PostCSS transforms our CSS through a pipeline of plugins.
//
// Pipeline:
// 1. Tailwind CSS — Processes utility classes
// 2. Autoprefixer — Adds vendor prefixes for browser compat
//
// Vendor prefixes ensure our luxury design works flawlessly on:
// - Safari (WebKit)
// - Chrome (Blink)
// - Firefox (Gecko)
// - Edge (Chromium)
// - Mobile browsers (iOS Safari, Chrome Android)
// ═══════════════════════════════════════════════════════════════

export default {
  plugins: {
    // ─────────────────────────────────────────
    // TAILWIND CSS
    // Generates all utility classes from config
    // ─────────────────────────────────────────
    tailwindcss: {},
    
    // ─────────────────────────────────────────
    // AUTOPREFIXER
    // Adds vendor prefixes automatically
    // Based on browserslist config in package.json
    // ─────────────────────────────────────────
    autoprefixer: {
      // Cascade prefixes (visual alignment)
      cascade: true,
      // Add prefixes based on browserslist
      add: true,
      // Remove outdated prefixes
      remove: true,
      // Support gradients
      supports: true,
      // Support flexbox
      flexbox: true,
      // Support grid
      grid: 'autoplace',
    },
  },
}