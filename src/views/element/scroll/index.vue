<template>
  <!--
    div 外层元素设置宽高
      el-scroll 设置高度100%
        div 内容设置高度100%
   -->
  <div class="app-container my-scrollbar-container">
    <div class="scroll-container" style="margin-top: 10px">
      <el-scrollbar wrap-class="my-scrollbar-wrapper">
        <div class="scroll-content">
          <div v-for="item in list" :key="item">
            {{ item }}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="handle">
      <el-button @click="handleAdd">Add</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElScroll111',
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14]
    }
  },
  methods: {
    handleAdd() {
      this.list.push(this.list[this.list.length - 1] + 1)
    }
  }
}
</script>

<style scoped lang="scss">
.scroll-container {
  background: orange;
  width: 80px;
  height: 200px;
  overflow: hidden;
  .scroll-content {
    height: 100%;
    background: orange;
  }
}
.handle {
  margin-top: 20px;
}
</style>
<style lang="scss">
.my-scrollbar-container {
  .my-scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }
  .el-scrollbar {
    height: 100%;
  }
}
</style>
