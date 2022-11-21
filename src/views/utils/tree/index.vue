<template>
  <div class="app-container">
    <div style="display: flex">
      <div>
        树形数据搜索
        <el-input v-model="value" @change="change" />
        <el-tree v-if="listDisplay.length" default-expand-all :data="listDisplay" :props="defaultProps" />
      </div>
      <div>
        树形数据
        <el-tree v-if="tree.length" default-expand-all :data="tree" :props="defaultProps" />
      </div>
      <div style="margin-left: 50px">
        扁平数据
        <el-tree v-if="flatList.length" default-expand-all :data="flatList" :props="defaultProps" />
      </div>
      <div style="margin-left: 50px">
        扁平数据转换树形
        <el-tree v-if="transformTree.length" default-expand-all :data="transformTree" :props="defaultProps" />
      </div>
      <div style="margin-left: 50px">
        element 自带
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
        />
        <el-tree
          v-if="listDisplay.length"
          ref="tree"
          default-expand-all
          :data="listDisplay"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getTreeList } from '@/api/tree'
import { treeToFlat, flatToTree, getAllParentNode } from '@/utils/tree'
import { cloneDeep } from 'lodash'
import { searchTree } from './tree/index'
export default {
  name: 'Tree',
  data() {
    return {
      value: '',
      list: [],
      listDisplay: [],
      tree: [],
      flatList: [],
      transformTree: [],
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleNodeClick(e) {
      const res = getAllParentNode(this.list, e.id, { id: 'id', children: 'childrens' })
      const path = res.map(item => {
        return item.name
      }).join(' ')
      console.log(path)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    change(value) {
      this.value = value.trim()
      if (!this.value) {
        this.listDisplay = this.list
        return
      }
      // this.listDisplay = rebuildData(value, this.list, { name: 'name', children: 'childrens' })
      this.listDisplay = searchTree(this.list, item => item.name.includes(value), { children: 'childrens' })
    },
    getList() {
      getTreeList().then(res => {
        this.list = cloneDeep(res.data.treeData)
        this.tree = cloneDeep(res.data.treeData)
        this.listDisplay = cloneDeep(res.data.treeData)
        this.flat(this.tree)
      })
    },
    // 扁平数据
    flat(data) {
      this.flatList = treeToFlat(data, this.defaultProps)
      this.toTree(this.flatList)
      console.log(this.list)
    },
    // 扁平数据转换为tree
    toTree(data) {
      this.transformTree = flatToTree(data, { id: 'id', children: 'childrens', pId: 'pIds' })
    }
  }
}
</script>

<style scoped>

</style>
