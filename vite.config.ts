import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/polaris-prototype/', // Replace with your repository name
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
