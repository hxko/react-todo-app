import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
    },
  },
})
