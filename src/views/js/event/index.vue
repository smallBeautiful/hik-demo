<template>
  <div class="app-container">
    <div class="eventBind">
      eventBind
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    this.$nextTick(() => {
      const el = document.getElementsByClassName('eventBind')[0]
      console.log(el)
      el.addEventListener('click', () => {
        console.log(111111)
      })
      console.log(Object.keys(el))
    })
  },
  methods: {}
}
</script>

<style scoped>

</style>
