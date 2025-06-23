<template>
  <div style="padding: 20px">
    <selectAll
      v-model="selectedValues"
      :options="options"
      placeholder="请选择"
      multiple
      allow-create
      @change="handleChange"
      @add-new="handleAddNew"
      @remove-new="handleRemoveNew"
    />
  </div>
</template>

<script>
import selectAll from './select-all'
export default {
  data() {
    return {
      selectedValues: [],
      options: [
        { value: 'apple', label: '苹果' },
        { value: 'banana', label: '香蕉' }
      ]
    }
  },
  components: {
    selectAll
  },
  computed: {
  },
  methods: {
    handleChange(values) {
      console.log('选中值变化:', values)
    },
    handleAddNew(value) {
      console.log('添加新选项:', value)
    },
    handleRemoveNew(value) {
      console.log('移除新选项:', value)
    }
  }
}
</script>
