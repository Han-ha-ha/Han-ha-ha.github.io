<!--
  AppFooter.vue - 全局底部组件

  功能：
  - 展示站点信息与版权
  - 快速导航链接
  - 社交媒体图标（演示用）

  技术点：
  - inject：获取站点名称（跨层级通信）
  - 插槽预留：可扩展底部内容
-->
<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- ========== 信息区 ========== -->
      <div class="footer-section">
        <h3 class="footer-brand">
          <span>🌍</span> {{ siteName }}
        </h3>
        <p class="footer-desc">{{ siteDescription }}</p>
        <p class="footer-desc">发现世界的壮美，感受人文与自然的魅力</p>
      </div>

      <!-- ========== 快速链接 ========== -->
      <div class="footer-section">
        <h4 class="footer-title">快速导航</h4>
        <ul class="footer-links">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/destinations">景点列表</router-link></li>
          <li><router-link to="/favorites">我的收藏</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
        </ul>
      </div>

      <!-- ========== 联系信息 ========== -->
      <div class="footer-section">
        <h4 class="footer-title">联系方式</h4>
        <ul class="footer-contact">
          <li>📧 global@landmarks.com</li>
          <li>📱 +86 400-888-0000</li>
          <li>📍 中国·北京</li>
        </ul>
      </div>

      <!-- ========== 预留插槽：可扩展区域 ========== -->
      <div class="footer-section">
        <h4 class="footer-title">关注我们</h4>
        <slot name="social">
          <!-- 默认社交图标 -->
          <div class="social-icons">
            <a href="#" class="social-icon" title="微信">💬</a>
            <a href="#" class="social-icon" title="微博">📢</a>
            <a href="#" class="social-icon" title="小红书">📕</a>
            <a href="#" class="social-icon" title="B站">📺</a>
          </div>
        </slot>
      </div>
    </div>

    <!-- ========== 版权区 ========== -->
    <div class="footer-bottom">
      <div class="container">
        <p>&copy; {{ currentYear }} {{ siteName }}. All Rights Reserved.</p>
        <p class="footer-sub">作者：刘销瀚 | 学号：24225620221 | Vue3 + Pinia + Vue Router 构建 | 期末开发作业</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
/**
 * AppFooter 组件逻辑
 */

import { inject, computed } from 'vue'

// 注入跨层级数据
const siteName = inject('siteName', '环球胜景')
const siteDescription = inject('siteDescription', '')

// 动态当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* ==================== 底部整体 ==================== */
.app-footer {
  background: var(--color-primary);
  color: rgba(255, 255, 255, 0.85);
  margin-top: var(--spacing-3xl);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-lg) var(--spacing-2xl);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
}

/* ==================== 各部分 ==================== */
.footer-brand {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: var(--spacing-md);
}

.footer-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: var(--spacing-sm);
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: var(--spacing-md);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background: var(--color-accent);
}

.footer-links li {
  margin-bottom: var(--spacing-xs);
}

.footer-links a {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
  transition: all var(--transition-fast);
  display: inline-block;
  padding: 2px 0;
}

.footer-links a:hover {
  color: var(--color-accent);
  transform: translateX(4px);
}

.footer-contact li {
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
  color: rgba(255, 255, 255, 0.65);
}

/* ==================== 社交图标 ==================== */
.social-icons {
  display: flex;
  gap: var(--spacing-sm);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all var(--transition-fast);
}

.social-icon:hover {
  background: var(--color-accent);
  transform: translateY(-3px);
}

/* ==================== 版权区 ==================== */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--spacing-lg) 0;
  text-align: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
}

.footer-sub {
  font-size: 0.75rem !important;
}

/* ==================== 响应式 ==================== */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }
}

@media (max-width: 480px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
}
</style>
