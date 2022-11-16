<template>
  <div class="app-container">
    <div id="container" />
    <div id="container2" />
  </div>
</template>

<script>
import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'
export default {
  name: 'Index',
  data() {
    return {}
  },
  mounted() {
    this.renderChart()
    this.renderChart2()
  },
  methods: {
    renderChart() {
      const data = [
        { State: 'WY', 小于5岁: 25635, '5至13岁': 1890, '14至17岁': 9314 },
        { State: 'DC', 小于5岁: 30352, '5至13岁': 20439, '14至17岁': 10225 },
        { State: 'VT', 小于5岁: 38253, '5至13岁': 42538, '14至17岁': 15757 },
        { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
        { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 }
      ]

      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'fold',
        fields: ['小于5岁', '5至13岁', '14至17岁'], // 展开字段集
        key: '年龄段', // key字段
        value: '人口数量', // value字段
        retains: ['State'] // 保留字段集，默认为除fields以外的所有字段
      })
      // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}
      const chart = new G2.Chart({
        container: 'container',
        forceFit: true,
        height: 500
      })
      chart.source(dv)
      chart.coord().transpose()
      chart.legend({
        position: 'top-right', // 设置图例的显示位置
        itemGap: 20 // 图例项之间的间距
      })
      chart.axis('State', {
        label: {
          offset: 12
        }
      })
      chart.intervalStack().position('State*人口数量').color('年龄段')
      chart.render()
    },
    renderChart2() {
      const data = [
        { State: '主样本', '男性': 11, '女性': 89, '其他': 0 },
        { State: '样本1', '男性': 22, '女性': 70, '其他': 8 },
        { State: '样本2', '男性': 1, '女性': 99, '其他': 0 },
        { State: '样本3', '男性': 50, '女性': 50, '其他': 0 },
        { State: '样本4', '男性': 90, '女性': 5, '其他': 5 }
      ].reverse()

      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'fold',
        fields: ['男性', '女性', '其他'], // 展开字段集
        key: '性别', // key字段
        value: '比例', // value字段
        retains: ['State'] // 保留字段集，默认为除fields以外的所有字段
      })
      // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}
      const chart = new G2.Chart({
        container: 'container2',
        forceFit: true,
        height: 500
      })
      console.log(dv)
      chart.source(dv)
      chart.coord().transpose()
      chart.legend({
        position: 'top-right', // 设置图例的显示位置
        itemGap: 20 // 图例项之间的间距
      })
      chart.axis('State', {
        label: { offset: 12 },
        tickLine: true,
        line: {
          strokeOpacity: 0.5,
          shadowOffsetX: 1
        }
      })
      chart.axis('比例', {
        label: {
          offset: 5,
          formatter: val => {
            return val + '%'
          }
        },
        grid: false
      })
      chart.scale({
        range: [0, 1]
      })
      const point = [20, 30]
      const colors = G2.Global.colors
      chart.intervalStack().position('State*比例').color('性别')
      chart.tooltip({
        containerTpl: '<div class="g2-tooltip">' +
          '<div class="g2-tooltip-title" style="margin:10px 0;font-weight: bold"></div>' +
          '<ul class="g2-tooltip-list"></ul></div>', // tooltip 容器模板
        itemTpl: `<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:${'0%'};display:inline-block;margin-right:8px;"></span>{name}: {value}</li>` // tooltip 每项记录的默认模板
      })
      chart.render()
    }
  }
}
</script>

<style scoped lang="less">
.table-container {
  position: relative;
  .table-d {
    position: absolute;
  }
}
</style>
