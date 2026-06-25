<!--
  Destinations.vue - 景点列表页视图

  功能：
  - 搜索 + 分类筛选
  - 景点卡片网格展示
  - 搜索结果为空时的友好提示
  - 异步加载模拟

  技术点：
  - 组合多个子组件（SearchBar, FilterPanel, ScenicCard）
  - v-model 双向绑定
  - 父子通信（props + emit）
  - 计算属性筛选数据
  - 条件渲染（v-if/v-else）
  - 过渡动画
-->
<template>
  <div class="destinations-page">
    <div class="container">
      <!-- ========== 页面标题 ========== -->
      <div class="page-header">
        <h1 class="page-title">🏛️ 景点列表</h1>
        <p class="page-desc">
          探索全球著名地标，找到您的下一个旅行目的地
        </p>
      </div>

      <!-- ========== 搜索栏 ========== -->
      <!-- 使用 v-model 双向绑定搜索关键词 -->
      <div class="search-row">
        <SearchBar
          v-model="searchQuery"
          placeholder="搜索景点名称、地点或标签..."
          @search="handleSearch"
        />
      </div>

      <!-- ========== 分类筛选面板 ========== -->
      <!-- 通过 props 传递数据，通过 emit 接收分类变更 -->
      <FilterPanel
        :categories="scenicStore.categories"
        :active-category="scenicStore.activeCategory"
        :total-count="filteredResults.length"
        @select="handleCategoryChange"
      />

      <!-- ========== 结果信息 ========== -->
      <div class="results-info">
        <span v-if="searchQuery || scenicStore.activeCategory !== '全部'">
          搜索 "<strong>{{ searchQuery || scenicStore.activeCategory }}</strong>"
          共找到 <strong>{{ filteredResults.length }}</strong> 个景点
        </span>
        <span v-else>
          共 <strong>{{ scenicStore.totalCount }}</strong> 个景点
        </span>
      </div>

      <!-- ========== 景点卡片网格 ========== -->
      <!-- TransitionGroup 实现列表项动画 -->
      <transition-group
        v-if="filteredResults.length > 0"
        name="list"
        tag="div"
        class="destinations-grid"
        appear
      >
        <ScenicCard
          v-for="dest in filteredResults"
          :key="dest.id"
          :destination="dest"
          @toggle-favorite="handleFavoriteToggle"
        >
          <!-- 具名插槽：自定义图片叠加层 -->
          <template #imageOverlay="{ destination }">
            <div class="rating-badge">
              ⭐ {{ destination.rating }}
            </div>
          </template>

          <!-- 具名插槽：自定义底部 -->
          <template #footer="{ destination }">
            <div class="card-footer-row">
              <span class="footer-link">查看详情 →</span>
              <span class="footer-visitors">
                👥 {{ destination.visitorsPerYear }}
              </span>
            </div>
          </template>
        </ScenicCard>
      </transition-group>

      <!-- ========== 空状态 ========== -->
      <div v-else class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>未找到相关景点</h3>
        <p>请尝试其他搜索关键词或筛选条件</p>
        <button class="reset-btn" @click="resetFilters">重置筛选条件</button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Destinations 页面逻辑
 */

import { ref, computed, onMounted } from 'vue'
import { useScenicStore } from '@/store/scenic'
import SearchBar from '@/components/SearchBar.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import ScenicCard from '@/components/ScenicCard.vue'

const scenicStore = useScenicStore()

// ============ 本地状态 ============
const searchQuery = ref('')
const isLoading = ref(false)

// ============ 计算属性 ============

/** 筛选后的结果 */
const filteredResults = computed(() => scenicStore.filteredDestinations)

// ============ 方法 ============

/** 处理搜索 */
function handleSearch(query) {
  isLoading.value = true
  scenicStore.setSearchQuery(query)
  // 模拟加载延迟
  setTimeout(() => {
    isLoading.value = false
  }, 200)
}

/** 处理分类切换 */
function handleCategoryChange(category) {
  scenicStore.setCategory(category)
}

/** 收藏切换 */
function handleFavoriteToggle(id) {
  const dest = scenicStore.getDestinationById(id)
  if (scenicStore.isFavorite(id)) {
    console.log(`[Destinations] 已收藏: ${dest?.title}`)
  }
}

/** 重置筛选 */
function resetFilters() {
  searchQuery.value = ''
  scenicStore.setSearchQuery('')
  scenicStore.setCategory('全部')
}

// ============ 生命周期 ============
onMounted(() => {
  console.log('[Destinations] 景点列表页已加载')
})
</script>

<style scoped>
/* ==================== 页面头部 ==================== */
.destinations-page {
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.page-desc {
  color: var(--color-text-light);
  font-size: 1.05rem;
}

/* ==================== 搜索行 ==================== */
.search-row {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

/* ==================== 结果信息 ==================== */
.results-info {
  margin-bottom: var(--spacing-lg);
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.results-info strong {
  color: var(--color-accent);
}

/* ==================== 景点网格 ==================== */
.destinations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

/* 评分徽章 */
.rating-badge {
  position: absolute;
  bottom: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: 4px 10px;
  background: rgba(44, 62, 80, 0.8);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

/* 底部行 */
.card-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-visitors {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

/* ==================== 列表过渡动画 ==================== */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* ==================== 空状态 ==================== */
.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.empty-state h3 {
  font-size: 1.3rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.empty-state p {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-lg);
}

.reset-btn {
  padding: 10px 24px;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-family: var(--font-body);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.reset-btn:hover {
  background: var(--color-accent-hover);
}

/* ==================== 响应式 ==================== */
@media (max-width: 992px) {
  .destinations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .destinations-grid {
    grid-template-columns: 1fr;
  }
  .page-title {
    font-size: 1.8rem;
  }
}
</style>
