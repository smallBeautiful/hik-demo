<template>
  <div class="app-container">防抖</div>
</template>

<script>
import resize from '@/mixin/resize'
export default {
  name: 'Index',
  mixins: [resize],
  methods: {
    handleResize() {
      console.log('handleResize')
    }
  }
}
</script>

<style scoped>

</style>
