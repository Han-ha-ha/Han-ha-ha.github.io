<!--
  SearchBar.vue - 搜索栏组件

  功能：
  - 搜索输入框
  - 实时搜索（防抖优化）
  - 清除按钮

  技术点：
  - v-model：双向绑定搜索文本
  - emit：实时通知父组件搜索结果
  - 防抖：减少不必要的搜索触发
-->
<template>
  <div class="search-bar">
    <div class="search-wrapper">
      <!-- 搜索图标 -->
      <span class="search-icon">🔍</span>

      <!-- 输入框 -->
      <input
        v-model="localQuery"
        type="text"
        class="search-input"
        :placeholder="placeholder"
        @input="onInput"
      />

      <!-- 清除按钮 - 条件渲染 -->
      <button
        v-if="localQuery"
        class="clear-btn"
        @click="clearSearch"
        title="清除搜索"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * SearchBar 组件逻辑
 * 演示：v-model、emit、防抖优化
 */

import { ref, watch } from 'vue'

// ============ Props ============
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '搜索景点...'
  }
})

// ============ Emit ============
const emit = defineEmits(['update:modelValue', 'search'])

// ============ 本地状态 ============
const localQuery = ref(props.modelValue)
let debounceTimer = null

// ============ 监听父组件传来的值变化 ============
watch(() => props.modelValue, (newVal) => {
  localQuery.value = newVal
})

// ============ 方法 ============

/** 输入处理（带防抖） */
function onInput() {
  // 同步更新v-model
  emit('update:modelValue', localQuery.value)

  // 防抖处理：300ms内不再输入才触发搜索
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', localQuery.value)
  }, 300)
}

/** 清除搜索 */
function clearSearch() {
  localQuery.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 500px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  font-size: 1rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px var(--spacing-md) 12px 42px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  font-size: 0.95rem;
  font-family: var(--font-body);
  outline: none;
  transition: all var(--transition-fast);
  background: var(--color-bg-card);
}

.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
}

.search-input::placeholder {
  color: #adb5bd;
}

.clear-btn {
  position: absolute;
  right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--color-border);
  border: none;
  border-radius: 50%;
  color: var(--color-text-light);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.clear-btn:hover {
  background: var(--color-danger);
  color: #fff;
}
</style>
