import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// ═══════════════════════════════════════════════════════════════
// MAISON — ULTRA-OPTIMIZED VITE CONFIGURATION
// ═══════════════════════════════════════════════════════════════
// Production-grade build configuration for the world's most
// premium luxury fashion brand experience.
//
// Features:
// - 8 path aliases for clean imports
// - Advanced code splitting (4 vendor chunks)
// - Terser minification with aggressive settings
// - CSS minification and code splitting
// - Asset hashing for cache busting
// - Development server with HMR
// - Environment variable support
// - Source map optimization
// - Bundle analysis ready
// ═══════════════════════════════════════════════════════════════

export default defineConfig(({ command, mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'
  
  return {
    // ─────────────────────────────────────────
    // BASE PUBLIC PATH
    // ─────────────────────────────────────────
    base: '/',
    
    // ─────────────────────────────────────────
    // PLUGINS
    // ─────────────────────────────────────────
    plugins: [
      react({
        // Fast Refresh for instant updates
        fastRefresh: true,
        // Babel configuration for React
        babel: {
          plugins: [],
          babelrc: false,
          configFile: false,
        },
      }),
    ],
    
    // ─────────────────────────────────────────
    // PATH RESOLUTION & ALIASES
    // Clean, readable imports across the app
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
      watch: {
        usePolling: false,
        ignored: ['**/node_modules/**', '**/dist/**'],
      },
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
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
      
      // Assets folder (relative to outDir)
      assetsDir: 'assets',
      
      // Inline assets smaller than this (in bytes)
      assetsInlineLimit: 4096,
      
      // Source maps (disabled for production for smaller builds)
      sourcemap: false,
      
      // CSS code splitting
      cssCodeSplit: true,
      cssMinify: 'lightningcss',
      
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
      // Aggressive compression for smallest bundle
      // ─────────────────────────────────────────
      terserOptions: {
        compress: {
          // Remove all console.* calls in production
          drop_console: true,
          drop_debugger: true,
          pure_funcs: [
            'console.log',
            'console.info',
            'console.debug',
            'console.warn',
            'console.trace',
          ],
          // Additional optimizations
          arguments: true,
          booleans_as_integers: false,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: false,
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
          top_retain: [],
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
          // ─────────────────────────────────
          // MANUAL CHUNKS
          // Split vendor code for better caching
          // ─────────────────────────────────
          manualChunks: {
            // React ecosystem
            'react-vendor': [
              'react',
              'react-dom',
              'react-router-dom',
            ],
            
            // Three.js and 3D dependencies
            'three-vendor': [
              'three',
              '@react-three/fiber',
              '@react-three/drei',
            ],
            
            // Animation libraries
            'animation-vendor': [
              'gsap',
              'framer-motion',
            ],
            
            // Utilities
            'utils-vendor': [
              'zustand',
              'react-icons',
            ],
          },
          
          // ─────────────────────────────────
          // FILE NAMING PATTERNS
          // Hash-based for aggressive caching
          // ─────────────────────────────────
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
            
            // Videos
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
        'gsap/ScrollTrigger',
        'framer-motion',
        'zustand',
        'react-icons/fi',
        'react-icons/hi2',
      ],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
        supported: {
          'top-level-await': true,
        },
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
      jsxInject: undefined,
      target: 'es2020',
    },
    
    // ─────────────────────────────────────────
    // CSS CONFIGURATION
    // ─────────────────────────────────────────
    css: {
      devSourcemap: false,
      preprocessorOptions: {},
      postcss: './postcss.config.js',
      modules: {
        localsConvention: 'camelCase',
      },
    },
    
    // ─────────────────────────────────────────
    // JSON CONFIGURATION
    // ─────────────────────────────────────────
    json: {
      namedExports: true,
      stringify: false,
    },
    
    // ─────────────────────────────────────────
    // WORKER CONFIGURATION
    // ─────────────────────────────────────────
    worker: {
      format: 'es',
    },
    
    // ─────────────────────────────────────────
    // DEFINE GLOBAL CONSTANTS
    // ─────────────────────────────────────────
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __IS_PRODUCTION__: JSON.stringify(isProduction),
    },
    
    // ─────────────────────────────────────────
    // ENVIRONMENT VARIABLE PREFIX
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