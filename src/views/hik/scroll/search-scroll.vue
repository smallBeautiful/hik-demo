<template>
  <div class="container" style="width: 100%;height: 100%">
    <div class="container-bg" :style="{ height: height + 'px' }" />
    <div class="content">
      <div class="title">title</div>
      <div class="title">title</div>
      <div ref="search" class="search">
        <el-input v-model="searchValue" placeholder="请输入内容" />
        <el-button @click="add">add</el-button>
        <div v-for="(item, index) in list" :key="index">{{ item }}</div>
      </div>
      <div>
        <div v-for="item in 100" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchScroll',
  data() {
    return {
      searchValue: '',
      list: [1],
      height: 0
    }
  },
  mounted() {
    this.handleWatch()
  },
  methods: {
    add() {
      this.list.push(111)
    },
    handleWatch() {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const height = entry.contentRect.height
          console.log('新高度:', height)
          this.height = height + 20
        }
      })
      const refElement = this.$refs.search
      observer.observe(refElement)
    }
  }
}
</script>
<style lang="scss">
.title {
  position: relative;
  z-index: 2;
}
.container-bg {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    background-image: url("./bg.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.container {
  position: relative;
  width:  100%;
  height:  100%;
  background-image: url("./bg.png");
  background-repeat: repeat;
  background-size: cover;
  background-attachment: fixed;
}
.content {
    width: 1200px;
    margin: 0 auto;
    .title {
      text-align: center;
      font-size: 24px;
      height: 50px;
      line-height: 50px;
    }
    .search {
        height: auto;
        //padding-top: 20px;
    }
    .search {
        position: sticky;
        top: 20px;
        z-index: 2;
    }
}
</style>
