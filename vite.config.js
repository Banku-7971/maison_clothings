import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// MAISON — Ultra-Optimized Vite Configuration
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@data': path.resolve(__dirname, './src/data'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  
  server: {
    port: 5173,
    open: true,
    host: true,
    cors: true,
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    cssMinify: true,
    chunkSizeWarningLimit: 1500,
    target: 'esnext',
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false,
      },
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['gsap', 'framer-motion'],
          'utils-vendor': ['zustand', 'react-icons'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'framer-motion',
      'zustand',
      'react-icons',
    ],
  },
  
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})