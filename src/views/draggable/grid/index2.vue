<template>
  <div>
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
  name: 'Index2',
  components: {
    draggable
  },
  data() {
    return {
      list: [
        [{ id: 112, name: '__hello1' }, { id: 111, name: '__hello11' }],
        [{ id: 21, name: '__hello2' }],
        [{ id: 31, name: '__hello3' }],
        [{ id: 41, name: '__hello4' }],
        [{ id: 51, name: '__hello15' }],
        [{ id: 61, name: '__hello16' }],
        [{ id: 71, name: '__hello17' }],
        [{ id: 81, name: '__hello18' }],
        [{ id: 91, name: '__hello19' }]
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
