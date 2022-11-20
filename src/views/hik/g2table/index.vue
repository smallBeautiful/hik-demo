<template>
  <div class="app-container">
    <div id="container" />
    <div class="table-container">
      <el-table
        border
        class="table-d"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="a" label="" width="70" />
        <el-table-column prop="b" label="1951" />
        <el-table-column prop="c" label="1951" />
        <el-table-column prop="d" label="1951" />
        <el-table-column prop="e" label="1951" />
        <el-table-column prop="f" label="1951" />
        <el-table-column prop="g" label="1951" />
        <el-table-column prop="h" label="1951" />
        <el-table-column prop="i" label="1951" />
      </el-table>
    </div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [
        { a: '2016', b: '王小虎', b: '121', d: '122', e: '1221', f: '121', g: 'saass', h: 'ass', i: 'sasa' },
        { a: '2016', b: '王小虎', b: '121', d: '122', e: '1221', f: '121', g: 'saass', h: 'ass', i: 'sasa' },
        { a: '2016', b: '王小虎', b: '121', d: '122', e: '1221', f: '121', g: 'saass', h: 'ass', i: 'sasa' },
        { a: '2016', b: '王小虎', b: '121', d: '122', e: '1221', f: '121', g: 'saass', h: 'ass', i: 'sasa' },
        { a: '2016', b: '王小虎', b: '121', d: '122', e: '1221', f: '121', g: 'saass', h: 'ass', i: 'sasa' }
      ]
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const data = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
      ]
      const chart = new G2.Chart({
        container: 'container',
        forceFit: true,
        height: 500
      })
      chart.source(data)
      chart.scale('sales', {
        tickInterval: 20
      })
      chart.interval().position('year*sales')
      chart.axis('year', false)
      chart.render()
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  position: relative;
  .table-d {
    position: absolute;
  }
}
</style>
