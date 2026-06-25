<!--
  ScenicCard.vue - 景点卡片组件（核心复用组件）

  功能：
  - 展示景点缩略信息
  - 收藏切换按钮
  - 点击跳转详情页
  - 悬停动画效果

  技术点（综合演示）：
  - Props：父组件传入景点数据（必填验证）
  - Emit：子组件向父组件发送事件
  - 具名插槽 (Named Slots)：header、footer 区域可定制
  - 作用域插槽 (Scoped Slots)：暴露景点数据给父组件
  - 生命周期：onMounted 打印日志
-->
<template>
  <div class="scenic-card" @click="goToDetail">
    <!-- ====== 图片区 ====== -->
    <div class="card-image-wrapper">
      <img :src="destination.pic" :alt="destination.title" class="card-image" loading="lazy" />

      <!-- 分类标签 -->
      <span class="card-category">{{ destination.category }}</span>

      <!-- 收藏按钮 -->
      <button
        class="card-favorite"
        :class="{ active: isFavorite }"
        @click.stop="handleToggleFavorite"
        :title="isFavorite ? '取消收藏' : '添加收藏'"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>

      <!-- ====== 具名插槽：图片叠加层 ====== -->
      <slot name="imageOverlay" :destination="destination"></slot>
    </div>

    <!-- ====== 信息区 ====== -->
    <div class="card-body">
      <!-- ====== 具名插槽：标题区域 ====== -->
      <slot name="header" :destination="destination">
        <!-- 默认标题 -->
        <h3 class="card-title">{{ destination.title }}</h3>
      </slot>

      <p class="card-subtitle">{{ destination.subtitle }}</p>

      <div class="card-meta">
        <span class="meta-item">📍 {{ destination.location }}</span>
        <span class="meta-item">⭐ {{ destination.rating }}</span>
      </div>

      <p class="card-desc">{{ truncateContent(destination.content) }}</p>

      <!-- ====== 标签列表 ====== -->
      <div class="card-tags">
        <span v-for="tag in destination.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <!-- ====== 具名插槽：底部区域 ====== -->
    <slot name="footer" :destination="destination">
      <div class="card-footer">
        <span class="footer-link">查看详情 →</span>
      </div>
    </slot>
  </div>
</template>

<script setup>
/**
 * ScenicCard 组件逻辑
 * 演示：Props定义、Emit事件、插槽、生命周期
 */

import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScenicStore } from '@/store/scenic'

// ============ Props：父组件传入数据 ============
const props = defineProps({
  destination: {
    type: Object,
    required: true,    // 必填属性
    validator: (value) => {
      // 自定义验证：确保必要字段存在
      return value && value.id && value.title && value.pic
    }
  }
})

// ============ Emit：子传父事件 ============
const emit = defineEmits(['toggle-favorite'])

// ============ 路由和Store ============
const router = useRouter()
const scenicStore = useScenicStore()

// 计算是否已收藏
const isFavorite = computed(() => scenicStore.isFavorite(props.destination.id))

// ============ 方法 ============

/** 跳转到详情页 */
function goToDetail() {
  router.push({ name: 'DestinationDetail', params: { id: props.destination.id } })
}

/** 切换收藏 */
function handleToggleFavorite() {
  scenicStore.toggleFavorite(props.destination.id)
  emit('toggle-favorite', props.destination.id)
}

/** 截断长文本 */
function truncateContent(text, maxLength = 60) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// ============ 生命周期 ============
onMounted(() => {
  console.log(`[ScenicCard] 卡片已挂载: ${props.destination.title}`)
})
</script>

<style scoped>
/* ==================== 卡片容器 ==================== */
.scenic-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1.2);
}

.scenic-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

/* ==================== 图片区 ==================== */
.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.scenic-card:hover .card-image {
  transform: scale(1.08);
}

/* 分类标签 */
.card-category {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  padding: 4px 12px;
  background: rgba(44, 62, 80, 0.75);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

/* 收藏按钮 */
.card-favorite {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.85);
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  backdrop-filter: blur(4px);
}

.card-favorite:hover {
  transform: scale(1.15);
}

.card-favorite.active {
  background: rgba(231, 76, 60, 0.15);
}

/* ==================== 信息区 ==================== */
.card-body {
  padding: var(--spacing-lg);
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 2px;
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-sm);
  font-style: italic;
}

.card-meta {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.meta-item {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.card-desc {
  font-size: 0.9rem;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

/* 标签 */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 2px 10px;
  background: var(--color-bg);
  color: var(--color-primary-light);
  font-size: 0.75rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

/* ==================== 底部 ==================== */
.card-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.footer-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
  transition: color var(--transition-fast);
}

.scenic-card:hover .footer-link {
  color: var(--color-accent-hover);
}
</style>
