<template>
  <el-popover
    size="medium"
    placement="bottom"
    width="300"
    :disabled="textWidth < width"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <div class="single-hidden" slot="reference">
      {{ text }}
    </div>
  </el-popover>
</template>

<script>
import { measureTextWidth } from '@/utils/dom'
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
    }
  },
  computed: {
    textWidth() {
      return measureTextWidth(this.text) + 0.5
    }
  },
  methods: {
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
