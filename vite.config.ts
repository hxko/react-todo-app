import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    host: 'localhost',
    port: 5173,
    watch: {
      usePolling: true, // Enable polling for file changes
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@context', replacement: path.resolve(__dirname, 'src/context') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components/index.ts')
      },
    ],
  },
})
