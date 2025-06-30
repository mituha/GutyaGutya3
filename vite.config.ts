import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/GutyaGutya3/',
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['lib/**/*.test.ts'],
  },
})
