import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    host: '::'
  },
  preview: {
    port: 4173, // 这里设置你想要的预览端口号
    host: '::', // 如果需要IPv6支持
    allowedHosts: [
      'www-mc.h385a89d9.nyat.app'
    ]
  }
})