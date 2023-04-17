<template>
  <div class="app-container">
    <div v-for="(item, index) in users" :key="index" class="box">
      <div v-for="(item2, index2) in item" :key="index2" class="item">
        <draggable class="list-group" :list="item2" group="people" @change="log">
          <div
            v-for="element in item2"
            :key="element.id"
            class="list-group-item"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import { chunk } from 'lodash'
import draggable from 'vuedraggable'
export default {
  name: 'Index',
  components: {
    draggable
  },
  data() {
    return {
      list: [
        [{ id: 1, name: 'hello1' }, { id: 11, name: 'hello11' }],
        [{ id: 2, name: 'hello2' }],
        [{ id: 3, name: 'hello3' }],
        [{ id: 4, name: 'hello4' }],
        [{ id: 5, name: 'hello15' }],
        [{ id: 6, name: 'hello16' }],
        [{ id: 7, name: 'hello17' }],
        [{ id: 8, name: 'hello18' }],
        [{ id: 9, name: 'hello19' }]
      ],
      users: []
    }
  },
  mounted() {
    this.users = chunk(this.list, 3)
  },
  methods: {
    log() {
      console.log(JSON.parse(JSON.stringify(this.users)))
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  justify-content: space-around;
  .item {
    height: 200px;
    width: 30%;
    background: orange;
    margin: 10px;
    border-radius: 6px;
    padding: 10px;
    color: #fff;
  }
}
</style>
