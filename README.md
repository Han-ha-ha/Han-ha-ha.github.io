# 🌍 环球胜景 - Global Landmarks

> 基于 Vue 3 构建的全球著名地标旅游展示网站 | 期末开发作业

---

## 📋 项目概述

环球胜景是一个展示全球著名旅游地标的单页面应用（SPA），精选了9个世界级景点，
提供详细的介绍、高清图片、旅游建议等功能，为用户打造沉浸式的在线旅游浏览体验。

## 🚀 快速启动

```bash
# 安装依赖
npm install

# 启动开发服务器（自动打开浏览器）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
vue-travel-website/
├── index.html                     # 入口HTML
├── package.json                   # 项目配置
├── vite.config.js                 # Vite构建配置
├── public/
│   └── assets/                    # 静态资源（景点图片）
├── src/
│   ├── main.js                    # 应用入口：创建Vue实例、注册插件
│   ├── App.vue                    # 根组件：全局布局、provide/inject、Teleport
│   ├── router/
│   │   └── index.js               # 路由配置：懒加载、导航守卫、动态路由
│   ├── store/
│   │   └── scenic.js              # Pinia状态管理：景点数据、搜索、收藏
│   ├── components/                # 可复用组件
│   │   ├── AppHeader.vue          # 全局头部导航（响应式+收藏徽章）
│   │   ├── AppFooter.vue          # 全局底部（插槽预留扩展）
│   │   ├── HeroBanner.vue         # 首页主视觉横幅（emit通信）
│   │   ├── ScenicCard.vue         # 景点卡片（核心复用，3种插槽）
│   │   ├── SearchBar.vue          # 搜索栏（v-model+防抖）
│   │   ├── FilterPanel.vue        # 分类筛选面板
│   │   ├── LoadingSpinner.vue     # 加载动画
│   │   └── BackToTop.vue          # 返回顶部（Teleport渲染）
│   └── views/                     # 页面视图
│       ├── Home.vue               # 首页：横幅+精选+分类+亮点
│       ├── Destinations.vue       # 景点列表：搜索+筛选+卡片网格
│       ├── Detail.vue             # 景点详情：动态路由+侧边栏+推荐
│       ├── Favorites.vue          # 我的收藏：空状态+管理收藏
│       ├── About.vue              # 关于页面：技术栈展示
│       └── NotFound.vue           # 404页面
```

## 🎯 技术栈

| 技术 | 说明 |
|------|------|
| **Vue 3** | 渐进式JavaScript框架，Composition API + `<script setup>` |
| **Vue Router 4** | 官方路由管理器，支持动态路由、导航守卫、懒加载 |
| **Pinia** | 新一代状态管理（优于Vuex，更轻量） |
| **Vite 5** | 下一代构建工具，极速冷启动和HMR |

## ✅ 课堂要求覆盖清单

### 1. 组件 (Components)
- ✅ **AppHeader** - 全局头部导航（响应式设计、滚动监听、移动端菜单）
- ✅ **AppFooter** - 全局底部信息（具名插槽扩展）
- ✅ **HeroBanner** - 首页横幅（emit子传父通信）
- ✅ **ScenicCard** - 景点卡片核心复用组件（3种插槽类型）
- ✅ **SearchBar** - 搜索栏（v-model双向绑定+防抖优化）
- ✅ **FilterPanel** - 分类筛选面板
- ✅ **LoadingSpinner** - 加载动画（默认插槽）
- ✅ **BackToTop** - 返回顶部（Teleport渲染到body）

### 2. 生命周期 (Lifecycle Hooks)
- ✅ **onMounted** - AppHeader滚动监听、Home数据加载、Detail页面初始化
- ✅ **onUnmounted** - 清理滚动监听、防止内存泄漏
- ✅ **onBeforeUnmount** - Detail页面离开前日志

### 3. 组件间通信
| 通信方式 | 方向 | 使用位置 |
|----------|------|----------|
| **Props** | 父→子 | ScenicCard接收destination、SearchBar接收placeholder |
| **Emit** | 子→父 | HeroBanner发送search事件、FilterPanel发送select事件 |
| **provide/inject** | 祖先→后代 | App.vue提供siteName，所有组件注入使用 |
| **Pinia Store** | 全局 | 跨组件共享景点数据、搜索状态、收藏列表 |

### 4. 插槽 (Slots)
| 插槽类型 | 使用位置 |
|----------|----------|
| **默认插槽** | LoadingSpinner自定义文本、AppFooter社交图标 |
| **具名插槽** | ScenicCard的header/imageOverlay/footer区域 |
| **作用域插槽** | ScenicCard暴露destination数据给父组件定制渲染 |

### 5. 路由 (Vue Router)
- ✅ **动态路由** - `/destination/:id` 参数传递
- ✅ **嵌套路由** - router-view嵌套
- ✅ **导航守卫** - beforeEach设置页面标题
- ✅ **路由懒加载** - 动态import()代码分割
- ✅ **路由元信息** - meta配置过渡动画和标题
- ✅ **路由过渡动画** - transition+mode="out-in"
- ✅ **404通配路由** - `/:pathMatch(.*)*`

## 🌟 超出课堂内容（展现自学能力）

| 技术 | 说明 |
|------|------|
| **Pinia状态管理** | 替代Vuex，支持Composition API风格 |
| **Composition API + `<script setup>`** | Vue3.2+语法糖，更简洁高效 |
| **Teleport** | 将BackToTop渲染到body层级 |
| **Transition/TransitionGroup** | 页面切换和列表动画 |
| **KeepAlive** | 首页组件缓存，优化性能 |
| **Vite** | 替代Vue CLI的现代化构建工具 |
| **localStorage持久化** | 收藏数据本地存储，刷新不丢失 |
| **防抖优化** | 搜索输入300ms防抖 |
| **响应式设计** | 三端适配（桌面/平板/移动端） |
| **路由懒加载** | 按需加载页面，减少首屏时间 |
| **Web Share API** | 原生分享功能 |
| **CSS自定义属性** | 主题色系统，易于维护 |
| **滚动监听优化** | passive事件提升性能 |

## 🎨 页面设计

- **色彩方案**: 深蓝主色调(#2c3e50)配合橙色点缀(#e67e22)，专业稳重又不失活力
- **字体**: Playfair Display(标题) + Noto Sans SC(正文)，中西文字体协调
- **布局**: 网格系统+弹性布局，1200px最大宽度居中
- **动画**: 页面切换(淡入滑动)、卡片悬停(上浮阴影)、列表交错入场
- **响应式**: 768px/600px断点，移动端汉堡菜单

## 📄 页面说明

| 页面 | 路由 | 功能 |
|------|------|------|
| 首页 | `/` | 横幅搜索、精选景点、分类浏览、特色亮点 |
| 景点列表 | `/destinations` | 关键词搜索、分类筛选、9个景点卡片网格 |
| 景点详情 | `/destination/:id` | 大图展示、完整信息、收藏、分享、相关推荐 |
| 我的收藏 | `/favorites` | 收藏管理、空状态提示、一键清空 |
| 关于 | `/about` | 项目介绍、技术栈、功能亮点、作业信息 |
| 404 | `/*` | 友好错误提示、返回导航 |

## 👨‍💻 开发信息

- **课程**: 应用开发
- **学期**: 大二期末作业
- **框架版本**: Vue 3.4 + Vite 5.2
