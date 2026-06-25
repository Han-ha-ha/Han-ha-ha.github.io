<!--
  NotFound.vue - 404页面视图

  功能：
  - 友好的404提示
  - 返回首页链接
  - 趣味动画

  技术点：
  - 通配符路由匹配
  - router-link 导航
-->
<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <div class="error-icon">🗺️</div>
      <h1>哎呀，迷路了！</h1>
      <p>您要查找的页面不存在，可能已被移动或删除</p>
      <div class="actions">
        <router-link to="/" class="home-btn">🏠 返回首页</router-link>
        <router-link to="/destinations" class="browse-btn">🏛️ 浏览景点</router-link>
      </div>
      <p class="hint">或者，试试在上方导航栏搜索您想去的地方</p>
    </div>
  </div>
</template>

<script setup>
// 404页面 - 无需额外逻辑
</script>

<style scoped>
.not-found-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.error-code {
  font-family: var(--font-heading);
  font-size: 8rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
  opacity: 0.15;
  margin-bottom: -20px;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.not-found-content h1 {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.not-found-content p {
  color: var(--color-text-light);
  font-size: 1rem;
  margin-bottom: var(--spacing-xl);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.home-btn,
.browse-btn {
  display: inline-block;
  padding: 12px 28px;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.home-btn {
  background: var(--color-accent);
  color: #fff;
}

.home-btn:hover {
  background: var(--color-accent-hover);
}

.browse-btn {
  background: var(--color-bg-card);
  color: var(--color-primary);
  border: 2px solid var(--color-border);
}

.browse-btn:hover {
  border-color: var(--color-primary);
}

.hint {
  margin-top: var(--spacing-xl);
  font-size: 0.85rem !important;
  opacity: 0.6;
}
</style>
