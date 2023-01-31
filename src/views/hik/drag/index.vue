<template>
  <div>
    <draggable v-model="list" :animation="300" @end="end">
      <div v-for="(item, index) in list" v-if="index > 0" :key="index">
        {{ item.label }}
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      list: [
        { label: '列表1' },
        { label: '列表2' },
        { label: '列表3' },
        { label: '列表4' },
        { label: '列表5' },
        { label: '列表6' }
      ]
    }
  },
  methods: {
    end() {
      console.log(this.list)
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  list-style: none;
  .drag-move {
    transition: transform .3s;
  }
  .list-item {
    cursor: move;
    width: 300px;
    background: #EA6E59;
    border-radius: 4px;
    color: #FFF;
    margin: 10px 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
