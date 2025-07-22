<template>
  <div class="container" style="width: 100%; height: 100%; padding: 24px; box-sizing: border-box;">
    <el-table
      :data="tableData"
      height="400"
      border
      v-loading="loading"
      style="width: 100%;"
      ref="infiniteTable"
      @scroll.native="handleScroll"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="作者" width="120" />
    </el-table>
    <div v-if="noMore" style="text-align:center;color:#999;margin-top:8px;">没有更多了</div>
  </div>
</template>

<script>
// 模拟数据
function mockData(start, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i + 1,
    title: `标题 ${start + i + 1}`,
    author: `作者${((start + i) % 10) + 1}`
  }))
}

export default {
  name: 'SearchScroll',
  data() {
    return {
      tableData: [],
      loading: false,
      page: 0,
      pageSize: 20,
      noMore: false
    }
  },
  mounted() {
    this.loadMore()
    // 兼容el-table外层div滚动
    this.$nextTick(() => {
      const tableBody = this.$el.querySelector('.el-table__body-wrapper')
      if (tableBody) {
        tableBody.addEventListener('scroll', this.handleScroll)
      }
    })
  },
  beforeDestroy() {
    const tableBody = this.$el.querySelector('.el-table__body-wrapper')
    if (tableBody) {
      tableBody.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll(e) {
      const target = e && e.target ? e.target : e
      if (!target) return
      // 距离底部小于30px时加载
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 30) {
        this.loadMore()
      }
    },
    loadMore() {
      if (this.loading || this.noMore) return
      this.loading = true
      setTimeout(() => {
        const newData = mockData(this.page * this.pageSize, this.pageSize)
        if (newData.length < this.pageSize) {
          this.noMore = true
        }
        // 假设最多加载5页
        if (this.page >= 4) {
          this.noMore = true
        }
        this.tableData = this.tableData.concat(newData)
        this.page++
        this.loading = false
      }, 800)
    }
  }
}
</script>

<style lang="scss">
.container {
  background: #fff;
}
</style>
  