<template>
  <el-dialog
    title="颜色"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div>
      <span v-for="item in colorList" :key="item" class="item" :style="{backgroundColor:item}" :class="{middle: active(item)}" @click="colorHandle(item)" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      colorList: ['#BEC5B5', '#B8C8B7', '#507883', '#5c5a46', '#4a6f5d'],
      curColor: ''
    }
  },
  methods: {
    active(color) {
      return color === this.curColor
    },
    openDialog() {
      this.dialogVisible = true
      this.curColor = ''
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    colorHandle(color) {
      this.curColor = color
    },
    confirm() {
      if (this.curColor) {
        this.$emit('setColor', this.curColor)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  border: 2px transparent;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 20px;
  margin-bottom: 10px;
  line-height: 1.5;
  cursor: pointer;
}
.middle { box-shadow: 0px 0px 2px 10px rgba(184, 132, 79, 0.3) }
</style>
