<template>
  <div>
    <select-custom v-model="value" size="mini" multiple>
      <m-option
        v-for="item in options"
        :key="item.value"
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
        { value: '选项1', label: '高' },
        { value: '选项2', label: '中' },
        { value: '选项3', label: '低' }
      ],
      value: '选项4'
    }
  }
}
</script>

<style scoped>

</style>
