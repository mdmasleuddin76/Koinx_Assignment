import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Serve on port 80
    host: true // Allow access from outside localhost
  }
})
// vite.config.js

