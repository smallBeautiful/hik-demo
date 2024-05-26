import { debounce } from 'lodash'

export default {
  created() {
    // 监听窗口大小变化，并使用防抖函数处理
    window.addEventListener('resize', this._handleResize)
  },
  beforeDestroy() {
    // 在组件销毁前移除resize事件监听
    window.removeEventListener('resize', this._handleResize)
  },
  methods: {
    // 使用lodash的debounce函数包裹窗口大小变化处理方法
    _handleResize: debounce(function() {
      this.handleResize()
    }, 100)
  }
}
