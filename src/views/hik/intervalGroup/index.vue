<template>
  <div>
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
    this.initData()
  },
  methods: {
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
        { name: '信息化开发', value: '12', percent: '45', type: '主样本' },
        { name: '信息化开发', value: '13', percent: '34', type: 'HR开发一组' },
        { name: '信息化开发', value: '16', percent: '12', type: 'HR开发二组' },
        { name: '信息化开发', value: '1', percent: '0', type: 'HR开发三组' },
        { name: '信息化开发1', value: '12', percent: '45', type: '主样本' },
        { name: '信息化开发1', value: '13', percent: '34', type: 'HR开发一组' },
        { name: '信息化开发1', value: '16', percent: '12', type: 'HR开发二组' },
        { name: '信息化开发1', value: '1', percent: '0', type: 'HR开发三组' },
        { name: '信息化开发2', value: '12', percent: '45', type: '主样本' },
        { name: '信息化开发2', value: '13', percent: '34', type: 'HR开发一组' },
        { name: '信息化开发2', value: '16', percent: '12', type: 'HR开发二组' },
        { name: '信息化开发2', value: '1', percent: '0', type: 'HR开发三组' },
        { name: '信息化开发经理', value: '0', percent: '90', type: '主样本' },
        { name: '信息化开发经理', value: '4', percent: '12', type: 'HR开发一组' },
        { name: '信息化开发经理', value: '7', percent: '13', type: 'HR开发二组' },
        { name: '信息化开发经理', value: '9', percent: '12', type: 'HR开发三组' },
        { name: '信息化开发经理1', value: '0', percent: '90', type: '主样本' },
        { name: '信息化开发经理1', value: '4', percent: '12', type: 'HR开发一组' },
        { name: '信息化开发经理1', value: '7', percent: '13', type: 'HR开发二组' },
        { name: '信息化开发经理1', value: '9', percent: '12', type: 'HR开发三组' },
        { name: '信息化开发经理2', value: '0', percent: '90', type: '主样本' },
        { name: '信息化开发经理2', value: '4', percent: '12', type: 'HR开发一组' },
        { name: '信息化开发经理2', value: '7', percent: '13', type: 'HR开发二组' },
        { name: '其他', value: '12', percent: '12', type: '主样本' },
        { name: 'IT部总经理', value: '11', percent: '21', type: '主样本' }
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
      this.init()
    },
    init() {
      chartInstance && chartInstance.destroy()
      chartInstance = new G2.Chart({
        container: 'intervalGroup',
        forceFit: true,
        height: 500,
        padding: [10, 10, 30, 10],
        animate: false
      })
      chartInstance.source(this.currentData)
      chartInstance.legend(false)
      chartInstance.interval().position('name*percent').color('type')
        .adjust([{
          type: 'dodge',
          dodgeBy: 'type',
          marginRatio: 1 / 1000
        }])

      chartInstance.render()
    }
  }
}
</script>

<style scoped>

</style>
