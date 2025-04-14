import path from 'path';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// Определяем, находимся ли мы в режиме разработки или сборки для GitHub Pages
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const baseUrl = isGitHubPages ? '/avatar.ai/' : '/';

export default defineConfig({
  base: baseUrl,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Улучшения для деплоя на GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia', 'vuetify'],
        },
      },
    },
  }
}) 