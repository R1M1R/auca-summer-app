import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const base = '/'

export default defineConfig({
  base,
  plugins: [
    react(),
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
