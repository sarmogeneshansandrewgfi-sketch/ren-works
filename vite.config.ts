import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5179,
    proxy: {
      '/ren-ren-api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})