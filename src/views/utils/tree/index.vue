<template>
  <div class="app-container">
    <div style="display: flex">
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
    </div>
  </div>
</template>

<script>
import { getTreeList } from '@/api/tree'
import { treeToFlat, flatToTree } from '@/utils/tree'
import { cloneDeep } from 'lodash'
export default {
  name: 'Tree',
  data() {
    return {
      list: [],
      tree: [],
      flatList: [],
      transformTree: [],
      defaultProps: {
        children: 'childrens',
        label: 'name'
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getTreeList().then(res => {
        this.list = cloneDeep(res.data.treeData)
        this.tree = cloneDeep(res.data.treeData)
        this.flat(this.tree)
      })
    },
    // 扁平数据
    flat(data) {
      this.flatList = treeToFlat(data, this.defaultProps)
      console.log(this.flatList)
      this.toTree(this.flatList)
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
