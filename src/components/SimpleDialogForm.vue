<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
    >
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
      >
        <!-- 输入框 -->
        <el-input
          v-if="field.type === 'input'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder"
          :type="field.inputType || 'text'"
          :rows="field.rows"
        />
        
        <!-- 选择器 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder"
          style="width: 100%"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        
        <!-- 单选框组 -->
        <el-radio-group
          v-else-if="field.type === 'radio'"
          v-model="formData[field.prop]"
        >
          <el-radio
            v-for="option in field.options"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
        
        <!-- 日期选择器 -->
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="formData[field.prop]"
          :type="field.dateType || 'date'"
          :placeholder="field.placeholder"
          style="width: 100%"
          :format="field.format || 'yyyy-MM-dd'"
          :value-format="field.valueFormat || 'yyyy-MM-dd'"
        />
        
        <!-- 文本域 -->
        <el-input
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.prop]"
          type="textarea"
          :placeholder="field.placeholder"
          :rows="field.rows || 3"
        />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        {{ submitText }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'SimpleDialogForm',
  props: {
    // 弹窗标题
    title: {
      type: String,
      default: '表单'
    },
    // 弹窗宽度
    width: {
      type: String,
      default: '500px'
    },
    // 表单字段配置
    fields: {
      type: Array,
      default: () => [
        {
          prop: 'name',
          label: '名称',
          type: 'input',
          placeholder: '请输入名称',
          required: true
        }
      ]
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => ({})
    },
    // 标签宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 提交按钮文本
    submitText: {
      type: String,
      default: '确定'
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      dialogVisible: false,
      formData: {}
    }
  },
  
  watch: {
    fields: {
      handler() {
        this.initFormData()
      },
      immediate: true,
      deep: true
    }
  },
  
  methods: {
    // 初始化表单数据
    initFormData() {
      const data = {}
      this.fields.forEach(field => {
        data[field.prop] = field.defaultValue || ''
      })
      this.formData = data
    },
    
    // 显示弹窗
    show(data = {}) {
      this.formData = { ...this.initFormData(), ...data }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.clearValidate()
      })
    },
    
    // 隐藏弹窗
    hide() {
      this.dialogVisible = false
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
      this.dialogVisible = false
      this.$emit('cancel')
    },
    
    // 关闭弹窗
    handleClose() {
      this.$emit('close')
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

.el-form {
  padding: 0 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .el-dialog {
    width: 95% !important;
    margin: 0 auto;
  }
}
</style>
