<template>
  <div class="app-container">
    <div id="interval" />
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
        { time: '9:00-10:00', value: 30 },
        { time: '10:00-11:00', value: 70 },
        { time: '11:00-12:00', value: 50 },
        { time: '12:00-13:00', value: 30 },
        { time: '13:00-14:00', value: 70 }
      ]

      const chart = new G2.Chart({
        container: 'interval',
        forceFit: true,
        height: 500,
        padding: [20, 20, 50, 30]
      })
      const defs = {
        value: {
          min: 0, // 手动指定最小值
          max: 100 // 手动指定最大值
        }
      }
      chart.source(data, defs)
      chart.scale('value', {
        alias: '销售额(万)',
        min: 20,
        max: 100 // 指定最大刻度
      })

      chart.axis('time', {
        label: {
          textStyle: {
            fill: '#aaa'
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
            fill: '#aaa'
          }
        }
      })

      chart.interval().position('time*value')
        .opacity('time', val => {
          if (val === '13:00-14:00') {
            return 0.4
          }
          return 1
        })
        .style('time', {
          lineWidth: val => {
            if (val === '13:00-14:00') {
              return 1
            }
            return 0
          },
          stroke: '#636363',
          lineDash: [3, 2]
        })
      chart.render()
    }
  }
}
</script>

<style scoped>

</style>
