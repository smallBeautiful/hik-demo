<template>
  <div>
    <el-drawer
      :modal="false"
      :custom-class="init ? 'drawer-c' : ''"
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      @open="open"
      @close="close"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  data() {
    return {
      init: true,
      drawer: false
    }
  },
  methods: {
    open() {
      this.drawer = true
    },
    close() {
      setTimeout(() => {
        if (this.init) {
          this.init = false
        }
      }, 1000)
    }
  }
}
</script>

<style>
.drawer-c {
  opacity: 0;
}
</style>
