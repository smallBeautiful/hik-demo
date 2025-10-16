import { componentMap } from './components/form-components'

export default {
  name: 'ProForm',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    config: {
      type: Array,
      required: true
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    // 新增：只读状态 Prop
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(key, value) {
      this.$emit('input', {
        ...this.value,
        [key]: value
      })
    },

    /**
     * 新增：根据组件配置和当前值，获取只读状态下应显示的文本
     * @param {Object} itemConfig - 单个控件的配置
     */
    getReadonlyText(itemConfig) {
      const value = this.value[itemConfig.prop]
      const placeholder = '--' // 当值为空时显示的占位符

      // 处理空值情况
      if (value === null || value === undefined || value === '') {
        return placeholder
      }

      // 根据不同的组件类型，进行值的“翻译”
      switch (itemConfig.type) {
        // select 和 radio 需要从 options 中找到对应的 label
        case 'select':
        case 'radio': {
          const options = itemConfig.options || []
          const matchedOption = options.find(opt => opt.value === value)
          return matchedOption ? matchedOption.label : placeholder
        }

        // switch 需要将 boolean 值转换为可读文本
        case 'switch': {
          // 也可以通过 itemConfig.attrs 传入自定义的文本
          const activeText = itemConfig.attrs?.['active-text'] || '是'
          const inactiveText = itemConfig.attrs?.['inactive-text'] || '否'
          return value ? activeText : inactiveText
        }

        // 其他大部分组件直接显示值即可
        default:
          return String(value)
      }
    },

    renderFormControl(h, itemConfig) {
      // 核心判断：如果处于只读状态，则渲染文本
      if (this.readonly) {
        const displayText = this.getReadonlyText(itemConfig)
        // 使用一个 div 并添加 class，方便自定义样式
        return h('div', { class: 'pro-form-readonly-text' }, displayText)
      }

      // 非只读状态，保持原有逻辑
      const { type } = itemConfig
      const renderFn = componentMap[type]

      if (!renderFn) {
        console.warn(`ProForm Warning: No component found for type "${type}".`)
        return null
      }

      return renderFn(h, itemConfig, this.value, this.handleInput)
    },

    renderFormItem(h, itemConfig) {
      // 如果配置项标记为在只读状态下隐藏，则不渲染
      if (this.readonly && itemConfig.readonlyHide) {
        return null
      }

      return h(
        'el-form-item',
        {
          key: itemConfig.prop,
          props: {
            label: itemConfig.label,
            prop: itemConfig.prop
          }
        },
        [this.renderFormControl(h, itemConfig)]
      )
    }
  },

  render(h) {
    const formItems = this.config
      .map(itemConfig => this.renderFormItem(h, itemConfig))
      .filter(Boolean) // 过滤掉被隐藏的项 (返回 null 的项)

    return h(
      'el-form',
      {
        attrs: this.$attrs,
        on: this.$listeners,
        props: {
          model: this.value,
          rules: this.rules
        },
        ref: 'proForm'
      },
      [
        ...formItems,
        // 在只读模式下，不渲染操作按钮的插槽
        !this.readonly ? this.$slots.default : null
      ]
    )
  }
}
