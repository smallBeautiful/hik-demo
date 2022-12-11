<template>
  <div style="padding: 30px;" class="saasas">
    <div id="intervalGroup" />
    <div>
      <el-button :disabled="!prevShow" @click="prevHandle">上一页</el-button>
      <el-button :disabled="!nextShow" @click="nextHandle">下一页</el-button>
    </div>
    {{ startIndex > 0 }}
  </div>
</template>
<script>
let chartInstance = null
import { arrayGroupBy } from '@/utils'
import G2 from '@antv/g2'
export default {
  name: 'Index',
  data() {
    return {
      startIndex: 0,
      endIndex: 4,
      originData: [],
      originSplitData: [],
      currentData: [],
      chartInstance: null
    }
  },
  computed: {
    prevShow() {
      return this.startIndex > 0
    },
    nextShow() {
      return this.endIndex < this.originSplitData.length - 1
    }
  },
  mounted() {
    console.log(111)
    this.initData()
    this.$nextTick(() => {
      const ele = document.getElementsByClassName('saasas')[0]
      ele.addEventListener('mouseleave', this.hideToolTip())
    })
  },
  beforeDestroy() {
    const ele = document.getElementsByClassName('saasas')[0]
    ele.removeEventListener('mouseleave', this.hideToolTip())
  },
  methods: {
    hideToolTip() {
      chartInstance.hideTooltip()
    },
    prevHandle() {
      this.startIndex--
      this.endIndex--
      this.getSplitData()
    },
    nextHandle() {
      this.startIndex++
      this.endIndex++
      this.getSplitData()
    },
    initData() {
      this.originData = [
        { nums: 4, name: '信息化开发', value: '12', percent: 80, type: '主样本' },
        { nums: 4, name: '信息化开发', value: '13', percent: 34, type: 'HR开发一组' },
        { nums: 4, name: '信息化开发', value: '16', percent: 0, type: 'HR开发二组' },
        { nums: 4, name: '信息化开发', value: '1', percent: 30, type: 'HR开发三组' },
        { nums: 4, name: '信息化开发1', value: '13', percent: 34, type: 'HR开发一组' },
        { nums: 4, name: '信息化开发1', value: '16', percent: 12, type: 'HR开发二组' },
        { nums: 4, name: '信息化开发2', value: '12', percent: 45, type: '主样本' },
        { nums: 4, name: '信息化开发2', value: '13', percent: 34, type: 'HR开发一组' },
        { nums: 4, name: '信息化开发2', value: '16', percent: 12, type: 'HR开发二组' },
        { nums: 4, name: '信息化开发2', value: '1', percent: 0, type: 'HR开发三组' },
        { nums: 4, name: '信息化开发经理', value: '0', percent: 90, type: '主样本' },
        { nums: 4, name: '信息化开发经理', value: '4', percent: 12, type: 'HR开发一组' },
        { nums: 4, name: '信息化开发经理', value: '7', percent: 13, type: 'HR开发二组' },
        { nums: 4, name: '信息化开发经理', value: '9', percent: 12, type: 'HR开发三组' },
        { nums: 4, name: '信息化开发经理1', value: '0', percent: 90, type: '主样本' },
        { nums: 4, name: '信息化开发经理1', value: '4', percent: 12, type: 'HR开发一组' },
        { nums: 4, name: '信息化开发经理1', value: '7', percent: 13, type: 'HR开发二组' },
        { nums: 4, name: '信息化开发经理1', value: '9', percent: 12, type: 'HR开发三组' },
        { nums: 4, name: '信息化开发经理2', value: '0', percent: 90, type: '主样本' },
        { nums: 4, name: '信息化开发经理2', value: '4', percent: 12, type: 'HR开发一组' },
        { nums: 4, name: '信息化开发经理2', value: '7', percent: 13, type: 'HR开发二组' },
        { nums: 4, name: '其他', value: '12', percent: '12', type: '主样本' },
        { nums: 4, name: 'IT部总经理', value: '11', percent: '21', type: '主样本' }
      ]
      this.originSplitData = arrayGroupBy(this.originData, 'name')
      // 小于4就不切割
      if (this.originSplitData.length < 4) {
        this.currentData = this.originData
        this.init()
        return
      }
      this.getSplitData()
      // 大于等于4开始切割
    },
    getSplitData() {
      this.currentData = this.originSplitData.slice(this.startIndex, this.endIndex)
      const data = []
      this.currentData.forEach(item => {
        data.push(...item)
      })
      this.currentData = data
      this.init2()
    },
    init() {
      const res = this.currentData
      chartInstance && chartInstance.destroy()
      chartInstance = new G2.Chart({
        container: 'intervalGroup',
        height: 500,
        forceFit: true,
        padding: [10, 10, 30, 40]
      })
      chartInstance.scale('percent', {
        min: 0,
        max: 100
      })
      chartInstance.source(res)
      chartInstance.legend(false)
      chartInstance.interval().position('name*percent').color('type')
        .adjust([{
          type: 'dodge',
          marginRatio: 0,
          nums: 4
        }])
      chartInstance.render()
    },
    init2() {
      const res = arrayGroupBy(this.currentData, 'name')
      chartInstance && chartInstance.destroy()
      chartInstance = new G2.Chart({
        container: 'intervalGroup',
        height: 500,
        forceFit: true,
        padding: [10, 10, 30, 40]
      })
      chartInstance.scale('percent', {
        min: 0,
        max: 100
      })

      const view2 = chartInstance.view()
      view2.source(res[0])
      view2.interval().position('name*percent').color('type').size(30)
        .adjust([{
          type: 'dodge',
          marginRatio: 0
        }])

      const view3 = chartInstance.view()
      view3.source(res[1])
      view3.interval().position('name*percent').color('type').size(30)
        .adjust([{
          type: 'dodge',
          marginRatio: 0
        }])

      chartInstance.render()
    }
  }
}
</script>

<style scoped>

</style>
