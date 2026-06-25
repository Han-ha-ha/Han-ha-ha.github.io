<!--
  App.vue - 根组件
  负责整个应用的布局框架，包含：
  - 全局头部导航 (AppHeader)
  - 主内容区 (router-view + transition动画)
  - 全局底部信息 (AppFooter)
  - 返回顶部按钮

  技术亮点：
  - provide/inject 实现跨层级通信
  - <router-view> 插槽实现路由页面渲染
  - Transition 组件实现页面切换动画
-->
<template>
  <div class="app-container">
    <!-- ==================== 头部导航区 ==================== -->
    <!-- 使用 provide/inject 向所有后代组件提供全局站点信息 -->
    <AppHeader />

    <!-- ==================== 主内容区 ==================== -->
    <!--
      router-view 配合 transition 实现页面切换动画
      keep-alive 缓存组件状态，避免重复渲染
    -->
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition
          :name="route.meta.transition || 'fade-slide'"
          mode="out-in"
          appear
        >
          <keep-alive :include="['Home']">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </main>

    <!-- ==================== 底部信息区 ==================== -->
    <AppFooter />

    <!-- ==================== 返回顶部按钮 ==================== -->
    <!-- Teleport：将组件渲染到body层级，避免被父组件样式影响（Vue3新特性） -->
    <Teleport to="body">
      <BackToTop />
    </Teleport>
  </div>
</template>

<script setup>
/**
 * 根组件逻辑 - 使用 Composition API + <script setup> 语法糖
 * <script setup> 是 Vue3.2+ 的编译时语法糖，代码更简洁
 */

import { provide, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BackToTop from '@/components/BackToTop.vue'

// ============ provide/inject 跨层级通信 ============
// 向所有后代组件提供站点名称和版权信息
// 无需通过 props 逐层传递，深层子组件可直接 inject 获取
const siteName = ref('环球胜景')
const siteDescription = ref('探索世界著名地标，感受人文与自然的壮美')

provide('siteName', siteName)
provide('siteDescription', siteDescription)
</script>

<style>
/* ==================== 全局样式重置与变量定义 ==================== */
:root {
  /* 主题色系 */
  --color-primary: #2c3e50;
  --color-primary-light: #3e5c76;
  --color-accent: #e67e22;
  --color-accent-hover: #d35400;
  --color-bg: #f8f9fa;
  --color-bg-card: #ffffff;
  --color-text: #2c3e50;
  --color-text-light: #6c757d;
  --color-border: #e9ecef;
  --color-success: #27ae60;
  --color-danger: #e74c3c;

  /* 间距 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;

  /* 阴影 */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 12px 40px rgba(0, 0, 0, 0.16);

  /* 过渡 */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;

  /* 字体 */
  --font-heading: 'Playfair Display', 'Noto Sans SC', serif;
  --font-body: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* 全局重置 */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 应用整体布局 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 70px; /* 固定导航栏高度补偿 */
}

/* ==================== 页面切换动画 ==================== */
/* fade-slide 动画：页面进入时从下方淡入，离开时向上淡出 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* fade 动画：简单的淡入淡出，用于模态框等场景 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ==================== 工具类 ==================== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  position: relative;
  padding-bottom: var(--spacing-md);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--color-accent);
  border-radius: 2px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
  .main-content {
    padding-top: 60px;
  }
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
