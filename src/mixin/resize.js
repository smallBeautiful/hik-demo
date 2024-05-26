import { debounce } from 'lodash'

export default {
  data() {
    return {
      interval: 100 // 默认值100，想要覆盖在vue文件中重新声明此值即可，会覆盖掉mixin的值
    }
  },
  created() {
    // 监听窗口大小变化，并使用防抖函数处理
    window.addEventListener('resize', this._handleResize(this.interval))
  },
  beforeDestroy() {
    // 在组件销毁前移除resize事件监听
    window.removeEventListener('resize', this._handleResize(this.interval))
  },
  methods: {
    // 使用lodash的debounce函数包裹窗口大小变化处理方法
    _handleResize: function(interval) {
      return debounce(() => {
        this.handleResize()
      }, interval)
    }
  }
}
