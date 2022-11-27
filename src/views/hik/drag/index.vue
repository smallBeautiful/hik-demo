<template>
  <div class="drag-wrap">
    <transition-group name="List">
      <div
        v-for="item in List"
        :key="item.id"
        :style="{background: item.color}"
        class="drag-list"
        draggable="true"
        @dragstart="dragstart(item)"
        @dragenter="dragenter(item)"
        @dragend="dragend(item)"
      >
        <el-checkbox />
        {{ item.id }}
      </div>
    </transition-group>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      List: [],
      oldItem: '',
      newItem: ''
    }
  },
  computed: {
    ...mapState('hik', ['colorListDisplay'])
  },
  mounted() {
    this.List = [
      { id: 1, title: '这里是列表1的标题', enable: '1' },
      { id: 2, title: '这里是列表2的标题', enable: '2' },
      { id: 3, title: '这里是列表3的标题', enable: '1' },
      { id: 4, title: '这里是列表4的标题', enable: '1' },
      { id: 5, title: '这里是列表5的标题', enable: '2' },
      { id: 6, title: '这里是列表6的标题', enable: '2' },
      { id: 7, title: '这里是列表7的标题', enable: '2' }
    ]
    this.initColor()
  },
  methods: {
    initColor() {
      console.log(this.List)
      console.log(this.colorListDisplay)
      let i = 0
      this.List.forEach(item => {
        if (item.enable === '1') {
          item.color = this.colorListDisplay[i]
          i++
        } else {
          item.color = '#fff'
        }
      })
    },
    // 记录初始信息
    dragstart(item) {
      this.oldItem = item
    },
    // 记录过程中信息
    dragenter(item) {
      this.newItem = item
    },
    // 做最终操作
    dragend(item) {
      if (this.oldItem !== this.newItem) {
        const oldIndex = this.List.indexOf(this.oldItem)
        const newIndex = this.List.indexOf(this.newItem)
        const newList = [...this.List]
        newList.splice(oldIndex, 1)
        newList.splice(newIndex, 0, this.oldItem)
        this.List = [...newList]
      }
    }
  }
}
</script>
<style scoped>
  .List-move {
    transition: transform .2s;
  }
  .drag-list {
    margin: 10px auto;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #20a0ff;
  }
</style>
