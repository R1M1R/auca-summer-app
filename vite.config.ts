import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

const base = '/'

const LEGACY_TARGETS = ['defaults', 'not IE 11', 'Android >= 5']

export default defineConfig({
  base,
  plugins: [
    react(),
    legacy({
      targets: LEGACY_TARGETS,
      modernPolyfills: true,
      additionalLegacyPolyfills: ['core-js/proposals/global-this'],
      renderLegacyChunks: true,
    }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'icon.svg',
        'favicon.svg',
        'icon-192x192.png',
        'icon-512x512.png',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'TimeFlow — AUCA Summer',
        short_name: 'TimeFlow',
        description: 'Smart time management for students and host families in Bishkek',
        theme_color: '#6366f1',
        background_color: '#0f0f1a',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        icons: [
          {
            src:     'icon-192x192.png',
            sizes:   '192x192',
            type:    'image/png',
            purpose: 'any',
          },
          {
            src:     'icon-512x512.png',
            sizes:   '512x512',
            type:    'image/png',
            purpose: 'any',
          },
          {
            src:     'icon-512x512.png',
            sizes:   '512x512',
            type:    'image/png',
            purpose: 'maskable',
          },
        ],
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  build: {
    /** CSS autoprefixer baseline for old WebViews (legacy JS handled by plugin-legacy) */
    cssTarget: 'chrome49',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('firebase')) return 'vendor-firebase'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
            return 'vendor-react'
          }
          if (id.includes('i18next')) return 'vendor-i18n'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
