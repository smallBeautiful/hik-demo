<template>
  <el-table
    v-if="reRender"
    ref="table"
    :data="tableData"
    border
    style="width: 100%"
  >
    <!--    <el-table-column-->
    <!--      v-if="display"-->
    <!--      fixed-->
    <!--      prop="date"-->
    <!--      width="150"-->
    <!--    >-->
    <!--      <template slot="header">-->
    <!--        姓名-->
    <!--      </template>-->
    <!--      <template slot-scope="scope">-->
    <!--        {{ scope.row.name }}-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <el-table-column label="基本信息" fixed :width="150">
      <template slot="header">
        <div>
          <span>基本信息</span>
          <span style="color: #20a0ff;cursor: pointer" @click="displayHandle">展开收起</span>
        </div>
      </template>
      <template>
        hello
      </template>
      <template v-for="(item) in column">
        <el-table-column
          :key="item.prop"
          :column-key="item.prop"
          :prop="item.prop"
          :label="item.name"
          :min-width="item.width"
          v-if="item.display"
        >
          hello
        </el-table-column>
      </template>
    </el-table-column>
    <el-table-column label="基本信息2">
      <template slot="header">
        <div>
          <span>基本信息2</span>
        </div>
      </template>
      <template v-for="(item) in column">
        <el-table-column
          :key="item.prop"
          :column-key="item.prop"
          :prop="item.prop"
          :label="item.name"
          :min-width="item.width"
          fixed
        />
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

  data() {
    return {
      display: true,
      reRender: true,
      column: [
        { hidden: false, name: '姓名', prop: 'name', width: 150, display: true, always: true },
        { hidden: false, name: '日期', prop: 'date', width: 120, display: true },
        { hidden: false, name: '省份', prop: 'province', width: 120, display: true },
        { hidden: false, name: '城市', prop: 'city', width: 120, display: true },
        { hidden: false, name: '地址', prop: 'address', width: 120, display: true },
        { hidden: false, name: '邮编', prop: 'zip', width: 120, display: true },
        { hidden: false, name: '邮编', prop: 'zip2', width: 120, display: true },
        { hidden: false, name: '邮编', prop: 'zip3', width: 120, display: true },
        { hidden: false, name: '邮编', prop: 'zip4', width: 120, display: true }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        zip2: 2003331,
        zip3: 2003332,
        zip4: 2003332,
        zip5: 2003332
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        zip2: 2003331,
        zip3: 2003332,
        zip4: 2003332,
        zip5: 2003332
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        zip2: 2003331,
        zip3: 2003332,
        zip4: 2003332,
        zip5: 2003332
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        zip2: 2003331,
        zip3: 2003332,
        zip4: 2003332,
        zip5: 2003332
      }]
    }
  },
  methods: {
    displayHandle() {
      this.column.forEach(item => {
        if (!item.always) {
          item.display = !item.display
        }
      })
      this.display = !this.display
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss">
.is-hidden {
  visibility: visible!important;
}
.el-table td.is-hidden>* {
  visibility: visible!important;
}
</style>
