/**
 * main.js - 应用入口文件
 * 负责创建Vue应用实例、注册路由、状态管理等核心插件
 *
 * 技术栈：
 * - Vue 3 (Composition API + <script setup>)
 * - Vue Router 4 (前端路由)
 * - Pinia (状态管理，比Vuex更轻量、类型安全)
 * - Vite (现代构建工具)
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 创建Pinia实例 - 新一代Vue状态管理库（超出课堂内容，展现自学能力）
const pinia = createPinia()

// 创建Vue应用实例
const app = createApp(App)

// 注册全局插件
app.use(pinia)   // 状态管理
app.use(router)  // 路由系统

// 挂载应用到DOM
app.mount('#app')
