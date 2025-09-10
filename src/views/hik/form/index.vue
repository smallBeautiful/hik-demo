<template>
  <div class="app-container">
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="dynamicValidateForm.email" />
      </el-form-item>
      <el-form-item
        prop="email2"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ]"
      >
        <el-input v-model="dynamicValidateForm.email2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置1</el-button>
      </el-form-item>
    </el-form>1
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: '',
        email2: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
