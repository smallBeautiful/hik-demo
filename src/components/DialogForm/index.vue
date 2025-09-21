<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :close-on-click-modal="false"
    @close="handleClose"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <slot :formData="formData" :isEdit="isEdit">
        <!-- 默认表单内容 -->
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
      </slot>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        {{ isEdit ? '更新' : '确定' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogForm',
  inheritAttrs: false,
  props: {
    // 弹窗标题
    title: {
      type: String,
      default: '表单'
    },
    // 弹窗宽度
    width: {
      type: String,
      default: '600px'
    },
    // 表单数据
    value: {
      type: Object,
      default: () => ({})
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => ({})
    },
    // 是否为编辑模式
    isEdit: {
      type: Boolean,
      default: false
    },
    // 标签宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 标签位置
    labelPosition: {
      type: String,
      default: 'right'
    },
    // 提交按钮加载状态
    loading: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      visible: false,
      formData: {}
    }
  },
  
  watch: {
    value: {
      handler(newVal) {
        this.formData = { ...newVal }
      },
      immediate: true,
      deep: true
    },
    
    visible(newVal) {
      if (newVal) {
        this.formData = { ...this.value }
        this.$nextTick(() => {
          this.clearValidate()
        })
      }
    }
  },
  
  methods: {
    // 显示弹窗
    show() {
      this.visible = true
    },
    
    // 隐藏弹窗
    hide() {
      this.visible = false
    },
    
    // 提交表单
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          this.$message.error('请检查表单信息')
          return false
        }
      })
    },
    
    // 取消
    handleCancel() {
      this.visible = false
      this.$emit('cancel')
    },
    
    // 关闭弹窗
    handleClose() {
      this.$emit('close')
    },
    
    // 重置表单
    resetForm() {
      this.formData = { ...this.value }
      this.clearValidate()
    },
    
    // 清除验证
    clearValidate() {
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
      })
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

/* 表单样式优化 */
.el-form {
  padding: 0 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-dialog {
    width: 95% !important;
    margin: 0 auto;
  }
}
</style>
