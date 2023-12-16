import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://todo-app-backend-i3mo.onrender.com',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
})
