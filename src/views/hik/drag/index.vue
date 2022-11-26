<template>
  <div class="drag-wrap">
    <h2>这是一个列表拖拽</h2>
    <transition-group name="List">
      <div
        v-for="item in List"
        :key="item.id"
        class="drag-list"
        draggable="true"
        @dragstart="dragstart(item)"
        @dragenter="dragenter(item)"
        @dragend="dragend(item)"
      >{{ item.title }}</div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      List: [
        { id: 1, title: '这里是列表1的标题' },
        { id: 2, title: '这里是列表2的标题' },
        { id: 3, title: '这里是列表3的标题' },
        { id: 4, title: '这里是列表4的标题' },
        { id: 5, title: '这里是列表5的标题' },
        { id: 6, title: '这里是列表6的标题' },
        { id: 7, title: '这里是列表7的标题' }
      ],
      oldItem: '',
      newItem: ''
    }
  },
  methods: {
    // 记录初始信息
    dragstart(item) {
      this.oldItem = item
    },
    // 记录过程中信息
    dragenter(item) {
      console.log(111)
      this.newItem = item
      if (this.oldItem !== this.newItem) {
        const oldIndex = this.List.indexOf(this.oldItem)
        const newIndex = this.List.indexOf(this.newItem)
        const newList = [...this.List] // 中间数组，用于交换两个节点
        // 删除老的节点
        newList.splice(oldIndex, 1)
        // 在列表目标位置增加新的节点
        newList.splice(newIndex, 0, this.oldItem)
        // 更新this.List，触发transition-group的动画效果
        this.List = [...newList]
      }
    },
    // 做最终操作
    dragend(item) {
      // if (this.oldItem !== this.newItem) {
      //   const oldIndex = this.List.indexOf(this.oldItem)
      //   const newIndex = this.List.indexOf(this.newItem)
      //   const newList = [...this.List] // 中间数组，用于交换两个节点
      //   // 删除老的节点
      //   newList.splice(oldIndex, 1)
      //   // 在列表目标位置增加新的节点
      //   newList.splice(newIndex, 0, this.oldItem)
      //   // 更新this.List，触发transition-group的动画效果
      //   this.List = [...newList]
      // }
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
    background-color: #bfa;
  }
</style>
