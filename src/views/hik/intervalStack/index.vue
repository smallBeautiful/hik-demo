<template>
  <div class="app-container">
    <div id="intervalStack" />
  </div>
</template>

<script>
import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'
export default {
  name: 'Index',
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const data = [
        { country: 'Europe', year: '1750', value: 163 },
        { country: 'Europe', year: '1800', value: 203 },
        { country: 'Europe', year: '1850', value: 276 },
        { country: 'Europe', year: '1900', value: 408 },
        { country: 'Europe', year: '1950', value: 547 },
        { country: 'Europe', year: '1999', value: 729 },
        { country: 'Europe', year: '2050', value: 628 },
        { country: 'Europe', year: '2100', value: 828 },
        { country: 'Asia', year: '1750', value: 902 },
        { country: 'Asia', year: '1800', value: 6935 },
        { country: 'Asia', year: '1850', value: 809 },
        { country: 'Asia', year: '1900', value: 947 },
        { country: 'Asia', year: '1950', value: 1402 },
        { country: 'Asia', year: '1999', value: 3634 },
        { country: 'Asia', year: '2050', value: 5268 },
        { country: 'Asia', year: '2100', value: 7268 },
        { country: 'Qin', year: '1750', value: 502 },
        { country: 'Qin', year: '1800', value: 635 },
        { country: 'Qin', year: '1850', value: 809 },
        { country: 'Qin', year: '1900', value: 947 },
        { country: 'Qin', year: '1950', value: 1602 },
        { country: 'Qin', year: '1999', value: 3934 },
        { country: 'Qin', year: '2050', value: 5268 },
        { country: 'Qin', year: '2100', value: 7968 }
      ]
      // 计算每个柱子的占比
      const ds = new DataSet()
      const dv = ds.createView()
        .source(data)
        .transform({
          type: 'percent',
          field: 'value', // 统计销量
          dimension: 'country', // 每年的占比
          groupBy: ['year'], // 以不同产品类别为分组
          as: 'percent'
        })

      const chart = new G2.Chart({
        container: 'intervalStack',
        forceFit: true,
        height: 500
      })
      chart.source(dv, {
        percent: {
          min: 0,
          formatter(val) {
            return (val * 100).toFixed(2) + '%'
          }
        }
      })
      chart.intervalStack()
        .position('year*percent')
        .color('country')
      chart.render()
    }
  }
}
</script>

<style scoped>

</style>
