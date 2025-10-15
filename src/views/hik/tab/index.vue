<template>
  <div class="receiving-registration">
    <!-- 页面标题和操作按钮 -->
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">收货登记</h2>
        <el-link type="primary" class="tab-link">引用申请单录入</el-link>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleSave">保存</el-button>
      </div>
    </div>

    <!-- 表单内容 -->
    <el-form 
      :model="formData" 
      :rules="rules" 
      ref="receivingForm" 
      label-width="100px"
      class="receiving-form"
    >
      <el-row :gutter="20">
        <!-- 第一列 -->
        <el-col :span="8">
          <el-form-item label="返修类型" prop="repairType" required>
            <el-radio-group v-model="formData.repairType">
              <el-radio label="company">公司返修</el-radio>
              <el-radio label="individual">个人返修</el-radio>
              <el-radio label="internal">内部送检</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="接修方式" prop="receivingMethod" required>
            <el-select v-model="formData.receivingMethod" placeholder="请选择" style="width: 100%">
              <el-option label="上门取件" value="pickup"></el-option>
              <el-option label="邮寄" value="mail"></el-option>
              <el-option label="自送" value="self"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="快递单号" prop="expressNumber" required>
            <el-input v-model="formData.expressNumber" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="返回方式" prop="returnMethod" required>
            <el-radio-group v-model="formData.returnMethod">
              <el-radio label="original">原路返回</el-radio>
              <el-radio label="non-original">非原路返回</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="返回地址" prop="returnAddress" required>
            <el-row :gutter="10">
              <el-col :span="16">
                <el-select v-model="formData.returnAddress" placeholder="请选择" style="width: 100%">
                  <el-option label="北京市朝阳区" value="beijing"></el-option>
                  <el-option label="上海市浦东新区" value="shanghai"></el-option>
                  <el-option label="深圳市南山区" value="shenzhen"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-button size="small" @click="showReturnAddressDetail">详细地址</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <!-- 第二列 -->
        <el-col :span="8">
          <el-form-item label="联系人" prop="contactPerson" required>
            <el-input v-model="formData.contactPerson" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="快递公司" prop="expressCompany" required>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input v-model="formData.expressCompany" placeholder="请输入"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button size="small" icon="el-icon-search" @click="searchExpressCompany"></el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="联系人" prop="returnContact" required>
            <el-select v-model="formData.returnContact" placeholder="请选择" style="width: 100%">
              <el-option label="张三" value="zhangsan"></el-option>
              <el-option label="李四" value="lisi"></el-option>
              <el-option label="王五" value="wangwu"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="客户地址" prop="customerAddress" required>
            <el-row :gutter="10">
              <el-col :span="16">
                <el-select v-model="formData.customerAddress" placeholder="请选择" style="width: 100%">
                  <el-option label="北京市海淀区" value="beijing_haidian"></el-option>
                  <el-option label="上海市徐汇区" value="shanghai_xuhui"></el-option>
                  <el-option label="深圳市福田区" value="shenzhen_futian"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-button size="small" @click="showCustomerAddressDetail">详细地址</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="收货备注">
            <el-input 
              v-model="formData.remarks" 
              type="textarea" 
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- 第三列 -->
        <el-col :span="8">
          <el-form-item label="联系电话" prop="contactPhone" required>
            <el-input v-model="formData.contactPhone" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="送修单位" prop="repairUnit" required>
            <el-input v-model="formData.repairUnit" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="联系电话" prop="returnPhone" required>
            <el-input v-model="formData.returnPhone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 详细地址弹窗 -->
    <el-dialog
      title="详细地址"
      :visible.sync="addressDialogVisible"
      width="600px"
    >
      <el-form :model="addressForm" label-width="80px">
        <el-form-item label="详细地址">
          <el-input 
            v-model="addressForm.detailAddress" 
            type="textarea" 
            :rows="4"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddress">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ReceivingRegistration',
  data() {
    return {
      formData: {
        repairType: '', // 返修类型
        receivingMethod: '', // 接修方式
        expressNumber: '', // 快递单号
        returnMethod: '', // 返回方式
        returnAddress: '', // 返回地址
        contactPerson: '', // 联系人
        expressCompany: '', // 快递公司
        returnContact: '', // 返回联系人
        customerAddress: '', // 客户地址
        remarks: '', // 收货备注
        contactPhone: '', // 联系电话
        repairUnit: '', // 送修单位
        returnPhone: '' // 返回联系电话
      },
      addressDialogVisible: false,
      addressForm: {
        detailAddress: ''
      },
      rules: {
        repairType: [
          { required: true, message: '请选择返修类型', trigger: 'change' }
        ],
        receivingMethod: [
          { required: true, message: '请选择接修方式', trigger: 'change' }
        ],
        expressNumber: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
        returnMethod: [
          { required: true, message: '请选择返回方式', trigger: 'change' }
        ],
        returnAddress: [
          { required: true, message: '请选择返回地址', trigger: 'change' }
        ],
        contactPerson: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        expressCompany: [
          { required: true, message: '请输入快递公司', trigger: 'blur' }
        ],
        returnContact: [
          { required: true, message: '请选择联系人', trigger: 'change' }
        ],
        customerAddress: [
          { required: true, message: '请选择客户地址', trigger: 'change' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        repairUnit: [
          { required: true, message: '请输入送修单位', trigger: 'blur' }
        ],
        returnPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    handleSubmit() {
      this.$refs.receivingForm.validate((valid) => {
        if (valid) {
          this.$message.success('提交成功！');
          console.log('提交数据:', this.formData);
          // 这里可以调用API提交数据
        } else {
          this.$message.error('请检查表单信息！');
        }
      });
    },
    
    // 保存表单
    handleSave() {
      this.$refs.receivingForm.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功！');
          console.log('保存数据:', this.formData);
          // 这里可以调用API保存数据
        } else {
          this.$message.error('请检查表单信息！');
        }
      });
    },
    
    // 显示返回地址详细地址
    showReturnAddressDetail() {
      this.addressDialogVisible = true;
      this.addressForm.detailAddress = this.formData.returnAddressDetail || '';
    },
    
    // 显示客户地址详细地址
    showCustomerAddressDetail() {
      this.addressDialogVisible = true;
      this.addressForm.detailAddress = this.formData.customerAddressDetail || '';
    },
    
    // 确认地址
    confirmAddress() {
      this.addressDialogVisible = false;
      // 这里可以根据需要保存详细地址
    },
    
    // 搜索快递公司
    searchExpressCompany() {
      this.$message.info('搜索快递公司功能');
      // 这里可以实现搜索快递公司的逻辑
    }
  }
}
</script>

<style scoped>
.receiving-registration {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.page-title {
  margin: 0 20px 0 0;
  color: #303133;
  font-size: 20px;
  font-weight: 500;
}

.tab-link {
  font-size: 14px;
}

.header-right {
  display: flex;
  gap: 10px;
}

.receiving-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item__label {
  font-weight: 500;
  color: #606266;
}

.el-radio-group {
  width: 100%;
}

.el-radio {
  margin-right: 20px;
}

.dialog-footer {
  text-align: right;
}

/* 必填字段标识 */
.el-form-item.is-required .el-form-item__label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
</style>
