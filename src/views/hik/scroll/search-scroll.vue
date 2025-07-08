<template>
    <div style="height: calc(100vh - 50px);overflow-y: auto;">
        <div class="container">
      <!-- 固定Header -->
      <div class="header">
        <h1>动态吸顶搜索框 - Vue2实现</h1>
      </div>
      
      <!-- 动态搜索区域 -->
      <div class="search-section" 
           :class="{sticky: scrollRatio > 0}"
           :style="{
             height: `${searchHeight}px`,
             padding: scrollRatio > 0.8 ? '5px 20px' : '20px'
           }">
        <div class="section-title" 
             :style="{
               opacity: 1 - scrollRatio * 1.2,
               transform: `scale(${1 - scrollRatio * 0.5})`,
               height: scrollRatio > 0.8 ? '0' : 'auto',
               marginBottom: scrollRatio > 0.8 ? '0' : '25px'
             }">
          <i class="fas fa-search"></i> 动态搜索区域
        </div>
        
        <div class="search-container" 
             :style="{
               transform: `translateY(${scrollRatio * -20}px)`
             }">
          <div class="search-box">
            <input type="text" 
                   placeholder="输入关键词搜索..." 
                   v-model="searchTerm">
            <button @click="search">
              <i class="fas fa-search"></i> 搜索
            </button>
          </div>
        </div>
      </div>
      
      <!-- 列表区域 -->
      <div class="list-section">
        <div class="list-header">
          <div class="list-title">项目列表</div>
          <div class="item-count">共 {{ filteredItems.length }} 个项目</div>
        </div>
        
        <div class="list-content">
          <div class="list-item" v-for="(item, index) in filteredItems" :key="index">
            <div class="item-header">
              <div class="item-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="item-title">{{ item.title }}</div>
            </div>
            <div class="item-content">{{ item.content }}</div>
            <div class="item-footer">
              <div>ID: #{{ index + 1 }}</div>
              <div>{{ item.date }}</div>
            </div>
          </div>
        </div>
        
        <div class="info-panel">
          <h3><i class="fas fa-info-circle"></i> 实现功能说明</h3>
          <p>此页面使用Vue2实现了动态吸顶搜索框效果：</p>
          
          <div class="features">
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <div>
                <strong>动态高度变化</strong>
                <p>搜索区域从初始高度逐步减小到吸顶高度</p>
              </div>
            </div>
            
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <div>
                <strong>标题淡出效果</strong>
                <p>标题在滚动过程中逐渐淡出并缩小</p>
              </div>
            </div>
            
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <div>
                <strong>平滑过渡动画</strong>
                <p>使用CSS transitions实现平滑过渡效果</p>
              </div>
            </div>
            
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <div>
                <strong>响应式设计</strong>
                <p>适配移动设备和桌面设备</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator" v-show="showScrollIndicator">
      <i class="fas fa-arrow-up"></i> 向下滚动查看吸顶效果
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StickyLayout',
    data() {
      return {
        searchTerm: '',
        scrollRatio: 0,
        showScrollIndicator: true,
        searchHeight: 180, // 初始高度180px
        minSearchHeight: 70, // 吸顶时最小高度
        items: []
      };
    },
    computed: {
        filteredItems() {
          if (!this.searchTerm) return this.items;
          const term = this.searchTerm.toLowerCase();
          return this.items.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.content.toLowerCase().includes(term)
          );
        }
      },
    mounted() {
      // 生成示例数据
       this.generateItems();
        
        // 监听滚动事件
        window.addEventListener('scroll', this.handleScroll);
        
        // 5秒后隐藏滚动提示
        setTimeout(() => {
          this.showScrollIndicator = false;
        }, 7000);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
      },
      methods: {
        generateItems() {
          const icons = [
            'fas fa-file-alt', 'fas fa-chart-line', 'fas fa-code', 
            'fas fa-users', 'fas fa-cogs', 'fas fa-paint-brush',
            'fas fa-mobile-alt', 'fas fa-database', 'fas fa-cloud'
          ];
          
          const titles = [
            '项目计划书', '数据分析报告', '前端开发文档', 
            '用户调研分析', '系统架构设计', 'UI设计方案',
            '移动端适配方案', '数据库优化', '云服务部署'
          ];
          
          const contents = [
            '详细的项目执行计划与时间安排，包含里程碑和交付物',
            '基于用户行为数据的深度分析与可视化展示',
            'Vue.js组件化开发文档与最佳实践指南',
            '目标用户群体特征分析及需求调研报告',
            '高可用分布式系统架构设计与技术选型',
            '产品UI设计方案与设计规范文档',
            '响应式设计与移动端适配方案实现',
            '数据库性能优化方案与索引策略',
            '云原生架构设计与容器化部署方案'
          ];
          
          const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          const days = Array.from({length: 28}, (_, i) => (i + 1).toString().padStart(2, '0'));
          
          for (let i = 0; i < 24; i++) {
            const month = months[Math.floor(Math.random() * months.length)];
            const day = days[Math.floor(Math.random() * days.length)];
            
            this.items.push({
              icon: icons[i % icons.length],
              title: titles[i % titles.length],
              content: contents[i % contents.length],
              date: `2023-${month}-${day}`
            });
          }
        },
        search() {
          if (this.searchTerm) {
            // 在实际应用中这里会执行搜索操作
            console.log(`执行搜索: ${this.searchTerm}`);
          }
        },
        handleScroll() {
          // 计算滚动比例 (0到1之间)
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const startOffset = 100; // 开始变化的滚动位置
          const maxOffset = 300; // 完全吸顶的滚动位置
          
          if (scrollTop < startOffset) {
            this.scrollRatio = 0;
          } else if (scrollTop > maxOffset) {
            this.scrollRatio = 1;
          } else {
            this.scrollRatio = (scrollTop - startOffset) / (maxOffset - startOffset);
          }
          
          // 动态计算搜索区域高度
          this.searchHeight = 180 - (180 - this.minSearchHeight) * this.scrollRatio;
        }
      }
  };
  </script>
  
  <style scoped>
  .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    /* 固定Header */
    .header {
      background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
      color: white;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .header h1 {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    
    /* 搜索区域 - 动态效果 */
    .search-section {
      background: white;
      padding: 20px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 40px;
      z-index: 99;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .search-section.sticky {
      border-radius: 0;
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
    }
    
    .section-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 25px;
      color: #2c3e50;
      display: flex;
      align-items: center;
      transition: all 0.4s ease;
    }
    
    .section-title i {
      margin-right: 12px;
      color: #4b6cb7;
      font-size: 28px;
    }
    
    .search-container {
      display: flex;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
      transition: all 0.4s ease;
    }
    
    .search-box {
      display: flex;
      width: 100%;
      box-shadow: 0 4px 15px rgba(75, 108, 183, 0.2);
      border-radius: 50px;
      overflow: hidden;
      transition: all 0.3s;
    }
    
    .search-box input {
      flex: 1;
      padding: 18px 25px;
      border: none;
      background: #f8f9fa;
      font-size: 18px;
      outline: none;
      transition: all 0.3s;
    }
    
    .search-box input:focus {
      background: white;
      box-shadow: inset 0 0 0 2px #4b6cb7;
    }
    
    .search-box input::placeholder {
      color: #a0aec0;
    }
    
    .search-box button {
      background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
      color: white;
      border: none;
      padding: 0 35px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .search-box button:hover {
      opacity: 0.92;
      padding: 0 40px;
    }
    
    .search-box button i {
      margin-right: 10px;
    }
    
    /* 列表区域 */
    .list-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      margin-top: 25px;
      min-height: 1000px;
      padding: 30px;
      position: relative;
      overflow: hidden;
    }
    
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      margin-bottom: 25px;
    }
    
    .list-title {
      font-size: 22px;
      font-weight: 700;
      color: #2c3e50;
    }
    
    .item-count {
      color: #718096;
      font-size: 16px;
    }
    
    .list-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
    }
    
    .list-item {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-left: 4px solid #4b6cb7;
      display: flex;
      flex-direction: column;
    }
    
    .list-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      background: white;
    }
    
    .item-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .item-icon {
      width: 40px;
      height: 40px;
      background: #4b6cb7;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      margin-right: 15px;
    }
    
    .item-title {
      font-weight: 700;
      color: #2c3e50;
      font-size: 18px;
    }
    
    .item-content {
      color: #718096;
      font-size: 15px;
      line-height: 1.6;
      margin-top: 10px;
    }
    
    .item-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px dashed #e2e8f0;
      color: #a0aec0;
      font-size: 14px;
    }
    
    /* 滚动指示器 */
    .scroll-indicator {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: rgba(75, 108, 183, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 30px;
      font-size: 15px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      z-index: 101;
      backdrop-filter: blur(5px);
    }
    
    .scroll-indicator i {
      margin-right: 10px;
      animation: bounce 1.8s infinite;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    
    /* 信息面板 */
    .info-panel {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 25px;
      margin-top: 40px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-top: 4px solid #4b6cb7;
    }
    
    .info-panel h3 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    
    .info-panel h3 i {
      margin-right: 10px;
      color: #4b6cb7;
    }
    
    .info-panel p {
      color: #718096;
      line-height: 1.7;
      margin-bottom: 15px;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .feature {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: flex-start;
    }
    
    .feature i {
      color: #4b6cb7;
      font-size: 20px;
      margin-right: 15px;
      margin-top: 3px;
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
      }
      
      .search-box {
        border-radius: 12px;
      }
      
      .search-box button {
        padding: 18px;
        border-radius: 0 0 12px 12px;
      }
      
      .list-content {
        grid-template-columns: 1fr;
      }
      
      .section-title {
        font-size: 20px;
        margin-bottom: 15px;
      }
      
      .search-box input {
        padding: 15px 20px;
      }
    }
    
    /* 滚动条美化 */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }
  </style>