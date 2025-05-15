import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/purplebulldozer-prototype/', // Updated to match your repository name
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
