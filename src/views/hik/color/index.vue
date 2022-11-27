<template>
  <div class="app-container">
    <span v-if="colorRender">
      <span v-for="(item, index) in colorList" :key="index" class="item" :style="{backgroundColor:item}" @click="handleColor(index)" />
    </span>
    <color ref="color" @setColor="setColor" />
    <drag />
  </div>
</template>

<script>
import Drag from '../drag'
import color from '@/views/hik/color/color'
import { mapState } from 'vuex'
export default {
  name: 'Color',
  components: {
    color,
    Drag
  },
  data() {
    return {
      colorIndex: -1,
      colorRender: true,
      colorList: []
    }
  },
  computed: {
    ...mapState('hik', ['colorListOrign', 'colorListDisplay'])
  },
  mounted() {
    this.colorList = JSON.parse(JSON.stringify(this.colorListOrign))
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
