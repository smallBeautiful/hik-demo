<template>
  <div class="app-container">
    <el-link type="primary">1. 双击编辑组件</el-link>
    <span v-for="item in list" :key="item.id">
      <dbl-edit :id="item.id" :value.sync="item.name" @change="editHandle" />
    </span>
    <el-link type="primary">2. 骨架屏</el-link><br>
    <skeleton /><br>
    <el-link type="primary">3. less</el-link>
    <less/>
  </div>
</template>

<script>
import DblEdit from './components/dbl-edit'
import skeleton from './components/skeleton'
import Less from './components/less'
export default {
  name: 'WordEdit',
  components: {
    DblEdit,
    skeleton,
    Less
  },
  data() {
    return {
      list: [
        { id: '1', name: 'hello' },
        { id: '2', name: 'world' },
        { id: '3', name: 'octopus' }
      ]
    }
  },
  methods: {
    editHandle(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
