<template>
  <div>
    <div>winname2</div>
    <el-button @click="reload">reload</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    reload() {
      window.opener && window.opener.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
