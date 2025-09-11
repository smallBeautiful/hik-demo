<template>
  <div class="app-container">
    <div class="toolbar">
      <el-button type="primary" @click="openDialog('create')">新建角色</el-button>
    </div>

    <el-table :data="displayedRows" border style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column label="角色名称" min-width="160">
        <template slot-scope="scope">
          <el-link style="position: relative;z-index: 999999;" type="primary" @click="openPreview(scope.row)">{{ scope.row.name }}</el-link>

          <el-drawer
      title="角色详情"
      :visible.sync="previewVisible"
      direction="rtl"
      size="520px"
      :modal="false"
      :wrapperClosable="false"
      :destroy-on-close="false"
    >
      <div class="drawer-body">
        <el-form label-width="90px">
          <el-form-item label="ID">
            <span>{{ previewRow.id }}</span>
          </el-form-item>
          <el-form-item label="角色名称">
            <span>{{ previewRow.name }}</span>
          </el-form-item>
          <el-form-item label="备注说明">
            <span>{{ previewRow.remark || '-' }}</span>
          </el-form-item>
          <el-form-item label="权限设置">
            <el-tree
              ref="previewTree"
              :data="permissionTreeDisabled"
              node-key="id"
              show-checkbox
              default-expand-all
              :props="disabledTreeProps"
              :expand-on-click-node="false"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="220" show-overflow-tooltip />
      <el-table-column label="权限" min-width="260">
        <template slot-scope="scope">
          <el-tooltip placement="top" :content="formatPermissionNames(scope.row.permissions)">
            <div>
              <el-tag size="mini">{{ scope.row.permissions.length }} 项</el-tag>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openDialog('edit', scope.row)">编辑</el-button>
          <el-divider direction="vertical" />
          <el-popconfirm title="确认删除该角色？" @onConfirm="handleDelete(scope.row)">
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="pager">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="rows.length"
        :page-size="pageSize"
        :current-page.sync="currentPage"
      />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="visible" width="720px" @closed="handleClosed">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入" maxlength="50" show-word-limit />
        </el-form-item>

        <el-form-item label="备注说明" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入该角色的简要描述"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="权限设置" prop="permissions">
          <el-tree
            ref="permTree"
            :data="permissionTree"
            node-key="id"
            show-checkbox
            default-expand-all
            :props="treeProps"
            :expand-on-click-node="false"
            @check-change="onTreeCheckChange"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">提交</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      rows: [],
      nextId: 1,
      currentPage: 1,
      pageSize: 8,
      previewVisible: false,
      previewRow: { id: '', name: '', remark: '', permissions: [] },
      permissionTreeDisabled: [],
      visible: false,
      dialogTitle: '新建角色',
      submitting: false,
      editingId: null,
      form: {
        name: '',
        remark: '',
        permissions: []
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度需在 2-50 个字符', trigger: 'blur' }
        ],
        permissions: [
          { type: 'array', required: true, message: '请至少选择一项权限', trigger: 'change' }
        ]
      },
      treeProps: { label: 'label', children: 'children' },
      disabledTreeProps: { label: 'label', children: 'children', disabled: 'disabled' },
      permissionTree: [
        {
          id: 'menu',
          label: '菜单管理',
          children: [
            {
              id: 'menu-config',
              label: '菜单配置',
              children: [
                { id: 'menu-view', label: '查看菜单结构' },
                { id: 'menu-edit', label: '新建、编辑菜单' }
              ]
            }
          ]
        },
        {
          id: 'feature',
          label: '功能配置',
          children: [
            { id: 'feature-list', label: '查看功能列表' },
            { id: 'feature-edit', label: '新建、编辑功能' }
          ]
        },
        {
          id: 'auth',
          label: '权限管理',
          children: [
            { id: 'user-manage', label: '用户管理' }
          ]
        }
      ]
    }
  },
  computed: {
    displayedRows() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.rows.slice(start, start + this.pageSize)
    }
  },
  created() {
    // 初始化一些示例数据
    this.rows = [
      { id: this.nextId++, name: '管理员', remark: '系统最高权限', permissions: ['menu-view', 'menu-edit', 'feature-list', 'feature-edit', 'user-manage'] },
      { id: this.nextId++, name: '运营', remark: '日常运营维护', permissions: ['menu-view', 'feature-list'] }
    ]
    this.buildPermissionMap()
    // 预览用禁用树：仅构建一次，避免切换时闪烁
    this.permissionTreeDisabled = JSON.parse(JSON.stringify(this.permissionTree))
    const markDisabledInit = list => {
      list.forEach(n => {
        n.disabled = true
        if (n.children && n.children.length) markDisabledInit(n.children)
      })
    }
    markDisabledInit(this.permissionTreeDisabled)
  },
  methods: {
    openDialog(mode = 'create', row) {
      this.dialogTitle = mode === 'create' ? '新建角色' : '编辑角色'
      this.editingId = mode === 'edit' && row ? row.id : null
      if (mode === 'edit' && row) {
        this.form = { name: row.name, remark: row.remark, permissions: [...row.permissions] }
        this.$nextTick(() => {
          if (this.$refs.permTree) this.$refs.permTree.setCheckedKeys(this.form.permissions)
        })
      } else {
        this.form = { name: '', remark: '', permissions: [] }
        this.$nextTick(() => {
          if (this.$refs.permTree) this.$refs.permTree.setCheckedKeys([])
        })
      }
      this.visible = true
    },
    handleClosed() {
      // reset form when dialog closes
      if (this.$refs.formRef) {
        this.$refs.formRef.resetFields()
      }
      if (this.$refs.permTree) {
        this.$refs.permTree.setCheckedKeys([])
      }
      this.submitting = false
    },
    async handleSubmit() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        this.submitting = true
        try {
          const checked = this.$refs.permTree ? this.$refs.permTree.getCheckedKeys(true) : []
          this.form.permissions = checked
          // 模拟请求
          await new Promise(resolve => setTimeout(resolve, 400))
          if (this.editingId == null) {
            this.rows.unshift({ id: this.nextId++, name: this.form.name, remark: this.form.remark, permissions: [...this.form.permissions] })
            this.$message.success('创建成功')
          } else {
            const idx = this.rows.findIndex(r => r.id === this.editingId)
            if (idx !== -1) this.$set(this.rows, idx, { id: this.editingId, name: this.form.name, remark: this.form.remark, permissions: [...this.form.permissions] })
            this.$message.success('更新成功')
          }
          this.visible = false
          this.$emit('submitted', { ...this.form, id: this.editingId })
        } catch (e) {
          // this.$message.error('提交失败')
          this.visible = false
        } finally {
          this.submitting = false
        }
      })
    },
    onTreeCheckChange() {
      // 同步到表单，触发表单的 change 校验
      const checked = this.$refs.permTree ? this.$refs.permTree.getCheckedKeys(true) : []
      this.form.permissions = checked
      // 手动触发一次校验（针对纯树组件无 v-model 的情况）
      if (this.$refs.formRef) {
        this.$refs.formRef.validateField('permissions')
      }
    },
    handleDelete(row) {
      this.rows = this.rows.filter(r => r.id !== row.id)
      this.$message.success('已删除')
    },
    openPreview(row) {
      this.previewRow = { ...row }
      // 若抽屉已打开，仅更新内容；否则打开
      if (!this.previewVisible) this.previewVisible = true
      // 同步树选中（树数据保持不变，避免重建导致的关闭/重开动画）
      this.$nextTick(() => {
        if (this.$refs.previewTree) {
          this.$refs.previewTree.setCheckedKeys(this.previewRow.permissions || [])
        }
      })
    },
    buildPermissionMap() {
      const map = {}
      const walk = list => {
        list.forEach(n => {
          map[n.id] = n.label
          if (n.children && n.children.length) walk(n.children)
        })
      }
      walk(this.permissionTree)
      this.permissionLabelMap = map
    },
    formatPermissionNames(keys) {
      if (!keys || !keys.length) return '无'
      return keys.map(k => this.permissionLabelMap[k] || k).join('、')
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
}
.drawer-body {
  padding: 12px 20px 24px;
}
.pager {
  margin-top: 12px;
  text-align: right;
}
.dialog-footer {
  display: inline-flex;
  gap: 8px;
}
</style>

