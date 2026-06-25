<!--
  Home.vue - 首页视图

  功能：
  - HeroBanner 横幅搜索区
  - 精选景点展示
  - 分类快速浏览
  - 特色区域介绍

  技术点：
  - 组件组合：组合多个子组件构建页面
  - 父子通信：监听子组件emit事件
  - 路由编程式导航：router.push
  - 生命周期：onMounted加载数据
  - 插槽使用：ScenicCard的具名和作用域插槽
-->
<template>
  <div class="home-page">
    <!-- ==================== 1. 英雄横幅区 ==================== -->
    <!-- 通过 emit 接收子组件的搜索事件 -->
    <HeroBanner
      @search="handleHeroSearch"
      @quick-search="handleQuickSearch"
      @scroll-down="scrollToFeatured"
    />

    <!-- ==================== 2. 精选景点区 ==================== -->
    <section id="featured" class="featured-section">
      <div class="container">
        <h2 class="section-title">🌟 精选景点</h2>
        <p class="section-desc">
          从世界文化遗产到自然奇观，我们为您精选全球最值得探索的地标
        </p>

        <div class="featured-grid">
          <!--
            使用 ScenicCard 组件展示精选景点
            通过 props 传递景点数据
            使用作用域插槽自定义卡片展示
          -->
          <ScenicCard
            v-for="dest in featuredDestinations"
            :key="dest.id"
            :destination="dest"
            @toggle-favorite="handleFavoriteToggle"
          >
            <!-- 具名插槽：自定义标题样式 -->
            <template #header="{ destination }">
              <div class="featured-title-row">
                <h3 class="card-title">{{ destination.title }}</h3>
                <span class="featured-badge">精选</span>
              </div>
            </template>

            <!-- 作用域插槽：暴露景点数据 -->
            <template #footer="{ destination }">
              <div class="card-footer">
                <span class="footer-link">查看详情 →</span>
                <span class="footer-season">🗓️ {{ destination.bestSeason }}</span>
              </div>
            </template>
          </ScenicCard>
        </div>
      </div>
    </section>

    <!-- ==================== 3. 分类浏览区 ==================== -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">🏛️ 按分类浏览</h2>
        <div class="category-grid">
          <div
            v-for="cat in categoryList"
            :key="cat.name"
            class="category-card"
            :style="{ backgroundImage: `url(${cat.image})` }"
            @click="goToCategory(cat.name)"
          >
            <div class="category-overlay">
              <span class="category-icon">{{ cat.icon }}</span>
              <h3 class="category-name">{{ cat.name }}</h3>
              <p class="category-count">{{ cat.count }} 个景点</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== 4. 特色亮点区 ==================== -->
    <section class="highlights-section">
      <div class="container">
        <h2 class="section-title">✨ 为什么选择我们</h2>
        <div class="highlights-grid">
          <div class="highlight-item" v-for="item in highlights" :key="item.title">
            <div class="highlight-icon">{{ item.icon }}</div>
            <h3 class="highlight-title">{{ item.title }}</h3>
            <p class="highlight-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Home 页面逻辑
 */

import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScenicStore } from '@/store/scenic'
import HeroBanner from '@/components/HeroBanner.vue'
import ScenicCard from '@/components/ScenicCard.vue'

const router = useRouter()
const scenicStore = useScenicStore()

// ============ 精选景点（前6个评分最高的） ============
const featuredDestinations = computed(() => {
  return [...scenicStore.destinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)
})

// ============ 分类列表 ============
const categoryList = [
  { name: '历史遗迹', icon: '🏯', count: 2, image: '/assets/长城.jpg' },
  { name: '自然奇观', icon: '🏔️', count: 2, image: '/assets/黄石公园.webp' },
  { name: '历史建筑', icon: '🕌', count: 2, image: '/assets/泰姬陵.png' },
  { name: '宗教建筑', icon: '⛪', count: 1, image: '/assets/索菲亚教堂.png' },
  { name: '现代建筑', icon: '🏗️', count: 1, image: '/assets/悉尼歌剧院.png' },
  { name: '自然风光', icon: '🌿', count: 1, image: '/assets/七星岩.png' }
]

// ============ 特色亮点 ============
const highlights = [
  { icon: '📸', title: '高清影像', desc: '每个景点配备高清实景照片' },
  { icon: '📝', title: '专业介绍', desc: '详细的历史背景和旅行攻略' },
  { icon: '⭐', title: '真实评分', desc: '基于游客反馈的综合评分' },
  { icon: '❤️', title: '云端收藏', desc: '随时收藏心仪的旅行目的地' }
]

// ============ 方法 ============

/** 处理HeroBanner搜索 */
function handleHeroSearch(query) {
  scenicStore.setSearchQuery(query)
  router.push({ name: 'Destinations' })
}

/** 处理快速搜索标签 */
function handleQuickSearch(tag) {
  scenicStore.setSearchQuery(tag)
  router.push({ name: 'Destinations' })
}

/** 滚动到精选区域 */
function scrollToFeatured() {
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })
}

/** 点击分类跳转 */
function goToCategory(categoryName) {
  scenicStore.setCategory(categoryName)
  router.push({ name: 'Destinations' })
}

/** 收藏切换回调 */
function handleFavoriteToggle(id) {
  const dest = scenicStore.getDestinationById(id)
  const action = scenicStore.isFavorite(id) ? '已收藏' : '已取消收藏'
  console.log(`[Home] ${dest?.title} ${action}`)
}

// ============ 生命周期 ============
onMounted(() => {
  console.log('[Home] 首页已加载，景点总数:', scenicStore.totalCount)
  // 重置搜索和筛选状态
  scenicStore.setSearchQuery('')
  scenicStore.setCategory('全部')
})
</script>

<style scoped>
/* ==================== 精选景点 ==================== */
.featured-section {
  padding: var(--spacing-3xl) 0;
}

.section-desc {
  text-align: center;
  color: var(--color-text-light);
  margin-top: -var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
  font-size: 1rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

/* 精选标签 */
.featured-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.featured-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: #fff;
  border-radius: 10px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-season {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

/* ==================== 分类浏览 ==================== */
.categories-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-primary);
}

.categories-section .section-title {
  color: #fff;
}

.categories-section .section-title::after {
  background: var(--color-accent);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.category-card {
  position: relative;
  height: 200px;
  border-radius: var(--radius-lg);
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: scale(1.03);
}

.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: var(--spacing-lg);
  color: #fff;
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.category-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.category-count {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* ==================== 特色亮点 ==================== */
.highlights-section {
  padding: var(--spacing-3xl) 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
}

.highlight-item {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.highlight-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.highlight-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.highlight-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.highlight-desc {
  font-size: 0.85rem;
  color: var(--color-text-light);
  line-height: 1.6;
}

/* ==================== 响应式 ==================== */
@media (max-width: 992px) {
  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .highlights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
  .category-grid {
    grid-template-columns: 1fr;
  }
  .highlights-grid {
    grid-template-columns: 1fr;
  }
}
</style>
