<template>
  <div class="dialog-form-example">
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">
        新增用户
      </el-button>
    </div>

    <!-- 用户列表 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
            {{ scope.row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 使用弹窗表单组件 -->
    <DialogForm
      ref="dialogForm"
      :title="dialogTitle"
      :value="formData"
      :rules="formRules"
      :is-edit="isEdit"
      :loading="submitLoading"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @close="handleClose"
    >
      <!-- 自定义表单内容 -->
      <template #default="{ formData, isEdit }">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="department">
              <el-select v-model="formData.department" placeholder="请选择部门" style="width: 100%">
                <el-option label="技术部" value="技术部" />
                <el-option label="产品部" value="产品部" />
                <el-option label="运营部" value="运营部" />
                <el-option label="人事部" value="人事部" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色" prop="role">
              <el-select v-model="formData.role" placeholder="请选择角色" style="width: 100%">
                <el-option label="管理员" value="admin" />
                <el-option label="普通用户" value="user" />
                <el-option label="访客" value="guest" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formData.status">
                <el-radio label="active">启用</el-radio>
                <el-radio label="inactive">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="入职日期" prop="joinDate">
              <el-date-picker
                v-model="formData.joinDate"
                type="date"
                placeholder="选择入职日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="3"
                placeholder="请输入备注信息"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </DialogForm>
  </div>
</template>

<script>
import DialogForm from './index.vue'

export default {
  name: 'DialogFormExample',
  components: {
    DialogForm
  },
  data() {
    return {
      // 弹窗控制
      isEdit: false,
      submitLoading: false,
      
      // 表单数据
      formData: {
        id: null,
        name: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        status: 'active',
        joinDate: '',
        remark: ''
      },
      
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        joinDate: [
          { required: true, message: '请选择入职日期', trigger: 'change' }
        ]
      },
      
      // 用户列表数据
      userList: [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138001',
          department: '技术部',
          role: 'admin',
          status: 'active',
          joinDate: '2023-01-15',
          remark: '技术负责人'
        },
        {
          id: 2,
          name: '李四',
          email: 'lisi@example.com',
          phone: '13800138002',
          department: '产品部',
          role: 'user',
          status: 'active',
          joinDate: '2023-02-20',
          remark: '产品经理'
        },
        {
          id: 3,
          name: '王五',
          email: 'wangwu@example.com',
          phone: '13800138003',
          department: '运营部',
          role: 'user',
          status: 'inactive',
          joinDate: '2023-03-10',
          remark: '运营专员'
        }
      ]
    }
  },
  
  computed: {
    dialogTitle() {
      return this.isEdit ? '编辑用户' : '新增用户'
    }
  },
  
  methods: {
    // 新增用户
    handleCreate() {
      this.isEdit = false
      this.resetForm()
      this.$refs.dialogForm.show()
    },
    
    // 编辑用户
    handleEdit(row) {
      this.isEdit = true
      this.formData = { ...row }
      this.$refs.dialogForm.show()
    },
    
    // 删除用户
    handleDelete(row) {
      this.$confirm(`确定删除用户 "${row.name}" 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.userList.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.userList.splice(index, 1)
          this.$message.success('删除成功')
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    
    // 提交表单
    handleSubmit(formData) {
      this.submitLoading = true
      
      // 模拟API调用
      setTimeout(() => {
        if (this.isEdit) {
          // 更新用户
          const index = this.userList.findIndex(item => item.id === formData.id)
          if (index > -1) {
            this.userList.splice(index, 1, { ...formData })
            this.$message.success('更新成功')
          }
        } else {
          // 新增用户
          const newUser = {
            ...formData,
            id: Date.now()
          }
          this.userList.unshift(newUser)
          this.$message.success('创建成功')
        }
        
        this.submitLoading = false
        this.$refs.dialogForm.hide()
      }, 1000)
    },
    
    // 取消
    handleCancel() {
      this.$refs.dialogForm.hide()
    },
    
    // 关闭弹窗
    handleClose() {
      this.resetForm()
    },
    
    // 重置表单
    resetForm() {
      this.formData = {
        id: null,
        name: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        status: 'active',
        joinDate: '',
        remark: ''
      }
    }
  }
}
</script>

<style scoped>
.dialog-form-example {
  padding: 20px;
}

.filter-container {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 20px;
}
</style>
