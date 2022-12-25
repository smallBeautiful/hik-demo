<template>
  <div class="app-container">
    <canvas id="canvas" width="215px" height="80px">
      您的浏览器不支持Canvas标签，请升级或更换浏览器
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    this.$nextTick(() => {
      const ctx = document.querySelector('#canvas').getContext('2d')
      ctx.beginPath()
      // ctx.quadraticCurveTo(200, );
    })
  }
}
</script>

<style scoped>

</style>
