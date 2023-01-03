<template>
  <div class="drag">
    <div ref="element" v-drag class="content" draggable="false" @click="handleClick" />
  </div>
</template>
<script >
export default {
  directives: {
    drag(el) {
      const oDiv = el // 当前元素
      // 禁止选择网页上的文字
      document.onselectstart = function() {
        return false
      }
      oDiv.onmousedown = function(e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - oDiv.offsetLeft
        const disY = e.clientY - oDiv.offsetTop
        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          const l = (e.clientX - disX)
          const t = e.clientY - disY
          // 移动当前元素
          oDiv.style.right = document.body.clientWidth - l - 150 + 'px'
          oDiv.style.top = t + 'px'
        }
        document.onmouseup = function(e) {
          console.log(e)
          document.onmousemove = null
          document.onmouseup = null
        }
        // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false
      }
    }
  },
  data() {
    return {
      flag: true
    }
  },
  methods: {
    handleClick() {
      if (this.flag) {
        console.log(2)
      } else {
        this.flag = true
      }
    }
  }
}
</script>
<style>
.drag{
  position: relative;
}
/* position:absolute;这个还是要设的，不然拖动块定不了位置 */
.content{
  position:absolute;
  height:100px;
  width:100px;
  right: 0;
  background-color: #67C23A;
  cursor: pointer;
}
</style>
