import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Endo-Jafari/', // نام دقیق repository شما
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
