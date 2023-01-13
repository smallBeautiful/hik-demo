<template>
  <div class="app-container">
    <fetch />
    {{ list }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fetch from '@/views/hik/cache/components/fetch'
export default {
  name: 'Index',
  components: {
    fetch
  },
  computed: {
    ...mapState('cache', ['list'])
  },
  mounted() {
    this.$store.dispatch('cache/getData')
  },
  methods: {}
}
</script>

<style scoped>

</style>
