<template>
    <div class="list-container">
      <!-- 列表内容 -->
      <div class="list-content">
        <div v-for="(item, index) in currentPageData" 
             :key="index" 
             class="list-item"
             :style="{ width: itemWidth }">
          <div class="item-inner" :title="item.name">
            {{ item.name }}
          </div>
        </div>
      </div>
      
      <!-- 分页器 -->
      <div class="pagination" v-if="totalPages > 1">
        <span class="page-text">{{ currentPage }}/{{ totalPages }}</span>
        <span class="page-arrow" @click="prevPage" :class="{ disabled: currentPage === 1 }">◀</span>
        <span class="page-arrow" @click="nextPage" :class="{ disabled: currentPage === totalPages }">▶</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ListWithPagination',
    
    props: {
      data: {
        type: Array,
        default: () => []
      },
      maxItems: {
        type: Number,
        default: 12
      },
      itemsPerPage: {
        type: Number,
        default: 6
      }
    },
    
    data() {
      return {
        currentPage: 1
      }
    },
    
    computed: {
      // 计算总页数
      totalPages() {
        const validData = this.data.slice(0, this.maxItems)
        return Math.ceil(validData.length / this.itemsPerPage)
      },
      
      // 计算当前页的数据
      currentPageData() {
        const validData = this.data.slice(0, this.maxItems)
        const start = (this.currentPage - 1) * this.itemsPerPage
        return validData.slice(start, start + this.itemsPerPage)
      },
      
      // 计算每个项目的宽度
      itemWidth() {
        const itemCount = Math.min(this.currentPageData.length, this.itemsPerPage)
        return `${100 / itemCount}%`
      }
    },
    
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      },
      
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
        }
      }
    },
    
    watch: {
      data() {
        this.currentPage = 1
      }
    }
  }
  </script>
  
  <style scoped>
  .list-container {
    width: 800px; /* 固定容器宽度 */
    margin: 0 auto;
  }
  
  .list-content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .list-item {
    padding: 0 10px;
    box-sizing: border-box;
  }
  
  .item-inner {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    padding: 8px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .pagination {
    text-align: center;
    user-select: none;
  }
  
  .page-text {
    margin: 0 10px;
  }
  
  .page-arrow {
    cursor: pointer;
    padding: 0 5px;
  }
  
  .page-arrow.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>