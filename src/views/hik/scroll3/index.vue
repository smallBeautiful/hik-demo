<template>
  <div class="container">
    <div class="flex-container">
      <!--      <div>-->
      <!--        <div v-for="(item, index) in list" :key="index" :style="{ height: itemHeight + 'px' }">-->
      <!--          {{ item.month }}-->
      <!--        </div>-->
      <!--      </div>-->
      <div id="container-line3" style="width: 500px" />
    </div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import Logo from '@/layout/components/Sidebar/Logo'

export default {
  components: {
  },
  data() {
    return {
      data: {},
      listName: ['Tokyo', 'London'],
      list: [
        { month: 'Jan', Tokyo: 7.0, London: 3.9 },
        { month: 'Feb', Tokyo: 6.9, London: 4.2 },
        { month: 'Mar', Tokyo: 9.5, London: 5.7 },
        { month: 'Apr', Tokyo: 14.5, London: 8.5 },
        { month: 'May', Tokyo: 18.4, London: 11.9 },
        { month: 'Jun', Tokyo: 21.5, London: 15.2 },
        { month: 'Jul', Tokyo: 25.2, London: 17.0 },
        { month: 'Aug', Tokyo: 26.5, London: 16.6 },
        { month: 'Sep', Tokyo: 23.3, London: 14.2 },
        { month: 'Oct', Tokyo: 18.3, London: 10.3 },
        { month: 'Nov', Tokyo: 13.9, London: 6.6 },
        { month: 'Dec', Tokyo: 9.6, London: 4.8 }
      ],
      itemHeight: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
      this.createTable()
    })
    this.len = this.list.length
  },
  methods: {
    createTable() {
      this.itemHeight = 500 / ((this.len - 1) || 1)
    },
    init() {
      const list = [
        { month: 'Jan', city: 'Tokyo', temperature: 7 },
        { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
        { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
        { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
        { month: 'May', city: 'Tokyo', temperature: 18.4 },
        { month: 'Jan', city: 'London', temperature: 3.9 },
        { month: 'Feb', city: 'London', temperature: 4.2 },
        { month: 'Mar', city: 'London', temperature: 5.7 },
        { month: 'Apr', city: 'London', temperature: 8.5 },
        { month: 'May', city: 'London', temperature: 8.5 },
        { month: 'Jan', city: 'hangzhou', temperature: 15.9 },
        { month: 'Feb', city: 'hangzhou', temperature: 6.9 },
        { month: 'Mar', city: 'hangzhou', temperature: 8.2 },
        { month: 'Apr', city: 'hangzhou', temperature: 6.7 },
        { month: 'May', city: 'hangzhou', temperature: 8.5 }
      ]
      const chart = new G2.Chart({
        container: 'container-line3',
        forceFit: true,
        height: 500
      })
      chart.source(list, {
        month: {
          range: [0, 1]
        }
      })
      chart.tooltip({
      })
      chart.tooltip(true, {
        containerTpl: '<div class="g2-tooltip">' +
          '<div class="g2-tooltip-title" style="margin:0"></div>' +
          '<ul class="g2-tooltip-list" style="display: none"></ul></div>',
        itemTpl: '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}: {value}</li>'
      })
      chart
        .line()
        .position('month*temperature*city')
        .color('city')
        .tooltip('month*temperature*city', (month, temperature, city) => {
          return { title: city }
        })
      // chart
      //   .line()
      //   .position('month*temperature2')
      //   .color('city')
      //   .tooltip('month*temperature2', () => {
      //     return { title: 'hello2' }
      //   })
      // chart
      //   .line()
      //   .position('month*temperature3')
      //   .color('city')
      //   .tooltip('month*temperature3', () => {
      //     return { title: 'hello3' }
      //   })
      // chart.point().position('month*temperature').color('city')
      chart.render()
    }
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
