<template>
  <div class="radio-select-table">
    <div class="header">
      <h2>用户信息表（单选）</h2>
      <div class="actions">
        <el-button
          type="primary"
          size="small"
          @click="clearSelection"
          :disabled="!selectedRow"
        >
          清除选择
        </el-button>
        <span v-if="selectedRow" class="selected-info">
          当前选中: {{ selectedRow.name }} ({{ selectedRow.email }})
        </span>
      </div>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="getRowClassName"
      @row-click="handleRowClick"
      ref="radioTable"
    >
      <el-table-column width="60" label="">
        <template slot-scope="scope">
          <el-radio
            v-model="selectedId"
            :label="scope.row.id"
            @change="handleRadioChange(scope.row)"
            @click.native.stop
          >
            &nbsp;
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="role" label="角色" width="120"></el-table-column>
      <el-table-column prop="department" label="部门" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '活跃' ? 'success' : 'info'"
            size="small"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="selectRow(scope.row)"
          >
            选择此行
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="demo-info">
      <h3>功能说明</h3>
      <ul>
        <li>使用第一列的Radio按钮进行单选</li>
        <li>点击整行也可以选中该行</li>
        <li>点击"选择此行"按钮也可以选中行</li>
        <li>选中行会高亮显示</li>
        <li>可以清除当前选择</li>
        <li>真正实现Radio的单选效果</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioSelectTable',
  data() {
    return {
      selectedId: null,
      selectedRow: null,
      tableData: [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          role: '管理员',
          department: '技术部',
          status: '活跃'
        },
        {
          id: 2,
          name: '李四',
          email: 'lisi@example.com',
          role: '开发人员',
          department: '研发部',
          status: '活跃'
        },
        {
          id: 3,
          name: '王五',
          email: 'wangwu@example.com',
          role: '测试人员',
          department: '质量部',
          status: '活跃'
        },
        {
          id: 4,
          name: '赵六',
          email: 'zhaoliu@example.com',
          role: '设计师',
          department: '设计部',
          status: '休假'
        },
        {
          id: 5,
          name: '钱七',
          email: 'qianqi@example.com',
          role: '产品经理',
          department: '产品部',
          status: '活跃'
        }
      ]
    }
  },
  methods: {
    // Radio选择变化
    handleRadioChange(row) {
      this.selectedRow = row;
    },

    // 点击行选择
    handleRowClick(row, column, event) {
      // 如果点击的是radio列，不重复处理
      if (event.target.classList.contains('el-radio__inner') ||
        event.target.classList.contains('el-radio__input')) {
        return;
      }
      this.selectedId = row.id;
      this.selectedRow = row;
    },

    // 通过按钮选择
    selectRow(row) {
      this.selectedId = row.id;
      this.selectedRow = row;
    },

    // 清除选择
    clearSelection() {
      this.selectedId = null;
      this.selectedRow = null;
    },

    // 设置行样式
    getRowClassName({ row }) {
      return row.id === this.selectedId ? 'selected-row' : '';
    }
  }
}
</script>

<style scoped>
.radio-select-table {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.header h2 {
  margin: 0;
  color: #303133;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.selected-info {
  color: #409EFF;
  font-weight: 500;
}

.demo-info {
  margin-top: 30px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.demo-info h3 {
  margin-top: 0;
  color: #303133;
}

.demo-info ul {
  padding-left: 20px;
  color: #606266;
}

.demo-info li {
  margin-bottom: 8px;
}

/* 选中行样式 */
.el-table >>> .selected-row td {
  background-color: #f0f9ff !important;
}

.el-table >>> .selected-row:hover td {
  background-color: #ecf5ff !important;
}

/* Radio样式调整 */
.el-table >>> .el-radio {
  margin-right: 0;
}

.el-table >>> .el-radio__input {
  margin-right: 0;
}

/* 行点击效果 */
.el-table >>> .el-table__row {
  cursor: pointer;
}

.el-table >>> .el-table__row:hover td {
  background-color: #f5f7fa !important;
}
</style>
