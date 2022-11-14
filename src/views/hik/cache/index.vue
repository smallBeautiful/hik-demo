<template>
  <div class="app-container">cache</div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('cache/getData').then(() => {
        console.log(11111)
      })
    }
  }
}
</script>

<style scoped>

</style>
