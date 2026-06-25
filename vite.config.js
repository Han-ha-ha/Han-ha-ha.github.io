import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite 配置文件 - 使用现代化的构建工具替代 Vue CLI
export default defineConfig({
  base: './', // GitHub Pages 部署需要相对路径
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true  // 自动打开浏览器
  }
})
