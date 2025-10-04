import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // Relative paths instead of absolute
  entry: 'crossword.html',
  build: {
    outDir: '../',
    emptyOutDir: false, // Don't delete the entire folder
    assetsDir: 'assets', // Put JS/CSS in an assets subfolder
    rollupOptions: {
      input: {
        app: './crossword.html',
      },
    },
  },
  server: {
    port: 3000,
    open: '/games/crossword/crossword.html'
  }
})
