<template>
  <div class="demo-container">
    <h2>数据驱动的 ProForm 组件 (含只读模式)</h2>

    <div class="readonly-switch">
      <label>只读模式：</label>
      <el-switch v-model="isReadonly" />
    </div>

    <el-card>
      <pro-form
        ref="myForm"
        v-model="formData"
        :config="formConfig"
        :rules="formRules"
        :readonly="isReadonly"
        label-width="120px"
      >
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </pro-form>
    </el-card>

    <div class="data-preview">
      <h3>表单数据实时预览:</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import ProForm from './../form/index.js'

export default {
  name: 'Demo',
  components: {
    ProForm
  },
  data() {
    return {
      // 新增：控制 ProForm 的只读状态
      isReadonly: false,

      formData: {
        name: '夏季新品发布会',
        region: 'shanghai', // 注意这里存的是 value
        delivery: true, // 注意这里存的是 boolean
        resource: '线上品牌商赞助',
        activityDate: '2025-08-26',
        score: 8
      },
      formConfig: [
        // ... formConfig 内容保持不变
        {
          type: 'input',
          label: '活动名称',
          prop: 'name',
          attrs: { placeholder: '请输入活动名称' }
        },
        {
          type: 'select',
          label: '活动区域',
          prop: 'region',
          attrs: { placeholder: '请选择活动区域', style: 'width: 100%;' },
          options: [
            { label: '上海', value: 'shanghai' },
            { label: '北京', value: 'beijing' },
            { label: '广州', value: 'guangzhou', disabled: true }
          ]
        },
        {
          type: 'datepicker',
          label: '活动时间',
          prop: 'activityDate',
          attrs: { type: 'date', placeholder: '选择日期', 'value-format': 'yyyy-MM-dd' }
        },
        {
          type: 'switch',
          label: '即时配送',
          prop: 'delivery',
          attrs: { 'active-text': '是', 'inactive-text': '否' }
        },
        {
          type: 'radio',
          label: '活动性质',
          prop: 'resource',
          options: [
            { label: '线上品牌商赞助', value: '线上品牌商赞助' },
            { label: '线下场地免费', value: '线下场地免费' }
          ]
        },
        {
          type: 'number',
          label: '活动评分',
          prop: 'score',
          attrs: { min: 0, max: 10 }
        }
      ],
      formRules: {
        // ... formRules 内容保持不变
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.myForm.$refs.proForm.validate((valid) => {
        if (valid) {
          alert('验证通过，提交成功!')
          console.log('Form Data:', this.formData)
        } else {
          console.log('验证失败!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.myForm.$refs.proForm.resetFields()
    }
  }
}
</script>

<style scoped>
/* ... 原有样式 ... */
.readonly-switch {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

/* 新增：为只读文本添加样式，使其看起来更像详情展示 */
.demo-container >>> .pro-form-readonly-text {
  line-height: 32px; /* 与表单控件高度对齐 */
  color: #606266;
  word-break: break-all;
}
</style>
