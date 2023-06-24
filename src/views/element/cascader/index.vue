<!-- el-cascader-loading -->
<template>
  <el-cascader
    v-model="selectedOptions"
    :options="[]"
    :props="props"
    :loading="isLoading"
    @change="handleCascaderChange"
  >
    <template slot="empty">
      hello
    </template>
  </el-cascader>
</template>

<script>
export default {
  data() {
    return {
      props: { multiple: true },
      selectedOptions: '',
      isLoading: true, // 加载状态标识
      options: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏',
          children: [
            { value: 8, label: '南京' },
            { value: 9, label: '苏州' },
            { value: 10, label: '无锡' }
          ]
        }, {
          value: 12,
          label: '浙江',
          children: [
            { value: 13, label: '杭州' },
            { value: 14, label: '宁波' },
            { value: 15, label: '嘉兴' }
          ]
        }]
      }, {
        value: 17,
        label: '西北',
        children: [{
          value: 18,
          label: '陕西',
          children: [
            { value: 19, label: '西安' },
            { value: 20, label: '延安' }
          ]
        }, {
          value: 21,
          label: '新疆维吾尔族自治区',
          children: [
            { value: 22, label: '乌鲁木齐' },
            { value: 23, label: '克拉玛依' }
          ]
        }]
      }]
    }
  },
  methods: {
    handleCascaderChange(value) {
      this.isLoading = true // 设置加载状态为true
      console.log(11111)
      // 模拟异步加载
      setTimeout(() => {
        // 异步加载完成后，设置加载状态为false，并更新选项
        this.isLoading = false
        // 更新选项，根据实际情况添加新的选项
        this.options[0].children.push({ value: 'option1-3', label: 'Option 1-3' })
      }, 2000)
    }
  }
}
</script>
