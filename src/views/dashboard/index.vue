<template>
  <div>
    <list-with-pagination :data="listData" />
  </div>
</template>

<script>
import ListWithPagination from '@/components/pageChart/ListWithPagination.vue'
export default {
  components: {
    ListWithPagination
  },
  data() {
    return {
      listData: [
        { name: '主样本' },
        { name: '国际业务' },
        { name: '主样本2' },
        { name: '国际业务2' },
        { name: '主样本3' },
        { name: '国际业务3' },
        { name: '主样本4' },
        { name: '国际业务4' },
        // ... 更多数据
      ]
    }
  }
}
</script>