<!--
  LoadingSpinner.vue - 加载动画组件

  功能：
  - 加载中动画指示
  - 可自定义文本

  技术点：
  - Props：接收加载文本
  - 插槽：可选自定义加载内容
-->
<template>
  <div class="loading-container">
    <div class="spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p class="loading-text">
      <slot>{{ text }}</slot>
    </p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '加载中...'
  }
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl);
  gap: var(--spacing-lg);
}

.spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring:nth-child(1) {
  border-top-color: var(--color-accent);
  animation-delay: -0.45s;
}

.spinner-ring:nth-child(2) {
  border-right-color: var(--color-primary-light);
  animation-delay: -0.3s;
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
}

.spinner-ring:nth-child(3) {
  border-bottom-color: var(--color-accent);
  animation-delay: -0.15s;
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 0.95rem;
  color: var(--color-text-light);
}
</style>
