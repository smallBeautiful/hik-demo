<template>
  <div class="container" style="width: 100%;height: 100%">
    <div class="container-bg" :style="{ height: height + 'px' }" />
    <div class="content">
      <div class="title">title</div>
      <div class="title">title</div>
      <div ref="search" class="search">
        <el-input v-model="searchValue" placeholder="请输入内容1" />
        <el-button @click="add">add</el-button>
        <div v-for="(item, index) in list" :key="index">{{ item }}</div>
      </div>
      <div
        class="left-box"
        :style="leftBoxStyle"
      >
        11111
      </div>
      <div class="flex-l-r">
        <div style="width: 300px;overflow: hidden;flex-direction: column;">
          <div v-for="item in 100" :key="item">{{ item }}</div>
        </div>
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
      height: 0,
      leftBoxStyle: {
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '300px',
        height: '200px',
        backgroundColor: '#000',
        zIndex: 10
      }
    }
  },
  mounted() {
    this.handleWatch()
    window.addEventListener('scroll', this.updateLeftBox)
    window.addEventListener('resize', this.updateLeftBox)
    this.updateLeftBox()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updateLeftBox)
    window.removeEventListener('resize', this.updateLeftBox)
  },
  methods: {
    add() {
      this.list.push(111)
      this.$nextTick(this.updateLeftBox)
    },
    handleWatch() {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const height = entry.contentRect.height
          this.height = height + 20
          this.updateLeftBox()
        }
      })
      const refElement = this.$refs.search
      observer.observe(refElement)
    },
    updateLeftBox() {
      this.$nextTick(() => {
        const search = this.$refs.search
        if (!search) return

        const searchRect = search.getBoundingClientRect()
        const left = searchRect.left
        const top = searchRect.bottom
        const width = 300 // 固定宽度
        const height = window.innerHeight - top - 16

        this.leftBoxStyle = {
          position: 'fixed',
          left: left + 'px',
          top: top + 'px',
          width: width + 'px',
          height: height > 0 ? height + 'px' : '0px',
          backgroundColor: '#000',
          zIndex: 10
        }
      })
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
  position: relative;
  width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  .title {
    text-align: center;
    font-size: 24px;
    height: 50px;
    line-height: 50px;
  }
  .search {
    height: auto;
    position: sticky;
    top: 20px;
    z-index: 2;
  }
}
.flex-l-r {
  display: flex;
  justify-content: space-between;
}
.left-box {
  /* 样式由JS动态控制 */
}
</style>
