<template>
  <div class="flex-container grid-container">
    <div class="grid left">
      <div v-for="(gridRow, index) in grid" :key="index" class="grid-row">
        <div v-for="(block, blockIndex) in gridRow" :key="blockIndex" class="grid-item">
          <div>
            <el-scrollbar :style="{ height: clientHeight + 'px' }">
              <draggable
                v-model="block.list"
                v-clickoutside="closeDropdown"
                :style="{ height: clientHeight + 'px' }"
                class="draggable"
                :group="{ name: 'people' }"
                ghost-class="ghost"
                @end="end"
              >
                <el-popover
                  v-for="(user) in block.list"
                  :key="user.id"
                  v-model="user.visible"
                  trigger="manual"
                  placement="top"
                  width="160"
                >
                  <div>hello</div>
                  <span slot="reference">
                    <span class="user">
                      <span @click="go">{{ user.name }}111</span>
                      <span style="margin-left: 10px" @click="popoverHandle(user)">{{ user.id }}</span>
                    </span>
                  </span>
                </el-popover>
              </draggable>
            </el-scrollbar>
          </div>
          <happy-scroll v-if="false" />
        </div>
      </div>
    </div>
    <div class="right">
      <right />
      <!--      <el-button :loading="isLoading" :disabled="isLoading">-->
      <!--        {{ text }}-->
      <!--      </el-button>-->
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import right from '@/views/draggable/grid/components/right.vue'
import clickoutside from '@/utils/directives/clickoutside'
import { HappyScroll } from 'vue-happy-scroll'
// 引入css，推荐将css放入main入口中引入一次即可。
import 'vue-happy-scroll/docs/happy-scroll.css'
import { getClientHeight } from '@/utils/directives/dom'
import { throttle } from 'lodash'

export default {
  components: {
    draggable, right, HappyScroll
  },
  directives: {
    clickoutside
  },
  data() {
    return {
      visible: true,
      height: 200,
      grid: [
        [
          { id: 101, list: [{ name: '张伟', id: '1', visible: false }, { name: '王芳', id: '2', visible: false }, { name: 'Joseph', id: 36 },
            { name: 'Grace', id: 37 },
            { name: 'David', id: 38 },
            { name: 'Chloe', id: 39 },
            { name: 'Samuel', id: 40 },
            { name: 'Swift Lion', id: 963 },
            { name: 'Calm Wolf', id: 964 },
            { name: 'Lucky Phoenix', id: 965 },
            { name: 'Bright Phoenix', id: 966 },
            { name: 'Brave Bear', id: 967 },
            { name: 'Swift Phoenix', id: 968 },
            { name: 'Great Falcon', id: 969 },
            { name: 'Wise Bear', id: 970 },
            { name: 'Bright Tiger', id: 971 },
            { name: 'Swift Falcon', id: 972 },
            { name: 'Wise Eagle', id: 973 },
            { name: 'Swift Wolf', id: 974 },
            { name: 'Kind Eagle', id: 975 },
            { name: 'Swift Panther', id: 976 },
            { name: 'Great Eagle', id: 977 },
            { name: 'Calm Bear', id: 978 },
            { name: 'Brave Eagle', id: 979 },
            { name: 'Swift Panther', id: 980 },
            { name: 'Brave Phoenix', id: 981 },
            { name: 'Calm Bear', id: 982 },
            { name: 'Lucky Tiger', id: 983 },
            { name: 'Happy Bear', id: 984 },
            { name: 'Brave Wolf', id: 985 },
            { name: 'Great Bear', id: 986 },
            { name: 'Swift Tiger', id: 987 },
            { name: 'Gentle Eagle', id: 988 },
            { name: 'Wise Eagle', id: 989 },
            { name: 'Bright Falcon', id: 990 },
            { name: 'Gentle Falcon', id: 991 },
            { name: 'Lucky Eagle', id: 992 },
            { name: 'Lucky Lion', id: 993 },
            { name: 'Calm Bear', id: 994 },
            { name: 'Kind Wolf', id: 995 },
            { name: 'Gentle Bear', id: 996 },
            { name: 'Bright Falcon', id: 997 },
            { name: 'Swift Tiger', id: 998 },
            { name: 'Bright Falcon', id: 999 },
            { name: 'Wise Falcon', id: 1000 },
            { name: 'Jack', id: 50 }] },
          { id: 102, list: [{ name: '陈秀英', id: '5', visible: false }] },
          { id: 103, list: [] }
        ],
        [
          { id: 201, list: [] },
          { id: 202, list: [] },
          { id: 203, list: [] }
        ],
        [
          { id: 301, list: [] },
          { id: 302, list: [{ name: '周磊', id: '7', visible: false }] },
          { id: 303, list: [{ name: '沈强', id: '10', visible: false }] }
        ]
      ],
      draggingIndex: null,
      clientHeight: 0,
      startTime: new Date(), // 时间对比
      isSave: false, // 是否需要保存
      timer: undefined,
      text: '保存',
      isLoading: false
    }
  },
  mounted() {
    this._resize(this)
    this._observer()
    window.addEventListener('resize', this._resize.bind(null, this))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._resize)
    clearInterval(this.timer)
  },
  methods: {
    /**
     * 自动保存
     * isChange: false 标记是否需要保存
     * 拖拽，或者校准
     * */
    autoSave() {
      console.log('autoSave')
      this.isSave = false
      setTimeout(() => {
        this.isLoading = false
        this.startTime = new Date()
      }, 3000)
    },
    _observer() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (!this.isSave) {
            // console.log('fail')
            return
          }
          const timeDiff = parseInt((new Date() - this.startTime) / 1000)
          if (timeDiff > 10) {
            console.log('save')
            this.autoSave()
          } else {
            console.log('waiting--------------------')
          }
        }, 1000)
      }
    },
    _resize: throttle((_this) => {
      console.log('resize')
      _this.$nextTick(() => {
        _this.clientHeight = getClientHeight(document.getElementsByClassName('grid-item')[0])
      })
    }, 16),
    end() {
      this.isSave = true
      setTimeout(() => {
        this.dispatchResize()
      }, 1000)
    },
    dispatchResize() {
      // 创建一个自定义的 resize.js 事件
      const resizeEvent = new Event('resize')
      // 派发 resize.js 事件
      window.dispatchEvent(resizeEvent)
    },
    closeDropdown() {
      this.grid.forEach(item => {
        item.forEach(list => {
          // eslint-disable-next-line no-return-assign
          list.list.forEach(user => user.visible = false)
        })
      })
    },
    popoverHandle(item) {
      item.visible = !item.visible
    },
    go() {
      window.open('https://www.bilibili.com', '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.left {
  width: 79%;
}
.right {
  width: 20%;
}
.grid {
  height: 100%;
}
.grid-row {
  width: 100%;
  height: 33%;
  flex: auto;
  display: flex;
  justify-content: space-around;
  .grid-item {
    background: orange;
    width: 100%;
    .user {
      display: inline-block;
      background: #FFFFFF;
      margin: 4px;
      padding: 5px;
      border-radius: 4px;
      color: cyan;
      cursor: pointer;
    }
  }
}
.grid-row + .grid-row {
  margin-top: 10px;
}
.grid-item {
  margin-right: 10px;
}
.draggable {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.grid-container {
  height: calc(100vh - 50px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__view {
    min-height: 100%;
  }
}
</style>

