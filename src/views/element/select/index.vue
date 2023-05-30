<template>
  <div>
    <select-custom v-model="value" size="mini">
      <m-option
        v-for="item in options"
        :dis="'选项3'"
        :key="item.value"
        :icon="item.icon"
        :label="item.label"
        :value="item.value"
      />
    </select-custom>
  </div>
</template>

<script>
import selectCustom from '@/components/Select/select.vue'
import MOption from '@/components/Select/option.vue'
export default {
  name: 'SelectCustom',
  components: {
    selectCustom,
    MOption
  },
  data() {
    return {
      options: [
        { value: '选项1', label: '高', icon: 'el-icon-top' },
        { value: '选项2', label: '中', icon: 'el-icon-back' },
        { value: '选项3', label: '低', icon: 'el-icon-bottom' }
      ],
      value: '123'
    }
  }
}
</script>

<style scoped>

</style>
