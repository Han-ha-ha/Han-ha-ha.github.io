<!--
  BackToTop.vue - 返回顶部按钮组件

  功能：
  - 页面滚动一定距离后显示
  - 平滑滚动回顶部
  - 显示/隐藏过渡动画

  技术点：
  - Teleport：此组件通过App.vue中的Teleport渲染到body层级
  - 生命周期：onMounted/onUnmounted 管理滚动监听
  - Transition：显示/隐藏动画
-->
<template>
  <transition name="fade-scale">
    <button
      v-show="visible"
      class="back-to-top"
      @click="scrollToTop"
      title="返回顶部"
      aria-label="返回顶部"
    >
      ↑
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

/** 滚动监听 - 超过300px显示按钮 */
function handleScroll() {
  visible.value = window.scrollY > 300
}

/** 平滑滚动到顶部 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-fast);
}

.back-to-top:hover {
  background: var(--color-accent-hover);
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

/* 过渡动画 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
