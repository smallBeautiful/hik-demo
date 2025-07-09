<template>
    <div>
        <div class="container">
      <!-- 顶部状态栏 -->
      <div class="status-bar"></div>
      
      <!-- 顶部导航 -->
      <div class="top-nav">
        <div class="logo">
          <i class="fas fa-shopping-bag"></i>
          <span>淘你喜欢</span>
        </div>
        <div class="nav-icons">
          <i class="fas fa-comment-alt"></i>
          <i class="fas fa-user"></i>
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </div>
      
      <!-- 搜索区域 - 吸顶元素 -->
      <div 
        class="search-area" 
        :class="{ sticky: isSticky }"
        :style="{ background: isSticky ? 'white' : 'linear-gradient(to right, #ff5000, #ff2b00)' }"
      >
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="搜索商品">
          <i class="fas fa-camera search-icon"></i>
        </div>
      </div>
      
      <!-- 分类区域 -->
      <div class="categories">
        <div class="category-item" v-for="(category, index) in categories" :key="index">
          <div class="category-icon">
            <i :class="category.icon"></i>
          </div>
          <div class="category-name">{{ category.name }}</div>
        </div>
      </div>
      
      <!-- 商品列表 -->
      <div class="products">
        <div class="section-title">猜你喜欢</div>
        <div class="product-grid">
          <div class="product-card" v-for="(product, index) in products" :key="index">
            <div class="product-image">
              <div class="product-tag">特惠</div>
              <img src="https://via.placeholder.com/150" alt="商品图片">
            </div>
            <div class="product-info">
              <div class="product-title">{{ product.title }}</div>
              <div class="product-price">¥{{ product.price }} <span>¥{{ product.oldPrice }}</span></div>
              <div class="product-sales">已售{{ product.sales }}件</div>
            </div>
          </div>
        </div>
        
        <div class="section-title">热销榜单</div>
        <div class="product-grid">
          <div class="product-card" v-for="(product, index) in hotProducts" :key="index">
            <div class="product-image">
              <div class="product-tag">热卖</div>
              <img src="https://via.placeholder.com/150" alt="商品图片">
            </div>
            <div class="product-info">
              <div class="product-title">{{ product.title }}</div>
              <div class="product-price">¥{{ product.price }} <span>¥{{ product.oldPrice }}</span></div>
              <div class="product-sales">已售{{ product.sales }}件</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="placeholder"></div>
    </div>
    
    <!-- 回到顶部按钮 -->
    <div class="back-to-top" @click="scrollToTop" v-show="showBackToTop">
      <i class="fas fa-arrow-up"></i>
    </div>
    </div>
  </template>
  
  <script>
  import { throttle } from 'lodash'; // 引入lodash的节流函数
  
  export default {
    name: 'VerticalLayout',
    data() {
      return {
        isSticky: false,
        showBackToTop: false,
        categories: [
          { name: '天猫', icon: 'fas fa-cat' },
          { name: '聚划算', icon: 'fas fa-gem' },
          { name: '超市', icon: 'fas fa-shopping-cart' },
          { name: '充值', icon: 'fas fa-mobile-alt' },
          { name: '机票', icon: 'fas fa-plane' },
          { name: '天猫国际', icon: 'fas fa-globe-asia' },
          { name: '外卖', icon: 'fas fa-utensils' },
          { name: '分类', icon: 'fas fa-th-large' },
          { name: '医药', icon: 'fas fa-heartbeat' },
          { name: '领券', icon: 'fas fa-ticket-alt' }
        ],
        products: [
          { title: '2023新款夏季男士短袖T恤纯棉透气百搭休闲上衣', price: 69.9, oldPrice: 129.0, sales: 5230 },
          { title: '无线蓝牙耳机入耳式降噪运动跑步音乐游戏耳机', price: 129.0, oldPrice: 299.0, sales: 12456 },
          { title: '夏季新款女装连衣裙时尚气质显瘦碎花雪纺裙子', price: 159.0, oldPrice: 299.0, sales: 8230 },
          { title: '家用智能扫地机器人全自动洗拖地吸尘三合一', price: 1299.0, oldPrice: 2599.0, sales: 3210 },
          { title: '休闲运动鞋男夏季透气网面跑步鞋轻便减震旅游鞋', price: 199.0, oldPrice: 399.0, sales: 7560 },
          { title: '全自动雨伞折叠防晒防紫外线晴雨两用太阳伞', price: 49.9, oldPrice: 99.0, sales: 23145 },
          { title: '真无线蓝牙耳机双耳运动跑步音乐游戏降噪耳机', price: 199.0, oldPrice: 399.0, sales: 15600 },
          { title: '夏季男士休闲短裤宽松五分裤运动沙滩裤速干裤', price: 79.9, oldPrice: 159.0, sales: 8760 }
        ],
        hotProducts: [
          { title: '苹果iPhone14手机全网通5G智能手机', price: 5399.0, oldPrice: 5999.0, sales: 23000 },
          { title: '华为Mate50 Pro旗舰手机5G全网通', price: 6499.0, oldPrice: 6999.0, sales: 18900 },
          { title: '小米13 Ultra徕卡专业影像旗舰手机', price: 5999.0, oldPrice: 6499.0, sales: 15600 },
          { title: '索尼PS5游戏主机光驱版家用电视游戏机', price: 3899.0, oldPrice: 4299.0, sales: 9800 }
        ]
      };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
      },
      beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
      },
      methods: {
        handleScroll() {
          // 吸顶效果判断
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          this.isSticky = scrollTop > 100;
          
          // 显示回到顶部按钮
          this.showBackToTop = scrollTop > 500;
        },
        scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
  };
  </script>
  
  <style>
.container {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      min-height: 200vh;
      position: relative;
    }
    
    /* 顶部状态栏 */
    .status-bar {
      height: 25px;
      background: #ff5000;
    }
    
    /* 顶部导航 */
    .top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background: linear-gradient(to right, #ff5000, #ff2b00);
      color: white;
      position: relative;
      z-index: 100;
    }
    
    .logo {
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    
    .logo i {
      margin-right: 5px;
    }
    
    .nav-icons {
      display: flex;
      gap: 15px;
      font-size: 18px;
    }
    
    /* 搜索区域 - 初始位置 */
    .search-area {
      padding: 10px 15px;
      background: linear-gradient(to right, #ff5000, #ff2b00);
      transition: all 0.3s ease;
      position: relative;
      z-index: 90;
    }
    
    .search-box {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 20px;
      padding: 8px 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .search-box input {
      flex: 1;
      border: none;
      outline: none;
      padding: 5px 10px;
      font-size: 14px;
    }
    
    .search-icon {
      color: #ff5000;
      font-size: 18px;
      cursor: pointer;
    }
    
    /* 分类区域 */
    .categories {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 15px;
      padding: 15px;
      background: white;
    }
    
    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .category-icon {
      width: 45px;
      height: 45px;
      background: linear-gradient(to bottom, #ffefef, #ffd6d6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
    }
    
    .category-icon i {
      color: #ff5000;
      font-size: 20px;
    }
    
    .category-name {
      font-size: 12px;
      color: #666;
    }
    
    /* 吸顶状态下的搜索框 */
    .search-area.sticky {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      padding: 8px 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 200;
      animation: slideDown 0.3s ease;
    }
    
    .search-area.sticky .search-box {
      background: #f8f8f8;
      border: 1px solid #eee;
    }
    
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    /* 商品列表 */
    .products {
      padding: 15px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0 15px;
      position: relative;
      padding-left: 10px;
    }
    
    .section-title::before {
      content: '';
      position: absolute;
      left: 0;
      top: 5px;
      bottom: 5px;
      width: 4px;
      background: #ff5000;
      border-radius: 2px;
    }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .product-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0,0,0,0.08);
      transition: transform 0.3s ease;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
    }
    
    .product-image {
      height: 160px;
      background: linear-gradient(45deg, #ffd8cb, #ffebeb);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .product-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #ff5000;
      color: white;
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 10px;
    }
    
    .product-image img {
      max-width: 80%;
      max-height: 80%;
    }
    
    .product-info {
      padding: 12px;
    }
    
    .product-title {
      font-size: 14px;
      height: 40px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    
    .product-price {
      color: #ff5000;
      font-weight: bold;
      font-size: 18px;
    }
    
    .product-price span {
      font-size: 12px;
      color: #999;
      text-decoration: line-through;
      margin-left: 5px;
    }
    
    .product-sales {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
    
    /* 底部占位 */
    .placeholder {
      height: 60px;
    }
    
    /* 回到顶部按钮 */
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: #ff5000;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(255, 80, 0, 0.3);
      transition: all 0.3s ease;
      z-index: 100;
    }
    
    .back-to-top:hover {
      background: #ff2b00;
      transform: translateY(-3px);
    }
  </style>