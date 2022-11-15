<!--
1. 重新渲染legend
2. 重新渲染table
3. 重新渲染图表

1. 无数据的展示
2. 删除报错
3. 拖拽
-->
<template>

  <div>
    <transition-group name="drag" class="list" tag="ul">
      <li :key="0" class="list-item">
        hello
      </li>
      <li
        v-for="(item, index) in list"
        v-if="index > 0"
        :key="item.label"
        draggable
        class="list-item"
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
      >
        <div>
          <div>
            <span style="cursor:pointer;">21212</span>
            <span>{{ item.label }}</span>
          </div>

        </div>
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
      console.log(this.list)
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
