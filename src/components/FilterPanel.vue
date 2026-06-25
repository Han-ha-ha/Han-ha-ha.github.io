<!--
  FilterPanel.vue - 分类筛选面板组件

  功能：
  - 分类标签切换
  - 搜索结果计数展示

  技术点：
  - Props：接收分类列表和当前选中分类
  - Emit：通知父组件分类变更
  - v-for + :class 动态样式
-->
<template>
  <div class="filter-panel">
    <div class="filter-header">
      <h3 class="filter-title">🏷️ 分类筛选</h3>
      <span class="filter-count">共 {{ totalCount }} 个结果</span>
    </div>

    <div class="filter-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-tab"
        :class="{ active: cat === activeCategory }"
        @click="$emit('select', cat)"
      >
        {{ cat }}
        <!-- 可选：显示每个分类的数量 -->
        <span v-if="cat !== '全部'" class="tab-count">
          {{ getCategoryCount(cat) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * FilterPanel 组件逻辑
 */

// ============ Props ============
defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    required: true
  },
  totalCount: {
    type: Number,
    default: 0
  }
})

// ============ Emit ============
defineEmits(['select'])

/** 计算每个分类的数量（此处简化处理） */
function getCategoryCount(cat) {
  return ''  // 可扩展：从实际数据统计
}
</script>

<style scoped>
.filter-panel {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-2xl);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.filter-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
}

.filter-count {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: var(--color-bg);
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
  font-size: 0.9rem;
  font-family: var(--font-body);
  color: var(--color-text-light);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-tab:hover {
  background: rgba(230, 126, 34, 0.05);
  color: var(--color-accent);
}

.filter-tab.active {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
  font-weight: 600;
}

.tab-count {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>
