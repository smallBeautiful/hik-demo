<template>
  <div>
    <div class="grid">
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
</template>

<script>
import draggable from 'vuedraggable'
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
        { 'name': 'Olivia', 'id': '13' }]
    }
  }
}
</script>

<style scoped lang="scss">
.grid {
  width: 100%;
  height: 500px;
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
