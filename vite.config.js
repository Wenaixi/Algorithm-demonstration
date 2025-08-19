import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    host: '0.0.0.0'
  },
  preview: {
    allowedHosts: [
      'www-mc.h385a89d9.nyat.app'
    ]
  }
})
