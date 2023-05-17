<template>
  <div>
    <div>winname</div>
    <el-button @click="open">open</el-button>
    <el-button @click="close">close</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      winname: ''
    }
  },
  mounted() {
    window.onbeforeunload = () => {
      this.winname && this.winname.close()
    }
  },
  methods: {
    open() {
      this.winname = window.open('http://localhost:9528/#/hik/winname2')
    },
    close() {
      this.winname && this.winname.close()
    }
  }
}
</script>

<style scoped>

</style>
