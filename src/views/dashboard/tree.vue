<template>
  <div class="lazy-tree">
    <el-tree
      ref="tree"
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedKeys"
      @check="handleCheck"
      @check-change="handleCheckChange">
    </el-tree>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LazyTree',
  
  props: {
    // 用于区分不同实例的唯一标识
    instanceId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      }
    }
  },

  computed: {
    ...mapState('tree', ['checkedKeys'])
  },

  methods: {
    ...mapActions('tree', ['loadNodeData', 'updateCheckedKeys']),

    // 懒加载节点数据
    async loadNode(node, resolve) {
      if (node.level > 3) {
        resolve([])
        return
      }

      try {
        const parentId = node.level === 0 ? 'root' : node.data.id
        const data = await this.loadNodeData({
          parentId,
          level: node.level
        })
        
        // 如果是最后一级，标记为叶子节点
        if (node.level === 3) {
          data.forEach(item => {
            item.leaf = true
          })
        }
        
        resolve(data)
      } catch (error) {
        console.error('加载节点失败:', error)
        resolve([])
      }
    },

    // 节点选中状态变化
    handleCheck(data, { checkedKeys }) {
      this.updateCheckedKeys(checkedKeys)
    },

    // 节点选中状态变化（包括父节点）
    handleCheckChange(data, checked, indeterminate) {
      // 获取当前所有选中的节点key
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.updateCheckedKeys(checkedKeys)
    },

    // 设置选中状态
    setCheckedKeys(keys) {
      this.$refs.tree.setCheckedKeys(keys)
    },

    // 获取选中的节点数据
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes()
    }
  },

  // 监听选中状态变化
  watch: {
    checkedKeys: {
      handler(newKeys) {
        // 确保组件已挂载
        this.$nextTick(() => {
          if (this.$refs.tree) {
            this.$refs.tree.setCheckedKeys(newKeys)
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.lazy-tree {
  padding: 10px;
}
</style>