<template>
  <el-select
    v-model="localSelected"
    :multiple="multiple"
    :filterable="filterable"
    :allow-create="allowCreate"
    :placeholder="placeholder"
    :disabled="disabled"
    default-first-option
    style="width: 100%"
    @change="handleChange"
    @blur="handleBlur"
    @remove-tag="handleRemoveTag"
  >
    <!-- 全选选项（第一行） -->
    <div
      class="select-all"
      :class="{'half-selected': isPartialSelection}"
      value="select-all"
    >
      <el-checkbox
        v-model="isAllSelected"
        :indeterminate="isPartialSelection"
        @change="toggleSelectAll"
      >
        全选（{{ localSelected.length }}/{{ localOptions.length }}）
      </el-checkbox>
    </div>

    <!-- 普通选项 -->
    <el-option
      v-for="item in localOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span>
        <i v-if="localSelected.includes(item.value)" class="el-icon-check" />
        {{ item.label }}
      </span>
      <span v-if="item.isNew" class="new-tag">新添加</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    allowCreate: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localSelected: [...this.value],
      localOptions: [...this.options]
    }
  },
  computed: {
    // 计算是否全选
    isAllSelected: {
      get() {
        return this.localSelected.length === this.localOptions.length &&
          this.localOptions.length > 0
      },
      set(value) {
        if (value) {
          this.localSelected = this.localOptions.map(opt => opt.value)
        } else {
          this.localSelected = []
        }
        this.emitChange()
      }
    },

    // 计算是否部分选择
    isPartialSelection() {
      return this.localSelected.length > 0 &&
        this.localSelected.length < this.localOptions.length
    }
  },
  watch: {
    value(newVal) {
      this.localSelected = [...newVal]
    },
    options(newVal) {
      this.localOptions = [...newVal]
    }
  },
  methods: {
    // 添加新选项
    addNewOption(value) {
      if (!value || this.localOptions.some(opt => opt.value === value)) {
        return
      }

      const newOption = {
        value: value,
        label: value,
        isNew: true
      }

      this.localOptions.push(newOption)
      this.$emit('add-new', value)

      if (!this.localSelected.includes(value)) {
        this.localSelected.push(value)
        this.emitChange()
      }
    },

    // 处理选择变化
    handleChange(values) {
      // 检查新增的值
      const lastValue = values[values.length - 1]
      if (lastValue && !this.localOptions.some(opt => opt.value === lastValue)) {
        this.addNewOption(lastValue)
      } else {
        this.localSelected = [...values]
        this.emitChange()
      }
    },

    // 处理失去焦点事件
    handleBlur(event) {
      const inputValue = event.target.value.trim()
      if (inputValue && !this.localOptions.some(opt => opt.value === inputValue)) {
        this.addNewOption(inputValue)
        event.target.value = ''
      }
    },

    // 处理移除标签事件
    handleRemoveTag(tag) {
      // 查找被移除的选项
      const option = this.localOptions.find(opt => opt.value === tag)

      if (option && option.isNew) {
        // 从options中移除
        const index = this.localOptions.findIndex(opt => opt.value === tag)
        if (index !== -1) {
          this.localOptions.splice(index, 1)
          this.$emit('remove-new', tag)
        }
      }

      // 从选中值中移除
      const selectedIndex = this.localSelected.indexOf(tag)
      if (selectedIndex !== -1) {
        this.localSelected.splice(selectedIndex, 1)
        this.emitChange()
      }
    },

    // 切换全选状态
    toggleSelectAll() {
      // 计算属性会自动更新
    },

    // 触发change事件
    emitChange() {
      this.$emit('input', [...this.localSelected])
      this.$emit('change', [...this.localSelected])
    },

    // 外部添加选项的方法
    addOption(value, label = value, isNew = true) {
      if (!this.localOptions.some(opt => opt.value === value)) {
        this.localOptions.push({
          value: value,
          label: label,
          isNew: isNew
        })
        return true
      }
      return false
    },

    // 外部移除选项的方法
    removeOption(value) {
      // 从选项中移除
      const optionIndex = this.localOptions.findIndex(opt => opt.value === value)
      if (optionIndex !== -1) {
        const removed = this.localOptions.splice(optionIndex, 1)[0]

        // 如果选项是新增的，触发remove-new事件
        if (removed.isNew) {
          this.$emit('remove-new', value)
        }
      }

      // 从选中值中移除
      const selectedIndex = this.localSelected.indexOf(value)
      if (selectedIndex !== -1) {
        this.localSelected.splice(selectedIndex, 1)
        this.emitChange()
      }
    }
  }
}
</script>
