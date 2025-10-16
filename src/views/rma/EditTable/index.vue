<template>
  <div>
    <el-button type="primary" style="margin-bottom: 10px;" @click="addRow">新增</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名">
        <template #default="{ row }">
          <el-input v-if="row.isEditing" v-model="row.name" />
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="age" label="年龄">
        <template #default="{ row }">
          <el-input-number
            v-if="row.isEditing"
            v-model="row.age"
            :min="0"
          />
          <span v-else>{{ row.age }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱">
        <template #default="{ row }">
          <el-input v-if="row.isEditing" v-model="row.email" />
          <span v-else>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <div v-if="row.isEditing">
            <el-button type="success" size="small" @click="saveRow(row)">保存</el-button>
            <el-button type="warning" size="small" @click="cancelEdit(row)">取消</el-button>
          </div>
          <div v-else>
            <el-button type="primary" size="small" @click="editRow(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteRow()">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '张三',
          age: 25,
          email: 'zhangsan@example.com',
          isEditing: false
        },
        {
          name: '李四',
          age: 30,
          email: 'lisi@example.com',
          isEditing: false
        }
      ],
      // 用于保存编辑前的原始数据
      originalRowData: {}
    }
  },
  mounted() {
  },
  methods: {
    // 新增行
    addRow() {
      const newRow = {
        name: '',
        age: 0,
        email: '',
        isEditing: true
      }

      // 将新行插入到表格第一行
      this.tableData.unshift(newRow)
    },

    // 编辑行
    editRow(row, index) {
      // 保存原始数据用于取消编辑时恢复
      this.originalRowData[index] = { ...row }
      row.isEditing = true
    },

    // 保存行
    saveRow(row, index) {
      row.isEditing = false
      // 这里可以添加保存到服务器的逻辑
      this.$message.success('保存成功')
    },

    // 取消编辑
    cancelEdit(row, index) {
      // 恢复原始数据
      if (this.originalRowData[index]) {
        Object.assign(row, this.originalRowData[index])
        delete this.originalRowData[index]
      }

      // 如果是新增的行且未保存，则删除该行
      if (!row.name && !row.email) {
        this.tableData.splice(index, 1)
        return
      }

      row.isEditing = false
    },

    // 删除行
    deleteRow(index) {
      this.$confirm('确定要删除这条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message.success('删除成功')
      }).catch(() => {
        // 用户取消删除
      })
    }
  }
}
</script>

<style scoped>
.el-button {
  margin-right: 10px;
}
</style>
