<template>
  <div class="app-container">
    <el-button type="text" @click="open">点击打开 Dialog</el-button>
    <tooltip />
    <tooltip />
  </div>
</template>

<script>
import { Bus } from '@/utils/bus'
import tooltip from './components/tooltip'
export default {
  name: 'Index',
  components: {
    tooltip
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    open() {
      Bus.$emit('openDialog')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
