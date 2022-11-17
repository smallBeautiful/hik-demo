<template>
  <div class="app-container">
    <comp :charts="charts[0]" />
  </div>
</template>

<script>
import comp from '@/views/hik/fold/comp'
import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'
export default {
  name: 'Index',
  components: {
    comp
  },
  data() {
    return {
      charts: [
        {
          id: 'charts-1',
          list: [
            { State: '主样本', '男性': 11, '女性': 69, '其他': 10, 'hello': 10 },
            { State: '样本1', '男性': 22, '女性': 50, '其他': 8, 'hello': 20 },
            { State: '样本2', '男性': 1, '女性': 79, '其他': 0, 'hello': 20 },
            { State: '样本3', '男性': 50, '女性': 30, '其他': 0, 'hello': 20 },
            { State: '样本4', '男性': 70, '女性': 5, '其他': 5, 'hello': 20 }
          ].reverse(),
          fields: ['男性', '女性', '其他', 'hello'],
          resList: [],
          key: '性别',
          value: '比例',
          name: 'State',
          legendList: [
            { name: '男性', background: 'orange' },
            { name: '女性', background: 'blue' },
            { name: '其他', background: 'cyan' },
            { name: 'hello', background: '#666666' }
          ]
        }
      ]
    }
  },
  mounted() {},
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
