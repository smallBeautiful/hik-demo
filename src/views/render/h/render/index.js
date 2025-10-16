export const demoRender = {
  // 1. 标记为函数式组件
  functional: true,

  // 2. Props 定义保持不变
  props: {
    level: {
      type: [String, Number],
      required: true,
      validator: v => Number(v) >= 1 && Number(v) <= 6
    }
  },
  // 3. render 函数的参数不同
  // 没有 `this`，第二个参数是 `context` 对象
  render(h, context) {
    // const headingId = context.props.level
    const tag = `h${context.props.level}`

    // 从 context.children 获取子节点
    const children = context.children

    // 从 context.data 获取所有传入的属性和事件
    const data = context.data

    return h(tag, data, children)
  }
}

export const inputRender = {
  // 1. 标记为函数式组件
  functional: true,
  // 2. Props 定义保持不变
  // 如何绑定外层数据？
  // props: {
  //   value: ''
  // },
  // 3. render 函数的参数不同
  // 没有 `this`，第二个参数是 `context` 对象
  render(h, context) {
    console.log(context.data.attrs)
    return h('el-input', {
      class: 'h-input',
      style: 'width: 200px;',
      props: {
        value: context.data.attrs['form-data'].value
      },
      on: {
        input(val) {
          context.data.attrs['form-data'].value = val
        }
      }
    }, '')
  }
}
