<template>
  <div class="app-container">
    <span v-for="(item, index) in colorList" v-if="colorRender" :key="index" class="item" :style="{backgroundColor:item}" @click="handleColor(index)" />
    <color ref="color" @setColor="setColor" />
  </div>
</template>

<script>
import color from '@/views/hik/color/color'
export default {
  name: 'Color',
  components: {
    color
  },
  data() {
    return {
      colorList: ['#BEC5B5', '#B8C8B7', '#507883', '#5c5a46', '#4a6f5d'],
      colorIndex: -1,
      colorRender: true
    }
  },
  methods: {
    setColor(color) {
      this.colorList[this.colorIndex] = color
      this.colorRender = false
      this.$nextTick(() => {
        this.colorRender = true
      })
    },
    handleColor(index) {
      this.colorIndex = index
      this.$refs.color.openDialog()
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 20px;
  margin-bottom: 10px;
  line-height: 1.5;
  cursor: pointer;
}
</style>
