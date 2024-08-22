<template>
  <div class="table-wrapper">
    <el-scrollbar class="scroll-container">
      <table>
        <thead>
        <tr>
          <th v-for="col in 5" :key="col">Header {{ col }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in 20" :key="row">
          <td v-for="col in 5" :key="col">{{ row }}-{{ col }}</td>
        </tr>
        </tbody>
      </table>
    </el-scrollbar>
  </div>
</template>

<script>

export default {
  name: 'FixedHeaderTable',
  components: {
  }
}
</script>

<style scoped>
.table-wrapper {
  padding: 20px 50px;
  position: relative; /* Ensure the wrapper is positioned for sticky header */
}

.scroll-container {
  height: 300px; /* Height of the scrollable area */
  overflow: hidden; /* Hide default scrollbar */
}

table {
  width: 100%;
  border-collapse: collapse;
}

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

thead th {
  background-color: #f4f4f4;
  position: sticky;
  top: 0;
  z-index: 1; /* Ensure the header stays above the scrollbar */
  border-bottom: 2px solid #ddd;
}

td, th {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
}
</style>
