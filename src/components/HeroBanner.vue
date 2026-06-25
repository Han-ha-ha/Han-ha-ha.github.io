<!--
  HeroBanner.vue - 首页主视觉横幅组件

  功能：
  - 大图背景 + 渐变遮罩
  - 搜索入口（通过 emit 向父组件通信）
  - 统计数据展示
  - 滚动指示箭头

  技术点：
  - defineEmits：子组件向父组件发送搜索事件
  - 插槽：预留自定义内容区域
-->
<template>
  <section class="hero">
    <!-- 背景图片 + 渐变遮罩 -->
    <div class="hero-bg">
      <img src="/assets/故宫.png" alt="Hero Background" />
      <div class="hero-overlay"></div>
    </div>

    <!-- 主内容 -->
    <div class="hero-content">
      <!-- ====== 标题区 ====== -->
      <h1 class="hero-title">
        探索世界
        <span class="hero-highlight">壮美地标</span>
      </h1>
      <p class="hero-subtitle">
        从千年长城到悉尼歌剧院，从故宫到泰姬陵——感受人类文明与大自然的壮丽诗篇
      </p>

      <!-- ====== 搜索区（emit 向父组件通信） ====== -->
      <div class="hero-search">
        <input
          v-model="searchText"
          type="text"
          class="search-input"
          placeholder="搜索你想去的地方..."
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          <span>🔍</span> 探索
        </button>
      </div>

      <!-- ====== 快捷标签 ====== -->
      <div class="hero-tags">
        <button
          v-for="tag in quickTags"
          :key="tag"
          class="tag-btn"
          @click="$emit('quickSearch', tag)"
        >
          {{ tag }}
        </button>
      </div>

      <!-- ====== 统计数据 ====== -->
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">{{ stats.destinations }}+</span>
          <span class="stat-label">著名景点</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ stats.countries }}+</span>
          <span class="stat-label">覆盖国家</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ stats.visitors }}M+</span>
          <span class="stat-label">年游客量</span>
        </div>
      </div>

      <!-- ====== 预留插槽 ====== -->
      <slot name="extra"></slot>
    </div>

    <!-- 向下滚动指示 -->
    <div class="scroll-indicator" @click="$emit('scrollDown')">
      <span>向下探索</span>
      <div class="scroll-arrow">↓</div>
    </div>
  </section>
</template>

<script setup>
/**
 * HeroBanner 组件逻辑
 * 演示：emit 子传父通信、v-model 双向绑定
 */

import { ref } from 'vue'

// ============ 定义事件（emit） ============
// 子组件通过 emit 向父组件传递搜索关键词
const emit = defineEmits(['search', 'quickSearch', 'scrollDown'])

// ============ 本地状态 ============
const searchText = ref('')

// 快捷搜索标签
const quickTags = ['故宫', '长城', '黄石公园', '悉尼歌剧院', '泰姬陵']

// 统计数据
const stats = {
  destinations: 9,
  countries: 5,
  visitors: 50
}

// ============ 方法 ============

/** 触发搜索事件 */
function handleSearch() {
  if (searchText.value.trim()) {
    emit('search', searchText.value.trim())
  }
}
</script>

<style scoped>
/* ==================== 英雄区容器 ==================== */
.hero {
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 500px;
  max-height: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 背景图片 */
.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: slowZoom 20s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(44, 62, 80, 0.75) 0%,
    rgba(44, 62, 80, 0.45) 50%,
    rgba(44, 62, 80, 0.65) 100%
  );
}

/* ==================== 内容区 ==================== */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 var(--spacing-lg);
  max-width: 800px;
  animation: fadeUp 0.8s ease-out;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
}

.hero-highlight {
  display: block;
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ==================== 搜索区 ==================== */
.hero-search {
  display: flex;
  max-width: 500px;
  margin: 0 auto var(--spacing-lg);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid transparent;
  font-size: 1rem;
  font-family: var(--font-body);
  outline: none;
  transition: border-color var(--transition-fast);
}

.search-input:focus {
  border-color: var(--color-accent);
}

.search-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-accent);
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  font-family: var(--font-body);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.search-btn:hover {
  background: var(--color-accent-hover);
}

/* ==================== 标签 ==================== */
.hero-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-2xl);
}

.tag-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  font-size: 0.85rem;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tag-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* ==================== 统计数据 ==================== */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xl);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.25);
}

/* ==================== 滚动指示 ==================== */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 2;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); }
}

.scroll-arrow {
  font-size: 1.2rem;
}

/* ==================== 响应式 ==================== */
@media (max-width: 768px) {
  .hero {
    height: 80vh;
    min-height: 400px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .hero-search {
    flex-direction: column;
  }

  .search-btn {
    justify-content: center;
  }

  .hero-stats {
    gap: var(--spacing-lg);
  }

  .stat-number {
    font-size: 1.5rem;
  }
}
</style>
