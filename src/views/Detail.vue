<!--
  Detail.vue - 景点详情页视图

  功能：
  - 大图展示
  - 完整景点信息
  - 收藏按钮
  - 亮点列表
  - 相关推荐
  - 返回按钮

  技术点：
  - 动态路由参数 (props: true 接收 :id)
  - 生命周期：onMounted/onBeforeUnmount 获取数据
  - 计算属性：根据ID查询景点
  - 编程式导航：router.go(-1)
  - 过渡动画
-->
<template>
  <div class="detail-page">
    <!-- ========== 加载中 ========== -->
    <LoadingSpinner v-if="!destination" text="加载景点信息中..." />

    <!-- ========== 景点内容 ========== -->
    <template v-else>
      <!-- 大图区 -->
      <div class="detail-hero">
        <img :src="destination.pic" :alt="destination.title" class="detail-image" />
        <div class="detail-hero-overlay">
          <div class="container">
            <!-- 返回按钮 -->
            <button class="back-btn" @click="goBack">← 返回</button>

            <div class="hero-info">
              <span class="detail-category">{{ destination.category }}</span>
              <h1 class="detail-title">{{ destination.title }}</h1>
              <p class="detail-subtitle">{{ destination.subtitle }}</p>

              <div class="detail-meta">
                <span>📍 {{ destination.location }}</span>
                <span>⭐ {{ destination.rating }} / 5.0</span>
                <span>👥 {{ destination.visitorsPerYear }}</span>
              </div>

              <!-- 操作按钮 -->
              <div class="hero-actions">
                <button
                  class="favorite-btn"
                  :class="{ active: isFav }"
                  @click="toggleFavorite"
                >
                  {{ isFav ? '❤️ 已收藏' : '🤍 收藏此地' }}
                </button>
                <button class="share-btn" @click="shareDestination">
                  📤 分享
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细信息区 -->
      <div class="container">
        <div class="detail-content">
          <!-- 主体内容 -->
          <div class="detail-main">
            <!-- 简介 -->
            <section class="detail-section">
              <h2>📖 景点介绍</h2>
              <p class="intro-text">{{ destination.content }}</p>
            </section>

            <!-- 亮点 -->
            <section class="detail-section">
              <h2>✨ 主要亮点</h2>
              <ul class="highlights-list">
                <li v-for="h in destination.highlights" :key="h">
                  <span class="highlight-marker">▸</span> {{ h }}
                </li>
              </ul>
            </section>

            <!-- 标签 -->
            <section class="detail-section">
              <h2>🏷️ 标签</h2>
              <div class="detail-tags">
                <span v-for="tag in destination.tags" :key="tag" class="detail-tag">
                  {{ tag }}
                </span>
              </div>
            </section>

            <!-- 旅游建议 -->
            <section class="detail-section tip-box">
              <h2>💡 旅游建议</h2>
              <p><strong>最佳季节：</strong>{{ destination.bestSeason }}</p>
              <p><strong>年游客量：</strong>{{ destination.visitorsPerYear }}</p>
            </section>
          </div>

          <!-- 侧边栏 -->
          <aside class="detail-sidebar">
            <div class="sidebar-card">
              <h3>📍 基本信息</h3>
              <ul class="info-list">
                <li><span class="info-label">名称</span> {{ destination.title }}</li>
                <li><span class="info-label">英文</span> {{ destination.subtitle }}</li>
                <li><span class="info-label">位置</span> {{ destination.location }}</li>
                <li><span class="info-label">分类</span> {{ destination.category }}</li>
                <li><span class="info-label">评分</span> ⭐ {{ destination.rating }}</li>
              </ul>
            </div>

            <!-- 相关推荐 -->
            <div class="sidebar-card">
              <h3>🔗 相关推荐</h3>
              <div class="related-list">
                <div
                  v-for="related in relatedDestinations"
                  :key="related.id"
                  class="related-item"
                  @click="goToDetail(related.id)"
                >
                  <img :src="related.pic" :alt="related.title" />
                  <div>
                    <strong>{{ related.title }}</strong>
                    <span>{{ related.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
/**
 * Detail 页面逻辑
 * 演示：动态路由、生命周期、条件渲染
 */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useScenicStore } from '@/store/scenic'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// ============ Props：接收路由参数 ============
// router中设置 props: true，自动接收 :id 参数
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const router = useRouter()
const scenicStore = useScenicStore()

// ============ 响应式数据 ============
const isLoading = ref(true)

// ============ 计算属性 ============

/** 根据ID获取当前景点 */
const destination = computed(() => {
  return scenicStore.getDestinationById(props.id)
})

/** 是否已收藏 */
const isFav = computed(() => {
  return destination.value ? scenicStore.isFavorite(destination.value.id) : false
})

/** 相关推荐（同分类的其他景点，最多3个） */
const relatedDestinations = computed(() => {
  if (!destination.value) return []
  return scenicStore.destinations
    .filter(d => d.category === destination.value.category && d.id !== destination.value.id)
    .slice(0, 3)
})

// ============ 方法 ============

/** 返回上一页 */
function goBack() {
  router.back()
}

/** 切换收藏 */
function toggleFavorite() {
  if (destination.value) {
    scenicStore.toggleFavorite(destination.value.id)
  }
}

/** 分享（演示功能） */
function shareDestination() {
  if (navigator.share) {
    navigator.share({
      title: destination.value.title,
      text: destination.value.content.slice(0, 100),
      url: window.location.href
    }).catch(() => {})
  } else {
    // 降级方案：复制链接
    navigator.clipboard?.writeText(window.location.href).then(() => {
      alert('链接已复制到剪贴板！')
    }).catch(() => {
      alert('分享链接：' + window.location.href)
    })
  }
}

/** 跳转到相关景点 */
function goToDetail(id) {
  router.push({ name: 'DestinationDetail', params: { id } })
}

// ============ 生命周期 ============
onMounted(() => {
  console.log(`[Detail] 景点详情加载: ID=${props.id}`)
  // 模拟网络延迟
  setTimeout(() => {
    isLoading.value = false
  }, 400)
})

onBeforeUnmount(() => {
  console.log(`[Detail] 离开详情页: ID=${props.id}`)
})
</script>

<style scoped>
/* ==================== 大图区 ==================== */
.detail-hero {
  position: relative;
  width: 100%;
  height: 55vh;
  min-height: 350px;
  overflow: hidden;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(44, 62, 80, 0.85) 0%,
    rgba(44, 62, 80, 0.2) 50%,
    rgba(44, 62, 80, 0.35) 100%
  );
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--spacing-2xl);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-family: var(--font-body);
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background var(--transition-fast);
  margin-bottom: var(--spacing-lg);
}

.back-btn:hover {
  background: rgba(255,255,255,0.25);
}

.hero-info {
  color: #fff;
}

.detail-category {
  display: inline-block;
  padding: 4px 14px;
  background: var(--color-accent);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.detail-title {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.detail-subtitle {
  font-size: 1.1rem;
  opacity: 0.85;
  font-style: italic;
  margin-bottom: var(--spacing-md);
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  font-size: 0.95rem;
  margin-bottom: var(--spacing-lg);
  opacity: 0.9;
}

/* 操作按钮 */
.hero-actions {
  display: flex;
  gap: var(--spacing-md);
}

.favorite-btn,
.share-btn {
  padding: 10px 24px;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.favorite-btn {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(4px);
}

.favorite-btn:hover,
.favorite-btn.active {
  background: rgba(231, 76, 60, 0.7);
  border-color: rgba(231, 76, 60, 0.5);
}

.share-btn {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
}

.share-btn:hover {
  background: rgba(255,255,255,0.2);
}

/* ==================== 内容区 ==================== */
.detail-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: var(--spacing-2xl);
  padding: var(--spacing-2xl) 0;
}

/* 主体 */
.detail-main {
  min-width: 0;
}

.detail-section {
  margin-bottom: var(--spacing-2xl);
}

.detail-section h2 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.intro-text {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--color-text);
}

/* 亮点列表 */
.highlights-list {
  list-style: none;
  padding: 0;
}

.highlights-list li {
  padding: var(--spacing-sm) 0;
  font-size: 1rem;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.highlight-marker {
  color: var(--color-accent);
  font-weight: 700;
}

/* 标签 */
.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.detail-tag {
  padding: 6px 16px;
  background: var(--color-bg);
  color: var(--color-primary-light);
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
}

/* 旅游建议 */
.tip-box {
  background: linear-gradient(135deg, #fef9f0, #fdf2e0);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-accent);
}

.tip-box p {
  margin-bottom: var(--spacing-sm);
  font-size: 0.95rem;
}

/* ==================== 侧边栏 ==================== */
.detail-sidebar {
  position: sticky;
  top: 90px;
  align-self: start;
}

.sidebar-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
}

.sidebar-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.info-list li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.9rem;
  border-bottom: 1px dashed var(--color-border);
}

.info-list li:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: var(--color-text-light);
  min-width: 50px;
}

/* 相关推荐 */
.related-item {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  cursor: pointer;
  transition: background var(--transition-fast);
  border-radius: var(--radius-sm);
}

.related-item:hover {
  background: var(--color-bg);
}

.related-item img {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.related-item strong {
  display: block;
  font-size: 0.9rem;
  color: var(--color-primary);
  margin-bottom: 2px;
}

.related-item span {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

/* ==================== 响应式 ==================== */
@media (max-width: 992px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    position: static;
  }

  .detail-title {
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .detail-hero {
    height: 40vh;
  }

  .detail-title {
    font-size: 1.5rem;
  }
}
</style>
