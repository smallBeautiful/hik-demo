<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list.slice((currentPage - 1) * size, (currentPage - 1) * size + size)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      height="600px"
      row-key="id"
    >
      <el-table-column
        :reserve-selection="true"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="currentPage" :total="total" @pagination="pagination" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mockTable } from '@/views/table/data/mock'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      page: 1,
      currentPage: 1,
      size: 20
    }
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.size
      const endIndex = startIndex + this.size
      return this.list.slice(startIndex, endIndex)
      // this.list.slice((currentPage - 1) * size, (currentPage - 1) * size + size)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    pagination(params) {
      this.currentPage = params.page
    },
    fetchData() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
        mockTable.data.items.forEach(item => {
          item.obj = {
            hell0: '212121',
            hell1: '大师傅但是当时',
            hell2: '十大啊实打实打算萨达阿斯顿',
            hell3: '大大飒飒大苏打撒大苏打',
            hell4: '大苏打阿斯顿',
            hell5: '大大撒撒大大'
          }
        })
        this.list = mockTable.data.items
        this.total = this.list.length
      })
    }
  }
}
</script>
