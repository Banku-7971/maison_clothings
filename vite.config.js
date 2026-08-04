import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// ═══════════════════════════════════════════════════════════════
// MAISON — ULTRA-OPTIMIZED VITE CONFIGURATION
// ═══════════════════════════════════════════════════════════════
// Production-grade build configuration
// - 8 path aliases for clean imports
// - Advanced code splitting (4 vendor chunks)
// - Terser minification with aggressive settings
// - Base path set to '/' (critical for SPA routing)
// - Optimized for Three.js, GSAP, Framer Motion
// ═══════════════════════════════════════════════════════════════

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    // ─────────────────────────────────────────
    // BASE PATH (Critical for SPA routing!)
    // ─────────────────────────────────────────
    base: '/',
    
    // ─────────────────────────────────────────
    // PLUGINS
    // ─────────────────────────────────────────
    plugins: [
      react({
        fastRefresh: true,
      }),
    ],
    
    // ─────────────────────────────────────────
    // PATH ALIASES
    // Clean imports across the app
    // ─────────────────────────────────────────
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
        '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
    },
    
    // ─────────────────────────────────────────
    // DEVELOPMENT SERVER
    // ─────────────────────────────────────────
    server: {
      port: 5173,
      strictPort: false,
      open: true,
      host: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },
    
    // ─────────────────────────────────────────
    // PREVIEW SERVER (npm run preview)
    // ─────────────────────────────────────────
    preview: {
      port: 4173,
      strictPort: false,
      open: true,
      host: true,
      cors: true,
    },
    
    // ─────────────────────────────────────────
    // PRODUCTION BUILD CONFIGURATION
    // ─────────────────────────────────────────
    build: {
      // Output directory
      outDir: 'dist',
      
      // Assets folder
      assetsDir: 'assets',
      
      // Inline assets smaller than this (in bytes)
      assetsInlineLimit: 4096,
      
      // Source maps (disabled for production for smaller builds)
      sourcemap: false,
      
      // CSS optimization
      cssCodeSplit: true,
      cssMinify: true,
      
      // Minifier
      minify: 'terser',
      
      // Chunk size warning limit (in kB)
      chunkSizeWarningLimit: 1500,
      
      // Target modern browsers only (smaller bundles)
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      
      // Empty output directory before build
      emptyOutDir: true,
      
      // Report compressed file sizes
      reportCompressedSize: true,
      
      // Copy public directory
      copyPublicDir: true,
      
      // Modulepreload polyfill
      modulePreload: {
        polyfill: true,
      },
      
      // ─────────────────────────────────────────
      // TERSER MINIFICATION OPTIONS
      // ─────────────────────────────────────────
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: [
            'console.log',
            'console.info',
            'console.debug',
            'console.warn',
          ],
          arguments: true,
          booleans_as_integers: false,
          hoist_funs: true,
          hoist_props: true,
          if_return: true,
          inline: true,
          join_vars: true,
          keep_fargs: false,
          keep_infinity: true,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          typeofs: true,
          unused: true,
        },
        mangle: {
          safari10: true,
          toplevel: true,
        },
        format: {
          comments: false,
          ascii_only: true,
        },
      },
      
      // ─────────────────────────────────────────
      // ROLLUP OPTIONS
      // Advanced code splitting strategy
      // ─────────────────────────────────────────
      rollupOptions: {
        output: {
          // Manual chunks for optimal caching
          manualChunks: {
            'react-vendor': [
              'react',
              'react-dom',
              'react-router-dom',
            ],
            'three-vendor': [
              'three',
              '@react-three/fiber',
              '@react-three/drei',
            ],
            'animation-vendor': [
              'gsap',
              'framer-motion',
            ],
            'utils-vendor': [
              'zustand',
              'react-icons',
            ],
          },
          
          // File naming with hashing for cache busting
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            
            // Images
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`
            }
            
            // Fonts
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            
            // Videos & audio
            if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext)) {
              return `assets/media/[name]-[hash][extname]`
            }
            
            // 3D Models
            if (/glb|gltf|fbx|obj/i.test(ext)) {
              return `assets/models/[name]-[hash][extname]`
            }
            
            // Stylesheets
            if (/css/i.test(ext)) {
              return `assets/css/[name]-[hash][extname]`
            }
            
            // Everything else
            return `assets/[name]-[hash][extname]`
          },
        },
      },
    },
    
    // ─────────────────────────────────────────
    // DEPENDENCY OPTIMIZATION
    // Pre-bundle heavy dependencies for faster dev
    // ─────────────────────────────────────────
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-router-dom',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'gsap',
        'framer-motion',
        'zustand',
        'react-icons/fi',
        'react-icons/hi2',
      ],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    
    // ─────────────────────────────────────────
    // ESBUILD OPTIONS
    // ─────────────────────────────────────────
    esbuild: {
      logOverride: {
        'this-is-undefined-in-esm': 'silent',
      },
      legalComments: 'none',
      target: 'es2020',
    },
    
    // ─────────────────────────────────────────
    // CSS CONFIGURATION
    // ─────────────────────────────────────────
    css: {
      devSourcemap: false,
      postcss: './postcss.config.js',
    },
    
    // ─────────────────────────────────────────
    // DEFINE GLOBAL CONSTANTS
    // Available in your code as __VARIABLE__
    // ─────────────────────────────────────────
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __IS_PRODUCTION__: JSON.stringify(isProduction),
    },
    
    // ─────────────────────────────────────────
    // ENVIRONMENT VARIABLE PREFIX
    // Only vars with these prefixes are exposed
    // ─────────────────────────────────────────
    envPrefix: ['VITE_', 'MAISON_'],
    
    // ─────────────────────────────────────────
    // LOG LEVEL
    // ─────────────────────────────────────────
    logLevel: isProduction ? 'warn' : 'info',
    
    // ─────────────────────────────────────────
    // CLEAR SCREEN
    // ─────────────────────────────────────────
    clearScreen: false,
  }
})