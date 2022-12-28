<template>
  <div class="app-container">
    close
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    close() {
      if (navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
        window.location.href = 'about:blank'
        window.close()
      } else {
        window.opener = null
        window.open('', '_self')
        window.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
