<template>
  <FilterPanel :groups="filterGroups" @update:selected="onSelected" />
</template>

<script>
import FilterPanel from '@/components/FilterPanel.vue';

export default {
  components: { FilterPanel },
  data() {
    return {
      filterGroups: [
        {
          key: 'fileType',
          title: '文件类型',
          multiSelect: true,
          options: [
            { label: '承诺函', value: 'commitment', count: 12 },
            { label: '澄清函&说明函', value: 'clarification', count: 12 },
            // ...
          ]
        },
        {
          key: 'tags',
          title: '标签',
          multiSelect: true,
          options: [
            { label: '出口管制条例（EAR）', value: 'ear', count: 12 },
            // ...
          ]
        },
        // ...
      ]
    };
  },
  methods: {
    onSelected(selected) {
      console.log('选中的筛选项：', selected);
    }
  }
};
</script>