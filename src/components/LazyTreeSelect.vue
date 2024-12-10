<template>
  <div class="lazy-tree-select">
    <el-select
      v-model="selectedValues"
      multiple
      collapse-tags
      :placeholder="placeholder"
      :clearable="clearable"
      @clear="handleClear"
      @visible-change="handleVisibleChange">
      <!-- <el-option 
        v-for="item in selectedOptions"
        :key="item.id"
        :label="item.label"
        :value="item.id">
      </el-option> -->
      <el-option value="tree-option" style="height: auto; padding: 0;">
        <el-tree
          ref="tree"
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          :check-strictly="false"
          node-key="id"
          :default-checked-keys="checkedKeys"
          :default-expanded-keys="expandedKeys"
          @check="handleCheck"
          @node-expand="handleNodeExpand"
          @node-collapse="handleNodeCollapse">
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'LazyTreeSelect',
  
  props: {
    instanceId: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    storeNamespace: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      selectedValues: [],
      selectedOptions: [],
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      }
    }
  },

  computed: {
    checkedKeys() {
      return this.$store.state[this.storeNamespace].checkedKeys
    },
    checkedNodes() {
      return this.$store.state[this.storeNamespace].checkedNodes
    },
    halfCheckedKeys() {
      return this.$store.state[this.storeNamespace].halfCheckedKeys
    },
    expandedKeys() {
      return this.$store.state[this.storeNamespace].expandedKeys
    },
    storeSelectedValues() {
      return this.$store.state[this.storeNamespace].selectedValues
    },
    storeSelectedOptions() {
      return this.$store.state[this.storeNamespace].selectedOptions
    }
  },

  methods: {
    async loadNode(node, resolve) {
      if (node.level > 3) {
        resolve([])
        return
      }

      try {
        const parentId = node.level === 0 ? 'root' : node.data.id
        const data = await this.$store.dispatch(`${this.storeNamespace}/loadNodeData`, {
          parentId,
          level: node.level
        })
        
        if (node.level === 3) {
          data.forEach(item => {
            item.leaf = true
          })
        }
        
        resolve(data)
        
        this.$nextTick(() => {
          this.updateTreeCheckedState()
        })
      } catch (error) {
        console.error('加载节点失败:', error)
        resolve([])
      }
    },

    handleVisibleChange(visible) {
      if (visible) {
        this.$nextTick(() => {
          this.updateTreeCheckedState()
        })
      }
    },

    updateTreeCheckedState() {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(this.checkedKeys)
        this.$refs.tree.setExpandedKeys(this.expandedKeys)
        this.updateSelectedOptions()
      }
    },

    updateSelectedOptions() {
      const checkedNodes = this.$refs.tree ? this.$refs.tree.getCheckedNodes() : []
      const halfCheckedNodes = this.$refs.tree ? this.$refs.tree.getHalfCheckedNodes() : []
      
      const allSelectedNodes = [...checkedNodes, ...halfCheckedNodes]
      
      const selectedValues = allSelectedNodes.map(node => node.id)
      const selectedOptions = allSelectedNodes.map(node => ({
        id: node.id,
        label: node.label
      }))

      this.$store.dispatch(`${this.storeNamespace}/updateSelectedOptions`, {
        selectedValues,
        selectedOptions
      })

      this.selectedValues = selectedValues
      this.selectedOptions = selectedOptions
    },

    handleCheck(data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
      this.$store.dispatch(`${this.storeNamespace}/updateCheckedState`, {
        checkedKeys,
        checkedNodes,
        halfCheckedKeys
      })
      
      this.updateSelectedOptions()
    },

    handleNodeExpand(node) {
      const expandedKeys = [...this.expandedKeys, node.id]
      this.$store.dispatch(`${this.storeNamespace}/updateExpandedKeys`, expandedKeys)
    },

    handleNodeCollapse(node) {
      const expandedKeys = this.expandedKeys.filter(key => key !== node.id)
      this.$store.dispatch(`${this.storeNamespace}/updateExpandedKeys`, expandedKeys)
    },

    handleClear() {
      this.$store.dispatch(`${this.storeNamespace}/updateCheckedState`, {
        checkedKeys: [],
        checkedNodes: [],
        halfCheckedKeys: []
      })
      this.$store.dispatch(`${this.storeNamespace}/updateSelectedOptions`, {
        selectedValues: [],
        selectedOptions: []
      })
      this.selectedValues = []
      this.selectedOptions = []
      this.updateTreeCheckedState()
    },

    getCheckedNodes(leafOnly = false) {
      return this.$refs.tree ? this.$refs.tree.getCheckedNodes(leafOnly) : []
    },

    getHalfCheckedNodes() {
      return this.$refs.tree ? this.$refs.tree.getHalfCheckedNodes() : []
    },

    reset() {
      this.handleClear()
    }
  },

  watch: {
    checkedKeys: {
      handler(newKeys) {
        this.$nextTick(() => {
          this.updateTreeCheckedState()
        })
      },
      immediate: true
    },
    
    storeSelectedOptions: {
      handler(newOptions) {
        this.selectedOptions = newOptions
        this.selectedValues = this.storeSelectedValues
      },
      deep: true,
      immediate: true
    },

    expandedKeys: {
      handler(newKeys) {
        this.$nextTick(() => {
          if (this.$refs.tree) {
            this.$refs.tree.setExpandedKeys(newKeys)
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.lazy-tree-select {
  .el-select-dropdown__item {
    height: auto;
    padding: 0;
    overflow: visible;
    
    &.selected {
      font-weight: normal;
    }
    
    &:hover {
      background-color: transparent;
    }
  }
  
  .el-tree {
    padding: 10px;
    min-width: 250px;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>