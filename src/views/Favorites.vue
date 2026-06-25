<!--
  Favorites.vue - 收藏页视图

  功能：
  - 展示已收藏的景点
  - 从收藏中移除
  - 空收藏状态提示
  - 一键清空收藏

  技术点：
  - Pinia 状态管理：读取和修改收藏状态
  - 条件渲染：收藏为空时的友好提示
  - 作用域插槽：自定义 ScenicCard 展示
-->
<template>
  <div class="favorites-page">
    <div class="container">
      <!-- ========== 页面头部 ========== -->
      <div class="page-header">
        <h1 class="page-title">❤️ 我的收藏</h1>
        <p class="page-desc">
          您收藏的旅行目的地，随时查看和规划行程
        </p>
        <!-- 清空按钮 -->
        <button
          v-if="favoriteList.length > 0"
          class="clear-all-btn"
          @click="clearAllFavorites"
        >
          🗑️ 清空所有收藏
        </button>
      </div>

      <!-- ========== 有收藏内容 ========== -->
      <template v-if="favoriteList.length > 0">
        <div class="favorites-count">
          共收藏了 <strong>{{ favoriteList.length }}</strong> 个景点
        </div>

        <div class="favorites-grid">
          <ScenicCard
            v-for="dest in favoriteList"
            :key="dest.id"
            :destination="dest"
            @toggle-favorite="handleToggle"
          >
            <!-- 自定义图片叠加层 -->
            <template #imageOverlay>
              <div class="favorite-badge">❤️ 已收藏</div>
            </template>

            <!-- 自定义底部操作 -->
            <template #footer="{ destination }">
              <div class="card-footer-row">
                <span class="footer-link">查看详情 →</span>
                <button class="remove-btn" @click.stop="removeFavorite(destination.id)">
                  取消收藏
                </button>
              </div>
            </template>
          </ScenicCard>
        </div>

        <!-- 返回浏览 -->
        <div class="back-browse">
          <router-link to="/destinations" class="browse-link">
            🏛️ 继续浏览更多景点
          </router-link>
        </div>
      </template>

      <!-- ========== 空收藏状态 ========== -->
      <div v-else class="empty-state">
        <div class="empty-icon">💝</div>
        <h3>还没有收藏任何景点</h3>
        <p>浏览景点列表，点击心形图标收藏您感兴趣的目的地</p>
        <router-link to="/destinations" class="browse-btn">
          去浏览景点 →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Favorites 页面逻辑
 */

import { computed, onMounted } from 'vue'
import { useScenicStore } from '@/store/scenic'
import ScenicCard from '@/components/ScenicCard.vue'

const scenicStore = useScenicStore()

// ============ 计算属性 ============

/** 收藏的景点列表 */
const favoriteList = computed(() => scenicStore.favoriteDestinations)

// ============ 方法 ============

/** 切换收藏 */
function handleToggle(id) {
  console.log(`[Favorites] 切换收藏: ID=${id}`)
}

/** 移除收藏 */
function removeFavorite(id) {
  scenicStore.toggleFavorite(id)
}

/** 清空所有收藏 */
function clearAllFavorites() {
  if (confirm('确定要清空所有收藏吗？此操作不可恢复。')) {
    // 逐个移除所有收藏
    const ids = [...scenicStore.favorites]
    ids.forEach(id => scenicStore.toggleFavorite(id))
  }
}

// ============ 生命周期 ============
onMounted(() => {
  console.log(`[Favorites] 收藏页加载，当前收藏数: ${scenicStore.favoriteCount}`)
})
</script>

<style scoped>
/* ==================== 页面整体 ==================== */
.favorites-page {
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
  margin-bottom: var(--spacing-md);
}

/* 清空按钮 */
.clear-all-btn {
  padding: 8px 18px;
  background: transparent;
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.clear-all-btn:hover {
  background: var(--color-danger);
  color: #fff;
}

/* ==================== 收藏数量 ==================== */
.favorites-count {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  font-size: 0.95rem;
  color: var(--color-text-light);
}

.favorites-count strong {
  color: var(--color-accent);
  font-size: 1.1rem;
}

/* ==================== 景点网格 ==================== */
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

/* 已收藏徽章 */
.favorite-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: 4px 12px;
  background: rgba(231, 76, 60, 0.85);
  color: #fff;
  font-size: 0.75rem;
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

.remove-btn {
  padding: 6px 14px;
  background: transparent;
  color: var(--color-danger);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.remove-btn:hover {
  background: var(--color-danger);
  color: #fff;
}

/* 返回浏览 */
.back-browse {
  text-align: center;
  margin-top: var(--spacing-2xl);
}

.browse-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 12px 28px;
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  transition: background var(--transition-fast);
}

.browse-link:hover {
  background: var(--color-primary-light);
}

/* ==================== 空状态 ==================== */
.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: var(--spacing-lg);
}

.empty-state h3 {
  font-size: 1.4rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.empty-state p {
  color: var(--color-text-light);
  font-size: 1.05rem;
  margin-bottom: var(--spacing-xl);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.browse-btn {
  display: inline-block;
  padding: 12px 32px;
  background: var(--color-accent);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: 1.05rem;
  font-weight: 600;
  transition: background var(--transition-fast);
}

.browse-btn:hover {
  background: var(--color-accent-hover);
}

/* ==================== 响应式 ==================== */
@media (max-width: 992px) {
  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
  .page-title {
    font-size: 1.8rem;
  }
}
</style>
