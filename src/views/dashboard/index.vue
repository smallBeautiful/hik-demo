<template>
  <div class="dashboard-container">
    <el-button @click="open" type="primary" style="margin-left: 16px;">
      点我打开
    </el-button>
<!--    <div id="e1" class="element element_1"></div>-->
<!--    <div id="e2" class="element element_2"></div>-->
<!--    <div id="e3" class="element element_3"></div>-->
<!--    <div id="e4" class="element element_4"></div>-->
<!--    <div id="e5" class="element element_5"></div>-->
    <drawer ref="drawer"/>
    <div class="box">
      <div v-for="item in list" :key="item.id" class="item" :style="{ top: item.top, left: item.left }">
        <div class="decoration" />
        <div class="text" :style="{ transform: 0 }"> {{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import drawer from './drawer'
export default {
  name: 'Dashboard',
  components: {
    drawer
  },
  mounted() {
    this.list.forEach(item => {
      const width = this.calculateWidth(item.name)
      const num = (width > 90 ? 90 : width) / 2
      item.transform = `translate(${num}px, 0)`
    })
    this.$nextTick(() => {
      const domList = document.getElementsByClassName('item')
      const list = Array.from(domList)
      list.forEach(item => {
        console.log(item.children[0], item.children[1])
        this.drawLine(item.children[0], item.children[1])
      })
      // this.drawLine(document.getElementById('e1'), document.getElementById('e4'))
      // this.drawLine(document.getElementById('e1'), document.getElementById('e5'))
      // this.drawLine(document.getElementById('e2'), document.getElementById('e3'))
      // this.drawLine(document.getElementById('e2'), document.getElementById('e5'))
      // this.drawLine(document.getElementById('e3'), document.getElementById('e4'))
      // this.fixPosition()
      // this.handleLine()
    })
  },
  data() {
    return {
      list: [
        { transform: 0, left: '40%', top: '31%', id: 1, name: '你好啊' },
        { transform: 0, left: '45%', top: '30%', id: 2, name: '你好啊的撒旦飒飒的' },
        { transform: 0, left: '46%', top: '35%', id: 3, name: '你好啊' },
        { transform: 0, left: '49%', top: '39%', id: 4, name: '你好啊的撒旦飒飒的' },
        { transform: 0, left: '52%', top: '55%', id: 5, name: '你' },
        { transform: 0, left: '60%', top: '30%', id: 6, name: '你好啊的撒旦飒飒的' }
      ]
    }
  },
  methods: {
    open() {
      this.$refs.drawer.open()
    },
    drawLine(obj1, obj2) {
      // 起点坐标
      var x1 = obj1.getBoundingClientRect().left + obj1.clientWidth / 2
      var y1 = obj1.getBoundingClientRect().top + obj1.clientHeight / 2

      // 终点坐标
      var x2 = obj2.getBoundingClientRect().left + obj2.clientWidth / 2
      var y2 = obj2.getBoundingClientRect().top + obj2.clientHeight / 2

      // 计算连接线长度
      var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))

      // 计算连接线旋转弧度值
      var rad = Math.atan2((y2 - y1), (x2 - x1))

      // 连接线未旋转前，起点坐标计算
      var top = (y1 + y2) / 2
      var left = (x1 + x2) / 2 - length / 2

      // 创建连接线 dom 节点，并设置样式
      var line = document.createElement('div')
      var style = 'position: absolute; background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);\n' +
        'background-size: 8px 1px;\n' +
        'background-repeat: repeat-x; height: 1px; top:' +
        top + 'px; left:' + left + 'px; width: ' + length + 'px; transform: rotate(' + rad + 'rad);'
      line.setAttribute('style', style)
      document.body.appendChild(line)
    },
    connectPoints(point1, point2, line) {
      const dx = point2.offsetLeft - point1.offsetLeft
      const dy = point2.offsetTop - point1.offsetTop
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * 180 / Math.PI
      line.style.width = distance + 'px'
      line.style.top = (point1.offsetTop + point1.offsetHeight / 2 - line.offsetHeight / 2) + 'px'
      line.style.left = (point1.offsetLeft + point1.offsetWidth / 2) + 'px'
      line.style.transform = 'rotate(' + angle + 'deg)'
    },
    handleLine() {
      const point1 = document.getElementById('point1')
      const point2 = document.getElementById('point2')
      const line = document.getElementById('line')
      this.connectPoints(point1, point2, line)
    },
    fixPosition() {
      const doms = document.getElementsByClassName('text')
      const domList = Array.from(doms)
      domList.forEach((item, index) => {
        console.log(index)
        if (domList[index] && domList[index + 1]) {
          if (this.checkOverlap(domList[index], domList[index + 1])) {
            console.log(domList[index], domList[index + 1])
            // 计算不重叠的位置并移动元素2
            this.calculateNonOverlapPosition(domList[index], domList[index + 1])
          }
        }
      })
    },
    calculateWidth(text) {
      // 创建一个临时的span元素
      const span = document.createElement('span')
      // 将文本内容设置为span的innerText
      span.innerText = text
      // 设置span的样式，这里可以根据你的需要调整样式
      span.style.visibility = 'hidden'
      span.style.whiteSpace = 'nowrap'
      span.style.position = 'absolute'
      // 将span元素添加到body中，这样才能够计算其宽度
      document.body.appendChild(span)
      // 获取span元素的宽度
      const width = span.offsetWidth
      // 移除临时的span元素
      document.body.removeChild(span)
      // 返回宽度值
      return width
    },
    checkOverlap(element1, element2) {
      // 获取元素1的位置和尺寸信息
      const rect1 = element1.getBoundingClientRect()
      // 获取元素2的位置和尺寸信息
      const rect2 = element2.getBoundingClientRect()

      // 判断两个元素是否重叠
      return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom)
    },
    calculateNonOverlapPosition(element1, element2) {
      // 获取元素1的位置和尺寸信息
      const rect1 = element1.getBoundingClientRect()
      // 获取元素2的位置和尺寸信息
      // const rect2 = element2.getBoundingClientRect()

      // 如果元素重叠，计算不重叠的位置
      if (this.checkOverlap(element1, element2)) {
        // 移动元素2到元素1的右侧
        const newLeft = rect1.right + 10 // 假设间隔为10像素
        // 设置新位置
        element2.style.left = newLeft + 'px'
      }
    }

  }
}
</script>

<style lang="scss">
.element { position: absolute; width: 50px; height: 50px; border-radius: 25px; background-color: yellow; }
.element_1 { top: 100px; left: 175px; }
.element_2 { top: 175px; left: 75px; }
.element_3 { top: 175px; left: 275px; }
.element_4 { top: 300px; left: 100px; }
.element_5 { top: 300px; left: 250px; }
.line {
  position: absolute;
  border-bottom: 2px solid black;
}
.dashboard {
  &-container {
    position: relative;
    margin: 30px;
    .box {
      position: relative;
      width: 1000px;
      height: 400px;
      border: 1px solid #eee;
      border-radius: 4px;
      .item {
        position: absolute;
        top: 0;
        left: 0;
        .decoration {
          width: 14px;
          height: 14px;
          background: darkorange;
          border-radius: 50%;
        }
        .text {
          position: relative;
          top: -80px;
          //-webkit-transform: translate(-42%, 0);
          //transform: translate(-50%, 0);
          max-width: 90px;
          background: cyan;
          border-radius: 4px;
          //padding: 4px;
        }
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
