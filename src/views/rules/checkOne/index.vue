<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age" @input="change" />
    </el-form-item>
    <el-form-item label="年龄2" prop="age2">
      <el-input v-model.number="ruleForm.age2" @input="change" />
    </el-form-item>
    <el-form-item label="年龄3" prop="age3">
      <el-input v-model.number="ruleForm.age3" @input="change" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!this.ruleForm.age && !this.ruleForm.age2 && !this.ruleForm.age3) {
        return callback(new Error('至少选择一项'))
      } else {
        callback()
      }
      // if (!value) {
      //   return callback(new Error('年龄不能为空'))
      // }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入数字值'))
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('必须年满18岁'))
      //     } else {
      //       callback()
      //     }
      //   }
      // }, 1000)
    }
    return {
      ruleForm: {
        age: '',
        age2: '',
        age3: ''
      },
      rules: {
        age: [{ validator: checkAge, trigger: 'input' }],
        age2: [{ validator: checkAge, trigger: 'input' }],
        age3: [{ validator: checkAge, trigger: 'input' }]
      }
    }
  },
  mounted() {
    // setInterval(() => {
    //   console.log(1111)
    //   this.$refs.ruleForm.validate()
    // }, 5000)
  },
  methods: {
    change() {
      this.$refs.ruleForm.validate('age')
      this.$refs.ruleForm.validate('age2')
      this.$refs.ruleForm.validate('age3')
      //   => {
      //   console.log(valid)
      //   if (valid) {
      //     console.log(1111111)
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    submitForm(formName) {
      this.$refs.ruleForm.validate((valid) => {
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
