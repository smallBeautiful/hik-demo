<template>
  <div class="grid-right">
    <div class="item item1">
      <div class="header" @click="toggleHide(0)">item1</div>
      <div v-show="hideList[0]" class="content">
        固定高度，偶尔会改变
      </div>
    </div>
    <div class="item item2">
      <div class="header" @click="toggleHide(1)">item2</div>
      <div v-show="hideList[1]" class="content">
        固定高度，不会改变
      </div>
    </div>
    <div class="item item3">
      <div class="header" @click="toggleHide(2)">item3</div>
      <div v-show="hideList[2]" class="content content2">
        <div v-show="true" class="list-container" :style="{ height: autoHeight + 'px' }">
          固定高度，其他模块多出的高度从这里拿
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
          <div>content3</div>
        </div>
      </div>
    </div>
    <div class="item item4" :class="{ 'flex-grow': !hideList[2] && hideList[3] }">
      <div class="header" @click="toggleHide(3)">item4</div>
      <div v-show="hideList[3]" class="content">
        固定一个高度，超出滚动条
        <draggable
          v-model="list"
          class="draggable"
          :group="{ name: 'people' }"
          ghost-class="ghost"
          :sort="false"
        >
          <span v-for="(user) in list" :key="user.id" class="user">
            {{ user.name }}
          </span>
        </draggable>
      </div>
    </div>
    <div v-if="false" class="item">
      <div class="content">
        1111111
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { cloneDeep, throttle } from 'lodash'
import { getClientHeight } from '@/utils/directives/dom'
import { findChildrenByClassName, getStyle } from '@/utils'

const CONTAINER_PADGING = 20
export default {
  name: 'Right',
  components: {
    draggable
  },
  data() {
    return {
      list: [
        { 'name': 'Emma', 'id': '11' },
        { 'name': 'Liam', 'id': '12' },
        { 'name': 'Liam1', 'id': '121' },
        { 'name': 'Olivia', 'id': '13' }],
      hideList: [true, true, true, true],
      heightList: [
        { display: true, headerHeight: 30, contentHeight: 0, maxHeight: 100, height: 0, marginTop: 0 },
        { display: true, headerHeight: 30, contentHeight: 0, maxHeight: 100, height: 0, marginTop: 0 },
        { display: true, headerHeight: 30, contentHeight: 0, maxHeight: 100, height: 0, marginTop: 0 },
        { display: true, headerHeight: 30, contentHeight: 0, maxHeight: 100, height: 0, marginTop: 0 },
        { display: true, headerHeight: 30, contentHeight: 0, maxHeight: 100, height: 0, marginTop: 0 }
      ],
      autoHeight: 100
    }
  },
  mounted() {
    this._resize(this)
    this._calHeight()
    window.addEventListener('resize', this._resize.bind(null, this))
  },
  methods: {
    toggleHide(index) {
      this.hideList[index] = !this.hideList[index]
      this.$forceUpdate()
      this.$nextTick(() => {
        this._calHeight()
      })
    },
    _resize: throttle((_this) => {
      // console.log('resize')
      _this.$nextTick(() => {
        // _this.clientHeight = getClientHeight(document.getElementsByClassName('content2')[0])
        _this._calHeight()
      })
    }, 16),
    // 计算高度
    _calHeight() {
      /**
       * 如果只有一个容器打开，设置最高宽度,
       * 如果开了其他模块，高度从item3中拿
       * [
       *   { display: true, headerHeight: 30, contentHeight: 0, maxHeight: 100 }
       * ]
       * */
      // 容器高度
      const containerHeight = Number(getStyle(document.getElementsByClassName('grid-right')[0], 'height').replace('px', ''))
      console.log('containerHeight: ', containerHeight)
      let allMarginTop = 0
      let allContainerHeight = 0
      // 获取各个模块的高度
      for (let i = 0; i < 5; i++) {
        const className = 'item' + (i + 1)
        const el = document.getElementsByClassName(className)[0]
        let curContent
        if (el) {
          const res = findChildrenByClassName(el, 'content')
          if (res) {
            curContent = res[0]
          }
        }
        const curContainerHeight = getStyle(curContent, 'height')
        const height = Number(curContainerHeight.replace('px', ''))
        const marginTop = Number(getStyle(document.getElementsByClassName(className)[0], 'marginTop').replace('px', ''))
        this.heightList[i].display = !!height
        this.heightList[i].height = height
        this.heightList[i].contentHeight = height || 0
        this.heightList[i].marginTop = marginTop
        allMarginTop += marginTop
        if (className !== 'item3') {
          allContainerHeight += this.heightList[i].contentHeight + 30
        }
      }
      // 剩余的高度 = 总高度 - 20的padding - 其他容器padding - 自身30
      this.autoHeight = containerHeight - allContainerHeight - CONTAINER_PADGING - allMarginTop
      console.log(this.autoHeight)
      console.log(cloneDeep(this.heightList))
      // console.log('containerHeight: ', allContainerHeight)
      // console.log('allMarginTop: ', allMarginTop)
      // console.log('restHeight: ', restHeight)
    }
  }
}
</script>

<style scoped lang="scss">
.grid-right {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #e9e9e9;
  //display: flex;
  flex-direction: column;
  .item {
    width: 100%;
    .header {
      height: 30px;
      background: #fff;
    }
  }
  .item1 {
  }
  .item + .item {
    margin-top: 10px;
  }
}
.flex-grow {
  //flex-grow: 1;
}
.content2 {
  height: calc(100% - 20px);
  overflow-y: auto;
}
.content {
  background: orange;
}
.user {
  display: inline-block;
  background: #FFFFFF;
  margin: 4px;
  padding: 5px;
  border-radius: 4px;
  color: cyan;
  cursor: pointer;
}
</style>
