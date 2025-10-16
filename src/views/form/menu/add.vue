<template>
    <div class="app-container">
      <el-button type="primary" @click="openDialog()">新建一级菜单</el-button>
      <el-button type="success" @click="openDialog(editData)" style="margin-left: 10px;">编辑菜单</el-button>
      
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="menuForm"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="菜单code:" prop="menuCode">
            <el-input
              v-model="form.menuCode"
              placeholder="自动生成"
              :disabled="true"
            >
              <i slot="suffix" class="el-icon-arrow-down"></i>
            </el-input>
          </el-form-item>
          
          <el-form-item label="菜单名称:" prop="menuName" required>
            <el-input
              v-model="form.menuName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="菜单路由:" prop="menuRoute" required>
            <el-input
              v-model="form.menuRoute"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="排序值:" prop="sortValue" required>
            <el-input-number
              v-model="form.sortValue"
              placeholder="请输入数值"
              :min="0"
              :max="9999"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
          
          <el-form-item label="状态:" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogTitle: '新建一级菜单',
        isEdit: false,
        form: {
          menuCode: '',
          menuName: '',
          menuRoute: '',
          sortValue: 0,
          status: 1
        },
        // 模拟编辑数据
        editData: {
          menuCode: 'MENU_001',
          menuName: '系统管理',
          menuRoute: '/system',
          sortValue: 1,
          status: 1
        },
        rules: {
          menuName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ],
          menuRoute: [
            { required: true, message: '请输入菜单路由', trigger: 'blur' }
          ],
          sortValue: [
            { required: true, message: '请输入排序值', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 打开弹框（支持新建和编辑）
      openDialog(data = null) {
        this.isEdit = !!data;
        this.dialogTitle = this.isEdit ? '编辑一级菜单' : '新建一级菜单';
        
        if (this.isEdit && data) {
          // 编辑模式：回显数据
          this.form = {
            menuCode: data.menuCode || '',
            menuName: data.menuName || '',
            menuRoute: data.menuRoute || '',
            sortValue: data.sortValue || 0,
            status: data.status !== undefined ? data.status : 1
          };
        } else {
          // 新建模式：重置表单
          this.resetForm();
        }
        
        this.dialogVisible = true;
      },
      
      handleClose() {
        this.dialogVisible = false;
        this.resetForm();
      },
      
      handleSubmit() {
        this.$refs.menuForm.validate((valid) => {
          if (valid) {
            // 这里处理提交逻辑
            const action = this.isEdit ? '更新' : '创建';
            console.log(`${action}菜单数据:`, this.form);
            this.$message.success(`${action}成功`);
            this.handleClose();
          } else {
            this.$message.error('请填写必填项');
            return false;
          }
        });
      },
      
      resetForm() {
        // 等待DOM更新后再重置表单
        this.$nextTick(() => {
          if (this.$refs.menuForm) {
            this.$refs.menuForm.resetFields();
          }
        });
        
        this.form = {
          menuCode: '',
          menuName: '',
          menuRoute: '',
          sortValue: 0,
          status: 1
        };
        this.isEdit = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .dialog-footer {
    text-align: right;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-input-number {
    width: 100%;
  }
  </style>
  
  