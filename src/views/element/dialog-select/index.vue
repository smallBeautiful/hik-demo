<template>
  <div class="app-container">
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <el-select v-model="value" placeholder="请选择" :popper-append-to-body="false" popper-class="dialog-popover">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '黄金糕' },
        { value: '选项3', label: '黄金糕' },
        { value: '选项4', label: '黄金糕' },
        { value: '选项5', label: '黄金糕' },
        { value: '选项6', label: '黄金糕' },
        { value: '选项7', label: '黄金糕' },
        { value: '选项8', label: '黄金糕' },
        { value: '选项9', label: '黄金糕' },
        { value: '选项10', label: '黄金糕' },
        { value: '选项11', label: '黄金糕' }
      ],
      value: ''
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss">
.el-dialog__body {
  max-height: 300px;
  overflow-y: auto;
}
.dialog-popover {
  position: absolute!important;
  /* 不同尺寸top不同 */
  top: 40px!important;
  left: 0!important;
  .el-scrollbar {
    height: 100px;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
