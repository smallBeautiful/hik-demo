<template>
  <div ref="dialogRef">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeHandle">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Bus } from '@/utils/bus'

export default {
  name: 'Index',
  props: {
    text: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
  },
  mounted() {
    Bus.$on('openDialog', () => {
      console.log(1)
      this.open()
    })
    Bus.$on('openDialog2', () => {
      console.log(2)
      this.open()
    })
    Bus.$on('close', () => {
      this.close()
    })
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    closeHandle() {
      Bus.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.single-hidden {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 使用省略号代替溢出的文本 */
}
</style>
