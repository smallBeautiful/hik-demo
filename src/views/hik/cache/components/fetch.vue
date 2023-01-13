<template>
  <div class="fetch">
    {{ list }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Fetch',
  computed: {
    ...mapState('cache', ['list'])
  },
  mounted() {
    this.$store.dispatch('cache/getData')
    this.$store.dispatch('cache/getData')
    this.$store.dispatch('cache/getData')
    this.$store.dispatch('cache/getData')
    this.$store.dispatch('cache/getData')
    this.$store.dispatch('cache/getData')
  }
}
</script>

<style scoped lang="scss">
.fetch {
  background: cyan;
}
</style>
