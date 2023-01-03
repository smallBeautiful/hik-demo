<template>
  <div class="app-container">
    <el-button @click="close">
      close
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    close() {
      window.location.href = 'about:blank'
      window.close()
      // window.open('', '_self').close()
      // if (navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
      //   window.location.href = 'about:blank'
      //   window.close()
      // } else {
      //   window.opener = null
      //   window.open('', '_self')
      //   window.close()
      // }
    }
  }
}
</script>

<style scoped>

</style>
