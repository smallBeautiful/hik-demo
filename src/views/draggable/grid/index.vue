<template>
  <div class="grid-container">
    <div
      v-for="(cell, index) in grid"
      :key="index"
      class="grid-cell"
      :style="cell.style"
      draggable
      @dragstart="onDragStart(index)"
      @dragend="onDragEnd"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: [
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}},
        { width: 100, height: 100, style: {}}
      ],
      draggingIndex: null
    }
  },
  mounted() {
    const container = document.querySelector('.grid-container')

    const handleDragOver = (e) => {
      e.preventDefault()
    }

    const handleDrop = (e) => {
      e.preventDefault()

      const dropIndex = parseInt(e.target.dataset.index)
      if (dropIndex !== this.draggingIndex) {
        const temp = { ...this.grid[dropIndex] }
        this.grid[dropIndex] = { ...this.grid[this.draggingIndex] }
        this.grid[this.draggingIndex] = temp
      }
    }

    container.addEventListener('dragover', handleDragOver)
    container.addEventListener('drop', handleDrop)

    this.$once('hook:beforeDestroy', () => {
      container.removeEventListener('dragover', handleDragOver)
      container.removeEventListener('drop', handleDrop)
    })
  },
  methods: {
    onDragStart(index) {
      this.draggingIndex = index
    },
    onDragEnd() {
      this.draggingIndex = null
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.grid-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: grab;
}
</style>
