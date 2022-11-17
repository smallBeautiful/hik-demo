<template>
  <div class="chart">
    <div class="legend">
      <span v-for="(item, index) in legendList" :key="index" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)"><i :style="{backgroundColor:item.background}" />{{ item.name }}</span>
    </div>
    <div :id="charts.id" />
  </div>
</template>

<script>

import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'
export default {
  name: 'Index',
  props: ['charts'],
  data() {
    return {
      chartInstance: null,
      legendList: [],
      key: '',
      value: '',
      name: '',
      data: [],
      fields: [],
      tipsList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.legendList = this.charts.legendList
      this.key = this.charts.key
      this.value = this.charts.value
      this.name = this.charts.name
      this.fields = this.charts.fields
      this.list = this.charts.list
      this.buildTips()
      this.renderChart2()
    },
    buildTips() {
      const data = JSON.parse(JSON.stringify(this.list)).reverse()

      const resList = []
      this.fields.map((item, index) => {
        const res = data.map(_item => _item[item]).reverse()
        resList.push(res)
      })
      const calucateList = []
      resList.forEach((item, index) => {
        const res = item.map((_item, _index) => {
          return _item / 2
        })
        calucateList.push(res)
      })
      const res3 = []
      resList.reduce((pre, cur) => {
        const res = cur.map((item, index) => {
          return pre[index] + item
        })
        res3.push(pre)
        return res
      })
      const len = resList.length
      const res4 = res3[len - 2].map((item, index) => {
        return item + resList[len - 1][index]
      })
      res3.push(res4)
      const res5 = []
      res3.forEach((item, index) => {
        const res = item.map((_item, _index) => {
          return _item - calucateList[index][_index]
        })
        res5.push(res)
      })
      this.tipsList = res5
    },
    mouseenter(index) {
      const tooltipHtml = "<div style='background:#fff;border: 2px solid #0f8de8;width: 50px;height: 26px;color: #0f8de8;position: relative; transition-duration: 2s;z-index: 999'>" +
        "<span style='color:#63c6c2;font-size:15px;transition-duration: 2s;'>异常值</span>" +
        '</div>'
      const point = JSON.parse(JSON.stringify(this.tipsList[index]))
      for (let i = 0, len = point.length; i < len; i++) {
        const p = [i + 0.4, point[i]]
        console.log(p)
        this.chartInstance.guide().html({
          position: p,
          html: tooltipHtml
        })
      }
      this.chartInstance.render()
    },
    mouseleave() {
      this.chartInstance.guide().clear()
      this.chartInstance.repaint()
    },
    renderChart2() {
      const _this = this
      const ds = new DataSet()
      const dv = ds.createView().source(this.list)
      dv.transform({
        type: 'fold',
        fields: this.fields, // 展开字段集
        key: _this.key, // key字段
        value: _this.value, // value字段
        retains: [_this.name] // 保留字段集，默认为除fields以外的所有字段
      })
      // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}
      this.chartInstance = new G2.Chart({
        container: _this.charts.id,
        forceFit: true,
        height: 400,
        animate: false
      })
      this.chartInstance.source(dv)
      this.chartInstance.coord().transpose()
      this.chartInstance.legend(false)
      this.chartInstance.axis(_this.name, {
        label: { offset: 12 },
        tickLine: true,
        line: {
          strokeOpacity: 0.5,
          shadowOffsetX: 1
        }
      })
      this.chartInstance.axis(_this.value, {
        label: {
          offset: 5,
          formatter: val => {
            return val + '%'
          }
        },
        grid: false
      })
      this.chartInstance.intervalStack().position(`${_this.name}*比例`).color(_this.key)
      this.chartInstance.render()
    }
  }
}
</script>

<style scoped lang="scss">
.chart {
  position: relative;
}
.table-container {
  position: relative;
  .table-d {
    position: absolute;
  }
}
.legend {
  position: absolute;
  right: 0;
  top: 10px;
  z-index: 2;
  font-size: 12px;
  color: #999999;
  text-align: right;
  & > span {
    cursor: pointer;
    margin-right: 20px;
    & > i {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: orange;
      vertical-align: 1px;
      margin-right: 4px;
    }
  }
}
</style>
