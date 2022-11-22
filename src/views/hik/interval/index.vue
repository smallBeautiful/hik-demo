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
    this.renderChart2()
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
    },
    renderChart2() {
      const data = [
        { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
        { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
        { name: 'London', 月份: 'May', 月均降雨量: 47 },
        { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
        { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
        { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug1.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug2.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug3.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug4.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug5.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug15.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug25.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug35.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug45.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug55.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug65.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug115.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug225.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug335.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug445.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug555.', 月均降雨量: 35.6 },
        { name: 'London', 月份: 'Aug665.', 月均降雨量: 35.6 },

        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
        { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
        { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
        { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
        { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
        { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug1.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug2.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug3.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug4.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug5.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug15.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug25.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug35.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug45.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug55.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug65.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug115.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug225.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug335.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug445.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug555.', 月均降雨量: 42.4 },
        { name: 'Berlin', 月份: 'Aug665.', 月均降雨量: 42.4 }
      ]

      const chart = new G2.Chart({
        container: 'interval',
        forceFit: true,
        height: 500
      })
      chart.source(data)
      chart.interval().position('月份*name').color('月均降雨量').size(40)
        .adjust([{
          type: 'dodge',
          marginRatio: 0.5
        }])
      chart.render()
    }
  }
}
</script>

<style scoped>

</style>
<!--http://antv.antfin.com/zh-cn/f2/3.x/demo/bar/adjust-range.html-->
