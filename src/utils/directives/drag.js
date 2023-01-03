/*
 * 拖拽指令
 */
export default {
  inserted(el) { // 这里的el是标签中的v-drag
    const positionParams = {
      x: 20,
      y: 105,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }
    el.addEventListener('touchstart', function(e) {
      positionParams.startX = e.touches[0].pageX
      positionParams.startY = e.touches[0].pageY
    })
    el.addEventListener('touchend', function(e) {
      positionParams.x = positionParams.endX
      positionParams.y = positionParams.endY
      positionParams.startX = 0
      positionParams.startY = 0
    })
    el.addEventListener('touchmove', function(e) {
      if (e.touches.length > 0) {
        const offsetX = e.touches[0].pageX - positionParams.startX
        const offsetY = e.touches[0].pageY - positionParams.startY
        let x = positionParams.x - offsetX
        let y = positionParams.y - offsetY
        if (x + el.offsetWidth > document.documentElement.offsetWidth) {
          x = document.documentElement.offsetWidth - el.offsetWidth
        }
        if (y + el.offsetHeight > document.documentElement.offsetHeight) {
          y = document.documentElement.offsetHeight - el.offsetHeight
        }
        if (x < 0) { x = 0 }
        if (y < 0) { y = 0 }
        el.style.right = x + 'px'
        el.style.bottom = y + 'px'
        positionParams.endX = x
        positionParams.endY = y
        e.preventDefault()
      }
    })
  }
}
