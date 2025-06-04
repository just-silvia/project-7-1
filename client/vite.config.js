import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: 'http://192.168.1.55:3000',
        changeOrigin: true,
      },
      "/auth": {
        target: 'http://192.168.1.55:3000',
=======
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      "/auth": {
        target: 'http://localhost:3000',
>>>>>>> feature/dashboard-tank
        changeOrigin: true,
      }
    }
  }
})
