<template>
  <div class="container">
    <!--
    使用DataSet控制图表视图显示的区域，
    自定义一个滚动条组件，给用户滚动，滚动时更新DataSet的State，
    从而更新视图范围。
    -->
    <p>data长度:{{ data.length }}</p>
    <div class="chart">
      <div class="chart-demo-wrap">
        <div id="chartDemo" />
        <div class="scrollBarWrap">
          <ScrollBar
            ref="scrollBar"
            @updatePosRate="throttleUpdateDs"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import ScrollBar from './scroll-bar.vue'
import throttle from './throttle'
import { lists } from './data'

// 以10条作为基准
const BASE_LEN = 10

export default {
  components: {
    ScrollBar
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    // 不需要与视图交互的变量都定义在created这里
    this.scrollProportion = 0
    this.chart = null
    this.chartView = null
    this.ds = null
    this.init()
  },
  methods: {
    renderChart() {
      const isFirstRender = !this.chartView
      if (isFirstRender) {
        this.initChart()
      } else {
        this.updateChart()
      }
    },
    init() {
      this.data = lists
      this.$nextTick(() => {
        this.renderChart()
      })
    },
    initChart() {
      let baseRate = 1
      const data = this.data
      if (data.length > BASE_LEN) {
        baseRate = BASE_LEN / data.length
      }
      this.scrollProportion = baseRate
      this.$refs.scrollBar.initScroll(baseRate)
      this.ds = new DataSet({
        state: {
          start: 0,
          end: baseRate
        }
      })
      console.log(data)
      const dv = this.ds.createView('origin').source(data)
      dv.transform({
        type: 'filter',
        callback: (obj, index, arr) => {
          return (index + 1) / arr.length >= this.ds.state.start && (index + 1) / arr.length <= this.ds.state.end
        }
      })
      this.chart = new G2.Chart({
        container: 'chartDemo',
        forceFit: true,
        height: 270,
        animate: false,
        padding: [20, 30, 30, 40]
      })
      this.chart.legend(false)
      this.chartView = this.chart.view()
      const scales = {
        // praise: {
        //   alias: '好评率',
        //   tickInterval: 20,
        //   min: 0,
        //   max: 100,
        //   minLimit: 0,
        //   maxLimit: 100,
        //   formatter: function formatter (val) {
        //     console.log(val)
        //     return val + '%'
        //   }
        // }
      }
      this.chartView.source(dv, scales)
      this.chartView.interval().position('月份*月均降雨量').color('name').size(40)
      // .interval()
      // .size(40)
      // // .position('name*praise')
      // .position('月份*月均降雨量')
      // // .color('praise', '#00c55d-#4edc66')
      // // .color('name', '#00c55d-#4edc66')
        .adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }])
      this.chart.render()
    },
    updateChart() {
      let baseRate = 1
      const data = this.data
      if (data.length > BASE_LEN) {
        baseRate = BASE_LEN / data.length
      }
      this.scrollProportion = baseRate

      this.ds.getView('origin').source(data)

      let currentPos = this.ds.state.start

      // 处理边界情况
      if (currentPos + this.scrollProportion > 1) {
        currentPos = 1 - this.scrollProportion
      }
      let endPos = Math.min(1, currentPos + this.scrollProportion)
      // 处理精度误差问题
      if (1 - endPos < 1 / data.length) {
        endPos = 1
      }
      this.ds.setState('start', currentPos)
      this.ds.setState('end', endPos)

      this.$refs.scrollBar.initScroll(baseRate)
      this.chartView
        .guide()
        .clear()
      // 让guide可以刷新，同时让tooltip刷新
      this.chart.repaint()
      this.$refs.scrollBar.initScroll(this.scrollProportion, this.ds.state.start)
    },
    // 滚动条刷新
    throttleUpdateDs: throttle(function updateDs(rate) {
      this.ds.setState('start', rate)
      let endPos = rate + this.scrollProportion
      // 处理精度误差问题
      if (1 - endPos < 1 / this.data.length) {
        endPos = 1
      }
      this.ds.setState('end', endPos)
    }, 50)
  }
}
</script>

<style lang="scss" scoped>
.chart-demo-wrap {
  position: relative;
  width: 600px;
  margin: 0 auto;
}
.scrollBarWrap {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
}
</style>
