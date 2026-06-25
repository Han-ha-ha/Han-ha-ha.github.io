/**
 * router/index.js - 路由配置文件
 *
 * 功能特性：
 * - 嵌套路由 (Nested Routes)
 * - 动态路由参数 (:id)
 * - 路由元信息 (meta)
 * - 路由导航守卫 (beforeEach)
 * - 懒加载 (动态import，代码分割)
 * - 过渡动画配置
 */

import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 路由配置表
 * 使用动态 import() 实现代码分割和懒加载
 * 每个页面仅在首次访问时加载，减少初始加载时间
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页 - 环球胜景',
      transition: 'fade-slide',
      keepAlive: true   // 首页缓存，优化体验
    }
  },
  {
    path: '/destinations',
    name: 'Destinations',
    component: () => import('@/views/Destinations.vue'),
    meta: {
      title: '景点列表 - 环球胜景',
      transition: 'fade-slide'
    }
  },
  {
    // 动态路由：:id 为景点ID参数
    path: '/destination/:id',
    name: 'DestinationDetail',
    component: () => import('@/views/Detail.vue'),
    meta: {
      title: '景点详情 - 环球胜景',
      transition: 'fade-slide'
    },
    // props: true 将路由参数作为props传递给组件
    props: true
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/Favorites.vue'),
    meta: {
      title: '我的收藏 - 环球胜景',
      transition: 'fade-slide'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于我们 - 环球胜景',
      transition: 'fade-slide'
    }
  },
  {
    // 404 页面 - 通配符路由，必须放在最后
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到 - 环球胜景',
      transition: 'fade'
    }
  }
]

// 创建路由实例
const router = createRouter({
  // 使用 Hash 模式，兼容 GitHub Pages（URL 含 #/，但刷新不会 404）
  history: createWebHashHistory(),
  routes,
  // 页面切换后自动滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition  // 浏览器前进/后退时恢复位置
    }
    return { top: 0, behavior: 'smooth' }  // 新页面滚动到顶部
  }
})

/**
 * 全局前置守卫 - beforeEach
 * 在每次路由切换前执行，用于：
 * 1. 动态设置页面标题（SEO优化）
 * 2. 权限验证（此处为演示用途）
 */
router.beforeEach((to, from, next) => {
  // 动态更新页面标题
  document.title = to.meta.title || '环球胜景'

  // 示例：可以在此处添加权限验证逻辑
  // const isAuthenticated = localStorage.getItem('token')
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next({ name: 'Login', query: { redirect: to.fullPath } })
  // }

  next()
})

/**
 * 全局后置钩子 - afterEach
 * 可用于页面访问统计等
 */
router.afterEach((to, from) => {
  // 页面切换后的分析统计可以在此处理
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

export default router
