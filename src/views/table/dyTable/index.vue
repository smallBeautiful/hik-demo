<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="配送信息" width="180">
        <el-table-column
          v-for="(item, index) in column1"
          :key="index"
          :prop="item.prop"
          label="日期"
          width="180"
          :fixed="item.fixed"
        >
          <template slot-scope="{ row }">
            {{ row[item.prop] }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="配送信息2">
        <el-table-column
          v-for="(item, index) in column2"
          :key="index"
          :prop="item.prop"
          label="日期"
          width="180"
          :fixed="item.fixed"
        >
          <template slot-scope="{ row }">
            {{ row[item.prop] }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { a: '2016-05-02', b: '王小虎', c: '上海市普陀区金沙江路 1518 弄', d: '2016-05-02', e: '王小虎', f: '上海市普陀区金沙江路 1518 弄', g: '2016-05-02', h: '王小虎', i: '上海市普陀区金沙江路 1518 弄' },
        { a: '2016-05-02', b: '王小虎', c: '上海市普陀区金沙江路 1518 弄', d: '2016-05-02', e: '王小虎', f: '上海市普陀区金沙江路 1518 弄', g: '2016-05-02', h: '王小虎', i: '上海市普陀区金沙江路 1518 弄' },
        { a: '2016-05-02', b: '王小虎', c: '上海市普陀区金沙江路 1518 弄', d: '2016-05-02', e: '王小虎', f: '上海市普陀区金沙江路 1518 弄', g: '2016-05-02', h: '王小虎', i: '上海市普陀区金沙江路 1518 弄' }
      ],
      column1: [
        { prop: 'a', width: 200, fixed: true },
        { prop: 'b', width: 200 }
      ],
      column2: [
        { prop: 'c', width: 200 },
        { prop: 'd', width: 200 },
        { prop: 'e', width: 200 },
        { prop: 'f', width: 200 },
        { prop: 'g', width: 200 },
        { prop: 'h', width: 200 },
        { prop: 'i', width: 200 }
      ]
    }
  }
}
</script>
