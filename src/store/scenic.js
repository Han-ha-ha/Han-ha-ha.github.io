/**
 * store/scenic.js - Pinia 状态管理（景点数据）
 *
 * Pinia 相比 Vuex 的优势（超出课堂内容）：
 * - 完整的 TypeScript 支持
 * - 无需 mutations，直接修改状态
 * - 支持多个 Store 实例
 * - 轻量级，打包体积更小
 * - 支持 Composition API 风格
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 景点数据 Store
 * 使用 Composition API 风格（setup store）
 * 管理景点列表、搜索筛选、收藏功能
 */
export const useScenicStore = defineStore('scenic', () => {
  // ==================== 状态 (State) ====================

  /** 全部景点数据 */
  const destinations = ref([
    {
      id: 1,
      pic: '/assets/长城.jpg',
      title: '长城',
      subtitle: 'The Great Wall',
      location: '中国 · 北京',
      category: '历史遗迹',
      rating: 4.8,
      content: '长城是中国也是世界上修建时间最长、工程量最大的一项古代防御工程。自西周时期开始，延续不断修筑了2000多年，分布于中国北部和中部的广大土地上，总计长度达5万多千米。长城不仅是中华民族的象征，更是人类文明的瑰宝，于1987年被联合国教科文组织列为世界文化遗产。',
      tags: ['世界文化遗产', '古代建筑奇迹', '历史遗迹'],
      highlights: ['八达岭长城', '慕田峪长城', '司马台长城'],
      bestSeason: '春季（4-5月）和秋季（9-10月）',
      visitorsPerYear: '约1000万人次'
    },
    {
      id: 2,
      pic: '/assets/黄石公园.webp',
      title: '黄石国家公园',
      subtitle: 'Yellowstone National Park',
      location: '美国 · 怀俄明州',
      category: '自然奇观',
      rating: 4.9,
      content: '黄石国家公园是美国第一个国家公园，也是世界上第一个国家公园，成立于1872年。公园以其丰富的野生动物、地热资源（尤其是老忠实间歇泉）和壮丽的自然景观闻名于世。公园占地面积约8983平方公里，拥有世界上最大的火山口之一，以及超过10000个地热特征。',
      tags: ['国家公园', '地热奇观', '野生动物'],
      highlights: ['老忠实间歇泉', '大棱镜温泉', '黄石大峡谷'],
      bestSeason: '夏季（6-9月）',
      visitorsPerYear: '约400万人次'
    },
    {
      id: 3,
      pic: '/assets/七星岩.png',
      title: '七星岩',
      subtitle: 'Seven Star Crags',
      location: '中国 · 广东肇庆',
      category: '自然风光',
      rating: 4.6,
      content: '七星岩是国家AAAAA级旅游景区星湖风景区的核心景点，因七座石灰岩峰排列如北斗七星而得名。景区以岩峰、湖泊、溶洞为主要景观，兼有历代摩崖石刻。湖光山色交相辉映，素有"岭南第一奇观"之美誉。',
      tags: ['AAAAA级景区', '喀斯特地貌', '岭南风光'],
      highlights: ['石室岩', '天柱岩', '龙岩洞'],
      bestSeason: '秋季（9-11月）',
      visitorsPerYear: '约300万人次'
    },
    {
      id: 4,
      pic: '/assets/大本钟.png',
      title: '大本钟',
      subtitle: 'Big Ben',
      location: '英国 · 伦敦',
      category: '历史建筑',
      rating: 4.7,
      content: '大本钟（现官方名称为伊丽莎白塔）是联合王国国会大厦威斯敏斯特宫的附属钟塔，也是伦敦乃至整个英国最著名的地标建筑之一。钟塔建于1858年，高96米，是世界著名的哥特式建筑。每逢整点，钟声通过BBC广播传向全世界。',
      tags: ['哥特式建筑', '英国地标', '历史建筑'],
      highlights: ['威斯敏斯特宫', '泰晤士河景观', '伦敦眼'],
      bestSeason: '夏季（6-8月）',
      visitorsPerYear: '约200万人次'
    },
    {
      id: 5,
      pic: '/assets/悉尼歌剧院.png',
      title: '悉尼歌剧院',
      subtitle: 'Sydney Opera House',
      location: '澳大利亚 · 悉尼',
      category: '现代建筑',
      rating: 4.8,
      content: '悉尼歌剧院位于澳大利亚悉尼港便利朗角，是20世纪最具特色的建筑之一，也是世界著名的表演艺术中心。其独特的帆船造型由丹麦建筑师约恩·乌松设计，于1973年正式落成，2007年被联合国教科文组织评为世界文化遗产。',
      tags: ['世界文化遗产', '现代建筑', '地标建筑'],
      highlights: ['贝壳形屋顶', '音乐厅', '海港大桥景观'],
      bestSeason: '全年皆宜（10-4月最佳）',
      visitorsPerYear: '约820万人次'
    },
    {
      id: 6,
      pic: '/assets/泰姬陵.png',
      title: '泰姬陵',
      subtitle: 'Taj Mahal',
      location: '印度 · 阿格拉',
      category: '历史建筑',
      rating: 4.9,
      content: '泰姬陵是印度穆斯林艺术的瑰宝，被誉为"完美建筑"和"印度明珠"。它是莫卧儿皇帝沙贾汗为纪念其爱妃穆塔兹·马哈尔而建的陵墓，建于1632-1653年，全部用白色大理石建造。泰姬陵是世界上最著名的建筑奇迹之一，1983年被列为世界文化遗产。',
      tags: ['世界文化遗产', '世界七大奇迹', '爱情象征'],
      highlights: ['白色大理石主体', '莫卧儿花园', '月光花园'],
      bestSeason: '冬季（11-2月）',
      visitorsPerYear: '约800万人次'
    },
    {
      id: 7,
      pic: '/assets/故宫.png',
      title: '故宫',
      subtitle: 'The Forbidden City',
      location: '中国 · 北京',
      category: '历史遗迹',
      rating: 4.9,
      content: '故宫（紫禁城）是世界上现存规模最大、保存最为完整的木质结构古建筑群之一。始建于1406年，历时14年建成，是明清两代的皇家宫殿。故宫占地面积72万平方米，建筑面积约15万平方米，有大小宫殿70多座，房屋9000余间，收藏文物186万余件。',
      tags: ['世界文化遗产', '皇家宫殿', '博物馆'],
      highlights: ['太和殿', '乾清宫', '御花园', '珍宝馆'],
      bestSeason: '春季（4-5月）和秋季（9-10月）',
      visitorsPerYear: '约1900万人次'
    },
    {
      id: 8,
      pic: '/assets/索菲亚教堂.png',
      title: '圣索菲亚教堂',
      subtitle: 'Saint Sophia Cathedral',
      location: '中国 · 哈尔滨',
      category: '宗教建筑',
      rating: 4.5,
      content: '圣索菲亚教堂位于哈尔滨市道里区，是哈尔滨近代欧式建筑的典型代表。教堂始建于1907年，是远东地区最大的东正教教堂，拜占庭式建筑风格，通高53.35米，占地面积721平方米。其巨大的"洋葱头"穹顶和精美的壁画内饰令人叹为观止。',
      tags: ['拜占庭建筑', '远东名胜', '历史建筑'],
      highlights: ['洋葱头穹顶', '拜占庭风格', '哈尔滨城市名片'],
      bestSeason: '冬季（12-2月，雪景最美）',
      visitorsPerYear: '约150万人次'
    },
    {
      id: 9,
      pic: '/assets/大峡谷.png',
      title: '恩施大峡谷',
      subtitle: 'Enshi Grand Canyon',
      location: '中国 · 湖北恩施',
      category: '自然奇观',
      rating: 4.7,
      content: '恩施大峡谷景区被文化和旅游部认定为AAAAA级景区，位于湖北省恩施土家族苗族自治州。峡谷全长约108公里，以"雄、奇、秀、幽、险"著称。其中"一炷香"石柱高150余米，被誉为镇谷之宝。景区内绝壁长廊、云龙地缝等景观令人叹为观止。',
      tags: ['AAAAA级景区', '喀斯特地貌', '地质奇观'],
      highlights: ['一炷香', '绝壁长廊', '云龙地缝'],
      bestSeason: '春季（4-6月）和秋季（9-11月）',
      visitorsPerYear: '约500万人次'
    }
  ])

  /** 搜索关键词 */
  const searchQuery = ref('')

  /** 当前分类筛选 */
  const activeCategory = ref('全部')

  /** 收藏列表（存储景点ID） */
  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

  // ==================== 计算属性 (Getters) ====================

  /** 所有分类列表 */
  const categories = computed(() => {
    const cats = new Set(destinations.value.map(d => d.category))
    return ['全部', ...cats]
  })

  /** 根据搜索和分类筛选后的景点列表 */
  const filteredDestinations = computed(() => {
    let result = destinations.value

    // 按分类筛选
    if (activeCategory.value !== '全部') {
      result = result.filter(d => d.category === activeCategory.value)
    }

    // 按关键词搜索（模糊匹配标题和内容）
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.trim().toLowerCase()
      result = result.filter(d =>
        d.title.toLowerCase().includes(query) ||
        d.content.toLowerCase().includes(query) ||
        d.location.toLowerCase().includes(query) ||
        d.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return result
  })

  /** 收藏的景点详情列表 */
  const favoriteDestinations = computed(() => {
    return destinations.value.filter(d => favorites.value.includes(d.id))
  })

  /** 景点总数 */
  const totalCount = computed(() => destinations.value.length)

  /** 收藏数量 */
  const favoriteCount = computed(() => favorites.value.length)

  // ==================== 方法 (Actions) ====================

  /**
   * 根据ID获取景点详情
   * @param {number} id - 景点ID
   * @returns {object|undefined} 景点对象
   */
  function getDestinationById(id) {
    return destinations.value.find(d => d.id === Number(id))
  }

  /**
   * 切换收藏状态
   * @param {number} id - 景点ID
   */
  function toggleFavorite(id) {
    const index = favorites.value.indexOf(id)
    if (index > -1) {
      favorites.value.splice(index, 1)  // 取消收藏
    } else {
      favorites.value.push(id)  // 添加收藏
    }
    // 持久化到 localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  /**
   * 检查景点是否已收藏
   * @param {number} id - 景点ID
   * @returns {boolean}
   */
  function isFavorite(id) {
    return favorites.value.includes(id)
  }

  /**
   * 设置搜索关键词
   * @param {string} query
   */
  function setSearchQuery(query) {
    searchQuery.value = query
  }

  /**
   * 设置分类筛选
   * @param {string} category
   */
  function setCategory(category) {
    activeCategory.value = category
  }

  return {
    // 状态
    destinations,
    searchQuery,
    activeCategory,
    favorites,
    // 计算属性
    categories,
    filteredDestinations,
    favoriteDestinations,
    totalCount,
    favoriteCount,
    // 方法
    getDestinationById,
    toggleFavorite,
    isFavorite,
    setSearchQuery,
    setCategory
  }
})
