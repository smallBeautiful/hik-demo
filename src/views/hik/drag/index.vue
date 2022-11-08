<template>
  <div>
    <transition-group name="drag" class="list" tag="ul">
      <li
        v-for="(item, index) in list"
        :key="item.label"
        draggable
        class="list-item"
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
      >
        {{ item.label }}
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { label: '列表1' },
        { label: '列表2' },
        { label: '列表3' },
        { label: '列表4' },
        { label: '列表5' },
        { label: '列表6' }
      ],
      dragIndex: '',
      enterIndex: ''
    }
  },
  methods: {
    dragstart(index) {
      this.dragIndex = index
    },
    dragenter(e, index) {
      e.preventDefault()
      if (this.dragIndex !== index) {
        const moving = this.list[this.dragIndex]
        this.list.splice(this.dragIndex, 1)
        this.list.splice(index, 0, moving)
        this.dragIndex = index
      }
    },
    dragover(e, index) {
      e.preventDefault()
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  list-style: none;
  .drag-move {
    transition: transform 0.3s;
  }
  .list-item {
    cursor: move;
    width: 300px;
    background: #EA6E59;
    border-radius: 4px;
    color: #FFF;
    margin-bottom: 6px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
