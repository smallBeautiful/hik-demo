<template>
  <div class="rma-receive-detail">
    <div class="toolbar">
      <el-button type="primary" size="mini" @click="onBatchImport">批量导入</el-button>
      <el-button size="mini" @click="onPrintReceive">打印收货单</el-button>
      <el-button size="mini" @click="onPrintRepairCode">打印维修单条码</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: 100%"
    >
      <el-table-column prop="serialNo" label="序列号/批次号" min-width="140">
        <template slot-scope="scope">
          <span v-if="!scope.row._editing">{{ scope.row.serialNo }}</span>
          <el-input
            v-else
            v-model.trim="scope.row.serialNo"
            size="mini"
            placeholder="请输入"
          />
        </template>
      </el-table-column>

      <el-table-column prop="refSerialNo" label="参考序列号" min-width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row._editing">{{ scope.row.refSerialNo || '-' }}</span>
          <el-input
            v-else
            v-model.trim="scope.row.refSerialNo"
            size="mini"
            placeholder="请输入"
          />
        </template>
      </el-table-column>

      <el-table-column prop="logisticsNo" label="物流号" min-width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row._editing">{{ scope.row.logisticsNo || '-' }}</span>
          <el-input
            v-else
            v-model.trim="scope.row.logisticsNo"
            size="mini"
            placeholder="请输入"
          />
        </template>
      </el-table-column>

      <el-table-column prop="model" label="产品型号" min-width="180">
        <template slot-scope="scope">
          <span v-if="!scope.row._editing">{{ scope.row.model }}</span>
          <el-select v-else v-model="scope.row.model" size="mini" placeholder="请选择" filterable>
            <el-option v-for="opt in productOptions" :key="opt" :label="opt" :value="opt" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="category" label="标识标签" min-width="160">
        <template slot="header">
          <div class="th-flex">
            <span>标识标签</span>
            <el-tooltip effect="dark" content="A类/ODM/固件版/显点等" placement="top">
              <i class="el-icon-info th-tip" />
            </el-tooltip>
          </div>
        </template>
        <template slot-scope="scope">
          <div v-if="!scope.row._editing" class="tag-wrap">
            <el-tag size="mini">{{ scope.row.category }}</el-tag>
            <el-tag v-if="scope.row.source" size="mini" type="info" class="ml8">{{ scope.row.source }}</el-tag>
            <el-tag v-if="scope.row.version" size="mini" type="warning" class="ml8">{{ scope.row.version }}</el-tag>
          </div>
          <div v-else class="edit-flex">
            <el-select v-model="scope.row.category" size="mini" style="width: 82px" placeholder="类别">
              <el-option v-for="opt in categoryOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
            <el-select v-model="scope.row.source" size="mini" style="width: 90px" class="ml8" placeholder="来源">
              <el-option v-for="opt in sourceOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
            <el-select v-model="scope.row.version" size="mini" style="width: 100px" class="ml8" placeholder="版本">
              <el-option v-for="opt in versionOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="deliveryUnit" label="出库单位" min-width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row._editing">{{ scope.row.deliveryUnit || '-' }}</span>
          <el-select v-else v-model="scope.row.deliveryUnit" size="mini" placeholder="请选择">
            <el-option v-for="u in unitOptions" :key="u" :label="u" :value="u" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="customerIssue" label="客户反馈故障" min-width="160">
        <template slot-scope="scope">
          <span v-if="!scope.row._editing">{{ scope.row.customerIssue || '-' }}</span>
          <el-input v-else v-model.trim="scope.row.customerIssue" size="mini" placeholder="请输入" />
        </template>
      </el-table-column>

      <el-table-column prop="attachments" label="随机" width="70" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="onAttachment(scope.row)"><i class="el-icon-paperclip" /></el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="140" fixed="right" align="center">
        <template slot-scope="scope">
          <template v-if="!scope.row._editing">
            <el-button type="text" size="mini" @click="editRow(scope.$index, scope.row)">编辑</el-button>
            <el-divider direction="vertical" />
            <el-popconfirm title="确定删除该行吗？" @confirm="removeRow(scope.$index)">
              <el-button slot="reference" type="text" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
          <template v-else>
            <el-button type="text" size="mini" @click="saveRow(scope.row)">保存</el-button>
            <el-divider direction="vertical" />
            <el-button type="text" size="mini" @click="cancelEdit(scope.$index, scope.row)">取消</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div class="table-footer">
      <el-button type="text" icon="el-icon-plus" @click="addRow">新增</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HikTabDemo',
  data() {
    return {
      tableData: [
        {
          serialNo: 'B10230221',
          refSerialNo: 'B10230221',
          logisticsNo: '300100011',
          model: 'DS-7104HGHI-F1(STD)',
          category: 'A类',
          source: 'ODM',
          version: '显点',
          deliveryUnit: '一致',
          customerIssue: '无法上电',
          _editing: false
        },
        {
          serialNo: 'H10256983',
          refSerialNo: 'H10256983',
          logisticsNo: '300100012',
          model: 'DS-2DM1-614H(国内标配)',
          category: 'A类',
          source: 'ODM',
          version: '显点',
          deliveryUnit: '不一致',
          customerIssue: '录像机清楚无法读取',
          _editing: false
        },
        {
          serialNo: '',
          refSerialNo: '',
          logisticsNo: '',
          model: '',
          category: 'A类',
          source: 'ODM',
          version: '显点',
          deliveryUnit: '入账',
          customerIssue: '',
          _editing: true
        }
      ],
      productOptions: [
        'DS-7104HGHI-F1(STD)',
        'DS-2DM1-614H(国内标配)',
        'DS-7108HGHI-F1',
        'DS-7716NI-I4'
      ],
      categoryOptions: ['A类', 'B类', 'C类'],
      sourceOptions: ['ODM', '自研', '代理'],
      versionOptions: ['固件版', '显点', '面板版'],
      unitOptions: ['一致', '不一致', '入账']
    }
  },
  methods: {
    onBatchImport() {
      this.$message.info('点击了批量导入')
    },
    onPrintReceive() {
      this.$message.success('打印收货单')
    },
    onPrintRepairCode() {
      this.$message.success('打印维修单条码')
    },
    onAttachment(row) {
      this.$message('打开附件/随机物料弹窗')
    },
    addRow() {
      this.tableData.push({
        serialNo: '',
        refSerialNo: '',
        logisticsNo: '',
        model: '',
        category: 'A类',
        source: 'ODM',
        version: '显点',
        deliveryUnit: '',
        customerIssue: '',
        _editing: true
      })
    },
    editRow(index, row) {
      this.$set(row, '_backup', { ...row })
      this.$set(row, '_editing', true)
    },
    cancelEdit(index, row) {
      if (row._backup) {
        const backup = { ...row._backup }
        delete backup._backup
        delete backup._editing
        this.$set(this.tableData, index, { ...backup, _editing: false })
      } else {
        this.$set(row, '_editing', false)
      }
    },
    saveRow(row) {
      this.$delete(row, '_backup')
      this.$set(row, '_editing', false)
      this.$message.success('已保存')
    },
    removeRow(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.rma-receive-detail {
  background: #fff;
  padding: 12px;
}
.toolbar {
  margin-bottom: 10px;
}
.table-footer {
  margin-top: 8px;
}
.th-flex {
  display: inline-flex;
  align-items: center;
}
.th-tip {
  color: #909399;
  margin-left: 4px;
}
.ml8 {
  margin-left: 8px;
}
.edit-flex {
  display: flex;
  align-items: center;
}
.tag-wrap >>> .el-tag + .el-tag {
  margin-left: 6px;
}
</style>


