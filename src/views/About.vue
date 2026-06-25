<!--
  About.vue - 关于页面视图

  功能：
  - 网站信息介绍
  - 技术栈展示
  - 开发信息

  技术点：
  - inject：获取站点信息
  - 响应式布局
-->
<template>
  <div class="about-page">
    <!-- ========== 头部横幅 ========== -->
    <div class="about-hero">
      <div class="container">
        <h1 class="about-hero-title">关于环球胜景</h1>
        <p class="about-hero-desc">探索世界壮美地标的技术之旅</p>
      </div>
    </div>

    <div class="container">
      <div class="about-content">
        <!-- ========== 项目介绍 ========== -->
        <section class="about-section">
          <h2>🌍 项目简介</h2>
          <p>
            <strong>{{ siteName }}</strong> 是一个专注于全球著名地标展示的旅游信息平台。
            我们精选了来自世界各地的著名景点，为您提供详细的景点介绍、高清图片、
            旅游建议和行程参考。无论您是计划旅行还是云游世界，都能在这里找到灵感。
          </p>
        </section>

        <!-- ========== 技术栈 ========== -->
        <section class="about-section">
          <h2>⚙️ 技术栈</h2>
          <div class="tech-grid">
            <div class="tech-card" v-for="tech in techStack" :key="tech.name">
              <div class="tech-icon">{{ tech.icon }}</div>
              <h3 class="tech-name">{{ tech.name }}</h3>
              <p class="tech-desc">{{ tech.desc }}</p>
            </div>
          </div>
        </section>

        <!-- ========== 功能亮点 ========== -->
        <section class="about-section">
          <h2>✨ 功能亮点</h2>
          <div class="features-list">
            <div class="feature-item" v-for="f in features" :key="f.title">
              <span class="feature-icon">{{ f.icon }}</span>
              <div>
                <h4>{{ f.title }}</h4>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ========== 开发信息 ========== -->
        <section class="about-section">
          <h2>📋 课程作业信息</h2>
          <div class="info-box">
            <p><strong>课程：</strong>应用开发</p>
            <p><strong>框架：</strong>Vue 3 + Composition API</p>
            <p><strong>构建工具：</strong>Vite 5</p>
            <p><strong>状态管理：</strong>Pinia</p>
            <p><strong>路由：</strong>Vue Router 4</p>
            <p><strong>技术亮点：</strong>Composition API、Teleport、Transition动画、KeepAlive、路由守卫、懒加载、响应式设计、provide/inject跨层级通信、插槽（默认/具名/作用域）、生命周期钩子</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * About 页面逻辑
 */

import { inject } from 'vue'

// inject 获取站点信息（演示跨层级通信）
const siteName = inject('siteName', '环球胜景')

// ============ 技术栈数据 ============
const techStack = [
  { name: 'Vue 3', icon: '💚', desc: '渐进式JavaScript框架，使用Composition API + <script setup> 语法' },
  { name: 'Vue Router 4', icon: '🗺️', desc: '官方路由管理器，支持动态路由、导航守卫、懒加载' },
  { name: 'Pinia', icon: '🍍', desc: '新一代状态管理库，比Vuex更轻量、类型安全' },
  { name: 'Vite 5', icon: '⚡', desc: '下一代前端构建工具，极速冷启动和HMR热更新' }
]

// ============ 功能亮点 ============
const features = [
  { icon: '🔍', title: '智能搜索', desc: '支持关键词模糊搜索和多维度分类筛选' },
  { icon: '❤️', title: '云端收藏', desc: '基于localStorage的收藏功能，刷新不丢失' },
  { icon: '📱', title: '响应式设计', desc: '完美适配桌面端、平板和移动端设备' },
  { icon: '🎨', title: '精美动画', desc: '页面切换、列表加载、按钮交互等过渡动画' },
  { icon: '📖', title: '详细攻略', desc: '景点介绍、亮点推荐、最佳季节等完整信息' },
  { icon: '⚡', title: '极致性能', desc: '路由懒加载、组件缓存、图片懒加载优化' }
]
</script>

<style scoped>
/* ==================== 头部横幅 ==================== */
.about-hero {
  background: linear-gradient(135deg, var(--color-primary), #1a252f);
  padding: var(--spacing-3xl) 0;
  text-align: center;
  color: #fff;
  margin-bottom: var(--spacing-2xl);
}

.about-hero-title {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.about-hero-desc {
  font-size: 1.1rem;
  opacity: 0.8;
}

/* ==================== 内容区 ==================== */
.about-content {
  max-width: 900px;
  margin: 0 auto;
}

.about-section {
  margin-bottom: var(--spacing-3xl);
}

.about-section h2 {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.about-section p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--color-text);
}

/* ==================== 技术栈卡片 ==================== */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.tech-card {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.tech-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.tech-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.tech-desc {
  font-size: 0.8rem !important;
  color: var(--color-text-light) !important;
  line-height: 1.5 !important;
}

/* ==================== 功能列表 ==================== */
.features-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.feature-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.feature-item:hover {
  transform: translateX(4px);
}

.feature-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.feature-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.feature-item p {
  font-size: 0.85rem !important;
  color: var(--color-text-light) !important;
  line-height: 1.5 !important;
}

/* ==================== 信息盒 ==================== */
.info-box {
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-accent);
}

.info-box p {
  margin-bottom: var(--spacing-xs);
  font-size: 0.95rem;
  line-height: 1.8;
}

/* ==================== 响应式 ==================== */
@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .about-hero-title {
    font-size: 2rem;
  }
}
</style>
