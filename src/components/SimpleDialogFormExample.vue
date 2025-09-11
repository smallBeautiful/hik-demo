<template>
  <div class="simple-dialog-example">
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">
        新增用户
      </el-button>
      <el-button type="success" icon="el-icon-plus" @click="handleCreateProduct">
        新增产品
      </el-button>
    </div>

    <!-- 用户列表 -->
    <el-table :data="userList" border style="width: 100%; margin-top: 20px;">
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

    <!-- 产品列表 -->
    <el-table :data="productList" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
            {{ scope.row.status === 'active' ? '上架' : '下架' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEditProduct(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteProduct(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 用户表单弹窗 -->
    <SimpleDialogForm
      ref="userForm"
      title="用户信息"
      :fields="userFields"
      :rules="userRules"
      :loading="userLoading"
      submit-text="保存"
      @submit="handleUserSubmit"
    />

    <!-- 产品表单弹窗 -->
    <SimpleDialogForm
      ref="productForm"
      title="产品信息"
      :fields="productFields"
      :rules="productRules"
      :loading="productLoading"
      submit-text="保存"
      @submit="handleProductSubmit"
    />
  </div>
</template>

<script>
import SimpleDialogForm from './SimpleDialogForm.vue'

export default {
  name: 'SimpleDialogFormExample',
  components: {
    SimpleDialogForm
  },
  data() {
    return {
      // 用户相关
      userLoading: false,
      userList: [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138001',
          department: '技术部',
          status: 'active'
        },
        {
          id: 2,
          name: '李四',
          email: 'lisi@example.com',
          phone: '13800138002',
          department: '产品部',
          status: 'active'
        }
      ],
      userFields: [
        {
          prop: 'name',
          label: '姓名',
          type: 'input',
          placeholder: '请输入姓名',
          required: true
        },
        {
          prop: 'email',
          label: '邮箱',
          type: 'input',
          inputType: 'email',
          placeholder: '请输入邮箱',
          required: true
        },
        {
          prop: 'phone',
          label: '电话',
          type: 'input',
          placeholder: '请输入电话',
          required: true
        },
        {
          prop: 'department',
          label: '部门',
          type: 'select',
          placeholder: '请选择部门',
          options: [
            { label: '技术部', value: '技术部' },
            { label: '产品部', value: '产品部' },
            { label: '运营部', value: '运营部' },
            { label: '人事部', value: '人事部' }
          ],
          required: true
        },
        {
          prop: 'status',
          label: '状态',
          type: 'radio',
          options: [
            { label: '启用', value: 'active' },
            { label: '禁用', value: 'inactive' }
          ],
          defaultValue: 'active',
          required: true
        }
      ],
      userRules: {
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
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },

      // 产品相关
      productLoading: false,
      productList: [
        {
          id: 1,
          name: 'iPhone 15',
          price: 5999,
          category: '手机',
          status: 'active'
        },
        {
          id: 2,
          name: 'MacBook Pro',
          price: 12999,
          category: '电脑',
          status: 'active'
        }
      ],
      productFields: [
        {
          prop: 'name',
          label: '产品名称',
          type: 'input',
          placeholder: '请输入产品名称',
          required: true
        },
        {
          prop: 'price',
          label: '价格',
          type: 'input',
          inputType: 'number',
          placeholder: '请输入价格',
          required: true
        },
        {
          prop: 'category',
          label: '分类',
          type: 'select',
          placeholder: '请选择分类',
          options: [
            { label: '手机', value: '手机' },
            { label: '电脑', value: '电脑' },
            { label: '平板', value: '平板' },
            { label: '配件', value: '配件' }
          ],
          required: true
        },
        {
          prop: 'description',
          label: '描述',
          type: 'textarea',
          placeholder: '请输入产品描述',
          rows: 4
        },
        {
          prop: 'status',
          label: '状态',
          type: 'radio',
          options: [
            { label: '上架', value: 'active' },
            { label: '下架', value: 'inactive' }
          ],
          defaultValue: 'active',
          required: true
        }
      ],
      productRules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  
  methods: {
    // 用户相关方法
    handleCreate() {
      this.$refs.userForm.show()
    },
    
    handleEdit(row) {
      this.$refs.userForm.show(row)
    },
    
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
      })
    },
    
    handleUserSubmit(formData) {
      this.userLoading = true
      
      setTimeout(() => {
        const existingIndex = this.userList.findIndex(item => item.id === formData.id)
        if (existingIndex > -1) {
          // 更新
          this.userList.splice(existingIndex, 1, { ...formData })
          this.$message.success('更新成功')
        } else {
          // 新增
          const newUser = {
            ...formData,
            id: Date.now()
          }
          this.userList.unshift(newUser)
          this.$message.success('创建成功')
        }
        
        this.userLoading = false
        this.$refs.userForm.hide()
      }, 1000)
    },

    // 产品相关方法
    handleCreateProduct() {
      this.$refs.productForm.show()
    },
    
    handleEditProduct(row) {
      this.$refs.productForm.show(row)
    },
    
    handleDeleteProduct(row) {
      this.$confirm(`确定删除产品 "${row.name}" 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.productList.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.productList.splice(index, 1)
          this.$message.success('删除成功')
        }
      })
    },
    
    handleProductSubmit(formData) {
      this.productLoading = true
      
      setTimeout(() => {
        const existingIndex = this.productList.findIndex(item => item.id === formData.id)
        if (existingIndex > -1) {
          // 更新
          this.productList.splice(existingIndex, 1, { ...formData })
          this.$message.success('更新成功')
        } else {
          // 新增
          const newProduct = {
            ...formData,
            id: Date.now()
          }
          this.productList.unshift(newProduct)
          this.$message.success('创建成功')
        }
        
        this.productLoading = false
        this.$refs.productForm.hide()
      }, 1000)
    }
  }
}
</script>

<style scoped>
.simple-dialog-example {
  padding: 20px;
}

.filter-container {
  margin-bottom: 20px;
}

.filter-container .el-button {
  margin-right: 10px;
}
</style>
