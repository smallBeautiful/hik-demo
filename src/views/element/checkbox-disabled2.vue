<!--checkbox禁止点击-->
<template>
  <div class="app-container">
    <el-popover
      placement="right"
      width="400"
      trigger="hover"
    >
      <span class="check-container">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <span v-for="(city, index) in cities" :key="city" style="margin-right: 20px" class="check-container">
            <span v-if="!disabled[index]" class="check-disabled" @click="checkboxDisable" />
            <el-checkbox :label="city">{{ city }}</el-checkbox>
          </span>
        </el-checkbox-group>
      </span>
      <span slot="reference" class="check-container">
        <span v-show="!disabledAll" class="check-disabled" @click="checkboxDisable" />
        <el-checkbox slot="reference" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      </span>
    </el-popover>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
const disabled = [true, false, false, false, false]
const disabledAll = false
export default {
  name: 'CheckboxDisabled',
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      disabled: disabled,
      disabledAll: disabledAll,
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    checkboxDisable() {
      this.$message.info('不能为空')
    }
  }
}
</script>

<style scoped lang="scss">
.check-container {
  position: relative;
  width: 100%;
  height: 20px;
  font-size: 14px;
}
.check-disabled {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: transparent;
  z-index: 2;
  height: 20px;
  cursor: pointer;
}
</style>
