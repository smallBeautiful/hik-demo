/**
 * @file 存储所有表单控件的渲染函数
 */

// 统一处理 v-model 的逻辑
function createVModel(h, itemConfig, formModel, onInput) {
  return {
    props: {
      // 从 formModel 中读取当前的值
      value: formModel[itemConfig.prop],
      // 将 itemConfig.attrs 中定义的属性全部透传下去
      ...itemConfig.attrs
    },
    on: {
      // 当组件触发 input/change 事件时，调用 onInput 更新 formModel
      // 注意：不同组件的更新事件名可能不同，这里我们做些兼容
      input: (value) => onInput(itemConfig.prop, value), // for el-input, el-radio-group etc.
      change: (value) => onInput(itemConfig.prop, value) // for el-select etc.
    }
  }
}

export const componentMap = {
  /**
   * 渲染 el-input
   * @param {Function} h - render 函数的 h
   * @param {Object} itemConfig - 当前项的配置
   * @param {Object} formModel - 整个表单的数据模型
   * @param {Function} onInput - 数据更新的回调
   */
  input: (h, itemConfig, formModel, onInput) => {
    return h('el-input', createVModel(h, itemConfig, formModel, onInput))
  },

  /**
   * 渲染 el-input-number
   */
  number: (h, itemConfig, formModel, onInput) => {
    return h('el-input-number', createVModel(h, itemConfig, formModel, onInput))
  },

  /**
   * 渲染 el-select
   */
  select: (h, itemConfig, formModel, onInput) => {
    const children = (itemConfig.options || []).map(option => {
      return h('el-option', {
        props: {
          label: option.label,
          value: option.value,
          disabled: option.disabled
        }
      })
    })
    return h('el-select', createVModel(h, itemConfig, formModel, onInput), children)
  },

  /**
   * 渲染 el-radio-group
   */
  radio: (h, itemConfig, formModel, onInput) => {
    const children = (itemConfig.options || []).map(option => {
      return h('el-radio', {
        props: {
          label: option.value,
          disabled: option.disabled
        }
      }, option.label) // Radio 的文本是子节点
    })
    return h('el-radio-group', createVModel(h, itemConfig, formModel, onInput), children)
  },

  /**
   * 渲染 el-date-picker
   */
  datepicker: (h, itemConfig, formModel, onInput) => {
    // el-date-picker 的 value-format 属性很有用，建议在配置中指定
    return h('el-date-picker', createVModel(h, itemConfig, formModel, onInput))
  },

  /**
   * 渲染 el-switch
   */
  switch: (h, itemConfig, formModel, onInput) => {
    return h('el-switch', createVModel(h, itemConfig, formModel, onInput))
  }

  // ... 你可以在这里继续扩展其他组件，如 checkbox, cascader, timepicker 等
}
