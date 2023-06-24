<!-- el-cascader-loading -->
<template>
  <div>
    <el-cascader
      v-model="selectedOptions"
      placeholder="hello"
      popper-class="popper-loading"
      :options="options"
      :props="props"
      :loading="isLoading"
    />
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: { multiple: true },
      selectedOptions: '',
      isLoading: true, // 加载状态标识
      options: [],
      options2: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏',
          children: [
            { value: 8, label: '南京' },
            { value: 9, label: '苏州' },
            { value: 10, label: '无锡' }
          ]
        }, {
          value: 12,
          label: '浙江',
          children: [
            { value: 13, label: '杭州' },
            { value: 14, label: '宁波' },
            { value: 15, label: '嘉兴' }
          ]
        }]
      }, {
        value: 17,
        label: '西北',
        children: [{
          value: 18,
          label: '陕西',
          children: [
            { value: 19, label: '西安' },
            { value: 20, label: '延安' }
          ]
        }, {
          value: 21,
          label: '新疆维吾尔族自治区',
          children: [
            { value: 22, label: '乌鲁木齐' },
            { value: 23, label: '克拉玛依' }
          ]
        }]
      }]
    }
  },
  mounted() {
    setTimeout(() => {
      this.options = this.options2
    }, 3000)
  }
}
</script>
<style lang="scss">
.popper-loading {
  .el-cascader-menu__empty-text {
    &:before {
      content: '加载中...';
      color: #C0C4CC;
      position: absolute;
    }
    color: #fff;
  }
}
.loader {
  border: 4px solid #f3f3f3; /* 设置边框样式 */
  border-top: 4px solid #3498db; /* 设置顶部边框样式，即加载图标的颜色 */
  border-radius: 50%; /* 设置圆角，使边框为圆形 */
  width: 20px; /* 设置加载图标的宽度 */
  height: 20px; /* 设置加载图标的高度 */
  animation: spin 1s linear infinite; /* 添加旋转动画 */
}

@keyframes spin {
  0% { transform: rotate(0deg); } /* 设置初始角度为0度 */
  100% { transform: rotate(360deg); } /* 设置最终角度为360度，即一圈完整的旋转 */
}
</style>
