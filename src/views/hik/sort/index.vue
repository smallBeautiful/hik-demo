<template>
  <div class="row">
    <div class="col-4">
      <!-- 第一个拖动列表 -->
      <draggable
        id="first"
        data-source="juju"
        :list="list"
        class="list-group"
        draggable=".item"
        group="a"
      >
        <div
          v-for="element in list"
          :key="element.name"
          class="list-group-item item"
        >
          {{ element.name }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example"
        >
          <button class="btn btn-secondary" @click="add">Add</button>
          <button class="btn btn-secondary" @click="replace">Replace</button>
        </div>
      </draggable>
    </div>

    <div class="col-4">
      <!-- 第二个拖动列表 -->
      <draggable :list="list2" class="list-group" draggable=".item" group="a">
        <div
          v-for="element in list2"
          :key="element.name"
          class="list-group-item item"
        >
          {{ element.name }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example"
        >
          <button class="btn btn-secondary" @click="add2">Add</button>
          <button class="btn btn-secondary" @click="replace2">Replace</button>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
let id = 1
export default {
  name: 'TwoListHeaderslots',
  display: 'Two list header slot',
  order: 14,
  components: {
    draggable
  },
  data() {
    return {
      list: [
        { name: 'John 1', id: 0 },
        { name: 'Joao 2', id: 1 },
        { name: 'Jean 3', id: 2 }
      ],
      list2: [
        { name: 'Jonny 4', id: 3 },
        { name: 'Guisepe 5', id: 4 }
      ]
    }
  },
  methods: {
    add: function() {
      this.list.push({ name: 'Juan ' + id, id: id++ })
    },
    replace: function() {
      this.list = [{ name: 'Edgard', id: id++ }]
    },
    add2: function() {
      this.list2.push({ name: 'Juan ' + id, id: id++ })
    },
    replace2: function() {
      this.list2 = [{ name: 'Edgard', id: id++ }]
    }
  }
}
</script>
