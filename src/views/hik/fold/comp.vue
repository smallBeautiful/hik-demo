<template>
  <div class="chart">
    <div class="legend">
      <span v-for="(item, index) in legendList" :key="index" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)"><i :style="{backgroundColor:colorList[index]}" />{{ item.name }}</span>
    </div>
    <div :id="charts.id" />
  </div>
</template>

<script>

const transPose = (array) => {
  const result = []
  for (let i = 0; i < array[0].length; i++) {
    const row = []
    for (let j = 0; j < array.length; j++) {
      row.push(array[j][i])
    }
    result.push(row)
  }
  return result
}

import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'
import { find } from 'lodash'
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
      tipsList: [],
      colorList: ['#519670', '#96bb8f', '#4f7e57', '#93b469', '#008e59', '#006e5f'],
      percentList: [],
      percentListTranspose: []
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
      this.buildPlist()
      this.buildLists()
      this.renderChart2()
    },
    // 百分比列表
    buildPlist() {
      this.percentList = this.list.map((item, index) => {
        return this.fields.map((_item, _index) => {
          return item[_item]
        })
      })
    },
    buildLists() {
      // 暂时放在这里
      this.charts.list.forEach((item, index) => {
        item.lists = this.charts.valueList[index]
      })
    },
    buildTips() {
      const data = JSON.parse(JSON.stringify(this.list)).reverse()

      const resList = []
      this.fields.map((item) => {
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
      const point = JSON.parse(JSON.stringify(this.tipsList[index]))
      for (let i = 0, len = point.length; i < len; i++) {
        const text = `${this.percentList[i][index]}% (${this.charts.valueList[i][index]}人)`
        const tooltipHtml = "<div class='hik-pop'>" +
          "<span style='color:#999;font-size:14px;'>" + text + '</span>' +
          "<span class='hik-pop-item'></span>" +
          '</div>'
        const p = [i + 0.6, point[i]]
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
        retains: [_this.name, 'lists'] // 保留字段集，默认为除fields以外的所有字段
      })
      // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}
      this.chartInstance = new G2.Chart({
        container: _this.charts.id,
        forceFit: true,
        height: 400,
        animate: false
      })
      this.chartInstance.scale(_this.name, {
        range: [0.05, 0.9]
      })
      this.chartInstance.source(dv)
      this.chartInstance.coord().transpose()
      this.chartInstance.legend(false)
      this.chartInstance.axis(_this.name, {
        tickLine: false
      })
      this.chartInstance.axis(_this.value, {
        label: {
          offset: 10,
          formatter: val => {
            return val + '%'
          }
        },
        grid: {
          align: 'center',
          hideLastLine: true
        }
      })
      this.chartInstance.tooltip({
        useHtml: true,
        htmlContent: (title, items) => {
          const lists = find(this.charts.list, (o) => o.State === title)?.lists || []
          let str = ''
          items.forEach((item, index) => {
            str += `<div class="item">
                      <span style="background-color:${_this.colorList[index]};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                      <span class="mr-10">${item.name}</span>${item.value}%
                      <span class="ml-5">${lists[index]}人</span>
                  <div/>`
          })
          return `<div class="g2-tool-tip">
                <div class="title">${title}</div>
                ${str}
              <div/>`
        }
      })
      this.chartInstance.intervalStack().position(`${_this.name}*比例`).color(_this.key, _this.colorList).size(30)
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
<style lang="scss">
.hik-pop {
  position: relative;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background:#fff;
  border: 1px solid #fff;
  min-width: 50px;
  height: 26px;
  line-height: 26px;
  padding: 0 4px;
  color: #999;
  border-radius: 4px;
  transition-duration: 2s;
  z-index: 3;
}
.hik-pop-item {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  top: 22px;
  left: 45%;
  border: 6px solid transparent;
  border-top: 6px solid #fff;
}
.g2-tool-tip {
  position: absolute;
  border: 1px solid #eee;
  background: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  color: #666666;
  .title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .item {
    font-size: 14px;
    line-height: 24px;
  }
  .mr-10 {
    margin-right: 15px;
  }
  .ml-5 {
    margin-left: 5px;
  }
}
</style>
