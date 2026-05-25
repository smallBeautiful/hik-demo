<template>
  <div class="app-container">
    <el-alert title="el-form 表单校验演示" type="info" :closable="false" style="margin-bottom:20px" />

    <el-tabs v-model="activeTab" type="border-card">
      <!-- ==================== 基础校验 ==================== -->
      <el-tab-pane label="基础校验" name="basic">
        <el-form ref="basicForm" :model="basicForm" :rules="basicRules" label-width="110px" style="max-width:600px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="basicForm.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="basicForm.phone" placeholder="请输入11位手机号" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="basicForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input-number v-model="basicForm.age" :min="0" :max="150" placeholder="请输入年龄" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="basicForm.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('basicForm')">提交</el-button>
            <el-button @click="resetForm('basicForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- ==================== 自定义 & 异步校验 ==================== -->
      <el-tab-pane label="自定义 & 异步校验" name="custom">
        <el-form ref="customForm" :model="customForm" :rules="customRules" label-width="110px" style="max-width:600px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="customForm.username" placeholder="4-16位字母数字下划线" />
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="customForm.idCard" placeholder="请输入18位身份证号" />
          </el-form-item>
          <el-form-item label="自定义编号" prop="code">
            <el-input v-model="customForm.code" placeholder="公司内部编号规则" />
            <span slot="label">
              自定义编号
              <el-tooltip content="格式: 大写字母开头 + 4位数字，例如 A0001" placement="top">
                <i class="el-icon-question" />
              </el-tooltip>
            </span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('customForm')">提交</el-button>
            <el-button @click="resetForm('customForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- ==================== 联动 & 动态校验 ==================== -->
      <el-tab-pane label="联动 & 动态表单" name="dynamic">
        <el-form ref="dynamicForm" :model="dynamicForm" :rules="dynamicRules" label-width="110px" style="max-width:600px">
          <el-form-item label="密码" prop="password">
            <el-input v-model="dynamicForm.password" type="password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input v-model="dynamicForm.confirmPwd" type="password" show-password placeholder="请再次输入密码" />
          </el-form-item>

          <el-divider>家庭成员（动态增减）</el-divider>

          <div v-for="(item, index) in dynamicForm.members" :key="index" style="margin-bottom:12px">
            <el-row :gutter="12">
              <el-col :span="9">
                <el-form-item
                  :prop="`members.${index}.name`"
                  :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
                  label="姓名"
                  label-width="60px"
                >
                  <el-input v-model="item.name" placeholder="姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item
                  :prop="`members.${index}.relation`"
                  :rules="[{ required: true, message: '必填', trigger: 'change' }]"
                  label="关系"
                  label-width="60px"
                >
                  <el-select v-model="item.relation" placeholder="选择关系" style="width:100%">
                    <el-option label="配偶" value="spouse" />
                    <el-option label="子女" value="child" />
                    <el-option label="父母" value="parent" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button v-if="dynamicForm.members.length > 1" type="danger" icon="el-icon-delete" circle size="small" @click="removeMember(index)" />
              </el-col>
            </el-row>
          </div>
          <el-form-item>
            <el-button type="text" icon="el-icon-plus" @click="addMember">添加家庭成员</el-button>
          </el-form-item>

          <el-divider />
          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicForm')">提交</el-button>
            <el-button @click="resetForm('dynamicForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- ==================== 完整表单 ==================== -->
      <el-tab-pane label="综合示例" name="full">
        <el-form ref="fullForm" :model="fullForm" :rules="fullRules" label-width="110px" style="max-width:700px">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="fullForm.projectName" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="项目类型" prop="type">
            <el-select v-model="fullForm.type" placeholder="请选择" style="width:100%">
              <el-option label="前端项目" value="frontend" />
              <el-option label="后端服务" value="backend" />
              <el-option label="数据平台" value="data" />
            </el-select>
          </el-form-item>
          <el-form-item label="起止日期" prop="dateRange">
            <el-date-picker
              v-model="fullForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label="负责人" prop="owner">
            <el-input v-model="fullForm.owner" placeholder="请输入负责人" />
          </el-form-item>
          <el-form-item label="预算金额" prop="budget">
            <el-input-number v-model="fullForm.budget" :min="0" :precision="2" :controls="false" style="width:200px" placeholder="请输入金额" />
            <span style="margin-left:8px;color:#909399">万元</span>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <el-rate v-model="fullForm.priority" :max="3" :texts="['低', '中', '高']" show-text style="margin-top:6px" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="fullForm.remark" type="textarea" :rows="3" placeholder="请输入项目备注" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('fullForm')">提交</el-button>
            <el-button @click="resetForm('fullForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <!-- 校验结果 -->
    <el-card v-if="submitResult" class="result-card" shadow="hover">
      <div slot="header"><span>提交结果</span></div>
      <pre>{{ submitResult }}</pre>
    </el-card>
  </div>
</template>

<script>
// ---- 工具函数：模拟异步校验 ----
function checkUsername(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (['admin', 'root', 'test'].includes(username)) {
        reject(new Error('该用户名已被占用'))
      } else {
        resolve()
      }
    }, 800)
  })
}

export default {
  name: 'FormValidationDemo',
  data() {
    // ---- 身份证校验 ----
    const validateIdCard = (rule, value, callback) => {
      const reg = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
      if (!value) return callback(new Error('请输入身份证号'))
      if (!reg.test(value)) return callback(new Error('身份证号格式不正确'))
      callback()
    }

    // ---- 自定义编号校验 ----
    const validateCode = (rule, value, callback) => {
      if (!value) return callback(new Error('请输入编号'))
      if (!/^[A-Z]\d{4}$/.test(value)) return callback(new Error('格式: 1位大写字母 + 4位数字，例 A0001'))
      callback()
    }

    // ---- 确认密码校验 ----
    const validateConfirmPwd = (rule, value, callback) => {
      if (!value) return callback(new Error('请再次输入密码'))
      if (value !== this.dynamicForm.password) return callback(new Error('两次输入的密码不一致'))
      callback()
    }

    return {
      activeTab: 'basic',
      submitResult: null,

      // ===== 基础校验 =====
      basicForm: { name: '', phone: '', email: '', age: undefined, gender: '' },
      basicRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度 2-20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', min: 18, max: 65, message: '年龄需在 18-65 之间', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },

      // ===== 自定义 & 异步校验 =====
      customForm: { username: '', idCard: '', code: '' },
      customRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z]\w{3,15}$/, message: '字母开头，4-16位字母数字下划线', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (!value) return callback()
              checkUsername(value).then(() => callback()).catch(err => callback(err))
            }, trigger: 'blur' }
        ],
        idCard: [
          { required: true, validator: validateIdCard, trigger: 'blur' }
        ],
        code: [
          { required: true, validator: validateCode, trigger: 'blur' }
        ]
      },

      // ===== 联动 & 动态表单 =====
      dynamicForm: {
        password: '',
        confirmPwd: '',
        members: [{ name: '', relation: '' }]
      },
      dynamicRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度 6-20 位', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, validator: validateConfirmPwd, trigger: 'blur' }
        ]
      },

      // ===== 综合示例 =====
      fullForm: { projectName: '', type: '', dateRange: null, owner: '', budget: undefined, priority: 0, remark: '' },
      fullRules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
        dateRange: [
          { required: true, message: '请选择起止日期', trigger: 'change' },
          { validator: (rule, value, callback) => {
              if (value && value.length === 2) {
                const diff = (new Date(value[1]) - new Date(value[0])) / 86400000
                if (diff < 1) return callback(new Error('结束日期必须晚于开始日期'))
                if (diff > 365) return callback(new Error('跨度不能超过一年'))
              }
              callback()
            }, trigger: 'change' }
        ],
        owner: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        budget: [
          { required: true, message: '请输入预算金额', trigger: 'blur' },
          { type: 'number', min: 0.01, message: '预算必须大于 0', trigger: 'blur' }
        ],
        priority: [
          { required: true, message: '请设置优先级', trigger: 'change' },
          { validator: (rule, value, callback) => {
              if (value < 1) return callback(new Error('请至少评为 1 星'))
              callback()
            }, trigger: 'change' }
        ],
        remark: [
          { max: 300, message: '备注不超过 300 字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formRef) {
      this.$refs[formRef].validate(valid => {
        if (valid) {
          this.submitResult = JSON.stringify(this[formRef === 'basicForm' ? 'basicForm' : formRef === 'customForm' ? 'customForm' : formRef === 'dynamicForm' ? 'dynamicForm' : 'fullForm'], null, 2)
          this.$message.success('校验通过')
        } else {
          if (this._warnMsg) this._warnMsg.close()
          this._warnMsg = this.$message.warning('校验未通过，请检查红色标记字段')
        }
      })
    },
    resetForm(formRef) {
      this.$refs[formRef].resetFields()
      if (formRef === 'dynamicForm') {
        this.dynamicForm.members = [{ name: '', relation: '' }]
      }
      this.submitResult = null
    },
    addMember() {
      this.dynamicForm.members.push({ name: '', relation: '' })
    },
    removeMember(index) {
      this.dynamicForm.members.splice(index, 1)
    }
  }
}
</script>

<style scoped>
/deep/ .is-error:first-of-type .el-form-item__error {
  animation: error-shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@keyframes error-shake {
  0%, 100% { transform: translateX(0); }
  10%, 50%, 90% { transform: translateX(-4px); }
  30%, 70% { transform: translateX(4px); }
}
.result-card {
  margin-top: 20px;
  max-width: 700px;
}
.result-card pre {
  margin: 0;
  font-size: 13px;
  color: #303133;
  background: #f5f7fa;
  padding: 14px;
  border-radius: 6px;
}
</style>
