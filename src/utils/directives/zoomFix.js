// Vue.directive('zoomFix', {
//   // 当被绑定的元素插入到DOM中时
//
// })

export default {
  inserted: function(element, binding, vnode) {
    element.getBoundingClientRectBak = element.getBoundingClientRect
    element.getBoundingClientRect = function() {
      const rect = element.getBoundingClientRectBak()

      const zoom = window.getComputedStyle(document.body).zoom
      const scrollTop = document.documentElement.scrollTop
      const scrollLeft = document.documentElement.scrollLeft
      const offsetScrollTop = scrollTop - (scrollTop / zoom)
      const offsetScrollLeft = scrollLeft - (scrollLeft / zoom)

      return new DOMRect(rect.x - offsetScrollLeft, rect.y - offsetScrollTop, rect.width, rect.height)
    }
  }
}
