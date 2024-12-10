<template>
  <div class="dashboard-container">
    <div class="select-group">
      <h2>组 A</h2>
      <div class="select-wrapper">
        <h3>树选择器1</h3>
        <LazyTreeSelect 
          instance-id="tree1" 
          ref="treeSelect1"
          store-namespace="treeGroupA"
          placeholder="请选择节点" />
      </div>
      
      <div class="select-wrapper">
        <h3>树选择器2</h3>
        <LazyTreeSelect 
          instance-id="tree2" 
          ref="treeSelect2"
          store-namespace="treeGroupA"
          placeholder="请选择节点" />
      </div>
    </div>

    <div class="select-group">
      <h2>组 B</h2>
      <div class="select-wrapper">
        <h3>树选择器3</h3>
        <LazyTreeSelect 
          instance-id="tree3" 
          ref="treeSelect3"
          store-namespace="treeGroupB"
          placeholder="请选择节点" />
      </div>
      
      <div class="select-wrapper">
        <h3>树选择器4</h3>
        <LazyTreeSelect 
          instance-id="tree4" 
          ref="treeSelect4"
          store-namespace="treeGroupB"
          placeholder="请选择节点" />
      </div>
    </div>

    <div class="operations">
      <el-button @click="getSelectedNodes">获取选中节点</el-button>
      <el-button @click="clearGroupA">清空组A</el-button>
      <el-button @click="clearGroupB">清空组B</el-button>
      <el-button @click="clearAll">清空所有</el-button>
    </div>
  </div>
</template>

<script>
import LazyTreeSelect from '@/components/LazyTreeSelect'

export default {
  name: 'Dashboard',
  
  components: {
    LazyTreeSelect
  },

  methods: {
    getSelectedNodes() {
      const groupA = {
        tree1: this.$refs.treeSelect1.getCheckedNodes(),
        tree2: this.$refs.treeSelect2.getCheckedNodes()
      }
      const groupB = {
        tree3: this.$refs.treeSelect3.getCheckedNodes(),
        tree4: this.$refs.treeSelect4.getCheckedNodes()
      }
      console.log('组A选中节点:', groupA)
      console.log('组B选中节点:', groupB)
    },

    clearGroupA() {
      this.$store.dispatch('treeGroupA/updateCheckedState', {
        checkedKeys: [],
        checkedNodes: [],
        halfCheckedKeys: []
      })
      this.$store.dispatch('treeGroupA/updateSelectedOptions', {
        selectedValues: [],
        selectedOptions: []
      })
      this.$refs.treeSelect1.reset()
      this.$refs.treeSelect2.reset()
    },

    clearGroupB() {
      this.$store.dispatch('treeGroupB/updateCheckedState', {
        checkedKeys: [],
        checkedNodes: [],
        halfCheckedKeys: []
      })
      this.$store.dispatch('treeGroupB/updateSelectedOptions', {
        selectedValues: [],
        selectedOptions: []
      })
      this.$refs.treeSelect3.reset()
      this.$refs.treeSelect4.reset()
    },

    clearAll() {
      this.clearGroupA()
      this.clearGroupB()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  
  .select-group {
    margin-bottom: 30px;
    
    h2 {
      margin-bottom: 15px;
      color: #409EFF;
    }
  }
  
  .select-wrapper {
    margin-bottom: 20px;
    
    h3 {
      margin-bottom: 10px;
    }
  }
  
  .operations {
    margin-top: 20px;
    
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>