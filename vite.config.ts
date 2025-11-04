// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // This is the PWA (Progressive Web App) configuration
    VitePWA({
      registerType: 'autoUpdate',
      // This creates the "manifest" file for us
      manifest: {
        name: 'MonBondhu (মনবন্ধু)',
        short_name: 'MonBondhu',
        description: 'A community health navigator for Bangladesh.',
        theme_color: '#006a4e', // Bangladesh Green
        icons: [
          {
            src: 'icon-192.png', // The icon you saved in /public
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png', // The icon you saved in /public
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      // This sets up the service worker for OFFLINE mode
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/, // Change this if you have a real API
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})

