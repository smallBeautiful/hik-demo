<template>
  <div class="table-merge-demo">
    <div class="toolbar">
      <el-button size="mini" @click="addRow">新增一行</el-button>
      <el-button size="mini" @click="removeRow">删除最后一行</el-button>
      <el-button size="mini" @click="addTable">新增表格</el-button>
      <el-button size="mini" @click="removeTable">删除最后表格</el-button>
    </div>

    <!-- 跨所有表格纵向合并「数量」列（第 4 列），显示 num 合计 -->
    <div
      class="merge-wrap"
      v-table-merge="{ columnIndex: 3, value: totalNum }"
    >
      <el-table
        v-for="(group, gi) in tableGroups"
        :key="gi"
        :data="group.rows"
        border
        :show-header="gi === 0"
        :style="{ width: '700px', marginTop: gi === 0 ? '0' : '-1px' }"
      >
        <el-table-column prop="name" label="名称" width="140" />
        <el-table-column prop="type" label="分类" width="140" />
        <el-table-column prop="price" label="单价" width="140" />
        <el-table-column label="数量" width="140" />
        <el-table-column prop="total" label="金额" width="140" />
      </el-table>
    </div>
  </div>
</template>

<script>
import tableMerge from './merge'

export default {
  name: 'TableMerge',
  directives: { tableMerge },
  data() {
    return {
      tableGroups: [
        { rows: [{ name: '苹果', type: '水果', price: 5, num: 2, total: 10 }] },
        { rows: [{ name: '香蕉', type: '水果', price: 3, num: 1, total: 3 }] },
        { rows: [{ name: '白菜', type: '蔬菜', price: 2, num: 6, total: 12 }] }
      ]
    }
  },
  computed: {
    // 合并单元格显示所有行 num 之和
    totalNum() {
      return this.tableGroups.reduce(
        (sum, group) => sum + group.rows.reduce((s, row) => s + (row.num || 0), 0),
        0
      )
    }
  },
  methods: {
    addRow() {
      const group = this.tableGroups[this.tableGroups.length - 1]
      group.rows.push({ name: '橙子', type: '水果', price: 4, num: 1, total: 4 })
    },
    removeRow() {
      const group = this.tableGroups[this.tableGroups.length - 1]
      if (group && group.rows.length > 1) {
        group.rows.pop()
      }
    },
    addTable() {
      this.tableGroups.push({
        rows: [{ name: '西瓜', type: '水果', price: 6, num: 3, total: 18 }]
      })
    },
    removeTable() {
      if (this.tableGroups.length > 1) {
        this.tableGroups.pop()
      }
    }
  }
}
</script>

<style scoped>
.table-merge-demo {
  padding: 20px;
}

.toolbar {
  margin-bottom: 12px;
}

.merge-wrap {
  position: relative;
}

/* 隐藏 el-table 横向滚动条 */
.table-merge-demo ::v-deep .el-table__body-wrapper,
.table-merge-demo ::v-deep .el-table__header-wrapper {
  overflow-x: hidden;
}
</style>
