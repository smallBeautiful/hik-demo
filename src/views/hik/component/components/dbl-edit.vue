<template>
  <div class="__jj6454jssdD__word_edit">
    <div
      v-if="show"
      class="cursor"
      @dblclick="dbClick"
    >{{ input }}</div>
    <el-input
      v-else
      ref="input"
      v-model="input"
      class="input"
      @blur="blur"
    />
  </div>
</template>

<script>
export default {
  name: 'DblEdit',
  props: ['value', 'id'],
  data() {
    return {
      input: '',
      inputCopy: '',
      show: true
    }
  },
  mounted() {
    this.input = this.value
  },
  methods: {
    dbClick() {
      this.inputCopy = this.input
      this.show = false
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    blur() {
      if (this.input.trim() === this.inputCopy) {
        this.input = this.input.trim()
        this.$emit('update:value', this.input)
        this.show = true
        return
      }
      if (this.input.trim() === '') {
        this.input = this.inputCopy
      } else {
        this.inputCopy = this.input
      }
      this.show = true
      this.$emit('update:value', this.input)
      this.$emit('change', {
        value: this.input,
        id: this.id
      })
    }
  }
}
</script>

<style scoped lang="scss">
.__jj6454jssdD__word_edit {
  font-size: 14px;
  color: #000;
  ::v-deep .input {
    width: 200px;
    .el-input__inner {
      font-size: 14px;
      height: 30px;
      line-height: 30px!important;
      padding: 0;
      color: #000;
    }
  }
}
.cursor {
  cursor: pointer;
  user-select: none;
  height: 30px;
  line-height: 31px;
  width: 200px;
  border: 1px solid transparent;
  overflow: hidden;
}
</style>
