<template>
  <div class="app-container">
    <h2 :style="{fontSize: fontSize + 'px'}">v-bind绑定style</h2>
    <el-button @click="add">add</el-button>
    <el-button @click="sub">sub</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      fontSize: 20
    }
  },
  methods: {
    add() {
      this.fontSize++
    },
    sub() {
      this.fontSize--
    }
  }
}
</script>

<style scoped>

</style>
