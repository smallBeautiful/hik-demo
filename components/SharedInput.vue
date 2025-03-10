<template>
    <el-input
      :value="inputValue"
      @input="handleInput"
      :placeholder="placeholder"
      :size="size"
      :disabled="disabled"
    ></el-input>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'SharedInput',
    props: {
      // 输入框的唯一标识
      name: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      size: {
        type: String,
        default: 'medium'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters('sharedInputs', ['getInputValue']),
      inputValue() {
        return this.getInputValue(this.name)
      }
    },
    methods: {
      handleInput(value) {
        this.$store.commit('sharedInputs/UPDATE_INPUT_VALUE', {
          key: this.name,
          value
        })
      }
    }
  }
  </script>