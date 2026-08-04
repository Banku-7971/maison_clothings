import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// ═══════════════════════════════════════════════════════════════
// MAISON — ULTRA-OPTIMIZED VITE CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    base: '/',
    
    plugins: [
      react({
        fastRefresh: true,
      }),
    ],
    
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
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
    },
    
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
    
    preview: {
      port: 4173,
      strictPort: false,
      open: true,
      host: true,
      cors: true,
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      assetsInlineLimit: 4096,
      sourcemap: false,
      cssCodeSplit: true,
      cssMinify: true,
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      emptyOutDir: true,
      reportCompressedSize: true,
      copyPublicDir: true,
      modulePreload: {
        polyfill: true,
      },
      
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
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      
      rollupOptions: {
        output: {
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
          
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`
            }
            
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            
            if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext)) {
              return `assets/media/[name]-[hash][extname]`
            }
            
            if (/glb|gltf|fbx|obj/i.test(ext)) {
              return `assets/models/[name]-[hash][extname]`
            }
            
            if (/css/i.test(ext)) {
              return `assets/css/[name]-[hash][extname]`
            }
            
            return `assets/[name]-[hash][extname]`
          },
        },
      },
    },
    
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
      ],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    
    esbuild: {
      logOverride: {
        'this-is-undefined-in-esm': 'silent',
      },
      legalComments: 'none',
      target: 'es2020',
    },
    
    css: {
      devSourcemap: false,
      postcss: './postcss.config.js',
    },
    
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __IS_PRODUCTION__: JSON.stringify(isProduction),
    },
    
    envPrefix: ['VITE_', 'MAISON_'],
    
    logLevel: isProduction ? 'warn' : 'info',
    
    clearScreen: false,
  }
})