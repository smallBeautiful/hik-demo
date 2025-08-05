<template>
  <div class="app-container">
    <div id="interval" style="width: 500px; height: 400px" />
  </div>
</template>

<script>
import G2 from '@antv/g2'
export default {
  name: 'Index',
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const data = [
        { company: 'Apple', type: '整体', value: '30', lineValue: 45 },
        { company: 'Facebook', type: '整体', value: '35', lineValue: 52 },
        { company: 'Google', type: '整体', value: '28', lineValue: 38 },

        { company: 'Apple', type: '非技术岗', value: '40', lineValue: 55 },
        { company: 'Facebook', type: '非技术岗', value: '65', lineValue: 72 },
        { company: 'Google', type: '非技术岗', value: '47', lineValue: 58 },

        { company: 'Apple', type: '技术岗', value: '23', lineValue: 35 },
        { company: 'Facebook', type: '技术岗', value: '18', lineValue: 28 },
        { company: 'Google', type: '技术岗', value: '20', lineValue: 32 },

        { company: 'Apple', type: '技术岗', value: '35', lineValue: 48 },
        { company: 'Facebook', type: '技术岗', value: '30', lineValue: 42 },
        { company: 'Google', type: '技术岗', value: '25', lineValue: 38 }
      ]

      const chart = new G2.Chart({
        container: 'interval',
        forceFit: true,
        height: 500,
        padding: 'auto'
      })
      chart.source(data)
      chart.scale('value', {
        alias: '占比（%）',
        max: 75,
        min: 0,
        tickCount: 4
      })
      chart.scale('lineValue', {
        alias: '折线值（%）',
        max: 75,
        min: 0,
        tickCount: 4
      })
      chart.axis('type', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        }
      })

      chart.axis('value', {
        label: {
          textStyle: {
            fill: '#666'
          }
        },
        title: {
          offset: 50
        }
      })
      
      // 添加右侧坐标轴
      chart.axis('lineValue', {
        position: 'right',
        label: {
          textStyle: {
            fill: '#666'
          }
        },
        title: {
          offset: 50
        }
      })
      
      chart.legend({
        position: 'top-center'
      })
      
      // 绘制柱状图
      chart.interval().position('type*value').color('company')
        .opacity(1)
        .adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }])
      
      // 绘制折线图
      chart.line().position('type*lineValue').color('company')
        .shape('smooth')
        .size(2)
        .style({
          strokeOpacity: 0.8
        })
      
      // 添加折线图的点
      chart.point().position('type*lineValue').color('company')
        .shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      
      chart.render()
    }
  }
}
</script>

<style scoped>

</style>
<!--http://antv.antfin.com/zh-cn/f2/3.x/demo/bar/adjust-range.html-->
