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
    <div class="item item3" :class="{ 'flex-grow': hideList[2] }">
      <div class="header" @click="toggleHide(2)">item3</div>
      <div v-show="hideList[2]" class="content content2" style="height: 436px;">
        <div v-show="true" class="list-container">
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
import { throttle } from 'lodash'
import { getClientHeight } from '@/utils/directives/dom'
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
      hideList: [true, true, true, true]
    }
  },
  mounted() {
    this._resize(this)
    window.addEventListener('resize', this._resize.bind(null, this))
  },
  methods: {
    toggleHide(index) {
      this.hideList[index] = !this.hideList[index]
      this.$forceUpdate()
    },
    _resize: throttle((_this) => {
      console.log('resize')
      _this.$nextTick(() => {
        _this.clientHeight = getClientHeight(document.getElementsByClassName('content2')[0])
      })
    }, 16),
    // 计算高度
    _calHeight() {

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
  display: flex;
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
  flex-grow: 1;
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
