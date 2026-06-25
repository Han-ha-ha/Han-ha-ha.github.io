<!--
  AppHeader.vue - 全局头部导航组件

  功能：
  - 响应式导航栏（移动端自动切换为汉堡菜单）
  - 路由链接高亮当前页面
  - 收藏数量徽章
  - 滚动时添加阴影效果
  - 通过 inject 获取全局站点信息

  技术点：
  - inject：从根组件获取站点名称（跨层级通信）
  - 生命周期：onMounted/onUnmounted 监听滚动事件
  - computed：动态计算导航样式
  - router-link：声明式路由导航
-->
<template>
  <header class="app-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-container">
      <!-- ========== Logo 区域 ========== -->
      <router-link to="/" class="logo" @click="mobileMenuOpen = false">
        <span class="logo-icon">🌍</span>
        <span class="logo-text">{{ siteName }}</span>
      </router-link>

      <!-- ========== 桌面端导航 ========== -->
      <nav class="nav-desktop">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          {{ item.label }}
          <!-- 收藏数量徽章 -->
          <span v-if="item.badge && favoriteCount > 0" class="badge">
            {{ favoriteCount }}
          </span>
        </router-link>
      </nav>

      <!-- ========== 移动端汉堡按钮 ========== -->
      <button
        class="hamburger"
        :class="{ open: mobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="菜单"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- ========== 移动端侧边菜单 ========== -->
    <!-- Transition 组件实现菜单滑入动画 -->
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click.self="mobileMenuOpen = false">
        <nav class="mobile-menu">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="mobile-link"
            @click="mobileMenuOpen = false"
          >
            {{ item.icon }} {{ item.label }}
            <span v-if="item.badge && favoriteCount > 0" class="badge">
              {{ favoriteCount }}
            </span>
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
/**
 * AppHeader 组件逻辑
 * 演示：inject跨层级通信、生命周期钩子、computed、事件处理
 */

import { ref, inject, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useScenicStore } from '@/store/scenic'

// ============ inject：从根组件获取站点信息（跨层级通信） ============
// 无需props逐层传递，直接注入根组件provide的数据
const siteName = inject('siteName', '环球胜景')

// ============ 路由和状态 ============
const route = useRoute()
const scenicStore = useScenicStore()

// 收藏数量（响应式）
const favoriteCount = computed(() => scenicStore.favoriteCount)

// ============ 导航项配置 ============
const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/destinations', label: '景点列表', icon: '🏛️' },
  { path: '/favorites', label: '我的收藏', icon: '❤️', badge: true },
  { path: '/about', label: '关于', icon: 'ℹ️' }
]

// ============ 响应式状态 ============
const isScrolled = ref(false)      // 页面滚动状态
const mobileMenuOpen = ref(false)  // 移动端菜单开关

// ============ 方法 ============

/** 判断当前路由是否激活 */
function isActive(path) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

/** 切换移动端菜单 */
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // 菜单打开时禁止body滚动
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

/** 滚动监听回调 */
function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

// ============ 生命周期钩子 ============

/** mounted：组件挂载后添加滚动监听 */
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  console.log('[AppHeader] 组件已挂载，滚动监听已注册')
})

/** beforeUnmount：组件卸载前移除监听，避免内存泄漏 */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
  console.log('[AppHeader] 组件已卸载，监听已清理')
})
</script>

<style scoped>
/* ==================== 头部容器 ==================== */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: box-shadow var(--transition-normal);
}

/* 滚动后添加阴影 */
.header-scrolled {
  box-shadow: var(--shadow-md);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* ==================== Logo ==================== */
.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  transition: opacity var(--transition-fast);
  cursor: pointer;
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 1.8rem;
}

/* ==================== 桌面导航 ==================== */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-light);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
  background: rgba(44, 62, 80, 0.05);
}

.nav-link.active {
  color: var(--color-accent);
  background: rgba(230, 126, 34, 0.08);
}

.nav-icon {
  font-size: 1.1rem;
}

/* 收藏徽章 */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 2px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  background: var(--color-danger);
  border-radius: 10px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* ==================== 汉堡按钮 ==================== */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ==================== 移动端菜单 ==================== */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: #fff;
  padding: 100px var(--spacing-xl) var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  box-shadow: var(--shadow-xl);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.mobile-link:hover {
  background: var(--color-bg);
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .mobile-menu,
.slide-leave-to .mobile-menu {
  transform: translateX(100%);
}

/* ==================== 响应式 ==================== */
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .header-container {
    height: 60px;
  }
}
</style>
