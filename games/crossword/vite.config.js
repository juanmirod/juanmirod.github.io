import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // Relative paths instead of absolute
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Put JS/CSS in an assets subfolder
    rollupOptions: {
      input: {
        app: './crossword.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
